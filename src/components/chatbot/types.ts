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
  | "finalizar";

export const BOT_NAME = "Genius AI";

export const INTERESSE_OPTIONS = [
  "Site Básico (1 página)",
  "Site Intermediário (até 10 páginas)",
  "Site Avançado (até 50 páginas + blog)",
  "Ainda não sei, quero conversar",
];

export const URGENCIA_OPTIONS = [
  "Preciso para ontem! 🔥",
  "Nas próximas semanas",
  "Estou pesquisando ainda",
];
