import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, X } from "lucide-react";
import { STAGE_CONFIG, PIPELINE_ORDER, TEMP_CONFIG, type PipelineStage, type LeadTemperature } from "@/lib/crm";

interface CRMFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  tempFilter: LeadTemperature | "all";
  onTempFilterChange: (t: LeadTemperature | "all") => void;
  stageFilter: PipelineStage | "all";
  onStageFilterChange: (s: PipelineStage | "all") => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeFilters: number;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
  onExport: () => void;
}

const CRMFilters = ({
  searchQuery, onSearchChange,
  tempFilter, onTempFilterChange,
  stageFilter, onStageFilterChange,
  showFilters, onToggleFilters,
  activeFilters, filteredCount, totalCount,
  onClearFilters, onExport,
}: CRMFiltersProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card border border-border/30 rounded-xl p-4"
  >
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Buscar por nome, telefone ou negócio..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-background border border-border/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X size={14} />
          </button>
        )}
      </div>
      <button
        onClick={onToggleFilters}
        className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border transition-colors ${
          activeFilters > 0 ? "bg-primary/10 border-primary/30 text-primary" : "border-border/50 text-muted-foreground hover:text-foreground"
        }`}
      >
        <Filter size={14} />
        Filtros
        {activeFilters > 0 && (
          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{activeFilters}</span>
        )}
      </button>
      <button
        onClick={onExport}
        disabled={filteredCount === 0}
        className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors disabled:opacity-40"
      >
        <Download size={14} />
        Exportar CSV
      </button>
    </div>

    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border/20 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Temperatura</label>
              <div className="flex gap-1">
                {(["all", "frio", "morno", "quente"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => onTempFilterChange(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      tempFilter === t ? "bg-primary/20 border-primary/40 text-primary" : "border-border/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "all" ? "Todos" : `${TEMP_CONFIG[t].emoji} ${TEMP_CONFIG[t].label}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Etapa</label>
              <select
                value={stageFilter}
                onChange={(e) => onStageFilterChange(e.target.value as PipelineStage | "all")}
                className="bg-background border border-border/50 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option value="all">Todas as etapas</option>
                {PIPELINE_ORDER.map((s) => (
                  <option key={s} value={s}>{STAGE_CONFIG[s].emoji} {STAGE_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            {activeFilters > 0 && (
              <div className="flex items-end">
                <button
                  onClick={onClearFilters}
                  className="text-xs px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {activeFilters > 0 && (
      <p className="text-xs text-muted-foreground mt-3">
        Mostrando {filteredCount} de {totalCount} leads
      </p>
    )}
  </motion.div>
);

export default CRMFilters;
