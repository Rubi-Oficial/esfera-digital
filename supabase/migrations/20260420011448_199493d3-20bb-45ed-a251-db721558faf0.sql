CREATE OR REPLACE FUNCTION public.update_chatbot_lead_fields(
  _lead_id uuid,
  _interesse text DEFAULT NULL,
  _tipo_negocio text DEFAULT NULL,
  _urgencia text DEFAULT NULL,
  _objetivo text DEFAULT NULL,
  _dor_principal text DEFAULT NULL,
  _to_stage public.pipeline_stage DEFAULT NULL,
  _score_increment integer DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _from_stage public.pipeline_stage;
  _new_score integer;
BEGIN
  SELECT stage, score INTO _from_stage, _new_score
  FROM public.leads WHERE id = _lead_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Lead not found';
  END IF;

  _new_score := COALESCE(_new_score, 0) + COALESCE(_score_increment, 0);

  UPDATE public.leads
  SET
    interesse = COALESCE(_interesse, interesse),
    tipo_negocio = COALESCE(_tipo_negocio, tipo_negocio),
    urgencia = COALESCE(_urgencia, urgencia),
    objetivo = COALESCE(_objetivo, objetivo),
    dor_principal = COALESCE(_dor_principal, dor_principal),
    stage = COALESCE(_to_stage, stage),
    score = _new_score,
    ultima_interacao = now(),
    updated_at = now()
  WHERE id = _lead_id;

  IF _to_stage IS NOT NULL AND _to_stage <> _from_stage THEN
    INSERT INTO public.lead_events (lead_id, event_type, from_stage, to_stage)
    VALUES (_lead_id, 'stage_change', _from_stage, _to_stage);
  END IF;
END;
$$;