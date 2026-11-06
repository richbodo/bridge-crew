#!/bin/bash
#
# Installs Bridge Crew's Game Studio on a Mac, for someone who doesn't use the command line.
# The users guide (§1) says to paste this line into Terminal:
#
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/richbodo/bridge-crew/main/scripts/install-mac.sh)"
#
# It installs Homebrew and the tools Bridge Crew needs, downloads Bridge Crew into ~/bridge-crew
# (or updates it), saves an Anthropic API key in .env.local, starts the local database once, and
# puts "Game Studio" (which starts a session) and "Bridge Crew Games" on the Desktop.
#
# Run it again to update Bridge Crew or change the key: it skips whatever is already done. Run
# from a checkout (./scripts/install-mac.sh), it sets up that checkout and leaves git alone.
#
# Settings, for testing: BRIDGE_CREW_DIR (default ~/bridge-crew), BRIDGE_CREW_DESKTOP (default
# ~/Desktop), BRIDGE_CREW_START=no (don't offer to start a session at the end).
#
set -euo pipefail

REPO_URL="https://github.com/richbodo/bridge-crew.git"
KEYS_URL="https://platform.claude.com/settings/keys"
BILLING_URL="https://platform.claude.com/settings/billing"
DESKTOP="${BRIDGE_CREW_DESKTOP:-$HOME/Desktop}"

step() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
note() { printf '    %s\n' "$*"; }
die() {
  printf '\n\033[1;31mStopped: %s\033[0m\n' "$*" >&2
  printf '    Fix that, then paste the same line again. It carries on from where it stopped.\n' >&2
  exit 1
}

[ "$(uname -s)" = Darwin ] || die "this installer is for a Mac."

# ---------- 1. Homebrew ----------
brew_env() {
  local brew
  for brew in /opt/homebrew/bin/brew /usr/local/bin/brew; do
    if [ -x "$brew" ]; then
      eval "$("$brew" shellenv)"
      return 0
    fi
  done
  return 1
}

step "Homebrew, which installs the other tools"
if brew_env; then
  note "Already installed."
else
  note "It asks for the password you use to log in to this Mac. Nothing shows on screen"
  note "while you type it; that's normal. Then press Return when it asks."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
    || die "Homebrew didn't install. It needs an administrator account on this Mac."
  brew_env || die "Homebrew installed, but this window can't find it. Open a new Terminal window."
fi

# ---------- 2. The tools ----------
step "The tools: Node, Bun, just, the Supabase CLI, and Colima for Docker"
need=""
for pair in git:git node:node bun:oven-sh/bun/bun just:just supabase:supabase/tap/supabase \
  colima:colima docker:docker; do
  command -v "${pair%%:*}" >/dev/null 2>&1 || need="$need ${pair#*:}"
done
if [ -n "$need" ]; then
  note "Installing:$need. This can take a few minutes."
  # shellcheck disable=SC2086 # one word per formula
  brew install $need || die "Homebrew couldn't install:$need."
else
  note "Already installed."
fi

# ---------- 3. Bridge Crew itself ----------
step "Bridge Crew"
here="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || true)"
if [ -n "$here" ] && [ -f "$here/install-mac.sh" ] && [ -f "$here/../justfile" ]; then
  DIR="$(cd "$here/.." && pwd)"
  note "Setting up this copy: $DIR"
else
  DIR="${BRIDGE_CREW_DIR:-$HOME/bridge-crew}"
  if [ -d "$DIR/.git" ]; then
    note "Updating $DIR"
    git -C "$DIR" pull --ff-only || die "couldn't update $DIR."
  else
    note "Downloading into $DIR"
    git clone --quiet "$REPO_URL" "$DIR" || die "couldn't download Bridge Crew."
  fi
fi
cd "$DIR"
if ! bun install --frozen-lockfile >/dev/null 2>&1; then
  bun install --frozen-lockfile || die "couldn't install Bridge Crew's packages (bun install)."
fi
# The Tester plays each version in a browser that runs out of sight. Without it, everything but
# the Tester's playing still works, so a failed download doesn't stop the install.
# Under Bun, not Node: Playwright's downloader hangs on Node 26 (as in `just setup`).
note "Getting the browser the Tester plays games in (about 90 MB, the first time)..."
if ! bun --bun x playwright-core install --only-shell chromium >/dev/null 2>&1; then
  bun --bun x playwright-core install --only-shell chromium \
    || note "That didn't download, so the Tester can't play games yet. Paste the install line again later."
fi
note "Ready."

# ---------- 4. The Anthropic API key ----------
# Sends one tiny request (a one-word reply, a fraction of a cent) to check the key and its credit,
# and sets CHECK to ok, bad, credit or other, with Anthropic's words in CHECK_MESSAGE. The key goes
# to curl on standard input, so it never appears in the list of running programs.
check_key() {
  local body code
  body="$(mktemp)"
  code="$(printf 'x-api-key: %s\n' "$1" | curl -sS -o "$body" -w '%{http_code}' --max-time 30 \
    -H @- -H 'anthropic-version: 2026-10-21' -H 'content-type: application/json' \
    -d '{"model":"claude-haiku-5-5","max_tokens":1,"messages":[{"role":"user","content":"Hi"}]}' \
    https://api.anthropic.com/v1/messages 2>/dev/null || true)"
  CHECK_MESSAGE="$(node -e 'let s="";process.stdin.on("data",(d)=>(s+=d)).on("end",()=>{try{console.log(JSON.parse(s).error.message)}catch{}})' <"$body" 2>/dev/null || true)"
  rm -f "$body"
  case "$code" in
    200) CHECK=ok ;;
    401) CHECK=bad ;;
    402) CHECK=credit ;;
    400) case "$CHECK_MESSAGE" in *[Cc]redit*) CHECK=credit ;; *) CHECK=other ;; esac ;;
    *) CHECK=other ;;
  esac
}

save_key() {
  local tmp
  [ "$1" = "$saved" ] && return 0
  tmp="$(mktemp)"
  { grep -v '^ANTHROPIC_API_KEY=' .env.local 2>/dev/null || true; printf 'ANTHROPIC_API_KEY=%s\n' "$1"; } >"$tmp"
  mv "$tmp" .env.local
  chmod 600 .env.local
}

step "Your Anthropic API key"
saved="$(grep -s '^ANTHROPIC_API_KEY=' .env.local | tail -n 1 | cut -d= -f2- | tr -d "\"' " || true)"
cat <<EOF
    The crew's replies come from Claude, an AI model made by Anthropic. Bridge Crew reaches
    Claude with an API key: a long password that starts with sk-ant-. Anthropic charges the
    account the key belongs to for what the crew uses, so that account needs credit.

      1. Sign up or sign in at $KEYS_URL
      2. Under Billing, add a payment method and some credit.
      3. Under API keys, press Create Key, name it "Game Studio", and copy the key.
         Anthropic shows it only once.

    The key is saved on this Mac only, in $DIR/.env.local.
EOF
if [ -n "$saved" ]; then
  note ""
  note "A key is already saved. Press Return to keep it, or paste a new one."
else
  open "$KEYS_URL" 2>/dev/null || true
fi
while :; do
  printf '\n    Paste the key here and press Return. It won'"'"'t show on screen: '
  key=""
  IFS= read -rs key </dev/tty || die "nothing could be typed here. Run the line in a Terminal window."
  echo
  key="$(printf '%s' "$key" | tr -d '[:space:]')"
  [ -z "$key" ] && [ -n "$saved" ] && key="$saved"
  case "$key" in
    sk-ant-*) ;;
    "") note "Nothing was pasted. Copy the key from Anthropic's page, then paste it here."; continue ;;
    *) note "That isn't an Anthropic API key: those start with sk-ant-. Copy it again."; continue ;;
  esac
  note "Checking the key with Anthropic..."
  check_key "$key"
  case "$CHECK" in
    ok) save_key "$key"; note "Claude answered, so the key works."; break ;;
    bad)
      note "Anthropic didn't accept that key. Copy it again from $KEYS_URL"
      [ "$key" = "$saved" ] && saved=""
      ;;
    credit)
      save_key "$key"
      note "The key works, but the account has no credit yet. Add some at $BILLING_URL"
      note "The crew can't answer until it has credit. You don't need to run this again."
      break
      ;;
    *)
      save_key "$key"
      note "The key is saved, but I couldn't check it just now${CHECK_MESSAGE:+ ($CHECK_MESSAGE)}."
      note "If the crew can't answer later, run this again to check it."
      break
      ;;
  esac
done

# ---------- 5. The local database ----------
step "The local database"
note "The first time, this downloads about 2 GB and can take ten minutes or more."
just infra --quiet || die "the local database didn't start."

# ---------- 6. The Desktop ----------
step "Shortcuts on the Desktop"
note "If your Mac asks whether Terminal may use your Desktop folder, click Allow."
games="$(grep -s '^BRIDGE_CREW_GAMES_DIR=' .env.local | tail -n 1 | cut -d= -f2- | tr -d "\"'" || true)"
games="${games:-$HOME/Bridge Crew Games}"
mkdir -p "$DESKTOP" "$games"
cat >"$DESKTOP/Game Studio.command" <<EOF
#!/bin/bash
# Starts a Game Studio session. Made by Bridge Crew's installer (scripts/install-mac.sh).
exec "$DIR/scripts/game-studio-mac.sh"
EOF
chmod +x "$DESKTOP/Game Studio.command"
if [ ! -e "$DESKTOP/Bridge Crew Games" ] || [ -L "$DESKTOP/Bridge Crew Games" ]; then
  ln -sfn "$games" "$DESKTOP/Bridge Crew Games"
fi
note "Game Studio: double-click it to start a session."
note "Bridge Crew Games: the games the students make."

# ---------- Done ----------
step "All set"
cat <<EOF
    To start a session, double-click Game Studio on your Desktop. A Terminal window opens and
    starts everything, then the Game Studio opens in your browser. Keep that window open during
    the session, and press Control-C in it to stop.

    To update Bridge Crew, or change the key, paste the same line into Terminal again.
EOF
if [ "${BRIDGE_CREW_START:-ask}" != no ]; then
  printf '\n    Start the Game Studio now? Press Return for yes, or type n and press Return: '
  answer=""
  read -r answer </dev/tty || true
  case "$answer" in
    n | N | no | No) note "OK. Double-click Game Studio on the Desktop when you're ready." ;;
    *) exec "$DIR/scripts/game-studio-mac.sh" ;;
  esac
fi
