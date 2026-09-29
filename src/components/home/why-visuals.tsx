"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { productAssets } from "@/lib/assets";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * The small pictures inside the Why cards. Each one acts out its reason once,
 * the first time it scrolls into view, then holds its end state. The end state
 * is the picture on its own, so reduced-motion readers get it straight away.
 *
 * Everything shown is either a real screenshot from lib/assets or a name the
 * site already uses: the modules, the six teams from the Teams tabs, and the
 * app's own address. No invented numbers.
 */

/** Sets data-in="true" on the first scroll into view; children animate off it. */
function Stage({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.dataset.in = "true";
    };
    if (prefersReducedMotion()) return play();
    return observeOnce(el, play);
  }, []);
  return (
    <div
      ref={ref}
      data-in="false"
      aria-hidden="true"
      className={`group relative overflow-hidden rounded-[var(--radius-md)] bg-panel ${className}`}
    >
      {children}
    </div>
  );
}

const EASE = "ease-[var(--ease-out-soft)] motion-reduce:transition-none";

/* ------------------------------------------------------------------ 01 */

const FILES = [
  { icon: "excel-one", name: "Formulas.xlsx", tilt: -4 },
  { icon: "excel-one", name: "Nutrition.xlsx", tilt: 3 },
  { icon: "file-pdf-one", name: "Supplier specs.pdf", tilt: -2 },
  { icon: "excel-one", name: "Costing.xlsx", tilt: 5 },
];

const MODULES = [
  { icon: "chef-hat-one", name: "Recipes" },
  { icon: "leaves", name: "Ingredients" },
  { icon: "calculator-one", name: "Costing" },
  { icon: "doc-detail", name: "Nutrition labels" },
  { icon: "experiment", name: "Taste Tests" },
  { icon: "folder-open", name: "Projects" },
];

/** Four loose files are struck off as the modules that replace them check in. */
export function SuiteVisual() {
  return (
    <Stage className="flex min-h-[240px] items-center gap-3 p-4 sm:gap-5 sm:p-5">
      <ul className="flex w-[44%] flex-col gap-2.5">
        {FILES.map((f, i) => (
          <li
            key={f.name}
            style={{
              transitionDelay: `${i * 140}ms`,
              ["--tilt" as string]: `${f.tilt}deg`,
            }}
            className={`flex rotate-[var(--tilt)] items-center gap-2 rounded-[var(--radius-sm)] border border-hairline bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(32,32,32,0.06)] transition-[rotate,translate,background-color] duration-500 group-data-[in=true]:translate-x-1 group-data-[in=true]:rotate-0 group-data-[in=true]:border-dashed group-data-[in=true]:border-panel-3 group-data-[in=true]:bg-panel-2 group-data-[in=true]:shadow-none ${EASE}`}
          >
            <Icon
              name={f.icon}
              className="shrink-0 text-[16px] text-green-600 transition-colors group-data-[in=true]:text-ink-3"
            />
            <span className="truncate text-[12px] font-bold text-ink-2 decoration-ink-3 decoration-[1.5px] transition-[text-decoration-color] group-data-[in=true]:line-through">
              {f.name}
            </span>
          </li>
        ))}
      </ul>

      <Icon
        name="right"
        className="hidden shrink-0 sm:block text-[20px] text-ink-3 opacity-0 transition-opacity delay-500 duration-500 group-data-[in=true]:opacity-100 motion-reduce:transition-none"
      />

      <div className="flex-1 rounded-[var(--radius-md)] bg-white p-3 shadow-[0_8px_24px_rgba(22,34,58,0.10)]">
        <p className="font-display px-1 pb-2 text-[13px] font-bold text-ink">
          Flavor Studio
        </p>
        <ul className="flex flex-col gap-1">
          {MODULES.map((m, i) => (
            <li
              key={m.name}
              style={{ transitionDelay: `${600 + i * 90}ms` }}
              className={`flex items-center gap-2 rounded-[6px] px-1 py-[3px] opacity-30 transition-opacity duration-300 group-data-[in=true]:opacity-100 ${EASE}`}
            >
              <Icon name={m.icon} className="text-[14px] text-blue-700" />
              <span className="flex-1 text-[12px] font-bold text-ink-2">
                {m.name}
              </span>
              <Icon name="check" className="text-[13px] text-green-600" />
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ 02 */

/*
 * The real Recipe grid, with a pointer that travels to "Add Ingredient". The
 * pointer's positions are percentages of recipe-grid.png (1339×498); the
 * button's label sits at roughly x 70–170, y 402.
 */
export function EasyVisual() {
  const shot = productAssets.recipeCost;
  return (
    <Stage className="h-[270px]">
      <div className="absolute top-4 left-4 w-[700px]">
        <div className="relative aspect-[1339/498] overflow-hidden rounded-[var(--radius-sm)] border border-hairline bg-white">
          <Image
            src={shot.src}
            alt=""
            fill
            sizes="700px"
            className="object-cover object-left-top"
          />
          {/* The ring around "Add Ingredient", drawn once the pointer lands. */}
          <span className="absolute top-[74%] left-[1.4%] h-[13%] w-[12.4%] scale-90 rounded-[999px] border-2 border-lime-600 opacity-0 transition-[opacity,scale] delay-[1300ms] duration-300 group-data-[in=true]:scale-100 group-data-[in=true]:opacity-100 motion-reduce:transition-none" />
          <svg
            viewBox="0 0 16 20"
            className={`absolute top-[26%] left-[58%] h-[22px] w-[18px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] transition-[top,left] delay-300 duration-1000 group-data-[in=true]:top-[82%] group-data-[in=true]:left-[10%] ${EASE}`}
          >
            <path
              d="M1 1v15.5l4.2-3.9 2.7 6 2.6-1.2-2.7-5.9H14z"
              fill="#202020"
              stroke="#fff"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ 03 */

/* The six teams from the home page's Teams tabs, placed around one recipe. */
const TEAMS = [
  { name: "R&D", x: 18, y: 18 },
  { name: "Regulatory", x: 82, y: 18 },
  { name: "Costing", x: 10, y: 52 },
  { name: "Sales", x: 90, y: 52 },
  { name: "Sensory & QA", x: 22, y: 86 },
  { name: "Leadership", x: 78, y: 86 },
];

/** Every team is wired to the same recipe record, one after another. */
export function CollabVisual() {
  return (
    <Stage className="h-[220px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {TEAMS.map((t, i) => (
          <line
            key={t.name}
            x1="50"
            y1="52"
            x2={t.x}
            y2={t.y}
            pathLength={1}
            style={{ transitionDelay: `${200 + i * 120}ms` }}
            className={`stroke-blue-400 [stroke-dasharray:1] [stroke-dashoffset:1] [stroke-width:0.45] transition-[stroke-dashoffset] duration-500 group-data-[in=true]:[stroke-dashoffset:0] ${EASE}`}
          />
        ))}
      </svg>

      <div className="absolute top-[52%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[var(--radius-sm)] bg-white px-3 py-2 shadow-[0_8px_24px_rgba(22,34,58,0.12)]">
        <Icon name="chef-hat-one" className="text-[16px] text-blue-700" />
        <span className="text-[12px] font-bold whitespace-nowrap text-ink">
          Recipe
        </span>
        <span className="rounded-[999px] bg-blue-700 px-2 py-[1px] text-[11px] font-bold text-white">
          Final
        </span>
      </div>

      {TEAMS.map((t, i) => (
        <span
          key={t.name}
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            transitionDelay: `${450 + i * 120}ms`,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 scale-95 rounded-[var(--radius-sm)] border border-hairline bg-white px-2 py-1 text-[11px] font-bold whitespace-nowrap text-ink-2 opacity-0 transition-[opacity,scale] duration-300 group-data-[in=true]:scale-100 group-data-[in=true]:opacity-100 ${EASE}`}
        >
          {t.name}
        </span>
      ))}
    </Stage>
  );
}

/* ------------------------------------------------------------------ 04 */

const DEVICES = [
  { name: "Laptop", w: "w-[54%]", aspect: "aspect-[16/10]", radius: "8px" },
  { name: "Tablet", w: "w-[25%]", aspect: "aspect-[3/4]", radius: "10px" },
  { name: "Phone", w: "w-[15%]", aspect: "aspect-[9/19]", radius: "12px" },
];

/** One address, three screens, the same label on each. */
export function AnywhereVisual() {
  const label = productAssets.nutritionLabelUs;
  return (
    <Stage className="flex min-h-[240px] flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center gap-2 self-start rounded-[999px] border border-hairline bg-white py-1.5 pr-4 pl-3">
        <Icon name="lock" className="text-[13px] text-green-600" />
        <span className="text-[12px] font-bold text-ink-2">
          app.flavorstudio.com
        </span>
      </div>
      <div className="flex flex-1 items-end justify-center gap-[3%]">
        {DEVICES.map((d, i) => (
          <div
            key={d.name}
            style={{ transitionDelay: `${150 + i * 150}ms` }}
            className={`${d.w} translate-y-4 opacity-0 transition-[opacity,translate] duration-500 group-data-[in=true]:translate-y-0 group-data-[in=true]:opacity-100 ${EASE}`}
          >
            <div
              className={`relative ${d.aspect} overflow-hidden border-[3px] border-[#16223a] bg-white`}
              style={{ borderRadius: d.radius }}
            >
              <Image
                src={label.src}
                alt=""
                fill
                sizes="200px"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-1.5 text-center text-[11px] font-bold text-ink-2">
              {d.name}
            </p>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ 05 */

/* The three stages and two channels named in the reason's own sentence. */
const STOPS = ["Sign up", "Ramp up", "On-going use"];
const CHANNELS = [
  { icon: "phone-telephone", name: "Phone" },
  { icon: "message", name: "Online" },
];

/** A support line that fills from sign-up to everyday use. */
export function ServiceVisual() {
  return (
    <Stage className="flex min-h-[200px] flex-col justify-center gap-7 px-5 py-6 sm:px-7">
      <div className="relative">
        <div className="absolute top-[7px] right-[8px] left-[8px] h-[2px] bg-panel-3" />
        <div
          className={`absolute top-[7px] left-[8px] h-[2px] w-0 bg-blue-600 transition-[width] delay-200 duration-[1400ms] group-data-[in=true]:w-[calc(100%-16px)] ${EASE}`}
        />
        <ol className="relative flex justify-between">
          {STOPS.map((s, i) => (
            <li
              key={s}
              className={`flex flex-col gap-2.5 ${i === 0 ? "items-start" : i === STOPS.length - 1 ? "items-end" : "items-center"}`}
            >
              <span
                style={{ transitionDelay: `${200 + i * 650}ms` }}
                className={`h-4 w-4 rounded-full border-2 border-panel-3 bg-white transition-colors duration-300 group-data-[in=true]:border-blue-600 group-data-[in=true]:bg-blue-600 ${EASE}`}
              />
              <span className="text-[12px] font-bold whitespace-nowrap text-ink sm:text-[13px]">
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <ul className="flex flex-wrap gap-2">
        {CHANNELS.map((c) => (
          <li
            key={c.name}
            className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-hairline bg-white px-3 py-1.5"
          >
            <Icon name={c.icon} className="text-[15px] text-blue-700" />
            <span className="text-[12px] font-bold text-ink-2">{c.name}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
