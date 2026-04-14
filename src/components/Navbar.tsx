import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import WhatsAppLink from "./ui/WhatsAppLink";
import { NAV_LINKS, WHATSAPP_MESSAGES } from "@/lib/constants";

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
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash?.startsWith("#")) {
        const el = document.querySelector(target.hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <a href="#" aria-label="Esfera Soluções Digitais - Página inicial" className="flex items-center">
          <AnimatedLogo size="sm" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.specialist}
            size="sm"
            showArrow={false}
            ariaLabel="Falar com especialista via WhatsApp"
            className={scrolled ? "shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "bg-primary/90 hover:bg-primary"}
          >
            Falar com Especialista
          </WhatsAppLink>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="flex flex-col gap-4 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.specialist}
                size="md"
                showArrow={false}
                ariaLabel="Falar com especialista via WhatsApp"
                className="text-center"
              >
                Falar com Especialista
              </WhatsAppLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
