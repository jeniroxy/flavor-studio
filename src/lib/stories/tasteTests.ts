import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * Taste tests: one test ("Test Taste", /tastetest/2166) from its questionnaire
 * to a published report. Questionnaire, Tasters and Results are the dev-synced
 * screens in "04 Pillars — synced to dev" (40000475:89173): 40000488,
 * 40000489 and 40000490:89173, 1100 wide, exported at 1440/1100. The Publish
 * Content dialog is section "Filter 3" (6697:65251) on page Test Taste
 * (3404:69678): FILTER > Active 6697:65318, Filter by Products 6697:65390,
 * Filter by Tasters 6697:65497 and the filled state 6697:65607, 1432 wide,
 * exported at 1440/1432. The toggle-off state is left out; the dialog cuts in
 * already filtering, since no frame shows which button opens it.
 */

const FIT: Cam = { cx: 720, cy: 412.5, zoom: 1 };
const TOP: Cam = { cx: 700, cy: 340, zoom: 1.35 };
const DIALOG: Cam = { cx: 720, cy: 412, zoom: 1.12 };

/* The A/B question card on the Questionnaire tab. */
const QUESTION: Box = { x: 285, y: 349, w: 870, h: 228 };
/* Status column (Unconfirmed / Confirmed) on the Tasters tab. */
const STATUS: Box = { x: 728, y: 350, w: 210, h: 92 };
/* The per-question result card on the Results tab. */
const RESULT: Box = { x: 95, y: 222, w: 1250, h: 181 };
/* "Filters by Products and Tasters" block in the Publish Content dialog. */
const FILTERS: Box = { x: 483, y: 490, w: 474, h: 202 };

export const tasteTestsStory: Story = {
  dir: "/stories/taste-tests",
  width: 1440,
  fitHeight: 825,
  version: 1,
  label:
    "Walkthrough of a taste test: an A/B question on two coded samples in the questionnaire, the tasters invited and who has confirmed, the results for the question, then publishing a summary report filtered by product and taster.",
  frames: {
    questionnaire: 1050,
    tasters: 1050,
    results: 1050,
    "publish-filters": 825,
    "publish-products": 825,
    "publish-tasters": 825,
    "publish-ready": 825,
  },
  steps: [
    { frame: "questionnaire", cam: FIT, cursor: [760, 700], caption: "Build the taste test questionnaire", hold: 1400 },
    { cam: TOP, cursor: [368, 468], highlight: QUESTION, caption: "An A/B question on coded samples", hold: 2000 },
    { cursor: [200, 163], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "tasters", cam: { cx: 720, cy: 330, zoom: 1.2 }, cursor: [806, 371], highlight: STATUS, caption: "Invite tasters, see who confirmed", hold: 1900 },
    { cursor: [401, 163], highlight: null, hold: 1000 },
    { click: true, hold: 360 },
    { frame: "results", cam: { cx: 720, cy: 330, zoom: 1.15 }, cursor: [700, 352], highlight: RESULT, caption: "Results for each question", hold: 1900 },
    { frame: "publish-filters", cam: DIALOG, cursor: [720, 584], highlight: FILTERS, caption: "Publish a report, filtered", hold: 1600 },
    { click: true, highlight: null, hold: 360 },
    { frame: "publish-products", cursor: [527, 412], caption: "Choose the products it covers", hold: 1300 },
    { cursor: [720, 659], hold: 900 },
    { click: true, hold: 360 },
    { frame: "publish-tasters", cursor: [527, 489], caption: "And the tasters", hold: 1300 },
    { frame: "publish-ready", cursor: [908, 736], caption: "Publish the summary report as a PDF", hold: 1300 },
    { click: true, hold: 400 },
    { frame: "questionnaire", cam: FIT, cursor: null, highlight: null, caption: "Build the taste test questionnaire", hold: 1400 },
  ],
};
