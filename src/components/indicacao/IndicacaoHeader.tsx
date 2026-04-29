import AnimatedLogo from "@/components/AnimatedLogo";

const IndicacaoHeader = () => (
  <header className="sticky top-16 md:top-[72px] z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center">
          <AnimatedLogo size="sm" />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
          💰 Parcerias Growth OS
        </span>
      </div>
    </div>
  </header>
);

export default IndicacaoHeader;
