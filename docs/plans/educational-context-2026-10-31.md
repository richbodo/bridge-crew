# Add features for educational context

### A Game Studio room template for one teacher and one student

This plan is for teachers who run one-on-one sessions in which a student aged 13 or over makes
their first playable browser game with AI, on the teacher's laptop. Often the teacher plans the
game with the student on paper and in documents, then feeds the result into an AI coding tool to
get it running. It works, and students love it.

This plan makes Bridge Crew the studio for that session. A **Game Studio room template** recasts
the crew as the jobs of a pre-AI game studio. The student is the producer: they direct the crew,
ask it for help, and decide what goes into the game. The teacher guides, and the game plays on the
room's big screen.

The floor rule underneath doesn't change. Crew members work quietly, hail when they have
something, and nobody speaks until the student grants it. That rule is what makes the room good
for teaching: the student has to ask, chooses when to listen, and is never talked over.

Every state change in the room is drawn in [`docs/state_machines.md`](../state_machines.md),
which also defines the words this plan uses: crew member, run, hail, floor, grant and the rest.
That covers the crew, its runs, the hails and the floor, plus everything this plan adds. Drawing
the machines found sixteen problems in today's code (Part 2), and fixing them comes first in the
build.

The design targets that one setting: one teacher, one student and one laptop. The Deliberation
room (today's crew, for two adults) keeps working, and its research brief is unchanged.

## Decisions

**Settled:**

- **Templates.** Room templates, not a fork. Today's crew becomes the **Deliberation** template,
  and **Game Studio** is the second.
- **Roster.** It's configurable. Game Studio has six jobs: Storyteller, Game designer, Artist
  (art director and artist in one, for now), Sound designer, Engineer and Tester. There's no
  Producer, because the student is the producer.
- **`game.md`.** The Scribe keeps it, in the background. It isn't on the roster, nobody can call
  on it, and it never hails. It writes down only what the student granted and what the people
  said, and it writes the wrap-up.
- **Words.** The AI characters are **crew members** (agents, in the code), and a request to speak
  is a **hail**, never a hand. The full list is in Section 1 of `docs/state_machines.md`.
- **Crew members start Idle** and work only when summoned. Listening may come later.
- **One open hail per crew member.** A new summon replaces it, and its brief stays readable.
- **Crew members suggest, and the student decides.** A proposal starts work only when the
  student says Yes.
- **Nothing goes into the game until the student says yes.**
- **Asking for help.** There are two send buttons, **Send** and **Ask for help**. How did you do
  that? always asks for help.
- **Context.** Be generous: every crew member sees the whole room (F9).
- **Ages.** Students are 13 and over.
- **Accounts.** During development and trials, the project's own Anthropic account pays for the
  crew's calls. A teacher or organisation that adopts Bridge Crew runs its own copy, with its own
  Anthropic account and API key.
- **Builds, art and sound.** Each version is one self-contained HTML file, written through the
  Anthropic API. It doesn't use Claude Code or the Agent SDK, which would put a shell on the
  teacher's laptop within reach of a typed request. Art is SVG, so no new provider sees the
  student's words, and sound is [ZzFX](https://github.com/KilledByAPixel/ZzFX), an MIT-licensed
  synth under 1 KB. That's enough for now, although games will outgrow one file one day.
- **Huddles** are one model call that speaks as each convened job in turn. Every crew member sees
  the same room (F9), so the jobs differ only in their duty prompts, and one call can hold them
  all.
- **Rooms last.** A room can be used for many sessions. Wrap up ends one and Reopen starts the
  next, so a student can carry on with the same game next week.
- **Sharing games.** The family gets the game as a file, which the teacher emails. Hosting comes
  later.
- **Guardrails and cultural safety** are the teacher's to set, using the norms they already
  follow for content, pace, sensory load, and cultural safety for Māori and Pacific students. The
  app keeps its defaults conservative, and the teacher can adjust the context pack, the duty
  prompts and the roster. Both topics also go to the pre-launch legal discussion.
- **The captain's log** is the room's record of everything, in order (Part 7).
- **Seating.** One teacher, one student and one laptop. Never two students or two adults in this
  template.
- **Games.** They're browser games, built on the teacher's laptop, saved to its disk, and
  played inside the room.
- **On screen / Off screen.** This switches between the bridge and the big screen.
- **Not now:** choice cards, teacher prompt cards, kid mode and class sign-in.
- **Help-seeking.** It stays simple: the teacher's guide explains it and the teacher drives it.
- **Law and research.** New Zealand only, and for classroom use only. Research needs a
  qualified research team overseeing it. The Cook Islands can wait until someone wants to use it
  there.
- **No dates.** The phases are in order, not on a calendar.

**Testing before any student:**

- **Developer review: done.** We tried today's app, and the first charts were hard to follow, so
  they were redrawn from the words up as `docs/state_machines.md` (Part 1).
- **First test.** Once Phases 0–3 are built, the project lead tries the Game Studio alone.
- **Build and test rounds.** Then the first teacher and another developer join, for a few rounds
  of building and testing.
- **Pre-launch.** Once everything is built: a dress rehearsal, then a pre-launch discussion that
  chooses a legal adviser and works through Part 9. No session with a student happens before
  that.

**Assumptions to confirm or change:**

1. **No student account.** The teacher signs in, and the student is a named speaker on the
   teacher's seat, under a nickname.
2. **Voice.** Testing and the first sessions use the laptop's built-in dictation. A push-to-talk
   button comes later.
3. **Order.** Reply and How did you do that? come in Phase 3, so they're in the first test. Ask
   for help, proposals and huddles follow in Phase 4, shaped by that testing.
4. **Recipe name.** `just game-studio`, because `just studio` already opens Supabase Studio.
5. **Spoken parts.** They're capped at three sentences in Game Studio. Deliberation stays at ten.

## A session in the Game Studio

This is what a session looks like once every phase is done. The student is "Sam".

1. The teacher runs `just game-studio`, opens a Game Studio room, reads the classroom notice,
   and enters the student's nickname. A switch beside the message box shows who's talking: Sam
   or the teacher.
2. The teacher asks out loud, "What's the story?" Sam types, or dictates, "a mole who digs tunnels
   to find gems". In the background, the Scribe starts `game.md`.
3. Sam: "Storyteller, why does the mole need gems?" The Storyteller works quietly, then hails:
   "Three reasons the mole might need gems." Sam grants it and reads three sentences. The full
   ideas are in the brief.
4. Sam: "Artist, draw the mole." The Artist hails with an SVG mole. Sam grants it and says "on
   screen", and the mole fills the big screen. "Off screen" brings back the bridge.
5. Sam: "Engineer, make the mole dig left and right with the arrow keys." The Engineer hails with
   version 1. Sam grants it and plays it on screen.
6. Sam presses **How did you do that?** on the Engineer's contribution. The Engineer explains, at
   Sam's level, the bit of code that makes the mole dig, and puts it on screen.
7. The tunnels don't help find the gems. Sam types "Game designer, the tunnels don't help me find
   the gems" and presses **Ask for help**.
   - It's a help request, so the Game designer starts with a question: what should finding a gem
     feel like?
   - Sam answers with **Reply**. The Game designer's next contribution carries a proposal: "Shall
     we bring in the Artist and the Engineer?" Sam says Yes.
   - The three hold a huddle, and one hail comes back with ideas and two questions for Sam.
8. Sam: "Tester, check version 3." The Tester lists things to try, and Sam plays them. Anything
   that breaks goes into the Bugs section of `game.md`, and the Tester proposes handing it to
   the Engineer.
9. The teacher presses **Wrap up**. The Scribe writes the main points into the Session notes, the
   captain's log shows what happened in order, and the game is in the games folder on disk. Next
   week the teacher reopens the room, and Sam carries on.

The crew only hears what's typed or dictated, so anything the teacher says out loud stays
between the teacher and Sam. The teacher switches the speaker and types when the crew should hear
it. Sam will often ask the teacher first, and that counts as asking for help too.

## Part 1: The state machines

[`docs/state_machines.md`](../state_machines.md) holds every state in the room, in this order:

- the words;
- one machine for each thing that has a state;
- how a prompt is read;
- how the machines link;
- the rules that always hold;
- where today's code differs.

It's the reference for this plan, for the tests and for the guides. Keep it in step with the
code: a change to a state or a transition updates that document in the same commit.

| Thing       | States                                       | New in this plan?                      |
| ----------- | -------------------------------------------- | -------------------------------------- |
| Crew member | Idle, Working, Hailing, Speaking             | No (Stopped merges into Idle)          |
| Run         | Running, Finished, Failed, Superseded        | It gets a record and an ID (F3)        |
| Hail        | Open, Granted, Declined, Replaced, Withdrawn | Replaced and Withdrawn are new         |
| Floor       | Free, Held                                   | No                                     |
| Proposal    | Open, Accepted, Declined, Lapsed             | Yes (Part 6)                           |
| Made thing  | Waiting, Used, Not used                      | Yes (Part 5)                           |
| Scribe      | Idle, Updating, Behind                       | It moves to the server (F10)           |
| Screen      | Off screen, On screen, Full screen           | Yes (Part 4)                           |
| Room        | Open, Wrapped up                             | Yes (Part 7)                           |

### Tests from the machines

Section numbers here refer to `docs/state_machines.md`.

- **Unit tests.** There's one for each row of the link table (Section 13).
- **The explorer.** `src/lib/flows/` models the machines as pure transitions. A test tries every
  sequence of events up to a set length, with two crew members (enough, by symmetry), and checks
  the rules in Section 14. A broken rule comes back as the shortest sequence of events that
  breaks it, which becomes a regression test. `just flows` runs it.
- **Phase 0 vs Phase 1.** In Phase 0 the model copies today's server, so it reproduces the
  findings in Part 2. In Phase 1 the server runs the same transitions, so the explorer tests what
  actually runs.

## Part 2: Protocol fixes

These fix the Deliberation room too, so they ship before any template work. Each row names the
problem, meaning what goes wrong for the people in the room, and then the fix.

| ID  | Problem | Fix |
| --- | --- | --- |
| F1  | The crew member machine exists twice. `src/lib/floor.ts` is tested but only its tests use it. The server writes states directly and checks the rules only on a grant. So the tests pass while the app can break the rules. | One transition table, used by the server, the tests and the database (F15). |
| F2  | Summoning a crew member whose hail is open leaves that hail open, pointing at old work. Granting it later fails (F7). | The hail ends as Replaced. Its brief stays readable. |
| F3  | A redirect doesn't end the first run. Both runs finish and both hail, so the student hears an answer to a question they've taken back. | Every run gets a record and an ID. A redirect supersedes the first run, whose result is kept as a brief but raises no hail. |
| F4  | A grant speaks the crew member's newest contribution, not the one its hail summarised. The student can hear something other than what they agreed to hear. | A hail records its run, and a grant speaks that run's spoken part. |
| F5  | Not now on an old hail can send a crew member that's working on something newer back to Idle. Its newer run then hails from Idle, which the rules don't allow. | Fixing F2 removes old hails. Not now changes a crew member only if the hail is its open one. |
| F6  | The Stand down button and `/stop` do different things: the button leaves the hail open. | One stop, which ends the hail as Withdrawn. |
| F7  | An old hail can't be granted, and the error blames the floor: "Someone else has the floor right now." | F2–F6 remove old hails, and every refusal names its real reason. |
| F8  | *A note for later, not a problem today.* In text, Speaking lasts milliseconds, so "interrupted" and "floor busy" never happen. They will once crew members talk aloud. | The machines and the explorer already cover both. |
| F9  | Crew members don't see their own earlier briefs, or any declined work. They can forget what they made, then repeat it or contradict it. | Be generous. Every crew member sees the whole room: the transcript, `game.md`, every brief with what happened to it, the current version, and the pictures and sounds in use. The games are small, so it all fits. Trim it later if it gets too big. |
| F10 | The browser tab that sent a summon drives the run and the Scribe. Closing the tab at the wrong moment leaves a crew member Working forever. Each tab counts prompts for the Scribe separately, so two Scribe updates can overwrite each other. | The server starts runs and Scribe updates. A time limit ends stuck runs, and only one Scribe update runs at a time. |
| F11 | Send greys out while crew members work (Enter still sends). That tells the student to wait, which is the opposite of the floor rule. | Send never greys out. A separate "crew at work" indicator shows instead. |
| F12 | A renamed crew member is summoned by its name anywhere in a prompt, even without `@`. Name one "Sound", and "the sound is too loud" summons it. | Summon by `@Name` anywhere, or by name at the start of a prompt ("Artist, …"). |
| F13 | The log records only grants and dismissals, so it can't show what happened. | Log every event in the link table, which makes it the captain's log (Part 7). |
| F14 | Nothing limits how many people are in a room. | The template sets the seats: one for Game Studio, two for Deliberation. This one ships in Phase 2, with templates. |
| F15 | Any room member's browser can write any crew member's state straight into the database, skipping the rules. | The database refuses illegal moves. A trigger checks the same transition table. Partial unique indexes allow one crew member on the floor per room and one open hail per crew member. A test keeps the SQL and TypeScript tables identical. |
| F16 | A Scribe update sets the Scribe crew member to Working and then Idle, whatever it was doing. In Deliberation, a Scribe that was Hailing or Working on a summon loses that state. | Scribe updates get their own machine (Section 9) and never touch a crew member's state. |

Tests:
- unit tests for the transition table;
- the explorer passing every rule in Section 14 of `docs/state_machines.md`;
- end-to-end tests for redirect, stop, an old hail, a tab closed mid-run, and a Scribe update while
  the Scribe is hailing.

## Part 3: Room templates and a configurable roster

A template is a typed definition in `src/lib/templates/`. `deliberation.ts` holds today's crew,
and `game-studio.ts` is new. A template sets:

- its name, description and theme labels;
- the roster: each job's key, name, colour, one-line blurb, duty prompt, what it makes (text, a
  version, a picture, a sound or a test plan), and its model and effort;
- the shared document's file name and sections, and when the Scribe updates it;
- the spoken-part cap;
- the seats: two sign-ins, or one shared seat with a teacher speaker and a student speaker;
- the default context packs;
- the notice shown when a room opens, if any;
- huddle limits, and who leads a "Team" huddle;
- slash commands (Deliberation keeps `/research`, `/analyze` and `/debate`).

### The Game Studio roster

| Job | In a studio | Makes here | Ask things like |
| --- | --- | --- | --- |
| Storyteller | writes the story and characters | story ideas, characters, dialogue | "Why does the mole need gems?" |
| Game designer | decides what you do and how you win; leads "Team" huddles | rules, levels, challenge | "How do I make it harder?" |
| Artist | decides the look, then draws it | SVG characters, items and backgrounds; a style guide | "Draw the mole." |
| Sound designer | makes every sound | named sound effects with play buttons | "Make a digging sound." |
| Engineer | builds the game | a new playable version | "Make the mole dig with the arrow keys." |
| Tester | plays it to find what breaks | things to try, bug notes | "Check version 3." |

Every Game Studio duty prompt also says:
- the student runs the studio: build on their idea, and ask before changing it;
- in help mode, check what the student wants first, then offer choices rather than doing it;
- suggest other jobs as proposals, and never start their work;
- use short, concrete, literal sentences, with no idioms or sarcasm;
- keep everything suitable for a student aged 13 or over;
- say plainly that it's an AI character, and never pretend to be a person;
- never describe or judge the student as a person: no notes on diagnosis, behaviour or ability;
- when unsure what the student wants, ask.

The `game-studio` context pack (`docs/context/game-studio/`) covers the jobs of a pre-AI studio
(the full department list from the brainstorm), how work moves between them, and how to talk
with the student.

### `game.md` and the Scribe

- **Sections:** The idea · Story · Characters · How to play · Look · Sounds · Levels · Bugs ·
  Next · Session notes.
- **When it updates.** The Scribe updates `game.md` after each grant, after every fourth prompt,
  and at wrap-up, one update at a time (Section 9 of `docs/state_machines.md`).
- **What it uses.** It writes from the people's prompts and from granted contributions only, so
  `game.md` holds what the student said yes to. The Engineer builds from it.
- **Model.** It uses a fast model, Claude Haiku at low effort, as today.
- **In Deliberation** the Scribe stays on the roster as a crew member too, but its updates stop
  touching its crew member state (F16).

### The shared seat

The teacher signs in once. A switch beside the message box sets who's talking: the student's
nickname, or the teacher. Each prompt records its speaker and their role, so crew members see
"Sam (student)" and the teacher's name marked "(teacher)". Button presses (grant, on screen, Yes) are credited to
whoever the switch shows. The student has no account and no email.

### Schema

- `sessions.template` (text), `sessions.state` (`open` or `wrapped_up`), and `sessions.settings`
  (jsonb: seat names, and what the big screen shows).
- **Job keys** become text instead of the five-value `agent_kind` enum. This affects
  `agents_state`, `summons`, `hand_raises`, `contributions` and `transcript`, and existing rows
  convert unchanged.
- **`runs` (new):** ID, crew member, task, mode (`direct` or `help`), state, start and end times,
  and what superseded it. Hails and contributions point to their run.
- **Hail states:** `hand_raises.state` gains `replaced` and `withdrawn`.
- **`proposals` (new):** what it suggests (a summon or a huddle), the job and task, where it came
  from (a contribution, or the room), and its state.
- **`made_things` (new):** versions, pictures and sounds in one table, each with its state
  (`waiting`, `used`, `not_used` or `removed`).
- **`contributions.ask` and `contributions.removes`:** a crew member's suggestion and the things
  it removes, which take effect only if its hail is granted.
- **`transcript.speaker_role`:** `teacher`, `student` or null.
- **`floor_events` widens** to every event in the link table, and becomes the captain's log.
- **Delete room** removes the room's rows and its games folder.
- Then run `bun run db:types`.

The lobby's **Open a room** gains a template picker, with Deliberation as the default.
`just game-studio` starts demo mode with Game Studio selected.

## Part 4: On screen, off screen

One room has two views:

- **The bridge** is today's three columns: the conversation; the hails and crew; and the shared
  document.
- **The big screen** shows one thing at a time, large: the current version (playable), a picture,
  the sound board, an explanation from How did you do that?, or a brief. A slim strip sits below
  it with:
  - the message box, both send buttons, and the speaker switch;
  - the number of open hails, with Grant and Not now for the newest;
  - a picker for what's showing;
  - Full screen and Off screen.

Switching views:

- **Buttons.** On screen appears on anything with something to show, and in the header. Off
  screen is on the strip.
- **Words.** A prompt that is just "on screen" or "off screen" switches the view. Case and a
  trailing full stop are ignored, since dictation adds one. "On screen" shows the newest thing.
  The switch goes into the captain's log but not the transcript.
- **Full screen.** This uses the browser's full-screen mode, and Esc comes back.

Rules (Section 10 of `docs/state_machines.md`):

- The big screen never changes the crew, the hails or the floor. Hails still arrive, grants work
  from the strip, and a prompt still interrupts.
- What's showing is saved with the room, so it survives a reload.
- The big screen changes only when someone asks.
- Today's **On screen / Clear screen** links, which expand a brief in the chat, become **Show
  detail / Hide detail**, so "on screen" means only one thing.
- The bridge-and-big-screen idea is generic, and the look stays original, per the master plan's
  naming rule.

## Part 5: Making the game: versions, pictures, sounds and tests

**Nothing goes into the game until the student says yes.** Every made thing is saved the moment
its run finishes, but it's only used once its hail is granted, or when the student picks it later
with **Use this** (Section 8 of `docs/state_machines.md`).

**Engineer**

- Each version is one self-contained HTML file: inline script and style, canvas or DOM, and no
  network access. The only outside code is ZzFX, inlined into the file.
- The Engineer starts from the current version, `game.md`, and the used pictures and sounds by
  name. It returns a complete new file, plus a few spoken sentences on what changed.
- Versions are stored in the `made_things` table and written to
  `$BRIDGE_CREW_GAMES_DIR/<code>-<title>/v<N>.html`, with `index.html` as the current version.
  The folder defaults to `~/Bridge Crew Games` and can be changed in `.env.local`. Nothing is
  overwritten, and any version can go back on screen.
- The game runs in a sandboxed frame:
  - scripts are allowed, but without same-origin access, so the game can't read the room's
    sign-in;
  - a content security policy blocks the network;
  - a small injected script reports crashes, and the room posts "Version 3 crashed: …" with a
    proposal: "Ask the Engineer to fix it?"
- Build calls stream, with a larger output limit than today's 16,000 tokens. The dress rehearsal
  measures how long they take and what they cost.

**Artist**

- Each request produces one SVG (a character, item or background), stored as a made thing under
  a name such as "mole". It comes with the hail and can go on screen.
- SVG renders through an `<img>`, which doesn't run scripts.
- The Engineer gets pictures by name.
- The Artist also keeps a short style guide in the Look section, which is the art-director half
  of the job.

**Sound designer**

- Each sound effect is a named ZzFX parameter list, stored as a made thing with a play button.
- Nothing autoplays, and volume is capped.
- The Engineer inlines ZzFX and the sounds into the game.

**Tester**

- Reads `game.md` and the current version, writes a list of things to try, and coaches the
  student through playing them.
- Anything that breaks goes into the Bugs section, with a proposal to hand it to the Engineer
  (Part 6).
- An automated headless smoke test is a later option.

**Storyteller and Game designer** produce text, as today's crew does.

**Sharing the game**

- The family gets the game as a file. Each version is one HTML file that opens in any browser,
  even offline. A **Download** button on each version saves its file, and the teacher emails it
  to the family. The current version is also `index.html` in the room's games folder, which
  `just games` opens.
- Hosting games online comes later.

**Models.** Today every crew call uses Claude Opus 5.5 at medium effort. The template sets a model
and effort per job, so quick text jobs can use a faster model and builds the strongest. The dress
rehearsal's timings decide which. The template also sets two safety switches (Part 9):

- Game Studio turns off the API's refusal fallback, so a declined request stays declined instead
  of going to another model.
- It can also pin inference to the US with `inference_geo`.

## Part 6: Help flows

Each help flow is another way for the student to start a crew member's run. None of them adds a
crew member state. The words are defined in Section 1 of `docs/state_machines.md`.

| Flow | What the student does | What happens |
| --- | --- | --- |
| **Direct** | Types an instruction and presses **Send**. | A summon in direct mode: the crew member does it. |
| **Ask for help** | Types a problem and presses **Ask for help**. | A summon in help mode. The crew member checks what the student wants first, and may answer with a question. Then it offers ideas or choices. It changes nothing in the game unless asked, and it may propose a huddle. If the prompt names no one, the room asks who to ask: a job, or the team. |
| **Reply** | Presses **Reply** on any contribution, types, and sends. | A summon to that crew member, linked to the contribution it answers. |
| **How did you do that?** | Presses it on any contribution. Nothing to type. | A summon in help mode. The crew member explains how it made that contribution, at the student's level, with the relevant part on screen (this needs F9). Explaining never changes the game. |
| **Proposal** | Says **Yes** or **No thanks** to a suggestion attached to a contribution. | Yes starts the suggested summon or huddle in the student's name. Crew members never start each other's work. |
| **Huddle** | Names two or more crew members ("Artist and Engineer, …"), starts with "Team, …", or says Yes to a huddle proposal. | The lead runs one model call that speaks as each convened job in turn, for one round. It ends with a short summary, ideas and questions for the student. One hail, the lead's, carries the huddle, and the discussion is its brief. The lead is the first job named; for "Team", it's the Game designer. |

- **Why the mode is recorded.** The captain's log shows when the student asked for help, and how.
  Pressing Ask for help is itself the help-seeking act, so it's visible to the student and the
  teacher. The log records actions, never judgements about the student.
- **Limits.** A huddle has one round and can include the whole roster. The template can change
  both.

**For the teacher's guide.** A short section on help-seeking covers:
- what it is and why it matters;
- that the teacher is usually the first person the student asks. That's good help-seeking too.
  The teacher can answer, suggest a crew member to ask, or suggest pressing Ask for help;
- how this room supports it: the student asks, chooses when to listen, can ask how, and can bring
  in the team;
- a suggestion: to grow a student's help-seeking, tell them at the start that you'd like them to
  ask for help when they're stuck, and that asking you counts;
- further reading: Nelson-Le Gall on help-seeking as a skill, and Aleven et al. (2003) on
  help-seeking in learning software.

## Part 7: The captain's log and wrap-up

- **The captain's log.** It's the room's record of everything that happened, in order, across all
  its sessions:
  - every prompt and who sent it;
  - every summon, with its mode;
  - what each crew member made;
  - every hail and how it was answered;
  - every proposal and its answer;
  - what went on screen;
  - stops, failures, wrap-ups and reopens.

  It can be filtered by job or by session, and it's built from the widened floor events (F13),
  the transcript, builds and assets. "Captain's log" is a generic naval term, so it fits the
  master plan's naming rule. The student is the captain.
- **Wrap up.** If a hail is open, it asks first. Then:
  - it stops the crew;
  - the Scribe writes the main points into the Session notes in `game.md`: what we made, what we
    decided, what's still broken, who helped, and what's next;
  - the notes go on screen.

  The room is then Wrapped up. It can be read but takes no new prompts until the teacher presses
  **Reopen** (Section 11 of `docs/state_machines.md`).

## Part 8: Voice

- **First sessions.** The laptop's own dictation types into the message box: on macOS the
  dictation key, or Fn twice; on Windows, Win+H. "On screen" and "off screen" work this way too.
  The teacher's guide explains how to switch dictation on.
- **Later.** A push-to-talk button for each speaker, using the browser's speech recognition.
  Chrome sends that audio to Google, so it needs its own line in the classroom notice.
- **Read aloud.** A button on each spoken part reads it in the browser's built-in voices, only
  when pressed.

## Part 9: New Zealand law and the classroom notice

These are research notes, not legal advice. The sources and reasoning are in
[`docs/legal/new-zealand.md`](../legal/new-zealand.md). In short, keep personal information out.
Before any session with a student, a pre-launch discussion chooses a legal adviser and works
through this part.

### What applies

| Rule | Kind | What it means here |
| --- | --- | --- |
| Privacy Act 2020 | Law | Whoever runs the sessions is the "agency": a teacher running their own sessions, or the organisation that employs them. The agency names a privacy officer and collects only what teaching needs. It tells the student and their family what's collected and who receives it (Anthropic included), keeps it secure and no longer than needed, and lets the student see and correct it. A serious breach, such as a lost laptop, goes to the Privacy Commissioner, who expects notice within 72 hours. |
| IPP 3A (from 1 May 2026) | Law | Information about the student that comes from parents must be made known to the student. |
| Sending chats to Anthropic | Law, uncertain | Probably not a cross-border "disclosure" while Anthropic only processes the chats. But Anthropic keeps flagged chats for its own safety work. The safe course covers both readings: name Anthropic and overseas processing in the notice, and get guardians' written authorisation. |
| Care of Children Act s 16 | Law | Guardians decide how their child is educated. Get their written agreement, and the student's own agreement in words the student understands. |
| Films, Videos, and Publications Classification Act s 127 | Law | Showing objectionable material to anyone under 18 is an offence, even without knowing it was objectionable. So the teacher stays present, the crew gets a child-safety prompt, and refusal fallback is off. |
| Copyright Act s 5(2)(a) | Law, unsettled | Who owns AI-assisted work is untested, and Anthropic's terms give outputs to the account holder. A short note signed by the parents settles it: the game is the family's. |
| Anthropic's guidelines for organisations serving minors (March 2026) | Contract | Tell users they're talking to AI, moderate content, and use a child-safety system prompt. Offer guidance on safe use, and publish how the product complies. |
| Ministry of Education generative AI guidance (May 2026) | Guidance | "Never send any AI tool the personal information of anyone under the age of 13." Game Studio is for students aged 13 and over. |
| Privacy Commissioner guidance on AI (2023) and education (2026) | Guidance | Asks for a short privacy impact assessment, transparency and human review, and caution about putting learners' information into AI tools. |
| Research ethics | Process | Applies only if sessions become research. Then they need ethics approval, parental consent and child assent, and Māori and Pacific responsiveness. |

### What the app does

These are built in Phase 2 unless noted.

- **Notices.** The classroom notice (below) opens every Game Studio room, and "these are AI
  characters, and they can be wrong" stays on screen.
- **No student account.** The student has no account and no email: just a nickname on the
  teacher's seat.
- **Prompts.** Duty prompts include a child-safety prompt. They never ask for real names, family
  details or diagnoses, and never describe or judge the student.
- **Model settings.** Game Studio turns off the refusal fallback, and can pin inference to the
  US.
- **Data stays local.** Everything stays on the laptop except the crew's and the Scribe's model
  calls.
- **Export and delete.** Every room can be exported and deleted, and games go to the family as
  files.
- **Public safeguards statement.** The repo carries a public statement of these safeguards, as
  Anthropic's guidelines ask.

### What the teacher does before the first student session

- **Responsibility.** Write down who the agency is, and name the privacy officer. A teacher
  running their own sessions is both. In real use the agency holds its own Anthropic account and
  API key. During trials the project's account is used, which the pre-launch discussion should
  cover.
- **Guardrails and cultural safety.** Set them, using the norms already followed for content,
  pace, sensory load, and cultural safety for Māori and Pacific students. Adjust the context
  pack, duty prompts and roster to match.
- **Families.** Give families a written notice and get the guardians' written agreement,
  including the overseas warning and the game-ownership note. The notice covers:
  - what's kept, and why;
  - that it goes to Anthropic, overseas;
  - how long it's kept;
  - how to see, correct or delete it.
- **The student.** Explain it to the student in words they understand, and get their agreement.
- **The laptop.** Turn on FileVault, use a separate macOS account for sessions, and keep backups
  encrypted.
- **Two short plans.**
  - What happens if the laptop is lost.
  - What to do if a student discloses harm. Under the Oranga Tamariki Act anyone may report a
    concern, and good-faith reports are protected.
- **Assessment.** Do a short privacy impact assessment, and decide how long transcripts are kept.

### The classroom notice (draft)

> Bridge Crew is a classroom tool. The crew are AI characters, not people, and they can get things
> wrong. To write each reply, the conversation is sent to Anthropic, an AI company, and processed
> outside New Zealand. Use your nickname and keep private details out. Sessions must not be used
> as research data unless a qualified research team with ethics approval oversees the study.

**Outside New Zealand.** This plan follows New Zealand law only. The Cook Islands is likely to
follow New Zealand and Australia. If someone wants to use Bridge Crew there, research it then:
local law, and Anthropic's terms for the country.

## Part 10: Docs and recipes

- `docs/state_machines.md`: Part 1. `docs/floor_state_control.md` shrinks to a summary that points
  there.
- `docs/teachers_guide.md` (new): for teachers. It covers setting up the laptop and an Anthropic API key, running a
  session, the jobs, on screen and off screen, voice, asking for help, saving and sharing games,
  the captain's log, the notice and the law, and troubleshooting.
- `docs/users_guide.md` adds templates, the big screen, Reply, How did you do that?, Ask for help,
  proposals, huddles, the captain's log and wrap-up. It stays the single source of truth for
  users.
- `docs/legal/new-zealand.md`: the dated research notes behind Part 9.
- A public statement of the safeguards for young users, as Anthropic's guidelines ask, linked from
  the README.
- `AGENTS.md`: conventions for templates, the roster and made things, and keeping
  `docs/state_machines.md` in step with the code.
- justfile: `game-studio`, `flows` (the explorer), and `games` (which opens the games folder).

### Connecting other software

From the developer review:

- **Templates** are typed config: a roster, a shared document and a notice. Another program could
  ship its own.
- **Context packs** (built) are folders of markdown that a crew member must read in full before it
  answers. Curriculum material fits there.
- **Games** are single HTML files, so they can move into any website or learning platform.
- **A room is a URL** in a local web app. Linking to one works today; there's no public API yet.
- **Licence.** It's GPL-3.0. What that means for another product depends on how the two connect.

## Phases

The phases run in this order, with no dates. Sizes are relative, as in the master plan.

| Phase | What | Size | Done when |
| --- | --- | --- | --- |
| 0 | State machines and the explorer (Part 1) | M | The machines are approved (done), and the explorer reproduces every finding |
| 1 | Protocol fixes (Part 2) | M | The explorer finds no broken rule, and the end-to-end tests pass |
| 2 | Templates, roster, shared seat, the Scribe for `game.md`, the Game Studio pack, notice, Delete room (Parts 3 and 9) | L | A Game Studio room opens with six jobs and a shared seat, and `game.md` fills in as the student grants |
| 3 | Big screen, made things, Reply, How did you do that? (Parts 4–6) | L | A version plays on screen, and a crash reaches the Engineer as a proposal |
| Test | The project lead tries the Game Studio, then builds and tests with the first teacher and another developer | — | They're happy with the core studio |
| 4 | Ask for help, proposals, huddles, the Tester's coaching (Part 6) | M | A help request can lead to a huddle that answers with one hail |
| 5 | Captain's log, wrap-up and reopen (Part 7) | S | The log and the session notes cover a full session, and a wrapped-up room reopens |
| Gate | **Dress rehearsal and pre-launch discussion**: rehearse on the finished studio, choose a legal adviser, and work through Part 9 | — | The adviser has looked at it, and the notice and teacher's guide are ready |
| 6 | The teacher's laptop and the first student session | S | The teacher is ready, and the student and their family have agreed |

Status: Phases 0–3 are built on the `game-studio` branch, and the project lead's first test is
under way. Its first notes brought two parts of Phase 4 forward: proposals from the crew (a crew
member suggests asking another, and the student says Yes or No thanks), and **Manage** for made
things (rename, remove and put back, and a crew member removing what it made when asked). The
same round made Reply, How did you do that? and Show detail separate buttons, rendered briefs
and `game.md` as formatted text, and made the browser's Back button ask before leaving a Game
Studio room. A later note gave each crew member a pixel avatar on its card, posed for its state.
Phase 4 still has Ask for help, huddles and the Tester's coaching.

## Not in this plan

- Research with Game Studio sessions. The field scan and its brief are unchanged.
- More than one student, class sign-in, kid mode, choice cards and teacher prompt cards.
- Crew members that listen and offer things unasked.
- Hosting on the droplet: everything runs on the laptop.
- Image-generation services, and crew voices beyond read-aloud.
- Templates for other platforms. Galaxy Maps, for one, would probably want its own one day.
- Hosting games online.
- Use outside New Zealand.

## Open questions

1. **The first test game.** Which game should the first tests build? One the teacher has
   already made with a student would make a good comparison.
2. **For the pre-launch legal discussion:**
   - during trials the project holds the Anthropic account, while the teacher is the agency;
   - guardrails and cultural safety;
   - the lawyer questions in `docs/legal/new-zealand.md`.

## Risks

- **Builds that don't run.** Mitigated by crash reports, versions to go back to, and a one-tap
  proposal to fix.
- **Waiting.** A build may take a minute or more. The student can work with other jobs meanwhile,
  and the bridge shows progress.
- **Cost.** Only runs cost anything: an Idle crew member costs nothing, and a huddle is one call
  however many jobs it convenes. Builds are long outputs, and the Scribe adds a small call after
  each grant. The room shows each session's running cost.
- **Six crew members on the bridge.** That's a lot for a student to keep track of at once. Group
  them, and let the teacher hide jobs for a session.
- **The crew takes over.** Nothing goes into the game until the student says yes. Duty prompts say
  to build on the student's idea and ask before changing it, and How did you do that? keeps the
  student learning rather than watching.
- **The Scribe gets something wrong.** `game.md` is always on the bridge. A correction goes in as
  a prompt, which the Scribe reads on its next update.
- **Sensory load.** Nothing autoplays, volume is capped, and reduced-motion settings are
  respected. The big screen changes only when someone asks: the student says "on screen" to play
  the game, see a picture or hear the sounds.
- **Legal.** No session with a student until the pre-launch discussion, with a legal adviser,
  has worked through Part 9.

---
*Iteration 3, after a developer review and the project lead's walk-through. A companion to
`BRIDGE_CREW_PLAN.md`. The state machines, and the words this plan uses, are in
`docs/state_machines.md`.*
