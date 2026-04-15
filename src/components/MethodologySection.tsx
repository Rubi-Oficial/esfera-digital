import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, slideUp } from "@/lib/animations";

const steps = [
  { num: "1️⃣", title: "Envie informações do seu negócio", desc: "Preencha um breve formulário com os dados essenciais da sua empresa." },
  { num: "2️⃣", title: "Criamos site + design + estrutura de vendas", desc: "Nossa equipe desenvolve tudo: copy persuasiva, design moderno e otimização." },
  { num: "3️⃣", title: "Integramos IA e WhatsApp", desc: "Conectamos chatbot inteligente, formulários e botão de WhatsApp." },
  { num: "4️⃣", title: "Publicamos tudo pronto pra você", desc: "Seu site vai ao ar 100% funcional — pronto para gerar clientes." },
];

const MethodologySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="metodologia" className="section-padding section-divider relative overflow-hidden" aria-labelledby="methodology-heading">
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-primary/3 blur-[120px] -left-20 bottom-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="⚙️ Como Funciona"
          titleId="methodology-heading"
          title={<>Simples, rápido e <span className="text-gradient">sem dor de cabeça</span></>}
          subtitle="Em 4 passos simples você tem um site profissional pronto para vender."
          className="mb-14"
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer(0.15, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={slideUp}
                className="glass-hover rounded-xl p-5 md:p-6 flex items-start gap-5 group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-start gap-5 w-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/15 transition-all duration-300">
                    <span className="text-2xl">{step.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 text-foreground group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
