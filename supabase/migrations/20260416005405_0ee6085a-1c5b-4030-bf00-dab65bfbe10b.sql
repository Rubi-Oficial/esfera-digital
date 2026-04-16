
CREATE OR REPLACE FUNCTION public.list_auth_users()
RETURNS TABLE(id uuid, email text, created_at timestamptz)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT au.id, au.email::text, au.created_at
  FROM auth.users au
  ORDER BY au.created_at DESC;
$$;

-- Only admins can call this
REVOKE ALL ON FUNCTION public.list_auth_users() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.list_auth_users() FROM anon;
GRANT EXECUTE ON FUNCTION public.list_auth_users() TO authenticated;
