import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Playtest } from "../playtest.server";

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
