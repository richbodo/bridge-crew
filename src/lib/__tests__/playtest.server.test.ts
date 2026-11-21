import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Playtest, resultOf } from "../playtest.server";

// A tiny game: → moves the square, Space beeps, every keydown of ↑ ticks, e throws, and a timer
// plays a sound every 1.5 s.
const GAME = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<canvas id="c" width="320" height="200"></canvas>
<script>
let x = 150;
const c = document.getElementById("c").getContext("2d");
function draw() {
  c.fillStyle = "#000"; c.fillRect(0, 0, 320, 200);
  c.fillStyle = "#fff"; c.fillRect(x, 90, 20, 20);
  requestAnimationFrame(draw);
}
draw();
addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") x += 10;
  if (e.key === " ") zzfx(...[1, 0, 220]);
  if (e.key === "ArrowUp") zzfx(...[0.2, 0, 440]);
  if (e.key === "e") throw new Error("the mole fell off the map");
});
setInterval(() => zzfx(...[0.5, 0, 880]), 1500);
</script></body></html>`;

describe("Playtest, in a headless browser", () => {
  let test: Playtest;
  beforeAll(async () => {
    test = await Playtest.open(
      GAME,
      new Map([
        ["[1,0,220]", "the sound “beep”"],
        ["[0.2,0,440]", "the sound “tick”"],
      ]),
    );
  }, 30_000);
  afterAll(async () => {
    await test?.close();
  });

  it("looks where the steps say, and once more at the end", async () => {
    const { looks } = await test.play([
      { do: "look", expect: "a square in the middle" },
      { do: "hold", key: "right", ms: 500 },
    ]);
    expect(looks.map((look) => look.did)).toEqual(["At the start", "Held → for 0.5 s"]);
    expect(looks[0]?.expect).toBe("a square in the middle");
    expect(looks[1]?.image).toMatch(/^data:image\/jpeg;base64,/);
  });

  it("hears what the game plays, and the game's time passes only during the steps", async () => {
    // Real time passes, and the game's timer doesn't fire.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const press = await test.play([{ do: "press", key: "Space" }]);
    expect(press.looks[0]?.heard).toEqual(["the sound “beep”"]);
    const wait = await test.play([{ do: "wait", ms: 3000 }]);
    expect(wait.looks[0]?.heard).toEqual(["a sound (2 times)"]);
  }, 20_000);

  it("repeats a held key, as a keyboard does", async () => {
    const { looks } = await test.play([{ do: "hold", key: "up", ms: 1000 }]);
    // Down, then a repeat every 50 ms after the first 500 ms.
    expect(looks[0]?.heard).toContain("the sound “tick” (11 times)");
  });

  it("notes the errors the game throws", async () => {
    const { looks } = await test.play([{ do: "press", key: "e" }]);
    expect(looks[0]?.errors[0]).toMatch(/^The game threw an error: .*fell off the map/);
  });
});

// A loop that takes about this long in Node, sized on this computer. Node runs the same JavaScript
// engine as Chromium, where the same loop in a frame takes about three times as long. The game's
// clock is faked, so a frame's work has to be a loop, not a wait.
function loopFor(ms: number): number {
  let n = 1e5;
  for (;;) {
    let sum = 0;
    const started = performance.now();
    for (let i = 0; i < n; i++) sum += i;
    const took = performance.now() - started;
    if (took > 5 || sum < 0) return Math.round((n * ms) / took);
    n *= 2;
  }
}
const FRAME_WORK = loopFor(10);

// Each frame takes about 30 ms, as a 3D scene drawn in software does. Space arms the game, and ↑
// beeps once it's armed. With stickAt, it loops forever once that much of its time has passed.
const heavy = (stickAt = 0) => `<!doctype html><html><head><meta charset="utf-8"></head><body>
<canvas id="c" width="320" height="200"></canvas>
<script>
let armed = false;
const c = document.getElementById("c").getContext("2d");
const start = performance.now();
function draw(t) {
  let sum = 0;
  for (let i = 0; i < ${FRAME_WORK}; i++) sum += i;
  c.fillStyle = sum < 0 || armed ? "#0a0" : "#a00"; c.fillRect(0, 0, 320, 200);
  if (${stickAt} && t - start > ${stickAt}) for (;;) {}
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
addEventListener("keydown", (e) => {
  if (e.key === " ") armed = true;
  if (e.key === "ArrowUp" && armed) zzfx(...[1, 0, 220]);
});
</script></body></html>`;

describe("Playtest, when the game is slow or stuck", () => {
  const beep = new Map([["[1,0,220]", "the sound “beep”"]]);

  it("stops a slow step at its limit with a look, and leaves the game where it was", async () => {
    const test = await Playtest.open(heavy(), beep, { limitMs: 3000 });
    try {
      const played = await test.play([
        { do: "press", key: "Space" },
        { do: "wait", ms: 10_000 },
        { do: "press", key: "up" },
      ]);
      expect(played.stuck).toBeNull();
      expect(played.slow).toMatch(/^The game drew slowly\. “Waited 10 s” ran out of time: only /);
      expect(played.looks).toHaveLength(1);
      expect(played.looks[0]?.did).toMatch(
        /^Pressed Space, then Waited 10 s, but the step ran out of time [\d.]+ s in$/,
      );
      // The rest of the steps didn't run, so nothing beeped.
      expect(played.looks[0]?.heard).toEqual([]);
      const said = resultOf(played).parts.map((part) => ("text" in part ? part.text : ""));
      expect(said.join("\n")).toMatch(/isn't stuck: it's paused where the last look shows it/);

      // The game wasn't started again: it's still armed.
      const next = await test.play([{ do: "press", key: "up" }]);
      expect(next.looks[0]?.heard).toEqual(["the sound “beep”"]);
    } finally {
      await test.close();
    }
  }, 30_000);

  it("says when a stuck game stopped, with the last picture before it", async () => {
    const test = await Playtest.open(heavy(300), beep, { limitMs: 3000, pictureEveryMs: 0 });
    try {
      const played = await test.play([{ do: "wait", ms: 6000 }]);
      expect(played.slow).toBeNull();
      expect(played.stuck).toMatch(
        /^The game stopped responding during “Waited 6 s”, [\d.]+ s into it\.$/,
      );
      expect(played.looks).toHaveLength(1);
      expect(played.looks[0]?.did).toMatch(
        /^Waited 6 s, until the game stopped responding [\d.]+ s in\. This is the screen [\d.]+ s in$/,
      );
      expect(played.looks[0]?.image).toMatch(/^data:image\/jpeg;base64,/);
      const said = resultOf(played).parts.map((part) => ("text" in part ? part.text : ""));
      expect(said.join("\n")).toMatch(/started again from the beginning\. That's a bug\.$/);
    } finally {
      await test.close();
    }
  }, 30_000);
});

it("says when a game stops responding as it starts, and the browser still opens", async () => {
  const test = await Playtest.open("<script>for (;;) {}</script>", new Map(), { limitMs: 1500 });
  try {
    const played = await test.play([{ do: "press", key: "Space" }]);
    expect(played.stuck).toBe("The game stopped responding during “Started the game”.");
    expect(played.looks).toEqual([]);
  } finally {
    await test.close();
  }
}, 30_000);
