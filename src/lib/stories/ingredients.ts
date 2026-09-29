import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Ingredients: page "Recipes" (357:33739). New Ingredient → Ingredient
 * Statement v3 (2014:69715) → "Generate Ingredients" opens the breakdown
 * (2014:69779); both exported at 0.99444 so they share the 1432 width of the
 * admin frames. Then Admin → Recipes → Ingredient Fields, section
 * "Inredient Fields" (5475:89962): fields (5421:87572) → hover Price to
 * remove it (5455:89591) → Price back in Available Fields (5421:87760) →
 * Process Step added (5455:89756). Last, "Ingredient Fields > Custom
 * Calculations_v3" (5403:86992). The cuts from the modal to Admin and from
 * Ingredient Fields to Custom Calculations have no click in Figma, so the
 * pointer parks for them.
 */

const FIT: Cam = { cx: 716, cy: 450, zoom: 1 };
const MODAL: Cam = { cx: 740, cy: 450, zoom: 1.3 };
const FIELDS: Cam = { cx: 640, cy: 470, zoom: 1.35 };

/* The Ingredients / Percentage table the statement breaks into. */
const TABLE: Box = { x: 640, y: 438, w: 442, h: 304 };
/* The Price chip, back under Available Fields. */
const PRICE_CHIP: Box = { x: 524, y: 745, w: 65, h: 38 };
/* The new Process Step row. */
const PROCESS_ROW: Box = { x: 428, y: 636, w: 372, h: 46 };
/* The Chemical / Physical group of custom calculations. */
const CHEM: Box = { x: 428, y: 578, w: 360, h: 462 };

export const ingredientsStory: Story = {
  dir: "/stories/ingredients",
  width: 1432,
  fitHeight: 900,
  version: 1,
  label:
    "Walkthrough of the ingredient library: an ingredient's statement broken into its ingredients and percentages, then the admin Ingredient Fields page, where the Price field is removed, Process Step is added as a column, and custom calculations are picked for recipes.",
  frames: {
    statement: 895,
    "statement-generated": 895,
    fields: 938,
    "field-hover": 938,
    "field-removed": 938,
    "field-added": 952,
    "custom-calculations": 1199,
  },
  steps: [
    { frame: "statement", cam: FIT, cursor: null, caption: "An ingredient's statement", hold: 1500 },
    { cam: MODAL, cursor: [732, 413], caption: "1  Ingredient statement", hold: 1100 },
    { click: true, hold: 350 },
    { frame: "statement-generated", cam: { cx: 780, cy: 560, zoom: 1.35 }, cursor: [880, 600], highlight: TABLE, caption: "2  Each ingredient and its percentage", hold: 2000 },
    { frame: "fields", cam: FIT, cursor: null, highlight: null, caption: "3  Set the ingredient columns recipes use", hold: 1700 },
    { cam: FIELDS, cursor: [688, 424], hold: 1000 },
    { frame: "field-hover", cursor: [787, 420], caption: "Hover a field to remove it", hold: 1100 },
    { click: true, hold: 350 },
    { frame: "field-removed", cursor: [600, 800], highlight: PRICE_CHIP, caption: "4  Price moves to Available Fields", hold: 1600 },
    { cursor: [487, 722], highlight: null, hold: 1000 },
    { click: true, hold: 350 },
    { frame: "field-added", cam: { cx: 640, cy: 560, zoom: 1.35 }, cursor: [700, 700], highlight: PROCESS_ROW, caption: "5  Process Step becomes a column", hold: 1800 },
    { frame: "custom-calculations", cam: { cx: 780, cy: 400, zoom: 1.3 }, cursor: null, highlight: null, caption: "6  Pick the custom calculations to track", hold: 1700 },
    { cursor: [446, 459], hold: 1000 },
    { cam: { cx: 780, cy: 800, zoom: 1.3 }, cursor: [560, 795], highlight: CHEM, caption: "pH, ash, acidity, fat, salt and more", hold: 2000 },
    { frame: "statement", cam: FIT, cursor: null, highlight: null, caption: "An ingredient's statement", hold: 1400 },
  ],
};
