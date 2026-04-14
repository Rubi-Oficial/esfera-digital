import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, X, Maximize2, Eye } from "lucide-react";

import imgPousada from "@/assets/portfolio/pousada-rosa.jpg";
import imgHemptech from "@/assets/portfolio/hemptech.jpg";
import imgMultiply from "@/assets/portfolio/multiply.jpg";
import imgSteel from "@/assets/portfolio/steelps.jpg";
import imgMetalmilk from "@/assets/portfolio/metalmilk.jpg";
import imgFrigorifico from "@/assets/portfolio/frigorifico.jpg";
import imgRsmetais from "@/assets/portfolio/rsmetais.jpg";
import imgInterforte from "@/assets/portfolio/interforte.jpg";
import imgTimoneiro from "@/assets/portfolio/timoneiro.jpg";
import imgTerrasol from "@/assets/portfolio/terrasol.jpg";
import imgStarklar from "@/assets/portfolio/starklar.jpg";
import imgNobile from "@/assets/portfolio/nobile.jpg";
import imgAtelier from "@/assets/portfolio/atelier.jpg";
import imgRodalivre from "@/assets/portfolio/rodalivre.jpg";
import imgLeduc from "@/assets/portfolio/leduc.jpg";
import imgRubi from "@/assets/portfolio/rubi.jpg";
import imgAutoajuda from "@/assets/portfolio/autoajuda.jpg";
import imgNutri from "@/assets/portfolio/nutri.jpg";

const categories = ["Todos", "Indústria", "Agronegócio", "Hotelaria", "Design", "Tecnologia", "Serviços", "Marketing", "Automotivo"];

const projects = [
  { name: "Pousada Rosa Paradise", cat: "Hotelaria", desc: "Portal completo com booking engine na Praia do Rosa.", img: imgPousada, url: "https://pousadarosaparadise.com.br/" },
  { name: "Hemp Tech", cat: "Tecnologia", desc: "E-commerce de genética premium com loja integrada.", img: imgHemptech, url: "https://www.hemptech.com.br/" },
  { name: "Multiply Group", cat: "Tecnologia", desc: "Plataforma de investimentos com dashboard interativo.", img: imgMultiply, url: "https://multilple-mvp.vercel.app" },
  { name: "Steel PS", cat: "Indústria", desc: "Portal de produtos siderúrgicos de alta performance.", img: imgSteel, url: "https://www.steelps.com.br/" },
  { name: "MetalMilk", cat: "Indústria", desc: "Soluções em refrigeração industrial para o setor lácteo.", img: imgMetalmilk, url: "https://metalmilk.com.br/" },
  { name: "Frigorífico Vale do Oeste", cat: "Indústria", desc: "Site industrial com catálogo e certificações de qualidade.", img: imgFrigorifico, url: "https://www.frigorificovaledooeste.com.br/" },
  { name: "RS Metais", cat: "Indústria", desc: "Comércio de metais ferrosos e não-ferrosos.", img: imgRsmetais, url: "https://rsmetais.ind.br" },
  { name: "Interforte Agro", cat: "Agronegócio", desc: "Implementos agrícolas e rodoviários de alta qualidade.", img: imgInterforte, url: "https://interforteagro.com.br/" },
  { name: "Agrícola Timoneiro", cat: "Agronegócio", desc: "Soluções completas para o campo brasileiro.", img: imgTimoneiro, url: "https://www.agricolatimoneiro.com.br" },
  { name: "Terra Sol Madeireira", cat: "Indústria", desc: "Madeireira premium com catálogo de produtos.", img: imgTerrasol, url: "https://terrasol.com.br/" },
  { name: "Stark Lar Transportes", cat: "Serviços", desc: "Transporte e logística com frota rastreada.", img: imgStarklar, url: "https://starklartransportes.com.br/" },
  { name: "Nobile Premium", cat: "Design", desc: "Móveis de alta decoração com design contemporâneo.", img: imgNobile, url: "https://nobilepremium.com.br" },
  { name: "Atelier Casa e Jardim", cat: "Design", desc: "Móveis artesanais exclusivos com materiais naturais.", img: imgAtelier, url: "https://www.ateliercasaejardim.com.br/" },
  { name: "Roda Livre Rental Car", cat: "Automotivo", desc: "Aluguel de veículos elétricos BYD, Geely e Alma.", img: imgRodalivre, url: "https://v0-roda-livre-rental-car.vercel.app" },
  { name: "Leduc Filho Advogados", cat: "Serviços", desc: "Website de escritório de advocacia profissional.", img: imgLeduc, url: "https://leducfilho.com/" },
  { name: "Rubi Agency", cat: "Marketing", desc: "Agência de marketing digital com estratégias criativas.", img: imgRubi, url: "https://www.rubiagency.com.br" },
  { name: "AutoAjuda Pro", cat: "Tecnologia", desc: "Plataforma de IA especializada em desenvolvimento pessoal.", img: imgAutoajuda, url: "https://autoajudapro.com/" },
  { name: "Gestão Nutri Escolar", cat: "Tecnologia", desc: "Sistema de nutrição escolar com pedidos online.", img: imgNutri, url: "https://gestao-nutri-escolar.vercel.app" },
];

const PortfolioImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-sm font-medium">
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Site ${alt} - projeto desenvolvido pela Esfera Soluções Digitais`}
      loading="lazy"
      width="600"
      height="400"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      onError={() => setFailed(true)}
    />
  );
};

const ITEMS_PER_PAGE = 6;

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState<typeof projects[number] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setPage(0);
    setDirection(0);
  };

  const goToPage = useCallback((newPage: number, dir: number) => {
    setDirection(dir);
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (totalPages <= 1) return;
    goToPage((page + 1) % totalPages, 1);
  }, [page, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (totalPages <= 1) return;
    goToPage((page - 1 + totalPages) % totalPages, -1);
  }, [page, totalPages, goToPage]);

  // Auto-play
  useEffect(() => {
    if (totalPages <= 1) return;
    autoPlayRef.current = setInterval(nextPage, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextPage, totalPages]);

  // Pause on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (totalPages <= 1) return;
    autoPlayRef.current = setInterval(nextPage, 6000);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
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

        {/* Category filters */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          aria-label="Filtrar por categoria"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.nav>

        {/* Carousel area */}
        <div
          ref={scrollRef}
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation arrows */}
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

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${active}-${page}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                role="list"
              >
                {currentItems.map((project) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => { pauseAutoPlay(); setLightbox(project); }}
                    className="group block rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-500 cursor-pointer"
                    role="listitem"
                    aria-label={`${project.name} - ${project.desc}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <PortfolioImage src={project.img} alt={project.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                          <Eye size={14} aria-hidden="true" /> Ver Preview
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-primary border border-primary/20">
                        {project.cat}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i, i > page ? 1 : -1)}
                  aria-label={`Ir para página ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
              <span className="ml-4 text-xs text-muted-foreground">
                {page + 1} / {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Counter */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Mostrando {currentItems.length} de {filtered.length} projetos
          {active !== "Todos" && <> em <span className="text-primary font-medium">{active}</span></>}
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (() => {
          const lightboxIndex = filtered.findIndex((p) => p.name === lightbox.name);
          const hasPrev = lightboxIndex > 0;
          const hasNext = lightboxIndex < filtered.length - 1;
          const goPrev = () => { if (hasPrev) setLightbox(filtered[lightboxIndex - 1]); };
          const goNext = () => { if (hasNext) setLightbox(filtered[lightboxIndex + 1]); };

          let touchStartX = 0;
          let touchStartY = 0;

          const handleTouchStart = (e: React.TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
          };

          const handleTouchEnd = (e: React.TouchEvent) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              if (dx < 0) goNext();
              else goPrev();
            }
          };

          return (
            <motion.div
              key="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
              onClick={() => { setLightbox(null); resumeAutoPlay(); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") goPrev();
                else if (e.key === "ArrowRight") goNext();
                else if (e.key === "Escape") { setLightbox(null); resumeAutoPlay(); }
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              role="dialog"
              aria-modal="true"
              aria-label={`Preview de ${lightbox.name}`}
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" aria-hidden="true" />

              {/* Prev arrow */}
              {hasPrev && (
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                  aria-label="Projeto anterior"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Next arrow */}
              {hasNext && (
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                  aria-label="Próximo projeto"
                >
                  <ChevronRight size={22} />
                </button>
              )}

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.name}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => { setLightbox(null); resumeAutoPlay(); }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                    aria-label="Fechar preview"
                  >
                    <X size={18} />
                  </button>

                  {/* Counter */}
                  <span className="absolute top-4 right-16 z-20 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-muted-foreground border border-border/30">
                    {lightboxIndex + 1} / {filtered.length}
                  </span>

                  <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                    <img
                      src={lightbox.img}
                      alt={`Preview do site ${lightbox.name}`}
                      className="w-full h-full object-cover"
                      width={800}
                      height={512}
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
                        onClick={() => { setLightbox(null); resumeAutoPlay(); }}
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
    </section>
  );
};

export default PortfolioSection;
