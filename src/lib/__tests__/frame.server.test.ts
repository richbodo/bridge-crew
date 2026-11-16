import { chromium, type Browser, type Page } from "playwright-core";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { bundleGame } from "../bundle";
import { prepareGame, RELOAD_MESSAGE, SAVES_MESSAGE } from "../game-file";
import { shelfFile } from "../shelf.server";

/**
 * The frame a game runs in (docs/plans/bigger-games-2026-11-16.md Part 2), in a real browser:
 * the room's sandboxed frame has no storage of its own, so the room gives it some; every sound
 * passes the limiter; a crash names its file and line; and the shelf's Three.js draws.
 */

let browser: Browser;
beforeAll(async () => {
  browser = await chromium.launch();
}, 30_000);
afterAll(async () => {
  await browser?.close();
});

/** A page holding the game in a frame sandboxed as the room's is, which keeps what the frame sends. */
async function inRoomFrame(game: string): Promise<Page> {
  const page = await browser.newPage();
  const srcdoc = game.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  await page.setContent(`<!doctype html><body><script>
    window.sent = [];
    addEventListener("message", (e) => window.sent.push(e.data));
  </script><iframe sandbox="allow-scripts allow-pointer-lock" style="width:400px;height:300px" srcdoc="${srcdoc}"></iframe></body>`);
  await page.frames()[1]!.waitForLoadState("load");
  return page;
}

const sent = (page: Page) => page.evaluate(() => (window as unknown as { sent: unknown[] }).sent);

describe("the room's frame", () => {
  it("gives the game storage, starting from the room's saves, and sends every change to the room", async () => {
    const game = prepareGame(
      `<html><head></head><body><script>
        const visits = Number(localStorage.getItem("visits") || 0) + 1;
        localStorage.setItem("visits", String(visits));
        localStorage.best = "12";
        document.body.dataset.visits = visits + "," + localStorage.length + "," + sessionStorage.getItem("x");
      </script></body></html>`,
      { inRoom: true, saves: { visits: "4" } },
    );
    const page = await inRoomFrame(game);
    const frame = page.frames()[1]!;
    await expect.poll(() => frame.evaluate(() => document.body.dataset["visits"])).toBe("5,2,null");
    const saves = (await sent(page)).filter((m) => (m as { type?: string }).type === SAVES_MESSAGE);
    expect(saves.at(-1)).toEqual({ type: SAVES_MESSAGE, saves: { visits: "5", best: "12" } });
    await page.close();
  });

  it("tells the room when the game reloads itself, so the room can reload it with its saves", async () => {
    const page = await inRoomFrame(
      prepareGame("<html><head></head><body></body></html>", { inRoom: true }),
    );
    await page.frames()[1]!.evaluate(() => location.reload());
    await expect
      .poll(async () =>
        (await sent(page)).some((m) => (m as { type?: string }).type === RELOAD_MESSAGE),
      )
      .toBe(true);
    await page.close();
  });

  it("names the file and line of a crash in a game folder", async () => {
    const { html } = bundleGame(
      {
        "index.html":
          '<html><head></head><body><script src="js/config.js"></script><script src="js/mole.js"></script></body></html>',
        "js/config.js": "const CONFIG = {};",
        "js/mole.js": "function dig() {\n  CONFIG.holes.push(1);\n}\ndig();",
      },
      shelfFile,
    );
    const page = await inRoomFrame(prepareGame(html, { inRoom: true }));
    await expect
      .poll(async () =>
        (await sent(page)).find((m) => (m as { type?: string }).type === "bridge-crew-crash"),
      )
      .toEqual({
        type: "bridge-crew-crash",
        message: expect.stringMatching(
          /Cannot read properties of undefined.*\(in js\/mole\.js, line 2\)$/,
        ),
      });
    await page.close();
  });

  it("sends every sound through the limiter, ZzFX's too", async () => {
    const page = await inRoomFrame(
      prepareGame("<html><head></head><body></body></html>", { inRoom: true }),
    );
    const frame = page.frames()[1]!;
    const nodes = await frame.evaluate(() => {
      const context = new AudioContext();
      const zzfx = (globalThis as unknown as { ZZFX: { audioContext: AudioContext } }).ZZFX
        .audioContext;
      return [
        context.destination.constructor.name,
        zzfx.destination.constructor.name,
        context instanceof AudioContext,
      ];
    });
    expect(nodes).toEqual(["GainNode", "GainNode", true]);
    await page.close();
  });
});

describe("the shelf", () => {
  it("has Three.js r180 with its add-ons, and it draws in the Tester's browser", async () => {
    const { html } = bundleGame(
      {
        "index.html": `<html><head></head><body><script src="studio/three.js"></script><script>
          const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
          renderer.setSize(64, 64);
          document.body.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xff0000);
          renderer.render(scene, new THREE.PerspectiveCamera());
          document.body.dataset.three = [THREE.REVISION, typeof THREE.OrbitControls, typeof THREE.UnrealBloomPass].join(",");
        </script></body></html>`,
      },
      shelfFile,
    );
    const page = await browser.newPage();
    await page.setContent(prepareGame(html, { inRoom: false }));
    expect(await page.evaluate(() => document.body.dataset["three"])).toBe("180,function,function");
    const pixel = await page.evaluate(() => {
      const canvas = document.querySelector("canvas")!;
      const copy = document.createElement("canvas");
      copy.width = copy.height = 1;
      const context = copy.getContext("2d")!;
      context.drawImage(canvas, 32, 32, 1, 1, 0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data];
    });
    expect(pixel[0]).toBeGreaterThan(200);
    await page.close();
  });

  it("has its fonts as data, which the content policy allows", () => {
    expect(shelfFile("studio/fonts/vt323.css")).toMatch(
      /^\/\*! VT323: .*Open Font License[\s\S]*src:url\(data:font\/woff2;base64,/,
    );
  });
});
