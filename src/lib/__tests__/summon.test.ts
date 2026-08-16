import { describe, expect, it } from "vitest";

import { parseMentions, parseSummon } from "../summon";

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

describe("parseMentions", () => {
  it("finds named crew in plain speech, in order, de-duplicated", () => {
    expect(parseMentions("@advocate and @skeptic, come back with @advocate examples")).toEqual([
      "advocate",
      "skeptic",
    ]);
  });

  it("ignores unknown handles and unmentioned lines", () => {
    expect(parseMentions("hey @rich2 what do you think?")).toEqual([]);
  });
});
