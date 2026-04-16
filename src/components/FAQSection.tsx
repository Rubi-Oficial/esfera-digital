import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, blurFadeIn } from "@/lib/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Não entendo de tecnologia. Isso é um problema?",
    answer: "De forma alguma. Cuidamos de absolutamente tudo — do design ao conteúdo, da programação à publicação. Você só precisa nos enviar as informações básicas do seu negócio.",
  },
  {
    question: "E se eu não tiver conteúdo pronto?",
    answer: "Não se preocupe. Criamos toda a estrutura de conteúdo do seu site: textos persuasivos, chamadas para ação e conteúdo otimizado para mecanismos de busca.",
  },
  {
    question: "Funciona para o meu tipo de negócio?",
    answer: "Se os seus clientes pesquisam no Google antes de comprar, sim. Nossos sites são ideais para empresários, autônomos, prestadores de serviço e negócios locais de qualquer segmento.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "Sites One Page são entregues em até 7 dias úteis. Todo o processo é conduzido de forma ágil para que você comece a gerar resultados o mais rápido possível.",
  },
  {
    question: "O site é responsivo para celular?",
    answer: "Sim. Todos os sites são desenvolvidos com design responsivo e mobile-first, garantindo experiência perfeita em smartphones, tablets e desktops.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O pagamento é feito online de forma segura. Você paga a implantação e uma mensalidade recorrente. Aceitamos cartão de crédito com opção de parcelamento.",
  },
  {
    question: "É possível parcelar?",
    answer: "Sim. O pagamento pode ser parcelado no cartão de crédito. Entre em contato para encontrar a melhor condição para o seu caso.",
  },
  {
    question: "Há suporte após a entrega?",
    answer: "Sim. Todos os projetos incluem suporte técnico após a entrega, além de 1 ano de hospedagem incluso no pacote.",
  },
  {
    question: "Posso solicitar alterações depois?",
    answer: "Claro. Nosso processo inclui rodadas de revisão. Você acompanha o progresso e pode solicitar ajustes antes da entrega final.",
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 0.85]);

  return (
    <section ref={sectionRef} className="section-padding section-divider relative overflow-hidden" aria-labelledby="faq-heading">
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-primary/6 blur-[130px] left-1/2 -translate-x-1/2 top-0 pointer-events-none" style={{ y: orbY, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
        <SectionHeader
          label="Perguntas Frequentes"
          titleId="faq-heading"
          title={<>Dúvidas? <span className="text-gradient">Respondemos aqui.</span></>}
          subtitle="As perguntas mais comuns sobre nosso serviço e processo."
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
              <motion.div key={i} variants={blurFadeIn}>
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
