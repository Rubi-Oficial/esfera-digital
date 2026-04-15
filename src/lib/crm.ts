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
  const { data: lead, error } = await supabase
    .from("leads")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return lead;
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
