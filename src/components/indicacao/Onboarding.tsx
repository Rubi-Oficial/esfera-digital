import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Rocket } from "lucide-react";
import { toast } from "sonner";
import { createReferralCode } from "@/lib/referral";
import { HOW_IT_WORKS_STEPS } from "./data";

interface OnboardingProps {
  onCreated: () => void;
}

const Onboarding = ({ onCreated }: OnboardingProps) => {
  const [creating, setCreating] = useState(false);
  const [nome, setNome] = useState("");

  const handleCreate = async () => {
    if (!nome.trim()) {
      toast.error("Digite seu nome");
      return;
    }
    setCreating(true);
    try {
      await createReferralCode(nome.trim());
      onCreated();
      toast.success("Link de indicação criado! 🎉");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar código";
      toast.error(message);
    }
    setCreating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-12"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Gift size={32} className="text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-sora mb-3">
          Programa de Parcerias <span className="text-primary">Growth OS</span>
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          Indique um amigo e ganhe <strong className="text-primary">R$100</strong> por cada venda realizada.
          Sem limite de ganhos. Nós fazemos todo o processo.
        </p>
      </div>

      <div className="bg-card border border-border/30 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Ativar meu link de indicação</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          maxLength={100}
          className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {creating ? "Criando..." : "Criar meu link de indicação"}
          <Rocket size={16} />
        </button>
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold text-center">Como funciona</h3>
        {HOW_IT_WORKS_STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-3 bg-card/50 border border-border/20 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">{s.num}</span>
            </div>
            <span className="text-sm text-muted-foreground">{s.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Onboarding;
