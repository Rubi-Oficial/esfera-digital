import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { CHECKOUT_PLANS, type PlanOption } from "./checkout-plans";

interface PlanSelectorProps {
  selectedId: string | null;
  onSelect: (plan: PlanOption) => void;
}

const PlanSelector = ({ selectedId, onSelect }: PlanSelectorProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {CHECKOUT_PLANS.map((plan, i) => {
      const isSelected = selectedId === plan.id;
      const Icon = plan.icon;
      return (
        <motion.button
          key={plan.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(plan)}
          className={`text-left p-4 rounded-xl border transition-all relative ${
            isSelected
              ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
              : "border-border/40 bg-card hover:border-primary/40"
          }`}
        >
          {plan.highlight && (
            <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold inline-flex items-center gap-1">
              <Sparkles size={10} /> Recomendado
            </span>
          )}
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={isSelected ? "text-primary" : "text-muted-foreground"} />
            <h3 className="font-bold text-sm">{plan.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{plan.tagline}</p>
          <ul className="space-y-1 mb-3">
            {plan.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                <Check size={10} className="text-primary mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-border/30 space-y-0.5">
            <p className="text-[10px] text-muted-foreground">A partir de</p>
            <p className="text-base font-bold">
              R${plan.implantacao.amount.toLocaleString("pt-BR")}
              <span className="text-[10px] font-normal text-muted-foreground"> + R${plan.mensal.amount}/mês</span>
            </p>
          </div>
        </motion.button>
      );
    })}
  </div>
);

export default PlanSelector;
