import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import methodBg from "@/assets/methodology-bg.jpg";

const steps = [
  { num: "01", title: "Diagnóstico Estratégico", desc: "Analisamos mercado, público e concorrência para definir a melhor arquitetura digital para seu negócio.", color: "from-primary/20 to-primary/5" },
  { num: "02", title: "Arquitetura de Conversão", desc: "Planejamos páginas, fluxos e elementos persuasivos com foco em gerar leads e vendas.", color: "from-primary/25 to-primary/5" },
  { num: "03", title: "Design & Desenvolvimento", desc: "Criamos um site premium, responsivo e veloz — alinhado à identidade e posicionamento da sua marca.", color: "from-primary/30 to-primary/5" },
  { num: "04", title: "Integrações & I.A.", desc: "Conectamos WhatsApp, chatbots, CRM, automações e sistemas de I.A. para maximizar resultados.", color: "from-primary/35 to-primary/5" },
  { num: "05", title: "Lançamento & Escala", desc: "Entregamos uma estrutura preparada para tráfego pago, SEO e crescimento sustentável.", color: "from-primary/40 to-primary/5" },
];

const MethodologySection = () => {
  return (
    <section id="metodologia" className="section-padding section-divider relative overflow-hidden" aria-labelledby="methodology-heading">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={methodBg}
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Processo"
          titleId="methodology-heading"
          title={<>Do diagnóstico ao <span className="text-gradient">resultado</span> em 5 etapas</>}
          subtitle="Um processo validado por +87 projetos que transforma sua visão em uma máquina digital de vendas."
          className="mb-16"
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-hover rounded-2xl p-6 md:p-8 flex items-start gap-6 group relative overflow-hidden"
              >
                {/* Progress gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

                <div className="relative z-10 flex items-start gap-6 w-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/20 transition-all duration-300">
                    <span className="text-primary font-bold text-lg">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="absolute bottom-0 left-[3.25rem] w-px h-4 bg-primary/20 translate-y-full" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
