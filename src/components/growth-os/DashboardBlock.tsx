import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { dashboardMetrics } from "./data";
import dashboardImg from "@/assets/growth-os-dashboard.webp";

const DashboardBlock = () => (
  <Section id="dashboard">
    <SectionTitle
      label="Dashboard"
      title={<>Métricas em <span className="text-gradient">tempo real</span></>}
      subtitle="Acompanhe cada indicador do seu funil comercial com clareza e precisão."
    />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {dashboardMetrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 text-center"
          >
            <m.icon size={18} className="text-primary mx-auto mb-2" />
            <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-0.5">{m.value}</p>
            <p className="text-[11px] font-medium text-foreground mb-0.5">{m.label}</p>
            <span className="text-[10px] text-primary font-medium">{m.change}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
        <img
          src={dashboardImg}
          alt="Dashboard Esfera Growth completo"
          className="w-full h-auto object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
        Leads, conversas, vendas e receita — tudo centralizado em uma interface intuitiva.
      </p>
    </motion.div>
  </Section>
);

export default DashboardBlock;
