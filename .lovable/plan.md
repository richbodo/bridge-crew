# Email-capable end-to-end testing

Goal: every flow that depends on email — signup confirmation, password reset, room invites, bounce handling — can be tested automatically, and I can exercise those flows on my own during development without waiting on you.

Two layers, built in order:

1. **Capture layer** (fast, offline): in dev/preview, every outbound app email is also recorded so tests can read subject, body and links without touching the network.
2. **Real inbox layer** (slow, opt-in): a read-only catch-all test mailbox on a dedicated subdomain, read over IMAP, proving mail actually leaves the building and arrives.

## Prerequisite: get regular email working

- Set up `bridge.globaldonut.com` as the sending domain (NS delegation in Cloudflare, as previously described).
- Scaffold branded auth emails (confirm signup, reset password, magic link, email change, invite, reauthentication) styled to the crew-station look.
- Scaffold app emails and add the real **room invite** template, then wire the invite panel's "Send invite" to actually send it — today it saves the invite and reports that email isn't live.
- Add a bounce/complaint/unsubscribe receiver so the room can show "that address can't receive mail" against a pending invite.

## Layer 1 — capture (works with no DNS, no network)

- A thin wrapper around the send helper. In production it just sends. In dev/preview it sends *and* writes the rendered message to a `dev_email_captures` table: recipient, template, subject, HTML, extracted links, timestamp.
- Capture is enabled only when a dev flag is on, and rows are readable only by the sender's own account; production writes nothing.
- Test helper `waitForEmail({ to, template })` polls that table with a timeout and returns the parsed message plus its links.
- E2E specs added:
  - Invite email: host sends an invite, the captured message names the room and the code, and the link in it is a valid `/join/<CODE>` URL.
  - Suppressed recipient: sending to a known-bad address surfaces the "can't receive mail" state rather than silence.
- These run in the normal suite on every change, with no external dependencies.

## Layer 2 — real inbox (proves delivery)

Your side (once, then unattended):

- A dedicated subdomain for *receiving*, separate from the sending subdomain — e.g. `t.globaldonut.com` — with an MX to a mail server you run and a catch-all mailbox, so `anything+tag@t.globaldonut.com` all lands in one box.
- One IMAP account with **read-only** rights on that mailbox. Credentials (host, port, user, password) stored as project secrets, never in the repo.
- Tests never delete or send; they only read and filter by a unique per-run address.

My side:

- An IMAP helper used only by tests: connect, poll for a message whose To matches this run's unique address, parse HTML, extract links, disconnect. Fixed timeout with a clear failure message so a stuck mailbox never hangs the suite.
- A separate Playwright project, `email-live`, not part of the default run — invoked explicitly, and skipped automatically when the secrets are absent.
- Specs in that project:
  1. **Signup confirmation** — sign up as `e2e-signup-<runid>@t.globaldonut.com`, wait for the confirmation mail, click the link, land signed in at the lobby.
  2. **Password reset** — request a reset for that account, click the recovery link, set a new password, sign in with it.
  3. **Room invite** — host opens a room and invites `e2e-invite-<runid>@…`; a second browser context opens the link from the message, signs up, and joins the room; the host's invite list flips to accepted.
  4. **Bounce/suppression** — send to an address that hard-bounces, then assert the invite row shows the undeliverable state and further sends to it are refused.
- Since every address is unique per run, tests never collide and the mailbox needs no cleanup from me. You can prune it on a schedule.

## What this unlocks

Once layer 2 is live I can, unattended: create throwaway accounts, confirm them, reset passwords, accept invites as a second human, and verify anything that arrives by mail — so multi-user and auth work no longer needs you in the loop.

## Technical notes

- Capture table with grants + RLS scoped to the authenticated sender; writes gated behind a dev-only env flag so production never stores message bodies.
- IMAP client runs in the Playwright/Node process only — never in app code, never in the Worker runtime.
- Secrets required for layer 2: `E2E_IMAP_HOST`, `E2E_IMAP_PORT`, `E2E_IMAP_USER`, `E2E_IMAP_PASSWORD`, `E2E_MAIL_DOMAIN`. Absent secrets → the live project skips rather than fails.
- Test password for throwaway accounts generated per run; auth rate limit raised to match the suite's signup volume.
- `docs/users_guide.md` gains a short "invites by email" section once sending is live; a new `docs/testing_email.md` documents the mailbox contract for future devs.

## Out of scope

Marketing/bulk mail, inbound email parsing as an app feature (replying to a room by email), and load-testing delivery.
