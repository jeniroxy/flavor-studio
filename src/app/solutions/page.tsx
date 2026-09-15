import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import { OrbitHero } from "@/components/solutions/orbit-hero";
import { SolutionCard } from "@/components/solutions/solution-card";
import {
  Container,
  CtaRow,
  Headline,
  IconTile,
  Lede,
  LogoStrip,
  RainbowCta,
  Section,
  SectionHead,
  TextLink,
} from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { modules } from "@/lib/modules";
import { routes } from "@/lib/routes";
import { solutionKinds, solutionsOfKind } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Flavor Studio for every team that touches the formula — R&D, regulatory, costing, sales and sensory — and for CPG manufacturers, ingredient suppliers, restaurant chains, flavor houses, food science programs, research agencies and dieticians.",
};

/*
 * The solutions hub, on ClickUp's /teams page: a hero with orbiting role
 * bubbles, then one card group per audience type, then "Looking for a
 * module?" tiles into the feature pages.
 */
export default function SolutionsPage() {
  return (
    <PageShell active="solutions">
      <OrbitHero>
        <Container className="pt-[clamp(56px,8vw,112px)] pb-[clamp(40px,5vw,64px)]">
          <div className="mx-auto max-w-[760px] text-center">
            <Headline as="h1" size="xl" tail="for every team">
              The everything platform,
            </Headline>
            <Lede className="mx-auto mt-5 max-w-[600px]">
              One ingredient library, eighteen modules. Each team works in the
              ones it needs, on the same recipes as everyone else — and an AI
              Agent that reads all of it.
            </Lede>
            <Reveal delay={0.1} className="mt-8">
              <CtaRow href={routes.demo} align="center" />
            </Reveal>
          </div>
        </Container>
      </OrbitHero>

      <Container>
        <LogoStrip />
      </Container>

      {solutionKinds.map((group) => {
        const items = solutionsOfKind(group.kind);
        return (
          <Section key={group.kind} className="py-[clamp(56px,7vw,104px)]">
            <Container>
              <SectionHead
                title={group.title}
                tail={group.tail}
                lede={group.lede}
              />
              <RevealStagger
                stagger={0.07}
                className="mt-[clamp(32px,4vw,56px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {items.map((s) => (
                  <SolutionCard key={s.slug} solution={s} />
                ))}
              </RevealStagger>
            </Container>
          </Section>
        );
      })}

      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            title="Looking for a"
            tail="module?"
            lede="Every team's page links to the modules it uses. If you already know the one you need, go straight there."
          />
          <RevealStagger
            stagger={0.04}
            className="mt-[clamp(32px,4vw,48px)] grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          >
            {modules.map((m) => (
              <Link
                key={m.id}
                href={routes.feature(m.id)}
                className="card flex flex-col items-start gap-3 p-4"
              >
                <IconTile name={m.icon} />
                <span className="text-[14px] leading-[1.3] font-semibold text-ink">
                  {m.label}
                </span>
                <span className="text-[12px] leading-[1.4] text-ink-3">
                  {m.group}
                </span>
              </Link>
            ))}
          </RevealStagger>
          <Reveal className="mt-8 text-center">
            <TextLink href={routes.features}>See all eighteen modules</TextLink>
          </Reveal>
        </Container>
      </Section>

      <RainbowCta
        title="One platform for every team that touches the formula."
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
