import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listInvites, revokeInvite, sendInvite } from "@/lib/invite.functions";

export function InvitePanel({ sessionId, code }: { sessionId: string; code: string }) {
  const queryClient = useQueryClient();
  const list = useServerFn(listInvites);
  const send = useServerFn(sendInvite);
  const revoke = useServerFn(revokeInvite);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const link = typeof window === "undefined" ? `/join/${code}` : `${window.location.origin}/join/${code}`;

  const invites = useQuery({
    queryKey: ["invites", sessionId],
    queryFn: () => list({ data: { sessionId } }),
    enabled: open,
  });

  const sendMutation = useMutation({
    mutationFn: () => send({ data: { sessionId, email, note } }),
    onSuccess: (result) => {
      setEmail("");
      setNote("");
      void queryClient.invalidateQueries({ queryKey: ["invites", sessionId] });
      toast[result.emailed ? "success" : "message"](
        result.emailed
          ? "Invite sent."
          : "Invite saved — email sending isn't live yet, so share the link for now.",
      );
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const revokeMutation = useMutation({
    mutationFn: (inviteId: string) => revoke({ data: { sessionId, inviteId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invites", sessionId] }),
    onError: (error: Error) => toast.error(error.message),
  });

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Couldn't copy — select it by hand.");
    }
  };

  return (
    <div className="relative">
      <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
        Invite
      </Button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-80 space-y-4 rounded-lg border border-border bg-card p-4 shadow-xl">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Join code</p>
            <button
              type="button"
              onClick={() => copy(code, "Code")}
              className="mt-1 font-mono text-2xl tracking-[0.3em] text-card-foreground hover:opacity-80"
            >
              {code}
            </button>
          </div>

          <div className="space-y-2">
            <Button variant="secondary" className="w-full" onClick={() => copy(link, "Invite link")}>
              Copy invite link
            </Button>
            <p className="truncate text-[11px] text-muted-foreground">{link}</p>
          </div>

          <form
            className="space-y-2 border-t border-border pt-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMutation.mutate();
            }}
          >
            <Label htmlFor="invite-email">Email an invite</Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              placeholder="them@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              value={note}
              placeholder="Optional note"
              onChange={(e) => setNote(e.target.value)}
              maxLength={140}
            />
            <Button type="submit" className="w-full" disabled={sendMutation.isPending}>
              Send invite
            </Button>
          </form>

          {invites.data && invites.data.length > 0 ? (
            <ul className="space-y-1 border-t border-border pt-3">
              {invites.data.map((invite) => (
                <li key={invite.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-muted-foreground">{invite.email}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {invite.status}
                    </span>
                    {invite.status === "pending" ? (
                      <button
                        type="button"
                        className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
                        onClick={() => revokeMutation.mutate(invite.id)}
                      >
                        revoke
                      </button>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
