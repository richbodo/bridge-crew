import { describe, expect, it } from "vitest";

import {
  drawsInSoftware,
  duration,
  keyFor,
  keyLabel,
  MAX_STEPS,
  playFrom,
  pointOf,
  SCREEN,
  seconds,
  slowNote,
  stepLabel,
  stuckNote,
} from "../playtest";

describe("keyFor", () => {
  it("names keys the way the browser does", () => {
    expect(keyFor("left")).toBe("ArrowLeft");
    expect(keyFor("Arrow Up")).toBe("ArrowUp");
    expect(keyFor(" ")).toBe("Space");
    expect(keyFor("space bar")).toBe("Space");
    expect(keyFor("Enter")).toBe("Enter");
    expect(keyFor("W")).toBe("w");
  });

  it("has nothing for what isn't a key", () => {
    for (const key of ["jump", "", undefined]) expect(keyFor(key)).toBeNull();
  });
});

describe("playFrom", () => {
  it("keeps the steps it can play, and drops the rest", () => {
    const { name, steps } = playFrom({
      name: "jump",
      steps: [
        { do: "Hold", key: "up", ms: 800 },
        { do: "fly" },
        "look",
        { do: "look", expect: "x".repeat(300) },
      ],
    });
    expect(name).toBe("jump");
    expect(steps).toEqual([
      { do: "hold", key: "up", ms: 800 },
      { do: "look", expect: "x".repeat(200) },
    ]);
  });

  it("plays at most MAX_STEPS steps, and reads nonsense as none", () => {
    expect(playFrom({ steps: Array(50).fill({ do: "wait" }) }).steps).toHaveLength(MAX_STEPS);
    expect(playFrom("go")).toEqual({ name: "", steps: [] });
    expect(playFrom(null)).toEqual({ name: "", steps: [] });
  });
});

describe("step sizes", () => {
  it("keeps times and points in range", () => {
    expect(duration(undefined, 500)).toBe(500);
    expect(duration(60_000, 500)).toBe(10_000);
    expect(duration(1, 500)).toBe(50);
    expect(pointOf({ do: "click", x: -5, y: 5000 })).toEqual({ x: 0, y: SCREEN.height - 1 });
    expect(pointOf({ do: "click" })).toEqual({ x: SCREEN.width / 2, y: SCREEN.height / 2 });
  });

  it("says them as a student would", () => {
    expect(seconds(1500)).toBe("1.5 s");
    expect(seconds(250)).toBe("0.25 s");
    expect(keyLabel("ArrowUp")).toBe("↑");
    expect(keyLabel("w")).toBe("W");
    expect(keyLabel("Space")).toBe("Space");
  });
});

describe("what a step says", () => {
  it("says each step as its look does", () => {
    expect(stepLabel({ do: "hold", key: "right", ms: 1000 })).toBe("Held → for 1 s");
    expect(stepLabel({ do: "press", key: "space" })).toBe("Pressed Space");
    expect(stepLabel({ do: "press", key: "jump" })).toBe(
      "Couldn't press “jump”, which isn't a key",
    );
    expect(stepLabel({ do: "wait", ms: 6000 })).toBe("Waited 6 s");
    expect(stepLabel({ do: "click", x: 10, y: 20 })).toBe("Clicked at 10, 20");
    expect(stepLabel({ do: "restart" })).toBe("Started the game again");
  });

  it("tells a slow game from a stuck one, and says whether the test browser is to blame", () => {
    const slow = { label: "Waited 6 s", ran: 2800, took: 15_000 };
    expect(slowNote({ ...slow, software: true })).toBe(
      "The game drew slowly. “Waited 6 s” ran out of time: only 2.8 s of the game's time played in 15 s, about 19% of real speed. This computer's test browser is drawing without the graphics chip, so the game is slower here than it will be for the player.",
    );
    expect(slowNote({ ...slow, software: false })).toMatch(/may be slow for the player too\.$/);
    expect(stuckNote("Waited 6 s", 2300)).toBe(
      "The game stopped responding during “Waited 6 s”, 2.3 s into it.",
    );
    expect(stuckNote("Looked", 0)).toBe("The game stopped responding during “Looked”.");
  });

  it("knows a browser that draws in software", () => {
    expect(drawsInSoftware("ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0)))")).toBe(
      true,
    );
    expect(drawsInSoftware("ANGLE (Apple, ANGLE Metal Renderer: Apple M1 Max)")).toBe(false);
    expect(drawsInSoftware("")).toBe(false);
  });
});
