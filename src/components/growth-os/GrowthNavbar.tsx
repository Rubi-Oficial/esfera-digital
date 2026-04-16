import { ArrowRight } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { whatsappUrl } from "@/lib/constants";
import { WA_GENERIC } from "./data";

const navLinks = [
  { href: "#portfolio", label: "Portfólio" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#planos-growth", label: "Planos" },
];

const GrowthNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/30">
    <div className="container flex items-center justify-between h-16 px-4 md:px-8">
      <a href="/" aria-label="Esfera Digital - Página inicial" className="flex items-center">
        <AnimatedLogo size="sm" />
      </a>
      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={whatsappUrl(WA_GENERIC)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium px-5 py-2.5 text-sm inline-flex items-center gap-2"
        >
          <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </nav>
);

export default GrowthNavbar;
