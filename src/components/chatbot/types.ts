export type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
};

export type LeadData = {
  nome: string;
  telefone: string;
  interesse: string;
  tipoNegocio: string;
  urgencia: string;
  objetivo: string;
};

export type Step =
  | "greeting"
  | "nome"
  | "telefone"
  | "interesse"
  | "tipoNegocio"
  | "urgencia"
  | "objetivo"
  | "planos"
  | "finalizar";

export const BOT_NAME = "Genius AI";

export const INTERESSE_OPTIONS = [
  "Criação de Site",
  "Loja Virtual",
  "Landing Page",
  "Site com IA",
  "Reformular site existente",
];

export const URGENCIA_OPTIONS = [
  "Preciso para ontem! 🔥",
  "Nas próximas semanas",
  "Estou pesquisando ainda",
];

export const PLANO_OPTIONS = [
  "🚀 Esfera Growth — R$ 1.997",
  "⚡ Site Profissional — R$ 997",
];
