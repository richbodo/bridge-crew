# Bridge Crew — users guide

A short, practical walkthrough. Bridge Crew is a shared room where **the humans** type,
**the agents** work in the background, and nobody speaks until a human grants the floor.

---

## 1. Sign in

Open the app and choose **Come aboard**. Sign up with email and password (confirm the link
in your inbox — check spam the first time). You land in the lobby.

On a local copy started with `just demo`, the lobby and sign-in page also offer **Log me on
as demo user 1** and **Log me on as demo user 2**: one click, no password or email. Each
browser tab keeps its own sign-in, so two tabs can be the two humans in one room. See
[dev_setup.md](dev_setup.md#demo-mode).

![The lobby](images/01-lobby.png)

The lobby shows the crew roster, a form to open a room, a join-by-code box, and your recent
rooms.

## 2. Open a room

1. Pick the **kind of room**:
   - **Deliberation**: two people work through a plan or a debate with five crew members. The
     rest of this guide describes it.
   - **Game Studio**: one teacher and one student make a browser game. See §11.
2. Type **your name in the room** (this is what the other human sees next to your colour dot).
3. Pick a colour.
4. Give the session a **title**.
5. Press **Open a room** — or **Open a demo room** to get a pre-filled example (see §9, Demo room).

You are dropped straight into the room and the header shows the **join code**.

![The room](images/02-room.png)

The room has three columns:

| Column | What it is |
| --- | --- |
| Left | The conversation and your message box |
| Middle | **Hails** (agents asking to speak) and the **stations** |
| Right | `plan.md`, the living document the Scribe maintains |

## 3. Invite the second human

Click **Invite** in the header. You can:

- **Copy invite link** — a `/join/<CODE>` URL you paste into any chat, or
- **Email an invite** — enter their address plus an optional note.

The other person signs in, picks their own name and colour, and joins the same room.
They can also type the six-character code into the lobby's **Join with a code** box.
A Deliberation room has two seats: a third person who tries to join is told the room is full.

![Inviting the second human](images/03-invite.png)

## 4. Talk

Type in the box at the bottom left and press **Enter** (Shift+Enter for a new line).
Everything you and the other human say is visible immediately to both of you and is read by
every agent you summon afterwards.

## 5. Summon the crew

Three ways, all equivalent:

**Slash commands**

| Command | Effect |
| --- | --- |
| `/research <topic>` | Sends Scout to go and find out |
| `/analyze <thing>` | Sends the Analyst for a deep scan |
| `/debate <question>` | Sends Advocate *and* Skeptic on opposite sides |
| `/scribe <brief>`, `/scout …`, `/advocate …`, `/skeptic …`, `/analyst …` | Summons that one station |
| `/redirect <station> <new brief>` | Replaces what a working station is doing |
| `/stop <station>` | Stops a station, wherever it is |

**Naming them in ordinary speech** — put `@` before a name anywhere (`what did the vendor docs
say, @scout?`), or start with the name and a comma or colon (`Scout, what did the vendor docs
say?`). That re-engages Scout with the whole line as the brief. Several `@` names in one line
engage several stations. A name in the middle of a sentence without the `@` is just a word, so
"I asked the scout" summons nobody.

**Station buttons** — each card has **Engage** (or **Redirect** when it's already working),
**Stand down**, and **Reassign**.

Stations move through four states: `standing by` → `working` → `hailing` → `on the floor`.
Only one station can hold the floor at a time. Summoning a station that's already working
redirects it: it drops the old task, and only the new one comes back. Summoning one that's
hailing replaces its hail with new work; the old brief stays readable. **Stand down** (or
`/stop`) stops a station wherever it is and withdraws its hail. The full state machines are in
[state_machines.md](state_machines.md).

The crew's work happens on the server, so you can close the tab mid-run and the hail will be
waiting when you come back. **Send** never greys out: while stations work, the line under the
box says who's at work, and you can keep talking.

## 6. Grant the floor

When an agent has something, it raises a hand and one line of what it's got appears under
**Hails**. Nothing is said in the room until you press **Grant the floor** — or **Not now** to
dismiss it.

A granted turn is short (capped at ten sentences). Anything longer goes into the written
brief: press **Show detail** under the agent's line to read it, **Hide detail** to fold it away.

![An agent with the floor](images/06-granted.png)

Either human can grant or dismiss any hail. A human typing always preempts a speaking agent.
If a grant can't happen, the message says why: another station is speaking, the hail was
already answered, or the station has moved on to newer work.

## 7. Reassign a station

Press **Reassign** on any card to change:

- **Station name** — e.g. rename Scribe to `Bug_Reporter`
- **Duty prompt** — what that station is for, in your words
- **Context packs** — required reading (see §8)

Save with **Save station**, or use **Reset to default** to put the stock crew member back.
Changes apply to the next run and are visible to both humans.

![Reassigning a station](images/05-reassign.png)

## 8. Context packs

A context pack is a named folder of documents a station must read **in full** before it
answers. Open **Context** in the header to see what's available.

![Context packs](images/04-context.png)

- **Repo packs** ship with the app: `bridge-crew-protocol`, `kereru-ferry-coop`,
  `nz-politics`, `social-epidemiology`. They contain deliberately obscure facts, so you can
  tell from an answer whether the pack was actually read.
- **Session packs** are created here and live only in this session.

Attach packs to a station in that station's **Reassign** form; attached packs show as chips on
the card. Every run, an agent receives: its duty, the conversation so far, the current
`plan.md`, and every attached pack.

## 9. Demo room

**Open a demo room** in the lobby creates a normal room pre-loaded with a short scripted
scene: two humans debating hosted vs. self-hosted speech-to-text, a `/research` summon, a
Scout hail waiting for you, and a starter `plan.md`.

**What works in a demo room** — everything a normal room does:

- Granting the floor to the pre-loaded Scout hail (Scout speaks, Scribe then updates `plan.md`)
- Typing, summoning, redirecting and standing down stations, with live model answers
- Reassigning stations, attaching context packs, creating session packs
- Inviting a second human by link, code, or email
- Real-time sync between both humans' browsers

**What is not real in a demo room:**

- The opening four lines and Scout's first contribution are **canned text**, not model output —
  "Rae" and "Milo" are not real participants and never reply
- The pre-loaded hail's brief was written by hand, so it cites no live sources
- The seeded `plan.md` was written by hand, not by the Scribe (the Scribe overwrites it on its
  next run)
- No context pack was read for that first canned answer

Everything you do *after* opening the demo room is real. To start clean, leave and use
**Open a room** instead.

## 10. Leaving and coming back

**Leave** returns you to the lobby; the room keeps its state. Your recent rooms are listed in
the lobby sidebar — reopen one and the whole conversation, stations, and plan are as you left
them.

**Delete room**, in the header, removes the room and everything in it for good. Only the person
who opened the room sees it, and it asks first.

## 11. The Game Studio

A Game Studio room is for one teacher and one student, making a small browser game on the
teacher's laptop. The student is the producer: they ask the crew for things and decide what
goes into the game. `just game-studio` opens the lobby with it picked.

- **Opening one.** The teacher signs in, picks **Game Studio**, and gives the student a
  **nickname** (not their real name). A Game Studio room has one seat, so there's no invite.
- **The classroom notice** opens every time the room does. Read it together, then press
  **We've read it**. "These are AI characters, and they can be wrong" stays under the header.
- **The crew** has six jobs: Storyteller, Game designer, Artist, Sound designer, Engineer and
  Tester. Every crew member reads the `game-studio` context pack.
- **Who's talking.** The switch above the message box says whether a prompt is the student's or
  the teacher's, and the crew sees which. It starts on the student.
- **Asking a crew member.** Start with their name and a comma, like "Artist, draw the mole", or
  put `@` before it anywhere. A name in the middle of a sentence is just a word. There are no
  slash commands.
- **Answers.** A crew member works, then hails. Spoken parts are at most three sentences; the
  full detail is in the brief.
- **`game.md`** is the game's design notes, kept by the Scribe in the background. It only
  writes down what the student said yes to, and the Engineer will build from it.
- **Safety settings.** Every crew member follows rules for young people: short literal
  sentences, nothing unsuitable for 13 and over, no personal questions, and no judging the
  student. A request the model declines stays declined.

The teacher's side of a session is in [teachers_guide.md](teachers_guide.md).

## 12. Making the game

- **What the crew makes.** The Engineer makes **versions** of the game, each one a single HTML
  file. The Artist makes **pictures**, and the Sound designer makes **sounds**. Whatever a crew
  member makes comes with its hail.
- **Nothing goes into the game until the student says yes.** Granting the hail puts it in the
  game, and a version becomes the **current version**: the one the Engineer builds from next.
  **Not now** leaves it **not used**, but it isn't lost.
- **Made in this room**, in the right column, lists everything, newest first, with what happened
  to it. **Use this** puts something that wasn't used into the game, or makes an older version
  current again. **Play** plays a sound; nothing plays on its own.
- **On screen and Off screen.** **On screen** shows one thing, large: the game (playable), a
  picture, the sounds, or what a crew member said. Press **On screen** on anything or in the
  header, or just type "on screen". "Off screen" comes back to the bridge. **Full screen** fills
  the laptop's display, and **Esc** comes back. A strip under the big screen keeps the message
  box, the newest hail and any suggestions to hand.
- **When a version crashes** on screen, the room says so and suggests "Ask the Engineer to fix
  it?" **Yes** starts the Engineer on it; **No thanks** leaves it.
- **Reply**, under a crew member's line, starts a prompt to them about what they said. **How did
  you do that?** asks them to explain how they made it, step by step, without changing anything.
- **Briefs not said**, under the hails, keeps every brief that was declined, replaced, stopped
  or superseded, with Reply and How did you do that? on each.
- **Saving and sharing.** Every version is saved on the laptop the moment it's made, in the
  games folder: `v1.html`, `v2.html` and so on, with `index.html` as the current version
  (`just games` opens the folder). **Download** saves a version wherever you like. Each file
  opens in any browser, even offline, so the teacher can email it to the family.
- **Delete room** also deletes the room's games folder.

## Not built yet

Voice and video, session export bundles, and agent tool use are on the plan
([BRIDGE_CREW_PLAN.md](plans/BRIDGE_CREW_PLAN.md)) but not in the app today. Everything above
is text-first.
