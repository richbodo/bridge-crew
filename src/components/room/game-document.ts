import { useQuery } from "@tanstack/react-query";

import { prepareGame, slugify } from "@/lib/game-file";
import { getGameDocument } from "@/lib/room.functions";

/**
 * A version's bundle, from the server (docs/plans/bigger-games-2026-11-16.md Part 1), and the
 * saves the room keeps for its game (Part 2). A version never changes, so its bundle is fetched
 * once.
 */

export interface GameDocument {
  html: string;
  missing: string[];
  remote: string[];
  size: string;
}

export function fetchGameDocument(sessionId: string, thingId: string): Promise<GameDocument> {
  return getGameDocument({ data: { sessionId, thingId } });
}

export function useGameDocument(sessionId: string, thingId: string) {
  return useQuery({
    queryKey: ["game-document", thingId],
    queryFn: () => fetchGameDocument(sessionId, thingId),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 10 * 60_000,
  });
}

/** Saves a version as one HTML file that opens in any browser, ready to email to the family. */
export async function downloadVersion(
  sessionId: string,
  thing: { id: string; version: number | null },
  title: string,
) {
  const doc = await fetchGameDocument(sessionId, thing.id);
  const file = new Blob([prepareGame(doc.html, { inRoom: false })], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = `${slugify(title)}-v${thing.version ?? 1}.html`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

// ---------- saves ----------

/**
 * A game's saves, kept by the room in this browser for the room, so they last across versions
 * and reloads, as a browser keeps a website's. They're game data, not the sign-in.
 */
const savesKey = (sessionId: string) => `bridge-crew-saves:${sessionId}`;

export function readSaves(sessionId: string): Record<string, string> {
  try {
    const saved = JSON.parse(localStorage.getItem(savesKey(sessionId)) ?? "{}") as unknown;
    return saved && typeof saved === "object" ? (saved as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function writeSaves(sessionId: string, saves: Record<string, string>) {
  try {
    localStorage.setItem(savesKey(sessionId), JSON.stringify(saves));
  } catch {
    // Full or blocked: the game keeps playing, and its saves last until the frame reloads.
  }
}

export function clearSaves(sessionId: string) {
  try {
    localStorage.removeItem(savesKey(sessionId));
  } catch {
    // Nothing to clear.
  }
}
