"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";

/*
 * The six module groups as a bar that sticks under the site nav while the
 * wall scrolls past. It replaced a small grey list parked in a right-hand
 * rail, which took a quarter of the width and read as an afterthought.
 *
 * Each tab carries its group's hexagon, name and module count; the group in
 * view is filled with its hue (scroll-spy), so the bar doubles as a progress
 * marker. On phones the bar scrolls sideways and keeps the active tab in
 * view. Links are real anchors, so they work without script.
 */

export type GroupTab = {
  id: string;
  label: string;
  count: number;
  hue: string;
  icon: string;
};

/* Hues that need dark text when filled. */
const DARK_ON = new Set(["#7fd234", "#59a3eb", "#18bc9c", "#efc051"]);

export function GroupTabs({ tabs }: { tabs: GroupTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = tabs
      .map((t) => document.getElementById(t.id))
      .filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 180;
      let current = els[0]?.id ?? "";
      for (const el of els)
        if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tabs]);

  // Keep the active tab visible when the bar scrolls sideways.
  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(
      `[data-tab="${active}"]`,
    );
    const b = bar.current;
    if (!el || !b || b.scrollWidth <= b.clientWidth) return;
    b.scrollTo({
      left: el.offsetLeft - b.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Module groups"
      className="sticky top-[calc(var(--nav-height)+10px)] z-20"
    >
      <div
        ref={bar}
        data-lenis-prevent
        className="flex gap-1 overflow-x-auto rounded-[20px] bg-white/90 p-1.5 shadow-[0_12px_32px_rgba(22,34,58,0.12)] ring-1 ring-black/5 backdrop-blur-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-tab={t.id}
              aria-current={on ? "true" : undefined}
              className={`flex min-h-12 shrink-0 items-center gap-2 rounded-[14px] px-3 whitespace-nowrap lg:min-w-0 lg:flex-1 lg:shrink lg:gap-2 lg:px-2.5 lg:whitespace-normal transition-colors duration-300 ${
                on ? "" : "hover:bg-[#f1f4f8]"
              }`}
              style={
                on
                  ? {
                      background: t.hue,
                      color: DARK_ON.has(t.hue) ? "#16223a" : "#ffffff",
                    }
                  : { color: "#324561" }
              }
            >
              <span
                className="hex-round flex aspect-[1/1.1547] w-7 flex-none items-center justify-center"
                style={{
                  background: on ? "rgba(255,255,255,0.9)" : t.hue,
                  color: on ? "#16223a" : "#ffffff",
                }}
              >
                <Icon name={t.icon} className="text-[13px]" />
              </span>
              <span className="text-[14px] leading-tight font-bold lg:text-[13.5px]">
                {t.label}
              </span>
              <span
                className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[11px] ${
                  on ? "bg-white/85 text-[#16223a]" : "bg-[#f1f4f8] text-ink-2"
                }`}
              >
                {t.count}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
