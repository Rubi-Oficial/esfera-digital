import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      <div className="container px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]"
            style={{ y: innerY }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Sua empresa merece ser encontrada<br className="hidden sm:block" />por quem precisa dela.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-primary-foreground/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Enquanto você avalia, outras empresas já estão sendo encontradas no Google e convertendo clientes que poderiam ser seus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <ChatbotTrigger
                size="lg"
                ariaLabel="Comece agora — fale com nosso sistema"
                className="bg-primary-foreground text-primary hover:brightness-95 shadow-xl font-bold rounded-xl"
              >
                Comece agora
                <ArrowRight size={18} className="ml-2" />
              </ChatbotTrigger>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
