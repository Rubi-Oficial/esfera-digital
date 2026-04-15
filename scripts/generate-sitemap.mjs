/**
 * Pre-build script: generates public/sitemap.xml from blog article slugs.
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://criarmeusiteagora.esferamarketing.com";
const TODAY = new Date().toISOString().split("T")[0];

const dateMap = {
  Jan: "01", Fev: "02", Mar: "03", Abr: "04", Mai: "05", Jun: "06",
  Jul: "07", Ago: "08", Set: "09", Out: "10", Nov: "11", Dez: "12",
};

// Parse blog-data.ts to extract slug and date pairs
const blogDataPath = resolve(__dirname, "../src/lib/blog-data.ts");
const blogData = readFileSync(blogDataPath, "utf-8");

const articles = [];
const slugRegex = /slug:\s*"([^"]+)"/g;
const dateRegex = /date:\s*"([^"]+)"/g;

let slugMatch;
const slugs = [];
while ((slugMatch = slugRegex.exec(blogData)) !== null) {
  slugs.push(slugMatch[1]);
}

const dates = [];
let dateMatch;
while ((dateMatch = dateRegex.exec(blogData)) !== null) {
  dates.push(dateMatch[1]);
}

function parseDate(dateStr) {
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const month = dateMap[parts[1]] || "01";
    return `${parts[2]}-${month}-${parts[0].padStart(2, "0")}`;
  }
  return TODAY;
}

// Build entries
const entries = [
  { loc: `${SITE_URL}/`, lastmod: TODAY, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/blog`, lastmod: TODAY, changefreq: "daily", priority: "0.9" },
];

for (let i = 0; i < slugs.length; i++) {
  entries.push({
    loc: `${SITE_URL}/blog/${slugs[i]}`,
    lastmod: dates[i] ? parseDate(dates[i]) : TODAY,
    changefreq: "monthly",
    priority: "0.8",
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml);
console.log(`✅ Sitemap generated: ${slugs.length} articles + 2 static pages = ${entries.length} URLs`);
