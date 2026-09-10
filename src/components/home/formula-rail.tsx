"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * The 100% rail — the site's signature element.
 *
 * Every recipe in Flavor Studio is a set of percentages that has to total
 * 100.000%. That constraint is the one thing this product has that a generic
 * SaaS site cannot borrow, so it becomes the recurring graphic device: a single
 * stacked bar, segment per ingredient, resolving to exactly 100.000%.
 *
 * The formula below is the one shown in the application's own Publish Designer
 * screen — real ingredient names, real percentages, real weights and real cost.
 */

export type Segment = {
  name: string;
  /** Percentage of the batch. The set must total 100. */
  pct: number;
  weight: string;
  color: string;
};

export const COOKIE_FORMULA: Segment[] = [
  {
    name: "Butter, without salt",
    pct: 30,
    weight: "150.000 g",
    color: "#8cd135",
  },
  { name: "Sugars, brown", pct: 25, weight: "125.000 g", color: "#a8dd5e" },
  {
    name: "Wheat flour, white, all-purpose",
    pct: 20,
    weight: "100.000 g",
    color: "#59a3eb",
  },
  {
    name: "Candies, semisweet chocolate",
    pct: 15,
    weight: "75.000 g",
    color: "#3e5a7f",
  },
  {
    name: "Egg, whole, raw, fresh",
    pct: 10,
    weight: "50.000 g",
    color: "#18bc9c",
  },
];

export function FormulaRail({
  segments = COOKIE_FORMULA,
  tone = "dark",
  className = "",
  caption,
}: {
  segments?: Segment[];
  /** "dark" sits on the navy blocks, "light" on the white ones. */
  tone?: "dark" | "light";
  className?: string;
  caption?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  // The segments grow out of nothing to their share of the bar, left to right,
  // once — so the reader sees the formula resolve rather than just sit there.
  useGSAP(
    () => {
      const box = root.current;
      if (!box) return;
      const bars = box.querySelectorAll<HTMLElement>("[data-seg]");
      if (prefersReducedMotion()) {
        gsap.set(bars, { scaleX: 1 });
        return;
      }
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      observeOnce(box, () => {
        gsap.to(bars, {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
        });
      });
    },
    { scope: root },
  );

  const dark = tone === "dark";

  return (
    <div ref={root} className={className}>
      <div
        className={`flex items-center justify-between text-[11px] font-extrabold tracking-[.13em] uppercase ${
          dark ? "text-[#8fa3bd]" : "text-slate-400"
        }`}
      >
        <span>Formula</span>
        <span className={dark ? "text-lime-300" : "text-slate-700"}>
          100.000&thinsp;%
        </span>
      </div>

      {/* The bar itself */}
      <div
        className={`mt-[10px] flex h-[14px] w-full overflow-hidden rounded-full ${
          dark ? "bg-white/[.08]" : "bg-gray-100"
        }`}
      >
        {segments.map((seg) => (
          <span
            key={seg.name}
            data-seg=""
            title={`${seg.name} — ${seg.pct.toFixed(3)}%`}
            className="block h-full"
            style={{ width: `${seg.pct}%`, background: seg.color }}
          />
        ))}
      </div>

      {/* The legend doubles as the ingredient list */}
      <ul className="mt-[14px] flex flex-wrap gap-x-5 gap-y-[7px]">
        {segments.map((seg) => (
          <li
            key={seg.name}
            className={`flex items-center gap-[7px] text-[13px] leading-none ${
              dark ? "text-[#c4cedd]" : "text-slate-700"
            }`}
          >
            <span
              aria-hidden="true"
              className="block h-[9px] w-[9px] flex-none"
              style={{
                background: seg.color,
                clipPath:
                  "polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0% 50%)",
              }}
            />
            <span className="font-semibold">{seg.name}</span>
            <span
              className={`font-bold tabular-nums ${
                dark ? "text-white" : "text-slate-800"
              }`}
            >
              {seg.pct.toFixed(3)}%
            </span>
          </li>
        ))}
      </ul>

      {caption && (
        <p
          className={`mt-[14px] text-[13px] leading-[1.55] ${
            dark ? "text-[#8fa3bd]" : "text-slate-400"
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
