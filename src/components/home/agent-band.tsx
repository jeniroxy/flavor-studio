import { FlowPlayer } from "@/components/flow-player";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { flows } from "@/lib/flows";
import { routes } from "@/lib/routes";

/*
 * The AI Agent band.
 *
 * The scripted "Ask the AI Agent yourself" demo that used to close this block
 * is gone. It was a canned conversation dressed as a product surface, and it
 * pulled the page's attention back to AI at exactly the point the client asked
 * for less of it — "the current design gives AI too much emphasis compared with
 * the core functionality". What is left is the real thing: what the Agent does,
 * a screenshot of it doing it, and a link to see it on your own data.
 *
 * It sits on a white block like the other product sections, with the same
 * section label as they have — not its own violet badge on a second navy band.
 */

const CAPABILITIES = [
  {
    icon: "doc-search",
    title: "Cited answers",
    body: "Every response links to the recipe, regulation or test it came from. No hallucinated food science.",
  },
  {
    icon: "chart-histogram",
    title: "What-if costing",
    body: "Model ingredient swaps, supplier changes and batch scaling before you touch the formula.",
  },
  {
    icon: "weight",
    title: "Nutrition compare",
    body: "Side-by-side nutrient panels across versions — see exactly what a reformulation changes.",
  },
];

export function AgentBand() {
  return (
    <Block
      id="sous"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <div>
          <SectionLabel>AI Agent</SectionLabel>
          <SectionHeading>Ask your formula anything.</SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[50ch] text-[16px] leading-[1.65] text-slate-500"
          >
            The AI Agent reads your recipes, ingredient library and supplier
            data — and every answer it gives cites the recipe, regulation or
            test it came from.
          </Reveal>

          <RevealStagger stagger={0.08} delay={0.16} className="mt-6">
            {CAPABILITIES.map((cap, i) => (
              <div
                key={cap.title}
                className={`flex items-start gap-[14px] py-4 ${
                  i > 0 ? "border-t border-gray-300" : ""
                }`}
              >
                <Icon
                  name={cap.icon}
                  className="mt-[1px] flex-none text-[22px] text-blue-600"
                />
                <div>
                  <div className="text-[15px] font-bold text-slate-800">
                    {cap.title}
                  </div>
                  <div className="mt-1 text-[14px] leading-[1.55] text-slate-500">
                    {cap.body}
                  </div>
                </div>
              </div>
            ))}
          </RevealStagger>

          <Reveal delay={0.24} className="mt-[18px]">
            <TextLink href={routes.agent}>
              See what the AI Agent can do
            </TextLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[520px]">
          <FlowPlayer
            flow={flows.aiAgent}
            sizes="(max-width: 960px) 100vw, 520px"
          />
        </Reveal>
      </div>
    </Block>
  );
}
