"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChatMock } from "@/components/chat-mock";
import { Icon } from "@/components/icon";
import { Reveal, RevealStagger } from "@/components/reveal";
import { Button, Container, Eyebrow } from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * The AI Agent act (clickup.com S6, Brain²): a black panel that starts as a
 * rounded, inset card and bleeds to full width as it scrolls in (clip-path,
 * scrubbed by ScrollTrigger); a wordmark and gradient headline; three pillars
 * — CONTEXT / INTELLIGENCE / RULES — in a hairline row; a closing gradient
 * band that hands off to the AI Agent page.
 *
 * It sits after the platform, the teams and the labels — the client asked
 * that AI be met as a capability built on the product, not the other way
 * around — and it is one screen, not ClickUp's five.
 */

const PILLARS = [
  {
    label: "Context",
    body: "The Agent reads your recipes, ingredient library, supplier data and test results, and answers in the recipe you are already in.",
    visual: "context",
  },
  {
    label: "Citations",
    body: "Every claim names the recipe, regulation or test it came from. When it cannot source an answer, it says so rather than guessing.",
    visual: "cite",
  },
  {
    label: "Rules",
    body: "It proposes draft versions for a developer to approve — never a silent edit. Your data is never used to train third-party models.",
    visual: "rules",
  },
];

const MEMORY = [
  ["units", '"grams, metric"'],
  ["label_jurisdictions", '"US, CA"'],
  ["target_margin", '"40% at retail"'],
  ["allergen_policy", '"big-9, may-contain"'],
  ["tone", '"short, numbers first"'],
];

export function AgentAct() {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.style.clipPath = "inset(0 0 round 0)";
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        el,
        { clipPath: "inset(0px 20px round 32px)" },
        {
          clipPath: "inset(0px 0px round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        el,
        { clipPath: "inset(0px 0px round 0px)" },
        {
          clipPath: "inset(0px 20px round 32px)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "bottom 75%",
            end: "bottom 15%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: panel },
  );

  const shot = productAssets.aiAgent;

  return (
    <section className="py-[clamp(8px,1vw,16px)]">
      <div
        ref={panel}
        className="on-dark relative overflow-hidden bg-night text-[#b4b4b4]"
        style={{ clipPath: "inset(0px 20px round 32px)" }}
      >
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
              className="mx-auto mt-5 max-w-[560px] text-[clamp(16px,1.4vw,20px)] leading-[1.55] text-[#b4b4b4]"
            >
              Already plugged into your recipes, your ingredient library and
              your test results — with a citation on every answer.
            </Reveal>
            <Reveal
              delay={0.14}
              className="eyebrow eyebrow-dark mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
            >
              <span className="text-[#7b7b7b]">Works in</span>
              <span>Recipes</span>
              <span>Labels</span>
              <span>Costing</span>
              <span>Taste Tests</span>
              <span>CRM</span>
            </Reveal>
          </div>

          {/* pillars */}
          <RevealStagger
            stagger={0.08}
            className="hairline-grid-dark mt-[clamp(40px,5vw,72px)] md:grid-cols-3"
          >
            {PILLARS.map((p) => (
              <div key={p.label} className="flex flex-col gap-5 p-6">
                <Eyebrow tone="dark" className="text-[12px] text-[#eee]">
                  {p.label}
                </Eyebrow>
                <p className="text-[15px] leading-[1.6] text-[#b4b4b4]">
                  {p.body}
                </p>
                <div className="mt-auto">
                  {p.visual === "context" ? (
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
                  ) : p.visual === "cite" ? (
                    <ChatMock
                      tone="dark"
                      gap={1200}
                      lines={[
                        {
                          from: "user",
                          text: "Does the Testing version qualify for “good source of fibre”?",
                        },
                        {
                          from: "agent",
                          text: "Yes — 3.1 g per RACC, above the 2.5 g threshold.",
                          cite: "21 CFR 101.54(c) · Granola Bar · Testing",
                        },
                      ]}
                    />
                  ) : (
                    <div className="rounded-[12px] border border-hairline-dark bg-night-2 p-4 font-mono text-[12px]">
                      <div className="mb-3 text-[10px] tracking-[.1em] text-[#7b7b7b] uppercase">
                        workspace memory
                      </div>
                      {MEMORY.map(([k, v]) => (
                        <div
                          key={k}
                          className="flex justify-between gap-4 border-b border-hairline-dark py-1.5 last:border-0"
                        >
                          <span className="text-[#b4b4b4]">{k}</span>
                          <span className="text-lime-400">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </RevealStagger>
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
