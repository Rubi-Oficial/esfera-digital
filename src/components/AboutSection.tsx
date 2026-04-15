import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Globe, MessageSquare, Sparkles, Zap } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUpRotate } from "@/lib/animations";

const transformations = [
  { icon: Globe, label: "Aparece no Google", desc: "Seus clientes te encontram quando pesquisam" },
  { icon: Sparkles, label: "Passa credibilidade", desc: "Design profissional que gera confiança" },
  { icon: MessageSquare, label: "Responde automaticamente", desc: "I.A. atende seus clientes 24h" },
  { icon: Zap, label: "Direciona pro WhatsApp", desc: "Leads qualificados direto no seu celular" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" aria-hidden="true" />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">💡 A Virada</span>
          <h2 id="about-heading" className="text-3xl md:text-5xl font-bold mb-6">
            Agora <span className="text-gradient">imagine isso:</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Um site profissional trabalhando por você <strong className="text-foreground">24 horas por dia</strong>.
            Isso não é futuro — isso já é possível hoje, com <strong className="text-foreground">inteligência artificial</strong>.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {transformations.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUpRotate}
              className="glass-hover rounded-2xl p-6 text-center group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Check size={14} className="text-primary" aria-hidden="true" />
                  <p className="font-semibold text-secondary-foreground">{f.label}</p>
                </div>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-lg text-muted-foreground mt-10"
        >
          👉 Como se você tivesse um <strong className="text-foreground">funcionário trabalhando 24h</strong>
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
