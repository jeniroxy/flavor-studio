"use client";

import Link from "next/link";
import { PillTabs } from "@/components/pill-tabs";
import { Icon } from "@/components/icon";
import { CheckList, Container, Headline, Lede, Section } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * "Built for every team" (clickup.com S7): a dashed-pill tab row, then a
 * two-column panel — outcome headline, paragraph, REPLACES row, three checks
 * on the left; four cards on the right. ClickUp's cards are AI agents; ours
 * are the modules that team lives in, because the client asked that the
 * platform lead and AI follow.
 */

type Team = {
  id: string;
  label: string;
  title: string;
  tail: string;
  body: string;
  replaces: string[];
  checks: string[];
  modules: { id: string; label: string; icon: string; desc: string }[];
  href: string;
};

const TEAMS: Team[] = [
  {
    id: "rd",
    label: "R&D",
    title: "Formulate and version",
    tail: "without losing the original",
    body: "A live grid for the formula, sub-recipes nested to any depth, and named versions with history — so reformulation is iterative, not destructive.",
    replaces: ["Spreadsheets", "Shared drives", "Sticky notes"],
    checks: [
      "Percentages, weight, yield and cost recompute as you type",
      "Versions compared side by side",
      "Taste-test results attached to the version they scored",
    ],
    modules: [
      {
        id: "recipes",
        label: "Recipes",
        icon: "chef-hat-one",
        desc: "The formulation grid",
      },
      {
        id: "ingredients",
        label: "Ingredients",
        icon: "leaves",
        desc: "9,000+ USDA plus yours",
      },
      {
        id: "versions",
        label: "Versions",
        icon: "branch-one",
        desc: "Compare and promote",
      },
      {
        id: "taste-tests",
        label: "Taste Tests",
        icon: "experiment",
        desc: "Panels and surveys",
      },
    ],
    href: routes.feature("recipes"),
  },
  {
    id: "regulatory",
    label: "Regulatory",
    title: "Labels generated",
    tail: "from the formula itself",
    body: "US FDA and Health Canada panels built from the recipe's own analysed values, with claims checked against the regulation's thresholds.",
    replaces: [
      "Standalone label software",
      "Manual DV maths",
      "Email approvals",
    ],
    checks: [
      "Six layouts, Nutrition or Supplement Facts, US or Canadian",
      "Nutrient content claims marked qualifying or not",
      "Vector PDF for packaging, PNG for drafts",
    ],
    modules: [
      {
        id: "labeling",
        label: "Nutrition labels",
        icon: "doc-detail",
        desc: "FDA and Health Canada",
      },
      {
        id: "claims",
        label: "Content claims",
        icon: "check-one",
        desc: "Actual vs threshold",
      },
      {
        id: "designer",
        label: "Publish Designer",
        icon: "layout-four",
        desc: "Spec sheet canvas",
      },
      {
        id: "publishing",
        label: "Publish & export",
        icon: "file-pdf-one",
        desc: "PDF, PNG, print",
      },
    ],
    href: routes.feature("labeling"),
  },
  {
    id: "costing",
    label: "Costing",
    title: "Real batch cost,",
    tail: "not a guess",
    body: "Labour, overhead, packaging and waste defined once for the workspace; batch cost, container cost and retail price move with every edit to the formula.",
    replaces: ["A cost model nobody trusts", "Re-keyed supplier prices"],
    checks: [
      "Assumptions grouped into categories you define",
      "Cost attached to the ingredient, not the recipe",
      "Margin against a target retail price",
    ],
    modules: [
      {
        id: "costing",
        label: "Costing",
        icon: "calculator-one",
        desc: "Assumptions you control",
      },
      {
        id: "ingredients",
        label: "Ingredients",
        icon: "leaves",
        desc: "Supplier and cost data",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "chart-histogram",
        desc: "Costing across versions",
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: "plug",
        desc: "ERP and accounting",
      },
    ],
    href: routes.feature("costing"),
  },
  {
    id: "sales",
    label: "Sales",
    title: "The front line,",
    tail: "connected to R&D",
    body: "Opportunities linked to the development project they depend on, sample requests tied to the recipe being sampled, and a builder for the requirement forms customers send you.",
    replaces: [
      "A separate CRM",
      "Requirements in email",
      "Sample spreadsheets",
    ],
    checks: [
      "Customers, contacts, opportunities and contracts in one module",
      "Customer Requirements Builder with nested question types",
      "Shipment tracking built in",
    ],
    modules: [
      {
        id: "crm",
        label: "CRM",
        icon: "peoples",
        desc: "Opportunities to orders",
      },
      {
        id: "cr-builder",
        label: "CR Builder",
        icon: "form-one",
        desc: "Customer requirements",
      },
      {
        id: "projects",
        label: "Projects",
        icon: "folder-open",
        desc: "Stage-gated launches",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "chart-histogram",
        desc: "Opportunity reporting",
      },
    ],
    href: routes.feature("crm"),
  },
  {
    id: "sensory",
    label: "Sensory & QA",
    title: "Sensory data that",
    tail: "flows back into the formula",
    body: "Internal panels or consumer surveys, blind triangle and preference tests, attribute scores compared across versions — and the results attached to the version they belong to.",
    replaces: ["Paper score sheets", "Survey tools", "Results in a drawer"],
    checks: [
      "Purchase intent captured with the scores",
      "Filtering across tests, tags and verified tags",
      "Summary, comprehensive and shelf-life reports",
    ],
    modules: [
      {
        id: "taste-tests",
        label: "Taste Tests",
        icon: "experiment",
        desc: "Panels and surveys",
      },
      {
        id: "versions",
        label: "Versions",
        icon: "branch-one",
        desc: "Tied to the score",
      },
      {
        id: "reports",
        label: "Reports",
        icon: "chart-histogram",
        desc: "Print or PDF",
      },
      {
        id: "projects",
        label: "Projects",
        icon: "folder-open",
        desc: "Tests inside the launch",
      },
    ],
    href: routes.feature("taste-tests"),
  },
  {
    id: "leadership",
    label: "Leadership",
    title: "The state of every launch,",
    tail: "as a fact in the system",
    body: "Stage gates, timelines, logged development time and costing reports — so the questions management asks can be answered from the system instead of assembled by hand.",
    replaces: ["Status meetings", "Slide decks", "Hour estimates"],
    checks: [
      "Gantt timeline and board on the same project",
      "Development time logged against the project",
      "Reporting templates that keep their shape between runs",
    ],
    modules: [
      {
        id: "projects",
        label: "Projects",
        icon: "folder-open",
        desc: "Stage gates",
      },
      {
        id: "timeline",
        label: "Timeline & board",
        icon: "calendar-three",
        desc: "Schedule and cards",
      },
      {
        id: "timesheet",
        label: "Timesheet",
        icon: "time",
        desc: "Hours and expenses",
      },
      {
        id: "admin",
        label: "Administration",
        icon: "setting-two",
        desc: "Roles and security",
      },
    ],
    href: routes.enterprise,
  },
];

export function TeamsTabs() {
  return (
    <Section className="py-[var(--section-gap)]">
      <Container>
        <div className="mx-auto max-w-[780px] text-center">
          <Headline size="lg" tail="team.">
            Built for every food & beverage
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[560px]">
            The same ingredient library, seen from each seat in the building.
          </Lede>
        </div>

        <PillTabs
          tabs={TEAMS}
          className="mt-[clamp(28px,3.5vw,44px)]"
          render={(team) => (
            <div className="panel mt-8 grid gap-10 rounded-[32px] p-[clamp(24px,4vw,56px)] lg:grid-cols-[1.1fr_1fr]">
              <div>
                <Headline as="h3" size="md" tail={team.tail} reveal={false}>
                  {team.title}
                </Headline>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-ink-2">
                  {team.body}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="eyebrow eyebrow-muted mr-1">Replaces</span>
                  {team.replaces.map((r) => (
                    <span key={r} className="chip">
                      {r}
                    </span>
                  ))}
                </div>
                <CheckList items={team.checks} className="mt-6" tone="blue" />
              </div>
              <div className="flex flex-col gap-3">
                {team.modules.map((m) => (
                  <Link
                    key={m.id}
                    href={routes.feature(m.id)}
                    className="flex items-center gap-4 rounded-[12px] border border-hairline bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,.04)] transition-colors hover:bg-panel"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-100 text-[20px] text-blue-700">
                      <Icon name={m.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-ink">
                        {m.label}
                      </span>
                      <span className="block text-[13px] text-ink-2">
                        {m.desc}
                      </span>
                    </span>
                    <Icon
                      name="arrow-right"
                      className="ml-auto text-[16px] text-ink-3"
                    />
                  </Link>
                ))}
                <Link
                  href={team.href}
                  className="btn btn-primary btn-sm mt-1 self-start"
                >
                  Explore solution
                  <Icon name="arrow-right" />
                </Link>
              </div>
            </div>
          )}
        />
      </Container>
    </Section>
  );
}
