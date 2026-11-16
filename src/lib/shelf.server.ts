import THREE_JS from "./vendor/three/three.js?raw";
import { fontPath, SHELF_FONTS, THREE_PATH } from "./shelf";

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

const FILES = new Map<string, string>([
  [THREE_PATH, THREE_JS],
  ...SHELF_FONTS.map((font): [string, string] => [
    fontPath(font),
    FONTS[`./vendor/fonts/${font.id}.css.txt`] ?? "",
  ]),
]);

export function shelfFile(path: string): string | undefined {
  return FILES.get(path.replace(/^\.\//, ""));
}
