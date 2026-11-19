import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { loadPackDocs } from "../context.server";
import {
  DEMO_CONTEXTS,
  DEMO_FILES,
  demoScriptFor,
  GAME_STUDIO,
  parseDemoScript,
  PLAIN_DEMO,
  type DemoScript,
} from "../demo-rooms";
import { enforceSpeechCap } from "../speech";
import { parseSummon } from "../summon";
import { TEMPLATES } from "../templates";

const scripts = (): DemoScript[] =>
  Object.keys(DEMO_FILES).map((pack) => parseDemoScript(pack, DEMO_FILES[pack]!));

/** The pack's canaries: the bold terms in its index.md's "## Canaries" list. */
function canariesOf(pack: string): string[] {
  const index = readFileSync(`docs/context/${pack}/index.md`, "utf8");
  const list = index.split("## Canaries")[1] ?? "";
  return [...list.matchAll(/\*\*\*?(.+?)\*?\*\*/g)].map((match) => match[1]!.replace(/\*/g, ""));
}

describe("demo openings", () => {
  it("lists every pack with a demo.md, in their order", () => {
    expect(DEMO_CONTEXTS.map((context) => context.key)).toEqual([
      "kereru-ferry-coop",
      "nz-politics",
      "social-epidemiology",
      "bridge-crew-protocol",
    ]);
    expect(DEMO_CONTEXTS.map((context) => context.name)).toEqual([
      "Kererū Ferry Co-op",
      "NZ politics",
      "Social epidemiology",
      "Bridge Crew protocol",
    ]);
    expect(DEMO_CONTEXTS.some((context) => context.key === GAME_STUDIO)).toBe(false);
  });

  it("reads every demo.md", () => {
    for (const script of scripts()) {
      expect(demoScriptFor(script.pack!)).toEqual(script);
    }
  });

  for (const pack of Object.keys(DEMO_FILES)) {
    describe(pack, () => {
      const script = () => parseDemoScript(pack, DEMO_FILES[pack]!);

      it("has a Deliberation crew member, asked for by the people's last line", () => {
        const { crew, people } = script();
        expect(TEMPLATES.deliberation.roster.map((job) => job.key)).toContain(crew);
        const summon = parseSummon(people.at(-1)!.body);
        expect(summon.type).toBe("summon");
        expect(summon.type === "summon" && summon.agent).toBe(crew);
      });

      it("hails with one line, and speaks within the cap", () => {
        const { hail, spoken } = script();
        expect(hail).not.toContain("\n");
        expect(enforceSpeechCap(spoken, TEMPLATES.deliberation.spokenCap).overflow).toBe("");
      });

      it("uses the pack's canaries in its brief", () => {
        const { brief } = script();
        const canaries = canariesOf(pack);
        expect(canaries.length).toBeGreaterThan(3);
        const used = canaries.filter((canary) => brief.includes(canary));
        expect(used.length, `canaries used: ${used.join(", ")}`).toBeGreaterThanOrEqual(3);
      });

      it("keeps the brief's and the plan's own headings", () => {
        const { brief, plan } = script();
        expect(brief).toMatch(/^## /);
        expect(brief).not.toContain("```");
        expect(plan).toMatch(/^## Where we are/);
      });
    });
  }

  it("isn't read by the crew", async () => {
    const empty = {
      from: () => ({ select: () => ({ eq: () => ({ in: async () => ({ data: [] }) }) }) }),
    };
    const packs = Object.keys(DEMO_FILES);
    const docs = await loadPackDocs(empty as never, "room", packs);
    expect(docs.length).toBeGreaterThan(0);
    expect(docs.some((doc) => doc.path.endsWith("/demo.md"))).toBe(false);
  });

  it("keeps the plain demo room's opening", () => {
    expect(PLAIN_DEMO.pack).toBeNull();
    expect(PLAIN_DEMO.crew).toBe("scout");
    expect(parseSummon(PLAIN_DEMO.people.at(-1)!.body)).toMatchObject({ agent: "scout" });
  });
});

describe("parseDemoScript", () => {
  const good = [
    "# A title",
    "",
    "- **Context:** A pack",
    "- **About:** One line.",
    "- **Order:** 2",
    "- **Crew member:** Scout",
    "- **Task:** find out",
    "- **Hail:** Found it.",
    "",
    "## People",
    "",
    "- **Rae:** First line,",
    "  wrapped.",
    "- **Rae:** /research find out",
    "",
    "## Spoken",
    "",
    "One sentence.",
    "Two.",
    "",
    "## Brief",
    "",
    "```markdown",
    "## Findings",
    "",
    "- One.",
    "```",
    "",
    "## Plan",
    "",
    "```markdown",
    "## Where we are",
    "```",
  ].join("\n");

  it("reads the fields, the people and the fenced sections", () => {
    const script = parseDemoScript("a-pack", good);
    expect(script).toMatchObject({
      pack: "a-pack",
      title: "A title",
      context: "A pack",
      order: 2,
      crew: "scout",
      spoken: "One sentence. Two.",
      brief: "## Findings\n\n- One.",
      plan: "## Where we are",
    });
    expect(script.people).toEqual([
      { name: "Rae", body: "First line, wrapped." },
      { name: "Rae", body: "/research find out" },
    ]);
  });

  it("names what's missing", () => {
    expect(() => parseDemoScript("a-pack", good.replace("- **Hail:** Found it.\n", ""))).toThrow(
      'docs/context/a-pack/demo.md has no "Hail".',
    );
    expect(() => parseDemoScript("a-pack", good.replace("## Spoken", "## Said"))).toThrow(
      'has no "## Spoken"',
    );
  });
});
