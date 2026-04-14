import { motion } from "framer-motion";
import { Bot, Zap, MessageSquare, Brain, BarChart3, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import aiBg from "@/assets/ai-services-bg.jpg";

const services = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Atendimento automatizado 24h que entende, responde e qualifica leads — sem intervenção humana.",
    stat: "24/7",
    statLabel: "Atendimento",
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Agendamentos, follow-ups e propostas no piloto automático. Menos trabalho manual, mais resultados.",
    stat: "10x",
    statLabel: "Mais produtivo",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp com I.A.",
    description: "IA integrada ao WhatsApp que responde, direciona e converte clientes em tempo real.",
    stat: "3x",
    statLabel: "Mais conversões",
  },
  {
    icon: Brain,
    title: "I.A. Generativa",
    description: "Criação de conteúdo, análise de dados e decisões inteligentes — personalizadas para seu negócio.",
    stat: "∞",
    statLabel: "Possibilidades",
  },
  {
    icon: BarChart3,
    title: "Análise Preditiva",
    description: "Dashboards que antecipam tendências e oportunidades antes da concorrência.",
    stat: "85%",
    statLabel: "Precisão",
  },
  {
    icon: Shield,
    title: "I.A. Segura & LGPD",
    description: "Implementações com proteção de dados, conformidade legal e monitoramento contínuo.",
    stat: "100%",
    statLabel: "Conformidade",
  },
];

const AIServicesSection = () => {
  return (
    <section
      id="ia-services"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Serviços de Inteligência Artificial"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={aiBg}
          alt=""
          className="w-full h-full object-cover opacity-15"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="Inteligência Artificial"
          title={<>Sistemas de <span className="text-gradient">I.A.</span> que trabalham por você</>}
          subtitle="Automatize atendimento, vendas e operações com inteligência artificial integrada ao seu site e canais digitais."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gradient">{service.stat}</span>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{service.statLabel}</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground">
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
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-14"
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
