# Bridge Crew — command runner. Run `just` with no args for the menu.
# Local development on this machine for now; droplet deploy/ops recipes arrive with plan §7,
# Target 3. Setup and troubleshooting: docs/dev_setup.md
#
# First time:  just setup
# Then try:    just demo      # open two tabs, click "Log me on as demo user 1" / "2"

set shell := ["bash", "-euo", "pipefail", "-c"]

port   := "8080"
url    := "http://localhost:" + port
opener := if os() == "macos" { "open" } else { "xdg-open" }

# Show the recipe menu.
default:
    @just --list


# ---- setup ---------------------------------------------------------------

# Install dependencies and Playwright's Chromium. Run this first.
[group('setup')]
setup:
    bun install
    @# Under Bun, not Node: Playwright's downloader hangs on Node 26.
    bun --bun x playwright install chromium
    @echo
    @echo "Setup complete. Put your key in .env.local (ANTHROPIC_API_KEY=sk-ant-...), then: just demo"

# Sanity-check tools, Docker, the local stack, the model key and port 8080.
[group('setup')]
doctor:
    #!/usr/bin/env bash
    set -uo pipefail
    ok=1
    say() { if [ "$1" = 0 ]; then echo "  OK   $2"; else echo "  FAIL $2"; ok=0; fi; }
    for tool in bun supabase colima docker; do
        command -v "$tool" >/dev/null; say $? "$tool installed"
    done
    docker info >/dev/null 2>&1 || DOCKER_HOST="unix://$HOME/.colima/default/docker.sock" docker info >/dev/null 2>&1
    say $? "Docker answering (just infra starts Colima)"
    [ -d node_modules ]; say $? "dependencies installed (just setup)"
    curl -so /dev/null http://127.0.0.1:55321; say $? "local Supabase answering on :55321 (just infra)"
    [ -f .env ]; say $? ".env written (just infra)"
    if [ -n "${ANTHROPIC_API_KEY:-}" ] || grep -qs '^ANTHROPIC_API_KEY=.\+' .env.local; then
        echo "  OK   ANTHROPIC_API_KEY set"
    else
        echo "  WARN no ANTHROPIC_API_KEY in .env.local; only the -fixture recipes will have a crew"
    fi
    if lsof -ti:{{port}} -sTCP:LISTEN >/dev/null 2>&1; then
        echo "  WARN port {{port}} in use (just stop)"
    else
        echo "  OK   port {{port}} free"
    fi
    echo
    if [ "$ok" = 1 ]; then echo "All checks passed."; else echo "Some checks failed; see above."; exit 1; fi


# ---- local stack ---------------------------------------------------------

# Start local Supabase (and Colima if it's stopped), seed users, write .env. Safe to rerun.
[group('infra')]
infra *flags: _docker
    ./scripts/test-infra.sh {{flags}}

# Wipe local data, reapply migrations, reseed users.
[group('infra')]
infra-reset: _docker
    ./scripts/test-infra.sh --reset

# Stop local Supabase, keeping its data. Colima keeps running.
[group('infra')]
infra-stop:
    ./scripts/test-infra-stop.sh

# Stop local Supabase and wipe its data.
[group('infra')]
infra-clean:
    ./scripts/test-infra-stop.sh --clean

# Open Supabase Studio, to browse tables and rows.
[group('infra')]
studio:
    {{opener}} http://127.0.0.1:55323

# Open Mailpit, where any email the local stack sends lands.
[group('infra')]
mail:
    {{opener}} http://127.0.0.1:55324

# psql into the local database.
[group('infra')]
psql:
    psql "postgresql://postgres:postgres@127.0.0.1:55322/postgres"

# Regenerate src/integrations/supabase/types.ts after adding a migration.
[group('infra')]
db-types:
    bun run db:types

# Docker for the Supabase CLI: start Colima unless something already answers.
_docker:
    #!/usr/bin/env bash
    set -euo pipefail
    docker info >/dev/null 2>&1 && exit 0
    DOCKER_HOST="unix://$HOME/.colima/default/docker.sock" docker info >/dev/null 2>&1 && exit 0
    command -v colima >/dev/null || { echo "Docker isn't running and Colima isn't installed: brew install colima docker" >&2; exit 1; }
    echo "==> Starting Colima..."
    colima start --memory 6 --cpu 4


# ---- run -----------------------------------------------------------------

# The app at http://localhost:8080; the crew calls Claude. Ctrl-C to stop.
[group('run')]
run: (infra "--quiet")
    bun run dev

# The app with canned crew replies: no key, no credits.
[group('run')]
run-fixture: (infra "--quiet")
    bun run dev:fixture

# Demo mode: one-click "Log me on as demo user 1 / 2", one sign-in per tab. Crew calls Claude.
[group('run')]
demo: (infra "--quiet") (_demo-banner "Claude")
    VITE_BRIDGE_CREW_DEMO=1 bun run dev

# Demo mode with canned crew replies: no key, no credits.
[group('run')]
demo-fixture: (infra "--quiet") (_demo-banner "canned fixture replies")
    VITE_BRIDGE_CREW_DEMO=1 bun run dev:fixture

# Open the app in a new browser tab (run it twice for the second human).
[group('run')]
open:
    {{opener}} {{url}}

# Stop whatever is serving port 8080, e.g. a dev server left running in another terminal.
[group('run')]
stop:
    #!/usr/bin/env bash
    set -uo pipefail
    pids=$(lsof -ti:{{port}} -sTCP:LISTEN 2>/dev/null || true)
    if [ -z "$pids" ]; then echo "Nothing is serving port {{port}}."; exit 0; fi
    kill $pids 2>/dev/null || true
    for _ in 1 2 3 4 5 6 7 8 9 10; do
        sleep 0.3
        lsof -ti:{{port}} -sTCP:LISTEN >/dev/null 2>&1 || { echo "Stopped the server on port {{port}}."; exit 0; }
    done
    kill -9 $(lsof -ti:{{port}} -sTCP:LISTEN 2>/dev/null) 2>/dev/null || true
    echo "Stopped the server on port {{port}} (forced)."

_demo-banner crew:
    #!/usr/bin/env bash
    set -euo pipefail
    if [ "{{crew}}" = "Claude" ] && [ -z "${ANTHROPIC_API_KEY:-}" ] && ! grep -qs '^ANTHROPIC_API_KEY=.\+' .env.local; then
        echo "NOTE: no ANTHROPIC_API_KEY in .env.local, so crew summons will fail. Try: just demo-fixture"
    fi
    cat <<EOF

    Demo mode on {{url}}  (crew: {{crew}})

      1. Open two tabs at {{url}}  (just open, twice)
      2. In one, click "Log me on as demo user 1"; in the other, "demo user 2".
         Each tab keeps its own sign-in.
      3. Demo user 1 opens a room; demo user 2 joins with its code or invite link.

    Use new tabs rather than Duplicate Tab, which copies the tab's sign-in.
    Ctrl-C stops the app; the local stack keeps running (just infra-stop).

    EOF


# ---- test ----------------------------------------------------------------

# Unit tests (Vitest). Extra args pass through, e.g. `just test model`.
[group('test')]
test *args:
    bun run test {{args}}

# Browser tests (Playwright) on their own servers, canned crew replies. Args pass through.
[group('test')]
e2e *args: (infra "--quiet")
    bun run e2e {{args}}

# Browser tests with real Claude calls (costs credits).
[group('test')]
e2e-live *args: (infra "--quiet")
    bun run e2e:live {{args}}

# Typecheck and unit tests; run before pushing.
[group('test')]
check:
    bunx tsc --noEmit
    bun run test

# ESLint + Prettier. Much of the older code isn't formatted yet, so expect a backlog.
[group('test')]
lint:
    bun run lint


# ---- build ---------------------------------------------------------------

# Production build: a standalone Node server in .output/.
[group('build')]
build:
    bun run build

# Serve the production build on http://localhost:3000 (PORT to change); builds first if needed.
[group('build')]
start:
    @[ -f .output/server/index.mjs ] || just build
    bun run start
