import { chromium, type Browser, type BrowserContext, type Page } from "playwright-core";

import { prepareGame } from "./game-file";
import type { TestLook } from "./made";
import type { ToolResult } from "./model.server";
import {
  drawsInSoftware,
  duration,
  keyFor,
  MAX_LOOKS,
  pointOf,
  SCREEN,
  seconds,
  slowNote,
  stepLabel,
  stuckNote,
  type PlayStep,
} from "./playtest";

/**
 * The Tester's playtest (docs/plans/educational-context-2026-10-31.md Part 5): the current
 * version in a headless browser on this computer, played the way a player would. The game's
 * clock is paused, so it only moves during the Tester's steps, however long the Tester thinks
 * between them. Nothing reaches the network.
 *
 * Each step has STEP_LIMIT_MS of real time. Its game time runs a slice at a time, which tells a
 * slow game from a stuck one: a game that draws slowly keeps finishing slices, so its step stops
 * at the limit with a look and the game is left where it was; a slice that never finishes is an
 * endless loop, and the game starts again.
 */

/** The real time a step or a look has, in milliseconds. */
const STEP_LIMIT_MS = 15_000;
/** The game's time runs this many milliseconds at a go, about six frames. */
const SLICE_MS = 100;
/** A held key repeats as a keyboard's does: after half a second, twenty times a second. */
const REPEAT_AFTER_MS = 500;
const REPEAT_EVERY_MS = 50;

export interface Played {
  looks: TestLook[];
  /** The look limit was reached, so the rest of the steps weren't played. */
  full: boolean;
  /**
   * A step ran out of time with the game drawing slowly (slowNote). It stopped with a look, the
   * game was left where it was, and the rest of the steps weren't played.
   */
  slow: string | null;
  /** The game stopped responding (stuckNote), so it was started again. */
  stuck: string | null;
}

export interface PlaytestOptions {
  /** The real time a step or a look has. */
  limitMs?: number;
  /** How often a long step pictures the screen, in real time: a fifth of the limit. */
  pictureEveryMs?: number;
}

export class Playtest {
  /** Every look so far: the test, as the room keeps it. */
  readonly looks: TestLook[] = [];
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private notes: string[] = [];
  private heard = 0;
  /** Whether this browser draws in software, so games are slower here than for the player. */
  private software = false;

  private constructor(
    private readonly browser: Browser,
    private readonly html: string,
    /** What the room calls the game's sounds and songs, by their JSON. */
    private readonly names: Map<string, string>,
    private readonly limit: number,
    private readonly pictureEvery: number,
  ) {}

  /**
   * Opens the game in a headless browser. Throws if the browser isn't installed; a game that
   * doesn't start is found when it's played.
   */
  static async open(
    html: string,
    names: Map<string, string>,
    { limitMs = STEP_LIMIT_MS, pictureEveryMs = limitMs / 5 }: PlaytestOptions = {},
  ): Promise<Playtest> {
    const browser = await launch();
    const test = new Playtest(browser, html, names, limitMs, pictureEveryMs);
    test.software = drawsInSoftware(await rendererOf(browser).catch(() => ""));
    await within(test.restart(), limitMs).catch((error) => {
      console.error("the game didn't start", error);
    });
    return test;
  }

  async close() {
    await this.browser.close().catch(() => undefined);
  }

  /** Plays the steps in order, looking where they say and once more at the end. */
  async play(steps: PlayStep[], onLook?: (look: TestLook) => void): Promise<Played> {
    const looks: TestLook[] = [];
    let did: string[] = [];
    // The step being played, for when the game stops responding.
    let label = "";
    let clock: StepClock | null = null;
    const keep = (seen: TestLook) => {
      looks.push(seen);
      this.looks.push(seen);
      onLook?.(seen);
    };
    const look = async (expect: string) => {
      label = "Looked";
      clock = null;
      keep(await within(this.look(did, expect), this.limit));
      did = [];
    };
    const room = () => this.looks.length < MAX_LOOKS;
    try {
      if (!this.page) {
        label = "Started the game";
        await within(this.restart(), this.limit);
      }
      for (const step of steps) {
        if (!room()) return { looks, full: true, slow: null, stuck: null };
        if (step.do === "look") {
          await look(step.expect ?? "");
          continue;
        }
        label = stepLabel(step);
        clock = this.page ? new StepClock(this.page, this.limit, this.pictureEvery) : null;
        await this.act(step, clock);
        if (clock?.outOfTime) {
          const slow = { label, ran: clock.ran, took: clock.took, software: this.software };
          did.push(`${label}, but the step ran out of time ${seconds(slow.ran)} in`);
          if (room()) await look("");
          return { looks, full: false, slow: slowNote(slow), stuck: null };
        }
        did.push(label);
      }
      if ((did.length || !looks.length) && room()) await look("");
      return { looks, full: false, slow: null, stuck: null };
    } catch (error) {
      console.error("playtest step failed", error);
      const ran = clock?.ran ?? 0;
      // The page can't be pictured while it's stuck, so the last picture of the step stands in.
      if (clock?.glimpse && room()) {
        keep({
          did: `${[...did, label].join(", then ")}, until the game stopped responding ${seconds(ran)} in. This is the screen ${seconds(clock.glimpse.at)} in`,
          expect: "",
          image: clock.glimpse.image,
          heard: [],
          errors: this.notes.splice(0),
        });
      }
      // A game that didn't start is tried again at the next turn.
      if (this.page) await within(this.restart(), this.limit).catch(() => undefined);
      return { looks, full: false, slow: null, stuck: stuckNote(label || "Started the game", ran) };
    }
  }

  /** The game from the start, in a fresh page. */
  private async restart() {
    await this.context?.close().catch(() => undefined);
    this.context = null;
    this.page = null;
    this.notes = [];
    this.heard = 0;
    const context = await this.browser.newContext({ viewport: SCREEN, acceptDownloads: false });
    this.context = context;
    // The game's own policy blocks the network; this stops anything else it tries.
    await context.route("**/*", (route) => route.abort());
    const page = await context.newPage();
    const note = (line: string) => {
      if (this.notes.length < 5) this.notes.push(line.slice(0, 300));
    };
    page.on("pageerror", (error) => note(`The game threw an error: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") note(`The game logged an error: ${message.text()}`);
    });
    page.on("dialog", (dialog) => {
      note(`The game showed a message: ${dialog.message()}`);
      void dialog.dismiss().catch(() => undefined);
    });
    page.on("popup", (popup) => void popup.close().catch(() => undefined));
    // The game's time passes only during the Tester's steps, after a tenth of a second for the
    // game to set itself up and draw.
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(1000);
    await page.setContent(prepareGame(this.html, { inRoom: false, listen: true }), {
      timeout: this.limit,
    });
    await page.clock.runFor(100);
    this.page = page;
  }

  /** One step, its game time run on the step's clock. */
  private async act(step: PlayStep, clock: StepClock | null): Promise<void> {
    const page = this.page;
    if (!page || !clock) throw new Error("The game isn't open.");
    const run = (ms: number) => clock.run(ms);
    // The game's own key and mouse handlers run as the events arrive, so they could loop too.
    const input = (work: Promise<void>) => within(work, this.limit);
    switch (step.do) {
      case "press":
      case "hold": {
        const key = keyFor(step.key);
        if (!key) return;
        // Even a press lasts a few frames, so a game that checks its keys each frame sees it.
        const ms = step.do === "hold" ? duration(step.ms, 500) : 100;
        await input(page.keyboard.down(key));
        let held = Math.min(ms, REPEAT_AFTER_MS);
        await run(held);
        while (held < ms && !clock.outOfTime) {
          // Pressing a key that's down already is a repeat, for games that move on each keydown.
          await input(page.keyboard.down(key));
          const next = Math.min(REPEAT_EVERY_MS, ms - held);
          await run(next);
          held += next;
        }
        await input(page.keyboard.up(key));
        await run(50);
        return;
      }
      case "click": {
        const { x, y } = pointOf(step);
        await input(page.mouse.move(x, y));
        await input(page.mouse.down());
        await run(80);
        await input(page.mouse.up());
        await run(50);
        return;
      }
      case "move": {
        const { x, y } = pointOf(step);
        await input(page.mouse.move(x, y, { steps: 5 }));
        await run(50);
        return;
      }
      case "type":
        await input(page.keyboard.type(step.text ?? ""));
        await run(50);
        return;
      case "wait":
        await run(duration(step.ms, 1000));
        return;
      case "restart":
        await within(this.restart(), this.limit);
        return;
      case "look":
        return;
    }
  }

  /** A picture of the screen, with what the game played and said since the last look. */
  private async look(did: string[], expect: string): Promise<TestLook> {
    const page = this.page;
    if (!page) throw new Error("The game isn't open.");
    const jpeg = await page.screenshot({ type: "jpeg", quality: 70, timeout: this.limit });
    const calls = await page.evaluate(
      (from) => (globalThis as unknown as { __heard: Array<[string, string]> }).__heard.slice(from),
      this.heard,
    );
    this.heard += calls.length;
    return {
      did: did.join(", then ") || (this.looks.length ? "Looked again" : "At the start"),
      expect,
      image: `data:image/jpeg;base64,${jpeg.toString("base64")}`,
      heard: this.heardIn(calls),
      errors: this.notes.splice(0),
    };
  }

  /** Each sound once, in order, with how many times it played: "the sound “dig” (3 times)". */
  private heardIn(calls: Array<[string, string]>): string[] {
    const times = new Map<string, number>();
    for (const [name, args] of calls) {
      const sound = this.heardAs(name, args);
      times.set(sound, (times.get(sound) ?? 0) + 1);
    }
    return [...times].map(([sound, n]) => (n > 1 ? `${sound} (${n} times)` : sound));
  }

  private heardAs(name: string, args: string): string {
    if (name === "stopMusic") return "the music stopped";
    return this.names.get(args) ?? (name === "playMusic" ? "some music" : "a sound");
  }
}

/** What a turn of play shows the Tester: each look in words, then its picture. */
export function resultOf({ looks, full, slow, stuck }: Played): ToolResult {
  const parts: ToolResult["parts"] = looks.flatMap((look, i) => [
    {
      text: [
        `Look ${i + 1}, after: ${look.did}.`,
        look.expect ? `It should show: ${look.expect}` : "",
        `Heard: ${look.heard.length ? look.heard.join(", ") : "nothing"}.`,
        ...look.errors,
      ]
        .filter(Boolean)
        .join("\n"),
    },
    { jpeg: look.image.replace(/^data:image\/jpeg;base64,/, "") },
  ]);
  if (full) {
    parts.push({
      text: `That's the most looks one test can have (${MAX_LOOKS}), so the rest of the steps didn't run.`,
    });
  }
  if (slow) {
    parts.push({
      text: `${slow} The game isn't stuck: it's paused where the last look shows it, and the rest of the steps didn't run, so carry on from there in your next turn.`,
    });
  }
  if (stuck) {
    parts.push({
      text: `${stuck} It's perhaps stuck in a loop, so it was started again from the beginning. That's a bug.`,
    });
  }
  return { parts };
}

/**
 * One step's game time, run a slice at a time against the step's real time. A game that draws
 * slowly keeps finishing slices, so the step just runs out of time; a slice that never finishes
 * is a stuck game. While a step runs long, the clock keeps a picture of the screen now and then,
 * because a stuck page can't be pictured.
 */
class StepClock {
  private readonly started = Date.now();
  private pictured = this.started;
  /** The game's time that has played, in milliseconds. */
  ran = 0;
  /** The game's time the step asked for and didn't get. */
  private missed = 0;
  /** The latest picture of the screen, and how far into the step's game time it was taken. */
  glimpse: { image: string; at: number } | null = null;

  constructor(
    private readonly page: Page,
    private readonly limit: number,
    private readonly pictureEvery: number,
  ) {}

  /** Whether the step ran out of real time before its game time had all played. */
  get outOfTime(): boolean {
    return this.missed > 0;
  }

  /** The real time the step has taken. */
  get took(): number {
    return Date.now() - this.started;
  }

  async run(ms: number): Promise<void> {
    let left = ms;
    while (left > 0) {
      if (this.took >= this.limit) {
        this.missed += left;
        return;
      }
      if (Date.now() - this.pictured >= this.pictureEvery) await this.picture();
      const slice = Math.min(left, SLICE_MS);
      await within(this.page.clock.runFor(slice), this.limit);
      this.ran += slice;
      left -= slice;
    }
  }

  private async picture() {
    this.pictured = Date.now();
    const jpeg = await this.page
      .screenshot({ type: "jpeg", quality: 60, timeout: this.limit / 3 })
      .catch(() => null);
    if (jpeg)
      this.glimpse = { image: `data:image/jpeg;base64,${jpeg.toString("base64")}`, at: this.ran };
  }
}

/**
 * Full Chromium draws with the computer's graphics chip. Its slimmer headless shell, which
 * installs from before 2026-11-21 have instead, draws in software: ten times slower for a 3D game.
 */
async function launch(): Promise<Browser> {
  try {
    return await chromium.launch({ channel: "chromium" });
  } catch {
    return await chromium.launch();
  }
}

/** The browser's WebGL renderer, as it names itself, or "" without WebGL. */
async function rendererOf(browser: Browser): Promise<string> {
  const page = await browser.newPage();
  try {
    return await page.evaluate(() => {
      const gl = document.createElement("canvas").getContext("webgl");
      const info = gl?.getExtension("WEBGL_debug_renderer_info");
      return gl && info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    });
  } finally {
    await page.close();
  }
}

/** A step, slice or look, or the game counts as stuck: an endless loop never lets one finish. */
function within<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stuck = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("The game stopped responding.")), ms);
  });
  return Promise.race([work, stuck]).finally(() => clearTimeout(timer));
}
