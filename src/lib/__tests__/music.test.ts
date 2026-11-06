import { describe, expect, it } from "vitest";

import { musicSamples, musicSteps, noteFrequency } from "../music";

describe("noteFrequency", () => {
  it("tunes notes to A4 = 440, with sharps and flats", () => {
    expect(noteFrequency("A4")).toBe(440);
    expect(noteFrequency("C4")).toBeCloseTo(261.63, 2);
    expect(noteFrequency("c#5")).toBeCloseTo(554.37, 2);
    expect(noteFrequency("Bb3")).toBeCloseTo(233.08, 2);
  });

  it("has no frequency for anything else", () => {
    for (const step of ["x", "-", ".", "H4", "C", "C10"])
      expect(noteFrequency(step)).toBeUndefined();
  });
});

describe("musicSteps", () => {
  it("drops the bars, with or without spaces round them", () => {
    expect(musicSteps(" C4 -  | . x|E5 ")).toEqual(["C4", "-", ".", "x", "E5"]);
  });
});

describe("musicSamples", () => {
  // Two samples a step at tempo 120, and every note one sample of 0.5, so the timing shows.
  const built: Array<Array<number | undefined>> = [];
  const zzfx = {
    sampleRate: 8,
    buildSamples: (...params: Array<number | undefined>) => {
      built.push(params);
      return new Float32Array([0.5]);
    },
  };

  it("plays each note on its step, holds with -, plays x at the instrument's own pitch, and repeats a short track", () => {
    const song = {
      tempo: 120,
      instruments: { lead: [1, 0.3, 300, null, 0, 0.1], bass: [1] },
      tracks: { lead: "C4 - . x", bass: "A4" },
    };
    const out = musicSamples(song, zzfx);
    expect([...out]).toEqual([1, 0, 0.5, 0, 0.5, 0, 1, 0]);

    const [held, drum, bass] = built;
    expect(held?.[1]).toBe(0); // in tune
    expect(held?.[2]).toBeCloseTo(261.63, 2);
    expect(held?.[3]).toBeUndefined(); // null means ZzFX's default
    expect(held?.[4]).toBeCloseTo(2 * 0.25 - 0.1); // sustained for its two steps
    expect(drum?.[2]).toBe(300);
    expect(bass?.[2]).toBe(440);
    expect(built).toHaveLength(3); // the repeated bass note is made once
  });

  it("keeps a loud mix under full scale", () => {
    const loud = {
      tempo: 120,
      instruments: { a: [1], b: [1], c: [1] },
      tracks: { a: "C4", b: "E4", c: "G4" },
    };
    expect(Math.max(...musicSamples(loud, zzfx))).toBe(1);
  });
});
