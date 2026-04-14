import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = "md", showText = true, className = "" }: AnimatedLogoProps) => {
  const sphereSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const innerInset = size === "sm" ? "inset-1" : "inset-1.5";
  const coreInset = size === "sm" ? "inset-2" : "inset-3";
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";
  const orbitRadius = size === "sm" ? 12 : 16;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sphereSize}`}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.div
          className={`absolute ${innerInset} rounded-full border-2 border-primary/40`}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Core sphere */}
        <motion.div
          className={`absolute ${coreInset} rounded-full bg-gradient-to-br from-primary to-primary/60`}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbital dot */}
        <motion.div
          className={`absolute ${dotSize} rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]`}
          style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
          animate={{
            x: [0, orbitRadius, 0, -orbitRadius, 0],
            y: [-orbitRadius, 0, orbitRadius, 0, -orbitRadius],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {showText && (
        <span className="text-lg font-bold tracking-tight">
          <span className="text-primary">Esfera</span>
          <span className="text-foreground"> Digital</span>
        </span>
      )}
    </div>
  );
};

export default AnimatedLogo;
