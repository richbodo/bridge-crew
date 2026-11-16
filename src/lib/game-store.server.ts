import { createHash } from "node:crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/integrations/supabase/types";

import { bundleGame, filesOf, type Bundle, type GameFiles } from "./bundle";
import { linkModules } from "./modules.server";
import { shelfFile } from "./shelf.server";

/**
 * A room's game files (docs/plans/bigger-games-2026-11-16.md Part 1). Each file is stored once in
 * game_files, under the hash of its content, and a version lists its files by path and hash.
 */

type Client = SupabaseClient<Database>;

/** A version's list of files: each path, and its content's hash. */
export type FileList = Record<string, string>;

export function hashOf(body: string): string {
  return createHash("sha256").update(body).digest("hex");
}

/** Stores a game's files, skipping any the room has already, and returns the version's list. */
export async function storeFiles(
  sb: Client,
  sessionId: string,
  files: GameFiles,
): Promise<FileList> {
  const list: FileList = {};
  const rows = new Map<string, string>();
  for (const [path, body] of Object.entries(files)) {
    const hash = hashOf(body);
    list[path] = hash;
    rows.set(hash, body);
  }
  const all = [...rows].map(([hash, body]) => ({ session_id: sessionId, hash, body }));
  // A few at a time, so a big game doesn't make one huge request.
  for (let i = 0; i < all.length;) {
    const batch: typeof all = [];
    let size = 0;
    while (i < all.length && (batch.length === 0 || size + all[i]!.body.length < 2_000_000)) {
      size += all[i]!.body.length;
      batch.push(all[i++]!);
    }
    const { error } = await sb
      .from("game_files")
      .upsert(batch, { onConflict: "session_id,hash", ignoreDuplicates: true });
    if (error) throw new Error(error.message);
  }
  return list;
}

/** A version's list of files, from its made thing's files column. */
export function fileListOf(files: Json | null | undefined): FileList | null {
  if (!files || typeof files !== "object" || Array.isArray(files)) return null;
  const list: FileList = {};
  for (const [path, hash] of Object.entries(files)) if (typeof hash === "string") list[path] = hash;
  return Object.keys(list).length ? list : null;
}

/** A version's files: a folder version's, from game_files, or an old version's one HTML file. */
export async function loadFiles(
  sb: Client,
  sessionId: string,
  thing: { body: string; files?: Json | null },
): Promise<GameFiles> {
  const list = fileListOf(thing.files);
  if (!list) return filesOf(thing.body);
  const hashes = [...new Set(Object.values(list))];
  const bodies = new Map<string, string>();
  for (let i = 0; i < hashes.length; i += 100) {
    const { data, error } = await sb
      .from("game_files")
      .select("hash, body")
      .eq("session_id", sessionId)
      .in("hash", hashes.slice(i, i + 100));
    if (error) throw new Error(error.message);
    for (const row of data ?? []) bodies.set(row.hash, row.body);
  }
  const files: GameFiles = {};
  for (const [path, hash] of Object.entries(list)) {
    const body = bodies.get(hash);
    if (body !== undefined) files[path] = body;
  }
  return files;
}

/** A version's bundle, with the shelf's files, and its module scripts built (if it has any). */
export async function bundleOf(files: GameFiles): Promise<Bundle> {
  const linked = await linkModules(files, shelfFile);
  const bundle = bundleGame(linked.files, shelfFile);
  return {
    html: bundle.html,
    missing: [...new Set([...linked.missing, ...bundle.missing])],
    remote: [...new Set([...linked.remote, ...bundle.remote])],
  };
}
