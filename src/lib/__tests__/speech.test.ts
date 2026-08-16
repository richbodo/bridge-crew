import { describe, expect, it } from "vitest";

import { enforceSpeechCap } from "../speech";

describe("enforceSpeechCap", () => {
  it("leaves short answers alone", () => {
    const { spoken, overflow } = enforceSpeechCap("Two options. I'd take the second.");
    expect(spoken).toBe("Two options. I'd take the second.");
    expect(overflow).toBe("");
  });

  it("moves everything past the cap into the written overflow", () => {
    const text = Array.from({ length: 14 }, (_, i) => `Sentence ${i + 1}.`).join(" ");
    const { spoken, overflow } = enforceSpeechCap(text, 10);
    expect(spoken.endsWith("Sentence 10.")).toBe(true);
    expect(overflow.startsWith("Sentence 11.")).toBe(true);
  });

  it("flattens list markers so the spoken layer never reads as bullets", () => {
    const { spoken } = enforceSpeechCap("- first thing.\n- second thing.");
    expect(spoken).toBe("first thing. second thing.");
  });
});
