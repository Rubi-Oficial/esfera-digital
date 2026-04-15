
-- Fix 1: Remove broad anon SELECT on referral_codes
DROP POLICY IF EXISTS "Anyone can lookup referral code by code" ON public.referral_codes;

-- Create a secure function for code lookup (returns only id and comissao)
CREATE OR REPLACE FUNCTION public.lookup_referral_code(_code text)
RETURNS TABLE(id uuid, code text, comissao_por_venda numeric)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT rc.id, rc.code, rc.comissao_por_venda
  FROM public.referral_codes rc
  WHERE rc.code = _code AND rc.ativo = true
  LIMIT 1;
$$;

-- Fix 2: Explicit deny INSERT on user_roles for non-admins
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
