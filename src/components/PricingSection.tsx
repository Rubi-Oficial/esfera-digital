import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { staggerContainer, fadeInScale } from "@/lib/animations";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const plans = [
  {
    name: "Entrada Estratégica",
    price: "R$ 2.000",
    subtitle: "Sua Presença Digital Profissional em Tempo Recorde",
    description: "Ideal para empresas que precisam sair do amadorismo e ter uma presença estratégica, moderna e otimizada para conversão.",
    features: [
      "Site One Page estratégico",
      "Design profissional personalizado",
      "Estrutura persuasiva básica",
      "Integração direta com WhatsApp",
      "SEO essencial",
      "Versão mobile otimizada",
      "Entrega rápida",
    ],
    cta: "Quero Garantir Minha Vaga",
    message: WHATSAPP_MESSAGES.planStart,
    highlight: false,
    icon: Zap,
  },
  {
    name: "Mais Escolhido",
    price: "R$ 5.000",
    priceNote: "Até 5 páginas",
    subtitle: "Posicionamento Premium + Estrutura Para Escalar",
    description: "Para empresas que querem autoridade, geração de leads e estrutura preparada para tráfego pago.",
    features: [
      "Até 5 páginas estratégicas",
      "Copywriting persuasivo completo",
      "Design premium exclusivo",
      "Estrutura SEO avançada",
      "Integração WhatsApp e formulários inteligentes",
      "Estrutura pronta para anúncios",
      "Performance otimizada",
      "Entrega prioritária",
    ],
    cta: "Quero Escalar Meu Negócio",
    message: WHATSAPP_MESSAGES.planPremium,
    highlight: true,
    icon: Star,
    badge: "Recomendado",
  },
  {
    name: "Projetos Limitados",
    price: "Sob Consulta",
    subtitle: "Estrutura Completa com IA e Automação",
    description: "Para empresas que desejam dominar o digital com automação, funis estratégicos e inteligência artificial integrada.",
    features: [
      "Estrutura personalizada avançada",
      "Integração com IA (chatbot + automações)",
      "Integração com CRM",
      "Estrutura de funil digital",
      "Estratégia completa de crescimento",
      "Planejamento técnico e estratégico",
    ],
    cta: "Falar com Especialista",
    message: WHATSAPP_MESSAGES.planScale,
    highlight: false,
    icon: Star,
    badge: "Vagas Limitadas",
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={sectionRef} id="planos" className="section-padding section-divider relative overflow-hidden" aria-labelledby="pricing-heading">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] -right-40 top-20 pointer-events-none" style={{ y: orbY1 }} aria-hidden="true" />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px] left-0 bottom-0 pointer-events-none" style={{ y: orbY2 }} aria-hidden="true" />
      <motion.div className="absolute w-2 h-2 rounded-full bg-primary/50 animate-pulse-glow left-16 top-40 pointer-events-none" style={{ y: dotY }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          titleId="pricing-heading"
          title={<>Escolha seu <span className="text-gradient">plano</span></>}
          subtitle="Trabalhamos com número limitado de projetos simultâneos para garantir excelência estratégica."
          className="mb-6"
        />

        {/* Urgency badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
            Últimas vagas para desenvolvimento este mês
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto mb-16">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>3 de 5 preenchidas</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.15, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInScale}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "border-2 border-primary glow-box-strong bg-card lg:scale-105 lg:-my-2"
                  : "glass-hover"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  {plan.priceNote && <span className="text-sm text-muted-foreground">{plan.priceNote}</span>}
                </div>
              </div>

              <p className="font-semibold text-sm mb-2">{plan.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1" role="list">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-secondary-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-primary" aria-hidden="true" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <WhatsAppLink
                message={plan.message}
                variant={plan.highlight ? "primary" : "outline"}
                size="md"
                ariaLabel={`${plan.cta} - Plano ${plan.name}`}
                className="w-full py-3.5"
              >
                {plan.cta}
              </WhatsAppLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
