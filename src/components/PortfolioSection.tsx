import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["Todos", "Indústria", "Agronegócio", "Hotelaria", "Design", "Tecnologia", "Serviços", "Marketing", "Automotivo"];

const projects = [
  { name: "Pousada Rosa Paradise", cat: "Hotelaria", desc: "Portal completo com booking engine na Praia do Rosa.", img: "https://pousadarosaparadise.com.br/hero-praia-rosa-paradise.png", url: "https://pousadarosaparadise.com.br/" },
  { name: "Hemp Tech", cat: "Tecnologia", desc: "E-commerce de genética premium com loja integrada.", img: "https://image.thum.io/get/width/600/crop/400/https://www.hemptech.com.br/", url: "https://www.hemptech.com.br/" },
  { name: "Multiply Group", cat: "Tecnologia", desc: "Plataforma de investimentos com dashboard interativo.", img: "https://image.thum.io/get/width/600/crop/400/https://multilple-mvp.vercel.app", url: "https://multilple-mvp.vercel.app" },
  { name: "Steel PS", cat: "Indústria", desc: "Portal de produtos siderúrgicos de alta performance.", img: "https://image.thum.io/get/width/600/crop/400/https://www.steelps.com.br/", url: "https://www.steelps.com.br/" },
  { name: "MetalMilk", cat: "Indústria", desc: "Soluções em refrigeração industrial para o setor lácteo.", img: "https://image.thum.io/get/width/600/crop/400/https://metalmilk.com.br/", url: "https://metalmilk.com.br/" },
  { name: "Frigorífico Vale do Oeste", cat: "Indústria", desc: "Site industrial com catálogo e certificações de qualidade.", img: "https://image.thum.io/get/width/600/crop/400/https://www.frigorificovaledooeste.com.br/", url: "https://www.frigorificovaledooeste.com.br/" },
  { name: "RS Metais", cat: "Indústria", desc: "Comércio de metais ferrosos e não-ferrosos.", img: "https://image.thum.io/get/width/600/crop/400/https://rsmetais.ind.br", url: "https://rsmetais.ind.br" },
  { name: "Interforte Agro", cat: "Agronegócio", desc: "Implementos agrícolas e rodoviários de alta qualidade.", img: "https://image.thum.io/get/width/600/crop/400/https://interforteagro.com.br/", url: "https://interforteagro.com.br/" },
  { name: "Agrícola Timoneiro", cat: "Agronegócio", desc: "Soluções completas para o campo brasileiro.", img: "https://image.thum.io/get/width/600/crop/400/https://www.agricolatimoneiro.com.br", url: "https://www.agricolatimoneiro.com.br" },
  { name: "Terra Sol Madeireira", cat: "Indústria", desc: "Madeireira premium com catálogo de produtos.", img: "https://image.thum.io/get/width/600/crop/400/https://terrasol.com.br/", url: "https://terrasol.com.br/" },
  { name: "Stark Lar Transportes", cat: "Serviços", desc: "Transporte e logística com frota rastreada.", img: "https://image.thum.io/get/width/600/crop/400/https://starklartransportes.com.br/", url: "https://starklartransportes.com.br/" },
  { name: "Nobile Premium", cat: "Design", desc: "Móveis de alta decoração com design contemporâneo.", img: "https://image.thum.io/get/width/600/crop/400/https://nobilepremium.com.br", url: "https://nobilepremium.com.br" },
  { name: "Atelier Casa e Jardim", cat: "Design", desc: "Móveis artesanais exclusivos com materiais naturais.", img: "https://image.thum.io/get/width/600/crop/400/https://www.ateliercasaejardim.com.br/", url: "https://www.ateliercasaejardim.com.br/" },
  { name: "Roda Livre Rental Car", cat: "Automotivo", desc: "Aluguel de veículos elétricos BYD, Geely e Alma.", img: "https://image.thum.io/get/width/600/crop/400/https://v0-roda-livre-rental-car.vercel.app", url: "https://v0-roda-livre-rental-car.vercel.app" },
  { name: "Leduc Filho Advogados", cat: "Serviços", desc: "Website de escritório de advocacia profissional.", img: "https://image.thum.io/get/width/600/crop/400/https://leducfilho.com/", url: "https://leducfilho.com/" },
  { name: "Rubi Agency", cat: "Marketing", desc: "Agência de marketing digital com estratégias criativas.", img: "https://image.thum.io/get/width/600/crop/400/https://www.rubiagency.com.br", url: "https://www.rubiagency.com.br" },
  { name: "AutoAjuda Pro", cat: "Tecnologia", desc: "Plataforma de IA especializada em desenvolvimento pessoal.", img: "https://image.thum.io/get/width/600/crop/400/https://autoajudapro.com/", url: "https://autoajudapro.com/" },
  { name: "Gestão Nutri Escolar", cat: "Tecnologia", desc: "Sistema de nutrição escolar com pedidos online.", img: "https://image.thum.io/get/width/600/crop/400/https://gestao-nutri-escolar.vercel.app", url: "https://gestao-nutri-escolar.vercel.app" },
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
                  <motion.a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group block rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-500"
                    role="listitem"
                    aria-label={`${project.name} - ${project.desc}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <PortfolioImage src={project.img} alt={project.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                          <ExternalLink size={14} aria-hidden="true" /> Visitar Site
                        </span>
                      </div>
                      {/* Category badge */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-primary border border-primary/20">
                        {project.cat}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                    </div>
                  </motion.a>
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
    </section>
  );
};

export default PortfolioSection;
