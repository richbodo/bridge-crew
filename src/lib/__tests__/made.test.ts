import { describe, expect, it } from "vitest";

import { prepareGame, slugify } from "../game-file";
import { parseAgentOutput } from "../agents.server";
import { labelOf, splitExtras, splitMade } from "../made";

const reply = (tail: string) => `SPOKEN:\nDone.\n\nBRIEF:\n## What I did\n\nIt works.\n\n${tail}`;

describe("splitMade", () => {
  it("finds a version, and leaves SPOKEN and BRIEF for the contribution", () => {
    const { text, made } = splitMade(
      reply("FILE:\n```html\n<!doctype html><html><body><canvas></canvas></body></html>\n```"),
    );
    expect(text).toContain("It works.");
    expect(text).not.toContain("FILE:");
    expect(made).toEqual([
      { kind: "version", name: "", body: "<!doctype html><html><body><canvas></canvas></body></html>" },
    ]);
  });

  it("finds a named picture, and refuses one with a script", () => {
    const ok = splitMade(reply('PICTURE: Mole!\n```svg\n<svg viewBox="0 0 10 10"><circle r="4"/></svg>\n```'));
    expect(ok.made).toEqual([
      { kind: "picture", name: "mole", body: '<svg viewBox="0 0 10 10"><circle r="4"/></svg>' },
    ]);
    const bad = splitMade(reply("PICTURE: mole\n```svg\n<svg><script>alert(1)</script></svg>\n```"));
    expect(bad.made).toEqual([]);
  });

  it("finds sounds, keeps the volume at 1 or below, and skips bad lists", () => {
    const { made } = splitMade(
      reply('SOUNDS:\n```json\n{"dig": [3, 0.05, 220], "gem": "loud", "pop": [0.5, null, 900]}\n```'),
    );
    expect(made).toEqual([
      { kind: "sound", name: "dig", body: "[1,0.05,220]" },
      { kind: "sound", name: "pop", body: "[0.5,null,900]" },
    ]);
  });

  it("makes nothing from a plain reply", () => {
    expect(splitMade(reply("")).made).toEqual([]);
  });
});

describe("splitExtras", () => {
  it("takes out an ASK, with the job on its own line", () => {
    const { text, ask, removes } = splitExtras(
      reply("ASK: Sound designer\nMake a crunchy sound for when Grip catches a ladybug."),
    );
    expect(ask).toEqual({
      name: "Sound designer",
      task: "Make a crunchy sound for when Grip catches a ladybug.",
    });
    expect(text).not.toContain("ASK:");
    expect(text).toContain("It works.");
    expect(removes).toEqual([]);
  });

  it("reads an ASK on one line, and drops “the”", () => {
    expect(splitExtras(reply("ASK: the Storyteller: name the friend.")).ask).toEqual({
      name: "Storyteller",
      task: "name the friend.",
    });
    expect(splitExtras(reply("ASK: Storyteller")).ask).toBeNull();
  });

  it("reads REMOVE numbers, and prefers the ones marked #", () => {
    expect(splitExtras(reply("REMOVE: #2, #5, #2")).removes).toEqual([2, 5]);
    expect(splitExtras(reply("REMOVE: Version 2 (#5)")).removes).toEqual([5]);
    expect(splitExtras(reply("REMOVE: 3 and 4")).removes).toEqual([3, 4]);
  });

  it("never reads a game's code as an ASK or a REMOVE", () => {
    const game = "FILE:\n```html\n<script>\nASK: nobody\nREMOVE: #1\n</script>\n```";
    const { text, ask, removes } = splitExtras(reply(game));
    expect(ask).toBeNull();
    expect(removes).toEqual([]);
    expect(text).toContain("REMOVE: #1");
  });

  it("works with a made thing before or after it", () => {
    const picture = 'PICTURE: mole\n```svg\n<svg viewBox="0 0 1 1"/>\n```';
    for (const tail of [`${picture}\n\nASK: Engineer\nPut the mole in.`, `ASK: Engineer\nPut the mole in.\n\n${picture}`]) {
      const result = parseAgentOutput(reply(tail));
      expect(result.ask).toEqual({ name: "Engineer", task: "Put the mole in." });
      expect(result.made).toHaveLength(1);
      expect(result.brief).not.toContain("ASK:");
      expect(result.spokenRaw).toBe("Done.");
    }
  });
});

describe("labelOf", () => {
  it("names versions by number, with a title once they're renamed", () => {
    expect(labelOf({ kind: "version", name: "v3", version: 3 })).toBe("Version 3");
    expect(labelOf({ kind: "version", name: "with gems", version: 3 })).toBe("Version 3: with gems");
    expect(labelOf({ kind: "picture", name: "mole", version: null })).toBe("Picture: mole");
    expect(labelOf({ kind: "sound", name: "dig", version: null })).toBe("Sound: dig");
  });
});

describe("prepareGame", () => {
  it("puts the network block, ZzFX and the crash reporter first in the head", () => {
    const game = prepareGame("<html><head><title>Mole</title></head><body></body></html>", {
      inRoom: true,
    });
    const head = game.slice(game.indexOf("<head>"), game.indexOf("<title>"));
    expect(head).toContain("Content-Security-Policy");
    expect(head).toContain("default-src 'none'");
    expect(head).toContain("zzfxV");
    expect(head).toContain("MIT License");
    expect(head).toContain("bridge-crew-crash");
  });

  it("leaves the crash reporter out of a file to share, and wraps a bare fragment", () => {
    const file = prepareGame("<canvas></canvas>", { inRoom: false });
    expect(file).toMatch(/^<!doctype html>/);
    expect(file).not.toContain("bridge-crew-crash");
    expect(file).toContain("<canvas></canvas>");
  });
});

describe("slugify", () => {
  it("makes a safe folder name", () => {
    expect(slugify("The Mole Game!")).toBe("the-mole-game");
    expect(slugify("../../etc")).toBe("etc");
    expect(slugify("???")).toBe("game");
  });
});
