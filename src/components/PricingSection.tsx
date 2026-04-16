import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Users, Briefcase, MapPin, Clock, Rocket, BookOpen, UserCheck, BarChart3, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./ui/SectionHeader";
import { useCountdown } from "@/hooks/useCountdown";

const plans = [
  {
    id: "site_profissional",
    name: "Site Profissional",
    subtitle: "Ideal para começar",
    implantacao: 997,
    implantacaoOriginal: 1500,
    mensal: 97,
    featured: false,
    badge: null,
    icon: null,
    included: [
      "Site profissional (One Page estratégico)",
      "Design moderno e personalizado",
      "Copy pronta para vender",
      "Integração com WhatsApp",
      "SEO básico (para aparecer no Google)",
      "Certificado SSL grátis",
      "1 ano de hospedagem incluso",
      "Entrega rápida",
    ],
    bonuses: [
      "Entrega em até 7 dias",
      "Setup prioritário",
      "Suporte inicial incluso",
    ],
    highlights: null,
    cta: "Quero meu site",
    priceIds: "site_profissional_implantacao,site_profissional_mensal",
  },
  {
    id: "esfera_growth",
    name: "Esfera Growth",
    subtitle: "Ecossistema completo de crescimento",
    implantacao: 1997,
    implantacaoOriginal: 3000,
    mensal: 297,
    featured: true,
    badge: "🚀 Mais vendido",
    icon: Rocket,
    included: [
      "Tudo do plano Site Profissional",
      "Base de Conhecimento Interna exclusiva",
      "Consultoria individual com especialista",
      "Estratégia de captação de clientes",
      "Programa de Parcerias (Indique e Ganhe)",
      "Dashboard de indicações e comissões",
      "Suporte prioritário por 3 meses",
      "Relatórios de performance mensais",
    ],
    bonuses: [
      "1 sessão de consultoria grátis",
      "Acesso vitalício à base de conhecimento",
      "Grupo exclusivo de membros Growth",
      "Acesso ao grupo VIP no Telegram",
    ],
    highlights: [
      { icon: BookOpen, label: "Base de Conhecimento" },
      { icon: UserCheck, label: "Consultoria Individual" },
      { icon: BarChart3, label: "Dashboard Growth" },
    ],
    cta: "Quero o Esfera Growth 🚀",
    priceIds: "esfera_growth_implantacao,esfera_growth_mensal",
    growthLink: true,
  },
  {
    id: "esfera_scale",
    name: "Esfera Scale",
    subtitle: "Máxima performance e escala",
    implantacao: 3997,
    implantacaoOriginal: 5000,
    mensal: 597,
    featured: false,
    badge: "👑 Premium",
    icon: Crown,
    included: [
      "Tudo do Esfera Growth",
      "Automação de marketing completa",
      "Funil de vendas personalizado",
      "Landing pages ilimitadas",
      "Integração com CRM avançado",
      "Gestão de tráfego pago assistida",
      "Suporte dedicado por 6 meses",
      "Relatórios avançados semanais",
    ],
    bonuses: [
      "2 sessões de consultoria grátis",
      "Setup completo de automações",
      "Acesso a todos os grupos exclusivos",
      "Mentoria 1:1 mensal",
    ],
    highlights: [
      { icon: Rocket, label: "Automação Completa" },
      { icon: UserCheck, label: "Mentoria 1:1" },
      { icon: BarChart3, label: "Relatórios Avançados" },
    ],
    cta: "Quero o Esfera Scale 👑",
    priceIds: "esfera_scale_implantacao,esfera_scale_mensal",
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
  const { hours, minutes, seconds, expired } = useCountdown();
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
          label="💰 Oferta Especial"
          title={<>Escolha o plano <span className="text-gradient">ideal para você</span></>}
          subtitle="Do site profissional ao ecossistema completo de crescimento. Escolha o que faz mais sentido pro seu negócio."
          className="mb-8 md:mb-10"
        />

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-4 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
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
                  <h3 className="text-lg font-bold font-sora mb-1 flex items-center justify-center gap-2">
                    {plan.icon && <plan.icon size={20} className="text-primary" />}
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.subtitle}</p>
                  
                  {/* Implementation fee */}
                  <p className="text-muted-foreground line-through text-sm mb-1">
                    De R$ {plan.implantacaoOriginal.toLocaleString("pt-BR")}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl md:text-4xl font-bold ${plan.featured ? "text-gradient" : "text-foreground"}`}>
                      R$ {plan.implantacao.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">implantação</p>
                  
                  {/* Monthly fee */}
                  <div className="mt-3 glass rounded-lg py-2 px-3 inline-block border border-primary/20">
                    <span className="text-sm font-semibold text-primary">+ R$ {plan.mensal}/mês</span>
                  </div>
                </div>

                {/* Countdown on featured */}
                {plan.featured && !expired && (
                  <div className="mb-5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock size={12} className="text-destructive animate-pulse" />
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-destructive">
                        Oferta expira em
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[
                        { value: hours, label: "Hrs" },
                        { value: minutes, label: "Min" },
                        { value: seconds, label: "Seg" },
                      ].map((unit, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-base font-bold text-primary tabular-nums">
                            {String(unit.value).padStart(2, "0")}
                          </span>
                          <span className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                            {unit.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-5 flex-1">
                  <ul className="space-y-2" role="list">
                    {plan.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} className="text-primary" aria-hidden="true" />
                        </div>
                        {i === 0 && plan.featured ? <strong className="text-primary">{item}</strong> : item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                {plan.highlights && (
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {plan.highlights.map((h, i) => (
                      <div key={i} className="glass rounded-lg p-2 text-center border border-primary/10">
                        <h.icon size={14} className="text-primary mx-auto mb-1" />
                        <p className="text-[9px] text-muted-foreground leading-tight">{h.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bonuses */}
                <div className={`glass rounded-xl p-3 mb-5 border ${plan.featured ? "border-primary/20" : "border-border/30"}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${plan.featured ? "text-primary" : "text-muted-foreground"}`}>🎁 {plan.featured ? "Bônus exclusivos" : "Bônus"}</h4>
                  <ul className="space-y-1.5">
                    {plan.bonuses.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-secondary-foreground">
                        <Check size={12} className="text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/checkout?prices=${plan.priceIds}&plan=${encodeURIComponent(plan.name)}`}
                  className="w-full py-3 text-sm inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  {plan.cta}
                </Link>

                {plan.growthLink && (
                  <Link
                    to="/growth-os"
                    className="text-xs text-center text-primary hover:text-primary/80 transition-colors underline underline-offset-2 mt-3"
                  >
                    Saiba mais sobre o Growth OS →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Who is it for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <h3 className="text-lg font-bold mb-6">🎯 Pra quem são esses planos?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {idealFor.map((item, i) => (
              <div key={i} className="glass-hover rounded-xl p-4 text-center">
                <item.icon size={20} className="text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-medium text-secondary-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            👉 Que querem mais clientes <strong className="text-foreground">sem depender de redes sociais</strong>
          </p>
        </motion.div>

        {/* Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-lg mx-auto mt-10"
        >
          <div className="glass rounded-xl p-5 border border-destructive/20 text-center">
            <p className="text-sm font-semibold text-destructive mb-1">⚠️ Vagas limitadas</p>
            <p className="text-xs text-muted-foreground">
              Trabalhamos com número limitado de projetos por mês. Quando fechar, só no próximo ciclo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
