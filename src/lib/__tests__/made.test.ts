import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { prepareGame, slugify } from "../game-file";
import { parseAgentOutput } from "../agents.server";
import { formatFor, labelOf, splitExtras, splitMade } from "../made";

const reply = (tail: string) => `SPOKEN:\nDone.\n\nBRIEF:\n## What I did\n\nIt works.\n\n${tail}`;

describe("splitMade", () => {
  it("finds a version, and leaves SPOKEN and BRIEF for the contribution", () => {
    const { text, made } = splitMade(
      reply("FILE:\n```html\n<!doctype html><html><body><canvas></canvas></body></html>\n```"),
    );
    expect(text).toContain("It works.");
    expect(text).not.toContain("FILE:");
    const page = "<!doctype html><html><body><canvas></canvas></body></html>";
    expect(made).toEqual([{ kind: "version", name: "", body: page, files: { "index.html": page } }]);
  });

  it("finds a Bigger room's version as several files, each named", () => {
    const { text, made } = splitMade(
      reply(
        'FILE: index.html\n```html\n<html><body><script src="js/game.js"></script></body></html>\n```\n\nFILE: `js/game.js`\n```js\nconst fence = "```";\ndraw();\n```\n\nFILE: ./js/config.js\n```javascript\nconst CONFIG = {};\n```',
      ),
    );
    expect(text).not.toContain("FILE:");
    expect(made[0]?.files).toEqual({
      "index.html": '<html><body><script src="js/game.js"></script></body></html>',
      "js/game.js": 'const fence = "```";\ndraw();',
      "js/config.js": "const CONFIG = {};",
    });
  });

  it("makes nothing from a page that isn't HTML, a path off the folder, or one on the shelf", () => {
    const files = (tail: string) => splitMade(reply(tail)).made[0]?.files;
    expect(files("FILE:\n```html\njust words\n```")).toBeUndefined();
    expect(files("FILE: ../outside.js\n```js\nx();\n```\n\nFILE: js/a.js\n```js\na();\n```")).toEqual({
      "js/a.js": "a();",
    });
    expect(files("FILE: studio/three.js\n```js\nx();\n```")).toBeUndefined();
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

  it("finds music next to sounds: in range, and only tracks with an instrument and a note", () => {
    const { text, made } = splitMade(
      reply(
        'SOUNDS:\n```json\n{"dig": [1, 0.05, 220]}\n```\n\nMUSIC: Title Theme\n```json\n' +
          '{"tempo": 400, "instruments": {"lead": [3, 0.1, 440], "pad": [1]},' +
          ' "tracks": {"lead": "C5  E5 | G5 -", "pad": ". . .", "bass": "C3"}}\n```',
      ),
    );
    expect(text).not.toContain("SOUNDS:");
    expect(text).not.toContain("MUSIC:");
    expect(made).toEqual([
      { kind: "sound", name: "dig", body: "[1,0.05,220]" },
      {
        kind: "music",
        name: "title theme",
        body: JSON.stringify({
          tempo: 200,
          instruments: { lead: [1, 0.1, 440] },
          tracks: { lead: "C5 E5 | G5 -" },
        }),
      },
    ]);
  });

  it("makes no music from a song without a note to play", () => {
    const silent = '{"instruments": {"lead": [1]}, "tracks": {"lead": ". - |"}}';
    expect(splitMade(reply(`MUSIC: quiet\n\`\`\`json\n${silent}\n\`\`\``)).made).toEqual([]);
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
    expect(labelOf({ kind: "music", name: "theme", version: null })).toBe("Music: theme");
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
    expect(head).toContain("playMusic");
    expect(head).toContain("MIT License");
    expect(head).toContain("bridge-crew-crash");
  });

  it("gives the game zzfx, ZZFX, playMusic and stopMusic, from a plain script", () => {
    const game = prepareGame("<canvas></canvas>", { inRoom: false });
    const script =
      [...game.matchAll(/<script>([\s\S]*?)<\/script>/g)]
        .map((match) => match[1] ?? "")
        .find((code) => code.includes("function playMusic")) ?? "";
    const sources: Array<{ loop: boolean; stopped?: boolean }> = [];
    const node = { connect: (next: unknown) => next };
    class AudioContext {
      destination = {};
      createBuffer = (_channels: number, length: number) => ({
        getChannelData: () => new Float32Array(length),
      });
      createBufferSource = () => {
        const source = { ...node, loop: false, playbackRate: { value: 1 }, start() {}, stop() {} };
        source.stop = () => Object.assign(source, { stopped: true });
        sources.push(source);
        return source;
      };
      createGain = () => ({ ...node, gain: { value: 1 } });
      resume() {}
    }
    const page: Record<string, unknown> = {
      AudioContext,
      StereoPannerNode: class {
        connect = node.connect;
      },
      addEventListener() {},
    };
    page["globalThis"] = page;
    runInNewContext(script, page);

    expect(Object.keys(page)).toEqual(
      expect.arrayContaining(["zzfx", "ZZFX", "playMusic", "stopMusic", "zzfxX"]),
    );
    const song = { tempo: 120, instruments: { lead: [1] }, tracks: { lead: "C4 E4" } };
    const playMusic = page["playMusic"] as (song: unknown, loop?: boolean) => void;
    playMusic(song, false);
    expect(sources.at(-1)).toMatchObject({ loop: false });
    playMusic(song);
    expect(sources.at(-2)).toMatchObject({ stopped: true }); // one tune at a time
    expect(sources.at(-1)).toMatchObject({ loop: true });
    (page["stopMusic"] as () => void)();
    expect(sources.at(-1)).toMatchObject({ stopped: true });
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

describe("formatFor", () => {
  it("asks a Simple room's Engineer for one file, and a Bigger room's for changed files, with the shelf", () => {
    const simple = formatFor("version") ?? "";
    const bigger = formatFor("version", { bigger: true }) ?? "";
    expect(simple).toContain("One self-contained HTML file");
    expect(simple).not.toContain("studio/three.js");
    expect(bigger).toContain("FILE: js/game.js");
    expect(bigger).toContain("Files you don't hand back stay as they are.");
    expect(bigger).toContain('<script src="studio/three.js"></script>');
    expect(bigger).toContain("studio/fonts/vt323.css");
  });
});
