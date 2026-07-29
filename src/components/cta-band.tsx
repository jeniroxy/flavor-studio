import Image from "next/image";
import type { ReactNode } from "react";
import { Block, BlueButton } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";

/*
 * The closing band every page ends on: near-black slate, two drifting hexagon
 * marks, centred copy and the blue CTA.
 *
 * The hexagons are anchored in fixed px inside the section's padding band
 * (22 + 52 = 74px, under the 80px minimum padding), so they can never reach the
 * centred text column at any viewport width — the fix for the collision the
 * percentage-anchored version had at mid-range widths.
 */
export function CtaBand({
  id,
  title,
  body,
  children,
  footnote,
  className = "py-[clamp(68px,8vw,112px)]",
  secondMark = true,
}: {
  id?: string;
  title: ReactNode;
  body?: ReactNode;
  /** The buttons row. */
  children: ReactNode;
  footnote?: ReactNode;
  className?: string;
  secondMark?: boolean;
}) {
  return (
    <Block
      id={id}
      className={`relative bg-slate-900 px-[clamp(28px,3.6vw,64px)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[22px] right-[22px] w-[52px] opacity-45"
        style={{ animation: "fsFloat 8s ease-in-out infinite" }}
      >
        <Image
          src="/assets/logo-mark.png"
          alt=""
          width={116}
          height={125}
          className="w-full"
        />
      </div>
      {secondMark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-[22px] w-10 opacity-30"
          style={{ animation: "fsFloat2 10s ease-in-out infinite" }}
        >
          <Image
            src="/assets/logo-mark.png"
            alt=""
            width={116}
            height={125}
            className="w-full"
          />
        </div>
      )}

      <div className="relative mx-auto max-w-[760px] text-center">
        <Reveal
          as="h2"
          className="font-display text-[clamp(30px,4.6vw,60px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-white"
        >
          {title}
        </Reveal>
        {body && (
          <Reveal
            as="p"
            delay={0.08}
            className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-slate-300"
          >
            {body}
          </Reveal>
        )}
        <Reveal
          delay={0.16}
          className="mt-[34px] flex flex-wrap justify-center gap-[14px]"
        >
          {children}
        </Reveal>
        {footnote && (
          <Reveal delay={0.24} className="mt-[22px] text-[13px] text-slate-500">
            {footnote}
          </Reveal>
        )}
      </div>
    </Block>
  );
}

export { BlueButton };
