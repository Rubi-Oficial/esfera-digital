import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type PipelineStage = Database["public"]["Enums"]["pipeline_stage"];
export type LeadTemperature = Database["public"]["Enums"]["lead_temperature"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

export const STAGE_CONFIG: Record<PipelineStage, { label: string; emoji: string; color: string }> = {
  novo_lead: { label: "Novo Lead", emoji: "🆕", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  engajado: { label: "Engajado", emoji: "💬", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  qualificado: { label: "Qualificado", emoji: "✅", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  proposta_apresentada: { label: "Proposta", emoji: "📋", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  checkout_iniciado: { label: "Checkout", emoji: "🛒", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  convertido: { label: "Convertido", emoji: "🎉", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  perdido: { label: "Perdido", emoji: "❌", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export const PIPELINE_ORDER: PipelineStage[] = [
  "novo_lead", "engajado", "qualificado", "proposta_apresentada",
  "checkout_iniciado", "convertido", "perdido",
];

export const TEMP_CONFIG: Record<LeadTemperature, { label: string; emoji: string; color: string }> = {
  frio: { label: "Frio", emoji: "🧊", color: "text-blue-400" },
  morno: { label: "Morno", emoji: "🌡️", color: "text-yellow-400" },
  quente: { label: "Quente", emoji: "🔥", color: "text-red-400" },
};

// Score increments per action
const SCORE_MAP: Record<string, number> = {
  respondeu_perguntas: 10,
  demonstrou_interesse: 20,
  clicou_pagamento: 30,
  viu_oferta: 15,
};

export async function createLead(data: LeadInsert) {
  const { data: leadId, error } = await supabase.rpc("create_chatbot_lead", {
    _nome: data.nome,
    _telefone: data.telefone,
    _origem: data.origem || "chatbot",
    _interesse: data.interesse || null,
    _tipo_negocio: data.tipo_negocio || null,
    _urgencia: data.urgencia || null,
    _objetivo: data.objetivo || null,
    _dor_principal: data.dor_principal || null,
  });
  if (error) throw error;
  return { id: leadId as string, ...data } as Lead;
}

export async function updateLeadStage(leadId: string, fromStage: PipelineStage, toStage: PipelineStage) {
  const scoreIncrement = toStage === "engajado" ? SCORE_MAP.respondeu_perguntas
    : toStage === "qualificado" ? SCORE_MAP.demonstrou_interesse
    : toStage === "proposta_apresentada" ? SCORE_MAP.viu_oferta
    : toStage === "checkout_iniciado" ? SCORE_MAP.clicou_pagamento
    : 0;

  // Get current score
  const { data: currentLead } = await supabase
    .from("leads")
    .select("score")
    .eq("id", leadId)
    .single();

  const newScore = (currentLead?.score || 0) + scoreIncrement;

  const { error } = await supabase
    .from("leads")
    .update({ stage: toStage, score: newScore, ultima_interacao: new Date().toISOString() })
    .eq("id", leadId);
  if (error) throw error;

  // Log event
  await supabase.from("lead_events").insert({
    lead_id: leadId,
    event_type: "stage_change",
    from_stage: fromStage,
    to_stage: toStage,
  });
}

export async function fetchLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export type SubscriptionInfo = {
  user_id: string;
  status: string;
  product_id: string | null;
  stripe_price_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

export const SUBSCRIPTION_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Ativa", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  trialing: { label: "Trial", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  past_due: { label: "Atrasada", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  canceled: { label: "Cancelada", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  unpaid: { label: "Não paga", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  incomplete: { label: "Incompleta", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  incomplete_expired: { label: "Expirada", color: "bg-muted text-muted-foreground border-border", },
  paused: { label: "Pausada", color: "bg-muted text-muted-foreground border-border" },
};

export async function fetchSubscriptionsForUsers(userIds: string[]): Promise<Record<string, SubscriptionInfo>> {
  if (userIds.length === 0) return {};
  const { data, error } = await supabase.rpc("admin_get_subscriptions_for_users", { _user_ids: userIds });
  if (error) { console.error("fetchSubscriptionsForUsers", error); return {}; }
  const map: Record<string, SubscriptionInfo> = {};
  (data || []).forEach((s: SubscriptionInfo) => { map[s.user_id] = s; });
  return map;
}

export async function linkLeadToUser(leadId: string, userId: string) {
  const { error } = await supabase.rpc("admin_link_lead_to_user", { _lead_id: leadId, _user_id: userId });
  if (error) throw error;
}

export async function fetchLeadsByStage() {
  const leads = await fetchLeads();
  const grouped: Record<PipelineStage, Lead[]> = {
    novo_lead: [], engajado: [], qualificado: [], proposta_apresentada: [],
    checkout_iniciado: [], convertido: [], perdido: [],
  };
  leads.forEach((lead) => {
    grouped[lead.stage].push(lead);
  });
  return grouped;
}
