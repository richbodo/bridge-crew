import { isShelfPath, THREE_ADDONS_DIR, THREE_MODULE_PATH } from "./shelf";

/**
 * A game folder and its bundle (docs/plans/bigger-games-2026-11-16.md Part 1). A version is a
 * folder of files: index.html, which the browser opens first, and whatever else the game
 * needs. The bundle is one HTML file made from the folder, with its scripts, styles, pictures
 * and shelf files inlined, so the big screen, the Tester and Download all run the same thing,
 * and the family's copy plays offline. Pure — no IO; the shelf's files come in as a lookup.
 */

/** A game folder: each file's path, and its content. Pictures and fonts are data URLs. */
export type GameFiles = Record<string, string>;

export const ENTRY = "index.html";

/** The shelf's file at a path, such as studio/three.js (src/lib/shelf.server.ts). */
export type ShelfLookup = (path: string) => string | undefined;

/** A version's files: a folder version's, or an old one-file version's HTML as index.html. */
export function filesOf(body: string, files?: GameFiles | null): GameFiles {
  return files && Object.keys(files).length ? files : { [ENTRY]: body };
}

export interface Bundle {
  html: string;
  /** Files the page asks for that aren't in the folder or on the shelf. */
  missing: string[];
  /** Things the page asks for from the internet, which the studio blocks. */
  remote: string[];
}

const REMOTE = /^(?:https?:)?\/\//i;

/** "./js/a.js", "js/./a.js" → "js/a.js". Paths leaving the folder stay as they are, and miss. */
export function cleanPath(path: string): string {
  const parts: string[] = [];
  for (const part of path.split(/[?#]/)[0]!.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === ".." && parts.length && parts[parts.length - 1] !== "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

function attr(tag: string, name: string): string | undefined {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(tag);
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

function hasAttr(tag: string, name: string): boolean {
  return new RegExp(`\\s${name}(?=[\\s=>/])`, "i").test(tag);
}

/** Code that's safe inside a <script> element. */
function scriptSafe(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");
}

/** A picture or font as a data URL: as stored, or an SVG's text. */
function asDataUrl(path: string, content: string): string | undefined {
  if (content.startsWith("data:")) return content;
  if (/\.svg$/i.test(path)) return `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;
  return undefined;
}

/**
 * A path a script builds as it runs, such as `img/${name}.png` in a template: not a file to find.
 * The bundle meets these because a page's scripts are inlined before its pictures are.
 */
function builtByCode(ref: string): boolean {
  return /\$\{|\{\{|["'`+]/.test(ref);
}

/** url(...) in CSS, pointing at a picture or font in the folder, as a data URL. */
function inlineCssUrls(
  css: string,
  files: GameFiles,
  missing: Set<string>,
  remote: Set<string>,
): string {
  return css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (whole, _q: string, ref: string) => {
    if (ref.startsWith("data:") || ref.startsWith("#") || builtByCode(ref)) return whole;
    if (REMOTE.test(ref)) {
      remote.add(ref);
      return whole;
    }
    const path = cleanPath(ref);
    const content = files[path];
    const url = content === undefined ? undefined : asDataUrl(path, content);
    if (!url) {
      missing.add(path);
      return whole;
    }
    return `url("${url}")`;
  });
}

/**
 * The bundle: index.html with every <script src>, <link rel="stylesheet"> and picture from the
 * folder or the shelf inlined. Each script ends with a sourceURL line, so an error names its
 * file and line. A deferred script moves to the end of the page, where it runs at the same
 * point. Anything from the internet stays as it is, and the content policy blocks it.
 */
export function bundleGame(files: GameFiles, shelf: ShelfLookup): Bundle {
  const missing = new Set<string>();
  const remote = new Set<string>();
  const page = files[ENTRY];
  if (page === undefined) {
    return {
      html: "<!doctype html><title>No game</title><p>This version has no index.html.</p>",
      missing: [ENTRY],
      remote: [],
    };
  }
  const deferred: string[] = [];

  let html = page.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (whole, attrs: string) => {
    const src = attr(` ${attrs}`, "src");
    if (src === undefined) return whole;
    if (REMOTE.test(src)) {
      remote.add(src);
      return whole;
    }
    const path = cleanPath(src);
    const code = isShelfPath(path) ? shelf(path) : files[path];
    if (code === undefined) {
      missing.add(path);
      return `<!-- ${path} isn't in the game's folder -->`;
    }
    const rest = attrs.replace(
      /\s(?:src|defer|async)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi,
      "",
    );
    // The code starts on the script's first line, so an error's line is the file's line.
    const inline = `<script${rest}>${scriptSafe(code)}\n//# sourceURL=${path}\n</script>`;
    const module = (attr(` ${attrs}`, "type") ?? "").toLowerCase() === "module";
    if (hasAttr(` ${attrs}`, "defer") && !module) {
      deferred.push(inline);
      return "";
    }
    return inline;
  });

  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = (attr(tag, "rel") ?? "").toLowerCase();
    const href = attr(tag, "href");
    if (!href) return tag;
    if (REMOTE.test(href)) {
      // Preconnects are harmless; stylesheets and icons from the internet are blocked.
      if (rel.includes("stylesheet") || rel.includes("icon")) remote.add(href);
      return tag;
    }
    const path = cleanPath(href);
    if (rel.includes("stylesheet")) {
      const css = isShelfPath(path) ? shelf(path) : files[path];
      if (css === undefined) {
        missing.add(path);
        return `<!-- ${path} isn't in the game's folder -->`;
      }
      return `<style>/* ${path} */\n${inlineCssUrls(css, files, missing, remote).replace(/<\/style/gi, "<\\/style")}\n</style>`;
    }
    if (rel.includes("icon")) {
      const content = files[path];
      const url = content === undefined ? undefined : asDataUrl(path, content);
      return url ? tag.replace(href, url) : "";
    }
    return tag;
  });

  html = html.replace(
    /<style\b([^>]*)>([\s\S]*?)<\/style\s*>/gi,
    (whole, attrs: string, css: string) =>
      css.includes("url(")
        ? `<style${attrs}>${inlineCssUrls(css, files, missing, remote)}</style>`
        : whole,
  );

  html = html.replace(/<(img|source|audio|video)\b[^>]*>/gi, (tag) => {
    const src = attr(tag, "src");
    if (!src || src.startsWith("data:") || src.startsWith("blob:") || builtByCode(src)) return tag;
    if (REMOTE.test(src)) {
      remote.add(src);
      return tag;
    }
    const path = cleanPath(src);
    const content = files[path];
    const url = content === undefined ? undefined : asDataUrl(path, content);
    if (!url) {
      missing.add(path);
      return tag;
    }
    return tag.replace(src, url);
  });

  if (deferred.length) {
    const end = html.search(/<\/body\s*>/i);
    html =
      end < 0
        ? `${html}\n${deferred.join("\n")}`
        : `${html.slice(0, end)}${deferred.join("\n")}\n${html.slice(end)}`;
  }
  return { html, missing: [...missing], remote: [...remote] };
}

/**
 * Shelf paths a game asks for, so a folder on disk can carry copies of them: its page's scripts
 * and stylesheets, and for a game written as modules, the Three.js module and the add-ons its
 * files import.
 */
export function shelfPathsIn(files: GameFiles): string[] {
  const page = files[ENTRY] ?? "";
  const found = new Set<string>();
  for (const match of page.matchAll(/\s(?:src|href)\s*=\s*["']?([^"'\s>]+)/gi)) {
    const path = cleanPath(match[1] ?? "");
    if (isShelfPath(path)) found.add(path);
  }
  if (page.includes(THREE_MODULE_PATH)) {
    found.add(THREE_MODULE_PATH);
    for (const [path, code] of Object.entries(files)) {
      if (!/\.(?:m?js|html?)$/i.test(path)) continue;
      for (const match of code.matchAll(/["']three\/(?:addons|examples\/jsm)\/([^"']+)["']/g)) {
        const addon = `${THREE_ADDONS_DIR}${match[1]}`;
        if (isShelfPath(addon)) found.add(addon);
      }
    }
  }
  return [...found];
}

/** A game folder in a few words: "12 files, 340 KB". */
export function sizeOf(files: GameFiles): string {
  const count = Object.keys(files).length;
  const bytes = Object.values(files).reduce((n, text) => n + text.length, 0);
  const size = bytes < 1024 ? `${bytes} bytes` : `${Math.round(bytes / 1024)} KB`;
  return `${count} file${count === 1 ? "" : "s"}, ${size}`;
}
