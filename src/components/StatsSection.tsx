import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 87, prefix: "+", suffix: "", label: "Projetos Entregues" },
  { value: 52, prefix: "+", suffix: "", label: "Empresas Atendidas" },
  { value: 94, prefix: "", suffix: "%", label: "Satisfação" },
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
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-gradient">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-8">
        <div className="glass rounded-2xl p-10 md:p-16 glow-box">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Números <span className="text-gradient">Reais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                <p className="text-muted-foreground mt-2 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
