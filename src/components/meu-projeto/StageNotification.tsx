import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";

interface StageNotificationProps {
  notification: { from: string; to: string } | null;
  onClose: () => void;
}

const StageNotification = ({ notification, onClose }: StageNotificationProps) => (
  <AnimatePresence>
    {notification && (
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-start gap-3"
      >
        <PartyPopper size={20} className="text-primary shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary">Seu projeto avançou! 🎉</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            De <span className="font-medium text-foreground">{notification.from}</span> para{" "}
            <span className="font-medium text-primary">{notification.to}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default StageNotification;
