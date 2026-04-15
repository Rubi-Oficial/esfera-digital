import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, TrendingUp, DollarSign, BarChart3, ArrowRight, 
  Phone, Building2, Target, Clock, ChevronDown, ChevronUp,
  Flame, Snowflake, Thermometer, GripVertical
} from "lucide-react";
import { fetchLeads, fetchLeadsByStage, updateLeadStage, STAGE_CONFIG, PIPELINE_ORDER, TEMP_CONFIG, type PipelineStage, type Lead } from "@/lib/crm";
import SEOHead from "@/components/SEOHead";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CRM = () => {
  const [view, setView] = useState<"pipeline" | "dashboard">("dashboard");
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

  // Funnel data
  const funnelData = PIPELINE_ORDER.filter(s => s !== "perdido").map(stage => ({
    stage,
    count: grouped?.[stage]?.length || 0,
    ...STAGE_CONFIG[stage],
  }));

  const TempIcon = ({ temp }: { temp: string }) => {
    if (temp === "quente") return <Flame size={14} className="text-red-400" />;
    if (temp === "morno") return <Thermometer size={14} className="text-yellow-400" />;
    return <Snowflake size={14} className="text-blue-400" />;
  };

  return (
    <>
      <SEOHead
        title="CRM Esfera Growth | Gestão de Leads"
        description="CRM inteligente para gestão de leads e pipeline de vendas"
        path="/crm"
      />
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 size={18} className="text-primary" />
              </div>
              <h1 className="text-lg font-bold font-sora">Esfera Growth CRM</h1>
            </div>
            <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
              <button
                onClick={() => setView("dashboard")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === "dashboard" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setView("pipeline")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === "pipeline" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pipeline
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : view === "dashboard" ? (
            <DashboardView
              totalLeads={totalLeads}
              convertidos={convertidos}
              taxaConversao={taxaConversao}
              quentes={quentes}
              emAtendimento={emAtendimento}
              funnelData={funnelData}
              leads={leads}
              expandedLead={expandedLead}
              setExpandedLead={setExpandedLead}
              TempIcon={TempIcon}
            />
          ) : (
            <PipelineView
              grouped={grouped}
              moveLeadMutation={moveLeadMutation}
              TempIcon={TempIcon}
            />
          )}
        </main>
      </div>
    </>
  );
};

// Dashboard View
const DashboardView = ({
  totalLeads, convertidos, taxaConversao, quentes, emAtendimento,
  funnelData, leads, expandedLead, setExpandedLead, TempIcon,
}: any) => (
  <div className="space-y-6">
    {/* Metrics Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-blue-400" },
        { label: "Em Atendimento", value: emAtendimento, icon: TrendingUp, color: "text-cyan-400" },
        { label: "Leads Quentes", value: quentes, icon: Flame, color: "text-red-400" },
        { label: "Taxa Conversão", value: `${taxaConversao}%`, icon: DollarSign, color: "text-green-400" },
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

    {/* Funnel Visualization */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card border border-border/30 rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold font-sora mb-4">Funil de Vendas</h2>
      <div className="space-y-2">
        {funnelData.map((item: any, i: number) => {
          const maxCount = Math.max(...funnelData.map((d: any) => d.count), 1);
          const width = Math.max((item.count / maxCount) * 100, 8);
          return (
            <div key={item.stage} className="flex items-center gap-3">
              <span className="text-xs w-24 text-muted-foreground truncate">{item.emoji} {item.label}</span>
              <div className="flex-1 h-8 bg-muted/20 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
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

    {/* Recent Leads Table */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border/30">
        <h2 className="text-lg font-semibold font-sora">Leads Recentes</h2>
      </div>
      <div className="divide-y divide-border/20">
        {leads.slice(0, 20).map((lead: Lead) => (
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
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  Score: {lead.score}
                </span>
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
                      <div className="col-span-2 md:col-span-4 text-muted-foreground">
                        🎯 {lead.objetivo}
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
);

// Pipeline View (Kanban-style)
const PipelineView = ({ grouped, moveLeadMutation, TempIcon }: any) => (
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
              {stageLeads.map((lead: Lead) => {
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
                <div className="py-8 text-center text-xs text-muted-foreground opacity-50">
                  Nenhum lead
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CRM;
