"use client";

import { useState } from "react";
import { ChatMock, type ChatLine } from "@/components/chat-mock";

/*
 * "One Agent. Any job." — clickup.com's Brain² persona list: a vertical list
 * of roles (role=tab) on the left, the transcript for the selected role on
 * the right. Each transcript is a plausible, cited exchange; the Agent only
 * ever answers or drafts.
 */

export type Persona = {
  id: string;
  label: string;
  sub: string;
  lines: ChatLine[];
};

export const PERSONAS: Persona[] = [
  {
    id: "chef",
    label: "R&D chef",
    sub: "Formulates and iterates",
    lines: [
      {
        from: "user",
        text: "Which of my three chipotle sauce versions has the most heat per serving, and what drives it?",
      },
      {
        from: "agent",
        text: "V3 — 1.8 g chipotle in adobo per 30 g serving, up from 1.2 g in V1.",
        bullets: [
          "V2 swapped half the chipotle for smoked paprika (no heat)",
          "V3 also adds 0.2 g cayenne",
        ],
        cite: "Chipotle Sauce · V1 / V2 / V3 · ingredient lines",
      },
    ],
  },
  {
    id: "scientist",
    label: "Food scientist",
    sub: "Nutrition and yield",
    lines: [
      {
        from: "user",
        text: "Compare protein per 100 g between Granola Bar V1 and Testing.",
      },
      {
        from: "agent",
        text: "Testing is 11.4 g/100 g, V1 is 9.7 g/100 g — a 17% increase.",
        bullets: [
          "Almond pieces 14% → 18%",
          "Rolled oats 32% → 30%",
          "Yield unchanged at 96%",
        ],
        cite: "Nutrient analysis · per 100 g · both versions",
      },
    ],
  },
  {
    id: "regulatory",
    label: "Regulatory lead",
    sub: "Labels and claims",
    lines: [
      {
        from: "user",
        text: "Can we call the oat cookie “low sodium” on the US label?",
      },
      {
        from: "agent",
        text: "No — 165 mg per RACC, above the 140 mg threshold for “low sodium”.",
        bullets: [
          "“Reduced sodium” would need a 25% cut against a reference product",
          "Nearest option: reformulate to ≤140 mg",
        ],
        cite: "21 CFR 101.61 · Oat Cookie · Final · Nutrient Content Claims",
      },
    ],
  },
  {
    id: "costing",
    label: "Costing & procurement",
    sub: "Margin and suppliers",
    lines: [
      {
        from: "user",
        text: "If almond cost rises 12%, what happens to the granola bar margin?",
      },
      {
        from: "agent",
        text: "Batch cost rises from $3.03 to $3.16; margin at the $0.51 retail target drops from 40.6% to 38.0%.",
        bullets: [
          "Almond pieces are 37% of ingredient cost",
          "Cost assumptions unchanged (packaging, labour, waste)",
        ],
        cite: "Granola Bar · Testing · Yield / Cost · cost assumptions",
      },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    sub: "Customers and samples",
    lines: [
      {
        from: "user",
        text: "Which recipes are linked to the Northwind opportunity, and which samples shipped?",
      },
      {
        from: "agent",
        text: "Two recipes — Chipotle Sauce V3 and Oat Cookie Final. One sample shipped on 9 Sep.",
        bullets: [
          "Sample request SR-0412 · Chipotle Sauce V3 · shipped",
          "Oat Cookie sample pending approval",
        ],
        cite: "CRM · Northwind Foods · opportunity, sample requests",
      },
    ],
  },
  {
    id: "founder",
    label: "Founder",
    sub: "The state of every launch",
    lines: [
      {
        from: "user",
        text: "How many development hours went into the Q3 launches, and which stage gates are still open?",
      },
      {
        from: "agent",
        text: "212 hours logged across three projects; two stage gates remain open.",
        bullets: [
          "Granola Bar — “Shelf-life” gate open",
          "Chipotle Sauce — “Costing sign-off” gate open",
          "Oat Cookie — all gates closed",
        ],
        cite: "Timesheet · weekly report · Projects · stage gates",
      },
    ],
  },
];

export function PersonaTabs() {
  const [active, setActive] = useState(PERSONAS[0].id);
  const current = PERSONAS.find((p) => p.id === active) ?? PERSONAS[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Roles" className="flex flex-col">
        {PERSONAS.map((p) => {
          const on = p.id === current.id;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(p.id)}
              className={`border-l-2 px-5 py-4 text-left transition-colors ${
                on
                  ? "border-lime-400"
                  : "border-hairline-dark hover:border-[#555]"
              }`}
            >
              <span
                className={`font-display block text-[20px] font-bold ${on ? "text-white" : "text-[#7b7b7b]"}`}
              >
                {p.label}
              </span>
              <span
                className={`block text-[13px] ${on ? "text-[#b4b4b4]" : "text-[#555]"}`}
              >
                {p.sub}
              </span>
            </button>
          );
        })}
      </div>
      <div
        key={current.id}
        style={{ animation: "fsPopIn .35s var(--ease-out) both" }}
      >
        <ChatMock
          tone="dark"
          lines={current.lines}
          gap={1100}
          className="max-w-[640px]"
        />
      </div>
    </div>
  );
}
