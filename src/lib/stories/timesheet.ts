import type { Cam, Story } from "@/components/home/screen-story";

/*
 * Timesheet, from the Figma page "Timesheet" (3404:69675). The week
 * (3501:83795) → a new entry named in the bar (3521:77706) → activity type
 * (3521:77911) → project (3521:78132) → expense (3521:81450); then an entry
 * opened on the calendar (3829:16780) and its Edit Activity dialog
 * (3829:50369). Exported at scale 1 as 1448 wide with a 4px canvas margin
 * each side, cropped back to the 1440 frame.
 */

const FIT: Cam = { cx: 720, cy: 450, zoom: 1 };

export const timesheetStory: Story = {
  dir: "/stories/timesheet",
  width: 1440,
  fitHeight: 900,
  version: 1,
  label:
    "Walkthrough of the Timesheet: naming a new entry on the weekly calendar, picking its activity type, linking a project and adding an expense, then opening an existing entry and editing it.",
  frames: {
    "week": 952,
    "new-entry": 900,
    "activity-type": 900,
    "project": 900,
    "expense": 900,
    "activity-detail": 900,
    "edit-activity": 900,
  },
  steps: [
    { frame: "week", cam: FIT, cursor: [760, 640], caption: "Your week on the timesheet", hold: 1500 },
    { cam: { cx: 720, cy: 330, zoom: 1.35 }, cursor: [300, 215], highlight: { x: 81, y: 184, w: 1280, h: 62 }, hold: 1100 },
    { click: true, hold: 380 },
    { frame: "new-entry", cam: { cx: 880, cy: 330, zoom: 1.35 }, cursor: [1120, 219], caption: "1  Name what you're working on", highlight: { x: 895, y: 194, w: 450, h: 50 }, hold: 1500 },
    { cursor: [911, 219], highlight: null, hold: 900 },
    { click: true, hold: 340 },
    { frame: "activity-type", cam: { cx: 900, cy: 330, zoom: 1.35 }, cursor: [926, 342], caption: "2  Pick an activity type", highlight: { x: 856, y: 238, w: 279, h: 293 }, hold: 1700 },
    { click: true, hold: 340 },
    { frame: "project", cursor: [1028, 342], caption: "3  Link it to a project", highlight: { x: 895, y: 238, w: 279, h: 253 }, hold: 1700 },
    { click: true, hold: 340 },
    { frame: "expense", cursor: [1071, 297], caption: "4  Add an expense", highlight: { x: 941, y: 233, w: 282, h: 102 }, hold: 1700 },
    { cam: { cx: 560, cy: 430, zoom: 1.35 }, cursor: [420, 560], highlight: null, hold: 1200 },
    { click: true, hold: 340 },
    { frame: "activity-detail", cursor: [652, 410], caption: "Open an entry to see its details", highlight: { x: 331, y: 385, w: 400, h: 229 }, hold: 1800 },
    { click: true, hold: 340 },
    { frame: "edit-activity", cam: { cx: 720, cy: 450, zoom: 1.3 }, cursor: [853, 679], caption: "Edit the type, project, time or expense", highlight: null, hold: 2200 },
    { frame: "week", cam: FIT, cursor: null, caption: "Your week on the timesheet", highlight: null, hold: 1500 },
  ],
};
