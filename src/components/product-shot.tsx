"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FRAME_DARK, FRAME_LIGHT } from "@/components/ui";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * A product screenshot that points at itself.
 *
 * A screenshot of a whole application window, shrunk into a column, asks the
 * reader to find the part the copy is about. This component does the finding
 * for them: once the frame scrolls into view, a spotlight settles on the region
 * the surrounding copy discusses — the rest of the window dims a little, a thin
 * rule draws around the region, a short label names it.
 *
 * That is the whole effect. It runs once and then stays put. The image used to
 * ease 4.5% toward the region over six seconds as well; the zoom cropped the
 * edges of every screenshot (the hero's Yield / Cost header lost its top) and
 * added motion to a page that already had enough, so it is gone. With reduced
 * motion the spotlight is simply there from the start.
 *
 * `focus` is in percentages of the image, so it survives any resize.
 */

export type ShotFocus = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Two to five words naming the region, e.g. "Yield / Cost sidebar". */
  label: string;
};

export type ProductShotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus?: ShotFocus;
  /** "light" sits on the white blocks, "dark" on the navy ones. */
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Seconds to wait after the frame is in view before the spotlight lands. */
  delay?: number;
};

export function ProductShot({
  src,
  alt,
  width,
  height,
  focus,
  tone = "light",
  sizes = "(max-width: 960px) 100vw, 50vw",
  priority = false,
  className = "",
  delay = 0.7,
}: ProductShotProps) {
  const root = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const [still, setStill] = useState(false);

  // With reduced motion the spotlight is placed as soon as the frame is
  // reached; otherwise it lands a beat after, so the reader sees the
  // screenshot before the frame tells them where to look.
  useEffect(() => {
    const el = root.current;
    if (!el || !focus) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    observeOnce(el, () => {
      const reduce = prefersReducedMotion();
      setStill(reduce);
      timer = setTimeout(() => setLit(true), reduce ? 0 : delay * 1000);
    });
    return () => clearTimeout(timer);
  }, [focus, delay]);

  const frame = tone === "dark" ? FRAME_DARK : FRAME_LIGHT;

  // Label sits above the region unless the region touches the top edge, and
  // hangs from whichever side of the region has room — a region against the
  // right edge would otherwise push its label out of the frame.
  const labelAbove = focus ? focus.y > 9 : true;
  const labelRight = focus ? focus.x + focus.w / 2 > 60 : false;

  return (
    <div
      ref={root}
      className={`relative overflow-hidden ${frame} ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="block h-full w-full"
      />

      {focus && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-sm border-2 border-blue-600"
          style={{
            left: `${focus.x}%`,
            top: `${focus.y}%`,
            width: `${focus.w}%`,
            height: `${focus.h}%`,
            // The dim outside the region is the region's own shadow, spread
            // past the frame. Nothing else has to be drawn.
            boxShadow: "0 0 0 200vmax rgba(43,59,83,.22)",
            opacity: lit ? 1 : 0,
            transition: still ? "none" : "opacity .5s ease",
          }}
        >
          <span
            className={`absolute inline-block rounded-sm border border-gray-300 bg-white px-[7px] py-[3px] text-[10.5px] leading-none font-bold tracking-[.08em] whitespace-nowrap text-slate-800 uppercase ${
              labelAbove ? "bottom-full mb-[6px]" : "top-[6px]"
            } ${labelRight ? "right-0" : "left-0"} ${
              !labelAbove ? (labelRight ? "right-[6px]" : "left-[6px]") : ""
            }`}
          >
            {focus.label}
          </span>
        </div>
      )}
    </div>
  );
}
