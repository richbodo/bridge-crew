import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DemoSignIn } from "@/components/DemoSignIn";
import { PickGameButtons } from "@/components/PickGame";
import { PICKED_FILES_NOTE, type Picked } from "@/components/pick-game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { bringIn, whyBigger } from "@/lib/bring-in";
import { DEMO_MODE, demoUserFor } from "@/lib/demo";
import { DEMO_CONTEXTS, demoScriptFor, GAME_STUDIO } from "@/lib/demo-rooms";
import { USERS_GUIDE_URL } from "@/lib/links";
import { bringInGame, seedDemo } from "@/lib/room.functions";
import { createSession, joinSession, myParticipations } from "@/lib/session.functions";
import { isTemplateKey, TEMPLATE_ORDER, TEMPLATES, type TemplateKey } from "@/lib/templates";

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

// `just game-studio`, and the teacher's Desktop shortcut, open the lobby with Game Studio picked.
const FIXED_TEMPLATE: TemplateKey | null = isTemplateKey(
  import.meta.env["VITE_BRIDGE_CREW_TEMPLATE"],
)
  ? import.meta.env["VITE_BRIDGE_CREW_TEMPLATE"]
  : null;
const STARTING_TEMPLATE: TemplateKey = FIXED_TEMPLATE ?? "deliberation";

/**
 * `just demo`, with no kind of room fixed: one button, Open a demo room, and a Context to choose,
 * which sets the kind of room (docs/plans/games-on-github-2026-11-16.md Part 1).
 */
const DEMO_LOBBY = DEMO_MODE && !FIXED_TEMPLATE;

/** A game picked in the lobby, to be the room's first version. */
interface StartingGame {
  picked: Picked;
  title: string;
  files: number;
  /** Why it needs a Bigger room, if it does. */
  bigger: string | null;
  notes: string[];
}

function Lobby() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const create = useServerFn(createSession);
  const join = useServerFn(joinSession);
  const demo = useServerFn(seedDemo);
  const bring = useServerFn(bringInGame);
  const listMine = useServerFn(myParticipations);

  const [pickedTemplate, setTemplateKey] = useState<TemplateKey>(STARTING_TEMPLATE);
  const [contextKey, setContextKey] = useState(GAME_STUDIO);
  const demoContext =
    DEMO_CONTEXTS.find((context) => context.key === contextKey) ?? DEMO_CONTEXTS[0]!;
  const templateKey = DEMO_LOBBY ? demoContext.template : pickedTemplate;
  const [gameChoice, setGameChoice] = useState<"new" | "open">("new");
  const [startingGame, setStartingGame] = useState<StartingGame | null>(null);
  const [studentName, setStudentName] = useState("");
  const [games, setGames] = useState<"simple" | "bigger">("simple");
  const [title, setTitle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState(COLORS[0]!);
  const [code, setCode] = useState("");

  const demoUser = demoUserFor(user?.email);
  useEffect(() => {
    if (!demoUser) return;
    setDisplayName(demoUser.name);
    setColor(demoUser.color);
  }, [demoUser]);

  const recent = useQuery({
    queryKey: ["my-sessions", user?.id],
    queryFn: () => listMine(),
    enabled: Boolean(user),
  });

  const template = TEMPLATES[templateKey];
  const game = template.bigScreen && gameChoice === "open" ? startingGame : null;
  const waitingForGame = template.bigScreen && gameChoice === "open" && !startingGame;
  const demoScript =
    DEMO_LOBBY && contextKey !== GAME_STUDIO ? demoScriptFor(contextKey) : undefined;
  const titleFor = (demoButton: boolean) =>
    demoScript?.title || game?.title || (demoButton ? "Demo run" : "Untitled session");

  const pickGame = (picked: Picked) => {
    try {
      const brought = bringIn(picked.files, picked.folder, picked.left);
      setStartingGame({
        picked,
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
          title: title || titleFor(demoButton),
          displayName,
          color,
          template: templateKey,
          studentName,
          ...(template.bigScreen ? { games: game?.bigger ? "bigger" : games } : {}),
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
          const result = await bring({
            data: {
              sessionId: session.id,
              files: game.picked.files,
              ...(game.picked.folder ? { folder: game.picked.folder } : {}),
              ...(game.picked.left.length ? { left: game.picked.left } : {}),
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

  const joinMutation = useMutation({
    mutationFn: () => join({ data: { code, displayName, color } }),
    onSuccess: (session) => navigate({ to: "/session/$id", params: { id: session.id } }),
    onError: (error: Error) => toast.error(error.message),
  });

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

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <h2 className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            The crew · {template.name}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {template.roster.map((job) => (
              <div
                key={job.key}
                className="rounded-lg border border-border bg-card p-4"
                style={{ borderLeft: `3px solid ${job.accent}` }}
              >
                <p className="text-sm font-semibold text-card-foreground">{job.name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {job.station}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{job.blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border p-4">
            <h3 className="text-sm font-medium text-foreground">How a turn works</h3>
            <ol className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground">
              <li>
                1. You type.{" "}
                {template.slashCommands
                  ? "A crew member is summoned with /research, /analyze or /debate."
                  : "Start with a crew member's name to ask them: “Artist, draw the mole.”"}
              </li>
              <li>2. They go and work. You keep talking — they never interrupt.</li>
              <li>3. They hail you with one line of what they've got.</li>
              <li>
                4. You grant the floor, or you don't. Then the Scribe updates {template.doc.file}.
              </li>
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
              <DemoSignIn className="mt-4" />
            </div>
          ) : (
            <>
              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                {DEMO_LOBBY ? (
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-card-foreground">Context</legend>
                    {DEMO_CONTEXTS.map((context) => (
                      <label
                        key={context.key}
                        className={`flex cursor-pointer gap-2 rounded-md border p-2 text-xs ${
                          contextKey === context.key ? "border-ring" : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="context"
                          value={context.key}
                          checked={contextKey === context.key}
                          onChange={() => setContextKey(context.key)}
                          className="mt-0.5"
                        />
                        <span>
                          <span className="block font-medium text-card-foreground">
                            {context.name}
                          </span>
                          <span className="text-muted-foreground">{context.about}</span>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                ) : (
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-card-foreground">
                      Kind of room
                    </legend>
                    {TEMPLATE_ORDER.map((key) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer gap-2 rounded-md border p-2 text-xs ${
                          templateKey === key ? "border-ring" : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="template"
                          value={key}
                          checked={templateKey === key}
                          onChange={() => setTemplateKey(key)}
                          className="mt-0.5"
                        />
                        <span>
                          <span className="block font-medium text-card-foreground">
                            {TEMPLATES[key].name}
                          </span>
                          <span className="text-muted-foreground">
                            {TEMPLATES[key].description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                )}
                <div className="space-y-1">
                  <Label htmlFor="name">Your name in the room</Label>
                  <Input
                    id="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
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
                {template.sharedSeat ? (
                  <div className="space-y-1">
                    <Label htmlFor="student">Student's nickname</Label>
                    <Input
                      id="student"
                      value={studentName}
                      placeholder="A nickname, not their real name"
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                ) : null}
                {template.bigScreen ? (
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-card-foreground">Game</legend>
                    {(
                      [
                        ["new", "New game", "The student and the crew start one from nothing."],
                        [
                          "open",
                          "Open a game",
                          "One made somewhere else, from its folder or HTML file.",
                        ],
                      ] as const
                    ).map(([key, name, blurb]) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer gap-2 rounded-md border p-2 text-xs ${
                          gameChoice === key ? "border-ring" : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="game"
                          value={key}
                          checked={gameChoice === key}
                          onChange={() => setGameChoice(key)}
                          className="mt-0.5"
                        />
                        <span>
                          <span className="block font-medium text-card-foreground">{name}</span>
                          <span className="text-muted-foreground">{blurb}</span>
                        </span>
                      </label>
                    ))}
                    {gameChoice === "open" ? (
                      <div className="space-y-2 rounded-md border border-dashed border-border p-2 text-xs">
                        <PickGameButtons disabled={createMutation.isPending} onPicked={pickGame} />
                        {startingGame ? (
                          <div className="space-y-1">
                            <p className="font-medium text-card-foreground">
                              {startingGame.title || "The game"}: {startingGame.files} file
                              {startingGame.files === 1 ? "" : "s"}. It'll be the room's first
                              version.
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
                            Choose the game's folder, or its HTML file if it's just one.
                          </p>
                        )}
                        <p className="text-[11px] text-muted-foreground">{PICKED_FILES_NOTE}</p>
                      </div>
                    ) : null}
                  </fieldset>
                ) : null}
                {template.bigScreen ? (
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-card-foreground">Games</legend>
                    {(
                      [
                        ["simple", "Simple", "One file, 2D, quick to build. For first games."],
                        ["bigger", "Bigger", "A folder of code, 3D with Three.js, saved progress."],
                      ] as const
                    ).map(([key, name, blurb]) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer gap-2 rounded-md border p-2 text-xs ${
                          games === key ? "border-ring" : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="games"
                          value={key}
                          checked={games === key}
                          disabled={key === "simple" && Boolean(game?.bigger)}
                          onChange={() => setGames(key)}
                          className="mt-0.5"
                        />
                        <span>
                          <span className="block font-medium text-card-foreground">
                            {name} games
                          </span>
                          <span className="text-muted-foreground">{blurb}</span>
                        </span>
                      </label>
                    ))}
                    <p className="text-[11px] text-muted-foreground">
                      A Simple room can become Bigger later, but not back.
                    </p>
                  </fieldset>
                ) : null}
                <div className="space-y-1">
                  <Label htmlFor="title">Session title</Label>
                  <Input
                    id="title"
                    value={title}
                    placeholder={titleFor(DEMO_LOBBY)}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {DEMO_LOBBY ? (
                  <Button
                    className="w-full"
                    disabled={createMutation.isPending || waitingForGame}
                    onClick={() => createMutation.mutate(true)}
                  >
                    Open a demo room
                  </Button>
                ) : (
                  <>
                    <Button
                      className="w-full"
                      disabled={createMutation.isPending || waitingForGame}
                      onClick={() => createMutation.mutate(false)}
                    >
                      Open a room
                    </Button>
                    {templateKey === "deliberation" ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={createMutation.isPending}
                        onClick={() => createMutation.mutate(true)}
                      >
                        Open a demo room
                      </Button>
                    ) : null}
                  </>
                )}
                {createMutation.isPending && game ? (
                  <p className="text-xs text-muted-foreground">
                    Opening the room and bringing the game in…
                  </p>
                ) : null}
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
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    Recent rooms
                  </p>
                  <ul className="mt-2 space-y-1">
                    {recent.data.map((s) => (
                      <li key={s.id}>
                        <Link
                          to="/session/$id"
                          params={{ id: s.id }}
                          className="text-sm text-foreground hover:underline"
                        >
                          {s.title} <span className="text-muted-foreground">· {s.code}</span>
                          {s.template === "game-studio" ? (
                            <span className="text-muted-foreground"> · Game Studio</span>
                          ) : null}
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
