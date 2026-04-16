import { motion } from "framer-motion";

interface SectionTitleProps {
  label: string;
  title: React.ReactNode;
  subtitle: string;
}

const SectionTitle = ({ label, title, subtitle }: SectionTitleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className="text-center mb-12"
  >
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5">
      {label}
    </span>
    <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{title}</h2>
    <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
  </motion.div>
);

export default SectionTitle;
