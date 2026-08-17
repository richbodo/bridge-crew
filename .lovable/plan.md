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

## Out of scope for this pass

Embeddings/retrieval, file uploads (PDF/docx), and per-pack access control. All three stay
possible on top of this shape.
