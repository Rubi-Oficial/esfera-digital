import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Users, Briefcase, MapPin, Gift, Clock, Rocket, BookOpen, UserCheck, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const useCountdown = () => {
  const getTarget = () => {
    const stored = localStorage.getItem("promo_end");
    if (stored) return new Date(stored).getTime();
    const end = new Date();
    end.setHours(end.getHours() + 48);
    localStorage.setItem("promo_end", end.toISOString());
    return end.getTime();
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = getTarget() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = getTarget() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { hours, minutes, seconds, expired: timeLeft <= 0 };
};

const included = [
  "Site profissional (One Page estratégico)",
  "Design moderno e personalizado",
  "Copy pronta para vender",
  "Integração com WhatsApp",
  "SEO básico (para aparecer no Google)",
  "Certificado SSL grátis",
  "1 ano de hospedagem incluso",
  "Entrega rápida",
];

const bonuses = [
  "Entrega em até 7 dias",
  "Setup prioritário",
  "Suporte inicial incluso",
];

const growthIncluded = [
  "Tudo do plano Site Profissional",
  "Base de Conhecimento Interna exclusiva",
  "Consultoria individual com especialista",
  "Estratégia de captação de clientes",
  "Programa de Parcerias (Indique e Ganhe)",
  "Dashboard de indicações e comissões",
  "Suporte prioritário por 3 meses",
  "Relatórios de performance mensais",
];

const growthBonuses = [
  "1 sessão de consultoria grátis",
  "Acesso vitalício à base de conhecimento",
  "Grupo exclusivo de membros Growth",
  "Acesso ao grupo VIP no Telegram",
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

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          titleId="pricing-heading"
          label="💰 Oferta Especial"
          title={<>Escolha o plano <span className="text-gradient">ideal para você</span></>}
          subtitle="Do site profissional ao ecossistema completo de crescimento. Escolha o que faz mais sentido pro seu negócio."
          className="mb-10"
        />

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Plan 1 - Site Profissional */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-3xl border border-border/50 bg-card p-6 md:p-8 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-sora mb-1">Site Profissional</h3>
                <p className="text-xs text-muted-foreground mb-4">Ideal para começar</p>
                <p className="text-muted-foreground line-through text-sm mb-1">De R$ 1.500</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">R$ 997</span>
                </div>
              </div>

              <div className="mb-6 flex-1">
                <ul className="space-y-2.5" role="list">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-secondary-foreground">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-primary" aria-hidden="true" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bonuses */}
              <div className="glass rounded-xl p-3 mb-6 border border-border/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">🎁 Bônus</h4>
                <ul className="space-y-1.5">
                  {bonuses.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-secondary-foreground">
                      <Check size={12} className="text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <WhatsAppLink
                message={WHATSAPP_MESSAGES.planStart}
                variant="primary"
                size="lg"
                ariaLabel="Quero meu site por R$ 997"
                className="w-full py-3 text-base"
              >
                Quero meu site
              </WhatsAppLink>
            </div>
          </motion.div>

          {/* Plan 2 - Esfera Growth */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative rounded-3xl border-2 border-primary glow-box-strong bg-card p-6 md:p-8 h-full flex flex-col">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg whitespace-nowrap">
                🚀 Mais vendido
              </span>

              <div className="text-center mb-6 mt-2">
                <h3 className="text-lg font-bold font-sora mb-1 flex items-center justify-center gap-2">
                  <Rocket size={20} className="text-primary" />
                  Esfera Growth
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Ecossistema completo de crescimento</p>
                <p className="text-muted-foreground line-through text-sm mb-1">De R$ 3.000</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-gradient">R$ 1.997</span>
                </div>
              </div>

              {/* Countdown Timer */}
              {!expired && (
                <div className="mb-6">
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
                        <span className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-lg font-bold text-primary tabular-nums">
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

              <div className="mb-6 flex-1">
                <ul className="space-y-2.5" role="list">
                  {growthIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-secondary-foreground">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-primary" aria-hidden="true" />
                      </div>
                      {i === 0 ? <strong className="text-primary">{item}</strong> : item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth highlights */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass rounded-lg p-2 text-center border border-primary/10">
                  <BookOpen size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground leading-tight">Base de Conhecimento</p>
                </div>
                <div className="glass rounded-lg p-2 text-center border border-primary/10">
                  <UserCheck size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground leading-tight">Consultoria Individual</p>
                </div>
                <div className="glass rounded-lg p-2 text-center border border-primary/10">
                  <BarChart3 size={16} className="text-primary mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground leading-tight">Dashboard Growth</p>
                </div>
              </div>

              {/* Bonuses */}
              <div className="glass rounded-xl p-3 mb-6 border border-primary/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">🎁 Bônus exclusivos</h4>
                <ul className="space-y-1.5">
                  {growthBonuses.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-secondary-foreground">
                      <Check size={12} className="text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <WhatsAppLink
                message="Olá! Tenho interesse no plano Esfera Growth com base de conhecimento e consultoria individual. Quero saber mais!"
                variant="primary"
                size="lg"
                ariaLabel="Quero o Esfera Growth por R$ 1.997"
                className="w-full py-3 text-base mb-3"
              >
                Quero o Esfera Growth 🚀
              </WhatsAppLink>

              <Link
                to="/growth-os"
                className="text-xs text-center text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                Saiba mais sobre o Growth OS →
              </Link>
            </div>
          </motion.div>
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
