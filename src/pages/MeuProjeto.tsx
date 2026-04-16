import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, CheckCircle2, Clock, Users, DollarSign,
  ArrowRight, Gift, TrendingUp, BarChart3, PartyPopper,
  Calendar, MessageSquare, Zap, Shield, Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import AnimatedLogo from "@/components/AnimatedLogo";
import { getMyReferralCode, getMyReferrals } from "@/lib/referral";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WHATSAPP_PHONE } from "@/lib/constants";

const PROJECT_STAGES = [
  { key: "briefing", label: "Briefing & Planejamento", icon: BarChart3, description: "Entendimento do negócio, objetivos e estratégia", duration: "~3 dias" },
  { key: "design", label: "Design & Protótipo", icon: Rocket, description: "Criação do layout, identidade visual e protótipo navegável", duration: "~5 dias" },
  { key: "development", label: "Desenvolvimento", icon: Zap, description: "Programação, integrações e funcionalidades", duration: "~10 dias" },
  { key: "review", label: "Revisão & Ajustes", icon: Eye, description: "Testes, feedback e refinamentos finais", duration: "~3 dias" },
  { key: "launch", label: "Lançamento", icon: TrendingUp, description: "Deploy, configurações finais e go-live!", duration: "~2 dias" },
];

const MeuProjetoContent = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [stageNotification, setStageNotification] = useState<{ from: string; to: string } | null>(null);
  const hasShownToast = useRef(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name
        || data.user?.user_metadata?.name
        || data.user?.email?.split("@")[0]
        || "Cliente";
      setUserName(name);
    });
  }, []);

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
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (!myProject) return;
    const storageKey = `project_stage_${myProject.id}`;
    const lastSeen = localStorage.getItem(storageKey);
    if (lastSeen && lastSeen !== myProject.current_stage && !hasShownToast.current) {
      const fromLabel = PROJECT_STAGES.find(s => s.key === lastSeen)?.label || lastSeen;
      const toLabel = PROJECT_STAGES.find(s => s.key === myProject.current_stage)?.label || myProject.current_stage;
      setStageNotification({ from: fromLabel, to: toLabel });
      hasShownToast.current = true;
      toast.success("Seu projeto avançou! 🎉", {
        description: `De "${fromLabel}" para "${toLabel}"`,
        duration: 8000,
      });
    }
    localStorage.setItem(storageKey, myProject.current_stage);
  }, [myProject?.current_stage, myProject?.id]);

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

  const convertedCount = referrals.filter(r => r.status === "converted" || r.status === "paid").length;
  const pendingCount = referrals.filter(r => r.status === "pending").length;

  // Days since project started
  const daysSinceStart = myProject
    ? Math.floor((Date.now() - new Date(myProject.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Estimated total days & remaining
  const totalEstimatedDays = 23; // sum of all stage durations
  const estimatedDaysRemaining = myProject
    ? Math.max(0, Math.round(totalEstimatedDays * (1 - progressPercent / 100)))
    : 0;

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Olá! Tenho uma dúvida sobre meu projeto. 😊");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SEOHead
        title="Meu Projeto | Esfera Growth"
        description="Acompanhe o progresso do seu projeto e indicações."
        path="/meu-projeto"
      />
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <AnimatedLogo size="sm" />
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={openWhatsApp}
                className="text-xs px-3 py-1.5 rounded-full bg-muted/30 text-muted-foreground border border-border/30 font-medium hover:text-foreground transition-colors flex items-center gap-1"
              >
                <MessageSquare size={14} /> Suporte
              </button>
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

          {/* Stage change notification banner */}
          <AnimatePresence>
            {stageNotification && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-start gap-3"
              >
                <PartyPopper size={20} className="text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">Seu projeto avançou! 🎉</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    De <span className="font-medium text-foreground">{stageNotification.from}</span> para{" "}
                    <span className="font-medium text-primary">{stageNotification.to}</span>
                  </p>
                </div>
                <button
                  onClick={() => setStageNotification(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!myProject ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-card border border-border/30 rounded-xl p-8 text-center">
              <Clock size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
              <h2 className="text-sm font-semibold mb-1">Projeto ainda não configurado</h2>
              <p className="text-xs text-muted-foreground mb-4">Seu projeto será exibido aqui assim que o administrador configurar seu acesso.</p>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                <MessageSquare size={14} /> Falar com suporte
              </button>
            </motion.div>
          ) : (
            <>
              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border/30 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Rocket size={18} className="text-primary" />
                    <h2 className="text-sm font-semibold">Progresso do Projeto</h2>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {Math.round(progressPercent)}%
                  </span>
                </div>

                {/* Progress bar with gradient */}
                <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden mb-2 mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)))",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-5">
                  <span>Início</span>
                  <span>Conclusão</span>
                </div>

                {myProject.notes && (
                  <div className="mb-5 bg-primary/5 border border-primary/10 rounded-lg px-4 py-3 flex items-start gap-2">
                    <MessageSquare size={14} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{myProject.notes}</p>
                  </div>
                )}

                {/* Timeline */}
                <div className="relative">
                  {PROJECT_STAGES.map((stage, i) => {
                    const isDone = i < currentStageIndex;
                    const isCurrent = i === currentStageIndex;
                    const isLast = i === PROJECT_STAGES.length - 1;
                    return (
                      <div key={stage.key} className="relative flex gap-4">
                        {/* Vertical line connector */}
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isDone
                                ? "bg-primary/20 border-2 border-primary"
                                : isCurrent
                                ? "bg-primary/10 border-2 border-primary animate-pulse"
                                : "bg-muted/20 border border-border/50"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 size={16} className="text-primary" />
                            ) : (
                              <stage.icon size={14} className={isCurrent ? "text-primary" : "text-muted-foreground/40"} />
                            )}
                          </motion.div>
                          {!isLast && (
                            <div className={`w-0.5 flex-1 min-h-[24px] ${
                              isDone ? "bg-primary/40" : "bg-border/30"
                            }`} />
                          )}
                        </div>

                        {/* Content */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`pb-5 flex-1 ${!isCurrent && !isDone ? "opacity-40" : ""}`}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-medium ${isCurrent ? "text-foreground" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                              {stage.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold">
                                Em andamento
                              </span>
                            )}
                            {isDone && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                Concluído ✓
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
                          <span className="text-[10px] text-muted-foreground/60 mt-1 inline-flex items-center gap-1">
                            <Clock size={10} /> {stage.duration}
                          </span>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { label: "Dias de Projeto", value: myProject ? daysSinceStart : "—", icon: Calendar, color: "text-blue-400", sub: myProject ? `~${estimatedDaysRemaining}d restantes` : undefined },
              { label: "Indicações", value: referrals.length, icon: Users, color: "text-cyan-400", sub: pendingCount > 0 ? `${pendingCount} pendentes` : undefined },
              { label: "Convertidas", value: convertedCount, icon: CheckCircle2, color: "text-emerald-400", sub: referrals.length > 0 ? `${referrals.length > 0 ? Math.round((convertedCount / referrals.length) * 100) : 0}% taxa` : undefined },
              { label: "Comissão", value: `R$${totalComissao.toFixed(0)}`, icon: DollarSign, color: "text-primary", sub: convertedCount > 0 ? `R$${(totalComissao / convertedCount).toFixed(0)}/venda` : undefined },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="bg-card border border-border/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <metric.icon size={14} className={metric.color} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                </div>
                <p className="text-xl font-bold font-sora">{metric.value}</p>
                {metric.sub && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{metric.sub}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Referral CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Gift size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1">Indique e Ganhe R$100 por Venda</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Compartilhe seu link exclusivo de indicação e receba comissão para cada pessoa que se tornar cliente.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate("/indicacao")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                  >
                    Acessar Indicações <ArrowRight size={12} />
                  </button>
                  {refCode && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/indicacao?ref=${refCode.code}`);
                        toast.success("Link copiado!");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/30 text-muted-foreground text-xs font-medium hover:text-foreground transition-colors border border-border/30"
                    >
                      📋 Copiar Link
                    </button>
                  )}
                </div>
              </div>
            </div>
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
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        ref.status === "paid" ? "bg-primary" : ref.status === "converted" ? "bg-emerald-400" : "bg-yellow-400"
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        ref.status === "paid"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : ref.status === "converted"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {ref.status === "paid" ? "Pago" : ref.status === "converted" ? "Convertido" : "Pendente"}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">R${Number(ref.comissao).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-4"
          >
            <p className="text-xs text-muted-foreground">
              Dúvidas sobre seu projeto?{" "}
              <button onClick={openWhatsApp} className="text-primary hover:underline">
                Fale conosco pelo WhatsApp
              </button>
            </p>
          </motion.div>
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