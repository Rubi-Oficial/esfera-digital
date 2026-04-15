import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building2, ThumbsUp } from "lucide-react";
import { staggerContainer, fadeInScale } from "@/lib/animations";

const stats = [
  { value: 87, prefix: "+", suffix: "", label: "Projetos Entregues", icon: Briefcase },
  { value: 52, prefix: "+", suffix: "", label: "Empresas Atendidas", icon: Building2 },
  { value: 94, prefix: "", suffix: "%", label: "Satisfação dos Clientes", icon: ThumbsUp },
];

const CountUp = ({ end, prefix, suffix, duration = 2 }: { end: number; prefix: string; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(end / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient tabular-nums drop-shadow-[0_0_20px_hsl(152_100%_50%/0.3)]">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="stats-heading">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px] pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      />
      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass rounded-2xl p-8 md:p-14 glow-box relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 id="stats-heading" className="text-2xl md:text-3xl font-bold text-center mb-12">
              Números <span className="text-gradient">Reais</span>
            </h2>
            <motion.div
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeInScale} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                  <p className="text-muted-foreground mt-2 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
