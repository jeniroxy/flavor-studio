import type { Metadata } from "next";
import { AgentHeroChat } from "@/components/agent/hero-chat";
import { CtaBand } from "@/components/cta-band";
import { AssetFrame } from "@/components/asset-frame";
import { Icon, SparkIcon } from "@/components/icon";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Agent",
  description:
    "The AI Agent reads your recipes, ingredient library and supplier data, then answers formulation, nutrition, allergen, labeling and costing questions — with a citation on every claim.",
};

const CAPABILITIES = [
  {
    icon: "search",
    color: "text-blue-500",
    title: "Ingredient sourcing",
    body: '"Find a non-GMO starch with no soy under $2.10/kg." It searches your library and supplier feeds and ranks the matches.',
  },
  {
    icon: "doc-detail",
    color: "text-teal-500",
    title: "Claim & label checks",
    body: "Validates nutrient content claims against 21 CFR 101 and flags what you qualify for before you print the label.",
  },
  {
    icon: "chart-histogram",
    color: "text-blue-500",
    title: "What-if costing",
    body: "Model ingredient swaps, supplier changes and batch scaling — see the cost and margin impact before touching the formula.",
  },
  {
    icon: "weight",
    color: "text-lime-500",
    title: "Nutrition compare",
    body: "Side-by-side nutrient panels across versions — see exactly what a reformulation changes, per serving and per 100 g.",
  },
  {
    icon: "caution",
    color: "text-amber-500",
    title: "Allergen watch",
    body: 'Ask what the big-9 exposure is on any formula and get the mandatory "Contains" statement, cross-contact risks included.',
  },
  {
    icon: "experiment",
    color: "text-violet-500",
    title: "Reformulation ideas",
    body: "Propose swaps to hit a sugar, sodium or cost target while holding the sensory score — as reviewable draft versions.",
  },
];

const STEPS = [
  {
    title: "Reads your workspace",
    body: "Recipes, versions, ingredient library, cost assumptions, taste tests and supplier specs — scoped to your org only.",
  },
  {
    title: "Answers with sources",
    body: "Every claim links to the recipe, regulation or test it came from. If it can't source an answer, it says so.",
  },
  {
    title: "Proposes, you approve",
    body: "Reformulation ideas land as draft versions. A developer reviews and applies — nothing in production changes without a human.",
  },
];

/* The kinds of question the Agent is built for. Questions only: the site does
   not publish answers to them, because a marketing page is not where food-law
   guidance should come from. */
const ASKS = [
  "Which of my starches are non-GMO with no soy cross-contact?",
  "What changes on the label if I cut sodium in this broth?",
  "Compare v3 and v4 on protein, sugar and cost per serving.",
  "Which allergens does this granola bar have to declare?",
];

export default function AiAgentPage() {
  return (
    <PageShell active="agent">
      {/* hero */}
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,8vw,104px)]">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(28px,3.4vw,52px)] text-left">
          <div>
            <Reveal className="inline-flex items-center gap-[9px] rounded-full border border-white/[.22] px-[14px] py-[6px] text-[12px] font-extrabold tracking-[.14em] text-white uppercase">
              <SparkIcon size={14} gradientId="agentHeroSpark" />
              The AI Agent
            </Reveal>
            <Reveal
              as="h1"
              delay={0.06}
              className="font-display mt-5 max-w-[18ch] text-[clamp(38px,5vw,68px)] leading-[1.05] font-extrabold tracking-[-0.025em] text-white"
            >
              It reads your workspace. It shows its sources.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-5 max-w-[52ch] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-[#aebdd0]"
            >
              Built into Flavor Studio, the AI Agent reads your recipes,
              ingredient library and supplier data — then answers formulation,
              nutrition, allergen, labeling and costing questions like a
              colleague, with a citation on every claim.
            </Reveal>
            <Reveal delay={0.2} className="mt-[30px] flex flex-wrap gap-[14px]">
              <BlueButton href="#try">See it in the product</BlueButton>
              <a
                href={routes.demo}
                className="rounded-[14px] border border-white/[.28] px-8 py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
              >
                Request a demo
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="relative min-w-0">
            <AgentHeroChat />
          </Reveal>
        </div>
      </Block>

      {/* capabilities */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[620px] text-center">
            <SectionLabel>What it does</SectionLabel>
            <SectionHeading className="text-[clamp(28px,3.4vw,44px)]">
              Real work, not chit-chat.
            </SectionHeading>
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-5">
            {CAPABILITIES.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={i * 0.06}
                className="rounded-[18px] border border-gray-300 bg-white px-6 py-[26px] transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-1 hover:shadow-card"
              >
                <Icon name={cap.icon} className={`text-[26px] ${cap.color}`} />
                <div className="mt-[14px] text-[16px] font-extrabold text-slate-800">
                  {cap.title}
                </div>
                <div className="mt-[7px] text-[14px] leading-[1.6] text-slate-500">
                  {cap.body}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Block>

      {/* What the Agent actually looks like.
          This block used to hold a scripted chat headed "Ask the AI Agent
          yourself". It was removed for two reasons: the canned answers asserted
          specific regulatory thresholds, CFR citations, supplier prices and
          panel scores that were all invented — food-law guidance a real company
          cannot publish — and a fixed script dressed as a live product is
          exactly the "AI-generated" impression the client objected to. The real
          screenshot and the real question set say more, and every word of both
          is true. */}
      <Block
        id="try"
        className="relative bg-[#223047] px-[clamp(28px,3.6vw,64px)] py-[clamp(64px,9vw,120px)]"
      >
        <div className="relative mx-auto max-w-[1080px]">
          <div className="mx-auto max-w-[640px] text-center">
            <SectionLabel tone="dark">In the product</SectionLabel>
            <SectionHeading
              tone="dark"
              className="text-[clamp(28px,3.4vw,44px)]"
            >
              It answers in the recipe you are already in.
            </SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-4 text-[16px] leading-[1.6] text-slate-200"
            >
              The Agent opens beside your work, reads the recipes you point it
              at with <code className="text-[15px] text-lime-300">@</code>, and
              answers with the panel, the numbers and the sources attached.
            </Reveal>
          </div>

          <Reveal delay={0.16} className="mt-[clamp(32px,4vw,48px)]">
            <AssetFrame
              {...productAssets.aiAgent}
              tone="dark"
              caption="Comparing two recipes side by side, in the Recipes module, with four cited sources behind the answer."
              sizes="(max-width: 1080px) 100vw, 1080px"
            />
          </Reveal>

          <div className="mx-auto mt-[clamp(36px,4.5vw,56px)] max-w-[860px]">
            <div className="text-center text-[12px] font-bold tracking-[.14em] text-slate-300 uppercase">
              What teams ask it
            </div>
            <ul className="mt-5 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3 p-0">
              {ASKS.map((ask) => (
                <li
                  key={ask}
                  className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-[15px] leading-[1.55] text-slate-200"
                >
                  {ask}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-[13px] leading-[1.6] text-slate-300">
              Answers draw only on your own recipes, ingredient library and
              supplier data — never on the open internet.
            </p>
          </div>
        </div>
      </Block>

      {/* how it works */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto max-w-[600px] text-center">
            <SectionLabel>How it works</SectionLabel>
            <SectionHeading className="text-[clamp(28px,3.4vw,44px)]">
              Grounded in your data, never guessing.
            </SectionHeading>
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.08}
                className="rounded-[18px] px-6 py-[26px]"
                style={{
                  background:
                    "linear-gradient(180deg, #f8fafd 0%, #eef4fb 100%)",
                }}
              >
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-blue-200 font-extrabold text-blue-700">
                  {i + 1}
                </span>
                <div className="mt-[14px] text-[16px] font-extrabold text-slate-800">
                  {step.title}
                </div>
                <div className="mt-[6px] text-[14px] leading-[1.6] text-slate-500">
                  {step.body}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="bg-blue-050 mt-[clamp(32px,4vw,44px)] flex flex-wrap items-center justify-center gap-[14px] rounded-[18px] px-6 py-[18px]">
            <Icon name="lock" className="flex-none text-[20px] text-blue-500" />
            <span className="text-center text-[14px] leading-[1.55] text-slate-700">
              Your formulas are trade secrets. Nothing is shared across
              customers, and nothing you formulate is used to train models.
            </span>
          </Reveal>
        </div>
      </Block>

      <CtaBand
        title="Put the AI Agent on your own formulas."
        body="A 30-minute demo, tailored to your category. Bring a recipe — we'll ask the Agent about it live."
        className="py-[clamp(64px,9vw,110px)]"
        secondMark={false}
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <a
          href={routes.pricing}
          className="rounded-full border border-white/30 px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
        >
          See pricing
        </a>
      </CtaBand>
    </PageShell>
  );
}
