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
      className={`text-center mb-14 ${className}`}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          {label}
        </span>
      )}
      <h2 id={titleId} className="text-3xl md:text-5xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
