import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatBubbleProps {
  showPulse: boolean;
  onClick: () => void;
}

const ChatBubble = ({ showPulse, onClick }: ChatBubbleProps) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: 1,
      opacity: 1,
      // Wiggle periódico para chamar atenção sem ser invasivo
      rotate: [0, -10, 10, -8, 8, -4, 4, 0],
      y: [0, -6, 0, -3, 0],
    }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{
      scale: { type: "spring", stiffness: 200 },
      opacity: { duration: 0.3 },
      rotate: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4,
      },
      y: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4,
      },
    }}
    whileHover={{ scale: 1.1, rotate: 0, y: 0 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_4px_24px_hsl(var(--primary)/0.4)] hover:shadow-[0_4px_32px_hsl(var(--primary)/0.6)] transition-shadow duration-300"
    aria-label="Falar com especialista"
  >
    {/* Anel de glow pulsante para destacar o botão */}
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-primary/40 animate-ping"
      style={{ animationDuration: "2.5s" }}
    />
    <span
      aria-hidden="true"
      className="absolute -inset-1 rounded-full border border-primary/40 animate-pulse"
    />

    <MessageCircle size={26} className="relative z-10" />

    {showPulse && (
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse z-10 flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
        1
      </span>
    )}
  </motion.button>
);

export default ChatBubble;
