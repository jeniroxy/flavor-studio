import { routes } from "@/lib/routes";

/*
 * The mega menu, modelled on clickup.com's curtain: Product (five columns of
 * icon + label), AI Agent (icon tiles with one-liners), Solutions (teams,
 * companies, industries + a featured card), Resources (learn, discover,
 * support + a customer-story card), then plain Pricing and Enterprise links.
 *
 * The client asked that visitors meet the platform first and AI second, so
 * Product is the first trigger and AI Agent the second — the reverse of
 * ClickUp's order.
 */

export type MenuItem = {
  label: string;
  href: string;
  /** Icon Park name. */
  icon?: string;
  /** One-liner under the label (tile pattern). */
  desc?: string;
  badge?: "NEW";
};

export type MenuColumn = {
  heading: string;
  items: MenuItem[];
  /** "See all … →" link under the column. */
  more?: { label: string; href: string };
};

export type MenuCard = {
  heading: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image?: string;
};

export type Menu = {
  key: "product" | "agent" | "solutions" | "resources";
  label: string;
  columns: MenuColumn[];
  card?: MenuCard;
  /** Column layout: "icon" = 20px icon + label rows; "tile" = 40px tile + desc. */
  style: "icon" | "tile";
};

export const menus: Menu[] = [
  {
    key: "product",
    label: "Product",
    style: "icon",
    columns: [
      {
        heading: "Formulate",
        items: [
          {
            label: "Recipes",
            href: routes.feature("recipes"),
            icon: "chef-hat-one",
          },
          {
            label: "Ingredients",
            href: routes.feature("ingredients"),
            icon: "leaves",
          },
          {
            label: "Costing",
            href: routes.feature("costing"),
            icon: "calculator-one",
          },
          {
            label: "Versions",
            href: routes.feature("versions"),
            icon: "branch-one",
          },
        ],
      },
      {
        heading: "Comply",
        items: [
          {
            label: "Nutrition labels",
            href: routes.feature("labeling"),
            icon: "doc-detail",
          },
          {
            label: "Nutrient content claims",
            href: routes.feature("claims"),
            icon: "check-one",
          },
          {
            label: "Publish Designer",
            href: routes.feature("designer"),
            icon: "layout-four",
          },
          {
            label: "Publishing & export",
            href: routes.feature("publishing"),
            icon: "file-pdf-one",
          },
        ],
      },
      {
        heading: "Run",
        items: [
          {
            label: "Projects",
            href: routes.feature("projects"),
            icon: "folder-open",
          },
          {
            label: "Timeline & board",
            href: routes.feature("timeline"),
            icon: "calendar-three",
          },
          {
            label: "Taste Tests",
            href: routes.feature("taste-tests"),
            icon: "experiment",
          },
          {
            label: "Timesheet & reports",
            href: routes.feature("timesheet"),
            icon: "time",
          },
        ],
      },
      {
        heading: "Sell",
        items: [
          { label: "CRM", href: routes.feature("crm"), icon: "peoples" },
          {
            label: "Customer Requirements",
            href: routes.feature("cr-builder"),
            icon: "form-one",
          },
          {
            label: "Reports",
            href: routes.feature("reports"),
            icon: "chart-histogram",
          },
          {
            label: "Administration",
            href: routes.feature("admin"),
            icon: "setting-two",
          },
        ],
      },
      {
        heading: "More",
        items: [
          {
            label: "All features",
            href: routes.features,
            icon: "all-application",
          },
          {
            label: "Integrations & API",
            href: routes.developers,
            icon: "plug",
          },
          { label: "AI Agent", href: routes.agent, icon: "robot" },
          { label: "Request a demo", href: routes.demo, icon: "play" },
        ],
      },
    ],
  },
  {
    key: "agent",
    label: "AI Agent",
    style: "tile",
    columns: [
      {
        heading: "The Agent",
        items: [
          {
            label: "AI Agent overview",
            href: routes.agent,
            icon: "robot",
            desc: "Answers from your own recipes, with citations",
          },
          {
            label: "Side-by-side compare",
            href: `${routes.agent}#compare`,
            icon: "layers",
            desc: "Nutrition and cost across versions",
          },
          {
            label: "Claim & label checks",
            href: `${routes.agent}#skills`,
            icon: "doc-detail",
            desc: "Validated against the regulation",
          },
        ],
      },
      {
        heading: "Skills",
        items: [
          {
            label: "What-if costing",
            href: `${routes.agent}#skills`,
            icon: "calculator-one",
            desc: "Swap an ingredient, see the margin move",
          },
          {
            label: "Reformulation ideas",
            href: `${routes.agent}#skills`,
            icon: "magic-wand",
            desc: "Draft versions for a developer to approve",
          },
          {
            label: "Allergen watch",
            href: `${routes.agent}#skills`,
            icon: "caution",
            desc: "Big-9 exposure and the Contains statement",
          },
        ],
      },
      {
        heading: "Trust",
        items: [
          {
            label: "Your data, your recipes",
            href: `${routes.agent}#trust`,
            icon: "shield",
            desc: "Never used to train third-party models",
          },
          {
            label: "Pricing",
            href: `${routes.pricing}#ai`,
            icon: "coupon",
            desc: "Included on every plan",
          },
        ],
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    style: "icon",
    columns: [
      {
        heading: "Teams",
        items: [
          { label: "R&D and formulation", href: routes.solution("rd") },
          {
            label: "Regulatory and labeling",
            href: routes.solution("regulatory"),
          },
          {
            label: "Costing and procurement",
            href: routes.solution("costing"),
          },
          { label: "Sales and account teams", href: routes.solution("sales") },
          { label: "Sensory and QA", href: routes.solution("sensory") },
        ],
        more: { label: "See all teams", href: routes.solutions },
      },
      {
        heading: "Companies",
        items: [
          { label: "CPG manufacturers", href: routes.solution("cpg") },
          { label: "Ingredient suppliers", href: routes.solution("suppliers") },
          { label: "Restaurant chains", href: routes.solution("restaurants") },
          { label: "Enterprise", href: routes.enterprise },
        ],
      },
      {
        heading: "Industries",
        items: [
          { label: "Flavor and fragrance", href: routes.solution("flavor") },
          {
            label: "Food science programs",
            href: routes.solution("education"),
          },
          {
            label: "Sensory and research agencies",
            href: routes.solution("research"),
          },
          {
            label: "Dieticians and nutritionists",
            href: routes.solution("nutrition"),
          },
        ],
        more: { label: "See all industries", href: routes.solutions },
      },
    ],
    card: {
      heading: "Featured",
      title: "One ingredient library, eighteen modules",
      body: "Use one module or all of them — teams usually start with recipes and labels, then add the rest.",
      cta: { label: "Explore the platform", href: routes.features },
    },
  },
  {
    key: "resources",
    label: "Resources",
    style: "icon",
    columns: [
      {
        heading: "Learn",
        items: [
          { label: "Request a demo", href: routes.demo },
          { label: "FAQ", href: routes.faq },
          { label: "Developers & API", href: routes.developers },
        ],
      },
      {
        heading: "Discover",
        items: [
          { label: "Customers", href: routes.customers },
          { label: "Success stories", href: routes.stories },
          { label: "News", href: routes.news },
        ],
      },
      {
        heading: "Support",
        items: [
          { label: "Contact us", href: routes.contact },
          { label: "Privacy", href: routes.privacy },
        ],
      },
    ],
    card: {
      heading: "Customer story",
      title:
        "Deli Star drives innovation and collaboration to accelerate product launches",
      body: "“We can not live without Flavor Studio.” — Charles Hayes, VP Culinary Innovation",
      cta: { label: "Read the story", href: routes.story("deli-star") },
      image: "/stories/deli-star-logo.png",
    },
  },
];

export const plainLinks = [
  { key: "pricing" as const, label: "Pricing", href: routes.pricing },
  { key: "enterprise" as const, label: "Enterprise", href: routes.enterprise },
];
