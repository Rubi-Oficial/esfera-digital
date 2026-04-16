import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Search, AlertTriangle } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, slideUp } from "@/lib/animations";
import problemImg from "@/assets/problem-visual.jpg";

const problems = [
  { icon: X, text: "Depende exclusivamente do Instagram", detail: "Algoritmos mudam constantemente — você não controla o alcance dessas plataformas." },
  { icon: X, text: "Não possui um site profissional", detail: "87% dos consumidores pesquisam online antes de tomar uma decisão de compra." },
  { icon: X, text: "Não aparece nos resultados do Google", detail: "O primeiro resultado orgânico recebe 75% de todos os cliques." },
];

const consequences = [
  "Perda diária de oportunidades de negócio",
  "Imagem amadora frente à concorrência",
  "Dependência total de algoritmos que você não controla",
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.8]);

  return (
    <section ref={sectionRef} id="solucoes" className="section-padding section-divider relative overflow-hidden" aria-labelledby="problem-heading">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-destructive/5 blur-[140px] -left-40 top-1/3 pointer-events-none" style={{ y: orbY1, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />
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
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Uma reflexão importante</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            Quando alguém pesquisa pelo seu serviço no Google,<br />
            <span className="text-primary">ela encontra você</span> ou o{" "}
            <span className="text-destructive">seu concorrente</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            A realidade é direta: <strong className="text-foreground">sem presença digital profissional, sua empresa está invisível para quem mais importa.</strong>
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
              title={<>A maioria dos negócios comete <span className="text-gradient">o mesmo erro</span></>}
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
                <span className="text-sm font-semibold text-destructive">O resultado disso?</span>
              </div>
              <ul className="space-y-2">
                {consequences.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                E muitas vezes, sem perceber o quanto de receita está sendo perdida.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
