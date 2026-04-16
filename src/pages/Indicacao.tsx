import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import AuthGuard from "@/components/AuthGuard";
import { getMyReferralCode, getMyReferrals, getSiteUrl } from "@/lib/referral";

import IndicacaoHeader from "@/components/indicacao/IndicacaoHeader";
import Onboarding from "@/components/indicacao/Onboarding";
import ReferralDashboard from "@/components/indicacao/ReferralDashboard";

const IndicacaoContent = () => {
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
        <IndicacaoHeader />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          {!refCode ? (
            <Onboarding onCreated={() => refetch()} />
          ) : (
            <ReferralDashboard refCode={refCode} refLink={refLink} referrals={referrals} />
          )}
        </main>
      </div>
    </>
  );
};

const Indicacao = () => (
  <AuthGuard requireAdmin={false}>
    <IndicacaoContent />
  </AuthGuard>
);

export default Indicacao;
