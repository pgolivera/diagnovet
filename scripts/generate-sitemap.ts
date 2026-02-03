import * as fs from "fs";
import * as path from "path";

const SITE_URL = process.env.VITE_SITE_URL || "https://diagnovet.com";

interface SitemapUrl {
  loc: string;
  changefreq?: string;
  priority?: number;
}

const urls: SitemapUrl[] = [{ loc: "/", changefreq: "weekly", priority: 1.0 }];

function generateSitemap(): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function main(): void {
  const sitemap = generateSitemap();
  const outputPath = path.join(process.cwd(), "dist", "sitemap.xml");

  // Ensure dist directory exists
  const distDir = path.dirname(outputPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
}

main();
