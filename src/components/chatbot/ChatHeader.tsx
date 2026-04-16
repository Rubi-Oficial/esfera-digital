import { MessageCircle, X } from "lucide-react";
import { BOT_NAME } from "./types";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex items-center justify-between px-4 py-3.5 bg-primary/10 border-b border-border/30">
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <MessageCircle size={20} className="text-primary" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{BOT_NAME}</p>
        <p className="text-xs text-muted-foreground">Online agora</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
      aria-label="Fechar chat"
    >
      <X size={20} />
    </button>
  </div>
);

export default ChatHeader;
