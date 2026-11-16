import { createHash } from "node:crypto";

import { rolldown, type RolldownOutput } from "rolldown";

import { cleanPath, ENTRY, type GameFiles, type ShelfLookup } from "./bundle";
import {
  importMapOf,
  isModuleGame,
  lineTable,
  mapSpecifier,
  threeUrl,
  withoutImportMaps,
  type ImportMap,
} from "./modules";
import { isShelfPath, THREE_ADDONS_DIR, THREE_MODULE_PATH, THREE_PATH } from "./shelf";
import { THREE_MODULE_SHIM } from "./shelf.server";

/**
 * Builds a module game's scripts (docs/plans/games-on-github-2026-11-16.md Part 2). Each
 * <script type="module"> on the page, with everything it imports from the game's folder and the
 * shelf, becomes one inline module script, which the bundle (src/lib/bundle.ts) then leaves as
 * it is. `three` and `three/addons/…` come from the shelf, as the page's import map says; with
 * studio/three.js on the page first, modules and plain scripts share one Three.js. Anything
 * imported from the internet stays out, and the content policy blocks it. Rolldown, Vite's own
 * bundler, does the building.
 */

export interface Linked {
  files: GameFiles;
  /** Files imported that aren't in the folder or on the shelf. */
  missing: string[];
  /** Things imported from the internet, which the studio blocks. */
  remote: string[];
}

const REMOTE = /^(?:https?:)?\/\//i;
const THREE_ID = "\0three";
const SHELF = "\0shelf:";
const INLINE = "\0inline:";

function scriptSafe(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");
}

function attr(attrs: string, name: string): string | undefined {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(
    ` ${attrs}`,
  );
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

/** The folder of the file a module id stands for: "js" for "/js/main.js". */
function folderOf(id: string): string {
  if (id.startsWith(INLINE)) return "";
  const path = id.startsWith(SHELF) ? id.slice(SHELF.length) : id.replace(/^\//, "");
  return path.split("/").slice(0, -1).join("/");
}

/** Rolldown's error, in words: "Unexpected token (in js/main.js, line 2)". */
function buildProblem(error: unknown): string {
  const text = String((error as Error)?.message ?? error)
    // eslint-disable-next-line no-control-regex
    .replace(/\u001b\[[0-9;]*m/g, "");
  const what =
    /\[[A-Z_]+\]\s*(?:Error:\s*)?([^\n╭]+)/.exec(text)?.[1]?.trim() ?? text.split("\n")[0]!;
  const where = /(?:\.\.\/)*([\w./-]+\.(?:m?js|json)):(\d+):\d+/.exec(text);
  return `${what}${where ? ` (in ${where[1]}, line ${where[2]})` : ""}`;
}

const cache = new Map<string, Linked>();

/** Builds each module script on the page into one. A page without any comes back as it is. */
export async function linkModules(files: GameFiles, shelf: ShelfLookup): Promise<Linked> {
  const page = files[ENTRY];
  if (page === undefined || !isModuleGame(page)) return { files, missing: [], remote: [] };

  const key = createHash("sha256").update(JSON.stringify(files)).digest("hex");
  const cached = cache.get(key);
  if (cached) return cached;

  const map: ImportMap = importMapOf(page);
  const missing = new Set<string>();
  const remote = new Set<string>();
  let usesThree = false;

  const scripts = [...page.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].filter(
    (match) => (attr(match[1] ?? "", "type") ?? "").toLowerCase() === "module",
  );

  const built: string[] = [];
  for (const [index, match] of scripts.entries()) {
    const src = attr(match[1] ?? "", "src");
    const entry = src !== undefined ? `/${cleanPath(src)}` : `${INLINE}${index}`;
    const name = src !== undefined ? cleanPath(src) : ENTRY;
    // An inline script's lines are the page's, from the line it starts on.
    const offset =
      src !== undefined
        ? 0
        : page.slice(0, (match.index ?? 0) + match[0].indexOf(">") + 1).split("\n").length - 1;
    if (src !== undefined && REMOTE.test(src)) {
      remote.add(src);
      built.push(match[0]);
      continue;
    }
    if (src !== undefined && files[cleanPath(src)] === undefined) {
      missing.add(cleanPath(src));
      built.push(`<!-- ${cleanPath(src)} isn't in the game's folder -->`);
      continue;
    }

    const resolve = (
      specifier: string,
      importer: string | undefined,
    ): string | { id: string; external: true } => {
      const mapped = mapSpecifier(map, specifier);
      let target = mapped ?? specifier;
      if (REMOTE.test(target)) {
        const three = threeUrl(target);
        if (!three) {
          remote.add(target);
          return { id: target, external: true };
        }
        target = three.specifier;
      }
      if (target === "three") target = THREE_MODULE_PATH;
      else if (/^three\/(?:addons|examples\/jsm)\//.test(target)) {
        target = `${THREE_ADDONS_DIR}${target.replace(/^three\/(?:addons|examples\/jsm)\//, "")}`;
      } else if (/^\.{0,2}\//.test(target)) {
        // A mapped path is the page's; an imported one is the importing file's.
        const from = mapped !== null || target.startsWith("/") ? "" : folderOf(importer ?? "");
        target = cleanPath(target.startsWith("/") ? target.slice(1) : `${from}/${target}`);
      } else {
        missing.add(specifier);
        return { id: specifier, external: true };
      }
      if (target === THREE_MODULE_PATH) {
        usesThree = true;
        return THREE_ID;
      }
      if (isShelfPath(target)) return `${SHELF}${target}`;
      if (files[target] !== undefined) return `/${target}`;
      missing.add(target);
      return { id: target, external: true };
    };

    let output: RolldownOutput;
    try {
      const bundle = await rolldown({
        input: entry,
        logLevel: "silent",
        treeshake: false,
        plugins: [
          {
            name: "game-folder",
            resolveId(specifier, importer) {
              if (specifier === entry) return entry;
              return resolve(specifier, importer);
            },
            load(id) {
              if (id === THREE_ID) return THREE_MODULE_SHIM;
              if (id.startsWith(INLINE)) return match[2] ?? "";
              if (id.startsWith(SHELF)) return shelf(id.slice(SHELF.length)) ?? "";
              const path = id.replace(/^\//, "");
              // Rolldown reads a .json file as JSON itself. Never null, which would send Rolldown
              // to the laptop's own disk: every id here was checked against the game's files.
              return files[path] ?? "";
            },
          },
        ],
      });
      output = await bundle.generate({ format: "esm", sourcemap: true });
      await bundle.close();
    } catch (error) {
      // The game can't run; say why, where the crash reporter will see it.
      const problem = buildProblem(error);
      built.push(
        `<script>throw new SyntaxError(${JSON.stringify(`The game's modules didn't build: ${problem}`)});</script>`,
      );
      continue;
    }

    const chunk = output.output[0];
    const label = `module-${index + 1}.js`;
    const sources = (chunk.map?.sources ?? []).map((source) => {
      if (source.includes("inline:")) return name;
      const clean = source.replace(/^(?:\.\.\/)+/, "").replace(/^\0?shelf:/, "");
      return clean;
    });
    const table = chunk.map ? lineTable(chunk.map.mappings) : [];
    if (offset) {
      for (let i = 0; i < table.length; i += 2) {
        if (sources[(table[i] ?? 0) - 1] === ENTRY && table[i + 1]) table[i + 1]! += offset;
      }
    }
    const lines = `<script>(self.__bridgeCrewLines = self.__bridgeCrewLines || {})[${JSON.stringify(label)}] = ${JSON.stringify({ sources, lines: table })};</script>`;
    built.push(
      `${lines}\n<script type="module">${scriptSafe(chunk.code)}\n//# sourceURL=${label}\n</script>`,
    );
  }

  // Each module script becomes its build; the import maps have done their job.
  let n = 0;
  let html = page.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (whole, attrs: string) =>
    (attr(attrs, "type") ?? "").toLowerCase() === "module" ? (built[n++] ?? whole) : whole,
  );
  html = withoutImportMaps(html);
  // Modules get Three.js from the global THREE, so the page loads the shelf's first.
  if (usesThree && !new RegExp(`src\\s*=\\s*["']?(?:\\./)?${THREE_PATH}`, "i").test(html)) {
    const first = html.search(/<script\b/i);
    const tag = `<script src="${THREE_PATH}"></script>\n`;
    html = first < 0 ? `${tag}${html}` : `${html.slice(0, first)}${tag}${html.slice(first)}`;
  }

  const linked: Linked = {
    files: { ...files, [ENTRY]: html },
    missing: [...missing],
    remote: [...remote],
  };
  if (cache.size > 30) cache.delete(cache.keys().next().value!);
  cache.set(key, linked);
  return linked;
}
