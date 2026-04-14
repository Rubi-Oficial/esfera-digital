import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const categories = ["Todos", "Imóveis", "Hotelaria", "Indústria", "Agronegócio", "Tecnologia", "Serviços", "Design"];

const projects = [
  { name: "Terrasol Imóveis", cat: "Imóveis", desc: "Site imobiliário premium com sistema de busca avançada.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/terrasol-preview.jpg", url: "#" },
  { name: "Pousada Toca da Lagoa", cat: "Hotelaria", desc: "Website com sistema de reservas online e galeria.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/pousada-toca-preview.jpg", url: "#" },
  { name: "Pousada Rosa Paradise", cat: "Hotelaria", desc: "Portal completo com booking engine e tours virtuais.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/rosa-paradise-preview.jpg", url: "#" },
  { name: "Multilple", cat: "Tecnologia", desc: "Plataforma SaaS moderna com dashboard interativo.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/multilple-preview.jpg", url: "#" },
  { name: "Agrícola Timoneiro", cat: "Agronegócio", desc: "Portal agrícola com catálogo e e-commerce.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/agricola-preview.jpg", url: "#" },
  { name: "Nobile Premium", cat: "Imóveis", desc: "Website de construtora premium com portfólio de projetos.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/nobile-preview.jpg", url: "#" },
  { name: "Frigorífico Vale do Oeste", cat: "Indústria", desc: "Site industrial com catálogo e certificações.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/frigorifico-preview.jpg", url: "#" },
  { name: "RS Metais", cat: "Indústria", desc: "Site industrial com catálogo técnico de produtos.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/rsmetais-preview.jpg", url: "#" },
  { name: "Atelier Casa e Jardim", cat: "Design", desc: "Website de design de interiores com galeria de projetos.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/atelier-preview.jpg", url: "#" },
  { name: "Leduc Filho Advogados", cat: "Serviços", desc: "Website de escritório de advocacia profissional.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/leduc-preview.jpg", url: "#" },
  { name: "Funerária Garopaba", cat: "Serviços", desc: "Site institucional com memorial online e contato direto.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/funeraria-preview.jpg", url: "#" },
  { name: "Steel PS", cat: "Indústria", desc: "Portal de indústria siderúrgica com produtos em aço.", img: "https://v0-esfera-solucoes-web.vercel.app/portfolio/steelps-preview.jpg", url: "#" },
];

const PortfolioImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          const fallback = document.createElement("div");
          fallback.className = "w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-sm font-medium";
          fallback.textContent = alt;
          parent.prepend(fallback);
        }
      }}
    />
  );
};

const PortfolioSection = () => {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="portfolio" className="py-24">
      <div className="container px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Projetos que <span className="text-gradient">Geraram Resultados</span>
          </h2>
          <p className="text-muted-foreground text-lg">Sites desenvolvidos para empresas de diversos segmentos.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-xl overflow-hidden group block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <PortfolioImage src={project.img} alt={project.name} />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <ExternalLink size={16} /> Visitar Site
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{project.cat}</span>
                  <h3 className="font-bold mt-1 mb-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
