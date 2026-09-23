"use client";

import Image from "next/image";
import { Icon } from "@/components/icon";
import { Reveal, RevealStagger } from "@/components/reveal";
import { Button, Container, Eyebrow } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * The AI Agent act (clickup.com S6, Brain²): a black panel inset from the page
 * edge, a gradient headline, the three starters the Agent ships with, and a
 * closing gradient band that hands off to the AI Agent page.
 *
 * The panel used to bleed to full width as it scrolled in, scrubbed by
 * ScrollTrigger, and reduced-motion readers got the full-bleed state outright.
 * The design draws a fixed rounded panel inset from both edges, so that effect
 * is gone; the clip-path tween is easy to put back if it is ever wanted.
 *
 * The content is the Agent as designed (Figma, page "AI Agent" → "AI AGENT >
 * Floating Concept"): the panel's own starter types — LIST / COMPARE /
 * WHAT-IF — with the questions and the results those flows return, the
 * composer's context rules, and the product's own disclaimer. The earlier
 * "workspace memory" block was invented; the Agent has no such settings, so
 * it is gone.
 */

/** The app sections the panel is available in. */
const SURFACES = [
  "Projects",
  "Inspire",
  "Recipes",
  "Taste tests",
  "Reports",
  "CRM",
];

const STARTERS = [
  {
    kind: "List",
    prompt:
      "Show me all ingredients with no soy allergen, categorized as starches",
    body: "It reads the intent, filters the ingredient library on category and allergen, then groups what it finds — with the sources behind the answer.",
    visual: "list",
  },
  {
    kind: "Compare",
    prompt: "Side-by-side nutrition labels: Recipe A vs Recipe B",
    body: "It builds both panels per serving and highlights the rows that differ most, naming the two recipes and the nutrition engine it calculated from.",
    visual: "compare",
  },
  {
    kind: "What-if",
    prompt: "If protein went to 10 g, how does raw-material cost change?",
    body: "It reads the current formula and protein target, finds the cheapest lever to add the 2 g, then re-costs the batch and shows the delta per material.",
    visual: "whatif",
  },
];

/** The grouped ingredient list the LIST starter returns. */
const GROUPS = [
  ["Flours & meals", "5"],
  ["Grains & noodles", "5"],
  ["Starchy vegetables", "3"],
];

/** The raw-material delta the WHAT-IF starter returns. */
const COSTS = [
  {
    item: "Whey protein isolate",
    now: "$21.60",
    next: "$33.30",
    delta: "+$11.70",
    up: true,
  },
  {
    item: "All-purpose flour",
    now: "$1.20",
    next: "$0.84",
    delta: "−$0.36",
    up: false,
  },
  {
    item: "Total / batch",
    now: "$45.45",
    next: "$56.79",
    delta: "+$11.34",
    up: true,
    total: true,
  },
];

/** The dark mono card both generated results sit in. */
function ResultCard({
  head,
  foot,
  children,
}: {
  head: string;
  foot: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-hairline-dark bg-night-2 p-4 font-mono text-[12px]">
      <div className="mb-3 text-[10px] tracking-[.1em] text-[#7b7b7b] uppercase">
        {head}
      </div>
      {children}
      <div className="mt-3 border-t border-hairline-dark pt-2 text-[10px] leading-[1.5] text-[#7b7b7b]">
        {foot}
      </div>
    </div>
  );
}

export function AgentAct() {
  const shot = productAssets.aiAgent;

  return (
    <section className="py-[clamp(8px,1vw,16px)]">
      <div className="on-dark relative mx-[clamp(12px,1.6vw,20px)] overflow-hidden rounded-[32px] bg-night text-[#b4b4b4]">
        {/* aurora */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[38%] h-[260px] opacity-60 blur-[70px]"
          style={{
            background:
              "linear-gradient(90deg, #2060a6, #59a3eb 35%, #18bc9c 65%, #8cd135)",
            animation: "fsGlowDrift 16s ease-in-out infinite",
          }}
        />

        <Container className="relative pt-[clamp(64px,9vw,140px)] pb-[clamp(48px,6vw,80px)]">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-[13px] font-semibold text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-[12px] text-ink">
                <Icon name="robot" />
              </span>
              AI Agent · built into Flavor Studio
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="font-display mt-6 text-[clamp(36px,5.6vw,76px)] leading-[1.05] font-bold tracking-[-0.04em]"
            >
              <span className="tail-grad">
                The AI that actually knows your formulas
              </span>
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mx-auto mt-5 max-w-[620px] text-[clamp(16px,1.4vw,20px)] leading-[1.55] text-[#b4b4b4]"
            >
              Ask in plain language from the page you are already on. The Agent
              answers from your organisation&rsquo;s own data, shows the steps
              it took and cites what it used.
            </Reveal>
            <Reveal
              delay={0.14}
              className="eyebrow eyebrow-dark mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
            >
              <span className="text-[#7b7b7b]">Works in</span>
              {SURFACES.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </Reveal>
          </div>

          {/* the three starters the panel offers, and what each returns */}
          <RevealStagger
            stagger={0.08}
            className="hairline-grid-dark mt-[clamp(40px,5vw,72px)] md:grid-cols-3"
          >
            {STARTERS.map((s) => (
              <div key={s.kind} className="flex flex-col gap-5 p-6">
                <Eyebrow tone="dark" className="text-[12px] text-[#eee]">
                  {s.kind}
                </Eyebrow>
                <p className="text-[15px] leading-[1.5] font-semibold text-white">
                  &ldquo;{s.prompt}&rdquo;
                </p>
                <p className="text-[14px] leading-[1.6] text-[#b4b4b4]">
                  {s.body}
                </p>
                <div className="mt-auto">
                  {s.visual === "list" ? (
                    <ResultCard
                      head="13 ingredients"
                      foot="Completed 4 steps · grouped list output with sources"
                    >
                      {GROUPS.map(([name, count]) => (
                        <div
                          key={name}
                          className="flex justify-between gap-4 border-b border-hairline-dark py-1.5 last:border-0"
                        >
                          <span className="text-[#b4b4b4]">{name}</span>
                          <span className="text-lime-400">{count}</span>
                        </div>
                      ))}
                    </ResultCard>
                  ) : s.visual === "compare" ? (
                    <div className="flex flex-col gap-3">
                      <div className="frame-dark relative aspect-[4/3] overflow-hidden">
                        {shot.src ? (
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="400px"
                            className="object-cover object-left-top"
                          />
                        ) : null}
                      </div>
                      <p className="font-mono text-[11px] leading-[1.5] text-[#7b7b7b]">
                        Recipe A: +5 g protein, 7 g less sugar, 40 fewer
                        calories.{" "}
                        <span className="text-[#b4b4b4]">2 sources</span>
                      </p>
                    </div>
                  ) : (
                    <ResultCard
                      head="raw material · per batch"
                      foot="Assumes current supplier prices and 90%-protein whey isolate. Excludes labor, package and overhead."
                    >
                      {COSTS.map((c) => (
                        <div
                          key={c.item}
                          className={`border-b border-hairline-dark py-2 last:border-0 ${
                            c.total ? "text-white" : "text-[#b4b4b4]"
                          }`}
                        >
                          <div className="leading-[1.4]">{c.item}</div>
                          <div className="mt-0.5 flex items-baseline gap-2 text-[11px]">
                            <span className="text-[#7b7b7b]">{c.now}</span>
                            <span className="text-[#7b7b7b]">&rarr;</span>
                            <span>{c.next}</span>
                            <span
                              className={`ml-auto ${
                                c.up ? "text-[#efc051]" : "text-lime-400"
                              }`}
                            >
                              {c.delta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </ResultCard>
                  )}
                </div>
              </div>
            ))}
          </RevealStagger>

          {/* the composer: how you point the Agent at the right thing */}
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-[720px]">
            <div className="flex flex-wrap items-center gap-3 rounded-[14px] border border-hairline-dark bg-night-2 px-4 py-3">
              <span className="chip chip-dark flex-none font-mono text-[11px]">
                Context · Recipes
              </span>
              <span className="min-w-0 flex-1 font-mono text-[13px] text-[#7b7b7b]">
                Ask, <span className="text-lime-400">@mention</span> a recipe or
                a colleague, or <span className="text-lime-400">/</span> for
                actions
              </span>
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/[.08] text-[14px] text-white">
                <Icon name="send" />
              </span>
            </div>
            <p className="mt-3 text-center text-[12px] leading-[1.6] text-[#7b7b7b]">
              Attach a file or a link, or hand it the page you are on — and the
              Agent&rsquo;s own output — as context. Answers draw only on your
              organisation&rsquo;s data; verify before relying on results.
            </p>
          </Reveal>
        </Container>

        {/* closing band */}
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, #0a0c10 0%, rgba(10,12,16,0) 30%), linear-gradient(100deg, #2060a6, #59a3eb 45%, #18bc9c 80%, #8cd135)",
          }}
        >
          <Container className="py-[clamp(56px,8vw,112px)] text-center">
            <Reveal
              as="h3"
              className="font-display mx-auto max-w-[18ch] text-[clamp(30px,4vw,56px)] leading-[1.06] font-bold tracking-[-0.03em] text-white"
            >
              The only AI that actually knows your work
            </Reveal>
            <Reveal
              delay={0.08}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Button href={routes.agent} variant="inverse" size="lg" arrow>
                Meet the AI Agent
              </Button>
              <Button href={routes.demo} variant="ghost-dark" size="lg">
                Request a demo
              </Button>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
