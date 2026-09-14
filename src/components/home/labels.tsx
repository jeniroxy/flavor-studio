import Image from "next/image";
import { FlowPlayer } from "@/components/flow-player";
import { Reveal } from "@/components/reveal";
import { CheckList, Container, Eyebrow, Headline, Lede, Section, TextLink } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { flows } from "@/lib/flows";
import { routes } from "@/lib/routes";

/*
 * Labeling & compliance — the client's most-requested content, so it keeps
 * its own section on the landing page. Both visuals are the real thing: the
 * FDA panel is the label engine's own export, and the flow is the actual
 * Publish Recipe dialog stepping through content, layout, region and file
 * type. No HTML approximation of a label anywhere.
 */

const FORMATS = [
  "US FDA and Health Canada compliant panels",
  "Canadian bilingual Nutrition Facts / Valeur nutritive",
  "Vertical, tabular, side-by-side, linear, dual column and aggregate",
  "Ingredient statements and allergen declarations alongside",
  "PNG for internal drafts, vector PDF for packaging",
];

export function Labels() {
  const label = productAssets.nutritionLabelUs;
  return (
    <Section id="labels" className="border-y border-hairline bg-panel py-[var(--section-gap)]">
      <Container>
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[.85fr_1.3fr]">
          <div>
            <Reveal>
              <Eyebrow className="mb-4">Nutrition & compliance</Eyebrow>
            </Reveal>
            <Headline size="lg" tail="from the formula.">
              A compliant label, generated
            </Headline>
            <Lede className="mt-4">
              Nutritional analysis runs off the ingredient data and the yield, and the panel
              follows automatically — regenerated every time the recipe or serving size changes.
            </Lede>
            <CheckList items={FORMATS} className="mt-6" />
            <Reveal delay={0.1} className="mt-6">
              <TextLink href={routes.feature("labeling")}>Explore nutrition labels</TextLink>
            </Reveal>
          </div>

          <div className="grid items-start gap-5 sm:grid-cols-[minmax(0,.62fr)_minmax(0,1.38fr)]">
            <Reveal delay={0.1} className="frame mx-auto w-full max-w-[260px] bg-white p-3">
              <Image
                src={label.src as string}
                alt={label.alt}
                width={label.width}
                height={label.height}
                sizes="260px"
              />
              <div className="eyebrow eyebrow-muted mt-3 text-[10px]">Exported by the label engine</div>
            </Reveal>
            <Reveal delay={0.16}>
              <FlowPlayer flow={flows.publishAggregate} sizes="(max-width: 640px) 100vw, 560px" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
