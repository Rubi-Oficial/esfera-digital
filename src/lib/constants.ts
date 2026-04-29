// Centralized constants for the Esfera Digital website

export const WHATSAPP_PHONE = "5548991061707";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  specialist: "Olá, gostaria de falar com um especialista",
  presenca: "Olá, quero um site com IA para o meu negócio!",
  vaga: "Olá, quero garantir minha vaga",
  planStart: "Olá, quero meu site profissional por R$ 997!",
  planPremium: "Olá, quero o Plano Premium",
  planScale: "Olá, quero o Plano Scale",
  info: "Olá, acessei o site da Esfera Digital e gostaria de mais informações sobre websites que aparecem nas pesquisas do google...",
  conteudos: "Olá, quero receber conteúdos sobre marketing digital",
} as const;

export const NAV_LINKS = [
  { label: "O Problema", href: "#solucoes" },
  { label: "Como Funciona", href: "#metodologia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Oferta", href: "#planos" },
  { label: "Blog", href: "/blog" },
  { label: "Dicas", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Start Esfera Growth", href: "/growth-os", isSpecial: true },
] as const;

export const FOOTER_LINKS = [
  { label: "O Problema", href: "/#solucoes", title: "Por que você precisa de um site profissional" },
  { label: "Como Funciona", href: "/#metodologia", title: "Nosso processo simples em 4 passos" },
  { label: "Portfólio", href: "/#portfolio", title: "Projetos reais que geraram resultados" },
  { label: "Oferta Especial", href: "/#planos", title: "Site profissional completo a partir de R$ 997" },
  { label: "Blog", href: "/blog", title: "Artigos sobre marketing digital e criação de sites" },
  { label: "Depoimentos", href: "/#depoimentos", title: "O que nossos clientes dizem sobre nosso trabalho" },
] as const;
