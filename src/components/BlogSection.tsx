import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, TrendingUp, Search, Palette, Megaphone, Code, BarChart3 } from "lucide-react";

const articles = [
  {
    title: "Por que todo negócio precisa de um site profissional em 2026",
    excerpt: "Descubra como um site estratégico pode triplicar seus leads e posicionar sua marca como referência no mercado digital.",
    category: "Presença Digital",
    icon: TrendingUp,
    readTime: "5 min",
    date: "10 Abr 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero saber mais sobre criação de sites profissionais",
  },
  {
    title: "SEO para pequenas empresas: guia completo para aparecer no Google",
    excerpt: "Estratégias práticas de otimização que qualquer empresa pode aplicar para conquistar as primeiras posições no Google.",
    category: "SEO",
    icon: Search,
    readTime: "8 min",
    date: "05 Abr 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero saber mais sobre SEO para minha empresa",
  },
  {
    title: "Design que converte: como a estética influencia suas vendas",
    excerpt: "Entenda a psicologia por trás do design e como elementos visuais estratégicos podem aumentar suas conversões em até 200%.",
    category: "Design & UX",
    icon: Palette,
    readTime: "6 min",
    date: "28 Mar 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero um site com design que converte",
  },
  {
    title: "Marketing digital para iniciantes: por onde começar",
    excerpt: "Um roteiro claro para empresas que estão dando os primeiros passos no marketing digital e querem resultados rápidos.",
    category: "Marketing Digital",
    icon: Megaphone,
    readTime: "7 min",
    date: "20 Mar 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero começar no marketing digital",
  },
  {
    title: "Landing page vs site institucional: qual escolher?",
    excerpt: "Entenda as diferenças, vantagens e quando usar cada tipo de página para maximizar seus resultados online.",
    category: "Desenvolvimento Web",
    icon: Code,
    readTime: "4 min",
    date: "15 Mar 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero entender a diferença entre landing page e site",
  },
  {
    title: "Como medir o ROI do seu site: métricas essenciais",
    excerpt: "Aprenda a acompanhar os indicadores certos para provar que seu investimento em presença digital está gerando retorno.",
    category: "Analytics",
    icon: BarChart3,
    readTime: "6 min",
    date: "08 Mar 2026",
    href: "https://wa.me/5548991061707?text=Olá, quero entender o ROI do meu site",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 15 },
  },
};

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding section-divider" aria-labelledby="blog-heading">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            Conteúdo
          </span>
          <h2 id="blog-heading" className="text-3xl md:text-5xl font-bold mb-4">
            Insights sobre <span className="text-gradient">Marketing Digital</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Artigos práticos para ajudar sua empresa a crescer no digital com estratégia e resultados reais.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {articles.map((article, i) => (
            <motion.a
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 transition-colors duration-300 flex flex-col"
              aria-label={`${article.title} - ${article.category}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)] pointer-events-none" aria-hidden="true" />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Category & Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    <article.icon size={12} aria-hidden="true" />
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ler mais
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Quer receber conteúdos exclusivos sobre marketing digital?
          </p>
          <a
            href="https://wa.me/5548991061707?text=Olá, quero receber conteúdos sobre marketing digital"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/50 text-primary font-semibold text-sm hover:bg-primary/10 hover:border-primary transition-all group"
            aria-label="Receber conteúdos via WhatsApp"
          >
            Receber conteúdos exclusivos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
