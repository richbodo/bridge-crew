import { describe, expect, it } from "vitest";

import {
  duration,
  keyFor,
  keyLabel,
  MAX_STEPS,
  playFrom,
  pointOf,
  SCREEN,
  seconds,
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
