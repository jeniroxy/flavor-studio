"use client";

import { useEffect, useState, type ReactNode } from "react";

/*
 * ClickUp's `SectionWithNav`: long content on the left, a sticky list of
 * anchors on the right, the active one highlighted by scroll-spy. Used by the
 * features index (categories), the enterprise page (sections) and case
 * studies (Challenge / Solution / Impact).
 *
 * `items` are { id, label }; each id must exist as an element id in `children`.
 */
export function StickyRail({
  items,
  children,
  railTop = 120,
  className = "",
  railClassName = "",
}: {
  items: { id: string; label: string }[];
  children: ReactNode;
  railTop?: number;
  className?: string;
  railClassName?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <div className={`grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px] ${className}`}>
      <div className="min-w-0">{children}</div>
      <aside className="hidden lg:block">
        <nav
          className={`panel sticky flex flex-col gap-0.5 p-2 ${railClassName}`}
          style={{ top: railTop }}
          aria-label="On this page"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rail-item"
              data-active={active === item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
