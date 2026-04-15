import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Link2, Copy, Share2, Users, DollarSign, TrendingUp,
  MousePointerClick, Check, Trophy, Gift, ArrowRight, Rocket
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import {
  getMyReferralCode, createReferralCode, getMyReferrals,
  getSiteUrl, type ReferralCode, type Referral
} from "@/lib/referral";
import { WHATSAPP_PHONE } from "@/lib/constants";
import AnimatedLogo from "@/components/AnimatedLogo";

const SHARE_MESSAGE = (link: string) =>
  `Estou usando um sistema que está trazendo clientes automaticamente pro meu negócio. Se quiser ver como funciona: ${link}`;

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string; color: string }> = {
    pending: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    converted: { label: "Convertido", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    paid: { label: "Pago", color: "bg-primary/20 text-primary border-primary/30" },
    expired: { label: "Expirado", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const c = config[status] || config.pending;
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${c.color}`}>{c.label}</span>;
};

const IndicacaoContent = () => {
  const [creating, setCreating] = useState(false);
  const [nome, setNome] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: refCode, isLoading, refetch } = useQuery({
    queryKey: ["my-referral-code"],
    queryFn: getMyReferralCode,
  });

  const { data: referrals = [] } = useQuery({
    queryKey: ["my-referrals", refCode?.id],
    queryFn: () => getMyReferrals(refCode!.id),
    enabled: !!refCode?.id,
    refetchInterval: 15000,
  });

  const refLink = refCode ? `${getSiteUrl()}/?ref=${refCode.code}` : "";

  const handleCreate = async () => {
    if (!nome.trim()) {
      toast.error("Digite seu nome");
      return;
    }
    setCreating(true);
    try {
      await createReferralCode(nome.trim());
      await refetch();
      toast.success("Link de indicação criado! 🎉");
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar código");
    }
    setCreating(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const msg = SHARE_MESSAGE(refLink);
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  // Metrics
  const totalComissao = referrals
    .filter((r) => r.status === "converted" || r.status === "paid")
    .reduce((sum, r) => sum + Number(r.comissao), 0);
  const totalPago = referrals
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + Number(r.comissao), 0);
  const pendentes = referrals.filter((r) => r.status === "pending").length;
  const convertidos = referrals.filter((r) => r.status === "converted" || r.status === "paid").length;

  // Gamification
  const vendas = refCode?.total_vendas || 0;
  const nivel = vendas >= 10 ? "🏆 Embaixador" : vendas >= 5 ? "⭐ Parceiro" : vendas >= 3 ? "🔥 Indicador" : "🌱 Iniciante";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Programa de Parcerias Growth OS | Indique e Ganhe"
        description="Ganhe R$100 por cada indicação que virar venda. Acompanhe tudo pelo dashboard."
        path="/indicacao"
      />
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center">
                <AnimatedLogo size="sm" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                💰 Parcerias Growth OS
              </span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-4xl">
          {!refCode ? (
            /* Onboarding — Create referral code */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mt-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Gift size={32} className="text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-sora mb-3">
                  Programa de Parcerias <span className="text-primary">Growth OS</span>
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
                  Indique um amigo e ganhe <strong className="text-primary">R$100</strong> por cada venda realizada.
                  Sem limite de ganhos. Nós fazemos todo o processo.
                </p>
              </div>

              <div className="bg-card border border-border/30 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Ativar meu link de indicação</h2>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  maxLength={100}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating ? "Criando..." : "Criar meu link de indicação"}
                  <Rocket size={16} />
                </button>
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-semibold text-center">Como funciona</h3>
                {[
                  { num: "1", text: "Você recebe um link exclusivo" },
                  { num: "2", text: "Compartilhe com amigos e contatos" },
                  { num: "3", text: "Quando alguém comprar, você ganha R$100" },
                  { num: "4", text: "Acompanhe tudo aqui no dashboard" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card/50 border border-border/20 rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{s.num}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{s.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Dashboard */
            <div className="space-y-6">
              {/* Welcome */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h1 className="text-xl font-bold font-sora">Olá, {refCode.nome}! 👋</h1>
                    <p className="text-sm text-muted-foreground">Nível: {nivel}</p>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    R${refCode.comissao_por_venda.toFixed(0)} por venda
                  </span>
                </div>
              </motion.div>

              {/* Referral Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-primary/20 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Link2 size={18} className="text-primary" />
                  <h2 className="text-sm font-semibold">Seu link de indicação</h2>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <div className="flex-1 bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm text-muted-foreground truncate">
                    {refLink}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                    <button
                      onClick={shareWhatsApp}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors text-sm font-medium"
                    >
                      <Share2 size={16} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Cliques", value: refCode.total_clicks, icon: MousePointerClick, color: "text-blue-400" },
                  { label: "Leads Gerados", value: refCode.total_leads, icon: Users, color: "text-cyan-400" },
                  { label: "Vendas", value: refCode.total_vendas, icon: TrendingUp, color: "text-green-400" },
                  { label: "Comissão Total", value: `R$${totalComissao.toFixed(0)}`, icon: DollarSign, color: "text-primary" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
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

              {/* Financial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border/30 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={18} className="text-primary" />
                  <h2 className="text-sm font-semibold">Financeiro</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Saldo Disponível</p>
                    <p className="text-xl font-bold text-primary">R${refCode.saldo_disponivel.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Pago</p>
                    <p className="text-xl font-bold text-green-400">R${refCode.saldo_pago.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pendente</p>
                    <p className="text-xl font-bold text-yellow-400">{pendentes}</p>
                  </div>
                </div>
              </motion.div>

              {/* Gamification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-card border border-border/30 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-yellow-400" />
                  <h2 className="text-sm font-semibold">Ranking & Recompensas</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { vendas: 3, label: "3 vendas → Bônus especial", achieved: vendas >= 3 },
                    { vendas: 5, label: "5 vendas → Upgrade de comissão", achieved: vendas >= 5 },
                    { vendas: 10, label: "10 vendas → Comissão premium + título Embaixador", achieved: vendas >= 10 },
                  ].map((tier, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                      tier.achieved
                        ? "bg-primary/10 border-primary/30"
                        : "bg-muted/10 border-border/20"
                    }`}>
                      {tier.achieved ? (
                        <Check size={16} className="text-primary shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" />
                      )}
                      <span className={`text-sm ${tier.achieved ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {tier.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Referral history */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card border border-border/30 rounded-xl overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-border/30">
                  <h2 className="text-sm font-semibold">Histórico de Indicações</h2>
                </div>
                <div className="divide-y divide-border/20">
                  {referrals.length === 0 ? (
                    <div className="px-5 py-10 text-center text-muted-foreground">
                      <Users size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">Nenhuma indicação ainda.</p>
                      <p className="text-xs mt-1">Compartilhe seu link e comece a ganhar!</p>
                    </div>
                  ) : (
                    referrals.map((ref) => (
                      <div key={ref.id} className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary">R${Number(ref.comissao).toFixed(0)}</span>
                          <StatusBadge status={ref.status} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Share CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center"
              >
                <p className="text-sm font-semibold mb-2">
                  💡 Ganhe dinheiro indicando o mesmo sistema que está trazendo clientes para você.
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Já pensou em pagar seu próprio plano só com indicações?
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Copy size={14} /> Copiar Link
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <Share2 size={14} /> Compartilhar WhatsApp
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const Indicacao = () => (
  <AuthGuard>
    <IndicacaoContent />
  </AuthGuard>
);

export default Indicacao;
