import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatBubbleProps {
  showPulse: boolean;
  onClick: () => void;
}

const ChatBubble = ({ showPulse, onClick }: ChatBubbleProps) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 200 }}
    onClick={onClick}
    className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_4px_24px_hsl(var(--primary)/0.4)] hover:shadow-[0_4px_32px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
    aria-label="Falar com especialista"
  >
    <MessageCircle size={26} />
    {showPulse && (
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
    )}
  </motion.button>
);

export default ChatBubble;
