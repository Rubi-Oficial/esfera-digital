import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SHARE_MESSAGE } from "./data";

interface ReferralLinkCardProps {
  refLink: string;
}

const ReferralLinkCard = ({ refLink }: ReferralLinkCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const msg = SHARE_MESSAGE(refLink);
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-primary/20 rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Link2 size={18} className="text-primary" />
        <h2 className="text-sm font-semibold">Seu link de indicação</h2>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1 bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm text-muted-foreground truncate">
          {refLink}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={shareWhatsApp}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors text-sm font-medium"
          >
            <Share2 size={16} />
            WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralLinkCard;
