import { FaqAccordion } from "@/components/faq-accordion";
import { AgentAct } from "@/components/home/agent-act";
import { Facts } from "@/components/home/facts";
import { FeatureWall } from "@/components/home/feature-wall";
import { Hero } from "@/components/home/hero";
import { Labels } from "@/components/home/labels";
import { Problem } from "@/components/home/problem";
import { Stories } from "@/components/home/stories";
import { TeamsTabs } from "@/components/home/teams-tabs";
import { Testimonials } from "@/components/home/testimonials";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { Container, FaqHeading, RainbowCta, Section, SecurityStrip, TextLink } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { homeFaqs } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * The landing page, on clickup.com's section order (docs/research/
 * clickup-home-analysis.md §2), with one deliberate change: the AI act comes
 * after the platform, the teams and the labels. The client asked that
 * visitors understand Flavor Studio first and meet AI as a capability built
 * on top of it.
 */
export default function HomePage() {
  const shot = productAssets.recipeGrid;
  return (
    <PageShell>
      <Hero />
      <Problem />
      <FeatureWall />
      <TeamsTabs />
      <Labels />
      <AgentAct />
      <Facts />
      <Testimonials />
      <Stories />

      <Section className="py-[clamp(40px,5vw,72px)]">
        <SecurityStrip />
      </Section>

      <Section id="faq" className="py-[clamp(40px,5vw,72px)]">
        <Container>
          <div className="mx-auto max-w-[680px]">
            <FaqHeading />
            <Reveal delay={0.08} className="mt-8">
              <FaqAccordion items={homeFaqs} defaultOpen={0} groupKey="home" />
            </Reveal>
            <Reveal delay={0.12} className="mt-6 text-center">
              <TextLink href={routes.faq}>See all questions</TextLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <RainbowCta
        id="demo"
        title="All your formulas, all your people, one platform."
        image={{ src: shot.src as string, alt: shot.alt, width: shot.width, height: shot.height }}
      />
    </PageShell>
  );
}
