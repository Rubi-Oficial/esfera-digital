import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ReferralCTAProps {
  refCode?: { code: string } | null;
}

const ReferralCTA = ({ refCode }: ReferralCTAProps) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    if (!refCode) return;
    navigator.clipboard.writeText(`${window.location.origin}/indicacao?ref=${refCode.code}`);
    toast.success("Link copiado!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Gift size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1">Indique e Ganhe R$100 por Venda</h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Compartilhe seu link exclusivo de indicação e receba comissão para cada pessoa que se tornar cliente.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/indicacao")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Acessar Indicações <ArrowRight size={12} />
            </button>
            {refCode && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted/30 text-muted-foreground text-xs font-medium hover:text-foreground transition-colors border border-border/30"
              >
                📋 Copiar Link
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralCTA;
