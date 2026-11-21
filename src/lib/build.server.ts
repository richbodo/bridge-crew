import { changesInWords, EDITOR, GameCopy, isPage, REMOVE_TOOL, type Used } from "./build";
import { ENTRY, type GameFiles } from "./bundle";
import { bundleOf } from "./game-store.server";
import type { MadeDraft } from "./made";
import { fixtureGame, type CrewTool, type CrewTools, type ToolResult } from "./model.server";
import { SCREEN } from "./playtest";
import { Playtest } from "./playtest.server";

/**
 * The Engineer's build tools for one run (docs/plans/bigger-games-2026-11-16.md Part 3): the text
 * editor and remove_file on a copy of the current version (src/lib/build.ts), and try_game, which
 * plays the copy for two seconds in the Tester's headless browser. If the run changes the copy,
 * it becomes the next version, which waits for the student's yes like any made thing.
 */

/** The most turns of tools in one Engineer run. */
export const BUILD_TURNS = 40;
/** How many times one run can try the game. */
export const TRIES = 3;
/** How long try_game plays, in milliseconds. */
const TRY_MS = 2000;
/** Tokens for one Engineer run, which it paces itself to. */
export const BUILD_BUDGET = 200_000;
/** The most turns of reading in a run that only reads: the Tester's, or "How did you do that?". */
export const READ_TURNS = 8;

/** What the card shows as the crew member works: words, and a picture of the game. */
export type Show = (progress: string, snapshot?: string) => Promise<void>;

export const TRY_TOOL = {
  name: "try_game",
  description: `Play your copy of the game for ${TRY_MS / 1000} seconds in a browser, ${SCREEN.width} by ${SCREEN.height} pixels, without pressing anything. You see a picture of the screen, any errors the game threw or logged, and files the page asks for that aren't there. Try the game before you finish, and fix what's broken. You can try it ${TRIES} times in a run.`,
  inputSchema: { type: "object" as const, properties: {} },
};

/** A build tool's use, shown on the card as it happens. */
function shownOn(show: Show, work: () => Used): () => Promise<ToolResult> {
  return async () => {
    const { result, progress } = work();
    if (progress) await show(progress);
    return result;
  };
}

/** The text editor on a copy, as a crew tool. */
function editorOn(copy: GameCopy, show: Show): CrewTool {
  return {
    name: EDITOR,
    editor: true,
    use: (input) => shownOn(show, () => copy.edit(input))(),
  };
}

/**
 * The Engineer's tools for a run that builds: the text editor and remove_file on a copy of the
 * current version, and try_game. `made` is the next version, if the run changed the copy.
 */
export function buildTools({
  current,
  made,
  simple,
  names,
  show,
  task,
}: {
  /** The current version's files, or none if nothing's been built. */
  current: GameFiles;
  /** The pictures in use, under studio/made/ (src/lib/build.ts madeFiles). */
  made: GameFiles;
  simple: boolean;
  /** What the room calls the game's sounds and songs, by their JSON, for try_game. */
  names: Map<string, string>;
  show: Show;
  task: string;
}) {
  const copy = new GameCopy(current, made, { simple });
  const tools: CrewTools = {
    tools: [
      editorOn(copy, show),
      {
        ...REMOVE_TOOL,
        use: (input) => shownOn(show, () => copy.remove(input))(),
      },
      {
        ...TRY_TOOL,
        uses: TRIES,
        use: async () => {
          await show("Trying the game…");
          const { result, image } = await tryGame(copy.files, names);
          if (image) await show("Tried the game", image);
          return result;
        },
      },
    ],
    turns: BUILD_TURNS,
    budget: BUILD_BUDGET,
    label: "engineer build",
    fixture: [
      ...Object.entries(fixtureGame(task, !simple)).map(([path, text]) => ({
        tool: EDITOR,
        input: { command: "create", path: `/${path}`, file_text: text },
      })),
      { tool: TRY_TOOL.name, input: {} },
    ],
  };
  return {
    tools,
    /** The next version, if the run changed the copy and it's still a game. */
    made: (): MadeDraft[] =>
      copy.changed() && isPage(copy.files)
        ? [{ kind: "version", name: "", body: copy.files[ENTRY] ?? "", files: { ...copy.files } }]
        : [],
    /** What changed, in words, for the brief. */
    changes: () => (copy.changed() ? changesInWords(copy.changes()) : ""),
    /** Whether the run changed the copy but left index.html not a web page. */
    broken: () => copy.changed() && !isPage(copy.files),
  };
}

/**
 * The viewing half of the text editor, on the current version: for the Tester, and for "How did
 * you do that?", which changes nothing.
 */
export function readTools({
  current,
  made,
  show,
  why,
}: {
  current: GameFiles;
  made: GameFiles;
  show: Show;
  /** What it says when asked to change a file. */
  why: string;
}): CrewTool {
  return editorOn(new GameCopy(current, made, { readOnly: why }), show);
}

/** A copy of the game, played for two seconds: what it showed, and its picture for the card. */
export async function tryGame(
  files: GameFiles,
  names: Map<string, string>,
): Promise<{ result: ToolResult; image?: string }> {
  if (!isPage(files)) {
    return {
      result: {
        parts: [{ text: "index.html isn't a web page yet, so there's nothing to play." }],
        failed: true,
      },
    };
  }
  let html: string;
  const notes: string[] = [];
  try {
    const bundle = await bundleOf(files);
    html = bundle.html;
    notes.push(
      ...bundle.missing.map(
        (path) => `The page asks for ${path}, which isn't in the folder or on the shelf.`,
      ),
      ...bundle.remote.map(
        (url) => `The page asks for ${url} from the internet, which the studio blocks.`,
      ),
    );
  } catch (error) {
    return {
      result: {
        parts: [{ text: `The game didn't build: ${(error as Error).message}` }],
        failed: true,
      },
    };
  }
  let test: Playtest | null = null;
  try {
    test = await Playtest.open(html, names);
    const played = await test.play([{ do: "wait", ms: TRY_MS }, { do: "look" }]);
    const look = played.looks[played.looks.length - 1];
    const errors = [...notes, ...(look?.errors ?? [])];
    if (played.stuck) errors.push(`${played.stuck} It's perhaps stuck in a loop.`);
    const text = [
      played.slow ?? `The game ran for ${TRY_MS / 1000} seconds.`,
      errors.length ? errors.join("\n") : "No errors.",
      look?.heard.length ? `It played: ${look.heard.join(", ")}.` : "",
      look ? "This is the screen:" : "",
    ]
      .filter(Boolean)
      .join("\n");
    const jpeg = look?.image.replace(/^data:image\/jpeg;base64,/, "");
    return {
      result: { parts: [{ text }, ...(jpeg ? [{ jpeg }] : [])] },
      ...(look ? { image: look.image } : {}),
    };
  } catch (error) {
    console.error("try_game's browser didn't open", error);
    return {
      result: {
        parts: [
          {
            text: "The browser for trying games didn't open on this computer, so you can't try the game this time. Say so in your reply.",
          },
        ],
        failed: true,
      },
    };
  } finally {
    await test?.close();
  }
}
