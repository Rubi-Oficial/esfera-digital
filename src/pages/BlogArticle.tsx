import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { blogArticles, getRelatedArticles, DEFAULT_AUTHOR, type BlogArticle } from "@/lib/blog-data";
import ChatbotTrigger from "@/components/ui/ChatbotTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const RelatedCard = ({ article }: { article: BlogArticle }) => (
  <motion.div variants={fadeInUp}>
    <Link
      to={`/blog/${article.slug}`}
      className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300 flex flex-col h-full block"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={`Ilustração: ${article.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={256}
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
          <article.icon size={12} aria-hidden="true" />
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sm text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
        <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Ler artigo <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  </motion.div>
);

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedArticles(article.slug, 3);
  const author = article.author ?? DEFAULT_AUTHOR;

  // Parse "DD de mês de AAAA" para ISO (YYYY-MM-DD)
  const monthMap: Record<string, string> = {
    janeiro: "01", fevereiro: "02", março: "03", abril: "04", maio: "05", junho: "06",
    julho: "07", agosto: "08", setembro: "09", outubro: "10", novembro: "11", dezembro: "12",
  };
  const dateMatch = article.date.match(/^(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})$/i);
  const isoDate = dateMatch
    ? `${dateMatch[3]}-${monthMap[dateMatch[2].toLowerCase()] || "01"}-${dateMatch[1].padStart(2, "0")}`
    : "2026-01-01";

  return (
    <div className="min-h-screen">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        image={article.image}
        type="article"
        breadcrumbs={[
          { name: "Início", url: "https://criarmeusiteagora.esferamarketing.com/" },
          { name: "Blog", url: "https://criarmeusiteagora.esferamarketing.com/blog" },
          { name: article.title, url: `https://criarmeusiteagora.esferamarketing.com/blog/${article.slug}` },
        ]}
        articleSchema={{
          title: article.title,
          description: article.excerpt,
          image: article.image,
          datePublished: isoDate,
          category: article.category,
          authorName: author.name,
        }}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="container px-4 md:px-8 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </motion.nav>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 mb-4">
              <article.icon size={12} aria-hidden="true" />
              {article.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {article.readTime} de leitura
              </span>
            </div>

            <div className="flex items-center gap-3 pb-8 mb-2 border-b border-border/40">
              <img
                src={author.avatar}
                alt={`Foto de ${author.name}`}
                className="w-11 h-11 rounded-full object-cover border border-border/60"
                width={44}
                height={44}
                loading="lazy"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">Por {author.name}</p>
                <p className="text-xs text-muted-foreground">{author.role}</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border/40 mb-10">
              <img
                src={article.image}
                alt={`Ilustração: ${article.title}`}
                className="w-full h-auto object-cover"
                width={800}
                height={500}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose-custom space-y-6 mb-16"
          >
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center mb-16"
          >
            <h3 className="text-xl font-bold mb-3">Gostou do conteúdo?</h3>
            <p className="text-muted-foreground mb-6">
              Fale com nossos especialistas e descubra como aplicar essas estratégias no seu negócio.
            </p>
            <ChatbotTrigger
              ariaLabel="Falar com especialista sobre este assunto"
            >
              Falar com Especialista
            </ChatbotTrigger>
          </motion.div>
        </article>

        {/* Related Articles */}
        <section className="container px-4 md:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Artigos <span className="text-gradient">Relacionados</span>
            </h2>
            <p className="text-muted-foreground mb-8">Continue aprendendo com nossos conteúdos.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {related.map((r) => (
              <RelatedCard key={r.slug} article={r} />
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} />
              Ver todos os artigos
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
