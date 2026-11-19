import type { Template } from "./templates";

/**
 * Tune the crew (docs/plans/tune-the-crew-2026-11-19.md): changes to what the crew is told, for
 * every room of a kind on this computer, kept in the `crew_tuning` table. Pure — no IO.
 */

export interface Tuning {
  /** Job key → the job's paragraph in place of the original. */
  duties: Record<string, string>;
  /** Said to every crew member, after its job. */
  notes: string | null;
  /** The Scribe's instructions for the shared document, in place of the original. */
  doc: string | null;
}

export const NO_TUNING: Tuning = { duties: {}, notes: null, doc: null };

/** The longest a part may be, in characters (the table checks it too). */
export const TUNING_LIMIT = 4000;

export interface TuningRow {
  part: string;
  body: string;
}

export const dutyPart = (job: string) => `duty:${job}`;

export function tuningFromRows(rows: ReadonlyArray<TuningRow> | null | undefined): Tuning {
  const tuning: Tuning = { duties: {}, notes: null, doc: null };
  for (const { part, body } of rows ?? []) {
    if (part === "notes") tuning.notes = body;
    else if (part === "doc") tuning.doc = body;
    else if (part.startsWith("duty:")) tuning.duties[part.slice(5)] = body;
  }
  return tuning;
}

/** The template as tuned: each job's paragraph and the Scribe's instructions. */
export function applyTuning(template: Template, tuning: Tuning): Template {
  if (!Object.keys(tuning.duties).length && !tuning.doc) return template;
  return {
    ...template,
    roster: template.roster.map((job) =>
      tuning.duties[job.key] ? { ...job, duty: tuning.duties[job.key]! } : job,
    ),
    doc: tuning.doc ? { ...template.doc, scribe: tuning.doc } : template.doc,
  };
}

/**
 * Text as it will be kept: trimmed, null when empty or the same as the original, so saving the
 * original takes the tuning away.
 */
export function cleanPart(text: string, original: string | null): string | null {
  const trimmed = text.replace(/\r\n/g, "\n").trim();
  if (!trimmed || trimmed === original?.trim()) return null;
  if (trimmed.length > TUNING_LIMIT) {
    throw new Error(`That's ${trimmed.length} characters; the most is ${TUNING_LIMIT}.`);
  }
  return trimmed;
}

/** What's tuned, by name: "Storyteller", "Notes for every crew member", "The Scribe". */
export function tunedNames(template: Template, tuning: Tuning): string[] {
  return [
    ...template.roster.filter((job) => tuning.duties[job.key]).map((job) => job.name),
    ...(tuning.notes ? ["Notes for every crew member"] : []),
    ...(tuning.doc ? [`The Scribe's ${template.doc.file}`] : []),
  ];
}

const FILE_FORMAT = 1;

interface TuningFile {
  bridgeCrewTuning: number;
  kind: string;
  exported?: string;
  notes?: string;
  scribe?: string;
  crew?: Record<string, string>;
}

/** The tuning as a file to take to another computer: only what differs from the original. */
export function exportTuning(template: Template, tuning: Tuning, now: Date): string {
  const file: TuningFile = {
    bridgeCrewTuning: FILE_FORMAT,
    kind: template.key,
    exported: now.toISOString(),
    ...(tuning.notes ? { notes: tuning.notes } : {}),
    ...(tuning.doc ? { scribe: tuning.doc } : {}),
    crew: Object.fromEntries(
      template.roster
        .filter((job) => tuning.duties[job.key])
        .map((job) => [job.key, tuning.duties[job.key]!]),
    ),
  };
  return `${JSON.stringify(file, null, 2)}\n`;
}

export interface Imported {
  tuning: Tuning;
  /** Jobs the file names that this kind of room doesn't have. */
  skipped: string[];
}

/** Reads an exported file. Throws, saying what's wrong, when it isn't one for this kind of room. */
export function importTuning(template: Template, text: string): Imported {
  let file: TuningFile;
  try {
    file = JSON.parse(text) as TuningFile;
  } catch {
    throw new Error("That isn't a tuning file: it isn't JSON.");
  }
  if (!file || typeof file !== "object" || file.bridgeCrewTuning !== FILE_FORMAT) {
    throw new Error("That isn't a tuning file exported from Tune the crew.");
  }
  if (file.kind !== template.key) {
    throw new Error(`That file tunes a ${file.kind} room, not a ${template.name} room.`);
  }
  const part = (value: unknown, what: string): string | null => {
    if (value === undefined || value === null) return null;
    if (typeof value !== "string") throw new Error(`In that file, ${what} isn't text.`);
    const trimmed = value.trim();
    if (trimmed.length > TUNING_LIMIT) {
      throw new Error(`In that file, ${what} is longer than ${TUNING_LIMIT} characters.`);
    }
    return trimmed || null;
  };
  const tuning: Tuning = {
    duties: {},
    notes: part(file.notes, "the notes"),
    doc: part(file.scribe, "the Scribe's instructions"),
  };
  const skipped: string[] = [];
  for (const [key, value] of Object.entries(file.crew ?? {})) {
    const job = template.roster.find((j) => j.key === key);
    if (!job) {
      skipped.push(key);
      continue;
    }
    const duty = part(value, `the ${job.name}'s job`);
    if (duty && duty !== job.duty.trim()) tuning.duties[key] = duty;
  }
  if (tuning.doc === template.doc.scribe.trim()) tuning.doc = null;
  return { tuning, skipped };
}
