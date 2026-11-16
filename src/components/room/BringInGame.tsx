import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { PickGameButtons } from "@/components/PickGame";
import { PICKED_FILES_NOTE, type Picked } from "@/components/pick-game";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bringInGame } from "@/lib/room.functions";

/**
 * Bring in a game (docs/plans/bigger-games-2026-11-16.md Part 4): the people pick a game folder
 * or an HTML file made elsewhere, and it becomes the room's next version, on screen. The files
 * are read here, in the browser, and stored on the laptop's database by the server.
 */

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
            <PickGameButtons disabled={busy} onPicked={send} />
            <p className="text-xs text-muted-foreground">
              {bigger
                ? "This room makes Bigger games, so a folder of code is fine."
                : "This room makes Simple games. A game with several files, or one that uses Three.js, asks to make the room Bigger first."}{" "}
              {PICKED_FILES_NOTE}
            </p>
            {busy ? <p className="text-xs text-muted-foreground">Bringing it in…</p> : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
