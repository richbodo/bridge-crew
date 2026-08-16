# Phase 0 — Text Party Line

Goal from the plan doc: the full interaction grammar with zero audio/video. Two humans type in a shared session room, summon agents by command, agents work in the background, raise a hand, get granted a turn, speak a short summary with an expandable brief, and a Scribe keeps a living plan document. Exit gate: 30 minutes of typing with a friend on a real problem, and it's already a little bit fun.

## Stack note (one deviation from the plan doc)

The plan doc assumes Supabase Edge Functions for the orchestrator, agent-worker, tts, and scribe. This project is on TanStack Start, where server-side logic runs as server functions and API routes in the same repo instead. Everything else — Postgres, Realtime, Storage, auth, RLS — is the same backend, enabled through Lovable Cloud. Agent LLM calls go through the built-in AI gateway (Gemini/GPT models, no API key setup) rather than a direct Anthropic call; the agent brief/response shape stays model-agnostic so swapping providers later is a config change.

## What gets built

**1. Backend foundation**
- Enable Lovable Cloud (Postgres + Realtime + Storage + auth).
- Migration for the Phase 0 slice of the §5 data model: `sessions`, `participants`, `transcript`, `agents_state`, `hand_raises`, `summons`, `contributions`, `stage_docs`, `floor_events`. Later-phase tables (`session_tags`, glossary/consent columns) are created now as columns/tables where free, so Phase 4 doesn't need a rewrite.
- RLS: a session is readable/writable by its participants; join by session code.
- Anonymous-friendly auth so a friend joins with a link and a display name.

**2. The room UI (`/session/$id`)**
- Left: typed chat pane — human turns and orchestrator system lines, live via Realtime.
- Center-right: agent cards (Scribe always present; Scout / Advocate / Skeptic / Analyst when summoned) showing status (idle, working, hand raised, speaking), current task, partial progress, with Stop and Redirect buttons.
- Hand-raise queue with a one-line "what I've got" summary and Grant / Dismiss for either human.
- Contributions render as a short spoken-register summary (1–10 sentences, no lists) with an expandable full brief.
- Right rail: the living `plan.md` pane, updating as the Scribe writes.
- Lobby at `/` : create a session, or join by code, pick a display name and color.

**3. Orchestrator (server functions)**
- Summon parser for typed commands: `/research <topic>`, `/debate <question>`, `/analyze <thing>`, `/stop <agent>`, `/redirect <agent> <new brief>`. Pure function, unit tested.
- Floor / hand-raise state machine: agents only ever move idle → working → hand_raised → speaking → idle, grants are exclusive, humans always preempt. Pure module, unit tested (this is the piece Phase 2 hardens with real audio, so it gets built properly now).
- Agent runner: takes a brief, streams an LLM call, writes progress to the agent card, raises a hand on completion with a summary line, and writes the full brief to `contributions`.
- Scout gets a real research run (web search tool + session corpus text); Advocate/Skeptic get opposing briefs; Analyst does a single deep written-first call.
- Scribe runs on a debounced transcript window and merges into `plan.md` / `decisions.md` / `open-questions.md` in Storage.
- Speech-cap enforcement: spoken layer is truncated to the cap and the remainder goes to the written brief — enforced now in text so Phase 2 inherits it.

**4. Demo mode**
- A fixture session with two scripted humans and canned agent runs, so the room can be shown and Playwright-tested without live LLM calls or a second person.

**5. Tests**
- Unit: summon parsing, floor/hand-raise state machine, speech-cap enforcement.
- Playwright: two browser contexts complete a scripted session — summon → work → hand-raise → grant → contribution → plan doc updated.

## Design direction

Crew-station feel, original naming: dark instrument-panel surface, one accent per agent, cards that read like stations rather than chat bubbles. Hand-raises are "hails"; expanding a brief is "on screen". No franchise references.

## Build order

1. Cloud + migration + RLS
2. Lobby, session create/join, presence, typed chat over Realtime
3. Agent cards + floor/hand-raise state machine (with fake agents)
4. Real agent runs (Scout, Advocate/Skeptic, Analyst) + summon parser
5. Scribe + living plan pane
6. Demo mode, unit tests, Playwright scripted session

Steps 1–3 are the frame; the exit gate can't be run until 4–5 land.

## Out of scope for Phase 0

LiveKit video, STT, TTS, barge-in/ducking, glossary, consent step, tagging view, export bundle. Those are Phases 1–4.
