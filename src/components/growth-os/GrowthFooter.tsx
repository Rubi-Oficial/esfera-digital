import AnimatedLogo from "@/components/AnimatedLogo";

const GrowthFooter = () => (
  <footer className="border-t border-border/30 bg-card/30 py-8">
    <div className="container px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <a href="/" className="flex items-center">
        <AnimatedLogo size="sm" className="opacity-60 hover:opacity-100 transition-opacity" />
      </a>
      <p className="text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default GrowthFooter;
