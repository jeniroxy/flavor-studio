import type { Story } from "@/components/home/screen-story";
import { agentStory } from "@/lib/stories/agent";
import { claimsStory } from "@/lib/stories/claims";
import { costingStory } from "@/lib/stories/costing";
import { crBuilderStory } from "@/lib/stories/crBuilder";
import { designerStory } from "@/lib/stories/designer";
import { ingredientsStory } from "@/lib/stories/ingredients";
import { labelingStory } from "@/lib/stories/labeling";
import { publishingStory } from "@/lib/stories/publishing";
import { recipesStory } from "@/lib/stories/recipes";
import { reportsStory } from "@/lib/stories/reports";
import { tasteTestsStory } from "@/lib/stories/tasteTests";
import { timesheetStory } from "@/lib/stories/timesheet";

/* Hero tab id → its walkthrough. A tab without one shows its still. */
export const stories: Record<string, Story> = {
  recipes: recipesStory,
  ingredients: ingredientsStory,
  costing: costingStory,
  labeling: labelingStory,
  claims: claimsStory,
  designer: designerStory,
  "taste-tests": tasteTestsStory,
  timesheet: timesheetStory,
  reports: reportsStory,
  "cr-builder": crBuilderStory,
  publishing: publishingStory,
  agent: agentStory,
};
