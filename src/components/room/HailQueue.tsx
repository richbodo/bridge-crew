import { Button } from "@/components/ui/button";
import { CREW, type AgentKind } from "@/lib/crew";

export interface Hail {
  id: string;
  agent: AgentKind;
  summary: string;
}

interface Props {
  hails: Hail[];
  onResolve: (hailId: string, grant: boolean) => void;
  busy: boolean;
  nameFor?: (agent: AgentKind) => string;
}

export function HailQueue({ hails, onResolve, busy, nameFor }: Props) {
  if (hails.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
        No hails. The floor is yours.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {hails.map((hail) => (
        <li
          key={hail.id}
          className="rounded-lg border border-border bg-card p-3"
          style={{ borderLeft: `3px solid ${CREW[hail.agent].accent}` }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: CREW[hail.agent].accent }}>
            {nameFor?.(hail.agent) ?? CREW[hail.agent].name} is hailing
          </p>
          <p className="mt-1 text-sm leading-snug text-card-foreground">{hail.summary}</p>
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
      ))}
    </ul>
  );
}
