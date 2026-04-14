import { motion } from "framer-motion";

const stats = [
  { value: "+87", label: "Projetos Entregues" },
  { value: "+52", label: "Empresas Atendidas" },
  { value: "94%", label: "Satisfação" },
];

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-8">
        <div className="glass rounded-2xl p-10 md:p-16 glow-box">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Números <span className="text-gradient">Reais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-5xl md:text-6xl font-bold text-gradient">{s.value}</span>
                <p className="text-muted-foreground mt-2 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
