import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PendingAct } from "@/components/customers/pending-narrative";
import { PullQuote } from "@/components/customers/pull-quote";
import { StoryGrid } from "@/components/customers/story-card";
import { Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { StickyRail } from "@/components/sticky-rail";
import {
  Button,
  Container,
  Eyebrow,
  Headline,
  RainbowCta,
  Section,
} from "@/components/ui";
import { stories } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * Per-company case study, on ClickUp's story template (research §5): eyebrow
 * CUSTOMER STORY, hero photo, company-overview card with a mono fact strip,
 * then the long-form body with a sticky Challenge / Solution / Impact rail.
 *
 * `detail.sections` in data.ts is empty for every story today, so the body
 * renders the marked pending state in place of narrative. Filling `sections`
 * lights up numbered H3s + paragraphs and the rail follows the headings —
 * nothing on this page is invented case-study copy.
 */

const ACTS = [
  { id: "challenge", label: "The challenge" },
  { id: "solution", label: "The solution" },
  { id: "impact", label: "The impact" },
];

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.company} — Customer Story`,
    description: story.blurb,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const others = stories.filter((s) => s.slug !== slug);
  const sections = story.detail.sections;
  const hasBody = sections.length > 0;
  const railItems = hasBody
    ? sections.map((s, i) => ({ id: `section-${i + 1}`, label: s.heading }))
    : ACTS;

  // "Fayetteville, Illinois · Meat processing" → two overview facts.
  const [location, category] = story.meta.split(" · ");
  const facts = [
    { icon: "local-two", label: "Location", value: location },
    { icon: "tag-one", label: "Category", value: category },
  ].filter((f) => !!f.value);

  const quote = story.detail.quote;

  return (
    <PageShell active="resources">
      {/* Hero */}
      <Section className="pt-[clamp(40px,6vw,80px)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow>Customer story</Eyebrow>
              </Reveal>
              <Headline as="h1" size="lg" className="mt-4" delay={0.05}>
                {story.title}
              </Headline>
              <Reveal
                delay={0.1}
                className="eyebrow eyebrow-muted mt-5 flex flex-wrap items-center gap-2 text-[12px]"
              >
                <Icon name="local-two" className="text-[15px]" />
                {story.meta}
              </Reveal>
              <Reveal delay={0.14} className="mt-7 flex flex-wrap gap-3">
                <Button href={routes.demo} arrow>
                  Get these results for your team
                </Button>
                <Button href={routes.stories} variant="secondary">
                  See all stories
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="frame">
              <Image
                src={story.img}
                alt={story.imgAlt}
                width={story.imgW}
                height={story.imgH}
                sizes="(max-width: 1024px) 100vw, 540px"
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          </div>

          {/* Company overview */}
          <Reveal className="panel mt-[clamp(48px,6vw,80px)] grid overflow-hidden lg:grid-cols-[1.4fr_1fr]">
            <div className="p-[clamp(24px,3vw,40px)]">
              <h2 className="font-display text-[18px] font-bold tracking-[-0.01em]">
                Company overview
              </h2>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.7] text-ink-2">
                {story.blurb}
              </p>
              <dl className="hairline-grid mt-6 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 px-4 py-3">
                    <Icon name={f.icon} className="shrink-0 text-[18px] text-blue-700" />
                    <div className="eyebrow eyebrow-muted text-[11px]">
                      <dt className="inline">{f.label}: </dt>
                      <dd className="inline text-ink">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <div
              className="flex min-h-[200px] items-center justify-center p-10"
              style={{
                background: "linear-gradient(160deg, #eef6fd 0%, #dfe5ee 100%)",
              }}
            >
              <Image
                src={story.logo}
                alt={story.company}
                width={story.logoW}
                height={story.logoH}
                className="h-auto max-h-[110px] w-auto max-w-[220px] object-contain"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Body with sticky rail */}
      <Section className="pt-[clamp(48px,6vw,80px)]">
        <Container>
          <StickyRail items={railItems}>
            <div className="flex flex-col gap-12">
              {hasBody
                ? sections.map((section, i) => (
                    <div key={section.heading} className="contents">
                      <section id={`section-${i + 1}`} className="scroll-mt-[120px]">
                        <Reveal
                          as="h3"
                          className="font-display max-w-[24ch] text-[clamp(24px,2.6vw,32px)] leading-[1.2] font-bold tracking-[-0.02em]"
                        >
                          {i + 1}. {section.heading}
                        </Reveal>
                        <div className="mt-5 flex flex-col gap-4">
                          {section.paragraphs.map((para, j) => (
                            <Reveal
                              as="p"
                              key={j}
                              delay={0.04 * Math.min(j, 4)}
                              className="max-w-[64ch] text-[16px] leading-[1.75] text-ink-2"
                            >
                              {para}
                            </Reveal>
                          ))}
                        </div>
                      </section>
                      {i === 0 && quote ? <PullQuote quote={quote} /> : null}
                    </div>
                  ))
                : ACTS.map((act, i) => (
                    <div key={act.id} className="contents">
                      <PendingAct
                        id={act.id}
                        label={act.label}
                        company={story.company}
                        lead={i === 0}
                      />
                      {i === 0 && quote ? <PullQuote quote={quote} /> : null}
                    </div>
                  ))}
            </div>
          </StickyRail>
        </Container>
      </Section>

      {/* More stories */}
      <Section className="pt-[var(--section-gap)] pb-[var(--section-gap)]">
        <Container>
          <Headline size="md" tail="stories.">
            More
          </Headline>
          <StoryGrid stories={others} className="mt-8" />
        </Container>
      </Section>

      <RainbowCta
        title="Your story could be next."
        cta={{ label: "Request a demo", href: routes.demo }}
      />
    </PageShell>
  );
}
