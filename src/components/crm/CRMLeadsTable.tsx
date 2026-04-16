import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Phone, Building2, Target, Clock, ChevronDown, ChevronUp, Send, CreditCard, UserCheck } from "lucide-react";
import { STAGE_CONFIG, SUBSCRIPTION_STATUS_CONFIG, type Lead, type SubscriptionInfo } from "@/lib/crm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import TempIcon from "./TempIcon";
import { FOLLOWUP_MESSAGES, sendFollowUpWhatsApp } from "./types";

type LeadWithUser = Lead & { user_id?: string | null };

interface CRMLeadsTableProps {
  leads: LeadWithUser[];
  activeFilters: number;
  totalCount: number;
  onClearFilters: () => void;
  subscriptions?: Record<string, SubscriptionInfo>;
}

const CRMLeadsTable = ({ leads, activeFilters, totalCount, onClearFilters }: CRMLeadsTableProps) => {
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
        <h2 className="text-lg font-semibold font-sora">
          Leads {activeFilters > 0 ? "Filtrados" : "Recentes"}
        </h2>
        <span className="text-xs text-muted-foreground">{leads.length} leads</span>
      </div>
      <div className="divide-y divide-border/20">
        {leads.slice(0, 50).map((lead) => (
          <div key={lead.id}>
            <button
              onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
              className="w-full px-6 py-3 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <TempIcon temp={lead.temperatura} />
                <span className="font-medium truncate">{lead.nome}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                  {STAGE_CONFIG[lead.stage].emoji} {STAGE_CONFIG[lead.stage].label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:inline">Score: {lead.score}</span>
                {expandedLead === lead.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>
            <AnimatePresence>
              {expandedLead === lead.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-muted/5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span>{lead.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-muted-foreground" />
                      <span>{lead.tipo_negocio || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-muted-foreground" />
                      <span>{lead.interesse || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>{format(new Date(lead.created_at), "dd/MM HH:mm", { locale: ptBR })}</span>
                    </div>
                    {lead.objetivo && (
                      <div className="col-span-2 md:col-span-4 text-muted-foreground">🎯 {lead.objetivo}</div>
                    )}
                    {FOLLOWUP_MESSAGES[lead.stage] && (
                      <div className="col-span-2 md:col-span-4">
                        <button
                          onClick={() => sendFollowUpWhatsApp(lead.telefone, lead.stage)}
                          className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        >
                          <Send size={12} />
                          {FOLLOWUP_MESSAGES[lead.stage].label}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="px-6 py-12 text-center text-muted-foreground">
            <Users size={40} className="mx-auto mb-3 opacity-40" />
            {activeFilters > 0 ? (
              <>
                <p>Nenhum lead encontrado com esses filtros.</p>
                <button onClick={onClearFilters} className="text-sm text-primary mt-2 hover:underline">
                  Limpar filtros
                </button>
              </>
            ) : (
              <>
                <p>Nenhum lead capturado ainda.</p>
                <p className="text-sm mt-1">Leads do chatbot aparecerão aqui automaticamente.</p>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CRMLeadsTable;
