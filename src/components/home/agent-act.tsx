"use client";

import { useCallback, useState } from "react";
import { AgentPanel, type AgentStage } from "@/components/home/agent-panel";
import { Button } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The AI Agent act, built to Figma node 40000425:86686 ("07 AI Agent" in the
 * Flavor Studio Application file): a night panel with the brand aurora, the
 * pitch and a static composer on the left, the Agent's own panel on the
 * right, and a gradient closing band that hands off to /ai-agent.
 *
 * The right-hand panel (agent-panel.tsx) plays the Agent's COMPARE flow from
 * the app design. It is a picture of the product, not a working chat: the
 * client asked that nothing public ever reach their AI (see the client
 * feedback memory), so its buttons are drawn, not wired. Its type is the
 * app's own Avenir Next, as in the design, falling back to Mulish where
 * Avenir is not installed.
 *
 * The design's panel is 1400 wide; here it takes the site-wide 1170 section
 * cap, with the 1080 content column centred inside it as drawn.
 *
 * Icons and the hex mark are the design's exported SVGs in public/ai-act.
 *
 * The pitch follows the panel: each of its three beats (ask, the answer and
 * its steps, the sources) is underlined while the panel plays it, and the aurora
 * brightens while the Agent is thinking. The copy is the design's, split at
 * its own clause breaks.
 */

/* Each beat of the pitch, and the panel stages it narrates. */
const BEATS: { text: string; stages: AgentStage[] }[] = [
  {
    text: "Ask in plain language from the page you are already on.",
    stages: ["welcome", "typing", "send", "sent"],
  },
  {
    text: "The Agent answers from your organisation\u2019s own data, shows the steps it took",
    stages: ["thinking", "steps", "table", "summary"],
  },
  {
    text: "and cites what it used.",
    stages: ["press-sources", "sources", "done"],
  },
];

const SURFACES = [
  "Projects",
  "Inspire",
  "Recipes",
  "Taste tests",
  "Reports",
  "CRM",
];

/** The hex mark: outer ring and inner star, both flipped as in the file. */
function Mark({ size }: { size: "sm" | "lg" }) {
  const sm = size === "sm";
  return (
    <span
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sm ? "h-[14.225px] w-[13.2px]" : "h-[28.451px] w-[26.4px]"}`}
    >
      <img
        alt=""
        src={`/ai-act/mark-outer-${size}.svg`}
        className="absolute inset-0 block size-full max-w-none -scale-x-100 -rotate-180"
      />
      <img
        alt=""
        src={`/ai-act/mark-inner-${size}.svg`}
        className={`absolute top-1/2 left-1/2 block max-w-none -translate-x-1/2 -translate-y-1/2 -scale-y-100 ${sm ? "size-[8.976px]" : "size-[17.952px]"}`}
      />
    </span>
  );
}

export function AgentAct() {
  // The stage the panel is playing; null while it is stopped, which leaves
  // the pitch unmarked.
  const [stage, setStage] = useState<AgentStage | null>(null);
  const onStage = useCallback((s: AgentStage | null) => setStage(s), []);
  const thinking = stage === "thinking";

  return (
    <section className="flex flex-col items-center py-4">
      <div className="relative w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] overflow-hidden rounded-[32px] bg-night">
        {/* aurora */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[320px] left-0 h-[260px] w-full blur-[35px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #2060a6 0%, #59a3eb 35%, #18bc9c 65%, #8cd135 100%)",
            opacity: thinking ? 0.95 : 0.6,
            transform: thinking ? "scaleY(1.25)" : "none",
            transition:
              "opacity 900ms ease, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1080px] px-5 pt-[clamp(64px,9.7vw,140px)] lg:px-0">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
            <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-6">
              <p className="flex items-center gap-2 overflow-hidden rounded-[999px] border border-white/15 bg-white/[0.04] px-3 py-1.5">
                <span className="relative size-6 shrink-0 overflow-hidden rounded-[24px] bg-[#324561] shadow-[0_2px_4px_2px_rgba(0,0,0,0.05)]">
                  <Mark size="sm" />
                </span>
                <span className="text-[13px] font-semibold whitespace-nowrap text-white">
                  AI Agent · built into Flavor Studio
                </span>
              </p>
              <h2 className="font-display w-full bg-[linear-gradient(90deg,#fff_0%,#fff_34%,#8f8f8f_100%)] bg-clip-text text-[clamp(40px,4.45vw,64px)] leading-[1.06] font-bold tracking-[-0.035em] text-transparent">
                The AI that
                <br />
                actually knows
                <br />
                your formulas
              </h2>
              <p className="w-full text-[18px] leading-[1.6] text-white">
                {BEATS.map((b, k) => {
                  const lit = stage !== null && b.stages.includes(stage);
                  return (
                    <span key={k}>
                      {k > 0 ? " " : ""}
                      <span
                        className="bg-[linear-gradient(#a8dd5e,#a8dd5e)] bg-no-repeat pb-[3px]"
                        style={{
                          backgroundPosition: "0 100%",
                          backgroundSize: lit ? "100% 2px" : "0% 2px",
                          transition: lit
                            ? "background-size 900ms cubic-bezier(0.65, 0, 0.35, 1)"
                            : "background-size 300ms ease",
                        }}
                      >
                        {b.text}
                      </span>
                    </span>
                  );
                })}
              </p>
              <p className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] leading-[1.3] tracking-[0.08em] whitespace-nowrap uppercase">
                <span className="text-[#f3f7fe]">Works in</span>
                {SURFACES.map((s) => (
                  <span key={s} className="text-[#a8dd5e]">
                    {s}
                  </span>
                ))}
              </p>
              <div aria-hidden="true" className="h-6 w-px shrink-0" />
              <div className="flex w-full items-center gap-3 overflow-hidden rounded-[14px] border border-hairline-dark bg-night-2 px-4 py-3">
                <span className="shrink-0 rounded-[8px] border border-hairline-dark bg-night-2 px-3 py-1.5 font-mono text-[11px] leading-[16.5px] tracking-[0.06em] whitespace-nowrap text-[#b4b4b4]">
                  Context · Recipes
                </span>
                <p className="min-w-0 flex-1 font-mono text-[13px] leading-[19.5px] text-[#7b7b7b]">
                  Ask, <span className="text-[#a8dd5e]">@mention</span> a
                  recipe or a colleague,
                  <br className="hidden sm:inline" /> or / for actions
                </p>
                <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[999px] bg-lime-500">
                  <span className="relative size-6">
                    <img
                      alt=""
                      src="/ai-act/send.svg"
                      className="absolute inset-[5.21%] block size-[21px] max-w-none"
                    />
                  </span>
                </span>
              </div>
              <p className="w-full text-[12px] leading-[19.2px] text-[#7b7b7b]">
                Attach a file or a link, or hand it the page you are on — and
                the Agent&rsquo;s own output — as context. Answers draw only on
                your organisation&rsquo;s data; verify before relying on
                results.
              </p>
            </div>

            <div className="relative flex w-full max-w-[423px] shrink-0 flex-col lg:h-[705px] lg:w-[423px]">
              <div className="w-full lg:absolute lg:top-0 lg:left-0 lg:w-[418px]">
                <AgentPanel onStage={onStage} />
              </div>
              <span className="relative mt-2 size-12 self-end overflow-hidden rounded-[48px] bg-[#324561] shadow-[0_4px_8px_4px_rgba(0,0,0,0.05)] lg:absolute lg:top-[657px] lg:left-[375px] lg:mt-0">
                <Mark size="lg" />
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="h-12" />
        </div>

        <div
          className="relative flex w-full flex-col items-center gap-8 px-5 py-[clamp(64px,7.8vw,112px)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0a0c10 0%, rgba(10,12,16,0) 30%), linear-gradient(90deg, #2060a6 0%, #59a3eb 45%, #18bc9c 80%, #8cd135 100%)",
          }}
        >
          <h3 className="font-display w-full max-w-[560px] text-center [text-wrap:wrap] text-[clamp(34px,3.9vw,56px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
            The only AI that actually knows your work
          </h3>
          <div className="flex flex-wrap items-start justify-center gap-4">
            <Button href={routes.agent} variant="inverse" size="lg" arrow>
              Meet the AI Agent
            </Button>
            <Button href={routes.demo} variant="ghost-dark" size="lg">
              Request a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
