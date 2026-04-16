import type { Referral, ReferralCode } from "@/lib/referral";
import WelcomeBar from "./WelcomeBar";
import ReferralLinkCard from "./ReferralLinkCard";
import MetricsGrid from "./MetricsGrid";
import FinancialPanel from "./FinancialPanel";
import RankingPanel from "./RankingPanel";
import ReferralHistory from "./ReferralHistory";
import ShareCTA from "./ShareCTA";
import { getNivel } from "./data";

interface ReferralDashboardProps {
  refCode: ReferralCode;
  refLink: string;
  referrals: Referral[];
}

const ReferralDashboard = ({ refCode, refLink, referrals }: ReferralDashboardProps) => {
  const totalComissao = referrals
    .filter((r) => r.status === "converted" || r.status === "paid")
    .reduce((sum, r) => sum + Number(r.comissao), 0);
  const pendentes = referrals.filter((r) => r.status === "pending").length;
  const vendas = refCode.total_vendas || 0;
  const nivel = getNivel(vendas);

  return (
    <div className="space-y-6">
      <WelcomeBar refCode={refCode} nivel={nivel} />
      <ReferralLinkCard refLink={refLink} />
      <MetricsGrid refCode={refCode} totalComissao={totalComissao} />
      <FinancialPanel refCode={refCode} pendentes={pendentes} />
      <RankingPanel vendas={vendas} />
      <ReferralHistory referrals={referrals} />
      <ShareCTA refLink={refLink} />
    </div>
  );
};

export default ReferralDashboard;
