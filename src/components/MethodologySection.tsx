import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const steps = [
  { num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos mercado, público e concorrência para definir a melhor arquitetura digital." },
  { num: "02", title: "Arquitetura de Conversão", desc: "Planejamos páginas, fluxos e elementos persuasivos com foco em leads e vendas." },
  { num: "03", title: "Design & Desenvolvimento", desc: "Criamos um site premium, responsivo e veloz — alinhado à sua marca." },
  { num: "04", title: "Integrações & I.A.", desc: "Conectamos WhatsApp, chatbots, CRM e sistemas de I.A. para maximizar resultados." },
  { num: "05", title: "Lançamento & Escala", desc: "Entregamos estrutura preparada para tráfego pago, SEO e crescimento." },
];

const MethodologySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="metodologia" className="section-padding section-divider relative overflow-hidden" aria-labelledby="methodology-heading">
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-primary/3 blur-[120px] -left-20 bottom-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Processo"
          titleId="methodology-heading"
          title={<>Do diagnóstico ao <span className="text-gradient">resultado</span></>}
          subtitle="Um processo validado por +87 projetos que transforma sua visão em resultados reais."
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-3"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-hover rounded-xl p-5 md:p-6 flex items-start gap-5 group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-start gap-5 w-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/15 transition-all duration-300">
                    <span className="text-primary font-bold text-sm">{step.num}</span>
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
