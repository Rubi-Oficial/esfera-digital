import { motion } from "framer-motion";
import Section from "./Section";

const ReflectionBlock = () => (
  <Section id="reflexao" className="section-divider">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase">
          Uma reflexão importante
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-6 text-foreground">
          Quando alguém pesquisa pelo seu serviço no Google,{" "}
          <span className="text-gradient">ela encontra você ou o seu concorrente?</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          A realidade é direta:{" "}
          <strong className="text-foreground font-semibold">
            sem presença digital profissional, sua empresa está invisível
          </strong>{" "}
          para quem mais importa.
        </p>
      </motion.div>
    </div>
  </Section>
);

export default ReflectionBlock;
