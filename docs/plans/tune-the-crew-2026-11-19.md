# Tune the crew

### Changing what each crew member is told, from inside the app

The crew's behaviour comes from instructions written in the code: each job's paragraph in
`src/lib/templates/`, the rules every crew member follows, and the context packs they read.
Tuning that, for example asking the Storyteller for a 100-word summary of each story it offers,
meant editing code, or a per-room workaround through **Context** and **Reassign** that few people
would find. This plan adds a **Tune the crew** page where whoever runs the studio can change
the instructions for every room of a kind on that computer.

The words for the room (crew member, run, hail, made thing) are in
[`docs/state_machines.md`](../state_machines.md).

**Status:** built 2026-11-19, with the three choices below as recommended.

## What a crew member is told

A run's instructions (its system prompt) are put together from these parts, in this order:

1. **Its job**: one paragraph per job, such as the Storyteller's. Editable.
2. **Notes for every crew member**: one box per kind of room. Editable, empty to start.
3. **The setting**: the Game Studio's rules for young people, or Deliberation's one line.
   Locked.
4. **How every crew member works and replies**: it never interrupts, and it replies with a
   SPOKEN part and a BRIEF part, which the app reads to make the hail. Locked.
5. **How it hands over what it makes**: versions, pictures, sounds, music and tests, in the
   blocks the app reads. Locked.
6. **Suggesting another crew member** (Game Studio): the ASK block. Locked.

Then, as the run's message rather than its instructions, it reads its context packs, the
shared document, the game so far, the crew's work, the conversation and its task.

The Scribe's instructions for keeping the shared document (`game.md`, `plan.md`) are separate,
and editable as one paragraph.

## The choices

1. **What can be edited: each job's paragraph, the crew-wide notes and the Scribe's
   instructions.** The setting and the reply formats are shown, but locked: the app reads the
   formats, so an edit there could stop hails working, and the setting holds the rules for young
   people.
2. **Who can open it: anyone signed in on that computer, from the lobby only.** It's linked
   from each kind of room's page in the lobby, never from inside a room. The student shares the
   teacher's sign-in, so they could open it, but lessons are supervised and the locked parts
   can't be changed. A teacher's passcode can come later if it's needed.
3. **How tuning moves between computers: a file.** The page marks what differs from the
   original and can **Export** it as a file; **Import** on another computer loads it. Changes
   that work well become the defaults in the code, in a pull request, so every teacher gets
   them.

## How it works

- **Where it's kept.** The `crew_tuning` table holds one row per changed part: a kind of room,
  a part (`duty:<job>`, `notes` or `doc`) and its text. No row means the original. It isn't per
  room or per person: everyone signed in on this computer sees and changes the same tuning, which
  fits an app that runs on one laptop. A shared server would need roles before it had this page.
- **When it applies.** From the next run, in every room of that kind, including rooms already
  open. A room's **Reassign** still changes one crew member in one room, on top of the tuning.
- **What's recorded.** Each run keeps the full instructions it was given (`runs.instructions`),
  so a reply can be traced to the instructions that produced it. The Scribe's updates of the
  shared document aren't runs, so they aren't recorded.
- **Reassign.** Its duty box used to start from the card's one-line description, and saving
  replaced the real instructions with it. It now starts from the job's paragraph as tuned, and
  saving it unchanged leaves the room following the tuning. A room whose duty is exactly that
  one-line description, left by the old box, is treated as having none.
- **Limits.** Each part is at most 4,000 characters. An imported file must be for the same kind
  of room; jobs it names that the room doesn't have are skipped, and the page says so.

## Not in this plan

- Tuning the Tester's playtest steps or the Engineer's build tools: they're code, not
  instructions.
- Per-room tuning beyond **Reassign** and session context packs.
- A history of tuning changes: the runs keep what each one was told, which covers research.
