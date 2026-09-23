import { AgentAct } from "@/components/home/agent-act";
import { Facts } from "@/components/home/facts";
import { FeatureWall } from "@/components/home/feature-wall";
import { Hero } from "@/components/home/hero";
import { SuccessStories } from "@/components/home/success-stories";
import { Why } from "@/components/home/why";
import { PageShell } from "@/components/page-shell";
import { RainbowCta } from "@/components/ui";
import { productAssets } from "@/lib/assets";

/*
 * The landing page, following the design at node 40000315:32514:
 *
 *   hero (with the module tabs and logo bar) · facts · why · feature wall ·
 *   the AI act · success stories · testimonials · closing CTA
 *
 * Five sections the page used to carry are not in that design and have been
 * dropped from the home page: Problem, TeamsTabs, Labels, the security strip
 * and the FAQ accordion. None of them is deleted — Labels and Teams content
 * lives on the feature pages, security on /enterprise, and the FAQ keeps its
 * own /faq page — but the home page no longer repeats them.
 *
 * The design also draws "08b Why" twice. Its two copies overlap each other and
 * the feature wall (y 1471 and y 2509, with the wall starting at 2499), so it
 * is a stray duplicate in the file, not a section that renders twice.
 */
export default function HomePage() {
  const shot = productAssets.recipeGrid;
  return (
    <PageShell>
      <Hero />
      <Facts />
      <Why />
      <FeatureWall />
      <AgentAct />
      <SuccessStories />

      <RainbowCta
        id="demo"
        title="All your formulas, all your people, one platform."
        image={{
          src: shot.src as string,
          alt: shot.alt,
          width: shot.width,
          height: shot.height,
        }}
      />
    </PageShell>
  );
}
