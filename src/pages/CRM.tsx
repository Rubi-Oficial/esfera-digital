import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, TrendingUp, DollarSign, BarChart3, ArrowRight,
  Phone, Building2, Target, Clock, ChevronDown, ChevronUp,
  Flame, Snowflake, Thermometer, Brain, MessageCircle, Zap,
  AlertTriangle, CheckCircle2, Send, Gift, Trophy, Link2,
  Filter, Download, Search, X
} from "lucide-react";
import { fetchLeads, fetchLeadsByStage, updateLeadStage, STAGE_CONFIG, PIPELINE_ORDER, TEMP_CONFIG, type PipelineStage, type LeadTemperature, type Lead } from "@/lib/crm";
import { fetchAllReferralCodes, fetchAllReferrals, type ReferralCode, type Referral } from "@/lib/referral";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Follow-up messages by stage
const FOLLOWUP_MESSAGES: Record<string, { label: string; message: string }> = {
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

const sendFollowUpWhatsApp = (phone: string, stage: string) => {
  const followUp = FOLLOWUP_MESSAGES[stage];
  if (!followUp) return;
  const cleanPhone = phone.replace(/\D/g, "");
  const fullPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
  const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(followUp.message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const TempIcon = ({ temp }: { temp: string }) => {
  if (temp === "quente") return <Flame size={14} className="text-red-400" />;
  if (temp === "morno") return <Thermometer size={14} className="text-yellow-400" />;
  return <Snowflake size={14} className="text-blue-400" />;
};

type AIAnalysis = {
  previsao_faturamento: string;
  insights: string[];
  acoes_sugeridas: string[];
  gargalo_principal: string;
  lead_quente_acao: string;
};

const CRMContent = () => {
  const [view, setView] = useState<"pipeline" | "dashboard" | "indicacoes" | "projetos">("dashboard");
  const [projectForm, setProjectForm] = useState({ client_name: "", user_id: "", current_stage: "briefing", notes: "" });
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
    refetchInterval: 10000,
  });

  const { data: grouped } = useQuery({
    queryKey: ["leads-grouped"],
    queryFn: fetchLeadsByStage,
    refetchInterval: 10000,
  });

  const { data: aiAnalysis, isLoading: aiLoading, refetch: refetchAI } = useQuery({
    queryKey: ["crm-ai", leads.length],
    queryFn: async (): Promise<AIAnalysis | null> => {
      if (leads.length === 0) return null;
      const { data, error } = await supabase.functions.invoke("crm-ai", {
        body: { leads },
      });
      if (error) {
        console.error("AI analysis error:", error);
        toast.error("Erro ao gerar análise IA");
        return null;
      }
      return data;
    },
    enabled: leads.length > 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  // Referral data
  const { data: refCodes = [] } = useQuery({
    queryKey: ["admin-referral-codes"],
    queryFn: fetchAllReferralCodes,
    refetchInterval: 15000,
  });

  const { data: allReferrals = [] } = useQuery({
    queryKey: ["admin-referrals"],
    queryFn: fetchAllReferrals,
    refetchInterval: 15000,
  });

  // Client projects
  const { data: clientProjects = [], refetch: refetchProjects } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    refetchInterval: 15000,
  });

  // Registered users for selector
  const { data: registeredUsers = [] } = useQuery({
    queryKey: ["registered-users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_auth_users");
      if (error) throw error;
      return data as { id: string; email: string; created_at: string }[];
    },
    staleTime: 30000,
  });

  const PROJECT_STAGES_OPTIONS = [
    { value: "briefing", label: "Briefing & Planejamento" },
    { value: "design", label: "Design & Protótipo" },
    { value: "development", label: "Desenvolvimento" },
    { value: "review", label: "Revisão & Ajustes" },
    { value: "launch", label: "Lançamento" },
  ];

  const handleSaveProject = async () => {
    if (!projectForm.client_name || !projectForm.user_id) {
      toast.error("Preencha nome e ID do usuário");
      return;
    }
    if (editingProject) {
      const { error } = await supabase.from("client_projects").update({
        client_name: projectForm.client_name,
        current_stage: projectForm.current_stage,
        notes: projectForm.notes || null,
      }).eq("id", editingProject);
      if (error) { toast.error("Erro ao atualizar"); return; }
      toast.success("Projeto atualizado!");
    } else {
      const { error } = await supabase.from("client_projects").insert({
        client_name: projectForm.client_name,
        user_id: projectForm.user_id,
        current_stage: projectForm.current_stage,
        notes: projectForm.notes || null,
      });
      if (error) { toast.error("Erro ao criar projeto"); return; }
      toast.success("Projeto criado!");
    }
    setProjectForm({ client_name: "", user_id: "", current_stage: "briefing", notes: "" });
    setEditingProject(null);
    refetchProjects();
  };

  const moveLeadMutation = useMutation({
    mutationFn: ({ leadId, from, to }: { leadId: string; from: PipelineStage; to: PipelineStage }) =>
      updateLeadStage(leadId, from, to),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["leads-grouped"] });
    },
  });

  // Metrics
  const totalLeads = leads.length;
  const convertidos = leads.filter(l => l.stage === "convertido").length;
  const taxaConversao = totalLeads > 0 ? ((convertidos / totalLeads) * 100).toFixed(1) : "0";
  const quentes = leads.filter(l => l.temperatura === "quente").length;
  const emAtendimento = leads.filter(l => !["convertido", "perdido", "novo_lead"].includes(l.stage)).length;

  // Leads needing follow-up
  const followUpLeads = leads.filter(l =>
    ["qualificado", "proposta_apresentada", "checkout_iniciado"].includes(l.stage)
  );

  const funnelData = PIPELINE_ORDER.filter(s => s !== "perdido").map(stage => ({
    stage,
    count: grouped?.[stage]?.length || 0,
    ...STAGE_CONFIG[stage],
  }));

  return (
    <>
      <SEOHead
        title="CRM Esfera Growth | Gestão de Leads"
        description="CRM inteligente para gestão de leads e pipeline de vendas"
        path="/crm"
      />
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 size={18} className="text-primary" />
              </div>
              <h1 className="text-lg font-bold font-sora">Esfera Growth CRM</h1>
            </div>
            <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
              {([
                { key: "dashboard", label: "Dashboard" },
                { key: "pipeline", label: "Pipeline" },
                { key: "indicacoes", label: "Indicações" },
                { key: "projetos", label: "Projetos" },
              ] as const).map(v => (
                <button
                  key={v.key}
                  onClick={() => setView(v.key)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    view === v.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : view === "dashboard" ? (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-blue-400" },
                  { label: "Em Atendimento", value: emAtendimento, icon: TrendingUp, color: "text-cyan-400" },
                  { label: "Leads Quentes", value: quentes, icon: Flame, color: "text-red-400" },
                  { label: "Taxa Conversão", value: `${taxaConversao}%`, icon: DollarSign, color: "text-emerald-400" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon size={18} className={metric.color} />
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <p className="text-2xl font-bold font-sora">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-primary/20 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Brain size={20} className="text-primary" />
                    <h2 className="text-lg font-semibold font-sora">Inteligência Artificial</h2>
                  </div>
                  <button
                    onClick={() => refetchAI()}
                    disabled={aiLoading}
                    className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                  >
                    {aiLoading ? "Analisando..." : "🔄 Atualizar"}
                  </button>
                </div>

                {aiLoading ? (
                  <div className="flex items-center gap-3 py-6">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">IA analisando seus dados...</span>
                  </div>
                ) : aiAnalysis ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={16} className="text-primary" />
                        <span className="text-sm font-medium">Previsão de Faturamento</span>
                      </div>
                      <p className="text-xl font-bold text-primary">{aiAnalysis.previsao_faturamento}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        <span className="text-sm font-medium">Gargalo Principal</span>
                      </div>
                      <p className="text-sm">{aiAnalysis.gargalo_principal}</p>
                    </div>
                    <div className="md:col-span-2 bg-muted/10 border border-border/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={16} className="text-yellow-400" />
                        <span className="text-sm font-medium">Ações Sugeridas pela IA</span>
                      </div>
                      <div className="space-y-2">
                        {aiAnalysis.acoes_sugeridas.map((acao, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{acao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {aiAnalysis.insights.length > 0 && (
                      <div className="md:col-span-2 space-y-1.5">
                        <span className="text-xs font-medium text-muted-foreground">💡 Insights</span>
                        {aiAnalysis.insights.map((insight, i) => (
                          <p key={i} className="text-xs text-muted-foreground">• {insight}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">Capture leads para ativar a análise IA.</p>
                )}
              </motion.div>

              {/* Follow-up Alerts */}
              {followUpLeads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card border border-orange-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle size={20} className="text-orange-400" />
                    <h2 className="text-lg font-semibold font-sora">Follow-up WhatsApp</h2>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                      {followUpLeads.length} pendentes
                    </span>
                  </div>
                  <div className="space-y-2">
                    {followUpLeads.slice(0, 10).map(lead => (
                      <div key={lead.id} className="flex items-center justify-between bg-muted/10 rounded-lg px-4 py-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <TempIcon temp={lead.temperatura} />
                          <span className="text-sm font-medium truncate">{lead.nome}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                            {STAGE_CONFIG[lead.stage].label}
                          </span>
                        </div>
                        <button
                          onClick={() => sendFollowUpWhatsApp(lead.telefone, lead.stage)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex-shrink-0"
                        >
                          <Send size={12} />
                          Enviar
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Funnel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border/30 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold font-sora mb-4">Funil de Vendas</h2>
                <div className="space-y-2">
                  {funnelData.map((item, i) => {
                    const maxCount = Math.max(...funnelData.map(d => d.count), 1);
                    const width = Math.max((item.count / maxCount) * 100, 8);
                    return (
                      <div key={item.stage} className="flex items-center gap-3">
                        <span className="text-xs w-24 text-muted-foreground truncate">{item.emoji} {item.label}</span>
                        <div className="flex-1 h-8 bg-muted/20 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                            className={`h-full rounded-lg flex items-center px-3 ${item.color} border`}
                          >
                            <span className="text-xs font-medium">{item.count}</span>
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Leads Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card border border-border/30 rounded-xl overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-border/30">
                  <h2 className="text-lg font-semibold font-sora">Leads Recentes</h2>
                </div>
                <div className="divide-y divide-border/20">
                  {leads.slice(0, 20).map((lead) => (
                    <div key={lead.id}>
                      <button
                        onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <TempIcon temp={lead.temperatura} />
                          <span className="font-medium truncate">{lead.nome}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                            {STAGE_CONFIG[lead.stage].emoji} {STAGE_CONFIG[lead.stage].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground hidden sm:inline">Score: {lead.score}</span>
                          {expandedLead === lead.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {expandedLead === lead.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-muted/5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone size={14} className="text-muted-foreground" />
                                <span>{lead.telefone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 size={14} className="text-muted-foreground" />
                                <span>{lead.tipo_negocio || "—"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target size={14} className="text-muted-foreground" />
                                <span>{lead.interesse || "—"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-muted-foreground" />
                                <span>{format(new Date(lead.created_at), "dd/MM HH:mm", { locale: ptBR })}</span>
                              </div>
                              {lead.objetivo && (
                                <div className="col-span-2 md:col-span-4 text-muted-foreground">🎯 {lead.objetivo}</div>
                              )}
                              {FOLLOWUP_MESSAGES[lead.stage] && (
                                <div className="col-span-2 md:col-span-4">
                                  <button
                                    onClick={() => sendFollowUpWhatsApp(lead.telefone, lead.stage)}
                                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                                  >
                                    <Send size={12} />
                                    {FOLLOWUP_MESSAGES[lead.stage].label}
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <div className="px-6 py-12 text-center text-muted-foreground">
                      <Users size={40} className="mx-auto mb-3 opacity-40" />
                      <p>Nenhum lead capturado ainda.</p>
                      <p className="text-sm mt-1">Leads do chatbot aparecerão aqui automaticamente.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ) : view === "pipeline" ? (
            /* Pipeline View */
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max">
                {PIPELINE_ORDER.map((stage) => {
                  const config = STAGE_CONFIG[stage];
                  const stageLeads: Lead[] = grouped?.[stage] || [];
                  return (
                    <div key={stage} className="w-72 flex-shrink-0">
                      <div className={`rounded-t-xl px-4 py-3 border ${config.color} flex items-center justify-between`}>
                        <span className="text-sm font-semibold">{config.emoji} {config.label}</span>
                        <span className="text-xs font-mono">{stageLeads.length}</span>
                      </div>
                      <div className="bg-card/50 border border-t-0 border-border/20 rounded-b-xl p-2 space-y-2 min-h-[200px]">
                        {stageLeads.map((lead) => {
                          const stageIndex = PIPELINE_ORDER.indexOf(stage);
                          const nextStage = stageIndex < PIPELINE_ORDER.length - 2 ? PIPELINE_ORDER[stageIndex + 1] : null;
                          return (
                            <motion.div
                              key={lead.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-background border border-border/30 rounded-lg p-3 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm truncate">{lead.nome}</span>
                                <TempIcon temp={lead.temperatura} />
                              </div>
                              <div className="text-xs text-muted-foreground space-y-0.5">
                                <p>📱 {lead.telefone}</p>
                                {lead.tipo_negocio && <p>🏢 {lead.tipo_negocio}</p>}
                                <p>⭐ Score: {lead.score}</p>
                              </div>
                              {FOLLOWUP_MESSAGES[stage] && (
                                <button
                                  onClick={() => sendFollowUpWhatsApp(lead.telefone, stage)}
                                  className="w-full text-xs px-2 py-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors flex items-center justify-center gap-1"
                                >
                                  <Send size={10} /> Follow-up WhatsApp
                                </button>
                              )}
                              {nextStage && stage !== "convertido" && (
                                <button
                                  onClick={() => moveLeadMutation.mutate({ leadId: lead.id, from: stage, to: nextStage })}
                                  disabled={moveLeadMutation.isPending}
                                  className="w-full text-xs px-2 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                                >
                                  Mover para {STAGE_CONFIG[nextStage].label}
                                  <ArrowRight size={12} />
                                </button>
                              )}
                              {stage !== "perdido" && stage !== "convertido" && (
                                <button
                                  onClick={() => moveLeadMutation.mutate({ leadId: lead.id, from: stage, to: "perdido" })}
                                  disabled={moveLeadMutation.isPending}
                                  className="w-full text-xs px-2 py-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                  Marcar como perdido
                                </button>
                              )}
                            </motion.div>
                          );
                        })}
                        {stageLeads.length === 0 && (
                          <div className="py-8 text-center text-xs text-muted-foreground opacity-50">Nenhum lead</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : view === "indicacoes" ? (
            /* Indicações View */
            <div className="space-y-6">
              {/* Referral metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Parceiros", value: refCodes.length, icon: Users, color: "text-blue-400" },
                  { label: "Total Indicações", value: allReferrals.length, icon: Gift, color: "text-cyan-400" },
                  { label: "Vendas via Indicação", value: allReferrals.filter(r => r.status === "converted" || r.status === "paid").length, icon: TrendingUp, color: "text-green-400" },
                  { label: "Comissões Pagas", value: `R$${refCodes.reduce((s, c) => s + Number(c.saldo_pago), 0).toFixed(0)}`, icon: DollarSign, color: "text-primary" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon size={18} className={metric.color} />
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <p className="text-2xl font-bold font-sora">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Top Referrers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border/30 rounded-xl overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-400" />
                  <h2 className="text-lg font-semibold font-sora">Ranking de Parceiros</h2>
                </div>
                <div className="divide-y divide-border/20">
                  {refCodes.length === 0 ? (
                    <div className="px-6 py-10 text-center text-muted-foreground">
                      <Gift size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Nenhum parceiro cadastrado ainda.</p>
                    </div>
                  ) : (
                    refCodes.map((rc, i) => (
                      <div key={rc.id} className="px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}.</span>
                          <div>
                            <p className="text-sm font-medium">{rc.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {rc.total_clicks} cliques · {rc.total_leads} leads · {rc.total_vendas} vendas
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-primary">R${Number(rc.saldo_disponivel).toFixed(0)}</p>
                            <p className="text-xs text-muted-foreground">disponível</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted/20">
                            <Link2 size={10} />
                            <span>{rc.code}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Recent referrals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border/30 rounded-xl overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-border/30">
                  <h2 className="text-lg font-semibold font-sora">Indicações Recentes</h2>
                </div>
                <div className="divide-y divide-border/20">
                  {allReferrals.length === 0 ? (
                    <div className="px-6 py-10 text-center text-muted-foreground">
                      <Users size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Nenhuma indicação recebida ainda.</p>
                    </div>
                  ) : (
                    allReferrals.slice(0, 20).map((ref) => {
                      const statusConfig: Record<string, { label: string; color: string }> = {
                        pending: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
                        converted: { label: "Convertido", color: "bg-green-500/20 text-green-400 border-green-500/30" },
                        paid: { label: "Pago", color: "bg-primary/20 text-primary border-primary/30" },
                        expired: { label: "Expirado", color: "bg-red-500/20 text-red-400 border-red-500/30" },
                      };
                      const sc = statusConfig[ref.status] || statusConfig.pending;
                      return (
                        <div key={ref.id} className="px-6 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                              {ref.lead_telefone && ` · ${ref.lead_telefone}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">R${Number(ref.comissao).toFixed(0)}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>

              {/* Leads via indicação */}
              {(() => {
                const indicacaoLeads = leads.filter(l => l.origem === "indicacao");
                if (indicacaoLeads.length === 0) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-card border border-primary/20 rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Gift size={18} className="text-primary" />
                      <h2 className="text-sm font-semibold">Leads via Indicação no CRM</h2>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{indicacaoLeads.length}</span>
                    </div>
                    <div className="space-y-2">
                      {indicacaoLeads.slice(0, 10).map(lead => (
                        <div key={lead.id} className="flex items-center justify-between bg-muted/10 rounded-lg px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <TempIcon temp={lead.temperatura} />
                            <span className="text-sm font-medium">{lead.nome}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                              {STAGE_CONFIG[lead.stage].label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{lead.telefone}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          ) : view === "projetos" ? (
            <div className="space-y-6">
              {/* Add/Edit Form */}
              <div className="bg-card border border-border/30 rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-semibold">{editingProject ? "Editar Projeto" : "Novo Projeto"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    placeholder="Nome do cliente"
                    value={projectForm.client_name}
                    onChange={e => setProjectForm(p => ({ ...p, client_name: e.target.value }))}
                    className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <select
                    value={projectForm.user_id}
                    onChange={e => setProjectForm(p => ({ ...p, user_id: e.target.value }))}
                    disabled={!!editingProject}
                    className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
                  >
                    <option value="">Selecione o cliente</option>
                    {registeredUsers.map(u => (
                      <option key={u.id} value={u.id}>{u.email}</option>
                    ))}
                  </select>
                  <select
                    value={projectForm.current_stage}
                    onChange={e => setProjectForm(p => ({ ...p, current_stage: e.target.value }))}
                    className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    {PROJECT_STAGES_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <input
                    placeholder="Notas (opcional)"
                    value={projectForm.notes}
                    onChange={e => setProjectForm(p => ({ ...p, notes: e.target.value }))}
                    className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProject}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {editingProject ? "Salvar" : "Criar Projeto"}
                  </button>
                  {editingProject && (
                    <button
                      onClick={() => { setEditingProject(null); setProjectForm({ client_name: "", user_id: "", current_stage: "briefing", notes: "" }); }}
                      className="px-5 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>

              {/* Projects List */}
              <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border/30">
                  <h2 className="text-sm font-semibold">Projetos ({clientProjects.length})</h2>
                </div>
                <div className="divide-y divide-border/20">
                  {clientProjects.length === 0 ? (
                    <div className="px-5 py-10 text-center text-muted-foreground text-sm">Nenhum projeto cadastrado.</div>
                  ) : clientProjects.map(p => (
                    <div key={p.id} className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{p.client_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {registeredUsers.find(u => u.id === p.user_id)?.email || p.user_id}
                          {' · '}{PROJECT_STAGES_OPTIONS.find(s => s.value === p.current_stage)?.label || p.current_stage}
                          {p.notes && ` · ${p.notes}`}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingProject(p.id);
                          setProjectForm({ client_name: p.client_name, user_id: p.user_id, current_stage: p.current_stage, notes: p.notes || "" });
                        }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};

const CRM = () => (
  <AuthGuard>
    <CRMContent />
  </AuthGuard>
);

export default CRM;
