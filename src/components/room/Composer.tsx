import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type Speaker = "student" | "teacher";

interface Props {
  draft: string;
  onDraft: (text: string) => void;
  onSend: () => void;
  placeholder: string;
  /** On a shared seat: who's talking, and the two names on the switch. */
  speaker?: { value: Speaker; student: string; teacher: string; onChange: (who: Speaker) => void };
  /** Reply: what this prompt answers. */
  replyingTo?: { name: string; spoken: string; onCancel: () => void } | null;
  atWork: string[];
  rows?: number;
}

/** The message box: the speaker switch, a Reply chip, the box itself and Send. */
export function Composer({ draft, onDraft, onSend, placeholder, speaker, replyingTo, atWork, rows = 2 }: Props) {
  return (
    <div>
      {speaker ? (
        <div className="mb-2 flex items-center gap-2 text-xs" role="group" aria-label="Who's talking">
          <span className="text-muted-foreground">Who's talking:</span>
          {(["student", "teacher"] as const).map((who) => (
            <button
              key={who}
              type="button"
              aria-pressed={speaker.value === who}
              onClick={() => speaker.onChange(who)}
              className={`rounded-sm border px-2 py-0.5 ${
                speaker.value === who
                  ? "border-transparent bg-secondary text-secondary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {who === "student" ? speaker.student : `${speaker.teacher} (teacher)`}
            </button>
          ))}
        </div>
      ) : null}
      {replyingTo ? (
        <p className="mb-2 flex items-center gap-2 rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground">
          <span className="min-w-0 flex-1 truncate">
            Replying to {replyingTo.name}: “{replyingTo.spoken}”
          </span>
          <button
            type="button"
            className="text-foreground hover:underline"
            aria-label="Stop replying"
            onClick={replyingTo.onCancel}
          >
            ×
          </button>
        </p>
      ) : null}
      <Textarea
        value={draft}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        className="resize-none bg-card text-sm"
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground" aria-live="polite">
          {atWork.length ? <span className="text-foreground">Crew at work: {atWork.join(", ")}. </span> : null}
          Enter sends. Humans always have the floor.
        </p>
        {/* Send never greys out: the people can always talk (F11). */}
        <Button size="sm" onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
