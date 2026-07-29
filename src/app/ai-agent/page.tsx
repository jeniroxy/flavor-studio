import type { Metadata } from "next";
import { AgentHeroChat } from "@/components/agent/hero-chat";
import { ChatDemo } from "@/components/chat-demo";
import { CtaBand } from "@/components/cta-band";
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

export default function AiAgentPage() {
  return (
    <PageShell active="agent">
      {/* hero */}
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,8vw,104px)]">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(28px,3.4vw,52px)] text-left">
          <div>
            <Reveal className="inline-flex items-center gap-[9px] rounded-full border border-white/[.22] px-[14px] py-[6px] text-[11.5px] font-extrabold tracking-[.14em] text-white uppercase">
              <SparkIcon size={14} gradientId="agentHeroSpark" />
              The AI Agent
            </Reveal>
            <Reveal
              as="h1"
              delay={0.06}
              className="font-display mt-5 max-w-[18ch] text-[clamp(38px,5vw,68px)] leading-[1.05] font-extrabold tracking-[-0.025em] text-white"
            >
              A food scientist that never sleeps.
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
              <BlueButton href="#try">Try it live</BlueButton>
              <a
                href={routes.contact}
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
                className="rounded-[18px] border border-gray-300 bg-white px-6 py-[26px] transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(43,59,83,.12)]"
              >
                <Icon name={cap.icon} className={`text-[26px] ${cap.color}`} />
                <div className="mt-[14px] text-[17px] font-extrabold text-slate-800">
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

      {/* live chat */}
      <Block
        id="try"
        className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(64px,9vw,120px)]"
        style={{
          background:
            "linear-gradient(160deg, var(--color-slate-800) 0%, #1b2942 60%, var(--color-slate-900) 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[8%] left-[-60px] h-[340px] w-[340px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(24,188,156,.12) 0%, rgba(24,188,156,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[860px]">
          <div className="mx-auto max-w-[620px] text-center">
            <Reveal className="inline-flex items-center gap-2 rounded-full bg-[rgba(24,188,156,.16)] px-[14px] py-[7px] text-[12px] font-bold tracking-[.08em] text-[#4fd8bd] uppercase">
              <span
                className="h-[7px] w-[7px] rounded-full bg-teal-500"
                style={{ animation: "fsPulse 2s ease infinite" }}
              />
              Live demo
            </Reveal>
            {/* White, not slate: the prototype left this heading at the slate
                token, which is invisible against the navy behind it. */}
            <Reveal
              as="h2"
              delay={0.06}
              className="font-display mt-[14px] text-[clamp(30px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-white"
            >
              Ask the AI Agent yourself.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-4 text-[16px] leading-[1.6] text-slate-300"
            >
              Ask a food-science question and watch it answer.
            </Reveal>
          </div>

          <Reveal delay={0.16} className="mt-[clamp(32px,4vw,48px)]">
            <ChatDemo skin="dark" starters={4} />
          </Reveal>

          <div className="mt-[14px] text-center text-[11.5px] text-slate-500">
            Responses in this demo are scripted for illustration. In the
            product, the Agent answers from your own recipes, library and
            supplier data — with real citations.
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
                <div className="mt-[6px] text-[13.5px] leading-[1.6] text-slate-500">
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
        <BlueButton href={routes.contact}>Request a demo</BlueButton>
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
