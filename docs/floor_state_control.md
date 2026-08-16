# Floor Control

How Bridge Crew decides who is talking, and how a human keeps hold of the room.

The rule underneath everything: **humans always have the floor.** An agent may
work, may ask, may speak when granted — but it never takes the floor, and it
loses it the instant a human types.

## Roles on the floor

- **Humans** (two, in the same room) — always free to speak. Typing is an
  implicit claim on the floor.
- **Agents** — Scribe, Scout, Advocate, Skeptic, Analyst. Each has exactly one
  status at a time and only one may hold the floor.

## Agent statuses

| Status | Label in the UI | Meaning |
| --- | --- | --- |
| `idle` | standing by | Not engaged. Available. |
| `working` | working | Has a brief, thinking/writing. Silent in the room. |
| `hand_raised` | hailing | Finished; has a one-line summary and wants the floor. |
| `speaking` | on the floor | Granted; its spoken turn is posted to the transcript. |
| `stopped` | stood down | Told to halt by a human. Any in-flight work is abandoned. |

## The state machine

```text
                 summon / redirect
        ┌──────────────────────────────┐
        v                              │
     ┌──────┐   summon    ┌─────────┐  │  raise    ┌─────────────┐
     │ idle │ ──────────► │ working │ ───────────► │ hand_raised │
     └──────┘             └─────────┘             └─────────────┘
        ^  ^                   │                        │   │
        │  │ finish            │ dismiss                │   │ dismiss ("Not now")
        │  └───────────────────┴────────────────────────┘   │
        │                                                   │ grant
        │                     ┌──────────┐                  │
        └──────────────────── │ speaking │ ◄────────────────┘
           finish /           └──────────┘
           human_speaks

     any state ── stop ──► stopped ── summon ──► working
```

Legal transitions (`src/lib/floor.ts`, `ALLOWED`):

- `idle → working | stopped`
- `working → hand_raised | idle | stopped`
- `hand_raised → speaking | idle | stopped`
- `speaking → idle | stopped`
- `stopped → working | idle`

Anything else is refused; the reducer returns the state unchanged rather than
throwing, so an illegal event is a no-op, never a corrupt room.

### Actions

| Action | Effect | Refused when |
| --- | --- | --- |
| `summon` | Engage an agent with a brief → `working` | agent is `speaking` |
| `progress` | Heartbeat while `working`; no status change | — |
| `raise` | Agent finishes and hails → `hand_raised` | not `working` |
| `grant` | Human gives the floor → `speaking` | agent is not `hand_raised`, or someone else is already speaking |
| `finish` | Spoken turn ends → `idle` | — |
| `dismiss` | "Not now" on a hail → `idle` | — |
| `stop` | Human stands the agent down → `stopped` | — |
| `human_speaks` | Whoever is speaking drops to `idle` | no one is speaking |

### Invariants

1. **Exclusivity.** At most one agent is `speaking`. A `grant` while another
   agent holds the floor is refused, and the second hail stays queued as
   `hand_raised`.
2. **No self-service.** An agent can only reach `speaking` via a human `grant`
   from `hand_raised`. There is no path `working → speaking`.
3. **Human preemption.** `human_speaks` always wins. Posting a line clears any
   speaking agent back to `idle` before the line lands.
4. **Stop is universal.** `stop` is reachable from every state.

These are covered by unit tests in `src/lib/__tests__/floor.test.ts`.

## How it maps to the UX

### Engaging the crew

Three equivalent doors, all producing a `summon`:

1. **Slash commands** in the composer — `/research <topic>`, `/analyze <thing>`,
   `/debate <question>` (Advocate + Skeptic together), `/scout …`,
   `/stop <agent>`, `/redirect <agent> <new brief>`.
2. **@mentions in plain speech** — "@advocate and @skeptic, take another pass at
   the encryption tradeoff" engages both, using that line as their brief.
   Mentions are parsed in order and de-duplicated.
3. **Station cards** — each card has **Engage** (idle) or **Redirect** (active),
   opening an inline brief box; active stations also show **Stand down**.

### While working

The station card shows the current task, a pulsing dot, and any progress note.
Nothing an agent does while `working` appears in the transcript — the room stays
quiet until the floor is granted.

### Hailing

When an agent finishes, it does not speak. It writes the full brief to
`contributions` and raises a hand with a **one-line summary**. That summary
appears in the **Hails** queue with two buttons:

- **Grant the floor** → `grant`. The agent's spoken turn (capped at ten
  sentences) is posted to the transcript; the written brief stays linked to it
  and is expandable in the chat pane.
- **Not now** → `dismiss`. The hail is closed, the agent returns to `idle`, and
  the written brief remains available without ever being read aloud.

If someone else is already on the floor, granting is refused and the hail stays
in the queue.

### Preemption

Any human line calls `human_speaks` first: a speaking agent is cut back to
`idle` immediately. Humans never wait, and never need to interrupt politely.

### Standing down

**Stand down** on a card, or `/stop <agent>`, moves the agent to `stopped`. Its
work is abandoned rather than queued. A later summon revives it into `working`.

## Persistence and audit

- `agents_state` — one row per agent per session, holding status, current task
  and progress.
- `hand_raises` — the hail queue, with `state` of `pending`, `granted` or
  `dismissed`.
- `contributions` — the split between the short spoken turn and the full written
  brief.
- `floor_events` — an append-only log of grants, dismissals and preemptions, so
  a session's floor history can be replayed afterwards.

All four are watched over Realtime, so both humans see identical status,
identical hails, and identical transcript ordering without refreshing.
