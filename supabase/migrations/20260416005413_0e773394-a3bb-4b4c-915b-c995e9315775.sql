
CREATE OR REPLACE FUNCTION public.list_auth_users()
RETURNS TABLE(id uuid, email text, created_at timestamptz)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY
    SELECT au.id, au.email::text, au.created_at
    FROM auth.users au
    ORDER BY au.created_at DESC;
END;
$$;
