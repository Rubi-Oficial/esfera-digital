import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Search, AlertTriangle } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, slideUp } from "@/lib/animations";
import problemImg from "@/assets/problem-visual.jpg";

const problems = [
  { icon: X, text: "Acredita que Instagram é suficiente", detail: "Algoritmos mudam, alcance cai — você não controla essas plataformas." },
  { icon: X, text: "Não tem um site profissional", detail: "87% dos consumidores pesquisam online antes de comprar." },
  { icon: X, text: "Não aparece no Google", detail: "Quem aparece primeiro leva 75% dos cliques." },
];

const consequences = [
  "Perde clientes todos os dias",
  "Parece amador",
  "Depende de algoritmo",
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="solucoes" className="section-padding section-divider relative overflow-hidden" aria-labelledby="problem-heading">
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-destructive/3 blur-[140px] -left-40 top-1/3 pointer-events-none" style={{ y: orbY1 }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        {/* Pattern interrupt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Search size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Deixa eu te perguntar</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            Quando alguém procura pelo seu serviço no Google…<br />
            <span className="text-primary">ela encontra você</span> ou encontra{" "}
            <span className="text-destructive">seu concorrente</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            A verdade é simples: <strong className="text-foreground">se você não tem um site profissional, você está invisível.</strong>
          </p>
        </motion.div>

        {/* Problem details */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 md:order-1"
          >
            <div className="rounded-2xl overflow-hidden border border-border/20 shadow-2xl">
              <img
                src={problemImg}
                alt="Empresário analisando presença digital desatualizada"
                className="w-full h-auto object-cover aspect-square md:aspect-[4/5]"
                loading="lazy"
                width={1024}
                height={1280}
              />
            </div>
          </motion.div>

          <div className="order-1 md:order-2">
            <SectionHeader
              label="O Problema"
              titleId="problem-heading"
              title={<>A maioria dos pequenos negócios comete <span className="text-gradient">o mesmo erro</span></>}
              className="text-left mb-10"
            />

            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-3 mb-8"
            >
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={slideUp}
                  className="glass-hover rounded-xl p-4 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/15 transition-colors duration-300">
                    <p.icon size={18} className="text-destructive" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-semibold mb-0.5 text-sm leading-snug">{p.text}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Consequences */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5 border border-destructive/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-destructive" />
                <span className="text-sm font-semibold text-destructive">Resultado?</span>
              </div>
              <ul className="space-y-2">
                {consequences.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive">👉</span> {c}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                E o pior: nem percebe quanto dinheiro está deixando na mesa.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
