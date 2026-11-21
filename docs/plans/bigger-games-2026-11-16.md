# Bigger games in the Game Studio

### Issue #9: more compelling, complex, high-resolution games for older students

Students past their first game want games that look and play like the ones they know: a 3D
rocket they build and fly, a survival world that saves itself, a rhythm game with real drums.
Today the Game Studio makes small one-file games, which still suit younger students. This plan
lets a room grow into a **bigger game**: a folder of code, 3D with Three.js, saved progress, and
richer pictures and sound. The crew's way of working stays the same, and nothing goes into the
game until the student says yes.

The plan starts from four games a teacher made with students, listed in issue #9. Each was
examined and run the way the room runs a version (below). The words this plan uses for the room
(crew member, run, hail, grant, made thing, version) are defined in
[`docs/state_machines.md`](../state_machines.md), and the Game Studio itself is in
[`educational-context-2026-10-31.md`](educational-context-2026-10-31.md).

## What the example games need

Each game was run on 2026-11-16 the way the room would run it as a version: as one file (its
scripts inlined), under the room's content security policy, in the big screen's sandboxed frame,
in the Tester's headless browser.

| Game | Size | Made of | Uses | As a version today |
| --- | --- | --- | --- | --- |
| Neon Tempo (rhythm) | 24 KB | one file | canvas, drums and four songs synthesised with Web Audio, web fonts | Runs, with fallback fonts (the policy blocks web fonts) |
| Monster Sim: Aotearoa (civil defence simulation) | 86 KB | one file, plus an 8.5 MB video trailer | canvas, Web Audio music and effects, web fonts, video | Runs, with fallback fonts and no trailer |
| Woodland Survival Craft (survival crafting) | 357 KB | a page, 19 scripts and a 44 KB spec | canvas, saves in the browser's storage, Web Audio music and forest sounds with reverb | Runs, but saving silently fails: the frame has no storage |
| Rapid Unscheduled Lab (rocket lab) | 88 KB, plus Three.js | a page and 6 scripts | Three.js r128 from a CDN, an orbit camera, flight physics, Web Audio, a spoken countdown | Doesn't start: the policy blocks Three.js ("THREE is not defined") |

What that shows:

1. **They don't need a game engine.** Three are plain JavaScript drawing on a canvas, and the
   fourth adds Three.js. They're compelling because of depth (many systems and a lot of
   content), polish (fonts, glow, layout, the whole window) and sound made directly with Web
   Audio.
2. **Size is the hard limit.** The Engineer hands back the whole game in one reply, capped at
   32,000 output tokens, which by my estimate is about 100 KB of code. Monster Sim is near that
   cap, and Woodland, about 100,000 tokens by my estimate, can't be made that way at all. Even
   where a game fits, rewriting all of it for a small change takes minutes.
3. **Every crew member reads the whole game.** "The game so far" puts the current version's
   code into every call, so a game Woodland's size would add about 100,000 tokens to each
   Storyteller or Sound designer call.
4. **The teacher already has a method for big games.** Woodland's spec has a "How we work"
   section: one spec file; separate modules, so one part can change without breaking the
   others; all the numbers in one `CONFIG` block; suggest a simple option and ask when
   something isn't decided; check the game against the spec after every change; and a numbered
   progress log (Step 1 to Step 33). This plan adopts that method.
5. **Three.js works once it's local.** Inlined, it runs in the frame, and WebGL works in the
   Tester's headless browser. The rocket lab, written for r128, ran on r170 with no errors, but
   its colours came out darker and duller, because r155 changed how lights and colours work. So
   the studio pins one Three.js version and tells the crew which, and a game brought in from an
   older version gets one update from the Engineer.
6. **The frame is missing things a bigger game expects:** storage for saves, web fonts, full
   screen, and pointer lock for first-person mouse look.

## Decisions

Settled on 2026-11-16:

- **Ages.** 13 and over, as for the whole Game Studio. The teacher found that teenagers want
  more compelling games than one-file 2D games, and Bigger rooms are for them.
- **Simple and Bigger rooms.** The teacher picks one when making a Game Studio room. A **Simple
  room** keeps today's limits and prompts, for younger students. A **Bigger room** allows
  folders of code, 3D, libraries and saves. A Simple room can switch to Bigger later, but not
  back.
- **One build engine.** In both kinds of room, the Engineer edits files with tools instead of
  rewriting the whole game. A Simple room's game is just a folder with one file in it.
- **Bringing in a game** works in either kind of room. A one-file game comes into either. A
  game that needs a Bigger room (several files, or a shelf library) asks to make the room
  Bigger first.
- **The check.** The teacher is happy for their four example games to be Phase A's check.
- **The shelf starts with Three.js.** One pinned version, r180, with its effects (glow,
  cameras). It's a year old, so the crew's training covers it, and Three.js's WebGL code has
  barely changed since r155.
  Physics engines, Phaser and Tone.js wait until a game needs one.
- **Art.** Detailed SVG pictures, sprite sheets for animation, and, in 3D games, 3D models made
  as code that turn on the big screen.
- **Sound.** Songs keep their readable notes, played on richer instruments with a drum kit,
  reverb and sections. The Engineer may also write Web Audio code for sounds like engines and
  wind. All game sound passes through a volume limiter.

Unchanged: nothing goes into the game until the student says yes; everything runs on the
laptop except model calls; the family gets one file that plays offline; and there are no
image-generation services.

## Words

- **Game folder.** A version's files: `index.html`, which the browser opens first, and whatever
  else the game needs, such as scripts in `js/`, a stylesheet and `NOTES.md`.
- **`NOTES.md`.** The Engineer's map of the code, inside the game folder: what each file does,
  where `CONFIG` is, and how the parts fit. `game.md` stays the Scribe's record of what the
  student agreed to.
- **The shelf.** The libraries and fonts the studio keeps on the laptop for games to use, at
  versions the crew is told. A game asks for one by path, such as `studio/three.js`.
- **Bundle.** One HTML file made from a game folder, with its scripts, styles, shelf libraries
  and fonts inlined. The big screen, the Tester and Download all use the bundle, so they all run
  the same thing.
- **Build tools.** What the Engineer uses during a run: viewing and editing the game's files,
  and trying the game.
- **Bringing in a game.** Adding a game made elsewhere to a room, as its next version.
- **3D model.** A thing in a 3D game, such as a rocket, written as code that builds it from
  shapes. Always "3D model", so it isn't mistaken for the AI model.

## Part 1: Games as folders

- **A version is a game folder.** Old versions, one HTML file each, read as a folder holding
  only `index.html`.
- **Storage.** Files go in a new `game_files` table, keyed by the room and a hash of their
  content, and a version's made thing holds a list of its paths and hashes. Most files don't
  change from one version to the next, so they're stored once. It also keeps `made_things` rows
  small: the table sends whole rows, old and new, to the room on every change.
- **The bundle** inlines `<script src>` and `<link rel="stylesheet">` files from the folder.
  Each script ends with a `//# sourceURL=` line naming its file, so a crash says "js/animals.js,
  line 210" instead of a line in one long file. Then come today's additions: the content
  policy, the crash reporter, the sound player and, for the Tester, the ears.
- **On disk.** Each version is saved as a folder, `v7/`, and as its bundle, `v7.html`.
  `index.html` is the current version's bundle, as today. The folder includes copies of the
  shelf files it uses, so it runs from disk as it is and can be uploaded to a web host as it
  is. The family still gets the bundle.
- **Licences.** Three.js is MIT-licensed and the fonts are under the Open Font License. Their
  notices go into every bundle, because building our own bundle strips comments.

## Part 2: The frame

- **Saves.** The frame gets an in-memory `localStorage` and `sessionStorage`, kept for the room
  by the big screen, so a game's save survives a reload. **Start fresh** clears them. The
  downloaded file uses the browser's own storage, and the Tester always starts fresh, so its
  tests repeat.
- **Full screen.** The big screen's **Full screen** button already fills the display, and
  Escape comes back. Games fill the window at the screen's full resolution (a house rule,
  Part 7), and the frame allows a game's own full-screen button.
- **Pointer lock.** The sandbox gets `allow-pointer-lock`, for first-person mouse look. It gives
  the game no access to the room.
- **Fonts.** A few open-licence fonts on the shelf: pixel, display, sans and mono. Three of the
  four examples use web fonts, which the policy blocks.
- **Volume limiter.** Every audio context a game makes plays through a gain and a compressor
  that the room adds, so no game can be loud. "No sound before the player presses a key or
  clicks" stays.
- **Not now:** video in games. The Monster Sim trailer stays out.

## Part 3: The Engineer edits

**Build tools:**

- **The text editor tool** (Anthropic's `str_replace_based_edit_tool`: view, create, replace
  and insert), which Claude is trained to use. It works on a copy of the current version, and
  every path stays inside that copy.
- **remove_file**, for a file the game no longer needs.
- **try_game**, which bundles the copy and runs it for two seconds in the Tester's headless
  browser. It returns any errors and a picture, so the Engineer can fix a broken build before
  it hails. A run can use it a few times.

**A run:**

- It starts from a copy of the current version. If the run changed any files, the copy becomes
  the next version, a made thing that waits for the student's yes. The made-thing machine
  doesn't change.
- Up front, the Engineer reads `game.md`, `NOTES.md`, the list of files with their sizes, and
  the pictures, sounds, music and 3D models in use, by name. It views only the code it needs.
  The things in use are files it can read but not change, under `studio/made/`, and it copies
  what the game uses into the game's own files.
- Its card shows what it's doing as it works, as the Tester's does: "Reading js/world.js",
  "Changing js/animals.js", "Trying the game…", with the latest picture.
- Claude Opus 5.5 at medium effort, as today. Calls stream, with prompt caching across the
  loop. A run has a limit on turns and a task budget, set from the measurements in Phase B.
- On fixture replies, the Engineer's run uses its tools with canned steps, so the browser tests
  still cost nothing.

**The other crew members** get the file list and `NOTES.md`, not the code. The Tester also gets
the viewing half of the text editor tool, so it can read the code it needs.

**Cost and time, my estimate.** A change to a game Woodland's size might take one to three
minutes and cost about a dollar. That assumes Claude Opus 5.5 at $4 per million input tokens and
$20 per million output tokens, with cache reads at $0.20 per million. Phase B measures it.
Today's whole-file rewrite can't make a game that size at all.

## Part 4: Bringing in a game

- **Bring in a game** on the big screen: the teacher picks a game folder or an HTML file. It
  becomes the room's next version and the current version straight away, because it's the
  people's own work, as **Use this** is. `docs/state_machines.md` §8 gets that arrow.
- **On the way in**, a script that loads a shelf library from the internet is switched to the
  shelf's copy. Anything else from the internet (web fonts, videos) is left out and listed.
  When the game was written for another version of a shelf library, the room proposes: "Ask the
  Engineer to update this game for the studio?"
- **Simple rooms.** A one-file game comes in as it is. A game with several files, or one that
  uses a shelf library, asks first: "This game needs a Bigger room. Make this room Bigger? It
  can't go back." Yes switches the room, then brings the game in.
- **Limits:** text, SVG, PNG, JPEG and font files, up to a few megabytes in all.
- **Privacy.** The files stay on the laptop, and reach Anthropic only as the crew reads them,
  as a version's code does today. A README or credits screen may name students, so the teacher
  checks before bringing a game in.
- **The examples stay out of the repository.** They're the teacher's work and have no licence,
  and one credits students by name. Phase A's check uses them on the laptop; the automated tests use a
  small multi-file game of our own.

## Part 5: Art for bigger games

- **Pictures.** SVG with gradients, shading and filters, up to about 60 KB, at a stated size,
  such as a 1920 × 1080 background. Still no scripts, links, or images or fonts from anywhere
  else.
- **Sprite sheets.** A picture can be a strip of frames, such as four for a walk. **Animate**
  plays it on the big screen, and the Engineer draws the frames in the game.
- **3D models** (Bigger rooms). The Artist writes a short module that builds a thing from Three.js
  shapes and materials, such as a rocket from cylinders, cones and a lathe shape. It's a new
  kind of made thing, and it turns slowly on the big screen, in the same sandboxed frame as the
  game, with the shelf's Three.js. Asked how it was made, the Artist says what the 3D model is
  built from, and that a human artist would use a program such as Blender.
- **The style guide** in `game.md`'s Look section gains lighting for 3D: palette, light colour,
  fog and glow.

## Part 6: Sound and music for bigger games

- **Instruments.** A song's instrument is a ZzFX list, as today, or a named studio instrument:
  pluck, pad, bass, lead, bell, or the drum kit, whose steps are `k` (kick), `s` (snare) and
  `h` (hi-hat). The room's music player synthesises them with Web Audio and adds reverb.
- **Sections.** A song can have named sections and a form, such as `A A B A`, so music can be
  longer than one loop. The notes stay readable.
- **Sound code.** Sound effects stay ZzFX lists. The Engineer may also write Web Audio code for
  sounds that keep going, such as an engine, wind or rain, and use the browser's speech for
  short spoken lines, such as a countdown.
- **The Tester's ears** report sounds and songs by name, as today, plus "other game sound" when
  the game's own Web Audio code plays, and the words of any speech.

## Part 7: The crew in Bigger rooms

- **The setting.** Its safety rules don't change. Its line "The games are small browser games,
  one HTML file each. Keep ideas small enough to build." becomes, in Bigger rooms: the game can
  be big (many files, 3D, saved progress), and it's built one playable step at a time. The Storyteller's "small game"
  changes to match.
- **The teacher's method, as house rules for the Engineer:** separate files by system; every
  number in a commented `CONFIG` block in `js/config.js`; `NOTES.md` kept up to date in every
  build; the canvas fills the window at full resolution; a title screen, controls on screen and
  a pause; saves in `localStorage`; shelf libraries only; nothing that flashes; and respect for
  the player's reduce-motion setting. They go in the Engineer's format and in a context pack for
  Bigger rooms, which also gives the pinned Three.js version and what changed since r128.
- **`game.md`** in a Bigger room gains a **Progress log**: numbered steps, each one playable, as
  in the teacher's spec. The Game designer suggests the next step ("Step 7: wolves"), and the
  student decides. Sections can be longer.
- **The Tester** plays at 1280 × 720 in Bigger rooms, so wide and 3D games look as they do on
  the big screen. Each picture costs a little more to send.

## Phases

One pull request per phase, in this order. Sizes are relative, as in the other plans.

| Phase | What | Size | Done when |
| --- | --- | --- | --- |
| A | Game folders and the bundle (Part 1), the frame (Part 2), the shelf (Three.js and fonts), Simple and Bigger rooms, Bringing in a game (Part 4). Until Phase B, the Engineer in a Bigger room hands back whole files, several at a time, and only the Engineer and the Tester read the code | L | The four example games come in and play on the big screen, at full screen, and in the Tester's browser. Woodland's save survives a reload. Each download plays offline. |
| B | The Engineer edits (Part 3): build tools, try_game, its card while it works, the other crew members without the code | L | With real Claude, the Engineer makes a requested change to Woodland and updates the rocket lab to the studio's Three.js, each as a new version that runs. Time and cost per build are written down. |
| C | The crew in Bigger rooms (Part 7) | M | In a rehearsal, a Bigger room builds a small 3D game from nothing, one step at a time. |
| D | Art (Part 5) | M | A 3D model from the Artist goes into a 3D game when the student says yes. |
| E | Sound and music (Part 6) | M | A song with the drum kit and two sections plays in the room and in a game, and the Tester hears it. |

Status: Phase A is built (2026-11-16). The teacher's four games came in through **Bring in a
game**, and each played on the big screen, at full screen and in the Tester's browser, with no
errors; Woodland's save survived a reload; and each download played offline. With real Claude,
the Engineer updated a small brought-in Three.js game for r180 in 22 seconds: it handed back the
one file it changed, multiplying the light's strength by π for the new light units.

Status: Phase B is built (2026-11-19). The Engineer builds in both kinds of room with Anthropic's
text editor tool, remove_file and try_game, on a copy of the current version; the old way of
handing back whole files is gone. A run has 40 turns of tools, try_game three times, and a task
budget of 200,000 tokens, about three times what the runs below used. The 5-minute run limit
stays. The Engineer keeps `NOTES.md` in Bigger rooms, the rest of the crew read the file list and
`NOTES.md`, and the Tester reads the code it needs with the viewing half of the text editor.

Measured with real Claude (Claude Opus 5.5 at medium effort; $4 and $20 per million tokens in and
out, cache reads $0.20 and 5-minute cache writes $5):

| Build | Time | Turns | Tokens: cache read / cache written / output | Cost |
| --- | --- | --- | --- | --- |
| Woodland: "show a small label like “+1 wood” that floats up from the player and fades away" | 57 s | 9 | 171,208 / 36,163 / 5,481 | $0.33 |
| Rocket lab: the room's "update it for the studio's Three.js?" | 70 s | 9 | 315,160 / 65,264 / 6,687 | $0.52 |
| The Tester flying the updated rocket lab | 122 s | 9 | 214,760 / 45,245 / 3,725 | $0.34 |

- **Woodland:** the Engineer read four of its 20 files, changed three (the label's numbers went
  into `CONFIG`), tried the game, and wrote `NOTES.md`. Version 2 played with no errors.
- **Rocket lab:** it read five files and changed three: colour management off and the renamed
  colour settings, as r128 had them, light strengths multiplied by π, and a point light's decay
  set to r128's. Version 2's colours looked natural on the big screen, and the Tester, flying it,
  found the sky, grass and smoke the right colours. Woodland's floating label wasn't seen in
  play: the Engineer's two-second try stops at the title screen, as it said.
- **Found:** try_game reported a template in Woodland's script, `<img src="${…}">`, as a missing
  file, because the bundle inlines scripts before it looks for pictures. The bundle now skips
  paths a script builds. Separately, the Tester's 6-second wait during the rocket lab's countdown
  passed the playtest's 15-second step limit, so the game counted as stuck and restarted. That's
  Phase A's risk, "3D in the Tester's browser", seen: it needs a look before Phase C's 3D
  rehearsal.
  - **Followed up 2026-11-21.** The cause was the browser, not the countdown: Playwright's
    headless shell draws WebGL in software (SwiftShader), about 54 ms a frame for a 3D scene, so
    6 s of game time (375 frames on the paused clock) took 20 s. Full Chromium, headless, draws
    with the Mac's graphics chip (Metal): 5 ms a frame. The playtest now launches it, falling
    back to the shell, and the installer downloads it. Each step's game time runs in 100 ms
    slices, so a slow game stops at the limit with a look and is left where it was, while a
    stuck one is still restarted, with the last picture taken during the step. Replayed on
    version 2: the Tester's steps took 1.5 s in Chromium and 11.3 s in the shell, and a 10 s
    wait in the shell stopped 9.2 s in at T-1, then flew on the next turn.
- Both Engineers said what two seconds of trying couldn't check, and suggested asking the Tester.

D and E can swap. Each phase keeps `docs/state_machines.md` and `docs/users_guide.md` in step,
and Phase A adds a note to Part 5 of the education plan, which still says a version is one HTML
file.

## Later

These are on the [roadmap](../ROADMAP.md): image-generation services and video in games;
physics engines, Phaser and Tone.js on the shelf; hosting games online and multiplayer; and a
**Tune** panel for a game's `CONFIG` numbers.

## Risks

- **A build that wanders.** An editing run can change a lot. Mitigated by the turn limit and
  task budget, try_game, the student's yes, and every old version kept.
- **Waiting and cost.** Runs are longer loops. Phase B measures them, and the room already shows
  each session's running cost.
- **3D in the Tester's browser.** If WebGL is slow there, a held key could hit the 15-second step
  limit. Phase A measures it with the rocket lab.
- **Sensory load.** 3D, glow and richer sound. The limiter, the no-flashing rule and
  reduce-motion apply to every game.
- **A game too big to follow.** `NOTES.md` maps the code, `CONFIG` holds the numbers to change,
  and "How did you do that?" points at the one file that matters.
- **Version drift.** Most code written for Three.js online is for older versions. The context
  pack and the Tester's pictures catch dark or broken scenes.

---
*Iteration 1, from issue #9, written 2026-11-16. A companion to
`educational-context-2026-10-31.md`.*
