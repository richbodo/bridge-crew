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
/**
 * The same Three.js for games written as modules (docs/plans/games-on-github-2026-11-16.md
 * Part 2): `import * as THREE from "three"`, which a game's import map points here.
 */
export const THREE_MODULE_PATH = "studio/three.module.js";
/** Where `three/addons/…` points, as a game's import map has it. */
export const THREE_ADDONS_DIR = "studio/three/addons/";

/** The add-ons on the shelf, by name, and their paths under three/addons/. */
export const THREE_ADDONS: Record<string, string> = {
  OrbitControls: "controls/OrbitControls.js",
  PointerLockControls: "controls/PointerLockControls.js",
  EffectComposer: "postprocessing/EffectComposer.js",
  RenderPass: "postprocessing/RenderPass.js",
  UnrealBloomPass: "postprocessing/UnrealBloomPass.js",
  OutputPass: "postprocessing/OutputPass.js",
};

/** The import map a module game's page has, so `three` and its add-ons come from the shelf. */
export const THREE_IMPORTS: Record<string, string> = {
  three: `./${THREE_MODULE_PATH}`,
  "three/addons/": `./${THREE_ADDONS_DIR}`,
};

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

/** What the crew is told about a game written as modules. */
export const MODULES_NOTE = `This game is written as JavaScript modules (<script type="module">), so keep it that way: keep its import statements, and import between its own files with relative paths ("./world.js"). Import Three.js r${THREE_VERSION} as \`import * as THREE from "three"\`, and the add-ons on the shelf from "three/addons/…": ${Object.values(THREE_ADDONS).join(", ")}. The page's import map points these at the shelf; leave it as it is. Nothing else can be imported from outside the game's folder.`;

/** What the crew is told about the fonts on the shelf. */
export const FONTS_NOTE = `Fonts: ${SHELF_FONTS.map((font) => `"${font.family}" (<link rel="stylesheet" href="${fontPath(font)}">)`).join(", ")}. Nothing else can load fonts, so use one of these or the browser's own (sans-serif, serif, monospace).`;

/** Every path on the shelf. */
export function shelfPaths(): string[] {
  return [
    THREE_PATH,
    THREE_MODULE_PATH,
    ...Object.values(THREE_ADDONS).map((path) => `${THREE_ADDONS_DIR}${path}`),
    ...SHELF_FONTS.map(fontPath),
  ];
}

export function isShelfPath(path: string): boolean {
  return shelfPaths().includes(path.replace(/^\.\//, ""));
}
