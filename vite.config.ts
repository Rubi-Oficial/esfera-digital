import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    async writeBundle() {
      // Dynamic import to avoid issues during dev
      const { generateSitemap } = await import("./scripts/generate-sitemap");
      const fs = await import("fs");
      const sitemap = generateSitemap();
      fs.writeFileSync(path.resolve(__dirname, "dist/sitemap.xml"), sitemap);
      console.log(`✅ Sitemap generated with dynamic blog URLs`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
