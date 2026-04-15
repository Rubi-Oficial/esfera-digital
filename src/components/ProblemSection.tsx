import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import problemImg from "@/assets/problem-visual.jpg";

const problems = [
  { icon: Shield, text: "Sem site profissional, sua marca perde credibilidade", detail: "87% dos consumidores pesquisam online antes de comprar. Sem presença própria, você é invisível." },
  { icon: Users, text: "Dependência de redes sociais é um risco real", detail: "Algoritmos mudam, alcance cai. Seu negócio não pode depender de plataformas que você não controla." },
  { icon: TrendingDown, text: "Cada dia sem site é dinheiro perdido", detail: "Enquanto você hesita, seus concorrentes captam os clientes que deveriam ser seus." },
  { icon: AlertTriangle, text: "A concorrência já está investindo — e ganhando", detail: "Quem aparece primeiro no Google leva 75% dos cliques. Posição importa." },
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} id="solucoes" className="section-padding section-divider relative overflow-hidden" aria-labelledby="problem-heading">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-destructive/5 blur-[140px] -left-40 top-1/3 pointer-events-none" style={{ y: orbY1 }} aria-hidden="true" />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] right-0 top-0 pointer-events-none" style={{ y: orbY2 }} aria-hidden="true" />
      <motion.div className="absolute w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow right-20 top-20 pointer-events-none" style={{ y: dotY }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
              <img
                src={problemImg}
                alt="Empresário analisando presença digital desatualizada"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <div className="absolute -inset-4 bg-primary/5 blur-[60px] rounded-full -z-10" aria-hidden="true" />
          </motion.div>

          <div>
            <SectionHeader
              label="O Problema"
              titleId="problem-heading"
              title={<>Estar online <span className="text-gradient">não é suficiente.</span><br />É preciso ter estratégia.</>}
              subtitle="A maioria das empresas perde clientes todos os dias por não ter uma estrutura digital que transmita autoridade e converta visitantes em oportunidades reais."
              className="text-left mb-10"
            />

            <motion.div
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass-hover rounded-2xl p-5 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <p.icon size={18} className="text-destructive" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-semibold mb-1 text-sm">{p.text}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-muted-foreground mt-12 max-w-xl mx-auto text-lg"
        >
          Sua presença digital precisa ser um <span className="text-foreground font-semibold">ativo estratégico</span> — não um improviso que custa clientes.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;
