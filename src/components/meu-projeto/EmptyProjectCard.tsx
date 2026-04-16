import { motion } from "framer-motion";
import { Clock, MessageSquare } from "lucide-react";

interface EmptyProjectCardProps {
  onSupport: () => void;
}

const EmptyProjectCard = ({ onSupport }: EmptyProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-card border border-border/30 rounded-xl p-8 text-center"
  >
    <Clock size={32} className="text-muted-foreground mx-auto mb-3 opacity-50" />
    <h2 className="text-sm font-semibold mb-1">Projeto ainda não configurado</h2>
    <p className="text-xs text-muted-foreground mb-4">
      Seu projeto será exibido aqui assim que o administrador configurar seu acesso.
    </p>
    <button
      onClick={onSupport}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
    >
      <MessageSquare size={14} /> Falar com suporte
    </button>
  </motion.div>
);

export default EmptyProjectCard;
