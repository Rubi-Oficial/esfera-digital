import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";

const testimonials = [
  {
    name: "Mariana Costa",
    company: "Floripa Decor",
    role: "CEO",
    rating: 5,
    text: "A Esfera Digital transformou completamente nossa presença online. Em 3 meses, triplicamos o número de leads qualificados vindos do Google.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Ricardo Almeida",
    company: "RA Advocacia",
    role: "Sócio-fundador",
    rating: 5,
    text: "Profissionalismo excepcional. O site ficou impecável e já estamos na primeira página do Google para as principais palavras-chave do nosso segmento.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Camila Ferreira",
    company: "Studio Pilates SC",
    role: "Proprietária",
    rating: 5,
    text: "Investimento que se pagou em semanas. O número de agendamentos pelo site cresceu 400%. Recomendo sem hesitar.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Felipe Nascimento",
    company: "FN Engenharia",
    role: "Diretor",
    rating: 5,
    text: "A equipe entendeu perfeitamente o que precisávamos. O site transmite a credibilidade que nossa empresa merece. Resultados acima do esperado.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 25 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  }),
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.8, 1, 0.8, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.8]);

  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setActiveIndex(([prev]) => {
      const next = (prev + newDirection + testimonials.length) % testimonials.length;
      return [next, newDirection];
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const t = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[150px] pointer-events-none" style={{ y: orbY, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <SectionHeader
          label="Depoimentos"
          titleId="testimonials-heading"
          title={<>O que nossos <span className="text-gradient">clientes dizem</span></>}
          subtitle="Resultados reais de empresas que confiaram na Esfera Digital para transformar sua presença online."
        />

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-14 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-14 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={18} />
          </button>

          {/* Card */}
          <div className="relative min-h-[300px] sm:min-h-[280px] md:min-h-[260px] flex items-center px-6 sm:px-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full glass rounded-2xl p-6 sm:p-8 md:p-10 relative group"
              >
                <div className="absolute top-4 right-6 sm:top-6 sm:right-8">
                  <Quote size={32} className="text-primary/10" aria-hidden="true" />
                </div>

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-foreground/90 leading-relaxed mb-6 text-base md:text-lg">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={`Foto de ${t.name}`}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-6" role="tablist" aria-label="Navegar depoimentos">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex([i, i > activeIndex ? 1 : -1])}
                role="tab"
                aria-selected={i === activeIndex}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? "bg-primary w-7"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
