
-- 1. referral_clicks: drop the non-admin SELECT policy, replace with admin-only
DROP POLICY IF EXISTS "Users can view own referral clicks" ON public.referral_clicks;

CREATE POLICY "Only admins can view referral clicks"
  ON public.referral_clicks FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. referrals: drop existing SELECT policy, create admin-only + restricted partner policy
DROP POLICY IF EXISTS "Users can view own referrals" ON public.referrals;

-- Admins see everything
CREATE POLICY "Admins can view all referrals"
  ON public.referrals FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Create a secure RPC for partners to get their referrals WITHOUT lead_telefone
CREATE OR REPLACE FUNCTION public.get_my_referrals(_code_id uuid)
RETURNS TABLE(
  id uuid,
  referral_code_id uuid,
  lead_id uuid,
  lead_nome text,
  status text,
  comissao numeric,
  data_conversao timestamptz,
  data_pagamento timestamptz,
  expires_at timestamptz,
  created_at timestamptz
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Verify the caller owns this referral code
  IF NOT EXISTS (
    SELECT 1 FROM public.referral_codes rc
    WHERE rc.id = _code_id AND rc.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
    SELECT r.id, r.referral_code_id, r.lead_id, r.lead_nome,
           r.status, r.comissao, r.data_conversao, r.data_pagamento,
           r.expires_at, r.created_at
    FROM public.referrals r
    WHERE r.referral_code_id = _code_id
    ORDER BY r.created_at DESC;
END;
$$;
