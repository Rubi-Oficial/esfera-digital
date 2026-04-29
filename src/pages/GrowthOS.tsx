import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import ScrollToTop from "@/components/ScrollToTop";
import ChatBot from "@/components/ChatBot";
import { openChatbot } from "@/lib/chatbot-events";
import Navbar from "@/components/Navbar";
import GrowthHero from "@/components/growth-os/GrowthHero";
import TrustBar from "@/components/growth-os/TrustBar";
import ProblemBlock from "@/components/growth-os/ProblemBlock";
import SolutionBlock from "@/components/growth-os/SolutionBlock";
import StepsBlock from "@/components/growth-os/StepsBlock";
import DashboardBlock from "@/components/growth-os/DashboardBlock";
import FeaturesBlock from "@/components/growth-os/FeaturesBlock";
import PlansBlock from "@/components/growth-os/PlansBlock";
// AuthorityBlock removido — duplicava StatsSection (3 stats) e o disclaimer de depoimentos foi suprido pela TestimonialsSection
import CTAFinalBlock from "@/components/growth-os/CTAFinalBlock";
import GrowthFooter from "@/components/growth-os/GrowthFooter";

import InterCTA from "@/components/growth-os/InterCTA";
import ReflectionBlock from "@/components/growth-os/ReflectionBlock";
import type { Plan } from "@/components/growth-os/data";

// Seções da home antiga (lazy) — sem duplicar com blocos do Growth OS:
// Removidos: ProblemSection (≈ ProblemBlock), AIServicesSection (≈ SolutionBlock), MethodologySection (≈ FeaturesBlock)
const AboutSection = lazy(() => import("@/components/AboutSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const GrowthOS = () => {
  const handleSelectPlan = (plan: Plan) => {
    openChatbot({ initialMessage: `Quero contratar o plano ${plan.name}` });
  };

  return (
    <>
      <SEOHead
        title="Mais que sites: Site + CRM + IA que vendem no Google | Esfera Marketing"
        description="Não criamos só sites. Criamos sistemas completos de vendas: site otimizado para Google, CRM inteligente e IA no WhatsApp captando, qualificando e convertendo clientes 24h."
        path="/"
        type="website"
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="pt-16 md:pt-[72px]">
          <GrowthHero />
          <TrustBar />
          <ReflectionBlock />
          <ProblemBlock />
          <InterCTA
            text="Cansado de ver clientes irem pra concorrência?"
            primaryLabel="Quero meu sistema"
            primaryHref="#planos"
          />
          <SolutionBlock />
          <InterCTA
            text="Imagine ter um vendedor digital trabalhando 24h por você."
            primaryLabel="Ver oferta especial"
            primaryHref="#planos"
            variant="soft"
          />
          <StepsBlock />
          <DashboardBlock />
          <FeaturesBlock />

          {/* Seções da home antiga — entre Features e Planos (sem duplicatas) */}
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
            <PortfolioSection />
            <InterCTA
              text="Gostou do que viu? Seu projeto pode ser o próximo."
              primaryLabel="Quero meu site"
              primaryHref="#planos"
              variant="soft"
            />
            <StatsSection />
            <TestimonialsSection />
            <InterCTA
              text="Junte-se a +87 empresas que já estão vendendo no automático."
              primaryLabel="Garantir minha vaga"
              primaryHref="#planos"
            />
            <BlogSection />
            <FAQSection />
          </Suspense>

          <PlansBlock onSelectPlan={handleSelectPlan} />
          <CTAFinalBlock />
        </main>

        <GrowthFooter />
        <ScrollToTop />
        <ChatBot />
      </div>
    </>
  );
};

export default GrowthOS;
