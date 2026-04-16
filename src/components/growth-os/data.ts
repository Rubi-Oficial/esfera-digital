import {
  Clock, AlertCircle, HelpCircle,
  Target, BarChart3, Bot,
  Users, MessageSquare, TrendingUp, DollarSign,
  Smartphone, RefreshCw,
  Zap, Building2,
} from "lucide-react";

export const WA_GROWTH = "Olá! Quero conhecer o Esfera Growth.";
export const WA_STARTER = "Olá! Tenho interesse no plano Site Profissional.";
export const WA_GROWTH_PLAN = "Olá! Tenho interesse no plano Esfera Growth.";
export const WA_GENERIC = "Olá! Gostaria de saber mais sobre o Esfera Growth.";

export const problems = [
  { icon: Clock, text: "Tempo de resposta lento custa vendas", detail: "Estudos mostram que a cada minuto de atraso, a chance de conversão diminui significativamente. A velocidade no atendimento é decisiva." },
  { icon: AlertCircle, text: "Falta de organização no atendimento", detail: "Leads espalhados em conversas sem estrutura levam a oportunidades esquecidas e vendas perdidas." },
  { icon: HelpCircle, text: "Sem visibilidade sobre resultados", detail: "Sem dados claros, é impossível saber quais canais geram retorno e onde otimizar o investimento." },
];

export const solution = [
  { icon: Target, title: "Captação inteligente", desc: "Sites e landing pages estratégicas que convertem visitantes em contatos qualificados de forma contínua." },
  { icon: BarChart3, title: "CRM estruturado", desc: "Pipeline visual que mostra exatamente em que etapa cada lead se encontra no processo comercial." },
  { icon: Bot, title: "Automação com IA", desc: "Atendimento automatizado via WhatsApp que responde, qualifica e agenda — disponível 24 horas." },
];

export const steps = [
  { num: "01", title: "Visitante acessa seu site", desc: "A landing page otimizada captura o contato de forma natural e estratégica." },
  { num: "02", title: "Lead registrado no CRM", desc: "Os dados são organizados automaticamente no pipeline — sem planilhas manuais." },
  { num: "03", title: "Primeiro contato automático", desc: "A IA inicia a conversa no WhatsApp em segundos, enquanto o interesse está no ponto alto." },
  { num: "04", title: "Qualificação inteligente", desc: "O sistema filtra e prioriza os leads com maior potencial de conversão." },
  { num: "05", title: "Conversão acompanhada", desc: "Follow-up automatizado garante que nenhuma oportunidade seja esquecida até o fechamento." },
];

export const dashboardMetrics = [
  { label: "Leads do mês", value: "127", change: "+23%", icon: Users },
  { label: "Conversas iniciadas", value: "89", change: "+18%", icon: MessageSquare },
  { label: "Taxa de resposta", value: "94%", change: "+15%", icon: TrendingUp },
  { label: "Vendas realizadas", value: "18", change: "+31%", icon: DollarSign },
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
    desc: "Presença digital profissional",
    features: [
      "Site profissional (One Page estratégico)",
      "Design moderno e personalizado",
      "Copy estratégica para conversão",
      "Integração com WhatsApp",
      "SEO básico (para aparecer no Google)",
      "Certificado SSL incluso",
      "1 ano de hospedagem incluso",
      "Entrega em até 7 dias úteis",
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
  { icon: Zap, text: "Sem necessidade de equipe técnica" },
  { icon: Clock, text: "Implementação em até 7 dias úteis" },
  { icon: Building2, text: "Adaptado para qualquer segmento" },
];

export const authorityStats = [
  { value: "+87", label: "Empresas atendidas" },
  { value: "89%", label: "Taxa de satisfação" },
  { value: "3x", label: "Mais leads em 90 dias" },
];

export type Plan = (typeof plans)[number];
