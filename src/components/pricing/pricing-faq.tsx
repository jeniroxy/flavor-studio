"use client";

import { useState } from "react";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Icon } from "@/components/icon";

/** Six questions, then "Load more" for the rest — ClickUp's pricing FAQ. */
export function PricingFaq({
  items,
  initial = 6,
}: {
  items: FaqItem[];
  initial?: number;
}) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, initial);
  return (
    <>
      <FaqAccordion items={shown} groupKey="pricing" />
      {!all && items.length > initial ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAll(true)}
          >
            Load more
            <Icon name="down" className="text-[18px]" />
          </button>
        </div>
      ) : null}
    </>
  );
}
