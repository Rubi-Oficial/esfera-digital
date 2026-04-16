-- Fix recursive RLS policy on user_roles
DROP POLICY "Admins can view roles" ON public.user_roles;

-- Allow users to read their OWN roles (needed for AuthGuard check)
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));