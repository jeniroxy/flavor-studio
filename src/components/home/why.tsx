import { HexTile } from "@/components/hex";
import { Icon } from "@/components/icon";
import {
  Block,
  GhostButton,
  LimeButton,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { whyPoints } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * "Why Flavor Studio" — the five points from flavorstudio.com, laid out
 * Corsearch-style: pitch on the left, points stacked on the right, hairline
 * between each. Flat navy, hexagon icon tiles (the site's one icon chip),
 * and the rows simply reveal — the icons used to bounce in on a spring.
 */
export function Why() {
  return (
    <Block
      id="why"
      className="bg-slate-900 px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,80px)]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(32px,4vw,64px)]">
        <div>
          <SectionLabel tone="dark">Why Flavor Studio</SectionLabel>
          <SectionHeading tone="dark">
            Why teams choose Flavor Studio.
          </SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[46ch] text-[16px] leading-[1.7] text-slate-300"
          >
            One ingredient library sits behind every recipe, label and cost
            sheet — so a supplier change lands in all of them at once, instead
            of in a dozen spreadsheets that disagree by Friday.
          </Reveal>
          <Reveal delay={0.18} className="mt-[30px] flex flex-wrap gap-3">
            <LimeButton href={routes.demo}>Request a demo</LimeButton>
            <GhostButton href={routes.features}>Explore features</GhostButton>
          </Reveal>
        </div>

        <RevealStagger stagger={0.09}>
          {whyPoints.map((point, i) => (
            <div
              key={point.title}
              className={`flex items-start gap-[18px] py-[clamp(20px,2.4vw,28px)] ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              <HexTile
                size={44}
                style={{ background: "rgba(255,255,255,.08)" }}
              >
                <Icon name={point.icon} className="text-[22px] text-lime-400" />
              </HexTile>
              <div>
                <div className="text-[16px] leading-[1.3] font-extrabold text-white">
                  {point.title}
                </div>
                <p className="mt-[7px] text-[14px] leading-[1.65] text-pretty text-slate-300">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </Block>
  );
}
