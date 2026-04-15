import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import problemImg from "@/assets/problem-visual.jpg";

const problems = [
  { icon: Shield, text: "Sem site profissional, sua marca perde credibilidade", detail: "87% dos consumidores pesquisam online antes de comprar." },
  { icon: Users, text: "Dependência de redes sociais é um risco real", detail: "Algoritmos mudam, alcance cai. Você não controla essas plataformas." },
  { icon: TrendingDown, text: "Cada dia sem site é dinheiro perdido", detail: "Seus concorrentes captam os clientes que deveriam ser seus." },
  { icon: AlertTriangle, text: "A concorrência já está investindo", detail: "Quem aparece primeiro no Google leva 75% dos cliques." },
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="solucoes" className="section-padding section-divider relative overflow-hidden" aria-labelledby="problem-heading">
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-destructive/3 blur-[140px] -left-40 top-1/3 pointer-events-none" style={{ y: orbY1 }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
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
              title={<>Estar online <span className="text-gradient">não basta.</span></>}
              subtitle="A maioria das empresas perde clientes por não ter uma estrutura digital que converta visitantes em oportunidades."
              className="text-left mb-10"
            />

            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-3"
            >
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
