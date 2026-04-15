import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo-icon.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo sphere */}
            <motion.img
              src={logoIcon}
              alt="Esfera Digital"
              className="w-20 h-20 object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              width={80}
              height={80}
            />

            {/* Brand text */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-foreground">ESFERA</span>
                <span className="text-primary ml-2" style={{ letterSpacing: "0.15em" }}>DIGITAL</span>
              </h1>
              <motion.p
                className="text-xs text-muted-foreground tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Websites com Inteligência Artificial
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-0.5 bg-muted rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
