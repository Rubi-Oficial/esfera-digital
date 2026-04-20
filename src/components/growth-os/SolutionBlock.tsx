import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { solution } from "./data";

const SolutionBlock = () => (
  <Section id="solucao">
    <SectionTitle
      label="A Solução"
      title={<>Site completo com <span className="text-gradient">IA integrada</span></>}
      subtitle="Um ecossistema digital que atende, qualifica e converte clientes 24 horas por dia, com a consistência que sua equipe não consegue manter sozinha."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
      {solution.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="glass-hover rounded-2xl p-7 text-center group"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
            <s.icon size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">{s.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default SolutionBlock;
