// Global event system to open chatbot from anywhere
const CHATBOT_OPEN_EVENT = "chatbot:open";

export const openChatbot = () => {
  window.dispatchEvent(new CustomEvent(CHATBOT_OPEN_EVENT));
};

export const onChatbotOpen = (callback: () => void) => {
  window.addEventListener(CHATBOT_OPEN_EVENT, callback);
  return () => window.removeEventListener(CHATBOT_OPEN_EVENT, callback);
};
