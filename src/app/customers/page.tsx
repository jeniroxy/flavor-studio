import type { Metadata } from "next";
import { FeaturedCarousel } from "@/components/customers/featured-carousel";
import { PortraitQuotes } from "@/components/customers/portrait-quotes";
import { StoryCard, StoryGrid } from "@/components/customers/story-card";
import { WhoUses } from "@/components/customers/who-uses";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  Button,
  Container,
  Headline,
  Lede,
  LogoStrip,
  RainbowCta,
  Section,
  StatCells,
  type Stat,
} from "@/components/ui";
import { stories, testimonials } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "What food and beverage teams say about Flavor Studio — testimonials, success stories and the industry segments that use it.",
};

/*
 * The customers index, on ClickUp's template (research §5): H1 with two grey
 * tails, featured-testimonial carousel, a hairline fact strip, logo strip,
 * three tall portrait quotes, the story grid, and who uses it.
 *
 * The fact strip holds the four things we can state (blueprint rule 3) — not
 * customer metrics, which we do not have.
 */

const FACTS: Stat[] = [
  {
    label: "Ingredient database",
    value: "9,000+",
    desc: "USDA SR28 ingredients built in, with your own custom ingredients alongside them.",
  },
  {
    label: "Label formats",
    value: "US & Canada",
    desc: "FDA and Health Canada nutrition panels, generated from the formula's own analysed values.",
  },
  {
    label: "Building for food teams",
    value: "Since 2011",
    desc: "Product-development tools for food and beverage manufacturers, from the start.",
  },
  {
    label: "Trial",
    value: "14 days free",
    desc: "Full functionality, no credit card.",
  },
];

/* Three short quotes read best on the tall tiles. */
const PORTRAIT_NAMES = [
  "Kari Baker",
  "Greg Grisanti",
  "Michael Cheng, PhD., CHE",
];

export default function CustomersPage() {
  const portraitQuotes = PORTRAIT_NAMES.map((name) =>
    testimonials.find((t) => t.name === name),
  ).filter((t): t is (typeof testimonials)[number] => !!t);
  const [firstStory, secondStory, ...restStories] = stories;

  return (
    <PageShell active="resources">
      {/* Hero + carousel */}
      <Section className="overflow-hidden pt-[clamp(48px,7vw,96px)]">
        <Container>
          <Headline
            as="h1"
            size="hero"
            className="mx-auto max-w-[16ch] text-center"
          >
            Spreadsheets <span className="tail">replaced.</span>
            <br />
            Products <span className="tail">launched.</span>
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[48ch] text-center">
            What food and beverage teams say about Flavor Studio.
          </Lede>
        </Container>
        <FeaturedCarousel
          items={testimonials}
          className="mt-[clamp(32px,4vw,56px)]"
        />
      </Section>

      {/* Fact strip + logos */}
      <Section className="pt-[clamp(48px,6vw,80px)]">
        <Container>
          <StatCells stats={FACTS} />
          <LogoStrip count={8} className="mt-10" />
        </Container>
      </Section>

      {/* Loved by food developers */}
      <Section className="pt-[var(--section-gap)]">
        <Container>
          <Headline size="lg" className="max-w-[16ch]" tail="developers.">
            Loved by food
          </Headline>
          <PortraitQuotes items={portraitQuotes} className="mt-10" />
        </Container>
      </Section>

      {/* Story grid */}
      <Section className="pt-[var(--section-gap)]">
        <Container>
          <Headline
            size="lg"
            className="max-w-[18ch]"
            tail="with Flavor Studio."
          >
            See how great teams get more done
          </Headline>
          <StoryGrid
            stories={[firstStory, secondStory]}
            prefer="quote"
            className="mt-10"
          />
          {restStories.map((story) => (
            <Reveal key={story.slug} className="mt-6">
              <StoryCard story={story} layout="wide" prefer="quote" />
            </Reveal>
          ))}
          <Reveal className="mt-8 flex justify-center">
            <Button href={routes.stories} variant="secondary">
              Read more stories
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Who uses it */}
      <Section className="pt-[var(--section-gap)] pb-[var(--section-gap)]">
        <Container>
          <WhoUses />
        </Container>
      </Section>

      <RainbowCta
        title="See it on your own formula."
        cta={{ label: "Request a demo", href: routes.demo }}
      />
    </PageShell>
  );
}
