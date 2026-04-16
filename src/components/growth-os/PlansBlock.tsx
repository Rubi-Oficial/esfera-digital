import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { plans, type Plan } from "./data";

interface PlansBlockProps {
  onSelectPlan: (plan: Plan) => void;
}

const PlansBlock = ({ onSelectPlan }: PlansBlockProps) => (
  <Section id="planos-growth">
    <SectionTitle
      label="Investimento"
      title={<>Escolha o plano ideal e <span className="text-gradient">comece agora</span></>}
      subtitle="Duas opções pensadas para diferentes momentos do seu negócio."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`relative rounded-3xl p-7 flex flex-col ${plan.popular ? "border-2 border-primary glow-box-strong bg-card" : "glass"}`}
        >
          {plan.popular && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
              Recomendado
            </span>
          )}
          <div className="text-center mb-6 mt-2">
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{plan.desc}</p>
            <p className="text-muted-foreground line-through text-sm mb-1">De {plan.priceOriginal}</p>
            <p className="text-4xl font-extrabold text-gradient">{plan.price}</p>
            <p className="text-xs text-muted-foreground mt-1">implantação</p>
            <div className="mt-3 glass rounded-lg py-2 px-3 inline-block border border-primary/20">
              <span className="text-sm font-semibold text-primary">+ {plan.priceMonthly}</span>
            </div>
          </div>
          <ul className="space-y-2.5 mb-8 flex-1">
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <Check size={14} className="text-primary shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSelectPlan(plan)}
            className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all ${
              plan.popular ? "btn-premium" : "border border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            {plan.popular ? "Começar com Esfera Growth" : "Começar com Site Profissional"} <ArrowRight size={14} />
          </button>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default PlansBlock;
