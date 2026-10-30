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
mac% cd ~/src/bridge-crew && just setup                    # bun install + Playwright's Chromium
mac% echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local     # your key; gitignored
```

**Every session:**

```
mac% just demo        # http://localhost:8080 with one-click demo logins
```

`just demo` starts Colima if it's stopped, brings up local Supabase, seeds the
users, writes `.env`, and runs the app. Open two tabs at
<http://localhost:8080> and click **Log me on as demo user 1** in one and
**Log me on as demo user 2** in the other — see [Demo mode](#demo-mode).

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

A typical run: demo user 1 opens a room and copies the invite link from
**Invite**; the second tab opens the link, clicks **Log me on as demo user 2**,
and comes aboard.

Demo mode is the `VITE_BRIDGE_CREW_DEMO=1` setting (`src/lib/demo.ts`). It is
meant for the local stack only; the demo accounts exist only where
`scripts/test-infra.sh` created them. Not to be confused with **Open a demo
room** in the lobby, which seeds a scripted conversation into a new room
([users guide §9](users_guide.md#9-demo-room)) and works in any mode.

---

## Recipes

`just` lists them all, grouped:

| Recipe | Does |
| --- | --- |
| `just setup` | `bun install` and Playwright's Chromium (first time) |
| `just doctor` | Checks tools, Docker, the local stack, the key, port 8080 |
| `just demo` / `just demo-fixture` | Demo mode (above), with Claude / with canned replies |
| `just run` / `just run-fixture` | The app with ordinary sign-in, with Claude / with canned replies |
| `just open` | Opens <http://localhost:8080> in a new browser tab |
| `just stop` | Stops whatever is serving port 8080 |
| `just infra` | Starts the local stack, seeds users, writes `.env` (the `run`/`demo`/`e2e` recipes do this first) |
| `just infra-reset` | Wipes local data, reapplies migrations, reseeds |
| `just infra-stop` / `just infra-clean` | Stops local Supabase, keeping / wiping its data |
| `just studio` / `just mail` / `just psql` | Supabase Studio, Mailpit, a database shell |
| `just db-types` | Regenerates the database types after a migration |
| `just test` / `just check` | Unit tests / typecheck + unit tests |
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
`supabase start` (and by `just infra-reset`). Local email auth auto-confirms
sign-ups, so no mailbox is needed; any auth email that is sent lands in Mailpit
at <http://127.0.0.1:55324>.

**Ports.** `supabase/config.toml` puts this project on the 553xx range so it
can run alongside another local Supabase project (e.g. FundFlow) on the default
543xx ports.

---

## Configuration files

| File | Written by | Holds |
| --- | --- | --- |
| `.env` | `just infra` (`scripts/test-infra.sh`), on every run | Local Supabase URL and publishable key, Playwright test login |
| `.env.local` | you | `ANTHROPIC_API_KEY`, model overrides, anything personal |

Both are gitignored. Vite loads `.env` then `.env.local` (later wins; variables
already set in your shell win over both), and TanStack Start copies the same
values into `process.env`, so the browser and the server functions always agree.

---

## Model providers

`src/lib/model.server.ts` picks where crew calls go:

| Setting | Effect |
| --- | --- |
| `ANTHROPIC_API_KEY` set | Calls Claude. Crew: `claude-opus-5-5` (medium effort). Scribe: `claude-haiku-5-5` (low effort) — the plan's "cheap/fast model", since Scribe runs every few lines. |
| `BRIDGE_CREW_MODEL_PROVIDER=fixture` | Canned, deterministic replies — no key, no network. Used by `just e2e`, `just run-fixture` and `just demo-fixture`. |
| `BRIDGE_CREW_MODEL_PROVIDER=anthropic` | Force the Anthropic provider. |
| `BRIDGE_CREW_MODEL`, `BRIDGE_CREW_SCRIBE_MODEL` | Override the Claude model for the crew / Scribe. |

Opus requests opt into server-side refusal fallback (`fallbacks: "default"`).

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
`e2e/demo.e2e.ts`. The demo spec signs in only; it opens no rooms, so the demo
users' recent rooms stay as you left them. Sign-in fails loudly if the app
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
`just infra-reset` (or `supabase migration up`), then `just db-types`.

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

**`Port 8080 is already in use`.** Another dev server is still running, maybe
`just run` in a different terminal. `just stop` frees the port.

**`Bind for 0.0.0.0:553xx failed: port is already allocated`.** Something else
holds a 553xx port — `docker ps` will show which project.

**A demo button says "Invalid login credentials".** The demo users aren't in
this database (say, right after `supabase db reset` run by hand). `just infra`
seeds them.

**Two tabs show the same demo user.** One tab was duplicated from the other, or
the app isn't in demo mode (no demo buttons on the lobby). Open a fresh tab
under `just demo`.

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
