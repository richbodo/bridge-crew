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

export interface Addressable {
  /** The crew member's job key. */
  key: string;
  /** Every name it answers to: its job's name, a custom name, aliases. */
  names: string[];
}

const squash = (name: string) => name.toLowerCase().replace(/[\s_-]+/g, "");

/**
 * Who a prompt names (F12): `@Name` anywhere, or `Name,` or `Name:` at the start. A name
 * matches a crew member's job key or any of its names, ignoring case, spaces, hyphens and
 * underscores, so `@game-designer` and `Game designer,` both work. Returns job keys in the
 * order they're named, without repeats. Pure — no IO.
 */
export function findAddressees(input: string, crew: Addressable[]): string[] {
  const lookup = new Map<string, string>();
  for (const member of crew) {
    for (const name of [member.key, ...member.names]) {
      if (name.trim()) lookup.set(squash(name), member.key);
    }
  }
  const found: string[] = [];
  const add = (name: string | undefined) => {
    const key = name === undefined ? undefined : lookup.get(squash(name));
    if (key && !found.includes(key)) found.push(key);
  };
  add(/^\s*([^,:\n@]{1,40}?)\s*[,:]/.exec(input)?.[1]);
  for (const match of input.matchAll(/@([\p{L}\p{N}_-]+)/gu)) add(match[1]);
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
