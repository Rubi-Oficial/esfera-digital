CREATE OR REPLACE FUNCTION public.update_chatbot_lead_fields(
  _lead_id uuid,
  _interesse text DEFAULT NULL,
  _tipo_negocio text DEFAULT NULL,
  _urgencia text DEFAULT NULL,
  _objetivo text DEFAULT NULL,
  _dor_principal text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.leads
  SET
    interesse = COALESCE(_interesse, interesse),
    tipo_negocio = COALESCE(_tipo_negocio, tipo_negocio),
    urgencia = COALESCE(_urgencia, urgencia),
    objetivo = COALESCE(_objetivo, objetivo),
    dor_principal = COALESCE(_dor_principal, dor_principal),
    ultima_interacao = now(),
    updated_at = now()
  WHERE id = _lead_id;
END;
$$;