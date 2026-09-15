"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { CompareTable } from "./compare-table";
import { PlanTable } from "./plan-table";
import type { Billing } from "./plans";

/*
 * Holds the one piece of state the pricing page has — the billing period —
 * so the plan table and the comparison table always show the same prices.
 * `strip` is the (server-rendered) logo strip that sits between them.
 */
export function PricingTables({ strip }: { strip: ReactNode }) {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [open, setOpen] = useState(false);

  return (
    <>
      <PlanTable billing={billing} onChange={setBilling} />
      <div className="mt-10">{strip}</div>
      <div className="mt-8 text-center">
        <button
          type="button"
          className="btn btn-secondary"
          aria-expanded={open}
          aria-controls="complete-feature-list"
          onClick={() => setOpen((o) => !o)}
        >
          Complete feature list
          <Icon
            name="down"
            className={`text-[18px] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {/* No overflow-hidden wrapper here: the table's header row is sticky,
          and a clipping ancestor would pin it to the wrapper instead of the
          viewport. */}
      {open ? (
        <div
          id="complete-feature-list"
          className="pt-8"
          style={{ animation: "fsPopIn .35s var(--ease-out) both" }}
        >
          <CompareTable billing={billing} />
        </div>
      ) : (
        <div id="complete-feature-list" hidden />
      )}
    </>
  );
}
