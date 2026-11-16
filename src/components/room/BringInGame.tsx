import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DATA_FILES, MAX_FILE_BYTES, MAX_GAME_BYTES, TEXT_FILES } from "@/lib/bring-in";
import { bringInGame } from "@/lib/room.functions";

/**
 * Bring in a game (docs/plans/bigger-games-2026-11-16.md Part 4): the people pick a game folder
 * or an HTML file made elsewhere, and it becomes the room's next version, on screen. The files
 * are read here, in the browser, and stored on the laptop's database by the server.
 */

interface Picked {
  files: Record<string, string>;
  folder: string;
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
async function readPicked(list: FileList): Promise<Picked> {
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

export function BringInGame({
  sessionId,
  bigger,
  onDone,
}: {
  sessionId: string;
  bigger: boolean;
  onDone: () => void;
}) {
  const bring = useServerFn(bringInGame);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [needsBigger, setNeedsBigger] = useState<{ picked: Picked; message: string } | null>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const send = async (picked: Picked, makeBigger = false) => {
    setBusy(true);
    try {
      const result = await bring({
        data: {
          sessionId,
          files: picked.files,
          ...(picked.folder ? { folder: picked.folder } : {}),
          ...(picked.left.length ? { left: picked.left } : {}),
          ...(makeBigger ? { makeBigger } : {}),
        },
      });
      if (result.ok) {
        setNeedsBigger(null);
        setOpen(false);
        onDone();
      } else if (result.needsBigger) {
        setNeedsBigger({ picked, message: result.message });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const picked = async (list: FileList | null) => {
    if (!list?.length) return;
    try {
      const read = await readPicked(list);
      if (!Object.keys(read.files).length) {
        toast.error("There's nothing there that could be part of a game.");
        return;
      }
      await send(read);
    } finally {
      if (folderInput.current) folderInput.current.value = "";
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setNeedsBigger(null);
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
          Bring in a game
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bring in a game</DialogTitle>
          <DialogDescription>
            A game made somewhere else becomes this room's next version, and the current version.
            Pick its folder, or its HTML file if it's just one.
          </DialogDescription>
        </DialogHeader>
        {needsBigger ? (
          <div className="space-y-3 text-sm">
            <p className="text-foreground">{needsBigger.message}</p>
            <p className="text-muted-foreground">
              Make this room Bigger? It can have folders of code, 3D with Three.js, and saves. It
              can't go back to Simple.
            </p>
            <div className="flex gap-2">
              <Button size="sm" disabled={busy} onClick={() => void send(needsBigger.picked, true)}>
                Make it Bigger and bring it in
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={busy}
                onClick={() => setNeedsBigger(null)}
              >
                Not now
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={busy} onClick={() => folderInput.current?.click()}>
                Choose a folder
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={busy}
                onClick={() => fileInput.current?.click()}
              >
                Choose an HTML file
              </Button>
            </div>
            <input
              ref={folderInput}
              type="file"
              aria-label="Game folder"
              className="hidden"
              // A folder picker: the browser reads every file in it.
              {...({ webkitdirectory: "", directory: "" } as Record<string, string>)}
              multiple
              onChange={(e) => void picked(e.target.files)}
            />
            <input
              ref={fileInput}
              type="file"
              aria-label="Game file"
              accept=".html,.htm"
              className="hidden"
              onChange={(e) => void picked(e.target.files)}
            />
            <p className="text-xs text-muted-foreground">
              {bigger
                ? "This room makes Bigger games, so a folder of code is fine."
                : "This room makes Simple games. A game with several files, or one that uses Three.js, asks to make the room Bigger first."}{" "}
              The files stay on this laptop. The crew reads them as it reads the game, which means
              they go to Anthropic with its calls, so check a README or credits for students' names
              first.
            </p>
            {busy ? <p className="text-xs text-muted-foreground">Bringing it in…</p> : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
