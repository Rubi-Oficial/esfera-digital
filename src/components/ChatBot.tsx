import { motion, AnimatePresence } from "framer-motion";
import { useChatBot } from "./chatbot/useChatBot";
import ChatBubble from "./chatbot/ChatBubble";
import ChatHeader from "./chatbot/ChatHeader";
import ChatMessages from "./chatbot/ChatMessages";
import ChatInput from "./chatbot/ChatInput";

const ChatBot = () => {
  const {
    isOpen, setIsOpen,
    messages, input, setInput,
    step, lead, showPulse,
    isBubbleVisible,
    handleSend, handleOption,
    sendToWhatsApp, renderMarkdown,
  } = useChatBot();

  return (
    <>
      <AnimatePresence>
        {!isOpen && isBubbleVisible && (
          <ChatBubble showPulse={showPulse} onClick={() => setIsOpen(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] sm:max-w-[calc(100vw-2rem)] h-[100dvh] sm:h-[540px] sm:max-h-[calc(100vh-4rem)] flex flex-col sm:rounded-2xl overflow-hidden border-0 sm:border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.5)] bg-background"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />
            <ChatMessages
              messages={messages}
              step={step}
              lead={lead}
              onOption={handleOption}
              onWhatsApp={sendToWhatsApp}
              renderMarkdown={renderMarkdown}
            />
            {step !== "finalizar" && (
              <ChatInput value={input} onChange={setInput} onSend={handleSend} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
