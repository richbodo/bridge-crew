-- Test feedback on the Game Studio: the Sound designer makes music as well as sound effects,
-- and a song is a made thing like the others (docs/state_machines.md §8). Its body is the song
-- as JSON: a tempo, instruments and tracks of notes (src/lib/made.ts).
ALTER TABLE public.made_things DROP CONSTRAINT made_things_kind_check;
ALTER TABLE public.made_things
  ADD CONSTRAINT made_things_kind_check CHECK (kind IN ('version', 'picture', 'sound', 'music'));
