import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const priceId = searchParams.get("price") || "";
  const planName = searchParams.get("plan") || "Plano";

  if (!priceId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-sora text-foreground">Nenhum plano selecionado</h1>
          <Link to="/#planos" className="text-primary underline">Ver planos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/#planos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Voltar</span>
          </Link>
          <h1 className="text-lg font-bold font-sora text-foreground">{planName}</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </Link>
        </div>
        <StripeEmbeddedCheckout
          priceId={priceId}
          returnUrl={`${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`}
        />
      </div>
    </div>
  );
}
