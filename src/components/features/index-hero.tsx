import { ModuleHive } from "@/components/features/module-hive";
import { Reveal } from "@/components/reveal";
import {
  Container,
  CtaRow,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The features-index hero: the promise centred, then a stage on the pale
 * brand wash holding the module hive (module-hive.tsx), all eighteen modules
 * as one honeycomb beside the real screen of the one in focus. It replaced a
 * faded ring of drifting module icons that never showed the product.
 */
/* The pale brand wash the home page's capability wall sits on. */
const WASH = [
  "radial-gradient(55% 60% at 30% 50%, rgba(140,209,53,0.16) 0%, rgba(140,209,53,0) 70%)",
  "radial-gradient(45% 50% at 85% 20%, rgba(89,163,235,0.16) 0%, rgba(89,163,235,0) 70%)",
  "linear-gradient(180deg, #f3f8fe 0%, #f5faf7 55%, #f4f9ee 100%)",
].join(", ");

export function IndexHero() {
  return (
    <Section className="pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)]">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <Eyebrow className="mb-5">Flavor Studio features</Eyebrow>
          </Reveal>
          <Headline as="h1" size="xl" tail="platform." delay={0.04}>
            All the tools, one
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[600px]">
            Eighteen modules for food and beverage product development —
            formulation, nutrition and labels, sensory, projects, CRM and the
            platform underneath — sharing one ingredient library and one live
            cost model.
          </Lede>
          {/* The secondary used to read "Get a demo" and point at /contact,
              beside a primary reading "Request a demo" — two buttons, nearly
              the same words, different destinations. The client asked for
              exactly this distinction to be clear: a demo request goes to the
              demo form, contacting us goes to Contact. */}
          <Reveal delay={0.1} className="mt-8">
            <CtaRow
              href={routes.demo}
              label="Request a demo"
              secondary={{ label: "Contact us", href: routes.contact }}
              align="center"
            />
          </Reveal>
        </div>
      </Container>

      <Reveal
        delay={0.14}
        className="mx-auto mt-[clamp(40px,5vw,64px)] w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] rounded-[var(--radius-3xl)] px-[clamp(16px,4vw,64px)] py-[clamp(32px,5vw,72px)]"
        style={{ backgroundImage: WASH }}
      >
        <ModuleHive />
      </Reveal>
    </Section>
  );
}
