import { formatFor, splitExtras, splitMade, type AskDraft, type MadeDraft } from "./made";
import { callModel, callModelWithTool, type CrewTool } from "./model.server";
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
  /** A suggestion to ask a crew member (docs/state_machines.md §7). */
  ask: AskDraft | null;
  /** Numbers from "Made in this room" to remove if the hail is granted (§8). */
  removes: number[];
}

/** How a crew member suggests asking a crew member, in rooms that allow it (§7). */
function askFormat(template: Template): string {
  const jobs = template.roster.map((job) => job.name).join(", ");
  return `You can't start another crew member's work, but you can suggest it. When the student asks
you to get something from another crew member, or another job should do the next step, add
one suggestion after the BRIEF:

ASK: <one job: ${jobs}>
<what to ask them, in one or two sentences, written to them>

The student sees it after you speak, and says Yes or No thanks. Make at most one, and leave it
out when nobody else is needed. Say in SPOKEN who you'd like to ask, and why.`;
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
  const extras = [formatFor(job.makes), template.crewProposals ? askFormat(template) : null];
  return [role, houseStyle(template), ...extras.filter(Boolean)].join("\n\n");
}

/** One run's work: the brief, read with its context, and a tool if the job has one (the Tester's play). */
export async function runAgentBrief(
  template: Template,
  job: Job,
  brief: string,
  context: string,
  profile?: AgentProfile,
  tool?: CrewTool,
): Promise<AgentResult> {
  const messages = [
    { role: "system" as const, content: systemPromptFor(template, job, profile) },
    {
      role: "user" as const,
      content: `${context || "## Session transcript\n\n(nothing yet)"}\n\n## Your task\n\n${brief}`,
    },
  ];
  const options = { fallback: template.refusalFallback, ...job.model };
  const raw = tool
    ? await callModelWithTool(messages, tool, "crew", options)
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
