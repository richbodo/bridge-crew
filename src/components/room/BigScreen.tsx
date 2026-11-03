import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CRASH_MESSAGE, prepareGame } from "@/lib/game-file";

import { downloadVersion, labelOf, playSound, svgSource, type MadeRow } from "./MadeThing";

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
}

/**
 * On screen (docs/plans/educational-context-2026-10-31.md Part 4): one thing at a time,
 * large. Full screen is the browser's own, and Esc comes back.
 */
export function BigScreen({
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
}: Props) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const update = () => setFull(document.fullscreenElement === screenRef.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const thing = showing?.kind === "made" ? made.find((t) => t.id === showing.id) : undefined;
  const contribution =
    showing?.kind === "contribution" ? said.find((c) => c.id === showing.id) : undefined;
  const value = showing ? `${showing.kind}:${showing.id}` : "";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={screenRef} className="relative min-h-0 flex-1 bg-black/90 p-4">
        {thing?.kind === "version" ? (
          <GameFrame thing={thing} onCrash={onCrash} />
        ) : thing?.kind === "picture" ? (
          <figure className="flex h-full flex-col items-center justify-center gap-3">
            <img src={svgSource(thing.body)} alt={thing.name} className="max-h-[85%] max-w-full object-contain" />
            <figcaption className="text-sm text-white/80">{labelOf(thing)}</figcaption>
          </figure>
        ) : thing?.kind === "sound" ? (
          <SoundBoard sounds={made.filter((t) => t.kind === "sound")} />
        ) : contribution ? (
          <article className="mx-auto h-full max-w-3xl overflow-y-auto text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">{nameFor(contribution.agent)}</p>
            <p className="mt-3 text-2xl leading-snug">{contribution.spoken}</p>
            <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-white/80">{contribution.brief}</pre>
          </article>
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-white/70">
            Nothing to show yet. When the crew makes something, it can go on screen.
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
          <div className="flex gap-2">
            {thing?.kind === "version" ? (
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => downloadVersion(thing, title)}>
                Download
              </Button>
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
 * the game can't read the sign-in, and its content security policy blocks the network.
 */
function GameFrame({ thing, onCrash }: { thing: MadeRow; onCrash: (id: string, message: string) => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const report = useRef(onCrash);
  report.current = onCrash;
  const doc = useMemo(() => prepareGame(thing.body, { inRoom: true }), [thing.body]);

  useEffect(() => {
    let reported = false;
    const listen = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data as { type?: string; message?: string } | null;
      if (data?.type !== CRASH_MESSAGE || reported) return;
      reported = true;
      report.current(thing.id, String(data.message ?? ""));
    };
    window.addEventListener("message", listen);
    return () => window.removeEventListener("message", listen);
  }, [thing.id]);

  return (
    <iframe
      ref={frame}
      title={labelOf(thing)}
      sandbox="allow-scripts"
      srcDoc={doc}
      className="h-full w-full rounded-md border-0 bg-white"
    />
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
