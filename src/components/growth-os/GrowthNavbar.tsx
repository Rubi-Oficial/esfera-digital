import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";

const navLinks = [
  { href: "#portfolio", label: "Portfólio" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#planos-growth", label: "Planos" },
];

const GrowthNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          : "bg-background/70 backdrop-blur-xl border-b border-border/20"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <a href="/" aria-label="Esfera Digital - Página inicial" className="flex items-center shrink-0">
          <AnimatedLogo size="sm" />
        </a>

        <div className="hidden md:flex items-center gap-1" role="menubar">
          {navLinks.map((link) => {
            const isActive = activeId === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                aria-current={isActive ? "true" : undefined}
                className={`relative text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-6 h-0.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-muted/40 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-border/30 bg-background/98 backdrop-blur-2xl ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default GrowthNavbar;
