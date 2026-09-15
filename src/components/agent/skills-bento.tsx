import { Fragment } from "react";
import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";

/*
 * "What it can do" — the six capabilities from the previous AI Agent page,
 * each with a small DOM-built visual in the Brain² register: a memory table,
 * a progress bar, suggestion chips, a draft toast, a compare strip, a
 * Contains statement. These are motion devices, not screenshots.
 */

const SKILLS = [
  {
    icon: "search",
    title: "Ingredient sourcing",
    body: "“Find a non-GMO starch with no soy under $2.10/kg.” It searches your library and supplier data and ranks the matches.",
    visual: "search",
  },
  {
    icon: "doc-detail",
    title: "Claim & label checks",
    body: "Validates nutrient content claims against 21 CFR 101 and flags what you qualify for before you print the label.",
    visual: "claims",
  },
  {
    icon: "chart-histogram",
    title: "What-if costing",
    body: "Model ingredient swaps, supplier changes and batch scaling — see the cost and margin impact before touching the formula.",
    visual: "cost",
  },
  {
    icon: "weight",
    title: "Nutrition compare",
    body: "Side-by-side nutrient panels across versions — exactly what a reformulation changes, per serving and per 100 g.",
    visual: "compare",
  },
  {
    icon: "caution",
    title: "Allergen watch",
    body: "Ask what the big-9 exposure is on any formula and get the mandatory “Contains” statement, cross-contact risks included.",
    visual: "allergen",
  },
  {
    icon: "experiment",
    title: "Reformulation ideas",
    body: "Propose swaps to hit a sugar, sodium or cost target while holding the sensory score — as reviewable draft versions.",
    visual: "draft",
  },
];

export function SkillsBento() {
  return (
    <RevealStagger
      stagger={0.06}
      className="hairline-grid-dark md:grid-cols-2 lg:grid-cols-3"
    >
      {SKILLS.map((s) => (
        <div key={s.title} className="flex min-h-[380px] flex-col p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[.1em] text-[#eee] uppercase">
            <Icon name={s.icon} className="text-[16px] text-lime-400" />
            {s.title}
          </div>
          <p className="mt-3 text-[14px] leading-[1.6] text-[#b4b4b4]">
            {s.body}
          </p>
          <div className="mt-auto pt-6">
            <Visual kind={s.visual} />
          </div>
        </div>
      ))}
    </RevealStagger>
  );
}

const mono =
  "rounded-[10px] border border-hairline-dark bg-night-2 p-3 font-mono text-[12px] text-[#b4b4b4]";

function Visual({ kind }: { kind: string }) {
  switch (kind) {
    case "search":
      return (
        <div className={mono}>
          <div className="flex items-center gap-2 text-[11px] text-[#7b7b7b]">
            <Icon name="search" /> gathering data
            <span className="ml-auto text-lime-400">3 matches</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-hairline-dark">
            <div
              className="h-full w-2/3 rounded-full bg-lime-400"
              style={{
                animation: "fsShimmer 2.4s linear infinite",
                backgroundImage:
                  "linear-gradient(90deg,#8cd135 0%,#d0f16b 50%,#8cd135 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              "Tapioca starch · $1.85",
              "Potato starch · $1.92",
              "Pea starch · $2.05",
            ].map((c, i) => (
              <span
                key={c}
                className="chip chip-dark normal-case tracking-normal"
                style={{
                  animation: `fsPopIn .3s var(--ease-out) ${0.3 + i * 0.25}s both`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      );
    case "claims":
      return (
        <div className={mono}>
          {[
            ["Good source of fibre", "3.1 g ≥ 2.5 g", true],
            ["Low sodium", "165 mg > 140 mg", false],
            ["Reduced fat", "needs reference", false],
          ].map(([k, v, ok]) => (
            <div
              key={k as string}
              className="flex items-center justify-between gap-3 border-b border-hairline-dark py-1.5 last:border-0"
            >
              <span className="flex items-center gap-2">
                <Icon
                  name={ok ? "check" : "close"}
                  className={ok ? "text-lime-400" : "text-red-500"}
                />
                {k as string}
              </span>
              <span className="text-[#7b7b7b]">{v as string}</span>
            </div>
          ))}
        </div>
      );
    case "cost":
      return (
        <div className={mono}>
          {[
            ["almond_cost", "+12%"],
            ["batch_cost", "$3.03 → $3.16"],
            ["margin_at_target", "40.6% → 38.0%"],
            ["assumptions", "unchanged"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-3 border-b border-hairline-dark py-1.5 last:border-0"
            >
              <span>{k}</span>
              <span className="text-lime-400">{v}</span>
            </div>
          ))}
        </div>
      );
    case "compare":
      return (
        <div className={mono}>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1.5 text-[11px]">
            <span className="text-[#7b7b7b]">per 100 g</span>
            <span className="text-[#7b7b7b]">V1</span>
            <span className="text-[#7b7b7b]">Testing</span>
            {[
              ["Protein", "9.7 g", "11.4 g"],
              ["Sugars", "18.2 g", "16.9 g"],
              ["Sodium", "120 mg", "118 mg"],
              ["Cost", "$0.31", "$0.30"],
            ].map(([k, a, b]) => (
              <Fragment key={k}>
                <span>{k}</span>
                <span>{a}</span>
                <span className="text-lime-400">{b}</span>
              </Fragment>
            ))}
          </div>
        </div>
      );
    case "allergen":
      return (
        <div className={mono}>
          <div className="text-[11px] text-[#7b7b7b]">mandatory statement</div>
          <div className="mt-1 text-[13px] font-semibold text-white">
            Contains: tree nuts (almond), wheat.
          </div>
          <div className="mt-2 flex items-start gap-2 text-[11px] text-amber-500">
            <Icon name="caution" className="mt-0.5" /> May contain: peanut
            (shared line, cross-contact).
          </div>
        </div>
      );
    default:
      return (
        <div className="ring-rainbow flex items-center gap-3 rounded-[12px] bg-night-2 p-3 text-[13px]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-[16px] text-ink">
            <Icon name="branch-one" />
          </span>
          <span>
            <span className="block font-semibold text-white">
              Draft version created
            </span>
            <span className="block text-[12px] text-[#b4b4b4]">
              “Testing-LowNa” — not applied. Review to promote.
            </span>
          </span>
        </div>
      );
  }
}
