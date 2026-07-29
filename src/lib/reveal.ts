"use client";

import { useEffect, useRef } from "react";

/*
 * Scroll-reveal plumbing.
 *
 * IntersectionObserver drives the common case, but it is not sufficient on its
 * own: its callbacks are delivered per rendered frame, so a fast fling, an
 * anchor jump or a restored scroll position can carry an element past the
 * viewport between two deliveries — and it would then stay hidden forever.
 *
 * So every pending element is also measured directly on scroll/resize. An
 * element is released once its top edge is inside the viewport *or* above it,
 * which makes "scrolled past" indistinguishable from "scrolled to" and closes
 * the gap. Both paths converge on the same release, and each element is
 * released exactly once.
 */

const REVEAL_MARGIN = "0px 0px -6% 0px";
/** Release once the element's top is within 94% of the viewport height. */
const TRIGGER_RATIO = 0.94;

type ReleaseFn = (el: Element) => void;

let observer: IntersectionObserver | null = null;
const handlers = new Map<Element, ReleaseFn>();
let sweepQueued = false;
let listening = false;

function fire(el: Element) {
  const release = handlers.get(el);
  if (!release) return;
  handlers.delete(el);
  observer?.unobserve(el);
  release(el);
}

/** Release every pending element the reader has reached or passed. */
function sweep() {
  sweepQueued = false;
  if (!handlers.size) return;
  const vh = window.innerHeight || 800;
  const limit = vh * TRIGGER_RATIO;
  // At the foot of the document nothing further can scroll into view, so the
  // trailing elements — which sit just below the trigger line and would
  // otherwise stay hidden forever — are released outright.
  const atEnd =
    window.scrollY + vh >= document.documentElement.scrollHeight - 2;
  for (const el of Array.from(handlers.keys())) {
    if (atEnd || el.getBoundingClientRect().top < limit) fire(el);
  }
}

function queueSweep() {
  if (sweepQueued) return;
  sweepQueued = true;
  requestAnimationFrame(sweep);
}

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) fire(entry.target);
      }
    },
    { rootMargin: REVEAL_MARGIN, threshold: 0.01 },
  );
  return observer;
}

/** Run `release` the first time `el` is reached by the scroll position. */
export function observeOnce(el: Element, release: ReleaseFn) {
  handlers.set(el, release);
  getObserver().observe(el);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep, { passive: true });
  }
  // Catches elements already in view (or above it) at mount.
  queueSweep();
  return () => {
    handlers.delete(el);
    observer?.unobserve(el);
  };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Reveal a single element when it enters the viewport. */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.dataset.reveal = "shown";
      return;
    }
    el.style.setProperty("--reveal-delay", `${delay}s`);
    return observeOnce(el, () => {
      el.dataset.reveal = "shown";
    });
  }, [delay]);
  return ref;
}

/**
 * Reveal a container's direct children one after another.
 * `delay` offsets the whole group; `stagger` is the gap between children.
 */
export function useRevealStagger<T extends HTMLElement>(
  stagger = 0.09,
  delay = 0,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const kids = Array.from(box.children) as HTMLElement[];
    const mark = (state: string) =>
      kids.forEach((kid) => {
        kid.dataset.revealChild = state;
      });

    if (prefersReducedMotion()) {
      mark("shown");
      return;
    }
    // Children are stamped hidden during render (see RevealStagger); this only
    // catches any that arrived afterwards.
    mark("");
    return observeOnce(box, () => {
      kids.forEach((kid, i) => {
        kid.style.setProperty("--reveal-delay", `${delay + i * stagger}s`);
        kid.dataset.revealChild = "shown";
      });
    });
  }, [stagger, delay]);
  return ref;
}

/**
 * Count a number up from zero when it scrolls into view.
 * Mirrors the prototype's `data-count` / `data-decimals` / `data-prefix` /
 * `data-suffix` contract, including the en-US thousands separator.
 */
export function formatCount(
  value: number,
  decimals = 0,
  prefix = "",
  suffix = "",
) {
  return (
    prefix +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix
  );
}

export function useCountUp<T extends HTMLElement>(
  end: number,
  { decimals = 0, prefix = "", suffix = "", duration = 1.8 } = {},
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = formatCount(end, decimals, prefix, suffix);
    if (prefersReducedMotion()) {
      el.textContent = final;
      return;
    }
    let raf = 0;
    const stop = observeOnce(el, () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        // power2.out — the ease the prototype's count-up used
        const eased = 1 - Math.pow(1 - t, 2);
        el.textContent = formatCount(end * eased, decimals, prefix, suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
        else el.textContent = final;
      };
      raf = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [end, decimals, prefix, suffix, duration]);
  return ref;
}
