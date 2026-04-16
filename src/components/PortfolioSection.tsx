import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PortfolioFilters from "./portfolio/PortfolioFilters";
import PortfolioGrid from "./portfolio/PortfolioGrid";
import PortfolioPagination from "./portfolio/PortfolioPagination";
import PortfolioLightbox from "./portfolio/PortfolioLightbox";
import { useCarousel } from "./portfolio/useCarousel";
import { projects, ITEMS_PER_PAGE, type Project } from "./portfolio/data";

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [lbDirection, setLbDirection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const { page, direction, goToPage, nextPage, prevPage, pauseAutoPlay, resumeAutoPlay, resetPage } =
    useCarousel(totalPages);

  const currentItems = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    resetPage();
  };

  const handleSelectProject = (project: Project) => {
    pauseAutoPlay();
    setLightbox(project);
  };

  const handleCloseLightbox = () => {
    setLightbox(null);
    resumeAutoPlay();
  };

  const handleChangeLightbox = (project: Project | null, dir: number) => {
    setLbDirection(dir);
    setLightbox(project);
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden" aria-label="Portfólio de projetos">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">Portfólio</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Projetos que <span className="text-gradient">Geraram Resultados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            +87 sites entregues para empresas de diversos segmentos. Navegue pelos nossos cases de sucesso.
          </p>
        </motion.div>

        <PortfolioFilters active={active} onChange={handleCategoryChange} />

        <div ref={scrollRef} className="relative" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay}>
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextPage}
                className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                aria-label="Próxima página"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <PortfolioGrid
            items={currentItems}
            active={active}
            page={page}
            direction={direction}
            onSelect={handleSelectProject}
          />

          <PortfolioPagination page={page} totalPages={totalPages} onGoToPage={goToPage} />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Mostrando {currentItems.length} de {filtered.length} projetos
          {active !== "Todos" && <> em <span className="text-primary font-medium">{active}</span></>}
        </p>
      </div>

      <PortfolioLightbox
        lightbox={lightbox}
        filtered={filtered}
        lbDirection={lbDirection}
        onChangeLightbox={handleChangeLightbox}
        onClose={handleCloseLightbox}
      />
    </section>
  );
};

export default PortfolioSection;
