import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { steps } from "./data";

const StepsBlock = () => (
  <Section id="como-funciona" className="section-divider">
    <SectionTitle
      label="Metodologia"
      title={<>Do primeiro contato à conversão em <span className="text-gradient">5 etapas</span></>}
      subtitle="Um processo claro e automatizado que acompanha o lead em cada fase."
    />
    <div className="max-w-3xl mx-auto space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="glass-hover rounded-xl p-5 flex items-start gap-5 group"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-all">
            <span className="text-lg font-bold text-primary">{step.num}</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
            <p className="text-muted-foreground text-xs">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default StepsBlock;
