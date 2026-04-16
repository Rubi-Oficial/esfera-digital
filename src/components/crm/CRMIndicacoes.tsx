import { motion } from "framer-motion";
import { Users, Gift, TrendingUp, DollarSign, Trophy, Link2 } from "lucide-react";
import { STAGE_CONFIG, type Lead } from "@/lib/crm";
import type { ReferralCode, Referral } from "@/lib/referral";
import CRMMetrics from "./CRMMetrics";
import TempIcon from "./TempIcon";

interface CRMIndicacoesProps {
  refCodes: ReferralCode[];
  allReferrals: Referral[];
  indicacaoLeads: Lead[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  converted: { label: "Convertido", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  paid: { label: "Pago", color: "bg-primary/20 text-primary border-primary/30" },
  expired: { label: "Expirado", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const CRMIndicacoes = ({ refCodes, allReferrals, indicacaoLeads }: CRMIndicacoesProps) => {
  const metrics = [
    { label: "Parceiros", value: refCodes.length, icon: Users, color: "text-blue-400" },
    { label: "Total Indicações", value: allReferrals.length, icon: Gift, color: "text-cyan-400" },
    { label: "Vendas via Indicação", value: allReferrals.filter((r) => r.status === "converted" || r.status === "paid").length, icon: TrendingUp, color: "text-green-400" },
    { label: "Comissões Pagas", value: `R$${refCodes.reduce((s, c) => s + Number(c.saldo_pago), 0).toFixed(0)}`, icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <CRMMetrics metrics={metrics} />

      {/* Top Referrers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border/30 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" />
          <h2 className="text-lg font-semibold font-sora">Ranking de Parceiros</h2>
        </div>
        <div className="divide-y divide-border/20">
          {refCodes.length === 0 ? (
            <div className="px-6 py-10 text-center text-muted-foreground">
              <Gift size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Nenhum parceiro cadastrado ainda.</p>
            </div>
          ) : (
            refCodes.map((rc, i) => (
              <div key={rc.id} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}.</span>
                  <div>
                    <p className="text-sm font-medium">{rc.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {rc.total_clicks} cliques · {rc.total_leads} leads · {rc.total_vendas} vendas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">R${Number(rc.saldo_disponivel).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">disponível</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted/20">
                    <Link2 size={10} />
                    <span>{rc.code}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Recent Referrals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card border border-border/30 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/30">
          <h2 className="text-lg font-semibold font-sora">Indicações Recentes</h2>
        </div>
        <div className="divide-y divide-border/20">
          {allReferrals.length === 0 ? (
            <div className="px-6 py-10 text-center text-muted-foreground">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Nenhuma indicação recebida ainda.</p>
            </div>
          ) : (
            allReferrals.slice(0, 20).map((ref) => {
              const sc = STATUS_CONFIG[ref.status] || STATUS_CONFIG.pending;
              return (
                <div key={ref.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{ref.lead_nome || "Lead"}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ref.created_at).toLocaleDateString("pt-BR")}
                      {ref.lead_telefone && ` · ${ref.lead_telefone}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">R${Number(ref.comissao).toFixed(0)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Leads via indicação */}
      {indicacaoLeads.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-card border border-primary/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-primary" />
            <h2 className="text-sm font-semibold">Leads via Indicação no CRM</h2>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{indicacaoLeads.length}</span>
          </div>
          <div className="space-y-2">
            {indicacaoLeads.slice(0, 10).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between bg-muted/10 rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <TempIcon temp={lead.temperatura} />
                  <span className="text-sm font-medium">{lead.nome}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                    {STAGE_CONFIG[lead.stage].label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{lead.telefone}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CRMIndicacoes;
