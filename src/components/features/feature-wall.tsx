import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";
import { StickyRail } from "@/components/sticky-rail";
import { Container, Section, TwoTone } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import type { Visual } from "@/lib/feature-pages";
import { flows } from "@/lib/flows";
import { moduleGroups, modules } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The feature wall (research §2): a sticky right rail of category anchors
 * over category sections, each a three-column grid of `.card` tiles — a
 * vignetted screenshot, an 18px title and a two-line description — linking
 * to the module page.
 *
 * Every module is one card, and its `capabilities` in modules.ts yield extra
 * cards so the wall is as dense as ClickUp's; extras link to the parent
 * module's page. The module card keeps the module id as its element id so the
 * old `/features#recipes` anchors still land.
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
      visual: asset("projectsOverview"),
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
      visual: asset("projectBoard"),
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
      visual: asset("reports"),
    },
    {
      title: "Report templates",
      body: "A report keeps its shape between runs.",
      visual: asset("reports"),
    },
  ],
  crm: [
    {
      title: "Sample requests & shipments",
      body: "Tied to the recipe sampled, with shipment tracking.",
      visual: asset("crmPipeline"),
    },
    {
      title: "Opportunity reports",
      body: "Opportunity and activity reporting.",
      visual: asset("reports"),
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
      visual: asset("apiDocs"),
    },
    {
      title: "ERP & accounting",
      body: "Integration paths for Plex and other external systems.",
      visual: asset("apiDocs"),
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

/** The 241×179-ish vignetted shot on top of a wall card. */
function CardShot({ visual, alt }: { visual: Visual; alt: string }) {
  let img: { src: string; width: number; height: number } | undefined;
  if (visual.kind === "asset" && visual.asset.src) {
    img = {
      src: visual.asset.src,
      width: visual.asset.width,
      height: visual.asset.height,
    };
  } else if (visual.kind === "still") {
    const steps = visual.flow.steps;
    const s = steps[Math.min(Math.max(visual.step, 0), steps.length - 1)];
    img = { src: s.src, width: visual.flow.width, height: visual.flow.height };
  } else if (visual.kind === "flow") {
    const s = visual.flow.steps[0];
    img = { src: s.src, width: visual.flow.width, height: visual.flow.height };
  }
  return (
    <div className="vignette aspect-[4/3] overflow-hidden rounded-[6px] bg-panel">
      {img ? (
        <Image
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          sizes="(max-width: 640px) 100vw, 260px"
          className="h-full w-full object-cover object-left-top"
        />
      ) : (
        /* No export from the design file yet — a marked gap, not a mockup. */
        <div className="flex h-full flex-col items-center justify-center gap-2 border border-dashed border-panel-3 text-center text-ink-3">
          <Icon name="all-application" className="text-[22px]" />
          <span className="eyebrow eyebrow-muted text-[10px]">
            Screenshot on its way
          </span>
        </div>
      )}
    </div>
  );
}

function WallCard({
  id,
  href,
  title,
  body,
  visual,
}: {
  id?: string;
  href: string;
  title: string;
  body: string;
  visual: Visual;
}) {
  return (
    <Link
      id={id}
      href={href}
      className="card group flex scroll-mt-[110px] flex-col p-2"
    >
      <CardShot visual={visual} alt={title} />
      <div className="px-2 pt-4 pb-3">
        <h3 className="font-display text-[18px] leading-[1.25] font-bold tracking-[-0.01em] text-ink transition-colors group-hover:text-blue-700">
          {title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-2">{body}</p>
      </div>
    </Link>
  );
}

export function FeatureWall() {
  const items = moduleGroups.map((g) => ({
    id: CATEGORY[g].id,
    label: g,
  }));
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container wide>
        <StickyRail items={items}>
          <div className="flex flex-col gap-[clamp(48px,6vw,80px)]">
            {moduleGroups.map((group) => {
              const cat = CATEGORY[group];
              const mods = modules.filter((m) => m.group === group);
              return (
                <div key={group} id={cat.id} className="scroll-mt-[110px]">
                  <TwoTone
                    primary={group}
                    secondary={cat.tagline}
                    className="border-b border-hairline pb-4"
                  />
                  <RevealStagger
                    stagger={0.04}
                    className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {mods.flatMap((m) => [
                      <WallCard
                        key={m.id}
                        id={m.id}
                        href={routes.feature(m.id)}
                        title={m.label}
                        body={m.title}
                        visual={
                          m.flow
                            ? { kind: "flow", flow: m.flow }
                            : { kind: "asset", asset: m.asset }
                        }
                      />,
                      ...(EXTRAS[m.id] ?? []).map((x) => (
                        <WallCard
                          key={`${m.id}:${x.title}`}
                          href={routes.feature(m.id)}
                          title={x.title}
                          body={x.body}
                          visual={x.visual}
                        />
                      )),
                    ])}
                  </RevealStagger>
                </div>
              );
            })}
          </div>
        </StickyRail>
      </Container>
    </Section>
  );
}
