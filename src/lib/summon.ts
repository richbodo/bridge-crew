import type { AgentKind } from "./crew";

export type Summon =
  | { type: "summon"; agent: AgentKind; brief: string }
  | { type: "debate"; question: string }
  | { type: "stop"; agent: AgentKind }
  | { type: "redirect"; agent: AgentKind; brief: string }
  | { type: "none" };

const AGENT_ALIASES: Record<string, AgentKind> = {
  scribe: "scribe",
  scout: "scout",
  research: "scout",
  advocate: "advocate",
  skeptic: "skeptic",
  analyst: "analyst",
  analyze: "analyst",
  analyse: "analyst",
};

function toAgent(word: string): AgentKind | null {
  return AGENT_ALIASES[word.toLowerCase()] ?? null;
}

/**
 * Finds @mentions of crew members in ordinary speech, in the order they appear,
 * de-duplicated. Pure — no IO. "@advocate and @skeptic, come back with…" re-engages both.
 */
export function parseMentions(input: string): AgentKind[] {
  const found: AgentKind[] = [];
  for (const match of input.matchAll(/@([a-z]+)/gi)) {
    const agent = toAgent(match[1] ?? "");
    if (agent && !found.includes(agent)) found.push(agent);
  }
  return found;
}


/**
 * Parses a typed line into a summon. Pure — no IO, no side effects.
 * Grammar:
 *   /research <topic>      -> summon scout
 *   /analyze <thing>       -> summon analyst
 *   /scout|/advocate|...   -> summon that agent
 *   /debate <question>     -> advocate + skeptic
 *   /stop <agent>
 *   /redirect <agent> <new brief>
 */
export function parseSummon(input: string): Summon {
  const line = input.trim();
  if (!line.startsWith("/")) return { type: "none" };

  const [rawCommand, ...rest] = line.slice(1).split(/\s+/);
  const command = (rawCommand ?? "").toLowerCase();
  const remainder = rest.join(" ").trim();

  if (command === "debate") {
    if (!remainder) return { type: "none" };
    return { type: "debate", question: remainder };
  }

  if (command === "stop") {
    const agent = toAgent(rest[0] ?? "");
    return agent ? { type: "stop", agent } : { type: "none" };
  }

  if (command === "redirect") {
    const agent = toAgent(rest[0] ?? "");
    const brief = rest.slice(1).join(" ").trim();
    if (!agent || !brief) return { type: "none" };
    return { type: "redirect", agent, brief };
  }

  const agent = toAgent(command);
  if (!agent || !remainder) return { type: "none" };
  return { type: "summon", agent, brief: remainder };
}
