import type { CrewStatus } from "./machines";

export type AgentKind = "scribe" | "scout" | "advocate" | "skeptic" | "analyst";
/** `stopped` is a legacy value the database still allows; nothing moves into it any more. */
export type AgentStatus = CrewStatus | "stopped";
export { STATUS_LABEL } from "./machines";

export interface CrewMember {
  kind: AgentKind;
  name: string;
  station: string;
  accent: string; // css variable name
  blurb: string;
  /** Other names a prompt can call this crew member by. */
  aliases?: string[];
}

export const CREW: Record<AgentKind, CrewMember> = {
  scribe: {
    kind: "scribe",
    name: "Scribe",
    station: "Records",
    accent: "var(--crew-scribe)",
    blurb: "Keeps the living plan, decisions and open questions.",
  },
  scout: {
    kind: "scout",
    name: "Scout",
    station: "Long Range",
    accent: "var(--crew-scout)",
    blurb: "Goes and finds out. Returns with a short read and a full brief.",
    aliases: ["research"],
  },
  advocate: {
    kind: "advocate",
    name: "Advocate",
    station: "For",
    accent: "var(--crew-advocate)",
    blurb: "Argues the strongest case for the option on the table.",
  },
  skeptic: {
    kind: "skeptic",
    name: "Skeptic",
    station: "Against",
    accent: "var(--crew-skeptic)",
    blurb: "Argues the strongest case against, and names the failure modes.",
  },
  analyst: {
    kind: "analyst",
    name: "Analyst",
    station: "Deep Scan",
    accent: "var(--crew-analyst)",
    blurb: "One long careful pass, written first, spoken second.",
    aliases: ["analyze", "analyse"],
  },
};

export const CREW_ORDER: AgentKind[] = ["scribe", "scout", "advocate", "skeptic", "analyst"];
