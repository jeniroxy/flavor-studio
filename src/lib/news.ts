/*
 * The News feed.
 *
 * The client wants News to carry much more than major announcements: new
 * modules, meaningful improvements, integrations — the same material already
 * sent to customers in update emails, published in a structured public form so
 * existing users can follow what changed and prospects can see the platform is
 * actively developed.
 *
 * Until the site has an admin-editable content layer, this file IS the feed:
 * one entry per item, newest first. Publishing an update = adding an entry
 * here, which is deliberately the same shape a CMS would deliver later, so
 * moving this to Admin-managed content changes the data source and nothing
 * else.
 *
 * The entries below are seeded from what the current public site already
 * announces (IFT, the AI Agent) and the legacy site's one press release (the
 * Cal Poly scholarship, verbatim). The placeholder entry that described the
 * feed's editorial intent is gone: it was visible to the public.
 */

export type NewsCategory =
  "New module" | "Improvement" | "Integration" | "Announcement" | "Event";

export type NewsEntry = {
  slug: string;
  /** ISO date, used for sorting and <time>. */
  date: string;
  category: NewsCategory;
  title: string;
  /** Feed summary — one or two sentences. */
  summary: string;
  /** Full body, one string per paragraph. */
  body: string[];
};

export const newsEntries: NewsEntry[] = [
  {
    slug: "ai-agent-launch",
    date: "2026-06-15",
    category: "Announcement",
    title: "The AI Agent is built into Flavor Studio",
    summary:
      "Ask questions about your own recipes, ingredients and tests in plain language — and get answers with citations, not guesses.",
    body: [
      "The AI Agent reads your workspace — recipes, the ingredient library, supplier data and test results — and answers in the recipe you are already in. Every claim cites the recipe, regulation or test it came from; when it cannot source an answer, it says so rather than guessing.",
      "The Agent only ever proposes draft versions for a developer to approve. It is an assistant on top of your existing Flavor Studio data, not an autopilot.",
      "The Agent is rolling out across plans now. See the AI Agent page for what it can and cannot do.",
    ],
  },
  {
    slug: "ift-2026",
    date: "2026-06-01",
    category: "Event",
    title: "Meet Flavor Studio at IFT",
    summary:
      "We are at booth #315 this year — stop by for a live session with the AI Agent on real formulation questions.",
    body: [
      "The Senspire team will be at IFT demonstrating Flavor Studio end to end: formulation, nutrition and labeling, projects, sensory and CRM, plus the new AI Agent answering formulation questions live at the booth.",
      "If you would like to book a dedicated time slot rather than stopping by, use the Request a Demo page and mention IFT — we will reserve a session.",
    ],
  },
  {
    /* Verbatim from flavorstudio.com/news, the legacy site's press release. */
    slug: "senspire-scholarship-cal-poly",
    date: "2021-08-04",
    category: "Announcement",
    title:
      "Senspire announces new annual scholarship for Cal Poly food science majors",
    summary:
      "Senspire is proud to announce that it has partnered with California Polytechnic State University, San Luis Obispo to establish a scholarship for juniors and seniors majoring in Food Science beginning with the 2021-2022 academic year.",
    body: [
      "Senspire is proud to announce that it has partnered with California Polytechnic State University, San Luis Obispo to establish a scholarship for juniors and seniors majoring in Food Science beginning with the 2021-2022 academic year. The recipient of the Senspire Scholarship will be awarded a nonrenewable amount of $1,000. The scholarship aims to reward students who are passionate about food science innovation. A minimum 3.0 GPA is required and financial need will be considered in the selection process.",
      "The company believes that the university’s educational philosophy fuels innovative thinking, which is front and center to Senspire’s values and prompted the creation of the Senspire Scholarship. The scholarship aims to help “Ignite Your Innovation” by supporting the pursuit of excellence in food science education. The Founder and President of Senspire, Gregory Willis, said “We are proud to sponsor this scholarship as it aligns with our core value of continuous innovation. We hope the recipients will take this opportunity to pursue food science careers that propel the industry forward and onward.”",
      "Dr. Stephanie Jung, Cal Poly’s Food Science and Nutrition Department Head said, “The Senspire scholarship for students in our food science program provides a unique opportunity to apply our Learn by Doing methodology to projects that will have a significant impact on the industry. Thanks to Senspire's generosity, students will be “Ready Day One” to succeed in their chosen fields. We are grateful for Senspire's partnership in preparing tomorrow's leaders in food science.”",
      "About Senspire: Senspire's Flavor Studio software helps leading food and beverage companies drive innovation and bring better products to market faster through a robust yet affordable product lifecycle management solution. From Recipes and Nutritional Analysis to Taste Tests and Project Management, Flavor Studio is a proven end-to-end cloud-based solution.",
    ],
  },
];

export const newsCategories: NewsCategory[] = [
  "New module",
  "Improvement",
  "Integration",
  "Announcement",
  "Event",
];

export function formatNewsDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
