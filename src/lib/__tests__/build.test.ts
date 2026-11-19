import { describe, expect, it } from "vitest";

import { changesInWords, GameCopy, isPage, madeFiles, pathOf, VIEW_LIMIT } from "../build";

/** The Engineer's build tools on a copy of the game (docs/plans/bigger-games-2026-11-16.md Part 3). */

const page =
  '<!doctype html>\n<html>\n<body>\n<script src="js/game.js"></script>\n</body>\n</html>';
const game = { "index.html": page, "js/game.js": "let x = 1;\nlet y = 2;\nlet x2 = 1;\n" };
const made = { "studio/made/pictures/mole.svg": '<svg viewBox="0 0 1 1"/>' };

const text = (used: { result: { parts: Array<{ text: string } | { jpeg: string }> } }) =>
  used.result.parts.map((part) => ("text" in part ? part.text : "")).join("\n");

describe("a path in the game's folder", () => {
  it("reads /js/game.js and js/game.js the same, and refuses one that leaves the folder", () => {
    expect(pathOf("/js/game.js")).toBe("js/game.js");
    expect(pathOf("js/./game.js")).toBe("js/game.js");
    expect(pathOf("/")).toBe("");
    expect(pathOf("/js/../../etc/passwd")).toBeNull();
    expect(pathOf(42)).toBeNull();
  });
});

describe("the text editor on a copy", () => {
  it("views the folder, then a file with numbered lines, or part of one", () => {
    const copy = new GameCopy(game, made);
    const folder = copy.edit({ command: "view", path: "/" });
    expect(text(folder)).toContain("/index.html (1 KB)\n/js/game.js (1 KB)");
    expect(text(folder)).toContain("/studio/made/pictures/mole.svg");
    expect(folder.progress).toBe("Looking at the files");
    const file = copy.edit({ command: "view", path: "/js/game.js" });
    expect(text(file)).toBe(
      "     1\tlet x = 1;\n     2\tlet y = 2;\n     3\tlet x2 = 1;\n     4\t",
    );
    expect(file.progress).toBe("Reading js/game.js");
    expect(text(copy.edit({ command: "view", path: "/js/game.js", view_range: [2, 2] }))).toBe(
      "     2\tlet y = 2;",
    );
    expect(text(copy.edit({ command: "view", path: "/studio/made/pictures/mole.svg" }))).toContain(
      "<svg",
    );
  });

  it("shows a long file in parts, and says where it goes on", () => {
    const long = Array.from(
      { length: 2000 },
      (_, i) => `const line${i} = "${"x".repeat(40)}";`,
    ).join("\n");
    const copy = new GameCopy({ "index.html": page, "js/big.js": long });
    const first = text(copy.edit({ command: "view", path: "/js/big.js" }));
    expect(first.length).toBeLessThan(VIEW_LIMIT + 20_000);
    expect(first).toMatch(/That's lines 1 to (\d+) of 2000\. View the rest with view_range/);
  });

  it("says what a picture, a shelf file or a missing file is, instead of showing it", () => {
    const copy = new GameCopy({ ...game, "img/a.png": "data:image/png;base64,AAAA" });
    expect(text(copy.edit({ command: "view", path: "/img/a.png" }))).toContain("isn't text");
    const shelf = copy.edit({ command: "view", path: "/studio/three.js" });
    expect(shelf.result.failed).toBe(true);
    expect(text(shelf)).toContain("studio's shelf");
    const missing = copy.edit({ command: "view", path: "/js/nope.js" });
    expect(missing.result.failed).toBe(true);
    expect(text(missing)).toContain("There's no file /js/nope.js. The game's files:");
  });

  it("changes text that matches once, and says when it matches never or twice", () => {
    const copy = new GameCopy(game);
    const changed = copy.edit({
      command: "str_replace",
      path: "/js/game.js",
      old_str: "let y = 2;",
      new_str: "let y = 3;",
    });
    expect(changed.progress).toBe("Changing js/game.js");
    expect(text(changed)).toContain("     2\tlet y = 3;");
    expect(copy.files["js/game.js"]).toBe("let x = 1;\nlet y = 3;\nlet x2 = 1;\n");
    expect(
      text(copy.edit({ command: "str_replace", path: "/js/game.js", old_str: "nope" })),
    ).toContain("isn't in /js/game.js");
    expect(
      text(copy.edit({ command: "str_replace", path: "/js/game.js", old_str: "= 1;" })),
    ).toContain("2 times");
  });

  it("inserts lines after a line, creates and rewrites files, and removes them", () => {
    const copy = new GameCopy(game);
    copy.edit({ command: "insert", path: "/js/game.js", insert_line: 0, insert_text: "// wolves" });
    expect(copy.files["js/game.js"]!.startsWith("// wolves\nlet x = 1;")).toBe(true);
    expect(
      copy.edit({ command: "insert", path: "/js/game.js", insert_line: 99, insert_text: "x" })
        .result.failed,
    ).toBe(true);
    expect(
      copy.edit({ command: "create", path: "/js/wolves.js", file_text: "wolves();" }).progress,
    ).toBe("Adding js/wolves.js");
    expect(
      copy.edit({ command: "create", path: "js/wolves.js", file_text: "wolves(2);" }).progress,
    ).toBe("Rewriting js/wolves.js");
    expect(copy.remove({ path: "/index.html" }).result.failed).toBe(true);
    expect(copy.remove({ path: "/js/game.js" }).progress).toBe("Removing js/game.js");
    expect(copy.changes()).toEqual({
      added: ["js/wolves.js"],
      changed: [],
      removed: ["js/game.js"],
    });
    expect(changesInWords(copy.changes())).toBe("Added js/wolves.js. Removed js/game.js.");
  });

  it("never changes the shelf, the pictures in use, or a file that isn't text", () => {
    const copy = new GameCopy(game, made);
    for (const path of ["/studio/three.js", "/studio/made/pictures/mole.svg"]) {
      expect(text(copy.edit({ command: "create", path, file_text: "x" }))).toContain(
        "the studio's",
      );
    }
    expect(copy.edit({ command: "create", path: "/img/a.png", file_text: "x" }).result.failed).toBe(
      true,
    );
    expect(copy.edit({ command: "create", path: "/", file_text: "x" }).result.failed).toBe(true);
    expect(copy.changed()).toBe(false);
  });

  it("keeps a Simple room's game to one file, and a read-only copy unchanged", () => {
    const simple = new GameCopy({ "index.html": page }, {}, { simple: true });
    expect(text(simple.edit({ command: "create", path: "/js/a.js", file_text: "a();" }))).toContain(
      "In a Simple room the game is one file",
    );
    expect(
      simple.edit({ command: "create", path: "/index.html", file_text: page }).result.failed,
    ).toBeUndefined();
    const reading = new GameCopy(game, {}, { readOnly: "Just explain." });
    expect(
      text(
        reading.edit({ command: "str_replace", path: "/js/game.js", old_str: "x", new_str: "y" }),
      ),
    ).toBe("Just explain.");
    expect(text(reading.remove({ path: "/js/game.js" }))).toBe("Just explain.");
    expect(reading.edit({ command: "view", path: "/js/game.js" }).result.failed).toBeUndefined();
    expect(reading.changed()).toBe(false);
  });

  it("starts an empty game, and knows a page from a broken one", () => {
    const copy = new GameCopy({});
    expect(text(copy.edit({ command: "view", path: "/" }))).toContain("The game has no files yet.");
    copy.edit({ command: "create", path: "/index.html", file_text: page });
    expect(isPage(copy.files)).toBe(true);
    expect(isPage({ "index.html": "just words" })).toBe(false);
  });
});

describe("the pictures in use", () => {
  it("are files named after them, kept apart when two share a name", () => {
    expect(
      Object.keys(
        madeFiles([
          { kind: "picture", name: "mole", body: "<svg/>" },
          { kind: "sound", name: "dig", body: "[1]" },
          { kind: "picture", name: "mole", body: "<svg/>" },
          { kind: "picture", name: "big tree!", body: "<svg/>" },
        ]),
      ),
    ).toEqual([
      "studio/made/pictures/mole.svg",
      "studio/made/pictures/mole-2.svg",
      "studio/made/pictures/big-tree.svg",
    ]);
  });
});
