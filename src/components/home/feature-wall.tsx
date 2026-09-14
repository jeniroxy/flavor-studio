import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Container, Headline, Lede, Section } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * The wall of features (clickup.com S4): a 10×8 hairline grid of capability
 * cells with four 2×2 hero tiles in the centre, the outer edge fading out
 * under a mask. Every cell names something the application design file
 * shows; the tiles are the four modules most teams start with.
 */

const CELLS = [
  ["branch-one", "Sub-recipes"],
  ["weight", "Batch scaling"],
  ["history", "Version history"],
  ["leaves", "9,000+ USDA"],
  ["upload", "Vendor spec import"],
  ["caution", "Allergen tagging"],
  ["percentage", "Yield & loss"],
  ["calculator-one", "Cost assumptions"],
  ["income", "Retail margin"],
  ["doc-detail", "FDA panels"],
  ["translate", "Canadian bilingual"],
  ["layout-four", "Six label layouts"],
  ["check-one", "Content claims"],
  ["layers", "Aggregate labels"],
  ["file-pdf-one", "Vector PDF export"],
  ["edit", "Spec Designer"],
  ["experiment", "Taste panels"],
  ["mouth", "Triangle tests"],
  ["chart-histogram", "Attribute scores"],
  ["folder-open", "Stage gates"],
  ["calendar-three", "Gantt timeline"],
  ["all-application", "Project board"],
  ["time", "Timesheet"],
  ["timer", "Running timer"],
  ["table-file", "Reports"],
  ["peoples", "CRM"],
  ["form-one", "Requirements builder"],
  ["box", "Sample requests"],
  ["truck", "Shipments"],
  ["order", "Purchase orders"],
  ["api", "REST API"],
  ["plug", "Webhooks"],
  ["factory-building", "ERP sync"],
  ["key-one", "Two-factor auth"],
  ["lock", "Roles & rights"],
  ["tag-one", "Types & tags"],
  ["search", "Library search"],
  ["pic", "Ingredient images"],
  ["certificate", "Certifications"],
  ["robot", "AI Agent"],
  ["link", "Cited answers"],
  ["headset-one", "24/7 support"],
  ["printer", "Print templates"],
  ["copy", "Duplicate versions"],
  ["config", "Custom fields"],
  ["formula", "Custom calculations"],
  ["milk", "Overrun & fill"],
  ["bowl", "Servings & containers"],
] as const;

const TILES = [
  {
    id: "recipes",
    label: "Recipes",
    icon: "chef-hat-one",
    color: "#ecf4fd",
    shot: productAssets.recipeCost,
    href: routes.feature("recipes"),
  },
  {
    id: "labeling",
    label: "Nutrition labels",
    icon: "doc-detail",
    color: "#f1f8e2",
    shot: productAssets.nutritionLabelFormats,
    href: routes.feature("labeling"),
  },
  {
    id: "costing",
    label: "Costing",
    icon: "calculator-one",
    color: "#fcf3da",
    shot: productAssets.costAssumptions,
    href: routes.feature("costing"),
  },
  {
    id: "taste-tests",
    label: "Taste Tests",
    icon: "experiment",
    color: "#e3f7f2",
    shot: productAssets.tasteTests,
    href: routes.feature("taste-tests"),
  },
];

/*
 * Grid placement: 10 columns × 8 rows. The tiles take columns 4–7, rows 3–6
 * (two 2×2 tiles per row). Rows 1 and 8 stay empty — they fade out under the
 * mask, as on clickup.com — so the 44 remaining slots hold the first 44 cells
 * in reading order.
 */
function layout() {
  const tileArea = new Set<string>();
  for (let r = 3; r <= 6; r++) for (let c = 4; c <= 7; c++) tileArea.add(`${r}-${c}`);
  const slots: { r: number; c: number; empty: boolean }[] = [];
  for (let r = 1; r <= 8; r++)
    for (let c = 1; c <= 10; c++)
      if (!tileArea.has(`${r}-${c}`)) slots.push({ r, c, empty: r === 1 || r === 8 });
  return slots;
}

export function FeatureWall() {
  const slots = layout();
  const filled = slots.filter((s) => !s.empty);
  return (
    <Section id="product" className="py-[var(--section-gap)]">
      <Container>
        <div className="mx-auto max-w-[780px] text-center">
          <Headline size="lg" tail="in Flavor Studio.">
            Every module, one ingredient library, all
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[600px]">
            Eighteen modules that share one live cost model — use one of them, or all of them.
          </Lede>
        </div>
      </Container>

      {/* Mobile: the wall becomes tiles + a three-column icon grid, as on
          clickup.com under 900px. */}
      <Reveal delay={0.1} className="mt-[clamp(32px,4vw,56px)] lg:hidden">
        <Container>
          <div className="grid grid-cols-2 gap-3">
            {TILES.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="flex flex-col overflow-hidden rounded-[12px] border border-hairline"
                style={{ background: `radial-gradient(120% 90% at 50% 0%, ${t.color} 0%, #fff 80%)` }}
              >
                <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-t-[8px] border border-b-0 border-hairline bg-white">
                  {t.shot.src ? (
                    <Image src={t.shot.src} alt={t.shot.alt} fill sizes="200px" className="object-cover object-left-top" />
                  ) : null}
                </div>
                <div className="flex items-center justify-center gap-2 py-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-blue-600 text-[14px] text-white">
                    <Icon name={t.icon} />
                  </span>
                  <span className="font-display text-[16px] font-bold text-ink">{t.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mask-x mt-3 grid grid-cols-3 gap-px border border-hairline bg-hairline">
            {CELLS.slice(0, 24).map((cell) => (
              <div key={cell[1]} className="flex flex-col items-center justify-center gap-2 bg-white px-2 py-5 text-center">
                <Icon name={cell[0]} className="text-[22px] text-ink-3" />
                <span className="text-[12px] leading-[1.3] font-bold text-ink-2">{cell[1]}</span>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal delay={0.1} className="mask-xy mt-[clamp(32px,4vw,56px)] hidden overflow-hidden lg:block">
        <div
          className="mx-auto grid gap-px bg-hairline"
          style={{
            width: "max(100%, 1100px)",
            maxWidth: 1381,
            gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
            gridTemplateRows: "repeat(8, 127px)",
          }}
        >
          {slots.map((s) => {
            const cell = s.empty ? undefined : CELLS[filled.indexOf(s)];
            return (
              <div
                key={`${s.r}-${s.c}`}
                className="flex flex-col items-center justify-center gap-2.5 bg-white px-2 text-center transition-colors duration-100 hover:bg-panel"
                style={{ gridRow: s.r, gridColumn: s.c }}
              >
                {cell ? (
                  <>
                    <Icon name={cell[0]} className="text-[24px] text-ink-3" />
                    <span className="text-[13px] leading-[1.3] font-bold text-ink-2">{cell[1]}</span>
                  </>
                ) : null}
              </div>
            );
          })}
          {TILES.map((t, i) => (
            <Link
              key={t.id}
              href={t.href}
              className="relative flex flex-col overflow-hidden bg-white transition-opacity hover:opacity-90"
              style={{
                gridRow: `${3 + Math.floor(i / 2) * 2} / span 2`,
                gridColumn: `${4 + (i % 2) * 2} / span 2`,
                background: `radial-gradient(120% 90% at 50% 0%, ${t.color} 0%, #fff 80%)`,
              }}
            >
              <div className="relative mx-4 mt-4 flex-1 overflow-hidden rounded-t-[10px] border border-b-0 border-hairline bg-white">
                {t.shot.src ? (
                  <Image
                    src={t.shot.src}
                    alt={t.shot.alt}
                    fill
                    sizes="280px"
                    className="object-cover object-left-top"
                  />
                ) : null}
              </div>
              <div className="flex items-center justify-center gap-2 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-blue-600 text-[16px] text-white">
                  <Icon name={t.icon} />
                </span>
                <span className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
                  {t.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
