"use client";

import { AssetFrame } from "@/components/asset-frame";
import { Icon, SparkIcon } from "@/components/icon";
import { Block } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { productAssets } from "@/lib/assets";
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
 */

const CAPABILITIES = [
  {
    icon: "doc-search",
    color: "text-blue-400",
    title: "Cited answers",
    body: "Every response links to the recipe, regulation or test it came from. No hallucinated food science.",
  },
  {
    icon: "chart-histogram",
    color: "text-teal-500",
    title: "What-if costing",
    body: "Model ingredient swaps, supplier changes and batch scaling before you touch the formula.",
  },
  {
    icon: "weight",
    color: "text-lime-400",
    title: "Nutrition compare",
    body: "Side-by-side nutrient panels across versions — see exactly what a reformulation changes.",
  },
];

export function AgentBand() {
  return (
    <Block
      id="sous"
      className="relative bg-[#223047] px-[clamp(28px,3.6vw,64px)] pt-[clamp(62px,7.5vw,104px)] pb-[clamp(66px,8vw,110px)]"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <div className="max-w-[640px]">
          <Reveal className="inline-flex items-center gap-2 rounded-full bg-[rgba(123,97,255,.18)] px-[14px] py-[7px] text-[12px] font-bold tracking-[.08em] text-[#b9a8ff] uppercase">
            <SparkIcon size={13} gradientId="agentBandSpark" />
            AI Agent — built in
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="font-display mt-[14px] text-[clamp(30px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-white"
          >
            Ask your formula anything.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] text-[16px] leading-[1.65] text-slate-300"
          >
            The AI Agent reads your recipes, ingredient library and supplier
            data — and every answer it gives cites the recipe, regulation or
            test it came from.
          </Reveal>
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Reveal>
            <AssetFrame
              {...productAssets.aiAgent}
              tone="dark"
              caption="The AI Agent inside Flavor Studio, comparing two recipes on request — with the sources behind the answer one click away."
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </Reveal>

          <div className="grid gap-[14px]">
            {CAPABILITIES.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={0.05 + i * 0.07}
                className="flex items-start gap-[14px] rounded-[20px] border border-white/10 bg-white/[.04] px-5 py-[18px]"
              >
                <Icon
                  name={cap.icon}
                  className={`mt-[2px] flex-none text-[22px] ${cap.color}`}
                />
                <div>
                  <div className="text-[15px] font-bold text-white">
                    {cap.title}
                  </div>
                  <div className="mt-1 text-[14px] leading-[1.55] text-slate-300">
                    {cap.body}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal
              as="a"
              delay={0.26}
              href={routes.demo}
              className="inline-flex w-fit items-center gap-2 rounded-[14px] border border-blue-500/55 bg-blue-500/[.22] px-5 py-[13px] text-[14px] font-bold text-white transition-[background] duration-[180ms] hover:bg-blue-500/40"
            >
              See the AI Agent on your own data
              <Icon name="arrow-right" className="text-[15px]" />
            </Reveal>
          </div>
        </div>
      </div>
    </Block>
  );
}
