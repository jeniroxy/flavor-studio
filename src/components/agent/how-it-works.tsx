"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui";
import { flows } from "@/lib/flows";

/*
 * The sticky-visual scroll section (clickup.com Brain² "Presentation-ready in
 * one prompt"): three text blocks scroll past a pinned frame that swaps
 * between three real screens of the AI Agent flow. CSS sticky, no pin
 * spacer; the active block is found by which one sits nearest the viewport
 * centre. Under reduced motion every block is fully visible.
 */

const STEPS = [
  {
    id: "ask",
    eyebrow: "Ask in the recipe you're in",
    title: "The Agent opens beside the formula, not in another tab",
    body: "Type a question in plain language. @ mentions a recipe by name and the list appears as you type — no exporting, no copying numbers across.",
    step: 1,
  },
  {
    id: "compare",
    eyebrow: "Compare versions side by side",
    title: "Two recipes, one table, the biggest gaps highlighted",
    body: "Per-serving or per-100 g nutrient panels across versions, with cost beside them, so a reformulation's effect is a fact rather than a feeling.",
    step: 3,
  },
  {
    id: "draft",
    eyebrow: "Get a draft, not a surprise",
    title: "Every answer names its sources — and nothing changes without you",
    body: "Claims cite the recipe, regulation or test they came from. Suggested swaps land as a draft version for a developer to review and apply.",
    step: 4,
  },
];

export function HowItWorks() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let dist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const flow = flows.aiAgent;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div className="flex flex-col gap-[clamp(80px,18vh,180px)] py-[10vh]">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="scroll-mt-32 transition-opacity duration-300"
            style={{ opacity: still || active === i ? 1 : 0.35 }}
          >
            <Eyebrow tone="dark">{s.eyebrow}</Eyebrow>
            <h3 className="font-display mt-3 text-[clamp(24px,2.6vw,34px)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
              {s.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-[#b4b4b4]">
              {s.body}
            </p>
            {/* Mobile: the frame follows each block. */}
            <div className="frame-dark mt-6 lg:hidden">
              <Image
                src={flow.steps[s.step].src}
                alt={flow.steps[s.step].caption}
                width={flow.width}
                height={flow.height}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-[120px]">
          <div className="frame-dark relative aspect-[769/960] max-h-[70vh] w-full overflow-hidden bg-white">
            {STEPS.map((s, i) => (
              <Image
                key={s.id}
                src={flow.steps[s.step].src}
                alt={flow.steps[s.step].caption}
                fill
                sizes="560px"
                className="object-cover object-top"
                style={{
                  opacity: still || active === i ? 1 : 0,
                  transition: "opacity .4s ease",
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-1">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                className={`h-[3px] flex-1 rounded-full ${active === i ? "bg-lime-400" : "bg-hairline-dark"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
