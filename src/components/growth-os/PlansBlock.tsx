import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { plans, type Plan } from "./data";

interface PlansBlockProps {
  onSelectPlan: (plan: Plan) => void;
}

const PlansBlock = ({ onSelectPlan }: PlansBlockProps) => (
  <Section id="planos">
    <SectionTitle
      label="Investimento"
      title={<>Escolha o plano ideal e <span className="text-gradient">comece agora</span></>}
      subtitle="Duas opções pensadas para diferentes momentos do seu negócio."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto" style={{ perspective: 1400 }}>
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, rotateY: -20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            rotateY: i === 0 ? 5 : -5,
            rotateX: -3,
            y: -8,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`group relative rounded-3xl p-7 flex flex-col transition-shadow duration-500 ${
            plan.popular
              ? "border-2 border-primary glow-box-strong bg-card hover:shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.4)]"
              : "glass hover:border-primary/30 hover:shadow-[0_24px_50px_-15px_hsl(var(--primary)/0.25)]"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 50%, hsl(var(--primary) / 0.04) 100%)",
              transform: "translateZ(1px)",
            }}
          />

          {plan.popular && (
            <span
              className="absolute -top-3.5 left-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg"
              style={{ transform: "translate(-50%, 0) translateZ(40px)" }}
            >
              Recomendado
            </span>
          )}
          <div className="text-center mb-6 mt-2" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{plan.desc}</p>
            <p className="text-muted-foreground line-through text-sm mb-1">De {plan.priceOriginal}</p>
            <p className="text-4xl font-extrabold text-gradient">{plan.price}</p>
            <p className="text-xs text-muted-foreground mt-1">implantação</p>
            <div className="mt-3 glass rounded-lg py-2 px-3 inline-block border border-primary/20">
              <span className="text-sm font-semibold text-primary">+ {plan.priceMonthly}</span>
            </div>
          </div>
          <ul className="space-y-2.5 mb-8 flex-1" style={{ transform: "translateZ(15px)" }}>
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <Check size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSelectPlan(plan)}
            aria-label={plan.popular ? "Começar com Esfera Growth" : "Começar com Site Profissional"}
            style={{ transform: "translateZ(30px)" }}
            className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              plan.popular ? "btn-premium" : "border border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            {plan.popular ? "Começar com Esfera Growth" : "Começar com Site Profissional"}{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default PlansBlock;
