import logo from "@/assets/logo-esfera.png";

const footerLinks = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Planos", href: "#planos" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-10" role="contentinfo">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" aria-label="Voltar ao topo - Esfera Soluções Digitais">
            <img src={logo} alt="Esfera Soluções Digitais - Logotipo" className="h-8" width="120" height="32" />
          </a>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
