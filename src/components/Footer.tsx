import AnimatedLogo from "./AnimatedLogo";
import { FOOTER_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/30" role="contentinfo">
      <div className="container px-4 md:px-8">
        <div className="py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <a href="#" aria-label="Voltar ao topo - Esfera Soluções Digitais">
              <AnimatedLogo size="sm" className="opacity-80 hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Websites de alto impacto com inteligência artificial integrada.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap items-center gap-6 md:gap-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    title={link.title}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Feito com estratégia, design e I.A.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
