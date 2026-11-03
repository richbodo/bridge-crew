-- Phase 1 of docs/plans/educational-context-2026-10-31.md: the protocol fixes.
-- The machines are drawn in docs/state_machines.md. In short:
--   * runs get a record and an ID (F3, F4), and hails point at their run and contribution;
--   * every crew member move goes through one transition table, checked by a trigger (F1, F15);
--   * the transitions are functions, so each one happens atomically (F2, F5, F6);
--   * one crew member on the floor per room, one open hail per crew member (F15);
--   * the Scribe's updates have their own state, apart from any crew member's (F10, F16);
--   * the log records every event (F13).

-- ---------- job keys become text, so a room template can bring its own roster ----------
ALTER TABLE public.transcript ALTER COLUMN agent TYPE text USING agent::text;
ALTER TABLE public.agents_state ALTER COLUMN agent TYPE text USING agent::text;
ALTER TABLE public.summons ALTER COLUMN agent TYPE text USING agent::text;
ALTER TABLE public.hand_raises ALTER COLUMN agent TYPE text USING agent::text;
ALTER TABLE public.contributions ALTER COLUMN agent TYPE text USING agent::text;
DROP TYPE public.agent_kind;

-- ---------- runs ----------
CREATE TABLE public.runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  agent text NOT NULL,
  task text NOT NULL,
  mode text NOT NULL DEFAULT 'direct' CHECK (mode IN ('direct', 'help')),
  state text NOT NULL DEFAULT 'running' CHECK (state IN ('running', 'finished', 'failed', 'superseded')),
  summoned_by uuid,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX runs_session_idx ON public.runs (session_id, created_at);
CREATE INDEX runs_running_idx ON public.runs (session_id) WHERE state = 'running';
GRANT SELECT, INSERT, UPDATE ON public.runs TO authenticated;
GRANT ALL ON public.runs TO service_role;
ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "runs readable by members" ON public.runs FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members start runs" ON public.runs FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members update runs" ON public.runs FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE TRIGGER t_runs_u BEFORE UPDATE ON public.runs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.agents_state ADD COLUMN current_run_id uuid REFERENCES public.runs(id) ON DELETE SET NULL;

-- What happened to each contribution: waiting, said, declined, replaced, withdrawn or superseded.
ALTER TABLE public.contributions
  ADD COLUMN run_id uuid REFERENCES public.runs(id) ON DELETE SET NULL,
  ADD COLUMN outcome text CHECK (outcome IN ('waiting', 'said', 'declined', 'replaced', 'withdrawn', 'superseded'));

ALTER TABLE public.hand_raises
  ADD COLUMN run_id uuid REFERENCES public.runs(id) ON DELETE SET NULL,
  ADD COLUMN contribution_id uuid REFERENCES public.contributions(id) ON DELETE SET NULL;

-- A crew member's line in the transcript points at the contribution it spoke.
ALTER TABLE public.transcript
  ADD COLUMN contribution_id uuid REFERENCES public.contributions(id) ON DELETE SET NULL;

-- Scribe state (docs/state_machines.md §9), kept on the shared document it updates.
ALTER TABLE public.stage_docs
  ADD COLUMN scribe_state text NOT NULL DEFAULT 'idle' CHECK (scribe_state IN ('idle', 'updating', 'behind'));

-- The captain's log: who did it, and which run it was about.
ALTER TABLE public.floor_events
  ADD COLUMN actor uuid,
  ADD COLUMN run_id uuid REFERENCES public.runs(id) ON DELETE SET NULL;
CREATE INDEX floor_events_session_idx ON public.floor_events (session_id, created_at);

-- ---------- bring existing rooms into line with the machines ----------
-- Nobody holds the floor between requests, Stopped merges into Idle, and runs that a browser
-- tab was driving before this migration will never finish.
UPDATE public.agents_state SET status = 'idle', current_task = NULL, progress = NULL
WHERE status IN ('stopped', 'speaking', 'working');

-- Open hails pointing at work their crew member has moved on from (F2) end as replaced.
UPDATE public.hand_raises h SET state = 'replaced', resolved_at = now()
WHERE h.state = 'pending' AND (
  NOT EXISTS (
    SELECT 1 FROM public.agents_state a
    WHERE a.session_id = h.session_id AND a.agent = h.agent AND a.status = 'hand_raised'
  )
  OR EXISTS (
    SELECT 1 FROM public.hand_raises n
    WHERE n.session_id = h.session_id AND n.agent = h.agent AND n.state = 'pending'
      AND n.created_at > h.created_at
  )
);

-- A crew member hailing with no open hail goes back to standing by.
UPDATE public.agents_state a SET status = 'idle', current_task = NULL, progress = NULL
WHERE a.status = 'hand_raised' AND NOT EXISTS (
  SELECT 1 FROM public.hand_raises h
  WHERE h.session_id = a.session_id AND h.agent = a.agent AND h.state = 'pending'
);

-- Each remaining open hail speaks its crew member's newest contribution, as it would have.
UPDATE public.hand_raises h SET contribution_id = (
  SELECT c.id FROM public.contributions c
  WHERE c.session_id = h.session_id AND c.agent = h.agent
  ORDER BY c.created_at DESC LIMIT 1
)
WHERE h.state = 'pending';
UPDATE public.contributions SET outcome = 'waiting'
WHERE id IN (SELECT contribution_id FROM public.hand_raises WHERE state = 'pending');

ALTER TABLE public.hand_raises ADD CONSTRAINT hand_raises_state_check
  CHECK (state IN ('pending', 'granted', 'dismissed', 'replaced', 'withdrawn'));

-- One crew member on the floor per room, and one open hail per crew member.
CREATE UNIQUE INDEX agents_state_one_speaker ON public.agents_state (session_id) WHERE status = 'speaking';
CREATE UNIQUE INDEX hand_raises_one_open ON public.hand_raises (session_id, agent) WHERE state = 'pending';

-- ---------- the crew member machine ----------
-- docs/state_machines.md §3. Keep in step with CREW_MOVES in src/lib/machines.ts;
-- src/lib/__tests__/machines-sql.test.ts checks that the two tables match.
CREATE OR REPLACE FUNCTION public.crew_move_allowed(_from public.agent_status, _to public.agent_status)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT _from = _to OR (_from::text, _to::text) IN (
    ('idle', 'working'),
    ('working', 'hand_raised'),
    ('working', 'idle'),
    ('hand_raised', 'speaking'),
    ('hand_raised', 'idle'),
    ('hand_raised', 'working'),
    ('speaking', 'idle')
  );
$$;

CREATE OR REPLACE FUNCTION public.check_crew_move()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status <> 'idle' THEN
      RAISE EXCEPTION 'A crew member starts standing by, not %.', NEW.status USING ERRCODE = 'check_violation';
    END IF;
  ELSIF NOT public.crew_move_allowed(OLD.status, NEW.status) THEN
    RAISE EXCEPTION 'A crew member cannot move from % to %.', OLD.status, NEW.status USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER t_agents_move BEFORE INSERT OR UPDATE OF status ON public.agents_state
FOR EACH ROW EXECUTE FUNCTION public.check_crew_move();

-- ---------- the transitions ----------
-- Each one locks the rows it reads, so two people pressing buttons at once can't break a rule.
-- They run as the caller, so row-level security still decides who may act in which room.

CREATE OR REPLACE FUNCTION public.log_event(_session uuid, _holder text, _event text, _detail text, _run uuid)
RETURNS void LANGUAGE sql SET search_path = public AS $$
  INSERT INTO public.floor_events (session_id, holder, event, detail, actor, run_id)
  VALUES (_session, _holder, _event, _detail, auth.uid(), _run);
$$;

-- Summoned (a redirect, when the crew member is Working). Returns the new run's ID.
CREATE OR REPLACE FUNCTION public.start_run(_session uuid, _agent text, _task text, _mode text DEFAULT 'direct')
RETURNS uuid LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _crew public.agents_state%ROWTYPE;
  _hail public.hand_raises%ROWTYPE;
  _run uuid;
BEGIN
  SELECT * INTO _crew FROM public.agents_state WHERE session_id = _session AND agent = _agent FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'There is no crew member called % here.', _agent;
  END IF;

  IF _crew.status = 'speaking' THEN
    UPDATE public.agents_state SET status = 'idle', current_run_id = NULL WHERE id = _crew.id;
    PERFORM public.log_event(_session, _agent, 'interrupted', NULL, _crew.current_run_id);
  ELSIF _crew.status = 'working' AND _crew.current_run_id IS NOT NULL THEN
    UPDATE public.runs SET state = 'superseded', ended_at = now()
    WHERE id = _crew.current_run_id AND state = 'running';
    PERFORM public.log_event(_session, _agent, 'superseded', 'redirected', _crew.current_run_id);
  END IF;

  FOR _hail IN
    SELECT * FROM public.hand_raises WHERE session_id = _session AND agent = _agent AND state = 'pending'
  LOOP
    UPDATE public.hand_raises SET state = 'replaced', resolved_by = auth.uid(), resolved_at = now() WHERE id = _hail.id;
    UPDATE public.contributions SET outcome = 'replaced' WHERE id = _hail.contribution_id;
    PERFORM public.log_event(_session, _agent, 'replaced', _hail.summary, _hail.run_id);
  END LOOP;

  INSERT INTO public.runs (session_id, agent, task, mode, summoned_by)
  VALUES (_session, _agent, _task, _mode, auth.uid())
  RETURNING id INTO _run;
  UPDATE public.agents_state
  SET status = 'working', current_run_id = _run, current_task = _task, progress = NULL
  WHERE id = _crew.id;
  PERFORM public.log_event(
    _session, _agent,
    CASE WHEN _crew.status = 'working' THEN 'redirected' ELSE 'summoned' END,
    _mode || ': ' || _task, _run
  );
  RETURN _run;
END $$;

-- The model replied. Returns 'hailed', or 'superseded' when the run is no longer current: then
-- the reply is kept as a superseded contribution and raises no hail.
CREATE OR REPLACE FUNCTION public.finish_run(_run uuid, _spoken text, _brief text, _summary text)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _r public.runs%ROWTYPE;
  _crew public.agents_state%ROWTYPE;
  _contribution uuid;
BEGIN
  SELECT * INTO _r FROM public.runs WHERE id = _run FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No such run.';
  END IF;
  SELECT * INTO _crew FROM public.agents_state WHERE session_id = _r.session_id AND agent = _r.agent FOR UPDATE;

  IF _r.state <> 'running' OR _crew.status <> 'working' OR _crew.current_run_id IS DISTINCT FROM _run THEN
    IF _r.state = 'running' THEN
      UPDATE public.runs SET state = 'superseded', ended_at = now() WHERE id = _run;
    END IF;
    INSERT INTO public.contributions (session_id, agent, spoken, brief, run_id, outcome)
    VALUES (_r.session_id, _r.agent, _spoken, _brief, _run, 'superseded');
    PERFORM public.log_event(_r.session_id, _r.agent, 'kept_superseded', _summary, _run);
    RETURN 'superseded';
  END IF;

  INSERT INTO public.contributions (session_id, agent, spoken, brief, run_id, outcome)
  VALUES (_r.session_id, _r.agent, _spoken, _brief, _run, 'waiting')
  RETURNING id INTO _contribution;
  INSERT INTO public.hand_raises (session_id, agent, summary, run_id, contribution_id)
  VALUES (_r.session_id, _r.agent, _summary, _run, _contribution);
  UPDATE public.runs SET state = 'finished', ended_at = now() WHERE id = _run;
  UPDATE public.agents_state SET status = 'hand_raised', progress = _summary WHERE id = _crew.id;
  PERFORM public.log_event(_r.session_id, _r.agent, 'hailed', _summary, _run);
  RETURN 'hailed';
END $$;

-- The run errored or hit the time limit. Returns false if it had already ended.
CREATE OR REPLACE FUNCTION public.fail_run(_run uuid, _reason text)
RETURNS boolean LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _r public.runs%ROWTYPE;
BEGIN
  SELECT * INTO _r FROM public.runs WHERE id = _run FOR UPDATE;
  IF NOT FOUND OR _r.state <> 'running' THEN
    RETURN false;
  END IF;
  UPDATE public.runs SET state = 'failed', ended_at = now() WHERE id = _run;
  UPDATE public.agents_state
  SET status = 'idle', current_run_id = NULL, current_task = NULL, progress = NULL
  WHERE session_id = _r.session_id AND agent = _r.agent AND current_run_id = _run AND status = 'working';
  PERFORM public.log_event(_r.session_id, _r.agent, 'failed', _reason, _run);
  RETURN true;
END $$;

-- The student grants. Returns {result: granted | not_open | floor_busy | not_current, ...}.
CREATE OR REPLACE FUNCTION public.grant_hail(_hail uuid)
RETURNS jsonb LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _h public.hand_raises%ROWTYPE;
  _crew public.agents_state%ROWTYPE;
  _spoken text;
BEGIN
  SELECT * INTO _h FROM public.hand_raises WHERE id = _hail FOR UPDATE;
  IF NOT FOUND OR _h.state <> 'pending' THEN
    RETURN jsonb_build_object('result', 'not_open');
  END IF;
  -- Lock the room's crew so only one grant at a time can check the floor.
  PERFORM 1 FROM public.agents_state WHERE session_id = _h.session_id ORDER BY agent FOR UPDATE;
  IF EXISTS (
    SELECT 1 FROM public.agents_state
    WHERE session_id = _h.session_id AND status = 'speaking' AND agent <> _h.agent
  ) THEN
    PERFORM public.log_event(_h.session_id, _h.agent, 'refused', 'floor busy', _h.run_id);
    RETURN jsonb_build_object('result', 'floor_busy');
  END IF;
  SELECT * INTO _crew FROM public.agents_state WHERE session_id = _h.session_id AND agent = _h.agent;
  IF _crew.status <> 'hand_raised' OR _crew.current_run_id IS DISTINCT FROM _h.run_id THEN
    RETURN jsonb_build_object('result', 'not_current');
  END IF;

  UPDATE public.hand_raises SET state = 'granted', resolved_by = auth.uid(), resolved_at = now() WHERE id = _hail;
  UPDATE public.contributions SET outcome = 'said' WHERE id = _h.contribution_id;
  UPDATE public.agents_state SET status = 'speaking' WHERE id = _crew.id;
  SELECT spoken INTO _spoken FROM public.contributions WHERE id = _h.contribution_id;
  PERFORM public.log_event(_h.session_id, _h.agent, 'granted', _h.summary, _h.run_id);
  RETURN jsonb_build_object(
    'result', 'granted',
    'agent', _h.agent,
    'spoken', COALESCE(_spoken, _h.summary),
    'contribution_id', _h.contribution_id
  );
END $$;

-- Not now. Returns 'declined', or 'not_open' if the hail was already answered.
CREATE OR REPLACE FUNCTION public.decline_hail(_hail uuid)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _h public.hand_raises%ROWTYPE;
BEGIN
  SELECT * INTO _h FROM public.hand_raises WHERE id = _hail FOR UPDATE;
  IF NOT FOUND OR _h.state <> 'pending' THEN
    RETURN 'not_open';
  END IF;
  UPDATE public.hand_raises SET state = 'dismissed', resolved_by = auth.uid(), resolved_at = now() WHERE id = _hail;
  UPDATE public.contributions SET outcome = 'declined' WHERE id = _h.contribution_id;
  -- Only the crew member's open hail sends it back to standing by (F5).
  UPDATE public.agents_state
  SET status = 'idle', current_run_id = NULL, current_task = NULL, progress = NULL
  WHERE session_id = _h.session_id AND agent = _h.agent AND status = 'hand_raised'
    AND current_run_id IS NOT DISTINCT FROM _h.run_id;
  PERFORM public.log_event(_h.session_id, _h.agent, 'not_now', _h.summary, _h.run_id);
  RETURN 'declined';
END $$;

-- Stop, from the Stop button or /stop (F6). Returns the state the crew member was in.
CREATE OR REPLACE FUNCTION public.stop_crew(_session uuid, _agent text)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _crew public.agents_state%ROWTYPE;
  _hail public.hand_raises%ROWTYPE;
BEGIN
  SELECT * INTO _crew FROM public.agents_state WHERE session_id = _session AND agent = _agent FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'There is no crew member called % here.', _agent;
  END IF;
  IF _crew.status = 'working' THEN
    UPDATE public.runs SET state = 'superseded', ended_at = now()
    WHERE id = _crew.current_run_id AND state = 'running';
  END IF;
  FOR _hail IN
    SELECT * FROM public.hand_raises WHERE session_id = _session AND agent = _agent AND state = 'pending'
  LOOP
    UPDATE public.hand_raises SET state = 'withdrawn', resolved_by = auth.uid(), resolved_at = now() WHERE id = _hail.id;
    UPDATE public.contributions SET outcome = 'withdrawn' WHERE id = _hail.contribution_id;
  END LOOP;
  IF _crew.status <> 'idle' THEN
    UPDATE public.agents_state
    SET status = 'idle', current_run_id = NULL, current_task = NULL, progress = NULL
    WHERE id = _crew.id;
  END IF;
  PERFORM public.log_event(_session, _agent, 'stopped', _crew.status::text, _crew.current_run_id);
  RETURN _crew.status::text;
END $$;

-- The crew member has finished saying its spoken part.
CREATE OR REPLACE FUNCTION public.done_speaking(_session uuid, _agent text)
RETURNS void LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  UPDATE public.agents_state
  SET status = 'idle', current_run_id = NULL, current_task = NULL, progress = NULL
  WHERE session_id = _session AND agent = _agent AND status = 'speaking';
  IF FOUND THEN
    PERFORM public.log_event(_session, _agent, 'finished_speaking', NULL, NULL);
  END IF;
END $$;

-- A prompt interrupts whoever is speaking. Returns that crew member, or null.
CREATE OR REPLACE FUNCTION public.interrupt_speaker(_session uuid)
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _agent text;
BEGIN
  UPDATE public.agents_state
  SET status = 'idle', current_run_id = NULL, current_task = NULL, progress = NULL
  WHERE session_id = _session AND status = 'speaking'
  RETURNING agent INTO _agent;
  IF _agent IS NOT NULL THEN
    PERFORM public.log_event(_session, _agent, 'interrupted', NULL, NULL);
  END IF;
  RETURN _agent;
END $$;

-- The time limit: runs still going after _limit fail, and a stuck Scribe is reset (F10).
-- Returns the crew members whose runs failed.
CREATE OR REPLACE FUNCTION public.expire_stale_runs(_session uuid, _limit interval)
RETURNS SETOF text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _r public.runs%ROWTYPE;
BEGIN
  FOR _r IN
    SELECT * FROM public.runs
    WHERE session_id = _session AND state = 'running' AND started_at < now() - _limit
  LOOP
    IF public.fail_run(_r.id, 'time limit') THEN
      RETURN NEXT _r.agent;
    END IF;
  END LOOP;
  UPDATE public.stage_docs SET scribe_state = 'idle'
  WHERE session_id = _session AND scribe_state <> 'idle' AND updated_at < now() - _limit;
END $$;

-- Scribe state (docs/state_machines.md §9). scribe_request returns true when the caller should
-- start an update now; scribe_done returns true when another update is owed.
CREATE OR REPLACE FUNCTION public.scribe_request(_session uuid, _slug text)
RETURNS boolean LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _state text;
BEGIN
  SELECT scribe_state INTO _state FROM public.stage_docs WHERE session_id = _session AND slug = _slug FOR UPDATE;
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  IF _state = 'idle' THEN
    UPDATE public.stage_docs SET scribe_state = 'updating' WHERE session_id = _session AND slug = _slug;
    RETURN true;
  END IF;
  UPDATE public.stage_docs SET scribe_state = 'behind' WHERE session_id = _session AND slug = _slug;
  RETURN false;
END $$;

CREATE OR REPLACE FUNCTION public.scribe_done(_session uuid, _slug text)
RETURNS boolean LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _state text;
BEGIN
  SELECT scribe_state INTO _state FROM public.stage_docs WHERE session_id = _session AND slug = _slug FOR UPDATE;
  IF _state = 'behind' THEN
    UPDATE public.stage_docs SET scribe_state = 'updating' WHERE session_id = _session AND slug = _slug;
    RETURN true;
  END IF;
  UPDATE public.stage_docs SET scribe_state = 'idle' WHERE session_id = _session AND slug = _slug;
  PERFORM public.log_event(_session, 'scribe', 'doc_updated', _slug, NULL);
  RETURN false;
END $$;

-- Only signed-in room members (through row-level security) call these.
DO $$
DECLARE
  _fn text;
BEGIN
  FOREACH _fn IN ARRAY ARRAY[
    'public.crew_move_allowed(public.agent_status, public.agent_status)',
    'public.check_crew_move()',
    'public.log_event(uuid, text, text, text, uuid)',
    'public.start_run(uuid, text, text, text)',
    'public.finish_run(uuid, text, text, text)',
    'public.fail_run(uuid, text)',
    'public.grant_hail(uuid)',
    'public.decline_hail(uuid)',
    'public.stop_crew(uuid, text)',
    'public.done_speaking(uuid, text)',
    'public.interrupt_speaker(uuid)',
    'public.expire_stale_runs(uuid, interval)',
    'public.scribe_request(uuid, text)',
    'public.scribe_done(uuid, text)'
  ] LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon', _fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', _fn);
  END LOOP;
END $$;
