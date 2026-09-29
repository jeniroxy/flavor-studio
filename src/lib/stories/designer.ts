import type { Cam, Story } from "@/components/home/screen-story";

/*
 * Publish Designer, from the Figma page "Reporting Templates Tools"
 * (3404:69677), section "Publish Designer" (5840:41364). Empty page
 * (6048:8044) → "+" opens the element menu (6048:9894) → Recipe Name placed
 * and selected (6071:72422) → the ingredient table selected (5801:10199) →
 * its "..." menu (6073:73441) → Pages preview (5878:10294) → the Templates
 * list (5840:41431). All 1440 wide at scale 1; only the ingredient frame is
 * taller (1324).
 */

const FIT: Cam = { cx: 720, cy: 410, zoom: 1 };

export const designerStory: Story = {
  dir: "/stories/designer",
  width: 1440,
  fitHeight: 820,
  version: 1,
  label:
    "Walkthrough of the Publish Designer: adding a Recipe Name element from the element menu, setting its position and type in the Design panel, styling the ingredient table and its row and column menu, previewing the pages and opening the list of saved templates.",
  frames: {
    "add-element": 820,
    "element-menu": 820,
    "recipe-name": 820,
    "ingredients": 1324,
    "table-menu": 820,
    "page-preview": 820,
    "templates": 820,
  },
  steps: [
    { frame: "add-element", cam: FIT, cursor: [640, 500], caption: "A blank page in the Publish Designer", hold: 1300 },
    { cam: { cx: 560, cy: 330, zoom: 1.35 }, cursor: [304, 192], hold: 1000 },
    { click: true, hold: 380 },
    { frame: "element-menu", cursor: [430, 326], caption: "1  Add an element from the menu", hold: 1100 },
    { click: true, hold: 340 },
    { frame: "recipe-name", cursor: [700, 196], caption: "2  The element shows the recipe name", hold: 1500 },
    { cam: { cx: 900, cy: 340, zoom: 1.35 }, cursor: [1262, 200], caption: "Set its position, font and size", highlight: { x: 1202, y: 150, w: 234, h: 400 }, hold: 1800 },
    { cam: { cx: 640, cy: 360, zoom: 1.35 }, cursor: [930, 352], highlight: null, hold: 1000 },
    { click: true, hold: 340 },
    { frame: "ingredients", cam: { cx: 886, cy: 420, zoom: 1.3 }, cursor: [1250, 330], caption: "3  Style the ingredient table", highlight: { x: 1202, y: 281, w: 234, h: 450 }, hold: 1800 },
    { cursor: [762, 201], highlight: null, hold: 1000 },
    { click: true, hold: 340 },
    { frame: "table-menu", cam: { cx: 760, cy: 440, zoom: 1.35 }, cursor: [835, 544], caption: "Add rows, columns or merge cells", highlight: { x: 755, y: 207, w: 200, h: 544 }, hold: 1800 },
    { cam: FIT, cursor: [575, 776], highlight: null, hold: 1100 },
    { click: true, hold: 340 },
    { frame: "page-preview", cursor: [681, 696], caption: "4  Preview every page", highlight: { x: 644, y: 658, w: 152, h: 76 }, hold: 1700 },
    { cursor: [101, 27], highlight: null, hold: 1000 },
    { click: true, hold: 340 },
    { frame: "templates", cam: { cx: 560, cy: 330, zoom: 1.35 }, cursor: [225, 140], caption: "Reuse any saved template", highlight: { x: 62, y: 42, w: 358, h: 226 }, hold: 1900 },
    { frame: "add-element", cam: FIT, cursor: null, caption: "A blank page in the Publish Designer", highlight: null, hold: 1400 },
  ],
};
