import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { createLead, updateLeadStage } from "@/lib/crm";
import { lookupRefCode, recordRefClick, createReferral, type ReferralCode } from "@/lib/referral";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
};

type LeadData = {
  nome: string;
  telefone: string;
  interesse: string;
  tipoNegocio: string;
  urgencia: string;
  objetivo: string;
};

type Step =
  | "greeting"
  | "nome"
  | "telefone"
  | "interesse"
  | "tipoNegocio"
  | "urgencia"
  | "objetivo"
  | "duvidas"
  | "finalizar";

const BOT_NAME = "Genius AI";

const INTERESSE_OPTIONS = [
  "Criação de Site",
  "Loja Virtual",
  "Landing Page",
  "Site com IA",
  "Reformular site existente",
];

const URGENCIA_OPTIONS = [
  "Preciso para ontem! 🔥",
  "Nas próximas semanas",
  "Estou pesquisando ainda",
];

const DUVIDAS_OPTIONS = [
  "Quanto custa?",
  "Qual o prazo de entrega?",
  "Quais funcionalidades incluem?",
  "Quais os diferenciais?",
  "Não tenho dúvidas, quero começar!",
];

const FAQ: Record<string, string> = {
  "Quanto custa?":
    "Nossos planos começam a partir de **R$ 1.290** para um site profissional completo com IA integrada, SEO otimizado e design personalizado. O investimento varia conforme as funcionalidades que você precisa. Quer que eu te mostre os detalhes? 😊",
  "Qual o prazo de entrega?":
    "Trabalhamos com prazos de **7 a 15 dias úteis** para entregas, dependendo da complexidade do projeto. Sites mais simples podem ficar prontos em até 5 dias! ⚡",
  "Quais funcionalidades incluem?":
    "Nossos sites incluem: ✅ Design responsivo (celular, tablet e desktop)\n✅ SEO otimizado para Google\n✅ Integração com WhatsApp\n✅ Painel administrativo\n✅ Certificado SSL\n✅ Hospedagem inclusa\n✅ Inteligência Artificial integrada",
  "Quais os diferenciais?":
    "O que nos diferencia: 🚀 **IA integrada** em todos os projetos\n📊 **Foco em resultados** e conversão\n🎨 **Design premium** personalizado\n⚡ **Entrega rápida** sem perder qualidade\n🤝 **Suporte dedicado** pós-entrega",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("greeting");
  const [lead, setLead] = useState<LeadData>({
    nome: "",
    telefone: "",
    interesse: "",
    tipoNegocio: "",
    urgencia: "",
    objetivo: "",
  });
  const [showPulse, setShowPulse] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [crmLeadId, setCrmLeadId] = useState<string | null>(null);
  const [refCodeData, setRefCodeData] = useState<ReferralCode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      lookupRefCode(ref).then((code) => {
        if (code) {
          setRefCodeData(code);
          recordRefClick(code.id).catch(() => {});
        }
      });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addBotMessage = useCallback(
    (text: string, options?: string[]) => {
      const id = crypto.randomUUID();
      setMessages((prev) => [...prev, { id, text, sender: "bot", options }]);
    },
    []
  );

  const addUserMessage = useCallback((text: string) => {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { id, text, sender: "user" }]);
  }, []);

  // Auto-open after 8s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasGreeted) {
        setIsOpen(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [isOpen, hasGreeted]);

  // Greeting on open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowPulse(false);
      setTimeout(() => {
        addBotMessage(
          `Olá! 👋 Eu sou a **${BOT_NAME}**, assistente digital da Esfera Digital.\n\nEstou aqui para te ajudar a encontrar a melhor solução web para o seu negócio!\n\nPara começar, qual é o seu **nome**?`
        );
        setStep("nome");
      }, 500);
    }
  }, [isOpen, hasGreeted, addBotMessage]);

  const buildWhatsAppMessage = (data: LeadData) => {
    const parts = [
      `🤖 *Lead via Chatbot - Esfera Digital*`,
      ``,
      `👤 *Nome:* ${data.nome}`,
      `📱 *Telefone:* ${data.telefone}`,
      `💼 *Interesse:* ${data.interesse}`,
      `🏢 *Tipo de negócio:* ${data.tipoNegocio}`,
      `⏰ *Urgência:* ${data.urgencia}`,
      `🎯 *Objetivo:* ${data.objetivo}`,
      ``,
      `_Enviado automaticamente pelo chatbot do site_`,
    ];
    return parts.join("\n");
  };

  const sendToWhatsApp = (data: LeadData) => {
    const message = buildWhatsAppMessage(data);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const processStep = useCallback(
    (userInput: string, currentStep: Step) => {
      addUserMessage(userInput);

      switch (currentStep) {
        case "nome":
          setLead((prev) => ({ ...prev, nome: userInput }));
          setTimeout(() => {
            addBotMessage(
              `Prazer, **${userInput}**! 😄\n\nAgora, qual é o seu **telefone ou WhatsApp**? Assim podemos entrar em contato com você.`
            );
            setStep("telefone");
          }, 600);
          break;

        case "telefone":
          setLead((prev) => ({ ...prev, telefone: userInput }));
          // Create lead in CRM
          createLead({ nome: lead.nome || "Lead", telefone: userInput, origem: "chatbot" })
            .then((newLead) => {
              setCrmLeadId(newLead.id);
            })
            .catch(console.error);
          setTimeout(() => {
            addBotMessage(
              `Perfeito! 📱\n\nQual é o seu principal **interesse**?`,
              INTERESSE_OPTIONS
            );
            setStep("interesse");
          }, 600);
          break;

        case "interesse":
          setLead((prev) => ({ ...prev, interesse: userInput }));
          if (crmLeadId) {
            updateLeadStage(crmLeadId, "novo_lead", "engajado").catch(console.error);
          }
          setTimeout(() => {
            addBotMessage(
              `Ótima escolha! 🎯\n\nPara te atender melhor, qual é o **tipo do seu negócio**? (ex: clínica, restaurante, loja, consultoria, etc.)`
            );
            setStep("tipoNegocio");
          }, 600);
          break;

        case "tipoNegocio":
          setLead((prev) => ({ ...prev, tipoNegocio: userInput }));
          if (crmLeadId) {
            updateLeadStage(crmLeadId, "engajado", "qualificado").catch(console.error);
          }
          setTimeout(() => {
            addBotMessage(
              `Entendi! 📋\n\nQual a sua **urgência** para o projeto?`,
              URGENCIA_OPTIONS
            );
            setStep("urgencia");
          }, 600);
          break;

        case "urgencia":
          setLead((prev) => ({ ...prev, urgencia: userInput }));
          setTimeout(() => {
            addBotMessage(
              `Beleza! ⚡\n\nPor último, qual o **principal objetivo** que você quer alcançar com o site? (ex: vender mais, aparecer no Google, ter presença online, captar clientes, etc.)`
            );
            setStep("objetivo");
          }, 600);
          break;

        case "objetivo":
          setLead((prev) => ({ ...prev, objetivo: userInput }));
          setTimeout(() => {
            addBotMessage(
              `Excelente! 🚀\n\nAntes de finalizar, você tem alguma **dúvida**?`,
              DUVIDAS_OPTIONS
            );
            setStep("duvidas");
          }, 600);
          break;

        case "duvidas": {
          const faqAnswer = FAQ[userInput];
          if (faqAnswer) {
            setTimeout(() => {
              addBotMessage(faqAnswer);
              setTimeout(() => {
                addBotMessage(
                  `Tem mais alguma dúvida? 😊`,
                  [...DUVIDAS_OPTIONS]
                );
              }, 800);
            }, 600);
          } else {
            // "Não tenho dúvidas" or free text
            setTimeout(() => {
              const finalLead = { ...lead, objetivo: lead.objetivo || userInput };
              if (crmLeadId) {
                updateLeadStage(crmLeadId, "qualificado", "proposta_apresentada").catch(console.error);
              }
              addBotMessage(
                `Maravilha, **${lead.nome}**! 🎉\n\nResumo das suas informações:\n\n📱 **Contato:** ${lead.telefone}\n💼 **Interesse:** ${lead.interesse}\n🏢 **Negócio:** ${lead.tipoNegocio}\n⏰ **Urgência:** ${lead.urgencia}\n🎯 **Objetivo:** ${lead.objetivo}\n\nVou te encaminhar para o nosso WhatsApp para darmos continuidade ao seu atendimento. Clique no botão abaixo! 👇`
              );
              setStep("finalizar");
              setTimeout(() => sendToWhatsApp(finalLead), 2000);
            }, 600);
          }
          break;
        }

        default:
          break;
      }
    },
    [addBotMessage, addUserMessage, lead, crmLeadId]
  );

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    processStep(trimmed, step);
  };

  const handleOption = (option: string) => {
    processStep(option, step);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 3 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.4)] hover:shadow-[0_4px_30px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105"
            aria-label="Abrir chatbot"
          >
            <MessageCircle size={26} />
            {showPulse && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl overflow-hidden border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.4)] bg-background"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle size={18} className="text-primary" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{BOT_NAME}</p>
                  <p className="text-xs text-muted-foreground">Online agora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Fechar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted/60 text-foreground rounded-bl-sm border border-border/30"
                      }`}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                  </motion.div>
                  {/* Option Buttons */}
                  {msg.sender === "bot" && msg.options && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex flex-wrap gap-2 mt-2 ml-1"
                    >
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOption(opt)}
                          className="text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* WhatsApp CTA on finalizar */}
              {step === "finalizar" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-3"
                >
                  <button
                    onClick={() => sendToWhatsApp(lead)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#20bd5a] transition-colors shadow-lg"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Continuar no WhatsApp
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {step !== "finalizar" && (
              <div className="px-3 py-3 border-t border-border/30 bg-muted/20">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-background border border-border/50 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    aria-label="Enviar mensagem"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
