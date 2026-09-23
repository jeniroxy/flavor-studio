import Link from "next/link";
import { HeroTabs } from "@/components/home/hero-tabs";
import { LogoBar } from "@/components/home/logo-bar";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The landing hero, from the design at node 40000315:32528: a centred copy
 * block — announcement chip, a 76px H1 whose last word carries the brand
 * green, a 32px sub-line, then two pills — followed by the module tab strip
 * and the logo bar.
 *
 * Note for anyone reading the history: this hero was previously left-aligned,
 * and its chip deliberately pointed at product news rather than AI, because
 * the client's written review asked that visitors meet the platform first and
 * AI second. The newer design reverses that — the chip now leads with the AI
 * Agent. The design is the later instruction, so it wins, but the earlier rule
 * was not forgotten.
 */
/*
 * Six circular crops of one spice photo (public/assets/food-1.png, the same
 * 1024×783 image the design fills all six ellipses with). Each entry is that
 * ellipse's own crop, converted from its Figma imageTransform: the visible
 * window is 18.5% × 24.1% of the source, which maps to a 811×622 background.
 *
 * x/y are the design's own coordinates on its 1440 frame, shifted up by the
 * 60px nav. Several are negative or past 1440 on purpose — they bleed off the
 * frame edge, and the section clips them exactly as the frame does.
 */
const VIGNETTES = [
  { x: -59, y: 20, bx: -467, by: -236 },
  { x: 1348, y: 23, bx: -467, by: -390 },
  { x: 90, y: 119, bx: -332, by: -470 },
  { x: 1191, y: 119, bx: -333, by: -314 },
  { x: -60, y: 218, bx: -468, by: -390 },
  { x: 1347, y: 218, bx: -195, by: -390 },
];

function Vignettes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center lg:flex"
    >
      <div className="relative h-[400px] w-[1440px]">
        {VIGNETTES.map((v) => (
          <span
            key={`${v.x}:${v.y}`}
            className="absolute h-[150px] w-[150px] rounded-full"
            style={{
              left: v.x,
              top: v.y,
              backgroundImage: "url(/assets/food-1.png)",
              backgroundSize: "811px 622px",
              backgroundPosition: `${v.bx}px ${v.by}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[clamp(40px,6vw,80px)]">
      <Vignettes />
      <div className="relative container-wide text-center">
        <Reveal>
          {/* A translucent pill with a hairline border and a sky→teal badge,
              exactly as the design draws it — not the rainbow ring this chip
              used to wear. */}
          <Link
            href={routes.agent}
            className="inline-flex items-center gap-2.5 rounded-full border border-black/15 bg-white/[.07] py-1.5 pr-4 pl-1.5 text-[13.5px] font-semibold text-[#203550] transition-colors hover:bg-white"
          >
            <span
              className="rounded-full px-3 py-[5px] text-[11px] font-extrabold text-white"
              style={{ background: "linear-gradient(90deg,#59a3eb,#18bc9c)" }}
            >
              NEW
            </span>
            Meet the AI Agent — built into the platform
            <Icon name="right" className="text-[14px]" />
          </Link>
        </Reveal>

        {/* "Innovation" uses .tail, which is the same green the design paints
            it with (#5c822b) — one token, not a second hard-coded colour. */}
        <Reveal
          as="h1"
          delay={0.05}
          className="font-display mx-auto mt-6 max-w-[16ch] text-[clamp(40px,5.3vw,76px)] leading-[1.08] font-bold tracking-[-0.035em] text-ink"
        >
          Ignite Your <span className="tail">Innovation</span>
        </Reveal>

        <Reveal
          delay={0.1}
          className="font-display mx-auto mt-2 max-w-[46ch] text-[clamp(20px,2.3vw,32px)] leading-[1.25] font-bold text-[#292d34]"
        >
          Develop better food and beverage products faster
        </Reveal>

        <Reveal
          delay={0.14}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button href={routes.demo} size="lg">
            Request a Demo
          </Button>
          <Button href={routes.features} variant="secondary" size="lg">
            Explore The Platform
          </Button>
        </Reveal>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)]">
        <HeroTabs />
        <LogoBar />
      </div>
    </section>
  );
}
