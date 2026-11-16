/**
 * The shelf (docs/plans/bigger-games-2026-11-16.md): the libraries and fonts the studio keeps on
 * the laptop for games to use, at versions the crew is told. A game asks for one by path, such
 * as <script src="studio/three.js">, and the bundle inlines it (src/lib/bundle.ts). The files
 * themselves are built by scripts/build-shelf.ts into src/lib/vendor/ and read by
 * src/lib/shelf.server.ts. Pure — no IO.
 */

/** Where a game's folder finds the shelf. */
export const SHELF_DIR = "studio/";

export const THREE_VERSION = 180;
export const THREE_PATH = "studio/three.js";

/** What the crew is told about Three.js on the shelf. */
export const THREE_NOTE = `Three.js r${THREE_VERSION}, loaded with <script src="${THREE_PATH}"></script> before the game's own scripts. It defines the global THREE (no import statements), with these add-ons on it too: THREE.OrbitControls, THREE.PointerLockControls, THREE.EffectComposer, THREE.RenderPass, THREE.UnrealBloomPass and THREE.OutputPass. Since r155, lights use physical units and colours are managed: set renderer.outputColorSpace = THREE.SRGBColorSpace (the default), and expect to need brighter lights than old examples use.`;

export interface ShelfFont {
  /** The CSS font-family, as Google Fonts names it. */
  family: string;
  /** The @fontsource package's name, and the file under studio/fonts/. */
  id: string;
  weights: number[];
}

/** Open Font License fonts: pixel, terminal, display, sans and mono. */
export const SHELF_FONTS: ShelfFont[] = [
  { family: "Press Start 2P", id: "press-start-2p", weights: [400] },
  { family: "VT323", id: "vt323", weights: [400] },
  { family: "Audiowide", id: "audiowide", weights: [400] },
  { family: "Oxanium", id: "oxanium", weights: [500, 700] },
  { family: "Chakra Petch", id: "chakra-petch", weights: [500, 600, 700] },
  { family: "Barlow Condensed", id: "barlow-condensed", weights: [500, 700, 800] },
  { family: "IBM Plex Sans", id: "ibm-plex-sans", weights: [400, 500, 600] },
  { family: "IBM Plex Mono", id: "ibm-plex-mono", weights: [400, 500] },
];

export function fontPath(font: ShelfFont): string {
  return `${SHELF_DIR}fonts/${font.id}.css`;
}

/** The shelf font with this family name, ignoring case and spaces: "IBM+Plex+Sans" finds it. */
export function shelfFont(family: string): ShelfFont | undefined {
  const key = family.replace(/[+\s_-]+/g, "").toLowerCase();
  return SHELF_FONTS.find((font) => font.family.replace(/\s+/g, "").toLowerCase() === key);
}

/** What the crew is told about the fonts on the shelf. */
export const FONTS_NOTE = `Fonts: ${SHELF_FONTS.map((font) => `"${font.family}" (<link rel="stylesheet" href="${fontPath(font)}">)`).join(", ")}. Nothing else can load fonts, so use one of these or the browser's own (sans-serif, serif, monospace).`;

/** Every path on the shelf. */
export function shelfPaths(): string[] {
  return [THREE_PATH, ...SHELF_FONTS.map(fontPath)];
}

export function isShelfPath(path: string): boolean {
  return shelfPaths().includes(path.replace(/^\.\//, ""));
}
