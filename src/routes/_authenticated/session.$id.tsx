import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useBlocker, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AgentCard } from "@/components/room/AgentCard";
import { BigScreen, type Showing } from "@/components/room/BigScreen";
import {
  ChatPane,
  ContributionActions,
  type ContributionRow,
  type TranscriptLine,
} from "@/components/room/ChatPane";
import { Composer, type Speaker } from "@/components/room/Composer";
import { ContextPanel } from "@/components/room/ContextPanel";
import { HailQueue } from "@/components/room/HailQueue";
import { InvitePanel } from "@/components/room/InvitePanel";
import { labelOf, MadeThing, svgSource, type MadeRow } from "@/components/room/MadeThing";
import { ManageMade, type ManageAction } from "@/components/room/ManageMade";
import { Markdown } from "@/components/room/Markdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { listContextPacks } from "@/lib/context.functions";
import type { AgentStatus } from "@/lib/crew";
import { GUIDE_PART, USERS_GUIDE_URL } from "@/lib/links";
import {
  answerHail,
  answerProposal,
  explain,
  manageThing,
  postPrompt,
  reportCrash,
  setScreen,
  stopCrewMember,
  updateAgentProfile,
  useThing,
} from "@/lib/room.functions";
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

/** What a refused grant, Not now or answer means, in words (F7). */
const REFUSALS: Record<string, string> = {
  floor_busy: "Another crew member is speaking. Try again in a moment.",
  not_open: "That has already been answered.",
  not_current: "That crew member has moved on to newer work.",
};

/** What happened to a contribution that was never said (docs/state_machines.md §5). */
const NOT_SAID: Record<string, string> = {
  declined: "not now",
  replaced: "replaced by newer work",
  withdrawn: "stopped",
  superseded: "superseded",
};

const WATCHED = [
  "transcript",
  "agents_state",
  "hand_raises",
  "contributions",
  "stage_docs",
  "participants",
  "made_things",
  "proposals",
] as const;

interface Proposal {
  id: string;
  question: string;
  source: "room" | "crew";
  proposed_by: string | null;
}

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
  const showOnScreen = useServerFn(setScreen);
  const pickThing = useServerFn(useThing);
  const crashed = useServerFn(reportCrash);
  const answer = useServerFn(answerProposal);
  const askHow = useServerFn(explain);
  const manage = useServerFn(manageThing);

  const [draft, setDraft] = useState("");
  const [speaker, setSpeaker] = useState<Speaker>("student");
  const [replyTo, setReplyTo] = useState<ContributionRow | null>(null);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const boxRef = useRef<HTMLTextAreaElement>(null);

  const roomQuery = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoom({ data: { sessionId: id } }),
  });

  // The browser's Back (or a swipe on the trackpad) asks first in a room with a student in it.
  // Leave and Delete room are buttons, so they don't ask.
  const leaving = useBlocker({
    shouldBlockFn: ({ action }) => action !== "PUSH" && action !== "REPLACE",
    disabled: !(roomQuery.data && templateOf(roomQuery.data.template).sharedSeat),
    withResolver: true,
  });

  const packsQuery = useQuery({
    queryKey: ["context-packs", id],
    queryFn: () => packList({ data: { sessionId: id } }),
  });

  const refresh = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["room", id] }),
    [id, queryClient],
  );

  useEffect(() => {
    const channel = supabase.channel(`room:${id}`);
    for (const table of WATCHED) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `session_id=eq.${id}` },
        () => void refresh(),
      );
    }
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "sessions", filter: `id=eq.${id}` },
      () => void refresh(),
    );
    channel.subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [id, refresh]);

  const fail = (error: Error) => toast.error(error.message);

  // The server starts the crew's runs and the Scribe's updates; this tab only sends (F10).
  const sendMutation = useMutation({
    mutationFn: async ({ body, reply }: { body: string; reply: string | null }) => {
      await send({ data: { sessionId: id, body, speaker, replyTo: reply } });
      await refresh();
    },
    onError: fail,
  });

  const hailMutation = useMutation({
    mutationFn: async ({ hailId, grant }: { hailId: string; grant: boolean }) => {
      const result = await resolve({ data: { sessionId: id, hailId, grant } });
      if (!result.ok) throw new Error(REFUSALS[result.reason] ?? "That didn't work. Try again.");
      await refresh();
    },
    onError: fail,
  });

  const proposalMutation = useMutation({
    mutationFn: async ({ proposalId, yes }: { proposalId: string; yes: boolean }) => {
      const result = await answer({ data: { sessionId: id, proposalId, yes } });
      if (!result.ok) throw new Error(REFUSALS[result.reason] ?? "That didn't work. Try again.");
      await refresh();
    },
    onError: fail,
  });

  const stopMutation = useMutation({
    mutationFn: async (agent: string) => {
      await standDown({ data: { sessionId: id, agent } });
      await refresh();
    },
    onError: fail,
  });

  const screenMutation = useMutation({
    mutationFn: async (next: { view: "on" | "off"; showing?: Showing | null }) => {
      await showOnScreen({ data: { sessionId: id, ...next } });
      await refresh();
    },
    onError: fail,
  });

  const useThingMutation = useMutation({
    mutationFn: async (thingId: string) => {
      await pickThing({ data: { sessionId: id, thingId } });
      await refresh();
    },
    onError: fail,
  });

  const explainMutation = useMutation({
    mutationFn: async (contributionId: string) => {
      await askHow({ data: { sessionId: id, contributionId, speaker } });
      await refresh();
    },
    onError: fail,
  });

  const manageMutation = useMutation({
    mutationFn: async ({ thingId, action }: { thingId: string; action: ManageAction }) => {
      const result = await manage({ data: { sessionId: id, thingId, action } });
      if (!result.ok) throw new Error(result.message);
      await refresh();
    },
    onError: fail,
  });

  const profileMutation = useMutation({
    mutationFn: async (input: { agent: string; name: string; duty: string; contextPacks: string[] }) => {
      await saveProfile({ data: { sessionId: id, ...input } });
      await refresh();
    },
    onSuccess: () => toast.success("Station updated."),
    onError: fail,
  });

  const deleteMutation = useMutation({
    mutationFn: () => removeRoom({ data: { sessionId: id } }),
    onSuccess: async () => {
      toast.success("Room deleted.");
      await queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
      await navigate({ to: "/" });
    },
    onError: fail,
  });

  const onCrash = useCallback(
    (thingId: string, message: string) => {
      void crashed({ data: { sessionId: id, thingId, message } }).then(refresh);
    },
    [crashed, id, refresh],
  );

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
  const currentVersion = room.settings.currentVersion ?? null;
  const screen = room.settings.screen;
  const onScreen = template.bigScreen && screen?.view === "on";
  const isOwner = room.session.owner_id === room.me.user_id;
  const made = room.made as MadeRow[];
  const contributions = room.contributions as unknown as ContributionRow[];
  const proposals = room.proposals as Proposal[];

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
    setReplyTo(null);
    sendMutation.mutate({ body, reply: replyTo?.id ?? null });
  };

  const reply = (contribution: ContributionRow) => {
    setReplyTo(contribution);
    setDraft((prev) => (prev.trim() ? prev : `@${contribution.agent} `));
    requestAnimationFrame(() => {
      const box = boxRef.current;
      box?.focus();
      box?.setSelectionRange(box.value.length, box.value.length);
    });
  };

  const show = (showing: Showing) => screenMutation.mutate({ view: "on", showing });

  /** What a contribution made, and what it removes: with its hail, or once it's said. */
  const madeFor = (contributionId: string, compact = false) => {
    const things = made.filter((t) => t.contribution_id === contributionId);
    const removes = contributions.find((c) => c.id === contributionId)?.removes ?? [];
    const removing = made.filter((t) => removes.includes(t.id));
    if (!things.length && !removing.length) return null;
    return (
      <div className="mt-2 space-y-1">
        {things.map((thing) => (
          <MadeThing
            key={thing.id}
            thing={thing}
            current={thing.id === currentVersion}
            title={room.session.title}
            compact={compact}
            onScreen={(t) => show({ kind: "made", id: t.id })}
            onUse={(t) => useThingMutation.mutate(t.id)}
          />
        ))}
        {removing.length ? (
          <div className="rounded-md border border-dashed border-border p-2">
            <p className="text-[11px] text-muted-foreground">
              {compact ? "Removes, if you grant it:" : "Removed:"}
            </p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {removing.map((thing) => (
                <li
                  key={thing.id}
                  className="flex items-center gap-1.5 rounded-sm bg-background/60 px-1.5 py-0.5 text-[11px] text-foreground"
                >
                  {thing.kind === "picture" ? (
                    <img src={svgSource(thing.body)} alt="" className="size-5 object-contain" />
                  ) : null}
                  {labelOf(thing)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  const shown = made.filter((t) => t.state !== "removed");
  const manageButton = (
    <ManageMade
      made={made}
      currentVersion={currentVersion}
      nameFor={nameFor}
      busy={manageMutation.isPending}
      onAction={(thing, action) => manageMutation.mutate({ thingId: thing.id, action })}
    />
  );

  const roster = template.roster.map((job) => job.key);
  const atWork = roster.filter((agent) => statusOf(agent) === "working").map(nameFor);
  const notSaid = contributions.filter((c) => c.outcome && c.outcome in NOT_SAID).reverse();
  const said = contributions.filter((c) => c.outcome === "said").reverse().slice(0, 12);

  const composer = (rows: number) => (
    <Composer
      draft={draft}
      onDraft={setDraft}
      onSend={submit}
      rows={rows}
      placeholder={
        template.slashCommands
          ? "Say something, call the crew by name (@scout, @advocate…), or use /research … /analyze … /debate …"
          : "Say something. To ask a crew member, start with their name: “Artist, draw the mole.”"
      }
      {...(template.sharedSeat
        ? {
            speaker: {
              value: speaker,
              student: studentName,
              teacher: room.me.display_name,
              onChange: setSpeaker,
            },
          }
        : {})}
      replyingTo={
        replyTo
          ? { name: nameFor(replyTo.agent), spoken: replyTo.spoken, onCancel: () => setReplyTo(null) }
          : null
      }
      atWork={atWork}
      inputRef={boxRef}
    />
  );

  const suggestions = proposals.length ? (
    <ul className="space-y-2" aria-label="Suggestions">
      {proposals.map((proposal) => (
        <li key={proposal.id} className="rounded-lg border border-ring/60 bg-card p-3">
          <p className="text-sm text-card-foreground">
            {proposal.source === "crew" && proposal.proposed_by ? (
              <span className="font-medium">{nameFor(proposal.proposed_by)} suggests: </span>
            ) : null}
            {proposal.question}
          </p>
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              disabled={proposalMutation.isPending}
              onClick={() => proposalMutation.mutate({ proposalId: proposal.id, yes: true })}
            >
              Yes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-3 text-xs"
              disabled={proposalMutation.isPending}
              onClick={() => proposalMutation.mutate({ proposalId: proposal.id, yes: false })}
            >
              No thanks
            </Button>
          </div>
        </li>
      ))}
    </ul>
  ) : null;

  const newestHail = room.hails.at(-1);

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

          {template.bigScreen && !onScreen ? (
            <Button size="sm" variant="secondary" className="h-7 px-2 text-xs" onClick={() => screenMutation.mutate({ view: "on" })}>
              On screen
            </Button>
          ) : null}
          <ContextPanel sessionId={id} />
          {template.seats > 1 ? <InvitePanel sessionId={id} code={room.session.code} /> : null}
          <a
            href={USERS_GUIDE_URL + GUIDE_PART[template.key]}
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
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setConfirmDelete(false)}>
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

      <AlertDialog open={leaving.status === "blocked"} onOpenChange={(open) => (open ? null : leaving.reset?.())}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave the studio?</AlertDialogTitle>
            <AlertDialogDescription>
              The game is saved. You can come back to this room from Recent rooms in the lobby.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* Staying is the bold choice, and has the focus: a slip shouldn't end the session. */}
          <AlertDialogFooter>
            <AlertDialogAction
              className="border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
              onClick={() => leaving.proceed?.()}
            >
              Leave
            </AlertDialogAction>
            <AlertDialogCancel
              className="border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:text-primary-foreground"
              onClick={() => leaving.reset?.()}
            >
              Stay here
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {onScreen ? (
        <BigScreen
          title={room.session.title}
          showing={screen?.showing ?? null}
          made={shown}
          said={said}
          currentVersion={currentVersion}
          nameFor={nameFor}
          onShow={show}
          onOff={() => screenMutation.mutate({ view: "off" })}
          onCrash={onCrash}
          manage={manageButton}
          strip={
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
              {composer(1)}
              <div className="space-y-2">
                {suggestions}
                {newestHail ? (
                  <div className="rounded-lg border border-border bg-card p-2 text-xs">
                    <p className="text-muted-foreground">
                      {room.hails.length} hail{room.hails.length === 1 ? "" : "s"} · {nameFor(newestHail.agent)} is hailing
                    </p>
                    <p className="mt-1 text-card-foreground">{newestHail.summary}</p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        className="h-7 px-3 text-xs"
                        disabled={hailMutation.isPending}
                        onClick={() => hailMutation.mutate({ hailId: newestHail.id, grant: true })}
                      >
                        Grant the floor
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-3 text-xs"
                        disabled={hailMutation.isPending}
                        onClick={() => hailMutation.mutate({ hailId: newestHail.id, grant: false })}
                      >
                        Not now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No hails. The floor is yours.</p>
                )}
              </div>
            </div>
          }
        />
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          <section className="flex min-h-0 flex-col border-r border-border">
            <ChatPane
              lines={room.transcript as unknown as TranscriptLine[]}
              contributions={contributions}
              colorFor={colorFor}
              jobOf={jobOf}
              nameFor={nameFor}
              {...(template.bigScreen
                ? {
                    madeFor: (contributionId: string) => madeFor(contributionId),
                    onReply: reply,
                    onExplain: (c: ContributionRow) => explainMutation.mutate(c.id),
                  }
                : {})}
            />
            <div className="border-t border-border p-3">{composer(2)}</div>
          </section>

          <section className="min-h-0 space-y-3 overflow-y-auto border-r border-border p-4">
            {suggestions ? (
              <>
                <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Suggestions</h2>
                {suggestions}
              </>
            ) : null}
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Hails</h2>
            <HailQueue
              hails={room.hails}
              busy={hailMutation.isPending}
              jobOf={jobOf}
              nameFor={nameFor}
              madeFor={(contributionId) => madeFor(contributionId, true)}
              onResolve={(hailId, grant) => hailMutation.mutate({ hailId, grant })}
            />
            {notSaid.length ? (
              <details className="rounded-lg border border-dashed border-border p-3 text-xs">
                <summary className="cursor-pointer text-muted-foreground">
                  Briefs not said ({notSaid.length})
                </summary>
                <ul className="mt-2 space-y-3">
                  {notSaid.map((c) => (
                    <li key={c.id}>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {nameFor(c.agent)} · {NOT_SAID[c.outcome ?? ""]}
                      </p>
                      <p className="mt-1 text-card-foreground">{c.spoken}</p>
                      <Markdown className="mt-1 text-muted-foreground">{c.brief}</Markdown>
                      {template.bigScreen ? (
                        <ContributionActions
                          onReply={() => reply(c)}
                          onExplain={() => explainMutation.mutate(c.id)}
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
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
                    sendMutation.mutate({
                      body: template.slashCommands
                        ? active
                          ? `/redirect ${agent} ${brief}`
                          : `/${agent} ${brief}`
                        : `@${agent} ${brief}`,
                      reply: null,
                    })
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
            <Markdown className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {room.plan || template.doc.empty}
            </Markdown>
            {template.bigScreen ? (
              <>
                <div className="mt-6 flex items-center justify-between gap-2">
                  <h2 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Made in this room
                  </h2>
                  {made.length ? manageButton : null}
                </div>
                {shown.length ? (
                  <div className="mt-3 space-y-1">
                    {[...shown].reverse().map((thing) => (
                      <MadeThing
                        key={thing.id}
                        thing={thing}
                        current={thing.id === currentVersion}
                        title={room.session.title}
                        onScreen={(t) => show({ kind: "made", id: t.id })}
                        onUse={(t) => useThingMutation.mutate(t.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Versions, pictures and sounds the crew makes appear here.
                  </p>
                )}
              </>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  );
}
