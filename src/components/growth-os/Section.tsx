import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ id, className = "", children }: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.7, 1, 0.7, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);

  return (
    <section ref={ref} id={id} className={`section-padding relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] left-1/2 -translate-x-1/2 top-0 pointer-events-none"
        style={{ y: orbY, opacity: orbOpacity, scale: orbScale }}
        aria-hidden="true"
      />
      <div className="container px-4 md:px-8 relative z-10">{children}</div>
    </section>
  );
};

export default Section;
