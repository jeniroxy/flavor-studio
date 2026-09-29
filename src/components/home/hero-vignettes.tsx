"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * The hero's food circles. Six slots are pinned to the viewport's own edges,
 * three a side: the two outer circles sit half off the edge (the section
 * clips them), the inner one beside them. `edge` is the distance from that
 * side, so -75 on a 150px circle is exactly half cut. Every length is scaled
 * by --k: 0.8 below xl, where at 1024 the full-size inner circle would touch
 * the sub-line.
 *
 * The thirteen dishes (public/hero, already cut round) take turns: every
 * SWAP_MS one slot, in a scattered left/right order, spins its plate out and
 * the next unseen dish in, so no dish is ever on screen twice. Each slot also
 * slides in from its own edge on load and bobs slowly. The swapping pauses
 * while the hero is off screen or the tab is hidden; under
 * prefers-reduced-motion nothing moves and the first six dishes stay put.
 */

const DISHES = Array.from(
  { length: 13 },
  (_, i) => `/hero/food-${String(i + 1).padStart(2, "0")}.webp`,
);

const SLOTS = [
  { side: "left", edge: -75, y: 20 },
  { side: "left", edge: 74, y: 119 },
  { side: "left", edge: -75, y: 218 },
  { side: "right", edge: -75, y: 23 },
  { side: "right", edge: 74, y: 119 },
  { side: "right", edge: -75, y: 218 },
] as const;

/* Which slot swaps next: alternating sides, never two neighbours in a row. */
const ORDER = [0, 4, 2, 3, 1, 5];
const SWAP_MS = 1600;
/* How long the outgoing plate stays mounted: the fsPlateOut duration. */
const OUT_MS = 900;

type Slot = { dish: number; prev: number | null; turn: number };

export function HeroVignettes() {
  const [slots, setSlots] = useState<Slot[]>(() =>
    SLOTS.map((_, i) => ({ dish: i, prev: null, turn: 0 })),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const tick = useRef(0);
  // Which dish each slot shows, and the dishes waiting their turn. Kept in
  // refs so the state updater below stays pure (StrictMode runs it twice).
  const shown = useRef<number[]>(SLOTS.map((_, i) => i));
  const queue = useRef<number[]>(DISHES.map((_, i) => i).slice(SLOTS.length));

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    // Warm the cache so an incoming dish never pops in half-loaded.
    DISHES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      const slot = ORDER[tick.current % ORDER.length];
      tick.current += 1;
      const next = queue.current.shift();
      if (next === undefined) return;
      const old = shown.current[slot];
      shown.current[slot] = next;
      queue.current.push(old);
      setSlots((all) =>
        all.map((s, i) =>
          i === slot ? { dish: next, prev: old, turn: s.turn + 1 } : s,
        ),
      );
    }, SWAP_MS);

    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  // Unmount each outgoing plate once its spin-out has finished.
  useEffect(() => {
    if (!slots.some((s) => s.prev !== null)) return;
    const id = window.setTimeout(
      () =>
        setSlots((all) =>
          all.some((s) => s.prev !== null)
            ? all.map((s) => ({ ...s, prev: null }))
            : all,
        ),
      OUT_MS,
    );
    return () => window.clearTimeout(id);
  }, [slots]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[400px] [--k:0.8] lg:block xl:[--k:1]"
    >
      {SLOTS.map((v, i) => {
        const s = slots[i];
        // Plates on the left spin clockwise, on the right anticlockwise, so
        // both sides turn in toward the headline.
        const spin = v.side === "left" ? "120deg" : "-120deg";
        return (
          <span
            key={`${v.side}:${v.y}`}
            className="absolute size-[calc(150px*var(--k))] [animation:fsVignetteIn_0.9s_var(--ease-out-soft)_both] motion-reduce:[animation:none]"
            style={
              {
                [v.side]: `calc(${v.edge}px * var(--k))`,
                top: `calc(${v.y}px * var(--k))`,
                "--from": v.side === "left" ? "-80px" : "80px",
                animationDelay: `${0.15 + (i % 3) * 0.12}s`,
              } as CSSProperties
            }
          >
            <span
              className="relative block size-full [animation:fsVignetteFloat_6s_ease-in-out_infinite] motion-reduce:[animation:none]"
              style={{ animationDelay: `${-i * 1.3}s`, "--spin": spin } as CSSProperties}
            >
              {s.prev !== null ? (
                <Image
                  key={`out-${s.turn}`}
                  src={DISHES[s.prev]}
                  alt=""
                  width={320}
                  height={320}
                  unoptimized
                  className="absolute inset-0 size-full rounded-full [animation:fsPlateOut_0.9s_var(--ease-out-soft)_both]"
                />
              ) : null}
              <Image
                key={`in-${s.turn}`}
                src={DISHES[s.dish]}
                alt=""
                width={320}
                height={320}
                unoptimized
                priority={s.turn === 0}
                className={`absolute inset-0 size-full rounded-full shadow-[0_10px_30px_rgba(22,34,58,0.18)] ${s.turn ? "[animation:fsPlateIn_1.1s_var(--ease-out-soft)_both]" : ""}`}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}
