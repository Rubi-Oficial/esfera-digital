import AnimatedLogo from "./AnimatedLogo";
import { FOOTER_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12" role="contentinfo">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#" aria-label="Voltar ao topo - Esfera Soluções Digitais">
            <AnimatedLogo size="sm" className="opacity-80 hover:opacity-100 transition-opacity" />
          </a>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    title={link.title}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Esfera Soluções Digitais
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
