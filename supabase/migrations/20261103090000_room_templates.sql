-- Phase 2 of docs/plans/educational-context-2026-10-31.md: room templates.
--   * a room records its template, and its settings (seats, the student's nickname, and later
--     what the big screen shows);
--   * a prompt records whether the teacher or the student said it, on a shared seat;
--   * a room never takes more people than its template's seats (F14).

ALTER TABLE public.sessions
  ADD COLUMN template text NOT NULL DEFAULT 'deliberation' CHECK (template IN ('deliberation', 'game-studio')),
  ADD COLUMN settings jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.transcript
  ADD COLUMN speaker_role text CHECK (speaker_role IN ('teacher', 'student'));

-- F14: the template sets the seats (settings.seats, written when the room opens). It runs as
-- its owner so it can count people that row-level security hides from the newcomer.
CREATE OR REPLACE FUNCTION public.check_seats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _seats int;
  _taken int;
BEGIN
  SELECT COALESCE((settings ->> 'seats')::int, 2) INTO _seats FROM public.sessions WHERE id = NEW.session_id;
  SELECT count(*) INTO _taken FROM public.participants
  WHERE session_id = NEW.session_id AND user_id <> NEW.user_id;
  IF _taken >= _seats THEN
    RAISE EXCEPTION 'This room is full: it has % seat%.', _seats, CASE WHEN _seats = 1 THEN '' ELSE 's' END
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.check_seats() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER t_participants_seats BEFORE INSERT ON public.participants
FOR EACH ROW EXECUTE FUNCTION public.check_seats();

-- Settings change while a room is open (the big screen), so watch them.
ALTER TABLE public.sessions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;
