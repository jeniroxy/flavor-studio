import type { Metadata } from "next";
import { NewsFeed } from "@/components/news/news-feed";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Eyebrow,
  Headline,
  Lede,
  RainbowCta,
  Section,
} from "@/components/ui";
import { formatNewsDate, newsEntries } from "@/lib/news";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "News",
  description:
    "What's new in Flavor Studio — new modules, improvements, integrations and announcements, as they ship.",
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
            <Reveal
              as="article"
              id={featured.slug}
              className="panel grid scroll-mt-[90px] gap-8 p-[clamp(24px,3.5vw,48px)] lg:grid-cols-[1.1fr_1fr]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="chip">{featured.category}</span>
                  <span className="eyebrow eyebrow-muted text-[11px]">
                    Latest ·{" "}
                    <time dateTime={featured.date}>
                      {formatNewsDate(featured.date)}
                    </time>
                  </span>
                </div>
                <h2 className="font-display mt-5 text-[clamp(26px,2.9vw,40px)] leading-[1.15] font-bold tracking-[-0.03em] text-ink">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[clamp(16px,1.35vw,18px)] leading-[1.6] text-ink-2">
                  {featured.summary}
                </p>
              </div>
              <div className="flex flex-col gap-4 border-t border-hairline pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                {featured.body.map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.7] text-ink-2">
                    {para}
                  </p>
                ))}
              </div>
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
