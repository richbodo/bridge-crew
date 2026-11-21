/**
 * The Tester's play tool: what the Tester can do in the game, and how its steps are read.
 * src/lib/playtest.server.ts plays them in a headless browser. Pure — no IO.
 */

/** The game's screen in a playtest, in pixels. */
export const SCREEN = { width: 960, height: 720 } as const;
/** At most this many steps in one turn of play. */
export const MAX_STEPS = 30;
/** At most this many looks in one test, so its pictures stay a manageable size. */
export const MAX_LOOKS = 12;
/** The longest a step can hold a key or wait, in milliseconds. */
export const MAX_MS = 10_000;

export type Action = "press" | "hold" | "click" | "move" | "type" | "wait" | "look" | "restart";

const ACTIONS: readonly Action[] = [
  "press",
  "hold",
  "click",
  "move",
  "type",
  "wait",
  "look",
  "restart",
];

export interface PlayStep {
  do: Action;
  key?: string;
  ms?: number;
  x?: number;
  y?: number;
  text?: string;
  expect?: string;
}

export const PLAY_TOOL = {
  name: "play",
  description: `Play the current version of the game in a browser, the way a player would: press and hold keys, click, move the mouse, type, wait, and look at the screen. The steps run in order. Each look shows you a picture of the screen, with the sounds and music the game played and any errors since the look before. If the steps don't end with a look, one is added. The game is paused between your turns, so it only moves during your steps: take your time. If the game draws too slowly for a step to finish in time, the step stops early with a look, and the game waits there for your next turn. The screen is ${SCREEN.width} by ${SCREEN.height} pixels, and x and y count from its top left corner. restart starts the game again from the beginning.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      name: {
        type: "string",
        description: "A one-word name for this test, like arrows or jump.",
      },
      steps: {
        type: "array",
        maxItems: MAX_STEPS,
        items: {
          type: "object",
          properties: {
            do: { type: "string", enum: [...ACTIONS] },
            key: {
              type: "string",
              description:
                "For press and hold: ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Space, Enter, Escape, or a letter or digit.",
            },
            ms: {
              type: "integer",
              description: `For hold and wait: how long, in milliseconds, up to ${MAX_MS}.`,
            },
            x: { type: "integer", description: "For click and move: pixels from the left." },
            y: { type: "integer", description: "For click and move: pixels from the top." },
            text: { type: "string", description: "For type: the text to type." },
            expect: {
              type: "string",
              description: "For look: what should be on the screen now, in a few words.",
            },
          },
          required: ["do"],
        },
      },
    },
    required: ["name", "steps"],
  },
};

/** What the fixture Tester plays (src/lib/model.server.ts): the fixture game's mole moves with →. */
export const FIXTURE_PLAY = {
  name: "arrows",
  steps: [
    { do: "look", expect: "The mole in the middle of its tunnel" },
    { do: "hold", key: "ArrowRight", ms: 500 },
    { do: "look", expect: "The mole moved right" },
  ],
};

/** The play tool's input, checked: the test's name, and the steps it can play. */
export function playFrom(input: unknown): { name: string; steps: PlayStep[] } {
  const value = isRecord(input) ? input : {};
  const name = typeof value["name"] === "string" ? value["name"] : "";
  const steps = Array.isArray(value["steps"]) ? value["steps"] : [];
  return { name, steps: steps.flatMap(stepFrom).slice(0, MAX_STEPS) };
}

function stepFrom(raw: unknown): PlayStep[] {
  if (!isRecord(raw)) return [];
  const action = String(raw["do"] ?? "").toLowerCase() as Action;
  if (!ACTIONS.includes(action)) return [];
  const step: PlayStep = { do: action };
  const { key, ms, x, y, text, expect } = raw;
  if (typeof key === "string") step.key = key;
  if (typeof ms === "number" && Number.isFinite(ms)) step.ms = ms;
  if (typeof x === "number" && Number.isFinite(x)) step.x = x;
  if (typeof y === "number" && Number.isFinite(y)) step.y = y;
  if (typeof text === "string") step.text = text.slice(0, 40);
  if (typeof expect === "string") step.expect = expect.slice(0, 200);
  return [step];
}

const KEYS: Record<string, string> = {
  left: "ArrowLeft",
  right: "ArrowRight",
  up: "ArrowUp",
  down: "ArrowDown",
  arrowleft: "ArrowLeft",
  arrowright: "ArrowRight",
  arrowup: "ArrowUp",
  arrowdown: "ArrowDown",
  space: "Space",
  spacebar: "Space",
  enter: "Enter",
  return: "Enter",
  escape: "Escape",
  esc: "Escape",
  shift: "Shift",
  tab: "Tab",
  backspace: "Backspace",
};

/** A key as the browser names it ("left" → ArrowLeft, "W" → w), or null if it isn't one. */
export function keyFor(key: string | undefined): string | null {
  if (key === " ") return "Space";
  const typed = (key ?? "").trim();
  const named = KEYS[typed.toLowerCase().replace(/[\s_-]+/g, "")];
  if (named) return named;
  if (/^[a-z0-9]$/i.test(typed)) return typed.toLowerCase();
  return null;
}

const ARROWS: Record<string, string> = {
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓",
};

/** A key as the student would say it: →, Space, W. */
export function keyLabel(key: string): string {
  return ARROWS[key] ?? (key.length === 1 ? key.toUpperCase() : key);
}

/** 1000 → "1 s", 1500 → "1.5 s", 250 → "0.25 s". */
export function seconds(ms: number): string {
  return `${Number((ms / 1000).toFixed(2))} s`;
}

/** A number of milliseconds, kept between min and MAX_MS. */
export function duration(ms: number | undefined, fallback: number, min = 50): number {
  return Math.round(Math.min(Math.max(ms ?? fallback, min), MAX_MS));
}

/** A point on the screen, kept on it. */
export function pointOf(step: PlayStep): { x: number; y: number } {
  const clamp = (n: number | undefined, max: number) =>
    Math.round(Math.min(Math.max(n ?? max / 2, 0), max - 1));
  return { x: clamp(step.x, SCREEN.width), y: clamp(step.y, SCREEN.height) };
}

/** A step in words, as the Tester's looks say what it did: "Held → for 1 s". */
export function stepLabel(step: PlayStep): string {
  switch (step.do) {
    case "press":
    case "hold": {
      const key = keyFor(step.key);
      if (!key) return `Couldn't press “${step.key ?? ""}”, which isn't a key`;
      return step.do === "hold"
        ? `Held ${keyLabel(key)} for ${seconds(duration(step.ms, 500))}`
        : `Pressed ${keyLabel(key)}`;
    }
    case "click": {
      const { x, y } = pointOf(step);
      return `Clicked at ${x}, ${y}`;
    }
    case "move": {
      const { x, y } = pointOf(step);
      return `Moved the mouse to ${x}, ${y}`;
    }
    case "type":
      return `Typed “${step.text ?? ""}”`;
    case "wait":
      return `Waited ${seconds(duration(step.ms, 1000))}`;
    case "restart":
      return "Started the game again";
    case "look":
      return "Looked";
  }
}

/** Whether the browser's WebGL renderer draws in software, without the graphics chip. */
export function drawsInSoftware(renderer: string): boolean {
  return /swiftshader|llvmpipe|software/i.test(renderer);
}

/** A step that ran out of real time while the game still ran, but slowly. */
export interface SlowStep {
  label: string;
  /** The game's time that played, and the real time it took, in milliseconds. */
  ran: number;
  took: number;
  /** Whether the test browser draws in software (drawsInSoftware). */
  software: boolean;
}

/** What a slow step says, to the Tester and to try_game. */
export function slowNote({ label, ran, took, software }: SlowStep): string {
  const speed = Math.max(1, Math.round((ran / Math.max(took, 1)) * 100));
  return [
    `The game drew slowly. “${label}” ran out of time: only ${seconds(ran)} of the game's time played in ${seconds(took)}, about ${speed}% of real speed.`,
    software
      ? "This computer's test browser is drawing without the graphics chip, so the game is slower here than it will be for the player."
      : "The test browser draws with this computer's graphics chip, so the game may be slow for the player too.",
  ].join(" ");
}

/** What a stuck step says: which step, and how far into the game's time it got. */
export function stuckNote(label: string, ran: number): string {
  return `The game stopped responding during “${label}”${ran ? `, ${seconds(ran)} into it` : ""}.`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
