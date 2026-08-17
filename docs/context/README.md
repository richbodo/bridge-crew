# Context packs

A **context pack** is a named folder of markdown documents that a station must read, in full,
every time it runs. Packs live in two places and share one namespace:

- **Repo packs** — `docs/context/<pack-name>/*.md`, committed here, bundled at build time,
  read-only from inside a room.
- **Session packs** — created from the room's **Context** panel and stored in the backend.
  A session pack with the same name as a repo pack *extends* it; it never shadows it.

## Adding a repo pack

1. `mkdir docs/context/<pack-name>` — lowercase, hyphenated. The folder name is the pack name.
2. Add an `index.md` that states what the pack is, where it came from, and a `## Canaries`
   section (see below). Add as many other `*.md` files as the topic needs.
3. Rebuild. The pack appears in every station's **Reassign → Context packs** list.

Documents are inlined verbatim, in path order, with `index.md` first. There is no retrieval
and no summarisation: whatever is in the folder is what the model sees.

## Canaries

Every fixture pack ends with a `## Canaries` list: specific, checkable, unguessable facts —
coined terms, exact figures, named people, dated events. They are the answer key. Ask a
station a question that can only be answered well by using the pack; if the reply never
touches a canary, the pack was not read (or was not attached).

## Fixture packs in this repo

| Pack | What it is | Why it tests reading |
| --- | --- | --- |
| `kereru-ferry-coop` | A wholly fictional passenger-ferry cooperative with three years of operating data and a live electrification decision | Fictional by construction, so it cannot be in any training set — the strongest read-test available |
| `nz-politics` | A briefing on a regional New Zealand political fight, with local actors, numbers and dates | Local, granular, and partly synthetic; models cannot bluff the specifics |
| `social-epidemiology` | Fundamental-cause theory and the social gradient, plus a synthetic cohort with exact effect sizes | Models know the theory in outline and blur the numbers; the numbers here are checkable |
| `bridge-crew-protocol` | This project's own research protocol, tagging vocabulary and floor rules | Nothing outside this repo describes it |

## Fixture data warning

These packs are **test fixtures**. Real theory and real institutions are named for
plausibility, but every figure, cohort, vessel, ballot count and dated milestone in them is
synthetic unless a document says otherwise. Do not cite them as fact outside testing.
