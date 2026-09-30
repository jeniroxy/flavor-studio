import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { StoryGrid } from "@/components/customers/story-card";
import { STORY_RAMP, StoryQuote } from "@/components/customers/story-quote";
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
import { stories, type Story } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * A customer story. The narrative is the legacy story page's, verbatim
 * (`legacy` in data.ts): its headings, paragraphs, RESULTS figures and
 * pull-quotes, in the legacy order. Nothing here is written for the site.
 *
 * Layout: hero (title, meta, photo with the company's logo chip), the
 * results on the brand ramp beside the company overview, then the long form
 * with a sticky rail of its chapters. A quote with a name is set large on the
 * ramp with the speaker's portrait where the site has one; a quote without
 * one is the legacy page's highlight of a body line, set as a tinted aside.
 */

const RAMP = STORY_RAMP;

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

type Block = NonNullable<Story["legacy"]>["blocks"][number];
type Chapter = Extract<Block, { kind: "section" }>;

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Highlight({ text }: { text: string }) {
  return (
    <Reveal
      as="aside"
      className="flex gap-4 rounded-[var(--radius-lg)] bg-[#eef6fd] p-[clamp(18px,3vw,28px)]"
    >
      <span
        aria-hidden="true"
        className="hex-round flex aspect-[1/1.1547] w-9 flex-none items-center justify-center text-white"
        style={{ backgroundImage: RAMP }}
      >
        <Icon name="quote" className="text-[15px]" />
      </span>
      <p className="font-display m-0 text-[clamp(17px,1.7vw,21px)] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
        {text}
      </p>
    </Reveal>
  );
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story || !story.legacy) notFound();

  const others = stories.filter((s) => s.slug !== slug);
  const { results, blocks, photo } = story.legacy;

  // The chapters: every level-2 heading.
  const chapters = blocks
    .filter((b): b is Chapter => b.kind === "section" && b.level === 2)
    .map((b) => ({ id: slugify(b.heading), label: b.heading }));

  const [location, category] = story.meta.split(" · ");

  return (
    <PageShell active="resources">
      {/* ------------------------------------------------------------ hero */}
      <Section className="pt-[clamp(40px,6vw,80px)]">
        <Container>
          <div className="grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <Reveal>
                <Eyebrow>Customer story</Eyebrow>
              </Reveal>
              <Headline as="h1" size="lg" className="mt-4" delay={0.05}>
                {story.title}
              </Headline>
              <Reveal
                delay={0.1}
                className="mt-5 flex flex-wrap gap-2 text-[13px] font-semibold text-ink"
              >
                {[
                  { icon: "local-two", v: location },
                  { icon: "tag-one", v: category },
                ]
                  .filter((f) => f.v)
                  .map((f) => (
                    <span
                      key={f.v}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f4f8] px-3 py-1.5"
                    >
                      <Icon
                        name={f.icon}
                        className="text-[14px] text-blue-700"
                      />
                      {f.v}
                    </span>
                  ))}
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
            <Reveal delay={0.1} className="relative">
              <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-[0_30px_70px_rgba(22,34,58,0.18)]">
                <Image
                  src={story.img}
                  alt={story.imgAlt}
                  width={story.imgW}
                  height={story.imgH}
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <span className="absolute -bottom-5 left-5 flex h-14 items-center rounded-[14px] bg-white px-4 shadow-[0_10px_30px_rgba(22,34,58,0.16)]">
                <Image
                  src={story.logo}
                  alt={story.company}
                  width={story.logoW}
                  height={story.logoH}
                  className="h-auto max-h-9 w-auto max-w-[140px] object-contain"
                />
              </span>
            </Reveal>
          </div>

          {/* results + overview */}
          <div className="mt-[clamp(56px,7vw,96px)] grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal
              className="flex flex-col justify-between rounded-[var(--radius-xl)] p-[clamp(24px,3vw,40px)] text-white"
              style={{ backgroundImage: RAMP }}
            >
              <span className="font-mono text-[12px] tracking-[.08em] text-white/90 uppercase">
                Results
              </span>
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6">
                {results.map((r) => (
                  <div key={r.label}>
                    <div className="font-display text-[clamp(48px,6vw,76px)] leading-none font-bold tracking-[-0.04em]">
                      {r.value}
                    </div>
                    <div className="mt-2 text-[15px] font-semibold text-white">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal
              delay={0.06}
              className="rounded-[var(--radius-xl)] bg-panel p-[clamp(24px,3vw,40px)]"
            >
              <span className="font-mono text-[12px] tracking-[.08em] text-ink-2 uppercase">
                Company overview
              </span>
              <p className="mt-4 text-[16px] leading-[1.7] text-ink-2">
                {story.blurb}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ body */}
      <Section className="pt-[clamp(56px,7vw,104px)]">
        <Container>
          <StickyRail items={chapters}>
            <div className="flex flex-col gap-10">
              {blocks.map((b, i) => {
                if (b.kind === "quote")
                  return b.name ? (
                    <StoryQuote
                      key={i}
                      text={b.text}
                      name={b.name}
                      role={b.role}
                    />
                  ) : (
                    <Highlight key={i} text={b.text} />
                  );
                return (
                  <div key={i} className="contents">
                    <section
                      id={b.level === 2 ? slugify(b.heading) : undefined}
                      className="scroll-mt-[120px]"
                    >
                      {b.label ? (
                        <Reveal>
                          <Eyebrow>{b.label}</Eyebrow>
                        </Reveal>
                      ) : null}
                      <Reveal
                        as={b.level === 2 ? "h2" : "h3"}
                        className={`font-display leading-[1.2] font-bold tracking-[-0.02em] text-ink ${
                          b.level === 2
                            ? "mt-3 max-w-[26ch] text-[clamp(26px,2.8vw,36px)]"
                            : "text-[clamp(20px,2vw,24px)]"
                        }`}
                      >
                        {b.heading}
                      </Reveal>
                      <div className="mt-4 flex flex-col gap-4">
                        {b.paragraphs.map((para, j) => (
                          <Reveal
                            as="p"
                            key={j}
                            delay={0.04 * Math.min(j, 3)}
                            className="max-w-[66ch] text-[16.5px] leading-[1.75] text-ink-2"
                          >
                            {para}
                          </Reveal>
                        ))}
                      </div>
                    </section>
                    {i === 0 && photo ? (
                      <Reveal className="overflow-hidden rounded-[var(--radius-xl)]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.w}
                          height={photo.h}
                          sizes="(max-width: 1024px) 100vw, 720px"
                          className="max-h-[420px] w-full object-cover"
                        />
                      </Reveal>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </StickyRail>
        </Container>
      </Section>

      {/* ---------------------------------------------------- more stories */}
      <Section className="py-[var(--section-gap)]">
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
