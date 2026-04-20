import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, slideUp } from "@/lib/animations";

const steps = [
  { num: "01", title: "Briefing comercial e SEO", desc: "Mapeamos seu negócio, palavras-chave estratégicas e jornada do cliente para que o site nasça pronto para ranquear no Google." },
  { num: "02", title: "Site + conteúdo otimizado para SEO", desc: "Desenvolvemos design, copy persuasiva e estrutura técnica (Core Web Vitals, schema, sitemap) para aparecer nas primeiras posições." },
  { num: "03", title: "I.A. de atendimento + CRM integrado", desc: "Conectamos o chatbot inteligente que qualifica leads 24/7 e envia cada contato direto para o seu CRM comercial organizado por temperatura." },
  { num: "04", title: "Lançamento, indexação e monitoramento", desc: "Publicamos, indexamos no Google Search Console e entregamos um dashboard com tráfego, leads e conversões em tempo real." },
];

const MethodologySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);

  return (
    <section ref={sectionRef} id="metodologia" className="section-padding section-divider relative overflow-hidden" aria-labelledby="methodology-heading">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] -left-20 bottom-0 pointer-events-none" style={{ y: orbY, opacity: orbOpacity }} aria-hidden="true" />

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Como Funciona"
          titleId="methodology-heading"
          title={<>Processo simples, <span className="text-gradient">resultado rápido</span></>}
          subtitle="Em 4 etapas, você tem um site profissional pronto para gerar resultados."
          className="mb-14"
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer(0.15, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={slideUp}
                className="glass-hover rounded-xl p-5 md:p-6 flex items-start gap-5 group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-start gap-5 w-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/15 transition-all duration-300">
                    <span className="text-lg font-bold text-primary">{step.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 text-foreground group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
