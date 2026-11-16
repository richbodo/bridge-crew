-- Bigger games, Phase A (docs/plans/bigger-games-2026-11-16.md Parts 1 and 4):
--   * game_files: the files of a room's versions. Each is stored once, under the hash of its
--     content, because most files don't change from one version to the next;
--   * a version's made thing lists its files (path → hash) in `files`, so its row stays small
--     for the room's live updates. An old version has no files: its body is its one HTML file;
--   * finish_run keeps a version's files;
--   * bring_in_version: a game made elsewhere, brought in by the people, becomes the next
--     version and the current version straight away (docs/state_machines.md §8).
-- A room's game size, Simple or Bigger, is `games` in its settings; no setting means Simple.

-- ---------- game files ----------
CREATE TABLE public.game_files (
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  -- The SHA-256 of the body, in hex.
  hash text NOT NULL,
  -- Text, or a data URL for a picture or font.
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, hash)
);
GRANT SELECT, INSERT ON public.game_files TO authenticated;
GRANT ALL ON public.game_files TO service_role;
ALTER TABLE public.game_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "game files readable by members" ON public.game_files FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members add game files" ON public.game_files FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));

ALTER TABLE public.made_things ADD COLUMN files jsonb;

-- ---------- finish_run keeps a version's files ----------
CREATE OR REPLACE FUNCTION public.finish_run(
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
    INSERT INTO public.made_things (session_id, run_id, contribution_id, agent, kind, name, version, body, files, state)
    VALUES (
      _r.session_id, _run, _contribution, _r.agent, _thing ->> 'kind',
      COALESCE('v' || _number, NULLIF(_thing ->> 'name', ''), _thing ->> 'kind'),
      _number, COALESCE(_thing ->> 'body', ''), _thing -> 'files',
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

-- ---------- bringing in a game ----------
-- The files are in game_files already. Returns the new version's id and number.
CREATE FUNCTION public.bring_in_version(_session uuid, _files jsonb, _title text)
RETURNS jsonb LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  _number int;
  _id uuid;
  _name text := left(btrim(regexp_replace(COALESCE(_title, ''), '\s+', ' ', 'g')), 40);
BEGIN
  IF NOT public.is_participant(_session, auth.uid()) THEN
    RAISE EXCEPTION 'You have not joined this room.';
  END IF;
  IF jsonb_typeof(_files) <> 'object' OR NOT (_files ? 'index.html') THEN
    RAISE EXCEPTION 'A game needs an index.html.';
  END IF;
  -- Lock the room so two versions can't take the same number.
  PERFORM 1 FROM public.sessions WHERE id = _session FOR UPDATE;
  SELECT COALESCE(max(version), 0) + 1 INTO _number FROM public.made_things
  WHERE session_id = _session AND kind = 'version';
  INSERT INTO public.made_things (session_id, agent, kind, name, version, body, files, state)
  VALUES (_session, 'brought-in', 'version', COALESCE(NULLIF(_name, ''), 'v' || _number), _number, '', _files, 'used')
  RETURNING id INTO _id;
  PERFORM public.make_current(_session, _id);
  PERFORM public.log_event(_session, 'room', 'brought_in', 'v' || _number, NULL);
  RETURN jsonb_build_object('id', _id, 'version', _number);
END $$;
REVOKE EXECUTE ON FUNCTION public.bring_in_version(uuid, jsonb, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bring_in_version(uuid, jsonb, text) TO authenticated, service_role;
