import { motion } from "framer-motion";
import { Check, Trophy } from "lucide-react";
import { getRankingTiers } from "./data";

interface RankingPanelProps {
  vendas: number;
}

const RankingPanel = ({ vendas }: RankingPanelProps) => {
  const tiers = getRankingTiers(vendas);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-card border border-border/30 rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} className="text-yellow-400" />
        <h2 className="text-sm font-semibold">Ranking & Recompensas</h2>
      </div>
      <div className="space-y-2">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
              tier.achieved ? "bg-primary/10 border-primary/30" : "bg-muted/10 border-border/20"
            }`}
          >
            {tier.achieved ? (
              <Check size={16} className="text-primary shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" />
            )}
            <span className={`text-sm ${tier.achieved ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {tier.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RankingPanel;
