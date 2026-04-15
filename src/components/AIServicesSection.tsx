import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Smartphone, CalendarDays, TrendingUp, Bot, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const benefits = [
  {
    icon: MessageSquare,
    title: "Responde clientes automaticamente",
    description: "I.A. integrada que atende, qualifica e responde em tempo real — 24 horas por dia.",
    emoji: "💬",
  },
  {
    icon: Smartphone,
    title: "Leva direto pro WhatsApp",
    description: "Botões, formulários e chatbot que direcionam leads qualificados para seu WhatsApp.",
    emoji: "📲",
  },
  {
    icon: CalendarDays,
    title: "Gera contatos todos os dias",
    description: "Estrutura de captação com formulários inteligentes e calls-to-action estratégicos.",
    emoji: "📅",
  },
  {
    icon: TrendingUp,
    title: "Aumenta sua credibilidade",
    description: "Design profissional que transmite autoridade e confiança para seus clientes.",
    emoji: "📈",
  },
];

const AIServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="ia-services"
      className="section-padding section-divider relative overflow-hidden"
      aria-label="O que o site faz por você"
    >
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-primary/3 blur-[130px] -right-20 top-1/4 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="🤖 Solução"
          title={<>Site completo + <span className="text-gradient">I.A. integrada</span></>}
          subtitle="Um verdadeiro vendedor digital que trabalha por você 24 horas por dia."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">Seu site vai:</strong>
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
                      {benefit.emoji} {benefit.title}
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
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.presenca}
            size="lg"
            ariaLabel="Quero um site com IA para meu negócio"
          >
            Quero um site com IA
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  );
};

export default AIServicesSection;
