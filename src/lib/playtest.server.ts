import { chromium, type Browser, type BrowserContext, type Page } from "playwright-core";

import { prepareGame } from "./game-file";
import type { TestLook } from "./made";
import type { ToolResult } from "./model.server";
import {
  duration,
  keyFor,
  keyLabel,
  MAX_LOOKS,
  pointOf,
  SCREEN,
  seconds,
  type PlayStep,
} from "./playtest";

/**
 * The Tester's playtest (docs/plans/educational-context-2026-10-31.md Part 5): the current
 * version in a headless browser on this computer, played the way a player would. The game's
 * clock is paused, so it only moves during the Tester's steps, however long the Tester thinks
 * between them. Nothing reaches the network.
 */

/** The longest a step or a look can take before the game counts as stuck. */
const STEP_LIMIT_MS = 15_000;
/** A held key repeats as a keyboard's does: after half a second, twenty times a second. */
const REPEAT_AFTER_MS = 500;
const REPEAT_EVERY_MS = 50;

export interface Played {
  looks: TestLook[];
  /** The look limit was reached, so the rest of the steps weren't played. */
  full: boolean;
  /** The game stopped responding, so it was started again. */
  stuck: boolean;
}

export class Playtest {
  /** Every look so far: the test, as the room keeps it. */
  readonly looks: TestLook[] = [];
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private notes: string[] = [];
  private heard = 0;

  private constructor(
    private readonly browser: Browser,
    private readonly html: string,
    /** What the room calls the game's sounds and songs, by their JSON. */
    private readonly names: Map<string, string>,
  ) {}

  /** Opens the game in a headless browser. Throws if the browser isn't installed. */
  static async open(html: string, names: Map<string, string>): Promise<Playtest> {
    const browser = await chromium.launch();
    const test = new Playtest(browser, html, names);
    try {
      await test.restart();
    } catch (error) {
      await browser.close();
      throw error;
    }
    return test;
  }

  async close() {
    await this.browser.close().catch(() => undefined);
  }

  /** Plays the steps in order, looking where they say and once more at the end. */
  async play(steps: PlayStep[], onLook?: (look: TestLook) => void): Promise<Played> {
    const looks: TestLook[] = [];
    let did: string[] = [];
    const look = async (expect: string) => {
      const seen = await within(this.look(did, expect));
      looks.push(seen);
      this.looks.push(seen);
      onLook?.(seen);
      did = [];
    };
    try {
      for (const step of steps) {
        if (this.looks.length >= MAX_LOOKS) return { looks, full: true, stuck: false };
        if (step.do === "look") await look(step.expect ?? "");
        else did.push(await within(this.act(step)));
      }
      if ((did.length || !looks.length) && this.looks.length < MAX_LOOKS) await look("");
      return { looks, full: false, stuck: false };
    } catch (error) {
      console.error("playtest step failed", error);
      await within(this.restart()).catch(() => undefined);
      return { looks, full: false, stuck: true };
    }
  }

  /** The game from the start, in a fresh page. */
  private async restart() {
    await this.context?.close().catch(() => undefined);
    this.notes = [];
    this.heard = 0;
    const context = await this.browser.newContext({ viewport: SCREEN, acceptDownloads: false });
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
    await page.clock.install({ time: 0 });
    await page.setContent(prepareGame(this.html, { inRoom: false, listen: true }), {
      timeout: STEP_LIMIT_MS,
    });
    // From here on, the game's time passes only during the Tester's steps.
    const now = await page.evaluate(() => Date.now());
    await page.clock.pauseAt(now + 100);
    this.context = context;
    this.page = page;
  }

  /** One step, and what it did in words: "Held → for 1 s". */
  private async act(step: PlayStep): Promise<string> {
    const page = this.page;
    if (!page) throw new Error("The game isn't open.");
    const run = (ms: number) => page.clock.runFor(ms);
    switch (step.do) {
      case "press":
      case "hold": {
        const key = keyFor(step.key);
        if (!key) return `Couldn't press “${step.key ?? ""}”, which isn't a key`;
        // Even a press lasts a few frames, so a game that checks its keys each frame sees it.
        const ms = step.do === "hold" ? duration(step.ms, 500) : 100;
        await page.keyboard.down(key);
        let held = Math.min(ms, REPEAT_AFTER_MS);
        await run(held);
        while (held < ms) {
          // Pressing a key that's down already is a repeat, for games that move on each keydown.
          await page.keyboard.down(key);
          const next = Math.min(REPEAT_EVERY_MS, ms - held);
          await run(next);
          held += next;
        }
        await page.keyboard.up(key);
        await run(50);
        return step.do === "hold"
          ? `Held ${keyLabel(key)} for ${seconds(ms)}`
          : `Pressed ${keyLabel(key)}`;
      }
      case "click": {
        const { x, y } = pointOf(step);
        await page.mouse.move(x, y);
        await page.mouse.down();
        await run(80);
        await page.mouse.up();
        await run(50);
        return `Clicked at ${x}, ${y}`;
      }
      case "move": {
        const { x, y } = pointOf(step);
        await page.mouse.move(x, y, { steps: 5 });
        await run(50);
        return `Moved the mouse to ${x}, ${y}`;
      }
      case "type":
        await page.keyboard.type(step.text ?? "");
        await run(50);
        return `Typed “${step.text ?? ""}”`;
      case "wait": {
        const ms = duration(step.ms, 1000);
        await run(ms);
        return `Waited ${seconds(ms)}`;
      }
      case "restart":
        await this.restart();
        return "Started the game again";
      case "look":
        return "";
    }
  }

  /** A picture of the screen, with what the game played and said since the last look. */
  private async look(did: string[], expect: string): Promise<TestLook> {
    const page = this.page;
    if (!page) throw new Error("The game isn't open.");
    const jpeg = await page.screenshot({ type: "jpeg", quality: 70, timeout: STEP_LIMIT_MS });
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
export function resultOf({ looks, full, stuck }: Played): ToolResult {
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
  if (stuck) {
    parts.push({
      text: "The game stopped responding, perhaps stuck in a loop, so it was started again from the beginning. That's a bug.",
    });
  }
  return { parts };
}

/** A step or look, or the game counts as stuck: an endless loop never lets a step finish. */
function within<T>(work: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stuck = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("The game stopped responding.")), STEP_LIMIT_MS);
  });
  return Promise.race([work, stuck]).finally(() => clearTimeout(timer));
}
