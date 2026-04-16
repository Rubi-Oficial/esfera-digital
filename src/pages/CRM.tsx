import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, TrendingUp, DollarSign, Flame } from "lucide-react";
import { fetchLeads, fetchLeadsByStage, updateLeadStage, STAGE_CONFIG, PIPELINE_ORDER, type PipelineStage, type LeadTemperature } from "@/lib/crm";
import { fetchAllReferralCodes, fetchAllReferrals } from "@/lib/referral";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import CRMHeader from "@/components/crm/CRMHeader";
import CRMMetrics from "@/components/crm/CRMMetrics";
import CRMFilters from "@/components/crm/CRMFilters";
import CRMAIInsights from "@/components/crm/CRMAIInsights";
import CRMFollowUp from "@/components/crm/CRMFollowUp";
import CRMFunnel from "@/components/crm/CRMFunnel";
import CRMCharts from "@/components/crm/CRMCharts";
import CRMLeadsTable from "@/components/crm/CRMLeadsTable";
import CRMPipeline from "@/components/crm/CRMPipeline";
import CRMIndicacoes from "@/components/crm/CRMIndicacoes";
import CRMProjetos from "@/components/crm/CRMProjetos";
import type { CRMView, AIAnalysis } from "@/components/crm/types";

const CRMContent = () => {
  const [view, setView] = useState<CRMView>("dashboard");
  const [tempFilter, setTempFilter] = useState<LeadTemperature | "all">("all");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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
      const { data, error } = await supabase.functions.invoke("crm-ai", { body: { leads } });
      if (error) { console.error("AI analysis error:", error); toast.error("Erro ao gerar análise IA"); return null; }
      return data;
    },
    enabled: leads.length > 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const { data: refCodes = [] } = useQuery({ queryKey: ["admin-referral-codes"], queryFn: fetchAllReferralCodes, refetchInterval: 15000 });
  const { data: allReferrals = [] } = useQuery({ queryKey: ["admin-referrals"], queryFn: fetchAllReferrals, refetchInterval: 15000 });

  const { data: clientProjects = [], refetch: refetchProjects } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    refetchInterval: 15000,
  });

  const { data: registeredUsers = [] } = useQuery({
    queryKey: ["registered-users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_auth_users");
      if (error) throw error;
      return data as { id: string; email: string; created_at: string }[];
    },
    staleTime: 30000,
  });

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
  const convertidos = leads.filter((l) => l.stage === "convertido").length;
  const taxaConversao = totalLeads > 0 ? ((convertidos / totalLeads) * 100).toFixed(1) : "0";
  const quentes = leads.filter((l) => l.temperatura === "quente").length;
  const emAtendimento = leads.filter((l) => !["convertido", "perdido", "novo_lead"].includes(l.stage)).length;

  // Filtered leads
  const filteredLeads = useMemo(() => {
    let result = leads;
    if (tempFilter !== "all") result = result.filter((l) => l.temperatura === tempFilter);
    if (stageFilter !== "all") result = result.filter((l) => l.stage === stageFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((l) =>
        l.nome.toLowerCase().includes(q) || l.telefone.includes(q) || (l.tipo_negocio && l.tipo_negocio.toLowerCase().includes(q))
      );
    }
    return result;
  }, [leads, tempFilter, stageFilter, searchQuery]);

  const activeFilters = (tempFilter !== "all" ? 1 : 0) + (stageFilter !== "all" ? 1 : 0) + (searchQuery.trim() ? 1 : 0);
  const followUpLeads = filteredLeads.filter((l) => ["qualificado", "proposta_apresentada", "checkout_iniciado"].includes(l.stage));
  const indicacaoLeads = leads.filter((l) => l.origem === "indicacao");

  const clearFilters = () => { setTempFilter("all"); setStageFilter("all"); setSearchQuery(""); };

  const exportLeadsCSV = () => {
    const headers = ["Nome", "Telefone", "Temperatura", "Etapa", "Score", "Tipo Negócio", "Interesse", "Urgência", "Objetivo", "Dor Principal", "Origem", "Criado em"];
    const rows = filteredLeads.map((l) => [
      l.nome, l.telefone, l.temperatura, STAGE_CONFIG[l.stage].label, l.score,
      l.tipo_negocio || "", l.interesse || "", l.urgencia || "", l.objetivo || "",
      l.dor_principal || "", l.origem || "", format(new Date(l.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-esfera-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filteredLeads.length} leads exportados!`);
  };

  const dashboardMetrics = [
    { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-blue-400" },
    { label: "Em Atendimento", value: emAtendimento, icon: TrendingUp, color: "text-cyan-400" },
    { label: "Leads Quentes", value: quentes, icon: Flame, color: "text-red-400" },
    { label: "Taxa Conversão", value: `${taxaConversao}%`, icon: DollarSign, color: "text-emerald-400" },
  ];

  return (
    <>
      <SEOHead title="CRM Esfera Growth | Gestão de Leads" description="CRM inteligente para gestão de leads e pipeline de vendas" path="/crm" />
      <div className="min-h-screen bg-background text-foreground">
        <CRMHeader view={view} onViewChange={setView} />

        <main className="container mx-auto px-4 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : view === "dashboard" ? (
            <div className="space-y-6">
              <CRMFilters
                searchQuery={searchQuery} onSearchChange={setSearchQuery}
                tempFilter={tempFilter} onTempFilterChange={setTempFilter}
                stageFilter={stageFilter} onStageFilterChange={setStageFilter}
                showFilters={showFilters} onToggleFilters={() => setShowFilters(!showFilters)}
                activeFilters={activeFilters} filteredCount={filteredLeads.length} totalCount={leads.length}
                onClearFilters={clearFilters} onExport={exportLeadsCSV}
              />
              <CRMMetrics metrics={dashboardMetrics} />
              <CRMAIInsights aiAnalysis={aiAnalysis ?? null} aiLoading={aiLoading} onRefresh={() => refetchAI()} />
              <CRMFollowUp leads={followUpLeads} />
              <CRMFunnel grouped={grouped} />
              <CRMCharts leads={leads} grouped={grouped} />
              <CRMLeadsTable leads={filteredLeads} activeFilters={activeFilters} totalCount={leads.length} onClearFilters={clearFilters} />
            </div>
          ) : view === "pipeline" ? (
            <CRMPipeline grouped={grouped} onMoveLead={(id, from, to) => moveLeadMutation.mutate({ leadId: id, from, to })} isMoving={moveLeadMutation.isPending} />
          ) : view === "indicacoes" ? (
            <CRMIndicacoes refCodes={refCodes} allReferrals={allReferrals} indicacaoLeads={indicacaoLeads} />
          ) : view === "projetos" ? (
            <CRMProjetos clientProjects={clientProjects} registeredUsers={registeredUsers} onRefetch={() => refetchProjects()} />
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
