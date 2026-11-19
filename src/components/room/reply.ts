import { useEffect, useRef } from "react";

/**
 * Replying to a crew member from the message box. When one is given the floor and speaks, the
 * box starts a reply to it: "@Storyteller ", with the Replying chip above it. The text is what
 * counts: take the name out (or press the chip's ×) and the message is for the room again.
 */

/** How the box names a crew member: "@Storyteller ", "@Game-designer " (src/lib/summon.ts). */
export function replyPrefix(name: string): string {
  return `@${name.trim().replace(/\s+/g, "-")} `;
}

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const nameIn = (prefix: string) => new RegExp(`${escape(prefix.trim())}(?![\\p{L}\\p{N}_-])`, "iu");

/** Whether the text still names the crew member, so it's still a reply to it. */
export function stillNames(text: string, prefix: string): boolean {
  return nameIn(prefix).test(text);
}

/** The text without the crew member's name: what the chip's × leaves. */
export function withoutName(text: string, prefix: string): string {
  const match = nameIn(prefix).exec(text);
  if (!match) return text;
  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length).replace(/^[ \t]+/, "");
  return before.trim() ? `${before.replace(/[ \t]+$/, " ")}${after}` : after;
}

interface Line {
  id: string;
  kind: string;
  contribution_id?: string | null;
}

/**
 * Calls `onSpeech` with the contribution a crew member has just said: the newest crew line that
 * wasn't there before. What a room opens with doesn't count.
 */
export function useOnSpeech<C extends { id: string }>(
  roomId: string,
  lines: ReadonlyArray<Line> | undefined,
  contributions: ReadonlyArray<C> | undefined,
  onSpeech: (contribution: C) => void,
) {
  const latest = useRef(onSpeech);
  useEffect(() => {
    latest.current = onSpeech;
  });
  const known = useRef<{ roomId: string; seen: Set<string> } | null>(null);

  useEffect(() => {
    if (!lines || !contributions) return;
    const spoken = lines.filter((line) => line.kind === "agent" && line.contribution_id);
    if (known.current?.roomId !== roomId) {
      known.current = { roomId, seen: new Set(spoken.map((line) => line.id)) };
      return;
    }
    const { seen } = known.current;
    let newest: C | undefined;
    for (const line of spoken) {
      if (seen.has(line.id)) continue;
      const contribution = contributions.find((c) => c.id === line.contribution_id);
      // Its contribution comes with it; if not yet, the line counts when it does.
      if (!contribution) continue;
      seen.add(line.id);
      newest = contribution;
    }
    if (newest) latest.current(newest);
  }, [roomId, lines, contributions]);
}
