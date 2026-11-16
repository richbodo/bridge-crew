import { chromium, type Browser, type Page } from "playwright-core";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { bringIn } from "../bring-in";
import { shelfPathsIn } from "../bundle";
import { CRASH_MESSAGE, prepareGame } from "../game-file";
import { bundleOf } from "../game-store.server";
import { importMapOf, lineTable, mapSpecifier, threeUrl } from "../modules";
import { THREE_IMPORTS } from "../shelf";
import { shelfFile } from "../shelf.server";

/**
 * Games written as modules (docs/plans/games-on-github-2026-11-16.md Part 2): Bring in points
 * their Three.js at the shelf, the bundle builds their modules, and they play, in a real browser.
 */

let browser: Browser;
beforeAll(async () => {
  browser = await chromium.launch();
}, 30_000);
afterAll(async () => {
  await browser?.close();
});

async function inRoomFrame(game: string): Promise<Page> {
  const page = await browser.newPage();
  const srcdoc = game.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  await page.setContent(`<!doctype html><body><script>
    window.sent = [];
    addEventListener("message", (e) => window.sent.push(e.data));
  </script><iframe sandbox="allow-scripts allow-pointer-lock" style="width:400px;height:300px" srcdoc="${srcdoc}"></iframe></body>`);
  await page.frames()[1]!.waitForLoadState("load");
  return page;
}

const crashes = async (page: Page) =>
  (
    await page.evaluate(
      () => (window as unknown as { sent: { type?: string; message?: string }[] }).sent,
    )
  )
    .filter((m) => m.type === CRASH_MESSAGE)
    .map((m) => m.message);

/** A small Three.js game written as modules, as tutorials write them. */
const TUTORIAL = {
  "cube/index.html": `<!doctype html><html><head>
<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
  { "imports": {
      "three": "https://unpkg.com/three@0.150.1/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.150.1/examples/jsm/" } }
</script>
</head><body>
<script type="module" src="./js/main.js"></script>
</body></html>`,
  "cube/js/main.js": `import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { makeCube } from "./world/cube.js";
import level from "../data/level.json" with { type: "json" };

const scene = new THREE.Scene();
scene.add(makeCube(THREE, level.size));
document.body.dataset.ok = [THREE.REVISION, typeof OrbitControls, scene.children[0].geometry.parameters.width].join(",");
`,
  "cube/js/world/cube.js": `export function makeCube(THREE, size) {
  return new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial());
}
`,
  "cube/data/level.json": `{ "size": 3 }`,
};

describe("bringing in a game written as modules", () => {
  it("points its import map at the shelf, and drops es-module-shims", () => {
    const game = bringIn(TUTORIAL);
    const page = game.files["index.html"]!;
    expect(importMapOf(page)).toEqual(THREE_IMPORTS);
    expect(page).not.toContain("unpkg");
    expect(page).not.toContain("es-module-shims");
    expect(game.needsBigger).toBe(true);
    expect(game.oldThree).toBe(150);
    expect(game.notes).toContain(
      "It's written as modules, and imported Three.js r150 from the internet. It now uses the studio's Three.js r180, which may look different.",
    );
  });

  it("rewrites imports straight from a CDN, and names add-ons the shelf doesn't have", () => {
    const game = bringIn({
      "index.html": `<script type="module">
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
</script>`,
    });
    const page = game.files["index.html"]!;
    expect(page).toContain('from "three"');
    expect(page).toContain('from "three/addons/loaders/GLTFLoader.js"');
    expect(importMapOf(page)).toEqual(THREE_IMPORTS);
    expect(game.notes).toContain(
      "It uses GLTFLoader from Three.js's add-ons, which isn't on the studio's shelf.",
    );
  });

  it("leaves a module game without Three.js as it is, and in a Simple room", () => {
    const page = `<script type="module">import { a } from "./a.js"; console.log(a);</script>`;
    const game = bringIn({ "index.html": page });
    expect(game.files["index.html"]).toBe(page);
    expect(game.needsBigger).toBe(false);
  });
});

describe("building a game's modules", () => {
  it("plays: its own modules, JSON, Three.js and an add-on from the shelf, one Three.js", async () => {
    const { files } = bringIn(TUTORIAL);
    const bundle = await bundleOf(files);
    expect(bundle.missing).toEqual([]);
    expect(bundle.remote).toEqual([]);
    expect(bundle.html).not.toContain("importmap");
    expect(bundle.html.match(/Three\.js r180 with/g)).toHaveLength(1);

    const page = await inRoomFrame(prepareGame(bundle.html, { inRoom: true }));
    const frame = page.frames()[1]!;
    await expect
      .poll(() => frame.evaluate(() => document.body.dataset["ok"]))
      .toBe("180,function,3");
    expect(await crashes(page)).toEqual([]);
    await page.close();
  });

  it("names the game's own file and line when a module crashes", async () => {
    const bundle = await bundleOf({
      "index.html": `<html><head></head><body><script type="module" src="js/main.js"></script></body></html>`,
      "js/main.js": `import { dig } from "./mole.js";\n\ndig();\n`,
      "js/mole.js": `const CONFIG = {};\n\nexport function dig() {\n  CONFIG.holes.push(1);\n}\n`,
    });
    const page = await inRoomFrame(prepareGame(bundle.html, { inRoom: true }));
    await expect
      .poll(() => crashes(page))
      .toEqual([expect.stringContaining("(in js/mole.js, line 4)")]);
    await page.close();
  });

  it("says why when a module doesn't build", async () => {
    const bundle = await bundleOf({
      "index.html": `<html><head></head><body><script type="module" src="js/main.js"></script></body></html>`,
      "js/main.js": `import { dig } from "./mole.js";\ndig(;\n`,
      "js/mole.js": `export function dig() {}\n`,
    });
    const page = await inRoomFrame(prepareGame(bundle.html, { inRoom: true }));
    await expect
      .poll(() => crashes(page))
      .toEqual([
        expect.stringContaining(
          "The game's modules didn't build: Unexpected token (in js/main.js, line 2)",
        ),
      ]);
    await page.close();
  });

  it("names what it imports from elsewhere", async () => {
    const bundle = await bundleOf({
      "index.html": `<script type="module">import "./gone.js"; import confetti from "https://esm.sh/canvas-confetti"; import x from "lodash";</script>`,
    });
    expect(bundle.missing.sort()).toEqual(["gone.js", "lodash"]);
    expect(bundle.remote).toEqual(["https://esm.sh/canvas-confetti"]);
  });

  it("never reads the laptop's disk for a module the folder doesn't have", async () => {
    const bundle = await bundleOf({
      "index.html": `<script type="module" src="../../../../etc/hosts"></script><script type="module">import "/etc/hosts";</script>`,
    });
    expect(bundle.missing.sort()).toEqual(["../../../../etc/hosts", "etc/hosts"]);
    expect(bundle.html).not.toMatch(/localhost/);
  });

  it("leaves the folder playable as a website, with the shelf's files beside it", async () => {
    const { files } = bringIn(TUTORIAL);
    const shelf = shelfPathsIn(files);
    expect(shelf.sort()).toEqual([
      "studio/three.module.js",
      "studio/three/addons/controls/OrbitControls.js",
    ]);
    // Served as GitHub Pages would serve it: the page, its files and the shelf's.
    const site: Record<string, string> = { ...files };
    for (const path of shelf) site[path] = shelfFile(path)!;
    const page = await browser.newPage();
    await page.route("http://game.test/**", (route) => {
      const path = new URL(route.request().url()).pathname.slice(1) || "index.html";
      const body = site[path];
      if (body === undefined) return route.fulfill({ status: 404 });
      const type = path.endsWith(".html")
        ? "text/html"
        : path.endsWith(".json")
          ? "application/json"
          : "text/javascript";
      return route.fulfill({ body, contentType: type });
    });
    await page.goto("http://game.test/");
    await expect
      .poll(() => page.evaluate(() => document.body.dataset["ok"]))
      .toBe("180,function,3");
    await page.close();
  });
});

describe("module helpers", () => {
  it("knows Three.js on the usual CDNs", () => {
    expect(threeUrl("https://unpkg.com/three@0.150.1/build/three.module.js")).toEqual({
      specifier: "three",
      version: 150,
    });
    expect(threeUrl("https://esm.sh/three@0.160.0")).toEqual({ specifier: "three", version: 160 });
    expect(threeUrl("https://cdn.jsdelivr.net/npm/three@0.170.0/+esm")).toEqual({
      specifier: "three",
      version: 170,
    });
    expect(
      threeUrl("https://cdnjs.cloudflare.com/ajax/libs/three.js/0.150.1/three.module.min.js"),
    ).toEqual({ specifier: "three", version: 150 });
    expect(
      threeUrl("https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js"),
    ).toEqual({
      specifier: "three/addons/controls/OrbitControls.js",
      version: 150,
    });
    expect(threeUrl("https://esm.sh/canvas-confetti")).toBeNull();
    expect(threeUrl("./three.module.js")).toBeNull();
  });

  it("maps specifiers as an import map does", () => {
    const map = { three: "./a.js", "lib/": "./vendor/lib/", "lib/deep/": "./deep/" };
    expect(mapSpecifier(map, "three")).toBe("./a.js");
    expect(mapSpecifier(map, "lib/x.js")).toBe("./vendor/lib/x.js");
    expect(mapSpecifier(map, "lib/deep/y.js")).toBe("./deep/y.js");
    expect(mapSpecifier(map, "other")).toBeNull();
  });

  it("reads a source map's lines", () => {
    // Line 1 from source 0 line 0; line 2 nothing; line 3 from source 1 line 4.
    expect(lineTable("AAAA;;ACIA")).toEqual([1, 1, 0, 0, 2, 5]);
  });
});
