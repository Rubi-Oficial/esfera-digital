import { motion } from "framer-motion";
import { DollarSign, MousePointerClick, TrendingUp, Users } from "lucide-react";
import type { ReferralCode } from "@/lib/referral";

interface MetricsGridProps {
  refCode: ReferralCode;
  totalComissao: number;
}

const MetricsGrid = ({ refCode, totalComissao }: MetricsGridProps) => {
  const metrics = [
    { label: "Cliques", value: refCode.total_clicks, icon: MousePointerClick, color: "text-blue-400" },
    { label: "Leads Gerados", value: refCode.total_leads, icon: Users, color: "text-cyan-400" },
    { label: "Vendas", value: refCode.total_vendas, icon: TrendingUp, color: "text-green-400" },
    { label: "Comissão Total", value: `R$${totalComissao.toFixed(0)}`, icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="bg-card border border-border/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <metric.icon size={18} className={metric.color} />
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
          <p className="text-2xl font-bold font-sora">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsGrid;
