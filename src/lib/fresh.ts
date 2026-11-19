/**
 * What's new in a shared document since it was last seen, so the room can show it for a moment.
 * Lines are compared as text, wherever they are: a line that moved isn't new, and a line that
 * appears once more than before is.
 */

/** The 1-based numbers of the lines in `after` that weren't in `before`. Blank lines never are. */
export function freshLines(before: string, after: string): Set<number> {
  const had = new Map<string, number>();
  for (const line of before.split("\n")) {
    const key = line.trim();
    if (key) had.set(key, (had.get(key) ?? 0) + 1);
  }
  const fresh = new Set<number>();
  after.split("\n").forEach((line, i) => {
    const key = line.trim();
    if (!key) return;
    const left = had.get(key) ?? 0;
    if (left > 0) had.set(key, left - 1);
    else fresh.add(i + 1);
  });
  return fresh;
}
