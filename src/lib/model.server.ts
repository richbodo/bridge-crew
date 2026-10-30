import Anthropic from "@anthropic-ai/sdk";

/**
 * Where the crew's model calls go. One codebase serves every target:
 *   - local stack:     ANTHROPIC_API_KEY → the Anthropic Messages API directly
 *   - Lovable-hosted:  LOVABLE_API_KEY   → Lovable's AI gateway
 *   - tests / offline: BRIDGE_CREW_MODEL_PROVIDER=fixture → canned replies, no keys, no network
 * BRIDGE_CREW_MODEL_PROVIDER forces a choice; otherwise the first key found wins.
 */
export type ModelProvider = "anthropic" | "lovable" | "fixture";

/** Crew members do the real thinking; Scribe is the cheap, frequent call (plan §4). */
export type ModelRole = "crew" | "scribe";

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

const PROVIDERS: readonly ModelProvider[] = ["anthropic", "lovable", "fixture"];

export function pickProvider(env: Record<string, string | undefined> = process.env): ModelProvider {
  const forced = env["BRIDGE_CREW_MODEL_PROVIDER"]?.trim();
  if (forced) {
    if ((PROVIDERS as readonly string[]).includes(forced)) return forced as ModelProvider;
    throw new Error(`Unknown BRIDGE_CREW_MODEL_PROVIDER "${forced}".`);
  }
  if (env["ANTHROPIC_API_KEY"]) return "anthropic";
  if (env["LOVABLE_API_KEY"]) return "lovable";
  throw new Error("No model is configured for the crew.");
}

export async function callModel(
  messages: ChatMessage[],
  role: ModelRole = "crew",
): Promise<string> {
  const provider = pickProvider();
  if (provider === "fixture") return fixtureReply(messages, role);
  if (provider === "lovable") return callLovableGateway(messages);
  return callAnthropic(messages, role);
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

async function callAnthropic(messages: ChatMessage[], role: ModelRole): Promise<string> {
  anthropic ??= new Anthropic();
  const override =
    role === "scribe" ? process.env["BRIDGE_CREW_SCRIBE_MODEL"] : process.env["BRIDGE_CREW_MODEL"];
  const model = override?.trim() || ANTHROPIC_DEFAULTS[role].model;
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  const turns = messages
    .filter((m) => m.role === "user")
    .map((m) => ({ role: "user" as const, content: m.content }));

  try {
    const response = await anthropic.beta.messages.create({
      model,
      max_tokens: 16000,
      output_config: { effort: ANTHROPIC_DEFAULTS[role].effort },
      ...(FALLBACK_MODELS.has(model)
        ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
        : {}),
      ...(system ? { system } : {}),
      messages: turns,
    });
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

// ---------- Lovable AI gateway (Lovable-hosted deployments) ----------

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const GATEWAY_MODEL = "google/gemini-2.5-flash";

async function callLovableGateway(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI gateway is not configured");

  const response = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: GATEWAY_MODEL, messages }),
  });

  if (response.status === 429) throw new Error("The crew is rate limited, try again in a moment.");
  if (response.status === 402) throw new Error("AI credits are exhausted for this workspace.");
  if (!response.ok) {
    console.error("ai gateway error", response.status, await response.text());
    throw new Error("The crew could not reach the model.");
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return payload.choices?.[0]?.message?.content?.trim() ?? "";
}

// ---------- Fixture (deterministic, for tests and offline demos) ----------

export function fixtureReply(messages: ChatMessage[], role: ModelRole): string {
  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const user = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n\n");

  if (role === "scribe") {
    const material = user.split("New session material:")[1] ?? "";
    const lines = material.split("\n").filter((line) => line.includes(":")).length;
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
