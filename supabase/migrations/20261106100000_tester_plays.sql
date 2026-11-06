-- Test feedback on the Game Studio: the Tester plays the game in a headless browser on the
-- laptop (src/lib/playtest.server.ts).
--   * a test is a made thing like the others (docs/state_machines.md §8). Its body is the
--     Tester's looks at one version as JSON: what it did, what should be on screen, and a
--     picture of the screen, with what the game played and any errors;
--   * snapshot is the Tester's latest look while it plays (a JPEG data URL), for its card.
ALTER TABLE public.made_things DROP CONSTRAINT made_things_kind_check;
ALTER TABLE public.made_things
  ADD CONSTRAINT made_things_kind_check
  CHECK (kind IN ('version', 'picture', 'sound', 'music', 'test'));

ALTER TABLE public.agents_state ADD COLUMN snapshot text;
