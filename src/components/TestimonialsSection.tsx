import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    text: "Investimento que se pagou em semanas. O número de agendamentos pelo site cresceu 400%. Recomendo de olhos fechados!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Felipe Nascimento",
    company: "FN Engenharia",
    role: "Diretor",
    rating: 5,
    text: "A equipe entendeu perfeitamente o que precisávamos. O site transmite a credibilidade que nossa empresa merece. Resultados impressionantes.",
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
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  }),
};

const TestimonialsSection = () => {
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
      id="depoimentos"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          label="Depoimentos"
          titleId="testimonials-heading"
          title={<>O que nossos <span className="text-primary">clientes dizem</span></>}
          subtitle="Resultados reais de empresas que confiaram na Esfera Digital para transformar sua presença online."
        />

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={18} />
          </button>

          {/* Card */}
          <div className="relative min-h-[280px] md:min-h-[240px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full rounded-2xl border border-border/60 bg-card p-8 md:p-10 relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)] pointer-events-none" />

                <div className="relative z-10">
                  {/* Quote mark */}
                  <span className="absolute -top-2 -left-1 text-5xl text-primary/20 font-serif leading-none select-none" aria-hidden="true">"</span>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-foreground/90 leading-relaxed mb-6 text-base md:text-lg italic">
                    {t.text}
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
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex([i, i > activeIndex ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
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
