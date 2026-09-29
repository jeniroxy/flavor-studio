import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Nutrition labels: the Aggregate layout of the label, from the Figma page
 * "Aggregat Nutrition Form" (357:33747). Default (2067:71886, FDA panel
 * 2067:72112) → "+ Add receipes" → a second column (2067:72948) → a third
 * (2067:73775) → hover shows the row menu (2072:73288) → menu open
 * (2072:76379) → the column marked Edited (2111:72303) → its menu with
 * "Set to Original" (2111:73213). All 1440x941, exported at scale 1.
 */

const FIT: Cam = { cx: 720, cy: 470.5, zoom: 1 };
const DIALOG: Cam = { cx: 720, cy: 500, zoom: 1.25 };
const FIELDS: Cam = { cx: 760, cy: 500, zoom: 1.4 };

/* The label preview on the default frame (node 2067:72112). */
const LABEL: Box = { x: 802, y: 226, w: 352, h: 383 };
/* The six layout radios, Vertical to Aggregate. */
const LAYOUTS: Box = { x: 504, y: 252, w: 206, h: 196 };

export const labelingStory: Story = {
  dir: "/stories/labeling",
  width: 1440,
  fitHeight: 941,
  version: 1,
  label:
    "Walkthrough of the Nutrition Facts label in the Publish Recipe dialog: the six label layouts, then the Aggregate layout with a second and third recipe added as columns, a column's value edited from its menu and marked Edited, and the option to set it back to the original.",
  frames: {
    "agg-default": 941,
    "agg-two": 941,
    "agg-three": 941,
    "agg-more": 941,
    "agg-menu": 941,
    "agg-edited": 941,
    "agg-edited-menu": 941,
  },
  steps: [
    { frame: "agg-default", cam: FIT, cursor: [980, 700], caption: "A Nutrition Facts label for the recipe", hold: 1500 },
    { cam: { cx: 900, cy: 420, zoom: 1.4 }, cursor: [1000, 420], highlight: LABEL, caption: "The label previews as you set it up", hold: 1800 },
    { cam: { cx: 640, cy: 430, zoom: 1.4 }, cursor: [522, 430], highlight: LAYOUTS, caption: "Six layouts, from vertical to aggregate", hold: 2000 },
    { cursor: [597, 508], highlight: null, hold: 1000 },
    { click: true, hold: 380 },
    { frame: "agg-two", cam: DIALOG, cursor: [600, 518], highlight: { x: 1092, y: 226, w: 116, h: 383 }, caption: "Add a recipe as a second column", hold: 1700 },
    { cursor: [553, 556], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "agg-three", cursor: [560, 600], highlight: { x: 930, y: 226, w: 332, h: 383 }, caption: "Three recipes side by side on one label", hold: 1800 },
    { cam: FIELDS, cursor: [560, 518], highlight: null, hold: 900 },
    { frame: "agg-more", cursor: [644, 518], caption: "Each recipe has its own menu", hold: 1000 },
    { click: true, hold: 360 },
    { frame: "agg-menu", cursor: [584, 558], caption: "Edit a column's value or delete it", hold: 1500 },
    { click: true, hold: 360 },
    { frame: "agg-edited", cursor: [560, 600], highlight: { x: 436, y: 498, w: 230, h: 40 }, caption: "Edited columns are marked Edited", hold: 1800 },
    { cursor: [644, 518], highlight: null, hold: 900 },
    { frame: "agg-edited-menu", click: true, hold: 400 },
    { cursor: [597, 646], highlight: { x: 506, y: 624, w: 160, h: 44 }, caption: "Set to Original undoes the edit", hold: 1800 },
    { frame: "agg-default", cam: FIT, cursor: null, highlight: null, caption: "A Nutrition Facts label for the recipe", hold: 1400 },
  ],
};
