import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Zap, MessageSquare, Brain, BarChart3, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const services = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Atendimento automatizado 24h que qualifica leads sem intervenção humana.",
    stat: "24/7",
    statLabel: "Atendimento",
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Agendamentos, follow-ups e propostas no piloto automático.",
    stat: "10x",
    statLabel: "Mais produtivo",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp com I.A.",
    description: "IA que responde, direciona e converte clientes em tempo real.",
    stat: "3x",
    statLabel: "Mais conversões",
  },
  {
    icon: Brain,
    title: "I.A. Generativa",
    description: "Criação de conteúdo e decisões inteligentes para seu negócio.",
    stat: "∞",
    statLabel: "Possibilidades",
  },
  {
    icon: BarChart3,
    title: "Análise Preditiva",
    description: "Dashboards que antecipam tendências antes da concorrência.",
    stat: "85%",
    statLabel: "Precisão",
  },
  {
    icon: Shield,
    title: "I.A. Segura & LGPD",
    description: "Proteção de dados com conformidade legal e monitoramento.",
    stat: "100%",
    statLabel: "Conformidade",
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
      aria-label="Serviços de Inteligência Artificial"
    >
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-primary/3 blur-[130px] -right-20 top-1/4 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="Inteligência Artificial"
          title={<>Sistemas de <span className="text-gradient">I.A.</span> que trabalham por você</>}
          subtitle="Automatize atendimento, vendas e operações com inteligência artificial integrada."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-14">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative p-6 md:p-7 rounded-2xl glass-hover"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gradient">{service.stat}</span>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{service.statLabel}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
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
            message={WHATSAPP_MESSAGES.specialist}
            size="lg"
            ariaLabel="Falar sobre soluções de I.A. via WhatsApp"
          >
            Quero I.A. no meu negócio
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  );
};

export default AIServicesSection;
