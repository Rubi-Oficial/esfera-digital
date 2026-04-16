import {
  Instagram, Globe, Search,
  MessageCircle, Smartphone, CalendarCheck, TrendingUp,
  Send, Code2, Bot, Rocket,
  BarChart3, Target, Zap, Building2, Clock, RefreshCw,
} from "lucide-react";

export const WA_GROWTH = "Olá! Quero conhecer o Esfera Growth.";
export const WA_STARTER = "Olá! Tenho interesse no plano Site Profissional.";
export const WA_GROWTH_PLAN = "Olá! Tenho interesse no plano Esfera Growth.";
export const WA_GENERIC = "Olá! Quero um site profissional que venda por mim.";

// 🟥 Problemas (espelha "A maioria dos pequenos negócios cometem o mesmo erro")
export const problems = [
  {
    icon: Instagram,
    text: "Acredita que Instagram é suficiente",
    detail: "Algoritmos mudam, alcance cai — você não controla essas plataformas.",
  },
  {
    icon: Globe,
    text: "Não tem um site profissional",
    detail: "87% dos consumidores pesquisam online antes de comprar.",
  },
  {
    icon: Search,
    text: "Não aparece no Google",
    detail: "Quem aparece primeiro leva 75% dos cliques.",
  },
];

// 🤖 Solução (espelha "Site completo + I.A. integrada")
export const solution = [
  {
    icon: MessageCircle,
    title: "Responde clientes automaticamente",
    desc: "I.A. integrada que atende, qualifica e responde em tempo real — 24 horas por dia.",
  },
  {
    icon: Smartphone,
    title: "Leva direto pro WhatsApp",
    desc: "Botões, formulários e chatbot que direcionam leads qualificados para seu WhatsApp.",
  },
  {
    icon: CalendarCheck,
    title: "Gera contatos todos os dias",
    desc: "Estrutura de captação com formulários inteligentes e calls-to-action estratégicos.",
  },
  {
    icon: TrendingUp,
    title: "Aumenta sua credibilidade",
    desc: "Design profissional que transmite autoridade e confiança para seus clientes.",
  },
];

// ⚙️ Como Funciona — 4 passos como na página publicada
export const steps = [
  {
    num: "1️⃣",
    title: "Envie informações do seu negócio",
    desc: "Preencha um breve formulário com os dados essenciais da sua empresa.",
  },
  {
    num: "2️⃣",
    title: "Criamos site + design + estrutura de vendas",
    desc: "Nossa equipe desenvolve tudo: copy persuasiva, design moderno e otimização.",
  },
  {
    num: "3️⃣",
    title: "Integramos IA e WhatsApp",
    desc: "Conectamos chatbot inteligente, formulários e botão de WhatsApp.",
  },
  {
    num: "4️⃣",
    title: "Publicamos tudo pronto pra você",
    desc: "Seu site vai ao ar 100% funcional — pronto para gerar clientes.",
  },
];

export const dashboardMetrics = [
  { label: "Leads do mês", value: "127", change: "+23%", icon: Target },
  { label: "Conversas iniciadas", value: "89", change: "+18%", icon: MessageCircle },
  { label: "Taxa de resposta", value: "94%", change: "+15%", icon: TrendingUp },
  { label: "Vendas realizadas", value: "18", change: "+31%", icon: Rocket },
  { label: "Receita estimada", value: "R$ 45K", change: "+28%", icon: BarChart3 },
];

export const features = [
  { icon: Smartphone, title: "Integração com WhatsApp" },
  { icon: BarChart3, title: "CRM com pipeline visual" },
  { icon: Target, title: "Captura automática de leads" },
  { icon: Bot, title: "Respostas automáticas" },
  { icon: RefreshCw, title: "Follow-up automático" },
  { icon: TrendingUp, title: "Relatórios simples" },
];

export const plans = [
  {
    name: "Site Profissional",
    price: "R$ 997",
    priceMonthly: "R$ 97/mês",
    priceOriginal: "R$ 1.500",
    desc: "Ideal para começar",
    features: [
      "Site profissional (One Page estratégico)",
      "Design moderno e personalizado",
      "Copy pronta para vender",
      "Integração com WhatsApp",
      "SEO básico (para aparecer no Google)",
      "Certificado SSL grátis",
      "1 ano de hospedagem incluso",
      "Entrega rápida",
    ],
    wa: WA_STARTER,
    popular: false,
    checkoutLink: "/checkout?prices=site_profissional_implantacao,site_profissional_mensal&plan=Site%20Profissional",
  },
  {
    name: "Esfera Growth",
    price: "R$ 1.997",
    priceMonthly: "R$ 297/mês",
    priceOriginal: "R$ 3.000",
    desc: "Ecossistema completo de crescimento",
    features: [
      "Tudo do plano Site Profissional",
      "Base de Conhecimento Interna exclusiva",
      "Consultoria individual com especialista",
      "Estratégia de captação de clientes",
      "Programa de Parcerias (Indique e Ganhe)",
      "Dashboard de indicações e comissões",
      "Suporte prioritário por 3 meses",
      "Relatórios de performance mensais",
    ],
    wa: WA_GROWTH_PLAN,
    popular: true,
    checkoutLink: "/checkout?prices=esfera_growth_implantacao,esfera_growth_mensal&plan=Esfera%20Growth",
  },
];

export const trustBadges = [
  { icon: Zap, text: "Sem complicação" },
  { icon: Clock, text: "Sem depender de redes sociais" },
  { icon: Building2, text: "Pronto para gerar clientes" },
];

export const authorityStats = [
  { value: "+87", label: "Empresas atendidas" },
  { value: "89%", label: "Taxa de satisfação" },
  { value: "3x", label: "Mais leads em 90 dias" },
];

export type Plan = (typeof plans)[number];

// re-export icon usado pelo Steps no padrão antigo (mantém compat se algo importar)
export const _StepIcons = { Send, Code2, Bot, Rocket };
