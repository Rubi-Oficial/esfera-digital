import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@/assets/logo-esfera.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2800);
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
            className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
            style={{ background: "radial-gradient(circle, hsl(210 80% 50% / 0.25), transparent 70%)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo image */}
            <motion.img
              src={logoSrc}
              alt="Esfera Soluções Digitais"
              className="w-64 md:w-80 h-auto"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.2 }}
            />

            {/* Tagline */}
            <motion.p
              className="text-xs text-muted-foreground tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Sites que geram clientes no automático
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-0.5 bg-muted rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(210 80% 50%), hsl(200 90% 60%))" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
