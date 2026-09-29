import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Recipes: the add-ingredient flow, from the Figma section "Recipes
 * animation" (node 40000470:110275). "+ Add Ingredient" → Basic Information
 * → Nutrients / Allergens (v3, General opened, scrolled) → Certifications &
 * Documents → Procurement → Save; then the ingredient list, a sub-recipe
 * opened, a nested one, the inline edit a row offers on hover, and last the
 * Recipe Improvements row below "+ Add Ingredient". The older non-v3
 * Nutrients frame is left out so the flow does not show the same tab twice.
 */

const FIT: Cam = { cx: 720, cy: 465.5, zoom: 1 };
const MODAL: Cam = { cx: 720, cy: 470, zoom: 1.3 };
const TABLE: Cam = { cx: 480, cy: 420, zoom: 1.35 };

/* Row 3 (the sub-recipe with its edit controls showing) on the list frames. */
const ROW: Box = { x: 84, y: 380, w: 937, h: 60 };
/* The "AI recipe improvements" row under "+ Add Ingredient" on Recipe View. */
const IMPROVE: Box = { x: 84, y: 560, w: 941, h: 59 };

export const recipesStory: Story = {
  dir: "/recipe-story",
  width: 1440,
  fitHeight: 931,
  version: 2,
  label:
    "Walkthrough of the Recipe page: adding an ingredient through Basic Information, Nutrients and allergens, Certifications and documents and Procurement, then the ingredient list, sub-recipes and editing an ingredient inline on hover.",
  frames: {
    "recipe-view": 931,
    "add-basic": 900,
    "add-nutrients": 900,
    "add-nutrients-open": 1362,
    "add-certifications": 900,
    "add-procurement": 900,
    "sub-recipe": 931,
    "sub-recipe-nested": 931,
  },
  typing: [
    {
      frame: "add-basic",
      // The Name input's text box on the Basic Information frame.
      field: { x: 645, y: 170, w: 442, h: 38 },
      text: "Cocoa powder",
    },
  ],
  steps: [
    { frame: "recipe-view", cam: FIT, cursor: [760, 720], caption: "Your recipe, ingredient by ingredient", hold: 1300 },
    { cursor: [163, 529], hold: 1000 },
    { click: true, hold: 380 },
    { frame: "add-basic", cam: MODAL, cursor: [866, 189], caption: "1  Add an ingredient", hold: 900 },
    { click: true, typing: true, hold: 1700 },
    { cursor: [436, 196], hold: 850 },
    { click: true, hold: 320 },
    { frame: "add-nutrients", cursor: [700, 300], caption: "2  Nutrients and allergens", hold: 1000 },
    { click: true, hold: 320 },
    { frame: "add-nutrients-open", cam: { cx: 760, cy: 560, zoom: 1.3 }, cursor: [760, 470], hold: 1100 },
    { cam: { cx: 760, cy: 900, zoom: 1.3 }, cursor: [760, 820], hold: 1500 },
    { cam: { cx: 760, cy: 560, zoom: 1.3 }, cursor: [454, 448], hold: 1000 },
    { click: true, hold: 320 },
    { frame: "add-certifications", cam: MODAL, cursor: [410, 505], caption: "3  Certifications and documents", hold: 1500 },
    { click: true, hold: 320 },
    { frame: "add-procurement", cursor: [1029, 758], caption: "4  Procurement, then save", hold: 1500 },
    { click: true, hold: 400 },
    { frame: "recipe-view", cam: TABLE, cursor: [620, 640], caption: "Saved to the ingredient list", hold: 1700 },
    { cursor: [100, 410], hold: 950 },
    { click: true, hold: 320 },
    { frame: "sub-recipe", cam: { cx: 480, cy: 520, zoom: 1.35 }, cursor: [118, 607], caption: "Open a sub-recipe's ingredients", hold: 1500 },
    { click: true, hold: 320 },
    { frame: "sub-recipe-nested", cam: { cx: 480, cy: 580, zoom: 1.35 }, cursor: [420, 720], caption: "Sub-recipes nest inside sub-recipes", hold: 1700 },
    { cam: TABLE, cursor: [676, 410], highlight: ROW, caption: "Hover any ingredient to edit it inline", hold: 3400 },
    { frame: "recipe-view", cam: { cx: 560, cy: 520, zoom: 1.35 }, cursor: [330, 590], highlight: IMPROVE, caption: "Recipe Improvements from the AI Agent", hold: 3000 },
    { frame: "recipe-view", cam: FIT, cursor: null, highlight: null, caption: "Your recipe, ingredient by ingredient", hold: 1400 },
  ],
};
