import { motion } from "framer-motion";
import { trustBadges } from "./data";

const TrustBar = () => (
  <section className="relative z-10 -mt-6 pb-8">
    <div className="container px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {trustBadges.map((badge, i) => (
          <div key={i} className="glass rounded-xl px-5 py-4 flex items-center gap-3 text-center sm:text-left justify-center sm:justify-start">
            <badge.icon size={20} className="text-primary shrink-0" />
            <span className="text-sm font-medium text-secondary-foreground">{badge.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBar;
