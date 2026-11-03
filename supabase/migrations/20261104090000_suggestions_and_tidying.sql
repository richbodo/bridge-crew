-- Test feedback on Phase 3, and the first part of Phase 4 of
-- docs/plans/educational-context-2026-10-31.md:
--   * a crew member can suggest asking a crew member: a proposal from the crew
--     (docs/state_machines.md §7). The student says Yes or No thanks;
--   * made things can be renamed, removed and put back (§8), by the people, or by the crew
--     member that made them when the student asks, with its hail.

-- ---------- what a contribution brings with its hail ----------
-- ask: {target, task, question, mode}, a proposal that opens if the contribution is spoken.
-- removes: made things that are removed if it's spoken.
ALTER TABLE public.contributions
  ADD COLUMN ask jsonb,
  ADD COLUMN removes uuid[] NOT NULL DEFAULT '{}';

-- Yes starts the summon in the mode of the summon that led to the proposal.
ALTER TABLE public.proposals
  ADD COLUMN mode text NOT NULL DEFAULT 'direct' CHECK (mode IN ('direct', 'help'));

-- ---------- made things: Removed ----------
ALTER TABLE public.made_things DROP CONSTRAINT made_things_state_check;
ALTER TABLE public.made_things
  ADD CONSTRAINT made_things_state_check CHECK (state IN ('waiting', 'used', 'not_used', 'removed'));

-- ---------- finish_run, now with a suggestion and removals ----------
DROP FUNCTION public.finish_run(uuid, text, text, text, jsonb);
CREATE FUNCTION public.finish_run(
  _run uuid,
  _spoken text,
  _brief text,
  _summary text,
  _made jsonb DEFAULT '[]'::jsonb,
  _ask jsonb DEFAULT NULL,
  _removes uuid[] DEFAULT '{}'
)
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
  INSERT INTO public.contributions (session_id, agent, spoken, brief, run_id, outcome, ask, removes)
  VALUES (
    _r.session_id, _r.agent, _spoken, _brief, _run,
    CASE WHEN _current THEN 'waiting' ELSE 'superseded' END,
    _ask, COALESCE(_removes, '{}')
  )
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
REVOKE EXECUTE ON FUNCTION public.finish_run(uuid, text, text, text, jsonb, jsonb, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finish_run(uuid, text, text, text, jsonb, jsonb, uuid[]) TO authenticated, service_role;

-- ---------- a hail's end settles what came with it (§7, §8) ----------
-- Granted: its made things are used (a version becomes current), the things it removes are
-- removed, the crew member's older suggestion lapses, and its new one opens. Any other end:
-- its made things aren't used, and nothing is removed or suggested.
DROP TRIGGER t_hails_settle ON public.hand_raises;
DROP FUNCTION public.settle_made_things();
CREATE FUNCTION public.settle_hail()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _c public.contributions%ROWTYPE;
  _version uuid;
  _gone int;
BEGIN
  IF OLD.state <> 'pending' OR NEW.state = 'pending' OR NEW.contribution_id IS NULL THEN
    RETURN NEW;
  END IF;
  IF NEW.state <> 'granted' THEN
    UPDATE public.made_things SET state = 'not_used' WHERE contribution_id = NEW.contribution_id AND state = 'waiting';
    RETURN NEW;
  END IF;

  UPDATE public.made_things SET state = 'used' WHERE contribution_id = NEW.contribution_id AND state = 'waiting';
  SELECT id INTO _version FROM public.made_things
  WHERE contribution_id = NEW.contribution_id AND kind = 'version' LIMIT 1;
  IF _version IS NOT NULL THEN
    PERFORM public.make_current(NEW.session_id, _version);
  END IF;

  SELECT * INTO _c FROM public.contributions WHERE id = NEW.contribution_id;

  -- Only what this crew member made, and never the current version or a thing still waiting.
  IF cardinality(_c.removes) > 0 THEN
    UPDATE public.made_things SET state = 'removed'
    WHERE id = ANY (_c.removes)
      AND session_id = NEW.session_id
      AND agent = NEW.agent
      AND state IN ('used', 'not_used')
      AND id::text IS DISTINCT FROM (SELECT settings ->> 'currentVersion' FROM public.sessions WHERE id = NEW.session_id);
    GET DIAGNOSTICS _gone = ROW_COUNT;
    IF _gone > 0 THEN
      PERFORM public.log_event(NEW.session_id, NEW.agent, 'removed', _gone || ' made thing(s)', NEW.run_id);
    END IF;
  END IF;

  -- The crew member spoke again, so its older suggestion lapses.
  UPDATE public.proposals SET state = 'lapsed'
  WHERE session_id = NEW.session_id AND source = 'crew' AND proposed_by = NEW.agent AND state = 'open';
  IF _c.ask IS NOT NULL THEN
    INSERT INTO public.proposals (session_id, source, proposed_by, contribution_id, kind, target, task, question, mode)
    VALUES (
      NEW.session_id, 'crew', NEW.agent, _c.id, 'summon',
      _c.ask ->> 'target', _c.ask ->> 'task', _c.ask ->> 'question', COALESCE(_c.ask ->> 'mode', 'direct')
    );
    PERFORM public.log_event(NEW.session_id, NEW.agent, 'proposed', _c.ask ->> 'question', NEW.run_id);
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER t_hails_settle AFTER UPDATE OF state ON public.hand_raises
FOR EACH ROW EXECUTE FUNCTION public.settle_hail();

-- ---------- Use this, Remove, Put back and Rename (§8) ----------
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
  IF _t.state = 'removed' THEN
    RAISE EXCEPTION 'Put it back first.';
  END IF;
  UPDATE public.made_things SET state = 'used' WHERE id = _thing;
  IF _t.kind = 'version' THEN
    PERFORM public.make_current(_t.session_id, _thing);
  END IF;
  PERFORM public.log_event(_t.session_id, _t.agent, 'use_this', _t.name, _t.run_id);
END $$;

-- Remove: out of the room's lists and out of what the crew builds with. Versions stay in the
-- games folder. Returns 'removed', or why not: 'current' (make another version current
-- first), 'waiting' (it goes with its hail) or 'removed_already'.
CREATE FUNCTION public.remove_made_thing(_thing uuid)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _t public.made_things%ROWTYPE;
BEGIN
  SELECT * INTO _t FROM public.made_things WHERE id = _thing FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such thing.';
  END IF;
  IF _t.state = 'removed' THEN
    RETURN 'removed_already';
  END IF;
  IF _t.state = 'waiting' THEN
    RETURN 'waiting';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.sessions WHERE id = _t.session_id AND settings ->> 'currentVersion' = _thing::text
  ) THEN
    RETURN 'current';
  END IF;
  UPDATE public.made_things SET state = 'removed' WHERE id = _thing;
  PERFORM public.log_event(_t.session_id, 'room', 'removed', _t.kind || ' ' || _t.name, _t.run_id);
  RETURN 'removed';
END $$;

-- Put back: a removed thing comes back as Not used, and Use this can put it in the game again.
CREATE FUNCTION public.put_back_made_thing(_thing uuid)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _t public.made_things%ROWTYPE;
BEGIN
  SELECT * INTO _t FROM public.made_things WHERE id = _thing FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such thing.';
  END IF;
  IF _t.state <> 'removed' THEN
    RETURN 'not_removed';
  END IF;
  UPDATE public.made_things SET state = 'not_used' WHERE id = _thing;
  PERFORM public.log_event(_t.session_id, 'room', 'put_back', _t.kind || ' ' || _t.name, _t.run_id);
  RETURN 'put_back';
END $$;

-- Rename: a picture's or a sound's name, or a version's title. An empty name gives a version
-- back its number. Returns 'renamed', or 'empty'.
CREATE FUNCTION public.rename_made_thing(_thing uuid, _name text)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _t public.made_things%ROWTYPE;
  _clean text := left(btrim(regexp_replace(COALESCE(_name, ''), '\s+', ' ', 'g')), 40);
BEGIN
  SELECT * INTO _t FROM public.made_things WHERE id = _thing FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such thing.';
  END IF;
  IF _clean = '' THEN
    IF _t.kind <> 'version' THEN
      RETURN 'empty';
    END IF;
    _clean := 'v' || _t.version;
  END IF;
  UPDATE public.made_things SET name = _clean WHERE id = _thing;
  PERFORM public.log_event(_t.session_id, 'room', 'renamed', _t.name || ' → ' || _clean, _t.run_id);
  RETURN 'renamed';
END $$;

DO $$
DECLARE
  _fn text;
BEGIN
  FOREACH _fn IN ARRAY ARRAY[
    'public.settle_hail()',
    'public.use_made_thing(uuid)',
    'public.remove_made_thing(uuid)',
    'public.put_back_made_thing(uuid)',
    'public.rename_made_thing(uuid, text)'
  ] LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon', _fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', _fn);
  END LOOP;
END $$;
