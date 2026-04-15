import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { leads } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build context from lead data
    const totalLeads = leads?.length || 0;
    const convertidos = leads?.filter((l: any) => l.stage === "convertido").length || 0;
    const perdidos = leads?.filter((l: any) => l.stage === "perdido").length || 0;
    const quentes = leads?.filter((l: any) => l.temperatura === "quente").length || 0;
    const mornos = leads?.filter((l: any) => l.temperatura === "morno").length || 0;
    const qualificados = leads?.filter((l: any) => l.stage === "qualificado").length || 0;
    const checkoutIniciado = leads?.filter((l: any) => l.stage === "checkout_iniciado").length || 0;
    const taxaConversao = totalLeads > 0 ? ((convertidos / totalLeads) * 100).toFixed(1) : "0";

    // Stage distribution
    const stages: Record<string, number> = {};
    leads?.forEach((l: any) => { stages[l.stage] = (stages[l.stage] || 0) + 1; });

    const systemPrompt = `Você é um consultor de vendas especializado em PMEs brasileiras. 
Analise os dados do CRM e forneça insights acionáveis em português brasileiro.
Seja direto, use números e sugira ações específicas.
Responda em JSON com esta estrutura exata:
{
  "previsao_faturamento": "valor estimado em R$ baseado na taxa de conversão e ticket médio de R$297",
  "insights": ["insight1", "insight2", "insight3"],
  "acoes_sugeridas": ["acao1", "acao2", "acao3"],
  "gargalo_principal": "onde está o maior problema do funil",
  "lead_quente_acao": "ação recomendada para leads quentes"
}`;

    const userPrompt = `Dados do CRM Esfera Growth:
- Total de leads: ${totalLeads}
- Convertidos: ${convertidos}
- Perdidos: ${perdidos}
- Leads quentes: ${quentes}
- Leads mornos: ${mornos}
- Qualificados (sem compra): ${qualificados}
- Checkout iniciado (sem conversão): ${checkoutIniciado}
- Taxa de conversão: ${taxaConversao}%
- Distribuição por etapa: ${JSON.stringify(stages)}

Ticket médio do produto: R$ 297
Analise e forneça previsão de faturamento + insights + ações sugeridas.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "crm_analysis",
              description: "Retorna análise do CRM com previsão e insights",
              parameters: {
                type: "object",
                properties: {
                  previsao_faturamento: { type: "string" },
                  insights: { type: "array", items: { type: "string" } },
                  acoes_sugeridas: { type: "array", items: { type: "string" } },
                  gargalo_principal: { type: "string" },
                  lead_quente_acao: { type: "string" },
                },
                required: ["previsao_faturamento", "insights", "acoes_sugeridas", "gargalo_principal", "lead_quente_acao"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "crm_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Tente novamente em alguns segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos esgotados. Adicione créditos no workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    let analysis;
    if (toolCall?.function?.arguments) {
      analysis = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback
      analysis = {
        previsao_faturamento: `R$ ${(convertidos * 297).toLocaleString("pt-BR")}`,
        insights: ["Dados insuficientes para análise detalhada."],
        acoes_sugeridas: ["Continue capturando leads para gerar insights."],
        gargalo_principal: "Poucos dados no funil",
        lead_quente_acao: "Entre em contato com leads quentes via WhatsApp",
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("crm-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
