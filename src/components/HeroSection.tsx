import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Presença digital estruturada desde o início",
  "Sites pensados para conversão",
  "Integração com WhatsApp e captação de leads",
  "SEO estratégico para ser encontrado no Google",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Apresentação da Esfera">
      {/* Background effects */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
      <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-primary/60 animate-float" aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8 py-20">
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

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Desenvolvemos sites profissionais e soluções digitais integradas para empresas que desejam posicionamento sólido, autoridade e geração contínua de clientes.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10" aria-label="Benefícios">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check size={16} className="text-primary shrink-0" aria-hidden="true" />
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
      </div>
    </section>
  );
};

export default HeroSection;
