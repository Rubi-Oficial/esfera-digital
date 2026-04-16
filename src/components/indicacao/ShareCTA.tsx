import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SHARE_MESSAGE } from "./data";

interface ShareCTAProps {
  refLink: string;
}

const ShareCTA = ({ refLink }: ShareCTAProps) => {
  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    toast.success("Link copiado!");
  };

  const shareWhatsApp = () => {
    const msg = SHARE_MESSAGE(refLink);
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center"
    >
      <p className="text-sm font-semibold mb-2">
        💡 Ganhe dinheiro indicando o mesmo sistema que está trazendo clientes para você.
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Já pensou em pagar seu próprio plano só com indicações?
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Copy size={14} /> Copiar Link
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#20bd5a] transition-colors"
        >
          <Share2 size={14} /> Compartilhar WhatsApp
        </button>
      </div>
    </motion.div>
  );
};

export default ShareCTA;
