#!/bin/bash
#
# Starts a Game Studio session on a Mac: Docker (Colima), the local database, and the app, then
# opens the app in the browser. "Game Studio" on the Desktop runs this; scripts/install-mac.sh
# puts it there. Control-C stops the session, then stops whatever this started, so Docker
# doesn't keep its memory between lessons.
#
# The app listens on this Mac only (127.0.0.1), not the network: its one-click sign-in would
# let anyone on the same Wi-Fi into the student's rooms. BRIDGE_CREW_PORT changes the port.
#
set -uo pipefail

cd "$(dirname "$0")/.."
for brew in /opt/homebrew/bin/brew /usr/local/bin/brew; do
  if [ -x "$brew" ]; then
    eval "$("$brew" shellenv)"
    break
  fi
done
PORT="${BRIDGE_CREW_PORT:-8080}"
URL="http://localhost:$PORT"
COLIMA_SOCKET="unix://$HOME/.colima/default/docker.sock"

say() { printf '\033[1m%s\033[0m\n' "$*"; }
printf '\033]0;Game Studio\007'

if lsof -ti:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  say "The Game Studio is already running. Opening it in your browser."
  open "$URL"
  exit 0
fi

# What's already running stays running when the session stops.
docker_was_up=0
db_was_up=0
if docker info >/dev/null 2>&1 || DOCKER_HOST="$COLIMA_SOCKET" docker info >/dev/null 2>&1; then
  docker_was_up=1
fi
curl -so /dev/null http://127.0.0.1:55321 && db_was_up=1

opener=""
stop_all() {
  trap - EXIT INT TERM HUP
  [ -n "$opener" ] && kill "$opener" 2>/dev/null
  echo
  say "Stopping the Game Studio..."
  lsof -ti:"$PORT" -sTCP:LISTEN 2>/dev/null | xargs kill 2>/dev/null
  [ "$db_was_up" = 1 ] || just infra-stop >/dev/null 2>&1
  [ "$docker_was_up" = 1 ] || colima stop >/dev/null 2>&1
  say "Stopped. You can close this window."
}
trap stop_all EXIT
trap 'exit 130' INT TERM HUP

say "Starting the Game Studio. After the Mac has been restarted, this takes a minute or two."
echo
if ! just infra --quiet; then
  say "The local database didn't start; the lines above say why."
  exit 1
fi

# Once the app answers, the browser opens and the instructions come last in the window.
(
  for _ in $(seq 1 240); do
    if curl -so /dev/null "$URL"; then
      open "$URL"
      echo
      say "The Game Studio is open in your browser at $URL"
      say "Click \"Log me on as demo user 1\": that's you, the teacher."
      say "Keep this window open during the session. Press Control-C here to stop."
      echo
      exit 0
    fi
    sleep 1
  done
  say "The Game Studio didn't start in four minutes; the lines above may say why."
) &
opener=$!

# As `just game-studio` does, but on this Mac only.
VITE_BRIDGE_CREW_DEMO=1 VITE_BRIDGE_CREW_TEMPLATE=game-studio \
  bun run dev --host 127.0.0.1 --port "$PORT"
