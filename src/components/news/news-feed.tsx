"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import {
  formatNewsDate,
  newsCategories,
  type NewsCategory,
  type NewsEntry,
} from "@/lib/news";

/*
 * The feed as a changelog: a category filter, then one entry per row on a
 * dated timeline, newest at the top. The date column and the rail make the
 * order and the pace of updates readable at a glance, which is the point of
 * the page (the client wants visitors to see active development). Each
 * category has its own hue from the brand ramp, on its hexagon and its chip.
 * The full note opens in place.
 */

type Filter = "all" | NewsCategory;

const CATEGORY: Record<NewsCategory, { hue: string; icon: string }> = {
  "New module": { hue: "#7fd234", icon: "all-application" },
  Improvement: { hue: "#59a3eb", icon: "trending-up" },
  Integration: { hue: "#18bc9c", icon: "plug" },
  Announcement: { hue: "#2060a6", icon: "newspaper-folding" },
  Event: { hue: "#efc051", icon: "calendar-three" },
};

export function NewsFeed({ entries }: { entries: NewsEntry[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const shown =
    filter === "all" ? entries : entries.filter((e) => e.category === filter);
  const count = (c: Filter) =>
    c === "all"
      ? entries.length
      : entries.filter((e) => e.category === c).length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        {(["all", ...newsCategories] as Filter[]).map((c) => {
          const on = filter === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-semibold transition-colors ${
                on
                  ? "bg-[#16223a] text-white"
                  : "bg-[#f1f4f8] text-ink hover:bg-[#e6ebf2]"
              }`}
            >
              {c !== "all" ? (
                <span
                  className="hex-round aspect-[1/1.1547] w-2.5"
                  style={{ background: CATEGORY[c].hue }}
                />
              ) : null}
              {c === "all" ? "All updates" : c}
              <span className={on ? "text-white/80" : "text-ink-2"}>
                {count(c)}
              </span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-[var(--radius-lg)] bg-panel p-6 text-[14px] text-ink-2">
          No updates in this category yet — it will fill as they ship.
        </p>
      ) : (
        <ol key={filter} className="relative mt-10 list-none p-0">
          {/* the rail */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-8 left-[19px] w-[2px] md:left-[199px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #2060a6, #59a3eb 50%, #18bc9c)",
            }}
          />
          {shown.map((entry) => {
            const cat = CATEGORY[entry.category];
            const isOpen = open === entry.slug;
            return (
              <Reveal
                as="li"
                key={entry.slug}
                id={entry.slug}
                className="relative grid scroll-mt-[90px] grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-2 pb-8 md:grid-cols-[164px_40px_minmax(0,1fr)] md:gap-x-5"
              >
                <time
                  dateTime={entry.date}
                  className="col-start-2 row-start-1 self-center font-mono text-[12.5px] tracking-[.06em] text-ink-2 uppercase md:col-start-1 md:self-start md:pt-3 md:text-right"
                >
                  {formatNewsDate(entry.date)}
                </time>
                <span
                  aria-hidden="true"
                  className="hex-round relative col-start-1 row-start-1 flex aspect-[1/1.1547] w-10 items-center justify-center text-white md:col-start-2"
                  style={{ background: cat.hue }}
                >
                  <Icon name={cat.icon} className="text-[17px]" />
                </span>
                <article className="col-start-2 row-start-2 rounded-[var(--radius-lg)] border border-hairline bg-white p-[clamp(18px,2.4vw,26px)] transition-shadow hover:shadow-[0_14px_34px_rgba(22,34,58,0.08)] md:col-start-3 md:row-start-1">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-bold text-ink"
                    style={{ background: `${cat.hue}29` }}
                  >
                    {entry.category}
                  </span>
                  <h3 className="font-display mt-3 text-[clamp(19px,1.9vw,23px)] leading-[1.25] font-bold tracking-[-0.015em] text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-ink-2">
                    {entry.summary}
                  </p>
                  {isOpen ? (
                    <div className="mt-4 flex flex-col gap-3 border-t border-hairline pt-4">
                      {entry.body.map((para, i) => (
                        <p
                          key={i}
                          className="text-[15px] leading-[1.7] text-ink-2"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : entry.slug)}
                    className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[14px] font-bold text-blue-700 hover:text-blue-600"
                  >
                    {isOpen ? "Hide" : "Read the full note"}
                    <Icon
                      name="down"
                      className={`text-[14px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </ol>
      )}
    </div>
  );
}
