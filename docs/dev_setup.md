# Developer Setup Guide

Bridge Crew runs entirely on your own machine: local Supabase for the database,
auth and realtime; the TanStack Start dev server for the app and its server
functions; and the Anthropic API for the crew's model calls. `just` drives all
of it — run `just` on its own for the menu.

## Quickstart (TL;DR)

**First time only:**

```
mac% brew install just colima docker supabase/tap/supabase
mac% npm install -g bun
mac% cd bridge-crew && just setup                          # your clone; bun install + Playwright's Chromium
mac% echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local     # your key; gitignored
```

**Every session:**

```
mac% just demo        # http://localhost:8080 with one-click demo logins
```

`just demo` starts Colima if it's stopped, brings up local Supabase, seeds the
users, writes `.env`, runs the app, and opens a tab at <http://localhost:8080>
once it answers. Click **Log me on as demo user 1** there, open a second tab
(`just open`) and click **Log me on as demo user 2** — see [Demo mode](#demo-mode).
If an earlier copy of the app is still running on port 8080, in any mode, it
stops that first and says so, so the browser never shows the old one.

For the Game Studio, run `just game-studio` instead: see [The Game
Studio](#the-game-studio) for running it and testing it.

`just run` is the same app without the demo buttons: sign in as
`crew-a@example.com` / `bridge-crew-local`, and as `crew-b@example.com` in
another browser profile (or a private window) to be the second human.

---

## Demo mode

For manual testing as both humans, with no passwords and no email.

```
mac% just demo            # crew calls Claude
mac% just demo-fixture    # crew answers with canned replies: no key, no credits
```

- The lobby, the sign-in page, and every `/join/<code>` invite page show
  **Log me on as demo user 1** and **Log me on as demo user 2**. They sign in
  as `demo-1@example.com` and `demo-2@example.com`, which `just infra` seeds.
- **Each tab keeps its own sign-in.** Normally a browser shares one sign-in
  across all tabs; in demo mode it lives in the tab's `sessionStorage`, so two
  tabs can be two different people. Reloading keeps the tab's user; closing the
  tab signs it out.
- Use a new tab (⌘T, or `just open`) for the second human, not *Duplicate
  Tab*: a duplicated tab starts as a copy of the original's sign-in.
- The header shows which demo user the tab is, and the room form starts with
  that user's name and colour (Demo 1 in blue, Demo 2 in pink).
- The lobby has one button, **Open a demo room**, and a **Context** list in
  place of **Kind of room**: **Game Studio** (the default), then one entry per
  context pack with a `demo.md`. A pack's room is a Deliberation room where
  every station reads that pack, opening with the scene in its `demo.md`
  ([users guide §14](users_guide.md#14-demo-room)). A Game Studio room can
  start from a game, with **Open a game**.

A typical run: demo user 1 opens a demo room and copies the invite link from
**Invite**; the second tab opens the link, clicks **Log me on as demo user 2**,
and comes aboard.

Demo mode is the `VITE_BRIDGE_CREW_DEMO=1` setting (`src/lib/demo.ts`); the
Context list is `src/lib/demo-rooms.ts`. It is meant for the local stack only;
the demo accounts exist only where `scripts/test-infra.sh` created them.
`just game-studio`, and the teacher's Desktop shortcut, are demo mode with the
kind of room set (`VITE_BRIDGE_CREW_TEMPLATE=game-studio`): their lobby keeps
**Open a room**, since a lesson isn't a demo, and has no Context list. Outside
demo mode (`just run`), **Open a demo room** is offered for a Deliberation room
and seeds the speech-to-text scene.

---

## A teacher's Mac

Teachers install the Game Studio without the command line: [users guide
§1](users_guide.md#1-install-it-on-a-mac) has them paste one line into Terminal, which runs
`scripts/install-mac.sh` straight from `main` on GitHub. A change to it reaches teachers as soon
as it's merged.

- **`scripts/install-mac.sh`** installs Homebrew and the tools above, clones the repo into
  `~/bridge-crew` (or updates it with `git pull --ff-only`), and runs `bun install
  --frozen-lockfile`. It asks for the API key, checks it with one tiny Haiku request (the key
  reaches curl on standard input, never the command line), and saves it in `.env.local` with
  mode 600. Then it runs `just infra`, and puts **Game Studio** (a `.command` file) and **Bridge
  Crew Games** (a link to the games folder) on the Desktop. Running it again skips what's done,
  so it's also how a teacher updates or changes the key. Run from a checkout, it sets up that
  checkout and leaves git alone. `BRIDGE_CREW_DIR`, `BRIDGE_CREW_DESKTOP` and
  `BRIDGE_CREW_START=no` are for testing it.
- **`scripts/game-studio-mac.sh`** is what **Game Studio** on the Desktop runs: `just infra`,
  then the dev server as `just game-studio` runs it, but on 127.0.0.1 only. `vite.config.ts`
  listens on every interface, and demo mode's one-click sign-in would let anyone on the same
  Wi-Fi into the student's rooms. It opens the browser once the app answers. Control-C stops the
  app, then Supabase and Colima if it started them. `BRIDGE_CREW_PORT` moves it off 8080. If the
  port is taken: by the Game Studio, it just opens the browser; by another copy of the app (say
  a developer's `just run`), it stops that copy and starts the Game Studio; by another program,
  it says so and stops.

---

## The Game Studio

The teacher's side, from installing to stopping, is [users guide Part
1](users_guide.md#part-1-the-game-studio) and the [teacher's guide](teachers_guide.md). This
section is for running and testing the Game Studio from a checkout.

### Running it

```
mac% just game-studio           # the crew calls Claude (ANTHROPIC_API_KEY in .env.local)
mac% just game-studio-fixture   # canned crew replies: no key, no credits
```

Both open a tab at <http://localhost:8080> with the lobby a teacher sees: **Log me on as demo
user 1**, **Game Studio** already picked, and **Open a room**. One tab is enough, because a Game
Studio room has one seat, which the teacher and student share. Games are saved in `~/Bridge Crew
Games`: `just games` opens it, and `BRIDGE_CREW_GAMES_DIR` moves it. `just demo` reaches the same
rooms from its **Context** list, where **Game Studio** is the default.

To run it as a teacher's Mac does, on 127.0.0.1 only, run `scripts/game-studio-mac.sh` (the
Desktop shortcut's script). To try the installer itself, run `./scripts/install-mac.sh` from a
checkout: it sets that checkout up and leaves git alone. `BRIDGE_CREW_DESKTOP` keeps its
shortcuts off your Desktop, and `BRIDGE_CREW_START=no` skips its offer to start a session.

### Trying it by hand

A run through the main paths takes about 15 minutes. Under `just game-studio-fixture`, the
crew's work is canned ([Model providers](#model-providers) says what it makes), so this tests the
room rather than the crew. Run it again under `just game-studio` to see real games.

1. **Open a room.** Click **Log me on as demo user 1**, then type a name, a nickname and a title.
   Pick **New game** and **Simple**, press **Open a room**, then press **We've read it**.
2. **Ask the crew.** Type "Engineer, make a game where a mole pops up and you click it." The
   Engineer works, then hails. **Grant the floor** puts version 1 on screen, playable, and in the
   games folder. Then ask the Artist for a picture, the Sound designer for sounds, and the Sound
   designer again for music. Try **Use this**, **Play** and **On screen** on what they make.
3. **The Tester.** Type "Tester, check the current version." Its card shows each step as it plays.
   Its hail brings the test's pictures.
4. **A crash.** Under the fixture crew, ask the Engineer for something with "crash" in it, and
   grant its hail. The version throws on screen, and the room offers "Ask the Engineer to fix
   it?".
5. **Bigger games.** On the big screen, press **Bring in a game**, then **Choose a folder**, and
   pick `e2e/fixtures/games/cube`, a Three.js game in a folder. The Simple room asks **Make it
   Bigger and bring it in**, and the room says what it switched. `e2e/fixtures/games/one-file.html`
   comes into either kind of room as it is.
6. **A game from GitHub.** Press **Leave**. In the lobby, pick **Open a game**, paste a public
   repository's link (or its `github.io` play link), press **Look**, and open the room. The header
   says "from github.com/…", and the **GitHub** button shows the commit and "It's the same as
   GitHub's newest."
7. **Connect GitHub.** In the **GitHub** menu, press **Connect GitHub**, then **Get a code**, then
   **Copy the code and open GitHub**. Approve the code at github.com/login/device, signed in to a
   GitHub account you're happy to test with. The menu then says "Connected to GitHub as …", and
   **Bring in a game** opens a private repository's link. Press **Disconnect**, then revoke Bridge
   Crew at <https://github.com/settings/applications>.
8. **Stop and come back.** Press Control-C in the terminal, start the Game Studio again, and open
   the room from **Recent rooms**. Everything is still there.

Steps 6 and 7 can run without GitHub, using the tests' fake repositories. Then GitHub links open
from `e2e/fixtures/github`, and **Connect GitHub** is faked too: the code is `BRDG-CREW`, and it
connects as `studio-tester` after a second or two, with no page to visit.

```
mac% BRIDGE_CREW_GITHUB_FIXTURES=$PWD/e2e/fixtures/github just game-studio-fixture
```

These links work with the fake repositories:

- `studio-fixtures/space-cube` is a game written as modules.
- `github.com/studio-fixtures/space-cube/tree/1111111111111111111111111111111111111111` is its
  older commit, so the **GitHub** menu offers **Bring in GitHub's newest**.
- `studio-fixtures/needs-build` says it needs building first.

### Its automated tests

| Covers | Where |
| --- | --- |
| Bundling, the shelf, bringing in a game, modules, GitHub links and archives, the Tester's playtest, music | `src/lib/__tests__/` (`just test`; no stack needed) |
| The room, the crew, hails, suggestions, Back, Delete room | `e2e/game-studio.e2e.ts` |
| Versions, pictures, sounds, music, the Tester, crashes, Manage, Download | `e2e/made.e2e.ts` |
| Bigger rooms, game folders, saves, Bring in a game | `e2e/bigger.e2e.ts` |
| GitHub links, games written as modules, GitHub's newest, Connect GitHub, and the key never reaching the page | `e2e/github.e2e.ts` |
| A demo lobby's Game Studio room that opens with a game | `e2e/demo.e2e.ts` |

```
mac% just e2e e2e/game-studio.e2e.ts e2e/made.e2e.ts e2e/bigger.e2e.ts e2e/github.e2e.ts
```

`made`, `bigger` and `github` rely on the canned crew and the fake GitHub, so `just e2e-live`
skips them. Under it, `game-studio.e2e.ts` runs against Claude, which costs credits. No test
approves a code on github.com, so try step 7 by hand after changing Connect GitHub.

---

## Recipes

`just` lists them all, grouped:

| Recipe | Does |
| --- | --- |
| `just setup` | `bun install` and Playwright's Chromium (first time) |
| `just doctor` | Checks tools, Docker, the local stack, the key, port 8080 |
| `just demo` / `just demo-fixture` | Demo mode (above), with Claude / with canned replies, in a tab it opens |
| `just game-studio` / `just game-studio-fixture` | Demo mode with the Game Studio picked in the lobby (users guide Part 1), in a tab it opens |
| `just games` | Opens the folder Game Studio games are saved in |
| `just run` / `just run-fixture` | The app with ordinary sign-in, with Claude / with canned replies |
|  | All the run and demo recipes first stop an earlier copy of the app on port 8080, and say so |
| `just open` | Opens <http://localhost:8080> in a new browser tab |
| `just stop` | Stops whatever is serving port 8080 |
| `just infra` | Starts the local stack, seeds users, writes `.env` (the `run`/`demo`/`e2e` recipes do this first) |
| `just infra-reset` | Wipes local data, reapplies migrations, reseeds |
| `just infra-stop` / `just infra-clean` | Stops local Supabase, keeping / wiping its data |
| `just studio` / `just mail` / `just psql` | Supabase Studio, Mailpit, a database shell |
| `just db-types` | Regenerates the database types after a migration (finds Colima's Docker by itself; a failure leaves the old types in place) |
| `just shelf` | Rebuilds the Game Studio's shelf (Three.js and fonts) into `src/lib/vendor/` after changing a version |
| `just test` / `just check` | Unit tests / typecheck + unit tests |
| `just flows` | The explorer: every 9-event path through the state machines ([state_machines.md](state_machines.md)) |
| `just e2e` / `just e2e-live` | Playwright, canned replies / real Claude calls (costs credits) |
| `just lint` | ESLint + Prettier (older code still has a formatting backlog) |
| `just build` / `just start` | Production build / serve it on :3000 |

The recipes call the `bun run` scripts in `package.json` and the two shell
scripts in `scripts/`, which still work on their own.

---

## How this works

Everything runs as your normal macOS user — no `sudo`, nothing to shell into.

| Piece | Runs as | Where |
| --- | --- | --- |
| Postgres, Auth (GoTrue), Realtime, PostgREST, Storage, Studio, Mailpit | Docker containers managed by the Supabase CLI, inside the Colima VM | `127.0.0.1:55321`–`55327` |
| App + server functions (`src/lib/*.functions.ts`) | TanStack Start dev server (Vite, Node) | `localhost:8080` |
| Crew model calls (`src/lib/model.server.ts`) | HTTPS from the app server | Anthropic API |

The schema comes from `supabase/migrations/`, applied automatically by
`supabase start` (and by `just infra-reset`). Every `just infra` also applies
any migrations the database doesn't have yet, keeping its data, so an update
reaches a teacher's database. Local email auth auto-confirms sign-ups, so no
mailbox is needed; any auth email that is sent lands in Mailpit
at <http://127.0.0.1:55324>.

**Ports.** `supabase/config.toml` puts this project on the 553xx range so it
can run alongside another local Supabase project (e.g. FundFlow) on the default
543xx ports.

---

## Configuration files

| File | Written by | Holds |
| --- | --- | --- |
| `.env` | `just infra` (`scripts/test-infra.sh`), on every run | Local Supabase URL and publishable key, the secret key (server only), Playwright test login |
| `.env.local` | you | `ANTHROPIC_API_KEY`, model overrides, anything personal |

Both are gitignored. Vite loads `.env` then `.env.local` (later wins; variables
already set in your shell win over both), and TanStack Start copies the same
values into `process.env`, so the browser and the server functions always agree.
Only `VITE_` values go into the page's code. `SUPABASE_SECRET_KEY` has no prefix,
so it stays on the server, where one module uses it: `src/lib/github-connect.server.ts`,
for the GitHub tokens in `github_accounts`, which no sign-in can read.

---

## Model providers

`src/lib/model.server.ts` picks where crew calls go:

| Setting | Effect |
| --- | --- |
| `ANTHROPIC_API_KEY` set | Calls Claude. Crew: `claude-opus-5-5` (medium effort). Scribe: `claude-haiku-5-5` (low effort) — the plan's "cheap/fast model", since Scribe runs every few lines. |
| `BRIDGE_CREW_MODEL_PROVIDER=fixture` | Canned, deterministic replies — no key, no network. Used by `just e2e`, `just run-fixture` and `just demo-fixture`. |
| `BRIDGE_CREW_MODEL_PROVIDER=anthropic` | Force the Anthropic provider. |
| `BRIDGE_CREW_MODEL`, `BRIDGE_CREW_SCRIBE_MODEL` | Override the Claude model for the crew / Scribe. |
| `BRIDGE_CREW_INFERENCE_GEO=us` | Keeps inference in the US (`inference_geo`, at a small extra cost). |
| `BRIDGE_CREW_GAMES_DIR` | Where Game Studio games are saved. Default `~/Bridge Crew Games`; `just e2e` uses `test-results/games`. |
| `BRIDGE_CREW_GITHUB_FIXTURES` | A folder of fake GitHub repositories to open games from instead of GitHub (`src/lib/github.server.ts`). It fakes **Connect GitHub** too (`src/lib/github-connect.server.ts`). `just e2e` uses `e2e/fixtures/github`. Unset, games open from GitHub itself: public repositories, 60 requests an hour per network without signing in. |
| `BRIDGE_CREW_GITHUB_CLIENT_ID` | The GitHub OAuth app that **Connect GitHub** asks for a code. Default: Bridge Crew's own, in `src/lib/github.ts`. |

Opus requests in Deliberation rooms opt into server-side refusal fallback
(`fallbacks: "default"`). Game Studio rooms don't, so a request the model declines stays
declined. A room template can also set a model, effort and output limit per job
(`src/lib/templates/`): the Game Studio's Engineer can write a whole file in one turn, so it
streams with a 32,000-token limit. The Engineer builds with tools on a copy of the game
(`src/lib/build.ts`, `src/lib/build.server.ts`), and a run that uses tools logs its turns,
tokens and seconds to the server's output, such as `engineer build: {"turns":9,…}`. In tests,
the fixture crew makes a tiny game (the Engineer with canned uses of its tools, then a try),
an SVG mole and two sounds, and a task with "crash" in it makes a game that throws; a task
with "slowly" in it takes four seconds, long enough to redirect or stop.

---

## Tests

```
mac% just test        # Vitest unit tests — no infrastructure needed
mac% just e2e         # Playwright, canned crew replies (free)
mac% just e2e-live    # Playwright, real Claude calls (costs credits)
mac% just check       # typecheck + unit tests
```

Playwright starts its **own** dev servers against local Supabase: `:8181` for
most specs, signed in as the seeded `crew-a` user, and `:8182` in demo mode for
`e2e/demo.e2e.ts`. The demo spec opens its rooms as `crew-a`, never as a demo
user, so the demo users' recent rooms stay as you left them. The Game Studio's
specs are listed under [The Game Studio](#its-automated-tests). Sign-in fails loudly if the app
under test talks to any other Supabase (say, one a `.env.local` override points
at). The context-pack canary test needs a model that actually reads, so it only
runs under `e2e-live`. Extra arguments pass through to Playwright, e.g.
`just e2e e2e/demo.e2e.ts`.

To test a deployed instance, set `E2E_BASE_URL`, plus `E2E_EMAIL` and
`E2E_PASSWORD` for an account that exists there (the demo spec is skipped).

`just lint` runs ESLint with Prettier. Much of the older code hasn't been
through Prettier yet, so it reports a formatting backlog; `just check` leaves it
out for that reason.

---

## Production build

```
mac% just build      # standalone Node server in .output/
mac% just start      # serves it on http://localhost:3000 (PORT / HOST to change)
```

`start` reads `.env` and `.env.local` the same way the dev server does. Note that
the browser bundle's `VITE_*` values are baked in at build time, so build with
the `.env` of the Supabase the deployment will use (and without
`VITE_BRIDGE_CREW_DEMO`). Hosting this on a droplet (plan §7, Target 3) isn't
set up yet.

---

## Database

```
mac% just infra-reset    # wipe local data, reapply migrations, reseed users
mac% just db-types       # regenerate src/integrations/supabase/types.ts
mac% just psql           # database shell
```

Studio (`just studio`, <http://127.0.0.1:55323>) is the easiest way to look at
rows. To change the schema, add a new file under `supabase/migrations/`, run
`just infra` (which applies it and keeps your data) or `just infra-reset`, then
`just db-types`.

---

## Shutting down

```
mac% just infra-stop     # stop Supabase, keep data
mac% just infra-clean    # stop Supabase, wipe data
mac% colima stop         # when nothing else needs Docker
```

---

## Not built yet

- **Video/audio (LiveKit).** The app has no LiveKit code yet; it arrives in
  Phase 1. When it does, `test-infra.sh` grows a `livekit-server --dev` step,
  as in FundFlow.
- **Email sending.** Invites are recorded but not mailed (`sendInvite` returns
  `emailed: false`). See [`plans/email_setup.md`](plans/email_setup.md).
- **Deployment recipes.** The `justfile` covers local development only; droplet
  provisioning and deploy recipes come with plan §7, Target 3.

---

## Troubleshooting

**`Docker is not running` / `Cannot connect to the Docker daemon`.** `just infra`
(and every recipe that needs the stack) starts Colima when nothing answers. To
start it yourself: `colima start --memory 6 --cpu 4`. For your own shell, set
this in `~/.zshrc`:

```
export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"
```

**`Port 8080 is in use by another program`.** The run and demo recipes stop an
earlier copy of this app on port 8080 themselves, but leave any other program
alone. Stop it, or run `just stop` if that's safe; `just doctor` names what's
there.

**`Bind for 0.0.0.0:553xx failed: port is already allocated`.** Something else
holds a 553xx port — `docker ps` will show which project.

**A demo button says "Invalid login credentials".** The demo users aren't in
this database (say, right after `supabase db reset` run by hand). `just infra`
seeds them.

**Two tabs show the same demo user.** One tab was duplicated from the other, or
the app isn't in demo mode (no demo buttons on the lobby). Open a fresh tab
under `just demo`.

**No demo buttons on the lobby.** The tab is already signed in (the header
names the demo user; **Sign out** brings the buttons back), or the app on port
8080 isn't the demo one. `just demo` replaces an earlier copy of the app, so run
it again and use the tab it opens.

**Crew lines end with "could not finish: No model is configured for the crew."**
No `ANTHROPIC_API_KEY` reached the server. Add it to `.env.local` and restart
(`just demo` / `just run`), or use `just demo-fixture` / `just run-fixture`.

**Playwright: "The app under test signs in against …".** The dev server picked
up a different `SUPABASE_URL`, usually from `.env.local`.

**`playwright install chromium` sits at 0% forever.** Its downloader hangs under
Node 26. `just setup` runs it under Bun instead:
`bun --bun x playwright install chromium`.

**`brew install oven-sh/bun/bun` asks for the Xcode Command Line Tools.** Run
`xcode-select --install`, or use `npm install -g bun` instead.
