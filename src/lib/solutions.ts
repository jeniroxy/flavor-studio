import type { ProductAssetKey } from "@/lib/assets";
import type { FlowKey } from "@/lib/flows";
import type { FaqItem } from "@/components/faq-accordion";
import { routes } from "@/lib/routes";

/*
 * Solutions — one page per audience, on ClickUp's /teams/<dept> template.
 *
 * Twelve audiences, grouped the way the mega menu groups them: teams inside a
 * company (R&D, regulatory, costing, sales, sensory), company types (CPG,
 * suppliers, restaurant chains) and industries (flavor houses, education,
 * research agencies, dieticians). The list matches the customer segments the
 * FAQ has always named.
 *
 * Every capability claimed here is one the module catalogue (lib/modules.ts)
 * already states, re-cut for the audience. Visuals reference assets and flows
 * by key so this file stays plain data; the page resolves them. Nothing here
 * carries a statistic — the site does not invent any.
 */

export type SolutionKind = "team" | "company" | "industry";

/** A real screenshot (ProductShot) or a real screen sequence (FlowPlayer). */
export type SolutionVisual = { flow: FlowKey } | { asset: ProductAssetKey };

export type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  visual: SolutionVisual;
};

export type AgentSkill = {
  icon: string;
  /** What the AI Agent does for this team — an answer or a draft, never an edit. */
  text: string;
};

export type UseCase = {
  id: string;
  label: string;
  title: string;
  tail: string;
  description: string;
  checks: string[];
  /** Module ids from lib/modules.ts. */
  modules: string[];
};

export type Solution = {
  slug: string;
  kind: SolutionKind;
  /** Short label for nav pills and cards. */
  label: string;
  /** The eyebrow on the detail page, e.g. "R&D AND FORMULATION TEAMS". */
  audience: string;
  icon: string;
  title: string;
  tail: string;
  lede: string;
  /** The hub card's two-line description. */
  summary: string;
  hero: SolutionVisual;
  replaces: string[];
  checks: string[];
  pillarsTitle: { title: string; tail: string };
  pillars: Pillar[];
  agentSkills: AgentSkill[];
  useCases: UseCase[];
  banner: { title: string; body: string };
  /** Module ids this audience uses most, for the icon grid. */
  modules: string[];
  faqs: FaqItem[];
  closing: string;
};

export const solutionKinds: {
  kind: SolutionKind;
  title: string;
  tail: string;
  lede: string;
}[] = [
  {
    kind: "team",
    title: "Teams",
    tail: "inside the company",
    lede: "Each team works in the modules it needs, on the same ingredient library and the same recipes as everyone else.",
  },
  {
    kind: "company",
    title: "Company",
    tail: "types",
    lede: "Manufacturers, suppliers and chains run different businesses on the same formulation, labeling and costing engine.",
  },
  {
    kind: "industry",
    title: "Industries",
    tail: "we have served since 2011",
    lede: "Flavor houses, food science programs, research agencies and dieticians — the segments Flavor Studio has always been built for.",
  },
];

const sharedFaqs = {
  modules: {
    q: "Do we have to use every module?",
    a: "No. Unlike an ERP, each module stands alone — most teams start with recipes and labels and add taste tests, projects or CRM when they are ready. Pricing is per user, not per module.",
  },
  trial: {
    q: "Can we try it on our own formulas first?",
    a: "Yes. The 14-day trial has 100% of the functionality, no credit card, and as many users as you need. Everything you build carries over if you continue.",
  },
  ownership: {
    q: "Who owns the data, and can we take it with us?",
    a: "You do. Recipes download as JSON with one click, and the API is the supported route for a full export at any time.",
  },
  agent: {
    q: "Is the AI Agent extra?",
    a: "No. It is included on every plan. It reads only your workspace, cites the recipe, regulation or test each answer came from, and proposes drafts for a developer to approve — it never edits a recipe on its own.",
  },
  permissions: {
    q: "Can we control who sees which formulas?",
    a: "Yes. Recipes are shared per user or per group with separate edit and read rights, accounts use two-factor authentication, and the history tool records every change by whom and when.",
  },
  outside: {
    q: "How do we share with a customer or co-manufacturer?",
    a: "Publish a read-only PDF, export CSV or Word, or use the encrypted FS format, which carries your embedded custom ingredients to Flavor Studio users outside your company without exposing the rest of your workspace.",
  },
} satisfies Record<string, FaqItem>;

export const solutions: Solution[] = [
  /* ------------------------------------------------------------- teams */
  {
    slug: "rd",
    kind: "team",
    label: "R&D and formulation",
    audience: "R&D and formulation teams",
    icon: "chef-hat-one",
    title: "Formulate, version and cost",
    tail: "in one live grid",
    lede: "Percentages, weight, yield and cost recompute on every keystroke. Versions are first-class, sub-recipes nest to any depth, and the history tool records who changed what — so a reformulation is a trail, not a mystery.",
    summary:
      "The formulation grid, named versions, sub-recipes and the AI Agent beside the recipe you are in.",
    hero: { asset: "recipeGrid" },
    replaces: [
      "Formulation spreadsheets",
      "Version folders",
      "Emailed cost sheets",
      "Paper lab notebooks",
    ],
    checks: [
      "Live percentage, weight, yield and cost roll-up as you type",
      "Named versions — V1, Testing, Final — with full edit history",
      "Sub-recipes nested to any depth and costed through to the parent",
    ],
    pillarsTitle: { title: "For how R&D teams", tail: "actually formulate" },
    pillars: [
      {
        eyebrow: "Connected",
        title: "One ingredient library under every recipe",
        body: "Every formula costs and analyses from the same library. A supplier change or a cost update lands in every recipe that uses the ingredient, instead of being retyped into a dozen spreadsheets.",
        visual: { asset: "recipeGrid" },
      },
      {
        eyebrow: "Versioned",
        title: "Compare versions, not just keep them",
        body: "Duplicate into as many versions as a project needs, compare nutrition and cost side by side, attach taste-test results to the exact version scored, and promote the winner without rebuilding it.",
        visual: { asset: "recipeVersions" },
      },
      {
        eyebrow: "Grounded",
        title: "An AI Agent that reads the recipe you are in",
        body: "Open the Agent beside the formula, @-mention a recipe, and ask. It compares versions per serving, proposes draft reformulations and names its sources — nothing changes until a developer approves.",
        visual: { flow: "aiAgent" },
      },
    ],
    agentSkills: [
      {
        icon: "layers",
        text: "Compares two versions per serving and highlights the biggest gaps",
      },
      {
        icon: "magic-wand",
        text: "Drafts a reformulation toward a sugar, sodium or cost target — as a version you approve",
      },
      {
        icon: "search",
        text: "Finds a substitute in your own library, with allergens and cost beside it",
      },
      {
        icon: "weight",
        text: "Explains a yield or moisture-loss adjustment in plain language, with the recipe cited",
      },
    ],
    useCases: [
      {
        id: "reformulation",
        label: "Reformulation",
        title: "Cut sugar, sodium or cost,",
        tail: "and keep the trail",
        description:
          "Branch a version, change the formula, and watch nutrition and cost recompute. The original stays intact, the history records every step, and the taste test scores the exact version it tasted.",
        checks: [
          "Named versions switched from the recipe header",
          "Side-by-side nutrition and cost across versions",
          "Taste-test results attached to the version scored",
        ],
        modules: ["recipes", "versions", "taste-tests"],
      },
      {
        id: "sub-recipes",
        label: "Sub-recipes & scaling",
        title: "Nest a sauce inside a meal,",
        tail: "cost it through",
        description:
          "Sub-levels nest to any depth and cost through to the parent. Scale a batch to a target weight or number of servings, with moisture, fat and processing loss applied automatically.",
        checks: [
          "Sub-recipes nested to any depth",
          "Batch scaling to weight or servings",
          "Moisture, fat and processing loss handled automatically",
        ],
        modules: ["recipes", "costing", "ingredients"],
      },
      {
        id: "handover",
        label: "Handover to regulatory",
        title: "Hand over a formula",
        tail: "that already has its label",
        description:
          "The panel, the ingredient statement and the allergen declaration are generated from the same analysed values the developer worked from — regulatory reviews a label, not a spreadsheet.",
        checks: [
          "FDA and Health Canada panels from the formula",
          "Nutrient content claims checked against thresholds",
          "Read-only PDF for review",
        ],
        modules: ["labeling", "claims", "publishing"],
      },
      {
        id: "documentation",
        label: "Documentation",
        title: "Procedure, images and notes",
        tail: "on the recipe itself",
        description:
          "Processing steps, procedure notes and images live on the recipe — uploaded from your computer or a cloud drive and edited in place — and publish through the same templates as the label.",
        checks: [
          "Ingredients ordered into processing steps",
          "Multiple images per recipe, edited in place",
          "Publish Designer templates reused across products",
        ],
        modules: ["recipes", "designer", "publishing"],
      },
    ],
    banner: {
      title: "Your whole bench, finally in one place",
      body: "Recipes, ingredients, versions, costing and taste tests share one library — so what R&D formulates is what regulatory labels and what sales quotes.",
    },
    modules: [
      "recipes",
      "ingredients",
      "versions",
      "costing",
      "taste-tests",
      "projects",
    ],
    faqs: [
      {
        q: "How hard is it to move off our spreadsheets?",
        a: "Onboarding includes a guided import for recipes, ingredients and cost data from Excel or CSV, and most custom ingredients come in from a vendor spec sheet — the tool reads the PDF and pulls the nutrient values in.",
      },
      sharedFaqs.agent,
      sharedFaqs.permissions,
      sharedFaqs.trial,
    ],
    closing: "Formulate on your own recipes, not a demo dataset.",
  },
  {
    slug: "regulatory",
    kind: "team",
    label: "Regulatory and labeling",
    audience: "Regulatory and labeling teams",
    icon: "doc-detail",
    title: "Labels that follow the formula,",
    tail: "not the other way round",
    lede: "US FDA and Health Canada panels generated from the recipe's own analysed values, nutrient content claims checked against their thresholds, and an ingredient statement and allergen declaration that update when the formula does.",
    summary:
      "FDA and Health Canada panels, claims checked against the formula, and a designer for the documents that leave the building.",
    hero: { asset: "nutritionLabelFormats" },
    replaces: [
      "Standalone label software",
      "Retyped nutrient tables",
      "Claim checks by hand",
      "PDFs emailed for sign-off",
    ],
    checks: [
      "FDA and Health Canada compliant panels, bilingual for Canada",
      "Six layouts — PNG for drafts, vector PDF for packaging",
      "Claims evaluated against the recipe's analysed values",
    ],
    pillarsTitle: { title: "For how regulatory teams", tail: "actually work" },
    pillars: [
      {
        eyebrow: "Compliant",
        title: "The panel is the engine's own output",
        body: "Vertical, tabular, side-by-side, linear, dual column and aggregate layouts; Nutrition Panel or Supplement Facts; per serving or per 100 g; vitamins, minerals and %Daily Values controlled per panel.",
        visual: { asset: "nutritionLabelFormats" },
      },
      {
        eyebrow: "Checked",
        title: "Claims against thresholds, not by hand",
        body: "“Low sodium”, “good source of fibre”, “reduced fat” — each is checked against the formula's analysed values, with the actual value shown beside the threshold and qualifying claims marked clearly.",
        visual: { flow: "claims" },
      },
      {
        eyebrow: "Regenerated",
        title: "Change the formula, the label follows",
        body: "Nutritional analysis runs off the ingredient data and the yield. When a recipe or serving size changes, the panel, the ingredient statement and the allergen declaration recalculate — including aggregate panels built from several recipes.",
        visual: { flow: "publishAggregate" },
      },
    ],
    agentSkills: [
      {
        icon: "check-one",
        text: "Checks which nutrient content claims a version still qualifies for after a change",
      },
      {
        icon: "doc-detail",
        text: "Explains a label line back to the ingredient values behind it",
      },
      {
        icon: "caution",
        text: "Lists the allergens a formula must declare, from the ingredient tags, with the Contains statement",
      },
      {
        icon: "layers",
        text: "Compares the panel of two versions per serving and per 100 g, biggest gaps first",
      },
    ],
    useCases: [
      {
        id: "publishing",
        label: "Label publishing",
        title: "Publish the panel",
        tail: "your market requires",
        description:
          "Choose the content, the layout, the region and the file type. The panel previews live and exports as PNG for internal drafts or high-resolution vector PDF for the packaging designer.",
        checks: [
          "US or Canadian format, bilingual Valeur nutritive",
          "Six layouts including aggregate",
          "Vector PDF for packaging",
        ],
        modules: ["labeling", "designer", "publishing"],
      },
      {
        id: "claims",
        label: "Nutrient content claims",
        title: "Know which claims",
        tail: "the product qualifies for",
        description:
          "Pick the nutrients to check. Each claim shows its threshold beside the recipe's actual value, with the reference amount and %Daily Value group applied — and publishes alongside the label or on its own.",
        checks: [
          "Actual value beside every threshold",
          "Qualifying and non-qualifying marked clearly",
          "Published with the label or separately",
        ],
        modules: ["claims", "labeling"],
      },
      {
        id: "allergens",
        label: "Allergen declarations",
        title: "Allergens declared",
        tail: "from the ingredient, not memory",
        description:
          "Allergens are tagged on the ingredient and carried through to every recipe and label that uses it, so the declaration is a property of the formula rather than a checklist someone maintains.",
        checks: [
          "Allergen tagging on the ingredient",
          "Contains and may-contain elements in the Publish Designer",
          "Declaration regenerated with the formula",
        ],
        modules: ["ingredients", "labeling", "designer"],
      },
      {
        id: "canada",
        label: "Canadian bilingual",
        title: "One ingredient,",
        tail: "two jurisdictions",
        description:
          "Each ingredient carries a separate Canadian label and a French ingredient statement, so the bilingual Nutrition Facts / Valeur nutritive panel is generated rather than translated after the fact.",
        checks: [
          "Canadian label and French statement per ingredient",
          "Health Canada compliant panel",
          "Region set per publish",
        ],
        modules: ["ingredients", "labeling", "publishing"],
      },
    ],
    banner: {
      title: "The label is a view of the formula",
      body: "Because analysis, claims and the panel all read the same ingredient data, there is nothing to reconcile before sign-off.",
    },
    modules: [
      "labeling",
      "claims",
      "ingredients",
      "designer",
      "publishing",
      "versions",
    ],
    faqs: [
      {
        q: "Which label formats are supported?",
        a: "US FDA and Canadian Health Canada panels in vertical, tabular, side-by-side, linear, dual column and aggregate layouts, as Nutrition Panel or Supplement Facts, per serving or per 100 g. Export as PNG or high-resolution vector PDF.",
      },
      {
        q: "Does the label update when the recipe changes?",
        a: "Yes. Nutritional analysis runs off the ingredient data and the yield, so a change to the formula or the serving size recalculates the panel, the ingredient statement and the allergen declaration.",
      },
      sharedFaqs.agent,
      sharedFaqs.outside,
    ],
    closing: "See your own label generated from your own formula.",
  },
  {
    slug: "costing",
    kind: "team",
    label: "Costing and procurement",
    audience: "Costing and procurement teams",
    icon: "calculator-one",
    title: "Know the margin",
    tail: "before the batch is made",
    lede: "Batch cost, container cost and retail price sit beside the formula. Assumptions — packaging, tolling, freight, waste — are defined once for the workspace, and supplier costs live on the ingredient, so one update re-costs every recipe that uses it.",
    summary:
      "Cost assumptions defined once, supplier costs on the ingredient, and what-if costing from the AI Agent.",
    hero: { asset: "recipeCost" },
    replaces: [
      "Cost spreadsheets per product",
      "Assumptions buried in formulas",
      "Supplier prices retyped per recipe",
      "Margin reviews after the fact",
    ],
    checks: [
      "Cost assumptions grouped by category, applied by condition",
      "Margin against a target retail price",
      "Supplier and cost data attached to the ingredient, not the recipe",
    ],
    pillarsTitle: { title: "For how costing teams", tail: "actually work" },
    pillars: [
      {
        eyebrow: "Live",
        title: "Cost rolls up as the formula changes",
        body: "Batch cost, container cost and retail price live in the recipe sidebar and move with every edit — batch size, yield, containers yielded, servings per container and serving weight in one panel.",
        visual: { asset: "recipeCost" },
      },
      {
        eyebrow: "Governed",
        title: "Assumptions defined once, applied by rule",
        body: "Packaging, tolling, freight and waste are set at workspace level in categories you define, applied by condition so they only hit the recipes they should. Edit or clear one and see every recipe re-cost.",
        visual: { flow: "costAssumptions" },
      },
      {
        eyebrow: "Connected",
        title: "Supplier cost lives on the ingredient",
        body: "Procurement data — supplier, cost, yield and storage — is a property of the ingredient. Update it there and every recipe, label and spec sheet that uses the ingredient follows.",
        visual: { flow: "newIngredient" },
      },
    ],
    agentSkills: [
      {
        icon: "chart-histogram",
        text: "Models an ingredient swap or supplier change and shows the cost and margin impact before anyone touches the formula",
      },
      {
        icon: "attention",
        text: "Flags which recipes fall below the target margin after a cost update",
      },
      {
        icon: "search",
        text: "Finds a lower-cost substitute in your own library, allergens included",
      },
      {
        icon: "calculator-one",
        text: "Summarises the assumptions behind a recipe's retail price, cost panel cited",
      },
    ],
    useCases: [
      {
        id: "what-if",
        label: "What-if costing",
        title: "Swap an ingredient,",
        tail: "see the margin move",
        description:
          "Branch a version, change the supplier or the ingredient, and compare cost per batch, per container and per serving against the original — with the assumptions applied consistently to both.",
        checks: [
          "Version-to-version cost comparison",
          "Margin against target retail price",
          "Assumptions applied the same way to every version",
        ],
        modules: ["costing", "recipes", "versions"],
      },
      {
        id: "suppliers",
        label: "Supplier changes",
        title: "Change a price once,",
        tail: "everywhere",
        description:
          "A raw material price moves. Update the ingredient's procurement record and every recipe that uses it re-costs — including the ones already published.",
        checks: [
          "Supplier, cost, yield and storage on the ingredient",
          "Every dependent recipe re-costs",
          "Certifications and documents kept with the ingredient",
        ],
        modules: ["ingredients", "costing"],
      },
      {
        id: "reporting",
        label: "Cost reporting",
        title: "Costing reports",
        tail: "management can read",
        description:
          "Reporting across recipes and versions, with time and expenses from the timesheet, in templates that keep their shape between runs and export for circulation outside Flavor Studio.",
        checks: [
          "Costing reports across recipes and versions",
          "Time and expense reporting",
          "Reporting templates, exportable",
        ],
        modules: ["reports", "timesheet", "costing"],
      },
      {
        id: "purchasing",
        label: "Contracts & POs",
        title: "Contracts and purchase orders",
        tail: "beside the products",
        description:
          "Customers, contracts, products and purchase orders in one module, linked to the development projects they depend on, so a price commitment is visible to the people costing the formula.",
        checks: [
          "Contracts and purchase orders per customer",
          "Products tracked against the customer",
          "Opportunities linked to development projects",
        ],
        modules: ["crm", "projects"],
      },
    ],
    banner: {
      title: "The cost is a property of the formula",
      body: "Not a spreadsheet someone remembers to update. Assumptions, supplier prices and yield all feed one number in the recipe sidebar.",
    },
    modules: [
      "costing",
      "ingredients",
      "recipes",
      "reports",
      "crm",
      "versions",
    ],
    faqs: [
      {
        q: "Can we model our own overheads?",
        a: "Yes. Cost assumptions are grouped into categories you define — packaging, tolling, freight, labour, waste — set once for the workspace in Recipes Admin Settings and applied by condition to the recipes they should affect.",
      },
      {
        q: "Does the AI Agent change costs?",
        a: "No. It models scenarios and answers questions — what a swap does to margin, which recipes are below target — and cites the cost panel it read. Any change is a draft for a person to apply.",
      },
      sharedFaqs.modules,
      sharedFaqs.ownership,
    ],
    closing: "Cost your own line with your own assumptions.",
  },
  {
    slug: "sales",
    kind: "team",
    label: "Sales and account teams",
    audience: "Sales and account teams",
    icon: "peoples",
    title: "Sell what R&D",
    tail: "can actually make",
    lede: "Customers, opportunities, contracts and purchase orders in the same system as the development work. A sample request is tied to the recipe being sampled, and a customer's requirements arrive as a structured form your developers can work from.",
    summary:
      "CRM linked to development projects, a builder for customer requirements, and spec sheets published from the formula.",
    hero: { asset: "crBuilder" },
    replaces: [
      "A separate CRM",
      "Requirement briefs in email",
      "Sample requests on sticky notes",
      "Spec sheets rebuilt per customer",
    ],
    checks: [
      "Opportunities linked to the development project",
      "Customer Requirements Builder — sections, question types, nested options",
      "Sample requests and shipments tracked against the recipe",
    ],
    pillarsTitle: { title: "For how account teams", tail: "actually sell" },
    pillars: [
      {
        eyebrow: "Structured",
        title: "Briefs your developers can work from",
        body: "Build the requirements form your category needs — sections, multiple choice, single answer, nested sub-levels — publish it, and collect the customer's answers in a structure R&D can act on.",
        visual: { flow: "crBuilder" },
      },
      {
        eyebrow: "Published",
        title: "Spec sheets from the formula, in your template",
        body: "Recipe, procedure, ingredient statement, nutrition label, allergens and composition dropped onto a page in the Publish Designer, saved as a template and reused across every product you send out.",
        visual: { asset: "labelDesigner" },
      },
      {
        eyebrow: "Reported",
        title: "Opportunities and activity, reported",
        body: "Opportunity and activity reporting from the CRM module, in templates that keep their shape between runs and export for the people who do not log in.",
        visual: { asset: "reports" },
      },
    ],
    agentSkills: [
      {
        icon: "send",
        text: "Answers which version shipped on a sample request, and when — from the opportunity record",
      },
      {
        icon: "form-one",
        text: "Summarises a customer's requirements form against the current draft version",
      },
      {
        icon: "calculator-one",
        text: "Drafts a what-if cost for a customer's target price, margin included",
      },
      {
        icon: "caution",
        text: "Lists the allergens a product declares before the sample goes out",
      },
    ],
    useCases: [
      {
        id: "requirements",
        label: "Customer requirements",
        title: "A brief with structure,",
        tail: "not a forwarded email",
        description:
          "Customers rarely brief you the same way twice. The Customer Requirements Builder gives each category its own form, with a live preview, drafts and updates to a published form.",
        checks: [
          "Sections, question types, nested options",
          "Live preview before publishing",
          "Answers collected in a structure R&D can use",
        ],
        modules: ["cr-builder", "crm"],
      },
      {
        id: "sampling",
        label: "Sampling",
        title: "Every sample",
        tail: "tied to its version",
        description:
          "A sample request names the recipe and version being sampled and carries its shipment tracking, so when the customer calls back, the answer is on the record.",
        checks: [
          "Sample requests tied to the recipe",
          "Shipment tracking built in",
          "Opportunity stage visible to R&D",
        ],
        modules: ["crm", "recipes", "versions"],
      },
      {
        id: "spec-sheets",
        label: "Spec & sell sheets",
        title: "Spec sheets that match",
        tail: "the label",
        description:
          "Because the spec sheet, the label and the recipe read the same data, what the customer receives is what the plant makes — published as read-only PDF or in the encrypted FS format.",
        checks: [
          "Publish Designer templates per customer",
          "Read-only PDF publishing",
          "Encrypted FS format for Flavor Studio users outside your company",
        ],
        modules: ["designer", "publishing"],
      },
      {
        id: "pipeline",
        label: "Pipeline",
        title: "Pipeline and activity",
        tail: "in one report",
        description:
          "Opportunity and activity reports across customers, linked to the projects that will deliver them, exportable for the Monday meeting.",
        checks: [
          "Opportunity and activity reporting",
          "Linked development projects",
          "Exportable templates",
        ],
        modules: ["reports", "crm", "projects"],
      },
    ],
    banner: {
      title: "The front line, connected to R&D",
      body: "An opportunity, its requirements form, its samples and the recipe behind them — one record, visible to both teams.",
    },
    modules: [
      "crm",
      "cr-builder",
      "publishing",
      "designer",
      "reports",
      "projects",
    ],
    faqs: [
      {
        q: "Does the CRM replace our sales tool?",
        a: "For product-development sales it can: customers, contacts, opportunities, contracts, products, purchase orders, sample requests and shipments are all in the module. If you keep a separate CRM, the API connects the two.",
      },
      {
        q: "Can a customer fill in the requirements form themselves?",
        a: "The form is built and published in Flavor Studio and its answers are collected in a structure your team works from. Reach out for how your customers can submit to it.",
      },
      sharedFaqs.outside,
      sharedFaqs.agent,
    ],
    closing: "Bring a real customer brief to the demo.",
  },
  {
    slug: "sensory",
    kind: "team",
    label: "Sensory and QA",
    audience: "Sensory and QA teams",
    icon: "mouth",
    title: "Sensory data that lives",
    tail: "with the formula",
    lede: "Internal panels, consumer surveys, blind triangle and preference tests — scored per attribute, compared across versions, and attached to the exact version tasted. Reports publish as PDF, filtered by product version and taster.",
    summary:
      "Panels and surveys scored per attribute, attached to the version tasted, with reports published as PDF.",
    hero: { asset: "tasteTests" },
    replaces: [
      "Paper taste sheets",
      "Panel results in spreadsheets",
      "Version numbers guessed after the fact",
      "Emailed shelf-life summaries",
    ],
    checks: [
      "Attribute scoring compared side by side across versions",
      "Purchase intent captured with the sensory scores",
      "Summary, comprehensive and shelf-life reports as PDF",
    ],
    pillarsTitle: { title: "For how sensory teams", tail: "actually work" },
    pillars: [
      {
        eyebrow: "Attached",
        title: "Results tied to the exact version tasted",
        body: "A panel scores a version, not a product name. The result stays with that version, so the developer sees which change moved which attribute — and the audit trail holds up.",
        visual: { asset: "tasteTests" },
      },
      {
        eyebrow: "Compared",
        title: "Versions side by side",
        body: "Attribute scores compared across V1, Testing and Final, with nutrition and cost from the same versions beside them, so a sensory win is weighed against what it costs.",
        visual: { asset: "recipeVersions" },
      },
      {
        eyebrow: "Published",
        title: "Reports filtered by version and taster",
        body: "Summary, comprehensive or shelf-life reports, filtered by product version and by taster, published as PDF — and tags from the test verified against the recipe.",
        visual: { flow: "tasteTestPublish" },
      },
    ],
    agentSkills: [
      {
        icon: "experiment",
        text: "Summarises a taste test — which version won, on which attributes — with the test cited",
      },
      {
        icon: "layers",
        text: "Compares the winning version's nutrition against the one it replaces",
      },
      {
        icon: "caution",
        text: "Flags the allergens a panel sample must declare before it is served",
      },
      {
        icon: "magic-wand",
        text: "Drafts a reformulation toward the attribute that scored lowest — for a developer to approve",
      },
    ],
    useCases: [
      {
        id: "panels",
        label: "Internal panels",
        title: "Run the panel,",
        tail: "keep the result",
        description:
          "Blind triangle and preference tests with attribute scoring, filtered across tests, tags and verified tags. Names and emails stay out of the report if you want them to.",
        checks: [
          "Blind triangle and preference tests",
          "Attribute scoring across versions",
          "Filtering across tests and tags",
        ],
        modules: ["taste-tests", "versions"],
      },
      {
        id: "surveys",
        label: "Consumer surveys",
        title: "Consumer surveys",
        tail: "with purchase intent",
        description:
          "Consumer surveys capture purchase intent with the sensory scores, so the number that matters commercially sits beside the attributes that explain it.",
        checks: [
          "Consumer surveys alongside internal panels",
          "Purchase intent captured",
          "Results reported per version",
        ],
        modules: ["taste-tests", "reports"],
      },
      {
        id: "shelf-life",
        label: "Shelf life",
        title: "Shelf-life reports",
        tail: "from the same tests",
        description:
          "Publish a shelf-life report from the taste-test module, filtered by product version and taster, as a PDF the QA file can keep.",
        checks: [
          "Shelf-life report type",
          "Filtered by version and taster",
          "PDF publishing",
        ],
        modules: ["taste-tests", "publishing"],
      },
    ],
    banner: {
      title: "The panel result is part of the recipe",
      body: "Not a spreadsheet next to it. When the winner is promoted to Final, its scores come with it.",
    },
    modules: [
      "taste-tests",
      "versions",
      "recipes",
      "reports",
      "projects",
      "publishing",
    ],
    faqs: [
      {
        q: "Can tasters be kept anonymous in reports?",
        a: "Reports are filtered by product version and by taster, and the client's own specification for exports is no personal data — the sample export on this site replaces names and emails with placeholders for the same reason.",
      },
      {
        q: "Which test types are supported?",
        a: "Internal panels and consumer surveys, including blind triangle and preference tests, with attribute scoring and purchase intent, compared across versions.",
      },
      sharedFaqs.modules,
      sharedFaqs.agent,
    ],
    closing: "Score your next panel against the version it tasted.",
  },

  /* ---------------------------------------------------------- companies */
  {
    slug: "cpg",
    kind: "company",
    label: "CPG manufacturers",
    audience: "CPG manufacturers",
    icon: "factory-building",
    title: "From concept to shelf,",
    tail: "in one system",
    lede: "Recipes, ingredients, costing, labels, taste tests, projects and CRM share one ingredient library — so a launch moves through stage gates as facts in the system, not threads in an inbox. Use one module or all eighteen.",
    summary:
      "Stage-gated launches on one ingredient library, from formulation and costing to the label and the customer.",
    hero: { asset: "recipeGrid" },
    replaces: [
      "Formulation spreadsheets",
      "Standalone label software",
      "A separate CRM",
      "Status meetings",
    ],
    checks: [
      "Stage/gate projects from concept to shelf",
      "Labels and claims regenerated when the formula changes",
      "Development time logged against the project",
    ],
    pillarsTitle: { title: "For how manufacturers", tail: "actually launch" },
    pillars: [
      {
        eyebrow: "Connected",
        title: "One library, eighteen modules",
        body: "R&D formulates, regulatory labels, costing prices and sales quotes from the same ingredient records. Change a cost, a supplier or an allergen once and every dependent recipe, label and spec sheet follows.",
        visual: { asset: "recipeGrid" },
      },
      {
        eyebrow: "Governed",
        title: "Compliance is generated, not assembled",
        body: "US FDA and Health Canada panels, nutrient content claims and allergen declarations come from the formula's analysed values — print-ready in six layouts, regenerated when the formula changes.",
        visual: { asset: "nutritionLabelFormats" },
      },
      {
        eyebrow: "Traceable",
        title: "What a launch actually cost",
        body: "Development time and expenses are logged against the project from a weekly calendar or a running timer, and roll into reports you can export — so the hours a launch consumed are a number, not a guess.",
        visual: { flow: "timesheet" },
      },
    ],
    agentSkills: [
      {
        icon: "chart-histogram",
        text: "Models a raw-material price change across every recipe in a line, margin by margin",
      },
      {
        icon: "check-one",
        text: "Checks which claims each product still qualifies for after a reformulation",
      },
      {
        icon: "caution",
        text: "Gives the Contains statement for any formula, cross-contact risks included",
      },
      {
        icon: "folder-open",
        text: "Summarises where each launch stands against its stage gates, projects cited",
      },
    ],
    useCases: [
      {
        id: "launches",
        label: "Launch management",
        title: "Launches through stage gates,",
        tail: "not inboxes",
        description:
          "Briefs, tasks and stage gates tied to the recipes they concern, on a Gantt timeline and a board — the state of a launch is a fact in the system rather than something someone has to chase.",
        checks: [
          "Stage/gate projects with briefs attached",
          "Timeline with dependencies and Gantt reporting",
          "Board view for day-to-day work",
        ],
        modules: ["projects", "timeline", "board"],
      },
      {
        id: "reformulation",
        label: "Reformulation at scale",
        title: "Reformulate a line,",
        tail: "keep every trail",
        description:
          "Versions per recipe with full history, nutrition and cost compared side by side, and taste-test results attached to the version scored — across as many products as the project touches.",
        checks: [
          "Named versions per recipe",
          "Side-by-side nutrition and cost",
          "Promote a winner without rebuilding it",
        ],
        modules: ["recipes", "versions", "costing"],
      },
      {
        id: "co-man",
        label: "Co-manufacturers",
        title: "Hand a co-manufacturer",
        tail: "exactly what they need",
        description:
          "Read-only PDFs, Word and CSV exports, or the encrypted FS format that carries embedded custom ingredients to Flavor Studio users outside your company — laid out through your Publish Designer templates.",
        checks: [
          "Read-only PDF publishing",
          "Encrypted FS format between companies",
          "Templates reused across products",
        ],
        modules: ["publishing", "designer"],
      },
      {
        id: "erp",
        label: "ERP & plant systems",
        title: "Connected to the ERP",
        tail: "you already run",
        description:
          "A full REST API over recipes, ingredients, projects and CRM data, webhooks for reacting to changes, and integration paths for Plex and other plant systems.",
        checks: [
          "REST API and webhooks",
          "ERP and accounting integrations",
          "Per-user and per-group permissions, two-factor authentication",
        ],
        modules: ["integrations", "admin"],
      },
    ],
    banner: {
      title: "Your whole product stack, finally in one place",
      body: "Formulation, compliance, costing, sensory, projects and the customer — on one library, with an AI Agent that reads all of it.",
    },
    modules: [
      "recipes",
      "ingredients",
      "costing",
      "labeling",
      "taste-tests",
      "projects",
      "crm",
      "integrations",
    ],
    faqs: [
      sharedFaqs.modules,
      {
        q: "We have more than 30 users. What changes?",
        a: "Teams over 30 users get a custom Enterprise plan — contact sales. The product is the same; the commercial terms and onboarding are tailored.",
      },
      sharedFaqs.permissions,
      sharedFaqs.ownership,
    ],
    closing: "See your own launch move through the gates.",
  },
  {
    slug: "suppliers",
    kind: "company",
    label: "Ingredient suppliers",
    audience: "Ingredient suppliers",
    icon: "box",
    title: "Spec sheets your customers",
    tail: "can actually use",
    lede: "Custom ingredients with nutrients, allergens, certifications and documents on one record; a separate Canadian label and French statement; and an encrypted FS format that carries your embedded custom ingredients to Flavor Studio users outside your company.",
    summary:
      "Ingredient records with certifications and documents, application recipes, and an encrypted format for sharing with customers.",
    hero: { asset: "ingredientLibrary" },
    replaces: [
      "Spec sheets rebuilt per customer",
      "Nutrient tables retyped by your customers",
      "Certification PDFs lost in email",
      "Application recipes in a separate tool",
    ],
    checks: [
      "Certifications and supplier documents attached to the ingredient",
      "Encrypted FS format carries custom ingredients between companies",
      "Application recipes formulated and costed in the same library",
    ],
    pillarsTitle: {
      title: "For how suppliers",
      tail: "actually work with customers",
    },
    pillars: [
      {
        eyebrow: "Documented",
        title: "One record per ingredient, complete",
        body: "Basic information, nutrients and allergens, the ingredient statement, certifications and documents, procurement and validation — with configurable fields and custom calculations over them.",
        visual: { flow: "newIngredient" },
      },
      {
        eyebrow: "Portable",
        title: "Send the ingredient, not a PDF of it",
        body: "The encrypted FS format carries your embedded custom ingredients to Flavor Studio users outside your company, so a customer formulates with your data instead of retyping it. Read-only PDF, Word and CSV are there for everyone else.",
        visual: { asset: "publishExport" },
      },
      {
        eyebrow: "Applied",
        title: "Application recipes beside the ingredient",
        body: "Show what your ingredient does in a finished formula — costed, analysed and labelled in the same grid your customers use — and version it as the application develops.",
        visual: { asset: "recipeGrid" },
      },
    ],
    agentSkills: [
      {
        icon: "search",
        text: "Finds which of your ingredients meet a customer's brief — non-GMO, no soy, under a cost — and ranks them",
      },
      {
        icon: "layers",
        text: "Compares the nutrition of two application recipes per serving",
      },
      {
        icon: "caution",
        text: "Lists the allergens an application recipe must declare",
      },
      {
        icon: "chart-histogram",
        text: "Drafts a what-if cost when a raw-material price moves",
      },
    ],
    useCases: [
      {
        id: "records",
        label: "Ingredient records",
        title: "Every field a customer",
        tail: "will ask for",
        description:
          "Nutrients imported from a PDF or copied from another ingredient, allergens tagged, certifications and documents attached, density and processing-aid flags set — and the Canadian label and French statement on the same record.",
        checks: [
          "Nutrients, allergens, certifications, documents",
          "Configurable fields and custom calculations",
          "Canadian label and French statement",
        ],
        modules: ["ingredients"],
      },
      {
        id: "applications",
        label: "Application recipes",
        title: "Prove the ingredient",
        tail: "in a formula",
        description:
          "Formulate the application in the live grid, cost it with your assumptions, generate the panel, and version it as the customer's brief evolves.",
        checks: [
          "Live grid with yield and cost",
          "Named versions with history",
          "Label generated from the application",
        ],
        modules: ["recipes", "costing", "labeling"],
      },
      {
        id: "sharing",
        label: "Sharing with customers",
        title: "Share in the format",
        tail: "the customer works in",
        description:
          "Encrypted FS for customers on Flavor Studio, read-only PDF for everyone else, and a Publish Designer template so every spec sheet leaving the building looks the same.",
        checks: [
          "Encrypted FS format",
          "Read-only PDF, Word, CSV",
          "Publish Designer templates with your logo",
        ],
        modules: ["publishing", "designer"],
      },
      {
        id: "requests",
        label: "Requests & samples",
        title: "Requests and samples",
        tail: "on the customer record",
        description:
          "Opportunities, contacts, sample requests and shipments per customer, with a requirements form built for your category so a brief arrives as structured answers.",
        checks: [
          "Sample requests tied to the recipe",
          "Shipment tracking",
          "Customer Requirements Builder",
        ],
        modules: ["crm", "cr-builder"],
      },
    ],
    banner: {
      title: "Your ingredient, in your customer's formula",
      body: "With the nutrients, allergens and certifications you maintain — not a retyped copy of them.",
    },
    modules: [
      "ingredients",
      "recipes",
      "publishing",
      "designer",
      "crm",
      "cr-builder",
    ],
    faqs: [
      {
        q: "Can a customer use our ingredient without seeing our recipes?",
        a: "Yes. The encrypted FS format carries the embedded custom ingredient to a Flavor Studio user outside your company; your workspace, recipes and other ingredients are not exposed.",
      },
      sharedFaqs.outside,
      sharedFaqs.permissions,
      sharedFaqs.trial,
    ],
    closing: "Bring a spec sheet; leave with the ingredient record.",
  },
  {
    slug: "restaurants",
    kind: "company",
    label: "QSR and fast-casual chains",
    audience: "QSR and fast-casual chains",
    icon: "hamburger",
    title: "Menu nutrition that keeps up",
    tail: "with the menu",
    lede: "Build items from sub-recipes, cost them with your own assumptions, and publish compliant nutrition panels and allergen declarations from the same data — so a sauce change updates every item that uses it.",
    summary:
      "Menu items built from sub-recipes, costed with your assumptions, with nutrition and allergens published from the same data.",
    hero: { asset: "recipeGrid" },
    replaces: [
      "Nutrition analysis outsourced per item",
      "Recipe cards in binders",
      "Allergen matrices in spreadsheets",
      "Cost sheets per location",
    ],
    checks: [
      "Sub-recipes nested to any depth and costed through to the item",
      "Per serving or per 100 g, aggregate panels across items",
      "Allergen tagging carried through to the declaration",
    ],
    pillarsTitle: { title: "For how chains", tail: "actually run a menu" },
    pillars: [
      {
        eyebrow: "Nested",
        title: "A sauce inside a sandwich inside a combo",
        body: "Sub-recipes nest to any depth and cost through to the parent. Change the sauce once and every item that uses it — nutrition, allergens, cost — follows.",
        visual: { asset: "recipeGrid" },
      },
      {
        eyebrow: "Published",
        title: "One panel across several items",
        body: "The aggregate layout builds one compliant panel from several recipes at once; per serving or per 100 g; US or Canadian; PNG for the menu board draft, vector PDF for print.",
        visual: { flow: "publishAggregate" },
      },
      {
        eyebrow: "Costed",
        title: "Assumptions that match how you operate",
        body: "Packaging, freight, labour and waste defined once and applied by condition, so a menu item's cost and margin against its menu price are a fact in the recipe, not a spreadsheet per location.",
        visual: { asset: "costAssumptions" },
      },
    ],
    agentSkills: [
      {
        icon: "doc-detail",
        text: "Explains what changes on the panel if a sauce is reformulated",
      },
      {
        icon: "caution",
        text: "Lists the allergens a menu item declares, sub-recipes included",
      },
      {
        icon: "chart-histogram",
        text: "Models a supplier swap across every item that uses the ingredient",
      },
      { icon: "layers", text: "Compares two versions of an item per serving" },
    ],
    useCases: [
      {
        id: "items",
        label: "Menu items",
        title: "Items from sub-recipes,",
        tail: "costed through",
        description:
          "Processing steps, sub-levels, batch scaling to servings, moisture and processing loss applied automatically — the menu engineered in the same grid the nutrition comes from.",
        checks: [
          "Sub-recipes nested to any depth",
          "Batch scaling to servings",
          "Loss adjustments applied automatically",
        ],
        modules: ["recipes", "ingredients"],
      },
      {
        id: "disclosure",
        label: "Nutrition disclosure",
        title: "Disclosure",
        tail: "from the formula",
        description:
          "Panels generated from the analysed values, per serving or per 100 g, in the format the market requires, exported as PNG or vector PDF and regenerated when an item changes.",
        checks: [
          "FDA and Health Canada formats",
          "Aggregate panels across items",
          "Regenerated with the recipe",
        ],
        modules: ["labeling", "publishing"],
      },
      {
        id: "allergens",
        label: "Allergens",
        title: "The allergen matrix",
        tail: "as a by-product",
        description:
          "Allergens are tagged on the ingredient and carried through every sub-recipe to the item's declaration, so the matrix is generated rather than maintained.",
        checks: [
          "Allergen tagging on the ingredient",
          "Carried through sub-recipes",
          "Contains and may-contain on the published output",
        ],
        modules: ["ingredients", "labeling", "designer"],
      },
      {
        id: "costing",
        label: "Menu costing",
        title: "Margin per item,",
        tail: "assumptions included",
        description:
          "Batch cost, container cost and price beside every item, with reporting across recipes and versions when a supplier or a price changes.",
        checks: [
          "Cost assumptions by category",
          "Margin against menu price",
          "Costing reports across items",
        ],
        modules: ["costing", "reports"],
      },
    ],
    banner: {
      title: "Change the sauce once",
      body: "Every item that uses it re-costs, re-analyses and re-declares its allergens — before the menu board is reprinted.",
    },
    modules: [
      "recipes",
      "ingredients",
      "labeling",
      "costing",
      "versions",
      "publishing",
    ],
    faqs: [
      {
        q: "Can one panel cover a combo of several items?",
        a: "Yes. The aggregate layout builds one compliant panel from several recipes at once, and any recipe in the list can be edited or removed in place before publishing.",
      },
      sharedFaqs.modules,
      sharedFaqs.permissions,
      sharedFaqs.trial,
    ],
    closing: "Bring one menu item and its sauce.",
  },

  /* --------------------------------------------------------- industries */
  {
    slug: "flavor",
    kind: "industry",
    label: "Flavor and fragrance",
    audience: "Flavor and fragrance companies",
    icon: "leaves",
    title: "Formulas as trade secrets,",
    tail: "treated that way",
    lede: "Per-user and per-group read/edit rights on every recipe, two-factor authentication, a full edit history, and customer application work kept beside the formulas it depends on.",
    summary:
      "Per-user and per-group rights on every formula, two-factor authentication, and customer applications beside the formulas.",
    hero: { asset: "recipeVersions" },
    replaces: [
      "Formulas in locked spreadsheets",
      "Version numbers in file names",
      "Customer briefs in email",
      "Sample logs in a separate tool",
    ],
    checks: [
      "Per-user and per-group sharing with separate edit and read rights",
      "History tool recording every modification, when and by whom",
      "Sample requests tied to the recipe being sampled",
    ],
    pillarsTitle: {
      title: "For how flavor houses",
      tail: "actually protect their work",
    },
    pillars: [
      {
        eyebrow: "Secured",
        title: "Two-factor, per-user rights, logged sign-ons",
        body: "Two-factor authentication through an authenticator app, verification preferences enforced by the organisation, one concurrent session per account, TLS transport and sign-on IP addresses logged.",
        visual: { flow: "twoFactor" },
      },
      {
        eyebrow: "Versioned",
        title: "Every iteration kept, every change attributed",
        body: "Named versions per formula, a history tool that records who changed what and when, and side-by-side comparison so the path a formula took is on the record.",
        visual: { asset: "recipeVersions" },
      },
      {
        eyebrow: "Commercial",
        title: "The customer's brief, structured",
        body: "A requirements form built for your category collects the customer's answers in a structure your creative team can work from, on the opportunity that will deliver it.",
        visual: { flow: "crBuilder" },
      },
    ],
    agentSkills: [
      {
        icon: "search",
        text: "Finds a substitute in your library that holds a cost or allergen constraint",
      },
      {
        icon: "layers",
        text: "Compares two versions per serving and per 100 g",
      },
      {
        icon: "magic-wand",
        text: "Drafts a reformulation toward a target — as a version you approve",
      },
      {
        icon: "lock",
        text: "Answers only from what the logged-in user is allowed to see",
      },
    ],
    useCases: [
      {
        id: "library",
        label: "Formula library",
        title: "A library with rights,",
        tail: "not a folder with a password",
        description:
          "Recipe types and tags for a large library, per-user and per-group edit/read rights, and an audit trail on every formula.",
        checks: [
          "Recipe types and tags",
          "Per-user and per-group rights",
          "History per recipe",
        ],
        modules: ["recipes", "versions", "admin"],
      },
      {
        id: "applications",
        label: "Customer applications",
        title: "Applications on the",
        tail: "customer record",
        description:
          "Opportunities linked to development projects, sample requests tied to the recipe sampled, shipments tracked — and a requirements form built for your category.",
        checks: [
          "Opportunities linked to projects",
          "Sample requests and shipments",
          "Customer Requirements Builder",
        ],
        modules: ["crm", "cr-builder", "projects"],
      },
      {
        id: "screening",
        label: "Sensory screening",
        title: "Screen candidates",
        tail: "against each other",
        description:
          "Blind triangle and preference tests with attribute scoring across versions, results attached to the version tasted.",
        checks: [
          "Blind triangle and preference tests",
          "Attribute scoring across versions",
          "Results tied to the version",
        ],
        modules: ["taste-tests", "versions"],
      },
      {
        id: "compliance",
        label: "Compliance",
        title: "Allergens and claims",
        tail: "from the formula",
        description:
          "Allergen tags carried through from the ingredient, claims checked against analysed values, and read-only publishing for the customer's regulatory team.",
        checks: [
          "Allergen declarations from ingredient tags",
          "Claims checked against thresholds",
          "Read-only PDF publishing",
        ],
        modules: ["labeling", "claims", "publishing"],
      },
    ],
    banner: {
      title: "Built for material that is a trade secret",
      body: "Central control over who sees what, on infrastructure built for formulas that must not leave the building.",
    },
    modules: [
      "recipes",
      "versions",
      "admin",
      "crm",
      "taste-tests",
      "ingredients",
    ],
    faqs: [
      sharedFaqs.permissions,
      {
        q: "Does the AI Agent see every formula in the workspace?",
        a: "No. It sees what the logged-in user can see — the same per-user and per-group rights apply. It never trains third-party models on your data and it never edits a formula.",
      },
      sharedFaqs.outside,
      sharedFaqs.ownership,
    ],
    closing: "See the rights model on your own library.",
  },
  {
    slug: "education",
    kind: "industry",
    label: "Food science programs",
    audience: "Food science and culinology programs",
    icon: "degree-hat",
    title: "The tools students will use",
    tail: "on the job",
    lede: "The same formulation grid, nutrition analysis, label engine and taste-test module working teams use — with 9,000+ USDA SR28 ingredients built in, nothing to install, and academic pricing for programs.",
    summary:
      "The working platform, with 9,000+ USDA ingredients built in, nothing to install and academic pricing.",
    hero: { asset: "nutritionLabelFormats" },
    replaces: [
      "Nutrition calculators per course",
      "Recipe templates in Word",
      "Panel scoring on paper",
      "Software installs in the lab",
    ],
    checks: [
      "Over 9,000 ingredients from the USDA SR28 database built in",
      "Runs in any current browser, nothing to download",
      "Academic discounts for food science and culinology programs",
    ],
    pillarsTitle: {
      title: "For how programs",
      tail: "actually teach formulation",
    },
    pillars: [
      {
        eyebrow: "Taught",
        title: "Formulate the way industry does",
        body: "Percentages, yield and cost recomputing as students type; sub-recipes, batch scaling and loss adjustments; named versions and a history of every change.",
        visual: { asset: "recipeGrid" },
      },
      {
        eyebrow: "Analysed",
        title: "Real panels from real analysis",
        body: "US FDA and Health Canada panels generated by the label engine from the formula's own analysed values, in six layouts, with nutrient content claims checked against their thresholds.",
        visual: { asset: "nutritionLabelFormats" },
      },
      {
        eyebrow: "Tested",
        title: "Sensory labs with results that persist",
        body: "Internal panels and blind tests scored per attribute across versions, reports published as PDF — the result attached to the version tasted for the write-up.",
        visual: { asset: "tasteTests" },
      },
    ],
    agentSkills: [
      {
        icon: "doc-detail",
        text: "Explains a label line back to the ingredient values behind it",
      },
      { icon: "layers", text: "Compares two student versions per serving" },
      { icon: "caution", text: "Lists the allergens a formula must declare" },
      {
        icon: "link",
        text: "Cites the recipe or test each answer came from — a habit worth teaching",
      },
    ],
    useCases: [
      {
        id: "coursework",
        label: "Formulation coursework",
        title: "Formulation coursework",
        tail: "in a live grid",
        description:
          "Students formulate against the USDA SR28 library plus custom ingredients, with yield and cost rolling up and every change recorded.",
        checks: [
          "9,000+ USDA ingredients plus custom",
          "Live yield and cost",
          "History per recipe",
        ],
        modules: ["recipes", "ingredients"],
      },
      {
        id: "labeling",
        label: "Labeling & claims",
        title: "Labeling and claims",
        tail: "as taught by the regulation",
        description:
          "Generate the panel, check claims against thresholds, and export a PNG for the assignment — from the student's own formula.",
        checks: [
          "FDA and Health Canada formats",
          "Claims with actual value beside threshold",
          "PNG export",
        ],
        modules: ["labeling", "claims"],
      },
      {
        id: "sensory",
        label: "Sensory labs",
        title: "Sensory labs",
        tail: "with persistent data",
        description:
          "Panels and triangle tests scored in the module, compared across versions, and published as PDF for the report.",
        checks: [
          "Panels and blind tests",
          "Scores across versions",
          "PDF reports",
        ],
        modules: ["taste-tests"],
      },
      {
        id: "capstone",
        label: "Capstone projects",
        title: "Capstone projects",
        tail: "run like a launch",
        description:
          "Stage-gated projects with a timeline and a board, and time logged against the project — the way a development team runs one.",
        checks: [
          "Stage/gate projects",
          "Timeline and board",
          "Timesheet against the project",
        ],
        modules: ["projects", "timesheet"],
      },
    ],
    banner: {
      title: "Graduates who already know the tool",
      body: "Senspire has supported food science and culinology programs since day one. The platform your students learn on is the one the industry works in.",
    },
    modules: [
      "recipes",
      "ingredients",
      "labeling",
      "claims",
      "taste-tests",
      "projects",
    ],
    faqs: [
      {
        q: "Do you offer academic discounts?",
        a: "Yes — Senspire has supported food science and culinology programs from day one. Reach out through the contact form and we will set it up.",
      },
      {
        q: "Does it need installing in the lab?",
        a: "No. Flavor Studio is cloud-based, runs in all current browsers and is optimised for mobile devices without apps.",
      },
      sharedFaqs.modules,
      sharedFaqs.agent,
    ],
    closing: "Set up a class on the platform, not a demo of it.",
  },
  {
    slug: "research",
    kind: "industry",
    label: "Sensory and research agencies",
    audience: "Sensory science and consumer research agencies",
    icon: "chart-histogram",
    title: "Panels, scores and reports,",
    tail: "tied to the sample",
    lede: "Internal panels, consumer surveys, blind triangle and preference tests scored per attribute, filtered across tests and tags, and published as summary, comprehensive or shelf-life reports — each result attached to the exact recipe version tasted.",
    summary:
      "Panels and surveys scored per attribute, filtered across tests and tags, published as client-ready PDF reports.",
    hero: { asset: "tasteTests" },
    replaces: [
      "Survey tools disconnected from the sample",
      "Scores in spreadsheets",
      "Reports assembled by hand",
      "Client samples logged separately",
    ],
    checks: [
      "Blind triangle and preference tests",
      "Filtering across tests, tags and verified tags",
      "Reports as PDF, filtered by product version and taster",
    ],
    pillarsTitle: { title: "For how agencies", tail: "actually run studies" },
    pillars: [
      {
        eyebrow: "Scored",
        title: "Attributes scored, purchase intent captured",
        body: "Internal panels and consumer surveys score attributes per version and capture purchase intent with them, so the commercial number sits beside the sensory explanation.",
        visual: { asset: "tasteTests" },
      },
      {
        eyebrow: "Filtered",
        title: "Reports by version and taster",
        body: "Summary, comprehensive or shelf-life reports, filtered by product version and by taster, published as PDF — with tags from the test verified against the recipe.",
        visual: { flow: "tasteTestPublish" },
      },
      {
        eyebrow: "Client-ready",
        title: "Time and activity, reported per client",
        body: "Study time logged against the client project with expenses attached, reported in detailed or weekly views and exported for the invoice.",
        visual: { asset: "reports" },
      },
    ],
    agentSkills: [
      {
        icon: "experiment",
        text: "Summarises a taste test — which version won, on which attributes — with the test cited",
      },
      { icon: "layers", text: "Compares the versions tasted, per serving" },
      {
        icon: "doc-detail",
        text: "Explains a client's label line or claim from the formula behind it",
      },
      {
        icon: "lock",
        text: "Answers only from the projects the logged-in user can see",
      },
    ],
    useCases: [
      {
        id: "panels",
        label: "Panel management",
        title: "Panels and surveys",
        tail: "in one module",
        description:
          "Blind triangle and preference tests, consumer surveys, attribute scoring and purchase intent — filtered across tests, tags and verified tags.",
        checks: [
          "Blind and preference tests",
          "Consumer surveys",
          "Filtering across tests and tags",
        ],
        modules: ["taste-tests", "versions"],
      },
      {
        id: "clients",
        label: "Client projects",
        title: "Each study",
        tail: "a project",
        description:
          "Client studies run as stage-gated projects with time logged against them, on the customer record that holds the opportunity and its samples.",
        checks: [
          "Stage/gate projects",
          "Timesheet per project",
          "Customers and opportunities",
        ],
        modules: ["projects", "timesheet", "crm"],
      },
      {
        id: "reporting",
        label: "Reporting",
        title: "Reports the client",
        tail: "can act on",
        description:
          "Taste-test reports as PDF, filtered by version and taster; time and activity reports exportable for the invoice.",
        checks: [
          "Summary, comprehensive, shelf-life reports",
          "Filtered by version and taster",
          "Exportable time reports",
        ],
        modules: ["reports", "publishing"],
      },
    ],
    banner: {
      title: "The result stays with the sample",
      body: "Every score attached to the version tasted, every report filtered by it, every hour logged to the client that asked.",
    },
    modules: [
      "taste-tests",
      "projects",
      "timesheet",
      "reports",
      "crm",
      "versions",
    ],
    faqs: [
      {
        q: "Can we keep each client's work separate?",
        a: "Yes. Recipes and projects are shared per user or per group with separate edit and read rights, so a client's formulas and studies are visible only to the people assigned to them.",
      },
      sharedFaqs.modules,
      sharedFaqs.ownership,
      sharedFaqs.trial,
    ],
    closing: "Run your next study on the platform.",
  },
  {
    slug: "nutrition",
    kind: "industry",
    label: "Dieticians and nutritionists",
    audience: "Dieticians and nutritionists",
    icon: "scale-one",
    title: "Nutrition analysis",
    tail: "you can stand behind",
    lede: "Analysis runs off ingredient data and yield, with moisture, fat and processing loss applied automatically; panels publish in US and Canadian formats; and claims are checked against their thresholds instead of by hand.",
    summary:
      "Analysis from 9,000+ USDA ingredients plus your own, panels in US and Canadian formats, claims checked against thresholds.",
    hero: { asset: "nutrientClaims" },
    replaces: [
      "Nutrition calculators",
      "Retyped USDA lookups",
      "Claim checks by hand",
      "Label mock-ups in a design tool",
    ],
    checks: [
      "9,000+ USDA SR28 ingredients plus your own",
      "Moisture and fat loss, processing loss and yield handled automatically",
      "Quantities per serving or per 100 g",
    ],
    pillarsTitle: {
      title: "For how nutrition professionals",
      tail: "actually analyse",
    },
    pillars: [
      {
        eyebrow: "Analysed",
        title: "The panel from the analysis, in six layouts",
        body: "US FDA and Health Canada formats, Nutrition Panel or Supplement Facts, per serving or per 100 g, vitamins and minerals beyond the mandatory four — the label engine's own output.",
        visual: { asset: "nutritionLabelFormats" },
      },
      {
        eyebrow: "Checked",
        title: "Claims with the actual value beside the threshold",
        body: "Pick the nutrients to check; each claim shows the recipe's analysed value against its threshold, qualifying and non-qualifying marked clearly.",
        visual: { asset: "nutrientClaims" },
      },
      {
        eyebrow: "Compared",
        title: "Two recipes, per serving, biggest gaps first",
        body: "The AI Agent compares two recipes per serving and highlights the largest differences, naming the recipes and the analysis it read.",
        visual: { asset: "aiAgent" },
      },
    ],
    agentSkills: [
      {
        icon: "layers",
        text: "Compares two recipes per serving and per 100 g, biggest gaps highlighted",
      },
      {
        icon: "check-one",
        text: "Checks which nutrient content claims a recipe qualifies for",
      },
      { icon: "caution", text: "Lists the allergens a recipe must declare" },
      {
        icon: "magic-wand",
        text: "Drafts a reformulation toward a nutrient target — for you to approve",
      },
    ],
    useCases: [
      {
        id: "analysis",
        label: "Recipe analysis",
        title: "Analyse a recipe",
        tail: "from real ingredient data",
        description:
          "USDA SR28 ingredients built in, custom ingredients imported from a spec sheet PDF, and loss adjustments applied automatically to the yield.",
        checks: [
          "9,000+ USDA ingredients",
          "Custom ingredients from a PDF",
          "Loss adjustments applied automatically",
        ],
        modules: ["recipes", "ingredients"],
      },
      {
        id: "labels",
        label: "Labels & claims",
        title: "Labels and claims",
        tail: "for a client",
        description:
          "Generate the panel in the client's market format, check the claims they want to make, and export PNG or vector PDF.",
        checks: [
          "US and Canadian formats",
          "Claims against thresholds",
          "PNG or vector PDF",
        ],
        modules: ["labeling", "claims"],
      },
      {
        id: "reports",
        label: "Client reports",
        title: "Reports in your",
        tail: "own template",
        description:
          "Lay out the recipe, the panel, the composition and your notes in the Publish Designer, save it as a template and reuse it for every client.",
        checks: [
          "Publish Designer templates",
          "Recipe, label, composition and notes elements",
          "Print or PDF",
        ],
        modules: ["publishing", "designer"],
      },
    ],
    banner: {
      title: "Analysis you can trace to the ingredient",
      body: "Every value on the panel comes from an ingredient record you can open, and every claim shows the number it was checked against.",
    },
    modules: [
      "ingredients",
      "recipes",
      "labeling",
      "claims",
      "publishing",
      "versions",
    ],
    faqs: [
      {
        q: "Are yield and cooking losses taken into account?",
        a: "Yes. Enter a loss amount or a target value, by percentage or gram weight, and the effect on nutrition is handled — including cases like ice-cream overrun, where fill weight is calculated from the overrun percentage and container size.",
      },
      {
        q: "Can I add ingredients that are not in the USDA database?",
        a: "Yes. Custom ingredients sit beside the SR28 database, and most are imported from a vendor spec sheet — the tool reads the PDF and pulls the nutrient values in.",
      },
      sharedFaqs.agent,
      sharedFaqs.trial,
    ],
    closing: "Analyse a real client recipe in the demo.",
  },
];

export const solutionSlugs = solutions.map((s) => s.slug);

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function solutionsOfKind(kind: SolutionKind) {
  return solutions.filter((s) => s.kind === kind);
}

export function solutionHref(slug: string) {
  return routes.solution(slug);
}
