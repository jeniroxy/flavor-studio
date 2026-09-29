"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/icon";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import { COMPARE_ANSWER, LIST_ANSWER, WHATIF_ANSWER } from "./agent-data";

/*
 * The three answers again, this time drawn as what they mean rather than as
 * the panel prints them. Every value is the design's (agent-data.ts).
 *
 * - LIST: the sentence split into the two filters the Agent's steps name,
 *   then the 13 ingredients as a honeycomb (the site's hexagon, from the logo),
 *   one cluster per group.
 * - COMPARE: a butterfly chart, Recipe A left and Recipe B right, so every
 *   nutrient reads as a pair. Units differ row to row, so each row is scaled
 *   to its larger value, and the chart says so.
 * - WHAT-IF: a waterfall from the current batch to the new one, zero-based,
 *   so the $0.36 of flour is as small as it really is.
 *
 * Motion: each chart draws once, the first time it is seen, from its
 * baseline, so the eye lands on the size of the difference. Reduced motion
 * draws it finished. Hover or focus on a row or column gives its numbers.
 *
 * Colours: A lime-700 / B blue-500 passed the palette validator (CVD ΔE 24.9);
 * B sits under 3:1 on white, so every bar carries its value as text.
 */

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observeOnce(el, () => {
      setStill(prefersReducedMotion());
      setSeen(true);
    });
  }, []);
  return { ref, seen, still };
}

/* -------------------------------------------------------------- LIST */

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
const TINT: Record<string, string> = {
  flour: "#fcf3da",
  grain: "#deedfb",
  veg: "#e3f7f2",
};

/** Rows of a small honeycomb: 5 items as 3 + 2, 3 items as 2 + 1. */
function rowsOf(items: string[]) {
  const first = Math.ceil(items.length / 2);
  return [items.slice(0, first), items.slice(first)];
}

export function QueryToFilters() {
  return (
    <div className="font-display text-[clamp(22px,2.6vw,32px)] leading-[1.35] font-bold tracking-[-0.02em] text-ink">
      &ldquo;Show me all ingredients with{" "}
      <span className="underline decoration-[#efc051] decoration-[6px] underline-offset-[6px]">
        no soy allergen
      </span>
      , categorized as{" "}
      <span className="underline decoration-[#59a3eb] decoration-[6px] underline-offset-[6px]">
        starches
      </span>
      &rdquo;
      <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-[13px] font-normal tracking-normal">
        <span className="text-ink-2">becomes</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#efc051] bg-amber-100 px-3 py-1.5 text-ink">
          <Icon name="close-one" className="text-[14px]" /> Allergen · soy
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#59a3eb] bg-blue-100 px-3 py-1.5 text-ink">
          <Icon name="filter" className="text-[14px]" /> Category · starches
        </span>
      </div>
    </div>
  );
}

export function IngredientHive() {
  const { ref, seen, still } = useSeen<HTMLDivElement>();
  let n = 0;
  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center gap-x-[clamp(16px,3vw,40px)] gap-y-8 lg:justify-between"
      style={{ "--hw": "clamp(86px, 23vw, 112px)" } as CSSProperties}
    >
      {LIST_ANSWER.groups.map((g) => (
        <figure key={g.name} className="m-0 flex flex-col items-center">
          <figcaption className="mb-3 font-mono text-[12px] tracking-[.08em] text-ink-2 uppercase">
            {g.name} · {g.items.length}
          </figcaption>
          <ul className="m-0 list-none p-0">
            {rowsOf(g.items).map((row, ri) => (
              <li
                key={ri}
                className="flex justify-center gap-[4px]"
                style={{ marginTop: ri ? "calc(var(--hw) * -0.26)" : 0 }}
              >
                {row.map((item) => {
                  const i = n++;
                  return (
                    <span
                      key={item}
                      className="flex items-center justify-center px-2.5 text-center text-[clamp(10.5px,1vw,12px)] leading-[1.25] font-semibold text-ink"
                      style={{
                        width: "var(--hw)",
                        aspectRatio: "1 / 1.1547",
                        clipPath: HEX,
                        background: TINT[g.tag],
                        opacity: seen ? 1 : 0,
                        transform: seen ? "none" : "scale(.6)",
                        transition: still
                          ? "none"
                          : `opacity .4s ease ${i * 70}ms, transform .5s var(--ease-out-soft) ${i * 70}ms`,
                      }}
                    >
                      {item}
                    </span>
                  );
                })}
              </li>
            ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- COMPARE */

const A = "#5c822b";
const B = "#59a3eb";
const num = (v: string) => parseFloat(v);
const unit = (v: string) => v.replace(/[\d.]/g, "");

function gapText(nutrient: string, a: string, b: string) {
  const d = num(a) - num(b);
  const u = unit(a) || (nutrient === "Calories" ? " cal" : "");
  return `A ${d > 0 ? "+" : "−"}${Math.abs(d)}${u}`;
}

export function CompareButterfly() {
  const { ref, seen, still } = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const [table, setTable] = useState(false);
  const rows = COMPARE_ANSWER.rows;

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-[3px]" style={{ background: A }} />
            <b>Recipe A</b> Protein Brownie v3
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-[3px]" style={{ background: B }} />
            <b>Recipe B</b> Classic Fudge Brownie
          </span>
        </div>
        <button
          type="button"
          aria-pressed={table}
          onClick={() => setTable((t) => !t)}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-hairline px-4 text-[13px] font-semibold text-ink hover:bg-panel"
        >
          <Icon name={table ? "chart-histogram" : "table-file"} className="text-[14px]" />
          {table ? "Show as chart" : "Show as table"}
        </button>
      </div>

      {table ? (
        <table className="mt-6 w-full border-collapse text-[14px]">
          <caption className="sr-only">Nutrition per 40g serving, Recipe A and Recipe B</caption>
          <thead>
            <tr className="border-b border-hairline text-left text-ink-2">
              <th scope="col" className="py-2 font-semibold">Nutrient</th>
              <th scope="col" className="py-2 font-semibold">Recipe A</th>
              <th scope="col" className="py-2 font-semibold">Recipe B</th>
              <th scope="col" className="py-2 text-right font-semibold">Gap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.nutrient} className={`border-b border-hairline ${r.gap ? "font-bold" : ""}`}>
                <th scope="row" className="py-2 text-left font-semibold">{r.nutrient}</th>
                <td className="py-2">{r.a}</td>
                <td className="py-2">{r.b}</td>
                <td className="py-2 text-right font-mono">{gapText(r.nutrient, r.a, r.b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-6 flex flex-col gap-1">
          {rows.map((r, i) => {
            const max = Math.max(num(r.a), num(r.b));
            const wa = (num(r.a) / max) * 100;
            const wb = (num(r.b) / max) * 100;
            const label = `${r.nutrient}: Recipe A ${r.a}, Recipe B ${r.b}, ${gapText(r.nutrient, r.a, r.b)}`;
            const grow = (w: number) => ({
              width: `${w}%`,
              transform: seen ? "scaleX(1)" : "scaleX(0)",
              transition: still ? "none" : `transform .7s var(--ease-out-soft) ${i * 80}ms`,
            });
            return (
              <div
                key={r.nutrient}
                tabIndex={0}
                aria-label={label}
                onMouseEnter={() => setHover(r.nutrient)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.nutrient)}
                onBlur={() => setHover(null)}
                className={`relative grid grid-cols-[minmax(0,1fr)_clamp(92px,14vw,140px)_minmax(0,1fr)] items-center gap-2 rounded-[10px] px-2 py-2.5 transition-colors outline-offset-2 ${
                  r.gap ? "bg-lime-100" : hover === r.nutrient ? "bg-panel" : ""
                }`}
              >
                {/* A grows leftward from the centre line. */}
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-[13px] font-semibold text-ink">{r.a}</span>
                  <div className="flex h-[14px] w-[78%] justify-end">
                    <span
                      className="block h-full origin-right rounded-l-[4px]"
                      style={{ background: A, ...grow(wa) }}
                    />
                  </div>
                </div>
                <div className="text-center text-[13.5px] leading-tight font-semibold text-ink">
                  {r.nutrient}
                  {r.gap ? (
                    <span className="mt-0.5 block font-mono text-[11px] font-bold text-[#3f5a1d]">
                      {gapText(r.nutrient, r.a, r.b)}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-[14px] w-[78%]">
                    <span
                      className="block h-full origin-left rounded-r-[4px]"
                      style={{ background: B, ...grow(wb) }}
                    />
                  </div>
                  <span className="font-mono text-[13px] font-semibold text-ink">{r.b}</span>
                </div>
                {hover === r.nutrient ? (
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 rounded-[8px] bg-night px-3 py-1.5 text-[12px] whitespace-nowrap text-white shadow-float"
                  >
                    {r.nutrient} · A {r.a} · B {r.b} · {gapText(r.nutrient, r.a, r.b)}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-4 text-[13px] leading-[1.5] text-ink-2">
        Per 40g serving. Units differ from row to row, so each row is scaled to
        the larger of its two values. Highlighted rows are the ones the Agent
        flagged as the biggest gaps.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------- WHAT-IF */

type Col = {
  label: string;
  from: number;
  to: number;
  kind: "total" | "up" | "down" | "flat";
  value: string;
  detail: string;
};

const W = WHATIF_ANSWER;
const money = (v: string) => parseFloat(v.replace(/[^\d.]/g, ""));
const whey = W.materials[0];
const flour = W.materials[1];
const start = money(W.total.now);
const afterWhey = start + money(whey.delta);
const end = money(W.total.next);

const COLS: Col[] = [
  { label: "Current batch", from: 0, to: start, kind: "total", value: W.total.now, detail: "Raw materials at 8g protein a serving" },
  { label: "Whey protein isolate", from: start, to: afterWhey, kind: "up", value: whey.delta, detail: `${whey.now} → ${whey.next}` },
  { label: "All-purpose flour", from: afterWhey, to: end, kind: "down", value: flour.delta, detail: `${flour.now} → ${flour.next}` },
  { label: "Cocoa, sugar, butter, eggs", from: end, to: end, kind: "flat", value: "$0.00", detail: "4 other materials unchanged" },
  { label: "New batch", from: 0, to: end, kind: "total", value: W.total.next, detail: `${W.total.delta} a batch at 10g protein` },
];
const TOP = 60;

export function CostWaterfall() {
  const { ref, seen, still } = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const colour = { total: "#9db0c9", up: "#ff6b6b", down: "#a8dd5e", flat: "#b4b4b4" };

  return (
    <div ref={ref}>
      <div className="relative h-[clamp(240px,30vw,320px)]">
        {/* gridlines at $0, $20, $40, $60 */}
        {[0, 20, 40, 60].map((g) => (
          <div
            key={g}
            aria-hidden="true"
            className="absolute inset-x-0 border-t border-white/[.07]"
            style={{ bottom: `${(g / TOP) * 100}%` }}
          >
            <span className="absolute -top-2.5 left-0 font-mono text-[11px] text-[#8f8f8f]">
              ${g}
            </span>
          </div>
        ))}
        <div className="absolute inset-y-0 right-0 left-9 grid grid-cols-5 gap-[clamp(6px,2vw,28px)]">
          {COLS.map((c, i) => {
            const lo = Math.min(c.from, c.to);
            const hi = Math.max(c.from, c.to);
            const h = Math.max(((hi - lo) / TOP) * 100, c.kind === "flat" ? 0 : 0.8);
            return (
              <div
                key={c.label}
                tabIndex={0}
                aria-label={`${c.label}: ${c.value}. ${c.detail}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="relative h-full rounded-[6px] outline-offset-2"
              >
                {c.kind === "flat" ? (
                  <span
                    className="absolute inset-x-1 border-t-2 border-dashed"
                    style={{ bottom: `${(c.to / TOP) * 100}%`, borderColor: colour.flat }}
                  />
                ) : (
                  <span
                    className={`absolute inset-x-0 block ${c.kind === "total" ? "rounded-t-[4px]" : "rounded-[3px]"}`}
                    style={{
                      bottom: `${(lo / TOP) * 100}%`,
                      height: `${h}%`,
                      background: colour[c.kind],
                      transformOrigin: c.kind === "down" ? "top" : "bottom",
                      transform: seen ? "scaleY(1)" : "scaleY(0)",
                      transition: still ? "none" : `transform .7s var(--ease-out-soft) ${i * 220}ms`,
                    }}
                  />
                )}
                <span
                  className="absolute inset-x-0 text-center font-mono text-[clamp(11px,1.2vw,14px)] font-bold text-white"
                  style={{
                    bottom: `calc(${(hi / TOP) * 100}% + 6px)`,
                    opacity: seen ? 1 : 0,
                    transition: still ? "none" : `opacity .4s ease ${i * 220 + 500}ms`,
                  }}
                >
                  {/* The arrow repeats the sign for anyone not reading colour;
                      phones drop it, since the columns are too narrow. */}
                  <span aria-hidden="true" className="hidden sm:inline">
                    {c.kind === "up" ? "▲ " : c.kind === "down" ? "▼ " : ""}
                  </span>
                  {c.value}
                </span>
                {hover === i ? (
                  <span
                    role="tooltip"
                    className="absolute bottom-full left-1/2 z-10 mb-8 -translate-x-1/2 rounded-[8px] bg-white px-3 py-1.5 text-[12px] whitespace-nowrap text-ink shadow-float"
                  >
                    <b>{c.label}</b> · {c.detail}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 ml-9 grid grid-cols-5 gap-[clamp(6px,2vw,28px)]">
        {COLS.map((c) => (
          <span
            key={c.label}
            className="text-center text-[clamp(10.5px,1.1vw,13px)] leading-[1.3] text-[#b4b4b4]"
          >
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
