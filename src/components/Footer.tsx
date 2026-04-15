import AnimatedLogo from "./AnimatedLogo";
import { FOOTER_LINKS } from "@/lib/constants";
import { openChatbot } from "@/lib/chatbot-events";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/30" role="contentinfo">
      <div className="container px-4 md:px-8">
        <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" aria-label="Voltar ao topo - Esfera Soluções Digitais">
              <AnimatedLogo size="sm" className="opacity-80 hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Websites de alto impacto com inteligência artificial integrada. Transformamos sua presença digital em resultados reais.
            </p>
            <button
              onClick={openChatbot}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-1 group w-fit"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                💬
              </span>
              Falar com especialista
            </button>
          </div>

          {/* Links column */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Navegação</h3>
            <nav aria-label="Links do rodapé">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
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

          {/* CTA column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Pronto para começar?</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Nosso sistema entende seu negócio e te mostra o melhor caminho.
            </p>
            <button
              onClick={openChatbot}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 hover:border-primary/30 transition-all"
            >
              Comece agora
            </button>
          </div>
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
