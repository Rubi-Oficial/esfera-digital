import AnimatedLogo from "./AnimatedLogo";
import { FOOTER_LINKS } from "@/lib/constants";
import { openChatbot } from "@/lib/chatbot-events";
import { ArrowRight, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 bg-card/30" role="contentinfo">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="py-12 md:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col gap-4">
            <a href="#" aria-label="Voltar ao topo - Esfera Soluções Digitais">
              <AnimatedLogo size="sm" className="opacity-80 hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Websites de alto impacto com inteligência artificial integrada. Transformamos sua presença digital em resultados reais.
            </p>
            <button
              onClick={() => openChatbot()}
              className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-all mt-1 group w-fit py-1"
            >
              <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-all">
                <MessageCircle size={16} className="text-primary" />
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
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 py-1 inline-block hover:translate-x-0.5 transition-transform"
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
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Nosso sistema entende seu negócio e te mostra o melhor caminho.
            </p>
            <button
              onClick={() => openChatbot()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 hover:border-primary/30 active:bg-primary/20 transition-all group hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            >
              Comece agora
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="border-t border-border/20 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            © {currentYear} Esfera Soluções Digitais. Todos os direitos reservados.
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
