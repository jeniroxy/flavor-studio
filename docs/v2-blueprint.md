# Flavor Studio v2 — blueprint

v2 rebuilds the marketing site on the layout, content structure, motion and
page templates of **clickup.com**, translated to Flavor Studio's product and
brand. The two teardowns that drive it are in `docs/research/`:

- `clickup-home-analysis.md` — homepage, nav, mega menu, footer, motion system
- `clickup-pages-analysis.md` — feature-page template, features index, AI
  page, pricing, customers, solutions, enterprise, integrations, contact

## Non-negotiables (from the client's review of v1)

1. **Product first, AI second.** Visitors must understand the platform
   (recipes, ingredients, costing, labels, taste tests, projects, CRM) before
   the AI Agent appears. The Agent has its own page and one section per page,
   never the hero. It is called **"AI Agent"** — never "Sous".
2. **Real product only.** Screenshots come from `src/lib/assets.ts` and
   `src/lib/flows.ts` (exports from the application design file). Nutrition
   labels are the engine's own PNG. No hand-drawn mock UI that pretends to be
   the app. DOM-built _animated_ mocks are fine when they are clearly a motion
   device (the hero list-view, the chat transcript), not a screenshot.
3. **No invented numbers.** No ROI percentages, review counts, badges, hours
   saved, customer counts. The four facts we can state: **9,000+** USDA SR28
   ingredients · **US & Canada** FDA / Health Canada panels · **Since 2011** ·
   **14 days free**, full functionality, no credit card. Testimonials, stories
   and logos in `src/lib/data.ts` are real; use only those.
4. **Real pricing.** Trial $0 / 14 days · Professional $100 per user/month
   ($110 monthly) · Premium $150 ($165 monthly), "Best choice" · Enterprise for
   30+ users, contact sales. Feature lists in `src/app/pricing/page.tsx`
   (current) are the source. AI Agent is included, not an add-on — do not
   invent AI credit pricing.
5. **Login / Sign up go to `app.flavorstudio.com`**; the site has no auth.
6. Static export must keep working (`npm run export`): no server code, dynamic
   routes use `generateStaticParams`.
7. Motion respects `prefers-reduced-motion`. Hovers are colour-only (ClickUp
   cards do not lift).

## Visual language (ClickUp → Flavor Studio)

| ClickUp                              | Flavor Studio v2                                           |
| ------------------------------------ | ---------------------------------------------------------- |
| Plus Jakarta Sans / Inter / mono     | same: `font-display`, default sans, `.eyebrow` (JetBrains) |
| `#202020` text, `#646464` secondary  | `text-ink`, `text-ink-2`, `text-ink-3`                     |
| `#f7f7f9` panels, `#e8e8e8` hairline | `.panel`, `.card`, `.hairline-grid`, `border-hairline`     |
| Black primary button, grey secondary | `.btn.btn-primary`, `.btn-secondary`, `.btn-inverse`       |
| Indigo eyebrow, green on dark        | blue-700 eyebrow, lime-400 on dark (`.on-dark`)            |
| Headline tail in grey                | `<Headline tail="…">`                                      |
| black→purple→pink banner             | navy→blue gradient `GradientBanner` (`--grad-banner`)      |
| rainbow final CTA                    | lime→teal→blue `RainbowCta` (`--grad-cta`)                 |
| Brain² pure-black act                | `bg-night` + `.on-dark`, lime mono accents                 |
| Radix curtain mega menu              | `site-nav.tsx` (menus in `lib/nav.ts`)                     |

All primitives: `src/components/ui.tsx`. Tokens and classes: `globals.css`.
Reveal: `Reveal` / `RevealStagger` from `components/reveal.tsx`. GSAP +
ScrollTrigger + Lenis are installed (`components/smooth-scroll.tsx` runs
Lenis; register ScrollTrigger in any client component that pins).

## Site map

| Route                       | Template (research §)                 | Nav key      |
| --------------------------- | ------------------------------------- | ------------ |
| `/`                         | home (home §2)                        | `""`         |
| `/features`                 | features index (pages §2)             | `product`    |
| `/features/[id]`            | feature Template A (pages §1)         | `product`    |
| `/ai-agent`                 | Brain² dark page (pages §3a)          | `agent`      |
| `/enterprise`               | enterprise (pages §6)                 | `enterprise` |
| `/developers`               | integrations page (pages §6)          | `product`    |
| `/pricing`                  | pricing (pages §4)                    | `pricing`    |
| `/customers`                | customers index (pages §5)            | `resources`  |
| `/success-stories`          | story grid                            | `resources`  |
| `/success-stories/[slug]`   | case study (pages §5)                 | `resources`  |
| `/request-demo`, `/contact` | contact-sales split screen (pages §6) | `resources`  |
| `/faq`, `/news`, `/privacy` | simple templates                      | `resources`  |

Module ids (18): recipes, ingredients, costing, versions, labeling, claims,
designer, taste-tests, projects, timeline, board, timesheet, reports, crm,
cr-builder, publishing, integrations, admin — see `src/lib/modules.ts`.

**No `/solutions`.** An earlier pass built twelve audience pages on ClickUp's
`/teams/<dept>` template. Removed on 2026-09-17: flavorstudio.com never
published audience pages, no client material requests them (checked `docs/`,
the v1-review non-negotiables above, `chats/chat1.md` and the git history),
and while the seven company/industry audiences did come from the legacy FAQ
"Who are your customers?", the five department pages — R&D, regulatory,
costing, sales, sensory — matched no source at all. Audiences belong on
`/customers`. Do not rebuild this without a written client request.

The **"18 modules"** figure is this site's own count of `src/lib/modules.ts`,
catalogued from the Figma application file. The legacy site uses the word
"module" but never states a number, so treat 18 as ours to defend, not the
client's — confirm before printing it anywhere new.
