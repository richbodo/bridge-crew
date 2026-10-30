import { describe, expect, it } from "vitest";

import { parseAgentOutput } from "../agents.server";
import { fixtureReply, pickProvider } from "../model.server";

describe("pickProvider", () => {
  it("prefers an explicit BRIDGE_CREW_MODEL_PROVIDER", () => {
    expect(pickProvider({ BRIDGE_CREW_MODEL_PROVIDER: "fixture", ANTHROPIC_API_KEY: "k" })).toBe(
      "fixture",
    );
  });

  it("uses Anthropic when its key is present", () => {
    expect(pickProvider({ ANTHROPIC_API_KEY: "k" })).toBe("anthropic");
  });

  it("refuses to guess when nothing is configured", () => {
    expect(() => pickProvider({})).toThrow(/No model is configured/);
  });

  it("rejects an unknown provider name instead of silently ignoring it", () => {
    expect(() => pickProvider({ BRIDGE_CREW_MODEL_PROVIDER: "lovable" })).toThrow(/Unknown/);
  });
});

describe("fixtureReply", () => {
  it("answers a crew brief in the SPOKEN/BRIEF shape the parser expects", () => {
    const raw = fixtureReply(
      [
        { role: "system", content: "You are Scout. You go and find out." },
        {
          role: "user",
          content: "## Session transcript\n\nRae: hi\n\n## Your task\n\nfind latency numbers",
        },
      ],
      "crew",
    );
    const { spokenRaw, brief } = parseAgentOutput(raw);
    expect(spokenRaw).toMatch(/^Scout here, on fixture replies/);
    expect(brief).toContain("- Task: find latency numbers");
  });

  it("writes a plan with the four sections Scribe maintains", () => {
    const plan = fixtureReply(
      [
        { role: "system", content: "You are Scribe." },
        {
          role: "user",
          content: "Current plan.md:\n(empty)\n\nNew session material:\nRae: one\nMilo: two",
        },
      ],
      "scribe",
    );
    for (const heading of ["## Where we are", "## Decisions", "## Open questions", "## Next"]) {
      expect(plan).toContain(heading);
    }
    expect(plan).toContain("2 lines of session material");
  });
});
