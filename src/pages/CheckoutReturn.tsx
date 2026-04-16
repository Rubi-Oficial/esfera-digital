import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {sessionId ? (
          <>
            <CheckCircle size={64} className="text-primary mx-auto" />
            <h1 className="text-2xl font-bold font-sora text-foreground">Pagamento confirmado!</h1>
            <p className="text-muted-foreground">
              Obrigado pela sua compra. Em breve entraremos em contato para dar início ao seu projeto.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Voltar ao início
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold font-sora text-foreground">Sessão não encontrada</h1>
            <p className="text-muted-foreground">Não encontramos informações sobre esta sessão de pagamento.</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Voltar ao início
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
