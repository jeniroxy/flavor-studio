import { FormulaRail } from "@/components/home/formula-rail";
import { ProductShot } from "@/components/product-shot";
import {
  Caption,
  GhostButton,
  HeroBackdrop,
  LimeButton,
} from "@/components/layout-primitives";
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
 * The clean-up pass then took things away: a module-list badge above the
 * headline, a lime highlight bar under it, a lime bloom in the corner and a
 * second caption under the rail. Headline, one paragraph, two buttons, the
 * rail, the product — that is the whole hero.
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
      <HeroBackdrop angle={165} />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-[clamp(36px,4.6vw,56px)] px-[clamp(28px,3.6vw,64px)] pt-[clamp(52px,6vw,86px)] pb-[clamp(52px,6vw,84px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div>
          <Reveal
            as="h1"
            className="font-display text-[clamp(40px,5vw,66px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-white"
          >
            Own your formula, from idea to shelf.
          </Reveal>

          <Reveal
            as="p"
            delay={0.08}
            className="mt-[20px] max-w-[52ch] text-[clamp(15.5px,1.4vw,18px)] leading-[1.62] text-[#aebdd0]"
          >
            The platform food &amp; beverage teams develop in: formulate and
            cost recipes, generate compliant labels, run taste tests, log
            project time, and manage customers — all from one shared ingredient
            library.
          </Reveal>

          <Reveal
            delay={0.16}
            className="mt-7 flex flex-wrap items-center gap-[14px]"
          >
            <LimeButton href={routes.demo}>Request a demo</LimeButton>
            <GhostButton href="#product">Explore the platform</GhostButton>
          </Reveal>

          {/* The signature element: a real formula, resolving to 100.000%. */}
          <Reveal delay={0.24} className="mt-[clamp(32px,3.8vw,48px)]">
            <FormulaRail className="max-w-[520px]" />
          </Reveal>
        </div>

        {/* The product shot runs off the right edge of the block. It buys the
            screenshot roughly 40% more width than a boxed column would, which
            is the difference between the UI reading as a picture of software
            and reading as software. The section clips the overflow. */}
        <Reveal delay={0.15} className="relative lg:-mr-[clamp(16px,3vw,56px)]">
          <figure className="m-0">
            <ProductShot
              src={shot.src as string}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              focus={shot.focus}
              tone="dark"
              priority
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="shadow-window"
              delay={1.1}
            />
            <Caption as="figcaption" tone="dark" className="max-w-[62ch]">
              The Recipe page in Flavor Studio — ingredient grid, sub-levels,
              versions and the live Yield&nbsp;/&nbsp;Cost sidebar.
            </Caption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
