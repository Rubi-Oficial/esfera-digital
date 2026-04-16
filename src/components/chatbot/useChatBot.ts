import { useState, useRef, useEffect, useCallback } from "react";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { createLead, updateLeadStage } from "@/lib/crm";
import { lookupRefCode, recordRefClick, createReferral, type ReferralCode } from "@/lib/referral";
import { onChatbotOpen } from "@/lib/chatbot-events";
import type { Message, LeadData, Step } from "./types";
import { BOT_NAME, INTERESSE_OPTIONS, URGENCIA_OPTIONS, PLANO_OPTIONS } from "./types";

export function useChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("greeting");
  const [lead, setLead] = useState<LeadData>({
    nome: "", telefone: "", interesse: "", tipoNegocio: "", urgencia: "", objetivo: "",
  });
  const [showPulse, setShowPulse] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [crmLeadId, setCrmLeadId] = useState<string | null>(null);
  const [refCodeData, setRefCodeData] = useState<ReferralCode | null>(null);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const leadRef = useRef(lead);
  leadRef.current = lead;
  const crmLeadIdRef = useRef(crmLeadId);
  crmLeadIdRef.current = crmLeadId;

  useEffect(() => {
    return onChatbotOpen(() => { setIsBubbleVisible(true); setIsOpen(true); });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsBubbleVisible(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      lookupRefCode(ref).then((code) => {
        if (code) { setRefCodeData(code); recordRefClick(code.id).catch(() => {}); }
      });
    }
  }, []);

  const addBotMessage = useCallback((text: string, options?: string[]) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, sender: "bot", options }]);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, sender: "user" }]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasGreeted) { setIsBubbleVisible(true); setIsOpen(true); }
    }, 15000);
    return () => clearTimeout(timer);
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowPulse(false);
      setTimeout(() => {
        addBotMessage(`Olá! 👋 Eu sou a **${BOT_NAME}**, assistente digital da Esfera Digital.\n\nEm 30 segundos eu entendo seu caso e te conecto com a melhor solução.\n\nPara começar, qual é o seu **nome**?`);
        setStep("nome");
      }, 500);
    }
  }, [isOpen, hasGreeted, addBotMessage]);

  const buildWhatsAppMessage = (data: LeadData) => {
    return [
      `🤖 *Lead via Chatbot - Esfera Digital*`, ``,
      `👤 *Nome:* ${data.nome}`, `📱 *Telefone:* ${data.telefone}`,
      `💼 *Interesse:* ${data.interesse}`, `🏢 *Tipo de negócio:* ${data.tipoNegocio}`,
      `⏰ *Urgência:* ${data.urgencia}`, `🎯 *Objetivo:* ${data.objetivo}`,
      ``, `_Enviado automaticamente pelo chatbot do site_`,
    ].join("\n");
  };

  const sendToWhatsApp = useCallback((data: LeadData) => {
    const message = buildWhatsAppMessage(data);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }, []);

  const isHighIntent = (data: LeadData): boolean => {
    return (data.urgencia?.includes("ontem") || data.urgencia?.includes("🔥")) ||
      (data.interesse?.includes("Site com IA") || data.interesse?.includes("Loja Virtual")) || false;
  };

  const processStep = useCallback((userInput: string, currentStep: Step) => {
    addUserMessage(userInput);

    switch (currentStep) {
      case "nome":
        setLead((prev) => ({ ...prev, nome: userInput }));
        setTimeout(() => { addBotMessage(`Prazer, **${userInput}**! 😄\n\nAgora, qual é o seu **telefone ou WhatsApp**? Assim podemos entrar em contato com você.`); setStep("telefone"); }, 600);
        break;

      case "telefone":
        setLead((prev) => ({ ...prev, telefone: userInput }));
        createLead({ nome: leadRef.current.nome || "Lead", telefone: userInput, origem: refCodeData ? "indicacao" : "chatbot" })
          .then((newLead) => {
            setCrmLeadId(newLead.id);
            if (refCodeData) {
              createReferral(refCodeData.id, newLead.id, leadRef.current.nome || "Lead", userInput, Number(refCodeData.comissao_por_venda)).catch(console.error);
            }
          }).catch(console.error);
        setTimeout(() => { addBotMessage(`Perfeito! 📱\n\nQual é o seu principal **interesse**?`, INTERESSE_OPTIONS); setStep("interesse"); }, 600);
        break;

      case "interesse":
        setLead((prev) => ({ ...prev, interesse: userInput }));
        { const lid = crmLeadIdRef.current; if (lid) updateLeadStage(lid, "novo_lead", "engajado").catch(console.error); }
        setTimeout(() => { addBotMessage(`Ótima escolha! 🎯\n\nPara te atender melhor, qual é o **tipo do seu negócio**? (ex: clínica, restaurante, loja, consultoria, etc.)`); setStep("tipoNegocio"); }, 600);
        break;

      case "tipoNegocio":
        setLead((prev) => ({ ...prev, tipoNegocio: userInput }));
        { const lid = crmLeadIdRef.current; if (lid) updateLeadStage(lid, "engajado", "qualificado").catch(console.error); }
        setTimeout(() => { addBotMessage(`Entendi! 📋\n\nQual a sua **urgência** para o projeto?`, URGENCIA_OPTIONS); setStep("urgencia"); }, 600);
        break;

      case "urgencia":
        setLead((prev) => ({ ...prev, urgencia: userInput }));
        setTimeout(() => { addBotMessage(`Beleza! ⚡\n\nPor último, qual o **principal objetivo** que você quer alcançar com o site? (ex: vender mais, aparecer no Google, ter presença online, captar clientes, etc.)`); setStep("objetivo"); }, 600);
        break;

      case "objetivo":
        setLead((prev) => ({ ...prev, objetivo: userInput }));
        setTimeout(() => {
          const currentLead = { ...leadRef.current, objetivo: userInput };
          const highIntent = isHighIntent(currentLead);
          if (highIntent) {
            addBotMessage(`Já entendi seu cenário, **${currentLead.nome}**! 👍\n\nCom base no que você me disse, seu perfil é de alguém que precisa de **resultados rápidos**.\n\nTemos 2 opções para você:\n\n🚀 **Esfera Growth** — R$ 1.997 ⭐ *Recomendado pra você*\nSite + ecossistema de crescimento + consultoria + programa de indicações\n\n⚡ **Site Profissional** — R$ 997\nSite completo com IA, SEO e design personalizado\n\nQual faz mais sentido pro seu negócio?`, PLANO_OPTIONS);
          } else {
            addBotMessage(`Maravilha, **${currentLead.nome}**! 🎉\n\nCom base no que você me contou, preparei as melhores opções:\n\n🚀 **Esfera Growth** — R$ 1.997 ⭐ *Mais vendido*\nSite + ecossistema de crescimento + consultoria individual + programa de indicações\n\n⚡ **Site Profissional** — R$ 997\nSite completo com IA, SEO, design personalizado e entrega em 7 dias\n\nQual opção combina mais com o momento do seu negócio?`, PLANO_OPTIONS);
          }
          setStep("planos");
        }, 600);
        break;

      case "planos": {
        const lid = crmLeadIdRef.current;
        if (lid) updateLeadStage(lid, "qualificado", "proposta_apresentada").catch(console.error);
        const currentLead = leadRef.current;
        let planoMsg = "";
        if (userInput.includes("1.997") || userInput.includes("Growth")) {
          planoMsg = `Ótima decisão, **${currentLead.nome}**! 🚀\n\nO **Esfera Growth** é o nosso carro-chefe — site profissional + ecossistema completo de crescimento com consultoria, programa de indicações e dashboard exclusivo.\n\n📱 **Contato:** ${currentLead.telefone}\n💼 **Interesse:** ${currentLead.interesse}\n🏢 **Negócio:** ${currentLead.tipoNegocio}\n💰 **Plano:** Esfera Growth — R$ 1.997`;
        } else {
          planoMsg = `Perfeito, **${currentLead.nome}**! ⚡\n\nO **Site Profissional** é ideal pra começar com o pé direito — site completo com IA, SEO otimizado, design personalizado e entrega em até 7 dias!\n\n📱 **Contato:** ${currentLead.telefone}\n💼 **Interesse:** ${currentLead.interesse}\n🏢 **Negócio:** ${currentLead.tipoNegocio}\n💰 **Plano:** Site Profissional — R$ 997`;
        }
        setTimeout(() => {
          addBotMessage(planoMsg + `\n\nClique abaixo para falar com nosso especialista e garantir sua vaga! 👇`);
          setStep("finalizar");
          if (isHighIntent(leadRef.current)) setTimeout(() => sendToWhatsApp(leadRef.current), 3000);
        }, 600);
        break;
      }
    }
  }, [addBotMessage, addUserMessage, refCodeData, sendToWhatsApp]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    processStep(trimmed, step);
  };

  const handleOption = (option: string) => processStep(option, step);

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const renderMarkdown = (text: string) => {
    const safe = escapeHtml(text);
    return safe
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return {
    isOpen, setIsOpen,
    messages, input, setInput,
    step, lead, showPulse,
    isBubbleVisible,
    handleSend, handleOption,
    sendToWhatsApp: () => sendToWhatsApp(lead),
    renderMarkdown,
  };
}
