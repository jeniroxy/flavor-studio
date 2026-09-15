import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import { Pillars } from "@/components/solutions/pillars";
import {
  SolutionVisualFrame,
  visualPoster,
} from "@/components/solutions/solution-visual";
import {
  UseCaseSuite,
  type ModuleRef,
} from "@/components/solutions/use-case-suite";
import {
  Container,
  CtaRow,
  Eyebrow,
  FaqHeading,
  GradientBanner,
  Headline,
  IconTile,
  Lede,
  LogoStrip,
  RainbowCta,
  Section,
  SectionHead,
} from "@/components/ui";
import { modules } from "@/lib/modules";
import { routes } from "@/lib/routes";
import { getSolution, solutions, solutionSlugs } from "@/lib/solutions";

/*
 * One page per audience, on ClickUp's department template (/teams/marketing):
 * eyebrow + H1 + lede + CTA beside a real screenshot; logo strip; three pillar
 * rows; the use-case suite with agent cards; a gradient banner; the modules
 * this team uses; cross-links to every other solution; FAQ; the closing CTA.
 */

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.label} — Solutions`,
    description: s.lede,
  };
}

const moduleIndex: Record<string, ModuleRef> = Object.fromEntries(
  modules.map((m) => [m.id, { id: m.id, label: m.label, icon: m.icon }]),
);

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const usedModules = s.modules
    .map((id) => modules.find((m) => m.id === id))
    .filter((m): m is (typeof modules)[number] => !!m);
  const others = solutions.filter((o) => o.slug !== s.slug);
  const poster = visualPoster(s.hero);

  return (
    <PageShell active="solutions">
      {/* hero */}
      <Section className="pt-[clamp(40px,6vw,88px)] pb-[clamp(40px,5vw,72px)]">
        <Container wide>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <Reveal>
                <Eyebrow className="mb-4">{s.audience} · Flavor Studio</Eyebrow>
              </Reveal>
              <Headline as="h1" size="hero" tail={s.tail} delay={0.04}>
                {s.title}
              </Headline>
              <Lede className="mt-5 max-w-[52ch]">{s.lede}</Lede>
              <Reveal delay={0.1} className="mt-8">
                <CtaRow
                  href={routes.demo}
                  secondary={{ label: "See pricing", href: routes.pricing }}
                />
              </Reveal>
            </div>
            <Reveal delay={0.12} className="min-w-0">
              <SolutionVisualFrame
                visual={s.hero}
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="shadow-float"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Container>
        <LogoStrip />
      </Container>

      {/* pillars */}
      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            title={s.pillarsTitle.title}
            tail={s.pillarsTitle.tail}
          />
          <div className="mt-[clamp(32px,4vw,56px)]">
            <Pillars pillars={s.pillars} />
          </div>
        </Container>
      </Section>

      {/* use-case suite */}
      <Section className="pb-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            eyebrow="Use cases"
            title={`What ${s.label.toLowerCase()} teams do here,`}
            tail="and what the AI Agent does for them"
            lede="Pick a use case. Each panel names the modules involved and the questions the Agent can answer for this team — with a citation, and never a silent edit."
          />
          <Reveal className="mt-[clamp(28px,3vw,40px)]">
            <UseCaseSuite
              useCases={s.useCases}
              agentSkills={s.agentSkills}
              replaces={s.replaces}
              moduleIndex={moduleIndex}
            />
          </Reveal>
        </Container>
      </Section>

      {/* banner */}
      <Section className="pb-[clamp(56px,7vw,104px)]">
        <Container>
          <GradientBanner
            title={s.banner.title}
            body={s.banner.body}
            image={poster}
            cta={{ label: "Request a demo", href: routes.demo }}
          />
        </Container>
      </Section>

      {/* modules */}
      <Section className="pb-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            title={`Plus, everything ${s.label.toLowerCase()}`}
            tail="teams need to move"
            lede="The modules this audience uses most. Each stands alone — use one or all eighteen."
          />
          <RevealStagger
            stagger={0.05}
            className="mt-[clamp(32px,4vw,48px)] grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {usedModules.map((m) => (
              <Link
                key={m.id}
                href={routes.feature(m.id)}
                className="group flex items-start gap-4"
              >
                <IconTile name={m.icon} />
                <span>
                  <span className="block text-[15px] font-semibold text-ink group-hover:text-blue-700">
                    {m.label}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-ink-2">
                    {m.title}
                  </span>
                </span>
              </Link>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* built for every team */}
      <Section className="border-y border-hairline py-[clamp(56px,7vw,96px)]">
        <Container>
          <SectionHead
            eyebrow="Built for every team"
            title="Flavor Studio works across"
            tail="the whole company"
            lede="The same recipes, ingredients and labels, seen from every seat that touches them."
          />
          <RevealStagger
            stagger={0.03}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {others.map((o) => (
              <Link
                key={o.slug}
                href={routes.solution(o.slug)}
                className="pill-tab"
              >
                {o.label}
              </Link>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* faq */}
      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <FaqHeading />
            <Reveal className="mt-[clamp(28px,3vw,40px)]">
              <FaqAccordion items={s.faqs} defaultOpen={0} groupKey={s.slug} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <RainbowCta
        title={s.closing}
        cta={{ label: "Request a demo", href: routes.demo }}
        image={poster}
      />
    </PageShell>
  );
}
