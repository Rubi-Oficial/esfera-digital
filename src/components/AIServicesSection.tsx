import { motion } from "framer-motion";
import { Bot, Zap, MessageSquare, Brain, BarChart3, Shield } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const services = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description:
      "Atendimento automatizado 24h com IA conversacional que entende seu cliente, responde dúvidas e qualifica leads em tempo real.",
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description:
      "Automatize tarefas repetitivas como agendamentos, follow-ups e envio de propostas — ganhe tempo e reduza erros.",
  },
  {
    icon: MessageSquare,
    title: "Atendimento Inteligente",
    description:
      "IA integrada ao WhatsApp e redes sociais para responder, direcionar e converter clientes automaticamente.",
  },
  {
    icon: Brain,
    title: "IA Generativa sob Medida",
    description:
      "Soluções personalizadas com IA generativa para criar conteúdo, analisar dados e tomar decisões mais rápidas.",
  },
  {
    icon: BarChart3,
    title: "Análise Preditiva",
    description:
      "Dashboards inteligentes que antecipam tendências, comportamento de clientes e oportunidades de vendas.",
  },
  {
    icon: Shield,
    title: "IA com Segurança",
    description:
      "Implementações seguras com proteção de dados, conformidade LGPD e monitoramento contínuo de performance.",
  },
];

const AIServicesSection = () => {
  return (
    <section
      id="ia-services"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Serviços de Inteligência Artificial"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="Inteligência Artificial"
          title="Sistemas de I.A. integrados ao seu negócio"
          subtitle="Transforme a experiência do seu cliente e a eficiência da sua operação com soluções de inteligência artificial sob medida."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" aria-hidden="true" />
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
            Quero integrar I.A. no meu negócio
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  );
};

export default AIServicesSection;
