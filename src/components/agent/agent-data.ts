/*
 * What the AI Agent actually returns, copied from the product design (Figma
 * file DJ7Fzl9nbBvy3l2Xp0tMUP, page "AI Agent", section "AI AGENT > Floating
 * Concept (USED)"). Questions, step names, figures, sources and the
 * assumptions line are the design's own words; the only edits are the
 * "Flavour" spelling, hyphen separators set as middots, and the cost tile's
 * label (the design repeats "Protein / serving" on both tiles).
 * Nothing on the AI Agent page may say more than these answers show.
 */

export type StarterKind = "list" | "compare" | "whatif";

export type Source = { title: string; desc: string };

export const STARTERS: {
  kind: StarterKind;
  label: string;
  /** The starter as it appears under "Try one of these". */
  starter: string;
  icon: string;
}[] = [
  {
    kind: "list",
    label: "List",
    starter: "Ingredients with no soy allergen, categorized as starches",
    icon: "view-list",
  },
  {
    kind: "compare",
    label: "Compare",
    starter: "Side-by-side nutrition labels: Recipe A vs Recipe B",
    icon: "distribute-horizontally",
  },
  {
    kind: "whatif",
    label: "What-if",
    starter: "If protein went to 10g, how does raw-material cost change?",
    icon: "trending-up",
  },
];

export const LIST_ANSWER = {
  question:
    "Show me all ingredients with no soy allergen, categorized as starches",
  steps: [
    "Parse intent: filter by starch category",
    "Exclude soy allergen",
    "Grouped list output with sources",
  ],
  stepCount: 4,
  groups: [
    {
      name: "Flours & meals",
      tag: "flour",
      items: [
        "Mocafine (mod. cassava flour)",
        "Cassava flour",
        "Corn starch",
        "Maizena (cornstarch)",
        "Coarse-ground cornmeal",
      ],
    },
    {
      name: "Grains & noodles",
      tag: "grain",
      items: [
        "Rice",
        "Brown rice",
        "Rice noodles",
        "Dried vermicelli",
        "Capellini",
      ],
    },
    {
      name: "Starchy vegetables",
      tag: "veg",
      items: ["Potatoes", "Sweet potatoes", "Corn"],
    },
  ],
};

export const COMPARE_ANSWER = {
  question:
    "Show me the side-by-side nutrition labels of Recipe A and Recipe B",
  stepCount: 3,
  rows: [
    { nutrient: "Calories", a: "150", b: "190", gap: true },
    { nutrient: "Total Fat", a: "6g", b: "9g" },
    { nutrient: "Saturated Fat", a: "2g", b: "4g" },
    { nutrient: "Cholesterol", a: "15mg", b: "30mg" },
    { nutrient: "Sodium", a: "95mg", b: "120mg" },
    { nutrient: "Total Carb", a: "18g", b: "24g" },
    { nutrient: "Total Sugars", a: "9g", b: "16g", gap: true },
    { nutrient: "Protein", a: "8g", b: "3g", gap: true },
  ],
  summary: "Recipe A: +5g protein, 7g less sugar, 40 fewer calories.",
  sources: [
    {
      title: "Recipe A · Protein Brownie v3",
      desc: "Whey-isolate forward formula, 8g protein per 40g serving.",
    },
    {
      title: "Recipe B · Classic Fudge Brownie",
      desc: "Traditional butter and sugar formula, 3g protein per 40g serving.",
    },
  ] as Source[],
};

export const WHATIF_ANSWER = {
  question:
    "If we increase the protein to 10g in this recipe, how will that affect the cost of raw materials?",
  steps: [
    "Read current formula and protein target",
    "Find cheapest lever to add 2g protein",
    "Recost raw materials and compute delta",
  ],
  stepCount: 4,
  tiles: [
    { label: "Protein / serving", from: "8g", to: "10g", delta: "+2g · +25%" },
    {
      label: "Cost / serving",
      from: "$0.45",
      to: "$0.57",
      delta: "+$0.11 · +24.9%",
    },
  ],
  materials: [
    {
      item: "Whey protein isolate",
      now: "$21.60",
      next: "$33.30",
      delta: "+$11.70",
      up: true,
    },
    {
      item: "All-purpose flour",
      now: "$1.20",
      next: "$0.84",
      delta: "−$0.36",
      up: false,
    },
  ],
  unchanged: "+4 other materials unchanged (cocoa, sugar, butter, eggs)",
  total: { now: "$45.45", next: "$56.79", delta: "+$11.34" },
  assumptions:
    "Assumes current supplier prices and 90%-protein whey isolate. Excludes labor, package and overhead.",
  sources: [
    {
      title: "Protein Brownie v3 · formula",
      desc: "Current batch sheet, 100 servings, 6 raw materials.",
    },
    {
      title: "Supplier price list (current)",
      desc: "Whey protein isolate $18.00/kg; flour $1.20/kg; live unit costs.",
    },
    {
      title: "Costing model · raw materials",
      desc: "Batch to per-serving raw-material cost calculation.",
    },
    {
      title: "Texture guardrails note",
      desc: "Flour reduction limits when protein is increased.",
    },
  ] as Source[],
};

/** The composer's "+" menu, in the design's order and words. */
export const ADD_MENU = [
  { glyph: "#", label: "Mention a recipe" },
  { glyph: "@", label: "Mention someone" },
  { icon: "file-text", label: "Add file or document" },
  { icon: "link", label: "Add a link" },
  { icon: "doc-detail", label: "Use current page as context" },
  { icon: "copy", label: "Use AI Agent output as context" },
] as const;

/** The product's own footnote under every answer, verbatim. */
export const DISCLAIMER =
  "AI Agent answers draw only from your org's data. Verify before relying on results.";
