import type { Metadata } from "next";
import { EnterpriseBento } from "@/components/enterprise/bento";
import { EnterpriseSections } from "@/components/enterprise/enterprise-sections";
import { ProofCards } from "@/components/enterprise/proof-cards";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Container,
  CtaRow,
  Eyebrow,
  Headline,
  IconTile,
  Lede,
  LogoStrip,
  RainbowCta,
  Section,
  SecurityStrip,
  TextLink,
} from "@/components/ui";
import { whyPoints } from "@/lib/data";
import { phone, phoneHref, routes, signupUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Flavor Studio for larger food and beverage organisations: per-user and per-group rights, two-factor authentication, audit history, workspace-level cost assumptions, unlimited versions, and an API to the systems you already run.",
};

export default function EnterprisePage() {
  return (
    <PageShell active="enterprise">
      {/* ------------------------------------------------------------ hero */}
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,64px)]">
        <Container wide className="text-center">
          <Reveal>
            <Eyebrow className="mb-5">Flavor Studio Enterprise</Eyebrow>
          </Reveal>
          <Headline as="h1" size="hero" className="mx-auto max-w-[19ch]">
            The most <span className="tail">powerful</span>, flexible and{" "}
            <span className="tail">compliant</span> food R&amp;D{" "}
            <span className="tail">software.</span>
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[60ch]">
            One ingredient library behind every recipe, label and cost sheet;
            rights set per user and per group; a history on every formula — on a
            platform food and beverage manufacturers have run since 2011.
          </Lede>
          <Reveal delay={0.1} className="mt-8">
            <CtaRow
              href={routes.demo}
              label="Contact sales"
              secondary={{ label: "Start your free trial", href: signupUrl }}
              align="center"
            />
          </Reveal>
        </Container>
        <Container wide className="mt-[clamp(40px,5vw,64px)]">
          <LogoStrip />
        </Container>
      </Section>

      {/* ------------------------------------------------------ proof cards */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <ProofCards />
        </Container>
      </Section>

      {/* ------------------------------------------------------------ bento */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Headline size="lg" className="mx-auto max-w-[20ch] text-center">
            Built for enterprise <span className="tail">scalability</span>,
            security and <span className="tail">control.</span>
          </Headline>
          <div className="mt-12">
            <EnterpriseBento />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- sticky-rail tour */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <EnterpriseSections />
        </Container>
      </Section>

      {/* ---------------------------------------------------------- support */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Headline
            size="lg"
            className="mx-auto max-w-[20ch] text-center"
            tail="who know food."
          >
            Support from people
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[56ch] text-center">
            Phone, email and in-app chat, from a team that has been building
            product-development tools for food and beverage manufacturers since
            2011.
          </Lede>
          <RevealStagger
            stagger={0.07}
            className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyPoints.map((p) => (
              <div key={p.title} className="p-6">
                <IconTile name={p.icon} />
                <h3 className="font-display mt-5 text-[17px] leading-[1.3] font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">
                  {p.body}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-between bg-panel p-6">
              <div>
                <IconTile name="phone-telephone" />
                <h3 className="font-display mt-5 text-[17px] leading-[1.3] font-bold text-ink">
                  Talk to a person first
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">
                  Call{" "}
                  <a href={phoneHref} className="font-semibold text-ink">
                    {phone}
                  </a>{" "}
                  or book a demo on your own formulas and we will scope the
                  rollout with you.
                </p>
              </div>
              <TextLink href={routes.demo} className="mt-5">
                Request a demo
              </TextLink>
            </div>
          </RevealStagger>
        </Container>
      </Section>

      <Section className="pb-[clamp(64px,8vw,120px)]">
        <SecurityStrip />
      </Section>

      <RainbowCta
        title="Talk to us about a rollout"
        cta={{ label: "Contact sales", href: routes.demo }}
      />
    </PageShell>
  );
}
