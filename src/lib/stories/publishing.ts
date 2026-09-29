import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Publish & export: choosing what the Publish Recipe dialog puts out. From
 * the Figma page "Aggregat Nutrition Form" (357:33747): Ingredient
 * Statement v1 (2673:86633) → Allergen opened (2607:86162); then from
 * "Nutrient Content Claims" (357:33744) the claims content, v3 (875:52123);
 * then back to Label (2067:71886, the dialog the Publish button sits on).
 * All 1440x941, exported at scale 1.
 */

const FIT: Cam = { cx: 720, cy: 470.5, zoom: 1 };
const LEFT: Cam = { cx: 560, cy: 420, zoom: 1.35 };

/* Content and Quantities / Style on the Ingredient Statement frame. */
const CONTENT: Box = { x: 284, y: 198, w: 208, h: 160 };
const QUANTITIES: Box = { x: 284, y: 370, w: 208, h: 204 };

export const publishingStory: Story = {
  dir: "/stories/publishing",
  width: 1440,
  fitHeight: 941,
  version: 1,
  label:
    "Walkthrough of the Publish Recipe dialog: choosing the content, quantities and panel style, setting how the ingredient statement reads and which allergens go on the Contains line, the label column width, switching the content to nutrient content claims with output, region, method and file type, then back to the label and Publish.",
  frames: {
    "pub-statement": 941,
    "pub-allergens": 941,
    "pub-claims": 941,
    "pub-label": 941,
  },
  steps: [
    { frame: "pub-statement", cam: FIT, cursor: [700, 760], caption: "Publish Recipe: choose what goes out", hold: 1500 },
    { cam: LEFT, cursor: [302, 276], highlight: CONTENT, caption: "Recipe, label, composition or claims", hold: 1800 },
    { cursor: [302, 416], highlight: QUANTITIES, caption: "Per serving or per 100g, and panel style", hold: 1800 },
    { cam: { cx: 800, cy: 480, zoom: 1.35 }, cursor: [600, 420], highlight: { x: 506, y: 372, w: 290, h: 180 }, caption: "Set how the ingredient statement reads", hold: 1800 },
    { cursor: [960, 690], highlight: { x: 808, y: 648, w: 318, h: 80 }, caption: "It prints below the panel", hold: 1500 },
    { cursor: [545, 606], highlight: null, hold: 1000 },
    { click: true, hold: 380 },
    { frame: "pub-allergens", cam: { cx: 720, cy: 560, zoom: 1.3 }, cursor: [526, 486], highlight: { x: 506, y: 444, w: 152, h: 306 }, caption: "Tick allergens for the Contains line", hold: 1800 },
    { cursor: [880, 640], highlight: { x: 808, y: 604, w: 140, h: 24 }, caption: "Egg now shows under Contains", hold: 1600 },
    { cam: { cx: 720, cy: 660, zoom: 1.3 }, cursor: [680, 822], highlight: { x: 506, y: 802, w: 226, h: 40 }, caption: "Label column width, 2 to 5 inches", hold: 1600 },
    { cam: { cx: 720, cy: 400, zoom: 1.3 }, cursor: [300, 239], highlight: null, hold: 1100 },
    { click: true, hold: 380 },
    { frame: "pub-claims", cam: { cx: 600, cy: 470, zoom: 1.2 }, cursor: [560, 420], caption: "Or publish nutrient content claims", hold: 1600 },
    { cursor: [110, 610], highlight: { x: 56, y: 524, w: 150, h: 170 }, caption: "Then output, values, region, file type", hold: 1900 },
    { cursor: [72, 319], highlight: null, hold: 1000 },
    { click: true, hold: 380 },
    { frame: "pub-label", cam: { cx: 800, cy: 500, zoom: 1.2 }, cursor: [980, 700], caption: "Back to the label", hold: 1300 },
    { cursor: [1099, 778], hold: 1000 },
    { click: true, caption: "Then Publish", hold: 1100 },
    { frame: "pub-statement", cam: FIT, cursor: null, highlight: null, caption: "Publish Recipe: choose what goes out", hold: 1400 },
  ],
};
