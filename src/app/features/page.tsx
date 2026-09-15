import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { Bento } from "@/components/features/bento";
import { ChipMarquee } from "@/components/features/chip-marquee";
import { FeatureWall } from "@/components/features/feature-wall";
import { IndexHero } from "@/components/features/index-hero";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  Container,
  FaqHeading,
  LogoStrip,
  RainbowCta,
  Section,
  TextLink,
} from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { faqGroups } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * /features — the product hub, on clickup.com's features index (research §2):
 * icon-cloud hero → logo strip → "Built different" bento → sticky-rail
 * feature wall → integrations marquee → FAQ → rainbow CTA.
 */

export const metadata: Metadata = {
  title: "Features",
  description:
    "Recipes, ingredients, costing, versions, nutrition labels, nutrient content claims, the Publish Designer, taste tests, projects with timeline, board, timesheet and reports, CRM, the Customer Requirements Builder, publishing, the API and administration — every Flavor Studio module.",
};

const faqs =
  faqGroups.find((g) => g.title === "Using Flavor Studio")?.items ?? [];

export default function FeaturesPage() {
  return (
    <PageShell active="product">
      <IndexHero />

      <Container>
        <LogoStrip />
      </Container>

      <Bento />

      <FeatureWall />

      <ChipMarquee />

      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <FaqHeading />
          <Reveal
            delay={0.08}
            className="mx-auto mt-[clamp(28px,3.5vw,44px)] max-w-[680px]"
          >
            <FaqAccordion items={faqs} groupKey="features" />
          </Reveal>
          <div className="mt-8 text-center">
            <TextLink href={routes.faq}>See all questions</TextLink>
          </div>
        </Container>
      </Section>

      <RainbowCta
        title="Ready to see every module on your own formulas?"
        cta={{ label: "Request a demo", href: routes.demo }}
        image={{
          src: productAssets.recipeGrid.src,
          alt: productAssets.recipeGrid.alt,
          width: productAssets.recipeGrid.width,
          height: productAssets.recipeGrid.height,
        }}
      />
    </PageShell>
  );
}
