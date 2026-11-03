# Teacher's guide: the Game Studio

The Game Studio is a Bridge Crew room in which you and one student make a small browser game
together, with a crew of AI characters who play the jobs of a game studio. The student is the
producer: they ask the crew for things and decide what goes into the game. You guide.

This is a first version, written while the Game Studio is being tested. Some parts of the plan
aren't built yet; they're listed at the end.

## Before the first session

- **The laptop.** Someone sets up Bridge Crew once, following [dev_setup.md](dev_setup.md). Turn
  on FileVault, and use a separate macOS account for sessions.
- **A key for the crew.** The crew's replies come from Anthropic's Claude. Your copy needs an
  Anthropic API key, in a file called `.env.local` in the Bridge Crew folder:
  `ANTHROPIC_API_KEY=sk-ant-...`. Never paste the key anywhere else.
- **The law and the family.** Read Part 9 of the
  [education plan](plans/educational-context-2026-10-31.md): who is responsible for the
  student's information, the written notice and agreement families need, and the classroom
  notice. No session with a student should happen before the pre-launch discussion with a legal
  adviser.
- **Guardrails.** You set them, using the norms you already follow for content, pace, sensory
  load, and cultural safety for Māori and Pacific students. The crew's built-in rules are
  deliberately conservative. You can add your own guidance as a context pack (the **Context**
  button) and attach it to the crew members you choose (**Reassign**).

## Starting a session

1. Run `just game-studio`, and open <http://localhost:8080>.
2. Sign in. You're the teacher; the student doesn't get an account.
3. **Game Studio** is already picked. Type your name, the student's **nickname** (never their
   real name) and a title for the game, then press **Open a room**.
4. Read the **classroom notice** together, then press **We've read it**.

Next week, open the same room from **Recent rooms** in the lobby and carry on.

## During the session

- **Who's talking.** The switch above the message box says whether a prompt is the student's
  or yours. It starts on the student. The crew sees which, so switch it before you type.
  Anything you say out loud stays between you and the student.
- **Asking the crew.** The student starts with a crew member's name and a comma: "Storyteller,
  what's the story?" or "Artist, draw the mole." A name in the middle of a sentence is just a
  word.
- **Hails.** A crew member works quietly, then **hails** with one line. Nothing is said until the
  student presses **Grant the floor**. **Not now** declines it; the work stays readable under
  **Briefs not said**.
- **Making the game.** The Engineer builds versions, the Artist draws pictures, and the Sound
  designer makes sounds. Nothing goes into the game until the student grants it. See §12 of the
  [users guide](users_guide.md).
- **The big screen.** Type "on screen" (or press **On screen**) to play the game, see a picture
  or hear the sounds. "Off screen" comes back. The screen only changes when someone asks.
- **When something breaks.** If a version crashes on screen, the room suggests asking the
  Engineer to fix it. The student says **Yes** or **No thanks**.
- **Learning how.** **How did you do that?** under any crew member's line asks them to explain,
  at the student's level, without changing the game. **Reply** asks them a follow-up.
- **Typing is slow?** The laptop's dictation types for you: on a Mac, press the dictation key or
  Fn twice. "On screen" and "off screen" work by voice too.

## Help-seeking

Asking for help is a skill, and this room is built to practise it: the student has to ask,
chooses when to listen, can ask how something was done, and can ask a different crew member.

- You're usually the first person the student asks. That's good help-seeking too. You can
  answer, suggest which crew member to ask, or suggest asking one.
- At the start of a session, tell the student you'd like them to ask for help when they're
  stuck, and that asking you counts.
- Further reading: Nelson-Le Gall on help-seeking as a skill, and Aleven et al. (2003) on
  help-seeking in learning software.

## Saving and sharing the game

Every version is saved on the laptop as it's made, in the games folder (`just games` opens it):
`v1.html`, `v2.html`, and `index.html` for the current version. **Download**, on any version,
saves a copy wherever you like. Each file opens in any browser, even offline, so you can email
the game to the family.

**Delete room**, in the header, removes the room, its conversation and its games folder for
good.

## If something goes wrong

- **"The crew could not reach the model"** or **"rejected the crew's API key"**: check the key
  in `.env.local`, and that the laptop is online.
- **A crew member stays working for a long time**: after five minutes it stops by itself. You
  can also press **Stand down** on its card.
- **Anything else**: the troubleshooting section of [dev_setup.md](dev_setup.md).

## Not built yet

These are planned (Phases 4 and 5 of the education plan): an **Ask for help** button beside
Send, crew members suggesting each other, **huddles** in which several crew members talk a
problem over, the **captain's log**, and **Wrap up** at the end of a session.
