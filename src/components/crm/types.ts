import type { Lead, PipelineStage, LeadTemperature } from "@/lib/crm";

export type AIAnalysis = {
  previsao_faturamento: string;
  insights: string[];
  acoes_sugeridas: string[];
  gargalo_principal: string;
  lead_quente_acao: string;
};

export type CRMView = "pipeline" | "dashboard" | "indicacoes" | "projetos" | "roles";

export const FOLLOWUP_MESSAGES: Record<string, { label: string; message: string }> = {
  qualificado: {
    label: "Follow-up: Qualificado",
    message: "Olá! Vi que você demonstrou interesse no Esfera Growth. Posso te ajudar a entender como funciona no seu caso? 🚀",
  },
  proposta_apresentada: {
    label: "Follow-up: Proposta",
    message: "Olá! Quer que eu libere sua vaga agora? Temos condições especiais para quem começar esta semana! ⚡",
  },
  checkout_iniciado: {
    label: "Follow-up: Checkout",
    message: "Olá! Vi que você quase ativou o Esfera Growth… Posso te ajudar com alguma dúvida? 😊",
  },
};

export const PROJECT_STAGES_OPTIONS = [
  { value: "briefing", label: "Briefing & Planejamento" },
  { value: "design", label: "Design & Protótipo" },
  { value: "development", label: "Desenvolvimento" },
  { value: "review", label: "Revisão & Ajustes" },
  { value: "launch", label: "Lançamento" },
];

export function sendFollowUpWhatsApp(phone: string, stage: string) {
  const followUp = FOLLOWUP_MESSAGES[stage];
  if (!followUp) return;
  const cleanPhone = phone.replace(/\D/g, "");
  const fullPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
  const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(followUp.message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
