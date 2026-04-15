import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, fadeInLeft } from "@/lib/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "\"Ah, mas eu não entendo de tecnologia…\"",
    answer: "Não precisa! Fazemos tudo pra você — do design ao conteúdo, da programação à publicação. Você só precisa nos enviar as informações básicas do seu negócio.",
  },
  {
    question: "\"E se eu não tiver conteúdo?\"",
    answer: "Sem problemas. Criamos a copy e toda a estrutura completa do seu site. Textos persuasivos, chamadas para ação e conteúdo otimizado para Google.",
  },
  {
    question: "\"Vai funcionar para o meu negócio?\"",
    answer: "Se seus clientes pesquisam no Google, sim! Nossos sites são ideais para pequenos empresários, autônomos, prestadores de serviço e negócios locais de qualquer segmento.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer: "Sites One Page são entregues em até 7 dias úteis. Tudo é feito de forma ágil para que você comece a gerar clientes o mais rápido possível.",
  },
  {
    question: "O site funciona bem no celular?",
    answer: "Sim! Todos os sites são desenvolvidos com design responsivo e mobile-first, garantindo experiência perfeita em smartphones, tablets e desktops.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Entrada de 50% para iniciar e 50% na entrega. Aceitamos PIX, transferência bancária e cartão de crédito.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer: "Sim! Todos os projetos incluem suporte técnico gratuito após a entrega, além de 1 ano de hospedagem incluso no pacote.",
  },
  {
    question: "Posso solicitar alterações?",
    answer: "Claro! Nosso processo inclui rodadas de revisão. Você acompanha o progresso e pode solicitar ajustes antes da entrega final.",
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="section-padding section-divider relative overflow-hidden" aria-labelledby="faq-heading">
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[130px] left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ y: orbY }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="💬 Objeções"
          titleId="faq-heading"
          title={<>Ainda tem <span className="text-gradient">dúvidas?</span></>}
          subtitle="Respondemos as perguntas mais comuns sobre nosso serviço."
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
