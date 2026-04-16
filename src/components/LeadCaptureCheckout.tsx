import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LeadCaptureCheckoutProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  priceIds: string;
}

const LeadCaptureCheckout = ({ open, onClose, planName, priceIds }: LeadCaptureCheckoutProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    tipo_negocio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha seu nome e telefone.");
      return;
    }

    setLoading(true);
    try {
      // Create lead in the CRM pipeline at checkout_iniciado stage
      const { error } = await supabase.rpc("create_chatbot_lead", {
        _nome: form.nome.trim(),
        _telefone: form.telefone.trim(),
        _origem: "checkout",
        _interesse: planName,
        _tipo_negocio: form.tipo_negocio.trim() || null,
        _objetivo: `Contratação do plano ${planName}`,
        _dor_principal: null,
        _urgencia: "alta",
      });

      if (error) throw error;

      // Update the lead stage to checkout_iniciado
      // We query for the lead we just created to update its stage
      const { data: leads } = await supabase
        .from("leads")
        .select("id")
        .eq("telefone", form.telefone.trim())
        .order("created_at", { ascending: false })
        .limit(1);

      if (leads && leads.length > 0) {
        await supabase
          .from("leads")
          .update({ stage: "checkout_iniciado" as any, ultima_interacao: new Date().toISOString() })
          .eq("id", leads[0].id);

        // Log the stage change event
        await supabase.from("lead_events").insert({
          lead_id: leads[0].id,
          event_type: "stage_change",
          from_stage: "novo_lead" as any,
          to_stage: "checkout_iniciado" as any,
        });
      }

      // Redirect to checkout
      navigate(`/checkout?prices=${priceIds}&plan=${encodeURIComponent(planName)}&email=${encodeURIComponent(form.email || "")}`);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar seus dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-full max-w-md bg-card border border-border/50 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold font-sora mb-1">Quase lá! 🎉</h2>
              <p className="text-sm text-muted-foreground">
                Preencha seus dados para prosseguir com o <strong className="text-primary">{planName}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lc-nome" className="text-xs font-medium text-muted-foreground mb-1 block">
                  Nome completo *
                </label>
                <input
                  id="lc-nome"
                  name="nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="Seu nome"
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="lc-telefone" className="text-xs font-medium text-muted-foreground mb-1 block">
                  WhatsApp *
                </label>
                <input
                  id="lc-telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="(11) 99999-9999"
                  maxLength={20}
                />
              </div>

              <div>
                <label htmlFor="lc-email" className="text-xs font-medium text-muted-foreground mb-1 block">
                  E-mail
                </label>
                <input
                  id="lc-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="seu@email.com"
                  maxLength={255}
                />
              </div>

              <div>
                <label htmlFor="lc-tipo" className="text-xs font-medium text-muted-foreground mb-1 block">
                  Tipo de negócio
                </label>
                <input
                  id="lc-tipo"
                  name="tipo_negocio"
                  type="text"
                  value={form.tipo_negocio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  placeholder="Ex: Clínica, Advocacia, Restaurante..."
                  maxLength={100}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Ir para o pagamento
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-muted-foreground/60 text-center">
                Seus dados são utilizados apenas para acompanhamento do seu projeto.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureCheckout;
