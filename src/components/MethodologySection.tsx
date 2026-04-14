import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const steps = [
  { num: "01", title: "Diagnóstico e Direcionamento", desc: "Analisamos seu mercado, público e objetivos para definir a melhor estrutura digital." },
  { num: "02", title: "Arquitetura Estratégica", desc: "Planejamos páginas, fluxos e elementos de conversão com foco em performance." },
  { num: "03", title: "Desenvolvimento Profissional", desc: "Criamos um site moderno, responsivo e alinhado à identidade da sua marca." },
  { num: "04", title: "Integrações Inteligentes", desc: "Conectamos seu site ao WhatsApp, formulários, CRM e ferramentas de automação." },
  { num: "05", title: "Preparação para Escala", desc: "Entregamos uma base estruturada para crescimento sustentável." },
];

const MethodologySection = () => {
  return (
    <section id="metodologia" className="section-padding section-divider" aria-labelledby="methodology-heading">
      <div className="container px-4 md:px-8">
        <SectionHeader
          label="Processo"
          titleId="methodology-heading"
          title={<>Nossa <span className="text-gradient">Metodologia</span> Estratégica</>}
          subtitle="Um processo estruturado que transforma sua visão em uma presença digital que vende."
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-hover rounded-2xl p-6 text-center group relative"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center mx-auto mb-4 group-hover:border-primary group-hover:bg-primary/20 transition-all">
                  <span className="text-primary font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="font-bold text-sm mb-2 leading-tight">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-primary/30" aria-hidden="true" />
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
