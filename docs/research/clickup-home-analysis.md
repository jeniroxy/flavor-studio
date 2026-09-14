# ClickUp.com — Homepage & Global Chrome Analysis (blueprint for Flavor Studio)

Captured 2026-09-15 with Playwright (Chromium, 1440×900 desktop and 390×844 mobile), plus HTML/CSS/JS bundle inspection and WebFetch. Screenshots live next to this file (`00-hero-viewport.png`, `vp-00…vp-14`, `menu-0…3`, `agents-0…4`, `brain-0…3`, `videosec-*`, `achievements-0`, `teams-*`, `m-00…m-03`). Raw dumps: `home-data.json`, `home-data2.json`, `menus.json`, `scroll-samples.json`, `home.html`, `bundles/`.

Note: ClickUp runs A/B variants on the hero. This capture got `home-hero-long-title-variant` (two-line headline). WebFetch and the mobile capture got the bullet variant ("Save money… / Save time… / Create infinite productivity…"). Both are described.

Tech stack observed: Next.js (pages router, `__NEXT_DATA__`), CSS Modules (hashed class names like `HomeHeroLongTitle_headline__ZnveF`), Radix UI NavigationMenu for the mega menu (`--radix-navigation-menu-viewport-height`), GSAP + ScrollTrigger + Observer bundled (not global), three.js + @react-three/fiber (one `<canvas>` in the Brain² section), Rive runtime referenced, Wistia for video, Contentful for some assets, Segment/OneTrust/Marketo/Qualified for analytics & chat. No Lottie, no Lenis, no Framer Motion, no Swiper/Splide/Embla.

---

## 1. Global chrome

### 1.1 Announcement / top bar
- 40px tall, full-width, bg `#f8f9fa`, centered 16px Inter text, entire bar is a link (`CuPageBanner_fullyClickableUrl`).
- Copy: **"NEW: Brain² — The best AI is *your* AI. The world's first company Brain ›"** (markdown-rendered: bold prefix, italic "your", chevron at end).
- Not sticky — it scrolls away; the nav then sticks to `top:0`. Hidden on mobile (390px).

### 1.2 Navigation bar (desktop)
- `<nav data-testid="cu-navigation">`: `position: sticky; top: 0; z-index: 10000; height: 60px` (`--spacing-nav-height: 60px`).
- Backdrop layer: `rgba(255,255,255,0.9)` + `backdrop-filter: blur(6px)`. No border, no shadow, in any scroll state (page content scrolls under with a frosted effect — see `vp-05`).
- Inner container `--size-nav-container: 1120px`, content aligned to the 1080px page container (left edge x=180 at 1440).
- Layout (left → right):
  - Logo (ClickUp mark + wordmark SVG, 100×30, `aria-label="ClickUp Home"`), starts x=180.
  - Primary links start x=300, gap ~8px, each 15px Inter 400 `#292d34`, padding ~8px 10px, chevron-down icon on dropdown items. Items: **Brain AI ▾** (button), **Product ▾** (button), **Solutions ▾** (button), **Learn ▾** (button), **Pricing** (`/pricing`), **Enterprise** (`/plans/enterprise`).
  - Hover/open state on a dropdown trigger: light grey pill `#f0f0f0`, radius 8px (see `menu-0-Brain_AI.png`).
  - Right cluster (x≈1007–1260): **"Get a Demo"** tertiary (transparent, text `#202020`, hover bg `#f0f0f0`), **"Login"** secondary (bg `#f0f0f0`, hover `#dedede`, text `#000`, 14px/600, padding 8px 12px, radius 8px, → `app.clickup.com/login`), **"Sign Up"** primary (bg `#202020`, white text, 14px/600, padding 8px 12px, radius 8px, hover `#202020cc`). Sign Up opens an in-page email signup overlay (`CuSignUpOverlay_fadeInOverlay .2s`).
- Button base rule (`_button_sazky_38`): `inline-flex; gap 4px; padding 8px 12px; border-radius 8px; background var(--Core-Button-Primary,#202020); transition background-color .2s ease`.

### 1.3 Mega menu (Radix NavigationMenu "curtain")
- Opens on hover/click. Panel is a full-viewport-width white curtain (1440×N) that starts directly under the nav (y=100 with banner, y=60 without), `background #fff`, no radius, shadow `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`.
- Animation: `nav-curtain-down` (height 0 → `var(--radix-navigation-menu-viewport-height)`, opacity 0→1, `.3s cubic-bezier(.4,0,.2,1)`); close uses `nav-curtain-up`. Columns use `nav-column-fade` (translateY(-10px)→0, opacity 0→1, `.3s ease-out backwards`, staggered).
- Content sits in the 1080px container; columns are left-aligned, ~225px wide each (x = 180, 405, 630, 855, 1080).
- Column heading style: uppercase monospace (`Sometype Mono`), ~13px, letter-spaced, `#838383`, 24px bottom gap.
- Item styles (three patterns):
  1. Icon-tile item: 40×40 black rounded-square icon tile + 16px/600 title + 14px `#646464` one-liner (used in Brain AI, Solutions "Featured").
  2. App-icon item: 20px coloured app icon + 16px label (Product menu).
  3. Text link: 16px `#202020`, 32px row rhythm; "See all … →" links in blue `#0091ff`.
  - "NEW" badge: tiny pill, purple tint `#efedfd` bg, `#6647f0` text, 10–11px uppercase.
- Panels:

**Brain AI** (402px tall, 3 columns):
- AI PLATFORM: Platform Overview — "The converged AI workspace" (/brain); Super Agents — "Delegate your work entirely" (/brain/agents); Brain MAX — "One AI app to rule them all" (/brain/max); Brain MAX extension — "Your AI assistant, in every tab" (/lp/brain/max/extension). Each with a 40px icon (SVG, active variant swapped on hover).
- AI FEATURES: Artifacts² [NEW] — "Turn your work into apps, decks, and more"; Skills [NEW] — "Teach Brain how your team works"; Talk to Text — "Write 4x faster than you type"; Notetaker — "Intelligent meeting notes and summaries"; Enterprise Search — "Find anything across your workspace".
- AI RESOURCES: Pricing (/brain/pricing); State of AI (external sprawl.work).

**Product** (234px tall, 5 columns, icon+label):
- PROJECTS: Tasks, Dashboards, Board, Gantt
- COMMUNICATION: Chat, SyncUp, Inbox, Clips
- KNOWLEDGE: Docs, Whiteboards, Wiki, Forms
- TIME: Calendar, Scheduling, Automations, Time tracking
- MORE: All features (/features), Integrations, Downloads, Watch demo
- hrefs are `/features/<slug>` (e.g. `/features/tasks`, `/features/kanban-board`, `/features/gantt-chart-view`, `/features/project-time-tracking`).

**Solutions** (314px, 4 columns):
- TEAMS: Project management, Product development, Operations, IT, Marketing, Human Resources, Sales, **See all teams →** (blue). hrefs `/teams/<slug>`.
- COMPANIES: Enterprise, Startup, Small Business, Non-profit
- INDUSTRIES: Healthcare, Education, Agency & Services, Consumer & Retail, Construction, Government, **See all industries →**
- FEATURED: two icon-tile promos — "The Small Business Suite [NEW] — The only software your small business needs"; "Custom agent solutions — AI workflows built for your team".

**Learn** (266px, 3 columns + promo card):
- LEARN: University, Demos, Video tutorials, Webinars
- DISCOVER: Blog, Customer stories, Guides, Kill Work Sprawl
- SUPPORT: 24/7 Support, Professional services, Premium support, Hire an expert
- CUSTOMER STORIES promo card (bg `#f8f9fa`, radius 12, padding 20, width ~415): Cartoon Network logo, quote 18px/600 "Cartoon Network doubles output in 50% less time with ClickUp", link "Read the story →".

**Pricing** and **Enterprise** are plain links (no panel).

### 1.4 Mobile nav (390px)
- Bar: logo (100×30) left; right: **"Sign Up"** primary (dark, 32px tall) + hamburger (32×32, grey `#f0f0f0` rounded square, `aria-label="Open mobile menu"`). Login is not in the bar.
- Menu: full-screen white sheet. Items are large — 32px Plus Jakarta Sans 650 — Brain AI ›, Product ›, Solutions ›, Learn › (accordion chevrons), Pricing, Enterprise, Get a Demo (plain). Bottom-pinned full-width secondary **"Login"** button (grey `#f0f0f0`, radius 12). Hamburger becomes an X.
- Mobile hero: H1 40px with second half in grey; check-bullet list (purple checks) "Save money. All Apps, AI, Projects, Chat + 20 more." / "Save time. All humans working together with perfect context." / "Create infinite productivity. AI Agents & Workflows."; full-width primary CTA "Get started. It's FREE" + "Free forever. No credit card." to its right; then a 3-column hairline icon grid of features (ClickUp 4.0 [New], Agents [New], Projects, Brain (AI), Time Tracking, Chat, Calendar, Docs, Whiteboards, …) replacing the desktop tab panel.

### 1.5 Footer
- Wrapper `CuHome_footer` (white bg) above the semantic `<footer>`; preceded by a footnote line "1. Our agreements ensure zero data training & retention on all third-party model providers" (14px `#646464`) and a hairline.
- Logo (ClickUp, 88×22) top-left; 5 columns on the 1080 grid (x = 180, 397, 613, 829, 1045), column title 16px/600 `#202020` (each title links to a hub page, e.g. "Compare" → `/compare`), links 16px/400 `#292d34`, 29px row rhythm.
  - **AI**: Brain, Super Agents, Ambient Agents, Notetaker, Enterprise Search, Talk to Text. Sub-group **Download**: iOS & Android, Mac & Windows, Brain MAX.
  - **Product**: Chat, Projects, Docs & Wikis, Calendar, Dashboards, Time Tracking, Gantt Charts, Automations, Whiteboards, API, Integrations.
  - **Compare**: vs Atlassian, vs Microsoft Teams, vs Asana, vs ServiceNow, vs Monday, vs Slack, vs Smartsheet, vs Wrike, vs Salesforce, vs Notion, vs Airtable.
  - **Company**: About Us, Careers, Customers, Affiliates, Events, Partners, Consultants, Reviews, Press, Brand, Roadmap.
  - **Help**: 24/7 Support, Contact Us, Get a Demo, Import, Community, ClickUp University, Webinars, Blog, Research.
- Bottom row (inside `<footer>`): social icons left (LinkedIn, Facebook, Instagram, X — 20px grey glyphs), compliance badges right (SOC 2 CERTIFIED, ISO 27001 CERTIFIED, GDPR COMPLIANT, HIPAA COMPLIANT — small grey seal + two-line 9px uppercase label).
- Hairline, then legal line: "© 2026 ClickUp" left; right: Status, Security, Privacy, Terms, Cookie Preferences (14px `#646464`).
- No newsletter form, no language switcher, no app-store badges (downloads are text links).

---

## 2. Homepage — section-by-section (desktop 1440, document order)

Page height ≈ 12,800px. Container 1080px (gutters 180px) unless noted; section stack spacing token `--spacing-stack-spacing-desktop: 150px` (60px mobile).

### S0. Announcement bar
See 1.1.

### S1. Hero (`HomeHeroLongTitle` + `HomeHeroTabs0226`) — y 100→1130
- Purpose: category claim + free signup + interactive product proof.
- Layout: left-aligned copy block on 1080 container (max ~900px wide), then a full-width product "tab panel" strip.
- Eyebrow: gradient pill **"The Best AI is [Brain² mark] ›"** → `/brain`. Pill: bg `#e8e8e8` border ring (1px) with white inner, radius 54px, 14px/600, padding 4px 12px. Hover: a 1000px conic-gradient (`#0091ff → #ff02f0 → #f76808 → #6647f0`) rotates behind the border (`GradientPill_rotatingGradientBorder 1.5s linear infinite`) with a blurred white fill — a "rainbow border" effect.
- H1: **"Software to replace all software"** — Plus Jakarta Sans, 60px / line-height 1.1, weight 700 (display-2xl token: 650), letter-spacing −2.1px, `#202020`, `text-wrap: balance`. Second line inside the same H1: **"Save time. Save money. Infinite productivity."** in `#646464`, `clamp(1.5rem, 3.5vw, 40px)`. (Bullet variant: H1 + three check-bullets, see 1.4.)
- CTA row: **"Get started. It's FREE!"** primary — bg `#202020`, white, 18px/650, padding 14px 20px, radius 15px, `box-shadow: inset 0 0 0 1px rgba(0,0,0,.15)`; hover shows a rainbow ring (`rainbowHighlight` inset −5px, opacity .2s). Microcopy right of button: "Free forever." / "No credit card." (12px `#646464`, two lines). Button opens the email signup overlay.
- Tab panel (starts ~y 590): full-width strip bounded by 1px `#e8e8e8` hairlines top/bottom and at the container edges (`--decorative-border`). Left rail (200px): 12 vertical tabs — Projects, Chat, Brain MAX, AI Agents, Sprints, Time Tracking, Calendar, Docs, Whiteboards, Automations, Dashboards, Scheduling — each "⊕ Label", Inter 14px/600 `#646464`, padding 5px 12px 5px 10px; selected = `#0091ff` with a check-circle icon (`transition: color .2s`). Bottom of rail: **"Activate →"** dark button (8px radius). Right: 878×514 preview.
  - "Projects" preview is a *DOM-built animated list view* (`data-testid="home-hero-projects-animation"`, aspect 960/681): fake workspace chrome ("Mango Tech", search ⌘K, sidebar Home/Spaces/Chat/AI/Apps), List/Board/Gantt tabs, task rows that pop in, a roving cursor, a purple "+ Task" button and a floating "Brain — Re-scoring priority…" tooltip. Driven by CSS keyframes: `list-view-pop-in`, `list-view-cursor-rove`, `list-view-ptr-click`, `list-view-click-pulse`, `list-view-ai-flow`, `list-view-typing-shimmer`, `list-view-ants` (marching ants), `product-screen-cursor-drift-a/b` (12–14s), `product-screen-caret-blink`.
  - Other tabs: AVIF stills (`/assets/home_2026/hero_chat.avif` etc., 878×514) stacked absolutely and cross-faded (`opacity .3s ease`).
  - `data-auto-cycling="false"` — no auto-rotation in this variant (active tab stayed "Projects" over 12s); switching is on click.
- Background: white. Imagery: product UI mock (animated DOM + stills).

### S2. Logo bar ("ui-logo-bar-v5") — bottom of the hero strip, y ≈ 1000–1065
- Layout: inside the hairline-bounded strip; left label **"TRUSTED BY THE BEST"** (Sometype Mono, 14px, uppercase, `#838383`), then 6 monochrome logos (100×30 boxes, 48px gap): Amazon, NVIDIA, Wayfair, Verizon, Spotify, Stanford.
- Animation: logos enter with `logo-bar-enter` (opacity 0→1, blur 5px→0, scale .8→1, 0.2s, stagger 0.05s per `--logo-index`) and exit at `--logo-exit-start: 8.45s` with the mirrored `logo-bar-exit` — i.e. the logo *set* swaps roughly every 8.5s. Hover reveals the colour version (`_colorfulLogo` opacity .3s).

### S3. Problem / video section (`cu-home-video-section-4o`) — y 1130→1880
- Purpose: name the pain ("Work Sprawl") with a stat headline and a clickable explainer video.
- Layout: centered; H2 max ~760px; media 1224px wide, radius 16.
- H2 (48px/1.15, 650, −1.68px, centered): **"60% of work is lost in context – and AI is lost without it"** — the tail words ("context", "without it") are rendered in grey via gradient-clipped spans (dark→grey fade, the site's signature headline treatment). Sub (18px `#646464`): "Work Sprawl is killing context and destroying productivity."
- Media: `context-sprawl-placeholder.webp` — an illustration of a tangled grey cable weaving through floating app-icon tiles (Zoom, Slack, Teams, Figma-ish, Asana, Gemini, ChatGPT…) and chat bubbles ("Where's that…", "Who can help with…", "Is this accurate?"), with three bottom "columns" (hairline dividers) labelled **Context Switching** ("Digital fatigue reduces employee performance by up to **32%**"), **Context Missing** ("**96% of companies fail** in AI value & adoption"), **Context Stitching** ("**2.5 hours daily** wasted searching & stitching context").
- Interaction: whole image is a `<button>` with `cursor: none`; a custom **"▶ Play Video"** black pill (radius 16, padding 12px 20px, `position: fixed`, follows the pointer via `--cursor-x/--cursor-y` and `translate3d`, scales .85→1 and fades in .18s) replaces the cursor on hover. Click opens a Wistia video modal (`overlay-fade-in .8s`). Mobile gets a static image + a normal play button.

### S4. Wall of features (`cu-wall-of-features`) — y 1880→3025, bg grid `#e8e8e8`
- Purpose: breadth proof ("100+ products") in a single dense grid.
- H2 (48px centered): **"All apps, AI Agents, and humans in ClickUp"** ("AI Agents" and "ClickUp" in grey gradient). Sub: "100+ products to replace fragmented software & maximize human productivity."
- Grid: `display:grid; grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(8, 1fr); max-width 1381px; gap 1px; background #e8e8e8` (white cells on grey = hairline grid). Wrapper is `100vw` and the grid is masked at the edges: `mask-image: linear-gradient(90deg, transparent 2%, #d9d9d9 10%, #d9d9d9 90%, transparent 98%), linear-gradient(180deg, transparent 5%, … 85%, transparent 95%)` so the outer cells and the empty top/bottom rows fade out. Cells ≈ 138×127.
- 48 feature cells: 24px outline icon (grey `#646464`) + label 14px/700 Inter `#292d34`, centered. Labels: Dependencies, Connected Search, Tasks, Mind Maps, Wikis, AI Notetaker, Calendar, Proofing, Portfolios, Templates, Reminders, Reporting, Goals, Sprints, Custom Status, AI Writer, API Calls, Milestones, Forms, Automations, Custom Fields, Timesheets, AI Q&A, Priorities, Time Estimates, Clips, Everything view, Single Sign-on, Emails, Dashboards, Time Tracking, Kanban Boards, Integrations, Guests, Tags, 24/7 Support, Checklists, Scheduling, Spreadsheets, Whiteboards, Gantt Charts, Roadmaps, Inbox, Teams.
- 4 hero tiles (2×2 cells each) in the centre block: **Projects** (peach gradient, board/task screenshot), **Docs** (blue gradient, doc stack), **Brain** (pink gradient, "What did I miss last week?" search), **Chat** (purple gradient, avatars + message lines). Each: pastel radial gradient bg, product screenshot cropped at top, coloured app icon + name 26px/650 `#242449` at bottom; tile links to `/teams/project-management`, `/features/docs`, `/brain`, `/features/chat`; tiles have 12px radius on the outer corner only. A tiny 4-point star sits at the centre junction.
- Hover: cell tint (100ms `--hover-transition`). No scroll animation.

### S5. Super Agents (`lp4-agents-section`) — y 3025→4630 (pinned scroll scene), bg white
- Purpose: flagship feature reveal with cinematic scroll.
- Title block: H2 76px / 1.05 / 700 / −0.04em, gradient-clipped text `linear-gradient(90deg,#202020,#8f8f8f)`, centered, max-width 760: **"A new era of humans, with Super Agents™"**. CTAs: **"Build your own agent"** (primary `#202020`, 16px/500, padding 14px 20px, radius 12) + **"Learn More"** (secondary `#f0f0f0`) → `/brain/agents`.
- Scene: 1400×800 card (`layeredContent`, radius 0 0 40px 40px, overflow hidden, bg white) with a vertical peach→red radial gradient (`--gradient-hero: rgba(246,233,232,0) → rgba(255,91,54,.23)`) and a noise texture (opacity .4). GSAP ScrollTrigger pins it (`.pin-spacer` present, `scrub: 1`), and across ~1600px of scroll:
  1. The gradient "Super Agent" domino mask (`super-agents-mask.webp`, 620px) floats alone, `position: fixed`, scale ≈ .86.
  2. A grainy red silhouette of a head/shoulders fades in behind (`agentShadow`, translateX −404).
  3. The photo (`agent-new.webp`, 808×635 — a red-haired person in an orange turtleneck) fades in over the silhouette (`agentMain` opacity 0→1) while the mask scales down to ≈ .58 and lands on their face; faint ASCII glyphs (`_*\!-{\_>_`, `+^\__-_`) float around.
  4. A **"Build your own agent"** button rail slides up from the card bottom.
- Reduced-motion: static composite.

### S6. Brain² (`home-brain-2-section`) — y 4630→7280, bg `#000`
- Purpose: AI platform deep-dive; the site's "dark act".
- Entrance: the black panel starts inset (`clip-path: inset(0 20px round 32px)`, i.e. a rounded card 20px in from the viewport edges) and, as it scrolls into view, animates to `inset(0)` (full bleed) via a `--home-brain-bleed` 0→1 variable — sampled values: `inset(0 19.9px round 31.9px)` → `inset(0 .5px round .8px)` → `inset(0)`. It re-insets on the way out (`inset(0 5.8px round 9.3px)` near the bottom). Scroll-linked (GSAP or rAF).
- Hero band (padding 160px top / 96px bottom): Brain² wordmark (4-petal gradient flower + "Brain²" 80px white), H2 80px / 1.2 / 700 / −3.2px, gradient text `linear-gradient(0deg,#8f8f8f -15%,#fff 80%)`: **"The best AI is *your* AI"** (italic "your"). Sub 20px `#b4b4b4`: "Already plugged into your team, your tools, and your tasks." Row: mono uppercase **"AVAILABLE EVERYWHERE"** + platform links " macOS,  iOS, ⊞ Windows, ▷ Android" (14px mono `#838383`). Below the copy a blurred horizontal spectrum band (blue→purple→pink→orange, `heroBandGlow`) — one `<canvas>` (three.js) sits in this section, likely this glow.
- Pillars: 3 equal cards in a 1px `#2a2a2a` bordered row (1080 wide): **CONTEXT** — "Brain² sees your tasks, docs, and conversations. It doesn't need a brief because it knows what's happening in real-time." (visual: stacked dark browser windows with a glowing Brain chip); **INTELLIGENCE** — "Brain² picks the best AI model for each job. One subscription. Every frontier model running with full context." (visual: "Best models" list — Brain ✓, GPT, Claude Opus, Gemini); **PERSONALITY** — "Brain² learns how you and your team talk: your tone, your shorthand, your preferences." (visual: mono key/value table `tone "direct, no fluff…"`, `sprint_methods "story points, fibonacci"`, `reports_to "VP Engineering, weekly on Mondays"`, `prefers "tables over bullet points"`, `projects`, `timezone`, `tools`). Label style: Sometype Mono 12px uppercase `#eee`; copy 16px `#b4b4b4`; padding 24px.
- "What's new" grid (`Brain2WhatsNew`): H3 44px/650 white **"Nothing comes close to Brain²"**, sub "We rebuilt Brain from the ground up." Then 3×2 grid, `gap 1px`, border/gap colour `#2a2a2a`, cards 394px tall, bg `#000`, copy top / visual bottom:
  - **MEMORY & PREFERENCES** — "Brain² keeps track of how you like to work, and gets smarter every time you use ClickUp." (visual: "Memory Updated" card, "USER PREFERENCE: Values clarity", gradient underline)
  - **EVERY AI, UNLIMITED** — "GPT, Claude Opus, Gemini, and more. Every model runs with full knowledge of your work." (visual: vertical picker Gemini / **Brain²** / Claude / ChatGPT with ◀ ▶)
  - **MULTIPLAYER AI** — "The more your team uses Brain², the more it knows, the more useful it gets for everyone." (visual: stacked agent cards Strategist ● / Developer / Visual Designer)
  - **CONNECTED APPS & ANY MCP** — "Brain² taps Google Drive, GitHub, Salesforce, and more to get you answers and insights." (visual: Figma/Drive/GitHub/HubSpot nodes wired to a Brain chip, "MCP ONLINE" pill; `drawLine`, `slideInFromLeft/Right`, `drawCardBorderFromTop/Bottom` 2.2s)
  - **AMBIENT INTELLIGENCE** — "Brain² surfaces relevant context, related tasks, and smart suggestions before you even ask." (visual: "Gathering Data" bar with spinning icon, chips "Improve Billing Error Handling", "Optimize Dashboard Load Time"; `chipReveal`, `ghostPulse`, `glowDrift`, `brainScale`, `borderBrighten`, `spinIcon 1.8s infinite`)
  - **DEEP SEARCH** — "Ask something complex. Brain² checks your workspace, apps, and the web for answers." (visual: report "Growth & Acquisition, Week of Apr 21 … Paid ROAS holding at 4.2x…", "Reports build in progress" progress bar, fade highlights)
  - Card visuals animate on entry (CSS keyframes with delays, `both` fill) — presumably triggered by an IntersectionObserver adding a class.
- Closing band: gradient (blue `#0b88fd` → purple `#6647f0` → magenta, with a faint dotted-grid/starfield texture) fading from black at top (`closingTopFade`, 200px `#000→transparent`). H3 56px/700 white centered **"The only AI that actually knows your work"**; **"Get Started with Brain"** white button (bg `#fff`, text `#202020`, 16px/650, padding 14px 22px, radius 12); text link **"Learn more"** → `/brain`.

### S7. Teams tabs (`cu-home-teams-tab`) — y 7280→8100, bg white with `#f8f9fa` panel
- Purpose: persona routing ("solutions for every team").
- H2 48px centered **"AI solutions for every team"** ("team" grey); sub "Your key workflows, powered by ClickUp Agents."
- Tab nav (centered, gap 12, padding 14px 0): pills **Projects · Marketing · Product & Eng · IT · HR · Leadership · See all teams** (→ `/teams`). Pill: 14px/600 Inter, padding 4px 12px, radius 54px, 1px dashed `#d9d9d9` ring (`:before`), text `#646464`; selected: 2px solid `#0091ff`, bg `#edf6fd`, text `#0091ff`; `transition: all .3s cubic-bezier(.4,0,.2,1)`.
- Panel: 1080×~470 card, bg `#f8f9fa`, radius 32, padding 56. Two columns:
  - Left: H3 40px/650 −1.5% (second line grey) + para 18px `#292d34` + **"REPLACES"** (Sometype Mono 16px `#646464`) followed by 4 tiny competitor glyphs (Monday, Asana, Notion, Slack…) + 3 check bullets (16px `#646464`, grey check).
  - Right: 4 stacked white "agent" cards (radius 12, 1px `#e8e8e8`, soft shadow, padding 16, 40px avatar with sparkle badge + 16px text) and a small **"Explore solution →"** primary button (14px/600, padding 8px 12px, radius 8).
- Content per tab:
  - Projects: "Deliver projects on time, every time" — "Get your team, department, and company running smoothly with the industry's best project management solution." Bullets: Manage complex projects at scale / Bring strategic initiatives to life / Detect and mitigate project risks. Agents: Intake Agent standardizes project kickoff / Assign Agent determines task owners / PM Agent tracks deliverables + timelines / Live Answers Agent keeps everyone informed. → `/ai-solutions/project-execution`
  - Marketing: "Maximize marketing's impact and results" — "Coordinate content, creative, and campaigns in a single workspace purpose-built for marketers." Bullets: Execute campaigns with velocity / Coordinate + run seamless events / Eliminate content + creative bottlenecks. Agents: Brief Agent creates campaign briefs / Content Agent drafts promo copy / Brand Agent applies guidelines / Live Intel Agent updates core docs. → `/ai-solutions/campaign-execution`
  - Product & Eng: "Ship faster, more reliable software" — "Streamline the entire strategy + dev process in a single, connected workspace." Bullets: Plan + execute the roadmap / Identify + resolve bugs / Integrate with AI coders. Agents: PRD Agent creates docs from voice notes / Triage Agent prioritizes bugs / Live Answers Agent keeps everyone informed / Codegen Agent produces quality code. → `/ai-solutions/agile-execution`
  - IT: "Create the systems, for scale" — "Streamline internal support processes and external vendor relationship protocols in a single, unified workspace." Bullets: Manage vendors + budgeting / Run tight asset management / Streamline contracts + procurement. Agents: Assets Agent tracks inventory / RFP Agent manages reqs docs / Contracts Agent standardizes terms / Live Intel Agent identifies redundancies. → `/teams/it-pmo`
  - HR: "Build the process that power your people" — "Optimize the employee experience to keep morale as high as productivity." Bullets: Streamline employee onboarding / Roll out effective training programs / Keep a pulse on employee NPS. Agents: Onboarding Agent monitors progress + feedback / Pulse Check Agent collects employee sentiment / Trainer Agent analyzes course performance / Live Answers Agent provides real-time info. → `/teams/design`
  - Leadership: "Close the strategy-execution gap" — "Get your company rowing in the same direction with one AI workspace to define, execute, and track your top-line goals." Bullets: Set the strategy and actually execute it / Drive organizational focus with tighter alignment / Enforce accountability and ownership with ultimate visibility. Agents: Goal Reminder Agent removes tedious check-ins / Alignment Agent ensures cross-functional cohesion / Key Results Agent suggest relevant KPIs / Status Update Agent gives always-on visibility. → `/ai-solutions/strategic-initiatives-execution`
- Interaction: click switches panel (fade). Section is `hidden-900` → replaced by a stacked/scroll-snap layout under 900px.

### S8. Impact / ROI (`cu-home-impact4o`) — y 8100→8760, bg hairline `#e8e8e8`
- Purpose: quantified ROI with third-party attribution.
- Header row: left H2 48px **"It's like adding 15 full-time employees"** ("employees" grey) + sub 18px `#646464` "According to third party research ClickUp saves the average company over 30k hours per year, and delivers industry-leading ROI." (max ~800px); right-aligned **"Get started"** primary (16px/500, padding 10px 20px, radius 12).
- Stats strip: 4 white cards, 281px tall, separated by 1px `#e8e8e8` gaps with small notched corner dividers at the top; each: mono uppercase label in purple `#6647f0` 13px (ROI / REVENUE INCREASE / HOURS SAVED / PAYBACK), value 34px/650 (`384%`, `$3.9M`, `92,400`, `<6 mo`), description 12px `#646464` pinned to the bottom (`justify-content: space-between`).
- Footnote 12px: "*from 2025 The Total Economic Impact™ of ClickUp report from Forrester Group. **Get the report**" (blue underlined link).
- No count-up animation detected.

### S9. Testimonials (`CuHome_testimonialsSection`) — y 8760→9715, bg white
- Purpose: customer proof + awards.
- Header row: left H2 48px **"Loved by 5+ million teams, backed by 100+ awards"** ("teams", "awards" grey); right: awards SVG (346×130) — G2 "Highest User Adoption — Enterprise — Winter 2026", Inc. "2026 Power Partner", G2 "Best Est. ROI — Enterprise — Winter 2026".
- Grid: 3 portrait cards 347×613, radius 16, gap 20. Each: full-bleed photo/video still (Diggs — woman in black top; Finastra — man presenting at whiteboard, with a LinkedIn-style "in" overlay; Hawke Media — woman laughing with a dog), bottom dark gradient scrim, quote 20px/600 white, name + title 14px white, company logo bottom-right. Quotes: **"ClickUp is serving us so we can serve our pet guardians."** — Samantha Dengate, Sr. Project Manager (Diggs); **"It's a low-code platform that helps us automate processes."** — Joerg Klueckmann, VP of Marketing (Finastra); **"ClickUp is the best thing I've rolled out in the past two years."** — Lauren Makielski, Chief of Staff (hawkemedia).
- Interaction: each card is a button → opens a Wistia video (`wistia_embed` iframes). Under 900px: horizontal `clickToScrollCard` carousel.

### S10. Achievements (`achievements`) — y 9715→10730, white; two "two-column content boxes" with a shared center hairline and corner dots
- Box A: left column — mono purple eyebrow **"RATED 4.7/5 BY 10,000+ USERS ON G2"**, H2 40px/650 **"#1 most referenced company on G2 reports"**, **"Read customer stories"** primary (16px/600, radius 8) → `/customers`. Right column — a 4-row mosaic of ~120 G2 badge images (82×94: Best Software 2026 Agentic AI Products / AI Products / Software / Project Management Products / Global Software Companies / CMS / Development / HR / IT Management; Winter 2026 Leader / Momentum Leader / High Performer Enterprise), rows offset by half a badge, wrapped in `_marqueeVignette` (mask fades 20%→80% on both axes). Static in headless; intended as a slow marquee/drift (keyframes exist elsewhere for `integrations-slider-forward/reverse` and `callout-card-logo-scroll`).
- Box B: left — a purple **dot-grid waffle chart** (24×20 dots, ~85% filled `#6647f0`, rest `#e8e8e8`) captioned in mono "FORTUNE 500 COMPANIES THAT USE CLICKUP"; right — eyebrow **"CONVERGENCE POWERHOUSE"**, H2 **"Powering businesses of all sizes"**, two stats 34px/650: **85%** "of Fortune 500 companies", **3M+** "tasks automated by Agents".

### S11. Security (`cu-home-security`) — y 10730→11105
- Left: H2 34px/650 **"Enterprise-grade everything"**, sub 18px "Out of the box security & AI that's even more private than ChatGPT¹" (superscript footnote link). Below: mono "🌐 24/7 SUPPORT".
- Right: 4 hairline-divided cells with certification marks (AICPA SOC 2, ISO 27001 Schellman, GDPR stars, HIPAA caduceus) and mono labels **SOC 2 TYPE II · ISO 27001 · GDPR · HIPAA**.

### S12. Final CTA (`Lp4AiCta`) — y 11105→11965
- Full-bleed card (20px page margin, radius ~40, overflow hidden). Background layer: `radial-gradient(ellipse 132% 74% at 96% 1%, #fc6d2d 23%, #f73699 57%, #6647f0 95%, #0b88fd 115%)`, `transform: rotate(4deg) scale(1.5)`.
- Centered: ClickUp app icon in a glass tile (white, radius 20, drop shadow); H2 60px/700 white **"All your work, all your people, all powered by AI"**; **"Get started FREE"** white button (18px/700, padding 14px 20px, radius 12).
- Below: desktop app screenshot (`Footer40.webp`, 1184×424, browser-chrome mock of "Mango Tech / Marketing" list) overlapped bottom-right by a phone mock (284×336); both cropped by the card's bottom edge.
- Then footnote, hairline, footer (1.5).

---

## 3. Visual language

### 3.1 Colour (from `:root` tokens in the CSS)
Light theme:
- Text: `--Core-Text-Main #202020`, `--Core-Text-Secondary #646464`, `--Core-Text-Tertiary #838383`, `--Core-Text-Disabled #bbb`; body copy default `#292d34`; deep navy for some headings `#090c1d` / `#242449`.
- Backgrounds: `--Core-Background-Main #fff`, `--Core-Background-Box / -Card #f8f9fa`, `--Core-Utilities-Gray #f7f7f7`; hairline `--Core-Border-Default #e8e8e8`; secondary button `#f0f0f0` (hover `#dedede`).
- Accents: `--Core-Accents-Purple #6647f0` (badge `#efedfd`), `--Core-Accents-Blue #0091ff` (badge `#edf6fd`), `--Core-Accents-Pink #ff02f0` (badge `#feecfc`), `--Core-Accents-Orange #fc6d2d` (badge `#fdede7`); utilities Red `#f0382d`, Green `#078d3b`, Deep Blue `#4a2fff`.
- Primary button: `--Core-Button-Primary #202020` (near-black, *not* purple). Blue `#0091ff` is the "selected/active" colour (tabs, links). Purple `#6647f0` is the "data/eyebrow" colour (mono labels, dot chart).
Dark theme (Brain² section): bg `#000`, box `#111`, card `#272727`, border `#2a2a2a`, text `#eee` / `#b4b4b4` / `#7b7b7b`, accents lightened (Purple `#b38cff`, Blue `#7acaff`, Pink `#ff8af7`, Orange `#fb9e79`).
Brand gradients:
- Spectrum button gradient (v4): `linear-gradient(100deg, #40ddff -6%, #7612fa 25%, #fa12e3)`.
- Rotating pill conic: `#0091ff → #ff02f0 → #f76808 → #6647f0`.
- CTA radial: `#fc6d2d → #f73699 → #6647f0 → #0b88fd`.
- Agents scene: peach→red `rgba(255,91,54,.23)` over noise.
- Headline "fade" gradient: `linear-gradient(90deg, #202020, #8f8f8f)` (light) / `linear-gradient(0deg, #8f8f8f, #fff)` (dark).

### 3.2 Typography
- Display: **Plus Jakarta Sans** (variable, self-hosted `/assets/fonts/PlusJakartaSans-VariableFont_wght.woff2`), weight 650–700, `font-feature-settings: "calt" off`, `text-wrap: balance`. Sentence case everywhere (no Title Case, no all-caps headlines).
- Body/UI: **Inter** (variable, self-hosted), 400/500/600; body 16px/1.5 `#292d34`.
- Mono accent: **Sometype Mono** (variable) for eyebrows, column headings, stat labels, "REPLACES", "AVAILABLE EVERYWHERE" — uppercase, letter-spaced, 12–16px.
- Handwriting: Shantell Sans loaded (not seen on home).
- Scale (desktop → mobile):
  - `display-4xl/3xl`: 76–80px / 1.05–1.2 / −3.04 to −3.2px (Agents, Brain² hero)
  - `display-2xl`: 60px / 1.1 / −2.1px → 40px / 1.2 / −1.6px (H1, final CTA)
  - `display-xl`: 48px / 1.15 / −1.68px (most H2s)
  - `display-lg`: 40px / 1.2 / −1.6px → 26px (teams H3, achievements H2)
  - `display-md`: 34px / 1.2 / −1.6px (stat values, security H2)
  - Card titles 26px/650 −0.91px; subheads 18–20px Inter 400 `#646464`; captions 12–14px.
- Headline device: last phrase or key noun in `#8f8f8f`/`#646464` (or gradient-clipped) for emphasis contrast.

### 3.3 Shape, border, shadow
- Radii: 8px (small buttons, nav pills), 12px (standard buttons, cards, promo tiles), 15–16px (hero CTA, media, custom cursor), 32px (teams panel, Brain² inset), 40px (agents card bottom, final CTA card), 54px/50px (pills), 50% (avatars).
- Borders: 1px `#e8e8e8` hairlines used as *layout* (grid gaps, section strips, column dividers with corner dots); dashed 1px `#d9d9d9` for idle tab pills; dark sections use `#2a2a2a`.
- Shadows: almost none on light sections (buttons use `inset 0 0 0 1px rgba(0,0,0,.15)`); mega menu `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)`; agent cards soft; token `--color-shadow: 16,30,54,0.1`.
- Buttons: primary `#202020`/white; secondary `#f0f0f0`/`#202020`; tertiary transparent; inverse white on dark/gradient; v4 spectrum-gradient variant exists (`CuButtonV4`, hover `translateY(1px)`); sizes 14px (sm, 8×12), 16px (md, 10×20 or 14×20), 18px (lg, 14×20).
- Icons: 24px outline monoline grey for feature grids; 20px filled coloured "app icons" (rounded squares) for product identities (Tasks green, Chat purple, Docs blue, Whiteboards yellow, Calendar pink, Time tracking orange…); 40px black tile icons in the Brain menu; agent avatars are illustrated 3D-ish heads with a sparkle badge.
- Illustration: photographic/3D-rendered hero object (gradient mask), grainy noise textures, tangled-cable metaphor illustration, dark "UI fragment" visuals in Brain² cards, waffle dot chart. No flat cartoon illustration.
- Spacing: containers 1080 (content) / 1120 (nav) / 1160 (`--size-container-current`) / 1381 (feature grid) / 1400 (bleed cards); section padding ~120–150px desktop, 60px mobile; card padding 24 (dark) / 56 (light panel); grid gaps 20–24.
- Breakpoints (most used): 600, 900 (primary mobile/desktop switch), 1000, 1100, 1200, 1400; `prefers-reduced-motion` honoured (animations set to none).

---

## 4. Motion system

Libraries: **GSAP 3 + ScrollTrigger + Observer** (in Next chunks `6999-…js`, `b0ff0e03-…js`, `5938-…js`; `registerPlugin(ScrollTrigger)`, `scrub:1`, `.pin-spacer` in DOM), **three.js + @react-three/fiber** (one canvas, Brain² glow), **Rive** runtime referenced (no `.riv` fetched on home), **Wistia** player. Everything else is CSS keyframes/transitions + IntersectionObserver + rAF. Easing tokens: `--easing-natural cubic-bezier(.5,0,.5,1)`, `--easing-bounce (.175,.885,.32,1.275)`, `--easing-out (.165,.84,.44,1)`, `--transition-short .25s`, `--transition-long .5s`; many components use `cubic-bezier(.25,.46,.45,.94)` (ease-out-quad) and `cubic-bezier(.4,0,.2,1)` (material standard).

Observed animation types:
1. **Mega-menu curtain** — height/opacity reveal (`nav-curtain-down .3s`), staggered column fade-up; Radix NavigationMenu.
2. **Sticky frosted nav** — `position: sticky` + `backdrop-filter: blur(6px)` on a 90% white layer; no shrink/shadow on scroll.
3. **Rotating gradient border** on the hero pill (conic gradient rotated 1.5s linear infinite behind a blurred white fill) and **rainbow ring** on the primary CTA hover; keyframes `eyebrow-rotate-gradient-angle 7s` / `eyebrow-rotating-gradient-border` for a variant.
4. **Hero product tab switcher** — click-driven; stills cross-fade `opacity .3s`; "Projects" tab is a fully **DOM-animated product mock** (cursor roving/clicking, rows popping in, AI "typing shimmer", marching-ants selection, blinking caret) using a family of `list-view-*`, `board-view-*`, `calendar-view-*`, `chat-view-*` keyframes (there are ready-made keyframe sets for list, board, calendar and chat views).
5. **Logo bar set rotation** — blur+scale+opacity enter/exit with per-logo stagger (0.05s), set swap every ~8.5s; colour logo on hover.
6. **Custom cursor** — "Play Video" pill follows the mouse over the video trigger (fixed, translate3d via CSS vars, scale/opacity transitions).
7. **Masked grid fade** — `mask-image` gradients on the feature wall and badge mosaic (`_marqueeVignette`).
8. **Pinned scroll scene** (Agents) — GSAP ScrollTrigger `pin` + `scrub:1`: fixed mask object, layered opacity fades, scale 0.86→0.58, a rail sliding in.
9. **Clip-path bleed** (Brain²) — a rounded inset card expands to full-bleed as it enters (`clip-path: inset(0 20px round 32px) → inset(0)`), scroll-linked.
10. **Entry-triggered card micro-animations** (Brain² grid) — CSS keyframes with delays and `both` fill: slide-in from left/right, draw-line/draw-border, chip reveal, glow drift, spin, ghost pulse, scale, border brighten, caret blink; plus `shimmerStream` (background-position sweep) for AI "thinking" states.
11. **Tab pills** — `transition: all .3s` between dashed idle and solid blue selected; panel fade.
12. **Marquee** — CSS keyframes present (`integrations-slider-forward/reverse`, `callout-card-logo-scroll`) for badge/logo tickers; achievements mosaic uses a vignette mask.
13. **Overlays/modals** — fade-in `.2s ease-out forwards` (signup, contact-sales, video).
14. **Hover** — 100ms colour/tint transitions on grid cells and menu items; buttons `background-color .2s`; CTA `translateY(1px)` press.
15. Not used: parallax on images, count-up numbers, Lottie, smooth-scroll (Lenis), page transitions, autoplaying `<video>` on the homepage (all video is click-to-play Wistia; "video" feel comes from CSS-animated DOM mocks and AVIF stills).

---

## 5. Conversion patterns

- **Primary CTA cadence** ("Get started / Sign Up", always near-black or white, never gradient): nav (persistent), hero, wall-of-features tiles (implicit), Agents ("Build your own agent"), Brain² closing ("Get Started with Brain"), Impact ("Get started"), Achievements ("Read customer stories"), final CTA ("Get started FREE"). Secondary "Get a Demo" lives only in the nav (and mobile menu). Every primary CTA opens an email-capture overlay rather than navigating.
- **Free-forever framing**: "Get started. It's FREE!" + "Free forever. / No credit card." microcopy beside the hero button; repeated as "Get started FREE" at the end. Free plan is never described in detail on the home page.
- **Social proof ladder** (top → bottom): logo strip (Amazon/NVIDIA/Wayfair/Verizon/Spotify/Stanford, rotating) → third-party stat headline (60% / 96% / 2.5h) → Forrester TEI numbers (384% ROI, $3.9M, 92,400 hrs, <6 mo payback, "15 full-time employees") → "5+ million teams, 100+ awards" + 3 award badges → 3 video testimonials with names/titles/logos → G2 rating "4.7/5 by 10,000+ users" + badge wall → "85% of Fortune 500", "3M+ tasks automated" → SOC 2 / ISO 27001 / GDPR / HIPAA + "24/7 support" → compliance badges again in the footer.
- **Persona routing**: Solutions mega-menu (teams/companies/industries) and the Teams tab section, each panel ending in "Explore solution →".
- **Breadth objection**: the 48-cell feature wall + "100+ products" + Compare column in the footer (11 "vs" pages).
- **Announcement bar** drives to the newest product (Brain²), mirrored by the hero pill and the nav's first item.
- **Footnotes** for every claim (Forrester citation, ChatGPT privacy claim).

---

## 6. Translation guide — ClickUp section → Flavor Studio equivalent (structure only)

Flavor Studio modules: Recipes/formulation grid, Ingredients library (USDA), Costing, Nutrition labels (FDA/Canada), Nutrient Content Claims, Projects (timeline/board), Taste Tests, CRM / Customer Requirements builder, Timesheet & Reports, Publish Designer, AI Agent "Sous", Integrations/webhooks/ERP.

| # | ClickUp section | Flavor Studio equivalent (structure) |
|---|---|---|
| 0 | Announcement bar "NEW: Brain²…" | One-line bar for the newest capability (e.g. Sous agent or a new label format), fully clickable, hides on mobile, not sticky. |
| Nav | Brain AI ▾ / Product ▾ / Solutions ▾ / Learn ▾ / Pricing / Enterprise · Get a Demo · Login · Sign Up | **Sous AI ▾** (agent, skills/recipes it can run, resources) / **Product ▾** (5 columns: FORMULATE — Recipes grid, Ingredients (USDA), Costing, Nutrient claims; COMPLY — Nutrition labels FDA/Canada, Publish Designer; RUN — Projects, Taste Tests, Timesheet & Reports; SELL — CRM, Customer Requirements builder; MORE — All features, Integrations/ERP, API & webhooks, Watch demo) / **Solutions ▾** (TEAMS: R&D, Regulatory, Procurement/Costing, Sales/Account mgmt, QA; COMPANIES: Enterprise, Startup/CPG brands, Co-packers, Ingredient suppliers; INDUSTRIES: Bakery, Beverage, Snacks, Dairy, Plant-based, Foodservice; FEATURED: 2 promo tiles) / **Learn ▾** (Learn, Discover, Support + customer-story card) / **Pricing** / **Enterprise** · right: Get a Demo (tertiary), Log in (secondary), Sign up (primary). Same 60px sticky frosted bar, same curtain menu. |
| Footer | AI / Product / Compare / Company / Help + Download sub-group; social; compliance; legal | Sous / Product (12 modules) / Compare (vs Genesis, vs ESHA, vs Recipal, vs spreadsheets…) / Company / Help + Download (desktop/mobile) ; social row; compliance badges (SOC 2, GDPR, plus regulatory credibility marks such as FDA 2016 label format / CFIA); legal line. |
| S1 | Hero: pill eyebrow → 2-line H1 (second line grey) → primary CTA + "Free forever / No credit card" → full-width tab panel (12 vertical tabs, animated product mock) → logo strip | Pill eyebrow linking to Sous; 2-line H1; primary CTA + trial microcopy; **12-tab product panel**: Recipes, Ingredients, Costing, Nutrition Labels, Claims, Projects, Taste Tests, CRM, Timesheets, Reports, Publish, Sous — first tab a DOM-animated **formulation grid** (rows populating, cursor editing a percentage, Sous tooltip "Re-balancing sodium…"), others stills; logo strip of customer/partner brands with rotating sets. |
| S2 | Logo bar "TRUSTED BY THE BEST" | Same strip: mono eyebrow + 6 monochrome logos, set rotation every ~8s. |
| S3 | Stat headline "60% of work is lost in context…" + illustrated tangle + 3 stat columns + click-to-play video with custom cursor | Industry-pain stat headline (spreadsheets/reformulation time/label errors) + illustration of a tangle of spreadsheets, supplier PDFs and email threads with "Where's the spec?" bubbles; 3 stat columns (e.g. Reformulation delays / Label recall risk / Cost blind spots); click-to-play product tour video with the "Play Video" cursor. |
| S4 | Wall of features: 10×8 hairline grid, 48 cells + 4 hero tiles (Projects/Docs/Brain/Chat) | Same grid: ~48 capability cells (Sub-recipes, Yield & loss, Allergens, Batch scaling, Unit conversion, USDA import, Supplier specs, Version history, Approval flow, Webhooks, ERP sync, Barcode, Shelf-life, Spec sheets, etc.) around 4 hero tiles: **Recipes**, **Nutrition Labels**, **Costing**, **Sous**. |
| S5 | Super Agents: giant gradient headline, 2 CTAs, pinned scroll scene with a hero object landing on a person | **Sous** reveal: giant gradient headline, "Build your own Sous skill" + "Learn more"; pinned scene where a hero object (e.g. a gradient chef's toque/whisk or a floating label card) settles onto a person/plate as you scroll; button rail slides in. |
| S6 | Brain² dark act: bleed-in black panel, wordmark + huge gradient H2, platform row, 3 pillars, 3×2 "what's new" grid of animated UI fragments, gradient closing band + CTA | Sous dark act: bleed-in black panel; Sous wordmark + H2; "AVAILABLE IN" row (web, desktop, mobile, Slack/Teams); 3 pillars (CONTEXT — knows your recipes/specs; INTELLIGENCE — model choice; PERSONALITY/RULES — your regulatory + brand constraints); 3×2 grid: Memory & preferences, Every model, Multiplayer, Connected apps & ERP (webhooks/MCP), Ambient suggestions (e.g. "Sodium exceeds claim threshold"), Deep search across USDA + specs; gradient closing band "The only AI that actually knows your formulas" + white CTA. |
| S7 | Teams tabs: pill nav (6 teams) → 2-col panel (H3, para, REPLACES + icons, 3 checks · 4 agent cards, Explore solution →) | Teams tabs: R&D / Regulatory / Procurement / Sales / QA / Leadership; each panel: outcome H3, para, "REPLACES" (spreadsheets, ESHA, email…), 3 checks; right: 4 **Sous skill cards** (Intake skill builds the customer requirement brief, Costing skill flags margin, Label skill validates FDA/CFIA format, Taste-test skill summarises panel results) + "Explore solution →". |
| S8 | Impact: H2 + sub, 4 stat cards with mono purple labels, footnote link | ROI: H2 (e.g. adding N formulators), 4 cards: Time to first formula / Reformulation cycles cut / Label errors avoided / Payback; footnote to a customer study or internal benchmark. |
| S9 | Testimonials: H2 + award badges; 3 portrait video cards with quote/name/logo | Same: 3 portrait video cards (R&D lead, Regulatory manager, Founder) with quotes; award/press badges right. |
| S10 | Achievements: two 2-col boxes (G2 rating + badge mosaic; waffle chart + "Powering businesses of all sizes" stats) | Box A: review rating + badge mosaic (G2/Capterra/industry awards); Box B: waffle chart "% of top X CPG brands" or "recipes formulated" + two stats (e.g. "12k+ labels published", "40M+ ingredient rows"). |
| S11 | Security: "Enterprise-grade everything" + 4 compliance marks + 24/7 support | Same layout; marks: SOC 2, GDPR, plus regulatory accuracy marks (FDA 2016 / Canada 2022 label formats, USDA FoodData Central source) and 24/7 support. |
| S12 | Final CTA: rotated radial-gradient card, glass app icon, H2, white CTA, desktop + phone mocks cropped at bottom | Same: brand-gradient card, glass Flavor Studio icon, H2, white "Get started free", desktop formulation grid + phone (taste-test capture) mocks cropped by the card. |
| Mobile | Logo + Sign Up + hamburger; full-screen sheet with 32px items and pinned Login; hero with check bullets; 3-col icon grid replaces tab panel | Mirror exactly; the 12-module icon grid replaces the tab panel under 900px. |

Implementation notes for the Flavor Studio build (the repo already has `gsap` + `@gsap/react`): reuse GSAP ScrollTrigger for S5 (pin + scrub) and S6 (clip-path bleed), CSS keyframes + IntersectionObserver for card micro-animations, CSS `mask-image` for edge fades, a Radix-style NavigationMenu for the curtain, self-hosted variable fonts (Plus Jakarta Sans / Inter / a mono such as Sometype Mono), and respect `prefers-reduced-motion`.
