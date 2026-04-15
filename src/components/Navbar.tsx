import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo";
import ChatbotTrigger from "./ui/ChatbotTrigger";
import { NAV_LINKS } from "@/lib/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y > lastY && y > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(y);
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (href?.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          setOpen(false);
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 350);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const regularLinks = NAV_LINKS.filter(l => !('isSpecial' in l && l.isSpecial));
  const specialLink = NAV_LINKS.find(l => 'isSpecial' in l && l.isSpecial);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between h-16 md:h-18 px-4 md:px-8">
        <a href="#" aria-label="Esfera Soluções Digitais - Página inicial" className="flex items-center">
          <AnimatedLogo size="sm" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {regularLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          {specialLink && (
            <Link
              to={specialLink.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
            >
              <Rocket size={16} />
              {specialLink.label}
            </Link>
          )}
          <ChatbotTrigger
            size="sm"
            showArrow={false}
            ariaLabel="Falar com especialista agora"
            className={`btn-premium ${scrolled ? "shadow-[0_0_15px_hsl(var(--primary)/0.2)]" : ""}`}
          >
            Falar com Especialista
          </ChatbotTrigger>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2 -mr-2 rounded-lg hover:bg-card/50 transition-colors"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 top-16 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/98 backdrop-blur-2xl border-t border-border/30 relative z-50"
            >
              <div className="flex flex-col gap-1 p-6">
                {regularLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all px-4 py-3 rounded-xl text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {specialLink && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: regularLinks.length * 0.06 }}
                  >
                    <Link
                      to={specialLink.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-primary hover:bg-primary/10 transition-all px-4 py-3 rounded-xl text-base font-semibold"
                    >
                      <Rocket size={18} />
                      {specialLink.label}
                    </Link>
                  </motion.div>
                )}
                <div className="pt-4 mt-2 border-t border-border/20">
                  <ChatbotTrigger
                    size="md"
                    showArrow={false}
                    ariaLabel="Falar com especialista agora"
                    className="w-full text-center"
                  >
                    Falar com Especialista
                  </ChatbotTrigger>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
