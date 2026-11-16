import { cleanPath, ENTRY, type GameFiles } from "./bundle";
import { fontPath, SHELF_DIR, shelfFont, THREE_PATH, THREE_VERSION } from "./shelf";

/**
 * Bringing in a game (docs/plans/bigger-games-2026-11-16.md Part 4): a game made elsewhere, as
 * a folder or one HTML file, tidied to become a room's next version. Pure — no IO; the browser
 * reads the files and the server stores them.
 */

/** Text files are kept as they are; pictures and fonts come as data URLs. */
export const TEXT_FILES = /\.(html?|js|mjs|css|json|md|txt|svg|csv|glsl|frag|vert)$/i;
export const DATA_FILES = /\.(png|jpe?g|gif|webp|woff2?|ttf|otf)$/i;
/** The most a game can bring in. */
export const MAX_FILE_BYTES = 2_000_000;
export const MAX_GAME_BYTES = 6_000_000;
export const MAX_GAME_FILES = 200;

export interface BroughtIn {
  files: GameFiles;
  /** A title from the folder's name: "rapid unscheduled lab". */
  title: string;
  /** What changed on the way in, and what was left out, in words. */
  notes: string[];
  /** It needs a Bigger room: several files, or a shelf library. */
  needsBigger: boolean;
  /** The Three.js it was written for, when that wasn't the shelf's: 128 for r128. */
  oldThree: number | null;
}

/** Why a game needs a Bigger room, as the room and the lobby say it: "This game has 3 files". */
export function whyBigger(game: BroughtIn): string {
  const count = Object.keys(game.files).length;
  return `This game ${count > 1 ? `has ${count} files` : "uses Three.js"}, so it needs a Bigger room.`;
}

/** Folders and files that are never part of a game. */
function skipped(path: string): boolean {
  return path
    .split("/")
    .some((part) => part.startsWith(".") || part === "node_modules" || part === "__MACOSX");
}

/**
 * Tidies the files a person picked: drops what isn't part of a game, takes off the folder's own
 * name, finds the page, and switches the internet's Three.js and fonts for the shelf's copies.
 * Throws, in words, if there's no game in it.
 */
export function bringIn(
  picked: Record<string, string>,
  folderName = "",
  leftOut: string[] = [],
): BroughtIn {
  const notes: string[] = [];
  let entries = Object.entries(picked)
    .map(([path, body]): [string, string] => [cleanPath(path), body])
    .filter(([path]) => path && !skipped(path));

  // A picked folder's paths start with its own name, which isn't part of the game.
  const first = entries[0]?.[0].split("/")[0];
  let title = folderName;
  if (first && entries.length && entries.every(([path]) => path.startsWith(`${first}/`))) {
    entries = entries.map(([path, body]) => [path.slice(first.length + 1), body]);
    title ||= first;
  }

  const files: GameFiles = {};
  let total = 0;
  const left: string[] = [...leftOut];
  for (const [path, body] of entries) {
    if (path.startsWith(SHELF_DIR)) continue;
    if (!TEXT_FILES.test(path) && !DATA_FILES.test(path)) {
      left.push(path);
      continue;
    }
    if (body.length > MAX_FILE_BYTES || total + body.length > MAX_GAME_BYTES) {
      left.push(`${path} (too big)`);
      continue;
    }
    if (Object.keys(files).length >= MAX_GAME_FILES) {
      left.push(path);
      continue;
    }
    files[path] = body;
    total += body.length;
  }
  if (left.length)
    notes.push(
      `Left out: ${left.slice(0, 8).join(", ")}${left.length > 8 ? `, and ${left.length - 8} more` : ""}.`,
    );

  // The page: index.html, or the only HTML file at the top of the folder.
  if (!(ENTRY in files)) {
    const pages = Object.keys(files).filter(
      (path) => !path.includes("/") && /\.html?$/i.test(path),
    );
    if (pages.length !== 1) {
      throw new Error(
        pages.length
          ? `There are ${pages.length} HTML pages and no index.html, so it isn't clear which one starts the game.`
          : "There's no HTML page, so there's no game to bring in.",
      );
    }
    const page = pages[0]!;
    files[ENTRY] = files[page]!;
    delete files[page];
    title ||= page.replace(/\.html?$/i, "");
  }

  let page = files[ENTRY]!;
  let oldThree: number | null = null;
  let usesThree = false;

  // Three.js from a CDN becomes the shelf's, and the add-ons it already has are dropped.
  page = page.replace(
    /<script\b[^>]*\ssrc\s*=\s*["']?([^"'\s>]+)["']?[^>]*>\s*<\/script\s*>/gi,
    (tag, src: string) => {
      if (!/^(?:https?:)?\/\//i.test(src) || !/three/i.test(src)) return tag;
      if (/\/examples\/js\//i.test(src)) {
        const name = /([A-Za-z]+)\.js$/.exec(src)?.[1] ?? src;
        const included = [
          "OrbitControls",
          "PointerLockControls",
          "EffectComposer",
          "RenderPass",
          "UnrealBloomPass",
          "OutputPass",
        ];
        if (included.includes(name)) return "";
        notes.push(`It loads ${name} for Three.js from the internet, which the studio can't.`);
        return tag;
      }
      if (usesThree) return "";
      usesThree = true;
      const version = /three@0\.(\d+)/i.exec(src) ?? /\/r(\d+)\//i.exec(src);
      const number = version ? Number(version[1]) : null;
      if (number !== THREE_VERSION) oldThree = number;
      notes.push(
        `It loaded Three.js${number ? ` r${number}` : ""} from the internet. It now uses the studio's Three.js r${THREE_VERSION}${number && number !== THREE_VERSION ? ", which may look different" : ""}.`,
      );
      return `<script src="${THREE_PATH}"></script>`;
    },
  );

  // Fonts from Google Fonts become the shelf's, where it has them.
  const kept: string[] = [];
  const missing: string[] = [];
  page = page.replace(/<link\b[^>]*>/gi, (tag) => {
    const href = /\shref\s*=\s*["']?([^"'\s>]+)/i.exec(tag)?.[1] ?? "";
    if (!/^(?:https?:)?\/\/fonts\.(?:googleapis|gstatic)\.com/i.test(href)) return tag;
    if (!/stylesheet/i.test(tag)) return "";
    const links: string[] = [];
    for (const match of href.replace(/&amp;/g, "&").matchAll(/family=([^&:]+)/g)) {
      const family = decodeURIComponent(match[1] ?? "").replace(/\+/g, " ");
      const font = shelfFont(family);
      if (font) {
        kept.push(font.family);
        links.push(`<link rel="stylesheet" href="${fontPath(font)}">`);
      } else {
        missing.push(family);
      }
    }
    return links.join("\n");
  });
  if (kept.length) notes.push(`Its fonts now come from the studio: ${kept.join(", ")}.`);
  if (missing.length) {
    notes.push(
      `These fonts aren't in the studio, so the browser's own stand in: ${missing.join(", ")}.`,
    );
  }

  for (const match of page.matchAll(/\s(?:src|href)\s*=\s*["']?((?:https?:)?\/\/[^"'\s>]+)/gi)) {
    const url = match[1] ?? "";
    if (!/fonts\.googleapis|fonts\.gstatic/i.test(url)) {
      notes.push(
        `It asks the internet for ${url.length > 80 ? `${url.slice(0, 77)}…` : url}, which the studio blocks.`,
      );
    }
  }
  files[ENTRY] = page;

  // A README or a spec doesn't make a game bigger; a second script or a shelf library does.
  const parts = Object.keys(files).filter((path) => !/\.(md|txt)$/i.test(path));
  const needsBigger = parts.length > 1 || usesThree;

  return { files, title: title.replace(/[-_]+/g, " ").trim(), notes, needsBigger, oldThree };
}
