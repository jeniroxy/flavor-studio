/*
 * Scripted answers for the AI Agent demo.
 *
 * The prototype called `window.claude.complete` — a helper that only exists
 * inside the design tool. This build ships the same interaction with canned
 * responses instead, so the demo works offline and costs nothing to run.
 *
 * The copy follows the system prompt the prototype used: concise, operational,
 * explicit units, and a "Sources:" line naming plausible references.
 */

export type ChatMessage = { role: "user" | "agent"; text: string };

export type Suggestion = { label: string; prompt: string };

export const suggestions: Suggestion[] = [
  {
    label: "Soy-free starch under $2.10/kg?",
    prompt:
      "Find me a non-GMO starch with no soy cross-contact under $2.10/kg.",
  },
  {
    label: "Reduce sodium 20% — claim impact?",
    prompt:
      "If I cut sodium 20% in a chicken broth, what nutrient content claim could I make and what should I watch for?",
  },
  {
    label: "Swap butter to cut cost",
    prompt:
      "How can I swap butter in a cookie to cut cost 8% while keeping the sensory score?",
  },
  {
    label: "Allergens in a granola bar?",
    prompt:
      "What big-9 allergens are typically in a nut-and-oat granola bar, and what Contains statement do I need?",
  },
];

type ScriptedAnswer = { match: RegExp; answer: string };

const ANSWERS: ScriptedAnswer[] = [
  {
    match: /starch|non-gmo|soy.*cross|cross.*contact/i,
    answer: `Three candidates in your library clear both constraints:

• Waxy corn starch, native — $1.84/kg, dedicated non-soy line, cold-swell viscosity 640 cP
• Tapioca starch, modified (E1442) — $2.04/kg, allergen-free facility, best freeze-thaw stability
• Potato starch, native — $1.96/kg, highest peak viscosity but shortest hold

All three are non-GMO Project verified and carry a signed no-soy-cross-contact letter. If your process runs above 95 °C, the modified tapioca holds viscosity best; native corn is the cheapest but loses ~18% viscosity after retort.

Sources: ingredient library (supplier specs, Q3 pricing), allergen statements on file`,
  },
  {
    match: /sodium|salt|101\.61|reduced sodium/i,
    answer: `A 20% cut takes you from 540 mg to 430 mg per 240 mL serving. That qualifies for a "Reduced sodium" claim — 21 CFR 101.61(b)(6) requires at least a 25% reduction versus the reference food, and your reference (RACC-matched commercial broth) sits at 610 mg, so you clear it at 29.5%.

Two things to watch:
• The comparative claim must state the reference food and the percentage on the label — "25% less sodium than regular chicken broth".
• Salinity perception drops with it. Potassium chloride at 0.4% held the panel's salt intensity within 2 points of control on Taste test #212; above 0.6% panelists flagged bitterness.

You do not qualify for "Low sodium" — that needs ≤140 mg per RACC.

Sources: 21 CFR 101.61, Taste test #212, Broth v4`,
  },
  {
    match: /butter|cut cost|cost 8|swap.*cost|cheaper/i,
    answer: `Replacing 40% of the butter with a high-oleic sunflower blend takes cost from $7.21 to $6.62 per batch — an 8.2% cut.

• Butter, cultured 82%: 225 g → 135 g ($1.92 → $1.15)
• High-oleic sunflower blend, 80% fat: 0 g → 88 g (+$0.42)
• Lift whey protein isolate 3% to hold structure (+$0.14)

Fat total and allergen declaration are unchanged (milk still present from the remaining butter). Expect a small hit to flavour depth — the last panel scored the 40% blend at 7.4/9 overall liking versus 7.8 for all-butter, which is inside the noise band for a 48-panelist triangle test.

Above a 50% swap the crumb turns short and the score drops off sharply.

Sources: ingredient library, Taste test #212, cost assumptions (Q3)`,
  },
  {
    // Matched on allergen vocabulary only — keying off "granola" would swallow
    // cost and nutrition questions that merely name the product.
    match: /allergen|big.?9|contains statement|cross-contact|falcpa/i,
    answer: `A typical nut-and-oat granola bar carries three of the big nine:

• Tree nuts — almonds, and often cashew or pecan
• Milk — from butter, whey or milk-chocolate drizzle
• Soy — usually soy lecithin in the chocolate or the binding syrup

Wheat appears if the oats are not certified gluten-free; oats themselves are not a big-9 allergen but share handling lines with wheat almost everywhere.

Your Contains statement would read: Contains: Almonds, Milk, Soy. Cross-contact language ("May contain peanuts") is voluntary under FALCPA but is expected by most retail buyers when the line also runs peanut SKUs.

Sources: 21 CFR 117, FASTER Act 2021, ingredient library allergen tags`,
  },
  {
    match: /label|fda|nutrition facts|cfia|canad/i,
    answer: `Labels regenerate from the formula, so nothing is re-keyed. Supported layouts: vertical, tabular, side-by-side, linear and dual column, in FDA 2016 format and Canadian bilingual (CFIA) side by side.

For your current v4 bar the panel resolves to 210 kcal, 9 g total fat (12% DV), 105 mg sodium (5% DV), 28 g carbohydrate (10% DV), 4 g fibre (14% DV), 6 g protein — per 52 g serving, 8 servings per container.

Export as PNG for internal review or high-res vector PDF for your packaging designer.

Sources: 21 CFR 101.9, Health Canada B.01.401, Broth v4 nutrient panel`,
  },
  {
    match: /cost|margin|price|yield|batch/i,
    answer: `On the current v4 formula: $4.62 per batch, 36 bars, $0.34 cost per serving. At a $2.99 retail price that is a 71% gross margin before packaging and freight.

The three biggest cost lines are almond butter (45%), maple syrup (29%) and oat flour (16%). A 10% almond-butter price move shifts batch cost by roughly $0.21 — worth a forward contract if you are scaling the SKU.

Sources: cost assumptions (Q3), ingredient library, Granola bar v4`,
  },
  {
    match: /protein|fiber|fibre|sugar|nutrient|nutrition/i,
    answer: `Per 52 g serving the v4 bar delivers 12 g protein (24% DV), 4 g dietary fibre (14% DV), 9 g total fat (12% DV) and 8 g added sugars (16% DV).

That clears "Good source of protein" (≥10% DV, 21 CFR 101.54) and is one gram of fibre short of "Good source of fibre". Lifting oat bran by 6 g per batch would close the gap without moving cost more than $0.03 per serving.

Sources: 21 CFR 101.54, USDA FoodData Central, Granola bar v4`,
  },
];

const FALLBACK = `That one needs your workspace data to answer precisely — in the product the Agent reads your recipes, ingredient library, cost assumptions and taste-test history, then cites the exact record it drew from.

For a public demo like this it can cover formulation and substitutions, nutrition and allergen roll-ups, FDA and CFIA labeling, nutrient content claims, and yield and costing. Try one of the starter questions, or ask about an ingredient swap, a claim you are chasing, or a cost target.

Sources: this is a scripted demo — request a demo to see it on your own formulas`;

/** Pick the scripted reply for a free-text or starter question. */
export function scriptedAnswer(question: string): string {
  const found = ANSWERS.find((entry) => entry.match.test(question));
  return found ? found.answer : FALLBACK;
}

/** Rough "thinking" pause, scaled to answer length so it feels earned. */
export function thinkingDelay(answer: string): number {
  return Math.min(2200, 700 + answer.length * 1.6);
}
