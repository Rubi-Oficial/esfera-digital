import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, MessageSquare, Rocket, Send } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { WA_GROWTH } from "./data";

const CTAFinalBlock = () => {
  const [formData, setFormData] = useState({ nome: "", telefone: "", empresa: "" });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${formData.nome}, da empresa ${formData.empresa}. Telefone: ${formData.telefone}. Quero ativar o Esfera Growth!`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setFormSent(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="relative z-10">
            <Rocket size={28} className="text-primary-foreground mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
              Pronto para estruturar<br />suas vendas?
            </h2>
            <p className="text-primary-foreground/80 text-base max-w-lg mx-auto mb-8">
              Empresas que automatizam o processo comercial convertem mais com menos esforço.
            </p>

            <div className="max-w-md mx-auto mb-6">
              {formSent ? (
                <div className="bg-primary-foreground/10 rounded-xl p-6 border border-primary-foreground/20">
                  <Check size={32} className="text-primary-foreground mx-auto mb-2" />
                  <p className="text-primary-foreground font-semibold">Enviado! Fale conosco no WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    required
                    maxLength={100}
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone (WhatsApp)"
                    required
                    maxLength={20}
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                  <input
                    type="text"
                    placeholder="Nome da empresa"
                    required
                    maxLength={100}
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-foreground text-primary hover:brightness-95 shadow-xl font-bold rounded-xl px-6 py-4 text-base inline-flex items-center justify-center gap-2 transition-all"
                  >
                    Começar agora <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            <a
              href={whatsappUrl(WA_GROWTH)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground text-sm inline-flex items-center gap-2 transition-colors"
            >
              <MessageSquare size={14} /> Ou fale direto no WhatsApp <ChevronRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinalBlock;
