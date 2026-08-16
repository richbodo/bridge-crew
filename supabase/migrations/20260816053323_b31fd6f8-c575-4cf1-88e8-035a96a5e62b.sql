REVOKE EXECUTE ON FUNCTION public.is_participant(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_participant(uuid, uuid) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;