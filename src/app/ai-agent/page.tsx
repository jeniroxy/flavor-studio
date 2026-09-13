import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { FlowPlayer } from "@/components/flow-player";
import { HexTile } from "@/components/hex";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  CARD_DARK,
  CARD_LIGHT,
  Caption,
  Eyebrow,
  GhostButton,
  HeroBackdrop,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { ProductShot } from "@/components/product-shot";
import { Reveal } from "@/components/reveal";
import { productAssets } from "@/lib/assets";
import { flows } from "@/lib/flows";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Agent",
  description:
    "The AI Agent reads your recipes, ingredient library and supplier data, then answers formulation, nutrition, allergen, labeling and costing questions — with a citation on every claim.",
};

const CAPABILITIES = [
  {
    icon: "search",
    title: "Ingredient sourcing",
    body: '"Find a non-GMO starch with no soy under $2.10/kg." It searches your library and supplier feeds and ranks the matches.',
  },
  {
    icon: "doc-detail",
    title: "Claim & label checks",
    body: "Validates nutrient content claims against 21 CFR 101 and flags what you qualify for before you print the label.",
  },
  {
    icon: "chart-histogram",
    title: "What-if costing",
    body: "Model ingredient swaps, supplier changes and batch scaling — see the cost and margin impact before touching the formula.",
  },
  {
    icon: "weight",
    title: "Nutrition compare",
    body: "Side-by-side nutrient panels across versions — see exactly what a reformulation changes, per serving and per 100 g.",
  },
  {
    icon: "caution",
    title: "Allergen watch",
    body: 'Ask what the big-9 exposure is on any formula and get the mandatory "Contains" statement, cross-contact risks included.',
  },
  {
    icon: "experiment",
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
  const shot = productAssets.aiAgent;

  return (
    <PageShell active="agent">
      {/* hero. The visual used to be a chat vignette we scripted ourselves —
          a question typing itself out, thinking dots, canned answer lines. It
          was the one invented product surface left on the site, and it looped
          forever. The real Agent, exported from the application, replaces it. */}
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(28px,3.4vw,52px)] text-left">
          <div>
            <SectionLabel tone="dark">AI Agent</SectionLabel>
            <Reveal
              as="h1"
              delay={0.06}
              className="font-display mt-[14px] max-w-[18ch] text-[clamp(38px,5vw,64px)] leading-[1.05] font-extrabold tracking-[-0.025em] text-white"
            >
              It reads your workspace. It shows its sources.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-5 max-w-[52ch] text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[#aebdd0]"
            >
              Built into Flavor Studio, the AI Agent reads your recipes,
              ingredient library and supplier data — then answers formulation,
              nutrition, allergen, labeling and costing questions like a
              colleague, with a citation on every claim.
            </Reveal>
            <Reveal delay={0.2} className="mt-[30px] flex flex-wrap gap-[14px]">
              <BlueButton href="#try">See it in the product</BlueButton>
              <GhostButton href={routes.demo}>Request a demo</GhostButton>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="mx-auto w-full max-w-[440px] min-w-0">
            <figure className="m-0">
              <ProductShot
                src={shot.src as string}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                focus={shot.focus}
                tone="dark"
                priority
                sizes="(max-width: 960px) 100vw, 440px"
                className="shadow-window"
              />
              <Caption as="figcaption" tone="dark">
                The Agent beside a recipe, comparing two versions per serving
                and naming its sources.
              </Caption>
            </figure>
          </Reveal>
        </div>
      </Block>

      {/* capabilities */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[620px] text-center">
            <SectionLabel>What it does</SectionLabel>
            <SectionHeading>Real work, not chit-chat.</SectionHeading>
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4">
            {CAPABILITIES.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={i * 0.05}
                className={`px-6 py-[26px] ${CARD_LIGHT}`}
              >
                <Icon name={cap.icon} className="text-[24px] text-blue-600" />
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
          is true.

          The flow's frames are portrait (769×960); played at the full column
          width they stood 1,350px tall. Copy and questions now sit beside the
          player instead of above and below it. */}
      <Block
        id="try"
        className="relative bg-slate-900 px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
      >
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(36px,5vw,72px)]">
          <div>
            <SectionLabel tone="dark">In the product</SectionLabel>
            <SectionHeading tone="dark">
              It answers in the recipe you are already in.
            </SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-4 max-w-[50ch] text-[16px] leading-[1.6] text-slate-300"
            >
              The Agent opens beside your work, reads the recipes you point it
              at with <code className="text-[15px] text-white">@</code>, and
              answers with the panel, the numbers and the sources attached.
            </Reveal>

            <Eyebrow tone="dark" className="mt-8">
              What teams ask it
            </Eyebrow>
            <ul className="mt-4 grid list-none gap-3 p-0">
              {ASKS.map((ask) => (
                <li
                  key={ask}
                  className={`px-5 py-[14px] text-[15px] leading-[1.5] text-slate-200 ${CARD_DARK}`}
                >
                  {ask}
                </li>
              ))}
            </ul>
            <Caption tone="dark" className="mt-4">
              Answers draw only on your own recipes, ingredient library and
              supplier data — never on the open internet.
            </Caption>
          </div>

          <Reveal delay={0.16} className="mx-auto w-full max-w-[520px]">
            <FlowPlayer
              flow={flows.aiAgent}
              tone="dark"
              sizes="(max-width: 960px) 100vw, 520px"
              dwell={3200}
            />
          </Reveal>
        </div>
      </Block>

      {/* how it works */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto max-w-[600px] text-center">
            <SectionLabel>How it works</SectionLabel>
            <SectionHeading>
              Grounded in your data, never guessing.
            </SectionHeading>
          </div>
          <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.08}
                className={`px-6 py-[26px] ${CARD_LIGHT}`}
              >
                <HexTile
                  size={36}
                  className="font-display text-[15px] font-extrabold text-[#5c8f1c]"
                  style={{ background: "var(--color-lime-100)" }}
                >
                  {i + 1}
                </HexTile>
                <div className="mt-[14px] text-[16px] font-extrabold text-slate-800">
                  {step.title}
                </div>
                <div className="mt-[6px] text-[14px] leading-[1.6] text-slate-500">
                  {step.body}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal
            className={`mt-4 flex flex-wrap items-center justify-center gap-[14px] px-6 py-[18px] ${CARD_LIGHT}`}
          >
            <Icon name="lock" className="flex-none text-[20px] text-blue-600" />
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
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <GhostButton href={routes.pricing}>See pricing</GhostButton>
      </CtaBand>
    </PageShell>
  );
}
