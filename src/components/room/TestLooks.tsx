import { useMemo } from "react";

import { labelOf, testOf, type TestLook } from "@/lib/made";

import type { MadeRow } from "./MadeThing";

/**
 * A test (src/lib/playtest.server.ts): what the Tester saw, look by look. Each look is a
 * picture of the game, what the Tester did just before, and what should be on the screen.
 */

/** The looks in a row, with the Tester's hail and under what it said. */
export function TestStrip({ thing }: { thing: MadeRow }) {
  const test = useMemo(() => testOf(thing.body), [thing.body]);
  return (
    <ol
      className="flex gap-2 overflow-x-auto pb-1"
      aria-label={`What the Tester saw: ${thing.name}`}
    >
      {test.looks.map((look, i) => (
        <li key={i} className="w-40 shrink-0 text-[11px] leading-snug">
          <img
            src={look.image}
            alt={`Look ${i + 1}: ${look.did}`}
            className="aspect-[4/3] w-full rounded-sm border border-border bg-black object-contain"
          />
          <p className="mt-1 text-card-foreground">{look.did}</p>
          <Notes look={look} muted="text-muted-foreground" />
        </li>
      ))}
    </ol>
  );
}

/** The looks on the big screen, large, in order. */
export function TestSheet({ thing }: { thing: MadeRow }) {
  const test = useMemo(() => testOf(thing.body), [thing.body]);
  return (
    <figure className="mx-auto h-full max-w-6xl overflow-y-auto text-white">
      <figcaption className="text-center text-sm text-white/80">
        {labelOf(thing)}
        {test.version ? `, on Version ${test.version}` : ""}
      </figcaption>
      <ol className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-5">
        {test.looks.map((look, i) => (
          <li key={i} className="text-sm leading-snug">
            <img
              src={look.image}
              alt={`Look ${i + 1}: ${look.did}`}
              className="aspect-[4/3] w-full rounded-md bg-black object-contain"
            />
            <p className="mt-2">
              {i + 1}. {look.did}
            </p>
            <Notes look={look} muted="text-white/70" />
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Notes({ look, muted }: { look: TestLook; muted: string }) {
  return (
    <>
      {look.expect ? <p className={muted}>Should: {look.expect}</p> : null}
      {look.heard.length ? <p className={muted}>Heard: {look.heard.join(", ")}</p> : null}
      {look.errors.map((error, i) => (
        <p key={i} className="text-destructive">
          {error}
        </p>
      ))}
    </>
  );
}
