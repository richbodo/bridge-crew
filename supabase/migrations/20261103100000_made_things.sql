-- Phase 3 of docs/plans/educational-context-2026-10-31.md: making the game.
--   * made things: versions of the game, pictures and sounds (docs/state_machines.md §8);
--   * proposals, starting with the room's own "Ask the Engineer to fix it?" (§7);
--   * finish_run saves a run's made things in the same step as its hail.

-- ---------- made things ----------
CREATE TABLE public.made_things (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  run_id uuid REFERENCES public.runs(id) ON DELETE SET NULL,
  contribution_id uuid REFERENCES public.contributions(id) ON DELETE SET NULL,
  agent text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('version', 'picture', 'sound')),
  -- "v3" for a version, or the name the Artist or Sound designer gave it: "mole", "dig".
  name text NOT NULL,
  -- Versions only: 1, 2, 3, ...
  version int,
  -- The HTML file, the SVG, or the ZzFX parameter list as JSON.
  body text NOT NULL,
  state text NOT NULL DEFAULT 'waiting' CHECK (state IN ('waiting', 'used', 'not_used')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX made_things_session_idx ON public.made_things (session_id, created_at);
CREATE UNIQUE INDEX made_things_one_version_number ON public.made_things (session_id, version) WHERE kind = 'version';
GRANT SELECT, INSERT, UPDATE ON public.made_things TO authenticated;
GRANT ALL ON public.made_things TO service_role;
ALTER TABLE public.made_things ENABLE ROW LEVEL SECURITY;
CREATE POLICY "made things readable by members" ON public.made_things FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members make things" ON public.made_things FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members use things" ON public.made_things FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE TRIGGER t_made_things_u BEFORE UPDATE ON public.made_things FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- proposals ----------
CREATE TABLE public.proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  -- 'room' for the room's own suggestions (a crash), 'crew' for a crew member's (Phase 4).
  source text NOT NULL CHECK (source IN ('room', 'crew')),
  proposed_by text,
  contribution_id uuid REFERENCES public.contributions(id) ON DELETE SET NULL,
  -- What it starts if the student says Yes: a summon of one job, or a huddle.
  kind text NOT NULL DEFAULT 'summon' CHECK (kind IN ('summon', 'huddle')),
  target text NOT NULL,
  task text NOT NULL,
  -- What the student sees: "Ask the Engineer to fix it?"
  question text NOT NULL,
  -- A crash proposal: the version that crashed.
  made_thing_id uuid REFERENCES public.made_things(id) ON DELETE SET NULL,
  state text NOT NULL DEFAULT 'open' CHECK (state IN ('open', 'accepted', 'declined', 'lapsed')),
  answered_by uuid,
  answered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX proposals_session_idx ON public.proposals (session_id, created_at);
-- One open crash proposal per version.
CREATE UNIQUE INDEX proposals_one_crash ON public.proposals (made_thing_id) WHERE state = 'open';
GRANT SELECT, INSERT, UPDATE ON public.proposals TO authenticated;
GRANT ALL ON public.proposals TO service_role;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "proposals readable by members" ON public.proposals FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members propose" ON public.proposals FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members answer proposals" ON public.proposals FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE TRIGGER t_proposals_u BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.made_things REPLICA IDENTITY FULL;
ALTER TABLE public.proposals REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.made_things, public.proposals;

-- ---------- finish_run, now with made things ----------
-- _made is a JSON array of {kind, name, body}. They're saved the moment the run finishes:
-- Waiting while the hail is open, or Not used if the run was superseded.
DROP FUNCTION public.finish_run(uuid, text, text, text);
CREATE FUNCTION public.finish_run(_run uuid, _spoken text, _brief text, _summary text, _made jsonb DEFAULT '[]'::jsonb)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _r public.runs%ROWTYPE;
  _crew public.agents_state%ROWTYPE;
  _contribution uuid;
  _thing jsonb;
  _number int;
  _current boolean;
BEGIN
  SELECT * INTO _r FROM public.runs WHERE id = _run FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such run.';
  END IF;
  SELECT * INTO _crew FROM public.agents_state WHERE session_id = _r.session_id AND agent = _r.agent FOR UPDATE;
  _current := _r.state = 'running' AND _crew.status = 'working' AND _crew.current_run_id IS NOT DISTINCT FROM _run;

  IF NOT _current AND _r.state = 'running' THEN
    UPDATE public.runs SET state = 'superseded', ended_at = now() WHERE id = _run;
  END IF;
  INSERT INTO public.contributions (session_id, agent, spoken, brief, run_id, outcome)
  VALUES (_r.session_id, _r.agent, _spoken, _brief, _run, CASE WHEN _current THEN 'waiting' ELSE 'superseded' END)
  RETURNING id INTO _contribution;

  FOR _thing IN SELECT * FROM jsonb_array_elements(_made) LOOP
    _number := NULL;
    IF _thing ->> 'kind' = 'version' THEN
      -- Lock the room so two versions can't take the same number.
      PERFORM 1 FROM public.sessions WHERE id = _r.session_id FOR UPDATE;
      SELECT COALESCE(max(version), 0) + 1 INTO _number FROM public.made_things
      WHERE session_id = _r.session_id AND kind = 'version';
    END IF;
    INSERT INTO public.made_things (session_id, run_id, contribution_id, agent, kind, name, version, body, state)
    VALUES (
      _r.session_id, _run, _contribution, _r.agent, _thing ->> 'kind',
      COALESCE('v' || _number, NULLIF(_thing ->> 'name', ''), _thing ->> 'kind'),
      _number, _thing ->> 'body',
      CASE WHEN _current THEN 'waiting' ELSE 'not_used' END
    );
  END LOOP;

  IF NOT _current THEN
    PERFORM public.log_event(_r.session_id, _r.agent, 'kept_superseded', _summary, _run);
    RETURN 'superseded';
  END IF;

  INSERT INTO public.hand_raises (session_id, agent, summary, run_id, contribution_id)
  VALUES (_r.session_id, _r.agent, _summary, _run, _contribution);
  UPDATE public.runs SET state = 'finished', ended_at = now() WHERE id = _run;
  UPDATE public.agents_state SET status = 'hand_raised', progress = _summary WHERE id = _crew.id;
  PERFORM public.log_event(_r.session_id, _r.agent, 'hailed', _summary, _run);
  RETURN 'hailed';
END $$;
REVOKE EXECUTE ON FUNCTION public.finish_run(uuid, text, text, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finish_run(uuid, text, text, text, jsonb) TO authenticated, service_role;

-- ---------- a hail's end settles its made things (§8) ----------
-- Granted: Used, and a version becomes the current version. Any other end: Not used.
CREATE OR REPLACE FUNCTION public.settle_made_things()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _version uuid;
BEGIN
  IF OLD.state <> 'pending' OR NEW.state = 'pending' OR NEW.contribution_id IS NULL THEN
    RETURN NEW;
  END IF;
  IF NEW.state = 'granted' THEN
    UPDATE public.made_things SET state = 'used' WHERE contribution_id = NEW.contribution_id AND state = 'waiting';
    SELECT id INTO _version FROM public.made_things
    WHERE contribution_id = NEW.contribution_id AND kind = 'version' LIMIT 1;
    IF _version IS NOT NULL THEN
      PERFORM public.make_current(NEW.session_id, _version);
    END IF;
  ELSE
    UPDATE public.made_things SET state = 'not_used' WHERE contribution_id = NEW.contribution_id AND state = 'waiting';
  END IF;
  RETURN NEW;
END $$;

-- The current version: the one the Engineer builds from next. A crash proposal for an older
-- version lapses once a newer one is in use.
CREATE OR REPLACE FUNCTION public.make_current(_session uuid, _version uuid)
RETURNS void LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  UPDATE public.sessions
  SET settings = jsonb_set(settings, '{currentVersion}', to_jsonb(_version::text))
  WHERE id = _session;
  UPDATE public.proposals SET state = 'lapsed'
  WHERE session_id = _session AND source = 'room' AND state = 'open' AND made_thing_id IS DISTINCT FROM _version;
  PERFORM public.log_event(_session, 'room', 'current_version', _version::text, NULL);
END $$;

CREATE TRIGGER t_hails_settle AFTER UPDATE OF state ON public.hand_raises
FOR EACH ROW EXECUTE FUNCTION public.settle_made_things();

-- Use this: the student picks a made thing that wasn't used. A version also becomes current.
CREATE OR REPLACE FUNCTION public.use_made_thing(_thing uuid)
RETURNS void LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _t public.made_things%ROWTYPE;
BEGIN
  SELECT * INTO _t FROM public.made_things WHERE id = _thing FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such thing.';
  END IF;
  IF _t.state = 'waiting' THEN
    RAISE EXCEPTION 'Grant or decline its hail first.';
  END IF;
  UPDATE public.made_things SET state = 'used' WHERE id = _thing;
  IF _t.kind = 'version' THEN
    PERFORM public.make_current(_t.session_id, _thing);
  END IF;
  PERFORM public.log_event(_t.session_id, _t.agent, 'use_this', _t.name, _t.run_id);
END $$;

DO $$
DECLARE
  _fn text;
BEGIN
  FOREACH _fn IN ARRAY ARRAY[
    'public.settle_made_things()',
    'public.make_current(uuid, uuid)',
    'public.use_made_thing(uuid)'
  ] LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon', _fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', _fn);
  END LOOP;
END $$;
