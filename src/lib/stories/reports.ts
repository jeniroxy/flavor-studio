import type { Cam, Story } from "@/components/home/screen-story";

/*
 * Reports. From the "04 Pillars" synced-to-dev section (40000475:89173): the
 * Opportunity Pipeline report (40000500:89173) and, via its sub-nav, the
 * Sample Request report (40000501:89173), both 1100 wide exported at scale
 * 1.309 to 1440. Then the timesheet report from the page "Timesheet"
 * (3404:69675): Detailed (3521:83376) → Weekly (3521:88223), exported 1448
 * wide and cropped to the 1440 frame; their content runs to 928.
 * No frame links the two, so the story cuts between them without a click.
 */

const FIT: Cam = { cx: 720, cy: 464, zoom: 1 };

export const reportsStory: Story = {
  dir: "/stories/reports",
  width: 1440,
  fitHeight: 928,
  version: 1,
  label:
    "Walkthrough of Reports: the Opportunity Pipeline report by stage and probability, the Sample Request report and its download button, then the timesheet report with its filters, switched from Detailed to Weekly hours per activity type, and Export.",
  frames: {
    "opportunity-pipeline": 1050,
    "sample-request": 1050,
    "detailed": 928,
    "weekly": 928,
  },
  steps: [
    { frame: "opportunity-pipeline", cam: FIT, cursor: [760, 620], caption: "Reports on pipeline, samples and time", hold: 1500 },
    { cam: { cx: 1000, cy: 430, zoom: 1.35 }, cursor: [1300, 380], caption: "Opportunities by stage and probability", highlight: { x: 1105, y: 208, w: 258, h: 520 }, hold: 1900 },
    { cam: { cx: 720, cy: 330, zoom: 1.35 }, cursor: [869, 84], highlight: null, hold: 1100 },
    { click: true, hold: 360 },
    { frame: "sample-request", cam: { cx: 900, cy: 430, zoom: 1.35 }, cursor: [980, 420], caption: "Sample requests by product and date", highlight: { x: 696, y: 204, w: 661, h: 527 }, hold: 1800 },
    { cam: { cx: 560, cy: 330, zoom: 1.35 }, cursor: [333, 157], caption: "Download any report", highlight: { x: 311, y: 135, w: 44, h: 44 }, hold: 1600 },
    { frame: "detailed", cam: FIT, cursor: null, caption: "The timesheet report, entry by entry", highlight: null, hold: 1700 },
    { cam: { cx: 560, cy: 330, zoom: 1.35 }, cursor: [198, 133], caption: "Filter by type, project or hours", highlight: { x: 130, y: 112, w: 566, h: 42 }, hold: 1800 },
    { cam: { cx: 880, cy: 330, zoom: 1.35 }, cursor: [1311, 206], highlight: null, hold: 1100 },
    { click: true, hold: 360 },
    { frame: "weekly", cam: { cx: 880, cy: 480, zoom: 1.35 }, cursor: [1180, 560], caption: "Weekly hours per activity type", highlight: { x: 1236, y: 340, w: 92, h: 445 }, hold: 1900 },
    { cam: { cx: 880, cy: 330, zoom: 1.35 }, cursor: [1318, 133], caption: "Export the report", highlight: { x: 1283, y: 120, w: 80, h: 26 }, hold: 1600 },
    { frame: "opportunity-pipeline", cam: FIT, cursor: null, caption: "Reports on pipeline, samples and time", highlight: null, hold: 1400 },
  ],
};
