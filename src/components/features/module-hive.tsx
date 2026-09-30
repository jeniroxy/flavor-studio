"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { Icon } from "@/components/icon";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import { GROUP, LINE } from "@/lib/module-style";
import { moduleGroups, modules, type Module } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The features-index hero visual: all eighteen modules as one honeycomb in
 * the shape of the logo's cells, coloured by group, beside an app window that
 * shows the real screen of the module in focus. Point at a hexagon (or tab to
 * it) and the window swaps to that module; click it to open its page.
 *
 * Until someone interacts, the focus walks the hive once every few seconds,
 * so the page shows that each cell is a real screen. Any hover or focus
 * stops the walk for good; reduced motion never starts it.
 */

/* Labels short enough for a hexagon; the full names are on the cards below. */
const SHORT: Record<string, string> = {
  claims: "Claims",
  designer: "Publish Designer",
  "taste-tests": "Taste Tests",
  timeline: "Timeline",
  board: "Board",
  "cr-builder": "CR Builder",
  publishing: "Publishing",
  integrations: "Integrations",
  admin: "Admin",
};

/* The group hues that need dark text when filled (white would fail 3:1). */
const DARK_ON = new Set(["#7fd234", "#59a3eb", "#18bc9c", "#efc051"]);

/* Rows of the honeycomb, alternating 5 and 4 so the rows interlock. */
const ORDERED = moduleGroups.flatMap((g) =>
  modules.filter((m) => m.group === g),
);
const ROWS = [5, 4, 5, 4].reduce<Module[][]>((acc, n) => {
  const start = acc.flat().length;
  acc.push(ORDERED.slice(start, start + n));
  return acc;
}, []);

/*
 * One icon element per module, made once. React skips an element it has seen
 * before, so the icon's svg is never rebuilt when the focus moves: a rebuilt
 * svg between mousedown and mouseup makes the browser drop the click.
 */
const ICONS: Record<string, ReactElement> = Object.fromEntries(
  ORDERED.map((m) => [m.id, <Icon key={m.id} name={m.icon} />]),
);

function shotOf(m: Module) {
  if (m.asset.src)
    return { src: m.asset.src, w: m.asset.width, h: m.asset.height };
  if (m.flow)
    return { src: m.flow.steps[0].src, w: m.flow.width, h: m.flow.height };
  return null;
}

export function ModuleHive() {
  const root = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);
  const [auto, setAuto] = useState(false);
  const mod = ORDERED[focus];
  const g = GROUP[mod.group as keyof typeof GROUP];
  const shot = shotOf(mod);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    observeOnce(el, () => {
      if (!prefersReducedMotion()) setAuto(true);
    });
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(
      () => setFocus((f) => (f + 1) % ORDERED.length),
      2600,
    );
    return () => window.clearInterval(t);
  }, [auto]);

  const pick = (m: Module) => {
    setAuto(false);
    setFocus(ORDERED.indexOf(m));
  };

  return (
    <div
      ref={root}
      className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
    >
      {/* the hive */}
      <div
        className="mx-auto flex flex-col items-center [--w:clamp(58px,11vw,88px)] lg:[--w:clamp(66px,6.4vw,92px)]"
        role="list"
        aria-label="Flavor Studio modules"
      >
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="flex gap-[4px]"
            style={{ marginTop: r ? "calc(var(--w) * -0.268)" : 0 }}
          >
            {row.map((m) => {
              const on = m === mod;
              const hue = GROUP[m.group as keyof typeof GROUP].hue;
              return (
                <Link
                  key={m.id}
                  href={routes.feature(m.id)}
                  role="listitem"
                  onMouseEnter={() => pick(m)}
                  onFocus={() => pick(m)}
                  aria-label={`${m.label}: ${LINE[m.id]}`}
                  className="group relative block outline-offset-4 transition-transform duration-300 ease-[var(--ease-out-soft)] hover:scale-[1.06] motion-reduce:transition-none"
                  style={{
                    width: "var(--w)",
                    transform: on ? "scale(1.1)" : undefined,
                    zIndex: on ? 2 : 1,
                  }}
                >
                  <span
                    className="hex-round flex aspect-[1/1.1547] w-full flex-col items-center justify-center gap-1 px-1.5 text-center transition-colors duration-300"
                    style={{
                      background: on ? hue : "#ffffff",
                      color: on
                        ? DARK_ON.has(hue)
                          ? "#16223a"
                          : "#ffffff"
                        : "#324561",
                    }}
                  >
                    <span
                      className="flex text-[clamp(15px,1.8vw,21px)]"
                      style={{ color: on ? "inherit" : hue }}
                    >
                      {ICONS[m.id]}
                    </span>
                    <span className="hidden text-[clamp(9px,0.8vw,10.5px)] leading-[1.15] font-bold sm:block">
                      {SHORT[m.id] ?? m.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        ))}

        {/* group key */}
        <div className="mt-6 flex max-w-[460px] flex-wrap justify-center gap-x-4 gap-y-2">
          {moduleGroups.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-2"
            >
              <span
                className="hex-round aspect-[1/1.1547] w-2.5"
                style={{ background: GROUP[name].hue }}
              />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* the module in focus, as the app shows it */}
      <Link
        href={routes.feature(mod.id)}
        tabIndex={-1}
        className="group block min-w-0"
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_30px_70px_rgba(22,34,58,0.18)] ring-1 ring-black/5">
          <div className="flex items-center gap-2 border-b border-[#e9e9e9] bg-[#f3f3f6] px-3.5 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-[#d9d9de]" />
            ))}
            <span className="ml-3 truncate rounded-[6px] bg-white px-3 py-1 font-mono text-[11.5px] text-ink-2">
              app.flavorstudio.com · {mod.label}
            </span>
          </div>
          <div className="relative aspect-[16/10] bg-[#f3f3f6]">
            {shot ? (
              <Image
                key={shot.src}
                src={shot.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-left-top"
                style={{ animation: "fsPopIn .4s var(--ease-out) both" }}
              />
            ) : null}
          </div>
        </div>
        <div
          key={mod.id}
          className="mt-5 flex items-start gap-3"
          style={{ animation: "fsPopIn .35s var(--ease-out) both" }}
        >
          <span
            className="hex-round mt-1 aspect-[1/1.1547] w-3 flex-none"
            style={{ background: g.hue }}
          />
          <span>
            <span className="block font-mono text-[11.5px] tracking-[.08em] text-ink-2 uppercase">
              {mod.group} · {mod.label}
            </span>
            <span className="font-display mt-1 block text-[clamp(20px,2vw,26px)] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
              {LINE[mod.id]}
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-700">
              Explore {mod.label}
              <Icon
                name="arrow-right"
                className="text-[15px] transition-transform group-hover:translate-x-1"
              />
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
