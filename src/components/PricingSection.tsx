import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Users, Briefcase, MapPin, Gift, Clock } from "lucide-react";
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
  "1 ano de hospedagem incluso",
  "Entrega rápida",
];

const bonuses = [
  "Entrega em até 7 dias",
  "Setup prioritário",
  "Suporte inicial incluso",
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
  const orbY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section ref={sectionRef} id="planos" className="section-padding section-divider relative overflow-hidden" aria-labelledby="pricing-heading">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] -right-40 top-20 pointer-events-none" style={{ y: orbY1 }} aria-hidden="true" />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px] left-0 bottom-0 pointer-events-none" style={{ y: orbY2 }} aria-hidden="true" />

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          titleId="pricing-heading"
          label="💰 Oferta Especial"
          title={<>Site Profissional <span className="text-gradient">Completo</span></>}
          subtitle="Agora deixa eu ser direto com você: você poderia pagar facilmente R$ 2.000 ou mais. Mas hoje você não precisa."
          className="mb-10"
        />

        {/* Main offer card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl border-2 border-primary glow-box-strong bg-card p-8 md:p-12">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
              🔥 Promoção por tempo limitado
            </span>

            <div className="text-center mb-8 mt-4">
              <p className="text-muted-foreground line-through text-lg mb-1">De R$ 2.000</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-sm text-muted-foreground">Por apenas</span>
                <span className="text-6xl md:text-7xl font-bold text-gradient">R$ 1.290</span>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <Gift size={16} /> O que está incluso
              </h3>
              <ul className="space-y-3" role="list">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-secondary-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-primary" aria-hidden="true" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonuses */}
            <div className="glass rounded-xl p-4 mb-8 border border-primary/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">🎁 Bônus inclusos</h4>
              <ul className="space-y-2">
                {bonuses.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <Check size={14} className="text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <WhatsAppLink
              message={WHATSAPP_MESSAGES.planStart}
              variant="primary"
              size="lg"
              ariaLabel="Quero meu site por R$ 1.290"
              className="w-full py-4 text-lg"
            >
              Quero meu site por R$ 1.290
            </WhatsAppLink>
          </div>
        </motion.div>

        {/* Who is it for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <h3 className="text-lg font-bold mb-6">🎯 Pra quem é esse site?</h3>
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
