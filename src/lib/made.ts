import type { Makes } from "./templates";

/**
 * What a run makes besides its contribution (docs/state_machines.md §8): the instructions
 * that ask for it, and the parser that finds it in the reply. Pure — no IO.
 */

export type MadeKind = "version" | "picture" | "sound";

export interface MadeDraft {
  kind: MadeKind;
  name: string;
  body: string;
}

/** A made thing's name on screen: "Version 3", "Version 3: with gems", "Picture: mole". */
export function labelOf(thing: { kind: string; name: string; version: number | null }): string {
  if (thing.kind === "version") {
    const number = thing.version ?? thing.name.replace(/^v/, "");
    const title = thing.name && !/^v\d+$/.test(thing.name) ? `: ${thing.name}` : "";
    return `Version ${number}${title}`;
  }
  return `${thing.kind === "picture" ? "Picture" : "Sound"}: ${thing.name}`;
}

/** ZzFX's parameters, in order, so the Sound designer and Engineer know what each number is. */
export const ZZFX_PARAMETERS =
  "volume, randomness, frequency, attack, sustain, release, shape (0 sine, 1 triangle, 2 saw, 3 tan, 4 noise), shapeCurve, slide, deltaSlide, pitchJump, pitchJumpTime, repeatTime, noise, modulation, bitCrush, delay, sustainVolume, decay, tremolo, filter";

const FORMATS: Partial<Record<Makes, string>> = {
  version: `After the BRIEF, hand back the whole game as one HTML file:

FILE:
\`\`\`html
<!doctype html>
...
\`\`\`

Rules for the file:
- One self-contained HTML file: inline <style> and <script>, nothing loaded from anywhere else,
  and no network requests.
- Start from the current version under "The game so far", if there is one, and change only what
  you were asked to. Return the complete file, never a fragment.
- Pictures: inline the SVG of the pictures listed under "The game so far", or draw with canvas.
- Sounds: call zzfx(...) with the parameter lists listed under "The game so far". zzfx is
  already defined on the page; don't define it.
- Controls: arrow keys and the space bar, and mouse clicks. Show the controls on screen, keep a
  score, and give a way to restart.
- No sound before the player presses a key or clicks, and nothing that flashes.
- In SPOKEN, say in a few sentences what changed.`,
  picture: `After the BRIEF, hand back one picture as SVG, with a short name:

PICTURE: <a one-word name, like mole>
\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">...</svg>
\`\`\`

Rules for the picture: one standalone SVG with a viewBox; simple flat shapes; no scripts, no
links, no images or fonts from anywhere else, and no text unless asked; under 20 KB.`,
  sound: `After the BRIEF, hand back up to three sound effects as ZzFX parameter lists:

SOUNDS:
\`\`\`json
{ "dig": [1, 0.05, 220, 0, 0.1, 0.2, 1], "gem": [1, 0, 800, 0.01, 0.05, 0.2, 0, 1, 10] }
\`\`\`

Each name is one word, and each list is the arguments for zzfx(...), in this order:
${ZZFX_PARAMETERS}. Keep the volume (the first number) at 1 or below.`,
};

/** Removing what you made, when the student asks (§8). Only for jobs that make things. */
const TIDY = `If the student asks you to remove things you made that aren't needed any more, list
them by their numbers under "Made in this room", after the BRIEF:

REMOVE: #2, #5

Only things you made. The current version can't be removed. Nothing is removed until the
student grants you the floor, so say in SPOKEN what you'll remove.`;

/** The instructions for what this job hands back, if it makes something. */
export function formatFor(makes: Makes): string | null {
  const format = FORMATS[makes];
  return format ? `${format}\n\n${TIDY}` : null;
}

const MARKER = /\n\s*(FILE|PICTURE|SOUNDS):/;

function fenced(text: string, lang: string): string | null {
  const match = new RegExp("```(?:" + lang + ")?\\s*\\n([\\s\\S]*?)```", "i").exec(text);
  return match?.[1]?.trim() ?? null;
}

/** Splits a reply into its SPOKEN/BRIEF text and anything it made. */
export function splitMade(raw: string): { text: string; made: MadeDraft[] } {
  const at = raw.search(MARKER);
  if (at < 0) return { text: raw, made: [] };
  const text = raw.slice(0, at);
  const tail = raw.slice(at).trim();
  const made: MadeDraft[] = [];

  if (tail.startsWith("FILE:")) {
    const html = fenced(tail, "html");
    if (html && /<(html|body|script|canvas|div)\b/i.test(html)) {
      made.push({ kind: "version", name: "", body: html });
    }
  } else if (tail.startsWith("PICTURE:")) {
    const name = /^PICTURE:\s*([^\n`]*)/.exec(tail)?.[1]?.trim() ?? "";
    const svg = fenced(tail, "svg|xml");
    if (svg && /^<svg\b/i.test(svg) && svg.length < 100_000 && !/<script\b/i.test(svg)) {
      made.push({ kind: "picture", name: cleanName(name, "picture"), body: svg });
    }
  } else if (tail.startsWith("SOUNDS:")) {
    const json = fenced(tail, "json");
    try {
      const sounds = JSON.parse(json ?? "") as Record<string, unknown>;
      for (const [name, params] of Object.entries(sounds).slice(0, 3)) {
        if (!Array.isArray(params) || !params.every((p) => p === null || typeof p === "number")) {
          continue;
        }
        const safe = params.map((p, i) => (i === 0 && typeof p === "number" ? Math.min(p, 1) : p));
        made.push({ kind: "sound", name: cleanName(name, "sound"), body: JSON.stringify(safe) });
      }
    } catch {
      // A malformed list makes nothing; the brief still has the description.
    }
  }
  return { text, made };
}

function cleanName(name: string, fallback: string): string {
  const clean = name
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]/gu, "")
    .trim()
    .slice(0, 30);
  return clean || fallback;
}

/** A crew member's suggestion to ask a crew member (§7), as its reply wrote it. */
export interface AskDraft {
  /** The job, as the reply named it: "Sound designer". */
  name: string;
  /** What to ask, written to that crew member. */
  task: string;
}

const SECTION = /^\s*(FILE|PICTURE|SOUNDS|ASK|REMOVE):/;
const FENCE = /^\s*```/;

/**
 * Takes the ASK and REMOVE sections out of a reply, and leaves the rest for splitMade. Lines
 * inside code fences are skipped, so a game's code is never read as one. ASK is a job on its
 * own line or before a colon, then the task; REMOVE lists numbers from "Made in this room".
 */
export function splitExtras(raw: string): {
  text: string;
  ask: AskDraft | null;
  removes: number[];
} {
  const lines = raw.split("\n");
  const kept: string[] = [];
  const removes: number[] = [];
  let ask: AskDraft | null = null;
  let fenced = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (FENCE.test(line)) fenced = !fenced;
    if (fenced || FENCE.test(line)) {
      kept.push(line);
      continue;
    }
    const asking = /^\s*ASK:\s*(.*)$/.exec(line);
    if (asking) {
      const rest: string[] = [];
      while (i + 1 < lines.length) {
        const next = lines[i + 1] ?? "";
        if (!next.trim() || SECTION.test(next) || FENCE.test(next)) break;
        rest.push(next.trim());
        i++;
      }
      ask ??= toAsk(asking[1] ?? "", rest.join(" "));
      continue;
    }
    const removing = /^\s*REMOVE:\s*(.*)$/.exec(line);
    if (removing) {
      // "#2, #5"; bare numbers only when there are no #s, so "Version 2 (#5)" means #5.
      const list = removing[1] ?? "";
      for (const match of list.matchAll(list.includes("#") ? /#(\d+)/g : /\b(\d+)\b/g)) {
        const number = Number(match[1]);
        if (number > 0 && !removes.includes(number)) removes.push(number);
      }
      continue;
    }
    kept.push(line);
  }
  return { text: kept.join("\n"), ask, removes: removes.slice(0, 20) };
}

function toAsk(head: string, rest: string): AskDraft | null {
  let name = head.trim();
  let task = rest.trim();
  if (!task) {
    // All on one line: "ASK: Sound designer: make a crunchy sound".
    const split = /^(.{1,40}?)\s*(?::|—|–|\s-\s|,)\s*(.+)$/.exec(name);
    if (!split) return null;
    name = split[1] ?? "";
    task = split[2] ?? "";
  }
  name = name
    .replace(/^(?:the|our)\s+/i, "")
    .replace(/[.:,;—–-]+$/, "")
    .trim();
  task = task.slice(0, 600).trim();
  return name && task ? { name, task } : null;
}
