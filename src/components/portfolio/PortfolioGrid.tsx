import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import PortfolioImage from "./PortfolioImage";
import { slideVariants, type Project } from "./data";

interface PortfolioGridProps {
  items: Project[];
  active: string;
  page: number;
  direction: number;
  onSelect: (project: Project) => void;
}

const PortfolioGrid = ({ items, active, page, direction, onSelect }: PortfolioGridProps) => (
  <div className="overflow-hidden">
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={`${active}-${page}`}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="list"
      >
        {items.map((project) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect(project)}
            className="group block rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-500 cursor-pointer"
            role="listitem"
            aria-label={`${project.name} - ${project.desc}`}
          >
            <div className="relative aspect-video overflow-hidden">
              <PortfolioImage src={project.img} alt={project.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                  <Eye size={14} aria-hidden="true" /> Ver Preview
                </span>
              </div>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-primary border border-primary/20">
                {project.cat}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default PortfolioGrid;
