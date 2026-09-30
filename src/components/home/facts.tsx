import { Container, Section, StatCells } from "@/components/ui";

/*
 * The facts strip (clickup.com S8's four stat cards). ClickUp cites a
 * Forrester study here; we have no third-party ROI figures and the client's
 * review made the point that an invented number one screen above seven
 * real testimonials devalues the testimonials. So the four cards carry the
 * four facts the company already publishes, and nothing counts up.
 */
export const FACTS = [
  {
    label: "Ingredients",
    value: "9,000+",
    desc: "USDA SR28 ingredients built in, alongside your own custom ingredients and supplier spec sheets.",
  },
  {
    label: "Label formats",
    value: "US & Canada",
    desc: "FDA and Health Canada compliant panels, bilingual Nutrition Facts / Valeur nutritive, six layouts.",
  },
  {
    label: "Building since",
    value: "2011",
    desc: "Product-development software for food and beverage manufacturers, by Senspire.",
  },
  {
    label: "Free trial",
    value: "14 days",
    desc: "Full functionality, every module and the AI Agent. No credit card.",
  },
];

/* Facts and the Why block read as one beat, so the gap between them is one
   step, not two stacked --section-gap paddings (300px at desktop). */
export function Facts() {
  return (
    <Section className="pt-[clamp(48px,6vw,88px)]">
      <Container>
        {/* The design carries the four cells on their own — the heading, lede
            and CTA this section used to open with are not in it. */}
        <StatCells stats={FACTS} />
      </Container>
    </Section>
  );
}
