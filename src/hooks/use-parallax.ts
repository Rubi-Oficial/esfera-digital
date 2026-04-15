import { useScroll, useTransform } from "framer-motion";
import { useRef, RefObject } from "react";

/**
 * Enhanced parallax hook with depth-based movement, scale, and opacity.
 * @param speed - Movement multiplier (default 1). Higher = more movement.
 * @param withScale - Whether to add subtle scale pulsing (default false).
 */
export function useParallax(speed: number = 1, withScale = false) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.3, 0.8, 1, 0.8, 0.3]);
  const scale = withScale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85])
    : undefined;

  return { ref, y, opacity, scale, scrollYProgress };
}

/**
 * Create parallax motion values from an existing scrollYProgress.
 * Use when you already have a section ref and don't want a second scroll listener.
 */
export function useParallaxValues(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  speed: number = 1,
  withScale = false
) {
  const range = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.3, 0.8, 1, 0.8, 0.3]);
  const scale = withScale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85])
    : undefined;

  return { y, opacity, scale };
}
