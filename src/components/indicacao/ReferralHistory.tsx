import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { Referral } from "@/lib/referral";
import StatusBadge from "./StatusBadge";

interface ReferralHistoryProps {
  referrals: Referral[];
}

const ReferralHistory = ({ referrals }: ReferralHistoryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="bg-card border border-border/30 rounded-xl overflow-hidden"
  >
    <div className="px-5 py-4 border-b border-border/30">
      <h2 className="text-sm font-semibold">Histórico de Indicações</h2>
    </div>
    <div className="divide-y divide-border/20">
      {referrals.length === 0 ? (
        <div className="px-5 py-10 text-center text-muted-foreground">
          <Users size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Nenhuma indicação ainda.</p>
          <p className="text-xs mt-1">Compartilhe seu link e comece a ganhar!</p>
        </div>
      ) : (
        referrals.map((ref) => (
          <div key={ref.id} className="px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(ref.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-primary">R${Number(ref.comissao).toFixed(0)}</span>
              <StatusBadge status={ref.status} />
            </div>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

export default ReferralHistory;
