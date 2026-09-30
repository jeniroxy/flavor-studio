import type { Metadata } from "next";
import { StoryCard } from "@/components/customers/story-card";
import { StoryQuote } from "@/components/customers/story-quote";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Container,
  Eyebrow,
  Headline,
  Lede,
  RainbowCta,
  Section,
} from "@/components/ui";
import { stories } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "How Deli Star, Good Foods and Ripple Foods develop better products with Flavor Studio.",
};

/*
 * The story index: the three real stories as large cover cards, the three
 * customers quoted on their legacy story pages, and the closing CTA. Copy, photography and logos
 * all come from src/lib/data.ts.
 */

export default function SuccessStoriesPage() {
  // The customers speaking on the legacy story pages, one per story.
  const quoted = stories.flatMap((s) => {
    const q = s.legacy?.blocks.find((b) => b.kind === "quote" && b.name);
    return q && q.kind === "quote" && q.name
      ? [{ ...q, name: q.name, company: s.company, slug: s.slug }]
      : [];
  });

  return (
    <PageShell active="resources">
      <Section className="pt-[clamp(48px,7vw,96px)]">
        <Container>
          <Reveal>
            <Eyebrow>Success stories</Eyebrow>
          </Reveal>
          <Headline
            as="h1"
            size="hero"
            className="mt-4 max-w-[14ch]"
            tail="Flavor Studio."
            delay={0.05}
          >
            Better products, built on
          </Headline>
          <Lede className="mt-5 max-w-[52ch]">
            How Deli Star, Good Foods and Ripple Foods develop better products
            with Flavor Studio.
          </Lede>

          <RevealStagger
            stagger={0.1}
            className="mt-[clamp(40px,5vw,64px)] flex flex-col gap-6"
          >
            {stories.map((story) => (
              <div key={story.slug}>
                <StoryCard story={story} layout="wide" />
              </div>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {quoted.length > 0 ? (
        <Section className="pt-[var(--section-gap)]">
          <Container>
            <Headline size="lg" className="max-w-[16ch]" tail="words.">
              In their own
            </Headline>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {quoted.map((q) => (
                <StoryQuote
                  key={q.slug}
                  text={q.text}
                  name={q.name}
                  role={q.role}
                  company={q.company}
                  size="md"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="pb-[var(--section-gap)]" />

      <RainbowCta
        title="Your story could be next."
        cta={{ label: "Request a demo", href: routes.demo }}
      />
    </PageShell>
  );
}
