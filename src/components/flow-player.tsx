"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FRAME_DARK, FRAME_LIGHT } from "@/components/ui";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * A feature, shown happening.
 *
 * The application design file holds most features as a sequence of screens —
 * the Customer Requirements Builder alone has twelve, from an empty form to a
 * nested question with options. FlowPlayer plays such a sequence the way a
 * screen recording would: one real frame after another, each with a caption
 * saying what the person just did, a segmented progress rail underneath, and
 * the same frame size throughout so nothing jumps between steps.
 *
 * It starts when it scrolls into view, pauses while the pointer is over it,
 * and stops advancing on its own once the reader takes a step themselves.
 * With reduced motion it never advances on its own at all; the rail is just a
 * set of buttons.
 *
 * The chrome is wayfinding, not decoration: a 3px rail and a plain "2 / 7"
 * counter set in the caption line. Every frame is a real export from the
 * design file; the only thing this component adds is time.
 */

export type FlowStep = {
  /** Path under /public. Every step in a flow shares one frame size. */
  src: string;
  /** What just happened, in a short sentence. */
  caption: string;
};

export type Flow = {
  /** Two or more steps. */
  steps: FlowStep[];
  width: number;
  height: number;
  /** Describes the flow as a whole, for assistive technology. */
  alt: string;
};

export type FlowPlayerProps = {
  flow: Flow;
  /** "light" sits on the white blocks, "dark" on the navy ones. */
  tone?: "light" | "dark";
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Milliseconds each step stays up. */
  dwell?: number;
};

export function FlowPlayer({
  flow,
  tone = "light",
  sizes = "(max-width: 960px) 100vw, 50vw",
  className = "",
  priority = false,
  dwell = 2800,
}: FlowPlayerProps) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [hover, setHover] = useState(false);
  const [manual, setManual] = useState(false);
  const [still, setStill] = useState(false);
  const count = flow.steps.length;

  // Nothing moves until the frame is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    observeOnce(el, () => {
      const reduce = prefersReducedMotion();
      setStill(reduce);
      setStarted(!reduce);
    });
  }, []);

  const playing = started && !hover && !manual && !still;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), dwell);
    return () => clearInterval(id);
  }, [playing, dwell, count]);

  const go = useCallback((i: number) => {
    setIndex(i);
    setManual(true);
  }, []);

  const dark = tone === "dark";
  const frame = dark ? FRAME_DARK : FRAME_LIGHT;
  const railIdle = dark ? "bg-white/[.14]" : "bg-gray-300";
  const railFill = dark ? "bg-blue-400" : "bg-blue-600";

  return (
    <div
      ref={root}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div
        className={`relative overflow-hidden ${frame}`}
        style={{ aspectRatio: `${flow.width} / ${flow.height}` }}
        role="group"
        aria-label={flow.alt}
      >
        {flow.steps.map((step, i) => (
          <Image
            key={step.src}
            src={step.src}
            alt={i === index ? step.caption : ""}
            width={flow.width}
            height={flow.height}
            sizes={sizes}
            priority={priority && i === 0}
            aria-hidden={i !== index}
            className="absolute inset-0 h-full w-full"
            style={{
              opacity: i === index ? 1 : 0,
              transition: still ? "none" : "opacity .38s ease",
            }}
          />
        ))}
      </div>

      {/* The rail: one segment per step. The active one fills over the dwell
          so the reader can see a change is coming; a click jumps and takes
          over from the timer. */}
      <div className="mt-[10px] flex gap-[4px]" aria-hidden="true">
        {flow.steps.map((step, i) => (
          <button
            key={step.src}
            type="button"
            tabIndex={-1}
            onClick={() => go(i)}
            className={`relative h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full ${railIdle}`}
          >
            {i < index && <span className={`absolute inset-0 ${railFill}`} />}
            {i === index && (
              <span
                key={`${index}-${playing ? "run" : "hold"}`}
                className={`absolute inset-0 origin-left ${railFill}`}
                style={{
                  transform: playing ? undefined : "scaleX(1)",
                  animation: playing
                    ? `fsTabProgress ${dwell}ms linear forwards`
                    : "none",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        className={`mt-[8px] flex items-baseline gap-3 text-[13px] leading-[1.5] ${
          dark ? "text-slate-300" : "text-slate-500"
        }`}
      >
        <button
          type="button"
          onClick={() => go((index + 1) % count)}
          aria-label="Next step"
          className={`flex-none cursor-pointer font-bold tabular-nums ${
            dark ? "text-slate-400" : "text-slate-400"
          }`}
        >
          {index + 1}&thinsp;/&thinsp;{count}
        </button>
        <p aria-live="polite">{flow.steps[index].caption}</p>
      </div>
      <span className="sr-only">
        Step {index + 1} of {count}
      </span>
    </div>
  );
}
