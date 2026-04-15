import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowDown, Check, X, Zap, Users, MessageSquare,
  BarChart3, Bot, Smartphone, Clock, TrendingUp, Target, Rocket,
  Shield, RefreshCw, Mail, Phone, Building2, ChevronRight
} from "lucide-react";
import { whatsappUrl, WHATSAPP_PHONE } from "@/lib/constants";
import NetworkBackground from "@/components/NetworkBackground";
import AnimatedLogo from "@/components/AnimatedLogo";
import SEOHead from "@/components/SEOHead";
import ScrollToTop from "@/components/ScrollToTop";
import dashboardImg from "@/assets/growth-os-dashboard.jpg";

const WA_GROWTH = "Olá! Quero ativar meu Growth OS com IA!";
const WA_STARTER = "Olá! Quero saber mais sobre o plano Starter do Growth OS";
const WA_GROWTH_PLAN = "Olá! Quero o plano Growth do Growth OS";
const WA_SCALE = "Olá! Quero o plano Scale do Growth OS";

const problems = [
  { icon: X, text: "Leads que não respondem", detail: "Você investe em anúncios, mas o contato esfria antes de fechar." },
  { icon: X, text: "Falta de organização", detail: "Leads espalhados no WhatsApp, planilha e papel. Impossível acompanhar." },
  { icon: Clock, text: "Demora no atendimento", detail: "Cada minuto de atraso reduz 10% a chance de conversão." },
];

const solution = [
  { icon: Target, title: "Captação", desc: "Site e landing pages otimizadas para gerar leads qualificados automaticamente.", emoji: "🎯" },
  { icon: BarChart3, title: "Gestão", desc: "CRM visual simples para acompanhar cada lead do primeiro contato ao fechamento.", emoji: "📊" },
  { icon: Bot, title: "Automação", desc: "WhatsApp com IA que atende, qualifica e agenda — 24 horas por dia.", emoji: "🤖" },
];

const steps = [
  { num: "01", title: "Cliente entra no site", desc: "Sua landing page otimizada captura o lead automaticamente." },
  { num: "02", title: "Lead cai no CRM", desc: "Dados organizados no pipeline visual. Sem planilha, sem bagunça." },
  { num: "03", title: "IA inicia atendimento", desc: "Resposta automática no WhatsApp em segundos — não em horas." },
  { num: "04", title: "Lead qualificado", desc: "A IA filtra e encaminha só os leads prontos para comprar." },
  { num: "05", title: "Conversão", desc: "Acompanhamento automático até o fechamento e pós-venda." },
];

const dashboardMetrics = [
  { label: "Leads do mês", value: "127", change: "+23%", desc: "Total de contatos capturados" },
  { label: "Em atendimento", value: "34", change: "ativo", desc: "Leads sendo trabalhados pela IA" },
  { label: "Taxa de resposta", value: "89%", change: "+15%", desc: "Leads que responderam em 24h" },
  { label: "Conversões", value: "18", change: "+31%", desc: "Vendas fechadas no período" },
  { label: "Receita estimada", value: "R$ 45K", change: "+28%", desc: "Faturamento gerado pelo sistema" },
];

const features = [
  { icon: Smartphone, title: "Integração com WhatsApp" },
  { icon: BarChart3, title: "CRM com pipeline visual" },
  { icon: Target, title: "Captura automática de leads" },
  { icon: Bot, title: "Respostas automáticas com IA" },
  { icon: RefreshCw, title: "Follow-up automático" },
  { icon: TrendingUp, title: "Relatório de performance" },
];

const plans = [
  {
    name: "Starter",
    price: "R$ 997",
    desc: "Ideal para começar",
    features: ["Site otimizado para conversão", "Captura automática de leads", "Integração WhatsApp", "Relatório básico"],
    wa: WA_STARTER,
    popular: false,
  },
  {
    name: "Growth",
    price: "R$ 1.997",
    desc: "Mais vendido",
    features: ["Tudo do Starter", "CRM com pipeline visual", "Automação de WhatsApp com IA", "Follow-up automático", "Dashboard completo"],
    wa: WA_GROWTH_PLAN,
    popular: true,
  },
  {
    name: "Scale",
    price: "R$ 3.497",
    desc: "Para escalar",
    features: ["Tudo do Growth", "IA avançada de qualificação", "Otimização contínua", "Múltiplos funis", "Suporte prioritário"],
    wa: WA_SCALE,
    popular: false,
  },
];

const GrowthOS = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <>
      <SEOHead
        title="Growth OS com IA para PMEs"
        description="Transforme seu site em uma máquina de gerar clientes. Automatize atendimento, organize leads e aumente vendas com IA e WhatsApp."
        path="/growth-os"
        type="website"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-border/30">
          <div className="container flex items-center justify-between h-16 px-4 md:px-8">
            <a href="/" aria-label="Esfera Digital - Página inicial" className="flex items-center">
              <AnimatedLogo size="sm" />
            </a>
            <a
              href={whatsappUrl(WA_GROWTH)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium px-5 py-2.5 text-sm inline-flex items-center gap-2"
            >
              Quero mais clientes
              <ArrowRight size={14} />
            </a>
          </div>
        </nav>

        <main>
          {/* ===== 1. HERO ===== */}
          <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
            <NetworkBackground />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[160px]" aria-hidden="true" />

            <motion.div className="container relative z-10 px-4 md:px-8 py-20" style={{ y: heroY, opacity: heroOpacity }}>
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8 tracking-widest uppercase"
                  >
                    <Zap size={12} className="animate-pulse" /> Growth OS com IA
                  </motion.div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                    <span className="text-gradient">Transforme seu site</span><br />
                    <span className="text-foreground/95">em uma máquina de gerar clientes</span>
                  </h1>

                  <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed lg:mx-0 mx-auto">
                    Automatize atendimento, organize seus leads e <strong className="text-foreground font-semibold">aumente suas vendas com IA e WhatsApp</strong> — sem complicação.
                  </p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                  >
                    <a href={whatsappUrl(WA_GROWTH)} target="_blank" rel="noopener noreferrer"
                      className="btn-premium px-8 py-4 text-lg inline-flex items-center gap-2 font-bold"
                    >
                      Quero mais clientes agora <ArrowRight size={18} />
                    </a>
                    <a href="#como-funciona" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                      Ver como funciona <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative hidden lg:block"
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-[60px] scale-90" aria-hidden="true" />
                  <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
                    <img src={dashboardImg} alt="Dashboard Growth OS - CRM, WhatsApp e métricas" className="w-full h-auto object-cover" width={1920} height={1080} fetchPriority="high" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ===== 2. PROBLEMA ===== */}
          <Section id="problema" className="section-divider">
            <SectionTitle label="⚠️ O Problema" title={<>Você está <span className="text-destructive">perdendo vendas</span> todos os dias</>} subtitle="Se alguma dessas dores parece familiar, o Growth OS foi feito pra você." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {problems.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-hover rounded-2xl p-6 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/15 transition-colors">
                    <p.icon size={22} className="text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.text}</h3>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 3. SOLUÇÃO ===== */}
          <Section id="solucao">
            <SectionTitle label="🤖 A Solução" title={<><span className="text-gradient">Growth OS</span> — Seu sistema de vendas com IA</>} subtitle="Simples, rápido e poderoso. Tudo o que você precisa em um só lugar." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {solution.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="glass-hover rounded-2xl p-7 text-center group relative overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <s.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.emoji} {s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 4. COMO FUNCIONA ===== */}
          <Section id="como-funciona" className="section-divider">
            <SectionTitle label="⚙️ Como Funciona" title={<>Do clique à venda em <span className="text-gradient">5 passos</span></>} subtitle="Automatize todo o processo de vendas — do primeiro contato ao fechamento." />
            <div className="max-w-3xl mx-auto space-y-4">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass-hover rounded-xl p-5 md:p-6 flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-all">
                    <span className="text-xl font-bold text-primary">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 5. DASHBOARD MVP ===== */}
          <Section id="dashboard">
            <SectionTitle label="📊 Dashboard" title={<>Seus números em <span className="text-gradient">tempo real</span></>} subtitle="Acompanhe cada métrica que importa. Sem complicação." />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {dashboardMetrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{m.value}</p>
                    <p className="text-xs font-medium text-foreground mb-0.5">{m.label}</p>
                    <span className="text-[10px] text-primary font-medium">{m.change}</span>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
                <img src={dashboardImg} alt="Dashboard Growth OS completo" className="w-full h-auto object-cover" loading="lazy" width={1920} height={1080} />
              </div>
            </motion.div>
          </Section>

          {/* ===== 6. FUNCIONALIDADES ===== */}
          <Section id="funcionalidades" className="section-divider">
            <SectionTitle label="🔧 Funcionalidades" title={<>Tudo que seu <span className="text-gradient">negócio precisa</span></>} subtitle="Ferramentas essenciais para vender mais, organizadas em um só sistema." />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass-hover rounded-xl p-5 text-center group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <f.icon size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-secondary-foreground">{f.title}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 7. PLANOS ===== */}
          <Section id="planos-growth">
            <SectionTitle label="💰 Planos" title={<>Escolha o plano <span className="text-gradient">ideal</span></>} subtitle="Comece pequeno e escale conforme cresce." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative rounded-3xl p-7 flex flex-col ${plan.popular ? "border-2 border-primary glow-box-strong bg-card" : "glass"}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                      🔥 Mais vendido
                    </span>
                  )}
                  <div className="text-center mb-6 mt-2">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{plan.desc}</p>
                    <p className="text-4xl font-extrabold text-gradient">{plan.price}</p>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-secondary-foreground">
                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl(plan.wa)} target="_blank" rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-center font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? "btn-premium"
                        : "border border-primary/40 text-primary hover:bg-primary/10"
                    }`}
                  >
                    Quero o {plan.name} <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 8. AUTORIDADE ===== */}
          <Section id="autoridade" className="section-divider">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase">
                <Shield size={12} /> Autoridade
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Criado <span className="text-gradient">para o mercado brasileiro</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                O Growth OS foi projetado especificamente para <strong className="text-foreground">PMEs brasileiras</strong> que usam WhatsApp como principal canal de vendas. Não é uma ferramenta gringa adaptada — é uma solução pensada para a sua realidade.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "+87", label: "Empresas atendidas" },
                  { value: "89%", label: "Taxa de satisfação" },
                  { value: "3x", label: "Mais leads em 90 dias" },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <p className="text-3xl font-extrabold text-gradient">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* ===== 9. CTA FINAL ===== */}
          <section className="section-padding relative overflow-hidden">
            <div className="container px-4 md:px-8 relative z-10">
              <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
                style={{ background: "var(--gradient-accent)" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
                <div className="relative z-10">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8"
                  >
                    <Rocket size={28} className="text-primary-foreground" />
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                    Comece hoje a transformar<br />seu WhatsApp em uma <span className="underline decoration-primary-foreground/30">máquina de vendas</span>
                  </h2>
                  <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                    Cada dia sem automação é dinheiro deixado na mesa. Ative seu Growth OS agora.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href={whatsappUrl(WA_GROWTH)} target="_blank" rel="noopener noreferrer"
                      className="bg-primary-foreground text-primary hover:brightness-95 shadow-xl font-bold rounded-xl px-8 py-4 text-lg inline-flex items-center gap-2 transition-all"
                    >
                      Quero ativar meu Growth OS <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer mini */}
        <footer className="border-t border-border/30 bg-card/30 py-8">
          <div className="container px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="/" className="flex items-center">
              <AnimatedLogo size="sm" className="opacity-60 hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
            </p>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </>
  );
};

/* Reusable section wrapper */
const Section = ({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) => {
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

/* Reusable section title */
const SectionTitle = ({ label, title, subtitle }: { label: string; title: React.ReactNode; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className="text-center mb-14"
  >
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5">
      {label}
    </span>
    <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">{title}</h2>
    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
  </motion.div>
);

export default GrowthOS;
