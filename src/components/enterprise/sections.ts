import type { Flow } from "@/components/flow-player";
import { productAssets, type AssetSpec } from "@/lib/assets";
import { flows } from "@/lib/flows";
import { modules } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The enterprise page's seven sticky-rail sections, ClickUp's `COMPLETE
 * SOLUTION … AI POWERED` sequence filled with Flavor Studio's modules. Every
 * card statement is lifted from the capability lists in src/lib/modules.ts;
 * every visual is a real export from the application design file.
 */

const mod = (id: string) => {
  const m = modules.find((x) => x.id === id);
  if (!m) throw new Error(`Unknown module ${id}`);
  return m;
};

export type CardVisual =
  | { kind: "shot"; asset: AssetSpec }
  | { kind: "flow"; flow: Flow }
  | { kind: "icon"; icon: string };

export type EnterpriseCard = {
  title: string;
  body: string;
  visual: CardVisual;
  href?: string;
};

export type EnterpriseSection = {
  id: string;
  /** Rail label. */
  label: string;
  /** Mono eyebrow. */
  eyebrow: string;
  title: string;
  tail: string;
  lede: string;
  cards: EnterpriseCard[];
};

export const enterpriseSections: EnterpriseSection[] = [
  {
    id: "complete",
    label: "Complete solution",
    eyebrow: "Complete solution",
    title: "One platform for the whole",
    tail: "product lifecycle.",
    lede: "Recipes, ingredients, costing, labels, sensory, projects and CRM share one ingredient library — so a supplier change lands everywhere at once instead of in a dozen spreadsheets.",
    cards: [
      {
        title: mod("recipes").title,
        body: "Percentages, weights, yield and cost recompute on every keystroke, with sub-recipes nested to any depth and costed through to the parent.",
        visual: { kind: "shot", asset: productAssets.recipeCost },
        href: routes.feature("recipes"),
      },
      {
        title: mod("labeling").title,
        body: "US FDA and Health Canada panels generated from the formula's own analysed values, in six layouts, with the ingredient statement alongside.",
        visual: { kind: "shot", asset: productAssets.nutritionLabelFormats },
        href: routes.feature("labeling"),
      },
      {
        title: mod("timesheet").title,
        body: "Development time is a real project cost. Hours and expenses logged against the project roll into a report you can export.",
        visual: { kind: "shot", asset: productAssets.timesheetWeek },
        href: routes.feature("timesheet"),
      },
    ],
  },
  {
    id: "flexible",
    label: "Fully flexible",
    eyebrow: "Fully flexible",
    title: "Fits the way your team",
    tail: "formulates.",
    lede: "Unlike an ERP, nothing here demands a full rollout — and what you do roll out bends to your category rather than the other way round.",
    cards: [
      {
        title: "Configurable ingredient fields",
        body: "Choose which columns the ingredient grid carries — process step, country of origin, supplier, category — and define custom calculations over them.",
        visual: { kind: "flow", flow: flows.ingredientFields },
        href: routes.feature("ingredients"),
      },
      {
        title: mod("designer").title,
        body: "Drag the elements a spec sheet needs onto the page, save it as a template, and apply it across products so every output looks the same.",
        visual: { kind: "shot", asset: productAssets.labelDesigner },
        href: routes.feature("designer"),
      },
      {
        title: mod("cr-builder").title,
        body: "Build the requirements form your category actually needs — sections, question types, nested options — and collect answers in a structure your team can work from.",
        visual: { kind: "shot", asset: productAssets.crBuilder },
        href: routes.feature("cr-builder"),
      },
    ],
  },
  {
    id: "controls",
    label: "Advanced controls",
    eyebrow: "Advanced controls",
    title: "Manage rights and",
    tail: "permissions.",
    lede: "Central control over who sees what — per user, per group, per recipe — without a ticket to IT every time a team changes.",
    cards: [
      {
        title: "Per-user and per-group rights",
        body: "Separate edit and read rights on every recipe, set per user or per group, so a co-manufacturer sees the spec and not the formula.",
        visual: { kind: "icon", icon: "peoples" },
      },
      {
        title: "Privileges, groups and defined roles",
        body: "User management with privileges, groups and defined roles. Inactive users are excluded from the next billing count automatically.",
        visual: { kind: "icon", icon: "id-card" },
      },
      {
        title: "Verification enforced by the organisation",
        body: "Two-factor authentication through an authenticator app, with verification preferences set per user and enforced for everyone.",
        visual: { kind: "icon", icon: "key-one" },
      },
    ],
  },
  {
    id: "secure",
    label: "Secure and reliable",
    eyebrow: "Secure and reliable",
    title: "Built for material that is a",
    tail: "trade secret.",
    lede: "Formulas are, in most cases, trade secrets. The infrastructure treats them that way.",
    cards: [
      {
        title: "TLS everywhere, IPs logged",
        body: "TLS-encrypted transport on the application and the API, with sign-on IP addresses logged for traceability.",
        visual: { kind: "icon", icon: "lock" },
      },
      {
        title: "One session per account",
        body: "One concurrent session per account, so shared credentials are impractical by design rather than by policy.",
        visual: { kind: "icon", icon: "fingerprint" },
      },
      {
        title: "Encrypted exchange with partners",
        body: "The encrypted FS format carries embedded custom ingredients to Flavor Studio users outside your company — and to nobody else.",
        visual: { kind: "icon", icon: "shield" },
      },
    ],
  },
  {
    id: "visibility",
    label: "Actionable visibility",
    eyebrow: "Actionable visibility",
    title: "Answers from the system, not",
    tail: "from a spreadsheet.",
    lede: "What did this cost, how did the formula get here, where did the hours go — answered from the record instead of assembled by hand.",
    cards: [
      {
        title: mod("reports").title,
        body: "Project and stage-gate, costing, time and expense, and CRM reporting, with templates so a report keeps its shape between runs.",
        visual: { kind: "shot", asset: productAssets.reports },
        href: routes.feature("reports"),
      },
      {
        title: "Every version, comparable",
        body: "Named versions per recipe with side-by-side nutrition and cost, and a history recording every modification, when and by whom.",
        visual: { kind: "shot", asset: productAssets.recipeVersions },
        href: routes.feature("versions"),
      },
      {
        title: "Cost assumptions, workspace-wide",
        body: "Labour, overhead, packaging and waste defined once for the workspace and applied by condition. Edit an assumption and every recipe re-costs.",
        visual: { kind: "flow", flow: flows.costAssumptions },
        href: routes.feature("costing"),
      },
    ],
  },
  {
    id: "integration",
    label: "Integration",
    eyebrow: "Integration",
    title: "Connected to the systems you",
    tail: "already run.",
    lede: "A full internet-based API exposes your data using industry standards, so Flavor Studio connects to the ERP, accounting package or plant system you already have.",
    cards: [
      {
        title: "REST API",
        body: "Recipes, ingredients, projects and CRM data over a full REST API — also the supported route for bulk export.",
        visual: { kind: "icon", icon: "api" },
        href: routes.developers,
      },
      {
        title: "Webhooks",
        body: "Flavor Studio calls your system when something changes, instead of your system polling on a schedule.",
        visual: { kind: "icon", icon: "lightning" },
        href: routes.developers,
      },
      {
        title: "ERP, accounting and Plex",
        body: "Integration paths for ERP and accounting packages, and for companies running Plex and other external systems.",
        visual: { kind: "icon", icon: "factory-building" },
        href: routes.developers,
      },
    ],
  },
  {
    id: "ai",
    label: "AI powered",
    eyebrow: "AI powered",
    title: "The AI Agent, on your",
    tail: "data only.",
    lede: "Included on every plan. It reads your workspace, cites what it used, and only ever proposes draft versions for a developer to approve.",
    cards: [
      {
        title: "Answers with citations",
        body: "Two recipes compared per serving with the biggest gaps highlighted — and every answer naming its sources.",
        visual: { kind: "shot", asset: productAssets.aiAgent },
        href: routes.agent,
      },
      {
        title: "Draft versions, never silent changes",
        body: "Reformulation ideas arrive as draft versions. Nothing in a formula changes without a developer's approval.",
        visual: { kind: "icon", icon: "magic-wand" },
        href: routes.agent,
      },
      {
        title: "Your data stays yours",
        body: "Never used to train third-party models. If the Agent cannot source an answer, it says so rather than guessing.",
        visual: { kind: "icon", icon: "shield" },
        href: `${routes.agent}#verify`,
      },
    ],
  },
];

export const railItems = enterpriseSections.map((s) => ({
  id: s.id,
  label: s.label,
}));
