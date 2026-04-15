import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color?: string;
  blur?: number;
  speed?: number;
}

const defaultOrbs: OrbConfig[] = [
  { size: 400, x: "20%", y: "30%", blur: 120, speed: 0.4 },
  { size: 200, x: "75%", y: "60%", blur: 100, speed: -0.3 },
  { size: 3, x: "85%", y: "20%", blur: 0, speed: 0.6 },
  { size: 2, x: "10%", y: "70%", blur: 0, speed: -0.5 },
  { size: 2, x: "50%", y: "15%", blur: 0, speed: 0.8 },
];

interface Props {
  orbs?: OrbConfig[];
  className?: string;
}

const ParallaxOrbs = ({ orbs = defaultOrbs, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {orbs.map((orb, i) => {
        const speed = orb.speed ?? 0.3;
        return (
          <ParallaxOrb key={i} orb={orb} speed={speed} scrollYProgress={scrollYProgress} />
        );
      })}
    </div>
  );
};

const ParallaxOrb = ({ orb, speed, scrollYProgress }: { orb: OrbConfig; speed: number; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) => {
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  const isSmall = orb.size <= 4;

  return (
    <motion.div
      className={`absolute rounded-full ${isSmall ? "bg-primary animate-pulse-glow" : "bg-primary/5"}`}
      style={{
        width: orb.size,
        height: orb.size,
        left: orb.x,
        top: orb.y,
        filter: orb.blur ? `blur(${orb.blur}px)` : undefined,
        y,
      }}
    />
  );
};

export default ParallaxOrbs;
