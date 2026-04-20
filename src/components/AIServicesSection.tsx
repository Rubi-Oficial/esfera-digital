import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Bot, Users, BarChart3 } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import ChatbotTrigger from "./ui/ChatbotTrigger";

const benefits = [
  {
    icon: Search,
    title: "SEO para aparecer no Google",
    description: "Estrutura técnica, conteúdo otimizado e blog estratégico para seu site ranquear nas primeiras posições e atrair tráfego qualificado todos os dias.",
  },
  {
    icon: Bot,
    title: "I.A. de atendimento 24/7",
    description: "Chatbot inteligente integrado ao site que conversa, qualifica e captura leads automaticamente — direcionando os melhores para o WhatsApp do seu time.",
  },
  {
    icon: Users,
    title: "CRM comercial integrado",
    description: "Cada lead capturado entra no funil do seu CRM com histórico, temperatura e estágio — pronto para o time comercial fechar mais vendas.",
  },
  {
    icon: BarChart3,
    title: "Dashboards e métricas em tempo real",
    description: "Acompanhe tráfego, conversões, leads quentes e receita estimada em um painel único — decisões baseadas em dados, não em achismo.",
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
      aria-label="Site + CRM + IA + SEO para aparecer no Google"
    >
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[130px] -right-20 top-1/4 pointer-events-none" style={{ y: orbY, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-8">
        <SectionHeader
          label="Ecossistema completo"
          title={<>Site + <span className="text-gradient">CRM + I.A. + SEO</span> no Google</>}
          subtitle="Mais que um site bonito: um sistema comercial que aparece no Google, atende com IA e organiza cada lead no CRM."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">Os 4 pilares que vendem por você:</strong>
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
