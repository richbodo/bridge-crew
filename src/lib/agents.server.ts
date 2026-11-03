import { formatFor, splitMade, type MadeDraft } from "./made";
import { callModel } from "./model.server";
import type { Job, Template } from "./templates";

function houseStyle(template: Template): string {
  return `${template.setting}

You never interrupt. You do a piece of work, then hand back one short spoken read.
If the message contains a "Standing context — required reading" section, you MUST read it in
full and use it: prefer its specifics over your own recollection, cite the concrete details it
gives you, and say plainly when it does not cover something the task needs.
Write the SPOKEN section as plain speech: no bullet points, no headings, no markdown,
at most ${template.spokenCap} sentences, the way a colleague would say it out loud.
Write the BRIEF section as the full written detail, markdown allowed.
Respond in exactly this shape:

SPOKEN:
<the spoken read>

BRIEF:
<the full written brief>`;
}

export interface AgentResult {
  spokenRaw: string;
  brief: string;
  made: MadeDraft[];
}

export interface AgentProfile {
  name?: string | null;
  duty?: string | null;
}

/** The system prompt: the crew member's duty (or the one it was reassigned), then the house style. */
export function systemPromptFor(template: Template, job: Job, profile?: AgentProfile): string {
  const name = profile?.name?.trim();
  const duty = profile?.duty?.trim();
  const role = duty
    ? `You are ${name || job.name}. ${duty}`
    : name
      ? `${job.duty}\nIn this room you go by the name ${name}.`
      : job.duty;
  const made = formatFor(job.makes);
  return `${role}\n\n${houseStyle(template)}${made ? `\n\n${made}` : ""}`;
}

export async function runAgentBrief(
  template: Template,
  job: Job,
  brief: string,
  context: string,
  profile?: AgentProfile,
): Promise<AgentResult> {
  const raw = await callModel(
    [
      { role: "system", content: systemPromptFor(template, job, profile) },
      {
        role: "user",
        content: `${context || "## Session transcript\n\n(nothing yet)"}\n\n## Your task\n\n${brief}`,
      },
    ],
    "crew",
    { fallback: template.refusalFallback, ...job.model },
  );
  return parseAgentOutput(raw);
}

export function parseAgentOutput(raw: string): AgentResult {
  const { text, made } = splitMade(raw);
  const match = text.match(/SPOKEN:\s*([\s\S]*?)\n\s*BRIEF:\s*([\s\S]*)$/i);
  if (!match) return { spokenRaw: text, brief: text, made };
  return { spokenRaw: (match[1] ?? "").trim(), brief: (match[2] ?? "").trim(), made };
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
