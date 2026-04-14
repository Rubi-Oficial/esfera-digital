import { motion } from "framer-motion";
import { Check, Star, Zap, ArrowRight } from "lucide-react";

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
    href: "https://wa.me/5548991061707?text=Olá, quero garantir o Plano Start",
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
    href: "https://wa.me/5548991061707?text=Olá, quero o Plano Premium",
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
    href: "https://wa.me/5548991061707?text=Olá, quero o Plano Scale",
    highlight: false,
    icon: Star,
    badge: "Vagas Limitadas",
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24">
      <div className="container px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            Últimas vagas para desenvolvimento este mês
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Escolha seu <span className="text-gradient">plano</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Trabalhamos com número limitado de projetos simultâneos para garantir excelência estratégica.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto mb-16">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>3 de 5 preenchidas</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-3/5 rounded-full bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "border-2 border-primary glow-box bg-card"
                  : "glass"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                  {plan.priceNote && <span className="text-sm text-muted-foreground">{plan.priceNote}</span>}
                </div>
              </div>

              <p className="font-semibold text-sm mb-2">{plan.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all group ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
