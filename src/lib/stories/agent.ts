import type { Box, Cam, Story } from "@/components/home/screen-story";

/*
 * AI Agent: the COMPARE prompt, from the Figma page "AI Agent" (3404:69680),
 * section "AI AGENT > Floating Concept (USED)" (8035:30189), sub-section
 * "Show me the side by side nutritional labels of recipe A and recipe B"
 * (8042:43934). AI Agent in the nav bar (8039:31907) → the panel open with
 * its starters and the prompt ending in "@" (8039:33239) → the recipe list
 * "@" opens (8039:35593) → both recipes attached (8039:38122) → the answer
 * with its steps and the side-by-side table (8042:40030) → "2 Sources"
 * opened (8042:43106). All six exported at scale 1. Figma has no frame of the
 * open panel with an empty composer, so nothing is typed on top.
 */

const FIT: Cam = { cx: 720, cy: 481, zoom: 1 };
const STARTERS_CAM: Cam = { cx: 930, cy: 460, zoom: 1.4 };
const COMPOSER_CAM: Cam = { cx: 930, cy: 640, zoom: 1.4 };
const ANSWER_CAM: Cam = { cx: 880, cy: 420, zoom: 1.3 };
const SOURCES_CAM: Cam = { cx: 880, cy: 680, zoom: 1.3 };

/* The three "Try one of these" cards on the open panel. */
const STARTERS: Box = { x: 1018, y: 391, w: 394, h: 251 };
/* The two recipe chips above the composer. */
const CHIPS: Box = { x: 1018, y: 687, w: 198, h: 56 };
/* "Thinking completed" and "Completed 3 steps". */
const STEPS: Box = { x: 1016, y: 244, w: 170, h: 60 };
/* The side-by-side nutrition table. */
const TABLE: Box = { x: 1018, y: 367, w: 394, h: 320 };
/* The "2 Sources" popover. */
const SOURCES: Box = { x: 1018, y: 551, w: 394, h: 206 };
/* The line under the composer. */
const DISCLAIMER: Box = { x: 1016, y: 959, w: 384, h: 20 };

export const agentStory: Story = {
  dir: "/stories/agent",
  width: 1440,
  fitHeight: 962,
  version: 1,
  label:
    "Walkthrough of the AI Agent: opening the panel from the nav bar, the starter prompts, typing @ to attach two recipes to a question, the answer with its completed steps and side-by-side nutrition labels, then the two sources it drew from.",
  frames: {
    "agent-closed": 962,
    "agent-open": 962,
    "agent-mention": 962,
    "agent-recipes": 962,
    "agent-answer": 1072,
    "agent-sources": 1072,
  },
  steps: [
    { frame: "agent-closed", cam: FIT, cursor: [760, 560], caption: "The AI Agent sits in the nav bar", hold: 1400 },
    { cursor: [1308, 24], hold: 1000 },
    { click: true, hold: 380 },
    { frame: "agent-open", cam: STARTERS_CAM, cursor: [1215, 525], highlight: STARTERS, caption: "Try a starter, or ask your own", hold: 1700 },
    { cam: COMPOSER_CAM, cursor: [1338, 771], highlight: null, caption: "Type @ to add a recipe", hold: 1300 },
    { click: true, hold: 350 },
    { frame: "agent-mention", cursor: [1165, 489], caption: "Pick the recipes to compare", hold: 1100 },
    { click: true, hold: 340 },
    { cursor: [1177, 548], hold: 900 },
    { click: true, hold: 340 },
    { frame: "agent-recipes", cursor: [1300, 716], highlight: CHIPS, caption: "Both recipes attached to the question", hold: 1500 },
    { cursor: [1382, 826], highlight: null, hold: 900 },
    { click: true, hold: 380 },
    { frame: "agent-answer", cam: ANSWER_CAM, cursor: [1200, 290], highlight: STEPS, caption: "The answer shows the steps it took", hold: 1600 },
    { cursor: [1300, 560], highlight: TABLE, caption: "Nutrition labels side by side", hold: 1700 },
    { cam: SOURCES_CAM, cursor: [1070, 781], highlight: null, caption: "Check what it drew from", hold: 1100 },
    { click: true, hold: 380 },
    { frame: "agent-sources", cursor: [1240, 660], highlight: SOURCES, caption: "The two recipes behind the answer", hold: 1700 },
    { cursor: [1300, 986], highlight: DISCLAIMER, caption: "Answers draw only from your org's data", hold: 1800 },
    { frame: "agent-closed", cam: FIT, cursor: null, highlight: null, caption: "The AI Agent sits in the nav bar", hold: 1400 },
  ],
};
