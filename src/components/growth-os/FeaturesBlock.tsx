import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { features } from "./data";

const FeaturesBlock = () => (
  <Section id="funcionalidades" className="section-divider">
    <SectionTitle
      label="Funcionalidades"
      title={<>Ferramentas essenciais para <span className="text-gradient">crescer</span></>}
      subtitle="Tudo o que seu negócio precisa para captar e converter, em um só sistema."
    />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="glass-hover rounded-xl p-5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
            <f.icon size={18} className="text-primary" />
          </div>
          <p className="text-xs font-semibold text-secondary-foreground">{f.title}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default FeaturesBlock;
