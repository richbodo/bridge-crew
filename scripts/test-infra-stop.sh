#!/usr/bin/env bash
#
# Stops the local Bridge Crew Supabase stack started by test-infra.sh.
# Leaves Colima running (other projects may use it) and leaves dev servers
# alone (stop those with Ctrl-C in their terminal).
#
# Usage:
#   mac% ./scripts/test-infra-stop.sh          # stop, keep data for next start
#   mac% ./scripts/test-infra-stop.sh --clean  # stop and wipe local data
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CLEAN_FLAG="${1:-}"

info() { echo "==> $*"; }

if ! docker info >/dev/null 2>&1; then
  export DOCKER_HOST="unix://$HOME/.colima/default/docker.sock"
fi

cd "$PROJECT_DIR"

if curl -so /dev/null -w '%{http_code}' http://127.0.0.1:55321 2>/dev/null | grep -q '[2-4]'; then
  if [ "$CLEAN_FLAG" = "--clean" ]; then
    info "Stopping Supabase and wiping local data..."
    supabase stop --no-backup
  else
    info "Stopping Supabase (data kept for next start)..."
    supabase stop
  fi
else
  info "Supabase for this project is not running."
fi

echo ""
info "Done. Colima is still running; stop it with 'colima stop' if nothing else needs it."
