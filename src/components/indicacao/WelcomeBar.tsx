import { motion } from "framer-motion";
import type { ReferralCode } from "@/lib/referral";

interface WelcomeBarProps {
  refCode: ReferralCode;
  nivel: string;
}

const WelcomeBar = ({ refCode, nivel }: WelcomeBarProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-xl font-bold font-sora">Olá, {refCode.nome}! 👋</h1>
        <p className="text-sm text-muted-foreground">Nível: {nivel}</p>
      </div>
      <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
        R${refCode.comissao_por_venda.toFixed(0)} por venda
      </span>
    </div>
  </motion.div>
);

export default WelcomeBar;
