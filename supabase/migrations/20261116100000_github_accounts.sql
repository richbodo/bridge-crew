-- Connect GitHub (docs/plans/games-on-github-2026-11-16.md Part 3): a Bridge Crew user's
-- connection to their GitHub account, made with GitHub's device flow.
--
-- The token can read and change every repository the GitHub account has, so it never goes to
-- the browser: no sign-in can read this table, not even its own user's. Only the app's server
-- reads it, with the local database's secret key, for the signed-in user's row only
-- (src/lib/github-connect.server.ts). It goes nowhere but GitHub.
CREATE TABLE public.github_accounts (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  -- The GitHub account's name, shown as "Connected as …".
  login text NOT NULL,
  token text NOT NULL,
  -- The scopes GitHub granted, as it said them: "repo".
  scope text NOT NULL DEFAULT '',
  connected_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.github_accounts ENABLE ROW LEVEL SECURITY;
-- No policies, and no grants: anon and authenticated can't touch it.
REVOKE ALL ON public.github_accounts FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.github_accounts TO service_role;
