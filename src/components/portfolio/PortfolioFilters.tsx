import { motion } from "framer-motion";
import { categories } from "./data";

interface PortfolioFiltersProps {
  active: string;
  onChange: (cat: string) => void;
}

const PortfolioFilters = ({ active, onChange }: PortfolioFiltersProps) => (
  <motion.nav
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.5 }}
    aria-label="Filtrar por categoria"
    className="flex flex-wrap justify-center gap-2 mb-10"
  >
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        aria-pressed={active === cat}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          active === cat
            ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {cat}
      </button>
    ))}
  </motion.nav>
);

export default PortfolioFilters;
