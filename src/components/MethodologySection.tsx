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
    <section id="metodologia" className="section-padding section-divider" aria-labelledby="methodology-heading">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">Processo</span>
          <h2 id="methodology-heading" className="text-3xl md:text-5xl font-bold mb-4">
            Nossa <span className="text-gradient">Metodologia</span> Estratégica
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Um processo estruturado que transforma sua visão em uma presença digital que vende.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
