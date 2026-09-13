import Image from "next/image";
import type { ReactNode } from "react";
import { Block, BlueButton } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";

/*
 * The closing band every page ends on: navy, centred copy, the blue CTA, and
 * the hexagon mark sitting quietly in the top-right corner.
 *
 * There used to be two marks, both bobbing on their own float loops. One
 * static mark is the same identity with none of the motion; it is anchored in
 * fixed px inside the padding band so it can never reach the text column.
 */
export function CtaBand({
  id,
  title,
  body,
  children,
  footnote,
  className = "py-[clamp(68px,8vw,112px)]",
}: {
  id?: string;
  title: ReactNode;
  body?: ReactNode;
  /** The buttons row. */
  children: ReactNode;
  footnote?: ReactNode;
  className?: string;
}) {
  return (
    <Block
      id={id}
      className={`relative bg-slate-900 px-[clamp(28px,3.6vw,64px)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[24px] right-[24px] w-[48px] opacity-35"
      >
        <Image
          src="/assets/logo-mark.png"
          alt=""
          width={116}
          height={125}
          className="w-full"
        />
      </div>

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
            className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-slate-300"
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
          <Reveal delay={0.24} className="mt-[22px] text-[13px] text-slate-300">
            {footnote}
          </Reveal>
        )}
      </div>
    </Block>
  );
}

export { BlueButton };
