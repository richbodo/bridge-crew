import { useState } from "react";

import { CREW, STATUS_LABEL, type AgentKind, type AgentStatus } from "@/lib/crew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  agent: AgentKind;
  status: AgentStatus;
  task: string | null;
  progress: string | null;
  name?: string | null;
  duty?: string | null;
  packs?: string[];
  availablePacks?: { name: string; docCount: number }[];
  busy?: boolean;
  onStop: () => void;
  onEngage: (brief: string) => void;
  onSaveProfile: (profile: { name: string; duty: string; contextPacks: string[] }) => void;
}

export function AgentCard({
  agent,
  status,
  task,
  progress,
  name,
  duty,
  packs = [],
  availablePacks = [],
  busy,
  onStop,
  onEngage,
  onSaveProfile,
}: Props) {
  const member = CREW[agent];
  const active = status === "working" || status === "hand_raised" || status === "speaking";
  const [open, setOpen] = useState(false);
  const [brief, setBrief] = useState("");
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(name ?? member.name);
  const [dutyDraft, setDutyDraft] = useState(duty ?? member.blurb);
  const [packDraft, setPackDraft] = useState<string[]>(packs);

  const label = name?.trim() || member.name;
  const dutyText = duty?.trim() || member.blurb;

  const submit = () => {
    const text = brief.trim();
    if (!text) return;
    setBrief("");
    setOpen(false);
    onEngage(text);
  };

  const startEdit = () => {
    setNameDraft(name ?? member.name);
    setDutyDraft(duty ?? member.blurb);
    setPackDraft(packs);
    setOpen(false);
    setEditing(true);
  };

  const togglePack = (pack: string) =>
    setPackDraft((prev) => (prev.includes(pack) ? prev.filter((p) => p !== pack) : [...prev, pack]));

  const saveEdit = () => {
    onSaveProfile({ name: nameDraft.trim(), duty: dutyDraft.trim(), contextPacks: packDraft });
    setEditing(false);
  };

  return (
    <article
      className="relative overflow-hidden rounded-lg border border-border bg-card p-4"
      style={{ borderLeft: `3px solid ${member.accent}` }}
    >
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-card-foreground">{label}</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {member.station}
            {label !== member.name ? ` · was ${member.name}` : ""}
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
        {task ? <span className="text-card-foreground">{task}</span> : dutyText}
      </p>
      {progress ? <p className="mt-2 text-xs italic text-muted-foreground">{progress}</p> : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={active ? "ghost" : "secondary"}
          className="h-7 px-2 text-xs"
          onClick={() => {
            setEditing(false);
            setOpen((prev) => !prev);
          }}
        >
          {open ? "Cancel" : active ? "Redirect" : "Engage"}
        </Button>
        {active ? (
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onStop}>
            Stand down
          </Button>
        ) : null}
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs"
          onClick={() => (editing ? setEditing(false) : startEdit())}
        >
          {editing ? "Cancel" : "Reassign"}
        </Button>
      </div>

      {editing ? (
        <div className="mt-2 space-y-2 rounded-md border border-dashed border-border p-2">
          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Station name
            </label>
            <Input
              autoFocus
              value={nameDraft}
              placeholder={member.name}
              onChange={(e) => setNameDraft(e.target.value)}
              className="mt-1 h-7 bg-background text-xs"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Duty prompt
            </label>
            <Textarea
              rows={4}
              value={dutyDraft}
              placeholder={member.blurb}
              onChange={(e) => setDutyDraft(e.target.value)}
              className="mt-1 resize-none bg-background text-xs"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
              onClick={() => {
                setNameDraft(member.name);
                setDutyDraft(member.blurb);
              }}
            >
              Reset to default
            </button>
            <Button size="sm" className="h-7 px-3 text-xs" disabled={busy} onClick={saveEdit}>
              Save station
            </Button>
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="mt-2">
          <Textarea
            autoFocus
            rows={2}
            value={brief}
            placeholder={active ? `New brief for ${label}…` : `What should ${label} take on?`}
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
