import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

/*
 * ClickUp's alternating "how it works" rows: a hairline-bordered stack where
 * each row is a text cell beside a visual cell, the visual side alternating
 * R / L / R. The visual sits on a panel-grey ground with a vignette so the
 * screenshot's crop reads as a fade rather than a hard edge.
 *
 * Each row is its own two-column grid so `order` can flip the visual to the
 * left on large screens without disturbing the rows around it; on small
 * screens text always comes first.
 */
export type HairlineRow = {
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
  /** Extra content under the body — a CTA pair, for instance. */
  footer?: ReactNode;
  /** Visual on the left at lg+. */
  flip?: boolean;
  /** Plain white visual cell (chat mocks) instead of the grey vignette. */
  plain?: boolean;
};

export function HairlineRows({
  rows,
  className = "",
}: {
  rows: HairlineRow[];
  className?: string;
}) {
  return (
    <div className={`border border-hairline ${className}`}>
      {rows.map((row, i) => (
        <div
          key={row.title}
          className={`grid lg:grid-cols-2 ${i > 0 ? "border-t border-hairline" : ""}`}
        >
          <Reveal
            className={`flex flex-col justify-center p-[clamp(24px,4vw,56px)] ${
              row.flip
                ? "lg:order-2 lg:border-l lg:border-hairline"
                : "lg:order-1"
            }`}
          >
            <Eyebrow className="mb-4">{row.eyebrow}</Eyebrow>
            <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.15] font-bold tracking-[-0.025em] text-ink">
              {row.title}
            </h3>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-ink-2">
              {row.body}
            </p>
            {row.footer ? <div className="mt-6">{row.footer}</div> : null}
          </Reveal>
          <Reveal
            delay={0.08}
            className={`border-t border-hairline lg:border-t-0 ${
              row.flip
                ? "lg:order-1"
                : "lg:order-2 lg:border-l lg:border-hairline"
            } ${row.plain ? "flex items-center p-[clamp(20px,3vw,40px)]" : "bg-panel p-[clamp(20px,3vw,40px)]"}`}
          >
            {row.plain ? (
              <div className="w-full">{row.visual}</div>
            ) : (
              <div className="vignette overflow-hidden rounded-[var(--radius-md)]">
                {row.visual}
              </div>
            )}
          </Reveal>
        </div>
      ))}
    </div>
  );
}
