import Image from "next/image";
import { HexLattice, HexTile } from "@/components/hex";
import { FormulaRail } from "@/components/home/formula-rail";
import { Icon } from "@/components/icon";
import { HeroBackdrop } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * The landing hero.
 *
 * Rebuilt against two pieces of client feedback. First, that the page did not
 * show the product: the hero's centrepiece was an animated card we drew
 * ourselves, so it is now the actual Recipe page, exported from the Flavor
 * Studio application. Second, that the design read as generic — so the stock
 * dot grid is replaced by the hexagon lattice taken from the logo, and the
 * copy sits above the 100% formula rail, which is the one graphic device only
 * this product can own.
 *
 * Height is still budgeted so the hero and the customer logo row below it both
 * land inside the first screen.
 */
export function Hero() {
  const shot = productAssets.recipeGrid;

  return (
    <section
      id="top"
      className="relative flex items-center overflow-clip rounded-[clamp(20px,2vw,30px)]"
      style={{
        minHeight:
          "calc(100vh - var(--nav-height) - clamp(32px, 4.4vw, 68px) - clamp(96px, 10vh, 132px))",
      }}
    >
      <HeroBackdrop angle={165} dots={false} />
      <HexLattice id="fsHeroHex" opacity={0.55} />

      {/* A single lime bloom in the upper right, where the hexagon mark's
          colour belongs. Replaces the pair of drifting orbs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-22%] right-[-12%] h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(140,209,53,.16) 0%, rgba(140,209,53,0) 62%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-[clamp(36px,4.6vw,56px)] px-[clamp(28px,3.6vw,64px)] pt-[clamp(52px,6vw,86px)] pb-[clamp(52px,6vw,84px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div>
          {/* The badge leads with the platform's breadth, not the AI — the
              client asked that core functionality come first and AI read as a
              capability on top. */}
          <Reveal
            as="a"
            href="#product"
            className="inline-flex items-center gap-[10px] rounded-full border border-white/[.16] bg-white/[.06] py-[5px] pr-[18px] pl-[5px] text-[13px] font-semibold text-[#dfe5ee] transition-[border-color] duration-[180ms] hover:border-white/50 hover:text-white"
          >
            <HexTile size={26} style={{ background: "var(--color-lime-500)" }}>
              <Icon name="box" className="text-[13px] text-[#1e2a3e]" />
            </HexTile>
            <span>Recipes · Labels · Projects · Sensory · CRM</span>
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="font-display mt-[22px] text-[clamp(40px,5vw,66px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-white"
          >
            Own your formula, from{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">idea to shelf.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-[-.04em] bottom-[.07em] z-0 h-[.26em] bg-[color:var(--color-lime-500)] opacity-70"
              />
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.16}
            className="mt-[20px] max-w-[52ch] text-[clamp(15.5px,1.4vw,18px)] leading-[1.62] text-[#aebdd0]"
          >
            The platform food &amp; beverage teams develop in: formulate and
            cost recipes, generate compliant labels, run taste tests, log
            project time, and manage customers — all from one shared ingredient
            library.
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-7 flex flex-wrap items-center gap-[14px]"
          >
            <a
              href={routes.demo}
              className="relative inline-block overflow-hidden rounded-full bg-[#7fd234] px-[32px] py-[15px] text-[16px] font-extrabold whitespace-nowrap text-[#16223a] shadow-lime transition-[background,box-shadow] duration-[180ms] hover:bg-[#8ede40] hover:shadow-lime-strong"
            >
              Request a demo
            </a>
            <a
              href="#product"
              className="rounded-full border border-white/[.14] bg-white/[.07] px-[28px] py-[14px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.14]"
            >
              Explore the platform
            </a>
          </Reveal>

          {/* The signature element: a real formula, resolving to 100.000%. */}
          <Reveal delay={0.3} className="mt-[clamp(28px,3.4vw,42px)]">
            <FormulaRail
              className="max-w-[560px]"
              caption="A real Flavor Studio formula — 500.000 g batch, $6.614 total cost. Every percentage, weight and price recomputes as you type."
            />
          </Reveal>
        </div>

        {/* The product shot runs off the right edge of the block. It buys the
            screenshot roughly 40% more width than a boxed column would, which
            is the difference between the UI reading as a picture of software
            and reading as software. The section clips the overflow. */}
        <Reveal
          delay={0.15}
          className="relative lg:-mr-[clamp(28px,6vw,110px)]"
        >
          <figure className="m-0">
            <Image
              src={shot.src as string}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              priority
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="w-full rounded-[14px] border border-white/10 shadow-window"
            />
            <figcaption className="mt-[10px] max-w-[62ch] text-[13px] leading-[1.5] text-[#8fa3bd]">
              The Recipe page in Flavor Studio — ingredient grid, sub-levels,
              versions and the live Yield&nbsp;/&nbsp;Cost sidebar.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
