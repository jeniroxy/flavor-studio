import { SolutionVisualFrame } from "@/components/solutions/solution-visual";
import { Eyebrow, Headline } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import type { Pillar } from "@/lib/solutions";

/*
 * The three pillar rows of a solution page — ClickUp's CONVERGED / AUTOMATED /
 * TRANSPARENT block on /teams/marketing: a hairline grid of rows, copy on one
 * side and a real screenshot or screen sequence on the other, alternating.
 */
export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="hairline-grid grid-cols-1">
      {pillars.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <div
            key={p.eyebrow}
            className="grid items-center gap-8 p-[clamp(20px,3vw,40px)] lg:grid-cols-2 lg:gap-12"
          >
            <Reveal className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
              <SolutionVisualFrame
                visual={p.visual}
                sizes="(max-width: 1024px) 100vw, 520px"
                dwell={3200}
              />
            </Reveal>
            <div
              className={`max-w-[440px] ${flip ? "lg:order-1 lg:justify-self-end" : ""}`}
            >
              <Reveal>
                <Eyebrow className="mb-3">{p.eyebrow}</Eyebrow>
              </Reveal>
              <Headline as="h3" size="md" delay={0.04}>
                {p.title}
              </Headline>
              <Reveal
                as="p"
                delay={0.08}
                className="mt-4 text-[15px] leading-[1.65] text-ink-2"
              >
                {p.body}
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}
