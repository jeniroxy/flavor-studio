"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui";
import type { Testimonial } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * ClickUp's featured-story carousel (customers index §5.2): one wide panel
 * card centred, its neighbours peeking at both edges at 40% opacity, circular
 * ← → arrows beneath. Auto-advances every 7s, pauses on hover/focus, and does
 * not auto-advance at all under prefers-reduced-motion.
 *
 * The portraits we have are 160px circular crops (see public/testimonials),
 * so the 280×358 portrait slot carries the avatar on a soft gradient ground
 * rather than stretching a small circle to fill it.
 */

const INTERVAL_MS = 7000;

export function FeaturedCarousel({
  items,
  className = "",
}: {
  items: Testimonial[];
  className?: string;
}) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, count, go]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setPaused(false);
    }
  };

  const trackVars = {
    "--cw": "min(820px, 88vw)",
    "--gap": "24px",
  } as CSSProperties;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured customer testimonials"
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <div className="overflow-hidden" style={trackVars}>
        <ul
          className="relative left-1/2 m-0 flex w-max list-none p-0"
          style={{
            gap: "var(--gap)",
            marginLeft: "calc(var(--cw) / -2)",
            transform: `translateX(calc(${-index} * (var(--cw) + var(--gap))))`,
            transition: reduced ? "none" : "transform .6s var(--ease-out-soft)",
          }}
        >
          {items.map((t, i) => {
            const active = i === index;
            return (
              <li
                key={t.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className="panel shrink-0 transition-opacity duration-500"
                style={{ width: "var(--cw)", opacity: active ? 1 : 0.4 }}
              >
                <div className="grid gap-6 p-5 md:grid-cols-[280px_1fr] md:p-6">
                  <div
                    className="relative h-[240px] w-full overflow-hidden rounded-[var(--radius-md)] md:h-[358px] md:w-[280px]"
                    style={{
                      background:
                        "linear-gradient(160deg, #eef6fd 0%, #dfe5ee 100%)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-display absolute top-1 right-4 text-[140px] leading-none font-bold text-white/70 select-none"
                    >
                      &rdquo;
                    </span>
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={160}
                      height={160}
                      className="absolute top-1/2 left-1/2 h-[168px] w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-float"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center py-1 md:pr-2">
                    <p className="font-display text-[clamp(17px,1.7vw,21px)] leading-[1.45] font-semibold tracking-[-0.01em] text-ink">
                      {t.quote}
                    </p>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <div className="text-[15px] font-bold text-ink">
                          {t.name}
                        </div>
                        <div className="text-[13px] text-ink-2">{t.role}</div>
                      </div>
                      <Button href={routes.stories} size="sm">
                        Read stories
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-[18px] text-ink transition-colors hover:bg-panel-2"
        >
          <Icon name="arrow-left" />
        </button>
        <span
          className="eyebrow eyebrow-muted min-w-[6ch] text-center text-[12px]"
          aria-live="polite"
        >
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-[18px] text-ink transition-colors hover:bg-panel-2"
        >
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}
