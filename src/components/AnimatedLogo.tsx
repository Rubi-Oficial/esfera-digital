import logoSrc from "@/assets/logo-esfera.png";

interface AnimatedLogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = "md", showText = true, className = "" }: AnimatedLogoProps) => {
  const imgSize = size === "sm" ? "h-8" : "h-10";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoSrc}
        alt="Esfera Soluções Digitais"
        className={`${imgSize} w-auto object-contain`}
      />
    </div>
  );
};

export default AnimatedLogo;
