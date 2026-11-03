# Floor Control

How Bridge Crew decides who is talking, and how a human keeps hold of the room.

The rule underneath everything: **humans always have the floor.** A crew member may work,
may hail, and may speak when granted, but it never takes the floor, and it loses it the
moment a human sends a prompt.

The full description is in [state_machines.md](state_machines.md): the words, a state machine
for everything in a room that has a state, how a prompt is read, how the machines link, and
the rules that always hold. This page is the short version.

## In brief

- **A crew member** is always in one of four states: standing by (`idle`), `working`,
  hailing (`hand_raised`), or on the floor (`speaking`). The moves between them are one
  table, `CREW_MOVES` in `src/lib/machines.ts`, and the database refuses any other move
  (trigger `check_crew_move`).
- **A run** is one task by one crew member. Summoning a working crew member redirects it:
  the old run is superseded, and its late reply is kept as a brief but raises no hail.
- **A hail** belongs to exactly one run. It ends granted, declined (Not now), replaced (the
  crew member was summoned again) or withdrawn (it was stopped). A crew member has at most
  one open hail, and a grant speaks that hail's own contribution.
- **The floor** is held by at most one crew member. A grant while another holds it is
  refused, and the hail stays open.
- **Stop** (the Stand down button or `/stop`) works from any state: it supersedes the run,
  withdraws the hail and frees the floor.
- **The server** starts runs and Scribe updates, and fails any run that outlives the time
  limit, so a closed browser tab never strands a crew member.

## Where it lives

- `src/lib/machines.ts`: the transition table, and a pure model of a room that the explorer
  (`just flows`) walks to check the rules.
- `supabase/migrations/20261103080000_crew_machines.sql`: the trigger, the one-speaker and
  one-open-hail indexes, and the transitions as database functions (`start_run`,
  `finish_run`, `grant_hail`, `decline_hail`, `stop_crew`, …), each one atomic.
- `src/lib/room.server.ts`: reads prompts, runs crew members in the background, answers hails,
  and runs the Scribe.

## Persistence and audit

- `agents_state`: one row per crew member per room, with its state and current run.
- `runs`: one row per task, with its mode and how it ended.
- `hand_raises`: the hails, with `state` of `pending`, `granted`, `dismissed`, `replaced` or
  `withdrawn`.
- `contributions`: the spoken part and the written brief, and what happened to them.
- `floor_events`: an append-only log of every summon, redirect, hail, grant, Not now, stop,
  interruption and Scribe update, with who did it.

Realtime keeps both humans' views identical without refreshing.
