// Crawl the static export in out/ and report internal links that resolve to no file.
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const pages = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith(".html")) pages.push(p); } };
walk(root);
const exists = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return fs.existsSync(path.join(root, "index.html"));
  const p = path.join(root, clean);
  return fs.existsSync(p) || fs.existsSync(path.join(p, "index.html")) || fs.existsSync(p + ".html");
};
const broken = new Map();
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next") || href.startsWith("//")) continue;
    if (!exists(href)) {
      const from = "/" + path.relative(root, file).replace(/index\.html$/, "");
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(from);
    }
  }
}
console.log(`pages: ${pages.length}, broken internal hrefs: ${broken.size}`);
for (const [href, from] of broken) console.log(href, "<-", [...from].slice(0, 4).join(", "));
