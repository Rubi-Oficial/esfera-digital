import { motion } from "framer-motion";
import { Target, Award, Sparkles, TrendingUp } from "lucide-react";

const focuses = [
  { icon: Target, label: "Posicionamento de marca" },
  { icon: Award, label: "Autoridade online" },
  { icon: Sparkles, label: "Experiência do usuário" },
  { icon: TrendingUp, label: "Conversão de visitantes em clientes" },
];

const AboutSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container relative px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Esfera <span className="text-gradient">Soluções Digitais</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Somos especialistas em desenvolvimento de sites e soluções digitais integradas para empresas e profissionais que desejam crescer com consistência.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Atuamos como uma assessoria estratégica digital, construindo bases digitais preparadas para expansão e escala.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {focuses.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <f.icon size={22} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-secondary-foreground">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
