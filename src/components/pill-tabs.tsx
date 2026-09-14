"use client";

import { useState, type ReactNode } from "react";

/*
 * The dashed-pill tab row (ClickUp's teams tabs, label-format switcher):
 * dashed grey idle, solid blue selected, panel swaps with a short fade.
 */
export function PillTabs<T extends { id: string; label: string }>({
  tabs,
  render,
  initial,
  className = "",
  align = "center",
  trailing,
}: {
  tabs: T[];
  render: (tab: T) => ReactNode;
  initial?: string;
  className?: string;
  align?: "center" | "left";
  /** A last, non-tab item in the row, e.g. "See all teams". */
  trailing?: ReactNode;
}) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        className={`flex flex-wrap gap-2 ${align === "center" ? "justify-center" : ""}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={tab.id === current.id}
            className="pill-tab"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {trailing}
      </div>
      <div
        key={current.id}
        role="tabpanel"
        style={{ animation: "fsPopIn .35s var(--ease-out) both" }}
      >
        {render(current)}
      </div>
    </div>
  );
}
