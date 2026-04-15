import { ArrowRight } from "lucide-react";
import { openChatbot } from "@/lib/chatbot-events";

interface ChatbotTriggerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  showArrow?: boolean;
}

const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all group cursor-pointer";

const variantStyles = {
  primary: "btn-premium",
  outline: "border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary rounded-xl",
  ghost: "text-primary hover:bg-primary/10 rounded-xl",
};

const sizeStyles = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-lg",
};

const ChatbotTrigger = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ariaLabel,
  showArrow = true,
}: ChatbotTriggerProps) => {
  return (
    <button
      onClick={openChatbot}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
      {showArrow && (
        <ArrowRight
          size={size === "lg" ? 20 : 16}
          className="group-hover:translate-x-1 transition-transform"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default ChatbotTrigger;
