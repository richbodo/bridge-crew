-- Tune the crew (docs/plans/tune-the-crew-2026-11-19.md): changes to what the crew is told, for
-- every room of a kind on this computer. One row per changed part; no row means the original.
--
-- It belongs to the computer, not to a room or a person: everyone signed in here reads and
-- changes the same tuning. The app runs on one laptop; a shared server would need roles first.
CREATE TABLE public.crew_tuning (
  -- A room template's key: "game-studio" or "deliberation".
  template text NOT NULL,
  -- "duty:<job key>" for a job's paragraph, "notes" for every crew member, "doc" for the Scribe.
  part text NOT NULL CHECK (part IN ('notes', 'doc') OR part LIKE 'duty:%'),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 4000),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (template, part)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crew_tuning TO authenticated;
GRANT ALL ON public.crew_tuning TO service_role;
ALTER TABLE public.crew_tuning ENABLE ROW LEVEL SECURITY;
CREATE POLICY "signed-in users read the tuning" ON public.crew_tuning FOR SELECT TO authenticated USING (true);
CREATE POLICY "signed-in users add tuning" ON public.crew_tuning FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "signed-in users change tuning" ON public.crew_tuning FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "signed-in users remove tuning" ON public.crew_tuning FOR DELETE TO authenticated USING (true);
CREATE TRIGGER t_crew_tuning_u BEFORE UPDATE ON public.crew_tuning FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- What each run was told: its whole system prompt, as tuned when it started.
ALTER TABLE public.runs ADD COLUMN instructions text;
