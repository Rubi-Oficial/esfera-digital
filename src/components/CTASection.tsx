import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24" aria-label="Chamada para ação">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Se sua estrutura digital não vende,<br />ela precisa evoluir.
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Cada dia sem uma presença digital estratégica é uma oportunidade perdida. Vamos estruturar sua marca com tecnologia, estratégia e visão de crescimento.
            </p>
            <a
              href="https://wa.me/5548991061707?text=Olá, quero garantir minha vaga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-bold text-lg hover:brightness-95 transition-all group"
              aria-label="Garantir vaga via WhatsApp"
            >
              Quero garantir minha vaga
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
