# Bridge Crew

**A real-time planning room for two humans and a crew of AI agents.**

Bridge Crew is an open-source, browser-based collaboration room where two humans meet on a video call and work through hard, ill-structured problems — plans, strategies, contested questions — with a crew of named AI agents under absolute human floor control. Humans talk; agents listen, work in the background, and raise a hand when they have something worth saying. The session produces an artifact: a living plan document, a decision log, and an open-questions list.

**Status:** pre-development. The plan and research brief are written; the build starts on [Lovable](https://lovable.dev) (fast public iteration, shareable test sessions), with a self-hostable local version (Ubuntu Linux / Digital Ocean droplet) as a follow-on target.

## Terminology

- **Bridge Crew** — the name of the application.
- **The Bridge Crew** — every party to a conversation, humans and AIs together.
- **the agents** — the AI members of The Bridge Crew.
- **the humans** — the human members of The Bridge Crew.
- **station** — an agent's configured seat: display name, duty prompt, and context packs.
- **context pack** — a named folder of documents a station must read in full before it
  answers. See [`docs/context/README.md`](docs/context/README.md).

## Documents

- [The Bridge Crew Plan](docs/plans/BRIDGE_CREW_PLAN.md) — architecture, crew roster, build phases, and exit gates
- [The Research Brief](docs/research/BRIDGE_CREW_RESEARCH_BRIEF.md) — the field-scan protocol and falsifiable predictions this tool exists to test
- [Context packs](docs/context/README.md) — the fixture reference material stations can be required to read
- [Floor state control](docs/floor_state_control.md) — the floor state machine and its UX
- [Research synthesis](https://claude.ai/public/artifacts/1159dda9-7cd9-422d-bbc3-c1a3d1f655f4) — the literature review behind the design

## For researchers

Bridge Crew is a **research instrument first**. The research literature on human-AI collaboration has an empty cell: the configuration of *two humans steering multiple AI agents in real time on ill-structured problems* has essentially no controlled evidence. Meta-analytic work (Vaccaro, Almaatouq & Malone 2024) shows human-AI combinations lose to the best of either alone on closed decision tasks but gain on open-ended creation; multi-agent AI debate without humans degrades through sycophancy and premature convergence; AI mediation of human groups works. The two-humans-plus-crew configuration sits untested between those results. This tool, and the field scan it supports, exist to probe that cell.

### The research brief

[`docs/research/BRIDGE_CREW_RESEARCH_BRIEF.md`](docs/research/BRIDGE_CREW_RESEARCH_BRIEF.md) states the core hypotheses and seven falsifiable predictions (P1–P7), a fixed session protocol, a transcript tagging scheme, and behavioral (non-survey) measures — published and timestamped in this repo *before* any field-scan session runs. Predictions will not be edited after data collection begins; corrections are appended.

### The field-fit map

The primary output of the field scan: one page mapping fields × (context-injection density, steering intensity, direction changes, return intent), with the predicted field ranking (P1) compared against observation. Roughly ten sessions, each a pair of graduate students or comparable practitioners from the same field, debating a live question of their own choosing, across maximally contrasted disciplines — from formal logic to social policy. The map, plus the prediction scorecard, is the evidence base for designing a properly powered study. It will be published here when the scan completes.

### The export bundle

Every session exports a self-contained bundle designed to be analyzable without the app — every field-scan analysis runs off bundles alone:

- `manifest.json` — bundle version, session identifiers and times, configuration cell (`pair+crew` vs `expert+facilitator`), consent reference, app commit, glossary snapshot
- `plan.md`, `decisions.md`, `open-questions.md` — the session's living documents as maintained by the Scribe agent
- `transcript.json` — the full speaker-labeled transcript (humans via per-client STT, agents via their granted turns)
- `events.json` — all floor-control events (grant / duck / yield / stop / redirect), summons, hand-raises, contributions, and analysis tags (`context_injection`, `assumption_set`, `option_reopen`, `direction_change`, `convergence_break`) merged into one time-ordered array
- `corpus-manifest.json` — names and hashes of any corpus documents the humans brought in

The format is versioned and pinned in the plan (§5), with the tagging vocabulary defined in the brief (§5); bundles contain no participant emails, and the scan's raw material is first-class data, not a spreadsheet on the side.

### Looking for collaborators

**I'm looking for collaborators to run the powered version of this study — I built this to hopefully contribute to tooling that could fill a hole in the literature.** The field scan is deliberately modest (n≈10, behavioral proxies, one facilitator); its job is to produce the instrument, the field-fit map, and directional evidence that make a real comparative study (2+crew vs. 1+crew vs. crew-alone, with baselines) designable. If you work on human-AI collaboration, CSCW, group deliberation, or adjacent fields and want to use, extend, or formally study this instrument, get in touch: **richbodo@gmail.com**

## License

GPL-3.0

## Build with Lovable

This repo is synced with a [Lovable](https://lovable.dev) project — continue developing it in the [Lovable editor](https://lovable.dev/projects/0aa8f579-4251-4415-b94e-7027c716942c). Changes made in Lovable commit straight to this repository, and pushes to `main` sync back into Lovable.
