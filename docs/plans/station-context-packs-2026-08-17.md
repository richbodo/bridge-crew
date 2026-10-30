# Station context packs

Today a station fires with only two things: its role/duty prompt, and the last 30 lines of
the transcript. Nothing else. This adds a named, reusable body of reference material that a
station **must** read every time it runs, and widens the transcript to the whole thread.

## What a pack is

A **context pack** is a named folder of documents, e.g. `product-spec`, `house-style`,
`postgres-notes`. Two kinds, both addressed by the same name:

1. **Repo packs** — `docs/context/<pack>/*.md`, committed alongside the code, bundled at
   build time. Read-only in the room, versioned with the repo, good for durable material.
2. **Session packs** — created and edited from the room UI, stored in the backend, scoped to
   the session. Good for material that shows up mid-conversation.

If a session pack has the same name as a repo pack, the session pack's documents are
appended to it rather than replacing it (the room can extend a repo pack, never silently
shadow it).

## How a station gets a pack

The station card's existing **Reassign** form gains a third field: **Context packs** — a
multi-select of every available pack name (repo + session), stored on the station alongside
its name and duty. Default: no packs, same behaviour as today.

## What the model actually sees

Every run, in this order:

```text
[system]  role + duty prompt
          house style
[user]    ## Standing context
          ### pack: product-spec
          --- docs/context/product-spec/overview.md ---
          <full file text>
          ...every document in every attached pack, verbatim...

          ## Living plan
          <plan.md>

          ## Session transcript
          <every line since the session opened>

          ## Your task
          <the brief>
```

Whole packs, always — no retrieval, no summarisation. Full transcript, always.

A hard safety budget (~400k characters total) guards against a runaway session: if it is
exceeded, the oldest transcript lines are dropped first, then lowest-priority pack docs, and
the prompt states plainly what was dropped. Packs are never silently trimmed without saying so.

## Visibility in the room

- Station card shows the attached pack names as small chips under the duty line.
- A **Context** panel next to Invite lists all packs, their document counts, and lets a host
  create a session pack, paste/edit a document, and delete one. Repo packs are listed as
  read-only with a source label.
- When a station runs with packs attached, its written brief opens with a one-line
  "Read: product-spec (4 docs), house-style (1 doc)" provenance note.

## Technical notes

- New table `context_packs` (session_id, name, description) and `context_docs`
  (pack_id, path, body), member-scoped RLS mirroring `stage_docs`, grants for
  `authenticated` + `service_role`.
- `agents_state` gains `context_packs text[] default '{}'`.
- Repo packs load through `import.meta.glob('/docs/context/**/*.md', { as: 'raw', eager: true })`
  inside a `*.server.ts` module, so the files are bundled into the Worker at build time —
  there is no runtime filesystem to read them from.
- `src/lib/context.server.ts`: `loadPacks(names, sessionId, supabase)` merges repo + session
  docs and renders the standing-context block; `src/lib/context.ts` holds the pure
  budget/assembly logic so it can be unit-tested.
- `runAgent` in `room.functions.ts`: drop the `.limit(30)` on the transcript read, pull
  `plan` from `stage_docs`, call `loadPacks` with the station's `context_packs`, and pass the
  assembled block to `runAgentBrief`. `writePlanDoc` (Scribe) gets the same treatment.
- `docs/context/README.md` documents the folder convention; seed one example pack.
- Tests for pack merging, ordering, and budget-trimming behaviour.

## Fixture packs shipped with the repo

`docs/context/` is the parent directory. Four fixture packs ship so the crew has something
real to work with, and so it is obvious from an answer whether the pack was actually read.

Each pack carries **canary facts**: specific, checkable, unguessable details (named figures,
dates, coined terms, exact numbers). If a station's answer never touches them, it did not read
the pack.

1. **`nz-politics`** — New Zealand political current events past any model's training cutoff:
   coalition arithmetic, portfolio holders, live bills, recent by-election numbers, and the
   local-vs-national tension in a couple of regional fights. Canaries: exact seat counts,
   bill clause numbers, dated committee milestones.
2. **`social-epidemiology`** — the fundamental-cause / social-gradient literature at a depth
   models blur: specific cohort names, effect sizes with confidence intervals, and the
   methodological disputes between named research groups. Canaries: study names + numbers.
3. **`kereru-ferry-coop`** — a wholly fictional organisation: a small passenger-ferry
   cooperative with a board, a fleet, three years of route-level ridership and fuel costs,
   a maintenance backlog, and an unresolved decision about electrifying one route. Fictional
   by construction, so it cannot be in any training set — the strongest read-test we have,
   and a natural debate subject for Advocate vs Skeptic.
4. **`bridge-crew-protocol`** — this repo's own research brief, tagging vocabulary (P1–P7,
   `context_injection`, `option_reopen`, …), export-bundle format, and floor-control rules,
   condensed for the crew. Makes the crew competent about the instrument it runs inside.

Each pack folder gets an `index.md` stating what the pack is, its provenance, and a
`## Canaries` section listing the facts a reader should be able to cite — the tester's
answer key. `docs/context/README.md` documents the convention and how to add a pack.

## Terminology (README addition)

Add a short glossary to `README.md`, since the words are getting used loosely:

- **Bridge Crew** — the name of the application.
- **The Bridge Crew** — every party to a conversation, humans and AIs together.
- **the agents** — the AI members of The Bridge Crew.
- **the humans** — the human members of The Bridge Crew.
- **station** — an agent's configured seat: name, duty prompt, and context packs.

## Out of scope for this pass

Embeddings/retrieval, file uploads (PDF/docx), and per-pack access control. All three stay
possible on top of this shape.

