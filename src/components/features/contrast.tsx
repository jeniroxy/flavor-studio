import { Reveal } from "@/components/reveal";
import { CheckList, Container, Headline, Section } from "@/components/ui";
import type { FeaturePage } from "@/lib/feature-pages";
import type { Module } from "@/lib/modules";

/*
 * Section 3 of Template A. The big modules get ClickUp's "Without / With"
 * contrast — centred headline, two columns split by a hairline, red ✕ list
 * against green ✓ list. The rest get the four-word thesis ("Capture. Review.
 * Approve. Report.") under a headline.
 */
export function Contrast({
  page,
  module,
}: {
  page: FeaturePage;
  module: Module;
}) {
  const c = page.contrast;
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container>
        <Headline size="lg" className="text-center" tail={c.tail}>
          {c.title}
        </Headline>
        {c.kind === "without-with" ? (
          <div className="mt-[clamp(32px,4vw,56px)] grid gap-10 border-t border-hairline pt-10 lg:grid-cols-2 lg:gap-0">
            <Reveal className="lg:border-r lg:border-hairline lg:pr-12">
              <h3 className="font-display text-[20px] font-bold tracking-[-0.01em] text-ink">
                Without {module.label}
              </h3>
              <CheckList tone="red" items={c.without} className="mt-5" />
            </Reveal>
            <Reveal delay={0.08} className="lg:pl-12">
              <h3 className="font-display text-[20px] font-bold tracking-[-0.01em] text-ink">
                With Flavor Studio {module.label}
              </h3>
              <CheckList tone="green" items={c.with} className="mt-5" />
            </Reveal>
          </div>
        ) : (
          <Reveal
            delay={0.08}
            className="font-display mx-auto mt-6 max-w-[900px] text-center text-[clamp(24px,3.4vw,44px)] leading-[1.15] font-bold tracking-[-0.03em] text-ink-2"
          >
            {c.words}
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
