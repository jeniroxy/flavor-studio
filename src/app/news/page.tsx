import type { Metadata } from "next";
import Image from "next/image";
import { NewsFeed } from "@/components/news/news-feed";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  Button,
  Container,
  Eyebrow,
  Headline,
  Lede,
  RainbowCta,
  Section,
} from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { formatNewsDate, newsEntries } from "@/lib/news";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "News",
  description:
    "What's new in Flavor Studio — new modules, improvements, integrations and announcements, as they ship.",
};

/* Updates that have a product screen and a page to send readers to. */
const AGENT_SHOT = productAssets.aiAgent;
const NEWS_VISUAL: Record<
  string,
  { src: string; alt: string; w: number; h: number; href: string; cta: string }
> = {
  "ai-agent-launch": {
    src: AGENT_SHOT.src as string,
    alt: AGENT_SHOT.alt,
    w: AGENT_SHOT.width,
    h: AGENT_SHOT.height,
    href: routes.agent,
    cta: "Meet the AI Agent",
  },
};

export default function NewsPage() {
  const entries = [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = entries;

  return (
    <PageShell active="resources" fill>
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
        <Container wide>
          <Reveal>
            <Eyebrow className="mb-4">News</Eyebrow>
          </Reveal>
          <Headline
            as="h1"
            size="hero"
            className="max-w-[16ch]"
            tail="Flavor Studio."
          >
            What&rsquo;s new in
          </Headline>
          <Lede className="mt-4 max-w-[60ch]">
            New modules, improvements to existing features, integrations and
            announcements — published here as they ship, not just the headline
            releases.
          </Lede>
        </Container>
      </Section>

      {/* ---------------------------------------------- featured (latest) */}
      {featured ? (
        <Section className="pb-[clamp(48px,6vw,80px)]">
          <Container wide>
            {/* The latest update, on the brand ramp: the page's one focal
                point. The ramp stops at a deep teal so white copy holds.
                Where the update has a product screen (NEWS_VISUAL), it sits on
                the right, lifted off the ramp; the full note runs under the
                summary on the left. */}
            <Reveal
              as="article"
              id={featured.slug}
              className="relative grid scroll-mt-[90px] items-center gap-[clamp(28px,4vw,56px)] overflow-hidden rounded-[var(--radius-2xl)] p-[clamp(24px,4.4vw,64px)] text-white lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              style={{
                backgroundImage:
                  "radial-gradient(50% 60% at 85% 40%, rgba(140,209,53,0.22) 0%, rgba(140,209,53,0) 70%), linear-gradient(150deg, #17467f 0%, #2060a6 35%, #1a7f8c 75%, #0f6e5e 100%)",
              }}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold text-[#17467f]">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[.06em] text-white/90 uppercase">
                    <span className="size-1.5 rounded-full bg-lime-400" />
                    Latest ·{" "}
                    <time dateTime={featured.date}>
                      {formatNewsDate(featured.date)}
                    </time>
                  </span>
                </div>
                <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(30px,3.8vw,52px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] font-semibold text-white">
                  {featured.summary}
                </p>
                <div className="mt-6 flex max-w-[60ch] flex-col gap-3 border-l-2 border-lime-400/70 pl-5">
                  {featured.body.map((para, i) => (
                    <p
                      key={i}
                      className="m-0 text-[15px] leading-[1.7] text-white/90"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                {NEWS_VISUAL[featured.slug] ? (
                  <div className="mt-8">
                    <Button
                      href={NEWS_VISUAL[featured.slug].href}
                      variant="inverse"
                      arrow
                    >
                      {NEWS_VISUAL[featured.slug].cta}
                    </Button>
                  </div>
                ) : null}
              </div>

              {NEWS_VISUAL[featured.slug] ? (
                <div className="relative mx-auto w-full max-w-[380px]">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-6 rounded-full bg-white/10 blur-2xl"
                  />
                  <div className="relative overflow-hidden rounded-[16px] bg-white shadow-[0_30px_70px_rgba(6,20,48,0.4)] ring-1 ring-white/20 lg:rotate-[1.5deg]">
                    <Image
                      src={NEWS_VISUAL[featured.slug].src}
                      alt={NEWS_VISUAL[featured.slug].alt}
                      width={NEWS_VISUAL[featured.slug].w}
                      height={NEWS_VISUAL[featured.slug].h}
                      sizes="380px"
                      className="block w-full"
                    />
                  </div>
                </div>
              ) : null}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------ the feed */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Reveal>
            <NewsFeed entries={rest.length ? rest : entries} />
          </Reveal>
          <Reveal className="mt-8 text-[14px] leading-[1.65] text-ink-2">
            <span className="font-semibold text-ink">
              Following along as a customer?
            </span>{" "}
            The updates we email to existing users are published here in the
            same structured form — check back, or ask about the changelog during
            your next support conversation.
          </Reveal>
        </Container>
      </Section>

      <RainbowCta
        title="See the newest capabilities live"
        cta={{ label: "Request a demo", href: routes.demo }}
      />
    </PageShell>
  );
}
