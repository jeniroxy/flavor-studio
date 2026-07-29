"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ChatDemo } from "@/components/chat-demo";
import { Icon, SparkIcon } from "@/components/icon";
import { Block } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import { routes } from "@/lib/routes";

/*
 * The AI Agent band. "AI Agent — built into the platform" and the live demo
 * share one flat navy block (#223047, no gradient) — the user merged the two
 * boxes and asked for the gradient and the divider line between them to go.
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
  const chatCard = useRef<HTMLDivElement>(null);

  // The sample conversation types itself out message by message.
  useGSAP(
    () => {
      const card = chatCard.current;
      if (!card || prefersReducedMotion()) return;
      const msgs = card.querySelectorAll("[data-smsg]");
      gsap.set(msgs, { y: 18, opacity: 0 });
      observeOnce(card, () => {
        gsap.to(msgs, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.35,
        });
      });
    },
    { scope: chatCard },
  );

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
            data — then answers like a colleague who never sleeps. Every claim
            comes with a source.
          </Reveal>
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Reveal>
            <div
              ref={chatCard}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-[22px] backdrop-blur-[6px]"
            >
              <div
                data-smsg=""
                className="max-w-[86%] self-end rounded-[14px_14px_4px_14px] bg-blue-500 px-[15px] py-[11px] text-[13.5px] leading-[1.5] text-white"
              >
                What happens to the label if I cut sodium 20% in the v4 broth?
              </div>
              <div
                data-smsg=""
                className="max-w-[92%] self-start rounded-[14px_14px_14px_4px] border border-white/[.09] bg-white/[.07] px-[15px] py-3 text-[13.5px] leading-[1.6] text-[#dfe5ee]"
              >
                Sodium drops to{" "}
                <strong className="text-white">430 mg / serving</strong> — you
                qualify for a{" "}
                <strong className="text-[#4fd8bd]">
                  &ldquo;Reduced sodium&rdquo; claim
                </strong>{" "}
                under FDA §101.61. Potassium chloride at 0.4% keeps the salinity
                score within 2 points of control.
              </div>
              <div data-smsg="" className="flex flex-wrap gap-2 self-start">
                <span className="self-center text-[11px] font-bold tracking-[.06em] text-slate-500 uppercase">
                  Sources
                </span>
                {["21 CFR 101.61", "Taste test #212", "Broth v4"].map((src) => (
                  <span
                    key={src}
                    className="rounded-full bg-white/[.07] px-[10px] py-[3px] text-[11px] text-slate-300"
                  >
                    {src}
                  </span>
                ))}
              </div>
              <div
                data-smsg=""
                className="mt-1 flex flex-wrap gap-2 self-start"
              >
                <span className="cursor-pointer rounded-full border border-blue-500/50 px-[13px] py-[6px] text-[12px] font-semibold text-[#9ccbf5]">
                  Apply to v5 draft
                </span>
                <span className="cursor-pointer rounded-full border border-white/[.18] px-[13px] py-[6px] text-[12px] font-semibold text-slate-200">
                  Show label preview
                </span>
              </div>
            </div>
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
                  <div className="mt-1 text-[13.5px] leading-[1.55] text-slate-300">
                    {cap.body}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal
              as="a"
              delay={0.26}
              href={routes.contact}
              className="inline-flex w-fit items-center gap-2 rounded-[14px] border border-blue-500/55 bg-blue-500/[.22] px-5 py-[13px] text-[14.5px] font-bold text-white transition-[background] duration-[180ms] hover:bg-blue-500/40"
            >
              See the AI Agent on your own data
              <Icon name="arrow-right" className="text-[15px]" />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Live demo — same block, no divider. */}
      <div
        id="try"
        className="relative mx-auto mt-[clamp(64px,8vw,104px)] max-w-[860px]"
      >
        <div className="mx-auto max-w-[620px] text-center">
          <Reveal className="inline-flex items-center gap-2 rounded-full bg-[rgba(24,188,156,.16)] px-[14px] py-[7px] text-[12px] font-bold tracking-[.08em] text-[#4fd8bd] uppercase">
            <span
              className="h-[7px] w-[7px] rounded-full bg-teal-500"
              style={{ animation: "fsPulse 2s ease infinite" }}
            />
            Live demo
          </Reveal>
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
            Ask it a food-science question — ingredient swaps, allergens,
            nutrient claims, costing — and watch it answer.
          </Reveal>
        </div>

        <Reveal delay={0.16} className="mt-[clamp(32px,4vw,48px)]">
          <ChatDemo skin="light" emptyStateNudge starters={3} />
        </Reveal>

        <div className="mt-[14px] text-center text-[11.5px] text-slate-400">
          Responses in this demo are scripted for illustration. In the product,
          the Agent answers from your own recipes, library and supplier data —
          with real citations.
        </div>
      </div>
    </Block>
  );
}
