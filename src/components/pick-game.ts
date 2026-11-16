import { DATA_FILES, MAX_FILE_BYTES, MAX_GAME_BYTES, TEXT_FILES } from "@/lib/bring-in";

/**
 * Picking a game made elsewhere, as a folder or one HTML file, for **Bring in a game** on the big
 * screen and **Open a game** in the lobby (docs/plans/bigger-games-2026-11-16.md Part 4). The
 * files are read here, in the browser; the server tidies and stores them (src/lib/bring-in.ts).
 */

export interface Picked {
  files: Record<string, string>;
  folder: string;
  /** Files that can't be part of a game, by name. */
  left: string[];
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error(`Couldn't read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

/** Reads what was picked. Files that can't be part of a game are left out, and named. */
export async function readPicked(list: FileList): Promise<Picked> {
  const files: Record<string, string> = {};
  const left: string[] = [];
  let total = 0;
  for (const file of Array.from(list)) {
    const path = file.webkitRelativePath || file.name;
    if (path.split("/").some((part) => part.startsWith(".") || part === "node_modules")) continue;
    const text = TEXT_FILES.test(path);
    if (!text && !DATA_FILES.test(path)) {
      left.push(file.name);
      continue;
    }
    if (file.size > MAX_FILE_BYTES || total + file.size > MAX_GAME_BYTES) {
      left.push(`${file.name} (too big)`);
      continue;
    }
    files[path] = text ? await file.text() : await readAsDataUrl(file);
    total += file.size;
  }
  const first = Object.keys(files)[0]?.split("/");
  return { files, folder: first && first.length > 1 ? (first[0] ?? "") : "", left };
}

/** Said wherever a game is picked: what happens to its files. */
export const PICKED_FILES_NOTE =
  "The files stay on this laptop. The crew reads them as it reads the game, which means they go to Anthropic with its calls, so check a README or credits for students' names first.";
