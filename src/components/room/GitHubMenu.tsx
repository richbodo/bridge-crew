import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
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
import { describeSource, shortCommit, sourceUrl, type GitHubSource } from "@/lib/github";
import { bringInGitHubNewest, gitHubStatus } from "@/lib/github.functions";

/**
 * The room's GitHub menu (docs/plans/games-on-github-2026-11-16.md Part 2): where the room's game
 * came from, and GitHub's newest, as a new version, when GitHub has moved on. It asks GitHub
 * when it opens, which takes one request.
 */
export function GitHubMenu({
  sessionId,
  source,
  onDone,
}: {
  sessionId: string;
  source: GitHubSource;
  onDone: () => void;
}) {
  const queryClient = useQueryClient();
  const status = useServerFn(gitHubStatus);
  const bringNewest = useServerFn(bringInGitHubNewest);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [needsBigger, setNeedsBigger] = useState<string | null>(null);

  const check = useQuery({
    queryKey: ["github-status", sessionId, source.commit],
    queryFn: () => status({ data: { sessionId } }),
    enabled: open,
    staleTime: 60_000,
  });
  const linked = check.data?.linked ? check.data : null;

  const bring = async (makeBigger = false) => {
    setBusy(true);
    try {
      const result = await bringNewest({ data: { sessionId, makeBigger } });
      if (result.ok) {
        setNeedsBigger(null);
        setOpen(false);
        void queryClient.invalidateQueries({ queryKey: ["github-status", sessionId] });
        onDone();
      } else if (result.needsBigger) {
        setNeedsBigger(result.message);
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
          GitHub
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>GitHub</DialogTitle>
          <DialogDescription>
            This room's game came from{" "}
            <a href={sourceUrl(source)} target="_blank" rel="noreferrer" className="underline">
              {describeSource(source)}
            </a>
            , commit {shortCommit(source.commit)} on {source.branch}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          {check.isLoading ? <p className="text-muted-foreground">Asking GitHub…</p> : null}
          {linked?.problem ? <p className="text-muted-foreground">{linked.problem}</p> : null}
          {linked && !linked.problem && !linked.newer ? (
            <p className="text-muted-foreground">It's the same as GitHub's newest.</p>
          ) : null}
          {linked?.newer ? (
            needsBigger ? (
              <div className="space-y-2">
                <p className="text-foreground">{needsBigger}</p>
                <Button size="sm" disabled={busy} onClick={() => void bring(true)}>
                  Make it Bigger and bring it in
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground">
                  GitHub has newer commits, up to {shortCommit(linked.newest ?? "")}. Bringing them
                  in makes the room's next version; the versions so far stay as they are.
                </p>
                <Button size="sm" disabled={busy} onClick={() => void bring()}>
                  Bring in GitHub's newest
                </Button>
              </div>
            )
          ) : null}
          {busy ? <p className="text-xs text-muted-foreground">Bringing it in…</p> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
