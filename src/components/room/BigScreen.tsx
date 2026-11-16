import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CRASH_MESSAGE, prepareGame, RELOAD_MESSAGE, SAVES_MESSAGE } from "@/lib/game-file";
import type { Song } from "@/lib/music";

import { clearSaves, downloadVersion, readSaves, useGameDocument, writeSaves } from "./game-document";
import {
  labelOf,
  playMusic,
  playSound,
  stopMusic,
  svgSource,
  usePlayingMusic,
  type MadeRow,
} from "./MadeThing";
import { Markdown } from "./Markdown";
import { TestSheet } from "./TestLooks";

export interface Showing {
  kind: "made" | "contribution";
  id: string;
}

export interface ShownContribution {
  id: string;
  agent: string;
  spoken: string;
  brief: string;
}

interface Props {
  sessionId: string;
  title: string;
  showing: Showing | null;
  made: MadeRow[];
  said: ShownContribution[];
  currentVersion: string | null;
  nameFor: (agent: string) => string;
  onShow: (showing: Showing) => void;
  onOff: () => void;
  onCrash: (thingId: string, message: string) => void;
  /** The slim strip below the screen: the message box, hails and suggestions. */
  strip: ReactNode;
  /** The Manage button: rename and remove made things. */
  manage?: ReactNode;
  /** The Bring in a game button. */
  bringIn?: ReactNode;
}

/**
 * On screen (docs/plans/educational-context-2026-10-31.md Part 4): one thing at a time,
 * large. Full screen is the browser's own, and Esc comes back.
 */
export function BigScreen({
  sessionId,
  title,
  showing,
  made,
  said,
  currentVersion,
  nameFor,
  onShow,
  onOff,
  onCrash,
  strip,
  manage,
  bringIn,
}: Props) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  // Start fresh: the game runs again from the beginning, without its saves.
  const [fresh, setFresh] = useState(0);

  useEffect(() => {
    const update = () => setFull(document.fullscreenElement === screenRef.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const thing = showing?.kind === "made" ? made.find((t) => t.id === showing.id) : undefined;
  const contribution =
    showing?.kind === "contribution" ? said.find((c) => c.id === showing.id) : undefined;
  const value = thing || contribution ? `${showing?.kind}:${showing?.id}` : "";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={screenRef} className="relative min-h-0 flex-1 bg-black/90 p-4">
        {thing?.kind === "version" ? (
          <GameFrame key={`${thing.id}:${fresh}`} sessionId={sessionId} thing={thing} onCrash={onCrash} />
        ) : thing?.kind === "picture" ? (
          <figure className="flex h-full flex-col items-center justify-center gap-3">
            <img src={svgSource(thing.body)} alt={thing.name} className="max-h-[85%] max-w-full object-contain" />
            <figcaption className="text-sm text-white/80">{labelOf(thing)}</figcaption>
          </figure>
        ) : thing?.kind === "sound" ? (
          <SoundBoard sounds={made.filter((t) => t.kind === "sound")} />
        ) : thing?.kind === "music" ? (
          <MusicSheet thing={thing} />
        ) : thing?.kind === "test" ? (
          <TestSheet thing={thing} />
        ) : contribution ? (
          <article className="mx-auto h-full max-w-3xl overflow-y-auto text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">{nameFor(contribution.agent)}</p>
            <p className="mt-3 text-2xl leading-snug">{contribution.spoken}</p>
            <Markdown className="mt-6 text-sm leading-relaxed text-white/80">{contribution.brief}</Markdown>
          </article>
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-white/70">
            {showing
              ? "That isn't here any more. Pick something else below."
              : "Nothing to show yet. When the crew makes something, it can go on screen."}
          </p>
        )}
        {full ? (
          <p className="absolute right-4 top-3 text-[11px] text-white/60">Esc leaves full screen</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-start gap-3 border-t border-border p-3">
        <div className="min-w-[320px] flex-1">{strip}</div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground" htmlFor="showing">
            Showing
          </label>
          <select
            id="showing"
            value={value}
            onChange={(e) => {
              const [kind, id] = e.target.value.split(":") as [Showing["kind"], string];
              if (id) onShow({ kind, id });
            }}
            className="h-8 max-w-64 rounded-md border border-border bg-card px-2 text-xs"
          >
            <option value="" disabled>
              Pick something
            </option>
            {made.map((t) => (
              <option key={t.id} value={`made:${t.id}`}>
                {labelOf(t)}
                {t.id === currentVersion ? " (current)" : ""}
              </option>
            ))}
            {said.map((c) => (
              <option key={c.id} value={`contribution:${c.id}`}>
                {nameFor(c.agent)}: {c.spoken.slice(0, 40)}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {bringIn}
            {manage}
            {thing?.kind === "version" ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  title="Play from the beginning, without the game's saves"
                  onClick={() => {
                    clearSaves(sessionId);
                    setFresh((n) => n + 1);
                  }}
                >
                  Start fresh
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={() => void downloadVersion(sessionId, thing, title)}
                >
                  Download
                </Button>
              </>
            ) : null}
            <Button
              size="sm"
              variant="secondary"
              className="h-7 px-2 text-xs"
              onClick={() => void screenRef.current?.requestFullscreen()}
            >
              Full screen
            </Button>
            <Button size="sm" className="h-7 px-2 text-xs" onClick={onOff}>
              Off screen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A version of the game, in a sandboxed frame: scripts run, but without the room's origin, so
 * the game can't read the sign-in, and its content security policy blocks the network. Pointer
 * lock is allowed, for first-person mouse look. The room keeps the game's saves, and when the
 * game reloads itself, the room reloads it with its newest saves.
 */
function GameFrame({
  sessionId,
  thing,
  onCrash,
}: {
  sessionId: string;
  thing: MadeRow;
  onCrash: (id: string, message: string) => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const report = useRef(onCrash);
  report.current = onCrash;
  const bundle = useGameDocument(sessionId, thing.id);
  const [reloads, setReloads] = useState(0);
  const doc = useMemo(
    () =>
      bundle.data
        ? prepareGame(bundle.data.html, { inRoom: true, saves: readSaves(sessionId) })
        : null,
    // A reload reads the saves again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bundle.data, sessionId, reloads],
  );

  useEffect(() => {
    let reported = false;
    const listen = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data as { type?: string; message?: string; saves?: unknown } | null;
      if (data?.type === SAVES_MESSAGE && data.saves && typeof data.saves === "object") {
        writeSaves(sessionId, data.saves as Record<string, string>);
      } else if (data?.type === RELOAD_MESSAGE) {
        setReloads((n) => n + 1);
      } else if (data?.type === CRASH_MESSAGE && !reported) {
        reported = true;
        report.current(thing.id, String(data.message ?? ""));
      }
    };
    window.addEventListener("message", listen);
    return () => window.removeEventListener("message", listen);
  }, [sessionId, thing.id]);

  if (!doc) {
    return (
      <p className="flex h-full items-center justify-center text-sm text-white/70">
        {bundle.isError ? `${labelOf(thing)} didn't open: ${(bundle.error as Error).message}` : `Opening ${labelOf(thing)}…`}
      </p>
    );
  }
  const blocked = bundle.data?.remote.length ?? 0;
  return (
    <div className="flex h-full flex-col">
      <iframe
        key={reloads}
        ref={frame}
        title={labelOf(thing)}
        sandbox="allow-scripts allow-pointer-lock"
        allow="fullscreen"
        allowFullScreen
        srcDoc={doc}
        className="min-h-0 w-full flex-1 rounded-md border-0 bg-white"
      />
      {blocked ? (
        <p className="pt-1 text-[11px] text-white/60">
          This version asks the internet for {blocked === 1 ? "one thing" : `${blocked} things`}, which the
          studio blocks.
        </p>
      ) : null}
    </div>
  );
}

/** A song on screen: its notes, one track to a row with the bars lined up, and Play. */
function MusicSheet({ thing }: { thing: MadeRow }) {
  const playing = usePlayingMusic() === thing.id;
  const song = useMemo(() => JSON.parse(thing.body) as Song, [thing.body]);
  return (
    <figure className="flex h-full flex-col items-center justify-center gap-5 text-white">
      <div className="max-w-full overflow-x-auto font-mono text-lg">
        {Object.entries(song.tracks).map(([name, track]) => (
          <p key={name} className="flex items-center whitespace-nowrap py-1">
            <span className="w-20 shrink-0 text-sm text-white/60">{name}</span>
            {track
              .split(/\s*(\|)\s*|\s+/)
              .filter(Boolean)
              .map((step, i) =>
                step === "|" ? (
                  <span key={i} className="mx-1 h-6 border-l border-white/30" aria-hidden />
                ) : (
                  <span key={i} className="w-10 text-center">
                    {step}
                  </span>
                ),
              )}
          </p>
        ))}
      </div>
      <figcaption className="text-sm text-white/80">
        {labelOf(thing)}, {song.tempo} beats a minute
      </figcaption>
      <Button size="lg" onClick={() => (playing ? stopMusic() : void playMusic(thing))}>
        {playing ? "Stop" : "Play"}
      </Button>
    </figure>
  );
}

function SoundBoard({ sounds }: { sounds: MadeRow[] }) {
  return (
    <div className="flex h-full flex-wrap content-center items-center justify-center gap-4">
      {sounds.map((sound) => (
        <Button
          key={sound.id}
          size="lg"
          variant={sound.state === "used" ? "default" : "secondary"}
          onClick={() => void playSound(sound.body)}
        >
          Play “{sound.name}”{sound.state === "used" ? "" : " (not used)"}
        </Button>
      ))}
    </div>
  );
}
