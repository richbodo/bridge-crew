# Teacher's guide: the Game Studio

The Game Studio is a Bridge Crew room in which you and one student make a small browser game
together, with a crew of AI characters who play the jobs of a game studio. The student is the
producer: they ask the crew for things and decide what goes into the game. You guide.

This is a first version, written while the Game Studio is being tested. Some parts of the plan
aren't built yet; they're listed at the end.

## Before the first session

- **Install it.** You paste one line into Terminal, and the installer does the rest:
  [users guide §1](users_guide.md#1-install-it-on-a-mac). You don't need to know the command
  line. Turn on FileVault, and use a separate macOS account for sessions. If that account isn't
  an administrator, paste the line in an administrator account first (it installs the tools),
  then again in the session account.
- **A key for the crew.** The crew's replies come from Anthropic's Claude, so your copy needs an
  Anthropic API key. The installer explains how to get one, checks it, and saves it on the
  laptop only. Never paste the key anywhere else.
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

1. Double-click **Game Studio** on the Desktop. A Terminal window starts everything, and the
   Game Studio opens in your browser.
2. Click **Log me on as demo user 1**. You're the teacher; the student doesn't get an account.
3. **Game Studio** is already picked. Type your name, the student's **nickname** (never their
   real name) and a title for the game, then press **Open a room**.
4. Read the **classroom notice** together, then press **We've read it**.

At the end, press **Control-C** in the Terminal window to stop. Next week, open the same room
from **Recent rooms** in the lobby and carry on. Stopping, updating and fixing problems are in
[users guide §5](users_guide.md#5-stopping-updating-and-fixing).

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
- **The crew's portraits.** Each crew member has a small pixel portrait beside its name. It
  moves only while that crew member is working or hailing, so a glance shows who's busy and who
  wants the floor. If the movement distracts the student, turn on **Reduce motion** in the Mac's
  System Settings (Accessibility, then Display), and the portraits hold still.
- **Making the game.** The Engineer builds versions, the Artist draws pictures, and the Sound
  designer makes sounds. Nothing goes into the game until the student grants it. See §4 of the
  [users guide](users_guide.md#4-making-the-game).
- **The big screen.** Type "on screen" (or press **On screen**) to play the game, see a picture
  or hear the sounds. "Off screen" comes back. The screen only changes when someone asks.
- **When something breaks.** If a version crashes on screen, the room suggests asking the
  Engineer to fix it. The student says **Yes** or **No thanks**.
- **Learning how.** **How did you do that?** under any crew member's line asks them to explain,
  at the student's level, without changing the game. **Reply** asks them a follow-up, and puts
  the cursor in the message box.
- **One crew member asking another.** The student can ask a crew member to get something from
  another, as in "Game designer, get the sounds for catching a ladybug from the Sound designer."
  Once the student grants the hail, a suggestion appears under **Suggestions**, and **Yes** asks
  the Sound designer. Crew members never start each other's work without the student's yes.
- **Tidying up.** **Manage**, beside **Made in this room** and on the big screen, renames things
  and removes the ones the student doesn't need. Removed things can be put back, and every
  version stays in the games folder. The student can also ask a crew member to remove what it
  made; it lists what it would remove, and removes it only if the student grants it.
- **The Back button.** The browser's Back button, or a two-finger swipe on the trackpad, asks
  "Leave the studio?" first, so a slip doesn't end the session. For fewer distractions, **Full
  screen** on the big screen hides the browser altogether.
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

Every version is saved on the laptop as it's made, in the games folder, **Bridge Crew Games** on
the Desktop: `v1.html`, `v2.html`, and `index.html` for the current version. **Download**, on any version,
saves a copy wherever you like. Each file opens in any browser, even offline, so you can email
the game to the family.

**Delete room**, in the header, removes the room, its conversation and its games folder for
good.

## If something goes wrong

- **"The crew could not reach the model"**: check that the laptop is online, then ask again.
- **"Rejected the crew's API key"** or **"AI credits are exhausted"**: check the account's
  billing, then paste the install line again; it checks the key.
- **A crew member stays working for a long time**: after five minutes it stops by itself. You
  can also press **Stand down** on its card.
- **Anything else**: [users guide §5](users_guide.md#5-stopping-updating-and-fixing), and for a
  developer, the troubleshooting section of [dev_setup.md](dev_setup.md).

## Not built yet

These are planned (Phases 4 and 5 of the education plan): an **Ask for help** button beside
Send, **huddles** in which several crew members talk a problem over, the **captain's log**, and
**Wrap up** at the end of a session.
