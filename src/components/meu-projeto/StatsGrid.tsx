import { motion } from "framer-motion";
import { Calendar, Users, CheckCircle2, DollarSign } from "lucide-react";

interface StatsGridProps {
  hasProject: boolean;
  daysSinceStart: number;
  estimatedDaysRemaining: number;
  referralsCount: number;
  pendingCount: number;
  convertedCount: number;
  totalComissao: number;
}

const StatsGrid = ({
  hasProject, daysSinceStart, estimatedDaysRemaining,
  referralsCount, pendingCount, convertedCount, totalComissao,
}: StatsGridProps) => {
  const metrics = [
    { label: "Dias de Projeto", value: hasProject ? daysSinceStart : "—", icon: Calendar, color: "text-blue-400", sub: hasProject ? `~${estimatedDaysRemaining}d restantes` : undefined },
    { label: "Indicações", value: referralsCount, icon: Users, color: "text-cyan-400", sub: pendingCount > 0 ? `${pendingCount} pendentes` : undefined },
    { label: "Convertidas", value: convertedCount, icon: CheckCircle2, color: "text-emerald-400", sub: referralsCount > 0 ? `${Math.round((convertedCount / referralsCount) * 100)}% taxa` : undefined },
    { label: "Comissão", value: `R$${totalComissao.toFixed(0)}`, icon: DollarSign, color: "text-primary", sub: convertedCount > 0 ? `R$${(totalComissao / convertedCount).toFixed(0)}/venda` : undefined },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.05 }}
          className="bg-card border border-border/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <metric.icon size={14} className={metric.color} />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</span>
          </div>
          <p className="text-xl font-bold font-sora">{metric.value}</p>
          {metric.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{metric.sub}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
