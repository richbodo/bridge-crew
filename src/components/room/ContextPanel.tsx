import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  addContextDoc,
  createContextPack,
  deleteContextDoc,
  deleteContextPack,
  listContextPacks,
  listSessionPacks,
} from "@/lib/context.functions";

export function ContextPanel({ sessionId }: { sessionId: string }) {
  const queryClient = useQueryClient();
  const summaries = useServerFn(listContextPacks);
  const sessionPacks = useServerFn(listSessionPacks);
  const createPack = useServerFn(createContextPack);
  const addDoc = useServerFn(addContextDoc);
  const removeDoc = useServerFn(deleteContextDoc);
  const removePack = useServerFn(deleteContextPack);

  const [open, setOpen] = useState(false);
  const [packName, setPackName] = useState("");
  const [target, setTarget] = useState<string | null>(null);
  const [docPath, setDocPath] = useState("note.md");
  const [docBody, setDocBody] = useState("");

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["context-packs", sessionId] });
    void queryClient.invalidateQueries({ queryKey: ["session-packs", sessionId] });
  };

  const packs = useQuery({
    queryKey: ["context-packs", sessionId],
    queryFn: () => summaries({ data: { sessionId } }),
    enabled: open,
  });

  const mine = useQuery({
    queryKey: ["session-packs", sessionId],
    queryFn: () => sessionPacks({ data: { sessionId } }),
    enabled: open,
  });

  const create = useMutation({
    mutationFn: () => createPack({ data: { sessionId, name: packName, description: "" } }),
    onSuccess: () => {
      setPackName("");
      invalidate();
      toast.success("Pack created.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const saveDoc = useMutation({
    mutationFn: (packId: string) => addDoc({ data: { packId, path: docPath, body: docBody } }),
    onSuccess: () => {
      setDocBody("");
      setDocPath("note.md");
      setTarget(null);
      invalidate();
      toast.success("Document added.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="relative">
      <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
        Context
      </Button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 max-h-[70vh] w-96 space-y-4 overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Context packs
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Attach packs to a station in its Reassign form. A station reads every attached
              pack in full before it answers.
            </p>
          </div>

          <ul className="space-y-1">
            {(packs.data ?? []).map((pack) => (
              <li
                key={pack.name}
                className="flex items-baseline justify-between gap-2 rounded-md border border-border px-2 py-1.5"
              >
                <span className="font-mono text-xs text-card-foreground">{pack.name}</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {pack.docCount} doc{pack.docCount === 1 ? "" : "s"} · {pack.sources.join("+")}
                </span>
              </li>
            ))}
            {packs.isLoading ? (
              <li className="text-xs text-muted-foreground">Loading…</li>
            ) : null}
          </ul>

          <div className="space-y-2 border-t border-border pt-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              New session pack
            </p>
            <div className="flex gap-2">
              <Input
                value={packName}
                placeholder="pack-name"
                onChange={(e) => setPackName(e.target.value)}
                className="h-8 bg-background text-xs"
              />
              <Button
                size="sm"
                className="h-8"
                disabled={create.isPending || !packName.trim()}
                onClick={() => create.mutate()}
              >
                Create
              </Button>
            </div>
          </div>

          {(mine.data ?? []).length ? (
            <div className="space-y-3 border-t border-border pt-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Session packs
              </p>
              {(mine.data ?? []).map((pack) => (
                <div key={pack.id} className="rounded-md border border-border p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-card-foreground">{pack.name}</span>
                    <button
                      type="button"
                      className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                      onClick={async () => {
                        await removePack({ data: { packId: pack.id } });
                        invalidate();
                      }}
                    >
                      Delete pack
                    </button>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {(pack.context_docs ?? []).map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-[11px] text-muted-foreground">
                          {doc.path}
                        </span>
                        <button
                          type="button"
                          className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                          onClick={async () => {
                            await removeDoc({ data: { docId: doc.id } });
                            invalidate();
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  {target === pack.id ? (
                    <div className="mt-2 space-y-2">
                      <Input
                        value={docPath}
                        onChange={(e) => setDocPath(e.target.value)}
                        className="h-7 bg-background text-xs"
                      />
                      <Textarea
                        rows={5}
                        value={docBody}
                        placeholder="Paste the document…"
                        onChange={(e) => setDocBody(e.target.value)}
                        className="resize-none bg-background text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => setTarget(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs"
                          disabled={saveDoc.isPending}
                          onClick={() => saveDoc.mutate(pack.id)}
                        >
                          Add document
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-2 h-7 text-xs"
                      onClick={() => setTarget(pack.id)}
                    >
                      Add document
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
