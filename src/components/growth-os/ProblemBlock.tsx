import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { problems } from "./data";

const ProblemBlock = () => (
  <Section id="problema" className="section-divider">
    <SectionTitle
      label="O Desafio"
      title={<>Onde a maioria dos negócios <span className="text-destructive">perde oportunidades</span></>}
      subtitle="Se algum desses cenários é familiar, existe uma solução estruturada para resolver."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {problems.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-hover rounded-2xl p-6 text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/15 transition-colors">
            <p.icon size={22} className="text-destructive" />
          </div>
          <h3 className="font-bold text-foreground mb-2 text-sm">{p.text}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default ProblemBlock;
