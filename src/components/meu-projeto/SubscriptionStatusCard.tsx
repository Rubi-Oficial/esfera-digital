import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Calendar, Settings } from "lucide-react";
import type { Subscription } from "@/hooks/useSubscription";
import { CHECKOUT_PLANS } from "./checkout-plans";

interface SubscriptionStatusCardProps {
  subscription: Subscription;
}

const STATUS_LABELS: Record<string, { label: string; tone: "ok" | "warn" | "danger" }> = {
  active: { label: "Ativa", tone: "ok" },
  trialing: { label: "Em período de teste", tone: "ok" },
  past_due: { label: "Pagamento em atraso", tone: "warn" },
  unpaid: { label: "Não paga", tone: "danger" },
  canceled: { label: "Cancelada", tone: "danger" },
  incomplete: { label: "Incompleta", tone: "warn" },
  paused: { label: "Pausada", tone: "warn" },
};

const SubscriptionStatusCard = ({ subscription }: SubscriptionStatusCardProps) => {
  const status = STATUS_LABELS[subscription.status] ?? { label: subscription.status, tone: "warn" as const };
  const planName = CHECKOUT_PLANS.find(
    (p) =>
      p.mensal.priceId === subscription.stripe_price_id ||
      p.implantacao.priceId === subscription.stripe_price_id
  )?.name ?? "Seu plano";

  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const toneClass =
    status.tone === "ok"
      ? "text-primary"
      : status.tone === "warn"
      ? "text-yellow-500"
      : "text-destructive";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-card border border-border/30 rounded-xl p-5 space-y-4"
      aria-labelledby="subscription-status-heading"
    >
      <div className="flex items-center gap-2">
        {status.tone === "ok" ? (
          <CheckCircle2 size={18} className="text-primary" />
        ) : (
          <AlertCircle size={18} className={toneClass} />
        )}
        <h2 id="subscription-status-heading" className="text-sm font-semibold">
          Sua assinatura
        </h2>
        <span className={`ml-auto text-[10px] font-semibold uppercase tracking-wider ${toneClass}`}>
          {status.label}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-base font-semibold">{planName}</p>
        {periodEnd && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} />
            <span>
              {subscription.cancel_at_period_end
                ? `Acesso até ${periodEnd} (cancelamento agendado)`
                : `Próxima renovação em ${periodEnd}`}
            </span>
          </div>
        )}
      </div>

      {subscription.status === "past_due" && (
        <div className="text-xs p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400">
          Houve uma falha na cobrança. Atualize sua forma de pagamento para manter o acesso.
        </div>
      )}

      <a
        href="https://billing.stripe.com/p/login"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 rounded-lg border border-border/50 text-xs font-medium hover:bg-muted/50 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Settings size={12} />
        Gerenciar assinatura
      </a>
    </motion.section>
  );
};

export default SubscriptionStatusCard;
