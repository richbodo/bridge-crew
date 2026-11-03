import { Pencil, Trash2, Undo2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { labelOf, svgSource, type MadeRow } from "./MadeThing";

export type ManageAction =
  { type: "rename"; name: string } | { type: "remove" } | { type: "put_back" };

const STATE_LABEL: Record<MadeRow["state"], string> = {
  waiting: "waiting for a yes",
  used: "in the game",
  not_used: "not used",
  removed: "removed",
};

interface Props {
  made: MadeRow[];
  currentVersion: string | null;
  nameFor: (agent: string) => string;
  busy: boolean;
  onAction: (thing: MadeRow, action: ManageAction) => void;
}

/**
 * Manage (docs/state_machines.md §8): rename what the crew made, remove what isn't needed, and
 * put back what was removed. Removing never deletes anything: versions stay in the games folder.
 */
export function ManageMade({ made, currentVersion, nameFor, busy, onAction }: Props) {
  const kept = made.filter((thing) => thing.state !== "removed").reverse();
  const removed = made.filter((thing) => thing.state === "removed").reverse();
  const row = (thing: MadeRow) => (
    <ManageRow
      key={thing.id}
      thing={thing}
      current={thing.id === currentVersion}
      maker={nameFor(thing.agent)}
      busy={busy}
      onAction={onAction}
    />
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
          Manage
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Made in this room</DialogTitle>
          <DialogDescription>
            Rename things, or remove the ones you don't need. Removed things can be put back, and
            every version stays in the games folder.
          </DialogDescription>
        </DialogHeader>
        {kept.length ? (
          <ul className="max-h-[55vh] space-y-2 overflow-y-auto pr-1">{kept.map(row)}</ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nothing here yet.</p>
        )}
        {removed.length ? (
          <details className="rounded-md border border-dashed border-border p-2 text-xs">
            <summary className="cursor-pointer text-muted-foreground">
              Removed ({removed.length})
            </summary>
            <ul className="mt-2 space-y-2">{removed.map(row)}</ul>
          </details>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function ManageRow({
  thing,
  current,
  maker,
  busy,
  onAction,
}: {
  thing: MadeRow;
  current: boolean;
  maker: string;
  busy: boolean;
  onAction: (thing: MadeRow, action: ManageAction) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  // A version's name is its number until someone gives it a title.
  const untitled = thing.kind === "version" && /^v\d+$/.test(thing.name);
  const stop = () => setEditing(false);
  const why = current
    ? "the current version"
    : thing.state === "waiting"
      ? "waiting on its hail"
      : null;

  return (
    <li
      className="flex items-center gap-3 rounded-md border border-border bg-background/50 p-2"
      data-made={thing.kind}
    >
      {thing.kind === "picture" ? (
        <img
          src={svgSource(thing.body)}
          alt={thing.name}
          className="size-10 shrink-0 rounded-sm bg-card object-contain"
        />
      ) : null}
      {editing ? (
        <form
          className="flex min-w-0 flex-1 items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            onAction(thing, { type: "rename", name });
            stop();
          }}
        >
          <Input
            value={name}
            autoFocus
            maxLength={40}
            placeholder={thing.kind === "version" ? "A title, like “with gems”" : "A new name"}
            aria-label={`New name for ${labelOf(thing)}`}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              // Esc leaves the name alone, and keeps the dialog open.
              if (event.key === "Escape") {
                event.stopPropagation();
                stop();
              }
            }}
            className="h-7 text-xs"
          />
          <Button type="submit" size="sm" className="h-7 px-2 text-xs" disabled={busy}>
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={stop}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">{labelOf(thing)}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {maker} · {current ? "current version" : STATE_LABEL[thing.state]}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 [&_svg]:size-3.5">
            {thing.state === "removed" ? (
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1.5 px-2 text-xs"
                disabled={busy}
                onClick={() => onAction(thing, { type: "put_back" })}
              >
                <Undo2 aria-hidden />
                Put back
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1.5 px-2 text-xs"
                  onClick={() => {
                    setName(untitled ? "" : thing.name);
                    setEditing(true);
                  }}
                >
                  <Pencil aria-hidden />
                  Rename
                </Button>
                {why ? (
                  <span className="w-24 text-right text-[10px] leading-tight text-muted-foreground">
                    Can't remove: {why}
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1.5 px-2 text-xs"
                    disabled={busy}
                    onClick={() => onAction(thing, { type: "remove" })}
                  >
                    <Trash2 aria-hidden />
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
}
