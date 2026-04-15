-- Create pipeline stage enum
CREATE TYPE public.pipeline_stage AS ENUM (
  'novo_lead',
  'engajado',
  'qualificado',
  'proposta_apresentada',
  'checkout_iniciado',
  'convertido',
  'perdido'
);

-- Create lead temperature enum
CREATE TYPE public.lead_temperature AS ENUM ('frio', 'morno', 'quente');

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  tipo_negocio TEXT,
  dor_principal TEXT,
  interesse TEXT,
  urgencia TEXT,
  objetivo TEXT,
  origem TEXT DEFAULT 'chatbot',
  stage pipeline_stage NOT NULL DEFAULT 'novo_lead',
  temperatura lead_temperature NOT NULL DEFAULT 'frio',
  score INTEGER NOT NULL DEFAULT 0,
  ultima_interacao TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead events table
CREATE TABLE public.lead_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  from_stage pipeline_stage,
  to_stage pipeline_stage,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

-- Leads policies (MVP - open access, will lock down with auth later)
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view leads" ON public.leads
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update leads" ON public.leads
  FOR UPDATE USING (true);

-- Lead events policies
CREATE POLICY "Anyone can create lead events" ON public.lead_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view lead events" ON public.lead_events
  FOR SELECT USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-calculate temperature based on score
CREATE OR REPLACE FUNCTION public.calculate_lead_temperature()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.score >= 51 THEN
    NEW.temperatura = 'quente';
  ELSIF NEW.score >= 21 THEN
    NEW.temperatura = 'morno';
  ELSE
    NEW.temperatura = 'frio';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER auto_lead_temperature
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.calculate_lead_temperature();

-- Indexes
CREATE INDEX idx_leads_stage ON public.leads(stage);
CREATE INDEX idx_leads_temperatura ON public.leads(temperatura);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_lead_events_lead_id ON public.lead_events(lead_id);