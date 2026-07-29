import { routes } from "@/lib/routes";

/*
 * Content ported from the prototypes. The customer, testimonial and success
 * story material is the real flavorstudio.com copy the user asked for; the
 * accompanying imagery is served locally (see public/) rather than hot-linked.
 */

/* ---------------------------------------------------------------- customers */

/*
 * The eight marks from the flavorstudio.com customer strip, vendored from
 * /gfx/senspire/customers/. They ship greyscale already, so the marquee tint
 * only has to cool them toward the page's slate-blue.
 *
 * Aspect ratios vary a lot (sensient is 3.8:1, imagine-food is 1.2:1), so each
 * entry carries its intrinsic size and the marquee bounds both axes instead of
 * pinning height alone -- see logo-marquee.tsx.
 */
export const customerLogos = [
  { name: "Pulse Canada", src: "/customers/pulse-canada.png", w: 350, h: 79 },
  { name: "Pinnacle", src: "/customers/pinnacle.png", w: 336, h: 109 },
  { name: "Imagine Food", src: "/customers/imagine-food.png", w: 129, h: 110 },
  {
    name: "Made in Nature",
    src: "/customers/made-in-nature.png",
    w: 161,
    h: 102,
  },
  { name: "Sensient", src: "/customers/sensient.png", w: 229, h: 60 },
  { name: "Luvo", src: "/customers/luvo.png", w: 280, h: 150 },
  { name: "Clearwater", src: "/customers/clearwater.png", w: 400, h: 184 },
  { name: "JMH", src: "/customers/jmh.png", w: 350, h: 191 },
];

/* ------------------------------------------------------------ testimonials */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: '"This is bar none the best program I’ve ever seen or worked with."',
    name: "Andrew Hunter",
    role: "President at Chef Andrew Hunter",
    photo: "/testimonials/andrew_hunter.png",
  },
  {
    quote:
      '"Today we communicate, collaborate and prioritize projects in an organized and highly visible fashion… We can not live without Flavor Studio!"',
    name: "Charles Hayes",
    role: "VP Culinary Innovation, R&D Deli Star",
    photo: "/testimonials/charles_hayes.png",
  },
  {
    quote:
      '"Flavor Studio has always provided unparalleled customer service and has been extremely patient in working with us…"',
    name: "Stefan Czapalay",
    role: "CEO Signature Culinary Solutions",
    photo: "/testimonials/stefan_czapalay.png",
  },
  {
    quote:
      '"It’s a great organizing tool and keeps you on task — like an Outlook calendar for food."',
    name: "Greg Grisanti",
    role: "Director of R&D at Frischs Big Boy Inc.",
    photo: "/testimonials/greg_grisanti.png",
  },
  {
    quote: '"We are loving Flavor Studio more than ever!"',
    name: "Kari Baker",
    role: "Product Developer at Hope Foods",
    photo: "/testimonials/kari_baker.png",
  },
  {
    quote:
      '"…a very robust and full-featured software for ideation and product formulation."',
    name: "Michael Cheng, PhD., CHE",
    role: "Director of Food and Beverage Program at FIU",
    photo: "/testimonials/michael_cheng.png",
  },
  {
    quote:
      '"Flavor Studio has provided ATE with not only a valuable business tool… but a proactive, solution driven relationship."',
    name: "Chef Rob Corliss",
    role: "Owner of ATE (All Things Epicurean)",
    photo: "/testimonials/chef_rob_corliss.png",
  },
];

/* ---------------------------------------------------------- success stories */

/*
 * Photography and logos are vendored from flavorstudio.com/success-stories.
 * The three heroes are not a common shape (Deli Star is 3:2, the other two are
 * square) and the logos range from 7.6:1 to 1.8:1, so each carries its own
 * intrinsic size: the heroes crop to a 4:3 slot via object-cover, and the logo
 * chips size off a real aspect ratio instead of a shared guess.
 */
export type Story = {
  company: string;
  meta: string;
  eyebrow: string;
  tag: string;
  title: string;
  blurb: string;
  img: string;
  imgW: number;
  imgH: number;
  imgAlt: string;
  logo: string;
  logoW: number;
  logoH: number;
  href: string;
};

export const stories: Story[] = [
  {
    company: "Deli Star",
    meta: "Fayetteville, Illinois · Meat processing",
    eyebrow: "Meat processing · Innovation",
    tag: "Recipes + Projects",
    title:
      "Flavor Studio drives innovation and collaboration to accelerate product launches",
    blurb:
      "Deli Star is a meat processing company built on scientific innovation, food safety and family culture — crafting healthy, flavorful, minimally processed products in the belief that food is fuel.",
    img: "/stories/deli-star.jpg",
    imgW: 1001,
    imgH: 667,
    imgAlt: "Deli Star headquarters sign",
    logo: "/stories/deli-star-logo.png",
    logoW: 160,
    logoH: 21,
    href: "https://www.flavorstudio.com/success-stories/deli-star-success-story",
  },
  {
    company: "Good Foods Group",
    meta: "Pleasant Prairie, Wisconsin · Fresh produce",
    eyebrow: "Fresh produce · Family-owned",
    tag: "Formulation + Costing",
    title: "Making good food from everywhere, with one shared source of truth",
    blurb:
      "From small-town Pleasant Prairie, Wisconsin, family-owned Good Foods turns fresh produce into guacamoles, dips, dressings, salsas and salads — convinced that good food makes the world go around.",
    img: "/stories/good-foods.jpg",
    imgW: 600,
    imgH: 600,
    imgAlt: "Good Foods products",
    logo: "/stories/good-foods-logo.png",
    logoW: 600,
    logoH: 337,
    href: "https://www.flavorstudio.com/success-stories/good-foods-success-story",
  },
  {
    company: "Ripple Foods",
    meta: "Berkeley, California · Plant-based",
    eyebrow: "Plant-based · Dairy-free",
    tag: "Nutrition + Labeling",
    title:
      "An enhanced cloud-based experience with up-to-date, accurate nutritional analysis",
    blurb:
      "Founded in 2014, Ripple Foods makes plant-based, dairy-free foods and beverages from yellow peas — a milk with as much protein as dairy and about eight times the protein of almond milk.",
    img: "/stories/ripple-foods.webp",
    imgW: 1200,
    imgH: 1200,
    imgAlt: "Ripple Foods plant-based products",
    logo: "/stories/ripple-foods-logo.png",
    logoW: 260,
    logoH: 89,
    href: "https://www.flavorstudio.com/success-stories/ripple-foods-success-story",
  },
];

/* ------------------------------------------------------ the platform (tabs) */

export type PlatformTab = {
  id: string;
  label: string;
  icon: string;
  badgeBg: string;
  badgeColor: string;
  title: string;
  desc: string;
  checks: string[];
  cta: string;
  href: string;
  mockTitle: string;
  mockBadge: string;
  metric: string;
  metricCaption: string;
  bars: { label: string; width: string; color: string }[];
};

export const platformTabs: PlatformTab[] = [
  {
    id: "recipes",
    label: "Recipes",
    icon: "chef-hat-one",
    badgeBg: "var(--color-lime-100)",
    badgeColor: "#5c8f1c",
    title: "Formulate and cost in one live grid",
    desc: "Percentages, weight, yield and cost recompute on every keystroke. Branch versions and sub-recipes without losing the original.",
    checks: [
      "Live cost, yield and margin roll-up",
      "Unlimited versions with pill-tab switching",
      "Sub-recipes nested to any depth",
    ],
    cta: "Discover Recipes",
    href: `${routes.features}#recipes`,
    mockTitle: "Yield / cost",
    mockBadge: "V8",
    metric: "$7.21",
    metricCaption: "Total cost · 32 servings",
    bars: [
      { label: "Butter", width: "30%", color: "var(--color-lime-500)" },
      { label: "Sugars, brown", width: "25%", color: "var(--color-lime-400)" },
      { label: "Flour", width: "20%", color: "var(--color-slate-300)" },
    ],
  },
  {
    id: "taste-tests",
    label: "Taste Tests",
    icon: "experiment",
    badgeBg: "var(--color-teal-100)",
    badgeColor: "#0e8b73",
    title: "Sensory data that flows back into the formula",
    desc: "Run internal panels or consumer surveys, score attributes side by side across versions, and let the winner carry its data into production.",
    checks: [
      "Blind triangle and preference tests",
      "Scores attached to the exact version",
      "Consumer surveys with purchase intent",
    ],
    cta: "Discover Taste Tests",
    href: `${routes.features}#taste-tests`,
    mockTitle: "Panel #212",
    mockBadge: "v4 wins",
    metric: "7.8 / 9",
    metricCaption: "Overall liking · 48 panelists",
    bars: [
      { label: "Overall liking", width: "87%", color: "var(--color-teal-500)" },
      { label: "Texture", width: "80%", color: "var(--color-blue-500)" },
      {
        label: "Purchase intent",
        width: "72%",
        color: "var(--color-lime-500)",
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "folder-open",
    badgeBg: "var(--color-blue-200)",
    badgeColor: "var(--color-blue-700)",
    title: "Launches move through gates, not inboxes",
    desc: "Briefs, tasks and stage gates tied directly to the recipes they concern. Everyone sees where a launch stands — and what is blocking it.",
    checks: [
      "Stage gates from concept to shelf",
      "Tasks linked to recipes and versions",
      "Timelines your whole team can read",
    ],
    cta: "Discover Projects",
    href: `${routes.features}#projects`,
    mockTitle: "Stage gates",
    mockBadge: "On track",
    metric: "14 active",
    metricCaption: "Launches in flight this quarter",
    bars: [
      { label: "Concept", width: "42%", color: "var(--color-blue-200)" },
      { label: "Bench", width: "68%", color: "var(--color-blue-500)" },
      { label: "Launch", width: "28%", color: "var(--color-blue-700)" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: "peoples",
    badgeBg: "var(--color-blue-200)",
    badgeColor: "var(--color-blue-700)",
    title: "Connect the front line to R&D",
    desc: "Link sales opportunities directly to development projects, manage sample requests, and track shipping status — on one system.",
    checks: [
      "Opportunity pipeline & activity reports",
      "Sample requests linked to recipes",
      "Shipment tracking built in",
    ],
    cta: "Discover CRM",
    href: `${routes.features}#crm`,
    mockTitle: "Pipeline",
    mockBadge: "+18% MoM",
    metric: "$1.2M",
    metricCaption: "Open pipeline · 12 deals",
    bars: [
      { label: "Lead", width: "92%", color: "var(--color-blue-200)" },
      { label: "Sampling", width: "58%", color: "var(--color-blue-500)" },
      { label: "Won", width: "30%", color: "var(--color-blue-700)" },
    ],
  },
  {
    id: "inspire",
    label: "Inspire",
    icon: "star",
    badgeBg: "var(--color-lime-100)",
    badgeColor: "#5c8f1c",
    title: "Start the next product before the trend peaks",
    desc: "A feed of ingredients, concepts and category trends your team can clip into briefs. One click turns an idea into a project with a starter formula.",
    checks: [
      "Trend and ingredient feed",
      "Clip concepts straight into briefs",
      "Turn an idea into a project in one click",
    ],
    cta: "Discover Inspire",
    href: `${routes.features}#inspire`,
    mockTitle: "Trend feed",
    mockBadge: "37 new",
    metric: "128 concepts",
    metricCaption: "Clipped by your team this quarter",
    bars: [
      { label: "Fermented heat", width: "78%", color: "var(--color-lime-500)" },
      {
        label: "Upcycled grains",
        width: "64%",
        color: "var(--color-lime-400)",
      },
      {
        label: "Botanical sodas",
        width: "52%",
        color: "var(--color-teal-500)",
      },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    icon: "setting-two",
    badgeBg: "var(--color-gray-100)",
    badgeColor: "var(--color-slate-700)",
    title: "One library, governed centrally",
    desc: "Cost assumptions, units, permissions and the ingredient library live in one place — so every recipe costs and labels from the same source of truth.",
    checks: [
      "Shared cost assumptions and units",
      "Role-based permissions and audit log",
      "Ingredient library with supplier specs",
    ],
    cta: "Explore all features",
    href: routes.features,
    mockTitle: "Ingredient library",
    mockBadge: "Synced",
    metric: "1,240",
    metricCaption: "Ingredients under management",
    bars: [
      { label: "Costed", width: "96%", color: "var(--color-slate-700)" },
      { label: "Spec'd", width: "88%", color: "var(--color-blue-500)" },
      {
        label: "Allergen-tagged",
        width: "74%",
        color: "var(--color-slate-300)",
      },
    ],
  },
];

/* -------------------------------------------------------- why flavor studio */

export const whyPoints = [
  {
    icon: "all-application",
    title: "Comprehensive, cost-effective suite",
    body: "One-stop shop for all product development needs. Do away with multiple, disparate spreadsheets and solutions that do not work well with one another and are not cost effective.",
  },
  {
    icon: "click",
    title: "Easy and intuitive to use",
    body: "User-friendly interface allows teams to hit the ground running and be productive from the get-go. The result is accelerated product development and time to market.",
  },
  {
    icon: "peoples",
    title: "Enhance collaboration",
    body: "Integrated solution and team-based focus facilitates collaboration and visibility to every team member.",
  },
  {
    icon: "cloud-storage",
    title: "Anytime, anywhere access",
    body: "Cloud technology allows easy web-based access and ensures users are using the most up-to-date version at all times.",
  },
  {
    icon: "headset-one",
    title: "Best-in-class customer service",
    body: "Get the best industry support, from sign up to ramp up to on-going use through Flavor Studio’s phone and online channels.",
  },
];

/* -------------------------------------------------------------- landing FAQ */

export const homeFaqs = [
  {
    q: "Is our data secure, and who owns the recipes?",
    a: "Formulas are trade secrets and we treat them that way: SOC 2 Type II, encryption at rest and in transit, role-based permissions and a full audit log on Enterprise plans. You own everything you create and can export it at any time.",
  },
  {
    q: "How hard is it to move off our spreadsheets?",
    a: "Onboarding includes a guided import for recipes, ingredients and cost data from Excel or CSV. Most teams are formulating in Flavor Studio within their first week — you do not rebuild anything by hand.",
  },
  {
    q: "Can we trust what the AI Agent tells us?",
    a: "It reads only your workspace, and every answer cites the recipe, regulation or test it came from. If it cannot source an answer it says so rather than guessing, and it only ever proposes draft versions for a developer to approve.",
  },
];

/* -------------------------------------------------------------- pricing FAQ */

export const pricingFaqs = [
  {
    q: "Is there a free trial to test Flavor Studio?",
    a: "Yes — a 14-day, totally free trial with access to 100% of Flavor Studio’s functionality. No credit card required, add as many users as you need, and nothing you create is lost when you transition to a paid plan.",
  },
  {
    q: "How much does Flavor Studio cost?",
    a: "Plans start at $100 per user per month billed annually ($110 month-to-month). The Premium plan with additional features is $150/$165. Teams with more than 30 users get a custom Enterprise solution.",
  },
  {
    q: "Do we have to pay for upgrades?",
    a: "No. As a SaaS product, updates happen seamlessly behind the scenes — every user is always on the most current version with the latest tools, automatically.",
  },
  {
    q: "Are there any long-term contracts to sign?",
    a: "Nope. You pay as you go, monthly or annually, for the services and users that you need.",
  },
  {
    q: "How do I cancel?",
    a: "Account closure is handled personally, case by case — just drop us a line. To stop billing for a single user, mark them inactive on your administration screen and they won’t be counted in the next payment.",
  },
  {
    q: "Do I need a credit card to sign up?",
    a: "No. The trial needs only your name, email and a password. A card is requested only when the two weeks are over and you choose to continue.",
  },
  {
    q: "How does billing work?",
    a: "Billing runs automatically, monthly or annually. On each anniversary, Flavor Studio counts active users and bills accordingly. First payment is by card; after that you can switch to ACH or a traditional invoice.",
  },
  {
    q: "Are there other hidden charges or supplemental modules?",
    a: "No. The only additional charges would be for custom development you explicitly request for your organization alone.",
  },
  {
    q: "Do you offer academic discounts to universities?",
    a: "Yes — Senspire has supported food science and culinology programs from day one. Reach out through the contact form and we’ll make it happen.",
  },
];

/* ----------------------------------------------------------------- full FAQ */

export const faqGroups = [
  {
    title: "About Us",
    icon: "home",
    items: [
      {
        q: "How long have you been in business?",
        a: "Senspire has been helping food and beverage companies bring better products to market since 2011. It began with an algorithm that predicted flavor combinations — named Inspire — and over the following decade grew into a complete suite of product-development tools for food and beverage manufacturers.",
      },
      {
        q: "Who are your customers?",
        a: "CPG manufacturers, ingredient suppliers, product developers, flavor and fragrance companies, QSR and fast casual chains, food science and culinology programs, sensory science companies, consumer research agencies, and dieticians. If you create, manufacture or supply the food and beverage industry, Flavor Studio is designed for you.",
      },
    ],
  },
  {
    title: "Using Flavor Studio",
    icon: "mouse",
    items: [
      {
        q: "Is Flavor Studio easy to use?",
        a: "Yes. The team invests heavily in making advanced tools intuitive — one look and it’s clear how to use it. And if you ever get stuck, 24/7 support is available by phone, email, or the chat built right into the program.",
      },
      {
        q: "Do I have to download anything? Will it run on my computer?",
        a: "Nothing to download or install — Flavor Studio is completely cloud-based, runs in all current browsers, and is optimized for mobile devices without any apps.",
      },
      {
        q: "How can Flavor Studio save me time?",
        a: "It imports nutrient data straight from ingredient spec files, and automates calculations like moisture and fat loss adjustments, processing loss, nutritional analysis, costing, batch scaling and ice-cream fill weight from overrun percentage. It also speeds team communication by sharing data across recipes, projects and CRM opportunities.",
      },
      {
        q: "Do I have to use every module?",
        a: "No. Unlike an ERP, each component stands alone — sign up and use just recipes and labels today, then expand into projects, CRM or taste tests as your needs grow. Flavor Studio is flexible by design.",
      },
      {
        q: "What collaboration tools does it offer?",
        a: "User privileges and groups, defined roles, recipe sharing with per-user or per-group edit/read rights, stage/gate project management with full Gantt reporting, and a CRM module with opportunity and task support.",
      },
      {
        q: "Can we download our data if we leave?",
        a: "Yes — the API is the easiest route, and for recipes there’s a button that downloads a JSON file in seconds.",
      },
    ],
  },
  {
    title: "Recipes, Ingredients, and Labeling",
    icon: "chef-hat-one",
    items: [
      {
        q: "Are multiple versions of a recipe supported?",
        a: "Yes — duplicate a recipe into as many versions as you need, name them for easy reference, and review every edit with the History tool. Flavor Studio records each modification, showing how a formula changed over time and by whom.",
      },
      {
        q: "How many ingredients are in the nutritional database? Can I add my own?",
        a: "Over 9,000 ingredients from the USDA’s trusted SR28 database are built in. You can also add custom ingredients — most users import them from vendor spec sheets with a tool that reads a PDF and imports the nutrient values automatically.",
      },
      {
        q: "Are compliant nutritional labels generated?",
        a: "Yes — US and Canadian labels with full FDA and Health Canada compliance. As your recipe or serving sizes change, the nutritional information updates automatically.",
      },
      {
        q: "What label layouts are supported?",
        a: "All standard layouts — vertical, tabular, side-by-side, linear and dual column — plus additional vitamins and minerals beyond the mandatory four. Export as PNG for internal drafts or high-res vector PDF for your packaging designer.",
      },
      {
        q: "Are yield adjustments taken into account?",
        a: "Yes. Enter a loss amount or a target value, by percentage or gram weight, and the effect on nutrition is handled — including complex cases like ice-cream overrun, where fill weight is calculated from your overrun percentage and container size.",
      },
      {
        q: "Can I export recipes to share with others?",
        a: "Print them, download for Word, export CSV for Excel, publish read-only PDFs, or save to the encrypted FS format that carries embedded custom ingredients to Flavor Studio users outside your company.",
      },
    ],
  },
  {
    title: "Pricing",
    icon: "funds",
    items: [
      {
        q: "Is there a free trial?",
        a: "Yes — a 14-day, totally free trial with 100% of the functionality, no credit card required. Add as many users as you need; everything you build carries over when you become a customer.",
      },
      {
        q: "How much does Flavor Studio cost?",
        a: "From $100 per user per month billed annually ($110 monthly). Premium is $150/$165, and teams over 30 users get a custom Enterprise plan.",
      },
      {
        q: "Are there long-term contracts or hidden fees?",
        a: "No contracts — pay as you go, monthly or annually. The only charge is the licensing fee; custom development happens only if you explicitly request it.",
      },
      {
        q: "Do you offer academic discounts?",
        a: "Yes — Senspire has supported food science and culinology programs from day one. Reach out via the contact form.",
      },
    ],
  },
  {
    title: "Security and Integrations",
    icon: "protect",
    items: [
      {
        q: "Is my intellectual property secure?",
        a: "Data lives on highly secure servers and is shared only with your team. All web communication is TLS-encrypted, accounts use two-step authentication, and sign-on IP addresses are logged for traceability.",
      },
      {
        q: "Can I share my login credentials?",
        a: "Use the user-management module instead — multiple users can share data, projects and opportunities. Only one concurrent session is allowed per account, and two-factor authentication makes credential sharing impractical by design.",
      },
      {
        q: "Does Flavor Studio connect with other applications?",
        a: "Yes, through a full internet-based API that securely exposes all your data using industry standards — connect any ERP, accounting package or other application you choose.",
      },
    ],
  },
];

/* -------------------------------------------------------- industry segments */

export const industrySegments = [
  { name: "CPG Manufacturers", icon: "factory-building" },
  { name: "Ingredient Suppliers", icon: "box" },
  { name: "Product Developers", icon: "experiment" },
  { name: "Flavor and Fragrance Companies", icon: "leaves" },
  { name: "QSR Chains", icon: "hamburger" },
  { name: "Fast Casual Restaurant Chains", icon: "knife-fork" },
  { name: "Food Science Programs", icon: "degree-hat" },
  { name: "Culinology Programs", icon: "chef-hat-one" },
  // Icon Park has no "tongue" glyph in the pinned version; "mouth" is the
  // closest match inside the same family.
  { name: "Sensory Science Companies", icon: "mouth" },
  { name: "Consumer Research Agencies", icon: "chart-histogram" },
  { name: "Dieticians and Nutritionists", icon: "doc-detail" },
];
