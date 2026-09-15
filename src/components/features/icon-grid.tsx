import { RevealStagger } from "@/components/reveal";
import { Container, Headline, IconTile, Section } from "@/components/ui";
import type { FeaturePage } from "@/lib/feature-pages";

/** "Plus, everything you need to <gridTail>" — the 3×3 icon-tile grid. */
export function IconGrid({ page }: { page: FeaturePage }) {
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container>
        <Headline size="lg" className="text-center" tail={page.gridTail}>
          Plus, everything you need to
        </Headline>
        <RevealStagger
          stagger={0.05}
          className="mt-[clamp(32px,4vw,56px)] grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {page.grid.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <IconTile name={item.icon} />
              <div>
                <div className="text-[15px] font-bold text-ink">
                  {item.title}
                </div>
                <div className="mt-1 text-[14px] leading-[1.5] text-ink-2">
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
