// Global event system to open chatbot from anywhere
const CHATBOT_OPEN_EVENT = "chatbot:open";

export interface ChatbotOpenDetail {
  initialMessage?: string;
}

export const openChatbot = (detail?: ChatbotOpenDetail) => {
  window.dispatchEvent(new CustomEvent<ChatbotOpenDetail>(CHATBOT_OPEN_EVENT, { detail: detail || {} }));
};

export const onChatbotOpen = (callback: (detail: ChatbotOpenDetail) => void) => {
  const handler = (e: Event) => callback((e as CustomEvent<ChatbotOpenDetail>).detail || {});
  window.addEventListener(CHATBOT_OPEN_EVENT, handler);
  return () => window.removeEventListener(CHATBOT_OPEN_EVENT, handler);
};
