import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { FeaturesWalkthrough } from "@/components/features/hero-walkthrough";
import { ModuleCatalogue } from "@/components/features/module-catalogue";
import { ModuleMosaic } from "@/components/features/module-mosaic";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Recipes, ingredients, versions, nutrition and labeling, the Publish Designer, taste tests, projects with timeline, board and reports, CRM, publishing and export, the API and webhooks — the complete Flavor Studio platform, module by module.",
};

export default function FeaturesPage() {
  return (
    <PageShell active="features">
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative">
          <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(28px,3.4vw,52px)]">
            <div>
              <SectionLabel tone="dark">Product</SectionLabel>
              <Reveal
                as="h1"
                delay={0.06}
                className="font-display mt-[14px] max-w-[16ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
              >
                Eighteen modules. One ingredient library.
              </Reveal>
              <Reveal
                as="p"
                delay={0.12}
                className="mt-[18px] max-w-[56ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
              >
                Every tool a food developer touches — formulation, nutrition,
                labels, projects, sensory, CRM, publishing and the API — sharing
                one ingredient library and one live cost model.
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative min-w-0">
              <FeaturesWalkthrough />
            </Reveal>
          </div>
        </div>
      </Block>

      <ModuleMosaic />

      <ModuleCatalogue />

      <CtaBand
        title="See every module on your own formulas."
        className="py-[clamp(60px,7vw,100px)]"
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <a
          href={routes.pricing}
          className="rounded-full border border-white/30 px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
        >
          View pricing
        </a>
      </CtaBand>
    </PageShell>
  );
}
