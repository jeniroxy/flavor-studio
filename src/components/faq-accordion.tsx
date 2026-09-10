"use client";

import { useState } from "react";

/*
 * The accordion used on the landing page, the pricing page and the FAQ page.
 * Open/close is a grid-template-rows transition (0fr → 1fr) so the answer
 * animates to its natural height without measuring anything.
 */

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  /** Index open on first paint; -1 for all closed. */
  defaultOpen = -1,
  /** Distinguishes groups when several accordions share a page. */
  groupKey = "",
}: {
  items: FaqItem[];
  defaultOpen?: number;
  groupKey?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${groupKey}-${item.q}`}
            className="overflow-hidden rounded-[18px] border border-gray-300 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-[14px] px-[22px] py-[18px] text-left"
            >
              <span className="flex-1 text-[16px] leading-[1.4] font-bold text-slate-800">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-blue-100 text-[16px] font-semibold text-blue-600 transition-transform duration-[220ms]"
                style={{ transform: `rotate(${isOpen ? "45deg" : "0deg"})` }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-[22px] pb-5 text-[14px] leading-[1.65] text-slate-500">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
