import { Icon } from "@/components/icon";

/*
 * The hero diagram (clickup.com Brain²): a glowing core with four mono spec
 * cards around it and event chips streaming in on two CSS marquees. Every
 * chip names a kind of fact the Agent actually reads from the workspace.
 */

const SPECS = [
  {
    n: "01",
    title: "Formulation",
    items: ["Recipes", "Versions", "Sub-recipes", "Yield & loss"],
  },
  {
    n: "02",
    title: "Context",
    items: ["Ingredients", "Costs", "Nutrition", "Supplier specs"],
  },
  {
    n: "03",
    title: "Compliance",
    items: ["FDA", "Health Canada", "Content claims", "Allergens"],
  },
  {
    n: "04",
    title: "Sensory & sales",
    items: ["Taste tests", "Projects", "CRM", "Timesheets"],
  },
];

const EVENTS_A = [
  "[NEW FACT] cocoa cost +12%",
  "vendor: spec sheet v3 imported",
  "[APPROVAL] label signed off",
  "taste test: Testing beat V1",
  "[ALLERGEN] contains tree nuts",
  "version: Final promoted",
];
const EVENTS_B = [
  "claim: “good source of fibre” qualifies",
  "[COST] batch $3.03 → $3.16",
  "project: shelf-life gate open",
  "CRM: sample SR-0412 shipped",
  "[LABEL] Canadian bilingual regenerated",
  "timesheet: 212 h logged Q3",
];

function Chips({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const reel = [...items, ...items];
  return (
    <div className="mask-x overflow-hidden">
      <div
        className={`marquee gap-2 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
      >
        {reel.map((t, i) => (
          <span key={i} className="chip chip-dark normal-case tracking-normal">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Orbit() {
  return (
    <div className="relative">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-4">
          {SPECS.slice(0, 2).map((s) => (
            <Spec key={s.n} {...s} />
          ))}
        </div>
        <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(140,209,53,.55), rgba(140,209,53,0))",
              animation: "fsPulse 4s ease-in-out infinite",
            }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 260 260"
            className="absolute inset-0 h-full w-full"
          >
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke="#2a2a2a"
              strokeDasharray="3 6"
            />
            <circle cx="130" cy="130" r="86" fill="none" stroke="#2a2a2a" />
            <g
              style={{
                transformOrigin: "130px 130px",
                animation: "fsSpin 40s linear infinite",
              }}
            >
              <circle cx="130" cy="10" r="4" fill="#8cd135" />
              <circle cx="250" cy="130" r="3" fill="#59a3eb" />
              <circle cx="130" cy="250" r="3" fill="#18bc9c" />
            </g>
          </svg>
          <div className="relative flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border border-lime-400/40 bg-night-2 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500 text-[20px] text-ink">
              <Icon name="robot" />
            </span>
            <span className="eyebrow eyebrow-dark mt-2 text-[10px]">
              Your workspace
            </span>
            <span className="font-display text-[15px] font-bold text-white">
              AI Agent
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {SPECS.slice(2).map((s) => (
            <Spec key={s.n} {...s} />
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <Chips items={EVENTS_A} />
        <Chips items={EVENTS_B} reverse />
      </div>
    </div>
  );
}

function Spec({
  n,
  title,
  items,
}: {
  n: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[12px] border border-hairline-dark bg-night-2/80 p-4 font-mono text-[12px]">
      <div className="flex items-center gap-2 text-[11px] tracking-[.1em] text-lime-400 uppercase">
        <span className="text-[#7b7b7b]">{n}</span>
        {title}
      </div>
      <ul className="mt-3 flex list-none flex-col gap-1.5 p-0 text-[#b4b4b4]">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#555]" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
