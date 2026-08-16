import { CREW, STATUS_LABEL, type AgentKind, type AgentStatus } from "@/lib/crew";
import { Button } from "@/components/ui/button";

interface Props {
  agent: AgentKind;
  status: AgentStatus;
  task: string | null;
  progress: string | null;
  onStop: () => void;
  onRedirect: () => void;
}

export function AgentCard({ agent, status, task, progress, onStop, onRedirect }: Props) {
  const member = CREW[agent];
  const active = status === "working" || status === "hand_raised" || status === "speaking";

  return (
    <article
      className="relative overflow-hidden rounded-lg border border-border bg-card p-4"
      style={{ borderLeft: `3px solid ${member.accent}` }}
    >
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-card-foreground">{member.name}</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {member.station}
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em]"
          style={{ color: active ? member.accent : undefined }}
        >
          <span
            className={`inline-block size-1.5 rounded-full ${status === "working" ? "animate-pulse" : ""}`}
            style={{ backgroundColor: active ? member.accent : "var(--muted-foreground)" }}
          />
          {STATUS_LABEL[status]}
        </span>
      </header>

      <p className="mt-3 min-h-8 text-xs leading-relaxed text-muted-foreground">
        {task ? <span className="text-card-foreground">{task}</span> : member.blurb}
      </p>
      {progress ? <p className="mt-2 text-xs italic text-muted-foreground">{progress}</p> : null}

      {active ? (
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onStop}>
            Stand down
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onRedirect}>
            Redirect
          </Button>
        </div>
      ) : null}
    </article>
  );
}
