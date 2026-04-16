import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Smartphone, CalendarDays, TrendingUp } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import ChatbotTrigger from "./ui/ChatbotTrigger";

const benefits = [
  {
    icon: MessageSquare,
    title: "Atendimento automatizado 24h",
    description: "Inteligência artificial integrada que atende, qualifica e responde seus clientes em tempo real — a qualquer hora.",
  },
  {
    icon: Smartphone,
    title: "Direcionamento para WhatsApp",
    description: "Botões estratégicos, formulários e chatbot que encaminham leads qualificados direto para o seu WhatsApp.",
  },
  {
    icon: CalendarDays,
    title: "Captação contínua de leads",
    description: "Estrutura de captação com formulários inteligentes e chamadas para ação posicionadas estrategicamente.",
  },
  {
    icon: TrendingUp,
    title: "Credibilidade profissional",
    description: "Design de alto nível que transmite autoridade, confiança e diferencia sua marca da concorrência.",
  },
];

const AIServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 0.85]);

  return (
    <section
      ref={sectionRef}
      id="ia-services"
      className="section-padding section-divider relative overflow-hidden"
      aria-label="O que o site faz por você"
    >
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[130px] -right-20 top-1/4 pointer-events-none" style={{ y: orbY, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="Solução"
          title={<>Site completo + <span className="text-gradient">I.A. integrada</span></>}
          subtitle="Um sistema digital completo que trabalha por você 24 horas por dia."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">O que seu site vai fazer:</strong>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-6 md:p-7 rounded-2xl glass-hover"
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1.5 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <ChatbotTrigger
            size="lg"
            ariaLabel="Quero meu sistema — falar agora"
          >
            Quero meu sistema
          </ChatbotTrigger>
        </motion.div>
      </div>
    </section>
  );
};

export default AIServicesSection;
