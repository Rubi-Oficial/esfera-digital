import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import WhatsAppLink from "./ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import heroImg from "@/assets/hero-workspace.jpg";

const benefits = [
  "Sites institucionais sob medida para sua marca",
  "Sistemas de I.A. que automatizam e vendem",
  "Integração com WhatsApp, CRM e automações",
  "SEO estratégico para dominar o Google",
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
          // Keep cursor blinking for a bit then hide
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const dot1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const dot2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const dot3Y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const { displayed, showCursor } = useTypewriter(TYPEWRITER_TEXT, TYPEWRITER_SPEED, 1000);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Apresentação da Esfera">
      {/* Hero background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
        <motion.img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-40"
          style={{ scale: imgScale }}
          width={1920}
          height={1080}
        />
      </motion.div>

      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ y: dot1Y }} aria-hidden="true" />
      <motion.div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-primary/60 animate-float" style={{ y: dot2Y }} aria-hidden="true" />
      <motion.div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-primary/40 animate-pulse-glow" style={{ y: dot3Y }} aria-hidden="true" />

      <motion.div className="container relative z-10 px-4 md:px-8 py-20" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
            ESFERA DIGITAL — Websites com Inteligência Artificial
          </motion.div>

          <div className="relative mb-6">
            {/* Glow behind title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="w-[80%] h-[80%] rounded-full bg-primary/15 blur-[80px] animate-pulse" />
            </div>
            <h1 className="relative text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight drop-shadow-[0_0_40px_hsl(43_70%_55%/0.3)]">
              <span className="text-gradient inline-block min-h-[1.2em]">
                {displayed}
                {showCursor && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-blink" aria-hidden="true" />
                )}
              </span>
              <br />
              <span className="text-foreground drop-shadow-[0_0_20px_hsl(43_70%_55%/0.1)]">que vendem por você.</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide">
            Criamos websites institucionais de alto impacto com inteligência artificial integrada — seu negócio funcionando, vendendo e atendendo{" "}
            <strong className="text-foreground font-semibold">24 horas por dia</strong>.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12" aria-label="Benefícios">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-muted-foreground/80 tracking-wide"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-primary" aria-hidden="true" />
                </div>
                {b}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.presenca}
              size="lg"
              ariaLabel="Solicitar orçamento via WhatsApp"
            >
              Solicitar Orçamento Gratuito
            </WhatsAppLink>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              Ver portfólio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
