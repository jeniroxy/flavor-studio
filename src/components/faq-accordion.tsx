"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

/*
 * The accordion, restyled to clickup.com's: hairline rows, question left,
 * chevron right, no card chrome. Open/close is a grid-template-rows
 * transition (0fr → 1fr) so the answer animates to its natural height.
 */

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  /** Index open on first paint; -1 for all closed. */
  defaultOpen = -1,
  /** Distinguishes groups when several accordions share a page. */
  groupKey = "",
  tone = "light",
  className = "",
}: {
  items: FaqItem[];
  defaultOpen?: number;
  groupKey?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const dark = tone === "dark";

  return (
    <div className={`border-t ${dark ? "border-hairline-dark" : "border-hairline"} ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${groupKey}-${item.q}`}
            className={`border-b ${dark ? "border-hairline-dark" : "border-hairline"}`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 py-[18px] text-left text-[16px] font-medium ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              <span>{item.q}</span>
              <Icon
                name="down"
                className={`shrink-0 text-[18px] transition-transform duration-200 ${
                  dark ? "text-[#b4b4b4]" : "text-ink-2"
                } ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={`pb-5 text-[15px] leading-[1.65] ${
                    dark ? "text-[#b4b4b4]" : "text-ink-2"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
