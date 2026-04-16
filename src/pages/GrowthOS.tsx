import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Check, X, Zap, Users, MessageSquare,
  BarChart3, Bot, Smartphone, Clock, TrendingUp, Target, Rocket,
  Shield, RefreshCw, Phone, Building2, ChevronRight,
  AlertCircle, HelpCircle, DollarSign, Send
} from "lucide-react";
import { whatsappUrl, WHATSAPP_PHONE } from "@/lib/constants";
import NetworkBackground from "@/components/NetworkBackground";
import AnimatedLogo from "@/components/AnimatedLogo";
import SEOHead from "@/components/SEOHead";
import ScrollToTop from "@/components/ScrollToTop";
import dashboardImg from "@/assets/growth-os-dashboard.jpg";

const WA_GROWTH = "Olá! Quero ativar meu Esfera Growth!";
const WA_STARTER = "Olá! Quero começar com o plano Starter do Esfera Growth";
const WA_GROWTH_PLAN = "Olá! Quero começar com o plano Growth do Esfera Growth";
const WA_SCALE = "Olá! Quero começar com o plano Scale do Esfera Growth";
const WA_GENERIC = "Olá! Quero saber mais sobre o Esfera Growth";

const problems = [
  { icon: Clock, text: "Você perde leads por demora no atendimento?", detail: "Cada minuto de atraso reduz 10% a chance de conversão. Enquanto você demora, o concorrente fecha." },
  { icon: AlertCircle, text: "Seu WhatsApp vira bagunça?", detail: "Leads espalhados em conversas, sem organização. Você esquece de responder e perde vendas." },
  { icon: HelpCircle, text: "Você não sabe de onde vêm suas vendas?", detail: "Sem dados, sem controle. Você investe e não sabe o que funciona." },
];

const solution = [
  { icon: Target, title: "Captação de leads", desc: "Site e landing pages que convertem visitantes em contatos qualificados automaticamente." },
  { icon: BarChart3, title: "CRM organizado", desc: "Pipeline visual simples. Saiba exatamente onde cada lead está no processo de venda." },
  { icon: Bot, title: "Automação com IA", desc: "WhatsApp responde, qualifica e agenda — 24h por dia, sem você precisar estar online." },
];

const steps = [
  { num: "01", title: "Visitante entra no site", desc: "Sua landing page otimizada captura o contato automaticamente." },
  { num: "02", title: "Lead capturado automaticamente", desc: "Dados organizados no CRM. Sem planilha, sem bagunça." },
  { num: "03", title: "WhatsApp inicia conversa automática", desc: "IA responde em segundos — não em horas." },
  { num: "04", title: "Lead qualificado", desc: "A IA filtra e encaminha só quem está pronto para comprar." },
  { num: "05", title: "Venda acontece", desc: "Acompanhamento automático até o fechamento." },
];

const dashboardMetrics = [
  { label: "Leads do mês", value: "127", change: "+23%", icon: Users },
  { label: "Conversas iniciadas", value: "89", change: "+18%", icon: MessageSquare },
  { label: "Taxa de resposta", value: "94%", change: "+15%", icon: TrendingUp },
  { label: "Vendas realizadas", value: "18", change: "+31%", icon: DollarSign },
  { label: "Receita estimada", value: "R$ 45K", change: "+28%", icon: BarChart3 },
];

const features = [
  { icon: Smartphone, title: "Integração com WhatsApp" },
  { icon: BarChart3, title: "CRM com pipeline visual" },
  { icon: Target, title: "Captura automática de leads" },
  { icon: Bot, title: "Respostas automáticas" },
  { icon: RefreshCw, title: "Follow-up automático" },
  { icon: TrendingUp, title: "Relatórios simples" },
];

const plans = [
  {
    name: "Site Profissional",
    price: "R$ 997",
    priceMonthly: "R$ 97/mês",
    priceOriginal: "R$ 1.500",
    desc: "Ideal para começar",
    features: [
      "Site profissional (One Page estratégico)",
      "Design moderno e personalizado",
      "Copy pronta para vender",
      "Integração com WhatsApp",
      "SEO básico (para aparecer no Google)",
      "Certificado SSL grátis",
      "1 ano de hospedagem incluso",
      "Entrega rápida",
    ],
    wa: WA_STARTER,
    popular: false,
    checkoutLink: "/checkout?prices=site_profissional_implantacao,site_profissional_mensal&plan=Site%20Profissional",
  },
  {
    name: "Esfera Growth",
    price: "R$ 1.997",
    priceMonthly: "R$ 297/mês",
    priceOriginal: "R$ 3.000",
    desc: "Ecossistema completo de crescimento",
    features: [
      "Tudo do plano Site Profissional",
      "Base de Conhecimento Interna exclusiva",
      "Consultoria individual com especialista",
      "Estratégia de captação de clientes",
      "Programa de Parcerias (Indique e Ganhe)",
      "Dashboard de indicações e comissões",
      "Suporte prioritário por 3 meses",
      "Relatórios de performance mensais",
    ],
    wa: WA_GROWTH_PLAN,
    popular: true,
    checkoutLink: "/checkout?prices=esfera_growth_implantacao,esfera_growth_mensal&plan=Esfera%20Growth",
  },
];

const trustBadges = [
  { icon: Zap, text: "Sem necessidade de equipe técnica" },
  { icon: Clock, text: "Implementação em até 7 dias" },
  { icon: Building2, text: "Funciona para qualquer negócio" },
];

const GrowthOS = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 60]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [formData, setFormData] = useState({ nome: "", telefone: "", empresa: "" });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${formData.nome}, da empresa ${formData.empresa}. Telefone: ${formData.telefone}. Quero ativar o Esfera Growth!`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setFormSent(true);
  };

  return (
    <>
      <SEOHead
        title="Esfera Growth — Sistema de Vendas com IA e WhatsApp"
        description="Transforme seu WhatsApp em uma máquina de vendas automática. Site, CRM e automação com IA para gerar e converter clientes todos os dias."
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
            <div className="flex items-center gap-3">
              <a href="#planos-growth" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Ver planos
              </a>
              <a
                href={whatsappUrl(WA_GENERIC)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium px-5 py-2.5 text-sm inline-flex items-center gap-2"
              >
                Falar no WhatsApp <ArrowRight size={14} />
              </a>
            </div>
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
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase"
                  >
                    <Zap size={12} className="animate-pulse" /> Esfera Growth
                  </motion.div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
                    Transforme seu WhatsApp em uma{" "}
                    <span className="text-gradient">máquina de vendas automática</span>
                  </h1>

                  <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed lg:mx-0 mx-auto">
                    Implemente um sistema com <strong className="text-foreground font-semibold">site, CRM e automação com IA</strong> para gerar e converter clientes todos os dias.
                  </p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
                  >
                    <a href={whatsappUrl(WA_GROWTH)} target="_blank" rel="noopener noreferrer"
                      className="btn-premium px-7 py-4 text-base inline-flex items-center gap-2 font-bold w-full sm:w-auto justify-center"
                    >
                      Quero mais clientes agora <ArrowRight size={18} />
                    </a>
                    <a href={whatsappUrl(WA_GENERIC)} target="_blank" rel="noopener noreferrer"
                      className="border border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-7 py-4 text-base inline-flex items-center gap-2 font-semibold transition-all w-full sm:w-auto justify-center"
                    >
                      <MessageSquare size={18} /> Falar no WhatsApp
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative hidden lg:block"
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-[60px] scale-90" aria-hidden="true" />
                  <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
                    <img src={dashboardImg} alt="Dashboard Esfera Growth - CRM, WhatsApp e métricas" className="w-full h-auto object-cover" width={1920} height={1080} fetchPriority="high" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ===== 2. TRUST BAR ===== */}
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

          {/* ===== 3. PROBLEMA ===== */}
          <Section id="problema" className="section-divider">
            <SectionTitle label="O Problema" title={<>Você está <span className="text-destructive">perdendo vendas</span> agora</>} subtitle="Se alguma dessas dores parece familiar, o Esfera Growth resolve." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {problems.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-hover rounded-2xl p-6 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/15 transition-colors">
                    <p.icon size={22} className="text-destructive" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{p.text}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 4. SOLUÇÃO ===== */}
          <Section id="solucao">
            <SectionTitle label="A Solução" title={<><span className="text-gradient">Esfera Growth</span> — Vendas no automático</>} subtitle="Simples, rápido e poderoso. Tudo que você precisa em um só lugar." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {solution.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="glass-hover rounded-2xl p-7 text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <s.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 5. COMO FUNCIONA ===== */}
          <Section id="como-funciona" className="section-divider">
            <SectionTitle label="Como Funciona" title={<>Do clique à venda em <span className="text-gradient">5 passos</span></>} subtitle="Automatize todo o processo — do primeiro contato à conversão." />
            <div className="max-w-3xl mx-auto space-y-3">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass-hover rounded-xl p-5 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-all">
                    <span className="text-lg font-bold text-primary">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground text-xs">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 6. DASHBOARD MVP ===== */}
          <Section id="dashboard">
            <SectionTitle label="Dashboard" title={<>Seus números em <span className="text-gradient">tempo real</span></>} subtitle="Você acompanha tudo e sabe exatamente o que está gerando dinheiro." />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {dashboardMetrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
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
                <img src={dashboardImg} alt="Dashboard Esfera Growth completo" className="w-full h-auto object-cover" loading="lazy" width={1920} height={1080} />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
                Acompanhe leads, conversas, vendas e receita em tempo real. Sem complicação.
              </p>
            </motion.div>
          </Section>

          {/* ===== 7. FUNCIONALIDADES ===== */}
          <Section id="funcionalidades" className="section-divider">
            <SectionTitle label="Funcionalidades" title={<>Tudo que seu <span className="text-gradient">negócio precisa</span></>} subtitle="Ferramentas essenciais para vender mais, em um só sistema." />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass-hover rounded-xl p-5 text-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <p className="text-xs font-semibold text-secondary-foreground">{f.title}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 8. PLANOS ===== */}
          <Section id="planos-growth">
            <SectionTitle label="Planos" title={<>Escolha e <span className="text-gradient">comece agora</span></>} subtitle="Comece pequeno e escale conforme cresce." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative rounded-3xl p-7 flex flex-col ${plan.popular ? "border-2 border-primary glow-box-strong bg-card" : "glass"}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                      🚀 Mais vendido
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
                  <a href={plan.checkoutLink}
                    className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all ${
                      plan.popular ? "btn-premium" : "border border-primary/40 text-primary hover:bg-primary/10"
                    }`}
                  >
                    {plan.popular ? "Quero o Esfera Growth 🚀" : "Quero meu site"} <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ===== 9. AUTORIDADE ===== */}
          <Section id="autoridade" className="section-divider">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-primary text-xs font-medium mb-6 tracking-widest uppercase">
                <Shield size={12} /> Autoridade
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-5">
                Criado <span className="text-gradient">para empresas brasileiras</span>
              </h2>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-xl mx-auto">
                Foco em <strong className="text-foreground">pequenas e médias empresas</strong> que usam WhatsApp como principal canal de vendas. Solução pensada para a sua realidade.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "+87", label: "Empresas atendidas" },
                  { value: "89%", label: "Taxa de satisfação" },
                  { value: "3x", label: "Mais leads em 90 dias" },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Future testimonials placeholder */}
              <p className="text-xs text-muted-foreground/50 mt-8 italic">Em breve: depoimentos de clientes reais</p>
            </motion.div>
          </Section>

          {/* ===== 10. CTA FINAL ===== */}
          <section className="section-padding relative overflow-hidden">
            <div className="container px-4 md:px-8 relative z-10">
              <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center"
                style={{ background: "var(--gradient-accent)" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
                <div className="relative z-10">
                  <Rocket size={28} className="text-primary-foreground mx-auto mb-6" />
                  <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
                    Comece hoje a vender mais<br />com automação
                  </h2>
                  <p className="text-primary-foreground/80 text-base max-w-lg mx-auto mb-8">
                    Cada dia sem automação é dinheiro na mesa do concorrente.
                  </p>

                  <div className="max-w-md mx-auto mb-6">
                    {formSent ? (
                      <div className="bg-primary-foreground/10 rounded-xl p-6 border border-primary-foreground/20">
                        <Check size={32} className="text-primary-foreground mx-auto mb-2" />
                        <p className="text-primary-foreground font-semibold">Enviado! Fale conosco no WhatsApp.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Seu nome"
                          required
                          maxLength={100}
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                        />
                        <input
                          type="tel"
                          placeholder="Telefone (WhatsApp)"
                          required
                          maxLength={20}
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                        />
                        <input
                          type="text"
                          placeholder="Nome da empresa"
                          required
                          maxLength={100}
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                        />
                        <button type="submit" className="w-full bg-primary-foreground text-primary hover:brightness-95 shadow-xl font-bold rounded-xl px-6 py-4 text-base inline-flex items-center justify-center gap-2 transition-all">
                          Ativar Esfera Growth agora <Send size={16} />
                        </button>
                      </form>
                    )}
                  </div>

                  <a href={whatsappUrl(WA_GROWTH)} target="_blank" rel="noopener noreferrer"
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare size={14} /> Ou fale direto no WhatsApp <ChevronRight size={14} />
                  </a>
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

        {/* Fixed WhatsApp Button */}
        <motion.a
          href={whatsappUrl(WA_GENERIC)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>

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
    className="text-center mb-12"
  >
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5">
      {label}
    </span>
    <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{title}</h2>
    <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
  </motion.div>
);

export default GrowthOS;
