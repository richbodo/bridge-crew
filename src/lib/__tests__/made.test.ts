import { describe, expect, it } from "vitest";

import { prepareGame, slugify } from "../game-file";
import { splitMade } from "../made";

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
