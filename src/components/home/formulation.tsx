"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { CountUp, Reveal, RevealStagger } from "@/components/reveal";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/* Each feature row gets a meaningful icon rather than a row of check marks. */
const POINTS = [
  {
    icon: "chart-histogram",
    badge: "bg-blue-200",
    iconColor: "text-blue-700",
    title: "Live cost roll-up",
    body: "batch cost, serving cost and retail margin update on every keystroke.",
  },
  {
    icon: "caution",
    badge: "bg-amber-100",
    iconColor: "text-[#a97d17]",
    title: "Allergen watch",
    body: "flags the big-9 the moment a risky ingredient lands in the grid.",
  },
  {
    icon: "branch-one",
    badge: "bg-teal-100",
    iconColor: "text-[#0e8b73]",
    title: "Version pills",
    body: "branch v4 from v3, taste-test both, promote the winner to production.",
  },
];

const ROWS = [
  { name: "Oat flour, gluten-free", qty: "240 g", cost: "$0.72", hot: false },
  { name: "Almond butter, roasted", qty: "160 g", cost: "$2.08", hot: true },
  { name: "Maple syrup, grade A", qty: "110 g", cost: "$1.36", hot: false },
];

export function Formulation() {
  const grid = useRef<HTMLDivElement>(null);

  // The ingredient rows slide in from the left, once, when the grid appears.
  useGSAP(
    () => {
      const box = grid.current;
      if (!box || prefersReducedMotion()) return;
      const rows = box.querySelectorAll("[data-trow]");
      gsap.set(rows, { x: -26, opacity: 0 });
      observeOnce(box, () => {
        gsap.to(rows, {
          x: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.12,
        });
      });
    },
    { scope: grid },
  );

  return (
    <Block
      id="product"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <div>
          <SectionLabel>Recipe formulation</SectionLabel>
          <SectionHeading>A recipe grid that thinks ahead.</SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[50ch] text-[16px] leading-[1.65] text-slate-500"
          >
            Every ingredient you add recalculates nutrition, allergens, yield
            and cost — live. No spreadsheets, no re-keying, no version chaos.
          </Reveal>

          <RevealStagger
            stagger={0.12}
            delay={0.18}
            className="mt-7 flex flex-col gap-3"
          >
            {POINTS.map((point) => (
              <div
                key={point.title}
                className="flex items-center gap-[14px] rounded-2xl border border-gray-300 bg-white px-[18px] py-4 shadow-[0_3px_12px_rgba(43,59,83,.05)] transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(43,59,83,.1)]"
              >
                <span
                  className={`flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl ${point.badge}`}
                >
                  <Icon
                    name={point.icon}
                    className={`text-[20px] ${point.iconColor}`}
                  />
                </span>
                <div className="text-[14.5px] leading-[1.55] text-slate-700">
                  <strong className="font-bold text-slate-800">
                    {point.title}
                  </strong>{" "}
                  — {point.body}
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>

        <Reveal delay={0.1}>
          <div ref={grid} className="grid grid-cols-1 gap-4">
            <div className="overflow-hidden rounded-[18px] border border-gray-300 bg-white shadow-[0_14px_40px_rgba(43,59,83,.1)]">
              <div className="flex items-center gap-2 border-b border-gray-300 px-4 py-3">
                <span className="rounded-full bg-blue-500 px-[13px] py-1 text-[11.5px] font-bold text-white">
                  v4 · Testing
                </span>
                <span className="rounded-full bg-gray-100 px-[13px] py-1 text-[11.5px] font-bold text-slate-500">
                  v3
                </span>
                <span className="rounded-full bg-gray-100 px-[13px] py-1 text-[11.5px] font-bold text-slate-500">
                  v2
                </span>
                <span className="ml-auto inline-flex items-center gap-[6px] rounded-full bg-amber-100 px-3 py-1 text-[11.5px] font-bold text-[#a97d17]">
                  <Icon name="attention" className="text-[13px]" />
                  Contains: wheat, milk
                </span>
              </div>
              {ROWS.map((row) => (
                <div
                  key={row.name}
                  data-trow=""
                  className={`border-gray-150 grid grid-cols-[1fr_auto_auto] items-center gap-x-[14px] border-b px-4 py-[10px] text-[13.5px] ${
                    row.hot ? "bg-blue-100" : ""
                  }`}
                >
                  <span className="font-semibold text-slate-700">
                    {row.name}
                  </span>
                  <span className="font-bold text-slate-800 tabular-nums">
                    {row.qty}
                  </span>
                  <span className="w-[56px] text-right text-slate-400 tabular-nums">
                    {row.cost}
                  </span>
                </div>
              ))}
              <div
                data-trow=""
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-[14px] px-4 py-[10px] text-[13.5px]"
              >
                <span className="font-bold text-blue-500">
                  + Add ingredient
                </span>
                <span />
                <span />
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
              <div className="overflow-hidden rounded-[18px] border border-gray-300 bg-white shadow-[0_8px_24px_rgba(43,59,83,.07)]">
                <div className="bg-blue-500 px-[14px] py-2 text-[11px] font-bold tracking-[.1em] text-white uppercase">
                  Yield
                </div>
                <div className="p-[14px]">
                  <span className="text-[26px] font-extrabold text-slate-800 tabular-nums">
                    <CountUp to={36} />
                  </span>
                  <span className="text-[13px] font-semibold text-slate-400">
                    {" "}
                    bars / batch
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-gray-300 bg-white shadow-[0_8px_24px_rgba(43,59,83,.07)]">
                <div className="bg-blue-500 px-[14px] py-2 text-[11px] font-bold tracking-[.1em] text-white uppercase">
                  Cost / serving
                </div>
                <div className="p-[14px]">
                  <span className="text-[26px] font-extrabold text-slate-800 tabular-nums">
                    <CountUp to={0.34} decimals={2} prefix="$" />
                  </span>
                </div>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-gray-300 bg-white shadow-[0_8px_24px_rgba(43,59,83,.07)]">
                <div className="bg-slate-700 px-[14px] py-2 text-[11px] font-bold tracking-[.1em] text-white uppercase">
                  Margin @ $2.99
                </div>
                <div className="p-[14px]">
                  <span className="text-[26px] font-extrabold text-teal-500 tabular-nums">
                    <CountUp to={71} suffix="%" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Block>
  );
}
