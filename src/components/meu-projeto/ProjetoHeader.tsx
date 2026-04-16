import { MessageSquare, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

interface ProjetoHeaderProps {
  onSupport: () => void;
}

const ProjetoHeader = ({ onSupport }: ProjetoHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <AnimatedLogo size="sm" />
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={onSupport}
            className="text-xs px-3 py-1.5 rounded-full bg-muted/30 text-muted-foreground border border-border/30 font-medium hover:text-foreground transition-colors flex items-center gap-1"
          >
            <MessageSquare size={14} /> Suporte
          </button>
          <button
            onClick={() => navigate("/indicacao")}
            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <Gift size={14} /> Indicações
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProjetoHeader;
