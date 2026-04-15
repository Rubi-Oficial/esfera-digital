-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Now tighten leads policies
-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can update leads" ON public.leads;

-- Keep chatbot insert open
-- "Anyone can create leads" already exists

-- Only authenticated admins can view leads
CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only authenticated admins can update leads
CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tighten lead_events
DROP POLICY IF EXISTS "Anyone can view lead events" ON public.lead_events;

CREATE POLICY "Admins can view lead events" ON public.lead_events
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));