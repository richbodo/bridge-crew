import { Button } from "@/components/ui/button";
import { prepareGame, slugify } from "@/lib/game-file";
import { labelOf } from "@/lib/made";

export { labelOf };

/** A version, picture or sound a crew member made (docs/state_machines.md §8). */
export interface MadeRow {
  id: string;
  kind: "version" | "picture" | "sound";
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
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{labelOf(thing)}</p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {current ? "current version" : STATE_LABEL[thing.state]}
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
              Use this
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
