import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";

import { shelfPathsIn, type GameFiles } from "./bundle";
import { prepareGame, slugify } from "./game-file";
import { bundleOf } from "./game-store.server";
import { shelfFile } from "./shelf.server";

/**
 * Games on disk (docs/plans/educational-context-2026-10-31.md Part 5, and
 * docs/plans/bigger-games-2026-11-16.md Part 1): each room has a folder of versions. v1.html,
 * v2.html, … are each version's bundle, one file that opens in any browser, even offline, so
 * it's what the family gets, and index.html is the current version's. Each version's own folder,
 * v1/, v2/, …, holds its files, with copies of the shelf files it uses, so it runs from disk as
 * it is and can be put on a web host as it is.
 */

export interface RoomName {
  code: string;
  title: string;
}

/** $BRIDGE_CREW_GAMES_DIR, or ~/Bridge Crew Games. */
export function gamesDir(): string {
  const configured = process.env["BRIDGE_CREW_GAMES_DIR"]?.trim();
  return resolve(configured || join(homedir(), "Bridge Crew Games"));
}

export function roomFolder(room: RoomName): string {
  return join(gamesDir(), `${room.code}-${slugify(room.title)}`);
}

/** A version's bundle, as the family gets it. */
async function bundleFile(files: GameFiles): Promise<string> {
  return prepareGame((await bundleOf(files)).html, { inRoom: false });
}

/** A file's content as written to disk: pictures and fonts are stored as data URLs. */
function contentOf(body: string): string | Buffer {
  const data = /^data:[^;,]*;base64,/.exec(body);
  return data ? Buffer.from(body.slice(data[0].length), "base64") : body;
}

/** Saves a version the moment it's made. A version is never overwritten. */
export async function saveVersion(room: RoomName, version: number, files: GameFiles) {
  const folder = roomFolder(room);
  await mkdir(folder, { recursive: true });
  try {
    await writeFile(join(folder, `v${version}.html`), await bundleFile(files), { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
  // A one-file version's v<N>.html is all of it; a folder version also gets its folder.
  if (Object.keys(files).length < 2 && !shelfPathsIn(files).length) return;
  const own = join(folder, `v${version}`);
  if (await stat(own).catch(() => null)) return;
  const shelf = Object.fromEntries(
    shelfPathsIn(files).map((path) => [path, shelfFile(path) ?? ""]),
  );
  for (const [path, body] of Object.entries({ ...shelf, ...files })) {
    const target = resolve(own, path);
    if (!target.startsWith(own + sep)) continue;
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, contentOf(body));
  }
}

/** index.html is always the current version's bundle. */
export async function saveCurrent(room: RoomName, files: GameFiles) {
  const folder = roomFolder(room);
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, "index.html"), await bundleFile(files));
}

/** Delete room takes the games folder with it. */
export async function removeRoomFolder(room: RoomName) {
  const folder = roomFolder(room);
  if (!folder.startsWith(gamesDir() + sep))
    throw new Error("That folder isn't in the games folder.");
  await rm(folder, { recursive: true, force: true });
}
