import { THREE_ADDONS } from "./shelf";

/**
 * Games written as modules (docs/plans/games-on-github-2026-11-16.md Part 2): a page whose
 * scripts are <script type="module"> and load each other with `import`, as many web games and
 * most of Three.js's examples do. Bring in points their Three.js at the shelf
 * (src/lib/bring-in.ts), and the bundle builds each module script into one
 * (src/lib/modules.server.ts). Pure — no IO.
 */

export type ImportMap = Record<string, string>;

const IMPORT_MAP = /<script\b[^>]*\stype\s*=\s*["']?importmap["']?[^>]*>([\s\S]*?)<\/script\s*>/gi;

/** A page written as modules: it has a module script. */
export function isModuleGame(page: string): boolean {
  return /<script\b[^>]*\stype\s*=\s*["']?module\b/i.test(page);
}

/** The page's import map, its "imports" merged if it has more than one. */
export function importMapOf(page: string): ImportMap {
  const imports: ImportMap = {};
  for (const match of page.matchAll(IMPORT_MAP)) {
    try {
      const parsed = JSON.parse(match[1] ?? "") as { imports?: Record<string, unknown> };
      for (const [key, value] of Object.entries(parsed.imports ?? {})) {
        if (typeof value === "string") imports[key] = value;
      }
    } catch {
      // A broken import map is the browser's problem too; the imports it meant go missing.
    }
  }
  return imports;
}

/** The page without its import maps. */
export function withoutImportMaps(page: string): string {
  return page.replace(IMPORT_MAP, "");
}

/** What a specifier means under an import map: the exact key, else the longest "prefix/" key. */
export function mapSpecifier(map: ImportMap, specifier: string): string | null {
  if (specifier in map) return map[specifier]!;
  let best: string | null = null;
  for (const key of Object.keys(map)) {
    if (key.endsWith("/") && specifier.startsWith(key) && (!best || key.length > best.length)) {
      best = key;
    }
  }
  return best ? map[best]! + specifier.slice(best.length) : null;
}

export interface ThreeUrl {
  /** "three", or "three/addons/controls/OrbitControls.js". */
  specifier: string;
  /** The Three.js release it names, such as 150 for three@0.150.1, if it says. */
  version: number | null;
}

/**
 * A Three.js module on a CDN, as the specifier the shelf answers: unpkg, jsDelivr, esm.sh,
 * Skypack or cdnjs, for three.module.js itself or anything under examples/jsm/ or addons/.
 * Null if it isn't one.
 */
export function threeUrl(url: string): ThreeUrl | null {
  if (!/^(?:https?:)?\/\//i.test(url) || !/three/i.test(url)) return null;
  const version = /three@0\.(\d+)/i.exec(url) ?? /three\.js\/r?0?\.?(\d{2,3})\b/i.exec(url);
  const number = version ? Number(version[1]) : null;
  const addon = /\/(?:examples\/jsm|addons)\/(.+?)(?:\?.*)?$/i.exec(url);
  if (addon) return { specifier: `three/addons/${addon[1]}`, version: number };
  if (
    /three(?:@[^/]+)?(?:\/build\/three\.module(?:\.min)?\.js|\/\+esm|\/?$|\?)/i.test(url) ||
    /three\.module(?:\.min)?\.js/i.test(url)
  ) {
    return { specifier: "three", version: number };
  }
  return null;
}

/** The add-on's name if `three/addons/<path>` is on the shelf. */
export function shelfAddon(specifier: string): string | null {
  const path = specifier.replace(/^three\/(?:addons|examples\/jsm)\//, "");
  return Object.entries(THREE_ADDONS).find(([, addon]) => addon === path)?.[0] ?? null;
}

// ---------- where a bundled module's line came from ----------

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** One segment of a source map's mappings: its numbers, each a base-64 VLQ. */
function decodeSegment(segment: string): number[] {
  const values: number[] = [];
  let value = 0;
  let shift = 0;
  for (const char of segment) {
    const digit = BASE64.indexOf(char);
    if (digit < 0) return values;
    value += (digit & 31) << shift;
    if (digit & 32) {
      shift += 5;
    } else {
      values.push(value & 1 ? -(value >>> 1) : value >>> 1);
      value = 0;
      shift = 0;
    }
  }
  return values;
}

/**
 * For each line of a bundled module, the source file and line it came from, from its source
 * map: [source, line, source, line, …], 0 for lines with no source. The crash reporter uses it
 * to name the game's own file and line (src/lib/game-file.ts).
 */
export function lineTable(mappings: string): number[] {
  const table: number[] = [];
  let source = 0;
  let line = 0;
  for (const generated of mappings.split(";")) {
    let first: [number, number] | null = null;
    for (const segment of generated.split(",")) {
      if (!segment) continue;
      const values = decodeSegment(segment);
      if (values.length >= 4) {
        source += values[1]!;
        line += values[2]!;
        first ??= [source, line];
      }
    }
    // Sources count from 1 here, so 0 means "none"; lines count from 1, as people do.
    table.push(first ? first[0] + 1 : 0, first ? first[1] + 1 : 0);
  }
  return table;
}
