import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Rocket, CheckCircle2, Clock, Users, DollarSign,
  ArrowRight, Gift, TrendingUp, BarChart3, Link2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import AnimatedLogo from "@/components/AnimatedLogo";
import { getMyReferralCode, getMyReferrals, type ReferralCode, type Referral } from "@/lib/referral";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const PROJECT_STAGES = [
  { key: "briefing", label: "Briefing & Planejamento", icon: BarChart3 },
  { key: "design", label: "Design & Protótipo", icon: Rocket },
  { key: "development", label: "Desenvolvimento", icon: Clock },
  { key: "review", label: "Revisão & Ajustes", icon: CheckCircle2 },
  { key: "launch", label: "Lançamento", icon: TrendingUp },
];

const MeuProjetoContent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name
        || data.user?.user_metadata?.name
        || data.user?.email?.split("@")[0]
        || "Cliente";
      setUserName(name);
    });
  }, []);

  // Fetch client's project from DB
  const { data: myProject } = useQuery({
    queryKey: ["my-project"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("client_projects")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
  });

  const currentStageIndex = myProject
    ? PROJECT_STAGES.findIndex(s => s.key === myProject.current_stage)
    : -1;
  const progressPercent = currentStageIndex >= 0
    ? ((currentStageIndex + 1) / PROJECT_STAGES.length) * 100
    : 0;

  const { data: refCode } = useQuery({
    queryKey: ["my-referral-code"],
    queryFn: getMyReferralCode,
  });

  const { data: referrals = [] } = useQuery({
    queryKey: ["my-referrals", refCode?.id],
    queryFn: () => getMyReferrals(refCode!.id),
    enabled: !!refCode?.id,
  });

  const totalComissao = referrals
    .filter((r) => r.status === "converted" || r.status === "paid")
    .reduce((sum, r) => sum + Number(r.comissao), 0);

  return (
    <>
      <SEOHead
        title="Meu Projeto | Esfera Growth"
        description="Acompanhe o progresso do seu projeto e indicações."
        path="/meu-projeto"
      />
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <AnimatedLogo size="sm" />
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/indicacao")}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors flex items-center gap-1"
              >
                <Gift size={14} /> Indicações
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-xl font-bold font-sora">
              Olá, {userName}! 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Acompanhe o andamento do seu projeto e suas indicações.
            </p>
          </motion.div>

          {!myProject ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-8 text-center">
              <Clock size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
              <h2 className="text-sm font-semibold mb-1">Projeto ainda não configurado</h2>
              <p className="text-xs text-muted-foreground">Seu projeto será exibido aqui assim que o administrador configurar seu acesso.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Rocket size={18} className="text-primary" />
                <h2 className="text-sm font-semibold">Progresso do Projeto</h2>
                <span className="ml-auto text-xs text-muted-foreground">
                  {Math.round(progressPercent)}% concluído
                </span>
              </div>

              <Progress value={progressPercent} className="h-2 mb-5" />

              {myProject.notes && (
                <p className="text-xs text-muted-foreground mb-4 bg-muted/20 rounded-lg px-3 py-2">
                  📝 {myProject.notes}
                </p>
              )}

              <div className="space-y-2">
                {PROJECT_STAGES.map((stage, i) => {
                  const isDone = i < currentStageIndex;
                  const isCurrent = i === currentStageIndex;
                  return (
                    <div
                      key={stage.key}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                        isCurrent
                          ? "bg-primary/10 border-primary/30"
                          : isDone
                          ? "bg-muted/10 border-border/20"
                          : "bg-background border-border/10 opacity-50"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-primary bg-primary/20 shrink-0 animate-pulse" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border border-muted-foreground/30 shrink-0" />
                      )}
                      <stage.icon size={16} className={isCurrent ? "text-primary" : "text-muted-foreground"} />
                      <span className={`text-sm ${isCurrent ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                        {stage.label}
                      </span>
                      {isCurrent && (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                          Em andamento
                        </span>
                      )}
                      {isDone && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              { label: "Etapa Atual", value: myProject ? (PROJECT_STAGES[currentStageIndex]?.label || "—") : "—", icon: Clock, color: "text-blue-400" },
              { label: "Indicações", value: referrals.length, icon: Users, color: "text-cyan-400" },
              { label: "Comissão Acumulada", value: `R$${totalComissao.toFixed(0)}`, icon: DollarSign, color: "text-primary" },
            ].map((metric) => (
              <div key={metric.label} className="bg-card border border-border/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon size={16} className={metric.color} />
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
                <p className="text-lg font-bold font-sora">{metric.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Referral CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center"
          >
            <Gift size={28} className="text-primary mx-auto mb-3" />
            <h3 className="text-sm font-semibold mb-1">Indique e Ganhe R$100</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Compartilhe seu link e ganhe comissão por cada indicação que virar cliente.
            </p>
            <button
              onClick={() => navigate("/indicacao")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Acessar Indicações <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Recent Referrals */}
          {referrals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border/30 rounded-xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Últimas Indicações</h2>
                <button
                  onClick={() => navigate("/indicacao")}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Ver todas <ArrowRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-border/20">
                {referrals.slice(0, 5).map((ref) => (
                  <div key={ref.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      ref.status === "paid"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : ref.status === "converted"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }`}>
                      {ref.status === "paid" ? "Pago" : ref.status === "converted" ? "Convertido" : "Pendente"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

const MeuProjeto = () => (
  <AuthGuard requireAdmin={false}>
    <MeuProjetoContent />
  </AuthGuard>
);

export default MeuProjeto;
