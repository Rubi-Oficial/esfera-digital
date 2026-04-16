import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import type { ReferralCode } from "@/lib/referral";

interface FinancialPanelProps {
  refCode: ReferralCode;
  pendentes: number;
}

const FinancialPanel = ({ refCode, pendentes }: FinancialPanelProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="bg-card border border-border/30 rounded-xl p-5"
  >
    <div className="flex items-center gap-2 mb-4">
      <DollarSign size={18} className="text-primary" />
      <h2 className="text-sm font-semibold">Financeiro</h2>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Saldo Disponível</p>
        <p className="text-xl font-bold text-primary">R${refCode.saldo_disponivel.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Total Pago</p>
        <p className="text-xl font-bold text-green-400">R${refCode.saldo_pago.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Pendente</p>
        <p className="text-xl font-bold text-yellow-400">{pendentes}</p>
      </div>
    </div>
  </motion.div>
);

export default FinancialPanel;
