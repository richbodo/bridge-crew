import { useEffect, useRef, useState } from "react";

import { CREW, type AgentKind } from "@/lib/crew";

export interface TranscriptLine {
  id: string;
  author_name: string;
  kind: "human" | "system" | "agent";
  agent: AgentKind | null;
  body: string;
  author_id: string | null;
}

export interface ContributionRow {
  id: string;
  agent: AgentKind;
  spoken: string;
  brief: string;
}

interface Props {
  lines: TranscriptLine[];
  contributions: ContributionRow[];
  colorFor: (authorId: string | null) => string;
  nameFor?: (agent: AgentKind) => string;
}

export function ChatPane({ lines, contributions, colorFor, nameFor }: Props) {
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
          const member = CREW[line.agent];
          const brief = contributions.filter((c) => c.agent === line.agent).at(-1)?.brief;
          return (
            <div
              key={line.id}
              className="rounded-lg border border-border bg-card/60 p-3"
              style={{ borderLeft: `3px solid ${member.accent}` }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: member.accent }}>
                {nameFor?.(line.agent) ?? member.name} has the floor
              </p>
              <p className="mt-1 text-sm leading-relaxed text-card-foreground">{line.body}</p>
              {brief ? (
                <>
                  <button
                    type="button"
                    className="mt-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen((prev) => ({ ...prev, [line.id]: !prev[line.id] }))}
                  >
                    {open[line.id] ? "Clear screen" : "On screen"}
                  </button>
                  {open[line.id] ? (
                    <pre className="mt-2 whitespace-pre-wrap rounded-md bg-background/60 p-3 text-xs leading-relaxed text-muted-foreground">
                      {brief}
                    </pre>
                  ) : null}
                </>
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
