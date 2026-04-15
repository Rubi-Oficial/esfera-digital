import logoIcon from "@/assets/logo-icon.png";

interface AnimatedLogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = "md", showText = true, className = "" }: AnimatedLogoProps) => {
  const imgSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoIcon}
        alt="Esfera Digital"
        className={`${imgSize} object-contain drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]`}
        width={size === "sm" ? 32 : 40}
        height={size === "sm" ? 32 : 40}
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
