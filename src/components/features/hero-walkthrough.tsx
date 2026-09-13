"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Caption } from "@/components/layout-primitives";
import { ProductShot } from "@/components/product-shot";
import { productAssets } from "@/lib/assets";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * The Features hero card.
 *
 * This was a six-step animated tour built entirely from invented data — the
 * same fabricated ingredient costs, %DV bars, stage gates and customer names as
 * the mosaic below it. It was the first thing a visitor saw on the product
 * page, and none of it was real.
 *
 * It is now the same six-step mechanic over the actual application. Ideation
 * dropped out of the rail rather than being represented by a placeholder: every
 * step here shows a real screen, and the module keeps its card further down the
 * page where the gap can be stated honestly.
 */

const DWELL_MS = 4600;

const STEPS = [
  {
    icon: "chef-hat-one",
    label: "Recipes",
    caption: "The formulation grid, with yield and cost rolling up live.",
    shot: productAssets.recipeGrid,
  },
  {
    icon: "doc-detail",
    label: "Labels",
    caption: "Publish a compliant panel, in the layout your market requires.",
    shot: productAssets.nutritionLabelFormats,
  },
  {
    icon: "check-one",
    label: "Claims",
    caption: "Nutrient content claims checked against the analysed values.",
    shot: productAssets.nutrientClaims,
  },
  {
    icon: "experiment",
    label: "Sensory",
    caption:
      "Publishing a panel report, filtered by product version and taster.",
    shot: productAssets.tasteTests,
  },
  {
    icon: "time",
    label: "Timesheet",
    caption: "Activity logged against the project, with expenses attached.",
    shot: productAssets.timesheet,
  },
  {
    icon: "peoples",
    label: "CRM",
    caption: "The Customer Requirements Builder, mid-build.",
    shot: productAssets.crBuilder,
  },
];

export function FeaturesWalkthrough() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  const inView = useCallback(() => {
    const el = root.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || 800);
  }, []);

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    const id = setInterval(() => {
      if (inView()) setIndex((i) => (i + 1) % STEPS.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [auto, inView]);

  const active = STEPS[index];

  return (
    <div ref={root} className="relative">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white shadow-window">
        <div className="grid grid-cols-3 gap-1 bg-slate-900 px-3 pt-3 pb-[10px] sm:grid-cols-6">
          {STEPS.map((step, i) => {
            const isActive = i === index;
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setAuto(false);
                }}
                aria-current={isActive}
                className={`relative flex min-h-[44px] items-center justify-center gap-[6px] overflow-hidden rounded-lg px-2 text-[13px] font-bold whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <Icon name={step.icon} className="text-[16px] shrink-0" />
                <span>{step.label}</span>
                {isActive && auto && (
                  <span
                    key={index}
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-white/55"
                    style={{
                      animation: `fsTabProgress ${DWELL_MS}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <ProductShot
          key={active.label}
          src={active.shot.src as string}
          alt={active.shot.alt}
          width={active.shot.width}
          height={active.shot.height}
          focus={active.shot.focus}
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="rounded-none border-0 shadow-none"
          delay={0.5}
        />
      </div>
      <Caption tone="dark">{active.caption}</Caption>
    </div>
  );
}
