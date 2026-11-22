# Game Dev Station

### The Game Studio, played like a game

The Game Studio grew out of the research rooms, and it still uses their front end. A lesson
starts with a sign-in, a settings form and a classroom notice, then opens three columns of
panels with about thirty controls and words to learn: hails, Grant the floor, Redirect,
Reassign, Engage, Context, briefs, `game.md`, Made in this room, Manage, Briefs not said. Most of
those are what Deliberation rooms study, and a lesson needs almost none of them. Nobody hears a
crew member until someone presses **Grant the floor**, and the same press puts their work into
the game, so one button makes two decisions.

This plan gives the Game Studio its own front end, **Game Dev Station**: a space station where
the crew make games, which you play rather than operate. Behind it is the same engine: the
crew's jobs, versions, the Engineer's tools, the Tester's playtest, games on GitHub, the games
folder and the rules for young people. Deliberation rooms keep today's room.

The words for the room (crew member, run, hail, made thing) are in
[`docs/state_machines.md`](../state_machines.md).

**Status:** planned 2026-11-22. A clickable mockup of step 1 was made for the project lead
(not in the repo), and its feedback will shape step 1.

## The choices

Made 2026-11-22, each as recommended:

1. **The crew speak when they're ready.** One at a time, and never while someone is typing: a
   crew member with something to say shows a **!** over its desk and speaks as soon as the box
   is empty, or when it's clicked. Hearing isn't accepting. Work goes into the game only when
   someone says yes to it: **Keep it** after playing a version on the viewscreen, or **Use
   this** on an idea, picture or sound. This changes the floor rules for Game Studio rooms only.
2. **One crew of players.** No Teacher/Student switch: the crew talks to the team. The station
   has one sign-in.
3. **Every new game is Bigger.** The Simple/Bigger choice leaves the front end; Simple rooms
   stay in the engine, and old Simple rooms still open.
4. **Placeholder art first.** The existing pixel crew, plus free public-domain 3D kits for the
   deck. An artist is commissioned once the teacher likes the feel.
5. **Talking to the crew uses the Mac's own Dictation.** It works in any text box already and
   runs on the laptop. Browser speech recognition would send a student's voice to Google or
   Apple, so it waits for the legal list.
6. **Today's room stays as the Engineering view**, reachable from the pause menu, until the new
   front end does everything.
7. **Step 1 comes before Bigger games Phases C–E.**

The station is called **Game Dev Station**, and it's a space station.

## From today's room to the station

| Today | On the station |
|---|---|
| Lobby, Quick start, Settings | A title screen. **Play** carries on the last game; New game; Load game |
| Recent rooms ("Session 2026-11-21 18:03 · YAYZSJ") | Save slots, each with the game's name and latest picture |
| "Log me on as demo user 1", the Teacher/Student switch | No sign-in screen: the laptop is the station |
| Simple or Bigger | Gone from the front: every new game is Bigger |
| Hail, Grant the floor, Not now | A **!** over a crew member at its desk; it speaks when the box is empty |
| Accepting a version | The viewscreen zooms in, you play it, then **Keep it** or **Go back** |
| On screen, Off screen, Full screen, Pick something | The viewscreen zooms forward and back |
| Crew cards, Made in this room, Manage, Use this, Show detail | Each desk holds its job's work: the Artist's has the pictures, the Engineer's the versions |
| `game.md` and the Scribe | The station computer, which keeps the design doc |
| Connect GitHub, Bring in a game | Missions with the Engineer; Load game from a file, a folder or GitHub |
| Chime, Tune the crew, Delete room, Guide, Leave | The pause menu (Esc) |
| The classroom notice, every time a room opens | Read once by the station computer in the intro, in full; "AI characters. They can be wrong." stays on screen |

## How it should feel

- **A title screen with one button.** The station drifts through the stars. Sound starts on
  **Play**, because browsers don't play sound before a click.
- **An intro scene, not a video.** The station computer welcomes the new crew member, then each
  crew member steps up, says what its job is and one habit of good people in that job, and
  offers to take a name. The station computer announces each name ("Artist is Haley."). A
  scene, unlike a video, can use the names chosen, follow a theme and change with the crew. It
  can be skipped, and replayed from the menu.
- **One box.** Start with a name to ask someone ("Haley, draw the hero"); otherwise whoever's
  job it is picks it up. **Try:** hints under the box suggest a next step, and can be turned off.
- **The deck.** The crew at their desks, the viewscreen ahead, the station computer's screen on
  one wall and a star map on the other. A crew member at work moves and its monitor flickers; one
  that's ready shows a **!**. Clicking a desk shows that job's work, what it's doing, and **Ask**,
  **Stop** and **Rename**.
- **Voices.** Text blips by default (a short tone per syllable, each crew member at its own
  pitch); the Mac's own voices, one per crew member, as a setting; or off. The words always show.
  Browser speech can't go through a radio filter, so the station computer's lines start and end
  with a chime and a crackle instead.
- **In character, but honest.** Crew members live on the station and answer as studio crew. Asked
  whether they're real, they say they're AI characters and can be wrong. The persona sits on top
  of the setting, and the rules for young people stay in the setting, unchanged.
- **Evoke, don't copy.** An original station: no Star Trek panels, badges, uniforms or names.
- **Grown-up controls behind Esc**, as in a game: saves, settings, renaming and tuning the crew,
  missions, the guide, the Engineering view, and quitting to the title.
- **Calm when asked.** Reduce motion (the computer's setting or the station's) stops the bobbing,
  zooming and flickering. A volume limiter stays on everything.

## Steps

One pull request each.

1. **The first five minutes.** The title screen, save slots with pictures, the intro scene with
   naming, a flat pixel deck with the crew at their desks, one box, crew who speak when ready,
   the viewscreen with **Keep it** and **Go back**, desks that hold each job's work, and the
   pause menu. In the engine:
   - **Hearing apart from using.** In Game Studio rooms the app grants a hail by itself when the
     box is empty and the floor is free; the made thing stays Waiting until **Keep it** or **Use
     this**, and the Scribe writes it down then. `docs/state_machines.md` changes in the same
     commit: rules 2 and 7, and the grant row in "How the machines link".
   - **Crew names.** A name joins a crew member's aliases, so the box finds it, and its
     instructions say what it's called.
   - **No speaker switch.** The crew is told it's talking with the team; the setting's rules for
     young people don't change.
   - **No sign-in screen** where the studio answers only on the laptop (the Desktop shortcut).
     `just game-studio`, which answers on the network, keeps its sign-in.
   - **Pictures for save slots** from the Engineer's two-second try of each version.
   - The users guide's Part 1 and the teacher's guide are rewritten for the station; the
     installer and the Desktop shortcut open it.
2. **The deck in low-res 3D.** Three.js from the shelf, drawn small and scaled up with hard
   pixels; the crew as flat pixel sprites at their desks; the camera moving between the deck,
   a desk and the viewscreen. The flat deck stays for Reduce motion and slow laptops.
3. **Voices.** The Mac's voices per crew member, the station computer's announcements, and the
   Dictation hint by the box.
4. **Crew who know their craft.** A craft file for each job: that field's best practices and
   where to read more. Each crew member reads its own, and the API caches it, so a long file is
   cheap after the first call. Then, possibly, a look-up tool: the API's web search and fetch,
   limited to a list of sites for each job, which needs its own decision on cost and on what
   students can reach.
5. **Setup missions.** Connect GitHub with the Engineer, and saving games to GitHub and opening
   them again with their history (G4 and G5 of
   [Games on GitHub](games-on-github-2026-11-16.md)).
6. **Later:** a second computer joining with a code, more themes, and exploring the galaxy
   (see the [roadmap](../ROADMAP.md)).

## Not in this plan

- Changing Deliberation rooms. They keep today's room, and the research instrument is unchanged.
- Image generation, music services or any second AI provider.
- Recorded video for the intro.
