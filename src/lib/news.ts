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
 * announces (IFT, the AI Agent) plus category examples drawn from the release
 * material referenced in the redesign feedback. Replace freely — the shape is
 * the point.
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
    slug: "example-entry",
    date: "2026-05-01",
    category: "Improvement",
    title: "How this News feed is meant to be used",
    summary:
      "A placeholder describing the editorial intent of this page — replace it with the first real update note.",
    body: [
      "This feed is for the material that already goes to customers in update emails: new modules, meaningful improvements to existing features, new integrations and export options — not only headline announcements.",
      "Each entry is a few paragraphs at most: what changed, who it affects, and where to find it in the application. Entries are categorised (New module / Improvement / Integration / Announcement / Event) so readers can scan for what matters to them.",
      "Publishing an update is currently a single edit to the site content; when the admin-editable content layer lands, this page will be managed from the Admin area without touching the site at all.",
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
