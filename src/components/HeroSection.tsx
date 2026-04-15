import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, ArrowDown } from "lucide-react";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import heroImg from "@/assets/hero-workspace.jpg";

const benefits = [
  "Sem complicação",
  "Sem depender de redes sociais",
  "Pronto para gerar clientes",
];

const TYPEWRITER_TEXT = "Websites + I.A.";
const TYPEWRITER_SPEED = 80;

const useTypewriter = (text: string, speed: number, startDelay: number) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, showCursor };
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const { displayed, showCursor } = useTypewriter(TYPEWRITER_TEXT, TYPEWRITER_SPEED, 1000);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Apresentação da Esfera">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10" />
        <motion.img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
          style={{ scale: imgScale }}
          width={1920}
          height={1080}
        />
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <motion.div className="container relative z-10 px-4 md:px-8 py-20" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-destructive/30 bg-destructive/5 text-destructive text-xs font-medium mb-8 tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" aria-hidden="true" />
            Seu negócio está perdendo clientes
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            <span className="text-gradient inline-block min-h-[1.2em] drop-shadow-[0_0_30px_hsl(43_70%_55%/0.25)]">
              {displayed}
              {showCursor && (
                <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-blink" aria-hidden="true" />
              )}
            </span>
            <br />
            <span className="text-foreground/95">que vendem por você.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
            Enquanto você depende do Instagram…{" "}
            <strong className="text-foreground font-semibold">seus concorrentes estão aparecendo no Google</strong> e fechando vendas.
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Nós criamos seu site completo com inteligência artificial em poucos dias —{" "}
            <strong className="text-foreground font-semibold">pronto para atrair clientes e vender automaticamente</strong>.
          </p>

          <motion.ul
            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12"
            aria-label="Benefícios"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } },
            }}
          >
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide bg-card/40 backdrop-blur-sm border border-border/30 rounded-full px-4 py-2"
              >
                <Check size={12} className="text-primary shrink-0" aria-hidden="true" />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.presenca}
              size="lg"
              ariaLabel="Quero um site com IA para meu negócio"
            >
              Quero um site com IA
            </WhatsAppLink>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              Ver oferta especial
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
