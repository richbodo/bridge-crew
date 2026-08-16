import { useState } from "react";

import { CREW, STATUS_LABEL, type AgentKind, type AgentStatus } from "@/lib/crew";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  agent: AgentKind;
  status: AgentStatus;
  task: string | null;
  progress: string | null;
  busy?: boolean;
  onStop: () => void;
  onEngage: (brief: string) => void;
}

export function AgentCard({ agent, status, task, progress, busy, onStop, onEngage }: Props) {
  const member = CREW[agent];
  const active = status === "working" || status === "hand_raised" || status === "speaking";
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState("");

  const submit = () => {
    const text = brief.trim();
    if (!text) return;
    setBrief("");
    setOpen(false);
    onEngage(text);
  };

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

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={active ? "ghost" : "secondary"}
          className="h-7 px-2 text-xs"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Cancel" : active ? "Redirect" : "Engage"}
        </Button>
        {active ? (
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onStop}>
            Stand down
          </Button>
        ) : null}
      </div>

      {open ? (
        <div className="mt-2">
          <Textarea
            autoFocus
            rows={2}
            value={brief}
            placeholder={active ? `New brief for ${member.name}…` : `What should ${member.name} take on?`}
            onChange={(e) => setBrief(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            className="resize-none bg-background text-xs"
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              or type @{member.kind} in the room
            </p>
            <Button size="sm" className="h-7 px-3 text-xs" disabled={busy} onClick={submit}>
              {active ? "Redirect" : "Engage"}
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
