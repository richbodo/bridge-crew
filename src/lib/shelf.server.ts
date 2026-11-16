import THREE_EXPORTS from "./vendor/three/exports.txt?raw";
import THREE_JS from "./vendor/three/three.js?raw";
import {
  fontPath,
  SHELF_FONTS,
  THREE_ADDONS,
  THREE_ADDONS_DIR,
  THREE_MODULE_PATH,
  THREE_PATH,
} from "./shelf";

/**
 * The shelf's files (src/lib/shelf.ts), for the bundle. Server-only: Three.js alone is 730 KB,
 * so it never goes into the room's own JavaScript. Built by scripts/build-shelf.ts.
 */

// Saved as .css.txt: Vitest turns any .css import into nothing, even with ?raw.
const FONTS = import.meta.glob<string>("./vendor/fonts/*.css.txt", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * For a game written as modules: Three.js's names, from the global THREE that studio/three.js
 * defines. The bundle uses this with studio/three.js on the page before it
 * (src/lib/modules.server.ts), so a game's modules and plain scripts share one Three.js.
 */
export const THREE_MODULE_SHIM = `export const { ${THREE_EXPORTS.trim().split(/\s+/).join(", ")} } = globalThis.THREE;\n`;

const FILES = new Map<string, string>([
  [THREE_PATH, THREE_JS],
  // On its own, as a folder on disk or on GitHub Pages has it, the module defines THREE itself.
  [THREE_MODULE_PATH, `${THREE_JS}\n${THREE_MODULE_SHIM}`],
  ...Object.entries(THREE_ADDONS).map(([name, path]): [string, string] => [
    `${THREE_ADDONS_DIR}${path}`,
    `export { ${name} } from "${"../".repeat(path.split("/").length + 1)}three.module.js";\n`,
  ]),
  ...SHELF_FONTS.map((font): [string, string] => [
    fontPath(font),
    FONTS[`./vendor/fonts/${font.id}.css.txt`] ?? "",
  ]),
]);

export function shelfFile(path: string): string | undefined {
  return FILES.get(path.replace(/^\.\//, ""));
}
