import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Referral {
  id: string;
  status: string;
  lead_nome?: string | null;
  created_at: string;
  comissao: number | string;
}

interface RecentReferralsProps {
  referrals: Referral[];
}

const RecentReferrals = ({ referrals }: RecentReferralsProps) => {
  const navigate = useNavigate();
  if (referrals.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Últimas Indicações</h2>
        <button
          onClick={() => navigate("/indicacao")}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Ver todas <ArrowRight size={12} />
        </button>
      </div>
      <div className="divide-y divide-border/20">
        {referrals.slice(0, 5).map((ref) => (
          <div key={ref.id} className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                ref.status === "paid" ? "bg-primary" : ref.status === "converted" ? "bg-emerald-400" : "bg-yellow-400"
              }`} />
              <div>
                <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                ref.status === "paid"
                  ? "bg-primary/20 text-primary border-primary/30"
                  : ref.status === "converted"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              }`}>
                {ref.status === "paid" ? "Pago" : ref.status === "converted" ? "Convertido" : "Pendente"}
              </span>
              <p className="text-[10px] text-muted-foreground mt-1">R${Number(ref.comissao).toFixed(0)}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentReferrals;
