import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
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
import type { AgentStatus } from "@/lib/crew";
import { USERS_GUIDE_URL } from "@/lib/links";
import { answerHail, postPrompt, stopCrewMember, updateAgentProfile } from "@/lib/room.functions";
import { deleteRoom, getRoom } from "@/lib/session.functions";
import { jobOf as templateJob, templateOf } from "@/lib/templates";

export const Route = createFileRoute("/_authenticated/session/$id")({
  head: () => ({
    meta: [
      { title: "Crew room — Bridge Crew" },
      {
        name: "description",
        content: "A shared room where people type and a crew of AI agents ask for the floor.",
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

type Speaker = "student" | "teacher";

function RoomPage() {
  const { id } = useParams({ from: "/_authenticated/session/$id" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const fetchRoom = useServerFn(getRoom);
  const send = useServerFn(postPrompt);
  const resolve = useServerFn(answerHail);
  const standDown = useServerFn(stopCrewMember);
  const saveProfile = useServerFn(updateAgentProfile);
  const removeRoom = useServerFn(deleteRoom);
  const packList = useServerFn(listContextPacks);

  const [draft, setDraft] = useState("");
  const [speaker, setSpeaker] = useState<Speaker>("student");
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const roomQuery = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoom({ data: { sessionId: id } }),
  });

  const packsQuery = useQuery({
    queryKey: ["context-packs", id],
    queryFn: () => packList({ data: { sessionId: id } }),
  });

  useEffect(() => {
    const refresh = () => queryClient.invalidateQueries({ queryKey: ["room", id] });
    const channel = supabase.channel(`room:${id}`);
    for (const table of WATCHED) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `session_id=eq.${id}` },
        refresh,
      );
    }
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "sessions", filter: `id=eq.${id}` },
      refresh,
    );
    channel.subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // The server starts the crew's runs and the Scribe's updates; this tab only sends (F10).
  const sendMutation = useMutation({
    mutationFn: async (body: string) => {
      await send({ data: { sessionId: id, body, speaker } });
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
    mutationFn: async (agent: string) => {
      await standDown({ data: { sessionId: id, agent } });
      await queryClient.invalidateQueries({ queryKey: ["room", id] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const profileMutation = useMutation({
    mutationFn: async (input: {
      agent: string;
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

  const deleteMutation = useMutation({
    mutationFn: () => removeRoom({ data: { sessionId: id } }),
    onSuccess: async () => {
      toast.success("Room deleted.");
      await queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
      await navigate({ to: "/" });
    },
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

  const template = templateOf(room.template);
  const jobOf = (agent: string) => templateJob(template, agent);
  const studentName = room.settings.studentName || "Student";
  const isOwner = room.session.owner_id === room.me.user_id;

  const colorFor = (authorId: string | null) =>
    room.participants.find((p) => p.user_id === authorId)?.color ?? "var(--muted-foreground)";

  const nameFor = (agent: string) =>
    room.agents.find((a) => a.agent === agent)?.display_name?.trim() || jobOf(agent).name;

  const statusOf = (agent: string): AgentStatus =>
    (room.agents.find((a) => a.agent === agent)?.status as AgentStatus | undefined) ?? "idle";

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");
    sendMutation.mutate(body);
  };

  const roster = template.roster.map((job) => job.key);
  const atWork = roster.filter((agent) => statusOf(agent) === "working").map(nameFor);

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-foreground">{room.session.title}</h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {template.sharedSeat ? template.name : `join code ${room.session.code}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {template.sharedSeat ? (
            <span className="text-xs text-muted-foreground">
              {room.me.display_name} (teacher) and {studentName} (student)
            </span>
          ) : (
            room.participants.map((p) => (
              <span key={p.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-block size-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.display_name}
                {p.user_id === room.me.user_id ? (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-foreground">(you)</span>
                ) : null}
              </span>
            ))
          )}

          <ContextPanel sessionId={id} />
          {template.seats > 1 ? <InvitePanel sessionId={id} code={room.session.code} /> : null}
          <a
            href={USERS_GUIDE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Guide
          </a>
          {isOwner ? (
            confirmDelete ? (
              <span className="flex items-center gap-2 text-xs">
                <span className="text-foreground">Delete this room for good?</span>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 px-2 text-xs"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate()}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={() => setConfirmDelete(false)}
                >
                  Keep it
                </Button>
              </span>
            ) : (
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setConfirmDelete(true)}
              >
                Delete room
              </button>
            )
          ) : null}
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            Leave
          </Link>
        </div>
      </header>

      {template.notice ? (
        <p className="border-b border-border bg-card/40 px-5 py-1.5 text-[11px] text-muted-foreground">
          These are AI characters, and they can be wrong.
        </p>
      ) : null}

      {template.notice && noticeOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4"
        >
          <div className="max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 id="notice-title" className="text-sm font-semibold text-card-foreground">
              Classroom notice
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-card-foreground">{template.notice}</p>
            <Button className="mt-5" onClick={() => setNoticeOpen(false)}>
              We've read it
            </Button>
          </div>
        </div>
      ) : null}

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <section className="flex min-h-0 flex-col border-r border-border">
          <ChatPane
            lines={room.transcript as unknown as TranscriptLine[]}
            contributions={room.contributions as unknown as ContributionRow[]}
            colorFor={colorFor}
            jobOf={jobOf}
            nameFor={nameFor}
          />
          <div className="border-t border-border p-3">
            {template.sharedSeat ? (
              <div className="mb-2 flex items-center gap-2 text-xs" role="group" aria-label="Who's talking">
                <span className="text-muted-foreground">Who's talking:</span>
                {(["student", "teacher"] as const).map((who) => (
                  <button
                    key={who}
                    type="button"
                    aria-pressed={speaker === who}
                    onClick={() => setSpeaker(who)}
                    className={`rounded-sm border px-2 py-0.5 ${
                      speaker === who
                        ? "border-transparent bg-secondary text-secondary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {who === "student" ? studentName : `${room.me.display_name} (teacher)`}
                  </button>
                ))}
              </div>
            ) : null}
            <Textarea
              value={draft}
              rows={2}
              placeholder={
                template.slashCommands
                  ? "Say something, call the crew by name (@scout, @advocate…), or use /research … /analyze … /debate …"
                  : "Say something. To ask a crew member, start with their name: “Artist, draw the mole.”"
              }
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
            hails={room.hails}
            busy={hailMutation.isPending}
            jobOf={jobOf}
            nameFor={nameFor}
            onResolve={(hailId, grant) => hailMutation.mutate({ hailId, grant })}
          />
          <h2 className="pt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {template.sharedSeat ? "Crew" : "Stations"}
          </h2>
          {roster.map((agent) => {
            const state = room.agents.find((a) => a.agent === agent);
            const active = ["working", "hand_raised", "speaking"].includes(statusOf(agent));
            return (
              <AgentCard
                key={agent}
                job={jobOf(agent)}
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
                    template.slashCommands
                      ? active
                        ? `/redirect ${agent} ${brief}`
                        : `/${agent} ${brief}`
                      : `@${agent} ${brief}`,
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
            {template.doc.file}
            {room.scribeState !== "idle" ? (
              <span className="ml-2 normal-case tracking-normal">· Scribe is updating…</span>
            ) : null}
          </h2>
          <pre className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
            {room.plan || template.doc.empty}
          </pre>
        </aside>
      </div>
    </div>
  );
}
