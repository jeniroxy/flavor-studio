import type { Flow } from "@/components/flow-player";

/*
 * Feature flows — sequences of real screens from the application design file,
 * played by FlowPlayer as a step-by-step recording of the feature in use.
 *
 * Each flow's frames were cropped with one box so the steps stay registered;
 * the width/height below is that box. Captions say what the person just did,
 * in the order the design file lays the screens out. Where the design file
 * had several versions of a screen, the one that rendered is used.
 */

const f = (dir: string, n: number) =>
  `/flows/${dir}/${String(n).padStart(2, "0")}.png`;

export const flows = {
  crBuilder: {
    width: 1440,
    height: 932,
    alt: "Building a customer requirements form: a section, a question, nested options, then a single-answer field",
    steps: [
      {
        src: f("cr", 1),
        caption:
          "A new form. Sections go on the left; the first one is a click away.",
      },
      {
        src: f("cr", 2),
        caption:
          "A section and its first question, with the question type set in Configure.",
      },
      {
        src: f("cr", 3),
        caption: "Adding a sub-level under the “Raw” option.",
      },
      {
        src: f("cr", 4),
        caption:
          "Choosing the sub-level's type — label, single answer, multiple choice or short answer.",
      },
      {
        src: f("cr", 5),
        caption:
          "Multiple choice: options added inline, an “Other” fallback if needed.",
      },
      {
        src: f("cr", 6),
        caption: "Another option. Drag handles reorder anything.",
      },
      {
        src: f("cr", 7),
        caption:
          "A label nested under “Grind”, with its own single-answer fields beneath.",
      },
    ],
  },
  newIngredient: {
    width: 940,
    height: 900,
    alt: "Adding an ingredient: basic information, nutrients imported from a PDF, the ingredient statement, certifications, then procurement",
    steps: [
      {
        src: f("ingredient", 1),
        caption: "From the recipe, add a new ingredient.",
      },
      {
        src: f("ingredient", 2),
        caption:
          "Nutrients — imported from a supplier PDF, or copied from another ingredient.",
      },
      {
        src: f("ingredient", 3),
        caption:
          "The ingredient statement, with a separate Canadian (French) version.",
      },
      {
        src: f("ingredient", 4),
        caption: "Certifications and the supplier documents behind them.",
      },
      {
        src: f("ingredient", 5),
        caption: "Procurement — supplier, cost, yield and storage.",
      },
    ],
  },
  publishAggregate: {
    width: 948,
    height: 840,
    alt: "Publishing an aggregate label: one recipe, then a second and third added to the same panel, then a value edited",
    steps: [
      {
        src: f("publish", 1),
        caption:
          "Publish a label. Aggregate layout, one recipe, the panel previewing live.",
      },
      {
        src: f("publish", 2),
        caption: "A second recipe added — the panel grows a column.",
      },
      {
        src: f("publish", 3),
        caption: "A third. Three products, one compliant panel.",
      },
      {
        src: f("publish", 4),
        caption: "Any recipe in the list can be edited or removed in place.",
      },
      {
        src: f("publish", 5),
        caption: "Hover the panel to adjust it before publishing.",
      },
    ],
  },
  costAssumptions: {
    width: 1440,
    height: 900,
    alt: "Adding a cost assumption: the cost panel, a new assumption, a new category, then the assumption in place",
    steps: [
      {
        src: f("cost", 1),
        caption:
          "The Cost panel — packaging, tolling and freight, rolling up to retail price.",
      },
      {
        src: f("cost", 2),
        caption:
          "Add an assumption: pick its category, name it, give it a value.",
      },
      { src: f("cost", 3), caption: "Or create a new category on the spot." },
      {
        src: f("cost", 4),
        caption: "Category selected; the assumption is ready to add.",
      },
      {
        src: f("cost", 5),
        caption: "It lands in the panel and the cost re-rolls immediately.",
      },
      {
        src: f("cost", 6),
        caption: "Assumptions are edited by category, for the whole workspace.",
      },
    ],
  },
  timesheet: {
    width: 1440,
    height: 845,
    alt: "Logging time: the week view, a new activity, its type, its project, an expense, then the entry's detail",
    steps: [
      {
        src: f("timesheet", 1),
        caption: "The week. Activities already logged sit on the calendar.",
      },
      { src: f("timesheet", 2), caption: "Click a slot to add an activity." },
      {
        src: f("timesheet", 3),
        caption: "Or type it straight into the timer field.",
      },
      { src: f("timesheet", 4), caption: "Pick an activity type." },
      { src: f("timesheet", 5), caption: "Attach it to a project." },
      { src: f("timesheet", 6), caption: "Add an expense, if there was one." },
      {
        src: f("timesheet", 7),
        caption: "The entry, with its type, project and cost.",
      },
    ],
  },
  aiAgent: {
    width: 769,
    height: 960,
    alt: "Asking the AI Agent: the panel opens, a recipe is mentioned with @, two recipes are compared, then the sources are shown",
    steps: [
      {
        src: f("ai", 1),
        caption: "Open the Agent beside the recipe you are working in.",
      },
      {
        src: f("ai", 2),
        caption: "Type a question. @ mentions a recipe by name.",
      },
      { src: f("ai", 3), caption: "The recipe list appears as you type." },
      {
        src: f("ai", 4),
        caption:
          "Two recipes compared per 40 g serving, the biggest gaps highlighted.",
      },
      { src: f("ai", 5), caption: "Every answer names its sources." },
    ],
  },
  claims: {
    width: 1360,
    height: 499,
    alt: "Checking nutrient content claims: the claim list, a claim selected, more nutrients added, then the list cleared",
    steps: [
      {
        src: f("claims", 1),
        caption:
          "Pick the nutrients to check. Actual values sit beside each claim's threshold.",
      },
      {
        src: f("claims", 2),
        caption: "Hover a claim to see the wording that qualifies.",
      },
      {
        src: f("claims", 3),
        caption:
          "More nutrients selected — each one checked against the formula.",
      },
      { src: f("claims", 4), caption: "Cleared, ready for a different set." },
    ],
  },
  ingredientFields: {
    width: 1432,
    height: 880,
    alt: "Configuring ingredient fields: the field list, adding a field, the field in place, then custom calculations",
    steps: [
      {
        src: f("fields", 1),
        caption: "The columns the ingredient grid carries, in order.",
      },
      {
        src: f("fields", 2),
        caption:
          "Add a field — process step, country of origin, supplier, category.",
      },
      {
        src: f("fields", 3),
        caption: "The new field takes its place in the grid.",
      },
      {
        src: f("fields", 4),
        caption: "Custom calculations, defined over those fields.",
      },
    ],
  },
  twoFactor: {
    width: 780,
    height: 840,
    alt: "Setting up two-factor authentication: the authenticator QR code, the profile, verification preferences, then two-step enabled",
    steps: [
      {
        src: f("twofa", 1),
        caption: "Set up an authenticator app from the QR code.",
      },
      {
        src: f("twofa", 2),
        caption: "The profile shows two-step verification not yet enabled.",
      },
      {
        src: f("twofa", 3),
        caption: "Choose how to be verified: app, phone or email.",
      },
      { src: f("twofa", 4), caption: "Two-step verification enabled." },
    ],
  },
  tasteTestPublish: {
    width: 1432,
    height: 780,
    alt: "Publishing a taste-test report: the content and filters, tasters selected, then verified tags on the recipe",
    steps: [
      {
        src: f("taste", 1),
        caption:
          "Publish a report — summary, comprehensive or shelf life — as PDF.",
      },
      {
        src: f("taste", 2),
        caption: "Filter by product version and by taster.",
      },
      {
        src: f("taste", 3),
        caption: "Tags from the test verified against the recipe.",
      },
    ],
  },
  recipeImages: {
    width: 1440,
    height: 900,
    alt: "Adding images to a recipe: the images rail, an upload source, several images uploaded, then one being edited",
    steps: [
      { src: f("images", 1), caption: "The recipe's Images rail, empty." },
      {
        src: f("images", 2),
        caption: "Upload from computer, Google Drive, Dropbox or OneDrive.",
      },
      { src: f("images", 3), caption: "Several images, in one go." },
      { src: f("images", 4), caption: "Edit an image in place." },
    ],
  },
} satisfies Record<string, Flow>;

export type FlowKey = keyof typeof flows;
