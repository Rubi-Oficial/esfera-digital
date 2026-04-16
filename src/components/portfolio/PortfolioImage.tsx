import { useState } from "react";

interface PortfolioImageProps {
  src: string;
  alt: string;
}

const PortfolioImage = ({ src, alt }: PortfolioImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-sm font-medium">
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Site ${alt} - projeto desenvolvido pela Esfera Soluções Digitais`}
      loading="lazy"
      width="600"
      height="400"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      onError={() => setFailed(true)}
    />
  );
};

export default PortfolioImage;
