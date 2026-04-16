import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import { getMyReferralCode, getMyReferrals } from "@/lib/referral";
import { WHATSAPP_PHONE } from "@/lib/constants";
import ProjetoHeader from "@/components/meu-projeto/ProjetoHeader";
import StageNotification from "@/components/meu-projeto/StageNotification";
import EmptyProjectCard from "@/components/meu-projeto/EmptyProjectCard";
import ProgressCard from "@/components/meu-projeto/ProgressCard";
import StatsGrid from "@/components/meu-projeto/StatsGrid";
import ReferralCTA from "@/components/meu-projeto/ReferralCTA";
import RecentReferrals from "@/components/meu-projeto/RecentReferrals";
import CheckoutSection from "@/components/meu-projeto/CheckoutSection";
import SubscriptionStatusCard from "@/components/meu-projeto/SubscriptionStatusCard";
import { useMyProject } from "@/components/meu-projeto/useMyProject";
import { useSubscription } from "@/hooks/useSubscription";

const MeuProjetoContent = () => {
  const {
    userName, userId, userEmail, myProject, stageNotification, setStageNotification,
    currentStageIndex, progressPercent, daysSinceStart, estimatedDaysRemaining,
  } = useMyProject();

  const { subscription, isActive: hasActiveSubscription } = useSubscription(userId);

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
        <ProjetoHeader onSupport={openWhatsApp} />

        <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-xl font-bold font-sora">Olá, {userName}! 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Acompanhe o andamento do seu projeto e suas indicações.
            </p>
          </motion.div>

          <StageNotification notification={stageNotification} onClose={() => setStageNotification(null)} />

          {!myProject ? (
            <EmptyProjectCard onSupport={openWhatsApp} />
          ) : (
            <ProgressCard
              progressPercent={progressPercent}
              currentStageIndex={currentStageIndex}
              notes={myProject.notes}
            />
          )}

          <StatsGrid
            hasProject={!!myProject}
            daysSinceStart={daysSinceStart}
            estimatedDaysRemaining={estimatedDaysRemaining}
            referralsCount={referrals.length}
            pendingCount={pendingCount}
            convertedCount={convertedCount}
            totalComissao={totalComissao}
          />

          {hasActiveSubscription && subscription ? (
            <SubscriptionStatusCard subscription={subscription} />
          ) : (
            <CheckoutSection customerEmail={userEmail} />
          )}

          <ReferralCTA refCode={refCode} />

          <RecentReferrals referrals={referrals} />

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
