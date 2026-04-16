import type { LucideIcon } from "lucide-react";
import { Globe, Rocket, Crown } from "lucide-react";

export type PlanOption = {
  id: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  features: string[];
  highlight?: boolean;
  implantacao: { priceId: string; amount: number };
  mensal: { priceId: string; amount: number };
};

export const CHECKOUT_PLANS: PlanOption[] = [
  {
    id: "site_profissional",
    name: "Site Profissional",
    icon: Globe,
    tagline: "Presença digital essencial",
    features: ["Site profissional", "Design personalizado", "Integração WhatsApp", "SEO básico"],
    implantacao: { priceId: "site_profissional_implantacao", amount: 997 },
    mensal: { priceId: "site_profissional_mensal", amount: 97 },
  },
  {
    id: "esfera_growth",
    name: "Esfera Growth",
    icon: Rocket,
    tagline: "Ecossistema de crescimento",
    features: ["Tudo do Site Profissional", "Consultoria individual", "Programa de indicações", "Dashboard Growth"],
    highlight: true,
    implantacao: { priceId: "esfera_growth_implantacao", amount: 1997 },
    mensal: { priceId: "esfera_growth_mensal", amount: 297 },
  },
  {
    id: "esfera_scale",
    name: "Esfera Scale",
    icon: Crown,
    tagline: "Escala e automação avançada",
    features: ["Tudo do Esfera Growth", "Automações avançadas", "Suporte prioritário", "Estratégia dedicada"],
    implantacao: { priceId: "esfera_scale_implantacao", amount: 3997 },
    mensal: { priceId: "esfera_scale_mensal", amount: 597 },
  },
];

export type ChargeMode = "implantacao" | "mensal";

export const CHARGE_LABELS: Record<ChargeMode, { label: string; sub: string }> = {
  implantacao: { label: "Implantação", sub: "Pagamento único" },
  mensal: { label: "Mensalidade", sub: "Recorrente mensal" },
};
