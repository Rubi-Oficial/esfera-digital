import { ArrowRight, MessageSquare } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { WA_GENERIC } from "./data";

interface InterCTAProps {
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "default" | "soft";
}

const InterCTA = ({
  text = "Pronto para parar de perder clientes?",
  primaryLabel = "Quero meu sistema",
  primaryHref = "#planos-growth",
  secondaryLabel = "Falar no WhatsApp",
  secondaryHref = whatsappUrl(WA_GENERIC),
  variant = "default",
}: InterCTAProps) => {
  const isExternal = secondaryHref.startsWith("http");
  return (
    <div className="container px-4 md:px-8 py-8">
      <div
        className={`max-w-4xl mx-auto rounded-2xl px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4 ${
          variant === "soft"
            ? "glass border border-primary/15"
            : "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 glow-box"
        }`}
      >
        <p className="text-base md:text-lg font-semibold text-center md:text-left text-foreground">
          {text}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={primaryHref}
            aria-label={primaryLabel}
            className="btn-premium px-6 py-3 text-sm font-bold inline-flex items-center gap-2 w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {primaryLabel} <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a
            href={secondaryHref}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={secondaryLabel}
            className="border border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 transition-all w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageSquare size={14} aria-hidden="true" /> {secondaryLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export default InterCTA;
