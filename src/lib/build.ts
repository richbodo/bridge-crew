import { MAX_FILE_BYTES, MAX_GAME_BYTES, MAX_GAME_FILES, TEXT_FILES } from "./bring-in";
import { cleanPath, ENTRY, type GameFiles } from "./bundle";
import { SHELF_DIR } from "./shelf";

/**
 * The Engineer's build tools (docs/plans/bigger-games-2026-11-16.md Part 3): a copy of the
 * current version that the Engineer views and edits with Anthropic's text editor tool, and
 * remove_file. If the run changes the copy, the copy becomes the next version. Pure — no IO;
 * src/lib/build.server.ts adds try_game, which plays the copy in a browser.
 */

/** Anthropic's text editor tool, which Claude is trained to use. */
export const EDITOR = "str_replace_based_edit_tool";
/** The most of a file one view shows, in characters. */
export const VIEW_LIMIT = 40_000;
/** Where the things in use (the Artist's pictures) are, to read but not change. */
export const MADE_DIR = `${SHELF_DIR}made/`;

export const REMOVE_TOOL = {
  name: "remove_file",
  description:
    "Remove a file the game no longer needs from the copy. index.html can't be removed, because the game opens with it.",
  inputSchema: {
    type: "object" as const,
    properties: { path: { type: "string", description: "The file, such as /js/old.js." } },
    required: ["path"],
  },
};

/** What a tool gives back to the model (src/lib/model.server.ts). */
export interface ToolResult {
  /** Words and pictures (JPEG, base64), in order. */
  parts: Array<{ text: string } | { jpeg: string }>;
  /** It didn't work; the words say why. */
  failed?: boolean;
}

/** What the room calls a change, as the card shows it: "Changing js/animals.js". */
export type Progress = string;

/** One use of a build tool: what goes back to the model, and what the card says. */
export interface Used {
  result: ToolResult;
  progress: Progress | null;
}

export interface Changes {
  added: string[];
  changed: string[];
  removed: string[];
}

/** The pictures in use, as files under studio/made/pictures/, named after the pictures. */
export function madeFiles(things: Array<{ kind: string; name: string; body: string }>): GameFiles {
  const files: GameFiles = {};
  for (const thing of things) {
    if (thing.kind !== "picture") continue;
    const base = thing.name.replace(/[^\p{L}\p{N}_-]+/gu, "-").replace(/^-+|-+$/g, "") || "picture";
    let path = `${MADE_DIR}pictures/${base}.svg`;
    for (let n = 2; path in files; n++) path = `${MADE_DIR}pictures/${base}-${n}.svg`;
    files[path] = thing.body;
  }
  return files;
}

/** A path as the model wrote it ("/js/game.js", "js/game.js"), inside the folder, or null. */
export function pathOf(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const path = raw.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (path.split("/").includes("..")) return null;
  return cleanPath(path);
}

/** A path as the model sees it: from the folder's top, "/js/game.js". */
export function shown(path: string): string {
  return `/${path}`;
}

function kb(body: string): string {
  return `${Math.max(1, Math.round(body.length / 1024))} KB`;
}

function ok(text: string): ToolResult {
  return { parts: [{ text }] };
}

function no(text: string): ToolResult {
  return { parts: [{ text }], failed: true };
}

/** Lines numbered as `cat -n` numbers them, from line `from`. */
function numbered(lines: string[], from: number): string {
  return lines.map((line, i) => `${String(from + i).padStart(6)}\t${line}`).join("\n");
}

/**
 * A copy of the game for one run. The Engineer changes `files`; `base` stays as the current
 * version was. Things in use are readable under studio/made/. A Simple room's game is one file,
 * index.html. A read-only copy (for the Tester, and for "How did you do that?") can only be viewed.
 */
export class GameCopy {
  readonly files: GameFiles;

  constructor(
    private readonly base: GameFiles,
    private readonly made: GameFiles = {},
    private readonly options: { simple?: boolean; readOnly?: string } = {},
  ) {
    this.files = { ...base };
  }

  /** One use of the text editor tool: view, create, str_replace or insert. */
  edit(input: unknown): Used {
    const value = (typeof input === "object" && input !== null ? input : {}) as Record<
      string,
      unknown
    >;
    const command = String(value["command"] ?? "");
    const path = pathOf(value["path"]);
    if (path === null) {
      return {
        result: no(`“${String(value["path"] ?? "")}” isn't a path in the game's folder.`),
        progress: null,
      };
    }
    if (command === "view") return this.view(path, value["view_range"]);
    if (command === "undo_edit") {
      return {
        result: no(
          "undo_edit isn't available. View the file, and change it back with str_replace.",
        ),
        progress: null,
      };
    }
    if (!["create", "str_replace", "insert"].includes(command)) {
      return { result: no(`There's no command called “${command}”.`), progress: null };
    }
    const refusal = this.writable(path);
    if (refusal) return { result: no(refusal), progress: null };
    if (command === "create") return this.create(path, value["file_text"]);
    if (!(path in this.files)) {
      return { result: no(`There's no file ${shown(path)}. ${this.listing()}`), progress: null };
    }
    return command === "str_replace"
      ? this.replace(path, value["old_str"], value["new_str"])
      : this.insert(path, value["insert_line"], value["insert_text"] ?? value["new_str"]);
  }

  /** remove_file: takes a file out of the copy. */
  remove(input: unknown): Used {
    const raw =
      typeof input === "object" && input !== null ? (input as { path?: unknown }).path : "";
    const path = pathOf(raw);
    const refusal = path === null ? "That isn't a path in the game's folder." : this.writable(path);
    if (refusal || path === null) return { result: no(refusal ?? ""), progress: null };
    if (path === ENTRY) {
      return { result: no("index.html opens the game, so it can't be removed."), progress: null };
    }
    if (!(path in this.files)) {
      return { result: no(`There's no file ${shown(path)}. ${this.listing()}`), progress: null };
    }
    delete this.files[path];
    return { result: ok(`Removed ${shown(path)}.`), progress: `Removing ${path}` };
  }

  /** What the run changed, file by file. */
  changes(): Changes {
    const added = Object.keys(this.files).filter((path) => !(path in this.base));
    const changed = Object.keys(this.files).filter(
      (path) => path in this.base && this.base[path] !== this.files[path],
    );
    const removed = Object.keys(this.base).filter((path) => !(path in this.files));
    return { added: added.sort(), changed: changed.sort(), removed: removed.sort() };
  }

  /** Whether the run changed anything. */
  changed(): boolean {
    const { added, changed, removed } = this.changes();
    return added.length + changed.length + removed.length > 0;
  }

  /** Every file, as the model sees the folder. */
  listing(): string {
    const own = Object.keys(this.files)
      .sort((a, b) => (a === ENTRY ? -1 : b === ENTRY ? 1 : a.localeCompare(b)))
      .map((path) => `${shown(path)} (${kb(this.files[path] ?? "")})`);
    const made = Object.keys(this.made).map(
      (path) => `${shown(path)} (${kb(this.made[path] ?? "")})`,
    );
    return [
      own.length ? `The game's files:\n${own.join("\n")}` : "The game has no files yet.",
      made.length ? `The pictures in use, to read but not change:\n${made.join("\n")}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  private writable(path: string): string | null {
    if (this.options.readOnly) return this.options.readOnly;
    if (!path) return "That's the folder. Name a file in it, such as /js/game.js.";
    if (path.startsWith(SHELF_DIR)) {
      return `Files under ${shown(SHELF_DIR)} are the studio's: you can't change them. Copy what the game needs into its own files.`;
    }
    if (this.options.simple && path !== ENTRY) {
      return "In a Simple room the game is one file, /index.html, with its style and script inside it. Change that file instead.";
    }
    return null;
  }

  private view(path: string, range: unknown): Used {
    const body = this.files[path] ?? this.made[path];
    if (body === undefined) {
      if (
        path === "" ||
        Object.keys({ ...this.files, ...this.made }).some((p) => p.startsWith(`${path}/`))
      ) {
        return { result: ok(this.listing()), progress: "Looking at the files" };
      }
      if (path.startsWith(SHELF_DIR)) {
        return {
          result: no(
            `${shown(path)} is on the studio's shelf, which the game can use but you can't read. Your instructions say what's on it.`,
          ),
          progress: null,
        };
      }
      return { result: no(`There's no file ${shown(path)}. ${this.listing()}`), progress: null };
    }
    if (body.startsWith("data:")) {
      const type = /^data:([^;,]+)/.exec(body)?.[1] ?? "a file";
      return {
        result: ok(
          `${shown(path)} is a picture or font (${type}, ${kb(body)}), which isn't text. The game can use it by its path, such as <img src="${path}">.`,
        ),
        progress: null,
      };
    }
    const lines = body.split("\n");
    let from = 1;
    let to = lines.length;
    if (Array.isArray(range) && range.length === 2) {
      const [a, b] = range.map(Number);
      from = Math.min(Math.max(Math.trunc(a ?? 1) || 1, 1), Math.max(lines.length, 1));
      to =
        b === -1 ? lines.length : Math.min(Math.max(Math.trunc(b ?? to) || to, from), lines.length);
    }
    const shownLines: string[] = [];
    let size = 0;
    for (let n = from; n <= to; n++) {
      const line = lines[n - 1] ?? "";
      if (size + line.length > VIEW_LIMIT && shownLines.length) break;
      shownLines.push(line);
      size += line.length + 1;
    }
    const last = from + shownLines.length - 1;
    const more =
      last < to
        ? `\n\n(That's lines ${from} to ${last} of ${lines.length}. View the rest with view_range, such as [${last + 1}, ${Math.min(to, last + 400)}].)`
        : "";
    return {
      result: ok(`${numbered(shownLines, from)}${more}`),
      progress: `Reading ${path}`,
    };
  }

  private create(path: string, text: unknown): Used {
    if (typeof text !== "string") return { result: no("create needs file_text."), progress: null };
    if (!TEXT_FILES.test(path)) {
      return {
        result: no(
          "The game's own files are text: .html, .js, .css, .json, .md, .svg and the like.",
        ),
        progress: null,
      };
    }
    const exists = path in this.files;
    const limit = this.limit(path, text);
    if (limit) return { result: no(limit), progress: null };
    this.files[path] = text;
    const lines = text.split("\n").length;
    return exists
      ? { result: ok(`Rewrote ${shown(path)} (${lines} lines).`), progress: `Rewriting ${path}` }
      : { result: ok(`Made ${shown(path)} (${lines} lines).`), progress: `Adding ${path}` };
  }

  private replace(path: string, oldText: unknown, newText: unknown): Used {
    if (typeof oldText !== "string" || !oldText) {
      return { result: no("str_replace needs old_str: the text to change."), progress: null };
    }
    const body = this.files[path] ?? "";
    const count = body.split(oldText).length - 1;
    if (count === 0) {
      return {
        result: no(
          `old_str isn't in ${shown(path)}. Its spaces and line breaks must match exactly: view the file to see it as it is now.`,
        ),
        progress: null,
      };
    }
    if (count > 1) {
      return {
        result: no(
          `old_str is in ${shown(path)} ${count} times. Include more of the lines around it, so it matches once.`,
        ),
        progress: null,
      };
    }
    const replacement = typeof newText === "string" ? newText : "";
    const at = body.indexOf(oldText);
    const next = body.slice(0, at) + replacement + body.slice(at + oldText.length);
    const limit = this.limit(path, next);
    if (limit) return { result: no(limit), progress: null };
    this.files[path] = next;
    const startLine = body.slice(0, at).split("\n").length;
    return {
      result: ok(`Changed ${shown(path)}. ${this.snippet(path, startLine, replacement)}`),
      progress: `Changing ${path}`,
    };
  }

  private insert(path: string, line: unknown, text: unknown): Used {
    if (typeof text !== "string")
      return { result: no("insert needs insert_text."), progress: null };
    const lines = (this.files[path] ?? "").split("\n");
    const after = Number(line);
    if (!Number.isInteger(after) || after < 0 || after > lines.length) {
      return {
        result: no(`insert_line must be a line number from 0 to ${lines.length}.`),
        progress: null,
      };
    }
    const next = [...lines.slice(0, after), ...text.split("\n"), ...lines.slice(after)].join("\n");
    const limit = this.limit(path, next);
    if (limit) return { result: no(limit), progress: null };
    this.files[path] = next;
    return {
      result: ok(`Changed ${shown(path)}. ${this.snippet(path, after + 1, text)}`),
      progress: `Changing ${path}`,
    };
  }

  /** The lines around a change, numbered, so the model can check it. */
  private snippet(path: string, startLine: number, inserted: string): string {
    const lines = (this.files[path] ?? "").split("\n");
    const from = Math.max(1, startLine - 3);
    const to = Math.min(lines.length, startLine + inserted.split("\n").length + 2);
    if (to - from > 40) return "";
    return `Here it is now:\n${numbered(lines.slice(from - 1, to), from)}`;
  }

  /** Why a file can't be this size, or null if it can. */
  private limit(path: string, text: string): string | null {
    if (text.length > MAX_FILE_BYTES) {
      return `That would make ${shown(path)} bigger than ${MAX_FILE_BYTES / 1_000_000} MB. Split it into smaller files.`;
    }
    if (!(path in this.files) && Object.keys(this.files).length >= MAX_GAME_FILES) {
      return `The game already has ${MAX_GAME_FILES} files, the most it can have.`;
    }
    const total = Object.entries(this.files).reduce(
      (sum, [p, body]) => sum + (p === path ? 0 : body.length),
      text.length,
    );
    if (total > MAX_GAME_BYTES) {
      return `That would make the game bigger than ${MAX_GAME_BYTES / 1_000_000} MB, the most it can be.`;
    }
    return null;
  }
}

/** A run's changes in words, for the brief: "Changed js/animals.js. Added js/wolves.js." */
export function changesInWords({ added, changed, removed }: Changes): string {
  return [
    changed.length ? `Changed ${changed.join(", ")}.` : "",
    added.length ? `Added ${added.join(", ")}.` : "",
    removed.length ? `Removed ${removed.join(", ")}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Whether index.html is a web page, so the copy can be a version. */
export function isPage(files: GameFiles): boolean {
  return /<(html|body|script|canvas|div)\b/i.test(files[ENTRY] ?? "");
}
