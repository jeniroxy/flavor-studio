import Link from "next/link";
import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";
import { Container, Section, SectionHead } from "@/components/ui";
import { modules, type Module } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * "THE FLAVOR STUDIO PLATFORM — <Module> is just the beginning": a 4×4 grid
 * of every other module, each a coloured rounded-square icon, the label and a
 * three-word description; the last cell links to the full features index.
 */

/** Colour per module — ClickUp gives each product icon its own solid tile. */
const TILE: Record<string, string> = {
  recipes: "bg-blue-500",
  ingredients: "bg-lime-600",
  costing: "bg-teal-500",
  versions: "bg-violet-500",
  labeling: "bg-blue-700",
  claims: "bg-green-600",
  designer: "bg-amber-500",
  "taste-tests": "bg-red-500",
  projects: "bg-slate-700",
  timeline: "bg-blue-600",
  board: "bg-violet-500",
  timesheet: "bg-teal-500",
  reports: "bg-amber-500",
  crm: "bg-slate-800",
  "cr-builder": "bg-lime-600",
  publishing: "bg-blue-500",
  integrations: "bg-slate-600",
  admin: "bg-ink",
};

/** Three words each, drawn from the module's group and title in modules.ts. */
export const SHORT: Record<string, string> = {
  recipes: "Formulate and cost",
  ingredients: "One governed library",
  costing: "Assumptions you control",
  versions: "Every change tracked",
  labeling: "FDA & Canadian",
  claims: "Checked against formula",
  designer: "Spec sheet canvas",
  "taste-tests": "Score across versions",
  projects: "Stage-gated launches",
  timeline: "Gantt and dependencies",
  board: "Tasks by stage",
  timesheet: "Log activity, expenses",
  reports: "Across every module",
  crm: "Front line to R&D",
  "cr-builder": "Customer requirements forms",
  publishing: "Print, PDF, CSV",
  integrations: "API and webhooks",
  admin: "Roles and 2FA",
};

export function PlatformGrid({ current }: { current: Module }) {
  const others = modules.filter((m) => m.id !== current.id);
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container>
        <SectionHead
          eyebrow="The Flavor Studio platform"
          title={`${current.label} is just the`}
          tail="beginning"
          lede="Every module reads the same ingredient library and the same live cost model. Use one, or all eighteen — nothing demands a full rollout."
        />
        <RevealStagger
          stagger={0.04}
          className="mt-[clamp(32px,4vw,56px)] grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {others.map((m) => (
            <Link
              key={m.id}
              href={routes.feature(m.id)}
              className="group flex items-center gap-3"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[20px] text-white ${TILE[m.id] ?? "bg-blue-500"}`}
              >
                <Icon name={m.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-bold text-ink transition-colors group-hover:text-blue-700">
                  {m.label}
                </span>
                <span className="block text-[12px] leading-[1.4] text-ink-2">
                  {SHORT[m.id] ?? m.group}
                </span>
              </span>
            </Link>
          ))}
          <Link
            href={routes.features}
            className="group flex items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-panel-2 text-[20px] text-ink">
              <Icon name="all-application" />
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-ink transition-colors group-hover:text-blue-700">
                All features
              </span>
              <span className="block text-[12px] leading-[1.4] text-ink-2">
                Explore everything
              </span>
            </span>
          </Link>
        </RevealStagger>
      </Container>
    </Section>
  );
}
