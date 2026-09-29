import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Content claims: the Nutrient Content Claims view of Publish Recipe, from
 * the Figma page "Nutrient Content Claims" (357:33744), the v1 row. Default
 * with Add Sugar and Sodium ticked (1084:50762) → "Select All" hovered
 * (1216:53439) → all six selected (1216:52038) → "Clear" (1216:52750).
 * All 1440x941, exported at scale 1.
 */

const FIT: Cam = { cx: 720, cy: 470.5, zoom: 1 };
const TABLE: Cam = { cx: 900, cy: 380, zoom: 1.4 };
const PICKER: Cam = { cx: 620, cy: 400, zoom: 1.35 };

/* The Sodium and Add Sugar rows of the claims table on the default frame. */
const SODIUM: Box = { x: 478, y: 288, w: 898, h: 68 };
const SUGAR: Box = { x: 478, y: 356, w: 898, h: 64 };

export const claimsStory: Story = {
  dir: "/stories/claims",
  width: 1440,
  fitHeight: 941,
  version: 1,
  label:
    "Walkthrough of Nutrient Content Claims in the Publish Recipe dialog: each claim's RDI or daily value threshold beside the recipe's actual value, sodium qualifying for Low and added sugar falling short, then Select All to check every claim and Clear to empty the list.",
  frames: {
    "claims-default": 941,
    "claims-hover": 941,
    "claims-all": 941,
    "claims-cleared": 941,
  },
  steps: [
    { frame: "claims-default", cam: FIT, cursor: [900, 560], caption: "Claims checked against their thresholds", hold: 1500 },
    { cam: TABLE, cursor: [900, 322], highlight: SODIUM, caption: "Sodium at 100mg, under the 140mg limit", hold: 2200 },
    { cursor: [880, 388], highlight: SUGAR, caption: "Added sugar at 5% misses the 10% mark", hold: 2200 },
    { cam: PICKER, cursor: [340, 354], highlight: { x: 280, y: 306, w: 170, h: 192 }, caption: "Pick which claims to check", hold: 1500 },
    { frame: "claims-hover", cursor: [316, 260], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "claims-all", cam: { cx: 830, cy: 470, zoom: 1.3 }, cursor: [760, 600], highlight: { x: 478, y: 288, w: 898, h: 388 }, caption: "Every claim, each against its threshold", hold: 2200 },
    { cursor: [385, 260], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "claims-cleared", cam: PICKER, cursor: [700, 470], caption: "Clear the list to start over", hold: 1600 },
    { cursor: [299, 322], hold: 900 },
    { click: true, hold: 320 },
    { cursor: [299, 354], hold: 700 },
    { click: true, hold: 320 },
    { frame: "claims-default", cam: { cx: 830, cy: 400, zoom: 1.3 }, cursor: [760, 480], highlight: { x: 478, y: 248, w: 898, h: 172 }, caption: "Only the claims you picked", hold: 1800 },
    { frame: "claims-default", cam: FIT, cursor: null, highlight: null, caption: "Claims checked against their thresholds", hold: 1400 },
  ],
};
