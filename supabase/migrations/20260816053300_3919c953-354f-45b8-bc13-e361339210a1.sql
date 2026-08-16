-- helper: updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TYPE public.agent_kind AS ENUM ('scribe','scout','advocate','skeptic','analyst');
CREATE TYPE public.agent_status AS ENUM ('idle','working','hand_raised','speaking','stopped');
CREATE TYPE public.turn_kind AS ENUM ('human','system','agent');

CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Untitled session',
  code text NOT NULL UNIQUE,
  owner_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  display_name text NOT NULL,
  color text NOT NULL DEFAULT '#6ee7b7',
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.participants TO authenticated;
GRANT ALL ON public.participants TO service_role;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_participant(_session_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.participants p WHERE p.session_id = _session_id AND p.user_id = _user_id);
$$;

CREATE TABLE public.transcript (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  author_id uuid,
  author_name text NOT NULL,
  kind public.turn_kind NOT NULL DEFAULT 'human',
  agent public.agent_kind,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.transcript TO authenticated;
GRANT ALL ON public.transcript TO service_role;
ALTER TABLE public.transcript ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.agents_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  agent public.agent_kind NOT NULL,
  status public.agent_status NOT NULL DEFAULT 'idle',
  current_task text,
  progress text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, agent)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agents_state TO authenticated;
GRANT ALL ON public.agents_state TO service_role;
ALTER TABLE public.agents_state ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.summons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  agent public.agent_kind NOT NULL,
  brief text NOT NULL,
  summoned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.summons TO authenticated;
GRANT ALL ON public.summons TO service_role;
ALTER TABLE public.summons ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.hand_raises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  agent public.agent_kind NOT NULL,
  summary text NOT NULL,
  state text NOT NULL DEFAULT 'pending',
  resolved_by uuid,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hand_raises TO authenticated;
GRANT ALL ON public.hand_raises TO service_role;
ALTER TABLE public.hand_raises ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  agent public.agent_kind NOT NULL,
  spoken text NOT NULL,
  brief text NOT NULL DEFAULT '',
  summon_id uuid REFERENCES public.summons(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contributions TO authenticated;
GRANT ALL ON public.contributions TO service_role;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.stage_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  slug text NOT NULL,
  body text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stage_docs TO authenticated;
GRANT ALL ON public.stage_docs TO service_role;
ALTER TABLE public.stage_docs ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.floor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  holder text NOT NULL,
  event text NOT NULL,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.floor_events TO authenticated;
GRANT ALL ON public.floor_events TO service_role;
ALTER TABLE public.floor_events ENABLE ROW LEVEL SECURITY;

-- policies
CREATE POLICY "sessions readable by any signed-in user" ON public.sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "sessions created by owner" ON public.sessions FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "sessions updated by owner" ON public.sessions FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "sessions deleted by owner" ON public.sessions FOR DELETE TO authenticated USING (owner_id = auth.uid());

CREATE POLICY "participants visible to session members" ON public.participants FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_participant(session_id, auth.uid()));
CREATE POLICY "join a session as yourself" ON public.participants FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "update own participant row" ON public.participants FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "leave a session" ON public.participants FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "transcript readable by members" ON public.transcript FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members can post" ON public.transcript FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "agents readable by members" ON public.agents_state FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members manage agents" ON public.agents_state FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members update agents" ON public.agents_state FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "summons readable by members" ON public.summons FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members summon" ON public.summons FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "hails readable by members" ON public.hand_raises FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members create hails" ON public.hand_raises FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members resolve hails" ON public.hand_raises FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "contributions readable by members" ON public.contributions FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members add contributions" ON public.contributions FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "docs readable by members" ON public.stage_docs FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members create docs" ON public.stage_docs FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members update docs" ON public.stage_docs FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE POLICY "floor events readable by members" ON public.floor_events FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members log floor events" ON public.floor_events FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));

-- triggers
CREATE TRIGGER t_sessions_u BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_participants_u BEFORE UPDATE ON public.participants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_transcript_u BEFORE UPDATE ON public.transcript FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_agents_u BEFORE UPDATE ON public.agents_state FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_summons_u BEFORE UPDATE ON public.summons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_hails_u BEFORE UPDATE ON public.hand_raises FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_contrib_u BEFORE UPDATE ON public.contributions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_docs_u BEFORE UPDATE ON public.stage_docs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_floor_u BEFORE UPDATE ON public.floor_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- realtime
ALTER TABLE public.transcript REPLICA IDENTITY FULL;
ALTER TABLE public.agents_state REPLICA IDENTITY FULL;
ALTER TABLE public.hand_raises REPLICA IDENTITY FULL;
ALTER TABLE public.contributions REPLICA IDENTITY FULL;
ALTER TABLE public.stage_docs REPLICA IDENTITY FULL;
ALTER TABLE public.participants REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transcript, public.agents_state, public.hand_raises, public.contributions, public.stage_docs, public.participants;
