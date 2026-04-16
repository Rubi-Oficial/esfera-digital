import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Section from "./Section";
import { authorityStats } from "./data";

const AuthorityBlock = () => (
  <Section id="autoridade" className="section-divider">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase">
        <Shield size={12} /> Autoridade
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-5">
        Desenvolvido <span className="text-gradient">para o mercado brasileiro</span>
      </h2>
      <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-xl mx-auto">
        Solução projetada para <strong className="text-foreground">pequenas e médias empresas</strong> que utilizam o WhatsApp como principal canal de relacionamento e vendas.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {authorityStats.map((s, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <p className="text-2xl md:text-3xl font-extrabold text-gradient">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/50 mt-8 italic">Em breve: depoimentos de clientes</p>
    </motion.div>
  </Section>
);

export default AuthorityBlock;
