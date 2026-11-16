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
import { Input } from "@/components/ui/input";
import { bringInFromGitHub } from "@/lib/github.functions";
import { bringInGame } from "@/lib/room.functions";

/**
 * Bring in a game (docs/plans/bigger-games-2026-11-16.md Part 4): the people pick a game folder
 * or an HTML file made elsewhere, or paste a GitHub link (docs/plans/games-on-github-2026-11-16.md
 * Part 2), and it becomes the room's next version, on screen. Picked files are read here, in the
 * browser; a GitHub link is opened by the server. Either way, the laptop's database keeps them.
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
  const bringFromGitHub = useServerFn(bringInFromGitHub);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState("");
  const [needsBigger, setNeedsBigger] = useState<{
    game: Picked | string;
    message: string;
  } | null>(null);

  /** Picked files, or a GitHub link. */
  const send = async (game: Picked | string, makeBigger = false) => {
    setBusy(true);
    try {
      const result =
        typeof game === "string"
          ? await bringFromGitHub({ data: { sessionId, link: game, makeBigger } })
          : await bring({
              data: {
                sessionId,
                files: game.files,
                ...(game.folder ? { folder: game.folder } : {}),
                ...(game.left.length ? { left: game.left } : {}),
                ...(makeBigger ? { makeBigger } : {}),
              },
            });
      if (result.ok) {
        setNeedsBigger(null);
        setLink("");
        setOpen(false);
        onDone();
      } else if (result.needsBigger) {
        setNeedsBigger({ game, message: result.message });
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
            Pick its folder, or its HTML file if it's just one, or paste its GitHub link.
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
              <Button size="sm" disabled={busy} onClick={() => void send(needsBigger.game, true)}>
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
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (link.trim()) void send(link.trim());
              }}
            >
              <Input
                aria-label="GitHub link"
                value={link}
                placeholder="A GitHub link, such as github.com/someone/rocket-lab"
                onChange={(e) => setLink(e.target.value)}
                className="h-8 text-xs"
              />
              <Button size="sm" type="submit" variant="secondary" disabled={busy || !link.trim()}>
                Bring it in
              </Button>
            </form>
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
