import { chromium } from "playwright";
const [,, path = "/", name = "home", width = "1440"] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
const res = await page.goto("http://localhost:3005" + path, { waitUntil: "networkidle", timeout: 120000 });
console.log("status", res.status());
// scroll through to trigger reveals
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < h; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
const out = `/private/tmp/claude-501/-Users-milazain-Documents-Flavorstudio/46d15de7-0405-4b4e-a0d0-051f1d2ad8b8/scratchpad/qa-${name}-${width}.png`;
await page.screenshot({ path: out, fullPage: true });
console.log("saved", out, "height", await page.evaluate(() => document.documentElement.scrollHeight));
console.log("errors:", errors.length ? errors.join("\n") : "none");
await browser.close();
