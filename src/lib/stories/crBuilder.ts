import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * CRM and the Customer Requirements Builder. Customer record 40000496:89173
 * (1440 wide, scale 1) and the opportunity linked to a project 40000498:89173
 * (1100 wide, exported at 1440/1100), both from "04 Pillars — synced to dev"
 * (40000475:89173). The builder is page CR Form (262:87349): Empty 262:87466,
 * Create new heading 262:93120, Heading Created 262:87690, Choose Sub level
 * type 262:88710 and Label > Singer Answer Added 262:91624, all 1440 wide at
 * scale 1. Customer → opportunity and section → sub-level menu → nested
 * levels are cuts, since the file has no frames for the steps between.
 */

const SIDE: Cam = { cx: 480, cy: 460, zoom: 1.35 };
const TIMELINE: Cam = { cx: 900, cy: 330, zoom: 1.35 };

/* Customer Information card on the customer record. */
const CUSTOMER_INFO: Box = { x: 80, y: 290, w: 347, h: 497 };
/* The Project field and its link on the opportunity. */
const PROJECT: Box = { x: 88, y: 356, w: 330, h: 56 };
/* The newest Sample Request card in the opportunity's timeline. */
const SAMPLE: Box = { x: 475, y: 271, w: 882, h: 401 };
/* Configure panel after the section is created. */
const CONFIGURE: Box = { x: 1077, y: 189, w: 283, h: 358 };
/* Sub-level type menu under "Add Sub Level". */
const MENU: Box = { x: 864, y: 305, w: 199, h: 255 };
/* The Grind level with its Lean Point label and % short answer inside. */
const NESTED: Box = { x: 426, y: 377, w: 596, h: 320 };
/* Configure panel for the short answer. */
const SHORT_ANSWER: Box = { x: 1077, y: 189, w: 283, h: 508 };

/* The record's header and history, framed above the attachment photo the
   dev data carries further down (a sticker snapshot, off topic here). */
const RECORD: Cam = { cx: 620, cy: 330, zoom: 1.3 };

export const crBuilderStory: Story = {
  dir: "/stories/cr-builder",
  width: 1440,
  fitHeight: 900,
  version: 1,
  label:
    "Walkthrough of the CRM and the Customer Requirements Builder: a customer record, an opportunity linked to its project with its sample requests, then building a requirements form with a new section, a sub-level type menu, and levels nested inside levels ending in a percentage short answer.",
  frames: {
    customer: 900,
    opportunity: 1050,
    "cr-empty": 1024,
    "cr-new-section": 1024,
    "cr-section": 1024,
    "cr-sub-level": 1024,
    "cr-nested": 1311,
  },
  steps: [
    { frame: "customer", cam: RECORD, cursor: [700, 420], caption: "A customer record and its history", hold: 1400 },
    { cam: SIDE, cursor: [150, 575], highlight: CUSTOMER_INFO, caption: "Type, segment, tier and owner", hold: 1800 },
    { frame: "opportunity", cursor: [248, 396], highlight: PROJECT, caption: "Opportunities link to their project", hold: 1900 },
    { cam: TIMELINE, cursor: [700, 455], highlight: SAMPLE, caption: "Sample requests logged against it", hold: 1900 },
    { cursor: [1219, 87], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "cr-empty", cam: { cx: 620, cy: 400, zoom: 1.2 }, cursor: [321, 228], caption: "Customer Requirements Builder", hold: 1300 },
    { click: true, hold: 340 },
    { frame: "cr-new-section", cam: { cx: 720, cy: 500, zoom: 1.4 }, cursor: [719, 465], caption: "1  Name a section, pick a type", hold: 1400 },
    { cursor: [847, 647], hold: 900 },
    { click: true, hold: 340 },
    { frame: "cr-section", cam: { cx: 720, cy: 420, zoom: 1.08 }, cursor: [1200, 470], highlight: CONFIGURE, caption: "2  Set type, layout and required", hold: 1800 },
    { frame: "cr-sub-level", cam: { cx: 880, cy: 400, zoom: 1.4 }, cursor: [937, 292], highlight: null, caption: "3  Add a sub-level under an option", hold: 1500 },
    { cursor: [958, 479], highlight: MENU, caption: "Label, short answer, single or multi", hold: 1600 },
    { frame: "cr-nested", cam: { cx: 720, cy: 480, zoom: 1.3 }, cursor: [523, 528], highlight: NESTED, caption: "4  Nest levels inside levels", hold: 1900 },
    { cam: { cx: 900, cy: 480, zoom: 1.3 }, cursor: [1200, 555], highlight: SHORT_ANSWER, caption: "A short answer taking a percentage", hold: 1900 },
    { frame: "customer", cam: RECORD, cursor: null, highlight: null, caption: "A customer record and its history", hold: 1400 },
  ],
};
