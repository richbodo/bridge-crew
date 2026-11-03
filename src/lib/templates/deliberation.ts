import { CREW, CREW_ORDER } from "../crew";
import type { Template } from "./index";

const DUTY: Record<string, string> = {
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

/** Today's crew, for two adults working through a plan or a debate. */
export const deliberation: Template = {
  key: "deliberation",
  name: "Deliberation",
  description: "Two people work through a plan or a debate with five crew members.",
  roster: CREW_ORDER.map((key) => ({
    key,
    name: CREW[key].name,
    station: CREW[key].station,
    accent: CREW[key].accent,
    blurb: CREW[key].blurb,
    duty: DUTY[key]!,
    makes: "text" as const,
    ...(CREW[key].aliases ? { aliases: CREW[key].aliases } : {}),
  })),
  doc: {
    slug: "plan",
    file: "plan.md",
    empty: "Scribe hasn't written anything yet.",
    scribe:
      "You are Scribe. Maintain a living plan.md for a working session. Output markdown only, no preamble. Keep it under 40 lines with sections: ## Where we are, ## Decisions, ## Open questions, ## Next.",
  },
  setting: "You are a crew member in a live working session with two humans.",
  spokenCap: 10,
  seats: 2,
  sharedSeat: false,
  defaultPacks: [],
  notice: null,
  openingNote: "Summon the crew with /research, /analyze, /debate.",
  slashCommands: true,
  refusalFallback: true,
  teamLead: null,
  crewProposals: false,
  bigScreen: false,
};
