import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { StickyRail } from "@/components/sticky-rail";
import {
  Container,
  Headline,
  Lede,
  RainbowCta,
  Section,
  TextLink,
} from "@/components/ui";
import { faqGroups } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Commonly asked questions about Flavor Studio — the company, using the platform, recipes and labeling, pricing, and security.",
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const groups = faqGroups.map((g) => ({ ...g, id: slug(g.title) }));

export default function FaqPage() {
  return (
    <PageShell active="resources" fill>
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
        <Container wide className="text-center">
          {/* The "FAQs" heading with the s in grey — FaqHeading's treatment,
              rendered as the page's h1. The grey s is set inline rather than
              through `tail`, which would put a space before it. */}
          <Headline as="h1" size="hero">
            FAQ<span className="tail">s</span>
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[46ch]">
            Commonly asked questions and answers. Something missing?
          </Lede>
          <Reveal delay={0.1} className="mt-4">
            <TextLink href={routes.contact}>Contact us</TextLink>
          </Reveal>
        </Container>
      </Section>

      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <StickyRail
            items={groups.map((g) => ({ id: g.id, label: g.title }))}
            railTop={100}
          >
            <div className="flex flex-col gap-[clamp(48px,6vw,80px)]">
              {groups.map((group) => (
                <section
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-[100px]"
                >
                  <Reveal className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-100 text-[18px] text-blue-700">
                      <Icon name={group.icon} />
                    </span>
                    <h2 className="font-display text-[clamp(22px,2.2vw,28px)] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
                      {group.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.06} className="mt-5">
                    <FaqAccordion items={group.items} groupKey={group.id} />
                  </Reveal>
                </section>
              ))}
            </div>
          </StickyRail>
        </Container>
      </Section>

      <RainbowCta
        title="More questions? Talk to us."
        cta={{ label: "Contact us", href: routes.contact }}
        note="Phone, email and in-app chat. We reply within one business day."
      />
    </PageShell>
  );
}
