import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { acceptInvites, peekSession } from "@/lib/invite.functions";
import { joinSession } from "@/lib/session.functions";

export const Route = createFileRoute("/join/$code")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Join a crew room — Bridge Crew" },
      {
        name: "description",
        content: "You've been invited into a Bridge Crew room. Pick a name and colour and come aboard.",
      },
      { property: "og:title", content: "Join a crew room — Bridge Crew" },
      { property: "og:description", content: "Two humans, a crew of agents. Come aboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JoinPage,
});

const COLORS = ["#7dd3fc", "#fca5a5", "#fcd34d", "#86efac", "#c4b5fd"];

function JoinPage() {
  const { code } = useParams({ from: "/join/$code" });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const peek = useServerFn(peekSession);
  const join = useServerFn(joinSession);
  const accept = useServerFn(acceptInvites);

  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState(COLORS[0]!);

  useEffect(() => {
    if (!loading && !user) {
      try {
        sessionStorage.setItem("bridge-crew:join-code", code);
      } catch {
        /* ignore */
      }
    }
  }, [loading, user, code]);

  const roomQuery = useQuery({
    queryKey: ["peek", code],
    queryFn: () => peek({ data: { code } }),
    enabled: Boolean(user),
  });

  const joinMutation = useMutation({
    mutationFn: async () => {
      const session = await join({ data: { code, displayName, color } });
      await accept({ data: { sessionId: session.id } });
      return session;
    },
    onSuccess: (session) => navigate({ to: "/session/$id", params: { id: session.id } }),
    onError: (error: Error) => toast.error(error.message),
  });

  const shell = (children: React.ReactNode) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Bridge Crew</p>
        {children}
      </div>
    </main>
  );

  if (loading) return shell(<p className="mt-3 text-sm text-muted-foreground">Checking the manifest…</p>);

  if (!user) {
    return shell(
      <>
        <h1 className="mt-2 text-xl font-semibold text-foreground">You've been invited aboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Room code <span className="font-mono tracking-[0.2em] text-foreground">{code}</span>. Sign in and
          you'll be dropped straight into the room.
        </p>
        <Link to="/auth" search={{ next: `/join/${code}` }}>
          <Button className="mt-4 w-full">Sign in to join</Button>
        </Link>
      </>,
    );
  }

  if (roomQuery.isLoading) {
    return shell(<p className="mt-3 text-sm text-muted-foreground">Finding the room…</p>);
  }

  if (!roomQuery.data) {
    return shell(
      <>
        <h1 className="mt-2 text-xl font-semibold text-foreground">That invite doesn't work</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No room is open with code {code}. Ask whoever invited you for a fresh link.
        </p>
        <Link to="/" className="mt-4 block text-sm underline">
          Back to the lobby
        </Link>
      </>,
    );
  }

  const { session, participants } = roomQuery.data;

  return shell(
    <>
      <h1 className="mt-2 text-xl font-semibold text-foreground">{session.title}</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        {participants.length === 0
          ? "Nobody's in the room yet."
          : `Already aboard: ${participants.map((p) => p.display_name).join(", ")}`}
      </p>

      <div className="mt-5 space-y-3">
        <div className="space-y-1">
          <Label htmlFor="join-name">Your name in the room</Label>
          <Input id="join-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Pick colour ${c}`}
              onClick={() => setColor(c)}
              className={`size-6 rounded-full ${color === c ? "ring-2 ring-ring ring-offset-2 ring-offset-card" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <Button className="w-full" disabled={joinMutation.isPending} onClick={() => joinMutation.mutate()}>
          Come aboard
        </Button>
      </div>
    </>,
  );
}
