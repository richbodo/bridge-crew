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
    if pid=$(lsof -ti:{{port}} -sTCP:LISTEN 2>/dev/null | head -1) && [ -n "$pid" ]; then
        echo "  WARN port {{port}} in use by $(ps -o command= -p "$pid" | cut -c1-70)"
        echo "       (the run and demo recipes stop an earlier copy of the app; just stop frees the port)"
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

# Rebuild the Game Studio's shelf (Three.js and fonts) into src/lib/vendor/ after changing a version.
[group('infra')]
shelf:
    bun scripts/build-shelf.ts

# Regenerate src/integrations/supabase/types.ts after adding a migration.
[group('infra')]
db-types:
    #!/usr/bin/env bash
    set -euo pipefail
    # The Supabase CLI reads the schema through Docker; under Colima, that's Colima's socket.
    docker info >/dev/null 2>&1 || export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"
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
run: _free-port (infra "--quiet")
    bun run dev

# The app with canned crew replies: no key, no credits.
[group('run')]
run-fixture: _free-port (infra "--quiet")
    bun run dev:fixture

# Demo mode: opens a tab with "Log me on as demo user 1 / 2", one sign-in per tab. Crew calls Claude.
[group('run')]
demo: _free-port (infra "--quiet") (_demo-banner "Claude") (_serve-demo "dev")

# Demo mode with canned crew replies: no key, no credits.
[group('run')]
demo-fixture: _free-port (infra "--quiet") (_demo-banner "canned fixture replies") (_serve-demo "dev:fixture")

# The Game Studio: demo mode with the lobby on the Game Studio's page, in a tab it opens. Crew calls Claude.
[group('run')]
game-studio: _free-port (infra "--quiet") (_studio-banner "Claude") (_serve-demo "dev" "game-studio")

# The Game Studio with canned crew replies: no key, no credits.
[group('run')]
game-studio-fixture: _free-port (infra "--quiet") (_studio-banner "canned fixture replies") (_serve-demo "dev:fixture" "game-studio")

# Open the folder where Game Studio games are saved (BRIDGE_CREW_GAMES_DIR in .env.local to move it).
[group('run')]
games:
    #!/usr/bin/env bash
    set -euo pipefail
    dir="${BRIDGE_CREW_GAMES_DIR:-$(grep -s '^BRIDGE_CREW_GAMES_DIR=' .env.local | cut -d= -f2- | tr -d '"' || true)}"
    dir="${dir:-$HOME/Bridge Crew Games}"
    mkdir -p "$dir"
    echo "Games are saved in: $dir"
    {{opener}} "$dir"

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

# Port 8080 for the app. An earlier copy of this app, in any mode, is stopped and named, so the
# browser never shows the old one; anything else holding the port is reported, and left alone.
_free-port:
    #!/usr/bin/env bash
    set -uo pipefail
    pids=$(lsof -ti:{{port}} -sTCP:LISTEN 2>/dev/null || true)
    [ -z "$pids" ] && exit 0
    here=$(pwd -P)
    for pid in $pids; do
        # This app's dev server: Vite, run from this folder.
        cwd=$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')
        if [ "$cwd" != "$here" ] || ! ps -o command= -p "$pid" | grep -q 'vite'; then
            echo "Port {{port}} is in use by another program: $(ps -o command= -p "$pid" | cut -c1-100)" >&2
            echo "Stop it, then run this again. If it's safe to stop, just stop does it." >&2
            exit 1
        fi
    done
    pid=$(echo "$pids" | head -1)
    mode="not in demo mode"
    ps eww -p "$pid" 2>/dev/null | grep -q 'VITE_BRIDGE_CREW_DEMO=1' && mode="in demo mode"
    echo "==> An earlier copy of the app was still running on port {{port}} ($mode, since $(ps -o lstart= -p "$pid" | xargs))."
    echo "    Stopping it, so this one can start."
    just stop >/dev/null

# The dev server in demo mode, opening a tab once it answers, so the demo buttons are the first
# thing you see. template opens the lobby on that kind of room's page.
_serve-demo script template="":
    #!/usr/bin/env bash
    set -euo pipefail
    ( for _ in $(seq 1 120); do
        if curl -so /dev/null {{url}}; then {{opener}} {{url}}; exit 0; fi
        sleep 1
      done ) &
    opening=$!
    trap 'kill $opening 2>/dev/null || true' EXIT
    export VITE_BRIDGE_CREW_DEMO=1
    if [ -n "{{template}}" ]; then export VITE_BRIDGE_CREW_TEMPLATE="{{template}}"; fi
    bun run {{script}}

_demo-banner crew:
    #!/usr/bin/env bash
    set -euo pipefail
    if [ "{{crew}}" = "Claude" ] && [ -z "${ANTHROPIC_API_KEY:-}" ] && ! grep -qs '^ANTHROPIC_API_KEY=.\+' .env.local; then
        echo "NOTE: no ANTHROPIC_API_KEY in .env.local, so crew summons will fail. Try: just demo-fixture"
    fi
    cat <<EOF

    Demo mode on {{url}}  (crew: {{crew}})

      1. A tab opens at {{url}} once the app is up. Click "Log me on as demo user 1".
      2. Open a second tab (just open, or ⌘T and the same address) and click "demo user 2".
         Each tab keeps its own sign-in.
      3. Demo user 1 picks Deliberation, then a Context (a context pack), and opens a demo room;
         demo user 2 joins with its code or invite link. Game Studio rooms need one tab.

    Use new tabs rather than Duplicate Tab, which copies the tab's sign-in.
    Ctrl-C stops the app; the local stack keeps running (just infra-stop).

    EOF


_studio-banner crew:
    #!/usr/bin/env bash
    set -euo pipefail
    if [ "{{crew}}" = "Claude" ] && [ -z "${ANTHROPIC_API_KEY:-}" ] && ! grep -qs '^ANTHROPIC_API_KEY=.\+' .env.local; then
        echo "NOTE: no ANTHROPIC_API_KEY in .env.local, so crew summons will fail. Try: just game-studio-fixture"
    fi
    cat <<EOF

    Game Studio on {{url}}  (crew: {{crew}})

      1. A tab opens at {{url}} once the app is up. Click "Log me on as demo user 1": you're the teacher.
      2. Press Quick start: Teacher and Student, a new game, Bigger games. Or change the
         settings below it first (the student's nickname, Open a game, Simple games).
      3. Read the classroom notice, then let the student start: "Storyteller, what's the story?"

    One teacher and one student share this one sign-in; the switch above the message box
    says who's talking. Ctrl-C stops the app; the local stack keeps running (just infra-stop).

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

# The explorer: every sequence of 9 events through the room's state machines (docs/state_machines.md).
[group('test')]
flows:
    EXPLORER_DEPTH=9 bun run test src/lib/__tests__/explorer.test.ts

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
