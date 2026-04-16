import { supabase } from "@/integrations/supabase/client";

export type ReferralCode = {
  id: string;
  user_id: string;
  code: string;
  nome: string;
  telefone: string | null;
  total_clicks: number;
  total_leads: number;
  total_vendas: number;
  comissao_por_venda: number;
  saldo_disponivel: number;
  saldo_pago: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

export type Referral = {
  id: string;
  referral_code_id: string;
  lead_id: string | null;
  lead_nome: string | null;
  lead_telefone: string | null;
  status: "pending" | "converted" | "paid" | "expired";
  comissao: number;
  data_conversao: string | null;
  data_pagamento: string | null;
  expires_at: string;
  created_at: string;
};

// Generate a unique referral code from a name
export function generateRefCode(nome: string): string {
  const clean = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${clean}${rand}`;
}

// Get or create referral code for current user
export async function getMyReferralCode(): Promise<ReferralCode | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("referral_codes")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return data as ReferralCode | null;
}

export async function createReferralCode(nome: string, telefone?: string): Promise<ReferralCode> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const code = generateRefCode(nome);
  const { data, error } = await supabase
    .from("referral_codes")
    .insert({
      user_id: user.id,
      code,
      nome,
      telefone: telefone || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ReferralCode;
}

export async function getMyReferrals(codeId: string): Promise<Referral[]> {
  const { data, error } = await supabase.rpc("get_my_referrals", { _code_id: codeId });

  if (error) throw error;
  return (data || []).map((r: Omit<Referral, "lead_telefone">) => ({ ...r, lead_telefone: null })) as Referral[];
}

// Look up a referral code by code string (for landing page) — uses secure RPC
export async function lookupRefCode(code: string): Promise<ReferralCode | null> {
  const { data, error } = await supabase.rpc("lookup_referral_code", { _code: code });
  if (error || !data || data.length === 0) return null;
  // Return partial data — only id, code, comissao_por_venda
  return {
    id: data[0].id,
    code: data[0].code,
    comissao_por_venda: Number(data[0].comissao_por_venda),
  } as ReferralCode;
}

// Record a click
export async function recordRefClick(codeId: string) {
  await supabase.from("referral_clicks").insert({
    referral_code_id: codeId,
  });
}

// Create a referral entry when a lead comes in via ref code
export async function createReferral(codeId: string, leadId: string, leadNome: string, leadTelefone: string, comissao: number = 100) {
  const { error } = await supabase.from("referrals").insert({
    referral_code_id: codeId,
    lead_id: leadId,
    lead_nome: leadNome,
    lead_telefone: leadTelefone,
    comissao,
  });
  if (error) throw error;
}

// Get site base URL
export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://esfera-digital.lovable.app";
}

// Admin: fetch all referral codes
export async function fetchAllReferralCodes(): Promise<ReferralCode[]> {
  const { data, error } = await supabase
    .from("referral_codes")
    .select("*")
    .order("total_vendas", { ascending: false });

  if (error) throw error;
  return (data || []) as ReferralCode[];
}

// Admin: fetch all referrals
export async function fetchAllReferrals(): Promise<Referral[]> {
  const { data, error } = await supabase
    .from("referrals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as Referral[];
}
