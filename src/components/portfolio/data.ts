import imgPousada from "@/assets/portfolio/pousada-rosa.webp";
import imgHemptech from "@/assets/portfolio/hemptech.webp";
import imgMultiply from "@/assets/portfolio/multiply.webp";
import imgSteel from "@/assets/portfolio/steelps.webp";
import imgMetalmilk from "@/assets/portfolio/metalmilk.webp";
import imgFrigorifico from "@/assets/portfolio/frigorifico.webp";
import imgRsmetais from "@/assets/portfolio/rsmetais.webp";
import imgInterforte from "@/assets/portfolio/interforte.webp";
import imgTimoneiro from "@/assets/portfolio/timoneiro.webp";
import imgTerrasol from "@/assets/portfolio/terrasol.webp";
import imgStarklar from "@/assets/portfolio/starklar.webp";
import imgNobile from "@/assets/portfolio/nobile.webp";
import imgAtelier from "@/assets/portfolio/atelier.webp";
import imgRodalivre from "@/assets/portfolio/rodalivre.webp";
import imgLeduc from "@/assets/portfolio/leduc.webp";
import imgRubi from "@/assets/portfolio/rubi.webp";
import imgAutoajuda from "@/assets/portfolio/autoajuda.webp";
import imgNutri from "@/assets/portfolio/nutri.webp";

export type Project = {
  name: string;
  cat: string;
  desc: string;
  img: string;
  url: string;
};

export const ITEMS_PER_PAGE = 6;

export const categories = [
  "Todos",
  "Indústria",
  "Agronegócio",
  "Hotelaria",
  "Design",
  "Tecnologia",
  "Serviços",
  "Marketing",
  "Automotivo",
];

export const projects: Project[] = [
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

export const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export const lightboxSlideVariants = {
  enter: (d: number) => ({ x: d >= 0 ? 250 : -250, opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d >= 0 ? -250 : 250, opacity: 0, scale: 0.92 }),
};
