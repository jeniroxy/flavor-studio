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
      three-row section can show three distinct moments of one feature. */
  | { kind: "still"; flow: Flow; step: number };

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
    rows: [PillarRow, PillarRow, PillarRow];
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
    lede: "A formulation grid that already knows your ingredients, costs and nutrition — so every version, sub-recipe and batch is right the first time.",
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
      adjectives: "Structured. Versioned. Scalable.",
      rows: [
        {
          eyebrow: "Structured",
          title: "More than a spreadsheet",
          body: "Ingredients ordered into processing steps with item codes carried through. Percentages, weights, yield and cost roll up live in the sidebar, and moisture, fat and processing loss are applied automatically.",
          visual: { kind: "asset", asset: productAssets.recipeCost },
        },
        {
          eyebrow: "Versioned",
          title: "Every change tracked, every version comparable",
          body: "Branch a formula without losing the original. Named versions switch from the recipe header, the history tool records who changed what and when, and taste-test results stay tied to the version they scored.",
          visual: { kind: "asset", asset: productAssets.recipeVersions },
        },
        {
          eyebrow: "Scalable",
          title: "From bench sample to production batch",
          body: "Sub-recipes nest to any depth and cost through to the parent. Scale to a target weight or number of servings, and let ice-cream fill weight follow from overrun and container size.",
          visual: { kind: "still", flow: flows.recipeImages, step: 1 },
        },
      ],
    },
    banner: {
      title: "Your next SKU is already in motion. Make sure the formula doesn't drift.",
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
            { from: "user", text: "Which version of the granola bar has the lowest cost per serving, and why?" },
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
              bullets: ["Sodium −16% per serving", "Cost +$0.004 per serving", "Ready for your review"],
              cite: "Draft version created — not applied",
            },
          ],
        },
      ],
    },
    gridTail: "get it to market",
    grid: [
      { icon: "leaves", title: "9,000+ USDA ingredients", body: "SR28 built in, alongside your own custom ingredients." },
      { icon: "doc-detail", title: "Nutrition labels", body: "FDA and Health Canada panels generated from the formula." },
      { icon: "calculator-one", title: "Cost assumptions", body: "Labour, overhead, packaging and waste defined once." },
      { icon: "caution", title: "Allergen tagging", body: "Carried from the ingredient through to the label." },
      { icon: "weight", title: "Yield & loss", body: "Moisture, fat and processing loss applied automatically." },
      { icon: "tag-one", title: "Types & tags", body: "Organise and filter a large recipe library." },
      { icon: "experiment", title: "Taste tests", body: "Sensory results attached to the exact version." },
      { icon: "peoples", title: "Sharing & rights", body: "Per-user and per-group edit and read rights." },
      { icon: "file-pdf-one", title: "Publish & export", body: "Spec sheets, PDFs and label files from the recipe." },
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
        a: "Most teams import their ingredient library first — from a vendor spec sheet PDF, from the USDA database, or by hand — then rebuild recipes on top. Onboarding is included on every plan.",
      },
      {
        q: "What happens when our formulas get complex?",
        a: "Sub-recipes nest to any depth and cost through to the parent, versions branch without limit, and configurable ingredient fields with custom calculations let the grid carry whatever your process needs.",
      },
    ],
    ctaTitle: "Formulate once. Scale anywhere.",
  },
];

export function getFeaturePage(id: string) {
  return featurePages.find((p) => p.id === id);
}

export function featureModule(page: FeaturePage) {
  return mod(page.id);
}
