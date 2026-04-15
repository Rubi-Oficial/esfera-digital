-- Drop and recreate insert policies to allow both public and authenticated
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT TO public, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create lead events" ON public.lead_events;
CREATE POLICY "Anyone can create lead events" ON public.lead_events
  FOR INSERT TO public, authenticated
  WITH CHECK (true);