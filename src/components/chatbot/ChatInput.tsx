import { useRef } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-3 py-3 border-t border-border/30 bg-muted/20 safe-area-bottom">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-background border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all"
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="Enviar mensagem"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
