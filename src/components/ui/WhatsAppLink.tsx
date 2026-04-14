import { ArrowRight } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";

interface WhatsAppLinkProps {
  message: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  showArrow?: boolean;
}

const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all group";

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:brightness-110 glow-box",
  outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
  ghost: "text-primary hover:bg-primary/10",
};

const sizeStyles = {
  sm: "px-5 py-2 rounded-lg text-sm",
  md: "px-6 py-3 rounded-xl text-sm",
  lg: "px-8 py-4 rounded-xl text-lg",
};

const WhatsAppLink = ({
  message,
  children,
  className = "",
  variant = "primary",
  size = "md",
  ariaLabel,
  showArrow = true,
}: WhatsAppLinkProps) => {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
      {showArrow && (
        <ArrowRight
          size={size === "lg" ? 20 : 16}
          className="group-hover:translate-x-1 transition-transform"
          aria-hidden="true"
        />
      )}
    </a>
  );
};

export default WhatsAppLink;
