import { formatFor } from "./made";
import type { Job, Template } from "./templates";

/**
 * What a crew member is told before a run: its system prompt, in parts
 * (docs/plans/tune-the-crew-2026-11-19.md). Its job and the crew-wide notes can be tuned; the
 * setting and the formats the app reads can't. Pure — no IO — so Tune the crew can show it.
 */

/** How every crew member works and replies. The app reads the SPOKEN/BRIEF shape. */
function houseRules(template: Template): string {
  return `You never interrupt. You do a piece of work, then hand back one short spoken read.
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

/** A crew member as one room reassigned it. */
export interface AgentProfile {
  name?: string | null;
  duty?: string | null;
}

/** What a crew member's instructions depend on in its room. */
export interface RoomKind {
  /** A Bigger room's games are folders (docs/plans/bigger-games-2026-11-16.md). */
  bigger?: boolean;
  /** Tune the crew's notes for every crew member in this kind of room. */
  notes?: string | null;
}

export type PartKey = "job" | "notes" | "setting" | "rules" | "made" | "ask";

export interface InstructionPart {
  key: PartKey;
  label: string;
  text: string;
  /** Changed on Tune the crew (the job, the notes), or fixed in the code. */
  editable: boolean;
}

/**
 * The job's paragraph, or the one a room reassigned it. A room duty that's exactly the card's
 * one-line description came from Reassign's old starting text, not a choice, so it's ignored.
 */
function roleFor(job: Job, profile?: AgentProfile): string {
  const name = profile?.name?.trim();
  const renamed = name && name !== job.name ? name : null;
  const goesBy = renamed ? `\nIn this room you go by the name ${renamed}.` : "";
  const duty = profile?.duty?.trim();
  if (!duty || duty === job.blurb.trim()) return job.duty + goesBy;
  return /^you are\b/i.test(duty) ? duty + goesBy : `You are ${renamed || job.name}. ${duty}`;
}

/** The parts of a crew member's instructions, in the order it reads them. */
export function instructionParts(
  template: Template,
  job: Job,
  profile?: AgentProfile,
  room: RoomKind = {},
): InstructionPart[] {
  const notes = room.notes?.trim();
  const made = formatFor(job.makes, { bigger: room.bigger ?? false });
  const parts: Array<InstructionPart | null> = [
    { key: "job", label: "Its job", text: roleFor(job, profile), editable: true },
    notes
      ? { key: "notes", label: "Notes for every crew member", text: notes, editable: true }
      : null,
    { key: "setting", label: "The setting", text: template.setting, editable: false },
    {
      key: "rules",
      label: "How every crew member works and replies",
      text: houseRules(template),
      editable: false,
    },
    made
      ? { key: "made", label: "How it hands over what it makes", text: made, editable: false }
      : null,
    template.crewProposals
      ? {
          key: "ask",
          label: "Suggesting another crew member",
          text: askFormat(template),
          editable: false,
        }
      : null,
  ];
  return parts.filter((part): part is InstructionPart => part !== null);
}

/** The system prompt: the parts, one after another. */
export function systemPromptFor(
  template: Template,
  job: Job,
  profile?: AgentProfile,
  room: RoomKind = {},
): string {
  return instructionParts(template, job, profile, room)
    .map((part) => part.text)
    .join("\n\n");
}
