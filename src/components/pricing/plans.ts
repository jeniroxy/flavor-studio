import { modules, type Module } from "@/lib/modules";
import { routes, signupUrl } from "@/lib/routes";

/*
 * The four plans, priced exactly as the application bills them (see
 * docs/v2-blueprint.md §4): Trial $0 for 14 days with Premium access ·
 * Professional $100 per user/month billed annually, $110 month-to-month ·
 * Premium $150 / $165, the "Best choice" · Enterprise for more than 30 users,
 * quoted by sales. Nothing here is an estimate; the feature lists are the ones
 * the current site publishes.
 */

export type Billing = "yearly" | "monthly";

/** Per user, per month. Annual billing is the lower figure. */
export const prices = {
  professional: { yearly: 100, monthly: 110 },
  premium: { yearly: 150, monthly: 165 },
} as const;

export type Plan = {
  id: "trial" | "professional" | "premium" | "enterprise";
  name: string;
  badge?: string;
  /** Per-user monthly price under each billing period; absent = not priced. */
  price?: { yearly: number; monthly: number };
  /** Shown where the price would be when the plan is not priced. */
  priceLabel?: string;
  /** Under the price. */
  sub: { yearly: string; monthly: string };
  cta: { label: string; href: string };
  featuresHeading: string;
  features: string[];
  /** The Premium column is the inverted one — ClickUp's "Business". */
  inverted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "trial",
    name: "Trial",
    priceLabel: "Free",
    sub: {
      yearly: "14 days, Premium access",
      monthly: "14 days, Premium access",
    },
    cta: { label: "Get started", href: signupUrl },
    featuresHeading: "Included for 14 days:",
    features: [
      "100% of Flavor Studio's functionality",
      "Add as many users as you need",
      "No credit card required",
      "Nothing you create is lost when you continue",
      "Every module and the AI Agent",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: prices.professional,
    sub: {
      yearly: "Per user/month, billed annually",
      monthly: "Per user/month, billed monthly",
    },
    cta: { label: "Get started", href: signupUrl },
    featuresHeading: "Key features:",
    features: [
      "Unlimited project repository storage",
      "Unlimited project tasks",
      "Unlimited messages",
      "Secure end-to-end encryption",
      "24/7 support (email, messages, phone)",
      "Fully integrated CRM",
      "The AI Agent, on your own data",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Best choice",
    inverted: true,
    price: prices.premium,
    sub: {
      yearly: "Per user/month, billed annually",
      monthly: "Per user/month, billed monthly",
    },
    cta: { label: "Get started", href: signupUrl },
    featuresHeading: "Everything in Professional, plus:",
    features: [
      "Unlimited Inspire collections",
      "Unlimited recipes",
      "Unlimited nutrition labels",
      "Unlimited taste-test surveys",
      "R&D tax credit reporting",
      "Continuous updates and new features",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Get a custom demo",
    sub: {
      yearly: "More than 30 users?",
      monthly: "More than 30 users?",
    },
    cta: { label: "Contact sales", href: routes.demo },
    featuresHeading: "Everything in Premium, plus:",
    features: [
      "A custom solution sized to your organisation",
      "Custom development, scoped for your team alone",
      "Invoice or ACH billing",
      "Integration with your ERP through the API",
    ],
  },
];

/** Annual discount, from the real numbers: (110 − 100) / 110 ≈ 9%. */
export const yearlySaving = Math.round(
  (1 - prices.professional.yearly / prices.professional.monthly) * 100,
);

/* ------------------------------------------------------- comparison table */

/**
 * A cell: ✓, blank, or a short value ("Custom"). Order follows `plans`.
 */
export type Cell = boolean | string;
export type CompareRow = { label: string; cells: [Cell, Cell, Cell, Cell] };
export type CompareSection = { title: string; rows: CompareRow[] };

const ALL: [Cell, Cell, Cell, Cell] = [true, true, true, true];
/** Premium-tier rows: the Trial has Premium access, Professional does not. */
const PREMIUM: [Cell, Cell, Cell, Cell] = [true, false, true, true];
const ENTERPRISE: [Cell, Cell, Cell, Cell] = [false, false, false, "Custom"];

const byId = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<
  string,
  Module
>;

/** Every capability statement of a module, as an all-plans row. */
const rowsOf = (...ids: string[]): CompareRow[] =>
  ids.flatMap((id) =>
    byId[id].capabilities.map((label) => ({ label, cells: ALL })),
  );

const row = (label: string, cells: [Cell, Cell, Cell, Cell]): CompareRow => ({
  label,
  cells,
});

/**
 * The full list, built from the module catalogue in src/lib/modules.ts so it
 * cannot drift from the Features page. The handful of rows that differ by
 * plan are the ones the plan columns already state.
 */
export const compareSections: CompareSection[] = [
  {
    title: "Formulation",
    rows: [
      row("Unlimited recipes", PREMIUM),
      row("Unlimited Inspire collections", PREMIUM),
      ...rowsOf("recipes", "versions"),
    ],
  },
  { title: "Ingredients", rows: rowsOf("ingredients") },
  { title: "Costing", rows: rowsOf("costing") },
  {
    title: "Nutrition & compliance",
    rows: [
      row("Unlimited nutrition labels", PREMIUM),
      ...rowsOf("labeling", "claims", "designer"),
    ],
  },
  {
    title: "Sensory",
    rows: [
      row("Unlimited taste-test surveys", PREMIUM),
      ...rowsOf("taste-tests"),
    ],
  },
  {
    title: "Projects",
    rows: [
      row("Unlimited project repository storage", ALL),
      row("Unlimited project tasks", ALL),
      row("Unlimited messages", ALL),
      row("R&D tax credit reporting", PREMIUM),
      ...rowsOf("projects", "timeline", "board", "timesheet", "reports"),
    ],
  },
  {
    title: "Commercial",
    rows: [
      row("Fully integrated CRM", ALL),
      ...rowsOf("crm", "cr-builder", "publishing"),
    ],
  },
  {
    title: "Platform",
    rows: [
      row("AI Agent included", ALL),
      row("Continuous updates — every user on the current version", ALL),
      row("24/7 support by phone, email and in-app chat", ALL),
      ...rowsOf("integrations"),
      row("A custom solution sized to your organisation", ENTERPRISE),
      row("Custom development, scoped for your team alone", ENTERPRISE),
    ],
  },
  {
    title: "Security",
    rows: [row("Secure end-to-end encryption", ALL), ...rowsOf("admin")],
  },
];

export const compareRowCount = compareSections.reduce(
  (n, s) => n + s.rows.length,
  0,
);
