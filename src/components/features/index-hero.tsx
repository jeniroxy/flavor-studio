import Image from "next/image";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import {
  Container,
  CtaRow,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/ui";
import { modules } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The features-index hero (research §2): a faded, floating cloud of module
 * icons behind a glowing centre tile carrying the logo mark — CSS only — then
 * the eyebrow, "All the tools, one platform.", lede and CTAs, all centred.
 *
 * Tile drift reuses the fsGlowDrift keyframe with staggered durations; the
 * global reduced-motion rule stops it.
 */
/*
 * All eighteen modules, not twelve. The six that used to be missing —
 * timeline, board, reports, cr-builder, publishing, admin — are the ones the
 * client's review listed as absent from the site, so a hero that claims
 * "eighteen modules" while drawing twelve was making their point for them.
 *
 * Positions are a ring, not a scatter: eighteen tiles dropped into the old
 * hand-placed scatter collided (labels ran through each other and through the
 * centre mark). Even angular spacing keeps roughly 140px between neighbours,
 * and the ring leaves the middle clear for the logo tile. `short` trims the
 * three labels long enough to reach a neighbour — decorative only, the full
 * names are on the cards below.
 */
const CLOUD: { id: string; x: number; y: number; d: number; short?: string }[] =
  [
    { id: "recipes", x: 50, y: 12, d: 13 },
    { id: "ingredients", x: 60, y: 24, d: 17 },
    { id: "versions", x: 74, y: 21, d: 15 },
    { id: "costing", x: 75, y: 36, d: 19 },
    { id: "labeling", x: 87, y: 43, d: 14 },
    { id: "claims", x: 79, y: 55, d: 16, short: "Claims" },
    { id: "designer", x: 83, y: 69, d: 18 },
    { id: "publishing", x: 69, y: 71, d: 12, short: "Publish & export" },
    { id: "taste-tests", x: 63, y: 86, d: 15 },
    { id: "projects", x: 50, y: 78, d: 17 },
    { id: "timeline", x: 37, y: 86, d: 13, short: "Timeline" },
    { id: "board", x: 31, y: 71, d: 20, short: "Board" },
    { id: "timesheet", x: 17, y: 69, d: 16 },
    { id: "reports", x: 21, y: 55, d: 14 },
    { id: "crm", x: 13, y: 43, d: 18 },
    { id: "cr-builder", x: 25, y: 36, d: 15 },
    { id: "integrations", x: 26, y: 21, d: 19 },
    { id: "admin", x: 40, y: 24, d: 12, short: "Admin" },
  ];

function IconCloud() {
  return (
    <div
      aria-hidden="true"
      className="mask-xy relative mx-auto h-[360px] w-full max-w-[980px] sm:h-[420px]"
    >
      {CLOUD.map((c, i) => {
        const m = modules.find((x) => x.id === c.id);
        if (!m) return null;
        return (
          <div
            key={c.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 opacity-40"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              animation: `fsGlowDrift ${c.d}s ease-in-out ${-(i * 1.7)}s infinite`,
            }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-hairline bg-panel text-[22px] text-ink-2">
              <Icon name={m.icon} />
            </span>
            <span className="hidden text-[11px] font-semibold whitespace-nowrap text-ink-3 sm:block">
              {c.short ?? m.label}
            </span>
          </div>
        );
      })}
      {/* Centre tile with the glow behind it. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="absolute top-1/2 left-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(89,163,235,.55), rgba(140,209,53,.25) 60%, transparent)",
            animation: "fsGlowDrift 9s ease-in-out infinite",
          }}
        />
        <div className="ring-rainbow relative flex h-[88px] w-[88px] items-center justify-center rounded-[22px] bg-white shadow-float">
          <Image
            src="/assets/logo-mark.png"
            alt=""
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function IndexHero() {
  return (
    <Section className="overflow-hidden pt-[clamp(16px,3vw,40px)] pb-[clamp(32px,4vw,56px)]">
      <Container>
        <Reveal>
          <IconCloud />
        </Reveal>
        <div className="mx-auto mt-6 max-w-[760px] text-center">
          <Reveal>
            <Eyebrow className="mb-5">Flavor Studio features</Eyebrow>
          </Reveal>
          <Headline as="h1" size="xl" tail="platform." delay={0.04}>
            All the tools, one
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[600px]">
            Eighteen modules for food and beverage product development —
            formulation, nutrition and labels, sensory, projects, CRM and the
            platform underneath — sharing one ingredient library and one live
            cost model.
          </Lede>
          {/* The secondary used to read "Get a demo" and point at /contact,
              beside a primary reading "Request a demo" — two buttons, nearly
              the same words, different destinations. The client asked for
              exactly this distinction to be clear: a demo request goes to the
              demo form, contacting us goes to Contact. */}
          <Reveal delay={0.1} className="mt-8">
            <CtaRow
              href={routes.demo}
              label="Request a demo"
              secondary={{ label: "Contact us", href: routes.contact }}
              align="center"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
