"use client";

import { useEffect, useMemo, useState } from "react";

/*
 * The reference's sidebar: the live page's entries, a filter over their
 * labels, and scroll-spy. A group shows its endpoints while it is the one
 * being read, or while the filter matches them, as on flavorstudio.com/api.
 */

export type ApiNavEntry = {
  id: string;
  label: string;
  children?: ApiNavEntry[];
};

export function ApiNav({
  nav,
  className = "",
}: {
  nav: ApiNavEntry[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(nav[0]?.id ?? "");

  const ids = useMemo(
    () => nav.flatMap((e) => [e.id, ...(e.children ?? []).map((c) => c.id)]),
    [nav],
  );

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = els[0]?.id ?? "";
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
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
  }, [ids]);

  const q = query.trim().toLowerCase();
  const shown = nav
    .map((e) => {
      const kids = e.children ?? [];
      if (!q) return { ...e, kids };
      const hit = e.label.toLowerCase().includes(q);
      const matched = kids.filter((c) => c.label.toLowerCase().includes(q));
      if (!hit && !matched.length) return null;
      return { ...e, kids: hit ? kids : matched };
    })
    .filter((e) => e !== null);

  return (
    <nav aria-label="API reference" className={className}>
      <label className="block">
        <span className="sr-only">Search the API reference</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-[var(--radius-sm)] border border-hairline bg-white px-3 py-2 text-[14px] text-ink placeholder:text-ink-2"
        />
      </label>
      <ul className="m-0 mt-3 flex list-none flex-col gap-0.5 p-0">
        {shown.map((e) => {
          const open =
            !!q || e.id === active || e.kids.some((c) => c.id === active);
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="rail-item"
                data-active={e.id === active}
              >
                {e.label}
              </a>
              {open && e.kids.length ? (
                <ul className="m-0 mt-0.5 mb-1.5 ml-3 flex list-none flex-col gap-0.5 border-l border-hairline p-0 pl-2">
                  {e.kids.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className="block rounded-[var(--radius-xs)] px-2 py-1 text-[13px] text-ink-2 hover:text-ink data-[active=true]:font-semibold data-[active=true]:text-ink"
                        data-active={c.id === active}
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
        {!shown.length ? (
          <li className="px-3 py-2 text-[13px] text-ink-2">
            Nothing matches “{query}”.
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
