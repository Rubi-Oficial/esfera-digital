
-- Referral codes table
CREATE TABLE public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code text NOT NULL UNIQUE,
  nome text NOT NULL,
  telefone text,
  total_clicks integer NOT NULL DEFAULT 0,
  total_leads integer NOT NULL DEFAULT 0,
  total_vendas integer NOT NULL DEFAULT 0,
  comissao_por_venda numeric(10,2) NOT NULL DEFAULT 100.00,
  saldo_disponivel numeric(10,2) NOT NULL DEFAULT 0.00,
  saldo_pago numeric(10,2) NOT NULL DEFAULT 0.00,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Users see their own codes
CREATE POLICY "Users can view own referral codes"
  ON public.referral_codes FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Users can create their own code
CREATE POLICY "Users can create own referral code"
  ON public.referral_codes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Only admins can update referral codes (balances, stats)
CREATE POLICY "Admins can update referral codes"
  ON public.referral_codes FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_referral_codes_updated_at
  BEFORE UPDATE ON public.referral_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Referrals table (each referred lead)
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id uuid NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  lead_nome text,
  lead_telefone text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'paid', 'expired')),
  comissao numeric(10,2) NOT NULL DEFAULT 100.00,
  data_conversao timestamptz,
  data_pagamento timestamptz,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Users see referrals linked to their codes
CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.referral_codes rc
      WHERE rc.id = referral_code_id AND (rc.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- System/anon can create referrals (from chatbot)
CREATE POLICY "Anyone can create referrals"
  ON public.referrals FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only admins update referral status
CREATE POLICY "Admins can update referrals"
  ON public.referrals FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Referral clicks table
CREATE TABLE public.referral_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id uuid NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;

-- Anyone can log clicks
CREATE POLICY "Anyone can create referral clicks"
  ON public.referral_clicks FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Users/admins can view clicks on their codes
CREATE POLICY "Users can view own referral clicks"
  ON public.referral_clicks FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.referral_codes rc
      WHERE rc.id = referral_code_id AND (rc.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- Allow anon to read referral codes by code (for landing page tracking)
CREATE POLICY "Anyone can lookup referral code by code"
  ON public.referral_codes FOR SELECT TO anon
  USING (ativo = true);
