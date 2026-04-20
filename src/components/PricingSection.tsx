import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, FileText, Layers, Crown, Briefcase, Users, Zap, MapPin } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { openChatbot } from "@/lib/chatbot-events";

const plans = [
  {
    id: "site_basico",
    name: "Site Básico",
    subtitle: "Presença digital essencial",
    pages: "1 página estratégica",
    icon: FileText,
    featured: false,
    badge: null,
    included: [
      "Site profissional de 1 página (One Page)",
      "Design moderno e personalizado",
      "Otimização para aparecer no Google",
      "Integração com WhatsApp",
      "CRM básico para gestão de contatos",
      "IA de atendimento inicial",
      "Certificado SSL e hospedagem inclusos",
    ],
    cta: "Quero o Básico",
  },
  {
    id: "site_intermediario",
    name: "Site Intermediário",
    subtitle: "Para negócios em crescimento",
    pages: "Até 10 páginas",
    icon: Layers,
    featured: true,
    badge: "Mais procurado",
    included: [
      "Site profissional com até 10 páginas",
      "Design personalizado por seção",
      "SEO otimizado para Google",
      "Sistema comercial CRM completo",
      "IA de atendimento 24/7",
      "Captura e qualificação de leads",
      "Integração WhatsApp + automações",
      "Painel de gestão de clientes",
    ],
    cta: "Quero o Intermediário",
  },
  {
    id: "site_avancado",
    name: "Site Avançado",
    subtitle: "Autoridade e escala no Google",
    pages: "Até 50 páginas + blog",
    icon: Crown,
    featured: false,
    badge: null,
    included: [
      "Site profissional com até 50 páginas",
      "Blog otimizado para conteúdo e SEO",
      "SEO avançado (rankeamento Google)",
      "CRM comercial completo + pipeline",
      "IA de atendimento personalizada",
      "Automações de marketing e vendas",
      "Relatórios e análises avançadas",
      "Estratégia editorial e de conteúdo",
    ],
    cta: "Quero o Avançado",
  },
];

const idealFor = [
  { icon: Briefcase, label: "Pequenos empresários" },
  { icon: Users, label: "Autônomos" },
  { icon: Zap, label: "Prestadores de serviço" },
  { icon: MapPin, label: "Negócios locais" },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);
  const orbScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 0.85]);
  const orbScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <section ref={sectionRef} id="planos" className="section-padding section-divider relative overflow-hidden" aria-labelledby="pricing-heading">
      <motion.div className="absolute w-[600px] h-[600px] rounded-full bg-primary/6 blur-[140px] -right-40 top-20 pointer-events-none" style={{ y: orbY1, opacity: orbOpacity, scale: orbScale1 }} aria-hidden="true" />
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-primary/4 blur-[100px] left-0 bottom-0 pointer-events-none" style={{ y: orbY2, opacity: orbOpacity, scale: orbScale2 }} aria-hidden="true" />

      <div className="container px-4 sm:px-6 md:px-8 relative z-10">
        <SectionHeader
          titleId="pricing-heading"
          label="Módulos"
          title={<>Sites que aparecem no Google <span className="text-gradient">com CRM e IA</span></>}
          subtitle="Escolha o módulo ideal para o tamanho do seu negócio. Todos vêm com sistema comercial CRM e IA de atendimento integrados."
          className="mb-8 md:mb-10"
        />

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <div className={`relative rounded-3xl ${plan.featured ? "border-2 border-primary glow-box-strong" : "border border-border/50"} bg-card p-5 md:p-6 h-full flex flex-col`}>
                  {plan.badge && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}

                  <div className={`text-center mb-5 ${plan.badge ? "mt-2" : ""}`}>
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold font-sora mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{plan.subtitle}</p>
                    <div className="inline-block glass rounded-lg py-1.5 px-3 border border-primary/20">
                      <span className="text-xs font-semibold text-primary">{plan.pages}</span>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <ul className="space-y-2" role="list">
                      {plan.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                          <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-primary" aria-hidden="true" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openChatbot({ initialMessage: `Tenho interesse no módulo ${plan.name}` })}
                    className={`w-full py-3 text-sm inline-flex items-center justify-center rounded-xl font-medium transition-all ${plan.featured ? "btn-premium" : "bg-primary text-primary-foreground hover:opacity-90"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Who is it for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <h3 className="text-lg font-bold mb-6">Para quem são esses módulos?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {idealFor.map((item, i) => (
              <div key={i} className="glass-hover rounded-xl p-4 text-center">
                <item.icon size={20} className="text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-medium text-secondary-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Profissionais e empresas que querem ser <strong className="text-foreground">encontrados no Google</strong> e atender clientes de forma automática.
          </p>
        </motion.div>

        {/* Captação */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-lg mx-auto mt-10"
        >
          <div className="glass rounded-xl p-5 border border-primary/20 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">Atendimento personalizado</p>
            <p className="text-xs text-muted-foreground">
              Cada projeto é único. Fale com nosso especialista para receber uma proposta sob medida para o seu negócio.
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default PricingSection;
