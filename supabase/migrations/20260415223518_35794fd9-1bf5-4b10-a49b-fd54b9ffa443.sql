
CREATE OR REPLACE FUNCTION public.create_chatbot_lead(
  _nome text,
  _telefone text,
  _origem text DEFAULT 'chatbot',
  _interesse text DEFAULT NULL,
  _tipo_negocio text DEFAULT NULL,
  _urgencia text DEFAULT NULL,
  _objetivo text DEFAULT NULL,
  _dor_principal text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO leads (nome, telefone, origem, interesse, tipo_negocio, urgencia, objetivo, dor_principal)
  VALUES (_nome, _telefone, _origem, _interesse, _tipo_negocio, _urgencia, _objetivo, _dor_principal)
  RETURNING id INTO _id;
  RETURN _id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_chatbot_lead TO anon, authenticated;
