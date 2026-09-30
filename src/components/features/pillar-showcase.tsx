import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

/*
 * A feature page's points, one per row, each with its screen. It replaced a
 * bordered two-column table in which the screenshot was a small vignetted
 * crop; here the screen gets seven of twelve columns on a tinted panel, so
 * the part the copy talks about is legible at a glance.
 *
 * Sides alternate so the eye zig-zags down the page. The large numeral is a
 * sequence marker, decorative (the eyebrow and title carry the meaning). The
 * three tints are the brand's sky, lime and teal at their palest, one per
 * row in turn, so consecutive rows never sit on the same ground.
 */

export type ShowcaseRow = {
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
};

const TINTS = [
  "linear-gradient(140deg, #e3effc 0%, #f4f9fe 100%)",
  "linear-gradient(140deg, #eaf6dc 0%, #f7fbf1 100%)",
  "linear-gradient(140deg, #dcf4ee 0%, #f3fbf8 100%)",
];

export function PillarShowcase({
  rows,
  className = "",
}: {
  rows: ShowcaseRow[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[clamp(56px,8vw,120px)] ${className}`}>
      {rows.map((row, i) => {
        const flip = i % 2 === 1;
        return (
          <div
            key={row.title}
            className="grid items-center gap-[clamp(24px,4vw,64px)] lg:grid-cols-12"
          >
            <Reveal
              className={`lg:col-span-5 ${flip ? "lg:order-2" : "lg:order-1"}`}
            >
              <span
                aria-hidden="true"
                className="font-display block text-[clamp(52px,6vw,88px)] leading-none font-bold tracking-[-0.04em] text-[#d6e4f3]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Eyebrow className="mt-4">{row.eyebrow}</Eyebrow>
              <h3 className="font-display mt-3 text-[clamp(26px,2.8vw,38px)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-ink">
                {row.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.65] text-ink-2">
                {row.body}
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : "lg:order-2"}`}
            >
              <div
                className="rounded-[var(--radius-xl)] p-[clamp(14px,3vw,40px)]"
                style={{ backgroundImage: TINTS[i % TINTS.length] }}
              >
                <div className="overflow-hidden rounded-[12px] shadow-[0_24px_60px_rgba(22,34,58,0.16)]">
                  {row.visual}
                </div>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
