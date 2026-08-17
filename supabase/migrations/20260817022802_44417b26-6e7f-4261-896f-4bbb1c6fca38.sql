CREATE TABLE public.context_packs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, name)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.context_packs TO authenticated;
GRANT ALL ON public.context_packs TO service_role;

ALTER TABLE public.context_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "packs readable by members" ON public.context_packs FOR SELECT TO authenticated USING (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members create packs" ON public.context_packs FOR INSERT TO authenticated WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members update packs" ON public.context_packs FOR UPDATE TO authenticated USING (public.is_participant(session_id, auth.uid())) WITH CHECK (public.is_participant(session_id, auth.uid()));
CREATE POLICY "members delete packs" ON public.context_packs FOR DELETE TO authenticated USING (public.is_participant(session_id, auth.uid()));

CREATE TABLE public.context_docs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pack_id uuid NOT NULL REFERENCES public.context_packs(id) ON DELETE CASCADE,
  path text NOT NULL,
  body text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX context_docs_pack_id_idx ON public.context_docs(pack_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.context_docs TO authenticated;
GRANT ALL ON public.context_docs TO service_role;

ALTER TABLE public.context_docs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "docs readable by pack members" ON public.context_docs FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.context_packs p WHERE p.id = pack_id AND public.is_participant(p.session_id, auth.uid())));
CREATE POLICY "members create pack docs" ON public.context_docs FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.context_packs p WHERE p.id = pack_id AND public.is_participant(p.session_id, auth.uid())));
CREATE POLICY "members update pack docs" ON public.context_docs FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.context_packs p WHERE p.id = pack_id AND public.is_participant(p.session_id, auth.uid()))) WITH CHECK (EXISTS (SELECT 1 FROM public.context_packs p WHERE p.id = pack_id AND public.is_participant(p.session_id, auth.uid())));
CREATE POLICY "members delete pack docs" ON public.context_docs FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.context_packs p WHERE p.id = pack_id AND public.is_participant(p.session_id, auth.uid())));

CREATE TRIGGER t_context_packs_u BEFORE UPDATE ON public.context_packs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER t_context_docs_u BEFORE UPDATE ON public.context_docs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.agents_state ADD COLUMN context_packs text[] NOT NULL DEFAULT '{}';