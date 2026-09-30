import { StoryWindow } from "@/components/features/story-window";
import { Reveal } from "@/components/reveal";
import {
  Container,
  CtaRow,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/ui";
import { featureModule, type FeaturePage } from "@/lib/feature-pages";
import { routes } from "@/lib/routes";

/*
 * A feature page's hero, in the home page's order: the promise centred, then
 * the product on a stage below it. The stage is the brand ramp (navy, sky,
 * teal, lime, the same hues as the Why block), and on it sits the app window:
 * a walkthrough of the module where one exists (story-window.tsx), its real
 * screenshot where not. It replaced a half-width screenshot that bled off the
 * right edge and read as texture at that size.
 */

const STAGE =
  "radial-gradient(70% 60% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), linear-gradient(160deg, #17467f 0%, #2060a6 30%, #59a3eb 58%, #18bc9c 84%, #8cd135 100%)";

export function FeatureHero({ page }: { page: FeaturePage }) {
  const mod = featureModule(page);
  return (
    <Section className="pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
      <Container>
        <div className="mx-auto max-w-[880px] text-center">
          <Reveal>
            <Eyebrow className="mb-5">{page.eyebrow}</Eyebrow>
          </Reveal>
          <Headline as="h1" size="xl" tail={page.tail} delay={0.04}>
            {page.h1}
          </Headline>
          <Lede className="mx-auto mt-5 max-w-[60ch]">{page.lede}</Lede>
          <Reveal delay={0.1} className="mt-8">
            <CtaRow
              href={routes.demo}
              label="Request a demo"
              secondary={{ label: "See pricing", href: routes.pricing }}
              align="center"
            />
          </Reveal>
        </div>
      </Container>

      <Reveal
        delay={0.14}
        className="mx-auto mt-[clamp(36px,5vw,64px)] w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] rounded-[var(--radius-2xl)] px-[clamp(12px,4vw,64px)] py-[clamp(20px,4vw,56px)]"
        style={{ backgroundImage: STAGE }}
      >
        <div className="mx-auto max-w-[1040px]">
          <StoryWindow id={page.id} visual={page.hero} label={mod.label} />
        </div>
      </Reveal>
    </Section>
  );
}
