import { CountUp, RevealStagger } from "@/components/reveal";

/*
 * Illustrative figures, not flavorstudio.com data — the real site publishes no
 * stats band. Sits bare on the canvas (no box block) directly under the hero.
 */
const STATS = [
  {
    to: 12400,
    suffix: "+",
    color: "text-slate-800",
    label: "Recipes formulated / month",
  },
  {
    to: 3.8,
    decimals: 1,
    suffix: "×",
    color: "text-blue-500",
    label: "Faster concept to shelf",
  },
  {
    to: 99.2,
    decimals: 1,
    suffix: "%",
    color: "text-teal-500",
    label: "Labels pass review first try",
  },
  {
    to: 40,
    suffix: " hrs",
    color: "text-slate-800",
    label: "Saved per developer / month",
  },
];

export function Stats() {
  return (
    <section className="px-[clamp(28px,3.6vw,64px)] py-[clamp(6px,.9vw,12px)]">
      <RevealStagger
        stagger={0.1}
        className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-[clamp(28px,3.4vw,48px)]"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className={`font-display text-[clamp(32px,3.6vw,46px)] leading-none font-extrabold tabular-nums ${stat.color}`}
            >
              <CountUp
                to={stat.to}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix}
              />
            </div>
            <div className="mt-[10px] text-[12px] font-bold tracking-[.1em] text-slate-400 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
