import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Planos", href: "#planos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <a href="#" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-foreground">ESFERA</span>
          <span className="text-gradient ml-1 text-sm font-medium">Soluções Digitais</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5548991061707?text=Olá, gostaria de falar com um especialista"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
          >
            Falar com Especialista
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border/50"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/5548991061707?text=Olá, gostaria de falar com um especialista"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center"
              >
                Falar com Especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
