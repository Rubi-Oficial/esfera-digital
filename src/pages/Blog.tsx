import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { blogArticles, type BlogArticle } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BlogCard = ({ article }: { article: BlogArticle }) => (
  <motion.div variants={fadeInUp}>
    <Link
      to={`/blog/${article.slug}`}
      className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300 flex flex-col h-full block"
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

      <div className="relative z-10 flex flex-col flex-1 p-6">
        <h2 className="font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h2>
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
    </Link>
  </motion.div>
);

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container px-4 md:px-8">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar ao site
            </Link>
          </div>

          <SectionHeader
            label="Blog"
            titleId="blog-page-heading"
            title={<>Todos os <span className="text-gradient">Artigos</span></>}
            subtitle="Conteúdo prático e estratégico sobre marketing digital, SEO, design e desenvolvimento web para impulsionar seu negócio."
          />

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {blogArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
