import { CHARGE_LABELS, type ChargeMode, type PlanOption } from "./checkout-plans";

interface ChargeModeToggleProps {
  plan: PlanOption;
  mode: ChargeMode;
  onChange: (mode: ChargeMode) => void;
}

const ChargeModeToggle = ({ plan, mode, onChange }: ChargeModeToggleProps) => {
  const options: { key: ChargeMode; amount: number }[] = [
    { key: "implantacao", amount: plan.implantacao.amount },
    { key: "mensal", amount: plan.mensal.amount },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-muted/20 rounded-lg">
      {options.map(({ key, amount }) => {
        const isActive = mode === key;
        const cfg = CHARGE_LABELS[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-2.5 rounded-md text-left transition-all ${
              isActive
                ? "bg-card border border-primary/30 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <p className={`text-xs font-semibold ${isActive ? "text-foreground" : ""}`}>{cfg.label}</p>
            <p className={`text-sm font-bold ${isActive ? "text-primary" : ""}`}>
              R${amount.toLocaleString("pt-BR")}
              {key === "mensal" && <span className="text-[10px] font-normal">/mês</span>}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{cfg.sub}</p>
          </button>
        );
      })}
    </div>
  );
};

export default ChargeModeToggle;
