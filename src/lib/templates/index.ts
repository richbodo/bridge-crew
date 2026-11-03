import { deliberation } from "./deliberation";
import { gameStudio } from "./game-studio";

/**
 * Room templates (docs/plans/educational-context-2026-10-31.md Part 3). A template is the
 * kind of room: who sits at it, which crew members it has, and what it makes. The crew
 * member machines are the same in every template (docs/state_machines.md).
 */

export type TemplateKey = "deliberation" | "game-studio";

/** What a job's runs produce besides a contribution. */
export type Makes = "text" | "version" | "picture" | "sound" | "tests";

export interface JobModel {
  model?: string;
  effort?: "low" | "medium" | "high";
  maxTokens?: number;
}

export interface Job {
  /** Stored in `agent` columns, and what `@key` matches. */
  key: string;
  name: string;
  /** A short label under the name on the crew member's card. */
  station: string;
  /** A CSS colour for the crew member's card and lines. */
  accent: string;
  /** One line on the card and in the lobby. */
  blurb: string;
  /** Who the crew member is and what it does: the start of its system prompt. */
  duty: string;
  makes: Makes;
  /** Other names a prompt can call it by. */
  aliases?: string[];
  model?: JobModel;
}

export interface SharedDoc {
  slug: string;
  file: string;
  /** Shown before the Scribe has written anything. */
  empty: string;
  /** The Scribe's instructions for this document. */
  scribe: string;
}

export interface Template {
  key: TemplateKey;
  name: string;
  /** One line in the lobby's picker. */
  description: string;
  roster: Job[];
  doc: SharedDoc;
  /** The setting, said to every crew member before the house style. */
  setting: string;
  /** The spoken part's cap, in sentences. */
  spokenCap: number;
  /** How many people may join (F14). */
  seats: 1 | 2;
  /** One sign-in shared by a teacher and a student, with a switch for who's speaking. */
  sharedSeat: boolean;
  /** Context packs every crew member reads, from the room's start. */
  defaultPacks: string[];
  /** Shown whenever the room opens, if set. */
  notice: string | null;
  /** The first line in a new room's transcript. */
  openingNote: string;
  /** /research, /analyze, /debate and friends. */
  slashCommands: boolean;
  /** Whether a declined request may go to another model (Part 9: off for students). */
  refusalFallback: boolean;
  /** Who leads a "Team" huddle (Phase 4). */
  teamLead: string | null;
  /** On screen / Off screen, and the things the crew makes (Parts 4 and 5). */
  bigScreen: boolean;
}

export const TEMPLATES: Record<TemplateKey, Template> = {
  deliberation,
  "game-studio": gameStudio,
};

export const TEMPLATE_ORDER: TemplateKey[] = ["deliberation", "game-studio"];

export function isTemplateKey(key: unknown): key is TemplateKey {
  return typeof key === "string" && key in TEMPLATES;
}

export function templateOf(key: string | null | undefined): Template {
  return isTemplateKey(key) ? TEMPLATES[key] : deliberation;
}

/** The job for a crew member key. A key a template doesn't know still gets a plain job. */
export function jobOf(template: Template, key: string): Job {
  return (
    template.roster.find((job) => job.key === key) ?? {
      key,
      name: key,
      station: "",
      accent: "var(--muted-foreground)",
      blurb: "",
      duty: `You are ${key}.`,
      makes: "text",
    }
  );
}
