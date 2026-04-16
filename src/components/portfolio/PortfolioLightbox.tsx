import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { lightboxSlideVariants, type Project } from "./data";

interface PortfolioLightboxProps {
  lightbox: Project | null;
  filtered: Project[];
  lbDirection: number;
  onChangeLightbox: (project: Project | null, direction: number) => void;
  onClose: () => void;
}

const PortfolioLightbox = ({
  lightbox,
  filtered,
  lbDirection,
  onChangeLightbox,
  onClose,
}: PortfolioLightboxProps) => (
  <AnimatePresence>
    {lightbox && (() => {
      const lightboxIndex = filtered.findIndex((p) => p.name === lightbox.name);
      const hasPrev = lightboxIndex > 0;
      const hasNext = lightboxIndex < filtered.length - 1;
      const goPrev = () => { if (hasPrev) onChangeLightbox(filtered[lightboxIndex - 1], -1); };
      const goNext = () => { if (hasNext) onChangeLightbox(filtered[lightboxIndex + 1], 1); };

      return (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "ArrowRight") goNext();
            else if (e.key === "Escape") onClose();
          }}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview de ${lightbox.name}`}
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" aria-hidden="true" />

          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
              aria-label="Projeto anterior"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
              aria-label="Próximo projeto"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <AnimatePresence mode="wait" custom={lbDirection}>
            <motion.div
              key={lightbox.name}
              custom={lbDirection}
              variants={lightboxSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_e, info) => {
                const threshold = 80;
                if (info.offset.x < -threshold && hasNext) goNext();
                else if (info.offset.x > threshold && hasPrev) goPrev();
              }}
              className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="Fechar preview"
              >
                <X size={18} />
              </button>

              <span className="absolute top-4 right-16 z-20 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-muted-foreground border border-border/30">
                {lightboxIndex + 1} / {filtered.length}
              </span>

              <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                <img
                  src={lightbox.img}
                  alt={`Preview do site ${lightbox.name}`}
                  className="w-full h-full object-cover pointer-events-none"
                  width={800}
                  height={512}
                  draggable={false}
                />
                <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md text-sm font-medium text-primary border border-primary/20">
                  {lightbox.cat}
                </span>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{lightbox.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{lightbox.desc}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={lightbox.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Visitar Site
                  </a>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      );
    })()}
  </AnimatePresence>
);

export default PortfolioLightbox;
