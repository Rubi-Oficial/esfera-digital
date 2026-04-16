import { motion } from "framer-motion";
import { Brain, DollarSign, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import type { AIAnalysis } from "./types";

interface CRMAIInsightsProps {
  aiAnalysis: AIAnalysis | null;
  aiLoading: boolean;
  onRefresh: () => void;
}

const CRMAIInsights = ({ aiAnalysis, aiLoading, onRefresh }: CRMAIInsightsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-card border border-primary/20 rounded-xl p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Brain size={20} className="text-primary" />
        <h2 className="text-lg font-semibold font-sora">Inteligência Artificial</h2>
      </div>
      <button
        onClick={onRefresh}
        disabled={aiLoading}
        className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
      >
        {aiLoading ? "Analisando..." : "🔄 Atualizar"}
      </button>
    </div>

    {aiLoading ? (
      <div className="flex items-center gap-3 py-6">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">IA analisando seus dados...</span>
      </div>
    ) : aiAnalysis ? (
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-primary" />
            <span className="text-sm font-medium">Previsão de Faturamento</span>
          </div>
          <p className="text-xl font-bold text-primary">{aiAnalysis.previsao_faturamento}</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span className="text-sm font-medium">Gargalo Principal</span>
          </div>
          <p className="text-sm">{aiAnalysis.gargalo_principal}</p>
        </div>
        <div className="md:col-span-2 bg-muted/10 border border-border/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-yellow-400" />
            <span className="text-sm font-medium">Ações Sugeridas pela IA</span>
          </div>
          <div className="space-y-2">
            {aiAnalysis.acoes_sugeridas.map((acao, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{acao}</span>
              </div>
            ))}
          </div>
        </div>
        {aiAnalysis.insights.length > 0 && (
          <div className="md:col-span-2 space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">💡 Insights</span>
            {aiAnalysis.insights.map((insight, i) => (
              <p key={i} className="text-xs text-muted-foreground">• {insight}</p>
            ))}
          </div>
        )}
      </div>
    ) : (
      <p className="text-sm text-muted-foreground py-4">Capture leads para ativar a análise IA.</p>
    )}
  </motion.div>
);

export default CRMAIInsights;
