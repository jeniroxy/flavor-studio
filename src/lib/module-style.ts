import type { moduleGroups } from "@/lib/modules";

/*
 * How the module groups and modules present themselves across the site: one
 * hue per group from the brand ramp (its hexagon, its tint) and each module's
 * headline as its own feature page states it. Shared by the nav and the
 * features index so the two always agree.
 */

/* One hue per module group, from the brand ramp. Used on the group's hex and
   the preview's ground, so the three columns read as one group. */
export const GROUP: Record<
  (typeof moduleGroups)[number],
  { hue: string; tint: string; short: string }
> = {
  Formulation: { hue: "#7fd234", tint: "#f1f8e2", short: "Build the recipe" },
  "Nutrition & compliance": {
    hue: "#59a3eb",
    tint: "#eef6fd",
    short: "Label with certainty",
  },
  Sensory: { hue: "#18bc9c", tint: "#e3f7f2", short: "Test what you made" },
  "Project management": {
    hue: "#2060a6",
    tint: "#eaf1f9",
    short: "Ship the product",
  },
  Commercial: { hue: "#efc051", tint: "#fcf3da", short: "Sell the product" },
  Platform: { hue: "#324561", tint: "#eef1f6", short: "Scale with confidence" },
};

/* Each module's headline, as its own page states it. */
export const LINE: Record<string, string> = {
  recipes: "Formulate once. Scale anywhere.",
  ingredients: "One library. Every recipe follows.",
  costing: "Know the margin before the batch.",
  versions: "Iterate freely. Never lose the original.",
  labeling: "Compliant labels, regenerated with the formula.",
  claims: "Know which claims you can make.",
  designer: "Spec sheets that look the same every time.",
  "taste-tests": "Sensory data that flows back into the formula.",
  projects: "Launches move through stage gates, not inboxes.",
  timeline: "See where a slip actually lands.",
  board: "The launch, as today's work.",
  timesheet: "R&D time your finance team actually trusts.",
  reports: "Answer management from the system.",
  crm: "Connect the front line to R&D.",
  "cr-builder": "Brief once, in your own structure.",
  publishing: "Your data, in the form the recipient needs.",
  integrations: "Connected to the systems you already run.",
  admin: "Trade secrets, treated that way.",
};
