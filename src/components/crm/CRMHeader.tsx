import { BarChart3, Sparkles } from "lucide-react";
import type { CRMView } from "./types";

const TABS = [
  { key: "dashboard" as const, label: "Dashboard" },
  { key: "pipeline" as const, label: "Pipeline" },
  { key: "indicacoes" as const, label: "Indicações" },
  { key: "projetos" as const, label: "Projetos" },
  { key: "roles" as const, label: "Roles" },
];

interface CRMHeaderProps {
  view: CRMView;
  onViewChange: (view: CRMView) => void;
}

const CRMHeader = ({ view, onViewChange }: CRMHeaderProps) => (
  <header className="sticky top-16 md:top-[72px] z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
    <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center ring-1 ring-primary/20">
          <BarChart3 size={18} className="text-primary" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-pulse" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-base md:text-lg font-bold font-heading tracking-tight">Esfera Growth CRM</h1>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 flex items-center gap-1">
            <Sparkles size={9} className="text-primary/70" />
            Painel administrativo
          </span>
        </div>
      </div>
      <nav className="flex gap-0.5 bg-muted/30 rounded-lg p-1 border border-border/30 overflow-x-auto custom-scrollbar">
        {TABS.map((v) => (
          <button
            key={v.key}
            onClick={() => onViewChange(v.key)}
            aria-current={view === v.key ? "page" : undefined}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              view === v.key
                ? "bg-primary text-primary-foreground shadow-[0_0_18px_hsl(var(--primary)/0.25)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {v.label}
          </button>
        ))}
      </nav>
    </div>
  </header>
);

export default CRMHeader;
