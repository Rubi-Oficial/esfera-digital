import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, X, Lock } from "lucide-react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import PlanSelector from "./PlanSelector";
import ChargeModeToggle from "./ChargeModeToggle";
import { CHARGE_LABELS, CHECKOUT_PLANS, type ChargeMode, type PlanOption } from "./checkout-plans";

interface CheckoutSectionProps {
  userId?: string;
  customerEmail?: string;
}

const CheckoutSection = ({ userId, customerEmail }: CheckoutSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
  const [mode, setMode] = useState<ChargeMode>("implantacao");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const priceId = selectedPlan
    ? mode === "implantacao"
      ? selectedPlan.implantacao.priceId
      : selectedPlan.mensal.priceId
    : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-card border border-border/30 rounded-xl p-5 space-y-4"
      aria-labelledby="checkout-heading"
    >
      <div className="flex items-center gap-2">
        <CreditCard size={18} className="text-primary" />
        <h2 id="checkout-heading" className="text-sm font-semibold">Contratar plano</h2>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <Lock size={10} /> Pagamento seguro Stripe
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Escolha o plano ideal e forma de cobrança para iniciar o pagamento.
      </p>

      <PlanSelector
        selectedId={selectedPlan?.id || null}
        onSelect={(p) => {
          setSelectedPlan(p);
          setMode("implantacao");
        }}
      />

      <AnimatePresence mode="wait">
        {selectedPlan && (
          <motion.div
            key={selectedPlan.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-2"
          >
            <ChargeModeToggle plan={selectedPlan} mode={mode} onChange={setMode} />

            <button
              onClick={() => setCheckoutOpen(true)}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              <CreditCard size={14} />
              Pagar {CHARGE_LABELS[mode].label.toLowerCase()} — {selectedPlan.name}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && priceId && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setCheckoutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <PaymentTestModeBanner />
              <div className="p-5 border-b border-border/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{selectedPlan.name}</h3>
                  <p className="text-xs text-muted-foreground">{CHARGE_LABELS[mode].label} · {CHARGE_LABELS[mode].sub}</p>
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fechar checkout"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-2">
                <StripeEmbeddedCheckout
                  priceId={priceId}
                  customerEmail={customerEmail}
                  userId={userId}
                  returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CheckoutSection;
// Re-export plans constant in case other parts need it
export { CHECKOUT_PLANS };
