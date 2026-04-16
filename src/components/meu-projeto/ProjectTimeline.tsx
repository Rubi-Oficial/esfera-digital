import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { PROJECT_STAGES } from "./data";

interface ProjectTimelineProps {
  currentStageIndex: number;
}

const ProjectTimeline = ({ currentStageIndex }: ProjectTimelineProps) => (
  <div className="relative">
    {PROJECT_STAGES.map((stage, i) => {
      const isDone = i < currentStageIndex;
      const isCurrent = i === currentStageIndex;
      const isLast = i === PROJECT_STAGES.length - 1;
      return (
        <div key={stage.key} className="relative flex gap-4">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isDone
                  ? "bg-primary/20 border-2 border-primary"
                  : isCurrent
                  ? "bg-primary/10 border-2 border-primary animate-pulse"
                  : "bg-muted/20 border border-border/50"
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={16} className="text-primary" />
              ) : (
                <stage.icon size={14} className={isCurrent ? "text-primary" : "text-muted-foreground/40"} />
              )}
            </motion.div>
            {!isLast && (
              <div className={`w-0.5 flex-1 min-h-[24px] ${isDone ? "bg-primary/40" : "bg-border/30"}`} />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`pb-5 flex-1 ${!isCurrent && !isDone ? "opacity-40" : ""}`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-medium ${
                isCurrent ? "text-foreground" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"
              }`}>
                {stage.label}
              </span>
              {isCurrent && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold">
                  Em andamento
                </span>
              )}
              {isDone && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  Concluído ✓
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
            <span className="text-[10px] text-muted-foreground/60 mt-1 inline-flex items-center gap-1">
              <Clock size={10} /> {stage.duration}
            </span>
          </motion.div>
        </div>
      );
    })}
  </div>
);

export default ProjectTimeline;
