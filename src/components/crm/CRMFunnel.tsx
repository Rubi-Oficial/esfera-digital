import { motion } from "framer-motion";
import { STAGE_CONFIG, PIPELINE_ORDER, type PipelineStage, type Lead } from "@/lib/crm";

interface CRMFunnelProps {
  grouped: Record<PipelineStage, Lead[]> | undefined;
}

const CRMFunnel = ({ grouped }: CRMFunnelProps) => {
  const funnelData = PIPELINE_ORDER.filter((s) => s !== "perdido").map((stage) => ({
    stage,
    count: grouped?.[stage]?.length || 0,
    ...STAGE_CONFIG[stage],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-card border border-border/30 rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold font-sora mb-4">Funil de Vendas</h2>
      <div className="space-y-2">
        {funnelData.map((item, i) => {
          const maxCount = Math.max(...funnelData.map((d) => d.count), 1);
          const width = Math.max((item.count / maxCount) * 100, 8);
          return (
            <div key={item.stage} className="flex items-center gap-3">
              <span className="text-xs w-24 text-muted-foreground truncate">{item.emoji} {item.label}</span>
              <div className="flex-1 h-8 bg-muted/20 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                  className={`h-full rounded-lg flex items-center px-3 ${item.color} border`}
                >
                  <span className="text-xs font-medium">{item.count}</span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CRMFunnel;
