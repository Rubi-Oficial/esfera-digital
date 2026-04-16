import SEOHead from "@/components/SEOHead";
import ScrollToTop from "@/components/ScrollToTop";
import { openChatbot } from "@/lib/chatbot-events";

import GrowthNavbar from "@/components/growth-os/GrowthNavbar";
import GrowthHero from "@/components/growth-os/GrowthHero";
import TrustBar from "@/components/growth-os/TrustBar";
import ProblemBlock from "@/components/growth-os/ProblemBlock";
import SolutionBlock from "@/components/growth-os/SolutionBlock";
import StepsBlock from "@/components/growth-os/StepsBlock";
import DashboardBlock from "@/components/growth-os/DashboardBlock";
import FeaturesBlock from "@/components/growth-os/FeaturesBlock";
import PlansBlock from "@/components/growth-os/PlansBlock";
import AuthorityBlock from "@/components/growth-os/AuthorityBlock";
import CTAFinalBlock from "@/components/growth-os/CTAFinalBlock";
import GrowthFooter from "@/components/growth-os/GrowthFooter";
import WhatsAppFAB from "@/components/growth-os/WhatsAppFAB";
import type { Plan } from "@/components/growth-os/data";

const GrowthOS = () => {
  const handleSelectPlan = (plan: Plan) => {
    openChatbot({ initialMessage: `Quero contratar o plano ${plan.name}` });
  };

  return (
    <>
      <SEOHead
        title="Esfera Marketing — Sistema Inteligente de Vendas"
        description="Site, CRM e automação com IA integrados para captar, organizar e converter clientes de forma contínua via WhatsApp."
        path="/"
        type="website"
      />

      <div className="min-h-screen bg-background text-foreground">
        <GrowthNavbar />

        <main>
          <GrowthHero />
          <TrustBar />
          <ProblemBlock />
          <SolutionBlock />
          <StepsBlock />
          <DashboardBlock />
          <FeaturesBlock />
          <PlansBlock onSelectPlan={handleSelectPlan} />
          <AuthorityBlock />
          <CTAFinalBlock />
        </main>

        <GrowthFooter />
        <WhatsAppFAB />
        <ScrollToTop />
      </div>
    </>
  );
};

export default GrowthOS;
