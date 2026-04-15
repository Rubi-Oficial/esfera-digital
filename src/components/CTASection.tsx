import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";
import ChatbotTrigger from "./ui/ChatbotTrigger";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.2, 0.8]);
  const innerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" aria-label="Chamada para ação">
      <motion.div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[140px] pointer-events-none"
        style={{ y: bgY, scale: glowScale }}
        aria-hidden="true"
      />
      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]"
            style={{ y: innerY }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8"
            >
              <Rocket size={28} className="text-primary-foreground" aria-hidden="true" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-primary-foreground/80 text-base mb-4"
            >
              Enquanto você pensa… outras empresas estão sendo encontradas no Google
              e fechando clientes que poderiam ser seus.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Não continue perdendo clientes<br />por falta de presença online.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-4 leading-relaxed"
            >
              A decisão é simples:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10 text-primary-foreground/70"
            >
              <span className="line-through">👉 continuar invisível</span>
              <span className="text-primary-foreground font-bold">👉 ou começar a vender online</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <ChatbotTrigger
                size="lg"
                ariaLabel="Comece agora — fale com nosso sistema"
                className="bg-primary-foreground text-primary hover:brightness-95 shadow-xl font-bold rounded-xl"
              >
                Comece agora — descubra o melhor caminho
              </ChatbotTrigger>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
