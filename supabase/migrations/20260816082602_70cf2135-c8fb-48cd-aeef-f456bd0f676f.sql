CREATE TABLE public.invites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  email text NOT NULL,
  note text,
  invited_by uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  last_sent_at timestamp with time zone,
  accepted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX invites_session_id_idx ON public.invites(session_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.invites TO authenticated;
GRANT ALL ON public.invites TO service_role;

ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invites readable by members" ON public.invites
  FOR SELECT TO authenticated
  USING (public.is_participant(session_id, auth.uid()));

CREATE POLICY "members create invites" ON public.invites
  FOR INSERT TO authenticated
  WITH CHECK (public.is_participant(session_id, auth.uid()) AND invited_by = auth.uid());

CREATE POLICY "members update invites" ON public.invites
  FOR UPDATE TO authenticated
  USING (public.is_participant(session_id, auth.uid()))
  WITH CHECK (public.is_participant(session_id, auth.uid()));

CREATE TRIGGER update_invites_updated_at
  BEFORE UPDATE ON public.invites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();