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
              <Zap size={12} className="animate-pulse" /> Seu negócio está perdendo clientes
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
              Websites + I.A.{" "}
              <span className="text-gradient">que vendem por você.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed lg:mx-0 mx-auto">
              Enquanto você depende do Instagram… <strong className="text-foreground font-semibold">seus concorrentes estão aparecendo no Google</strong> e fechando vendas.
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed lg:mx-0 mx-auto">
              Nós criamos seu site completo com inteligência artificial em poucos dias — <strong className="text-foreground font-semibold">pronto para atrair clientes e vender automaticamente</strong>.
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
                className="btn-premium px-7 py-4 text-base inline-flex items-center gap-2 font-bold w-full sm:w-auto justify-center"
              >
                Comece agora <ArrowRight size={18} />
              </a>
              <a
                href="#planos-growth"
                className="border border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7 py-4 text-base inline-flex items-center gap-2 font-semibold transition-all w-full sm:w-auto justify-center"
              >
                <MessageSquare size={18} /> Ver oferta especial
              </a>
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
