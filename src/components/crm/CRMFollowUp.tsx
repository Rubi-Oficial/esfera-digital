import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { STAGE_CONFIG, type Lead } from "@/lib/crm";
import TempIcon from "./TempIcon";
import { sendFollowUpWhatsApp } from "./types";

interface CRMFollowUpProps {
  leads: Lead[];
}

const CRMFollowUp = ({ leads }: CRMFollowUpProps) => {
  if (leads.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card border border-orange-500/20 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={20} className="text-orange-400" />
        <h2 className="text-lg font-semibold font-sora">Follow-up WhatsApp</h2>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
          {leads.length} pendentes
        </span>
      </div>
      <div className="space-y-2">
        {leads.slice(0, 10).map((lead) => (
          <div key={lead.id} className="flex items-center justify-between bg-muted/10 rounded-lg px-4 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <TempIcon temp={lead.temperatura} />
              <span className="text-sm font-medium truncate">{lead.nome}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${STAGE_CONFIG[lead.stage].color}`}>
                {STAGE_CONFIG[lead.stage].label}
              </span>
            </div>
            <button
              onClick={() => sendFollowUpWhatsApp(lead.telefone, lead.stage)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex-shrink-0"
            >
              <Send size={12} />
              Enviar
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CRMFollowUp;
