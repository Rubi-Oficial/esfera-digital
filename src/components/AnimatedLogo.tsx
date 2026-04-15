import { motion } from "framer-motion";
import logoSphere from "@/assets/logo-sphere.png";

interface AnimatedLogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = "md", showText = true, className = "" }: AnimatedLogoProps) => {
  const imgSize = size === "sm" ? 32 : 40;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.img
        src={logoSphere}
        alt="Esfera Digital"
        className="object-contain drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
        style={{ width: imgSize, height: imgSize }}
        width={imgSize}
        height={imgSize}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {showText && (
        <span className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          <span className="text-foreground">ESFERA</span>
          <span className="text-primary ml-1.5" style={{ letterSpacing: "0.15em" }}>DIGITAL</span>
        </span>
      )}
    </div>
  );
};

export default AnimatedLogo;
