import Anthropic from "@anthropic-ai/sdk";
import type {
  BetaContentBlockParam,
  BetaMessage,
  BetaMessageParam,
  BetaToolResultBlockParam,
} from "@anthropic-ai/sdk/resources/beta/messages";

/**
 * Where the crew's model calls go:
 *   - ANTHROPIC_API_KEY set → the Anthropic Messages API
 *   - BRIDGE_CREW_MODEL_PROVIDER=fixture → canned replies, no key, no network (tests, offline demos)
 * BRIDGE_CREW_MODEL_PROVIDER=anthropic|fixture forces a choice.
 */
export type ModelProvider = "anthropic" | "fixture";

/** Crew members do the real thinking; Scribe is the cheap, frequent call (plan §4). */
export type ModelRole = "crew" | "scribe";

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export interface CallOptions {
  /**
   * Whether a request the model declines may be re-run on another model in the same call
   * (server-side refusal fallback). Game Studio turns it off, so a decline stays a decline.
   */
  fallback?: boolean;
  model?: string;
  effort?: "low" | "medium" | "high";
  maxTokens?: number;
}

const PROVIDERS: readonly ModelProvider[] = ["anthropic", "fixture"];

export function pickProvider(env: Record<string, string | undefined> = process.env): ModelProvider {
  const forced = env["BRIDGE_CREW_MODEL_PROVIDER"]?.trim();
  if (forced) {
    if ((PROVIDERS as readonly string[]).includes(forced)) return forced as ModelProvider;
    throw new Error(`Unknown BRIDGE_CREW_MODEL_PROVIDER "${forced}".`);
  }
  if (env["ANTHROPIC_API_KEY"]) return "anthropic";
  throw new Error("No model is configured for the crew.");
}

export async function callModel(
  messages: ChatMessage[],
  role: ModelRole = "crew",
  options: CallOptions = {},
): Promise<string> {
  const provider = pickProvider();
  if (provider === "fixture") {
    await fixtureDelay(messages);
    return fixtureReply(messages, role);
  }
  return callAnthropic(messages, role, options);
}

/** A tool a crew member uses while it works: the Tester's play (src/lib/playtest.server.ts). */
export interface CrewTool {
  name: string;
  description: string;
  inputSchema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
  /** One use. What it returns goes back to the model. */
  use: (input: unknown) => Promise<ToolResult>;
  /** The most uses in one run. The turn after the last one writes the reply. */
  uses: number;
  /** The fixture provider uses the tool once, with this. */
  fixtureInput: unknown;
}

export interface ToolResult {
  /** Words and pictures (JPEG, base64), in order. */
  parts: Array<{ text: string } | { jpeg: string }>;
  /** It didn't work; the words say why. */
  failed?: boolean;
}

/** As callModel, with a tool the crew member can use before it replies. */
export async function callModelWithTool(
  messages: ChatMessage[],
  tool: CrewTool,
  role: ModelRole = "crew",
  options: CallOptions = {},
): Promise<string> {
  const provider = pickProvider();
  if (provider === "fixture") {
    // It plays first, so a slow run shows what it saw while it waits.
    await tool.use(tool.fixtureInput);
    await fixtureDelay(messages);
    return fixtureReply(messages, role);
  }
  return callAnthropicWithTool(messages, tool, role, options);
}

// ---------- Anthropic ----------

const ANTHROPIC_DEFAULTS: Record<ModelRole, { model: string; effort: "low" | "medium" }> = {
  crew: { model: "claude-opus-5-5", effort: "medium" },
  scribe: { model: "claude-haiku-5-5", effort: "low" },
};

// Models that accept server-side refusal fallback ("default" routing) on the Claude API.
const FALLBACK_MODELS = new Set([
  "claude-fable-5-1",
  "claude-opus-5-5",
  "claude-opus-5",
  "claude-sonnet-5-5",
]);

let anthropic: Anthropic | undefined;

/** Everything in a request but its messages: the model, limits and system prompt. */
function requestFor(messages: ChatMessage[], role: ModelRole, options: CallOptions) {
  const override =
    role === "scribe" ? process.env["BRIDGE_CREW_SCRIBE_MODEL"] : process.env["BRIDGE_CREW_MODEL"];
  const model = override?.trim() || options.model || ANTHROPIC_DEFAULTS[role].model;
  // BRIDGE_CREW_INFERENCE_GEO=us keeps inference in the US (Part 9 of the education plan).
  const geo = process.env["BRIDGE_CREW_INFERENCE_GEO"]?.trim();
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  return {
    model,
    max_tokens: options.maxTokens ?? 16000,
    output_config: { effort: options.effort ?? ANTHROPIC_DEFAULTS[role].effort },
    ...(options.fallback !== false && FALLBACK_MODELS.has(model)
      ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
      : {}),
    ...(geo ? { inference_geo: geo } : {}),
    ...(system ? { system } : {}),
  };
}

function turnsOf(messages: ChatMessage[]): BetaMessageParam[] {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => ({ role: "user" as const, content: m.content }));
}

function textOf(response: BetaMessage): string {
  if (response.stop_reason === "refusal") throw new Error("The model declined this one.");
  return response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("")
    .trim();
}

/** What the room says when a call fails. */
function failure(error: unknown): unknown {
  if (error instanceof Anthropic.AuthenticationError) {
    return new Error("The model provider rejected the crew's API key.");
  }
  if (error instanceof Anthropic.RateLimitError) {
    return new Error("The crew is rate limited, try again in a moment.");
  }
  if (error instanceof Anthropic.APIConnectionError) {
    console.error("anthropic connection error", error.message);
    return new Error("The crew could not reach the model.");
  }
  if (error instanceof Anthropic.APIError) {
    console.error("anthropic api error", error.status, error.type, error.message);
    if (error.type === "overloaded_error")
      return new Error("The model is overloaded, try again in a moment.");
    if (error.type === "billing_error") return new Error("AI credits are exhausted for this account.");
    return new Error("The crew could not reach the model.");
  }
  return error;
}

async function callAnthropic(
  messages: ChatMessage[],
  role: ModelRole,
  options: CallOptions,
): Promise<string> {
  anthropic ??= new Anthropic();
  const request = { ...requestFor(messages, role, options), messages: turnsOf(messages) };
  try {
    // Long outputs (a whole game) stream, so the request doesn't time out.
    const response =
      request.max_tokens > 16000
        ? await anthropic.beta.messages.stream(request).finalMessage()
        : await anthropic.beta.messages.create(request);
    return textOf(response);
  } catch (error) {
    throw failure(error);
  }
}

async function callAnthropicWithTool(
  messages: ChatMessage[],
  tool: CrewTool,
  role: ModelRole,
  options: CallOptions,
): Promise<string> {
  anthropic ??= new Anthropic();
  const request = {
    ...requestFor(messages, role, options),
    tools: [{ name: tool.name, description: tool.description, input_schema: tool.inputSchema }],
    // Every turn sends the room and the game again; the cache reads them back cheaply.
    cache_control: { type: "ephemeral" as const },
  };
  const turns = turnsOf(messages);
  try {
    for (let used = 0; ; ) {
      const response = await anthropic.beta.messages.create({
        ...request,
        messages: turns,
        // After the last use, the turn writes the reply.
        ...(used >= tool.uses ? { tool_choice: { type: "none" as const } } : {}),
      });
      const uses = response.content.flatMap((block) => (block.type === "tool_use" ? [block] : []));
      if (response.stop_reason !== "tool_use" || !uses.length) return textOf(response);
      turns.push({ role: "assistant", content: response.content as BetaContentBlockParam[] });
      const results: BetaToolResultBlockParam[] = [];
      for (const ask of uses) {
        used++;
        const result =
          ask.name === tool.name
            ? await tool.use(ask.input)
            : { parts: [{ text: `There's no tool called ${ask.name}.` }], failed: true };
        const last = used >= tool.uses ? [{ text: "That was your last turn. Now write your reply." }] : [];
        results.push({
          type: "tool_result",
          tool_use_id: ask.id,
          ...(result.failed ? { is_error: true } : {}),
          content: [...result.parts, ...last].map((part) =>
            "jpeg" in part
              ? { type: "image", source: { type: "base64", media_type: "image/jpeg", data: part.jpeg } }
              : { type: "text", text: part.text },
          ),
        });
      }
      turns.push({ role: "user", content: results });
    }
  } catch (error) {
    throw failure(error);
  }
}

// ---------- Fixture (deterministic, for tests and offline demos) ----------

/** How long a fixture run takes when its task says "slowly": long enough to redirect or stop it. */
export const FIXTURE_SLOW_MS = 4000;

async function fixtureDelay(messages: ChatMessage[]) {
  const task = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.split("## Your task")[1] ?? "")
    .join(" ");
  if (/\bslowly\b/i.test(task)) await new Promise((resolve) => setTimeout(resolve, FIXTURE_SLOW_MS));
}

export function fixtureReply(messages: ChatMessage[], role: ModelRole): string {
  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const user = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n\n");

  if (role === "scribe") {
    const material = user.split("New session material:")[1] ?? "";
    const lines = material.split("\n").filter((line) => line.includes(":")).length;
    if (system.includes("game.md")) {
      return [
        "## The idea",
        "",
        `Fixture game notes — no model was called. ${lines} lines of session material so far.`,
        "",
        ...["Story", "Characters", "How to play", "Look", "Sounds and music", "Levels", "Bugs", "Next", "Session notes"].flatMap(
          (section) => [`## ${section}`, "", "Nothing yet.", ""],
        ),
      ].join("\n");
    }
    return [
      "## Where we are",
      "",
      `Fixture plan — no model was called. ${lines} lines of session material so far.`,
      "",
      "## Decisions",
      "",
      "- None recorded by the fixture scribe.",
      "",
      "## Open questions",
      "",
      "- What would a live model have made of this?",
      "",
      "## Next",
      "",
      "- Keep talking.",
    ].join("\n");
  }

  const name = /^You are ([^.\n]+)\./.exec(system)?.[1]?.trim() ?? "The crew";
  const task = (user.split("## Your task")[1] ?? user).trim().replace(/\s+/g, " ");
  const short = task.length > 80 ? `${task.slice(0, 77)}…` : task;
  return [
    "SPOKEN:",
    `${name} here, on fixture replies. I took the task "${short}" and this is a canned answer for local testing.`,
    "",
    "BRIEF:",
    "## Fixture brief",
    "",
    `- Task: ${task}`,
    "- Provider: fixture (no model was called)",
    `- Context supplied: ${user.length} characters`,
    fixtureExtras(system, user, task),
  ].join("\n");
}

/**
 * The fixture's extras: with "remove" in the task, a REMOVE of every thing that's not used;
 * with "from the <job>", an ASK of that job (src/lib/made.ts); otherwise a made thing.
 */
function fixtureExtras(system: string, user: string, task: string): string {
  if (system.includes("\nREMOVE:") && /\bremove\b/i.test(task)) {
    const unused = [...user.matchAll(/^- #(\d+) .*\(not used\)$/gm)].map((m) => `#${m[1]}`);
    return unused.length ? `\nREMOVE: ${unused.join(", ")}` : "";
  }
  const jobs = /^ASK: <one job: ([^>]+)>$/m.exec(system)?.[1]?.split(", ") ?? [];
  // A crew member that was asked never asks on, so a Yes doesn't start a chain.
  const asked = /suggested asking you/.test(task)
    ? undefined
    : jobs.find((job) => new RegExp(`\\bfrom the ${job}\\b`, "i").test(task));
  const ask = asked ? `\nASK: ${asked}\nPlease help with this: ${task}` : "";
  return `${fixtureMade(system, task)}${ask}`;
}

/**
 * A made thing for the jobs that make one (src/lib/made.ts). "crash" in the task makes a game
 * that throws; "music" makes the Sound designer write a tune instead of sounds.
 */
function fixtureMade(system: string, task: string): string {
  if (system.includes("\nFILE:")) {
    const crash = /\bcrash/i.test(task) ? 'throw new Error("the mole fell off the map");' : "";
    return `
FILE:
\`\`\`html
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Fixture game</title>
<style>body{margin:0;background:#2b1d14;color:#f5e6d3;font-family:sans-serif}canvas{display:block;margin:0 auto}</style>
</head>
<body>
<p>Arrow keys move the mole. A fixture game: no model was called.</p>
<canvas id="c" width="320" height="200"></canvas>
<script>
const c = document.getElementById("c").getContext("2d");
let x = 150;
function draw() { c.fillStyle = "#4a3426"; c.fillRect(0, 0, 320, 200); c.fillStyle = "#9a8270"; c.fillRect(x, 90, 20, 20); }
addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") x -= 10; if (e.key === "ArrowRight") x += 10; draw(); });
draw();
${crash}
</script>
</body>
</html>
\`\`\``;
  }
  if (system.includes("\nPICTURE:")) {
    return `
PICTURE: mole
\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="110" r="70" fill="#9a8270"/><circle cx="75" cy="95" r="8" fill="#1c1410"/><circle cx="125" cy="95" r="8" fill="#1c1410"/><ellipse cx="100" cy="125" rx="16" ry="11" fill="#e8a0a0"/></svg>
\`\`\``;
  }
  if (system.includes("\nSOUNDS:") && /\bmusic\b/i.test(task)) {
    return `
MUSIC: theme
\`\`\`json
{ "tempo": 120, "instruments": { "lead": [0.5, 0, 440, 0.01, 0.1, 0.1, 5], "bass": [0.7, 0, 110, 0.01, 0.2, 0.1, 1] }, "tracks": { "lead": "C5 E5 G5 E5 | D5 F5 A5 -", "bass": "C3 . C3 . | D3 . D3 ." } }
\`\`\``;
  }
  if (system.includes("\nSOUNDS:")) {
    return `
SOUNDS:
\`\`\`json
{ "dig": [1, 0.05, 120, 0, 0.05, 0.15, 4, 1.5], "gem": [1, 0, 900, 0.01, 0.05, 0.2, 0, 1, 10] }
\`\`\``;
  }
  return "";
}
