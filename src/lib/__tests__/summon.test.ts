import { describe, expect, it } from "vitest";

import { findAddressees, parseSummon, type Addressable } from "../summon";

describe("parseSummon", () => {
  it("ignores plain speech", () => {
    expect(parseSummon("what if we shipped it tomorrow?")).toEqual({ type: "none" });
  });

  it("maps /research to scout", () => {
    expect(parseSummon("/research edge caching costs")).toEqual({
      type: "summon",
      agent: "scout",
      brief: "edge caching costs",
    });
  });

  it("maps /analyze to analyst", () => {
    expect(parseSummon("/analyze  our churn curve ")).toEqual({
      type: "summon",
      agent: "analyst",
      brief: "our churn curve",
    });
  });

  it("parses debate", () => {
    expect(parseSummon("/debate should we self host?")).toEqual({
      type: "debate",
      question: "should we self host?",
    });
  });

  it("parses stop and redirect", () => {
    expect(parseSummon("/stop scout")).toEqual({ type: "stop", agent: "scout" });
    expect(parseSummon("/redirect scout pricing only")).toEqual({
      type: "redirect",
      agent: "scout",
      brief: "pricing only",
    });
  });

  it("rejects commands without a brief or unknown agents", () => {
    expect(parseSummon("/research")).toEqual({ type: "none" });
    expect(parseSummon("/cook dinner")).toEqual({ type: "none" });
    expect(parseSummon("/redirect scout")).toEqual({ type: "none" });
  });
});

const CREW: Addressable[] = [
  { key: "advocate", names: ["Advocate"] },
  { key: "skeptic", names: ["Skeptic"] },
  { key: "scout", names: ["Scout", "research"] },
  { key: "game-designer", names: ["Game designer"] },
  { key: "scribe", names: ["Scribe", "Sound"] },
];

describe("findAddressees (F12)", () => {
  it("finds @names anywhere, in order, without repeats", () => {
    expect(findAddressees("@advocate and @skeptic, come back with @advocate examples", CREW)).toEqual([
      "advocate",
      "skeptic",
    ]);
  });

  it("finds a name at the start, before a comma or colon", () => {
    expect(findAddressees("Scout, what did the vendor docs say?", CREW)).toEqual(["scout"]);
    expect(findAddressees("game designer: make it harder", CREW)).toEqual(["game-designer"]);
  });

  it("matches job keys and names ignoring case, spaces, hyphens and underscores", () => {
    expect(findAddressees("@game-designer @GameDesigner @game_designer", CREW)).toEqual([
      "game-designer",
    ]);
    expect(findAddressees("@research latency numbers", CREW)).toEqual(["scout"]);
  });

  it("ignores a name in the middle of a sentence without the @", () => {
    expect(findAddressees("the sound is too loud", CREW)).toEqual([]);
    expect(findAddressees("I asked the scout yesterday", CREW)).toEqual([]);
  });

  it("ignores unknown handles and ordinary openings", () => {
    expect(findAddressees("hey @rich2 what do you think?", CREW)).toEqual([]);
    expect(findAddressees("Hmm, I'm not sure", CREW)).toEqual([]);
  });
});
