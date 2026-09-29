import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Costing: page "Cost Sections" (357:33745), section "Cost Sections New".
 * Cost sidebar (1523:60060) → ⋮ menu (1550:72593) → Edit Assumptions
 * (1673:61227) → Save, back to the sidebar → "+ Add Assumption" → New
 * Assumption (1560:60522) → "+ New Category" (1560:61003) → category made
 * (1560:61402) → Create → New Assumption added (1550:73488), where the
 * roll-up shows new totals. All 1440 wide, scale 1. The modal and "added"
 * frames were drawn on a sidebar holding fewer assumptions than the first
 * frame; the camera stays on the modal and the new row to keep that quiet.
 */

const FIT: Cam = { cx: 720, cy: 450, zoom: 1 };
const SIDE: Cam = { cx: 1100, cy: 520, zoom: 1.4 };
const MODAL: Cam = { cx: 720, cy: 440, zoom: 1.3 };

/* Packaging, tolling and freight assumptions on the full sidebar. */
const GROUPS: Box = { x: 1045, y: 405, w: 315, h: 400 };
/* Cost / Case down to Retail Price on the full sidebar. */
const ROLLUP: Box = { x: 1045, y: 848, w: 315, h: 220 };
/* The "per" dropdowns in Edit Assumptions. */
const PER: Box = { x: 940, y: 358, w: 134, h: 187 };
/* The new category and its assumption. */
const NEW_ROW: Box = { x: 1045, y: 410, w: 315, h: 66 };

export const costingStory: Story = {
  dir: "/stories/costing",
  width: 1440,
  fitHeight: 900,
  version: 1,
  label:
    "Walkthrough of the recipe cost sidebar: packaging, tolling and freight assumptions rolled up to cost per case, margin and retail price; editing the assumptions and whether each is per unit, master case or pallet; then adding an assumption under a new category and seeing the totals change.",
  frames: {
    sidebar: 1131,
    "sidebar-menu": 1131,
    "edit-assumptions": 900,
    "new-assumption": 900,
    "new-category": 900,
    "category-selected": 900,
    "assumption-added": 1131,
  },
  steps: [
    { frame: "sidebar", cam: FIT, cursor: null, caption: "Cost sidebar on the recipe", hold: 1400 },
    { cam: { cx: 1100, cy: 600, zoom: 1.4 }, cursor: [1200, 500], highlight: GROUPS, caption: "Packaging, tolling and freight costs", hold: 1800 },
    { cam: { cx: 1100, cy: 900, zoom: 1.4 }, cursor: [1300, 960], highlight: ROLLUP, caption: "Rolled up to cost per case and price", hold: 1900 },
    { cam: { cx: 1100, cy: 420, zoom: 1.4 }, cursor: [1340, 237], highlight: null, hold: 1000 },
    { click: true, hold: 350 },
    { frame: "sidebar-menu", cursor: [1248, 280], caption: "Edit the assumptions", hold: 1000 },
    { click: true, hold: 350 },
    { frame: "edit-assumptions", cam: MODAL, cursor: [1005, 475], highlight: PER, caption: "Each cost per unit, master case or pallet", hold: 1900 },
    { cursor: [1053, 621], highlight: null, hold: 1000 },
    { click: true, hold: 350 },
    { frame: "sidebar", cam: { cx: 1100, cy: 700, zoom: 1.4 }, cursor: [1122, 825], caption: "Add an assumption", hold: 1100 },
    { click: true, hold: 350 },
    { frame: "new-assumption", cam: MODAL, cursor: [689, 400], caption: "Pick a cost category or make one", hold: 1300 },
    { click: true, hold: 350 },
    { frame: "new-category", cursor: [700, 401], caption: "Name the new category", hold: 1300 },
    { frame: "category-selected", cursor: [847, 628], caption: "Then create the assumption", hold: 1100 },
    { click: true, hold: 350 },
    { frame: "assumption-added", cam: SIDE, cursor: [1300, 453], highlight: NEW_ROW, caption: "It joins the cost sidebar", hold: 2600 },
    { frame: "sidebar", cam: FIT, cursor: null, highlight: null, caption: "Cost sidebar on the recipe", hold: 1400 },
  ],
};
