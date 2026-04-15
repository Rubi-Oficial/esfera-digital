import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { staggerContainer, fadeInLeft } from "@/lib/animations";
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

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="section-padding section-divider relative overflow-hidden" aria-labelledby="faq-heading">
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[130px] left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="absolute w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow right-20 bottom-32 pointer-events-none" style={{ y: dotY }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Dúvidas"
          titleId="faq-heading"
          title={<>Perguntas <span className="text-gradient">Frequentes</span></>}
          subtitle="Tire suas dúvidas sobre nossos serviços e processo de trabalho."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInLeft}>
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
