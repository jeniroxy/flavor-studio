"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/icon";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * The Features hero card. Same mechanic as the landing walkthrough, but with
 * six steps named after the six studios the page goes on to explain, and the
 * step header laid out icon-over-label so nothing truncates.
 */

const DWELL = 4.2;

const STEPS = [
  { icon: "chef-hat-one", label: "Recipes" },
  { icon: "doc-detail", label: "Nutrition" },
  { icon: "star", label: "Ideation" },
  { icon: "experiment", label: "Taste tests" },
  { icon: "folder-open", label: "Projects" },
  { icon: "peoples", label: "CRM" },
];

const RECIPE_ROWS = [
  { name: "Rolled oats", qty: "300 g", cost: "$0.48" },
  { name: "Almond butter", qty: "160 g", cost: "$2.08" },
  { name: "Honey, clover", qty: "120 g", cost: "$0.94" },
  { name: "Dried cranberries", qty: "90 g", cost: "$1.12" },
];

const NUTRIENTS = [
  {
    label: "Protein · 12 g",
    dv: "24%",
    width: "24%",
    color: "var(--color-teal-500)",
  },
  {
    label: "Dietary fiber · 4 g",
    dv: "14%",
    width: "14%",
    color: "var(--color-blue-500)",
  },
  {
    label: "Total fat · 9 g",
    dv: "12%",
    width: "12%",
    color: "var(--color-blue-400)",
  },
  {
    label: "Sodium · 105 mg",
    dv: "5%",
    width: "5%",
    color: "var(--color-amber-500)",
  },
];

const SENSORY = [
  {
    label: "Overall liking",
    score: "7.8 / 9",
    width: "87%",
    color: "var(--color-teal-500)",
  },
  {
    label: "Texture",
    score: "7.2 / 9",
    width: "80%",
    color: "var(--color-blue-500)",
  },
  {
    label: "Purchase intent",
    score: "72%",
    width: "72%",
    color: "var(--color-lime-500)",
  },
];

const TRENDS = [
  { title: "Fermented heat", img: "/assets/food-1.png" },
  { title: "Upcycled grains", img: "/assets/food-2.png" },
  { title: "Botanical sodas", img: "/assets/food-3.png" },
];

const GATES = [
  {
    stage: "Concept",
    item: "Oat clusters",
    tag: "Ideation",
    tagClass: "bg-violet-100 text-violet-500",
  },
  {
    stage: "Bench",
    item: "Protein cookie v4",
    tag: "Testing",
    tagClass: "bg-amber-100 text-[#a97d17]",
  },
  {
    stage: "Launch",
    item: "Granola bar v7",
    tag: "Finalized",
    tagClass: "bg-teal-100 text-[#0e8b73]",
  },
];

const REQUESTS = [
  {
    initials: "NB",
    badge: "bg-blue-200 text-blue-700",
    name: "Northbake Co.",
    detail: "Sample: protein cookie v4 · 24 units",
    status: "Sampling",
    statusClass: "bg-amber-100 text-[#a97d17]",
  },
  {
    initials: "PB",
    badge: "bg-lime-100 text-[#5c8f1c]",
    name: "Pura Beverage",
    detail: "Brief: botanical soda, reduced sugar",
    status: "In brief",
    statusClass: "bg-blue-200 text-blue-700",
  },
  {
    initials: "CC",
    badge: "bg-violet-100 text-violet-500",
    name: "Cascade Creamery",
    detail: "Reformulation: bilingual label refresh",
    status: "Delivered",
    statusClass: "bg-teal-100 text-[#0e8b73]",
  },
];

const panelBase =
  "absolute inset-0 flex flex-col gap-[10px] px-[18px] pt-4 pb-[18px]";
const panelHeading =
  "text-[10.5px] font-extrabold tracking-[.1em] uppercase text-slate-300";

export function FeaturesWalkthrough() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = root.current;
      if (!card) return;
      const q = (sel: string) => card.querySelector<HTMLElement>(sel);
      const panels = STEPS.map((_, i) => q(`[data-wpanel="${i}"]`));
      const bars = STEPS.map((_, i) => q(`[data-wbar="${i}"]`));
      const dots = STEPS.map((_, i) => q(`[data-wdot="${i}"]`));
      if (panels.some((p) => !p) || bars.some((b) => !b)) return;

      const cost = q("[data-wcost]");
      const pct = q("[data-wpct]");
      const tl = gsap.timeline({
        repeat: prefersReducedMotion() ? 0 : -1,
        repeatDelay: 1.4,
        delay: 0.7,
      });

      tl.set(panels as HTMLElement[], { autoAlpha: 0 }, 0);
      tl.set(bars as HTMLElement[], { scaleX: 0 }, 0);
      tl.set(
        dots as HTMLElement[],
        { backgroundColor: "rgba(255,255,255,.12)", color: "#c4cedd" },
        0,
      );

      STEPS.forEach((_, i) => {
        const at = 0.01 + i * DWELL;
        const panel = panels[i] as HTMLElement;
        tl.set(
          dots[i] as HTMLElement,
          { backgroundColor: "#18bc9c", color: "#ffffff" },
          at,
        );
        tl.fromTo(
          bars[i] as HTMLElement,
          { scaleX: 0 },
          { scaleX: 1, duration: DWELL - 0.2, ease: "none" },
          at,
        );
        tl.fromTo(
          panel,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          at,
        );

        const rows = panel.querySelectorAll("[data-wrow]");
        if (rows.length) {
          tl.fromTo(
            rows,
            { autoAlpha: 0, x: -14 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.34,
              stagger: 0.11,
              ease: "power2.out",
            },
            at + 0.3,
          );
        }

        if (i === 0 && cost) {
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: 4.62,
              duration: 1.7,
              ease: "power1.inOut",
              onUpdate: () => {
                cost.textContent = `$${o.v.toFixed(2)}`;
              },
              onComplete: () => {
                cost.textContent = "$4.62";
              },
            },
            at + 0.6,
          );
        }
        if (i === 3 && pct) {
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: 94,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                pct.textContent = `${Math.round(o.v)}%`;
              },
              onComplete: () => {
                pct.textContent = "94%";
              },
            },
            at + 0.6,
          );
        }

        tl.to(panel, { autoAlpha: 0, duration: 0.3 }, at + DWELL - 0.3);
        tl.set(
          dots[i] as HTMLElement,
          { backgroundColor: "#59a3eb" },
          at + DWELL - 0.05,
        );
      });

      tl.set(
        dots as HTMLElement[],
        { backgroundColor: "rgba(255,255,255,.12)", color: "#c4cedd" },
        STEPS.length * DWELL + 0.6,
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative min-w-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,.38)]">
        {/* stepper — icon above label so "Taste tests" never truncates */}
        <div className="grid grid-cols-6 gap-2 bg-slate-900 px-4 pt-[15px] pb-[14px]">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="flex min-w-0 flex-col items-center gap-[6px]"
            >
              <span
                data-wdot={i}
                className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[9px] bg-white/[.12] text-[#c4cedd] transition-[background] duration-200"
              >
                <Icon name={step.icon} className="text-[15px]" />
              </span>
              <span className="flex min-h-[23px] w-full items-center justify-center text-center text-[9.5px] leading-[1.2] font-bold text-balance text-[#dfe5ee]">
                {step.label}
              </span>
              <div className="h-[3px] w-full overflow-hidden rounded-[3px] bg-white/[.14]">
                <span
                  data-wbar={i}
                  className="block h-full w-full origin-left bg-linear-to-r from-teal-500 to-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[360px] bg-white">
          {/* 0 — recipes */}
          <div data-wpanel="0" className={panelBase}>
            <div className="flex items-center justify-between gap-[10px]">
              <span className={panelHeading}>Granola bar · v4</span>
              <span className="rounded-full bg-blue-100 px-3 py-[5px] text-[11.5px] font-bold text-blue-700">
                3 versions
              </span>
            </div>
            {RECIPE_ROWS.map((row) => (
              <div
                key={row.name}
                data-wrow=""
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 px-1 py-[9px] text-[12.5px]"
              >
                <span className="font-semibold text-slate-700">{row.name}</span>
                <span className="font-bold text-slate-800 tabular-nums">
                  {row.qty}
                </span>
                <span className="w-[52px] text-right text-slate-400 tabular-nums">
                  {row.cost}
                </span>
              </div>
            ))}
            <div
              data-wrow=""
              className="mt-auto flex items-center gap-3 rounded-xl bg-slate-700 px-[15px] py-3 text-white"
            >
              <span className="text-[10.5px] font-bold tracking-[.1em] text-[#c4cedd] uppercase">
                Cost / batch
              </span>
              <span
                data-wcost=""
                className="text-[18px] font-extrabold tabular-nums"
              >
                $0.00
              </span>
              <span className="ml-auto rounded-full bg-blue-500 px-[11px] py-1 text-[11px] font-bold">
                36 bars
              </span>
            </div>
          </div>

          {/* 1 — nutrition */}
          <div data-wpanel="1" className={`${panelBase} opacity-0`}>
            <div className={panelHeading}>Per serving · vs daily value</div>
            {NUTRIENTS.map((n) => (
              <div key={n.label} data-wrow="">
                <div className="mb-[5px] flex justify-between text-[12.5px]">
                  <span className="font-bold text-slate-800">{n.label}</span>
                  <span className="font-semibold text-slate-400">{n.dv}</span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-gray-100">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: n.width, background: n.color }}
                  />
                </div>
              </div>
            ))}
            <div data-wrow="" className="mt-auto flex flex-wrap gap-[7px]">
              <span className="rounded-full bg-teal-100 px-3 py-[5px] text-[11.5px] font-bold text-[#0e8b73]">
                Good source of protein
              </span>
              <span className="rounded-full bg-blue-200 px-3 py-[5px] text-[11.5px] font-bold text-blue-700">
                Low sodium
              </span>
            </div>
          </div>

          {/* 2 — ideation */}
          <div data-wpanel="2" className={`${panelBase} opacity-0`}>
            <div className={panelHeading}>Inspire · trending concepts</div>
            <div className="grid grid-cols-3 gap-[10px]">
              {TRENDS.map((t) => (
                <div
                  key={t.title}
                  data-wrow=""
                  className="overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_rgba(43,59,83,.1)]"
                >
                  {/* next/image rather than a CSS background: these render at
                      ~100px and the source art is up to 1024px wide. */}
                  <Image
                    src={t.img}
                    alt={t.title}
                    width={400}
                    height={312}
                    className="h-[104px] w-full bg-gray-100 object-cover"
                  />
                  <div className="px-[11px] py-[9px] text-[11.5px] font-bold text-slate-700">
                    {t.title}
                  </div>
                </div>
              ))}
            </div>
            <div
              data-wrow=""
              className="mt-auto rounded-xl bg-violet-100 px-[14px] py-[11px] text-[12px] leading-[1.5] font-semibold text-violet-500"
            >
              Clip any concept straight into a brief — it arrives with a starter
              formula.
            </div>
          </div>

          {/* 3 — taste tests */}
          <div data-wpanel="3" className={`${panelBase} opacity-0`}>
            <div className="flex items-center justify-between gap-[10px]">
              <span className={panelHeading}>Panel #212 · v3 vs v4</span>
              <span className="rounded-full bg-teal-100 px-3 py-[5px] text-[11.5px] font-bold text-[#0e8b73]">
                v4 wins
              </span>
            </div>
            {SENSORY.map((s) => (
              <div key={s.label} data-wrow="">
                <div className="mb-[5px] flex justify-between text-[12.5px]">
                  <span className="font-bold text-slate-800">{s.label}</span>
                  <span className="font-semibold text-slate-400">
                    {s.score}
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-gray-100">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: s.width, background: s.color }}
                  />
                </div>
              </div>
            ))}
            <div data-wrow="" className="mt-auto text-[12px] text-slate-400">
              48 panelists · blind triangle ·{" "}
              <span data-wpct="" className="font-bold text-slate-700">
                0%
              </span>{" "}
              completion
            </div>
          </div>

          {/* 4 — projects */}
          <div data-wpanel="4" className={`${panelBase} opacity-0`}>
            <div className={panelHeading}>Stage gates · Q3 launches</div>
            <div className="grid grid-cols-3 gap-[10px]">
              {GATES.map((gate) => (
                <div
                  key={gate.stage}
                  className="bg-gray-050 rounded-xl p-[10px]"
                >
                  <div className="mb-2 text-[9.5px] font-extrabold tracking-[.09em] text-slate-400 uppercase">
                    {gate.stage}
                  </div>
                  <div
                    data-wrow=""
                    className="mb-[7px] rounded-[9px] bg-white px-[9px] py-2 text-[11.5px] font-bold text-slate-700 shadow-[0_4px_12px_rgba(43,59,83,.07)]"
                  >
                    {gate.item}
                    <div className="mt-[6px]">
                      <span
                        className={`rounded-full px-3 py-[5px] text-[11.5px] font-bold ${gate.tagClass}`}
                      >
                        {gate.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              data-wrow=""
              className="mt-auto rounded-xl bg-blue-100 px-[14px] py-[11px] text-[12px] leading-[1.5] font-semibold text-blue-700"
            >
              Every gate is tied to the recipe it concerns — no status meetings
              required.
            </div>
          </div>

          {/* 5 — CRM */}
          <div data-wpanel="5" className={`${panelBase} opacity-0`}>
            <div className={panelHeading}>Open customer requests</div>
            {REQUESTS.map((req) => (
              <div
                key={req.name}
                data-wrow=""
                className="flex items-center gap-[11px] px-1 py-[9px]"
              >
                <span
                  className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full text-[10.5px] font-extrabold ${req.badge}`}
                >
                  {req.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-bold text-slate-800">
                    {req.name}
                  </span>
                  <span className="block text-[11.5px] text-slate-400">
                    {req.detail}
                  </span>
                </span>
                <span
                  className={`rounded-full px-3 py-[5px] text-[11.5px] font-bold ${req.statusClass}`}
                >
                  {req.status}
                </span>
              </div>
            ))}
            <div
              data-wrow=""
              className="bg-gray-050 mt-auto rounded-xl px-[14px] py-[11px] text-[12px] leading-[1.5] font-semibold text-slate-500"
            >
              Briefs, samples and reformulations sit next to the formulas that
              answer them.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
