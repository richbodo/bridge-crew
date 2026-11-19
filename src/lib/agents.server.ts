import { splitExtras, splitMade, type AskDraft, type MadeDraft } from "./made";
import { callModel, callModelWithTools, type CrewTools } from "./model.server";
import type { Job, Template } from "./templates";

export interface AgentResult {
  spokenRaw: string;
  brief: string;
  made: MadeDraft[];
  /** A suggestion to ask a crew member (docs/state_machines.md §7). */
  ask: AskDraft | null;
  /** Numbers from "Made in this room" to remove if the hail is granted (§8). */
  removes: number[];
}

/**
 * One run's work: the brief, read with its context, and tools if the job has them (the Tester's
 * play, the Engineer's build tools). `instructions` is its system prompt (src/lib/instructions.ts).
 */
export async function runAgentBrief(
  template: Template,
  job: Job,
  instructions: string,
  brief: string,
  context: string,
  tools?: CrewTools,
): Promise<AgentResult> {
  const messages = [
    { role: "system" as const, content: instructions },
    {
      role: "user" as const,
      content: `${context || "## Session transcript\n\n(nothing yet)"}\n\n## Your task\n\n${brief}`,
    },
  ];
  const options = { fallback: template.refusalFallback, ...job.model };
  const raw = tools
    ? await callModelWithTools(messages, tools, "crew", options)
    : await callModel(messages, "crew", options);
  return parseAgentOutput(raw);
}

export function parseAgentOutput(raw: string): AgentResult {
  const { text: rest, ask, removes } = splitExtras(raw);
  const { text, made } = splitMade(rest);
  const match = text.match(/SPOKEN:\s*([\s\S]*?)\n\s*BRIEF:\s*([\s\S]*)$/i);
  if (!match) return { spokenRaw: text.trim(), brief: text.trim(), made, ask, removes };
  return { spokenRaw: (match[1] ?? "").trim(), brief: (match[2] ?? "").trim(), made, ask, removes };
}

/** The Scribe's update of a room's shared document (docs/state_machines.md §9). */
export async function writeSharedDoc(
  template: Template,
  material: string,
  current: string,
): Promise<string> {
  return callModel(
    [
      { role: "system", content: template.doc.scribe },
      {
        role: "user",
        content: `Current ${template.doc.file}:\n${current || "(empty)"}\n\nNew session material:\n${material}\n\nReturn the updated ${template.doc.file}.`,
      },
    ],
    "scribe",
    { fallback: template.refusalFallback },
  );
}

export type NameLookup = (agent: string) => string;

/** A crew member's name: the one it was given in this room, or its job's. */
export function makeNameLookup(
  rows: Array<{ agent: string; display_name?: string | null }> | null | undefined,
  template: Template,
): NameLookup {
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    const name = row.display_name?.trim();
    if (name) map.set(row.agent, name);
  }
  return (agent) =>
    map.get(agent) ?? template.roster.find((job) => job.key === agent)?.name ?? agent;
}
