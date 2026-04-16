import { BarChart3 } from "lucide-react";
import type { CRMView } from "./types";

const TABS = [
  { key: "dashboard" as const, label: "Dashboard" },
  { key: "pipeline" as const, label: "Pipeline" },
  { key: "indicacoes" as const, label: "Indicações" },
  { key: "projetos" as const, label: "Projetos" },
];

interface CRMHeaderProps {
  view: CRMView;
  onViewChange: (view: CRMView) => void;
}

const CRMHeader = ({ view, onViewChange }: CRMHeaderProps) => (
  <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <BarChart3 size={18} className="text-primary" />
        </div>
        <h1 className="text-lg font-bold font-sora">Esfera Growth CRM</h1>
      </div>
      <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
        {TABS.map((v) => (
          <button
            key={v.key}
            onClick={() => onViewChange(v.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === v.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  </header>
);

export default CRMHeader;
