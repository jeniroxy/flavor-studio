import type { FaqItem } from "@/components/faq-accordion";
import { productAssets, type AssetSpec } from "@/lib/assets";
import { flows } from "@/lib/flows";
import { modules, type Module } from "@/lib/modules";
import type { Flow } from "@/components/flow-player";

/*
 * Per-module page content for /features/<id>, on the clickup.com feature-page
 * template (docs/research/clickup-pages-analysis.md §1, "Template A"):
 *
 *   Hero → LogoStrip → WithoutWith | Thesis → PillarsHead → 3 alternating
 *   rows → GradientBanner → AI head → 2 AI rows → IconGrid → PlatformGrid →
 *   SecurityStrip → FAQ → RainbowCta
 *
 * Capability statements come from `modules.ts`, which was written against the
 * application design file — nothing here claims a feature that file does not
 * show. Copy follows ClickUp's formula: H1 = outcome promise with a grey tail,
 * three adjectives, each row headline a benefit of six words or fewer, FAQ =
 * free / different / scales / setup / complexity.
 */

export type Visual =
  | { kind: "asset"; asset: AssetSpec }
  | { kind: "flow"; flow: Flow }
  /** One still from a flow — flows are sequences of real screens, so a
      three-row section can show three distinct moments of one feature.
      `step` is a zero-based index into `flow.steps`. */
  | { kind: "still"; flow: Flow; step: number }
  /** No screenshot exists for this point yet, so the row renders
      AssetFrame's marked placeholder and names what is missing. Used where a
      section has to carry as many points as flavorstudio.com's own section
      but the application design file has no screen for that point — pointing
      the row at some other module's asset just to trigger the placeholder
      would misname the gap and leak that asset into `visualImage()`. */
  | { kind: "pending"; alt: string; width?: number; height?: number }
  /** A drawn illustration in the app's look, for a point the app design
      only has as a mockup (features/illustrations.tsx). */
  | { kind: "illustration"; id: "reminder" | "dependencies" };

export type PillarRow = {
  eyebrow: string;
  title: string;
  body: string;
  visual: Visual;
};

export type FeaturePage = {
  id: Module["id"];
  eyebrow: string;
  h1: string;
  tail: string;
  lede: string;
  hero: Visual;
  /** Either the two-column contrast or the four-word thesis. */
  contrast:
    | {
        kind: "without-with";
        title: string;
        tail: string;
        without: string[];
        with: string[];
      }
    | {
        kind: "thesis";
        title: string;
        tail: string;
        /** "Capture. Review. Approve. Report." */
        words: string;
      };
  pillars: {
    title: string;
    tail?: string;
    lede: string;
    /** "Structured. Versioned. Scalable." */
    adjectives: string;
    /* As many rows as flavorstudio.com's own section has points — six for
       Recipes, five for Project Management, four for Nutritional Analysis and
       CRM, three for Taste Test. It was a fixed trio; the client asked that
       the count match theirs. */
    rows: PillarRow[];
  };
  banner: { title: string; body: string };
  ai: {
    title: string;
    tail: string;
    rows: [
      { eyebrow: string; title: string; body: string; chat: ChatLine[] },
      { eyebrow: string; title: string; body: string; chat: ChatLine[] },
    ];
  };
  /** "Plus, everything you need to …" — nine icon tiles. */
  gridTail: string;
  grid: { icon: string; title: string; body: string }[];
  faq: FaqItem[];
  ctaTitle: string;
};

/** A line in the chat mock beside the AI rows. */
export type ChatLine =
  | { from: "user"; text: string }
  | { from: "agent"; text: string; bullets?: string[]; cite?: string };

const mod = (id: string) => {
  const m = modules.find((x) => x.id === id);
  if (!m) throw new Error(`feature-pages: unknown module ${id}`);
  return m;
};

export const featurePages: FeaturePage[] = [
  {
    id: "recipes",
    eyebrow: "Recipes in Flavor Studio",
    h1: "Formulate once.",
    tail: "Scale anywhere.",
    /* flavorstudio.com's own opening line for Recipes, kept verbatim. */
    lede: "Finally there is an easy-to-use system built specifically for creating, editing and managing recipes with all of the feature-rich functionality that creative professionals crave.",
    hero: { kind: "asset", asset: productAssets.recipeGrid },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "formulate",
      without: [
        "Formulas live in spreadsheets… and drift between copies",
        "Nobody is sure which version went to production",
        "Scaling a batch means retyping every line",
        "Cost and nutrition get calculated last, or never",
      ],
      with: [
        "One grid: ingredients, %, grams, yield, cost, nutrients",
        "Named versions — V1, Testing, Final — with full history",
        "Batch scaling to any weight or serving count in one step",
        "Cost and nutrition recompute on every keystroke",
      ],
    },
    pillars: {
      title: "The foundation for every",
      tail: "product",
      lede: "Recipes power everything in Flavor Studio, so labels, costs, taste tests and specs stay attached to the formula they came from.",
      adjectives: "Costed. Versioned. Nested.",
      /* All six points flavorstudio.com's Recipes section carries, in their
         own words — including the client's "let's" and their "customizeable".
         The first three have a screenshot that actually shows them (cost
         roll-up, named versions, sub-levels). The last three have none in the
         application design file, so they render the marked placeholder rather
         than borrow a picture of something else. */
      rows: [
        {
          eyebrow: "Real-time",
          title: "Recipe Costing",
          body: "With real-time costing you can view individual ingredient costs, total batch cost, and estimated retail pricing.",
          visual: { kind: "asset", asset: productAssets.recipeCost },
        },
        {
          eyebrow: "History",
          title: "Built-in Versioning",
          body: "Flavor Studio let's you look backward and forward at the entire development history of a recipe.",
          visual: { kind: "asset", asset: productAssets.recipeVersions },
        },
        {
          eyebrow: "Nesting",
          title: "Sub-recipes",
          body: "Assemble component recipes into a main recipe and Flavor Studio will distribute accurate costing and nutrient composition.",
          visual: { kind: "asset", asset: productAssets.recipeSubLevels },
        },
        {
          eyebrow: "Grouping",
          title: "Ingredient groups",
          body: "Use this feature to combine and track a variety of similar ingredients (e.g., spices) into a single row in a recipe.",
          visual: { kind: "asset", asset: productAssets.ingredientGroups },
        },
        {
          eyebrow: "Method",
          title: "Formulation method",
          body: "Flavor Studio lets users choose to formulate by either: Percentage, Quantity, or Baker's Percentage.",
          visual: { kind: "asset", asset: productAssets.formulationMethod },
        },
        {
          eyebrow: "Options",
          title: "Fully customizeable",
          body: "Select the units of measurements (metric, standard, volume), set the number of decimal places (1, 2, 3), and many other options.",
          visual: { kind: "asset", asset: productAssets.formulationUnits },
        },
      ],
    },
    banner: {
      title:
        "Your next SKU is already in motion. Make sure the formula doesn't drift.",
      body: "Join the food and beverage teams who formulate, cost and label from one live grid. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "You focus on flavor,",
      tail: "the AI Agent handles the paperwork",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Answers from your own recipes",
          body: "Ask about cost, nutrition or allergens on any version and get an answer with the recipe, regulation or test it came from cited. When it cannot source an answer, it says so.",
          chat: [
            {
              from: "user",
              text: "Which version of the granola bar has the lowest cost per serving, and why?",
            },
            {
              from: "agent",
              text: "Version “Testing” is $0.41/serving, 11% below V1.",
              bullets: [
                "Oat blend swapped for rolled oats: −$0.03",
                "Honey reduced 2% with brown rice syrup: −$0.02",
              ],
              cite: "Granola Bar · V1 vs Testing · Yield / Cost",
            },
          ],
        },
        {
          eyebrow: "Reformulation ideas",
          title: "Draft versions, never silent edits",
          body: "Ask for a lower-sodium or lower-cost variant and the Agent proposes swaps as a reviewable draft version. A developer approves it — the Agent never changes a formula on its own.",
          chat: [
            { from: "user", text: "Cut sodium 15% without changing texture." },
            {
              from: "agent",
              text: "Drafted “Testing-LowNa”: potassium chloride blend replaces 30% of salt.",
              bullets: [
                "Sodium −16% per serving",
                "Cost +$0.004 per serving",
                "Ready for your review",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    /* Was "get it to market", which described none of the nine tiles below.
       They all hang off the formula: ingredients, labels, costs, allergens,
       yield, tags, taste tests, sharing, publishing. */
    gridTail: "build on the formula",
    grid: [
      {
        icon: "leaves",
        title: "9,000+ USDA ingredients",
        body: "SR28 built in, alongside your own custom ingredients.",
      },
      {
        icon: "doc-detail",
        title: "Nutrition labels",
        body: "FDA and Health Canada panels generated from the formula.",
      },
      {
        icon: "calculator-one",
        title: "Cost assumptions",
        body: "Labour, overhead, packaging and waste defined once.",
      },
      {
        icon: "caution",
        title: "Allergen tagging",
        body: "Carried from the ingredient through to the label.",
      },
      {
        icon: "weight",
        title: "Yield & loss",
        body: "Moisture, fat and processing loss applied automatically.",
      },
      {
        icon: "tag-one",
        title: "Types & tags",
        body: "Organise and filter a large recipe library.",
      },
      {
        icon: "experiment",
        title: "Taste tests",
        body: "Sensory results attached to the exact version.",
      },
      {
        icon: "peoples",
        title: "Sharing & rights",
        body: "Per-user and per-group edit and read rights.",
      },
      {
        icon: "file-pdf-one",
        title: "Publish & export",
        body: "Spec sheets, PDFs and label files from the recipe.",
      },
      /* All six of flavorstudio.com's Recipes points now live in the pillar
         rows above — the page's core section — so none of them is repeated
         here. What stays below is the v2 material that section never had. */
    ],
    faq: [
      {
        q: "Is there a free trial for Recipes?",
        a: "Yes. Every plan starts with a 14-day trial of the full platform — recipes, labels, costing, the AI Agent and every other module — with no credit card required.",
      },
      {
        q: "How is this different from a spreadsheet?",
        a: "A spreadsheet holds numbers; the formulation grid holds the formula. Ingredients come from one governed library, so a cost or allergen change lands everywhere at once, versions are first-class objects with history, and labels, costing and taste tests are generated from the same record instead of retyped into it.",
      },
      {
        q: "Will it work for a two-person startup and a large manufacturer?",
        a: "Both. Nothing demands a full rollout — most teams start with recipes and labels and add projects, taste tests or CRM when they are ready. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to move our formulas in?",
        a: "Most teams import their ingredient library first — from a vendor spec sheet PDF, from the USDA database, or by hand — then rebuild recipes on top. 24/7 support is available by phone, email or in-app chat.",
      },
      {
        q: "What happens when our formulas get complex?",
        a: "Sub-recipes nest to any depth and cost through to the parent, versions branch without limit, and configurable ingredient fields with custom calculations let the grid carry whatever your process needs.",
      },
    ],
    ctaTitle: "Formulate once. Scale anywhere.",
  },

  /* ------------------------------------------------------------ ingredients */
  {
    id: "ingredients",
    eyebrow: "Ingredients in Flavor Studio",
    h1: "One library.",
    tail: "Every recipe follows.",
    lede: "9,000+ USDA ingredients plus your own, governed in one place — so a supplier change or a cost update lands in every recipe, label and spec sheet at once.",
    hero: { kind: "flow", flow: flows.newIngredient },
    contrast: {
      kind: "without-with",
      title: "A better way to know",
      tail: "what's inside",
      without: [
        "Nutrient values retyped from supplier PDFs, one cell at a time",
        "The same ingredient exists five times with five different costs",
        "Allergens tracked in a separate sheet nobody updates",
        "Canadian and French statements written by hand for each label",
      ],
      with: [
        "Vendor spec sheets read by the tool, values pulled straight in",
        "One ingredient record — cost, supplier, nutrients, documents",
        "Allergen flags set once and carried to every label",
        "Canadian label and French statement stored on the ingredient",
      ],
    },
    pillars: {
      title: "The source of truth for",
      tail: "everything you make",
      lede: "Every recipe costs, analyses and labels from the same ingredient library, so the data behind a formula is never a copy of a copy.",
      adjectives: "Complete. Governed. Configurable.",
      rows: [
        {
          eyebrow: "Complete",
          title: "Everything about an ingredient, in one record",
          body: "Basic information, nutrients and allergens, the ingredient statement, certifications and documents, procurement and validation — all on one screen, with a separate Canadian label and French statement where the market needs one.",
          visual: { kind: "asset", asset: productAssets.ingredientLibrary },
        },
        {
          eyebrow: "Governed",
          title: "Supplier data in, retyping out",
          body: "Over 9,000 USDA SR28 ingredients are built in. For your own, the vendor spec-sheet import reads the supplier PDF and pulls the nutrient values into the record, with supplier and cost data attached to the ingredient rather than the recipe.",
          visual: { kind: "asset", asset: productAssets.ingredientNutrients },
        },
        {
          eyebrow: "Configurable",
          title: "The columns your process needs",
          body: "Choose which fields the ingredient grid carries — process step, country of origin, supplier, category — and define custom calculations over them. Density, processing-aid and supplement-label flags are there when you need them.",
          visual: { kind: "still", flow: flows.ingredientFields, step: 2 },
        },
      ],
    },
    banner: {
      title:
        "A cost changes at the supplier. Every recipe should already know.",
      body: "Food and beverage teams keep one governed ingredient library in Flavor Studio and let recipes, labels and specs follow it. 14-day free trial, no credit card.",
    },
    ai: {
      title: "Ask about any ingredient,",
      tail: "get the record it came from",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Allergen and sourcing questions, answered with citations",
          body: "Ask which recipes use an ingredient, what allergens it carries or which supplier document backs a certification. The Agent answers from your own library and names the record it read.",
          chat: [
            {
              from: "user",
              text: "Which of our recipes contain the new almond flour, and what allergens does it add?",
            },
            {
              from: "agent",
              text: "Almond Flour (Supplier B) is used in 3 recipes and adds tree nuts.",
              bullets: [
                "Granola Bar · V1 and Testing",
                "Breakfast Cookie · Final",
                "Contains: tree nuts (almond)",
              ],
              cite: "Ingredient · Almond Flour · Allergens",
            },
          ],
        },
        {
          eyebrow: "Substitutions",
          title: "Swap ideas, proposed as drafts",
          body: "Ask for an alternative with a similar nutrient profile and the Agent proposes candidates from your library with the cost and allergen differences shown. Nothing changes until a developer accepts the draft.",
          chat: [
            {
              from: "user",
              text: "Suggest a nut-free substitute for the almond flour in the Breakfast Cookie.",
            },
            {
              from: "agent",
              text: "Drafted “Final-NutFree” using sunflower seed flour from your library.",
              bullets: [
                "Protein per 100 g within 2 g",
                "Cost +$0.06 per kg of flour",
                "Removes tree-nut declaration",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "trust the data",
    grid: [
      {
        icon: "leaves",
        title: "USDA SR28 built in",
        body: "Over 9,000 ingredients ready to use on day one.",
      },
      {
        icon: "upload",
        title: "Vendor spec-sheet import",
        body: "Nutrient values read from a supplier PDF.",
      },
      {
        icon: "caution",
        title: "Allergen tagging",
        body: "Set on the ingredient, carried to the label.",
      },
      {
        icon: "translate",
        title: "Canadian & French statements",
        body: "A bilingual statement per ingredient.",
      },
      {
        icon: "certificate",
        title: "Certifications & documents",
        body: "Supplier paperwork stored with the ingredient.",
      },
      {
        icon: "truck",
        title: "Procurement data",
        body: "Supplier, cost, yield and storage on the record.",
      },
      {
        icon: "layout-four",
        title: "Configurable fields",
        body: "Choose the columns the grid carries.",
      },
      {
        icon: "formula",
        title: "Custom calculations",
        body: "Defined over your own ingredient fields.",
      },
      {
        icon: "pic",
        title: "Ingredient images",
        body: "Several per ingredient, edited in place.",
      },
    ],
    faq: [
      {
        q: "Is there a free trial for Ingredients?",
        a: "Yes. Every plan starts with a 14-day trial of the full platform, including the USDA library, custom ingredients and the vendor spec-sheet import — no credit card required.",
      },
      {
        q: "How is this different from keeping ingredient data in a spreadsheet?",
        a: "An ingredient here is one governed record that every recipe reads. Update a cost, a supplier or an allergen on the ingredient and every formula, label and spec sheet that uses it follows — nothing is retyped, and nothing drifts between copies.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A two-person startup can start with the USDA library and a handful of custom ingredients; a manufacturer can carry thousands with configurable fields, custom calculations and per-group access rights. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to load our ingredients?",
        a: "Most teams import from vendor spec sheets — the tool reads the PDF and pulls the nutrient values in — or start from the USDA database and adjust. 24/7 support is available by phone, email or in-app chat.",
      },
      {
        q: "What happens when our ingredient data gets complex?",
        a: "Configurable fields let the grid carry whatever your process needs, custom calculations run over those fields, and certifications, documents and procurement data all live on the same record instead of in side files.",
      },
    ],
    ctaTitle: "One library. Every recipe follows.",
  },

  /* ---------------------------------------------------------------- costing */
  {
    id: "costing",
    eyebrow: "Costing in Flavor Studio",
    h1: "Know the margin",
    tail: "before the batch.",
    lede: "Batch cost, container cost and retail price sit beside the formula and move with it — on assumptions you define once for the whole workspace.",
    hero: { kind: "flow", flow: flows.costAssumptions },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "cost a product",
      without: [
        "Cost is a separate spreadsheet, updated after the formula is done",
        "Labour, packaging and freight are guessed differently on every sheet",
        "A supplier price change means re-costing every product by hand",
        "Nobody can say what margin a retail price actually leaves",
      ],
      with: [
        "Batch, container and retail cost live in the recipe sidebar",
        "Assumptions defined once, grouped by category, applied by condition",
        "Edit an assumption and every recipe re-costs",
        "Margin shown against the target retail price",
      ],
    },
    pillars: {
      title: "Costing that moves",
      tail: "with the formula",
      lede: "The cost of a product is a property of its formula, not a document about it. Flavor Studio keeps the two together.",
      adjectives: "Live. Governed. Conditional.",
      rows: [
        {
          eyebrow: "Live",
          title: "Cost recomputes as you formulate",
          body: "Batch size, yield, containers yielded, servings per container and serving weight sit in one panel with the formula. Change an ingredient or a percentage and batch cost, container cost and retail price follow on the same keystroke.",
          visual: { kind: "asset", asset: productAssets.recipeCost },
        },
        {
          eyebrow: "Governed",
          title: "Assumptions defined once, not per sheet",
          body: "Packaging, tolling, freight, labour — each assumption belongs to a category you define, with workspace-level defaults set in Recipes Admin Settings. Add one and it lands in the panel with the cost re-rolled immediately.",
          visual: { kind: "still", flow: flows.costAssumptions, step: 1 },
        },
        {
          eyebrow: "Conditional",
          title: "Only the recipes it should touch",
          body: "Assumptions are applied by condition, so a cold-chain freight cost only reaches the products that ship cold. Edit or clear an assumption by category and see every affected recipe re-cost.",
          visual: { kind: "still", flow: flows.costAssumptions, step: 5 },
        },
      ],
    },
    banner: {
      title:
        "Your retail price is a promise. Make sure the formula can keep it.",
      body: "Teams that cost from the formula see margin before the batch is made, not after the invoice arrives. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "What-if costing,",
      tail: "answered from your own numbers",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Ask what a change would cost",
          body: "Swap an ingredient, change a batch size or a supplier price, and ask what happens to cost per serving and margin. The Agent works from the recipe's own cost panel and cites it.",
          chat: [
            {
              from: "user",
              text: "If cocoa goes up 12%, what happens to margin on the Brownie Bite at $3.49 retail?",
            },
            {
              from: "agent",
              text: "Cost per container rises $0.04; margin drops from 41% to 39%.",
              bullets: [
                "Cocoa is 9% of batch weight",
                "Packaging and freight unchanged",
                "Retail price held at $3.49",
              ],
              cite: "Brownie Bite · Final · Cost panel",
            },
          ],
        },
        {
          eyebrow: "Cost-out ideas",
          title: "Cheaper versions, drafted for review",
          body: "Ask for a lower-cost variant within a nutrient constraint and the Agent proposes swaps from your library as a draft version with the cost delta shown. A developer approves it; the Agent never changes a formula on its own.",
          chat: [
            {
              from: "user",
              text: "Get the Brownie Bite under $0.55 per container without adding sugar.",
            },
            {
              from: "agent",
              text: "Drafted “Final-CostOut”: 20% of cocoa replaced with carob from your library.",
              bullets: [
                "Cost per container $0.53",
                "Sugars per serving unchanged",
                "Awaiting your review",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "price with confidence",
    grid: [
      {
        icon: "calculator-one",
        title: "Batch & container cost",
        body: "Rolled up live in the recipe sidebar.",
      },
      {
        icon: "dollar",
        title: "Retail price & margin",
        body: "Margin shown against a target retail price.",
      },
      {
        icon: "category-management",
        title: "Assumption categories",
        body: "Packaging, tolling, freight — grouped your way.",
      },
      {
        icon: "filter",
        title: "Conditional assumptions",
        body: "Applied only to the recipes they should hit.",
      },
      {
        icon: "config",
        title: "Workspace defaults",
        body: "Set once in Recipes Admin Settings.",
      },
      {
        icon: "weight",
        title: "Yield & servings",
        body: "Batch size, yield, servings and serving weight.",
      },
      {
        icon: "branch-one",
        title: "Cost per version",
        body: "Compare cost across recipe versions.",
      },
      {
        icon: "truck",
        title: "Supplier cost data",
        body: "Cost attached to the ingredient, not the recipe.",
      },
      {
        icon: "table-report",
        title: "Costing reports",
        body: "Across recipes and versions, exportable.",
      },
    ],
    faq: [
      {
        q: "Is there a free trial for Costing?",
        a: "Yes. The 14-day trial includes the full platform — costing, cost assumptions, recipes, labels and every other module — with no credit card required.",
      },
      {
        q: "How is this different from costing in a spreadsheet?",
        a: "The cost lives on the formula, not in a document about it. Ingredient costs come from the library, assumptions are defined once for the workspace and applied by condition, and any change re-costs every affected recipe automatically instead of waiting for someone to update a sheet.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can start with ingredient cost and a packaging assumption; a manufacturer can model tolling, freight and labour by category and condition across hundreds of SKUs. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Ingredient costs are entered on the ingredient — many teams import them from vendor spec sheets — and workspace assumptions are defined once in Recipes Admin Settings. 24/7 support is available by phone, email or in-app chat.",
      },
      {
        q: "What happens when our costing gets complex?",
        a: "Assumptions can be grouped into as many categories as you need and applied by condition, sub-recipes cost through to the parent, and costing reports run across recipes and versions so the whole line can be reviewed at once.",
      },
    ],
    ctaTitle: "Know the margin before the batch.",
  },

  /* --------------------------------------------------------------- versions */
  {
    id: "versions",
    eyebrow: "Versions in Flavor Studio",
    h1: "Iterate freely.",
    tail: "Never lose the original.",
    lede: "Versions are first-class objects: branch a formula, compare nutrition and cost side by side, keep sensory results against the version they scored, and promote the winner.",
    hero: { kind: "asset", asset: productAssets.recipeGrid },
    contrast: {
      kind: "thesis",
      title: "From first bench sample to",
      tail: "final formula",
      words: "Branch. Compare. Score. Promote.",
    },
    pillars: {
      title: "Reformulation with an",
      tail: "audit trail",
      lede: "Reformulation is iterative, and the trail matters as much as the result. Every version knows where it came from and what it changed.",
      adjectives: "Branched. Comparable. Attributable.",
      rows: [
        {
          eyebrow: "Branched",
          title: "Duplicate into as many versions as you need",
          body: "V1, Testing, Final — or whatever your process calls them. Versions are switched from the recipe header, so the original stays exactly as it was while you work on the next one.",
          visual: { kind: "asset", asset: productAssets.recipeVersions },
        },
        {
          eyebrow: "Comparable",
          title: "Nutrition and cost, side by side",
          body: "Compare versions on the numbers that decide them: the nutrients per serving and the cost per batch, container and serving, each computed from the version's own formula and the shared ingredient library.",
          visual: { kind: "asset", asset: productAssets.recipeCost },
        },
        {
          eyebrow: "Attributable",
          title: "Every edit, every score, tied to a version",
          body: "The history tool records each modification, when and by whom. Taste-test results attach to the exact version tasted, so when a version wins, it wins on evidence — and can be promoted without rebuilding it.",
          visual: { kind: "still", flow: flows.tasteTestPublish, step: 1 },
        },
      ],
    },
    banner: {
      title: "The version that went to production should never be a guess.",
      body: "Teams that version in Flavor Studio can show how a formula got where it is, change by change. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Compare versions",
      tail: "in a sentence",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Ask what changed between two versions",
          body: "Mention two versions with @ and ask what differs. The Agent reads both formulas and answers with the ingredient, nutrition and cost differences, citing the versions it compared.",
          chat: [
            {
              from: "user",
              text: "What changed between @Granola Bar V1 and @Granola Bar Final?",
            },
            {
              from: "agent",
              text: "Three ingredient changes; sugars down 2 g per serving, cost down 6%.",
              bullets: [
                "Honey 8% → 6%",
                "Brown rice syrup added at 2%",
                "Rolled oats replace oat blend",
              ],
              cite: "Granola Bar · V1 vs Final · History",
            },
          ],
        },
        {
          eyebrow: "Next version",
          title: "A new branch, drafted from your brief",
          body: "Describe the goal for the next iteration and the Agent drafts a new version with the proposed changes listed. It is a branch for a developer to review, never an edit to the version you are on.",
          chat: [
            {
              from: "user",
              text: "Start a version of the Final that brings fibre to 4 g per serving.",
            },
            {
              from: "agent",
              text: "Drafted “Final-Fibre”: chicory root fibre at 3% in place of part of the oat flour.",
              bullets: [
                "Fibre 4.1 g per serving",
                "Cost +$0.01 per serving",
                "Ready for your review",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "manage change",
    grid: [
      {
        icon: "branch-one",
        title: "Named versions",
        body: "V1, Testing, Final — switched from the header.",
      },
      {
        icon: "history",
        title: "Full edit history",
        body: "Every modification, when and by whom.",
      },
      {
        icon: "contrast",
        title: "Side-by-side comparison",
        body: "Nutrition and cost across versions.",
      },
      {
        icon: "experiment",
        title: "Sensory per version",
        body: "Taste-test results tied to the version scored.",
      },
      {
        icon: "ranking",
        title: "Promote a winner",
        body: "Without rebuilding the formula.",
      },
      {
        icon: "copy",
        title: "Duplicate freely",
        body: "As many versions as a project needs.",
      },
      {
        icon: "doc-detail",
        title: "Labels per version",
        body: "Each version publishes its own panel.",
      },
      {
        icon: "peoples",
        title: "Rights per recipe",
        body: "Per-user and per-group edit and read rights.",
      },
      {
        icon: "folder-open",
        title: "Linked to projects",
        body: "Tasks reference the versions they affect.",
      },
    ],
    faq: [
      {
        q: "Is versioning included in the free trial?",
        a: "Yes. Versions are part of Recipes, and the 14-day trial covers the full platform with no credit card required.",
      },
      {
        q: "How is this different from saving copies of a spreadsheet?",
        a: "A copy is a file with no relationship to its parent. A version here knows its origin, carries its own edit history, computes its own nutrition and cost from the shared library, and keeps the taste tests that scored it — so versions can be compared and promoted rather than reconciled.",
      },
      {
        q: "Will it work for a two-person team and a large R&D group?",
        a: "Both. Versions cost nothing to create, history is recorded automatically, and per-user and per-group rights decide who can edit which recipe. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to start versioning?",
        a: "There is nothing to set up — duplicating a recipe into a new version is a single action from the recipe header, and history is recorded from the first edit.",
      },
      {
        q: "What happens when a formula has dozens of versions?",
        a: "Name them, compare any two on nutrition and cost, filter taste-test results by version, and promote the one that wins. The originals stay intact and attributable throughout.",
      },
    ],
    ctaTitle: "Iterate freely. Never lose the original.",
  },

  /* --------------------------------------------------------------- labeling */
  {
    id: "labeling",
    eyebrow: "Nutrition labels in Flavor Studio",
    h1: "Compliant labels,",
    tail: "regenerated with the formula.",
    /* flavorstudio.com's own opening line for Nutritional Analysis, verbatim. */
    lede: "All users can generate FDA compliant nutritional labels directly in Flavor Studio without the need for other external software systems.",
    hero: { kind: "flow", flow: flows.publishAggregate },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "label",
      without: [
        "Nutrition values calculated in one tool and retyped into another",
        "A serving-size change means rebuilding the panel by hand",
        "Canadian bilingual panels done separately, and differently",
        "Packaging gets a low-resolution image of the label",
      ],
      with: [
        "The panel is generated from the formula's analysed values",
        "Change the recipe or serving size and the label recalculates",
        "Nutrition Facts / Valeur nutritive from the same record",
        "High-resolution vector PDF straight to the packaging designer",
      ],
    },
    pillars: {
      title: "Formula in.",
      tail: "Label out.",
      lede: "Nutritional analysis runs off the ingredient data and the yield, and the panel follows — in the format your market requires.",
      adjectives: "Automatic. Formatted. Exportable.",
      /* Core section, so these carry flavorstudio.com's own Nutritional
         Analysis items verbatim, each matched to the screenshot that shows
         it. "Empower all users" has no screenshot of its own and stays in the
         icon grid below. */
      rows: [
        {
          eyebrow: "Automatic",
          title: "Automatic statements",
          body: "Ingredient declarations and allergen statements are automatically generated to save users time but also easily modified.",
          visual: { kind: "asset", asset: productAssets.labelStatement },
        },
        {
          eyebrow: "Formatted",
          title: "Layout formats",
          body: "Flavor Studio exports nutritional labels to: Vertical, Horizontal, Simplified, and Side-by-Side options.",
          visual: { kind: "asset", asset: productAssets.nutritionLabelFormats },
        },
        {
          eyebrow: "Exportable",
          title: "Artwork exports",
          body: "Choose between low resolution PNG files for internal review and high resolution PDF files for packaging designers.",
          visual: { kind: "asset", asset: productAssets.publishExport },
        },
        {
          eyebrow: "Everyone",
          title: "Empower all users",
          body: "All Flavor Studio users receive access to these nutrition features - not limited to only a single shared computer.",
          visual: { kind: "asset", asset: productAssets.adminUsers },
        },
      ],
    },
    banner: {
      title:
        "The formula changed on Tuesday. The label on the shelf should know.",
      body: "Teams that label from the formula stop maintaining two versions of the truth. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask the label",
      tail: "why",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Label questions answered from the formula",
          body: "Ask why a value reads what it does, what drives sodium on a version, or which ingredient carries an allergen onto the declaration. The Agent answers from the recipe's analysed values and names the source.",
          chat: [
            {
              from: "user",
              text: "Why does the Testing version show 8% DV sodium when V1 showed 6%?",
            },
            {
              from: "agent",
              text: "Sodium rose 45 mg per serving; the sea-salt topping went from 0.5% to 0.9%.",
              bullets: [
                "Sea salt topping: +40 mg",
                "Baking soda unchanged",
                "Serving size unchanged at 40 g",
              ],
              cite: "Granola Bar · Testing · Nutrition panel",
            },
          ],
        },
        {
          eyebrow: "Pre-publish check",
          title: "A review before you publish",
          body: "Ask the Agent to look over a panel before it goes to packaging. It flags what it finds — an ingredient statement out of order, a missing declaration — as suggestions for you to act on. It does not change the label.",
          chat: [
            {
              from: "user",
              text: "Check the Final label before I send it to packaging.",
            },
            {
              from: "agent",
              text: "Two things to look at before publishing.",
              bullets: [
                "Ingredient statement lists sunflower oil before oats — oats weigh more",
                "“Contains: tree nuts” is present; the almond flour is declared",
              ],
              cite: "Granola Bar · Final · Ingredient statement",
            },
          ],
        },
      ],
    },
    gridTail: "pass review",
    grid: [
      {
        icon: "doc-detail",
        title: "FDA & Health Canada",
        body: "US and Canadian panels, fully compliant.",
      },
      {
        icon: "translate",
        title: "Bilingual Canadian panel",
        body: "Nutrition Facts / Valeur nutritive.",
      },
      {
        icon: "layout-four",
        title: "Six layouts",
        body: "Vertical, tabular, side-by-side, linear, dual, aggregate.",
      },
      {
        icon: "layers",
        title: "Aggregate panels",
        body: "One panel built from several recipes.",
      },
      {
        icon: "measuring-cup",
        title: "Per serving or per 100 g",
        body: "Quantities shown the way the market requires.",
      },
      {
        icon: "percentage",
        title: "%Daily Values",
        body: "Vitamins, minerals and fatty acids per panel.",
      },
      {
        icon: "caution",
        title: "Allergen declarations",
        body: "Carried from the ingredient to the label.",
      },
      {
        icon: "refresh",
        title: "Automatic recalculation",
        body: "When the recipe or serving size changes.",
      },
      {
        icon: "file-pdf-one",
        title: "Vector PDF export",
        body: "High resolution for the packaging designer.",
      },
      /* All four of flavorstudio.com's Nutritional Analysis points now live in
         the pillar rows above, so none is repeated here. Their "Layout
         formats" line names four layouts; the "Six layouts" tile above it
         stays, because the application design file shows six. */
    ],
    faq: [
      {
        q: "Is there a free trial for nutrition labels?",
        a: "Yes. The 14-day trial includes the full label engine — every layout, US and Canadian formats and the export options — with no credit card required.",
      },
      {
        q: "How is this different from a standalone labelling tool?",
        a: "The label is generated from the same recipe and ingredient library you formulate and cost in, so nothing is retyped. Change the formula or the serving size and the panel recalculates; the ingredient statement and allergen declaration come from the same record.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can publish its first FDA panel from a single recipe; a manufacturer can run aggregate panels across a line and hold layouts consistent through the Publish Designer. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to get a label out?",
        a: "Once a recipe has its ingredients and yield, a panel is one publish away: choose content, layout, region and file type, preview it live and export.",
      },
      {
        q: "What happens with complicated labels — bilingual, multi-product, supplements?",
        a: "Canadian bilingual panels, aggregate layouts built from several recipes, Supplement Facts style and dual-column layouts are all supported, with vitamins, minerals and %Daily Values controlled per panel.",
      },
    ],
    ctaTitle: "Compliant labels, regenerated with the formula.",
  },

  /* ----------------------------------------------------------------- claims */
  {
    id: "claims",
    eyebrow: "Nutrient content claims in Flavor Studio",
    h1: "Know which claims",
    tail: "you can make.",
    lede: "“Good source of fibre”, “low sodium”, “reduced fat” — each has a threshold in the regulation. Flavor Studio checks the formula against them and shows the actual value beside every claim.",
    hero: { kind: "flow", flow: flows.claims },
    contrast: {
      kind: "thesis",
      title: "From analysed value to",
      tail: "front-of-pack",
      words: "Select. Check. Qualify. Publish.",
    },
    pillars: {
      title: "Claims checked against the",
      tail: "formula, not by hand",
      lede: "Every claim is evaluated on the recipe's own analysed values, with the number that decides it shown beside the threshold.",
      adjectives: "Evaluated. Explicit. Publishable.",
      rows: [
        {
          eyebrow: "Evaluated",
          title: "Actual value beside the threshold",
          body: "Pick the nutrients to check and each claim is evaluated against the recipe's analysed values, with the reference amount and %Daily Value group applied per claim. The number and the threshold sit on the same line.",
          visual: { kind: "still", flow: flows.claims, step: 0 },
        },
        {
          eyebrow: "Explicit",
          title: "Qualifying and non-qualifying, marked clearly",
          body: "Claims the product qualifies for are marked; the ones it does not are marked too, with the gap visible. Hover a claim to see the wording that qualifies, so what goes on the pack is the regulation's phrase, not a paraphrase.",
          visual: { kind: "still", flow: flows.claims, step: 1 },
        },
        {
          eyebrow: "Publishable",
          title: "Published with the label, or on their own",
          body: "Add more nutrients and each is checked against the formula; clear the set and start again for a different market. Qualifying claims publish alongside the nutrition panel or as their own document.",
          visual: { kind: "still", flow: flows.claims, step: 2 },
        },
      ],
    },
    banner: {
      title:
        "A claim on the pack is a promise to the regulator. Check it against the formula.",
      body: "Teams in Flavor Studio see which claims qualify as they formulate, not after the artwork is done. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask why a claim",
      tail: "fails",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "The gap, and what drives it",
          body: "Ask why a product misses a claim and the Agent answers with the analysed value, the threshold and the ingredients contributing most — cited to the claim check and the recipe.",
          chat: [
            {
              from: "user",
              text: "Why doesn't the Veggie Crisp qualify for “low sodium”?",
            },
            {
              from: "agent",
              text: "Sodium is 165 mg per reference amount; “low sodium” requires 140 mg or less.",
              bullets: [
                "Seasoning blend contributes 120 mg",
                "Sea salt contributes 40 mg",
                "Gap: 25 mg per reference amount",
              ],
              cite: "Veggie Crisp · Testing · Nutrient Content Claims",
            },
          ],
        },
        {
          eyebrow: "Reach a claim",
          title: "A version that qualifies, drafted for review",
          body: "Ask the Agent to get a product under a threshold and it drafts a version with the swaps it proposes and the resulting value. A developer reviews it and the claim is re-checked on the draft.",
          chat: [
            {
              from: "user",
              text: "Draft a version of the Veggie Crisp that qualifies for “low sodium”.",
            },
            {
              from: "agent",
              text: "Drafted “Testing-LowNa”: seasoning blend reduced 15%, potassium chloride added.",
              bullets: [
                "Sodium 132 mg per reference amount",
                "Qualifies for “low sodium” on the draft",
                "Awaiting your review",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "claim with confidence",
    grid: [
      {
        icon: "check-one",
        title: "Claim evaluation",
        body: "Against the recipe's own analysed values.",
      },
      {
        icon: "contrast",
        title: "Actual vs threshold",
        body: "The number and the limit on one line.",
      },
      {
        icon: "flag",
        title: "Qualifying marked",
        body: "Qualifying and non-qualifying claims made clear.",
      },
      {
        icon: "scale-one",
        title: "Reference amounts",
        body: "Applied per claim, with the %DV group.",
      },
      {
        icon: "quote",
        title: "Qualifying wording",
        body: "The phrase the regulation allows, on hover.",
      },
      {
        icon: "filter",
        title: "Nutrient selection",
        body: "Check the nutrients that matter to this product.",
      },
      {
        icon: "doc-detail",
        title: "Published with the label",
        body: "Or on their own as a separate document.",
      },
      {
        icon: "branch-one",
        title: "Per version",
        body: "Claims re-checked on every version.",
      },
      {
        icon: "refresh",
        title: "Always current",
        body: "Re-evaluated when the formula changes.",
      },
    ],
    faq: [
      {
        q: "Are nutrient content claims included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including claim checks, with no credit card required.",
      },
      {
        q: "How is this different from checking claims by hand?",
        a: "The check runs on the recipe's analysed values with the reference amount and %DV group applied per claim, so the actual number sits beside the threshold. There is no transcription step, and the check is repeated on every version automatically.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can check the three claims it wants to make on one product; a manufacturer can run the full set across a line and publish qualifying claims with each label. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to check a product?",
        a: "Select the nutrients and the claims are evaluated immediately from the recipe's existing analysis — there is nothing else to enter.",
      },
      {
        q: "What happens when claims get complicated?",
        a: "Each claim carries its own reference amount and %Daily Value group, more nutrients can be added to a check at any time, and the results publish alongside the label or on their own for regulatory review.",
      },
    ],
    ctaTitle: "Know which claims you can make.",
  },

  /* --------------------------------------------------------------- designer */
  {
    id: "designer",
    eyebrow: "Publish Designer in Flavor Studio",
    h1: "Spec sheets that look",
    tail: "the same every time.",
    lede: "A real layout canvas for the documents that leave your building. Drag the elements a spec sheet needs onto the page, style them, save the template and apply it across products.",
    hero: { kind: "asset", asset: productAssets.labelDesigner },
    contrast: {
      kind: "thesis",
      title: "From recipe data to",
      tail: "a finished document",
      words: "Drag. Style. Template. Publish.",
    },
    pillars: {
      title: "Design once,",
      tail: "publish everywhere",
      lede: "Publish Designer and Spec Designer put the recipe's own data on a page you control — so every output carries your layout and your logo.",
      adjectives: "Visual. Consistent. Reusable.",
      rows: [
        {
          eyebrow: "Visual",
          title: "A canvas, not a form",
          body: "Elements for the recipe, procedure, notes, ingredient statement, nutrition label, allergens, may-contain, composition, images and analytics drag onto pages with zoom and fit controls. Add your own logo and images as custom elements.",
          visual: { kind: "asset", asset: productAssets.labelDesigner },
        },
        {
          eyebrow: "Consistent",
          title: "Every element styled by an inspector",
          body: "Position, typography, layout and box style are set per element in the inspector, with a header and footer toggled per template — so the spec sheet for product forty looks like the spec sheet for product one.",
          visual: { kind: "asset", asset: productAssets.designerInspector },
        },
        {
          eyebrow: "Reusable",
          title: "Named templates, applied across products",
          body: "Save a layout as a template for one recipe or reuse it across the catalogue. Print directly, or publish through the export formats — the published output is laid out through the template you designed.",
          visual: { kind: "asset", asset: productAssets.designerTemplates },
        },
      ],
    },
    banner: {
      title: "The customer sees the spec sheet, not the spreadsheet behind it.",
      body: "Teams design their documents once in Flavor Studio and publish every product through the same template. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Draft the document,",
      tail: "from the data it already has",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "What belongs on this spec sheet?",
          body: "Ask which elements a customer's requirements call for and the Agent answers from the requirements form and the recipe — listing what is available and what is still missing, with the sources cited.",
          chat: [
            {
              from: "user",
              text: "What does the Northwind spec sheet need that the Final recipe doesn't have yet?",
            },
            {
              from: "agent",
              text: "Two required items are missing on the recipe.",
              bullets: [
                "Shelf-life statement — not entered in Notes",
                "Country of origin — empty on 2 ingredients",
                "Allergen and nutrition elements are complete",
              ],
              cite: "Northwind · Customer Requirements · Section 3",
            },
          ],
        },
        {
          eyebrow: "Draft text",
          title: "Notes and procedure text, proposed",
          body: "Ask for a first draft of a procedure note or a product description for the sheet and the Agent proposes text from the recipe's steps. You paste what you accept — it does not edit the template.",
          chat: [
            {
              from: "user",
              text: "Draft a two-sentence procedure summary for the Granola Bar spec sheet.",
            },
            {
              from: "agent",
              text: "Here is a draft from the recipe's processing steps.",
              bullets: [
                "Dry ingredients blended, binder heated and folded in",
                "Pressed to 12 mm, baked, cooled and cut to 40 g bars",
              ],
              cite: "Granola Bar · Final · Processing steps",
            },
          ],
        },
      ],
    },
    gridTail: "ship the document",
    grid: [
      {
        icon: "drag",
        title: "Drag-and-drop canvas",
        body: "Pages, zoom and fit controls.",
      },
      {
        icon: "components",
        title: "Recipe elements",
        body: "Recipe, procedure, notes, label, allergens, composition.",
      },
      {
        icon: "pic",
        title: "Custom elements",
        body: "Your own logo and images on the page.",
      },
      {
        icon: "edit",
        title: "Design inspector",
        body: "Position, typography, layout and box style.",
      },
      {
        icon: "layout-one",
        title: "Header & footer",
        body: "Toggled per template.",
      },
      {
        icon: "bookmark",
        title: "Named templates",
        body: "Per recipe, or reused across products.",
      },
      {
        icon: "printer",
        title: "Print directly",
        body: "Or publish to the export formats.",
      },
      {
        icon: "doc-detail",
        title: "Label element",
        body: "The generated panel placed on the page.",
      },
      {
        icon: "analysis",
        title: "Analytics element",
        body: "Nutritional analysis laid out with the rest.",
      },
    ],
    faq: [
      {
        q: "Is Publish Designer included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including the Publish Designer and Spec Designer, with no credit card required.",
      },
      {
        q: "How is this different from pasting recipe data into a Word template?",
        a: "The elements on the canvas are live: the label, ingredient statement, allergens and analysis come from the recipe itself, so when the formula changes the published document follows. The layout is a saved template, not a file someone has to keep formatted.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can design one spec sheet and reuse it; a manufacturer can hold several templates — customer-facing, co-manufacturer, internal — and apply each across the catalogue. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to build a template?",
        a: "Dragging the standard elements onto a page and setting the header, footer and logo is the work of an afternoon; every product after that publishes through it.",
      },
      {
        q: "What happens when documents get complex?",
        a: "Multiple pages, per-element styling, custom elements for your own images, and separate named templates per recipe or customer type keep complex documents manageable.",
      },
    ],
    ctaTitle: "Spec sheets that look the same every time.",
  },

  /* ------------------------------------------------------------ taste-tests */
  {
    id: "taste-tests",
    eyebrow: "Taste Tests in Flavor Studio",
    h1: "Sensory data that",
    tail: "flows back into the formula.",
    /* flavorstudio.com's own opening line for Taste Test, verbatim —
       including their "to collective objective data" wording. */
    lede: "Flavor Studio includes the framework to build convenient online surveys for companies to collective objective data and/or metrics to guide the product development process.",
    hero: { kind: "flow", flow: flows.tasteTestPublish },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "test",
      without: [
        "Score sheets collected on paper and typed up later",
        "Nobody is sure which version the panel actually tasted",
        "Purchase intent lives in a different survey tool",
        "The winning sample's data has to be reconstructed",
      ],
      with: [
        "Internal panels and consumer surveys run in the same module",
        "Results tied to the exact recipe version tested",
        "Purchase intent captured with the sensory scores",
        "Attribute scores compared side by side across versions",
      ],
    },
    pillars: {
      title: "Test what you made,",
      tail: "keep what you learned",
      lede: "Every test knows the version it scored, so the result is evidence about a formula rather than a number in a folder.",
      adjectives: "Open. Structured. Analysed.",
      /* Core section, carrying flavorstudio.com's three Taste Test items
         verbatim — including their "to collective objective data" phrasing in
         the page lede above. All three moved up, so the icon grid below no
         longer repeats them. */
      rows: [
        {
          eyebrow: "Open",
          title: "Surveys",
          body: "Build sensory or consumer questionnaires depending on test objectives.",
          visual: { kind: "asset", asset: productAssets.tasteSurvey },
        },
        {
          eyebrow: "Unrestricted",
          title: "Respondents",
          body: "Choose anyone to participate without restrictions: other licensed users, fellow company employees or external customers (CLT).",
          visual: { kind: "asset", asset: productAssets.tasteRespondents },
        },
        {
          eyebrow: "Analysed",
          title: "Data analysis",
          body: "Visual reporting of results combines mean scores and modal distribution on simple to interpret infographics.",
          visual: { kind: "asset", asset: productAssets.tasteResults },
        },
      ],
    },
    banner: {
      title: "The panel liked sample B. Make sure everyone knows which B.",
      body: "Teams that test in Flavor Studio keep every score attached to the version it came from. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask the panel",
      tail: "what it thought",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Results summarised, with the test cited",
          body: "Ask how a version scored, which attribute separated two samples or how purchase intent moved between rounds. The Agent reads the tests attached to the recipe and cites them.",
          chat: [
            {
              from: "user",
              text: "How did the Testing version score against V1 on sweetness and purchase intent?",
            },
            {
              from: "agent",
              text: "Testing scored lower on sweetness and higher on purchase intent.",
              bullets: [
                "Sweetness 6.1 vs 7.4 on a 9-point scale",
                "Would buy: 62% vs 48% of 21 tasters",
                "Texture scores within 0.3",
              ],
              cite: "Panel 14 · Granola Bar · V1 vs Testing",
            },
          ],
        },
        {
          eyebrow: "Next round",
          title: "A version that answers the feedback",
          body: "Ask the Agent to act on the panel's comments and it drafts a version with proposed changes and the reason for each. A developer decides what goes to the next round.",
          chat: [
            {
              from: "user",
              text: "The panel found Testing too sweet but liked the crunch. Draft the next round.",
            },
            {
              from: "agent",
              text: "Drafted “Testing-R2”: honey reduced 1%, oat percentage held for crunch.",
              bullets: [
                "Sugars −1.2 g per serving",
                "Texture-driving ingredients unchanged",
                "Awaiting your review",
              ],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "run better panels",
    grid: [
      {
        icon: "peoples",
        title: "Internal panels",
        body: "Your own team, scored in the module.",
      },
      {
        icon: "user",
        title: "Consumer surveys",
        body: "External tasters, same structure.",
      },
      {
        icon: "contrast",
        title: "Triangle & preference",
        body: "Blind tests built in.",
      },
      {
        icon: "ranking",
        title: "Attribute scoring",
        body: "Compared side by side across versions.",
      },
      {
        icon: "shopping-bag",
        title: "Purchase intent",
        body: "Captured with the sensory scores.",
      },
      {
        icon: "tag-one",
        title: "Tags & verified tags",
        body: "Filter across tests and recipes.",
      },
      {
        icon: "branch-one",
        title: "Tied to the version",
        body: "Results attached to the exact recipe tested.",
      },
      {
        icon: "file-pdf-one",
        title: "PDF reports",
        body: "Summary, comprehensive or shelf life.",
      },
      {
        icon: "filter",
        title: "Filter by taster",
        body: "And by product version, per report.",
      },
      /* Respondents, Surveys and Data analysis moved up into the pillar rows
         — the page's core section — so they are not repeated here. */
    ],
    faq: [
      {
        q: "Are Taste Tests included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including panels, surveys and reports, with no credit card required.",
      },
      {
        q: "How is this different from a survey tool and a spreadsheet?",
        a: "Every test is attached to the recipe version it scored, so results compare across versions without matching files by hand, purchase intent sits with the sensory scores, and reports publish straight from the test.",
      },
      {
        q: "Will it work for a small team and a sensory department?",
        a: "Both. A startup can run a five-person internal panel; a sensory department can run blind triangle tests and consumer surveys across a line and filter years of tests by tag. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to run a first test?",
        a: "Set up the test against the versions to be tasted, add the tasters, score — and publish the report from the same screen.",
      },
      {
        q: "What happens when we run many tests?",
        a: "Filtering across tests, tags and verified tags keeps the library navigable, and every test stays attached to its version so history is preserved as formulas move on.",
      },
    ],
    ctaTitle: "Sensory data that flows back into the formula.",
  },

  /* --------------------------------------------------------------- projects */
  {
    id: "projects",
    eyebrow: "Projects in Flavor Studio",
    h1: "Launches move through",
    tail: "stage gates, not inboxes.",
    /* flavorstudio.com's own opening line for Project Management, verbatim. */
    lede: "Organize all aspects of a project's life cycle and foster collaboration with a company's most important resources - its people.",
    hero: { kind: "asset", asset: productAssets.projectsOverview },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "launch",
      without: [
        "The brief is an email thread with six attachments",
        "Status is whatever was said in the last meeting",
        "Tasks refer to “the new version” and nobody knows which",
        "Time spent on the launch is a guess at the end",
      ],
      with: [
        "The brief lives with the project",
        "Stage gates say exactly where a launch stands",
        "Tasks linked to the specific recipes and versions they affect",
        "Time and expenses logged against the project as it runs",
      ],
    },
    pillars: {
      title: "From concept to shelf,",
      tail: "in one place",
      lede: "A project in Flavor Studio is connected to the recipes, the people and the hours it involves — so visibility does not depend on a status meeting.",
      adjectives: "Teamed. Tracked. Shared.",
      /* All five points flavorstudio.com's Project Management section carries,
         in their own words and their order. Only "Monitor activities" has a
         screen that shows it; the rest render the marked placeholder. Our own
         "Reported without a status meeting" row was dropped to keep the count
         theirs — reporting is still covered by the Reports tile in the grid
         below and by the Reports module page. */
      rows: [
        {
          eyebrow: "Teams",
          title: "Create teams",
          body: "Assemble groups of people that will work together towards driving a project to successful completion.",
          visual: { kind: "asset", asset: productAssets.adminUsers },
        },
        {
          eyebrow: "Files",
          title: "File storage",
          body: "Secure cloud-based repository centralizes file storage for easy access to all project-related documents.",
          visual: { kind: "asset", asset: productAssets.projectFiles },
        },
        {
          eyebrow: "Progress",
          title: "Monitor activities",
          body: "Task management provides clear visibility into a project's progress and helps to identify any roadblocks.",
          visual: { kind: "asset", asset: productAssets.projectTimeline },
        },
        {
          eyebrow: "Discussion",
          title: "Message board",
          body: "Keep team member communication concisely organized in a single location and keep abreast of status updates.",
          visual: { kind: "asset", asset: productAssets.projectMessages },
        },
        {
          eyebrow: "Deadlines",
          title: "Reminders",
          body: "Never miss an important upcoming deadline with courteous emails sent before tasks are due.",
          visual: { kind: "illustration", id: "reminder" },
        },
      ],
    },
    banner: {
      title:
        "Your next launch is already in motion. Make sure nothing waits on an inbox.",
      body: "Teams that run launches in Flavor Studio keep the brief, the recipes and the hours in one project. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask where the launch",
      tail: "stands",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Status from the project, not from memory",
          body: "Ask which gate a launch is at, what is open, and which recipe versions the remaining tasks depend on. The Agent answers from the project record and cites it.",
          chat: [
            {
              from: "user",
              text: "Where is the Spring Snack launch, and what's blocking the next gate?",
            },
            {
              from: "agent",
              text: "At Gate 3 (Pilot). Two tasks are open before Gate 4.",
              bullets: [
                "Shelf-life test — due Friday, on Granola Bar Final",
                "Packaging artwork — waiting on the vector PDF label",
              ],
              cite: "Spring Snack · Project · Stage gates",
            },
          ],
        },
        {
          eyebrow: "Briefs",
          title: "A task list drafted from the brief",
          body: "Paste a brief and ask for the tasks it implies. The Agent proposes a list against your stage gates, linked to the recipes it mentions, for a project lead to accept or edit before anything is created.",
          chat: [
            {
              from: "user",
              text: "Draft the Gate 2 tasks for the Spring Snack brief.",
            },
            {
              from: "agent",
              text: "Proposed 4 tasks for Gate 2 (Bench).",
              bullets: [
                "Bench samples of 3 versions — Granola Bar",
                "Internal panel on the 3 versions",
                "Preliminary cost on the preferred version",
                "Claim check: “good source of fibre”",
              ],
              cite: "Proposal only — no tasks created",
            },
          ],
        },
      ],
    },
    gridTail: "ship the product",
    grid: [
      {
        icon: "flag",
        title: "Stage gates",
        body: "Concept to shelf, in your own stages.",
      },
      {
        icon: "link",
        title: "Tasks linked to recipes",
        body: "To the specific versions they affect.",
      },
      {
        icon: "notebook",
        title: "Briefs on the project",
        body: "Not in an email thread.",
      },
      {
        icon: "calendar-three",
        title: "Project Timeline",
        body: "Gantt view of the whole launch.",
      },
      {
        icon: "all-application",
        title: "Project Board",
        body: "Tasks as cards, by stage.",
      },
      {
        icon: "time",
        title: "Timesheet",
        body: "Hours and expenses logged to the project.",
      },
      {
        icon: "peoples",
        title: "Roles & groups",
        body: "User privileges and defined roles.",
      },
      {
        icon: "chart-histogram",
        title: "Reports",
        body: "Project and stage-gate reporting.",
      },
      {
        icon: "user-business",
        title: "CRM link",
        body: "Opportunities tied to development projects.",
      },
      /* All five of flavorstudio.com's Project Management points now live in
         the pillar rows above, so none is repeated here. "Due dates" stays:
         it is not one of their points — it is what the application design
         file actually shows on tasks and sub-tasks. */
      {
        icon: "alarm-clock",
        title: "Due dates",
        body: "On tasks and sub-tasks, visible on the board.",
      },
      /* Create teams and Monitor activities moved up into the pillar rows —
         the page's core section — so they are not repeated here. */
    ],
    faq: [
      {
        q: "Are Projects included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform — projects, timeline, board, timesheet and reports — with no credit card required.",
      },
      {
        q: "How is this different from a general project-management tool?",
        a: "Tasks here link to the recipes and versions they affect, hours are logged against the project from the same system the formula lives in, and stage gates and reports are built for product launches rather than adapted from software sprints.",
      },
      {
        q: "Will it work for a two-person team and a large R&D group?",
        a: "Both. A small team can run one launch on a board; a larger group can gate dozens of projects, assign roles and groups, and report across all of them. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Define the stages your process uses, add the people, and open the first project. There is nothing to integrate — recipes, timesheet and CRM are already in the same system.",
      },
      {
        q: "What happens when we run many launches at once?",
        a: "The timeline shows every launch on one schedule with dependencies, the board gives each team its daily view, and project and stage-gate reports answer management's questions across the portfolio.",
      },
    ],
    ctaTitle: "Launches move through stage gates, not inboxes.",
  },

  /* --------------------------------------------------------------- timeline */
  {
    id: "timeline",
    eyebrow: "Project Timeline in Flavor Studio",
    h1: "See where a slip",
    tail: "actually lands.",
    lede: "The schedule view of a launch: what happens when, what depends on what, and full Gantt reporting for the review meeting.",
    hero: { kind: "asset", asset: productAssets.projectTimeline },
    contrast: {
      kind: "thesis",
      title: "From a list of dates to",
      tail: "a schedule you can trust",
      words: "Plan. Depend. Shift. Report.",
    },
    pillars: {
      title: "The launch,",
      tail: "on one schedule",
      lede: "Stage gates, milestones and dependencies across the whole project, shared with everyone who has access to it.",
      adjectives: "Scheduled. Dependent. Reportable.",
      rows: [
        {
          eyebrow: "Scheduled",
          title: "Gates and milestones on a single timeline",
          body: "Every stage gate and milestone of a launch on one Gantt timeline, so the plan and the reality can be read in the same view — by the people doing the work and the people waiting on it.",
          visual: { kind: "asset", asset: productAssets.projectGantt },
        },
        {
          eyebrow: "Dependent",
          title: "Dependencies made visible",
          body: "What waits on what is drawn, not remembered. When the shelf-life test moves, the packaging artwork that depends on it moves with it, and the gate that depends on both shows the new date.",
          visual: { kind: "illustration", id: "dependencies" },
        },
        {
          eyebrow: "Reportable",
          title: "Full Gantt reporting for review meetings",
          body: "Report the timeline as it stands for the review, alongside time and expense reporting from the timesheet — the same underlying data the board shows for daily work.",
          visual: { kind: "asset", asset: productAssets.reports },
        },
      ],
    },
    banner: {
      title:
        "The review meeting should start with the schedule, not a search for it.",
      body: "Teams that plan launches in Flavor Studio walk into reviews with the Gantt already reported. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask the schedule",
      tail: "what moves",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "The knock-on effect of a slip",
          body: "Ask what a late task does to the launch date and the Agent traces the dependencies on the timeline and answers with the gates and milestones affected, cited to the project.",
          chat: [
            {
              from: "user",
              text: "If the shelf-life test slips a week, what else moves on Spring Snack?",
            },
            {
              from: "agent",
              text: "Two dependent items and Gate 4 move by a week.",
              bullets: [
                "Packaging artwork sign-off → 24 Oct",
                "Pilot run booking → 28 Oct",
                "Gate 4 (Launch readiness) → 31 Oct",
              ],
              cite: "Spring Snack · Project Timeline · Dependencies",
            },
          ],
        },
        {
          eyebrow: "Re-planning",
          title: "A revised schedule, proposed",
          body: "Ask for a plan that protects the launch date and the Agent proposes which tasks could run in parallel or start earlier, as a suggestion for the project lead — the timeline itself is not changed.",
          chat: [
            {
              from: "user",
              text: "How could we hold the 31 Oct launch date anyway?",
            },
            {
              from: "agent",
              text: "Two options that keep Gate 4 on 24 Oct.",
              bullets: [
                "Start packaging artwork from the Testing label now; swap in Final's PDF later",
                "Book the pilot run before the shelf-life result, with a cancel option",
              ],
              cite: "Suggestion only — timeline unchanged",
            },
          ],
        },
      ],
    },
    gridTail: "keep the date",
    grid: [
      {
        icon: "timeline",
        title: "Gantt timeline",
        body: "Across the whole project.",
      },
      {
        icon: "flag",
        title: "Stage gates & milestones",
        body: "On a single schedule.",
      },
      {
        icon: "link",
        title: "Dependencies",
        body: "Between tasks, made visible.",
      },
      {
        icon: "table-report",
        title: "Gantt reporting",
        body: "For review meetings.",
      },
      {
        icon: "share",
        title: "Shared timeline",
        body: "With everyone who has project access.",
      },
      {
        icon: "all-application",
        title: "Project Board",
        body: "The same data, for daily work.",
      },
      {
        icon: "time",
        title: "Timesheet",
        body: "Hours logged against the same project.",
      },
      {
        icon: "folder-open",
        title: "Projects",
        body: "Briefs and tasks tied to recipes.",
      },
      {
        icon: "peoples",
        title: "Roles & groups",
        body: "Who can see and edit the plan.",
      },
    ],
    faq: [
      {
        q: "Is the Project Timeline included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including projects, timeline, board and reports, with no credit card required.",
      },
      {
        q: "How is this different from a Gantt chart in a spreadsheet?",
        a: "The timeline is a view of the same project the board and timesheet use, so dates, dependencies, tasks and hours stay in one record. It reports directly, without being redrawn for the meeting.",
      },
      {
        q: "Will it work for a small team and a large R&D group?",
        a: "Both. A small team can plan one launch; a larger group can see every launch on one schedule and report across all of them. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Once a project has its stages and tasks, the timeline is already there — add dates and dependencies and it reports.",
      },
      {
        q: "What happens when the plan gets complex?",
        a: "Dependencies between tasks keep the schedule honest as things move, milestones mark the dates that matter, and full Gantt reporting keeps reviews on the current plan.",
      },
    ],
    ctaTitle: "See where a slip actually lands.",
  },

  /* ------------------------------------------------------------------ board */
  {
    id: "board",
    eyebrow: "Project Board in Flavor Studio",
    h1: "The launch,",
    tail: "as today's work.",
    lede: "Tasks as cards, organised by stage, for teams who run day to day off a board rather than a schedule — on the same data as the timeline.",
    hero: { kind: "asset", asset: productAssets.projectBoard },
    contrast: {
      kind: "thesis",
      title: "From a schedule to",
      tail: "a working day",
      words: "Pick. Move. Own. Finish.",
    },
    pillars: {
      title: "Daily work,",
      tail: "on the project's own data",
      lede: "The board is the working view of the same project the timeline plans — nothing is copied between them.",
      adjectives: "Staged. Linked. Owned.",
      rows: [
        {
          eyebrow: "Staged",
          title: "Cards by stage",
          body: "Tasks sit in columns for the stage they are in. Moving a card moves the task; there is no second list to update, because the board and the timeline show the same underlying data.",
          visual: { kind: "asset", asset: productAssets.projectBoardStages },
        },
        {
          eyebrow: "Linked",
          title: "Every card knows its recipe",
          body: "Cards link back to the recipes and projects they belong to, so opening a task opens the version it concerns rather than a description of it.",
          visual: { kind: "asset", asset: productAssets.projectCardRecipe },
        },
        {
          eyebrow: "Owned",
          title: "Ownership and status at a glance",
          body: "Who owns a card and where it stands are visible on the board, and the hours spent on it are logged against the project from the timesheet — from the entry to the report.",
          visual: { kind: "still", flow: flows.timesheet, step: 6 },
        },
      ],
    },
    banner: {
      title:
        "The board should be the truth about today, not a summary of last week.",
      body: "Teams that work the board in Flavor Studio keep the timeline current without a second update. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask what's on",
      tail: "today",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Your cards, and what they wait on",
          body: "Ask what is assigned to you, what is overdue on a project or which cards depend on a recipe version. The Agent answers from the board and cites the project.",
          chat: [
            {
              from: "user",
              text: "What's open for me on Spring Snack this week?",
            },
            {
              from: "agent",
              text: "Three cards, one overdue.",
              bullets: [
                "Shelf-life test setup — Pilot — due today",
                "Cost review on Granola Bar Final — Pilot",
                "Panel report circulation — Bench — overdue 2 days",
              ],
              cite: "Spring Snack · Project Board · Assigned to you",
            },
          ],
        },
        {
          eyebrow: "Stand-up",
          title: "A stand-up note, drafted from the board",
          body: "Ask for a summary of what moved since yesterday and the Agent drafts it from the cards that changed stage or owner — text for you to share, not a change to the board.",
          chat: [
            {
              from: "user",
              text: "Draft this morning's stand-up note for Spring Snack.",
            },
            {
              from: "agent",
              text: "Draft: 4 cards moved since yesterday.",
              bullets: [
                "2 cards Bench → Pilot (panel report, cost review)",
                "1 card completed (bench samples)",
                "1 card reassigned (packaging artwork)",
              ],
              cite: "Spring Snack · Project Board · Last 24 h",
            },
          ],
        },
      ],
    },
    gridTail: "run the day",
    grid: [
      {
        icon: "all-application",
        title: "Board by stage",
        body: "Tasks as cards in stage columns.",
      },
      {
        icon: "link",
        title: "Linked cards",
        body: "Back to recipes and projects.",
      },
      {
        icon: "user",
        title: "Ownership",
        body: "Who owns each card, at a glance.",
      },
      { icon: "check-one", title: "Status", body: "Where every card stands." },
      {
        icon: "calendar-three",
        title: "Project Timeline",
        body: "The same data as a schedule.",
      },
      {
        icon: "time",
        title: "Timesheet",
        body: "Hours logged against the card's project.",
      },
      {
        icon: "flag",
        title: "Stage gates",
        body: "Columns follow your gates.",
      },
      {
        icon: "peoples",
        title: "Groups & roles",
        body: "Who can see and move cards.",
      },
      {
        icon: "chart-histogram",
        title: "Reports",
        body: "Project reporting from the same data.",
      },
    ],
    faq: [
      {
        q: "Is the Project Board included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including projects, board, timeline and reports, with no credit card required.",
      },
      {
        q: "How is this different from a generic kanban board?",
        a: "Cards link to the recipes and versions they concern, columns follow your stage gates, and the board shares its data with the timeline and timesheet — so daily work and the launch schedule never drift apart.",
      },
      {
        q: "Will it work for a small team and a large R&D group?",
        a: "Both. A small team can run its whole week from one board; a larger group can keep a board per project with roles and groups deciding who moves what. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "The board exists as soon as a project has stages and tasks — there is nothing separate to configure.",
      },
      {
        q: "What happens when a project gets busy?",
        a: "Cards stay linked to their recipes, ownership and status stay visible, and the timeline and reports read the same data, so the board scales with the launch rather than needing a second system.",
      },
    ],
    ctaTitle: "The launch, as today's work.",
  },

  /* -------------------------------------------------------------- timesheet */
  {
    id: "timesheet",
    eyebrow: "Timesheet in Flavor Studio",
    h1: "R&D time your finance team",
    tail: "actually trusts.",
    lede: "Log activity against the project it belongs to — from a weekly calendar or straight from a field — and the hours and expenses roll into a report you can export.",
    hero: { kind: "flow", flow: flows.timesheet },
    contrast: {
      kind: "without-with",
      title: "A better way to account for",
      tail: "development time",
      without: [
        "Hours reconstructed from memory at the end of the month",
        "Expenses in one system, time in another, projects in a third",
        "Nobody can say what a launch cost in people",
        "The timesheet report is built by hand every week",
      ],
      with: [
        "Activity logged as it happens, from the calendar or a timer",
        "Time and expenses on the same entry, against the same project",
        "Hours per project are a number, not an estimate",
        "Detailed and weekly reports, filtered and exported in one step",
      ],
    },
    pillars: {
      title: "From bench hours to",
      tail: "project cost",
      lede: "Development time is a real project cost. The timesheet keeps it attached to the work it was spent on.",
      adjectives: "Captured. Attributed. Reported.",
      rows: [
        {
          eyebrow: "Captured",
          title: "Logged where the work happens",
          body: "A weekly calendar and day view for logging activity, a running timer for the work you are in the middle of, and manual entry for the rest. Activities are typed — researching, design, or types you define.",
          visual: { kind: "still", flow: flows.timesheet, step: 2 },
        },
        {
          eyebrow: "Attributed",
          title: "Every hour attached to a project",
          body: "Each entry is logged against a project, with expenses attached to the same entry — so the cost of a launch in people and receipts is one record, not two spreadsheets reconciled later.",
          visual: { kind: "asset", asset: productAssets.timesheetWeek },
        },
        {
          eyebrow: "Reported",
          title: "Detailed or weekly, filtered, exported",
          body: "Report views with total hours, filtered by activity type, project, description, expenses or hours. Export the report for circulation to finance or a client outside Flavor Studio.",
          visual: { kind: "asset", asset: productAssets.reports },
        },
      ],
    },
    banner: {
      title: "Stop guessing where the team's hours went.",
      body: "Teams that log time in Flavor Studio can say what a launch cost — in hours and expenses — from the system. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "The report you'd build yourself,",
      tail: "in one question",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Hours and expenses, summarised and cited",
          body: "Ask which projects took the most time last month, how hours split by activity type or what a launch has cost so far. The Agent answers from the timesheet and cites the report it read.",
          chat: [
            {
              from: "user",
              text: "Which projects took the most hours in August, and what did they cost in expenses?",
            },
            {
              from: "agent",
              text: "Spring Snack led with 86 h; three projects account for most of the month.",
              bullets: [
                "Spring Snack — 86 h, $1,240 expenses",
                "Dip Reformulation — 41 h, $310",
                "Sauce Line Cost-out — 27 h, $0",
              ],
              cite: "Timesheet · Weekly report · August",
            },
          ],
        },
        {
          eyebrow: "Week close",
          title: "Reminders before the week closes",
          body: "Ask the Agent who has not logged hours this week and it lists them from the timesheet — and can draft the reminder for you to send. It does not create or edit anyone's entries.",
          chat: [
            { from: "user", text: "Who hasn't logged time this week?" },
            {
              from: "agent",
              text: "Two people have no entries since Monday.",
              bullets: [
                "R&D — 1 person, last entry Friday",
                "Sensory — 1 person, no entries this month",
                "Draft reminder ready to send",
              ],
              cite: "Timesheet · Week 37 · Entries by user",
            },
          ],
        },
      ],
    },
    gridTail: "close the week",
    grid: [
      {
        icon: "calendar-three",
        title: "Weekly & day views",
        body: "Log activity on a calendar.",
      },
      {
        icon: "stopwatch",
        title: "Running timer",
        body: "Or manual entry, from a field.",
      },
      {
        icon: "tag-one",
        title: "Activity types",
        body: "Researching, design and your own.",
      },
      {
        icon: "folder-open",
        title: "Logged to a project",
        body: "Every hour attributed.",
      },
      {
        icon: "wallet",
        title: "Expenses attached",
        body: "On the same entry as the time.",
      },
      {
        icon: "table-report",
        title: "Detailed & weekly reports",
        body: "With total hours.",
      },
      {
        icon: "filter",
        title: "Filter",
        body: "By type, project, description, expenses or hours.",
      },
      {
        icon: "export",
        title: "Export",
        body: "For circulation outside Flavor Studio.",
      },
      {
        icon: "chart-histogram",
        title: "Reports module",
        body: "Time and expense across projects.",
      },
    ],
    faq: [
      {
        q: "Is the Timesheet included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including the timesheet and its reports, with no credit card required.",
      },
      {
        q: "How is this different from a standalone time-tracking app?",
        a: "Time is logged against the same projects the recipes and tasks belong to, expenses sit on the same entry, and the report is in the same system finance already gets project reports from — nothing is exported and re-matched.",
      },
      {
        q: "Will it work for a small team and a large department?",
        a: "Both. A small team can log against two projects with a timer; a department can define its own activity types, filter by project and person and export weekly. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Activity types take minutes to define, projects already exist, and the first entry can be logged from the calendar straight away.",
      },
      {
        q: "What happens when we need more detail?",
        a: "Entries carry a type, a project, a description and expenses, and the detailed report filters on any of them, so the timesheet can answer a client's query as well as a monthly total.",
      },
    ],
    ctaTitle: "R&D time your finance team actually trusts.",
  },

  /* ---------------------------------------------------------------- reports */
  {
    id: "reports",
    eyebrow: "Reports in Flavor Studio",
    h1: "Answer management",
    tail: "from the system.",
    lede: "Reporting across projects, costs, time and activity — so the questions management asks can be answered from Flavor Studio instead of assembled by hand.",
    hero: { kind: "asset", asset: productAssets.reports },
    contrast: {
      kind: "thesis",
      title: "From a question to",
      tail: "a number you can defend",
      words: "Ask. Filter. Report. Circulate.",
    },
    pillars: {
      title: "One reporting layer over",
      tail: "every module",
      lede: "Projects, recipes, timesheet and CRM already share their data. Reports read across all of it.",
      adjectives: "Cross-module. Filterable. Repeatable.",
      rows: [
        {
          eyebrow: "Cross-module",
          title: "Projects, costs, time and customers",
          body: "Project and stage-gate reporting, costing reports across recipes and versions, time and expense reporting from the timesheet, CRM opportunity and activity reports, and Gantt reporting from the project timeline.",
          visual: { kind: "asset", asset: productAssets.crmPipeline },
        },
        {
          eyebrow: "Filterable",
          title: "Cut it the way the question was asked",
          body: "Filter by activity type, project, description, expenses or hours; view detailed or weekly. The report reads the same entries the team logged, so the total and the detail always agree.",
          visual: { kind: "asset", asset: productAssets.reportsDetailed },
        },
        {
          eyebrow: "Repeatable",
          title: "Templates that keep their shape",
          body: "Reporting templates hold the filters and layout between runs, so the monthly report is the same report next month. Export it for circulation outside Flavor Studio.",
          visual: { kind: "asset", asset: productAssets.reportsWeekly },
        },
      ],
    },
    banner: {
      title: "Your reports shouldn't need a translator.",
      body: "Teams that report from Flavor Studio answer with the same data the work was done in. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask the question,",
      tail: "get the report",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "A report described in a sentence",
          body: "Ask for hours by project, cost by version or opportunities by stage and the Agent answers with the figures and names the report it drew them from.",
          chat: [
            {
              from: "user",
              text: "Cost per serving for every version of the Granola Bar, lowest first.",
            },
            {
              from: "agent",
              text: "Three versions; Testing is lowest.",
              bullets: ["Testing — $0.41", "Final — $0.43", "V1 — $0.46"],
              cite: "Costing report · Granola Bar · All versions",
            },
          ],
        },
        {
          eyebrow: "Narrative",
          title: "The summary paragraph, drafted",
          body: "Ask for a written summary of a report and the Agent drafts the paragraph from the figures — for you to edit and paste into the review deck. The report itself is untouched.",
          chat: [
            {
              from: "user",
              text: "Write a two-line summary of August's time report for the board.",
            },
            {
              from: "agent",
              text: "Draft: R&D logged 154 h in August across 3 active projects, 56% on Spring Snack.",
              bullets: [
                "Expenses $1,550, all on Spring Snack and Dip Reformulation",
                "Hours up 12% on July",
              ],
              cite: "Timesheet · Weekly report · August",
            },
          ],
        },
      ],
    },
    gridTail: "see the big picture",
    grid: [
      {
        icon: "flag",
        title: "Stage-gate reports",
        body: "Project progress by gate.",
      },
      {
        icon: "calculator-one",
        title: "Costing reports",
        body: "Across recipes and versions.",
      },
      { icon: "time", title: "Time & expense", body: "From the timesheet." },
      {
        icon: "user-business",
        title: "CRM reports",
        body: "Opportunities and activity.",
      },
      {
        icon: "timeline",
        title: "Gantt reports",
        body: "From the project timeline.",
      },
      {
        icon: "bookmark",
        title: "Report templates",
        body: "A report keeps its shape between runs.",
      },
      {
        icon: "filter",
        title: "Filters",
        body: "Type, project, description, expenses, hours.",
      },
      {
        icon: "export",
        title: "Export",
        body: "For circulation outside Flavor Studio.",
      },
      {
        icon: "experiment",
        title: "Taste-test reports",
        body: "Summary, comprehensive, shelf life.",
      },
    ],
    faq: [
      {
        q: "Are Reports included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including every report, with no credit card required.",
      },
      {
        q: "How is this different from exporting to a BI tool?",
        a: "Reports read the live data in the modules the work was done in, so there is no export, no join and no stale copy. For teams that do want their own analysis, the API and CSV export are there too.",
      },
      {
        q: "Will it work for a small team and a large company?",
        a: "Both. A small team can run a weekly time report; a company can report across projects, costs, CRM and time with templates for each audience. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to get a first report?",
        a: "As soon as there is data in a module — a logged hour, a costed recipe, an opportunity — its report is available with no setup.",
      },
      {
        q: "What happens when reporting needs get complex?",
        a: "Templates hold filters and layout between runs, filters cut a report by any of its fields, and the API is the supported route for bulk export to your own tools.",
      },
    ],
    ctaTitle: "Answer management from the system.",
  },

  /* -------------------------------------------------------------------- crm */
  {
    id: "crm",
    eyebrow: "CRM in Flavor Studio",
    h1: "Connect the front line",
    tail: "to R&D.",
    /* flavorstudio.com's own opening line for CRM, verbatim. */
    lede: "Comprehensive CRM capabilities are built into Flavor Studio permitting front-line team to interact with R&D on a single software system to more effectively service customers.",
    hero: { kind: "asset", asset: productAssets.crmCustomer },
    contrast: {
      kind: "without-with",
      title: "A better way to",
      tail: "sell what you make",
      without: [
        "Sales works a generic CRM that has never heard of a recipe",
        "A sample request is an email to the lab",
        "Nobody knows which development project an opportunity depends on",
        "Customer requirements arrive as a different form every time",
      ],
      with: [
        "Customers, contacts, opportunities and contracts beside the formulas",
        "Sample requests tied to the recipe, with shipment tracking",
        "Opportunities linked to the development project they wait on",
        "Requirements collected on a form you built for your category",
      ],
    },
    pillars: {
      title: "Sales and development,",
      tail: "one record",
      lede: "The CRM in Flavor Studio is not a separate product bolted on — it shares the recipes, projects and reports the rest of the platform runs on.",
      adjectives: "Connected. Visible. Reported.",
      /* All four points flavorstudio.com's CRM section carries, in their own
         words and their order. Our "Requirements captured your way" row was
         dropped to keep the count theirs; the Customer Requirements Builder
         is still covered by the Requirements Builder tile in the grid below
         and by its own module page. */
      rows: [
        {
          eyebrow: "Linked",
          title: "Digitally connected",
          body: "Link sales opportunities to product development projects for seamless reporting.",
          visual: { kind: "asset", asset: productAssets.crmOpportunity },
        },
        {
          eyebrow: "Pipeline",
          title: "Management visibility",
          body: "View opportunity sales pipeline and sales team activity reports.",
          visual: { kind: "asset", asset: productAssets.crmPipeline },
        },
        {
          eyebrow: "Samples",
          title: "Robust functionality",
          body: "Manage sample requests and track their shipping status with FedEx connectivity.",
          visual: { kind: "asset", asset: productAssets.crmSamples },
        },
        {
          eyebrow: "Reporting",
          title: "We'll build it",
          body: "Customizable reporting ensures visibility into the important metrics for each organization.",
          visual: { kind: "asset", asset: productAssets.reports },
        },
      ],
    },
    banner: {
      title:
        "The customer asked for a sample. The lab should know which version.",
      body: "Teams that run CRM in Flavor Studio keep sales and development on the same record. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask the pipeline",
      tail: "what's waiting on R&D",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Opportunities, and the work they depend on",
          body: "Ask which opportunities wait on a development project, which samples are out, or what a customer's requirements say about allergens. The Agent answers from the CRM record and cites it.",
          chat: [
            {
              from: "user",
              text: "Which open opportunities are waiting on Spring Snack, and what samples have gone out?",
            },
            {
              from: "agent",
              text: "Two opportunities depend on Spring Snack; one sample shipped.",
              bullets: [
                "Northwind Grocers — private label, waiting on Gate 4",
                "Harbour Cafés — menu trial, sample of Testing shipped 9 Sep",
                "Harbour shipment: delivered",
              ],
              cite: "CRM · Opportunities linked to Spring Snack",
            },
          ],
        },
        {
          eyebrow: "Customer brief",
          title: "Requirements checked against the recipe",
          body: "Ask whether a version meets a customer's submitted requirements and the Agent compares the form's answers with the recipe — listing what matches and what does not, as a review for the account owner.",
          chat: [
            {
              from: "user",
              text: "Does Granola Bar Final meet Northwind's requirements form?",
            },
            {
              from: "agent",
              text: "Meets 7 of 8 requirements; one to check.",
              bullets: [
                "Nut-free: no — almond flour present",
                "Shelf life ≥ 9 months: stated 10 months",
                "Non-GMO certification: on file for all ingredients",
              ],
              cite: "Northwind · Customer Requirements · Responses",
            },
          ],
        },
      ],
    },
    gridTail: "sell the product",
    grid: [
      {
        icon: "peoples",
        title: "Customers & contacts",
        body: "With opportunities and contracts.",
      },
      {
        icon: "agreement",
        title: "Contracts",
        body: "Kept with the customer record.",
      },
      {
        icon: "order",
        title: "Products & purchase orders",
        body: "Tracked against the customer.",
      },
      {
        icon: "test-tube",
        title: "Sample requests",
        body: "Tied to the recipe being sampled.",
      },
      {
        icon: "form-one",
        title: "Requirements Builder",
        body: "Forms for your category.",
      },
      /* Management visibility moved up into the pillar rows — the page's core
         section — so it is not repeated here. */
      {
        icon: "file-pdf-one",
        title: "Read-only PDFs",
        body: "Publish for customers and co-manufacturers.",
      },
      /* We'll build it moved up into the pillar rows — the page's core
         section — so it is not repeated here. */
    ],
    faq: [
      {
        q: "Is the CRM included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform — CRM, the Customer Requirements Builder and every other module — with no credit card required.",
      },
      {
        q: "How is this different from a general CRM?",
        a: "Opportunities link to the development projects they depend on, sample requests tie to the recipe being sampled, and customer requirements are collected on a form built for food and beverage — all in the system where the formulas live.",
      },
      {
        q: "Will it work for a small brand and a large sales team?",
        a: "Both. A founder can track a handful of accounts and samples; a sales team can run opportunities, contracts and purchase orders with roles and groups deciding access. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Customers and contacts are added directly, and opportunities link to projects that already exist. The requirements form is built once in the Builder and published.",
      },
      {
        q: "What happens when the pipeline grows?",
        a: "Opportunity and activity reports answer pipeline questions from the system, shipments are tracked per sample, and the API connects the CRM to the ERP or accounting package you already run.",
      },
    ],
    ctaTitle: "Connect the front line to R&D.",
  },

  /* ------------------------------------------------------------- cr-builder */
  {
    id: "cr-builder",
    eyebrow: "Customer Requirements Builder in Flavor Studio",
    h1: "Brief once,",
    tail: "in your own structure.",
    lede: "Customers rarely brief you the same way twice. Build the requirements form your category needs — sections, questions, nested options — publish it, and collect answers your team can work from.",
    hero: { kind: "flow", flow: flows.crBuilder },
    contrast: {
      kind: "thesis",
      title: "From a customer's email to",
      tail: "a brief you can act on",
      words: "Build. Preview. Publish. Collect.",
    },
    pillars: {
      title: "The form your category",
      tail: "actually needs",
      lede: "Sections, question types and nested options to whatever depth the brief requires, with a live preview before anything is published.",
      adjectives: "Sectioned. Nested. Published.",
      rows: [
        {
          eyebrow: "Sectioned",
          title: "Organised into sections you can reorder",
          body: "Forms are built from named sections — product, packaging, claims, logistics — that can be reordered, duplicated or deleted without touching the rest. Each question's type is set in Configure.",
          visual: { kind: "still", flow: flows.crBuilder, step: 1 },
        },
        {
          eyebrow: "Nested",
          title: "Options with sub-levels, to any depth",
          body: "Multiple choice, single answer, label and short answer question types. Sub-levels nest under any option — choose “Raw” and the form asks the raw-specific questions — with an “Other” fallback added inline.",
          visual: { kind: "still", flow: flows.crBuilder, step: 2 },
        },
        {
          eyebrow: "Published",
          title: "Preview, publish, update",
          body: "Preview the form live before anything goes out. Save as draft, publish, then update a published form when the category's questions change. Drag handles reorder anything.",
          visual: { kind: "still", flow: flows.crBuilder, step: 4 },
        },
      ],
    },
    banner: {
      title: "The brief should arrive in the shape your team works in.",
      body: "Teams that collect requirements in Flavor Studio start development from a structured answer, not a thread. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Turn answers",
      tail: "into a starting point",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "What did the customer actually ask for?",
          body: "Ask the Agent to summarise a submitted requirements form and it answers from the responses — the constraints, the must-haves and the open questions — citing the form and section.",
          chat: [
            {
              from: "user",
              text: "Summarise Harbour Cafés' requirements for the dip.",
            },
            {
              from: "agent",
              text: "Plant-based, refrigerated, 8-week shelf life, tub format.",
              bullets: [
                "Format: 200 g tub, PP with tamper seal",
                "Claims wanted: “vegan”, “no added sugar”",
                "Open: target price left blank",
              ],
              cite: "Harbour Cafés · Customer Requirements · Sections 1–3",
            },
          ],
        },
        {
          eyebrow: "Form design",
          title: "Questions a category tends to need",
          body: "Building a form for a new category? Ask the Agent what sections and questions similar forms in your workspace carry and it proposes a structure — for you to build, not a form it publishes.",
          chat: [
            {
              from: "user",
              text: "Propose sections for a frozen dessert requirements form.",
            },
            {
              from: "agent",
              text: "Proposed 5 sections based on your two existing frozen forms.",
              bullets: [
                "Product (base, overrun, inclusions)",
                "Packaging (container size, fill weight)",
                "Claims & allergens",
                "Logistics (cold chain, MOQ)",
              ],
              cite: "Proposal only — no form created",
            },
          ],
        },
      ],
    },
    gridTail: "capture the brief",
    grid: [
      {
        icon: "list-two",
        title: "Named sections",
        body: "Reorder, duplicate or delete.",
      },
      {
        icon: "checklist",
        title: "Question types",
        body: "Multiple choice, single, label, short answer.",
      },
      {
        icon: "tree-diagram",
        title: "Nested sub-levels",
        body: "Under any option, to any depth.",
      },
      {
        icon: "plus",
        title: "Inline options",
        body: "Including an “Other” fallback.",
      },
      {
        icon: "search",
        title: "Live preview",
        body: "See the form before it is published.",
      },
      {
        icon: "send",
        title: "Draft & publish",
        body: "Then update a published form.",
      },
      {
        icon: "drag",
        title: "Drag to reorder",
        body: "Handles on every element.",
      },
      {
        icon: "user-business",
        title: "CRM",
        body: "Responses kept with the customer.",
      },
      {
        icon: "folder-open",
        title: "Projects",
        body: "Start development from the brief.",
      },
    ],
    faq: [
      {
        q: "Is the Customer Requirements Builder included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including the Builder, with no credit card required.",
      },
      {
        q: "How is this different from a generic form tool?",
        a: "Sub-levels nest under specific options so the form asks only the questions that apply, and the responses live in the CRM beside the customer, the opportunity and the development project — not in a separate inbox.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can publish one form for its category; a manufacturer can keep a form per category or customer type and update them as requirements change. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to build a form?",
        a: "Sections and questions are added inline with a live preview, so a first form is usually built and published in a single sitting.",
      },
      {
        q: "What happens when briefs get complicated?",
        a: "Nested sub-levels to any depth, an “Other” fallback on any option, and the ability to update a published form keep even a detailed brief structured.",
      },
    ],
    ctaTitle: "Brief once, in your own structure.",
  },

  /* ------------------------------------------------------------- publishing */
  {
    id: "publishing",
    eyebrow: "Publishing & export in Flavor Studio",
    h1: "Your data, in the form",
    tail: "the recipient needs.",
    lede: "Print, Word, CSV, read-only PDF, vector PDF for packaging, JSON, or an encrypted format that carries custom ingredients to Flavor Studio users outside your company.",
    hero: { kind: "asset", asset: productAssets.publishExport },
    contrast: {
      kind: "thesis",
      title: "From a recipe in the system to",
      tail: "a document in someone's hands",
      words: "Choose. Style. Publish. Send.",
    },
    pillars: {
      title: "Every output,",
      tail: "from the same record",
      lede: "What publishes, for which region, by which method and in which file type is set per publish — and every format reads the same formula.",
      adjectives: "Selective. Portable. Designed.",
      rows: [
        {
          eyebrow: "Selective",
          title: "Choose what publishes",
          body: "Recipe, label, composition or nutrient content claims; region, method and file type set per publish, with the panel previewing live. Print, download for Word, or export CSV for Excel.",
          visual: { kind: "asset", asset: productAssets.publishExport },
        },
        {
          eyebrow: "Designed",
          title: "Laid out through the Publish Designer",
          body: "Published output goes through the template you designed, so a spec sheet for a customer and a read-only PDF for a co-manufacturer both carry your layout and your logo.",
          visual: { kind: "asset", asset: productAssets.labelDesigner },
        },
        {
          eyebrow: "Portable",
          title: "Formats for packaging, partners and systems",
          body: "High-resolution vector PDF label export for the packaging designer. One-click JSON download of a recipe. The encrypted FS format carries embedded custom ingredients between companies, so a partner opens your recipe with your ingredients intact.",
          visual: { kind: "asset", asset: productAssets.nutritionLabelUs },
        },
      ],
    },
    banner: {
      title:
        "The co-manufacturer needs a PDF. The designer needs a vector. Finance needs a CSV.",
      body: "Teams in Flavor Studio publish each from the same recipe, in one step each. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask what to send,",
      tail: "and what's in it",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "What has been published, and when",
          body: "Ask which version of a label was last exported for packaging, or whether the spec sheet a customer holds matches the current formula. The Agent answers from the recipe's publish history and cites it.",
          chat: [
            {
              from: "user",
              text: "Is the label Northwind has the current one for Granola Bar Final?",
            },
            {
              from: "agent",
              text: "No — the vector PDF was exported before the last formula change.",
              bullets: [
                "Exported 2 Sep (vector PDF, US)",
                "Formula edited 9 Sep: sea salt 0.5% → 0.9%",
                "Sodium on the panel changed",
              ],
              cite: "Granola Bar · Final · History",
            },
          ],
        },
        {
          eyebrow: "Send list",
          title: "The right format for each recipient",
          body: "Describe who needs what and the Agent lists the publishes to run — format, region and content for each — as a checklist for you. It does not publish or send anything itself.",
          chat: [
            {
              from: "user",
              text: "What do I need to publish to get Granola Bar Final out to packaging, Northwind and our co-man?",
            },
            {
              from: "agent",
              text: "Three publishes from the Final version.",
              bullets: [
                "Packaging: label, vector PDF, US",
                "Northwind: spec sheet, read-only PDF, Customer template",
                "Co-manufacturer: recipe, encrypted FS format",
              ],
              cite: "Checklist only — nothing published",
            },
          ],
        },
      ],
    },
    gridTail: "get it out the door",
    grid: [
      {
        icon: "checklist",
        title: "Choose the content",
        body: "Recipe, label, composition or claims.",
      },
      {
        icon: "globe",
        title: "Region per publish",
        body: "US or Canadian output.",
      },
      { icon: "printer", title: "Print", body: "Or download for Word." },
      { icon: "file-excel", title: "CSV export", body: "For Excel." },
      {
        icon: "file-pdf-one",
        title: "Read-only PDF",
        body: "For customers and co-manufacturers.",
      },
      {
        icon: "lock",
        title: "Encrypted FS format",
        body: "Custom ingredients travel with the recipe.",
      },
      {
        icon: "file-code",
        title: "JSON download",
        body: "One click per recipe.",
      },
      {
        icon: "doc-detail",
        title: "Vector PDF labels",
        body: "High resolution for packaging.",
      },
      {
        icon: "layout-four",
        title: "Publish Designer",
        body: "Output laid out through your template.",
      },
    ],
    faq: [
      {
        q: "Are publishing and export included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, including every publish and export format, with no credit card required.",
      },
      {
        q: "How is this different from exporting a spreadsheet?",
        a: "Every format is generated from the recipe record — the label, composition and claims included — and laid out through the Publish Designer, so what leaves the building is current and consistent rather than a file someone formatted.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup can send a read-only PDF to its first co-manufacturer; a manufacturer can exchange encrypted FS files with partners who also run Flavor Studio and feed CSV to finance. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to publish?",
        a: "Choose content, region, method and file type, preview, publish — a single dialog per output.",
      },
      {
        q: "Can we get our data out if we leave?",
        a: "Yes. The API is the supported route for bulk export, recipes download as JSON in one click, and CSV and PDF exports are available on every plan.",
      },
    ],
    ctaTitle: "Your data, in the form the recipient needs.",
  },

  /* ----------------------------------------------------------- integrations */
  {
    id: "integrations",
    eyebrow: "Integrations in Flavor Studio",
    h1: "Connected to the systems",
    tail: "you already run.",
    lede: "A full REST API over your recipes, ingredients, projects and CRM data, webhooks for reacting to changes, and integration paths for the ERP, accounting package or plant system you already use.",
    hero: { kind: "asset", asset: productAssets.integrationEvents },
    contrast: {
      kind: "thesis",
      title: "From an island of recipe data to",
      tail: "part of your stack",
      words: "Expose. Subscribe. Sync. Export.",
    },
    pillars: {
      title: "Open by design,",
      tail: "secure by default",
      lede: "Flavor Studio exposes your data using industry standards, so the integration is yours to build — or ours to help with.",
      adjectives: "Standard. Reactive. Complete.",
      rows: [
        {
          eyebrow: "Standard",
          title: "A REST API over all your data",
          body: "Recipes, ingredients, projects and CRM data through an internet-based API with standards-based authentication and secure transport. See the Developers section for the reference.",
          visual: { kind: "asset", asset: productAssets.apiDocs },
        },
        {
          eyebrow: "Reactive",
          title: "Webhooks when something changes",
          body: "Subscribe to changes — a recipe promoted, an ingredient cost updated, an opportunity moved — and let your ERP, accounting package or plant system react as it happens rather than on a nightly export.",
          visual: { kind: "asset", asset: productAssets.webhooks },
        },
        {
          eyebrow: "Complete",
          title: "ERP, accounting, Plex and bulk export",
          body: "Integration paths for companies running Plex and other external systems, ERP and accounting integrations, and the API as the supported route for bulk data export — alongside CSV, JSON and PDF from the publish dialog.",
          visual: { kind: "asset", asset: productAssets.erpPlex },
        },
      ],
    },
    banner: {
      title:
        "Your ERP should not learn about a new formula from a spreadsheet.",
      body: "Teams connect Flavor Studio to the systems they already run through the API and webhooks. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask what's connected,",
      tail: "and what changed",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Changes worth syncing, listed",
          body: "Ask what changed in the workspace since the last sync — new versions, cost updates, promoted formulas — and the Agent lists them from the history, citing each record, so your integration team knows what to expect downstream.",
          chat: [
            {
              from: "user",
              text: "What changed on Final versions since Monday that the ERP would care about?",
            },
            {
              from: "agent",
              text: "Three changes on Final versions this week.",
              bullets: [
                "Granola Bar Final — formula edited 9 Sep",
                "Veggie Crisp Final — promoted from Testing 10 Sep",
                "Almond Flour — supplier cost updated 11 Sep",
              ],
              cite: "History · Final versions · This week",
            },
          ],
        },
        {
          eyebrow: "Integration help",
          title: "Which endpoint, for which question",
          body: "Ask how to get a recipe's cost or an ingredient's allergens through the API and the Agent points to the resource and fields in the reference. Guidance for your developers — it does not call the API for you.",
          chat: [
            {
              from: "user",
              text: "How do I pull the batch cost of every Final version through the API?",
            },
            {
              from: "agent",
              text: "List recipes filtered to Final versions, then read each recipe's cost panel resource.",
              bullets: [
                "Recipes: filter by version name",
                "Cost: batch, container and retail fields per recipe",
                "Authenticate with a standards-based token",
              ],
              cite: "API reference · Recipes · Cost",
            },
          ],
        },
      ],
    },
    gridTail: "connect your stack",
    grid: [
      {
        icon: "api",
        title: "REST API",
        body: "Recipes, ingredients, projects and CRM.",
      },
      {
        icon: "lightning",
        title: "Webhooks",
        body: "React to changes as they happen.",
      },
      {
        icon: "factory-building",
        title: "ERP integrations",
        body: "Connect the systems the plant runs.",
      },
      {
        icon: "bank-card",
        title: "Accounting",
        body: "Cost and purchase data where finance works.",
      },
      {
        icon: "plug",
        title: "Plex and others",
        body: "Integration paths for external systems.",
      },
      {
        icon: "key-one",
        title: "Standards-based auth",
        body: "And secure, TLS-encrypted transport.",
      },
      {
        icon: "download",
        title: "Bulk export",
        body: "The API is the supported route.",
      },
      {
        icon: "file-code",
        title: "JSON per recipe",
        body: "One-click download.",
      },
      {
        icon: "file-excel",
        title: "CSV & PDF",
        body: "From the publish dialog.",
      },
    ],
    faq: [
      {
        q: "Is API access included in the free trial?",
        a: "Yes. The 14-day trial covers the full platform, and the API is the supported route for getting data out at any time, with no credit card required.",
      },
      {
        q: "How is this different from a nightly CSV export?",
        a: "The REST API exposes the live record, and webhooks tell your systems when something changes — so the ERP learns about a promoted formula when it is promoted, not the next morning.",
      },
      {
        q: "Will it work for a small brand and a large manufacturer?",
        a: "Both. A startup may only ever download JSON and CSV; a manufacturer can integrate Plex, an ERP and accounting through the API. Enterprise plans cover teams over 30 users and include integration support.",
      },
      {
        q: "How long does an integration take?",
        a: "That depends on your systems, but the API uses industry standards and the reference is public in the Developers section, so your team can start without waiting on us.",
      },
      {
        q: "Can we get all of our data out if we leave?",
        a: "Yes. The API is the supported route for bulk export, and recipes download as JSON in one click.",
      },
    ],
    ctaTitle: "Connected to the systems you already run.",
  },

  /* ------------------------------------------------------------------ admin */
  {
    id: "admin",
    eyebrow: "Administration in Flavor Studio",
    h1: "Trade secrets,",
    tail: "treated that way.",
    lede: "Central control over who sees what — users, groups, roles and per-recipe rights — with two-factor authentication, TLS-encrypted transport and one session per account.",
    hero: { kind: "flow", flow: flows.twoFactor },
    contrast: {
      kind: "thesis",
      title: "From a shared login to",
      tail: "accountable access",
      words: "Invite. Assign. Verify. Audit.",
    },
    pillars: {
      title: "Control without",
      tail: "friction",
      lede: "Formulas are, in most cases, a trade secret. Administration decides who can read them, who can change them, and how they prove who they are.",
      adjectives: "Governed. Verified. Traceable.",
      rows: [
        {
          eyebrow: "Governed",
          title: "Users, groups and defined roles",
          body: "User management with privileges, groups and defined roles, and per-user and per-group read and edit rights on recipes. Shared cost assumptions and units are set once for the workspace so every recipe costs the same way.",
          visual: { kind: "asset", asset: productAssets.adminUsers },
        },
        {
          eyebrow: "Verified",
          title: "Two-factor, by authenticator app",
          body: "Set up an authenticator app from a QR code, choose to be verified by app, phone or email, and let the organisation enforce the preference for every user. One concurrent session per account makes credential sharing impractical by design.",
          visual: { kind: "still", flow: flows.twoFactor, step: 0 },
        },
        {
          eyebrow: "Traceable",
          title: "Encrypted in transit, logged at sign-on",
          body: "All web communication is TLS-encrypted and sign-on IP addresses are logged for traceability. Subscription, billing and account suspension are handled in-product, and inactive users drop out of the next billing count.",
          visual: { kind: "still", flow: flows.twoFactor, step: 2 },
        },
      ],
    },
    banner: {
      title: "The people who should see the formula, and nobody else.",
      body: "Teams administer access in Flavor Studio from one screen — roles, rights, two-factor and billing. 14-day free trial, every module, no credit card.",
    },
    ai: {
      title: "Ask who can see",
      tail: "what",
      rows: [
        {
          eyebrow: "AI Agent",
          title: "Access questions, answered from the settings",
          body: "Ask who can edit a recipe, which users have not enabled two-step verification, or which group a contractor belongs to. The Agent answers from the administration settings and cites them.",
          chat: [
            {
              from: "user",
              text: "Who can edit the Granola Bar recipes, and does everyone have two-step on?",
            },
            {
              from: "agent",
              text: "Edit rights: the R&D group (4 users) and 1 individual. One user has not enabled two-step.",
              bullets: [
                "R&D group — edit",
                "Contractor account — read only",
                "Two-step not yet enabled: 1 user in Sensory",
              ],
              cite: "Administration · Users · Granola Bar rights",
            },
          ],
        },
        {
          eyebrow: "Onboarding",
          title: "A rights plan for a new hire, proposed",
          body: "Describe a new role and the Agent proposes the group, role and recipe rights that match how similar users are set up — a checklist for the administrator to apply. It does not change permissions itself.",
          chat: [
            {
              from: "user",
              text: "We're adding a regulatory specialist. What access should they have?",
            },
            {
              from: "agent",
              text: "Based on your existing regulatory user: read on all recipes, edit on labels and claims.",
              bullets: [
                "Group: Regulatory",
                "Recipes: read, all",
                "Two-step: enforced by organisation",
              ],
              cite: "Proposal only — no rights changed",
            },
          ],
        },
      ],
    },
    gridTail: "run it securely",
    grid: [
      {
        icon: "peoples",
        title: "Users & groups",
        body: "Privileges, groups and defined roles.",
      },
      {
        icon: "id-card",
        title: "Per-recipe rights",
        body: "Read and edit, per user or group.",
      },
      {
        icon: "key-one",
        title: "Two-factor authentication",
        body: "Through an authenticator app.",
      },
      {
        icon: "protect",
        title: "Enforced verification",
        body: "Preferences set per user, enforced by the organisation.",
      },
      {
        icon: "lock",
        title: "TLS encryption",
        body: "All web communication encrypted.",
      },
      {
        icon: "fingerprint",
        title: "Sign-on logging",
        body: "IP addresses logged for traceability.",
      },
      {
        icon: "user",
        title: "One session per account",
        body: "Credential sharing impractical by design.",
      },
      {
        icon: "config",
        title: "Workspace defaults",
        body: "Shared cost assumptions and units.",
      },
      {
        icon: "bank-card",
        title: "Billing in-product",
        body: "Subscription, suspension, inactive users excluded.",
      },
    ],
    faq: [
      {
        q: "Is Administration included in the free trial?",
        a: "Yes. User management, roles, rights and two-factor authentication are available from the first day of the 14-day trial, with no credit card required.",
      },
      {
        q: "How is this different from sharing one login?",
        a: "Each person has their own account with their own rights, two-factor authentication and a single concurrent session, and sign-on IP addresses are logged. Access is accountable, and removing a person removes only their access.",
      },
      {
        q: "Will it work for a small team and a large organisation?",
        a: "Both. A small team can run on a few users and one group; a larger organisation can define roles, groups and per-recipe rights and enforce two-step verification across the company. Enterprise plans cover teams over 30 users.",
      },
      {
        q: "How long does it take to set up?",
        a: "Adding users and assigning them to groups is done in-product; two-factor setup is a QR code per user. 24/7 support is available by phone, email or in-app chat.",
      },
      {
        q: "How is billing handled?",
        a: "Subscription and billing are managed in-product. Mark a user inactive and they are excluded from the next billing count; account closure is handled personally, case by case.",
      },
    ],
    ctaTitle: "Trade secrets, treated that way.",
  },
];

export function getFeaturePage(id: string) {
  return featurePages.find((p) => p.id === id);
}

export function featureModule(page: FeaturePage) {
  return mod(page.id);
}
