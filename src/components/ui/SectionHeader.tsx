import { motion } from "framer-motion";
import { sectionEntrance } from "@/lib/animations";

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  titleId?: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({ label, title, titleId, subtitle, className = "" }: SectionHeaderProps) => {
  return (
    <motion.div
      {...sectionEntrance}
      className={`text-center mb-10 md:mb-14 ${className}`}
    >
      {label && (
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5">
          {label}
        </span>
      )}
      <h2 id={titleId} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
