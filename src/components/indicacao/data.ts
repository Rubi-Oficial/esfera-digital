export const SHARE_MESSAGE = (link: string) =>
  `Estou usando um sistema que está trazendo clientes automaticamente pro meu negócio. Se quiser ver como funciona: ${link}`;

export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  converted: { label: "Convertido", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  paid: { label: "Pago", color: "bg-primary/20 text-primary border-primary/30" },
  expired: { label: "Expirado", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export const HOW_IT_WORKS_STEPS = [
  { num: "1", text: "Você recebe um link exclusivo" },
  { num: "2", text: "Compartilhe com amigos e contatos" },
  { num: "3", text: "Quando alguém comprar, você ganha R$100" },
  { num: "4", text: "Acompanhe tudo aqui no dashboard" },
];

export function getNivel(vendas: number): string {
  if (vendas >= 10) return "🏆 Embaixador";
  if (vendas >= 5) return "⭐ Parceiro";
  if (vendas >= 3) return "🔥 Indicador";
  return "🌱 Iniciante";
}

export function getRankingTiers(vendas: number) {
  return [
    { vendas: 3, label: "3 vendas → Bônus especial", achieved: vendas >= 3 },
    { vendas: 5, label: "5 vendas → Upgrade de comissão", achieved: vendas >= 5 },
    { vendas: 10, label: "10 vendas → Comissão premium + título Embaixador", achieved: vendas >= 10 },
  ];
}
