import { describe, expect, it } from "vitest";

import { assembleContext, sortDocs, summarisePacks, type ContextDoc } from "../context";

const doc = (pack: string, path: string, body: string, source: ContextDoc["source"] = "repo"): ContextDoc => ({
  pack,
  path,
  body,
  source,
});

describe("sortDocs", () => {
  it("puts each pack's repo index.md first, then repo docs, then session docs", () => {
    const docs = [
      doc("b", "session:b/note.md", "s", "session"),
      doc("b", "/docs/context/b/zeta.md", "z"),
      doc("a", "/docs/context/a/index.md", "i"),
      doc("b", "/docs/context/b/index.md", "i"),
    ];
    expect(sortDocs(docs).map((d) => d.path)).toEqual([
      "/docs/context/a/index.md",
      "/docs/context/b/index.md",
      "/docs/context/b/zeta.md",
      "session:b/note.md",
    ]);
  });
});

describe("summarisePacks", () => {
  it("counts documents per pack", () => {
    expect(
      summarisePacks([doc("a", "a/1.md", "x"), doc("a", "a/2.md", "y"), doc("b", "b/1.md", "z")]),
    ).toBe("a (2 docs), b (1 doc)");
  });
});

describe("assembleContext", () => {
  it("inlines whole packs, the plan and the full transcript in order", () => {
    const result = assembleContext({
      docs: [doc("kereru-ferry-coop", "/docs/context/kereru-ferry-coop/index.md", "Marama Whitiora")],
      plan: "## Where we are\n\nDeciding.",
      transcript: ["rae: one", "milo: two"],
    });

    expect(result.text).toContain("Standing context — required reading");
    expect(result.text).toContain("Marama Whitiora");
    expect(result.text.indexOf("Standing context")).toBeLessThan(result.text.indexOf("Living plan"));
    expect(result.text.indexOf("Living plan")).toBeLessThan(result.text.indexOf("Session transcript"));
    expect(result.text).toContain("rae: one");
    expect(result.text).toContain("milo: two");
    expect(result.dropped).toEqual([]);
    expect(result.read).toBe("kereru-ferry-coop (1 doc)");
  });

  it("keeps an empty transcript readable", () => {
    const result = assembleContext({ docs: [], transcript: [] });
    expect(result.text).toContain("(nothing yet)");
    expect(result.read).toBe("");
  });

  it("drops the oldest transcript lines first and says so", () => {
    const transcript = Array.from({ length: 50 }, (_, i) => `line ${i}`);
    const result = assembleContext({ docs: [], transcript, budget: 500 });
    expect(result.text).toContain("line 49");
    expect(result.text).not.toContain("line 0:");
    expect(result.dropped.length).toBeGreaterThan(0);
    expect(result.text).toContain("did not fit");
  });

  it("drops oversized pack documents rather than truncating them silently", () => {
    const result = assembleContext({
      docs: [doc("big", "/docs/context/big/huge.md", "x".repeat(5000))],
      transcript: ["rae: hello"],
      budget: 1000,
    });
    expect(result.dropped[0]).toContain("huge.md");
    expect(result.text).toContain("rae: hello");
  });
});
