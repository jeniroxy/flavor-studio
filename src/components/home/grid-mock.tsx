"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * The hero's first tab: a formulation grid, animated in the DOM.
 *
 * clickup.com's hero builds its "Projects" preview out of HTML rather than a
 * screenshot so it can move — rows pop in, a cursor roves and clicks, an AI
 * tooltip appears. This is the same device for Flavor Studio: ingredient rows
 * fill in, the cursor edits a percentage, the cost sidebar ticks, and the AI
 * Agent offers to rebalance to 100%. It is deliberately a motion device, not a
 * screenshot — the real Recipe page is one tab over and everywhere else on
 * the site.
 *
 * A phase counter drives it: 0 empty → 1 rows in → 2 cursor to cell → 3 click
 * + edit → 4 cost ticks → 5 agent tooltip → back to 1. With reduced motion it
 * renders the finished state.
 */

const ROWS = [
  { name: "Rolled oats", code: "ING-0142", pct: 32.0, g: 320, cost: 0.38 },
  { name: "Honey", code: "ING-0031", pct: 18.0, g: 180, cost: 0.62 },
  { name: "Almond pieces", code: "ING-0208", pct: 14.0, g: 140, cost: 1.12 },
  { name: "Brown rice syrup", code: "ING-0077", pct: 12.0, g: 120, cost: 0.31 },
  {
    name: "Dried cranberries",
    code: "ING-0119",
    pct: 10.0,
    g: 100,
    cost: 0.54,
  },
  { name: "Sunflower oil", code: "ING-0055", pct: 8.0, g: 80, cost: 0.14 },
  { name: "Sea salt", code: "ING-0009", pct: 0.8, g: 8, cost: 0.01 },
];

const EDIT_ROW = 1; // honey
const EDITED_PCT = 15.5;
const TOTAL_BEFORE = 94.8;
const TOTAL_AFTER = 92.3;
const COST_BEFORE = 3.12;
const COST_AFTER = 3.03;

export function GridMock() {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    observeOnce(el, () => {
      if (prefersReducedMotion()) {
        setStill(true);
        setPhase(5);
        return;
      }
      setPhase(1);
    });
  }, []);

  useEffect(() => {
    if (still || phase === 0) return;
    const wait: Record<number, number> = {
      1: 1900,
      2: 900,
      3: 1100,
      4: 1300,
      5: 3200,
    };
    const id = window.setTimeout(() => {
      setPhase((p) => (p >= 5 ? 1 : p + 1));
    }, wait[phase] ?? 1500);
    return () => window.clearTimeout(id);
  }, [phase, still]);

  const edited = phase >= 3;
  const ticking = phase >= 4;
  const agent = phase >= 5;
  const pct = (i: number) =>
    i === EDIT_ROW && edited ? EDITED_PCT : ROWS[i].pct;
  const grams = (i: number) => Math.round(pct(i) * 10);
  const total = ticking ? TOTAL_AFTER : TOTAL_BEFORE;
  const cost = ticking ? COST_AFTER : COST_BEFORE;

  return (
    <div
      ref={root}
      className="relative flex h-full w-full overflow-hidden bg-white text-[12px] text-ink"
      aria-label="Animated formulation grid: ingredient rows fill in, a percentage is edited, cost recalculates, and the AI Agent offers to rebalance"
      role="img"
    >
      {/* app sidebar */}
      <div className="hidden w-[52px] shrink-0 flex-col items-center gap-4 bg-slate-800 py-4 text-slate-300 sm:flex">
        {[
          "home",
          "chef-hat-one",
          "leaves",
          "doc-detail",
          "experiment",
          "peoples",
        ].map((n, i) => (
          <span
            key={n}
            className={`flex h-8 w-8 items-center justify-center rounded-[8px] text-[16px] ${i === 1 ? "bg-blue-500 text-white" : ""}`}
          >
            <Icon name={n} />
          </span>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
          <span className="font-display text-[14px] font-bold">
            Granola Bar
          </span>
          <span className="rounded-[6px] border border-hairline bg-panel px-2 py-0.5 text-[11px] font-semibold">
            V2 · Testing
          </span>
          <span className="ml-auto hidden items-center gap-1 rounded-[6px] bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white sm:flex">
            <Icon name="plus" /> Ingredient
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* grid */}
          <div className="min-w-0 flex-1 px-4 py-3">
            <div className="grid grid-cols-[1.6fr_.7fr_.6fr_.6fr] gap-2 border-b border-hairline pb-1.5 text-[10px] font-semibold tracking-[.06em] text-ink-3 uppercase">
              <span>Ingredient</span>
              <span className="text-right">%</span>
              <span className="text-right">g</span>
              <span className="text-right">Cost</span>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.code}
                className="grid grid-cols-[1.6fr_.7fr_.6fr_.6fr] items-center gap-2 border-b border-hairline/70 py-[6px]"
                style={{
                  opacity: phase >= 1 ? 1 : 0,
                  transform: phase >= 1 ? "none" : "translateY(6px)",
                  transition: `opacity .35s var(--ease-out) ${i * 0.14}s, transform .35s var(--ease-out) ${i * 0.14}s`,
                }}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-lime-500" />
                  <span className="truncate font-medium">{row.name}</span>
                  <span className="hidden text-[10px] text-ink-3 md:inline">
                    {row.code}
                  </span>
                </span>
                <span
                  className={`rounded-[4px] px-1.5 py-0.5 text-right tabular-nums transition-colors ${
                    i === EDIT_ROW && phase >= 3 && phase < 5
                      ? "bg-blue-100 ring-1 ring-blue-500"
                      : ""
                  }`}
                >
                  {pct(i).toFixed(1)}
                  {i === EDIT_ROW && phase === 3 ? (
                    <span
                      className="ml-[1px] inline-block h-[11px] w-[1.5px] translate-y-[2px] bg-ink"
                      style={{ animation: "fsCaret 1s steps(1) infinite" }}
                    />
                  ) : null}
                </span>
                <span className="text-right tabular-nums text-ink-2">
                  {grams(i)}
                </span>
                <span className="text-right tabular-nums text-ink-2">
                  ${row.cost.toFixed(2)}
                </span>
              </div>
            ))}
            <div
              className="mt-2 flex items-center justify-between text-[11px] font-semibold"
              style={{
                opacity: phase >= 1 ? 1 : 0,
                transition: "opacity .3s 1.1s",
              }}
            >
              <span className="text-ink-3">Total</span>
              <span
                className={`tabular-nums ${total < 100 ? "text-amber-500" : "text-green-600"}`}
              >
                {total.toFixed(1)}% of 100
              </span>
            </div>
          </div>

          {/* sidebar */}
          <div className="hidden w-[150px] shrink-0 flex-col gap-2 border-l border-hairline bg-panel p-3 md:flex">
            <div className="text-[10px] font-semibold tracking-[.06em] text-ink-3 uppercase">
              Yield / Cost
            </div>
            <Cell label="Batch" value="1,000 g" />
            <Cell
              label="Batch cost"
              value={`$${cost.toFixed(2)}`}
              hot={ticking}
            />
            <Cell
              label="Per serving"
              value={`$${(cost / 10).toFixed(3)}`}
              hot={ticking}
            />
            <Cell
              label="Retail @ 40%"
              value={`$${(cost / 10 / 0.6).toFixed(2)}`}
              hot={ticking}
            />
          </div>
        </div>
      </div>

      {/* cursor */}
      {!still ? (
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute z-10 drop-shadow"
          style={{
            left: phase >= 2 ? "52%" : "70%",
            top: phase >= 2 ? "31%" : "78%",
            opacity: phase >= 2 && phase < 5 ? 1 : 0,
            transform: phase === 3 ? "scale(.85)" : "none",
            transition:
              "left .7s var(--ease-natural), top .7s var(--ease-natural), opacity .3s, transform .15s",
          }}
        >
          <path
            d="M4 3l14 8-6 1.5L9 20z"
            fill="#202020"
            stroke="#fff"
            strokeWidth="1.5"
          />
        </svg>
      ) : null}

      {/* agent tooltip */}
      <div
        className="ring-rainbow absolute right-[6%] bottom-[10%] z-10 flex items-center gap-2 rounded-[12px] bg-white px-3 py-2 shadow-float"
        style={{
          opacity: agent ? 1 : 0,
          transform: agent ? "none" : "translateY(8px)",
          transition:
            "opacity .3s var(--ease-out), transform .3s var(--ease-out)",
        }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-[14px]">
          <Icon name="robot" />
        </span>
        <span>
          <span className="block text-[12px] font-bold">AI Agent</span>
          <span className="block text-[11px] text-blue-700">
            Rebalance to 100%? Oats +7.7% keeps cost under $3.10
          </span>
        </span>
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  hot = false,
}: {
  label: string;
  value: string;
  hot?: boolean;
}) {
  return (
    <div className="rounded-[8px] border border-hairline bg-white px-2.5 py-2">
      <div className="text-[10px] text-ink-3">{label}</div>
      <div
        className={`font-display text-[13px] font-bold tabular-nums transition-colors duration-500 ${hot ? "text-blue-700" : "text-ink"}`}
      >
        {value}
      </div>
    </div>
  );
}
