import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding" aria-label="Chamada para ação">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]" aria-hidden="true" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-8"
            >
              <MessageCircle size={28} className="text-primary-foreground" aria-hidden="true" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Se sua estrutura digital não vende,<br />ela precisa evoluir.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Cada dia sem uma presença digital estratégica é uma oportunidade perdida. Vamos estruturar sua marca com tecnologia, estratégia e visão de crescimento.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              href="https://wa.me/5548991061707?text=Olá, quero garantir minha vaga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-bold text-lg hover:brightness-95 transition-all group shadow-xl"
              aria-label="Garantir vaga via WhatsApp"
            >
              Quero garantir minha vaga
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
