import { describe, expect, it } from "vitest";

import { bundleGame, cleanPath, filesOf, shelfPathsIn, sizeOf } from "../bundle";

const shelf = (path: string) =>
  ({
    "studio/three.js": "window.THREE = {};",
    "studio/fonts/vt323.css": "@font-face{font-family:VT323}",
  })[path];

describe("bundleGame", () => {
  it("inlines the folder's scripts, each ending with its file's name, in order", () => {
    const { html, missing, remote } = bundleGame(
      {
        "index.html":
          '<html><head></head><body><script src="js/config.js"></script>\n<script src="./js/game.js"></script></body></html>',
        "js/config.js": "const CONFIG = { speed: 3 };",
        "js/game.js": "draw(CONFIG.speed);",
      },
      shelf,
    );
    expect(html).toContain(
      "<script>const CONFIG = { speed: 3 };\n//# sourceURL=js/config.js\n</script>",
    );
    expect(html.indexOf("CONFIG = {")).toBeLessThan(html.indexOf("draw(CONFIG.speed)"));
    expect(html).toContain("//# sourceURL=js/game.js");
    expect(html).not.toContain("src=");
    expect(missing).toEqual([]);
    expect(remote).toEqual([]);
  });

  it("takes shelf files from the shelf, and keeps a script's type", () => {
    const { html } = bundleGame(
      {
        "index.html":
          '<head><link rel="stylesheet" href="studio/fonts/vt323.css"></head><script src="studio/three.js"></script><script type="module" src="js/main.js"></script>',
        "js/main.js": "go();",
      },
      shelf,
    );
    expect(html).toContain("window.THREE = {};\n//# sourceURL=studio/three.js");
    expect(html).toContain("<style>/* studio/fonts/vt323.css */\n@font-face{font-family:VT323}");
    expect(html).toContain('<script type="module">go();');
  });

  it("moves a deferred script to the end of the page, where it runs at the same point", () => {
    const { html } = bundleGame(
      {
        "index.html":
          '<head><script defer src="js/late.js"></script></head><body><canvas></canvas></body>',
        "js/late.js": "late();",
      },
      shelf,
    );
    expect(html.indexOf("late();")).toBeGreaterThan(html.indexOf("<canvas>"));
    expect(html.indexOf("late();")).toBeLessThan(html.indexOf("</body>"));
  });

  it("keeps a script from closing its element early", () => {
    const { html } = bundleGame(
      {
        "index.html": '<script src="a.js"></script>',
        "a.js": 'el.innerHTML = "<script></script>";',
      },
      shelf,
    );
    expect(html).toContain('el.innerHTML = "<script><\\/script>";');
  });

  it("inlines stylesheets, and the pictures they and the page use", () => {
    const png = "data:image/png;base64,iVBORw0KGgo=";
    const { html, missing } = bundleGame(
      {
        "index.html":
          '<head><link rel="stylesheet" href="style.css"></head><img src="art/hero.png"><img src="art/tree.svg">',
        "style.css": "body { background: url('art/hero.png'); }",
        "art/hero.png": png,
        "art/tree.svg": "<svg></svg>",
      },
      shelf,
    );
    expect(html).toContain(`background: url("${png}")`);
    expect(html).toContain(`<img src="${png}">`);
    expect(html).toContain('<img src="data:image/svg+xml;utf8,%3Csvg%3E%3C%2Fsvg%3E">');
    expect(missing).toEqual([]);
  });

  it("lists what's missing and what comes from the internet, and leaves the internet's as it is", () => {
    const page =
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato"><script src="https://cdn.example.com/lib.js"></script><script src="js/gone.js"></script>';
    const { html, missing, remote } = bundleGame({ "index.html": page }, shelf);
    expect(remote.sort()).toEqual([
      "https://cdn.example.com/lib.js",
      "https://fonts.googleapis.com/css2?family=Lato",
    ]);
    expect(missing).toEqual(["js/gone.js"]);
    expect(html).toContain('<script src="https://cdn.example.com/lib.js"></script>');
    expect(html).toContain("<!-- js/gone.js isn't in the game's folder -->");
  });

  it("says so when there's no index.html", () => {
    expect(bundleGame({ "game.js": "" }, shelf).missing).toEqual(["index.html"]);
  });
});

describe("game folders", () => {
  it("reads an old one-file version as a folder with only index.html", () => {
    expect(filesOf("<html></html>", null)).toEqual({ "index.html": "<html></html>" });
    expect(filesOf("", { "index.html": "x", "a.js": "y" })).toEqual({
      "index.html": "x",
      "a.js": "y",
    });
  });

  it("tidies paths, and never leaves the folder", () => {
    expect(cleanPath("./js/./a.js?v=2")).toBe("js/a.js");
    expect(cleanPath("js/../a.js")).toBe("a.js");
    expect(cleanPath("../../etc/passwd")).toBe("../../etc/passwd");
  });

  it("finds the shelf files a page uses", () => {
    expect(
      shelfPathsIn({
        "index.html":
          '<script src="studio/three.js"></script><link rel="stylesheet" href="./studio/fonts/vt323.css">',
      }),
    ).toEqual(["studio/three.js", "studio/fonts/vt323.css"]);
  });

  it("says how big a game is", () => {
    expect(sizeOf({ "index.html": "x".repeat(2048), "a.js": "y" })).toBe("2 files, 2 KB");
  });
});
