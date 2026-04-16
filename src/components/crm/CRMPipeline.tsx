import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { STAGE_CONFIG, PIPELINE_ORDER, type PipelineStage, type Lead } from "@/lib/crm";
import TempIcon from "./TempIcon";
import { FOLLOWUP_MESSAGES, sendFollowUpWhatsApp } from "./types";

interface CRMPipelineProps {
  grouped: Record<PipelineStage, Lead[]> | undefined;
  onMoveLead: (leadId: string, from: PipelineStage, to: PipelineStage) => void;
  isMoving: boolean;
}

const CRMPipeline = ({ grouped, onMoveLead, isMoving }: CRMPipelineProps) => (
  <div className="overflow-x-auto pb-4">
    <div className="flex gap-4 min-w-max">
      {PIPELINE_ORDER.map((stage) => {
        const config = STAGE_CONFIG[stage];
        const stageLeads: Lead[] = grouped?.[stage] || [];
        return (
          <div key={stage} className="w-72 flex-shrink-0">
            <div className={`rounded-t-xl px-4 py-3 border ${config.color} flex items-center justify-between`}>
              <span className="text-sm font-semibold">{config.emoji} {config.label}</span>
              <span className="text-xs font-mono">{stageLeads.length}</span>
            </div>
            <div className="bg-card/50 border border-t-0 border-border/20 rounded-b-xl p-2 space-y-2 min-h-[200px]">
              {stageLeads.map((lead) => {
                const stageIndex = PIPELINE_ORDER.indexOf(stage);
                const nextStage = stageIndex < PIPELINE_ORDER.length - 2 ? PIPELINE_ORDER[stageIndex + 1] : null;
                return (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-background border border-border/30 rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate">{lead.nome}</span>
                      <TempIcon temp={lead.temperatura} />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>📱 {lead.telefone}</p>
                      {lead.tipo_negocio && <p>🏢 {lead.tipo_negocio}</p>}
                      <p>⭐ Score: {lead.score}</p>
                    </div>
                    {FOLLOWUP_MESSAGES[stage] && (
                      <button
                        onClick={() => sendFollowUpWhatsApp(lead.telefone, stage)}
                        className="w-full text-xs px-2 py-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors flex items-center justify-center gap-1"
                      >
                        <Send size={10} /> Follow-up WhatsApp
                      </button>
                    )}
                    {nextStage && stage !== "convertido" && (
                      <button
                        onClick={() => onMoveLead(lead.id, stage, nextStage)}
                        disabled={isMoving}
                        className="w-full text-xs px-2 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                      >
                        Mover para {STAGE_CONFIG[nextStage].label}
                        <ArrowRight size={12} />
                      </button>
                    )}
                    {stage !== "perdido" && stage !== "convertido" && (
                      <button
                        onClick={() => onMoveLead(lead.id, stage, "perdido")}
                        disabled={isMoving}
                        className="w-full text-xs px-2 py-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Marcar como perdido
                      </button>
                    )}
                  </motion.div>
                );
              })}
              {stageLeads.length === 0 && (
                <div className="py-8 text-center text-xs text-muted-foreground opacity-50">Nenhum lead</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CRMPipeline;
