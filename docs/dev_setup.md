# Developer Setup Guide

Bridge Crew runs entirely on your own machine: local Supabase for the database,
auth and realtime; the TanStack Start dev server for the app and its server
functions; and the Anthropic API for the crew's model calls.

## Quickstart (TL;DR)

**First time only:**

```
mac% brew install colima docker supabase/tap/supabase
mac% npm install -g bun
mac% cd ~/src/bridge-crew && bun install && bun --bun x playwright install chromium
mac% echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local     # your key; gitignored
```

**Every session:**

```
mac% colima start --memory 6 --cpu 4
mac% ./scripts/test-infra.sh        # local Supabase + test users + .env
mac% bun run dev                    # http://localhost:8080
```

Sign in as `crew-a@example.com` / `bridge-crew-local`. To be the second human,
use another browser profile (or a private window) and sign in as
`crew-b@example.com`.

---

## How this works

Everything runs as your normal macOS user — no `sudo`, nothing to shell into.

| Piece | Runs as | Where |
| --- | --- | --- |
| Postgres, Auth (GoTrue), Realtime, PostgREST, Storage, Studio, Mailpit | Docker containers managed by the Supabase CLI, inside the Colima VM | `127.0.0.1:55321`–`55327` |
| App + server functions (`src/lib/*.functions.ts`) | TanStack Start dev server (Vite, Node) | `localhost:8080` |
| Crew model calls (`src/lib/model.server.ts`) | HTTPS from the app server | Anthropic API |

The schema comes from `supabase/migrations/`, applied automatically by
`supabase start` (and by `./scripts/test-infra.sh --reset`). Local email auth
auto-confirms sign-ups, so no mailbox is needed; any auth email that is sent
lands in Mailpit at <http://127.0.0.1:55324>.

**Ports.** `supabase/config.toml` puts this project on the 553xx range so it
can run alongside another local Supabase project (e.g. FundFlow) on the default
543xx ports.

---

## Configuration files

| File | Written by | Holds |
| --- | --- | --- |
| `.env` | `scripts/test-infra.sh`, on every run | Local Supabase URL and publishable key, Playwright test login |
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
| `BRIDGE_CREW_MODEL_PROVIDER=fixture` | Canned, deterministic replies — no key, no network. Used by `bun run e2e` and `bun run dev:fixture`. |
| `BRIDGE_CREW_MODEL_PROVIDER=anthropic` | Force the Anthropic provider. |
| `BRIDGE_CREW_MODEL`, `BRIDGE_CREW_SCRIBE_MODEL` | Override the Claude model for the crew / Scribe. |

Opus requests opt into server-side refusal fallback (`fallbacks: "default"`).

---

## Tests

```
mac% bun run test       # Vitest unit tests — no infrastructure needed
mac% bun run e2e        # Playwright, canned crew replies (free)
mac% bun run e2e:live   # Playwright, real Claude calls (costs credits)
```

Playwright starts its **own** dev server on `:8181` against local Supabase and
signs in as the seeded `crew-a` user. Sign-in fails loudly if the app under test
talks to any other Supabase (say, one a `.env.local` override points at). The
context-pack canary test needs a model that actually reads, so it only runs
under `e2e:live`.

To test a deployed instance, set `E2E_BASE_URL`, plus `E2E_EMAIL` and
`E2E_PASSWORD` for an account that exists there.

---

## Production build

```
mac% bun run build      # standalone Node server in .output/
mac% bun run start      # serves it on http://localhost:3000 (PORT / HOST to change)
```

`start` reads `.env` and `.env.local` the same way the dev server does. Note that
the browser bundle's `VITE_*` values are baked in at build time, so build with
the `.env` of the Supabase the deployment will use. Hosting this on a droplet
(plan §7, Target 3) isn't set up yet.

---

## Database

```
mac% ./scripts/test-infra.sh --reset    # wipe local data, reapply migrations, reseed users
mac% bun run db:types                   # regenerate src/integrations/supabase/types.ts
mac% psql "postgresql://postgres:postgres@127.0.0.1:55322/postgres"
```

Studio (<http://127.0.0.1:55323>) is the easiest way to look at rows. To change
the schema, add a new file under `supabase/migrations/`, run `--reset` (or
`supabase migration up`), then `bun run db:types`.

---

## Shutting down

```
mac% ./scripts/test-infra-stop.sh          # stop Supabase, keep data
mac% ./scripts/test-infra-stop.sh --clean  # stop Supabase, wipe data
mac% colima stop                           # when nothing else needs Docker
```

---

## Not built yet

- **Video/audio (LiveKit).** The app has no LiveKit code yet; it arrives in
  Phase 1. When it does, `test-infra.sh` grows a `livekit-server --dev` step,
  as in FundFlow.
- **Email sending.** Invites are recorded but not mailed (`sendInvite` returns
  `emailed: false`). See [`plans/email_setup.md`](plans/email_setup.md).

---

## Troubleshooting

**`Docker is not running` / `Cannot connect to the Docker daemon`.** Start Colima
(`colima start --memory 6 --cpu 4`). The scripts fall back to Colima's socket
automatically; for your own shell, set this in `~/.zshrc`:

```
export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"
```

**`Bind for 0.0.0.0:553xx failed: port is already allocated`.** Something else
holds a 553xx port — `docker ps` will show which project.

**Crew lines end with "could not finish: No model is configured for the crew."**
No `ANTHROPIC_API_KEY` reached the server. Add it to `.env.local` and restart
`bun run dev`, or use `bun run dev:fixture`.

**Playwright: "The app under test signs in against …".** The dev server picked
up a different `SUPABASE_URL`, usually from `.env.local`.

**`playwright install chromium` sits at 0% forever.** Its downloader hangs under
Node 26. Run it under Bun instead: `bun --bun x playwright install chromium`.

**`brew install oven-sh/bun/bun` asks for the Xcode Command Line Tools.** Run
`xcode-select --install`, or use `npm install -g bun` instead.
