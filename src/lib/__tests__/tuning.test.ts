import { describe, expect, it } from "vitest";

import { instructionParts, systemPromptFor } from "../instructions";
import { jobOf, TEMPLATES } from "../templates";
import {
  applyTuning,
  cleanPart,
  exportTuning,
  importTuning,
  NO_TUNING,
  tunedNames,
  tuningFromRows,
  TUNING_LIMIT,
  type Tuning,
} from "../tuning";

const studio = TEMPLATES["game-studio"];
const storyteller = jobOf(studio, "storyteller");
const SUMMARIES =
  "You are the Storyteller. When you offer story ideas, offer three, each with a 100-word summary in your brief.";

describe("what a crew member is told", () => {
  it("is its job, then the setting, then the rules, as before tuning existed", () => {
    const prompt = systemPromptFor(studio, storyteller);
    expect(
      prompt.startsWith(
        `${storyteller.duty}\n\n${studio.setting({ bigger: false })}\n\nYou never interrupt.`,
      ),
    ).toBe(true);
    expect(prompt).toContain("SPOKEN:");
    expect(prompt).toContain("ASK: <one job:");
  });

  it("says what the games are for the room's size", () => {
    const told = (bigger: boolean) =>
      instructionParts(studio, storyteller, undefined, { bigger }).find(
        (part) => part.key === "setting",
      )!.text;
    expect(told(false)).toContain("one HTML file each");
    expect(told(true)).toContain("made as a folder of files. They can be 3D");
    expect(told(true)).not.toContain("one HTML file");
    // The rules for young people are the same in both.
    expect(told(true)).toContain("suitable for a student aged 13 or over");
  });

  it("marks the job and the notes as tunable, and the rest as fixed", () => {
    const parts = instructionParts(studio, storyteller, undefined, { notes: "Say the level." });
    expect(parts.map((part) => [part.key, part.editable])).toEqual([
      ["job", true],
      ["notes", true],
      ["setting", false],
      ["rules", false],
      ["ask", false],
    ]);
    expect(parts[1]!.text).toBe("Say the level.");
  });

  it("gives the Engineer its build format, which differs in a Bigger room", () => {
    const engineer = jobOf(studio, "engineer");
    const simple = instructionParts(studio, engineer, undefined, { bigger: false });
    const bigger = instructionParts(studio, engineer, undefined, { bigger: true });
    expect(simple.find((part) => part.key === "made")).toBeDefined();
    expect(simple.find((part) => part.key === "made")!.text).not.toBe(
      bigger.find((part) => part.key === "made")!.text,
    );
  });

  it("follows a room's Reassign, and ignores the one-line blurb the old box left", () => {
    const told = (duty: string | null, name: string | null = null) =>
      instructionParts(studio, storyteller, { name, duty })[0]!.text;
    expect(told(storyteller.blurb)).toBe(storyteller.duty);
    expect(told("Tell short stories.")).toBe("You are Storyteller. Tell short stories.");
    expect(told(SUMMARIES, "Bard")).toBe(`${SUMMARIES}\nIn this room you go by the name Bard.`);
    expect(told(null, "Storyteller")).toBe(storyteller.duty);
    expect(told(null, "Bard")).toBe(`${storyteller.duty}\nIn this room you go by the name Bard.`);
  });
});

describe("tuning", () => {
  const tuning: Tuning = {
    duties: { storyteller: SUMMARIES },
    notes: "Say which level you mean.",
    doc: "Keep game.md under 30 lines.",
  };

  it("reads its rows", () => {
    expect(
      tuningFromRows([
        { part: "duty:storyteller", body: SUMMARIES },
        { part: "notes", body: "Say which level you mean." },
        { part: "doc", body: "Keep game.md under 30 lines." },
      ]),
    ).toEqual(tuning);
    expect(tuningFromRows(null)).toEqual(NO_TUNING);
  });

  it("changes the tuned job and the Scribe, and nothing else", () => {
    const tuned = applyTuning(studio, tuning);
    expect(jobOf(tuned, "storyteller").duty).toBe(SUMMARIES);
    expect(jobOf(tuned, "artist")).toBe(jobOf(studio, "artist"));
    expect(tuned.doc.scribe).toBe("Keep game.md under 30 lines.");
    expect(tuned.setting).toBe(studio.setting);
    expect(applyTuning(studio, NO_TUNING)).toBe(studio);
    expect(
      systemPromptFor(tuned, jobOf(tuned, "storyteller"), undefined, { notes: tuning.notes }),
    ).toMatch(
      /^You are the Storyteller\. When you offer story ideas.*\n\nSay which level you mean\./s,
    );
  });

  it("keeps nothing for text that's empty or the original, and refuses a part that's too long", () => {
    expect(cleanPart("  new words \r\n", storyteller.duty)).toBe("new words");
    expect(cleanPart(` ${storyteller.duty} `, storyteller.duty)).toBeNull();
    expect(cleanPart("   ", null)).toBeNull();
    expect(() => cleanPart("x".repeat(TUNING_LIMIT + 1), null)).toThrow(/the most is 4000/);
  });

  it("names what's changed", () => {
    expect(tunedNames(studio, tuning)).toEqual([
      "Storyteller",
      "Notes for every crew member",
      "The Scribe's game.md",
    ]);
    expect(tunedNames(studio, NO_TUNING)).toEqual([]);
  });

  it("goes to a file and back", () => {
    const file = exportTuning(studio, tuning, new Date("2026-11-19T10:00:00Z"));
    expect(JSON.parse(file)).toMatchObject({
      bridgeCrewTuning: 1,
      kind: "game-studio",
      crew: { storyteller: SUMMARIES },
    });
    expect(importTuning(studio, file)).toEqual({ tuning, skipped: [] });
  });

  it("refuses a file for another kind of room, or that isn't one", () => {
    const file = exportTuning(TEMPLATES.deliberation, NO_TUNING, new Date());
    expect(() => importTuning(studio, file)).toThrow(/tunes a deliberation room/);
    expect(() => importTuning(studio, "not json")).toThrow(/isn't JSON/);
    expect(() => importTuning(studio, "{}")).toThrow(/isn't a tuning file/);
  });

  it("skips jobs the room doesn't have, and drops what's the same as the original", () => {
    const file = JSON.stringify({
      bridgeCrewTuning: 1,
      kind: "game-studio",
      crew: { storyteller: storyteller.duty, wizard: "You are a wizard." },
      scribe: studio.doc.scribe,
    });
    expect(importTuning(studio, file)).toEqual({ tuning: NO_TUNING, skipped: ["wizard"] });
  });
});
