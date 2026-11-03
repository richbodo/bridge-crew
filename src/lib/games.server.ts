import { mkdir, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve, sep } from "node:path";

import { prepareGame, slugify } from "./game-file";

/**
 * Games on disk (docs/plans/educational-context-2026-10-31.md Part 5): each room has a folder
 * of versions, v1.html, v2.html, …, and index.html is the current version. Each file opens in
 * any browser, even offline, so it's what the family gets.
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

/** Saves a version the moment its run finishes. A version is never overwritten. */
export async function saveVersion(room: RoomName, version: number, html: string) {
  const folder = roomFolder(room);
  await mkdir(folder, { recursive: true });
  try {
    await writeFile(join(folder, `v${version}.html`), prepareGame(html, { inRoom: false }), {
      flag: "wx",
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
}

/** index.html is always the current version. */
export async function saveCurrent(room: RoomName, html: string) {
  const folder = roomFolder(room);
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, "index.html"), prepareGame(html, { inRoom: false }));
}

/** Delete room takes the games folder with it. */
export async function removeRoomFolder(room: RoomName) {
  const folder = roomFolder(room);
  if (!folder.startsWith(gamesDir() + sep)) throw new Error("That folder isn't in the games folder.");
  await rm(folder, { recursive: true, force: true });
}
