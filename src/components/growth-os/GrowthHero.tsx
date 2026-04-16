import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageSquare, Zap } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { whatsappUrl } from "@/lib/constants";
import { WA_GROWTH, WA_GENERIC } from "./data";
import dashboardImg from "@/assets/growth-os-dashboard.webp";

const GrowthHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
      <NetworkBackground />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px]" aria-hidden="true" />

      <motion.div className="container relative z-10 px-4 md:px-8 py-20" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase"
            >
              <Zap size={12} className="animate-pulse" /> Site + CRM + IA em um só sistema
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
              Sistema integrado de vendas que{" "}
              <span className="text-gradient">trabalha por você 24h.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed lg:mx-0 mx-auto">
              Capte, organize e converta clientes de forma contínua com{" "}
              <strong className="text-foreground font-semibold">automação inteligente via WhatsApp</strong>.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
            >
              <a
                href={whatsappUrl(WA_GROWTH)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fale conosco no WhatsApp e comece agora"
                className="btn-premium px-7 py-4 text-base inline-flex items-center gap-2 font-bold w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Comece agora <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#planos-growth"
                aria-label="Ver oferta especial e planos disponíveis"
                className="border border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7 py-4 text-base inline-flex items-center gap-2 font-semibold transition-all w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MessageSquare size={18} aria-hidden="true" /> Ver oferta especial
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
              role="list"
              aria-label="Resultados em destaque"
            >
              {[
                { value: "+87", label: "empresas" },
                { value: "89%", label: "satisfação" },
                { value: "3x", label: "mais leads" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  role="listitem"
                  className="text-center lg:text-left border-l-2 border-primary/30 pl-3"
                >
                  <div className="text-xl md:text-2xl font-bold text-gradient leading-none">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-[60px] scale-90" aria-hidden="true" />
            <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
              <img
                src={dashboardImg}
                alt="Dashboard Esfera Growth - CRM, WhatsApp e métricas"
                className="w-full h-auto object-cover"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default GrowthHero;
