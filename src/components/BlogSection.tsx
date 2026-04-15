import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./ui/SectionHeader";
import { staggerContainer, blurFadeIn } from "@/lib/animations";
import { blogArticles } from "@/lib/blog-data";

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.8, 1, 0.8, 0.2]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section ref={sectionRef} id="blog" className="section-padding section-divider relative overflow-hidden" aria-labelledby="blog-heading">
      <motion.div className="absolute w-[550px] h-[550px] rounded-full bg-primary/6 blur-[130px] -right-20 top-1/3 pointer-events-none" style={{ y: orbY, opacity: orbOpacity, scale: orbScale }} aria-hidden="true" />
      <motion.div className="absolute w-2 h-2 rounded-full bg-primary/50 animate-float left-12 top-20 pointer-events-none" style={{ y: dotY }} aria-hidden="true" />
      <div className="container px-4 md:px-8 relative z-10">
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
          {blogArticles.map((article) => (
            <motion.div key={article.slug} variants={blurFadeIn} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
              <Link
                to={`/blog/${article.slug}`}
                className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300 flex flex-col h-full block"
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
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold transition-all group"
          >
            Ver todos os artigos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
