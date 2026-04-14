import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { blogArticles, type BlogArticle } from "@/lib/blog-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BlogCard = ({ article }: { article: BlogArticle }) => (
  <motion.div variants={fadeInUp} layout>
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

const ARTICLES_PER_PAGE = 9;

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogArticles.map((a) => a.category)));
    return ["Todos", ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    let articles = blogArticles;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.content.some((p) => p.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (activeCategory !== "Todos") {
      articles = articles.filter((a) => a.category === activeCategory);
    }

    return articles;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    if (value.length <= 200) {
      setSearchQuery(value);
      setCurrentPage(1);
    }
  }, []);

  const scrollToGrid = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-card border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
                {cat === "Todos" && (
                  <span className="ml-1.5 text-xs opacity-70">({blogArticles.length})</span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              variants={staggerContainer(0.05, 0.1)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {paginatedArticles.map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              Nenhum artigo encontrado nesta categoria.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); scrollToGrid(); }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); scrollToGrid(); }}
                  className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all duration-300 ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); scrollToGrid(); }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Próxima página"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Article count */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Mostrando {paginatedArticles.length} de {filteredArticles.length} artigos
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
