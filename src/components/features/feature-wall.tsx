import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { GroupTabs } from "@/components/features/group-tabs";
import { Reveal, RevealStagger } from "@/components/reveal";
import { Container, Section } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import type { Visual } from "@/lib/feature-pages";
import { flows } from "@/lib/flows";
import { GROUP } from "@/lib/module-style";
import { moduleGroups, modules, type Module } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The feature wall: a sticky bar of the six module groups (group-tabs.tsx)
 * over six chapters, one per group (see FeatureWall below). Each module is a
 * card with its real screen; the EXTRAS below are its capabilities, listed
 * under it. The module card keeps the module id as its element id so the old
 * `/features#recipes` anchors still land.
 */

const CATEGORY: Record<
  (typeof moduleGroups)[number],
  { id: string; tagline: string }
> = {
  Formulation: { id: "formulation", tagline: "Build the recipe" },
  "Nutrition & compliance": {
    id: "nutrition-compliance",
    tagline: "Label with certainty",
  },
  Sensory: { id: "sensory", tagline: "Test what you made" },
  "Project management": {
    id: "project-management",
    tagline: "Ship the product",
  },
  Commercial: { id: "commercial", tagline: "Sell the product" },
  Platform: { id: "platform", tagline: "Scale with confidence" },
};

type Extra = { title: string; body: string; visual: Visual };

const asset = (a: keyof typeof productAssets): Visual => ({
  kind: "asset",
  asset: productAssets[a],
});
const still = (f: keyof typeof flows, step: number): Visual => ({
  kind: "still",
  flow: flows[f],
  step,
});

/** Extra cards per module, each a capability from modules.ts. */
const EXTRAS: Record<string, Extra[]> = {
  recipes: [
    {
      title: "Sub-recipes",
      body: "Nested to any depth and costed through to the parent.",
      visual: asset("recipeGrid"),
    },
    {
      title: "Batch scaling",
      body: "Scale to any target weight or number of servings in one step.",
      visual: asset("recipeCost"),
    },
    {
      title: "Yield & loss",
      body: "Moisture, fat and processing loss applied automatically.",
      visual: asset("recipeCost"),
    },
    {
      title: "Processing steps",
      body: "Ingredients ordered into steps, with item codes carried through.",
      visual: asset("recipeGrid"),
    },
    {
      title: "Recipe types & tags",
      body: "Organise and filter a large recipe library.",
      visual: asset("recipeGrid"),
    },
    {
      title: "Recipe images",
      body: "Upload from computer or cloud drives; edit in place.",
      visual: still("recipeImages", 2),
    },
    {
      title: "Ice-cream fill weight",
      body: "Calculated from overrun percentage and container size.",
      visual: asset("recipeCost"),
    },
  ],
  ingredients: [
    {
      title: "USDA SR28 library",
      body: "Over 9,000 ingredients built in from day one.",
      visual: asset("ingredientLibrary"),
    },
    {
      title: "Vendor spec-sheet import",
      body: "The tool reads a supplier PDF and pulls the nutrient values in.",
      visual: asset("ingredientNutrients"),
    },
    {
      title: "Configurable ingredient fields",
      body: "Choose which columns the grid carries.",
      visual: still("ingredientFields", 0),
    },
    {
      title: "Custom calculations",
      body: "Defined over your own ingredient fields.",
      visual: still("ingredientFields", 3),
    },
    {
      title: "Canadian & French statements",
      body: "A separate bilingual statement per ingredient.",
      visual: still("newIngredient", 2),
    },
    {
      title: "Certifications & documents",
      body: "Supplier paperwork stored on the ingredient.",
      visual: still("newIngredient", 3),
    },
    {
      title: "Procurement & validation",
      body: "Supplier, cost, yield and storage on the record.",
      visual: still("newIngredient", 4),
    },
    {
      title: "Allergen tagging",
      body: "Set once, carried through to every label.",
      visual: asset("ingredientNutrients"),
    },
  ],
  costing: [
    {
      title: "Cost assumptions",
      body: "Labour, overhead, packaging and waste, defined once.",
      visual: still("costAssumptions", 1),
    },
    {
      title: "Assumption categories",
      body: "Grouped into categories you define, applied by condition.",
      visual: still("costAssumptions", 2),
    },
    {
      title: "Margin & retail price",
      body: "Margin shown against a target retail price.",
      visual: asset("recipeCost"),
    },
    {
      title: "Workspace defaults",
      body: "Set once in Recipes Admin Settings; every recipe re-costs.",
      visual: still("costAssumptions", 5),
    },
  ],
  versions: [
    {
      title: "History tool",
      body: "Every modification recorded, when and by whom.",
      visual: asset("recipeVersions"),
    },
    {
      title: "Side-by-side comparison",
      body: "Nutrition and cost compared across versions.",
      visual: asset("recipeCost"),
    },
  ],
  labeling: [
    {
      title: "Canadian bilingual labels",
      body: "Nutrition Facts / Valeur nutritive from the same recipe.",
      visual: asset("nutritionLabelFormats"),
    },
    {
      title: "Aggregate layout",
      body: "One panel built from several recipes at once.",
      visual: still("publishAggregate", 2),
    },
    {
      title: "Supplement Facts",
      body: "Nutrition Panel or Supplement Facts style per panel.",
      visual: asset("nutritionLabelUs"),
    },
    {
      title: "Ingredient statement & allergens",
      body: "Declarations published alongside the panel.",
      visual: still("newIngredient", 2),
    },
    {
      title: "Vector PDF export",
      body: "High resolution for the packaging designer; PNG for drafts.",
      visual: asset("publishExport"),
    },
    {
      title: "Automatic recalculation",
      body: "When the recipe or the serving size changes.",
      visual: still("publishAggregate", 4),
    },
  ],
  claims: [
    {
      title: "Qualifying wording",
      body: "Hover a claim to see the phrase the regulation allows.",
      visual: still("claims", 1),
    },
    {
      title: "Reference amounts",
      body: "Reference amount and %DV group applied per claim.",
      visual: still("claims", 2),
    },
  ],
  designer: [
    {
      title: "Spec sheet templates",
      body: "Named templates saved per recipe or reused across products.",
      visual: asset("labelDesigner"),
    },
    {
      title: "Design inspector",
      body: "Position, typography, layout and box style per element.",
      visual: asset("labelDesigner"),
    },
    {
      title: "Custom elements",
      body: "Your own logo and images on the page.",
      visual: asset("labelDesigner"),
    },
  ],
  "taste-tests": [
    {
      title: "Consumer surveys",
      body: "External tasters, the same structure as internal panels.",
      visual: still("tasteTestPublish", 1),
    },
    {
      title: "Triangle & preference tests",
      body: "Blind tests built in.",
      visual: still("tasteTestPublish", 1),
    },
    {
      title: "Shelf-life reports",
      body: "Summary, comprehensive or shelf life, as PDF.",
      visual: still("tasteTestPublish", 0),
    },
    {
      title: "Verified tags",
      body: "Tags from the test verified against the recipe.",
      visual: still("tasteTestPublish", 2),
    },
  ],
  projects: [
    {
      title: "Stage gates",
      body: "Concept to shelf, in the stages your process uses.",
      visual: asset("projectsOverview"),
    },
    {
      title: "Briefs on the project",
      body: "Kept with the project rather than in email.",
      visual: asset("projectMessages"),
    },
  ],
  timeline: [
    {
      title: "Dependencies",
      body: "What waits on what, drawn on the schedule.",
      visual: asset("projectTimeline"),
    },
    {
      title: "Gantt reporting",
      body: "Full Gantt reporting for review meetings.",
      visual: asset("reports"),
    },
  ],
  board: [
    {
      title: "Cards linked to recipes",
      body: "Open a task, open the version it concerns.",
      visual: asset("projectCardRecipe"),
    },
  ],
  timesheet: [
    {
      title: "Running timer",
      body: "Or manual entry, straight from a field.",
      visual: still("timesheet", 2),
    },
    {
      title: "Activity types",
      body: "Researching, design and types you define.",
      visual: still("timesheet", 3),
    },
    {
      title: "Expenses",
      body: "Attached to the same entry as the time.",
      visual: still("timesheet", 5),
    },
    {
      title: "Weekly & detailed reports",
      body: "Total hours, filtered and exported.",
      visual: asset("reports"),
    },
  ],
  reports: [
    {
      title: "Costing reports",
      body: "Across recipes and versions.",
      visual: asset("recipeCost"),
    },
    {
      title: "Time & expense reports",
      body: "From the timesheet, filterable by any field.",
      visual: asset("reportsDetailed"),
    },
    {
      title: "Report templates",
      body: "A report keeps its shape between runs.",
      visual: asset("reportsWeekly"),
    },
  ],
  crm: [
    {
      title: "Sample requests & shipments",
      body: "Tied to the recipe sampled, with shipment tracking.",
      visual: asset("crmSamples"),
    },
    {
      title: "Opportunity reports",
      body: "Opportunity and activity reporting.",
      visual: asset("crmPipeline"),
    },
  ],
  "cr-builder": [
    {
      title: "Nested sub-levels",
      body: "Under any option, to whatever depth the brief needs.",
      visual: still("crBuilder", 2),
    },
    {
      title: "Question types",
      body: "Multiple choice, single answer, label and short answer.",
      visual: still("crBuilder", 3),
    },
    {
      title: "Preview & publish",
      body: "Live preview, save as draft, publish, then update.",
      visual: still("crBuilder", 6),
    },
  ],
  publishing: [
    {
      title: "Read-only PDF",
      body: "For customers and co-manufacturers.",
      visual: asset("publishExport"),
    },
    {
      title: "Encrypted FS format",
      body: "Carries embedded custom ingredients between companies.",
      visual: asset("publishExport"),
    },
    {
      title: "CSV, Excel & Word",
      body: "Download for Word or export CSV for Excel.",
      visual: asset("publishExport"),
    },
    {
      title: "JSON download",
      body: "One click per recipe.",
      visual: asset("publishExport"),
    },
  ],
  integrations: [
    {
      title: "Webhooks",
      body: "React to changes as they happen.",
      visual: asset("webhooks"),
    },
    {
      title: "ERP & accounting",
      body: "Integration paths for Plex and other external systems.",
      visual: asset("erpPlex"),
    },
  ],
  admin: [
    {
      title: "Two-factor authentication",
      body: "Set up from a QR code in an authenticator app.",
      visual: still("twoFactor", 0),
    },
    {
      title: "Roles & rights",
      body: "Per-user and per-group read/edit rights on recipes.",
      visual: asset("adminUsers"),
    },
    {
      title: "Verification preferences",
      body: "Per user, enforced by the organisation.",
      visual: still("twoFactor", 2),
    },
  ],
};

/** The module's own screen, full width at the top of its card. */
function ModuleShot({ m }: { m: Module }) {
  const img = m.asset.src
    ? { src: m.asset.src, width: m.asset.width, height: m.asset.height }
    : m.flow
      ? {
          src: m.flow.steps[0].src,
          width: m.flow.width,
          height: m.flow.height,
        }
      : null;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_rgba(22,34,58,0.12)] ring-1 ring-black/5">
      {img ? (
        <Image
          src={img.src}
          alt={m.asset.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover object-left-top transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
      ) : null}
    </div>
  );
}

/*
 * One module: its real screen, name and line, then the capabilities that
 * used to be separate cards (most of them repeating the module's screenshot)
 * as a compact list under it. Every title and line is unchanged.
 */
function ModuleCard({
  m,
  hue,
  wide,
}: {
  m: Module;
  hue: string;
  wide: boolean;
}) {
  const extras = EXTRAS[m.id] ?? [];
  return (
    <article
      id={m.id}
      className={`flex scroll-mt-[110px] flex-col rounded-[var(--radius-xl)] bg-white p-[clamp(14px,1.8vw,20px)] shadow-[0_2px_6px_rgba(22,34,58,0.04)] ${
        wide
          ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8"
          : ""
      }`}
    >
      <Link href={routes.feature(m.id)} className="group block">
        <ModuleShot m={m} />
      </Link>
      <div
        className={`flex flex-1 flex-col px-1 ${wide ? "pt-5 md:pt-2" : "pt-5"}`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="hex-round flex aspect-[1/1.1547] w-8 flex-none items-center justify-center text-white"
            style={{ background: hue }}
          >
            <Icon name={m.icon} className="text-[15px]" />
          </span>
          <h3 className="font-display text-[20px] leading-[1.2] font-bold tracking-[-0.015em] text-ink">
            <Link href={routes.feature(m.id)} className="hover:text-blue-700">
              {m.label}
            </Link>
          </h3>
        </div>
        <p className="mt-2 text-[15px] leading-[1.55] text-ink-2">{m.title}</p>
        {extras.length ? (
          <ul className="mt-4 flex list-none flex-col gap-2.5 border-t border-hairline p-0 pt-4">
            {extras.map((x) => (
              <li key={x.title} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="hex-round mt-[5px] aspect-[1/1.1547] w-2.5 flex-none"
                  style={{ background: hue }}
                />
                <span className="text-[14px] leading-[1.45]">
                  <span className="font-bold text-ink">{x.title}</span>{" "}
                  <span className="text-ink-2">{x.body}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={routes.feature(m.id)}
          className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-[14px] font-bold text-blue-700 hover:text-blue-600"
        >
          Explore {m.label}
          <Icon name="arrow-right" className="text-[15px]" />
        </Link>
      </div>
    </article>
  );
}

/*
 * The wall, as six chapters. Each module group sits on its own tinted panel
 * in its hue (the same one the nav and the hero hive use), with a header
 * naming the group, its tagline and its module count, then its modules as
 * cards, three across on wide screens. A group of one module gives it the
 * full width, screen beside text.
 */
export function FeatureWall() {
  const tabs = moduleGroups.map((g) => {
    const mods = modules.filter((m) => m.group === g);
    return {
      id: CATEGORY[g].id,
      label: g,
      count: mods.length,
      hue: GROUP[g].hue,
      icon: mods[0].icon,
    };
  });
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container wide>
        <GroupTabs tabs={tabs} />
        <div className="mt-[clamp(20px,2.6vw,32px)] flex flex-col gap-[clamp(24px,3vw,40px)]">
          {moduleGroups.map((group) => {
            const cat = CATEGORY[group];
            const style = GROUP[group];
            const mods = modules.filter((m) => m.group === group);
            return (
              <section
                key={group}
                id={cat.id}
                className="scroll-mt-[150px] rounded-[var(--radius-2xl)] p-[clamp(16px,2.6vw,32px)]"
                style={{ background: style.tint }}
              >
                <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 pb-[clamp(16px,2vw,24px)]">
                  <span
                    className="hex-round flex aspect-[1/1.1547] w-11 flex-none items-center justify-center text-white"
                    style={{ background: style.hue }}
                  >
                    <Icon name={mods[0].icon} className="text-[19px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.1] font-bold tracking-[-0.025em] text-ink">
                      {group}
                    </h2>
                    <p className="mt-0.5 font-mono text-[12px] tracking-[.08em] text-ink-2 uppercase">
                      {cat.tagline}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[12px] tracking-[.06em] text-ink uppercase">
                    {mods.length} {mods.length === 1 ? "module" : "modules"}
                  </span>
                </Reveal>
                <RevealStagger
                  stagger={0.05}
                  className="grid gap-[clamp(12px,1.6vw,20px)] md:grid-cols-2 xl:grid-cols-3"
                >
                  {mods.map((m, i) => (
                    <ModuleCard
                      key={m.id}
                      m={m}
                      hue={style.hue}
                      wide={mods.length === 1}
                    />
                  ))}
                </RevealStagger>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
