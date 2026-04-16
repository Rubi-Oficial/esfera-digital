import { BarChart3, Rocket, Zap, Eye, TrendingUp } from "lucide-react";

export const PROJECT_STAGES = [
  { key: "briefing", label: "Briefing & Planejamento", icon: BarChart3, description: "Entendimento do negócio, objetivos e estratégia", duration: "~3 dias" },
  { key: "design", label: "Design & Protótipo", icon: Rocket, description: "Criação do layout, identidade visual e protótipo navegável", duration: "~5 dias" },
  { key: "development", label: "Desenvolvimento", icon: Zap, description: "Programação, integrações e funcionalidades", duration: "~10 dias" },
  { key: "review", label: "Revisão & Ajustes", icon: Eye, description: "Testes, feedback e refinamentos finais", duration: "~3 dias" },
  { key: "launch", label: "Lançamento", icon: TrendingUp, description: "Deploy, configurações finais e go-live!", duration: "~2 dias" },
];

export const TOTAL_ESTIMATED_DAYS = 23;
