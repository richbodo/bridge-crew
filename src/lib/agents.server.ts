import type { AgentKind } from "./crew";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export async function callModel(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI gateway is not configured");

  const response = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, messages }),
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

const HOUSE_STYLE = `You are a crew member in a live working session with two humans.
You never interrupt. You do a piece of work, then hand back one short spoken read.
Write the SPOKEN section as plain speech: no bullet points, no headings, no markdown,
at most 10 sentences, the way a colleague would say it out loud.
Write the BRIEF section as the full written detail, markdown allowed.
Respond in exactly this shape:

SPOKEN:
<the spoken read>

BRIEF:
<the full written brief>`;

const ROLE_PROMPT: Record<AgentKind, string> = {
  scribe:
    "You are Scribe. You keep the session's living plan document accurate, short and current.",
  scout:
    "You are Scout. You go and find out. Report what you found, how confident you are, and what is still unknown.",
  advocate:
    "You are Advocate. Make the strongest honest case FOR the option on the table. No strawmen, no hedging.",
  skeptic:
    "You are Skeptic. Make the strongest honest case AGAINST, and name the concrete failure modes.",
  analyst:
    "You are Analyst. One careful pass. Think it through in writing first, then say the short version.",
};

export interface AgentResult {
  spokenRaw: string;
  brief: string;
}

export interface AgentProfile {
  name?: string | null;
  duty?: string | null;
}

export async function runAgentBrief(
  agent: AgentKind,
  brief: string,
  context: string,
  profile?: AgentProfile,
): Promise<AgentResult> {
  const name = profile?.name?.trim();
  const duty = profile?.duty?.trim();
  const role = duty
    ? `You are ${name || agent}. ${duty}`
    : name
      ? `${ROLE_PROMPT[agent]}\nIn this session you go by the name ${name}.`
      : ROLE_PROMPT[agent];

  const raw = await callModel([
    { role: "system", content: `${role}\n\n${HOUSE_STYLE}` },
    {
      role: "user",
      content: `Recent session transcript:\n${context || "(nothing yet)"}\n\nYour task: ${brief}`,
    },
  ]);
  return parseAgentOutput(raw);
}


export function parseAgentOutput(raw: string): AgentResult {
  const match = raw.match(/SPOKEN:\s*([\s\S]*?)\n\s*BRIEF:\s*([\s\S]*)$/i);
  if (!match) return { spokenRaw: raw, brief: raw };
  return { spokenRaw: (match[1] ?? "").trim(), brief: (match[2] ?? "").trim() };
}

export async function writePlanDoc(context: string, current: string): Promise<string> {
  return callModel([
    {
      role: "system",
      content:
        "You are Scribe. Maintain a living plan.md for a working session. Output markdown only, no preamble. Keep it under 40 lines with sections: ## Where we are, ## Decisions, ## Open questions, ## Next.",
    },
    {
      role: "user",
      content: `Current plan.md:\n${current || "(empty)"}\n\nNew session material:\n${context}\n\nReturn the updated plan.md.`,
    },
  ]);
}

export type NameLookup = (agent: AgentKind) => string;

export function makeNameLookup(
  rows: Array<{ agent: string; display_name?: string | null }> | null | undefined,
  fallback: Record<AgentKind, { name: string }>,
): NameLookup {
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    const name = row.display_name?.trim();
    if (name) map.set(row.agent, name);
  }
  return (agent) => map.get(agent) ?? fallback[agent].name;
}
