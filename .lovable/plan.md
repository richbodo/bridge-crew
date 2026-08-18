# Email-capable end-to-end testing

Goal: every flow that depends on email — signup confirmation, password reset, room invites, bounce handling — can be tested automatically, and I can exercise those flows on my own during development without waiting on you.

## Critique of the proposed hosting strategy

Your plan: MX for `globaldonut.com` on a DigitalOcean Ubuntu droplet (receiving), Postmark for sending, app at `bridge.globaldonut.com`.

What's right:

- **Splitting send and receive is the correct call.** A self-run droplet sending mail from a fresh DO IP will land in spam or get blocked outright (many DO ranges carry poor reputation, and port 25 egress is throttled/blocked on new accounts by default). Postmark handles reputation, DKIM signing, and gives you a delivery API and webhooks.
- **A self-run catch-all for *receiving* is ideal for testing.** No per-mailbox limits, no third-party rate caps, and unlimited unique addresses per run.

What needs adjusting:

1. **Don't put the test MX on the apex `globaldonut.com`.** The apex is presumably your real mail (or may become it), and a catch-all there means every typo'd address in the world lands in the test box. Use a dedicated receiving subdomain — `t.globaldonut.com` — with its own MX to the droplet. Apex mail stays untouched, and test addresses are unmistakable.
2. **`bridge.globaldonut.com` is the app's *web* domain — do not also use it as the email sending domain.** Lovable's managed email works by delegating the email subdomain's NS records to Lovable, which then owns that entire zone; you can't also serve the app's web records there. Since you're choosing Postmark anyway, sending should come from its own subdomain, e.g. `mail.globaldonut.com`, which sidesteps the collision entirely.
3. **Choosing Postmark means opting out of Lovable's built-in email.** That's a legitimate trade — you get Postmark's dashboard, message search API, and webhook detail, which is genuinely better for automated testing. The cost is that I hand-roll the send path and the auth-email hook instead of using scaffolded managed sending, and you own the API keys. Worth naming explicitly before we build it.
   - If you'd rather not run a send integration at all, the alternative is Lovable-managed sending on `notify.globaldonut.com` plus your droplet purely for receiving. Say the word and I'll swap that section.
4. **Postmark's inbound stream can replace the IMAP layer entirely.** Postmark can receive mail too: point the test subdomain's MX at Postmark's inbound server, and every message becomes a JSON webhook plus a queryable message. That would remove the droplet from the picture, and remove IMAP polling from the tests. The droplet is still fine — and gives you full control — but it's real ops work (postfix, dovecot, TLS certs, fail2ban, disk, patching) for a testing convenience. I'd take Postmark inbound unless you specifically want the mail server.
   - This plan below assumes the droplet, since that's what you asked for. Sections marked *(skip if using Postmark inbound)* fall away if you change your mind.
5. **Postmark requires approval for the sending domain and has a low initial send allowance.** Fine for tests; just don't let the suite loop on signups.
6. **Suppression is sticky.** Postmark auto-suppresses hard bounces. If a test address ever bounces, it stays dead. Use fresh unique addresses per run (which we do) and reserve one *permanently* bad address for the bounce test.

## Architecture we'll build

```text
app (bridge.globaldonut.com)
  └─ sends via Postmark API, From: crew@mail.globaldonut.com
       └─ Postmark webhooks → /api/public/email/postmark  (bounce, complaint, delivery)

tests
  ├─ layer 1: dev capture table  (no network, runs every change)
  └─ layer 2: IMAP read-only on catch-all @t.globaldonut.com  (opt-in, proves delivery)
             MX → DigitalOcean droplet (postfix + dovecot)
```

## Layer 1 — capture (works with no DNS, no network)

- A thin wrapper around the send path. In production it just sends. In dev/preview it sends *and* writes the rendered message to a `dev_email_captures` table: recipient, template, subject, HTML, extracted links, timestamp.
- Enabled only behind a dev flag; rows readable only by the sending account; production writes nothing.
- Test helper `waitForEmail({ to, template })` polls that table and returns the parsed message plus its links.
- Specs: invite email names the room and contains a valid `/join/<CODE>` link; a suppressed recipient surfaces "can't receive mail" rather than silence.

## Layer 2 — real inbox (proves delivery)

- IMAP helper used only by tests: connect, poll for a message addressed to this run's unique address, parse HTML, extract links, disconnect. Read-only, fixed timeout.
- A separate Playwright project, `email-live`, excluded from the default run and auto-skipped when secrets are absent.
- Specs:
  1. **Signup confirmation** — sign up as `e2e-signup-<runid>@t.globaldonut.com`, click the confirm link, land signed in.
  2. **Password reset** — request reset, click recovery link, set a new password, sign in with it.
  3. **Room invite** — host invites `e2e-invite-<runid>@…`; a second browser context opens the link from the message, signs up, joins the room; the host's invite list flips to accepted.
  4. **Bounce** — send to the reserved bad address, assert the invite row shows undeliverable via the Postmark webhook.

## Your part, step by step

### A. DNS in Cloudflare (globaldonut.com zone)

Leave existing apex mail records alone. Add:

| Purpose | Type | Name | Value | Proxy |
|---|---|---|---|---|
| Test inbox | MX | `t` | `mail.globaldonut.com` (priority 10) | n/a |
| Mail host | A | `mail` | droplet's public IPv4 | **DNS only (grey cloud)** |
| Sending SPF | TXT | `mail` | `v=spf1 include:spf.mtasv.net ~all` | n/a |
| DKIM | TXT | as Postmark shows | value Postmark shows | n/a |
| Return-Path | CNAME | `pm-bounces.mail` | `pm.mtasv.net` | n/a |
| DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@globaldonut.com` | n/a |

Notes: `mail` must be grey-clouded — proxying breaks SMTP. Take the exact DKIM/Return-Path values from Postmark's domain screen, not from here.

### B. Postmark (sending)

1. Create a Postmark account and a server named `bridge-crew`; keep the **Transactional** stream.
2. **Sender Signatures → Add Domain** → `mail.globaldonut.com`.
3. Add the DKIM and Return-Path records it shows into Cloudflare (table above), then click **Verify**.
4. Copy the **Server API Token** and send it to me privately — I'll store it as a project secret. Do not paste it in chat history you care about.
5. Under **Webhooks**, add a webhook for Bounce, Spam Complaint, and Delivery pointing at `https://bridge.globaldonut.com/api/public/email/postmark`. Set the Basic-auth username/password fields to a random string and send that to me too; the endpoint verifies it.

### C. DigitalOcean droplet (receiving) *(skip if using Postmark inbound)*

1. Create a Ubuntu 24.04 droplet, 1 GB is plenty. Give it a reserved IP and set the droplet hostname to `mail.globaldonut.com`.
2. Set the **PTR/reverse DNS** — on DO this follows the droplet name, so naming it `mail.globaldonut.com` is what gets you a correct PTR. Only matters if you ever send from it; harmless otherwise.
3. Firewall: allow 22, 25, 143, 993. Nothing else inbound.
4. Install and configure:
   - `postfix` — internet site, myhostname `mail.globaldonut.com`, and a virtual catch-all mapping `@t.globaldonut.com` to a single local mailbox (`crewtest`). Set `virtual_alias_maps` with the catch-all entry, and keep `mydestination` off `t.globaldonut.com` so virtual delivery handles it.
   - `dovecot-imapd` — Maildir format, IMAP over TLS on 993 only, plaintext IMAP disabled off-localhost.
   - `certbot` with the nginx or standalone plugin for `mail.globaldonut.com`, wired into postfix/dovecot TLS.
   - `fail2ban` with the dovecot and postfix jails on.
5. Create the mailbox user `crewtest` with a long random password. Give me **that** account only; it can read the catch-all box and nothing else.
6. Restrict what it can do: dovecot ACL or simply a user with no shell (`/usr/sbin/nologin`) and no SMTP submission rights — read-only in practice, since tests never delete or send.
7. Add a weekly cron that deletes mail older than 7 days from the Maildir so the disk never fills.
8. Sanity check from your laptop: `swaks --to anything@t.globaldonut.com --server mail.globaldonut.com` should be accepted, and the message should appear over IMAP.
9. Send me: IMAP host, port (993), username, password. I'll store them as secrets.

### D. Supabase auth email routing

Auth emails (confirm, reset) need to go through Postmark too, or the confirm/reset tests will exercise the default sender. I'll wire the auth email hook to Postmark once the token is in place — no action needed from you beyond step B.

### E. One reserved bad address

Pick and tell me one address that will always hard-bounce, e.g. `nobody@t.globaldonut.com` configured in postfix to reject with 550. That's what the bounce test targets.

## Technical notes

- Capture table with grants and RLS scoped to the authenticated sender; writes gated behind a dev-only env flag.
- Postmark webhook lands on a public route with Basic-auth verification and Zod-validated payloads; it marks invites undeliverable.
- IMAP client runs in the Playwright/Node process only — never in app code, never in the Worker runtime.
- Secrets: `POSTMARK_SERVER_TOKEN`, `POSTMARK_WEBHOOK_USER`/`_PASSWORD`, `E2E_IMAP_HOST`, `E2E_IMAP_PORT`, `E2E_IMAP_USER`, `E2E_IMAP_PASSWORD`, `E2E_MAIL_DOMAIN`. Absent IMAP secrets → the live suite skips rather than fails.
- Auth email rate limit raised to match the suite's signup volume.
- New `docs/testing_email.md` documents the mailbox contract and how to run the live suite; `docs/users_guide.md` gains an "invites by email" section once sending is live.

## Out of scope

Marketing/bulk mail, inbound email as an app feature (replying to a room by email), and load-testing delivery.
