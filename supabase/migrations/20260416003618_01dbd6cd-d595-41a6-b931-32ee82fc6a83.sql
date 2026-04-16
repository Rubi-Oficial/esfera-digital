
CREATE TABLE public.client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  client_name text NOT NULL,
  current_stage text NOT NULL DEFAULT 'briefing',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- Admins full access
CREATE POLICY "Admins can do everything on client_projects"
  ON public.client_projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Clients can view their own project
CREATE POLICY "Clients can view own project"
  ON public.client_projects FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Auto-update updated_at
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON public.client_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
