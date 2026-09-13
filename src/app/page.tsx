import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { AgentBand } from "@/components/home/agent-band";
import { Formulation } from "@/components/home/formulation";
import { Hero } from "@/components/home/hero";
import { Labels } from "@/components/home/labels";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { PlatformTabs } from "@/components/home/platform-tabs";
import { Stats } from "@/components/home/stats";
import { SuccessStories } from "@/components/home/success-stories";
import { Why } from "@/components/home/why";
import {
  Block,
  BlockStack,
  BlueButton,
  GhostButton,
  SectionHeading,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { homeFaqs } from "@/lib/data";
import { contactEmail, routes } from "@/lib/routes";

export default function HomePage() {
  return (
    <div className="bg-canvas min-h-screen text-[color:var(--text-body)]">
      <SiteNav />

      {/* Section order is deliberate: the core platform (formulation, the
          module tour, labeling) is established before the AI Agent appears.
          The client asked that visitors understand Flavor Studio first and
          meet AI as a capability built on top of it, not the other way
          around. */}
      <BlockStack>
        <Hero />
        <Stats />
        <LogoMarquee />
        <Formulation />
        <PlatformTabs />
        <Labels />
        <Why />
        <AgentBand />
        <SuccessStories />

        {/* FAQ — trimmed to the three objections that block a demo request.
            The rest lives on the FAQ page. */}
        <Block
          id="faq"
          className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]"
        >
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Before you ask for a demo.</SectionHeading>
            </div>
            <RevealStagger
              stagger={0.1}
              delay={0.08}
              className="mt-[clamp(32px,4vw,48px)] flex flex-col gap-3"
            >
              <FaqAccordion items={homeFaqs} defaultOpen={0} groupKey="home" />
            </RevealStagger>
            <Reveal delay={0.16} className="mt-[26px] text-center">
              <TextLink href={routes.faq}>See all questions</TextLink>
            </Reveal>
          </div>
        </Block>

        <CtaBand
          id="demo"
          title="See it on your own formula."
          body="Thirty minutes, your category, your formulas — and the modules you would actually use. No slide deck."
          footnote="14-day free trial, full functionality, no credit card."
        >
          <BlueButton href={routes.demo}>Request a demo</BlueButton>
          <GhostButton href={`mailto:${contactEmail}`}>
            Talk to sales
          </GhostButton>
        </CtaBand>
      </BlockStack>

      <SiteFooter labelingHref="#labels" />
    </div>
  );
}
