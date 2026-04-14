import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver meu site?",
    answer: "O prazo varia de acordo com o plano escolhido. Sites One Page são entregues em até 7 dias úteis. Projetos com múltiplas páginas levam de 15 a 30 dias. Projetos personalizados com IA e automações têm prazos definidos após o diagnóstico inicial.",
  },
  {
    question: "O site será responsivo e otimizado para celular?",
    answer: "Sim! Todos os nossos projetos são desenvolvidos com abordagem mobile-first, garantindo experiência perfeita em smartphones, tablets e desktops. Também otimizamos para velocidade de carregamento.",
  },
  {
    question: "Vocês fazem integração com WhatsApp?",
    answer: "Sim. Todos os planos incluem integração com WhatsApp via botão flutuante, links diretos e formulários inteligentes que enviam leads diretamente para seu WhatsApp Business.",
  },
  {
    question: "O que está incluso no SEO dos planos?",
    answer: "O SEO essencial inclui meta tags otimizadas, sitemap, robots.txt e estrutura semântica. No plano Premium, adicionamos SEO avançado com pesquisa de palavras-chave, dados estruturados (JSON-LD), otimização de Core Web Vitals e estratégia de conteúdo.",
  },
  {
    question: "Preciso fornecer conteúdo e imagens?",
    answer: "Idealmente sim, mas não se preocupe se não tiver tudo pronto. Oferecemos suporte na curadoria de conteúdo e utilizamos bancos de imagens profissionais quando necessário. No plano Premium, incluímos copywriting persuasivo completo.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Trabalhamos com entrada de 50% para iniciar o projeto e 50% na entrega. Aceitamos PIX, transferência bancária e cartão de crédito. Para projetos sob consulta, as condições são definidas após o diagnóstico.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer: "Sim! Todos os planos incluem 30 dias de suporte técnico gratuito após a entrega. Também oferecemos planos de manutenção mensal para atualizações contínuas, monitoramento e melhorias.",
  },
  {
    question: "Posso solicitar alterações durante o desenvolvimento?",
    answer: "Claro! Nosso processo inclui rodadas de revisão em cada etapa. Você acompanha o progresso e pode solicitar ajustes antes da entrega final, garantindo que o resultado esteja 100% alinhado às suas expectativas.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const FAQSection = () => {
  return (
    <section className="section-padding section-divider" aria-labelledby="faq-heading">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Dúvidas
          </span>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-bold mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e processo de trabalho.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants}>
                <AccordionItem
                  value={`item-${i}`}
                  className="glass-hover rounded-2xl border-none px-6 data-[state=open]:glow-box"
                >
                  <AccordionTrigger className="text-left font-semibold text-secondary-foreground hover:text-foreground py-5 text-base [&[data-state=open]]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
