import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ConnectGitHubButton } from "@/components/ConnectGitHub";
import { DemoSignIn } from "@/components/DemoSignIn";
import { PickGameButtons } from "@/components/PickGame";
import { PICKED_FILES_NOTE, type Picked } from "@/components/pick-game";
import { CrewAvatar } from "@/components/room/CrewAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { bringIn, whyBigger } from "@/lib/bring-in";
import { DEMO_MODE, demoUserFor } from "@/lib/demo";
import { defaultTitle, STUDENT, TEACHER } from "@/lib/lobby";
import { DEMO_CONTEXTS, demoScriptFor } from "@/lib/demo-rooms";
import { USERS_GUIDE_URL } from "@/lib/links";
import { describeSource } from "@/lib/github";
import { bringInFromGitHub, lookAtGitHubGame } from "@/lib/github.functions";
import { bringInGame, seedDemo } from "@/lib/room.functions";
import { createSession, myParticipations } from "@/lib/session.functions";
import { isTemplateKey, TEMPLATES, type Template, type TemplateKey } from "@/lib/templates";
import { cn } from "@/lib/utils";

/**
 * The lobby asks one thing first: what kind of room. Each kind then has its own page,
 * `/?kind=game-studio` or `/?kind=deliberation`, so the browser's Back button goes back to the
 * choice. The Game Studio's page opens with Quick start, since its defaults are enough to begin.
 */
type LobbyPage = TemplateKey | "all";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { kind?: LobbyPage } => {
    const kind = search["kind"];
    return isTemplateKey(kind) || kind === "all" ? { kind } : {};
  },
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

// `just game-studio`, and the teacher's Desktop shortcut, open the lobby on the Game Studio's
// page; "Kind of room" goes back to the choice (`/?kind=all`).
const FIXED_TEMPLATE: TemplateKey | null = isTemplateKey(
  import.meta.env["VITE_BRIDGE_CREW_TEMPLATE"],
)
  ? import.meta.env["VITE_BRIDGE_CREW_TEMPLATE"]
  : null;

/** The kinds of room, as the lobby offers them: games first. */
const KINDS: TemplateKey[] = ["game-studio", "deliberation"];

/**
 * `just demo`, with no kind of room fixed: a Deliberation room is a demo room, opened on a
 * Context's scripted scene (docs/plans/games-on-github-2026-11-16.md Part 1).
 */
const DEMO_LOBBY = DEMO_MODE && !FIXED_TEMPLATE;

/** A game picked in the lobby, or found at a GitHub link, to be the room's first version. */
interface StartingGame {
  /** Files picked from this laptop, or */
  picked: Picked | null;
  /** a GitHub link, which the server opens again when the room does. */
  link: string | null;
  /** "github.com/owner/repo", for a link. */
  from: string | null;
  title: string;
  files: number;
  /** Why it needs a Bigger room, if it does. */
  bigger: string | null;
  notes: string[];
}

function Lobby() {
  const { user, loading } = useAuth();
  const { kind } = Route.useSearch();
  const page: LobbyPage = kind ?? FIXED_TEMPLATE ?? "all";
  const demoUser = demoUserFor(user?.email);

  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Bridge Crew
          </p>
          <h1 className="text-lg font-semibold text-foreground">
            The room where the crew waits to be called
          </h1>
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
          {demoUser ? (
            <span className="text-xs text-foreground">Demo user {demoUser.slot}</span>
          ) : null}
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

      <div className="mx-auto max-w-3xl px-6 py-10">
        {!user ? (
          <div className="mx-auto max-w-sm rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-card-foreground">Sign in to open a room.</p>
            <Link to="/auth">
              <Button className="mt-3 w-full">Come aboard</Button>
            </Link>
            <DemoSignIn className="mt-4" />
          </div>
        ) : page === "all" ? (
          <ChooseKind userId={user.id} />
        ) : (
          <RoomSetup key={page} templateKey={page} userId={user.id} />
        )}
      </div>
    </main>
  );
}

/** The first page: what kind of room, and nothing else to decide. */
function ChooseKind({ userId }: { userId: string }) {
  return (
    <>
      <h2 className="text-xl font-semibold text-foreground">What kind of room?</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {KINDS.map((key) => (
          <KindCard key={key} template={TEMPLATES[key]} />
        ))}
      </div>
      <Elsewhere userId={userId} join className="mt-12" />
    </>
  );
}

function KindCard({ template }: { template: Template }) {
  const portraits = template.roster.filter((job) => job.avatar);
  return (
    <Link
      to="/"
      search={{ kind: template.key }}
      className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring focus-visible:border-ring focus-visible:outline-none"
    >
      <span className="block text-lg font-semibold text-card-foreground">{template.name}</span>
      <span className="mt-1 block text-sm text-muted-foreground">{template.description}</span>
      {portraits.length ? (
        <span className="mt-4 flex gap-1.5">
          {portraits.map((job) => (
            <CrewAvatar key={job.key} avatar={job.avatar!} accent={job.accent} status="idle" />
          ))}
        </span>
      ) : (
        <span className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {template.roster.map((job) => (
            <span key={job.key} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: job.accent }}
              />
              {job.name}
            </span>
          ))}
        </span>
      )}
    </Link>
  );
}

/** A kind of room's page: Quick start when its defaults are enough, then every option. */
function RoomSetup({ templateKey, userId }: { templateKey: TemplateKey; userId: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const create = useServerFn(createSession);
  const demo = useServerFn(seedDemo);
  const bring = useServerFn(bringInGame);
  const bringFromGitHub = useServerFn(bringInFromGitHub);
  const lookAt = useServerFn(lookAtGitHubGame);
  const template = TEMPLATES[templateKey];

  const [contextKey, setContextKey] = useState(DEMO_CONTEXTS[0]?.key ?? "");
  const [gameChoice, setGameChoice] = useState<"new" | "open">("new");
  const [startingGame, setStartingGame] = useState<StartingGame | null>(null);
  const [gameLink, setGameLink] = useState("");
  // Defaults a teacher can open a room with straight away (src/lib/lobby.ts). A name or title
  // that's still null hasn't been typed in, so it follows the kind of room and the game.
  const [studentName, setStudentName] = useState(STUDENT);
  const [games, setGames] = useState<"simple" | "bigger">("bigger");
  const [title, setTitle] = useState<string | null>(null);
  const [opened, setOpened] = useState("");
  const [typedName, setDisplayName] = useState<string | null>(null);
  const [color, setColor] = useState(COLORS[0]!);

  // The time is read in the browser, once the page is up, so the server's page matches it.
  useEffect(() => setOpened(defaultTitle(new Date())), []);

  const demoUser = demoUserFor(user?.email);
  useEffect(() => {
    if (demoUser) setColor(demoUser.color);
  }, [demoUser]);

  // `just game-studio` signs the teacher in as a demo user, but in the room they're the teacher.
  const displayName = typedName ?? (template.sharedSeat ? TEACHER : (demoUser?.name ?? ""));
  const game = template.bigScreen && gameChoice === "open" ? startingGame : null;
  const waitingForGame = template.bigScreen && gameChoice === "open" && !startingGame;
  const roomGames = game?.bigger ? "bigger" : games;
  // `just demo` opens Deliberation rooms on a Context's scene, whose title they take.
  const demoOnly = DEMO_LOBBY && templateKey === "deliberation";
  const demoScript = demoOnly ? demoScriptFor(contextKey) : undefined;
  const titleFor = (demoButton: boolean) =>
    demoScript?.title || game?.title || (demoButton ? "Demo run" : opened || "Untitled session");

  const lookMutation = useMutation({
    mutationFn: (link: string) => lookAt({ data: { link } }),
    onSuccess: (look, link) => {
      if (!look.ok) {
        setStartingGame(null);
        toast.error(look.message);
        return;
      }
      setStartingGame({
        picked: null,
        link,
        from: describeSource(look.source),
        title: look.title,
        files: look.files,
        bigger: look.bigger,
        notes: look.notes,
      });
      if (look.bigger) setGames("bigger");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const pickGame = (picked: Picked) => {
    try {
      const brought = bringIn(picked.files, picked.folder, picked.left);
      setStartingGame({
        picked,
        link: null,
        from: null,
        title: brought.title,
        files: Object.keys(brought.files).length,
        bigger: brought.needsBigger ? whyBigger(brought) : null,
        notes: brought.notes,
      });
      if (brought.needsBigger) setGames("bigger");
    } catch (error) {
      setStartingGame(null);
      toast.error((error as Error).message);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (demoButton: boolean) => {
      const session = await create({
        data: {
          title: title?.trim() || titleFor(demoButton),
          displayName,
          color,
          template: templateKey,
          ...(template.sharedSeat ? { studentName } : {}),
          ...(template.bigScreen ? { games: roomGames } : {}),
        },
      });
      // A Deliberation demo room opens with its context's script; a Game Studio one has none.
      if (demoButton && templateKey === "deliberation") {
        await demo({
          data: { sessionId: session.id, ...(demoScript ? { context: contextKey } : {}) },
        });
      }
      let gameProblem: string | null = null;
      if (game) {
        try {
          const result = game.link
            ? await bringFromGitHub({ data: { sessionId: session.id, link: game.link } })
            : await bring({
                data: {
                  sessionId: session.id,
                  files: game.picked!.files,
                  ...(game.picked!.folder ? { folder: game.picked!.folder } : {}),
                  ...(game.picked!.left.length ? { left: game.picked!.left } : {}),
                },
              });
          if (!result.ok) gameProblem = result.message;
        } catch (error) {
          gameProblem = (error as Error).message;
        }
      }
      return { session, gameProblem };
    },
    onSuccess: ({ session, gameProblem }) => {
      if (gameProblem) toast.error(`The room is open, but the game didn't come in: ${gameProblem}`);
      void navigate({ to: "/session/$id", params: { id: session.id } });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const busy = createMutation.isPending;
  const canOpen = !busy && !waitingForGame;
  // The Game Studio's defaults (the names, Bigger games, a new game, the date) open a room as
  // they are; a Deliberation room needs your name first.
  const quickStart = template.sharedSeat;

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">{template.name}</h2>
        <Link
          to="/"
          search={FIXED_TEMPLATE ? { kind: "all" } : {}}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← Kind of room
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>

      {quickStart ? (
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-primary/50 bg-card p-5 sm:flex-row sm:items-center">
          <Button
            size="lg"
            className="text-base"
            disabled={!canOpen}
            onClick={() => createMutation.mutate(false)}
          >
            Quick start
          </Button>
          <div className="text-sm">
            <p className="text-card-foreground">
              {displayName.trim() || "Someone"} and {studentName.trim() || STUDENT} ·{" "}
              {game ? game.title || "the game you chose" : "a new game"} ·{" "}
              {roomGames === "bigger" ? "Bigger" : "Simple"} games
            </p>
            <p className="text-muted-foreground">
              {waitingForGame
                ? "Choose the game below first."
                : "Opens a room now with these settings. Change them below if you like."}
            </p>
          </div>
        </div>
      ) : null}

      <section
        aria-labelledby="options"
        className="mt-6 space-y-6 rounded-xl border border-border bg-card p-5"
      >
        <h3 id="options" className="text-sm font-medium text-card-foreground">
          {quickStart ? "Settings" : "Open a room"}
        </h3>

        {demoOnly ? (
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium text-card-foreground">Context</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {DEMO_CONTEXTS.map((context) => (
                <Choice
                  key={context.key}
                  name="context"
                  value={context.key}
                  checked={contextKey === context.key}
                  onChange={() => setContextKey(context.key)}
                  title={context.name}
                  blurb={context.about}
                />
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Your name in the room</Label>
            <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <div className="flex gap-2 pt-1">
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
          </div>
          {template.sharedSeat ? (
            <div className="space-y-2">
              <Label htmlFor="student">Student's nickname</Label>
              <Input
                id="student"
                value={studentName}
                aria-describedby="student-note"
                onChange={(e) => setStudentName(e.target.value)}
              />
              <p id="student-note" className="text-[11px] text-muted-foreground">
                A nickname, not their real name.
              </p>
            </div>
          ) : (
            <TitleBox value={title ?? titleFor(false)} onChange={setTitle} />
          )}
        </div>

        {template.bigScreen ? (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-card-foreground">Game</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <Choice
                name="game"
                value="new"
                checked={gameChoice === "new"}
                onChange={() => setGameChoice("new")}
                title="New game"
                blurb="The student and the crew start one from nothing."
              />
              <Choice
                name="game"
                value="open"
                checked={gameChoice === "open"}
                onChange={() => setGameChoice("open")}
                title="Open a game"
                blurb="One made somewhere else, from its folder or HTML file."
              />
            </div>
            {gameChoice === "open" ? (
              <div className="mt-2 space-y-2 rounded-md border border-dashed border-border p-3 text-xs">
                <PickGameButtons disabled={busy} onPicked={pickGame} />
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (gameLink.trim()) lookMutation.mutate(gameLink.trim());
                  }}
                >
                  <Input
                    aria-label="GitHub link"
                    value={gameLink}
                    placeholder="Or a GitHub link"
                    onChange={(e) => setGameLink(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <Button
                    size="sm"
                    type="submit"
                    variant="secondary"
                    disabled={lookMutation.isPending || busy || !gameLink.trim()}
                  >
                    Look
                  </Button>
                </form>
                {lookMutation.isPending ? (
                  <p className="text-muted-foreground">Looking on GitHub…</p>
                ) : null}
                <p className="text-[11px] text-muted-foreground">
                  A private repository needs GitHub connected. <ConnectGitHubButton />
                </p>
                {startingGame ? (
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">
                      {startingGame.title || "The game"}: {startingGame.files} file
                      {startingGame.files === 1 ? "" : "s"}
                      {startingGame.from ? `, from ${startingGame.from}` : ""}. It'll be the room's
                      first version.
                    </p>
                    {startingGame.bigger ? (
                      <p className="text-foreground">
                        {startingGame.bigger} The room will make Bigger games.
                      </p>
                    ) : null}
                    {startingGame.notes.map((line) => (
                      <p key={line} className="text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Choose the game's folder, or its HTML file if it's just one, or paste its GitHub
                    link.
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground">{PICKED_FILES_NOTE}</p>
              </div>
            ) : null}
          </fieldset>
        ) : null}

        {template.bigScreen ? (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-card-foreground">Games</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <Choice
                name="games"
                value="simple"
                checked={games === "simple"}
                disabled={Boolean(game?.bigger)}
                onChange={() => setGames("simple")}
                title="Simple games"
                blurb="One file, 2D, quick to build. For first games."
              />
              <Choice
                name="games"
                value="bigger"
                checked={games === "bigger"}
                onChange={() => setGames("bigger")}
                title="Bigger games"
                blurb="A folder of code, 3D with Three.js, saved progress."
              />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              A Simple room can become Bigger later, but not back.
            </p>
          </fieldset>
        ) : null}

        {template.sharedSeat ? (
          <div className="sm:w-1/2 sm:pr-2.5">
            <TitleBox value={title ?? titleFor(false)} onChange={setTitle} />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {demoOnly ? (
            <Button disabled={busy} onClick={() => createMutation.mutate(true)}>
              Open a demo room
            </Button>
          ) : (
            <>
              <Button disabled={!canOpen} onClick={() => createMutation.mutate(false)}>
                Open a room
              </Button>
              {templateKey === "deliberation" ? (
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => createMutation.mutate(true)}
                >
                  Open a demo room
                </Button>
              ) : null}
            </>
          )}
        </div>
        {busy && game ? (
          <p className="text-xs text-muted-foreground">
            Opening the room and bringing the game in…
          </p>
        ) : null}
      </section>

      <Elsewhere userId={userId} join={template.seats > 1} only={templateKey} className="mt-10" />
      <Crew template={template} />
    </>
  );
}

function TitleBox({ value, onChange }: { value: string; onChange: (title: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Session title</Label>
      <Input id="title" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

/** One option of a few, as a box with a line about it. */
function Choice({
  name,
  value,
  checked,
  disabled = false,
  onChange,
  title,
  blurb,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  title: string;
  blurb: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer gap-2 rounded-md border p-3 text-xs",
        checked ? "border-ring" : "border-border",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mt-0.5"
      />
      <span>
        <span className="block text-sm font-medium text-card-foreground">{title}</span>
        <span className="text-muted-foreground">{blurb}</span>
      </span>
    </label>
  );
}

/** Rooms you've been in, of this kind or any, and joining someone else's by its code. */
function Elsewhere({
  userId,
  join,
  only,
  className,
}: {
  userId: string;
  join: boolean;
  only?: TemplateKey;
  className?: string;
}) {
  const navigate = useNavigate();
  const listMine = useServerFn(myParticipations);
  const [code, setCode] = useState("");
  const recent = useQuery({
    queryKey: ["my-sessions", userId],
    queryFn: () => listMine(),
  });
  const rooms = (recent.data ?? []).filter((s) => !only || s.template === only);
  if (!join && rooms.length === 0) return null;

  return (
    <div className={cn("grid items-start gap-4 sm:grid-cols-2", className)}>
      {rooms.length > 0 ? (
        <div className="rounded-lg border border-border p-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Recent rooms
          </p>
          <ul className="mt-2 space-y-1">
            {rooms.map((s) => (
              <li key={s.id}>
                <Link
                  to="/session/$id"
                  params={{ id: s.id }}
                  className="text-sm text-foreground hover:underline"
                >
                  {s.title} <span className="text-muted-foreground">· {s.code}</span>
                  {!only && s.template === "game-studio" ? (
                    <span className="text-muted-foreground"> · Game Studio</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {join ? (
        <form
          className="space-y-2 rounded-lg border border-border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            // The invite page names the room, and asks your name and colour there.
            if (code.length >= 4) void navigate({ to: "/join/$code", params: { code } });
          }}
        >
          <Label htmlFor="code">Join with a code</Label>
          <div className="flex gap-2">
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
            <Button type="submit" variant="secondary" disabled={code.length < 4}>
              Join
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

/** Who's in the crew, and how a turn works: below the options, for reading when you like. */
function Crew({ template }: { template: Template }) {
  return (
    <section aria-labelledby="crew" className="mt-10">
      <h2 id="crew" className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        The crew · {template.name}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {template.roster.map((job) => (
          <li
            key={job.key}
            className="flex gap-2.5 rounded-md border border-border bg-card p-3"
            style={{ borderLeft: `3px solid ${job.accent}` }}
          >
            {job.avatar ? (
              <CrewAvatar avatar={job.avatar} accent={job.accent} status="idle" />
            ) : null}
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-card-foreground">{job.name}</span>
              <span className="block text-xs leading-snug text-muted-foreground">{job.blurb}</span>
            </span>
          </li>
        ))}
      </ul>
      <h3 className="mt-6 text-sm font-medium text-foreground">How a turn works</h3>
      <ol className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground">
        <li>
          1. You type.{" "}
          {template.slashCommands
            ? "A crew member is summoned with /research, /analyze or /debate."
            : "Start with a crew member's name to ask them: “Artist, draw the mole.”"}
        </li>
        <li>2. They go and work. You keep talking — they never interrupt.</li>
        <li>3. They hail you with one line of what they've got.</li>
        <li>4. You grant the floor, or you don't. Then the Scribe updates {template.doc.file}.</li>
      </ol>
    </section>
  );
}
