"use client";

import { useState } from "react";
import { RevealStagger } from "@/components/reveal";
import {
  formatNewsDate,
  newsCategories,
  type NewsCategory,
  type NewsEntry,
} from "@/lib/news";

/*
 * ClickUp's blog index: a category filter row over a 3-column grid of cards
 * (category chip, date, title, summary). Ours is static — the entries come
 * from src/lib/news.ts and the full note opens inline in a <details>.
 */

type Filter = "all" | NewsCategory;

export function NewsFeed({ entries }: { entries: NewsEntry[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? entries : entries.filter((e) => e.category === filter);
  const count = (c: Filter) =>
    c === "all"
      ? entries.length
      : entries.filter((e) => e.category === c).length;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        {(["all", ...newsCategories] as Filter[]).map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={filter === c}
            className="pill-tab"
            onClick={() => setFilter(c)}
          >
            {c === "all" ? "All updates" : c}
            <span className="text-[12px] opacity-60">{count(c)}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="panel mt-8 p-6 text-[14px] text-ink-2">
          No updates in this category yet — it will fill as they ship.
        </p>
      ) : (
        <RevealStagger
          key={filter}
          stagger={0.06}
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {shown.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="card flex scroll-mt-[90px] flex-col p-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="chip">{entry.category}</span>
                <time
                  dateTime={entry.date}
                  className="eyebrow eyebrow-muted text-[11px]"
                >
                  {formatNewsDate(entry.date)}
                </time>
              </div>
              <h3 className="font-display mt-4 text-[19px] leading-[1.3] font-bold text-ink">
                {entry.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">
                {entry.summary}
              </p>
              <details className="group mt-auto pt-4">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:text-blue-600 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Read the full note</span>
                  <span className="hidden group-open:inline">Hide</span>
                </summary>
                <div className="mt-3 flex flex-col gap-3 border-t border-hairline pt-3">
                  {entry.body.map((para, i) => (
                    <p key={i} className="text-[14px] leading-[1.7] text-ink-2">
                      {para}
                    </p>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </RevealStagger>
      )}
    </div>
  );
}
