import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
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
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between h-16 md:h-18 px-4 md:px-8">
        <Link to="/" aria-label="Esfera Soluções Digitais - Página inicial" className="flex items-center group">
          <span className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            <span className="text-foreground group-hover:text-foreground/90 transition-colors">ESFERA</span>
            <span className="text-primary ml-1.5 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all" style={{ letterSpacing: "0.15em" }}>DIGITAL</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {regularLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2.5 -mr-2 rounded-xl hover:bg-card/50 active:bg-card/70 transition-colors"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              className="absolute w-5 h-0.5 bg-foreground rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="absolute w-5 h-0.5 bg-foreground rounded-full"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              className="absolute w-5 h-0.5 bg-foreground rounded-full"
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 top-16 bg-background/60 backdrop-blur-md z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-t border-border/30 relative z-50 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-col gap-1 p-5 pb-6">
                {regularLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground active:text-primary hover:bg-card/50 active:bg-card/70 transition-all px-4 py-3.5 rounded-xl text-base font-medium"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: "easeOut" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {specialLink && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: regularLinks.length * 0.04 }}
                  >
                    <Link
                      to={specialLink.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-primary hover:bg-primary/10 active:bg-primary/15 transition-all px-4 py-3.5 rounded-xl text-base font-semibold"
                    >
                      <Rocket size={18} />
                      {specialLink.label}
                    </Link>
                  </motion.div>
                )}
                <motion.div
                  className="pt-4 mt-2 border-t border-border/20"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (regularLinks.length + 1) * 0.04 }}
                >
                  <ChatbotTrigger
                    size="md"
                    showArrow={false}
                    ariaLabel="Falar com especialista agora"
                    className="w-full text-center justify-center"
                  >
                    Falar com Especialista
                  </ChatbotTrigger>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
