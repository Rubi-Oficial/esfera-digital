import { motion } from "framer-motion";
import { Target, Award, Sparkles, TrendingUp } from "lucide-react";
import aboutImg from "@/assets/about-team.jpg";

const focuses = [
  { icon: Target, label: "Posicionamento de marca", desc: "Identidade forte e diferenciada" },
  { icon: Award, label: "Autoridade online", desc: "Credibilidade que converte" },
  { icon: Sparkles, label: "Experiência do usuário", desc: "Design pensado para o cliente" },
  { icon: TrendingUp, label: "Conversão de visitantes", desc: "Visitantes se tornam clientes" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 14 },
  },
};

const AboutSection = () => {
  return (
    <section className="section-padding relative" aria-labelledby="about-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" aria-hidden="true" />
      <div className="container relative px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">Quem Somos</span>
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold mb-6">
              Esfera <span className="text-gradient">Soluções Digitais</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              Somos especialistas em desenvolvimento de sites e soluções digitais integradas para empresas e profissionais que desejam crescer com consistência.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              Atuamos como uma assessoria estratégica digital, construindo bases digitais preparadas para expansão e escala.
            </p>

            {/* Team image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-border/40"
            >
              <img
                src={aboutImg}
                alt="Equipe da Esfera Digital colaborando em projetos de marketing e desenvolvimento web"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={800}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-4"
          >
            {focuses.map((f, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="glass-hover rounded-2xl p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={24} className="text-primary" aria-hidden="true" />
                </div>
                <p className="font-semibold text-secondary-foreground mb-1">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
