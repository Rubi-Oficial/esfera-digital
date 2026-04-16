-- 1. Add user_id column to leads (nullable - leads start anonymous)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_telefone ON public.leads(telefone);

-- 2. Allow users to view their own leads (in addition to admins)
CREATE POLICY "Users can view own linked leads"
ON public.leads
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 3. Function: normalize phone (digits only, strip leading 55 country code)
CREATE OR REPLACE FUNCTION public.normalize_phone(_phone text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT regexp_replace(COALESCE(_phone, ''), '\D', '', 'g')
$$;

-- 4. Trigger function: when a new auth user signs up, link any leads matching their phone
CREATE OR REPLACE FUNCTION public.link_leads_to_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _phone text;
  _phone_norm text;
BEGIN
  -- Try to read phone from raw_user_meta_data or the auth.users.phone column
  _phone := COALESCE(
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'telefone',
    NEW.phone
  );

  IF _phone IS NULL OR length(_phone) = 0 THEN
    RETURN NEW;
  END IF;

  _phone_norm := public.normalize_phone(_phone);
  -- Strip leading 55 (Brazilian country code) for matching flexibility
  IF left(_phone_norm, 2) = '55' AND length(_phone_norm) > 10 THEN
    _phone_norm := substring(_phone_norm from 3);
  END IF;

  IF length(_phone_norm) < 8 THEN
    RETURN NEW;
  END IF;

  UPDATE public.leads
  SET user_id = NEW.id,
      updated_at = now()
  WHERE user_id IS NULL
    AND (
      public.normalize_phone(telefone) = _phone_norm
      OR public.normalize_phone(telefone) = '55' || _phone_norm
      OR right(public.normalize_phone(telefone), length(_phone_norm)) = _phone_norm
    );

  RETURN NEW;
END;
$$;

-- 5. Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created_link_leads ON auth.users;
CREATE TRIGGER on_auth_user_created_link_leads
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.link_leads_to_new_user();

-- 6. Admin RPC: manually link a lead to a user (for cases where auto-match fails)
CREATE OR REPLACE FUNCTION public.admin_link_lead_to_user(_lead_id uuid, _user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE public.leads
  SET user_id = _user_id, updated_at = now()
  WHERE id = _lead_id;
END;
$$;

-- 7. Admin RPC: get subscription status for a list of user_ids (for CRM column)
CREATE OR REPLACE FUNCTION public.admin_get_subscriptions_for_users(_user_ids uuid[])
RETURNS TABLE(
  user_id uuid,
  status text,
  product_id text,
  stripe_price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
    SELECT DISTINCT ON (s.user_id)
      s.user_id, s.status, s.product_id, s.stripe_price_id,
      s.current_period_end, s.cancel_at_period_end
    FROM public.subscriptions s
    WHERE s.user_id = ANY(_user_ids)
    ORDER BY s.user_id, s.updated_at DESC;
END;
$$;

-- 8. Backfill: link existing leads to existing auth users by phone match
UPDATE public.leads l
SET user_id = sub.user_id, updated_at = now()
FROM (
  SELECT au.id AS user_id,
         public.normalize_phone(COALESCE(au.raw_user_meta_data->>'phone', au.raw_user_meta_data->>'telefone', au.phone)) AS phone_norm
  FROM auth.users au
  WHERE COALESCE(au.raw_user_meta_data->>'phone', au.raw_user_meta_data->>'telefone', au.phone) IS NOT NULL
) sub
WHERE l.user_id IS NULL
  AND length(sub.phone_norm) >= 8
  AND (
    public.normalize_phone(l.telefone) = sub.phone_norm
    OR right(public.normalize_phone(l.telefone), 10) = right(sub.phone_norm, 10)
  );