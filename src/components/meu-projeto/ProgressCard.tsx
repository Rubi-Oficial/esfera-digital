import { motion } from "framer-motion";
import { Rocket, MessageSquare } from "lucide-react";
import ProjectTimeline from "./ProjectTimeline";

interface ProgressCardProps {
  progressPercent: number;
  currentStageIndex: number;
  notes?: string | null;
}

const ProgressCard = ({ progressPercent, currentStageIndex, notes }: ProgressCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-card border border-border/30 rounded-xl p-5"
  >
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <Rocket size={18} className="text-primary" />
        <h2 className="text-sm font-semibold">Progresso do Projeto</h2>
      </div>
      <span className="text-xs font-bold text-primary">{Math.round(progressPercent)}%</span>
    </div>

    <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden mb-2 mt-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)))",
        }}
      />
    </div>

    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-5">
      <span>Início</span>
      <span>Conclusão</span>
    </div>

    {notes && (
      <div className="mb-5 bg-primary/5 border border-primary/10 rounded-lg px-4 py-3 flex items-start gap-2">
        <MessageSquare size={14} className="text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">{notes}</p>
      </div>
    )}

    <ProjectTimeline currentStageIndex={currentStageIndex} />
  </motion.div>
);

export default ProgressCard;
