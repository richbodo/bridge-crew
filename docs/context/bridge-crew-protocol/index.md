# The Bridge Crew protocol — pack overview

**Provenance: this repository.** Condensed from `README.md`,
`docs/plans/BRIDGE_CREW_PLAN.md`, `docs/research/BRIDGE_CREW_RESEARCH_BRIEF.md` and
`docs/floor_state_control.md`. Nothing outside this repo describes it, so a station that
gets these details right read the pack.

## Terminology

- **Bridge Crew** — the name of the application.
- **The Bridge Crew** — every party to a conversation, humans and agents together.
- **the agents** — the AI members of The Bridge Crew.
- **the humans** — the human members of The Bridge Crew.
- **station** — an agent's configured seat: display name, duty prompt, and context packs.

## Floor control

The humans hold the floor absolutely. An agent may work whenever it likes, but it may only
*speak* when a human grants it the floor.

Station statuses: `idle`, `working`, `hand_raised`, `speaking`, `stopped`.

Legal transitions: `idle → working`, `working → hand_raised`, `hand_raised → speaking`,
`hand_raised → idle` (dismissed), `speaking → idle`, and `* → stopped` at any time. Only one
station may hold `speaking`. A human posting a line preempts a speaking agent immediately.

A granted turn is capped at **10 sentences of spoken text**; anything beyond the cap is moved
into the written brief rather than said.

## Interaction grammar

- `/research …`, `/analyze …`, `/debate …` summon stations with a brief.
- `/redirect <station> …` replaces a working station's brief; `/stop <station>` stands it down.
- Naming a station in plain speech (`@scout`, or its custom name) re-engages it with that
  line as the brief.
- Station cards offer the same actions: Engage, Redirect, Stand down, Reassign.

## The research instrument

Bridge Crew is a research instrument first. The empty cell it probes: **two humans steering
multiple AI agents in real time on ill-structured problems**, a configuration with
essentially no controlled evidence. The brief states seven falsifiable predictions,
**P1–P7**, published before any field-scan session runs, and never edited after data
collection begins — corrections are appended.

Transcript tags: `context_injection`, `assumption_set`, `option_reopen`, `direction_change`,
`convergence_break`.

Every session exports a bundle analysable without the app: `manifest.json`, `plan.md`,
`decisions.md`, `open-questions.md`, `transcript.json`, `events.json`,
`corpus-manifest.json`. Bundles contain no participant emails.

## Canaries

A station that read this pack can cite:

- The distinction between **Bridge Crew** (the app) and **The Bridge Crew** (everyone in the
  conversation, humans and agents).
- The five station statuses and the rule that only one station may be `speaking`.
- The **10-sentence** spoken cap and the overflow-into-brief rule.
- Predictions **P1–P7** and the no-edit-after-collection rule.
- The five transcript tags, including **`option_reopen`** and **`convergence_break`**.
- The seven files in the export bundle.
