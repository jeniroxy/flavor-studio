import { FeatureVisual } from "@/components/features/feature-visual";
import { Reveal } from "@/components/reveal";
import {
  Container,
  CtaRow,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/ui";
import type { FeaturePage } from "@/lib/feature-pages";
import { routes } from "@/lib/routes";

/*
 * Template A hero: text left (~45%), the product visual right, bleeding off
 * the right edge of the viewport the way ClickUp's app shot does. The visual
 * is a FlowPlayer when the module has a flow, otherwise the module's asset.
 */
export function FeatureHero({ page }: { page: FeaturePage }) {
  return (
    <Section className="overflow-hidden pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)]">
      <Container wide>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow className="mb-5">{page.eyebrow}</Eyebrow>
            </Reveal>
            <Headline as="h1" size="hero" tail={page.tail} delay={0.04}>
              {page.h1}
            </Headline>
            <Lede className="mt-5 max-w-[48ch]">{page.lede}</Lede>
            <Reveal delay={0.1} className="mt-8">
              <CtaRow
                href={routes.demo}
                label="Request a demo"
                secondary={{ label: "See pricing", href: routes.pricing }}
              />
            </Reveal>
          </div>
          <Reveal delay={0.12} className="relative min-w-0">
            <div className="lg:w-[calc(100%+12vw)]">
              <FeatureVisual
                visual={page.hero}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="shadow-float"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
