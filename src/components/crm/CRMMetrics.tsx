import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface CRMMetricsProps {
  metrics: Metric[];
}

const CRMMetrics = ({ metrics }: CRMMetricsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {metrics.map((metric, i) => (
      <motion.div
        key={metric.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
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

export default CRMMetrics;
