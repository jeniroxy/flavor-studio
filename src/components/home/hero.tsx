import Link from "next/link";
import { HeroTabs } from "@/components/home/hero-tabs";
import { LogoBar } from "@/components/home/logo-bar";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { routes, signupUrl, trialLine } from "@/lib/routes";

/*
 * The landing hero, on clickup.com's plan: a left-aligned copy block on the
 * page grid — pill eyebrow, a two-line H1 whose second line is grey, one
 * primary CTA with the trial microcopy beside it — then the full-width
 * product tab strip and the logo bar.
 *
 * The pill points at product news, not AI: the client asked that visitors
 * meet the platform first.
 */
export function Hero() {
  return (
    <section className="pt-[clamp(40px,6vw,80px)]">
      <div className="container-wide">
        <Reveal>
          <Link
            href={routes.feature("claims")}
            className="ring-rainbow-spin ring-rainbow inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-1.5 text-[14px] font-semibold text-ink"
          >
            <span className="rounded-full bg-lime-500 px-2 py-0.5 text-[11px] font-bold tracking-[.06em] uppercase">
              New
            </span>
            Nutrient content claims, checked against the formula
            <Icon name="right" className="text-[14px]" />
          </Link>
        </Reveal>

        <Reveal
          as="h1"
          delay={0.05}
          className="font-display mt-6 max-w-[22ch] text-[clamp(38px,5.2vw,64px)] leading-[1.06] font-bold tracking-[-0.035em] text-ink"
        >
          Software to replace the spreadsheets.
          <span className="mt-1 block text-[clamp(22px,3.2vw,40px)] text-ink-2">
            Formulate. Cost. Label. Launch.
          </span>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Button href={routes.demo} size="lg" arrow>
            Request a demo
          </Button>
          <span className="max-w-[150px] text-[12px] leading-[1.4] text-ink-2">
            {trialLine}
          </span>
          <a
            href={signupUrl}
            className="ml-2 inline-flex items-center gap-1 text-[14px] font-semibold text-ink hover:text-blue-700"
          >
            Start your trial
            <Icon name="arrow-right" className="text-[14px]" />
          </a>
        </Reveal>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)]">
        <HeroTabs />
        <LogoBar />
      </div>
    </section>
  );
}
