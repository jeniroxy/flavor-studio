import type { Metadata } from "next";
import Link from "next/link";
import { DISCLAIMER, WHATIF_ANSWER } from "@/components/agent/agent-data";
import { AgentPlayer } from "@/components/agent/agent-player";
import {
  CompareButterfly,
  CostWaterfall,
  IngredientHive,
  QueryToFilters,
} from "@/components/agent/answer-visuals";
import { ComposerToy } from "@/components/agent/composer-toy";
import { FaqAccordion } from "@/components/faq-accordion";
import { Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Button,
  Container,
  Eyebrow,
  Headline,
  RainbowCta,
  Section,
  SectionHead,
} from "@/components/ui";
import { routes, signupUrl, trialLine } from "@/lib/routes";

/*
 * The AI Agent page. Everything on it is what the Agent does in the product
 * design (Figma "Flavor Studio Application", page AI Agent, section
 * "Floating Concept (USED)" 8035:30189); every figure is the design's own,
 * gathered in agent-data.ts. The earlier page's regulation citations, draft
 * versions, persona transcripts and model-training promises are not in the
 * product and are gone.
 *
 * The page is built as a walk through one product feature:
 *   1. the replay: the panel docked beside the real Recipe page, playing
 *      the three starters it ships with (agent-player);
 *   2. the same three answers drawn as what they mean: the sentence becoming
 *      filters and a honeycomb of 13 ingredients, a butterfly chart of two
 *      recipes, a cost waterfall with its four sources (answer-visuals);
 *   3. the composer to play with (composer-toy);
 *   4. how an answer shows its work, in the panel's own words.
 *
 * It is set in the home page's register: white page, mono eyebrows, the green
 * tail, night panels with the brand aurora, the logo's hexagon. Sections
 * change shape on purpose (a stage, a split, a centred chart, a night block,
 * a grey block, specimens) so the page reads as a sequence, not a template.
 *
 * Nothing here reaches the client's AI; the client ruled that out, and the
 * page says so where it matters.
 */

export const metadata: Metadata = {
  title: "AI Agent",
  description:
    "The AI Agent is a panel inside Flavor Studio. Ask about your recipes, ingredients and allergens in plain language; it answers from your organisation's data and shows the steps it took and the sources it read. Included in every plan.",
};

const FAQ = [
  {
    q: "Is the AI Agent included in my plan?",
    a: "Yes. It is part of every plan, including the 14-day trial. There is no add-on to buy.",
  },
  {
    q: "What does it answer from?",
    a: "Your organisation's data in Flavor Studio: recipes and their versions, the ingredient library with its categories and allergens, nutrition, supplier prices and your costing model. Each answer lists the sources it read.",
  },
  {
    q: "How do I check an answer?",
    a: "Open the step list to see what it did, and the Sources button to see which recipes, price lists and notes it used. The panel's own footnote says it best: verify before relying on results.",
  },
  {
    q: "Can I try it on this website?",
    a: "No. The Agent only runs inside a Flavor Studio workspace, on that organisation's data, so the answers on this page are replays of the product design. Start a trial or request a demo to ask it about your own recipes.",
  },
  {
    q: "Can I give it a file or a link?",
    a: "Yes. The + button in the composer adds a file or document, a link, the page you are on, or an earlier answer from the Agent as context. Type @ to mention a recipe by name.",
  },
  {
    q: "Where do I open it?",
    a: "From the AI Agent button in the top bar. The panel opens on the right, beside the page you are working on.",
  },
];

/** "Reads from" links: where each answer's data lives in the product. */
function Reads({
  items,
  dark = false,
}: {
  items: { label: string; id: string }[];
  dark?: boolean;
}) {
  return (
    <p
      className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] ${dark ? "text-[#b4b4b4]" : "text-ink-2"}`}
    >
      <span>Reads from</span>
      {items.map((i) => (
        <Link
          key={i.id}
          href={routes.feature(i.id)}
          className={`inline-flex min-h-[44px] items-center font-bold underline underline-offset-4 ${
            dark
              ? "text-lime-400 decoration-lime-400/40 hover:decoration-lime-400"
              : "text-blue-700 decoration-blue-300 hover:decoration-blue-700"
          }`}
        >
          {i.label}
        </Link>
      ))}
    </p>
  );
}

/** The kind marker: the starter's own icon on the logo's hexagon. */
function Kind({
  icon,
  label,
  n,
  dark = false,
}: {
  icon: string;
  label: string;
  n: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`hex-round flex w-11 aspect-[1/1.1547] flex-none items-center justify-center ${dark ? "bg-lime-500 text-night" : "bg-night text-lime-400"}`}
      >
        <Icon name={icon} className="text-[18px]" />
      </span>
      <Eyebrow tone={dark ? "dark" : "accent"}>
        {n} / {label}
      </Eyebrow>
    </div>
  );
}

const h3 =
  "font-display mt-5 text-[clamp(28px,3.2vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]";

export default function AgentPage() {
  return (
    <PageShell active="agent">
      {/* ------------------------------------------------------------ hero */}
      <Section className="pt-[clamp(48px,6vw,88px)]">
        <Container>
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>AI Agent · built into Flavor Studio</Eyebrow>
            </Reveal>
            <Headline
              as="h1"
              size="xl"
              className="mt-5 text-ink"
              tail="a question."
              delay={0.04}
            >
              Ask your recipes
            </Headline>
            <Reveal
              as="p"
              delay={0.08}
              className="mx-auto mt-6 max-w-[58ch] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-ink-2"
            >
              A panel that opens beside the page you are on. Ask in plain
              language; it answers from your organisation&rsquo;s recipes,
              ingredients and supplier prices, and shows the steps it took and
              the sources it read.
            </Reveal>
            <Reveal
              delay={0.14}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {/* "lime", not "primary": white on lime-600 is 1.9:1. */}
              <Button href={routes.demo} variant="lime" size="lg">
                Request a demo
              </Button>
              <Button href={signupUrl} variant="secondary" size="lg">
                Start your trial
              </Button>
            </Reveal>
            <Reveal as="p" delay={0.18} className="mt-3 text-[13px] text-ink-2">
              {trialLine} The AI Agent is included in every plan.
            </Reveal>
          </div>
        </Container>

        {/* The stage: the replay on the night panel the home act uses. */}
        <Reveal
          delay={0.2}
          className="mx-auto mt-[clamp(40px,5vw,64px)] w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] overflow-hidden rounded-[var(--radius-2xl)] bg-night px-[clamp(16px,3.4vw,48px)] py-[clamp(24px,4vw,48px)]"
        >
          <AgentPlayer />
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- answers */}
      <Section id="answers" className="pt-[var(--section-gap)]">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Three starters, three shapes of answer"
            title="What the answers"
            tail="actually say."
            lede="The same three replies, drawn as what they mean. Every number is from the product design."
          />

          {/* 01 LIST: sentence to filters, then the honeycomb. */}
          <div id="list" className="mt-[clamp(56px,7vw,104px)] scroll-mt-24">
            <div className="grid items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <Reveal>
                  <Kind icon="view-list" label="List" n="01" />
                </Reveal>
                <Reveal as="h3" delay={0.04} className={`${h3} text-ink`}>
                  Say what you need.{" "}
                  <span className="tail">Get the shortlist.</span>
                </Reveal>
                <Reveal
                  as="p"
                  delay={0.08}
                  className="mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-ink-2"
                >
                  The Agent reads the sentence as two filters, applies them to
                  your ingredient library and groups what is left by type: 13
                  starches with no soy declared.
                </Reveal>
                <Reveal delay={0.1}>
                  <Reads items={[{ label: "Ingredient library", id: "ingredients" }]} />
                </Reveal>
              </div>
              <Reveal delay={0.08}>
                <QueryToFilters />
              </Reveal>
            </div>
            <div className="mt-[clamp(40px,5vw,72px)] rounded-[var(--radius-2xl)] border border-hairline px-[clamp(12px,3vw,40px)] py-[clamp(28px,4vw,48px)]">
              <IngredientHive />
            </div>
          </div>

          {/* 02 COMPARE: the verdict as the headline, the chart under it. */}
          <div
            id="compare"
            className="mt-[clamp(88px,11vw,168px)] scroll-mt-24 text-center"
          >
            <Reveal className="flex justify-center">
              <Kind icon="distribute-horizontally" label="Compare" n="02" />
            </Reveal>
            <Reveal
              as="h3"
              delay={0.04}
              className="font-display mx-auto mt-6 max-w-[18ch] text-[clamp(34px,5vw,68px)] leading-[1.04] font-bold tracking-[-0.04em] text-ink"
            >
              <span className="tail">+5g</span> protein,{" "}
              <span className="tail">7g</span> less sugar,{" "}
              <span className="tail">40</span> fewer calories.
            </Reveal>
            <Reveal
              as="p"
              delay={0.08}
              className="mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.65] text-ink-2"
            >
              That line is the Agent&rsquo;s own summary of two brownies, per
              40g serving. Under it, the table it built, with the rows that
              differ most highlighted.
            </Reveal>
            <Reveal
              delay={0.1}
              className="mx-auto mt-10 max-w-[900px] rounded-[var(--radius-2xl)] bg-white p-[clamp(16px,3vw,36px)] text-left shadow-float ring-1 ring-hairline"
            >
              <CompareButterfly />
            </Reveal>
            <Reveal delay={0.12} className="flex justify-center">
              <Reads
                items={[
                  { label: "Recipes", id: "recipes" },
                  { label: "Nutrition labels", id: "labeling" },
                ]}
              />
            </Reveal>
          </div>
        </Container>

        {/* 03 WHAT-IF: the night block, the waterfall and its sources. */}
        <div
          id="whatif"
          className="on-dark mx-auto mt-[clamp(88px,11vw,168px)] w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] scroll-mt-24 overflow-hidden rounded-[var(--radius-2xl)] bg-night px-[clamp(20px,4vw,64px)] py-[clamp(48px,7vw,104px)]"
        >
          <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <Reveal>
                <Kind icon="trending-up" label="What-if" n="03" dark />
              </Reveal>
              <Reveal as="h3" delay={0.04} className={`${h3} text-white`}>
                Price a change{" "}
                <span className="text-lime-400">before you make it.</span>
              </Reveal>
              <Reveal
                as="p"
                delay={0.08}
                className="mt-4 max-w-[44ch] text-[16px] leading-[1.65] text-[#b4b4b4]"
              >
                Raise protein on the Protein Brownie from 8g to 10g a serving.
                The Agent finds the cheapest way to add 2g, re-costs the batch
                and shows where the money goes.
              </Reveal>
              <RevealStagger
                stagger={0.08}
                delay={0.1}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                {WHATIF_ANSWER.tiles.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-[14px] border border-hairline-dark bg-night-2 p-4"
                  >
                    <div className="font-mono text-[11px] tracking-[.08em] text-[#b4b4b4] uppercase">
                      {t.label}
                    </div>
                    <div className="font-display mt-2 text-[clamp(20px,2.2vw,28px)] leading-[1.15] font-bold text-white">
                      {t.from} <span className="text-[#8f8f8f]">→</span>{" "}
                      {t.to}
                    </div>
                    <div className="mt-1 font-mono text-[12.5px] text-[#ff8a8a]">
                      {t.delta}
                    </div>
                  </div>
                ))}
              </RevealStagger>
              <Reveal delay={0.12}>
                <Reads
                  dark
                  items={[
                    { label: "Recipes", id: "recipes" },
                    { label: "Costing", id: "costing" },
                  ]}
                />
              </Reveal>
            </div>
            <Reveal delay={0.1} className="min-w-0 lg:pt-6">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <span className="font-mono text-[12px] tracking-[.08em] text-[#b4b4b4] uppercase">
                  Raw materials per batch
                </span>
                <span className="font-display text-[clamp(22px,2.6vw,32px)] font-bold text-white">
                  {WHATIF_ANSWER.total.delta}
                </span>
              </div>
              <CostWaterfall />
              <p className="mt-6 text-[13px] leading-[1.55] text-[#b4b4b4]">
                <span className="font-mono text-[11px] tracking-[.08em] text-lime-400 uppercase">
                  Assumes ·{" "}
                </span>
                {WHATIF_ANSWER.assumptions}
              </p>
            </Reveal>
          </div>

          {/* The four sources it cites, as the Sources popover lists them. */}
          <div className="mt-[clamp(40px,5vw,64px)] border-t border-hairline-dark pt-8">
            <Reveal className="font-mono text-[12px] tracking-[.08em] text-[#b4b4b4] uppercase">
              4 sources behind the answer
            </Reveal>
            <RevealStagger
              stagger={0.07}
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {WHATIF_ANSWER.sources.map((s, i) => (
                <div
                  key={s.title}
                  className="flex flex-col gap-3 rounded-[14px] border border-hairline-dark bg-night-2 p-4"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-[8px] bg-night-3 text-lime-400">
                      <Icon name="file-text" className="text-[16px]" />
                    </span>
                    <span className="font-mono text-[12px] text-[#8f8f8f]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-[15px] font-bold text-white">
                    {s.title}
                  </span>
                  <span className="text-[13px] leading-[1.5] text-[#b4b4b4]">
                    {s.desc}
                  </span>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- composer */}
      <section id="composer" className="scroll-mt-24 pt-[var(--section-gap)]">
        <div className="mx-auto w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] rounded-[var(--radius-2xl)] bg-panel px-[clamp(20px,4vw,64px)] py-[clamp(48px,7vw,104px)]">
          <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionHead
                align="left"
                eyebrow="The composer"
                title="Point it at"
                tail="the right thing."
              />
              <Reveal
                as="p"
                delay={0.08}
                className="mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-ink-2"
              >
                Type @ and your recipe list appears as you type, so the
                question names the exact recipe. The + button adds anything
                else the answer should use: a colleague, a file, a link, the
                page you are on, or an answer it gave before. Type / for
                actions.
              </Reveal>
              <Reveal
                as="p"
                delay={0.1}
                className="mt-6 flex items-center gap-2 font-mono text-[12px] tracking-[.06em] text-blue-700 uppercase"
              >
                <Icon name="click" className="text-[15px]" /> Try the + menu
              </Reveal>
            </div>
            <Reveal delay={0.1} className="min-w-0">
              <ComposerToy />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- shows its work */}
      <Section id="verify" className="scroll-mt-24 py-[var(--section-gap)]">
        <Container>
          <SectionHead
            align="left"
            eyebrow="Every answer shows its work"
            title="Check it"
            tail="before you rely on it."
          />
          <RevealStagger
            stagger={0.08}
            className="mt-[clamp(32px,4vw,56px)] grid gap-4 md:grid-cols-3"
          >
            {/* Specimens: the panel's own pieces, at reading size. */}
            <figure className="m-0 flex flex-col rounded-[var(--radius-xl)] bg-panel p-5">
              <div className="flex-1 rounded-[12px] bg-white p-4 font-['Avenir_Next',var(--font-mulish),sans-serif] text-[13px] text-slate-600 shadow-float">
                <div className="flex items-center gap-1.5">
                  <Icon name="check" className="text-[#8cd135]" /> Thinking completed
                </div>
                <ol className="mt-2 ml-[6px] flex list-none flex-col gap-1.5 border-l border-[#e9e9e9] p-0 pl-3">
                  {WHATIF_ANSWER.steps.map((st) => (
                    <li key={st} className="flex items-center gap-1.5">
                      <span className="size-1.5 flex-none rounded-full bg-lime-600" />
                      {st}
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className="mt-4">
                <span className="block text-[16px] font-bold text-ink">
                  The steps it took
                </span>
                <span className="mt-1 block text-[14px] leading-[1.55] text-ink-2">
                  Named in order under &ldquo;Thinking completed&rdquo;, so you
                  see how it read the question.
                </span>
              </figcaption>
            </figure>
            <figure className="m-0 flex flex-col rounded-[var(--radius-xl)] bg-panel p-5">
              <div className="flex-1 rounded-[12px] bg-white p-4 font-['Avenir_Next',var(--font-mulish),sans-serif] shadow-float">
                <span className="inline-flex rounded-[8px] border border-blue-600 px-3 py-1.5 text-[13px] font-bold text-blue-600">
                  4 Sources
                </span>
                <div className="mt-3 flex gap-2.5">
                  <span className="flex size-7 flex-none items-center justify-center rounded-[6px] bg-[#f3f3f6] text-slate-600">
                    <Icon name="file-text" className="text-[13px]" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-slate-800">
                      Supplier price list (current)
                    </span>
                    <span className="block text-[12px] text-slate-600">
                      Whey protein isolate $18.00/kg; flour $1.20/kg; live unit
                      costs.
                    </span>
                  </span>
                </div>
              </div>
              <figcaption className="mt-4">
                <span className="block text-[16px] font-bold text-ink">
                  The records it read
                </span>
                <span className="mt-1 block text-[14px] leading-[1.55] text-ink-2">
                  Recipes, price lists, costing models and notes, each named
                  and described under the answer.
                </span>
              </figcaption>
            </figure>
            <figure className="m-0 flex flex-col rounded-[var(--radius-xl)] bg-night p-5">
              <div className="font-display flex flex-1 items-center text-[clamp(20px,1.9vw,24px)] leading-[1.3] font-bold text-white">
                &ldquo;{DISCLAIMER}&rdquo;
              </div>
              <figcaption className="mt-4">
                <span className="block text-[16px] font-bold text-white">
                  Its own footnote
                </span>
                <span className="mt-1 block text-[14px] leading-[1.55] text-[#b4b4b4]">
                  Printed under the composer, every time. The data is yours,
                  and so is the decision.
                </span>
              </figcaption>
            </figure>
          </RevealStagger>

          <Reveal
            delay={0.1}
            className="mt-[clamp(40px,5vw,64px)] flex flex-col gap-4 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-[52ch] text-[16px] leading-[1.6] text-ink-2">
              The Agent is only as good as the records it reads. The answers
              come from the modules your team already works in:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Recipes", id: "recipes" },
                { label: "Ingredients", id: "ingredients" },
                { label: "Nutrition labels", id: "labeling" },
                { label: "Costing", id: "costing" },
              ].map((m) => (
                <Link
                  key={m.id}
                  href={routes.feature(m.id)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-hairline px-4 text-[14px] font-semibold text-ink transition-colors hover:border-blue-700 hover:text-blue-700"
                >
                  {m.label}
                  <Icon name="right" className="text-[14px]" />
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- faq */}
      <Section className="border-t border-hairline py-[var(--section-gap)]">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <SectionHead title="Questions about" tail="the AI Agent" />
            <Reveal delay={0.08} className="mt-10">
              <FaqAccordion items={FAQ} groupKey="agent" defaultOpen={0} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <RainbowCta id="demo" title="Ask the AI Agent about your own recipes." />
    </PageShell>
  );
}
