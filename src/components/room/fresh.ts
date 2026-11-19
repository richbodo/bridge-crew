import { useEffect, useRef, useState } from "react";

import { freshLines } from "@/lib/fresh";

/** How long something new stays marked: the length of the `fresh` animation in styles.css. */
export const FRESH_MS = 4000;

const NONE: ReadonlySet<never> = new Set();

/**
 * Remembers `value` as it changes, and says for FRESH_MS what's new in it, with a count that
 * goes up each time so a second change can mark again. What a room opens with isn't new.
 */
function useFresh<T, K>(
  value: T | undefined,
  compare: (before: T, after: T) => Set<K>,
): { fresh: ReadonlySet<K>; round: number } {
  const before = useRef<T | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [state, setState] = useState<{ fresh: ReadonlySet<K>; round: number }>({
    fresh: NONE,
    round: 0,
  });

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (value === undefined) return;
    const old = before.current;
    before.current = value;
    if (old === undefined) return;
    const fresh = compare(old, value);
    if (!fresh.size) return;
    setState((prev) => ({ fresh, round: prev.round + 1 }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState((prev) => ({ ...prev, fresh: NONE })), FRESH_MS);
  }, [value, compare]);

  return state;
}

/** The lines of a shared document that are new: line numbers, 1-based. */
export function useFreshLines(text: string | undefined) {
  return useFresh(text, freshLines);
}

const newIds = (before: string, after: string) => {
  const had = new Set(before.split(" "));
  return new Set(after.split(" ").filter((id) => id && !had.has(id)));
};

/** The ids in a list that are new. */
export function useFreshIds(ids: readonly string[] | undefined) {
  return useFresh(ids?.join(" "), newIds);
}
