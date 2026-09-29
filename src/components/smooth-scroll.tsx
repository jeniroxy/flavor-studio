"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger pins and
 * scrubs stay in sync. Disabled under prefers-reduced-motion and on coarse
 * pointers (touch scrolling is already smooth and Lenis would fight it).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Same-page anchor links. Lenis's own `anchors` option measures from its
    // internal scroll position, which can drift from the real one (it read
    // 419px on a page sitting at 0), so targets landed 250-500px past their
    // section. The target is measured from window.scrollY instead, minus the
    // element's scroll-margin, and focus moves to it the way a native jump
    // would move the keyboard's starting point.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (
        !url.hash ||
        url.origin !== location.origin ||
        url.pathname !== location.pathname
      )
        return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      lenis.scrollTo(el.getBoundingClientRect().top + window.scrollY - margin);
      history.pushState(null, "", url.hash);
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
