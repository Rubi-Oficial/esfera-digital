import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBot from "@/components/ChatBot";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load below-the-fold sections
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const AIServicesSection = lazy(() => import("@/components/AIServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const MethodologySection = lazy(() => import("@/components/MethodologySection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[200px]" aria-hidden="true" />
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <a href="#solucoes" className="skip-link">Pular para o conteúdo principal</a>
        <Navbar />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <ProblemSection />
            <AIServicesSection />
            <AboutSection />
            <MethodologySection />
            <PortfolioSection />
            <StatsSection />
            <PricingSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <CTASection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <ScrollToTop />
        <ChatBot />
    </div>
  );
};

export default Index;
