/**
 * Generates sitemap.xml dynamically from blog articles.
 * Used as a Vite plugin (runs at build time) and can also be run standalone.
 */

import { blogArticles } from "../src/lib/blog-data";

const SITE_URL = "https://criarmeusiteagora.esferamarketing.com";
const TODAY = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

// Date string parser for Portuguese dates like "10 Abr 2026"
const dateMap: Record<string, string> = {
  Jan: "01", Fev: "02", Mar: "03", Abr: "04", Mai: "05", Jun: "06",
  Jul: "07", Ago: "08", Set: "09", Out: "10", Nov: "11", Dez: "12",
};

function parseDate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const month = dateMap[parts[1]] || "01";
    return `${parts[2]}-${month}-${parts[0].padStart(2, "0")}`;
  }
  return TODAY;
}

export function generateSitemap(): string {
  const entries: SitemapEntry[] = [
    // Static pages
    { loc: `${SITE_URL}/`, lastmod: TODAY, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/blog`, lastmod: TODAY, changefreq: "daily", priority: "0.9" },
  ];

  // Blog articles
  for (const article of blogArticles) {
    entries.push({
      loc: `${SITE_URL}/blog/${article.slug}`,
      lastmod: parseDate(article.date),
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  const urlBlocks = entries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>`;
}
