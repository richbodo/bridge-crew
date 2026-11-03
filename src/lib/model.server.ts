import Anthropic from "@anthropic-ai/sdk";

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

async function callAnthropic(
  messages: ChatMessage[],
  role: ModelRole,
  options: CallOptions,
): Promise<string> {
  anthropic ??= new Anthropic();
  const override =
    role === "scribe" ? process.env["BRIDGE_CREW_SCRIBE_MODEL"] : process.env["BRIDGE_CREW_MODEL"];
  const model = override?.trim() || options.model || ANTHROPIC_DEFAULTS[role].model;
  const maxTokens = options.maxTokens ?? 16000;
  // BRIDGE_CREW_INFERENCE_GEO=us keeps inference in the US (Part 9 of the education plan).
  const geo = process.env["BRIDGE_CREW_INFERENCE_GEO"]?.trim();
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  const turns = messages
    .filter((m) => m.role === "user")
    .map((m) => ({ role: "user" as const, content: m.content }));

  try {
    const request = {
      model,
      max_tokens: maxTokens,
      output_config: { effort: options.effort ?? ANTHROPIC_DEFAULTS[role].effort },
      ...(options.fallback !== false && FALLBACK_MODELS.has(model)
        ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
        : {}),
      ...(geo ? { inference_geo: geo } : {}),
      ...(system ? { system } : {}),
      messages: turns,
    };
    // Long outputs (a whole game) stream, so the request doesn't time out.
    const response =
      maxTokens > 16000
        ? await anthropic.beta.messages.stream(request).finalMessage()
        : await anthropic.beta.messages.create(request);
    if (response.stop_reason === "refusal") throw new Error("The model declined this one.");
    return response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      throw new Error("The model provider rejected the crew's API key.");
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new Error("The crew is rate limited, try again in a moment.");
    }
    if (error instanceof Anthropic.APIConnectionError) {
      console.error("anthropic connection error", error.message);
      throw new Error("The crew could not reach the model.");
    }
    if (error instanceof Anthropic.APIError) {
      console.error("anthropic api error", error.status, error.type, error.message);
      if (error.type === "overloaded_error")
        throw new Error("The model is overloaded, try again in a moment.");
      if (error.type === "billing_error")
        throw new Error("AI credits are exhausted for this account.");
      throw new Error("The crew could not reach the model.");
    }
    throw error;
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
        ...["Story", "Characters", "How to play", "Look", "Sounds", "Levels", "Bugs", "Next", "Session notes"].flatMap(
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
  ].join("\n");
}
