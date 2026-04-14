import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Shield } from "lucide-react";

const problems = [
  { icon: Shield, text: "Sua marca perde credibilidade sem presença digital própria", detail: "Clientes buscam no Google antes de confiar em qualquer empresa." },
  { icon: Users, text: "Dependência total de plataformas de terceiros", detail: "Redes sociais mudam algoritmos — e seu alcance despenca." },
  { icon: TrendingDown, text: "Oportunidades são desperdiçadas diariamente", detail: "Sem site, você perde clientes para concorrentes que investem." },
  { icon: AlertTriangle, text: "A concorrência ocupa o espaço que deveria ser seu", detail: "Quem aparece primeiro no Google leva a maioria dos contatos." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ProblemSection = () => {
  return (
    <section id="solucoes" className="section-padding section-divider relative" aria-labelledby="problem-heading">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">O Problema</span>
          <h2 id="problem-heading" className="text-3xl md:text-5xl font-bold mb-6">
            Estar online <span className="text-gradient">não é suficiente.</span><br />
            É preciso ter estratégia.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Muitas empresas possuem redes sociais, mas não têm uma estrutura digital própria que transmita autoridade e gere oportunidades reais.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass-hover rounded-2xl p-6 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/20 transition-colors">
                <p.icon size={22} className="text-destructive" aria-hidden="true" />
              </div>
              <div>
                <p className="text-secondary-foreground font-semibold mb-1">{p.text}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-muted-foreground mt-12 max-w-xl mx-auto text-lg"
        >
          Presença digital precisa ser planejada como <span className="text-foreground font-semibold">ativo estratégico</span> — não como improviso.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;
