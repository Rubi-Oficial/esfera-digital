import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-workspace.jpg";

const benefits = [
  "Presença digital estruturada desde o início",
  "Sites pensados para conversão",
  "Integração com WhatsApp e captação de leads",
  "SEO estratégico para ser encontrado no Google",
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const dot1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const dot2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const dot3Y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Apresentação da Esfera">
      {/* Hero background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />
        <motion.img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
          style={{ scale: imgScale }}
          width={1920}
          height={1080}
        />
      </motion.div>

      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ y: dot1Y }} aria-hidden="true" />
      <motion.div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-primary/60 animate-float" style={{ y: dot2Y }} aria-hidden="true" />
      <motion.div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-primary/40 animate-pulse-glow" style={{ y: dot3Y }} aria-hidden="true" />

      <motion.div className="container relative z-10 px-4 md:px-8 py-20" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
            Atendimento Consultivo e Projetos Personalizados
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Mais do que uma agência digital:{" "}
            <span className="text-gradient">uma estrutura estratégica</span>{" "}
            que cresce e vende junto com você.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Desenvolvemos sites profissionais e soluções digitais integradas para empresas que desejam posicionamento sólido, autoridade e geração contínua de clientes.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12" aria-label="Benefícios">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-primary" aria-hidden="true" />
                </div>
                {b}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://wa.me/5548991061707?text=Olá, quero estruturar minha presença digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:brightness-110 transition-all glow-box group"
              aria-label="Falar via WhatsApp para estruturar sua presença digital"
            >
              Quero estruturar minha presença digital
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
