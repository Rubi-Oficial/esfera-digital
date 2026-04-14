import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Diagnóstico e Direcionamento", desc: "Analisamos seu mercado, público e objetivos para definir a melhor estrutura digital." },
  { num: "02", title: "Arquitetura Estratégica", desc: "Planejamos páginas, fluxos e elementos de conversão com foco em performance." },
  { num: "03", title: "Desenvolvimento Profissional", desc: "Criamos um site moderno, responsivo e alinhado à identidade da sua marca." },
  { num: "04", title: "Integrações Inteligentes", desc: "Conectamos seu site ao WhatsApp, formulários, CRM e ferramentas de automação." },
  { num: "05", title: "Preparação para Escala", desc: "Entregamos uma base estruturada para crescimento sustentável." },
];

const MethodologySection = () => {
  return (
    <section id="metodologia" className="py-24">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nossa <span className="text-gradient">Metodologia</span> Estratégica
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Um processo estruturado que transforma sua visão em uma presença digital que vende.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-10 md:mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="md:w-1/2" />
              <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{step.num}</span>
              </div>
              <div className="md:w-1/2 glass rounded-xl p-5">
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
