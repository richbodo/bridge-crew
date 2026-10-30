# Inviting the second human

Right now a room only exists for whoever created it: the join code lives on the session screen, and a second person has no path in except being told the code out of band. This adds a real invite flow, with email as the primary channel.

## The flow

1. In a room, the host opens an **Invite** panel (top of the room, next to the join code).
2. Three ways to invite, all in one panel:
   - **Copy invite link** — `/join/<CODE>` , works instantly, no email needed.
   - **Email an invite** — type an address, optional short note, press send.
   - **Show the code** — big, readable, copyable, for reading aloud.
3. The recipient clicks the link. If signed out, they land on sign-in/sign-up with the code preserved, and are dropped straight into the join step after auth — pick a display name and colour, then into the room.
4. The room shows pending invites and who has joined, so the host knows whether to nudge.

## What gets built

**1. Invite records**
- New `invites` table: session, code, invited email, inviter, status (pending / accepted / revoked), timestamps.
- RLS: only participants of that session can create or read its invites; accepting is done by code.
- Grants alongside the table as usual.

**2. Join-by-link route**
- `/join/$code` — resolves the session, shows the title and who's already in the room, then a "Join as…" form (name + colour).
- Signed out: stash the code, send to sign-in, return to the same join screen afterwards.
- Invalid or revoked code gets a clear message and a link back to the lobby, not a crash.

**3. Invite panel in the room**
- Link copy, code display, email form, and a small list of sent invites with status.
- Resend and revoke on each pending invite.

**4. The invite email**
- Branded email matching the crew-station look: session title, who invited you, the join code shown large, a single "Come aboard" button pointing at the invite link, and the optional personal note.
- Sent server-side when the host submits the form; one recipient per send, rate-limited so the form can't be used to spam.
- If the address has previously bounced or unsubscribed, the host sees "that address can't receive mail" instead of a silent failure.

**5. Lobby polish**
- The join-by-code box on the lobby also accepts a pasted full invite link, not just a bare code.

## Email sending prerequisite

App email needs a verified sender domain — `bridge.globaldonut.com`. The DNS steps below are yours to do; once that domain verifies, invite emails start flowing. Until then the invite link and code paths work fine, and the email form will tell the host email isn't live yet.

## DNS setup in Cloudflare (for bridge.globaldonut.com)

Sending works by delegating the `bridge` subdomain to Lovable, which then manages SPF, DKIM and MX inside that zone for you. You add **NS records only** — nothing else.

1. Start email setup from the button at the end of this plan and enter `bridge.globaldonut.com`. Lovable then shows you the exact nameserver hostnames assigned to your domain — they're per-domain, so use the ones on that screen rather than any you've seen elsewhere.
2. In Cloudflare, open the `globaldonut.com` zone → **DNS** → **Records**.
3. For each nameserver shown, click **Add record**:
   - Type: `NS`
   - Name: `bridge`
   - Nameserver: the hostname from the setup screen
   - TTL: Auto
   Add one NS record per hostname listed (usually two).
4. Important Cloudflare specifics:
   - NS records cannot be proxied — there's no orange cloud on this record type, which is correct.
   - Do **not** add A/CNAME/MX/TXT records for `bridge` yourself; anything left there fights the delegation. If `bridge` already has records, remove them first.
   - If you also plan to host a site at `bridge.globaldonut.com`, use a different subdomain for email (e.g. `mail.bridge...` or `notify.globaldonut.com`) — a delegated zone can't also serve your web records from Cloudflare.
5. Verification usually lands within minutes, but allow up to a few hours. Progress is visible in Cloud → Emails.

Note that a custom **web** domain (pointing the app itself at a domain) is a separate setup in Project Settings → Domains; the DNS above is only for email.

## Out of scope

Bulk/multi-address invites, invite-only rooms with access control beyond the code, and reminder/nudge emails.
