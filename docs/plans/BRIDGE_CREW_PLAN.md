# The Bridge Crew Plan
### A real-time planning room for two humans and a crew of AI agents

## Summary

Bridge Crew is an open-source, browser-based collaboration room where two humans meet on a video call and work through hard, ill-structured problems — plans, strategies, contested questions — with a crew of named AI agents under absolute human floor control. Humans talk; agents listen, work in the background, and raise a hand when they have something worth saying, speaking in short conversational turns (voice) while writing their full findings to a shared stage that maintains a living plan document and decision log. The humans are the bridge crew; the agents are the ship. The MVP tests one hypothesis: that a 2-humans + N-agents configuration with human steering is something people genuinely love to work in — a configuration the research literature has left almost entirely untested ([full research synthesis](https://claude.ai/public/artifacts/1159dda9-7cd9-422d-bbc3-c1a3d1f655f4)) — and the validation program is a field scan: pairs of graduate students from different disciplines debating a live question from their own field, in exchange for coffee. The companion document `BRIDGE_CREW_RESEARCH_BRIEF.md` states the falsifiable predictions this tool exists to test. It is built the same way as [FundFlow](https://github.com/richbodo/launchpad-funding) (Lovable.dev + Vite/React/TS + Supabase + LiveKit, synced to GitHub, runnable locally with full test infra) so it can be remixed on Lovable in minutes and hardened on the command line with Claude Code.

**Name:** Bridge Crew (repo suggestion: `bridge-crew`). The name is a generic naval/sci-fi concept; keep all agent and UI naming original — no trademarked franchise names, characters, or styling — so the project stays clean for open source.
**License:** GPL-3.0, same as FundFlow.
**Links:** [Research synthesis](https://claude.ai/public/artifacts/1159dda9-7cd9-422d-bbc3-c1a3d1f655f4) · [FundFlow reference repo](https://github.com/richbodo/launchpad-funding) · Companion: `BRIDGE_CREW_RESEARCH_BRIEF.md`

---

## 1. Design principles (from the research, frozen for the MVP)

These are the non-negotiables that fall directly out of the literature review. Everything else in this plan is fungible.

1. **Asymmetric floor rights.** Humans always preempt agents; human speech instantly ducks agent audio. Agents never speak unbidden — they raise a hand and wait for a grant. This deletes the hardest orchestration problem (when should an agent speak?) and matches the IBM Koala finding: people like proactive agent *contributions* but hate proactive *interruptions*.
2. **Speak the summary, write the detail.** Every agent contribution has a spoken layer (capped ~45 seconds, conversational register, 1–10 sentences, no lists) and a written layer (full findings, citations, transcripts) that lands on the stage. Voice is the interface; the artifact is the record.
3. **The session produces an artifact.** A scribe agent maintains a living plan document, a decision log, and an open-questions list. The crew leaves with files, not vibes. Next session resumes from them.
4. **Divergence is protected.** The scribe watches for premature convergence (open questions being skipped, agent-agreement collapse) and signals it — with a glow on its card, never a voice interruption. Summoned debate agents get heterogeneous briefs, and where feasible heterogeneous models, to resist homogenization.
5. **Transparency of agent activity.** Any human can peek into what any background agent is doing at any moment (its current task, its partial output) and stop or redirect it mid-flight.
6. **Two humans are first-class.** Both humans have identical controls. The system must feel good with exactly two humans before anything else matters. Solo mode exists only as a degenerate case for development.

## 2. What the MVP is (and is not)

**Is:** a session room for 2 humans (video/audio via LiveKit) + 1 facilitator/scribe agent + up to ~4 summoned agents, with a shared stage (plan doc, decision log, open questions, agent cards), voice in/out for agents, a corpus panel, and session persistence. Demo mode with fixture participants. Runs on Lovable or locally. Sessions can be run fully online — the field scan does not depend on any physical location.

**Is not (yet):** avatars/faces for agents, attach-to-Zoom bots, more than 2 humans, marketplace anything, Claude Code terminal integration (the MVP orchestrator calls the Anthropic API directly from edge functions; deep Claude Code / MCP integration is the local-version follow-on), mobile support, research-grade statistics.

**The love test (acceptance criteria for the whole MVP):** you and one friend run a 45-minute planning session on a real problem of yours, and (a) you produce a plan doc you actually keep using, (b) neither of you wanted to abandon the tool mid-session, (c) at least one summoned agent contribution changed the plan's direction, and (d) you both want to do it again. If four sessions in a row fail (d), stop and rethink before adding features.

**The field-scan test (validation program, after Phase 3):** ~10 sessions, each with a *pair* of graduate students (or comparable practitioners) from the same field, debating a live question they choose from within their field. Recruited casually (campus cafés, or online from anywhere), verified informally, compensated with coffee or a small gift card, with signed consent to record and to use the anonymized transcript. Full protocol, measures, and falsifiable predictions live in `BRIDGE_CREW_RESEARCH_BRIEF.md`. This program is why the tool exists: it converts the MVP from a demo into an instrument.

## 3. Architecture

Same shape as FundFlow. One new concept: the **orchestrator**, a Supabase Edge Function that owns all agent lifecycle and LLM calls.

```
Browser (Vite + React + TS + Tailwind + shadcn)
│
├─ LiveKit room ──────────── human A/V (reuse FundFlow's LiveKit integration wholesale)
│
├─ Web Speech API (per client) ── local STT → speaker-labeled transcript events
│
├─ Supabase Realtime ─────── session state: transcript, agent cards, hand-raise queue,
│                            stage documents, floor state, decision log
│
└─ Supabase Edge Functions
   ├─ orchestrator ───────── consumes transcript, detects summon/redirect/stop intents,
   │                         manages agent lifecycle, enforces speech caps,
   │                         calls Anthropic API (Claude) per agent turn
   ├─ agent-worker ────────── long-running research/debate tasks (chunked; writes
   │                         progress to agent card, raises hand on completion)
   ├─ tts ──────────────────── text → audio for granted agent turns (see §6)
   └─ scribe ───────────────── maintains plan.md, decisions.md, open-questions.md
                              in Supabase Storage; convergence watchdog
```

**Why per-client Web Speech API instead of server-side STT for the MVP:** it's free, zero-infrastructure, and — critically — *perfectly speaker-labeled*, because each browser transcribes only its own human. The known costs: Chrome-centric, mediocre accuracy on jargon, no barge-in detection on agent audio. All three are acceptable at MVP scale, and §6 defines the upgrade path (LiveKit Agents with server-side STT) when they stop being acceptable. Mitigate jargon with a per-session glossary (seeded from the corpus, extendable live) surfaced next to the live transcript so humans can spot-correct — this matters double for the field scan, where every session brings a new discipline's vocabulary.

**Floor control implementation (the one genuinely novel component):**
- A `floor` row per session: `holder` ∈ {human, agent-id, open}.
- Humans never need the floor — they just talk. Any local voice-activity detection above threshold while an agent is speaking fires `duck` (agent audio volume → 15% within 100 ms) and, if speech continues >1.5 s, `yield` (agent turn ends, remainder is written to the stage instead).
- Agents enter a `hand_raised` queue with a one-line "what I've got" summary. Either human grants with a tap or by voice ("go ahead, Scout"). Grants are exclusive; the orchestrator serializes agent speech.
- Every agent card has **Stop** and **Redirect** buttons that work mid-task and mid-speech.

**Corpus:** a session-scoped Supabase Storage bucket. Humans drag in markdown/PDF/text before or during the session. The orchestrator indexes it naively for the MVP (full-text injected or chunk-on-demand — no vector DB yet) and every agent brief includes a corpus manifest. For field-scan sessions the corpus may be empty — that is itself a data point (see brief §5, context-injection tagging).

## 4. The crew (MVP roster)

| Agent | Role | Speaks when | Model call shape |
|---|---|---|---|
| **Scribe** (always present) | Maintains plan/decisions/open-questions; convergence watchdog; session memory | Almost never — glows instead; speaks only if directly asked | Cheap/fast model, streaming, runs on a debounced transcript window |
| **Scout** (summoned) | Research runs against corpus + web | Hand-raise on completion: "30-second summary or full brief?" | Tool-using agent loop in `agent-worker`, minutes-long |
| **Advocate / Skeptic** (summoned as a pair) | Structured debate-with-the-humans on a framed question; ask humans questions as much as they argue | Alternating granted turns, 1–10 sentences each | Two calls with opposing briefs; prefer different models per side when keys allow |
| **Analyst** (summoned) | Runs a comparison, estimate, or structured breakdown | Hand-raise on completion | Single deep call, written-first output |

Personality lives in the system prompts and voice choice, not in rendered faces. Each agent has a name, a color, a one-line character note the humans can edit, and a distinct TTS voice. Crew-station flavor in the UI (stations, hand-raises as hails, "on screen" for expanding a brief) is welcome; keep it original.

## 5. Data model (Supabase)

Reuse FundFlow's session/participant skeleton; add:

```sql
sessions        (id, name, created_by, status, glossary jsonb, consent_ref text, created_at)
participants    (id, session_id, kind: human|agent, display_name, role, color, voice_id)
transcript      (id, session_id, speaker_participant_id, text, t_start, t_end, source: stt|typed)
agents_state    (participant_id, status: idle|listening|working|hand_raised|speaking,
                 current_task text, task_progress text, brief jsonb)
floor_events    (id, session_id, event: grant|duck|yield|stop|redirect, actor, target, at)
hand_raises     (id, session_id, agent_id, summary_line, raised_at, resolved: granted|dismissed)
stage_docs      (session_id, kind: plan|decisions|open_questions, storage_path, updated_at)
contributions   (id, session_id, agent_id, spoken_text, written_doc_path, granted_by, at)
summons         (id, session_id, requested_by, agent_kind, brief_text, status)
session_tags    (id, session_id, transcript_id, tag: context_injection|assumption_set|
                 option_reopen|direction_change|convergence_break, tagged_by, note)   -- field-scan analysis
```

Realtime channels: `session:{id}:transcript`, `session:{id}:agents`, `session:{id}:floor`, `session:{id}:stage`. This mirrors how FundFlow does chat + Fund-ometer, so the subscription patterns port directly. The `session_tags` table exists so field-scan tagging (brief §5) is first-class data, not a spreadsheet on the side, and `consent_ref` links each session to its consent record.

### The export bundle (pinned format, v1)

The bundle is the instrument's data product: every field-scan analysis runs off bundles alone, with no access to the live database. If the field-fit map can't be built from bundles, the bundle is missing data — fix the bundle, not the analysis. One directory per session (zipped for download):

```
session-<session_id>/
  manifest.json        # bundle_version: 1, session_id, session name, started_at, ended_at,
                       #   configuration_cell: "pair+crew" | "expert+facilitator",
                       #   consent_ref, app_commit, glossary snapshot
  plan.md              # the three living documents, exactly as the Scribe left them
  decisions.md
  open-questions.md
  transcript.json      # ordered turns: { id, speaker: { participant_id, kind, display_name, role },
                       #   text, t_start, t_end, source: "stt" | "typed" | "tts" }
  events.json          # floor_events + hand_raises + summons + contributions + session_tags,
                       #   merged into one time-ordered array: { at, type, actor, target, data }
  corpus-manifest.json # filenames, sizes, and hashes of corpus documents (contents excluded
                       #   unless the consent record covers them)
```

Rules: `bundle_version` bumps on any breaking change, and the app must be able to re-export old sessions at the current version. No participant emails anywhere in the bundle — `participant_id` + display name only; emails stay in the database, reachable via `consent_ref` when a withdrawal request requires it. `transcript.json` and `events.json` are the ground truth for every tag count and measure in the brief (§5–§6); an empty corpus is recorded as an empty manifest, not an absent file, because corpus-free sessions are themselves a data point.

## 6. Build phases

Each phase ends with something you can demo to a friend, a working demo mode, and tests. Estimated in "focused weekends" per your daily-ship rhythm; treat as relative sizes, not promises.

### Phase 0 — Text party line (1–2 weekends) ← validates the whole idea
The full interaction grammar with zero audio/video. A shared session page: typed chat pane where both humans and the orchestrator converse; agent cards with live state; summoning by typed command ("/research blue widgets", "/debate what color should the widget be"); hand-raise queue with grant/dismiss; Scout doing a real web+corpus research run; contributions rendered as short "spoken-register" summaries with expandable full briefs; Scribe maintaining plan.md live in a side pane.
- **Reuses from FundFlow:** project scaffold, Supabase wiring, role login, chat panel, demo mode pattern, test infra scripts.
- **New:** orchestrator + agent-worker edge functions, agents_state/hand_raises/stage_docs schema, agent cards UI, summon parser.
- **Tests:** unit tests for summon parsing, floor/hand-raise state machine, speech-cap enforcement; Playwright: two browser contexts complete a scripted session (summon → work → hand-raise → grant → contribution → plan doc updated).
- **Exit gate (the cheap kill-test):** you + one friend, typing, 30 minutes, real problem. If this isn't already *a little bit fun*, stop — voice will not save it. This gate is the whole reason Phase 0 exists.

### Phase 1 — Humans on video, agents in ears (1–2 weekends)
Add the LiveKit room (lifted from FundFlow's session page) for human A/V. Per-client Web Speech API STT feeding the transcript channel; the orchestrator now consumes spoken conversation. Voice summoning ("let's get some research going on X" — orchestrator proposes a summon card, either human confirms with a tap; don't trust raw intent detection to act unconfirmed). Glossary panel with spot-correction.
- **Tests:** STT event pipeline unit tests with fixture transcripts; E2E with typed-transcript injection standing in for speech (deterministic CI); manual test script for real-mic sessions.
- **Exit gate:** a spoken 30-minute session where summoning by voice works ≥80% of the time and the transcript is good enough that agent outputs stay relevant.

### Phase 2 — Agents speak, floor control gets real (1–2 weekends)
TTS for granted turns. MVP default: OpenAI or ElevenLabs TTS via the `tts` edge function for quality, with a browser `speechSynthesis` fallback so demo mode works offline and free. Distinct voice per agent. Implement duck/yield barge-in (client-side VAD against agent audio). Stop/Redirect mid-speech. Speech-cap enforcement (~45 s; overflow goes to the stage with a spoken "…full detail's on the stage").
- **Tests:** floor state machine property tests (no state where an agent talks over a human); E2E asserting duck/yield events; audio-path smoke tests behind a flag like FundFlow's video tests.
- **Exit gate:** in a real session, an agent interrupted mid-sentence by a human yields within 1.5 s, every time. This rule is inviolable; treat any violation as a P0 bug.

### Phase 3 — The stage earns its keep (1 weekend)
Polish the three living documents (plan, decisions, open questions) with inline human editing; Scribe merges rather than overwrites. Convergence watchdog v1: glow when an open question has been untouched for N minutes of discussion, or when a debate's positions converge >70% (embedding similarity of successive turns — crude is fine). Session end: export the session as a downloadable bundle in the v1 format pinned in §5 (and, locally, straight into a project directory where Claude Code can pick them up).
- **Exit gate:** the love test (§2), run for real, twice, with two different friends.

### Phase 4 — Field-scan readiness (1 weekend)
The small features that turn the tool into an instrument: a **debate-first session template** (frame the question → optional Scout run → Advocate/Skeptic round → debrief, with a visible session clock); a **consent step** at session start (participants tick through the consent text, which is stored with `consent_ref`; recording indicator always visible); post-session **tagging view** — transcript with one-tap tags from `session_tags` for the analysis pass; a per-session **export bundle** including all floor/summon/tag events as JSON (the v1 format in §5, complete with `manifest.json` and `configuration_cell`). Recruit and run 1–2 pilot pairs (friends, not strangers) to shake out the protocol before spending real coffees.
- **Consent note:** consent and recording requirements must be researched for whatever jurisdiction and institutional context the sessions actually happen in — rules differ between NZ and elsewhere, between public cafés and university campuses (some universities restrict recruiting their students on campus without approval), and between in-person and online sessions. Since the app is fully online, sessions can be run from anywhere, which also means the applicable rules follow the participants, not just you. Write the consent form to the strictest standard you might later need (consent to record, to quote anonymously, and to publish aggregated findings) so nothing collected now is unusable later. This is a research task in the brief, not a solved item in this plan.
- **Exit gate:** one pilot pair completes the full protocol end-to-end, consent through export, without facilitator improvisation.

### Phase 5 — Ship it as OSS + run the scan (ongoing)
README in FundFlow style (summary, remix-on-Lovable link, demo video, dev setup, test docs); CLAUDE.md for contributors; demo mode seeded with a fictitious session and fixture agents; a 3-minute screen recording of a real session. Publish `BRIDGE_CREW_RESEARCH_BRIEF.md` in the repo *before* running the scan — the predictions must be public and timestamped before the data exists. The repo starts private; **flip it public before the first field-scan session** — a private repo's git history timestamps the predictions but does not publish them, so making the repo public is the publication event. Then run the ~10 field-scan sessions and write up the field-fit map (brief §7). Post to the local-first / DWeb communities.

## 7. Deployment targets and the development loop

Three targets, one codebase, and the development loop proven on FundFlow: build the basic functionality on Lovable → sync to GitHub → build local test infrastructure with Claude Code and advance development against it → return to Lovable for live tests with friendly participants → repeat. Each environment catches bugs the other can't: Lovable is fast at UI iteration, hosting, and fixing things in real time during an actual event; the local stack is where multi-participant coordination bugs die cheaply, before they burn a scheduled session with real people.

**Target 1 — Lovable-hosted (primary through the field scan).** The Lovable deployment (cloud Supabase + LiveKit Cloud) is what pilot pairs and field-scan participants use; sessions run from anywhere. All UI iteration happens here. Live tests with friendlies are the only way to evaluate what simulation can't touch: real STT accuracy on discipline jargon, barge-in feel, perceived agent latency, TTS voice quality — exactly the questions the Phase 1–3 exit gates ask.

**Target 2 — the local dev/test stack (stands up in Phase 0, grows every phase).** Port FundFlow's pattern wholesale:
- One idempotent `scripts/test-infra.sh` (FundFlow has the working original): local Supabase via the CLI (Docker/Colima), local `livekit-server --dev` as a native process, LiveKit keys wired into `supabase/.env.local` so edge functions can mint tokens, a token-mint verification step, `.env.test` generation, fixture seeding, and a matching `test-infra-stop.sh`.
- Hard cloud/local split: `npm run dev` = cloud, `npm run dev:local` = local, plus FundFlow's `assertNotProd` guard so simulations can never write `[SIM]` rows into the production project.
- Three test layers, as in FundFlow: Vitest unit tests; **headless simulated participants** (Actor classes owning anon-key Supabase clients that mirror exactly the writes the UI makes — FundFlow's `tests/simulation/` pattern); and Playwright E2E with two browser contexts and Chrome's fake-media flags. Playwright stays local-only regardless of what Lovable's testing story becomes — multi-context session tests need seeded fixtures and direct DB control that a hosted builder can't offer.
- Bridge Crew's simulation layer adds what FundFlow never needed: **fixture agents** (canned Scout results, scripted hand-raises and contributions) and a **typed-transcript injector** standing in for STT, so a full 2-human + N-agent session — summon → work → hand-raise → grant → barge-in → plan-doc update — runs deterministically in CI with no audio and no API keys. The Phase 2 floor-control property tests live here: the 1.5 s yield guarantee gets verified in simulation before any human tests it live.

**Target 3 — self-hosted, Ubuntu on a DigitalOcean droplet (on-demand, after the scan).** Built when someone actually wants to run the tool themselves more than once — and for a research instrument, that demand has a second source beyond scale: a collaborator running the powered study may face data-governance or ethics-review constraints that require participant recordings and transcripts to live on infrastructure their institution controls, not on Lovable/Supabase cloud. The path is the local stack made persistent: Supabase self-hosted via its docker-compose distribution, `livekit-server` with real keys, TURN, and TLS behind a reverse proxy (Caddy), the Vite build served statically, secrets in one env file. Deliverable is `docs/self-hosting.md` plus a `deploy/` compose file so others can duplicate the setup — written when the first real request arrives, not before.

**The portability rule that keeps all three targets one codebase:** every external service needs a local/free fallback or a self-hostable equivalent. STT: Web Speech API is per-client and free on all targets. TTS: browser `speechSynthesis` is a first-class fallback, not an afterthought — a droplet install must not require ElevenLabs or OpenAI keys to function. Models: demo mode runs entirely on canned fixture outputs with zero keys. LiveKit and Supabase both self-host. Edge functions stay plain TypeScript with no Lovable-specific dependencies (§9 pre-decides this). Any addition that violates this rule needs a written justification in this section first.

## 8. Orchestrator prompts (starting points)

**Global system frame (all agents):** you are a named crew member in a live session between two humans; you speak only when granted the floor; spoken turns are 1–10 conversational sentences, no lists, no headers; anything longer goes in your written brief; when the humans' intent is ambiguous or an assumption is load-bearing, ask them rather than assume — the humans are the source of truth for context, priorities, and constraints; end substantive turns by handing back ("that's the short version — want the detail on the stage?").

**Scribe:** maintain plan.md / decisions.md / open-questions.md from the rolling transcript; log a decision only when both humans have affirmed it (one proposing + one agreeing counts; one human musing does not); never delete an open question — resolve it with a pointer to the decision; if discussion has circled the same ground three times or is converging while ≥1 flagged open question is untouched, set your card state to `glow` with a one-line reason.

**Advocate/Skeptic pair:** you are one side of a two-sided exploration the humans asked for; your job is to strengthen the humans' thinking, not to win; each turn: at most one argument, then either a question to a human or a direct engagement with the other agent's last point; if you find yourself agreeing with the other side, say so and say what evidence moved you — collapse of the debate is a legitimate, reportable outcome. In field-scan sessions, treat the two humans as the domain experts: ask them to supply the field-specific context your arguments depend on, and flag explicitly when you are assuming something they haven't confirmed.

## 9. Risks and pre-decided answers

- **Web Speech API accuracy tanks a session** → glossary + spot-correct is the MVP answer; if it fails the Phase 1 gate, swap to Deepgram/Whisper streaming via LiveKit Agents (this is the known upgrade path, not a redesign — the transcript event schema doesn't change).
- **Latency makes agents feel dumb** → design the personality as thoughtful-colleague, not quick-witted-panelist; the hand-raise pattern absorbs 1–3 s round trips naturally because nobody expects instant speech from someone who raised their hand.
- **Lovable can't express the orchestrator cleanly** → keep edge functions in plain TypeScript with zero Lovable-specific dependencies (FundFlow already proved this split: Lovable for UI iteration, Claude Code for backend), so the orchestrator ports untouched to the local/self-hosted version.
- **Two-human coordination edge cases (both grant different agents, both redirect at once)** → last-write-wins with a visible toast ("Kev granted Scout"); do not build consensus mechanics for two people who are literally on a call together.
- **Cost creep from always-on Scribe** → debounce to one call per ~20 s of transcript, cheap model, and a per-session token budget indicator on the stage (you'll want this for open-source users anyway).
- **Field-scan recruiting is harder than expected (pairs, same field, willing, available)** → fall back gracefully: an expert + you as second human is a usable session in a weaker cell (note the configuration per session); online recruiting widens the pool beyond any one campus.
- **It's fun for you but not for friends** → that is a valid, valuable experiment outcome; the Phase 0 and Phase 3 gates exist to surface it for the price of weekends, not months.

## 10. First ten tasks (start here)

1. Fork the FundFlow scaffold shape into a new repo `bridge-crew` (Lovable project → GitHub sync, same toolchain: Vite/React/TS/Tailwind/shadcn, Vitest, Playwright, GPL-3, CLAUDE.md — this file lives in `docs/plans/`, `BRIDGE_CREW_RESEARCH_BRIEF.md` in `docs/research/`). *(Done 2026-08-15: repo created private at `richbodo/bridge-crew`.)*
2. Strip to a single-session skeleton: session create/join with FundFlow-style email-only login, two human roles, empty session page.
3. Add the schema from §5 via Supabase migrations; wire Realtime channels.
4. Build the session page layout: chat/transcript pane, agent-card rail (the "stations"), stage pane (tabs: Plan / Decisions / Open Questions / Corpus).
5. Implement the orchestrator edge function: consume typed messages, maintain rolling context, respond as the facilitator persona.
6. Implement `/research <topic>` → Scout lifecycle: summon confirm card → agents_state `working` with live task_progress → web+corpus run in agent-worker → `hand_raised` with summary line → grant → contribution (spoken-register summary + written brief on stage).
7. Implement the Scribe: debounced plan.md/decisions.md/open-questions.md maintenance + glow watchdog.
8. Implement `/debate <question>` → Advocate/Skeptic paired turns with the speech cap.
9. Demo mode: seeded fixture session, scripted fixture "second human," canned Scout results for offline dev — mirror FundFlow's `[DEMO]` pattern and randomize-login.
10. Playwright E2E: two contexts run the full scripted session end-to-end; then run the Phase 0 exit gate with a real friend.

---
*Plan drafted 2026-08-15 with Claude (Fable 5), from the [research synthesis](https://claude.ai/public/artifacts/1159dda9-7cd9-422d-bbc3-c1a3d1f655f4) and the [FundFlow](https://github.com/richbodo/launchpad-funding) reference architecture. Companion: `BRIDGE_CREW_RESEARCH_BRIEF.md`.*
*Revised 2026-08-16: pinned the export-bundle format (§5), added deployment targets and the development loop (§7), and the repo-goes-public publication note (Phase 5).*
