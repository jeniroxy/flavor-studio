import { productAssets, type AssetSpec } from "@/lib/assets";

/*
 * The full module catalogue.
 *
 * The first design round described the platform through six studio cards and a
 * one-line blurb each, which the client fairly read as a placeholder: modules
 * that exist in the product — Project Timeline, Project Board, Reports,
 * webhooks, ERP integrations, the Publish/Spec Designer, and most of the newer
 * recipe and ingredient work — were not represented at all, and a visitor could
 * not tell what Flavor Studio actually does.
 *
 * This pass went back to the application design file itself (Figma "Flavor
 * Studio Application") rather than paraphrasing the old marketing site, so the
 * catalogue now covers work that had never reached the public site at all:
 * cost assumptions, Nutrient Content Claims, aggregated nutrition across
 * recipes, configurable ingredient fields and custom calculations, the
 * Timesheet and its reports, the Customer Requirements Builder, the Publish
 * Designer canvas, and two-factor authentication.
 *
 * Capability statements are drawn from those screens and from the material
 * already published on flavorstudio.com (see also the FAQ content in data.ts).
 * Anything the client wants worded differently is a one-line edit here.
 */

export type Module = {
  id: string;
  /** Nav/index label — short. */
  label: string;
  icon: string;
  /** Section eyebrow. */
  group: string;
  title: string;
  /** One or two sentences: what this module is for. */
  body: string;
  /** The detail the old page was missing. */
  capabilities: string[];
  asset: AssetSpec;
};

export const modules: Module[] = [
  {
    id: "recipes",
    label: "Recipes",
    icon: "chef-hat-one",
    group: "Formulation",
    title: "Formulate, version and cost in one live grid",
    body: "The formulation grid is the centre of Flavor Studio. Percentages, weights, yield and cost recompute on every keystroke, and each recipe carries its own full history — so you can branch a formula without ever losing the original.",
    capabilities: [
      "Live percentage, weight, yield and cost roll-up as you type",
      "Ingredients ordered into processing steps, with item codes carried through",
      "Sub-levels — sub-recipes nested to any depth and costed through to the parent",
      "Named versions per recipe (V1, Testing, Final) switched from the recipe header",
      "History tool recording every modification, when and by whom",
      "Recipe types and recipe tags for organising and filtering a large library",
      "Batch scaling to any target weight or number of servings",
      "Moisture and fat loss adjustments, and processing loss, applied automatically",
      "Yield set manually or calculated automatically, by percentage or gram weight",
      "Ice-cream fill weight calculated from overrun percentage and container size",
      "Per-user and per-group sharing with separate edit and read rights",
    ],
    asset: productAssets.recipeGrid,
  },
  {
    id: "ingredients",
    label: "Ingredients",
    icon: "leaves",
    group: "Formulation",
    title: "One ingredient library, governed centrally",
    body: "Every recipe costs and labels from the same library, so a supplier change or a cost update lands everywhere at once instead of being retyped into a dozen spreadsheets.",
    capabilities: [
      "Over 9,000 ingredients from the USDA SR28 database built in",
      "Custom ingredients alongside the standard database",
      "Basic information, nutrients and allergens, ingredient statement, certifications and documents, procurement and validation — all on one ingredient",
      "A separate Canadian label and French ingredient statement per ingredient",
      "Configurable ingredient fields — choose which columns the grid carries",
      "Custom calculations defined over those fields",
      "Vendor spec sheet import — the tool reads a supplier PDF and pulls the nutrient values in",
      "Allergen tagging carried through to the label",
      "Density, processing aid and supplement label flags",
      "Multiple images per ingredient, uploaded and edited in place",
      "Supplier and cost data attached to the ingredient, not the recipe",
    ],
    asset: productAssets.ingredientLibrary,
  },
  {
    id: "costing",
    label: "Costing",
    icon: "chart-histogram",
    group: "Formulation",
    title: "Costing with assumptions you control",
    body: "Batch cost, container cost and retail price sit beside the formula and move with it. The assumptions behind those numbers — labour, overhead, packaging, waste — are defined once for the workspace instead of being buried in each spreadsheet.",
    capabilities: [
      "Batch cost, container cost and retail price live in the recipe sidebar",
      "Cost assumptions grouped into categories you define",
      "Assumptions applied by condition, so they only hit the recipes they should",
      "Workspace-level defaults set in Recipes Admin Settings",
      "Edit or clear assumptions and see every recipe re-cost",
      "Batch size, yield, containers yielded, servings per container and serving weight in one panel",
      "Margin against a target retail price",
    ],
    asset: productAssets.costAssumptions,
  },
  {
    id: "versions",
    label: "Versions",
    icon: "branch-one",
    group: "Formulation",
    title: "Every change tracked, every version comparable",
    body: "Reformulation is iterative, and the audit trail matters as much as the result. Versions are first-class objects: compare them, carry sensory results against them, and see exactly how a formula arrived where it did.",
    capabilities: [
      "Duplicate into as many versions as a project needs",
      "Side-by-side comparison of nutrition and cost across versions",
      "Full edit history per recipe, attributable to a user",
      "Taste test results attached to the exact version they scored",
      "Promote a winning version without rebuilding it",
    ],
    asset: productAssets.recipeVersions,
  },
  {
    id: "labeling",
    label: "Labeling",
    icon: "doc-detail",
    group: "Nutrition & compliance",
    title: "Compliant nutrition labels, regenerated with the formula",
    body: "Nutritional analysis runs off the ingredient data and the yield, and the label panel follows automatically. US and Canadian formats are supported with full FDA and Health Canada compliance.",
    capabilities: [
      "US FDA and Canadian (Health Canada) compliant panels",
      "Canadian bilingual Nutrition Facts / Valeur nutritive",
      "Vertical, tabular, side-by-side, linear display, dual column and aggregate layouts",
      "Aggregate layout — one panel built from several recipes at once",
      "Nutrition Panel or Supplement Facts style",
      "Quantities shown per serving size or per 100g sample",
      "Vitamins and minerals, fatty acids and %Daily Values controlled per panel",
      "Ingredient statements and allergen declarations",
      "Automatic recalculation when the recipe or serving size changes",
      "PNG export for internal drafts, high-resolution vector PDF for packaging",
    ],
    asset: productAssets.nutritionLabelFormats,
  },
  {
    id: "claims",
    label: "Nutrient Content Claims",
    icon: "check-one",
    group: "Nutrition & compliance",
    title: "Claims checked against the formula, not by hand",
    body: "“Good source of fibre”, “low sodium”, “reduced fat” — each has a threshold in the regulation. Flavor Studio checks the formula against those thresholds and tells you which claims the product actually qualifies for.",
    capabilities: [
      "Claims evaluated against the recipe's own analysed values",
      "Actual value shown beside the threshold for every claim",
      "Qualifying and non-qualifying claims marked clearly",
      "Reference amount and %Daily Value group applied per claim",
      "Claims published alongside the label or on their own",
    ],
    asset: productAssets.nutrientClaims,
  },
  {
    id: "designer",
    label: "Publish Designer",
    icon: "setting-two",
    group: "Nutrition & compliance",
    title: "Publish Designer and Spec Designer",
    body: "A real layout canvas for the documents that leave your building. Drag the elements a spec sheet needs onto the page, style them, save it as a template, and apply that template across products so every output looks the same.",
    capabilities: [
      "Drag-and-drop canvas with pages, zoom and fit controls",
      "Elements for recipe, procedure, notes, ingredient statement, nutritional label, allergen, may-contain, composition, images and analytics",
      "Custom elements including your own logo and images",
      "Position, typography, layout and box-style inspector per element",
      "Header and footer toggled per template",
      "Named templates saved per recipe or reused across products",
      "Print directly, or publish to the export formats",
    ],
    asset: productAssets.labelDesigner,
  },
  {
    id: "taste-tests",
    label: "Taste Tests",
    icon: "experiment",
    group: "Sensory",
    title: "Sensory data that flows back into the formula",
    body: "Run internal panels or consumer surveys, score attributes across versions, and keep the results attached to the formula they belong to rather than in a separate spreadsheet.",
    capabilities: [
      "Internal panels and consumer surveys",
      "Blind triangle and preference tests",
      "Attribute scoring compared side by side across versions",
      "Filtering across tests, tags and verified tags",
      "Purchase intent captured with the sensory scores",
      "Results tied to the exact recipe version tested",
    ],
    asset: productAssets.tasteTests,
  },
  {
    id: "projects",
    label: "Projects",
    icon: "folder-open",
    group: "Project management",
    title: "Launches move through stage gates, not inboxes",
    body: "Briefs, tasks and stage gates tied directly to the recipes they concern, so the state of a launch is a fact in the system rather than something someone has to chase.",
    capabilities: [
      "Stage/gate project management from concept to shelf",
      "Tasks linked to the specific recipes and versions they affect",
      "Briefs kept with the project rather than in email",
      "User privileges, groups and defined roles",
      "Visibility across the team without status meetings",
    ],
    asset: productAssets.projectsOverview,
  },
  {
    id: "timeline",
    label: "Project Timeline",
    icon: "calendar-three",
    group: "Project management",
    title: "Project Timeline",
    body: "The schedule view of a launch: what happens when, what depends on what, and where a slip actually lands. Full Gantt reporting is included.",
    capabilities: [
      "Gantt timeline across the whole project",
      "Stage gates and milestones on a single schedule",
      "Dependencies between tasks made visible",
      "Full Gantt reporting for review meetings",
      "Timeline shared with everyone who has access to the project",
    ],
    asset: productAssets.projectTimeline,
  },
  {
    id: "board",
    label: "Project Board",
    icon: "all-application",
    group: "Project management",
    title: "Project Board",
    body: "The working view of the same project — tasks as cards, organised by stage, for teams who run day to day off a board rather than a schedule.",
    capabilities: [
      "Board view of tasks organised by stage",
      "Cards linked back to recipes and projects",
      "Ownership and status visible at a glance",
      "The same underlying data as the timeline, presented for daily work",
    ],
    asset: productAssets.projectBoard,
  },
  {
    id: "timesheet",
    label: "Timesheet",
    icon: "time",
    group: "Project management",
    title: "Timesheet and activity logging",
    body: "Development time is a real project cost. Log activity against the project it belongs to — from a weekly calendar or straight from a field — and the hours and expenses roll into a report you can export.",
    capabilities: [
      "Weekly calendar and day view for logging activity",
      "Activities typed — researching, design and your own types",
      "Time logged against a project, with expenses attached",
      "Running timer as well as manual entry",
      "Detailed and weekly report views with total hours",
      "Filter by activity type, project, description, expenses or hours",
      "Export the report for circulation outside Flavor Studio",
    ],
    asset: productAssets.timesheet,
  },
  {
    id: "reports",
    label: "Reports",
    icon: "chart-histogram",
    group: "Project management",
    title: "Reports",
    body: "Reporting across projects, costs, time and activity — so the questions management asks can be answered from the system instead of assembled by hand.",
    capabilities: [
      "Project and stage-gate reporting",
      "Costing reports across recipes and versions",
      "Time and expense reporting from the timesheet",
      "CRM opportunity and activity reports",
      "Gantt reporting from the project timeline",
      "Reporting templates so a report keeps its shape between runs",
      "Exportable for circulation outside Flavor Studio",
    ],
    asset: productAssets.reports,
  },
  {
    id: "crm",
    label: "CRM",
    icon: "peoples",
    group: "Commercial",
    title: "Connect the front line to R&D",
    body: "Sales opportunities linked to the development work they depend on, with sample requests and shipments tracked in the same system rather than a separate CRM.",
    capabilities: [
      "Customers, contacts, opportunities and contracts in one module",
      "Products and purchase orders tracked against the customer",
      "Opportunities linked to development projects",
      "Sample requests tied to the recipe being sampled",
      "Shipment tracking built in",
      "Opportunity and activity reporting",
    ],
    asset: productAssets.crmPipeline,
  },
  {
    id: "cr-builder",
    label: "CR Builder",
    icon: "checklist",
    group: "Commercial",
    title: "Customer Requirements Builder",
    body: "Customers rarely brief you the same way twice. Build the requirements form your category actually needs — sections, questions, nested options — publish it, and collect the answers in a structure your team can work from.",
    capabilities: [
      "Forms organised into named sections you can reorder",
      "Multiple choice, single answer, label and short answer question types",
      "Sub-levels nested under any option, to whatever depth the brief needs",
      "Options added inline, including an “Other” fallback",
      "Live preview before anything is published",
      "Save as draft, publish, then update a published form",
      "Duplicate or delete a section without touching the rest",
    ],
    asset: productAssets.crBuilder,
  },
  {
    id: "publishing",
    label: "Publishing & export",
    icon: "send",
    group: "Commercial",
    title: "Publishing and export options",
    body: "Your data leaves Flavor Studio in whatever form the recipient needs — including an encrypted format that carries embedded custom ingredients to Flavor Studio users outside your company.",
    capabilities: [
      "Choose what publishes: recipe, label, composition or nutrient content claims",
      "Region, method and file type set per publish",
      "Print, or download for Word",
      "CSV export for Excel",
      "Read-only PDF publishing for customers and co-manufacturers",
      "Encrypted FS format carrying embedded custom ingredients between companies",
      "One-click JSON download of a recipe",
      "High-resolution vector PDF label export for packaging designers",
      "Published output laid out through the Publish Designer",
    ],
    asset: productAssets.publishExport,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: "branch-one",
    group: "Platform",
    title: "API, webhooks and external systems",
    body: "A full internet-based API exposes your data using industry standards, so Flavor Studio connects to the ERP, accounting package or plant system you already run. See the Developers section for the reference.",
    capabilities: [
      "Full REST API over your recipes, ingredients, projects and CRM data",
      "Webhooks for reacting to changes as they happen",
      "ERP and accounting integrations",
      "Integration paths for companies running Plex and other external systems",
      "Standards-based authentication and secure transport",
      "API is also the supported route for bulk data export",
    ],
    asset: productAssets.apiDocs,
  },
  {
    id: "admin",
    label: "Administration",
    icon: "protect",
    group: "Platform",
    title: "Administration, permissions and security",
    body: "Central control over who sees what, on infrastructure built for material that is, in most cases, a trade secret.",
    capabilities: [
      "User management with privileges, groups and defined roles",
      "Per-user and per-group read/edit rights on recipes",
      "Two-factor authentication through an authenticator app",
      "Verification preferences set per user, and enforced by the organisation",
      "Shared cost assumptions and units set once for the workspace",
      "TLS-encrypted transport, with sign-on IP addresses logged for traceability",
      "One concurrent session per account",
      "Subscription, billing and account suspension handled in-product",
      "Inactive users excluded from the next billing count",
    ],
    asset: productAssets.ingredientNutrients,
  },
];

/** Grouping used by the module index at the top of the Features page. */
export const moduleGroups = [
  "Formulation",
  "Nutrition & compliance",
  "Sensory",
  "Project management",
  "Commercial",
  "Platform",
] as const;
