import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Award, Sparkles, TrendingUp } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUpRotate } from "@/lib/animations";
import aboutImg from "@/assets/about-team.jpg";

const focuses = [
  { icon: Target, label: "Posicionamento de Marca", desc: "Identidade forte que diferencia e posiciona", stat: "+87" },
  { icon: Award, label: "Autoridade Digital", desc: "Credibilidade que gera confiança e vendas", stat: "94%" },
  { icon: Sparkles, label: "Experiência Premium", desc: "Design pensado para encantar e converter", stat: "5★" },
  { icon: TrendingUp, label: "Crescimento Real", desc: "Estratégia que escala com seu negócio", stat: "3x" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" aria-hidden="true" />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="absolute w-2.5 h-2.5 rounded-full bg-primary/50 animate-float left-10 bottom-20 pointer-events-none" style={{ y: dotY }} aria-hidden="true" />
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionHeader
              label="Quem Somos"
              titleId="about-heading"
              title={<>Esfera <span className="text-gradient">Soluções Digitais</span></>}
              className="text-left mb-6"
            />
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              Somos especialistas em <strong className="text-foreground">websites institucionais</strong> e <strong className="text-foreground">sistemas de inteligência artificial</strong> para empresas que querem crescer de verdade no digital.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              Atuamos como parceiros estratégicos — não apenas entregamos um site, construímos uma <strong className="text-foreground">máquina digital de vendas</strong> com tecnologia de ponta e foco em resultados mensuráveis.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
            >
              <img
                src={aboutImg}
                alt="Equipe da Esfera Digital colaborando em projetos de websites e I.A."
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-4"
          >
            {focuses.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUpRotate}
                className="glass-hover rounded-2xl p-6 text-center group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 text-2xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors" aria-hidden="true">
                  {f.stat}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <f.icon size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-secondary-foreground mb-1">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
