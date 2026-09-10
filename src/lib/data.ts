import { productAssets, type AssetSpec } from "@/lib/assets";
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
  /** URL segment for the on-site detail page: /success-stories/<slug>. */
  slug: string;
  meta: string;
  eyebrow: string;
  title: string;
  blurb: string;
  img: string;
  imgW: number;
  imgH: number;
  imgAlt: string;
  logo: string;
  logoW: number;
  logoH: number;
  /** On-site detail page. The old external flavorstudio.com links are gone —
      the client flagged that these used to redirect to the legacy site. */
  href: string;
  /**
   * The full case-study narrative, ported from the legacy story pages.
   * Sections render in order; `quote` is optional pull-quote material.
   * Empty `sections` = the detail page shows a marked "content being ported"
   * state rather than invented copy.
   */
  detail: {
    sections: { heading: string; paragraphs: string[] }[];
    quote?: { text: string; name: string; role: string };
  };
};

export const stories: Story[] = [
  {
    company: "Deli Star",
    slug: "deli-star",
    meta: "Fayetteville, Illinois · Meat processing",
    eyebrow: "Meat processing · Innovation",
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
    href: "/success-stories/deli-star",
    detail: {
      // Full narrative to be ported from the legacy story page.
      sections: [],
      quote: {
        text: "Today we communicate, collaborate and prioritize projects in an organized and highly visible fashion… We can not live without Flavor Studio!",
        name: "Charles Hayes",
        role: "VP Culinary Innovation, R&D Deli Star",
      },
    },
  },
  {
    company: "Good Foods Group",
    slug: "good-foods",
    meta: "Pleasant Prairie, Wisconsin · Fresh produce",
    eyebrow: "Fresh produce · Family-owned",
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
    href: "/success-stories/good-foods",
    detail: {
      sections: [],
    },
  },
  {
    company: "Ripple Foods",
    slug: "ripple-foods",
    meta: "Berkeley, California · Plant-based",
    eyebrow: "Plant-based · Dairy-free",
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
    href: "/success-stories/ripple-foods",
    detail: {
      sections: [],
    },
  },
];

/* ------------------------------------------------------ the platform (tabs) */

/*
 * The module tour on the landing page.
 *
 * Each tab used to carry a hand-drawn "mock" — a fake metric and three bar
 * charts — which is precisely what the client objected to: a visitor could not
 * see the product, only an illustration of it. Every tab now carries a real
 * screenshot of the module instead, and the six tabs were re-picked so that all
 * six can show one (Inspire and Admin keep their entries in the full catalogue
 * on the Features page).
 */

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
  /** The real screenshot of this module. */
  shot: AssetSpec;
};

export const platformTabs: PlatformTab[] = [
  {
    id: "recipes",
    label: "Recipes",
    icon: "chef-hat-one",
    badgeBg: "var(--color-lime-100)",
    badgeColor: "#5c8f1c",
    title: "Formulate and cost in one live grid",
    desc: "Percentages, weight, yield and cost recompute on every keystroke. Branch versions and nest sub-recipes without losing the original.",
    checks: [
      "Live yield, batch cost, container cost and retail price",
      "Named versions — V1, Testing, Final — switched from the header",
      "Sub-levels nested to any depth, costed through to the parent",
    ],
    cta: "Discover Recipes",
    href: `${routes.features}#recipes`,
    shot: productAssets.recipeGrid,
  },
  {
    id: "labeling",
    label: "Labeling",
    icon: "doc-detail",
    badgeBg: "var(--color-blue-200)",
    badgeColor: "var(--color-blue-700)",
    title: "Publish a compliant label from the formula",
    desc: "Pick the content, the layout and the region, and the panel is generated from the recipe's own analysed values — print-ready, in the format your market requires.",
    checks: [
      "Vertical, tabular, side-by-side, linear, dual column and aggregate layouts",
      "Nutrition Panel or Supplement Facts, US or Canadian",
      "Ingredient statement, allergens and %Daily Values controlled per panel",
    ],
    cta: "Discover Labeling",
    href: `${routes.features}#labeling`,
    shot: productAssets.nutritionLabelFormats,
  },
  {
    id: "designer",
    label: "Publish Designer",
    icon: "setting-two",
    badgeBg: "var(--color-violet-100)",
    badgeColor: "var(--color-violet-500)",
    title: "Design the documents that leave your building",
    desc: "A real layout canvas for spec sheets and published recipes. Drop in the elements you need, style them, save the template, and reuse it across products.",
    checks: [
      "Elements for recipe, procedure, label, allergens, composition and analytics",
      "Position, typography, layout and box-style inspector",
      "Named templates, headers and footers, print or publish",
    ],
    cta: "Discover Publish Designer",
    href: `${routes.features}#designer`,
    shot: productAssets.labelDesigner,
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
      "Scores attached to the exact version tested",
      "Filtering across tests, tags and verified tags",
    ],
    cta: "Discover Taste Tests",
    href: `${routes.features}#taste-tests`,
    shot: productAssets.tasteTests,
  },
  {
    id: "timesheet",
    label: "Projects & time",
    icon: "time",
    badgeBg: "var(--color-amber-100)",
    badgeColor: "#a97d17",
    title: "Development time, logged against the project",
    desc: "Stage-gated projects with a timeline and a board — plus a timesheet, so the hours and expenses a launch actually consumed are a number rather than a guess.",
    checks: [
      "Weekly and day views, running timer or manual entry",
      "Activity typed, logged to a project, with expenses attached",
      "Detailed and weekly reports, filterable and exportable",
    ],
    cta: "Discover Projects",
    href: `${routes.features}#timesheet`,
    shot: productAssets.timesheet,
  },
  {
    id: "crm",
    label: "CRM",
    icon: "peoples",
    badgeBg: "var(--color-gray-100)",
    badgeColor: "var(--color-slate-700)",
    title: "Connect the front line to R&D",
    desc: "Customers, opportunities, contracts and purchase orders in the same system as the development work — including a builder for the requirements forms your customers send you.",
    checks: [
      "Opportunities linked to the development project",
      "Customer Requirements Builder — sections, question types, nested options",
      "Sample requests tied to the recipe being sampled",
    ],
    cta: "Discover CRM",
    href: `${routes.features}#crm`,
    shot: productAssets.crBuilder,
  },
];

/* -------------------------------------------------------- why flavor studio */

/*
 * Why teams choose Flavor Studio.
 *
 * These were five stacked clichés — "one-stop shop for all product development
 * needs", "hit the ground running and be productive from the get-go",
 * "best-in-class customer service". Nothing in them was falsifiable, so nothing
 * in them was persuasive, and every line would have read the same under a
 * different company's logo. Each is now a specific mechanism.
 */
export const whyPoints = [
  {
    icon: "leaves",
    title: "9,000 USDA ingredients, plus yours",
    body: "The SR28 database is built in. Custom ingredients sit beside it, and most teams import theirs from a vendor spec sheet — the tool reads the PDF and pulls the nutrient values in.",
  },
  {
    icon: "branch-one",
    title: "Change it once, everywhere",
    body: "Update a cost, a supplier or an allergen on the ingredient itself. Every recipe, label and spec sheet that uses it follows — including the ones you have already published.",
  },
  {
    icon: "doc-detail",
    title: "Labels that hold up",
    body: "US FDA and Health Canada panels generated by the label engine from the formula's own analysed values, print-ready in six layouts, with the ingredient statement and allergen declaration alongside.",
  },
  {
    icon: "all-application",
    title: "Use one module or all eighteen",
    body: "Unlike an ERP, nothing here demands a full rollout. Teams usually start with recipes and labels, then add taste tests, projects or CRM when they are ready.",
  },
  {
    icon: "headset-one",
    title: "Support from people who know food",
    body: "Phone, email and in-app chat, from a team that has been building product-development tools for food and beverage manufacturers since 2011.",
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
