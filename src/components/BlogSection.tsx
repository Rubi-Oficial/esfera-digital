import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, TrendingUp, Search, Palette, Megaphone, Code, BarChart3 } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import SectionHeader from "./ui/SectionHeader";
import WhatsAppLink from "./ui/WhatsAppLink";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import blogMarketing from "@/assets/blog-marketing.jpg";
import blogSeo from "@/assets/blog-seo.jpg";
import blogDesign from "@/assets/blog-design.jpg";
import blogStrategy from "@/assets/blog-strategy.jpg";
import blogCode from "@/assets/blog-code.jpg";
import blogAnalytics from "@/assets/blog-analytics.jpg";

const articles = [
  { title: "Por que todo negócio precisa de um site profissional em 2026", excerpt: "Descubra como um site estratégico pode triplicar seus leads e posicionar sua marca como referência no mercado digital.", category: "Presença Digital", icon: TrendingUp, readTime: "5 min", date: "10 Abr 2026", image: blogMarketing, message: "Olá, quero saber mais sobre criação de sites profissionais" },
  { title: "SEO para pequenas empresas: guia completo para aparecer no Google", excerpt: "Estratégias práticas de otimização que qualquer empresa pode aplicar para conquistar as primeiras posições no Google.", category: "SEO", icon: Search, readTime: "8 min", date: "05 Abr 2026", image: blogSeo, message: "Olá, quero saber mais sobre SEO para minha empresa" },
  { title: "Design que converte: como a estética influencia suas vendas", excerpt: "Entenda a psicologia por trás do design e como elementos visuais estratégicos podem aumentar suas conversões em até 200%.", category: "Design & UX", icon: Palette, readTime: "6 min", date: "28 Mar 2026", image: blogDesign, message: "Olá, quero um site com design que converte" },
  { title: "Marketing digital para iniciantes: por onde começar", excerpt: "Um roteiro claro para empresas que estão dando os primeiros passos no marketing digital e querem resultados rápidos.", category: "Marketing Digital", icon: Megaphone, readTime: "7 min", date: "20 Mar 2026", image: blogStrategy, message: "Olá, quero começar no marketing digital" },
  { title: "Landing page vs site institucional: qual escolher?", excerpt: "Entenda as diferenças, vantagens e quando usar cada tipo de página para maximizar seus resultados online.", category: "Desenvolvimento Web", icon: Code, readTime: "4 min", date: "15 Mar 2026", image: blogCode, message: "Olá, quero entender a diferença entre landing page e site" },
  { title: "Como medir o ROI do seu site: métricas essenciais", excerpt: "Aprenda a acompanhar os indicadores certos para provar que seu investimento em presença digital está gerando retorno.", category: "Analytics", icon: BarChart3, readTime: "6 min", date: "08 Mar 2026", image: blogAnalytics, message: "Olá, quero entender o ROI do meu site" },
];

interface BlogCardProps {
  article: typeof articles[number];
}

const BlogCard = ({ article }: BlogCardProps) => (
  <motion.a
    variants={fadeInUp}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    href={whatsappUrl(article.message)}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300 flex flex-col"
    aria-label={`${article.title} - ${article.category}`}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={article.image}
        alt={`Ilustração sobre ${article.category} - ${article.title}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        width={400}
        height={256}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
        <article.icon size={12} aria-hidden="true" />
        {article.category}
      </span>
    </div>

    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)] pointer-events-none" aria-hidden="true" />

    <div className="relative z-10 flex flex-col flex-1 p-6">
      <h3 className="font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {article.excerpt}
      </p>
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
);

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding section-divider" aria-labelledby="blog-heading">
      <div className="container px-4 md:px-8">
        <SectionHeader
          label="Conteúdo"
          titleId="blog-heading"
          title={<>Insights sobre <span className="text-gradient">Marketing Digital</span></>}
          subtitle="Artigos práticos para ajudar sua empresa a crescer no digital com estratégia e resultados reais."
        />

        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {articles.map((article, i) => (
            <BlogCard key={i} article={article} />
          ))}
        </motion.div>

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
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.conteudos}
            variant="outline"
            ariaLabel="Receber conteúdos via WhatsApp"
          >
            Receber conteúdos exclusivos
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
