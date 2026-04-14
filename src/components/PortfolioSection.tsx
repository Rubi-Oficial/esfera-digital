import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
