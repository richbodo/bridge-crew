# Developer Setup Guide — local stack

Run Bridge Crew entirely on your own machine: local Supabase for the database,
auth and realtime, the TanStack Start dev server for the app and its server
functions, and the Anthropic API for the crew's model calls. No Lovable
services are involved. This is Target 2 in the plan
([§7](plans/BRIDGE_CREW_PLAN.md#7-deployment-targets-and-the-development-loop)).

## Quickstart (TL;DR)

**First time only:**

```
mac% brew install colima docker supabase/tap/supabase
mac% npm install -g bun
mac% cd ~/src/bridge-crew && bun install && bun --bun x playwright install chromium
mac% echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.localdev.local     # your key; gitignored
```

**Every session:**

```
mac% colima start --memory 6 --cpu 4
mac% ./scripts/test-infra.sh        # local Supabase + test users + .env.localdev
mac% bun run dev:local              # http://localhost:8080 against the LOCAL stack
```

Sign in as `crew-a@example.com` / `bridge-crew-local` (or `crew-b@example.com`
in a second browser profile to be the second human).

> ⚠️ Use `bun run dev:local`, **not** `bun run dev` — plain `dev` points the app
> at the **Lovable Cloud** database. See
> [Which database am I talking to?](#which-database-am-i-talking-to).

---

## How this works

Everything runs as your normal macOS user — no `sudo`, nothing to shell into.

| Piece | Runs as | Where |
| --- | --- | --- |
| Postgres, Auth (GoTrue), Realtime, PostgREST, Storage, Studio, Mailpit | Docker containers managed by the Supabase CLI, inside the Colima VM | `127.0.0.1:55321`–`55327` |
| App + server functions (`src/lib/*.functions.ts`) | TanStack Start dev server (Vite, Node) | `localhost:8080` |
| Crew model calls (`src/lib/model.server.ts`) | HTTPS from the dev server | Anthropic API |

The schema comes from `supabase/migrations/`, applied automatically by
`supabase start` (and by `./scripts/test-infra.sh --reset`). Local email auth
auto-confirms sign-ups, so no mailbox is needed; any auth email that is sent
lands in Mailpit at <http://127.0.0.1:55324>.

**Ports.** `supabase/config.toml` puts this project on the 553xx range so it
can run alongside another local Supabase project (e.g. FundFlow) on the default
543xx ports. Those settings are local-only; Lovable Cloud ignores them.

---

## Which database am I talking to?

The committed `.env` holds the **Lovable Cloud** project. `.env.localdev` (written by
`scripts/test-infra.sh`, gitignored) holds the **local** one. Vite picks by mode,
and TanStack Start copies the same values into `process.env`, so the browser and
the server functions always agree:

| Command | Vite mode | Env files | Talks to |
| --- | --- | --- | --- |
| `bun run dev` | development | `.env` | ☁️ Lovable Cloud |
| `bun run dev:local` | localdev | `.env` ← `.env.localdev` ← `.env.localdev.local` | 💻 local Supabase |
| `bun run dev:fixture` | localdev | same as `dev:local` | 💻 local, canned crew replies |
| `bun run build` | production | `.env` | ☁️ Lovable Cloud |

Later files override earlier ones; variables already set in your shell override all of them.

Why `localdev` and not FundFlow's `--mode test`? TanStack Start's dev server
refuses to serve pages in mode `test` (that mode belongs to Vitest), and a
mode named `local` would collide with Vite's `.env.local`, which loads in
every mode — including plain `bun run dev`.

---

## Model providers

`src/lib/model.server.ts` picks where crew calls go:

| Setting | Effect |
| --- | --- |
| `ANTHROPIC_API_KEY` set | Calls Claude directly. Crew: `claude-opus-5-5` (medium effort). Scribe: `claude-haiku-5-5` (low effort) — the plan's "cheap/fast model", since Scribe runs every few lines. |
| only `LOVABLE_API_KEY` set | Lovable's AI gateway (how the Lovable-hosted app runs today). |
| `BRIDGE_CREW_MODEL_PROVIDER=fixture` | Canned, deterministic replies — no key, no network. Used by `bun run e2e` and `bun run dev:fixture`. |
| `BRIDGE_CREW_MODEL_PROVIDER=anthropic\|lovable` | Force a provider. |
| `BRIDGE_CREW_MODEL`, `BRIDGE_CREW_SCRIBE_MODEL` | Override the Claude model for the crew / Scribe. |

Put keys and overrides in `.env.localdev.local` — `test-infra.sh` never touches it.
Opus requests opt into server-side refusal fallback (`fallbacks: "default"`).

---

## Tests

```
mac% bun run test       # Vitest unit tests — no infrastructure needed
mac% bun run e2e        # Playwright against the local stack, canned crew replies (free)
mac% bun run e2e:live   # Playwright against the local stack, real Claude calls (costs credits)
```

When `.env.localdev` exists, Playwright starts its **own** dev server on `:8181`
against local Supabase and signs in as the seeded `crew-a` user. Sign-in fails
loudly if the app under test talks to any Supabase other than the local one, so
a local run can never write test rooms into the Lovable Cloud database. The
context-pack canary test needs a model that actually reads, so it only runs
under `e2e:live`.

To test a deployed preview instead, set `E2E_BASE_URL` (see `e2e/auth.setup.e2e.ts`
for the credential options).

---

## Resetting and shutting down

```
mac% ./scripts/test-infra.sh --reset     # wipe local data, reapply migrations, reseed users
mac% ./scripts/test-infra-stop.sh        # stop Supabase, keep data
mac% ./scripts/test-infra-stop.sh --clean  # stop Supabase, wipe data
mac% colima stop                          # when nothing else needs Docker
```

Studio (<http://127.0.0.1:55323>) is the easiest way to look at rows. Direct SQL:

```
mac% psql "postgresql://postgres:postgres@127.0.0.1:55322/postgres"
```

---

## Not local yet

- **Video/audio (LiveKit).** The app has no LiveKit code yet; it arrives in
  Phase 1. When it does, `test-infra.sh` grows a `livekit-server --dev` step,
  as in FundFlow.
- **Email sending.** Invites are recorded but not mailed (`sendInvite` returns
  `emailed: false`). See [`plans/email_setup.md`](plans/email_setup.md).

## Lovable-specific code that stays inert locally

These are kept so the same branch keeps working on Lovable; none of them make
network calls from a local run:

- `@lovable.dev/vite-tanstack-config` — the Vite wrapper. Off Lovable's sandbox it
  only wires up the standard plugins; its asset proxy needs `LOVABLE_PREVIEW_HOST`.
- `src/integrations/supabase/previewAuthStorage.ts` — only active inside a Lovable
  preview frame; otherwise plain `localStorage`.
- `src/lib/lovable-error-reporting.ts` — only reports when the Lovable editor
  injects its hooks.

---

## Troubleshooting

**`Docker is not running` / `Cannot connect to the Docker daemon`.** Start Colima
(`colima start --memory 6 --cpu 4`). The scripts fall back to Colima's socket
automatically; for your own shell, export it:

```
mac% export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"
```

**`Bind for 0.0.0.0:553xx failed: port is already allocated`.** Something else
holds a 553xx port — `docker ps` will show which project.

**Crew lines end with "could not finish: No model is configured for the crew."**
No `ANTHROPIC_API_KEY` reached the dev server. Add it to `.env.localdev.local` and
restart `bun run dev:local`, or use `bun run dev:fixture`.

**Playwright: "The app under test signs in against https://…supabase.co".** A
dev server on the test port was started without `--mode localdev`. Stop it; Playwright
starts its own.

**`playwright install chromium` sits at 0% forever.** Its downloader hangs under
Node 26. Run it under Bun instead: `bun --bun x playwright install chromium`.

**`brew install oven-sh/bun/bun` asks for the Xcode Command Line Tools.** Use
`npm install -g bun` instead.
