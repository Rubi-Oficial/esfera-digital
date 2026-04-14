// Centralized constants for the Esfera Digital website

export const WHATSAPP_PHONE = "5548991061707";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  specialist: "Olá, gostaria de falar com um especialista",
  presenca: "Olá, quero estruturar minha presença digital",
  vaga: "Olá, quero garantir minha vaga",
  planStart: "Olá, quero garantir o Plano Start",
  planPremium: "Olá, quero o Plano Premium",
  planScale: "Olá, quero o Plano Scale",
  info: "Olá, acessei o site da Esfera Digital e gostaria de mais informações sobre websites que aparecem nas pesquisas do google...",
  conteudos: "Olá, quero receber conteúdos sobre marketing digital",
} as const;

export const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Planos", href: "#planos" },
  { label: "Blog", href: "#blog" },
] as const;

export const FOOTER_LINKS = [
  { label: "Soluções Digitais", href: "#solucoes", title: "Conheça nossas soluções digitais para empresas" },
  { label: "Metodologia", href: "#metodologia", title: "Nossa metodologia estratégica de 5 etapas" },
  { label: "Portfólio", href: "#portfolio", title: "Projetos de sites profissionais desenvolvidos" },
  { label: "Planos e Preços", href: "#planos", title: "Planos de criação de sites a partir de R$ 2.000" },
  { label: "Blog", href: "#blog", title: "Artigos sobre marketing digital e criação de sites" },
  { label: "Depoimentos", href: "#depoimentos", title: "O que nossos clientes dizem sobre nosso trabalho" },
] as const;
