import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { CrewAvatar } from "@/components/room/CrewAvatar";
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
import { Textarea } from "@/components/ui/textarea";
import { instructionParts } from "@/lib/instructions";
import { isTemplateKey, TEMPLATES, type Job, type Template } from "@/lib/templates";
import {
  applyTuning,
  dutyPart,
  exportTuning,
  importTuning,
  tunedNames,
  tuningFromRows,
  TUNING_LIMIT,
  type Imported,
} from "@/lib/tuning";
import { getTuning, replaceTuning, saveTuningPart } from "@/lib/tuning.functions";
import { cn } from "@/lib/utils";

/**
 * Tune the crew (docs/plans/tune-the-crew-2026-11-19.md): what each crew member is told, for
 * every room of a kind on this computer. Linked from the lobby, never from inside a room.
 */
export const Route = createFileRoute("/_authenticated/tune/$kind")({
  head: () => ({ meta: [{ title: "Tune the crew — Bridge Crew" }] }),
  beforeLoad: ({ params }) => {
    if (!isTemplateKey(params.kind)) throw notFound();
  },
  component: TunePage,
});

function TunePage() {
  const { kind } = Route.useParams();
  const template = TEMPLATES[isTemplateKey(kind) ? kind : "game-studio"];
  const read = useServerFn(getTuning);
  const tuningQuery = useQuery({
    queryKey: ["tuning", template.key],
    queryFn: () => read({ data: { kind: template.key } }),
  });
  const tuning = tuningFromRows(tuningQuery.data);
  const tuned = applyTuning(template, tuning);
  const changed = tunedNames(template, tuning);
  const [bigger, setBigger] = useState(true);

  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Bridge Crew
          </p>
          <h1 className="text-lg font-semibold text-foreground">Tune the crew</h1>
        </div>
        <Link
          to="/"
          search={{ kind: template.key }}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← {template.name}
        </Link>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground">{template.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            What each crew member is told before it works. A change here applies to every{" "}
            {template.name} room on this computer, from the crew's next piece of work, including
            rooms already open. <strong className="font-medium text-foreground">Reassign</strong>,
            on a crew member's card in a room, still changes one room.
          </p>
          {tuningQuery.isLoading ? null : (
            <p className="mt-3 text-sm text-card-foreground">
              {changed.length
                ? `Changed from the original: ${changed.join(", ")}.`
                : "Nothing is changed: the crew follows the original instructions."}
            </p>
          )}
          <MoveTuning
            template={template}
            tuned={changed.length > 0}
            tuningRows={tuningQuery.data}
          />
        </section>

        <PartEditor
          template={template}
          part="notes"
          title="Notes for every crew member"
          about="Told to every crew member after its job. For something they should all do, like “Always say which level you mean.”"
          value={tuning.notes ?? ""}
          original={null}
        />

        <section aria-labelledby="crew" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="crew" className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              The crew
            </h2>
            {template.bigScreen ? (
              <fieldset className="flex gap-3 text-xs text-muted-foreground">
                <legend className="sr-only">Show the instructions of</legend>
                <span>Show what it's told in</span>
                {(
                  [
                    [false, "a Simple room"],
                    [true, "a Bigger room"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={label} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="room-size"
                      checked={bigger === value}
                      onChange={() => setBigger(value)}
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
            ) : null}
          </div>
          {tuned.roster.map((job) => {
            const original = template.roster.find((j) => j.key === job.key)!;
            return (
              <PartEditor
                key={job.key}
                template={template}
                part={dutyPart(job.key)}
                title={job.name}
                job={job}
                about={original.blurb}
                value={job.duty}
                original={original.duty}
              >
                <Everything template={tuned} job={job} bigger={bigger} notes={tuning.notes} />
              </PartEditor>
            );
          })}
        </section>

        <PartEditor
          template={template}
          part="doc"
          title={`The Scribe, keeping ${template.doc.file}`}
          about={`The Scribe's instructions when it updates ${template.doc.file}. They're all it's told: it doesn't read the crew's rules.`}
          value={tuned.doc.scribe}
          original={template.doc.scribe}
        />
      </div>
    </main>
  );
}

/** One part of the instructions: its text, Save, and Back to the original. */
function PartEditor({
  template,
  part,
  title,
  about,
  job,
  value,
  original,
  children,
}: {
  template: Template;
  part: string;
  title: string;
  about: string;
  job?: Job;
  /** The text in use now: tuned, or the original. */
  value: string;
  original: string | null;
  children?: ReactNode;
}) {
  const save = useServerFn(saveTuningPart);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? value;
  const tuned = original === null ? value.trim() !== "" : value.trim() !== original.trim();
  const id = `part-${part.replace(/[^a-z0-9]/gi, "-")}`;

  const mutation = useMutation({
    mutationFn: (next: string) => save({ data: { kind: template.key, part, text: next } }),
    onSuccess: async ({ tuned: nowTuned }) => {
      await queryClient.invalidateQueries({ queryKey: ["tuning", template.key] });
      setDraft(null);
      toast.success(
        nowTuned
          ? `Saved. ${title} has it from the next piece of work.`
          : original === null
            ? `${title}: cleared.`
            : `${title} is back to the original.`,
      );
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="rounded-xl border border-border bg-card p-5"
      style={job ? { borderLeft: `3px solid ${job.accent}` } : undefined}
    >
      <div className="flex items-start gap-3">
        {job?.avatar ? <CrewAvatar avatar={job.avatar} accent={job.accent} status="idle" /> : null}
        <div className="min-w-0 flex-1">
          <h3 id={`${id}-title`} className="text-sm font-semibold text-card-foreground">
            {title}
            {tuned ? (
              <span className="ml-2 rounded-sm bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-primary">
                Changed
              </span>
            ) : null}
          </h3>
          <p className="text-xs text-muted-foreground">{about}</p>
        </div>
      </div>
      <Textarea
        aria-label={title}
        rows={Math.min(12, Math.max(4, Math.ceil(text.length / 90)))}
        value={text}
        onChange={(e) => setDraft(e.target.value)}
        className="mt-3 bg-background text-sm leading-relaxed"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          disabled={mutation.isPending || draft === null || draft === value}
          onClick={() => mutation.mutate(text)}
        >
          Save
        </Button>
        {draft !== null && draft !== value ? (
          <Button size="sm" variant="ghost" onClick={() => setDraft(null)}>
            Undo changes
          </Button>
        ) : null}
        {tuned && draft === null ? (
          <Button
            size="sm"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(original ?? "")}
          >
            {original === null ? "Clear" : "Back to the original"}
          </Button>
        ) : null}
        <span
          className={cn(
            "ml-auto text-[11px]",
            text.length > TUNING_LIMIT ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {text.length > TUNING_LIMIT * 0.8 ? `${text.length} / ${TUNING_LIMIT}` : null}
        </span>
      </div>
      {children}
    </section>
  );
}

/** Everything a crew member is told, with the parts that are fixed in the code marked. */
function Everything({
  template,
  job,
  bigger,
  notes,
}: {
  template: Template;
  job: Job;
  bigger: boolean;
  notes: string | null;
}) {
  const parts = instructionParts(template, job, undefined, { bigger, notes });
  return (
    <details className="mt-3 text-xs">
      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
        Everything it's told
      </summary>
      <div className="mt-2 space-y-3">
        {parts.map((part) => (
          <div key={part.key}>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {part.label} · {part.editable ? "you can change this above" : "fixed in the code"}
            </p>
            <pre
              className={cn(
                "mt-1 whitespace-pre-wrap rounded-md p-2 font-mono text-[11px] leading-snug",
                part.editable
                  ? "bg-primary/10 text-card-foreground"
                  : "bg-background/60 text-muted-foreground",
              )}
            >
              {part.text}
            </pre>
          </div>
        ))}
        <p className="text-muted-foreground">
          Then, with its task, it reads its context packs, {template.doc.file}
          {template.bigScreen ? ", the game so far" : ""}, the crew's work and the conversation.
        </p>
      </div>
    </details>
  );
}

/** Export the tuning to a file, and Import one from another computer. */
function MoveTuning({
  template,
  tuned,
  tuningRows,
}: {
  template: Template;
  tuned: boolean;
  tuningRows: ReadonlyArray<{ part: string; body: string }> | undefined;
}) {
  const replace = useServerFn(replaceTuning);
  const queryClient = useQueryClient();
  const picker = useRef<HTMLInputElement>(null);
  const [incoming, setIncoming] = useState<Imported | null>(null);

  const exportFile = () => {
    const now = new Date();
    const text = exportTuning(template, tuningFromRows(tuningRows), now);
    const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `bridge-crew-tuning-${template.key}-${now.toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const readFile = async (file: File) => {
    try {
      setIncoming(importTuning(template, await file.text()));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const mutation = useMutation({
    mutationFn: (imported: Imported) =>
      replace({ data: { kind: template.key, tuning: imported.tuning } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tuning", template.key] });
      setIncoming(null);
      toast.success("Imported. The crew has it from its next piece of work.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const names = incoming ? tunedNames(template, incoming.tuning) : [];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Button size="sm" variant="secondary" disabled={!tuned} onClick={exportFile}>
        Export
      </Button>
      <Button size="sm" variant="secondary" onClick={() => picker.current?.click()}>
        Import
      </Button>
      <input
        ref={picker}
        type="file"
        accept=".json,application/json"
        aria-label="Tuning file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void readFile(file);
        }}
      />
      <span className="text-[11px] text-muted-foreground">
        A file of what's changed, to take to another computer.
      </span>
      <AlertDialog open={incoming !== null} onOpenChange={(open) => !open && setIncoming(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Use this file's tuning?</AlertDialogTitle>
            <AlertDialogDescription>
              It replaces everything changed on this page.{" "}
              {names.length
                ? `It changes: ${names.join(", ")}.`
                : "It changes nothing, so the crew goes back to the original instructions."}
              {incoming?.skipped.length
                ? ` It also names ${incoming.skipped.join(", ")}, which a ${template.name} room doesn't have, so those are left out.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={mutation.isPending}
              onClick={() => incoming && mutation.mutate(incoming)}
            >
              Use it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
