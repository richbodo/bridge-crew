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

/** The instructions for what this job hands back, if it makes something. */
export function formatFor(makes: Makes): string | null {
  return FORMATS[makes] ?? null;
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
