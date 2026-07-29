"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Icon } from "@/components/icon";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * The hero's "live walkthrough" card: a four-step loop that cycles
 * Formulate → Cost & nutrition → AI Agent → FDA label. Each step fills its
 * progress bar over the dwell, swaps its panel in, and animates whatever that
 * panel contains — rows staggering, the cost ticking to $7.21, the agent's swap
 * suggestion knocking it down to $6.62, the label drawing itself.
 */

const DWELL = 4.4;

const STEPS = ["Formulate", "Cost & nutrition", "AI Agent", "FDA label"];

const INGREDIENTS = [
  { name: "Unbleached wheat flour", qty: "320", cost: "$0.84" },
  { name: "Butter, cultured 82%", qty: "225", cost: "$1.92" },
  { name: "Brown sugar, light", qty: "180", cost: "$0.61" },
  { name: "Dark chocolate 64%", qty: "210", cost: "$2.35" },
  { name: "Whey protein isolate", qty: "40", cost: "$1.49" },
];

export function WalkthroughCard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = root.current;
      if (!card) return;
      const q = (sel: string) => card.querySelector<HTMLElement>(sel);
      const panels = [0, 1, 2, 3].map((i) => q(`[data-wpanel="${i}"]`));
      const bars = [0, 1, 2, 3].map((i) => q(`[data-wbar="${i}"]`));
      const dots = [0, 1, 2, 3].map((i) => q(`[data-wdot="${i}"]`));
      if (panels.some((p) => !p) || bars.some((b) => !b)) return;
      // Narrowed above; GSAP's typings don't follow the `.some` guard.
      const panel = (i: number) => panels[i] as HTMLElement;
      const bar = (i: number) => bars[i] as HTMLElement;

      const costEl = q("[data-wcost]");
      const c1 = q("[data-wc1]");
      const c2 = q("[data-wc2]");
      const c3 = q("[data-wc3]");
      const cmp = q("[data-wcmp]");

      const reduce = prefersReducedMotion();
      const tl = gsap.timeline({
        repeat: reduce ? 0 : -1,
        repeatDelay: 1.6,
        delay: 0.8,
      });

      tl.set(panels as HTMLElement[], { autoAlpha: 0 }, 0);

      [0, 1, 2, 3].forEach((i) => {
        const pos = 0.01 + i * DWELL;
        tl.set(
          dots[i] as HTMLElement,
          { backgroundColor: "#59a3eb", color: "#fff" },
          pos,
        );
        tl.fromTo(
          bar(i),
          { scaleX: 0 },
          { scaleX: 1, duration: DWELL - 0.15, ease: "none" },
          pos,
        );
        tl.fromTo(
          panel(i),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          pos,
        );

        if (i === 0) {
          tl.fromTo(
            card.querySelectorAll("[data-wrow]"),
            { x: -18, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.35,
              stagger: 0.16,
              ease: "power2.out",
            },
            pos + 0.4,
          );
          const total = { v: 0 };
          tl.to(
            total,
            {
              v: 7.21,
              duration: 1.8,
              ease: "power1.inOut",
              onUpdate: () => {
                if (costEl) costEl.textContent = `$${total.v.toFixed(2)}`;
              },
            },
            pos + 0.6,
          );
        }

        if (i === 1) {
          const o = { a: 0, b: 0, c: 0 };
          tl.to(
            o,
            {
              a: 0.34,
              b: 210,
              c: 12,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (c1) c1.textContent = `$${o.a.toFixed(2)}`;
                if (c2) c2.textContent = String(Math.round(o.b));
                if (c3) c3.textContent = `${Math.round(o.c)} g`;
              },
            },
            pos + 0.5,
          );
        }

        if (i === 2) {
          tl.fromTo(
            q("[data-wq]") as HTMLElement,
            { autoAlpha: 0, x: 18 },
            { autoAlpha: 1, x: 0, duration: 0.4 },
            pos + 0.4,
          );
          tl.fromTo(
            q("[data-wa]") as HTMLElement,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            pos + 1.0,
          );
          tl.fromTo(
            q("[data-wcmpwrap]") as HTMLElement,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            pos + 1.6,
          );
          const p = { v: 7.21 };
          tl.to(
            p,
            {
              v: 6.62,
              duration: 1.0,
              ease: "power2.out",
              onUpdate: () => {
                if (cmp) cmp.textContent = `$${p.v.toFixed(2)}`;
              },
            },
            pos + 1.9,
          );
        }

        if (i === 3) {
          tl.fromTo(
            card.querySelectorAll("[data-wlrow]"),
            { autoAlpha: 0, x: -10 },
            { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.1 },
            pos + 0.4,
          );
          tl.fromTo(
            q("[data-wbadge]") as HTMLElement,
            { autoAlpha: 0, scale: 0.85 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
            pos + 1.6,
          );
        }

        // The last panel deliberately stays up between loops — leaving it
        // faded out left a blank white card at the top of every cycle.
        if (i < 3)
          tl.to(panel(i), { autoAlpha: 0, duration: 0.3 }, pos + DWELL - 0.3);
        tl.set(
          dots[i] as HTMLElement,
          { backgroundColor: "#18bc9c" },
          pos + DWELL - 0.05,
        );
      });

      tl.set(
        dots as HTMLElement[],
        { backgroundColor: "rgba(255,255,255,.14)", color: "#c4cedd" },
        4 * DWELL + 0.5,
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,.38)]">
        {/* stepper */}
        <div className="grid grid-cols-4 gap-3 bg-slate-900 px-[18px] pt-[14px] pb-[13px]">
          {STEPS.map((label, i) => (
            <div key={label} className="flex min-w-0 flex-col gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  data-wdot={i}
                  className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/[.14] text-[12px] font-extrabold text-[#c4cedd]"
                >
                  {i + 1}
                </span>
                <span className="overflow-hidden text-[12.5px] font-bold text-ellipsis whitespace-nowrap text-[#dfe5ee]">
                  {label}
                </span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-[3px] bg-white/[.14]">
                <span
                  data-wbar={i}
                  className="block h-full w-full origin-left scale-x-0 bg-linear-to-r from-blue-500 to-teal-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[340px] bg-white">
          {/* 1 — formulate */}
          <div
            data-wpanel="0"
            className="absolute inset-0 flex flex-col px-[18px] pt-[14px] pb-4 opacity-100"
          >
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-[14px] border-b border-gray-300 px-1 pt-1 pb-2 text-[10.5px] font-bold tracking-[.08em] text-slate-300 uppercase">
              <span>Ingredient</span>
              <span className="text-right">Qty (g)</span>
              <span className="w-[58px] text-right">Cost</span>
            </div>
            {INGREDIENTS.map((row, i) => (
              <div
                key={row.name}
                data-wrow=""
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-[14px] px-1 py-2 text-[13px] ${
                  i < INGREDIENTS.length - 1 ? "border-gray-150 border-b" : ""
                }`}
              >
                <span className="font-semibold text-slate-700">{row.name}</span>
                <span className="text-right font-bold text-slate-800 tabular-nums">
                  {row.qty}
                </span>
                <span className="w-[58px] text-right text-slate-500 tabular-nums">
                  {row.cost}
                </span>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-3 rounded-lg bg-slate-700 px-4 py-[11px] text-white">
              <span className="text-[10.5px] font-bold tracking-[.1em] text-[#c4cedd] uppercase">
                Cost / batch
              </span>
              <span
                data-wcost=""
                className="text-[19px] font-extrabold tabular-nums"
              >
                $0.00
              </span>
              <span className="ml-auto rounded-full bg-blue-500 px-3 py-1 text-[11px] font-bold">
                Yield 48
              </span>
            </div>
          </div>

          {/* 2 — cost & nutrition */}
          <div
            data-wpanel="1"
            className="absolute inset-0 flex flex-col gap-4 p-[18px] opacity-0"
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-[14px]">
              <div className="overflow-hidden rounded-xl border border-gray-300">
                <div className="bg-blue-500 px-3 py-[7px] text-[10.5px] font-bold tracking-[.09em] text-white uppercase">
                  Cost / serving
                </div>
                <div className="px-3 py-[14px]">
                  <span
                    data-wc1=""
                    className="text-2xl font-extrabold text-slate-800 tabular-nums"
                  >
                    $0.00
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-300">
                <div className="bg-blue-500 px-3 py-[7px] text-[10.5px] font-bold tracking-[.09em] text-white uppercase">
                  Calories
                </div>
                <div className="px-3 py-[14px]">
                  <span
                    data-wc2=""
                    className="text-2xl font-extrabold text-slate-800 tabular-nums"
                  >
                    0
                  </span>
                  <span className="text-[12px] font-semibold text-slate-400">
                    {" "}
                    kcal
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-300">
                <div className="bg-slate-700 px-3 py-[7px] text-[10.5px] font-bold tracking-[.09em] text-white uppercase">
                  Protein
                </div>
                <div className="px-3 py-[14px]">
                  <span
                    data-wc3=""
                    className="text-2xl font-extrabold text-teal-500 tabular-nums"
                  >
                    0 g
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-050 flex items-center gap-[10px] rounded-xl border border-blue-300 px-[15px] py-3 text-[13px] leading-[1.5] text-slate-700">
              <Icon
                name="lightning"
                className="flex-none text-[17px] text-blue-500"
              />
              Nutrition, allergens and cost recompute live on every change to
              the grid — no re-keying, ever.
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-[5px] text-[11.5px] font-bold text-[#a97d17]">
                Contains: wheat, milk
              </span>
              <span className="rounded-full bg-teal-100 px-3 py-[5px] text-[11.5px] font-bold text-[#0e8b73]">
                Good source of protein
              </span>
              <span className="rounded-full bg-blue-200 px-3 py-[5px] text-[11.5px] font-bold text-blue-700">
                Margin 71% @ $2.99
              </span>
            </div>
          </div>

          {/* 3 — AI Agent */}
          <div
            data-wpanel="2"
            className="absolute inset-0 flex flex-col gap-[13px] p-[18px] opacity-0"
          >
            <div
              data-wq=""
              className="self-end rounded-full bg-blue-500 px-[18px] py-[10px] text-[13.5px] font-semibold text-white"
            >
              Cut cost 8%, keep protein ≥ 12g
            </div>
            <div data-wa="" className="flex items-start gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-teal-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
                    fill="#ffffff"
                  />
                </svg>
              </span>
              <div className="pt-[3px] text-[13.5px] leading-[1.55] text-slate-700">
                Swap butter → high-oleic blend and lift whey by 3%. Allergens
                unchanged.
              </div>
            </div>
            <div
              data-wcmpwrap=""
              className="flex flex-wrap items-center gap-[14px] rounded-xl border border-gray-300 px-4 py-[13px]"
            >
              <span className="text-[10.5px] font-bold tracking-[.1em] text-slate-300 uppercase">
                Cost / batch
              </span>
              <span className="text-[17px] font-bold text-slate-300 tabular-nums line-through">
                $7.21
              </span>
              <Icon name="arrow-right" className="text-[14px] text-slate-400" />
              <span
                data-wcmp=""
                className="text-[21px] font-extrabold text-teal-500 tabular-nums"
              >
                $7.21
              </span>
              <span className="ml-auto rounded-full bg-teal-100 px-[11px] py-1 text-[11.5px] font-extrabold text-[#0e8b73]">
                −8.2%
              </span>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              <span className="cursor-pointer rounded-full border border-blue-500 px-[15px] py-[7px] text-[12.5px] font-bold text-blue-600">
                Apply to v5 draft
              </span>
              <span className="cursor-pointer rounded-full border border-gray-300 px-[15px] py-[7px] text-[12.5px] font-bold text-slate-500">
                Keep both versions
              </span>
            </div>
          </div>

          {/* 4 — FDA label */}
          <div
            data-wpanel="3"
            className="absolute inset-0 flex flex-wrap items-center justify-center gap-5 px-[18px] py-4 opacity-0"
          >
            <div className="w-[min(228px,100%)] rounded-[3px] border-2 border-black bg-white px-3 py-[10px] font-[Helvetica,Arial,sans-serif] text-black">
              <div
                data-wlrow=""
                className="text-[19px] leading-none font-black"
              >
                Nutrition Facts
              </div>
              <div
                data-wlrow=""
                className="flex justify-between border-b-[7px] border-black py-[3px] text-[10.5px] font-extrabold"
              >
                <span>Serving size</span>
                <span>1 cookie (34g)</span>
              </div>
              <div
                data-wlrow=""
                className="flex items-end justify-between border-b-4 border-black pb-[2px]"
              >
                <span className="text-[14px] font-black">Calories</span>
                <span className="text-[21px] font-black">190</span>
              </div>
              <div
                data-wlrow=""
                className="flex justify-between border-b border-black py-[2px] text-[10.5px]"
              >
                <span>
                  <strong>Total Fat</strong> 8g
                </span>
                <strong>10%</strong>
              </div>
              <div
                data-wlrow=""
                className="flex justify-between border-b border-black py-[2px] text-[10.5px]"
              >
                <span>
                  <strong>Sodium</strong> 95mg
                </span>
                <strong>4%</strong>
              </div>
              <div
                data-wlrow=""
                className="flex justify-between border-b border-black py-[2px] text-[10.5px]"
              >
                <span>
                  <strong>Total Carb.</strong> 26g
                </span>
                <strong>9%</strong>
              </div>
              <div
                data-wlrow=""
                className="flex justify-between py-[2px] text-[10.5px]"
              >
                <span>
                  <strong>Protein</strong> 5g
                </span>
                <span />
              </div>
            </div>
            <div className="flex min-w-[150px] flex-col gap-[10px]">
              <span
                data-wbadge=""
                className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-100 px-[15px] py-2 text-[12.5px] font-extrabold text-[#0e8b73]"
              >
                <Icon name="check-one" className="text-[15px]" />
                Passes FDA review
              </span>
              <span className="max-w-[22ch] text-[12.5px] leading-[1.55] text-slate-500">
                FDA 2016 format, bilingual CFIA and ingredient statement —
                print-ready.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
