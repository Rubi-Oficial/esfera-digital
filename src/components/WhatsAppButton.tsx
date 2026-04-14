import { MessageCircle } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

const WhatsAppButton = () => {
  return (
    <a
      href={whatsappUrl(WHATSAPP_MESSAGES.info)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-110 transition-all animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] hover:scale-110"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};

export default WhatsAppButton;
