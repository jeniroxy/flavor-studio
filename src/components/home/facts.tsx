import { Reveal } from "@/components/reveal";
import { Button, Container, Headline, Lede, Section, StatCells } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The facts strip (clickup.com S8's four stat cards). ClickUp cites a
 * Forrester study here; we have no third-party ROI figures and the client's
 * review made the point that an invented number one screen above seven
 * real testimonials devalues the testimonials. So the four cards carry the
 * four facts the company already publishes, and nothing counts up.
 */
export const FACTS = [
  { label: "Ingredients", value: "9,000+", desc: "USDA SR28 ingredients built in, alongside your own custom ingredients and supplier spec sheets." },
  { label: "Label formats", value: "US & Canada", desc: "FDA and Health Canada compliant panels, bilingual Nutrition Facts / Valeur nutritive, six layouts." },
  { label: "Building since", value: "2011", desc: "Product-development software for food and beverage manufacturers, by Senspire." },
  { label: "Free trial", value: "14 days", desc: "Full functionality, every module and the AI Agent. No credit card." },
];

export function Facts() {
  return (
    <Section className="py-[var(--section-gap)]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <Headline size="lg" tail="all eighteen.">
              One library. One cost model. Use one module or
            </Headline>
            <Lede className="mt-4">
              Unlike an ERP, nothing here demands a full rollout. Teams usually start with recipes
              and labels, then add taste tests, projects or CRM when they are ready.
            </Lede>
          </div>
          <Reveal delay={0.1}>
            <Button href={routes.demo} arrow>
              Request a demo
            </Button>
          </Reveal>
        </div>
        <StatCells stats={FACTS} className="mt-[clamp(28px,3.5vw,44px)]" />
      </Container>
    </Section>
  );
}
