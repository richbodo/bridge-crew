import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/templates";

import { CrewAvatar } from "./CrewAvatar";

export interface Hail {
  id: string;
  agent: string;
  summary: string;
  contribution_id?: string | null;
}

interface Props {
  hails: Hail[];
  onResolve: (hailId: string, grant: boolean) => void;
  busy: boolean;
  jobOf: (agent: string) => Job;
  nameFor: (agent: string) => string;
  /** What the hail's contribution made: it comes with the hail. */
  madeFor?: (contributionId: string) => ReactNode;
}

export function HailQueue({ hails, onResolve, busy, jobOf, nameFor, madeFor }: Props) {
  if (hails.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
        No hails. The floor is yours.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {hails.map((hail) => {
        const job = jobOf(hail.agent);
        return (
          <li
            key={hail.id}
            className="rounded-lg border border-border bg-card p-3"
            style={{ borderLeft: `3px solid ${job.accent}` }}
          >
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: job.accent }}>
                {nameFor(hail.agent)} is hailing
              </p>
              {job.avatar ? <CrewAvatar avatar={job.avatar} accent={job.accent} status="hand_raised" /> : null}
            </div>
            <p className="mt-1 text-sm leading-snug text-card-foreground">{hail.summary}</p>
            {hail.contribution_id && madeFor ? madeFor(hail.contribution_id) : null}
            <div className="mt-2 flex gap-2">
              <Button size="sm" className="h-7 px-3 text-xs" disabled={busy} onClick={() => onResolve(hail.id, true)}>
                Grant the floor
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-3 text-xs"
                disabled={busy}
                onClick={() => onResolve(hail.id, false)}
              >
                Not now
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
