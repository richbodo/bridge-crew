import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronUp, CircleQuestionMark, Reply, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/templates";
import { runInstructions } from "@/lib/tuning.functions";

import { Markdown } from "./Markdown";

export interface TranscriptLine {
  id: string;
  author_name: string;
  kind: "human" | "system" | "agent";
  agent: string | null;
  body: string;
  author_id: string | null;
  /** For a crew member's line: the contribution it spoke. */
  contribution_id?: string | null;
}

export interface ContributionRow {
  id: string;
  agent: string;
  spoken: string;
  brief: string;
  outcome?: string | null;
  /** Made things this contribution removes when it's spoken (Game Studio). */
  removes?: string[];
  /** The run that made it, which kept what the crew member was told. */
  run_id?: string | null;
}

interface Props {
  lines: TranscriptLine[];
  contributions: ContributionRow[];
  colorFor: (authorId: string | null) => string;
  jobOf: (agent: string) => Job;
  nameFor: (agent: string) => string;
  /** What a contribution made, drawn by the room (Game Studio). */
  madeFor?: (contributionId: string) => ReactNode;
  /** Reply and How did you do that? (Part 6). */
  onReply?: (contribution: ContributionRow) => void;
  onExplain?: (contribution: ContributionRow) => void;
}

export function ChatPane({
  lines,
  contributions,
  colorFor,
  jobOf,
  nameFor,
  madeFor,
  onReply,
  onExplain,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines.length]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {lines.map((line) => {
        if (line.kind === "system") {
          return (
            <p key={line.id} className="text-center text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {line.body}
            </p>
          );
        }

        if (line.kind === "agent" && line.agent) {
          const member = jobOf(line.agent);
          // The line's own contribution; lines from before Phase 1 fall back to the newest.
          const contribution = line.contribution_id
            ? contributions.find((c) => c.id === line.contribution_id)
            : contributions.filter((c) => c.agent === line.agent).at(-1);
          const brief = contribution?.brief;
          return (
            <div
              key={line.id}
              className="rounded-lg border border-border bg-card/60 p-3"
              style={{ borderLeft: `3px solid ${member.accent}` }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: member.accent }}>
                {nameFor(line.agent)} has the floor
              </p>
              <p className="mt-1 text-sm leading-relaxed text-card-foreground">{line.body}</p>
              {contribution && madeFor ? madeFor(contribution.id) : null}
              {contribution ? (
                <ContributionActions
                  onReply={onReply ? () => onReply(contribution) : undefined}
                  onExplain={onExplain ? () => onExplain(contribution) : undefined}
                  detail={
                    brief
                      ? {
                          open: Boolean(open[line.id]),
                          onToggle: () => setOpen((prev) => ({ ...prev, [line.id]: !prev[line.id] })),
                        }
                      : undefined
                  }
                />
              ) : null}
              {brief && open[line.id] ? (
                <Markdown className="mt-2 rounded-md bg-background/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  {brief}
                </Markdown>
              ) : null}
              {brief && open[line.id] && contribution?.run_id ? (
                <WhatItWasTold runId={contribution.run_id} />
              ) : null}
            </div>
          );
        }

        return (
          <div key={line.id} className="flex gap-2">
            <span
              className="mt-1.5 inline-block size-2 shrink-0 rounded-full"
              style={{ backgroundColor: colorFor(line.author_id) }}
            />
            <p className="text-sm leading-relaxed text-foreground">
              <span className="mr-2 font-medium" style={{ color: colorFor(line.author_id) }}>
                {line.author_name}
              </span>
              {line.body}
            </p>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}

function Action({
  icon: Icon,
  children,
  ...props
}: { icon: LucideIcon; children: ReactNode } & ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="h-7 gap-1.5 px-2.5 text-xs font-normal [&_svg]:size-3.5"
      {...props}
    >
      <Icon aria-hidden />
      {children}
    </Button>
  );
}

/**
 * Reply, How did you do that? and Show detail, under a contribution: separate outlined buttons,
 * so nobody reads them as one line of text.
 */
export function ContributionActions({
  onReply,
  onExplain,
  detail,
}: {
  onReply?: (() => void) | undefined;
  onExplain?: (() => void) | undefined;
  detail?: { open: boolean; onToggle: () => void } | undefined;
}) {
  if (!onReply && !onExplain && !detail) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {onReply ? (
        <Action icon={Reply} onClick={onReply}>
          Reply
        </Action>
      ) : null}
      {onExplain ? (
        <Action icon={CircleQuestionMark} onClick={onExplain}>
          How did you do that?
        </Action>
      ) : null}
      {detail ? (
        <Action icon={detail.open ? ChevronUp : ChevronDown} aria-expanded={detail.open} onClick={detail.onToggle}>
          {detail.open ? "Hide detail" : "Show detail"}
        </Action>
      ) : null}
    </div>
  );
}

/**
 * The instructions a run was given, as kept when it started (docs/plans/tune-the-crew-2026-11-19.md),
 * so a reply can be read beside what produced it. Fetched when opened.
 */
function WhatItWasTold({ runId }: { runId: string }) {
  const read = useServerFn(runInstructions);
  const [open, setOpen] = useState(false);
  const told = useQuery({
    queryKey: ["told", runId],
    queryFn: () => read({ data: { runId } }),
    enabled: open,
    staleTime: Infinity,
  });
  return (
    <details className="mt-2 text-xs" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
        What it was told
      </summary>
      {told.isLoading ? (
        <p className="mt-1 text-muted-foreground">Finding it…</p>
      ) : told.data?.instructions ? (
        <pre className="mt-1 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md bg-background/60 p-2 font-mono text-[11px] leading-snug text-muted-foreground">
          {told.data.instructions}
        </pre>
      ) : told.data ? (
        <p className="mt-1 text-muted-foreground">
          Not kept: this was made before the app kept what the crew is told.
        </p>
      ) : null}
    </details>
  );
}
