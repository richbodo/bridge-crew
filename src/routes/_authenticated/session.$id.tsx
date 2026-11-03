import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AgentCard } from "@/components/room/AgentCard";
import { ChatPane, type ContributionRow, type TranscriptLine } from "@/components/room/ChatPane";
import { ContextPanel } from "@/components/room/ContextPanel";
import { HailQueue } from "@/components/room/HailQueue";
import { InvitePanel } from "@/components/room/InvitePanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { listContextPacks } from "@/lib/context.functions";
import { CREW, CREW_ORDER, type AgentKind, type AgentStatus } from "@/lib/crew";
import { USERS_GUIDE_URL } from "@/lib/links";
import { answerHail, postPrompt, stopCrewMember, updateAgentProfile } from "@/lib/room.functions";
import { getRoom } from "@/lib/session.functions";

export const Route = createFileRoute("/_authenticated/session/$id")({
  head: () => ({
    meta: [
      { title: "Crew room — Bridge Crew" },
      {
        name: "description",
        content: "A shared room where two humans type and a crew of AI agents ask for the floor.",
      },
      { property: "og:title", content: "Crew room — Bridge Crew" },
      { property: "og:description", content: "Type together, summon the crew, keep the floor." },
    ],
  }),
  component: RoomPage,
});

/** What a refused grant or Not now means, in words (F7). */
const REFUSALS: Record<string, string> = {
  floor_busy: "Another crew member is speaking. Try again in a moment.",
  not_open: "That hail has already been answered.",
  not_current: "That crew member has moved on to newer work.",
};

const WATCHED = [
  "transcript",
  "agents_state",
  "hand_raises",
  "contributions",
  "stage_docs",
  "participants",
] as const;

function RoomPage() {
  const { id } = useParams({ from: "/_authenticated/session/$id" });
  const queryClient = useQueryClient();
  const fetchRoom = useServerFn(getRoom);
  const send = useServerFn(postPrompt);
  const resolve = useServerFn(answerHail);
  const standDown = useServerFn(stopCrewMember);
  const saveProfile = useServerFn(updateAgentProfile);
  const packList = useServerFn(listContextPacks);

  const [draft, setDraft] = useState("");

  const roomQuery = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoom({ data: { sessionId: id } }),
  });

  const packsQuery = useQuery({
    queryKey: ["context-packs", id],
    queryFn: () => packList({ data: { sessionId: id } }),
  });


  useEffect(() => {
    const channel = supabase.channel(`room:${id}`);
    for (const table of WATCHED) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `session_id=eq.${id}` },
        () => queryClient.invalidateQueries({ queryKey: ["room", id] }),
      );
    }
    channel.subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // The server starts the crew's runs and the Scribe's updates; this tab only sends (F10).
  const sendMutation = useMutation({
    mutationFn: async (body: string) => {
      await send({ data: { sessionId: id, body } });
      await queryClient.invalidateQueries({ queryKey: ["room", id] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const hailMutation = useMutation({
    mutationFn: async ({ hailId, grant }: { hailId: string; grant: boolean }) => {
      const result = await resolve({ data: { sessionId: id, hailId, grant } });
      if (!result.ok) throw new Error(REFUSALS[result.reason] ?? "That didn't work. Try again.");
      await queryClient.invalidateQueries({ queryKey: ["room", id] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const stopMutation = useMutation({
    mutationFn: async (agent: AgentKind) => {
      await standDown({ data: { sessionId: id, agent } });
      await queryClient.invalidateQueries({ queryKey: ["room", id] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const profileMutation = useMutation({
    mutationFn: async (input: {
      agent: AgentKind;
      name: string;
      duty: string;
      contextPacks: string[];
    }) => {
      await saveProfile({ data: { sessionId: id, ...input } });
      await queryClient.invalidateQueries({ queryKey: ["room", id] });
    },
    onSuccess: () => toast.success("Station updated."),
    onError: (error: Error) => toast.error(error.message),
  });

  const room = roomQuery.data;

  if (roomQuery.isLoading) {
    return <p className="p-8 text-sm text-muted-foreground">Opening the room…</p>;
  }
  if (roomQuery.isError || !room) {
    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground">
          This room isn't open to you. {(roomQuery.error as Error | null)?.message}
        </p>
        <Link to="/" className="mt-3 inline-block text-sm underline">
          Back to the lobby
        </Link>
      </div>
    );
  }

  const colorFor = (authorId: string | null) =>
    room.participants.find((p) => p.user_id === authorId)?.color ?? "var(--muted-foreground)";

  const nameFor = (agent: AgentKind) =>
    room.agents.find((a) => a.agent === agent)?.display_name?.trim() || CREW[agent].name;

  const statusOf = (agent: AgentKind): AgentStatus =>
    (room.agents.find((a) => a.agent === agent)?.status as AgentStatus | undefined) ?? "idle";

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");
    sendMutation.mutate(body);
  };

  const atWork = CREW_ORDER.filter((agent) => statusOf(agent) === "working").map(nameFor);

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-foreground">{room.session.title}</h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            join code {room.session.code}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {room.participants.map((p) => (
            <span key={p.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block size-2 rounded-full" style={{ backgroundColor: p.color }} />
              {p.display_name}
              {p.user_id === room.me.user_id ? (
                <span className="text-[10px] uppercase tracking-[0.15em] text-foreground">(you)</span>
              ) : null}
            </span>
          ))}

          <ContextPanel sessionId={id} />
          <InvitePanel sessionId={id} code={room.session.code} />
          <a
            href={USERS_GUIDE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Guide
          </a>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            Leave
          </Link>

        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <section className="flex min-h-0 flex-col border-r border-border">
          <ChatPane
            lines={room.transcript as unknown as TranscriptLine[]}
            contributions={room.contributions as unknown as ContributionRow[]}
            colorFor={colorFor}
            nameFor={nameFor}
          />
          <div className="border-t border-border p-3">
            <Textarea
              value={draft}
              rows={2}
              placeholder="Say something, call the crew by name (@scout, @advocate…), or use /research … /analyze … /debate …"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              className="resize-none bg-card text-sm"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-[11px] text-muted-foreground" aria-live="polite">
                {atWork.length ? (
                  <span className="text-foreground">Crew at work: {atWork.join(", ")}. </span>
                ) : null}
                Enter sends. Humans always have the floor.
              </p>
              {/* Send never greys out: the people can always talk (F11). */}
              <Button size="sm" onClick={submit}>
                Send
              </Button>
            </div>
          </div>
        </section>

        <section className="min-h-0 space-y-3 overflow-y-auto border-r border-border p-4">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Hails</h2>
          <HailQueue
            hails={room.hails as unknown as { id: string; agent: AgentKind; summary: string }[]}
            busy={hailMutation.isPending}
            nameFor={nameFor}
            onResolve={(hailId, grant) => hailMutation.mutate({ hailId, grant })}
          />
          <h2 className="pt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Stations</h2>
          {CREW_ORDER.map((agent) => {
            const state = room.agents.find((a) => a.agent === agent);
            const active = ["working", "hand_raised", "speaking"].includes(statusOf(agent));
            return (
              <AgentCard
                key={agent}
                agent={agent}
                status={statusOf(agent)}
                task={state?.current_task ?? null}
                progress={state?.progress ?? null}
                name={state?.display_name ?? null}
                duty={state?.duty ?? null}
                packs={(state?.context_packs as string[] | null) ?? []}
                availablePacks={packsQuery.data ?? []}
                busy={profileMutation.isPending}
                onStop={() => stopMutation.mutate(agent)}
                onEngage={(brief) =>
                  sendMutation.mutate(
                    active ? `/redirect ${CREW[agent].kind} ${brief}` : `/${CREW[agent].kind} ${brief}`,
                  )
                }
                onSaveProfile={({ name, duty, contextPacks }) =>
                  profileMutation.mutate({ agent, name, duty, contextPacks })
                }
              />
            );
          })}

        </section>

        <aside className="min-h-0 overflow-y-auto p-4">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            plan.md
            {room.scribeState !== "idle" ? (
              <span className="ml-2 normal-case tracking-normal">· Scribe is updating…</span>
            ) : null}
          </h2>
          <pre className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
            {room.plan || "Scribe hasn't written anything yet."}
          </pre>
        </aside>
      </div>
    </div>
  );
}
