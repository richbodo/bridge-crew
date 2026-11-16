#!/usr/bin/env bun
/**
 * Builds the shelf (src/lib/shelf.ts) into src/lib/vendor/, from the pinned devDependencies:
 *   - three/three.js: Three.js and its add-ons as one script that defines the global THREE, so
 *     a game needs no imports and the bundle can inline it;
 *   - fonts/<id>.css.txt: each shelf font's @font-face rules, with the fonts inlined as data URLs
 *     (.txt, because Vitest empties any .css import).
 * The output is committed, so the app and the teacher's install never build it. Run it after
 * changing a version: `just shelf`.
 */
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { SHELF_FONTS, THREE_VERSION } from "../src/lib/shelf";

const root = resolve(import.meta.dir, "..");
const vendor = join(root, "src/lib/vendor");
const modules = join(root, "node_modules");

const ADDONS: Record<string, string> = {
  OrbitControls: "controls/OrbitControls.js",
  PointerLockControls: "controls/PointerLockControls.js",
  EffectComposer: "postprocessing/EffectComposer.js",
  RenderPass: "postprocessing/RenderPass.js",
  UnrealBloomPass: "postprocessing/UnrealBloomPass.js",
  OutputPass: "postprocessing/OutputPass.js",
};

async function buildThree() {
  const pkg = JSON.parse(await readFile(join(modules, "three/package.json"), "utf8")) as {
    version: string;
  };
  if (pkg.version !== `0.${THREE_VERSION}.0`) {
    throw new Error(
      `node_modules has three ${pkg.version}, but src/lib/shelf.ts says r${THREE_VERSION}.`,
    );
  }
  const work = await mkdtemp(join(tmpdir(), "shelf-"));
  const entry = join(work, "entry.js");
  await writeFile(
    entry,
    [
      `import * as THREE from "three";`,
      ...Object.entries(ADDONS).map(
        ([name, path]) => `import { ${name} } from "three/addons/${path}";`,
      ),
      // A plain object, so older games that add to THREE (THREE.Foo = ...) still work.
      `globalThis.THREE = { ...THREE, ${Object.keys(ADDONS).join(", ")} };`,
    ].join("\n"),
  );
  const built = await Bun.build({
    entrypoints: [entry],
    format: "iife",
    minify: true,
    root: work,
    plugins: [
      {
        name: "node-modules",
        setup(build) {
          build.onResolve({ filter: /^three(\/|$)/ }, (args) => ({
            path:
              args.path === "three"
                ? join(modules, "three/build/three.module.js")
                : join(modules, "three/examples/jsm", args.path.replace(/^three\/addons\//, "")),
          }));
        },
      },
    ],
  });
  await rm(work, { recursive: true, force: true });
  if (!built.success) throw new AggregateError(built.logs, "Three.js didn't build.");
  const code = (await built.outputs[0]!.text()).replaceAll("</script", "<\\/script");
  const header = `/*! Three.js r${THREE_VERSION} with ${Object.keys(ADDONS).join(", ")}. Copyright 2010-2025 Three.js Authors. SPDX-License-Identifier: MIT. Built for the Bridge Crew shelf by scripts/build-shelf.ts. */\n`;
  await mkdir(join(vendor, "three"), { recursive: true });
  await writeFile(join(vendor, "three/three.js"), header + code);
  await writeFile(
    join(vendor, "three/LICENSE"),
    await readFile(join(modules, "three/LICENSE"), "utf8"),
  );
  console.log(`three/three.js: ${Math.round((header.length + code.length) / 1024)} KB`);
}

async function buildFonts() {
  await mkdir(join(vendor, "fonts"), { recursive: true });
  for (const font of SHELF_FONTS) {
    const dir = join(modules, "@fontsource", font.id);
    const licence = await readFile(join(dir, "LICENSE"), "utf8");
    const copyright = licence.split("\n")[0]?.trim() ?? "";
    const faces = await Promise.all(
      font.weights.map(async (weight) => {
        const file = await readFile(join(dir, "files", `${font.id}-latin-${weight}-normal.woff2`));
        return `@font-face{font-family:"${font.family}";font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${file.toString("base64")}) format("woff2")}`;
      }),
    );
    const css = `/*! ${font.family}: ${copyright}. SIL Open Font License 1.1 (see OFL.txt beside this file, or https://openfontlicense.org). */\n${faces.join("\n")}\n`;
    await writeFile(join(vendor, "fonts", `${font.id}.css.txt`), css);
    console.log(`fonts/${font.id}.css.txt: ${Math.round(css.length / 1024)} KB`);
  }
  const ofl = await readFile(join(modules, "@fontsource", SHELF_FONTS[0]!.id, "LICENSE"), "utf8");
  // The licence text after each font's own copyright line is the same for every font.
  await writeFile(join(vendor, "fonts/OFL.txt"), ofl.slice(ofl.indexOf("This Font Software")));
}

await buildThree();
await buildFonts();
