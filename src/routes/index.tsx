import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CREW, CREW_ORDER } from "@/lib/crew";
import { USERS_GUIDE_URL } from "@/lib/links";
import { seedDemo } from "@/lib/room.functions";
import { createSession, joinSession, myParticipations } from "@/lib/session.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bridge Crew — a room for two humans and a crew of agents" },
      {
        name: "description",
        content:
          "Bridge Crew is a shared working room: two people type, AI crew members go and work, raise a hand, and speak only when you grant the floor.",
      },
      { property: "og:title", content: "Bridge Crew" },
      {
        property: "og:description",
        content: "Two humans, a crew of agents, and one rule: the humans hold the floor.",
      },
    ],
  }),
  component: Lobby,
});

const COLORS = ["#7dd3fc", "#fca5a5", "#fcd34d", "#86efac", "#c4b5fd"];

function Lobby() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const create = useServerFn(createSession);
  const join = useServerFn(joinSession);
  const demo = useServerFn(seedDemo);
  const listMine = useServerFn(myParticipations);

  const [title, setTitle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState(COLORS[0]!);
  const [code, setCode] = useState("");

  const recent = useQuery({
    queryKey: ["my-sessions", user?.id],
    queryFn: () => listMine(),
    enabled: Boolean(user),
  });

  const createMutation = useMutation({
    mutationFn: async (withDemo: boolean) => {
      const session = await create({
        data: { title: title || (withDemo ? "Demo run" : "Untitled session"), displayName, color },
      });
      if (withDemo) await demo({ data: { sessionId: session.id } });
      return session;
    },
    onSuccess: (session) => navigate({ to: "/session/$id", params: { id: session.id } }),
    onError: (error: Error) => toast.error(error.message),
  });

  const joinMutation = useMutation({
    mutationFn: () => join({ data: { code, displayName, color } }),
    onSuccess: (session) => navigate({ to: "/session/$id", params: { id: session.id } }),
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Bridge Crew</p>
          <h1 className="text-lg font-semibold text-foreground">The room where the crew waits to be called</h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={USERS_GUIDE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Users guide
          </a>
          {loading ? null : user ? (
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              Sign out
            </button>
          ) : (
            <Link to="/auth" className="text-xs text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
          )}
        </div>

      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <h2 className="text-sm uppercase tracking-[0.25em] text-muted-foreground">The crew</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CREW_ORDER.map((kind) => (
              <div
                key={kind}
                className="rounded-lg border border-border bg-card p-4"
                style={{ borderLeft: `3px solid ${CREW[kind].accent}` }}
              >
                <p className="text-sm font-semibold text-card-foreground">{CREW[kind].name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {CREW[kind].station}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{CREW[kind].blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border p-4">
            <h3 className="text-sm font-medium text-foreground">How a turn works</h3>
            <ol className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground">
              <li>1. You type. A crew member is summoned with /research, /analyze or /debate.</li>
              <li>2. They go and work. You keep talking — they never interrupt.</li>
              <li>3. They hail you with one line of what they've got.</li>
              <li>4. You grant the floor, or you don't. Then Scribe updates plan.md.</li>
            </ol>
          </div>
        </section>

        <aside className="space-y-4">
          {!user ? (
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-card-foreground">Sign in to open a room.</p>
              <Link to="/auth">
                <Button className="mt-3 w-full">Come aboard</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Your name in the room</Label>
                  <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
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
                <div className="space-y-1">
                  <Label htmlFor="title">Session title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <Button
                  className="w-full"
                  disabled={createMutation.isPending}
                  onClick={() => createMutation.mutate(false)}
                >
                  Open a room
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={createMutation.isPending}
                  onClick={() => createMutation.mutate(true)}
                >
                  Open a demo room
                </Button>
              </div>

              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <Label htmlFor="code">Join with a code</Label>
                <Input
                  id="code"
                  value={code}
                  placeholder="ABC123"
                  onChange={(e) => {
                    const raw = e.target.value.trim();
                    const fromLink = raw.match(/\/join\/([A-Za-z0-9]+)/);
                    setCode((fromLink?.[1] ?? raw).toUpperCase());
                  }}
                />
                <Button
                  variant="secondary"
                  className="w-full"
                  disabled={joinMutation.isPending || code.length < 4}
                  onClick={() => joinMutation.mutate()}
                >
                  Join
                </Button>
              </div>

              {recent.data && recent.data.length > 0 ? (
                <div className="rounded-lg border border-border p-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Recent rooms</p>
                  <ul className="mt-2 space-y-1">
                    {recent.data.map((s) => (
                      <li key={s.id}>
                        <Link
                          to="/session/$id"
                          params={{ id: s.id }}
                          className="text-sm text-foreground hover:underline"
                        >
                          {s.title} <span className="text-muted-foreground">· {s.code}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
