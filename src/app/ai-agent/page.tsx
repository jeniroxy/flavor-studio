import type { Metadata } from "next";
import Image from "next/image";
import { HowItWorks } from "@/components/agent/how-it-works";
import { Orbit } from "@/components/agent/orbit";
import { PersonaTabs } from "@/components/agent/persona-tabs";
import { SkillsBento } from "@/components/agent/skills-bento";
import { FaqAccordion } from "@/components/faq-accordion";
import { Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Button,
  Container,
  Eyebrow,
  Headline,
  Section,
  StatCells,
  Tick,
} from "@/components/ui";
import { testimonials } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * The AI Agent page, on clickup.com's Brain² pattern (docs/research/
 * clickup-pages-analysis.md §3a): dark, cinematic, one long act — but every
 * claim here is one the product can back. No benchmarks, no model names we
 * do not ship, no counters. The Agent answers with citations and proposes
 * drafts; a developer approves.
 */

export const metadata: Metadata = {
  title: "AI Agent",
  description:
    "The AI Agent reads your recipes, ingredient library and supplier data, then answers formulation, nutrition, allergen, labeling and costing questions — with a citation on every claim, and drafts a developer approves.",
};

const FACTS = [
  {
    label: "Citations",
    value: "Every answer",
    desc: "Names the recipe, regulation or test it came from. If it cannot source an answer, it says so.",
  },
  {
    label: "Changes",
    value: "Drafts only",
    desc: "Reformulation ideas land as draft versions. A developer reviews and applies — nothing changes silently.",
  },
  {
    label: "Reads",
    value: "18 modules",
    desc: "Recipes, ingredients, costs, labels, claims, taste tests, projects, timesheets and CRM — scoped to your workspace.",
  },
  {
    label: "Included",
    value: "Every plan",
    desc: "Part of the trial, Professional, Premium and Enterprise. No add-on, no credits.",
  },
];

const SKILL_CHIPS = [
  "Reformulate",
  "Cost out",
  "Check claims",
  "Draft spec sheet",
  "Compare versions",
  "Scale batch",
  "Find substitute",
  "Flag allergens",
  "Summarise taste test",
  "Explain a label line",
  "Convert units",
  "Estimate margin",
  "Find the cheapest version",
  "List open stage gates",
  "Which recipes use this ingredient",
  "Hours logged this week",
  "Compare per 100 g",
  "Canadian statement",
  "Sodium per RACC",
];

const TRUST = [
  {
    icon: "shield",
    title: "No third-party training",
    body: "Your recipes, ingredients and test results are never used to train third-party models.",
  },
  {
    icon: "lock",
    title: "No third-party retention",
    body: "Prompts and answers are not retained by model providers beyond the request.",
  },
  {
    icon: "peoples",
    title: "Same permissions as you",
    body: "The Agent sees only what the logged-in user can see — per-user and per-group rights apply.",
  },
];

const FAQ = [
  {
    q: "Is the AI Agent included?",
    a: "Yes. It is part of every plan, including the 14-day trial. There is no add-on and no credit system.",
  },
  {
    q: "What does it read?",
    a: "Your own workspace: recipes and versions, the ingredient library and supplier data, cost assumptions, nutrition analysis and labels, taste-test results, projects, timesheets and CRM — scoped to what your login can see.",
  },
  {
    q: "Can it change a recipe?",
    a: "No. It proposes swaps as a draft version that a developer reviews, applies or discards. Nothing in production changes without a person.",
  },
  {
    q: "Can my co-packer see my conversations?",
    a: "No. Conversations belong to the user and the organisation. Sharing follows the same per-user and per-group rights as the rest of Flavor Studio.",
  },
  {
    q: "Does it work offline?",
    a: "No. Like the rest of Flavor Studio it runs in the browser and needs a connection.",
  },
  {
    q: "What if it cannot answer?",
    a: "It says so, rather than guessing. Every answer carries its sources so you can check them in one click.",
  },
];

export default function AgentPage() {
  const quote = testimonials.find((t) => t.name === "Andrew Hunter");

  return (
    <PageShell active="agent">
      <div className="on-dark bg-night text-[#b4b4b4]">
        {/* hero */}
        <Section className="relative overflow-hidden pt-[clamp(56px,8vw,120px)] pb-[clamp(40px,5vw,72px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-40 blur-[90px]"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, #2060a6 0%, rgba(10,12,16,0) 70%)",
            }}
          />
          <Container className="relative">
            <div className="mx-auto max-w-[860px] text-center">
              <Reveal className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-[13px] font-semibold text-white">
                Built into Flavor Studio
                <span className="text-lime-400">✦</span>
                AI Agent
              </Reveal>
              <Headline
                as="h1"
                size="xl"
                gradient
                className="mt-6"
                delay={0.05}
              >
                The AI that actually knows your formulas.
              </Headline>
              <RevealStagger
                stagger={0.06}
                delay={0.1}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-[#dcdcdc]"
              >
                {[
                  "Answers cite the recipe, regulation or test",
                  "Proposes drafts, never silent edits",
                  "Your data never trains third-party models",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Tick tone="lime" /> {t}
                  </span>
                ))}
              </RevealStagger>
              <Reveal
                delay={0.16}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <Button href={routes.demo} variant="inverse" size="lg" arrow>
                  Request a demo
                </Button>
                <Button href="#how" variant="ghost-dark" size="lg">
                  See how it works
                </Button>
              </Reveal>
              <Reveal
                delay={0.2}
                className="eyebrow eyebrow-dark mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
              >
                <span className="text-[#7b7b7b]">Works in</span>
                {["Recipes", "Labels", "Costing", "Taste Tests", "CRM"].map(
                  (m) => (
                    <span key={m}>{m}</span>
                  ),
                )}
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-[clamp(40px,5vw,72px)]">
              <Orbit />
            </Reveal>
          </Container>
        </Section>

        {/* facts */}
        <Section className="py-[clamp(40px,5vw,72px)]">
          <Container>
            <StatCells stats={FACTS} tone="dark" />
          </Container>
        </Section>

        {/* personas */}
        <Section className="border-t border-hairline-dark py-[var(--section-gap)]">
          <Container>
            <Reveal>
              <Eyebrow tone="dark">One Agent. Any job.</Eyebrow>
            </Reveal>
            <Headline
              size="lg"
              className="mt-4 max-w-[720px]"
              tail="watch it work."
            >
              The Agent already knows what to do —
            </Headline>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#b4b4b4]">
              Pick a seat in the building. Each transcript is the kind of
              question that role asks, answered from the workspace and cited.
            </p>
            <div className="mt-[clamp(32px,4vw,56px)]">
              <PersonaTabs />
            </div>
          </Container>
        </Section>

        {/* how it works — sticky visual */}
        <Section
          id="how"
          className="border-t border-hairline-dark py-[clamp(40px,5vw,72px)]"
        >
          <Container>
            <Reveal>
              <Eyebrow tone="dark">How it works</Eyebrow>
            </Reveal>
            <Headline
              size="lg"
              className="mt-4 max-w-[720px]"
              tail="one panel."
            >
              Ask, compare, draft —
            </Headline>
            <HowItWorks />
          </Container>
        </Section>

        {/* skills */}
        <Section
          id="skills"
          className="border-t border-hairline-dark py-[var(--section-gap)]"
        >
          <Container>
            <Reveal>
              <Eyebrow tone="dark">What it can do</Eyebrow>
            </Reveal>
            <Headline
              size="lg"
              className="mt-4 max-w-[720px]"
              tail="comes close."
            >
              Nothing generic
            </Headline>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#b4b4b4]">
              Six things food developers ask every week, answered from your own
              data.
            </p>
            <div className="mt-[clamp(32px,4vw,56px)]">
              <SkillsBento />
            </div>
          </Container>
          <div className="mask-x mt-10 flex flex-col gap-2">
            {[0, 1, 2].map((row) => {
              const items = SKILL_CHIPS.slice(row * 6).concat(
                SKILL_CHIPS.slice(0, row * 6),
              );
              const reel = [...items, ...items];
              return (
                <div key={row} className="overflow-hidden">
                  <div
                    className={`marquee gap-2 ${row % 2 ? "marquee-reverse" : ""}`}
                    style={
                      {
                        "--marquee-duration": `${60 + row * 12}s`,
                      } as React.CSSProperties
                    }
                  >
                    {reel.map((c, i) => (
                      <span
                        key={i}
                        className={`chip chip-dark ${i % 5 === 0 ? "ring-rainbow" : ""}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* trust */}
        <Section
          id="trust"
          className="border-t border-hairline-dark py-[var(--section-gap)]"
        >
          <Container>
            <Reveal>
              <Eyebrow tone="dark">Secure</Eyebrow>
            </Reveal>
            <Headline size="lg" className="mt-4 max-w-[760px]">
              Your recipes{" "}
              <span className="underline decoration-lime-400 decoration-dotted underline-offset-8">
                never
              </span>{" "}
              train third-party models.
            </Headline>
            <RevealStagger
              stagger={0.07}
              className="hairline-grid-dark mt-[clamp(32px,4vw,56px)] md:grid-cols-3"
            >
              {TRUST.map((t) => (
                <div key={t.title} className="flex flex-col gap-4 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/[.06] text-[22px] text-lime-400">
                    <Icon name={t.icon} />
                  </span>
                  <div className="font-display text-[20px] font-bold text-white">
                    {t.title}
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#b4b4b4]">
                    {t.body}
                  </p>
                </div>
              ))}
            </RevealStagger>
          </Container>
        </Section>

        {/* quote */}
        {quote ? (
          <Section
            className="border-t border-hairline-dark py-[var(--section-gap)]"
            style={{
              backgroundImage: "radial-gradient(#2a2a2a 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <Container>
              <Reveal className="mx-auto max-w-[820px] text-center">
                <Image
                  src="/testimonials/andrew_hunter.png"
                  alt={quote.name}
                  width={72}
                  height={72}
                  className="mx-auto h-[72px] w-[72px] rounded-full object-cover"
                />
                <blockquote className="font-display mt-6 text-[clamp(24px,3vw,40px)] leading-[1.2] font-bold tracking-[-0.02em] text-white">
                  {quote.quote}
                </blockquote>
                <div className="mt-5 text-[14px] font-semibold text-white">
                  {quote.name}
                </div>
                <div className="text-[13px] text-[#7b7b7b]">{quote.role}</div>
              </Reveal>
            </Container>
          </Section>
        ) : null}

        {/* faq */}
        <Section className="border-t border-hairline-dark py-[var(--section-gap)]">
          <Container>
            <div className="mx-auto max-w-[720px]">
              <Headline
                size="lg"
                className="text-center"
                tail="the Agent has answers."
              >
                You have questions,
              </Headline>
              <Reveal delay={0.08} className="mt-10">
                <FaqAccordion
                  items={FAQ}
                  tone="dark"
                  groupKey="agent"
                  defaultOpen={0}
                />
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* closing band */}
        <div
          style={{
            background:
              "linear-gradient(180deg, #0a0c10 0%, rgba(10,12,16,0) 30%), linear-gradient(100deg, #2060a6, #59a3eb 45%, #18bc9c 80%, #8cd135)",
          }}
        >
          <Container className="py-[clamp(64px,9vw,128px)] text-center">
            <Reveal
              as="h2"
              className="font-display mx-auto max-w-[18ch] text-[clamp(30px,4.4vw,60px)] leading-[1.06] font-bold tracking-[-0.03em] text-white"
            >
              Meet the Agent on your own formula.
            </Reveal>
            <Reveal
              delay={0.08}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Button href={routes.demo} variant="inverse" size="lg" arrow>
                Request a demo
              </Button>
              <Button href={routes.features} variant="ghost-dark" size="lg">
                Explore the platform
              </Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </PageShell>
  );
}
