import { useMemo, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { prepareGame, slugify } from "@/lib/game-file";
import { labelOf, testOf } from "@/lib/made";
import { musicSamples, type Song } from "@/lib/music";

export { labelOf };

/** A version, picture, sound, piece of music or test a crew member made (docs/state_machines.md §8). */
export interface MadeRow {
  id: string;
  kind: "version" | "picture" | "sound" | "music" | "test";
  name: string;
  version: number | null;
  body: string;
  state: "waiting" | "used" | "not_used" | "removed";
  agent: string;
  contribution_id: string | null;
}

const STATE_LABEL: Record<MadeRow["state"], string> = {
  waiting: "waiting for a yes",
  used: "in the game",
  not_used: "not used",
  removed: "removed",
};

/** A test the student said yes to is kept, so the Tester can play it again on a new version. */
const TEST_STATE_LABEL: Partial<Record<MadeRow["state"], string>> = {
  used: "kept",
  not_used: "not kept",
};

export function svgSource(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Plays a ZzFX sound. Nothing autoplays: this only runs when someone presses Play. */
export async function playSound(body: string) {
  const { zzfx, ZZFX } = await import("zzfx");
  ZZFX.volume = 0.25;
  const params = JSON.parse(body) as Array<number | null>;
  zzfx(...params.map((p) => (p === null ? undefined : p)));
}

/** The music playing in the room: one song at a time, over and over, until Stop. */
let playing: { id: string; source: AudioBufferSourceNode } | null = null;
const listeners = new Set<() => void>();

function setPlaying(next: typeof playing) {
  playing?.source.stop();
  playing = next;
  for (const listener of listeners) listener();
}

/** Plays a song from the Sound designer, as the game would. Only when someone presses Play. */
export async function playMusic(thing: MadeRow) {
  const { ZZFX } = await import("zzfx");
  ZZFX.volume = 0.25;
  const samples = musicSamples(JSON.parse(thing.body) as Song, ZZFX);
  setPlaying({ id: thing.id, source: ZZFX.playSamples([samples], 0.6, 1, 0, true) });
}

export function stopMusic() {
  if (playing) setPlaying(null);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The id of the made thing whose music is playing, if any. */
export function usePlayingMusic(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => playing?.id ?? null,
    () => null,
  );
}

/** Saves a version as an HTML file that opens in any browser, ready to email to the family. */
export function downloadVersion(thing: MadeRow, title: string) {
  const file = new Blob([prepareGame(thing.body, { inRoom: false })], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = `${slugify(title)}-v${thing.version ?? 1}.html`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

interface Props {
  thing: MadeRow;
  current: boolean;
  title: string;
  compact?: boolean;
  onScreen: (thing: MadeRow) => void;
  onUse: (thing: MadeRow) => void;
}

export function MadeThing({ thing, current, title, compact, onScreen, onUse }: Props) {
  const playingThis = usePlayingMusic() === thing.id;
  const test = thing.kind === "test";
  const firstLook = useMemo(
    () => (test ? testOf(thing.body).looks[0] : undefined),
    [test, thing.body],
  );
  // Use this: something not used, or an older version that isn't the current one.
  const canUse =
    thing.state === "not_used" || (thing.kind === "version" && thing.state === "used" && !current);

  return (
    <div
      className={`flex items-center gap-3 rounded-md border border-border bg-background/50 p-2 ${
        thing.state === "removed" ? "opacity-60" : ""
      }`}
      data-made={thing.kind}
    >
      {thing.kind === "picture" ? (
        <img
          src={svgSource(thing.body)}
          alt={thing.name}
          className={`${compact ? "size-10" : "size-14"} shrink-0 rounded-sm bg-card object-contain`}
        />
      ) : firstLook ? (
        <img
          src={firstLook.image}
          alt=""
          className={`${compact ? "h-10" : "h-14"} aspect-[4/3] shrink-0 rounded-sm bg-black object-contain`}
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{labelOf(thing)}</p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {current
            ? "current version"
            : ((test ? TEST_STATE_LABEL[thing.state] : undefined) ?? STATE_LABEL[thing.state])}
        </p>
      </div>
      {thing.state === "removed" ? null : (
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {thing.kind === "sound" ? (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 px-2 text-[11px]"
              onClick={() => void playSound(thing.body)}
            >
              Play
            </Button>
          ) : null}
          {thing.kind === "music" ? (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 px-2 text-[11px]"
              onClick={() => (playingThis ? stopMusic() : void playMusic(thing))}
            >
              {playingThis ? "Stop" : "Play"}
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[11px]"
            onClick={() => onScreen(thing)}
          >
            On screen
          </Button>
          {thing.kind === "version" && !compact ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-[11px]"
              onClick={() => downloadVersion(thing, title)}
            >
              Download
            </Button>
          ) : null}
          {canUse && !compact ? (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 px-2 text-[11px]"
              onClick={() => onUse(thing)}
            >
              {test ? "Keep this" : "Use this"}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
