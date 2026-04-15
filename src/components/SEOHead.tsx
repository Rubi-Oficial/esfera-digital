import { useEffect } from "react";

const SITE_URL = "https://criarmeusiteagora.esferamarketing.com";
const DEFAULT_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9024b597-7d30-49e7-82f7-108a75811533";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedDate?: string;
  breadcrumbs?: BreadcrumbItem[];
  articleSchema?: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    category: string;
  };
}

const SEOHead = ({
  title,
  description,
  path,
  image,
  type = "website",
  breadcrumbs,
  articleSchema,
}: SEOHeadProps) => {
  const fullUrl = `${SITE_URL}${path}`;
  // Ensure og:image is always an absolute URL
  const rawImage = image || DEFAULT_OG_IMAGE;
  const ogImage = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;
  const fullTitle = `${title} | Esfera Digital`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", type === "article" ? "article" : "website");
    setMeta("property", "og:locale", "pt_BR");
    setMeta("property", "og:site_name", "Esfera Digital");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Article JSON-LD
    let scriptEl = document.getElementById("seo-jsonld-article") as HTMLScriptElement | null;
    if (articleSchema) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleSchema.title,
        "description": articleSchema.description,
        "image": articleSchema.image,
        "datePublished": articleSchema.datePublished,
        "dateModified": articleSchema.datePublished,
        "author": { "@type": "Organization", "name": "Esfera Digital" },
        "publisher": {
          "@type": "Organization",
          "name": "Esfera Digital",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.ico` },
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": fullUrl },
        "articleSection": articleSchema.category,
      };
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "seo-jsonld-article";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Breadcrumbs JSON-LD
    let breadcrumbEl = document.getElementById("seo-jsonld-breadcrumb") as HTMLScriptElement | null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url,
        })),
      };
      if (!breadcrumbEl) {
        breadcrumbEl = document.createElement("script");
        breadcrumbEl.id = "seo-jsonld-breadcrumb";
        breadcrumbEl.type = "application/ld+json";
        document.head.appendChild(breadcrumbEl);
      }
      breadcrumbEl.textContent = JSON.stringify(breadcrumbJsonLd);
    } else if (breadcrumbEl) {
      breadcrumbEl.remove();
    }

    return () => {
      document.getElementById("seo-jsonld-article")?.remove();
      document.getElementById("seo-jsonld-breadcrumb")?.remove();
    };
  }, [fullTitle, description, fullUrl, ogImage, type, articleSchema, breadcrumbs]);

  return null;
};

export default SEOHead;
