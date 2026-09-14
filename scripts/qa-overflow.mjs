import { chromium } from "playwright";
const [,, path = "/", width = "390"] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 844 } });
await page.goto("http://localhost:3005" + path, { waitUntil: "networkidle", timeout: 120000 });
const out = await page.evaluate((w) => {
  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest("[data-lenis-prevent]") && !el.hasAttribute("data-lenis-prevent")) continue;
    const r = el.getBoundingClientRect();
    if (r.right > w + 1 || r.left < -1) {
      const id = el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + "." + [...el.classList].slice(0, 3).join(".");
      bad.push(`${Math.round(r.left)}..${Math.round(r.right)} ${id}`);
    }
  }
  return { scrollWidth: document.documentElement.scrollWidth, bad: bad.slice(0, 25) };
}, Number(width));
console.log(JSON.stringify(out, null, 1));
await browser.close();
