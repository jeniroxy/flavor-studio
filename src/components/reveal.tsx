"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useCountUp, useReveal, useRevealStagger } from "@/lib/reveal";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  /* `as` can be any element, so pass through whatever props it takes
     (href/target/rel on an <a>, id on a section, and so on). */
  [prop: string]: unknown;
};

/** Fades + lifts its content in the first time it scrolls into view. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>(delay);
  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

type StaggerProps = RevealProps & { stagger?: number };

/** Reveals its direct children one after another. */
export function RevealStagger({
  as: Tag = "div",
  stagger = 0.09,
  delay = 0,
  className,
  children,
  ...rest
}: StaggerProps) {
  const ref = useRevealStagger<HTMLElement>(stagger, delay);
  // The hidden attribute is stamped during render, not in the effect, so the
  // server HTML already starts hidden — otherwise the children paint at full
  // opacity for a beat before hydration hides them again.
  const hidden = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, {
          "data-reveal-child": "",
        })
      : child,
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {hidden}
    </Tag>
  );
}

type CountProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Ticks from zero up to `to` when it scrolls into view. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountProps) {
  const ref = useCountUp<HTMLSpanElement>(to, { decimals, prefix, suffix });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
