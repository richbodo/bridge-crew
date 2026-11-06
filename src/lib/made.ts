import { musicSteps, noteFrequency } from "./music";
import type { Makes } from "./templates";

/**
 * What a run makes besides its contribution (docs/state_machines.md §8): the instructions
 * that ask for it, and the parser that finds it in the reply. Pure — no IO.
 */

export type MadeKind = "version" | "picture" | "sound" | "music" | "test";

export interface MadeDraft {
  kind: MadeKind;
  name: string;
  body: string;
}

const KIND_LABEL: Record<string, string> = { picture: "Picture", music: "Music", test: "Test" };

/** A made thing's name on screen: "Version 3", "Version 3: with gems", "Music: theme". */
export function labelOf(thing: { kind: string; name: string; version: number | null }): string {
  if (thing.kind === "version") {
    const number = thing.version ?? thing.name.replace(/^v/, "");
    const title = thing.name && !/^v\d+$/.test(thing.name) ? `: ${thing.name}` : "";
    return `Version ${number}${title}`;
  }
  return `${KIND_LABEL[thing.kind] ?? "Sound"}: ${thing.name}`;
}

/** One look in the Tester's playtest (src/lib/playtest.server.ts). */
export interface TestLook {
  /** What the Tester did before it looked: "Held → for 1 s, then pressed Space". */
  did: string;
  /** What should be on the screen, as the Tester wrote it. */
  expect: string;
  /** The screen, as a JPEG data URL. */
  image: string;
  /** The sounds and music the game played. */
  heard: string[];
  /** Errors the game threw, and messages it showed. */
  errors: string[];
}

/** A test: the Tester's looks at one version of the game. It's a made thing's body, as JSON. */
export interface TestRecord {
  version: number | null;
  looks: TestLook[];
}

/** A test's record, or an empty one if the body isn't one. */
export function testOf(body: string): TestRecord {
  try {
    const test = JSON.parse(body) as Partial<TestRecord>;
    return { version: test.version ?? null, looks: Array.isArray(test.looks) ? test.looks : [] };
  } catch {
    return { version: null, looks: [] };
  }
}

/** A test's steps in words, for the crew: "At the start; should: …. Held → for 1 s; …". */
export function testSteps(body: string): string {
  const test = testOf(body);
  const looks = test.looks.map((look) =>
    look.expect ? `${look.did}; should: ${look.expect}` : look.did,
  );
  return `${test.version ? `(on Version ${test.version}) ` : ""}${looks.join(". ")}`;
}

/** ZzFX's parameters, in order, so the Sound designer and Engineer know what each number is. */
export const ZZFX_PARAMETERS =
  "volume, randomness, frequency, attack, sustain, release, shape (0 sine, 1 triangle, 2 saw, 3 tan, 4 noise, 5 square), shapeCurve, slide, deltaSlide, pitchJump, pitchJumpTime, repeatTime, noise, modulation, bitCrush, delay, sustainVolume, decay, tremolo, filter";

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
- Music: paste a song listed under "The game so far" into the script as an object, and call
  playMusic(song). It plays over and over until stopMusic() or the next playMusic(...);
  playMusic(song, false) plays it once. Both are already defined on the page; don't define them.
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
  tests: `When there's a version of the game, you can play it yourself with the play tool, the way a
player would. Test it like this:
- Read the current version's code and game.md first, so you know the controls and what should
  happen.
- Play in small steps. Look after each thing you check, with what should be on the screen in
  "expect". Name the test in one word, like arrows or jump.
- Look closely at each picture, and say only what you saw in it.
- Then report what you did, what happened, and what should have happened. Something that broke
  is a bug: describe it so the Engineer can fix it, and suggest asking the Engineer.
- When it would help the student learn, give them one thing to try themselves, and say what
  should happen.
The student sees your pictures with your answer. To play tests the student kept again, follow
their steps under "The game so far".`,
  sound: `After the BRIEF, hand back up to three sound effects, one piece of music, or both. Sound
effects are ZzFX parameter lists:

SOUNDS:
\`\`\`json
{ "dig": [1, 0.05, 220, 0, 0.1, 0.2, 1], "gem": [1, 0, 800, 0.01, 0.05, 0.2, 0, 1, 10] }
\`\`\`

Each name is one word, and each list is the arguments for zzfx(...), in this order:
${ZZFX_PARAMETERS}. Keep the volume (the first number) at 1 or below.

Music is notes, played on instruments that are ZzFX parameter lists too:

MUSIC: <a one-word name, like theme>
\`\`\`json
{
  "tempo": 120,
  "instruments": {
    "lead": [0.5, 0, 440, 0.01, 0.1, 0.1, 5],
    "bass": [0.7, 0, 110, 0.01, 0.2, 0.1, 1],
    "drum": [0.8, 0, 90, 0, 0.02, 0.1, 4]
  },
  "tracks": {
    "lead": "C5 E5 G5 E5 | D5 F5 A5 -",
    "bass": "C3 .  C3 .  | D3 .  D3 . ",
    "drum": "x  .  x  .  | x  .  x  x "
  }
}
\`\`\`

Rules for music:
- The tempo is beats a minute, from 60 to 200.
- Each track plays on the instrument with the same name. A note's pitch replaces the
  instrument's frequency (the third number).
- In a track, each item is one step, half a beat long: a note, like C4, F#3 or Bb5; x, which
  plays the instrument at its own frequency (for drums); - to hold the note before it for
  another step; or . for a rest. A | marks a bar and takes no time.
- Up to four tracks of up to 128 steps. A shorter track repeats. The music loops, so make its
  end lead back to its start.`,
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

const MARKER = /\n\s*(FILE|PICTURE|SOUNDS|MUSIC):/;

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
  } else {
    // The Sound designer's: sound effects, music, or both, in either order.
    const sounds = section(tail, "SOUNDS");
    if (sounds) {
      try {
        const lists = JSON.parse(fenced(sounds, "json") ?? "") as Record<string, unknown>;
        for (const [name, params] of Object.entries(lists).slice(0, 3)) {
          if (!isParams(params)) continue;
          made.push({
            kind: "sound",
            name: cleanName(name, "sound"),
            body: JSON.stringify(capped(params)),
          });
        }
      } catch {
        // A malformed list makes nothing; the brief still has the description.
      }
    }
    const music = section(tail, "MUSIC");
    const song = music ? songFrom(fenced(music, "json")) : null;
    if (music && song) {
      const name = /^MUSIC:\s*([^\n`]*)/.exec(music)?.[1]?.trim() ?? "";
      made.push({ kind: "music", name: cleanName(name, "music"), body: JSON.stringify(song) });
    }
  }
  return { text, made };
}

/** One section of the tail, from its marker to the next marker or the end. */
function section(tail: string, marker: "SOUNDS" | "MUSIC"): string | null {
  const start = new RegExp(`(^|\\n)\\s*${marker}:`).exec(tail);
  if (!start) return null;
  const rest = tail.slice(start.index).trim();
  const end = rest.slice(marker.length).search(MARKER);
  return end < 0 ? rest : rest.slice(0, marker.length + end);
}

function isParams(params: unknown): params is Array<number | null> {
  return Array.isArray(params) && params.every((p) => p === null || typeof p === "number");
}

/** A ZzFX parameter list with its volume (the first number) at 1 or below. */
function capped(params: Array<number | null>): Array<number | null> {
  return params.map((p, i) => (i === 0 && typeof p === "number" ? Math.min(p, 1) : p));
}

/**
 * A song (src/lib/music.js), checked and tidied: the tempo in range, up to four tracks that
 * each have an instrument and at least one note, up to 128 steps each. Null if nothing's left.
 */
function songFrom(json: string | null) {
  try {
    const song = JSON.parse(json ?? "") as {
      tempo?: unknown;
      instruments?: unknown;
      tracks?: unknown;
    };
    if (!isRecord(song.instruments) || !isRecord(song.tracks)) return null;
    const instruments: Record<string, Array<number | null>> = {};
    const tracks: Record<string, string> = {};
    for (const [name, track] of Object.entries(song.tracks).slice(0, 4)) {
      const params = song.instruments[name];
      if (typeof track !== "string" || !isParams(params)) continue;
      const steps = musicSteps(track);
      if (!steps.some((step) => /^x$/i.test(step) || noteFrequency(step) !== undefined)) continue;
      const key = cleanName(name, "track");
      instruments[key] = capped(params);
      tracks[key] =
        steps.length > 128 ? steps.slice(0, 128).join(" ") : track.trim().replace(/\s+/g, " ");
    }
    if (!Object.keys(tracks).length) return null;
    const tempo =
      typeof song.tempo === "number" ? Math.round(Math.min(Math.max(song.tempo, 60), 200)) : 120;
    return { tempo, instruments, tracks };
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A made thing's name: lower case, letters, digits and spaces, at most 30 characters. */
export function cleanName(name: string, fallback: string): string {
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

const SECTION = /^\s*(FILE|PICTURE|SOUNDS|MUSIC|ASK|REMOVE):/;
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
