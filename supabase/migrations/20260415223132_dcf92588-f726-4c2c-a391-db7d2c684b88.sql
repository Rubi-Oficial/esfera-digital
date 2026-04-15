
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE ON public.leads TO authenticated;

GRANT SELECT, INSERT ON public.lead_events TO anon;
GRANT SELECT, INSERT ON public.lead_events TO authenticated;

GRANT SELECT, INSERT ON public.referral_clicks TO anon;
GRANT SELECT, INSERT ON public.referral_clicks TO authenticated;

GRANT SELECT, INSERT ON public.referral_codes TO authenticated;
GRANT SELECT, UPDATE ON public.referral_codes TO authenticated;

GRANT SELECT, INSERT ON public.referrals TO anon;
GRANT SELECT, INSERT, UPDATE ON public.referrals TO authenticated;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT INSERT ON public.user_roles TO authenticated;
