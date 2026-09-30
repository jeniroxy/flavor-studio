"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * Two feature-page rows have no screen in the app design yet: deadline
 * reminders (Projects) and dependencies (Timeline). The Figma file only has
 * designer mockups for them, marked "NOT IN DEV". Rather than a grey
 * placeholder, each gets an illustration drawn in the app's own look
 * (navy bar, sky blue, lime, Avenir), labelled "Illustration" so nobody
 * mistakes it for a screenshot. The figures and names are sample data, the
 * same kind the design mockups use.
 */

const APP = "font-['Avenir_Next',var(--font-mulish),sans-serif]";

function Tag() {
  return (
    <span className="absolute top-3 right-3 z-10 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10.5px] tracking-[.06em] text-slate-600 uppercase shadow-sm ring-1 ring-black/5">
      Illustration
    </span>
  );
}

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observeOnce(el, () => {
      setStill(prefersReducedMotion());
      setSeen(true);
    });
  }, []);
  return { ref, seen, still };
}

/* ------------------------------------------------------------ reminder */

export function ReminderIllustration() {
  const { ref, seen, still } = useSeen<HTMLDivElement>();
  const show = (d: number) => ({
    opacity: seen ? 1 : 0,
    transform: seen ? "none" : "translateY(10px)",
    transition: still
      ? "none"
      : `opacity .5s ease ${d}ms, transform .6s var(--ease-out-soft) ${d}ms`,
  });

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: a reminder e-mail from Flavor Studio two days before a task is due, with the task, its project, due date and time left"
      className={`${APP} relative bg-[#eef1f6] p-[clamp(12px,3vw,28px)] pt-12 text-slate-800`}
    >
      <Tag />
      {/* The inbox line the e-mail arrives as. */}
      <div
        className="flex items-center gap-3 rounded-[10px] bg-white px-3.5 py-2.5 shadow-[0_6px_18px_rgba(22,34,58,0.08)]"
        style={show(0)}
      >
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-[#324561] text-[15px] text-lime-400">
          <Icon name="alarm-clock" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-bold">
            Reminder: &ldquo;Finalize cost sheet&rdquo; is due in 2 days
          </span>
          <span className="block text-[11px] text-slate-600">
            Flavor Studio · Tue, Sep 22 · 9:00 AM
          </span>
        </span>
        <span className="size-2 flex-none rounded-full bg-[#59a3eb]" />
      </div>

      {/* The e-mail itself. */}
      <div
        className="mx-auto mt-4 max-w-[440px] overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_rgba(22,34,58,0.12)]"
        style={show(160)}
      >
        <div className="flex h-11 items-center justify-center bg-[#324561]">
          <span className="hex-round flex w-6 aspect-[1/1.1547] items-center justify-center bg-lime-500" />
        </div>
        <div className="p-[clamp(14px,2.4vw,22px)]">
          <p className="text-[14px] font-bold">Hi Maya,</p>
          <p className="mt-1 text-[12.5px] leading-[1.5] text-slate-600">
            A task assigned to you is coming up. Here is everything you need to
            wrap it up on time.
          </p>
          <div className="mt-3 rounded-[10px] border border-[#e3e7ee] bg-[#f7f9fc] p-3">
            <div className="text-[10px] font-bold tracking-[.05em] text-slate-600 uppercase">
              18.095.04 · Oat milk latte launch
            </div>
            <div className="mt-1 text-[14px] font-bold">
              Finalize cost sheet
            </div>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-full bg-[#fcf3da] px-2 py-0.5 text-[10.5px] font-semibold text-[#7a5a00]">
                Active
              </span>
              <span className="rounded-full bg-[#e3effc] px-2 py-0.5 text-[10.5px] font-semibold text-[#1f5a96]">
                Stage 3
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#e3e7ee] pt-2.5 text-[11px]">
              {[
                ["Due", "Thu, Sep 24", ""],
                ["Time left", "2 days", "text-[#a0620a]"],
                ["Sub-tasks", "2 of 3 done", ""],
              ].map(([k, v, c]) => (
                <span key={k}>
                  <span className="block text-[9.5px] font-bold tracking-[.05em] text-slate-600 uppercase">
                    {k}
                  </span>
                  <span className={`block font-bold ${c}`}>{v}</span>
                </span>
              ))}
            </div>
          </div>
          <span className="mt-3 inline-flex rounded-[8px] bg-[#1f6fb2] px-4 py-2 text-[12.5px] font-bold text-white">
            Open task
          </span>
        </div>
      </div>

      {/* When it went out: two days before the due date. */}
      <div
        className="mx-auto mt-4 grid max-w-[440px] grid-cols-5 gap-1.5 text-center text-[10.5px]"
        style={show(320)}
      >
        {["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"].map((d) => {
          const sent = d === "Tue 22";
          const due = d === "Thu 24";
          return (
            <span
              key={d}
              className={`rounded-[8px] px-1 py-2 ${sent ? "bg-[#1f6fb2] text-white" : due ? "bg-white font-bold text-[#a0620a] ring-2 ring-[#efc051]" : "bg-white/70 text-slate-600"}`}
            >
              <span className="block font-semibold">{d}</span>
              <span className="mt-0.5 block text-[9.5px]">
                {sent ? "Reminder sent" : due ? "Due" : " "}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- dependencies */

/* Days from Oct 5; the chart runs 26 days, to Oct 31. */
const SPAN = 26;
const pct = (d: number) => `${(d / SPAN) * 100}%`;
const DATES = [0, 3, 6, 9, 12, 15, 18, 21];
const label = (d: number) => `Oct ${5 + d}`;

type Row = {
  who: string;
  tint: string;
  name: string;
  from: number;
  to: number;
  moved?: { from: number; to: number };
  kind: "done" | "bar" | "milestone";
};

const ROWS: Row[] = [
  {
    who: "DK",
    tint: "#8cd135",
    name: "Co-packer trial batch",
    from: 0,
    to: 7,
    kind: "done",
  },
  {
    who: "MI",
    tint: "#7b61ff",
    name: "Shelf-life study",
    from: 6,
    to: 15,
    moved: { from: 10, to: 19 },
    kind: "bar",
  },
  {
    who: "RS",
    tint: "#efc051",
    name: "Packaging artwork",
    from: 15,
    to: 19,
    moved: { from: 19, to: 23 },
    kind: "bar",
  },
  {
    who: "JR",
    tint: "#18bc9c",
    name: "Gate 3 review",
    from: 19,
    to: 19,
    moved: { from: 23, to: 23 },
    kind: "milestone",
  },
];
const ROW_H = 54;

export function DependencyIllustration() {
  const { ref, seen, still } = useSeen<HTMLDivElement>();
  const [moved, setMoved] = useState(false);
  const [touched, setTouched] = useState(false);

  // Play the slip once, a beat after the chart is first seen.
  useEffect(() => {
    if (!seen || touched) return;
    const t = setTimeout(() => setMoved(true), still ? 0 : 1200);
    return () => clearTimeout(t);
  }, [seen, still, touched]);

  const span = (r: Row) =>
    moved && r.moved ? r.moved : { from: r.from, to: r.to };
  const ease = still
    ? "none"
    : "left .8s var(--ease-out-soft), width .8s var(--ease-out-soft), top .8s var(--ease-out-soft), height .8s var(--ease-out-soft)";

  /* Finish-to-start links: trial → shelf-life → artwork → gate. */
  const links = [0, 1, 2].map((i) => {
    const a = span(ROWS[i]);
    const b = span(ROWS[i + 1]);
    return { x1: a.to, y1: i, x2: b.from, y2: i + 1 };
  });

  return (
    <div
      ref={ref}
      className={`${APP} relative bg-white p-[clamp(12px,2.4vw,22px)] text-slate-800`}
    >
      <Tag />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pr-24">
        <span className="text-[15px] font-bold">Gate 3 · Pilot run</span>
        <span className="text-[12px] text-slate-600">Dependencies</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={moved}
          onClick={() => {
            setTouched(true);
            setMoved((m) => !m);
          }}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-[#1f6fb2] px-3.5 text-[12px] font-bold text-white hover:bg-[#2060a6]"
        >
          <Icon name={moved ? "refresh" : "right"} className="text-[13px]" />
          {moved ? "Put it back" : "Move the shelf-life study +4 days"}
        </button>
        <span
          className="rounded-full bg-[#fdebec] px-2.5 py-1 text-[11px] font-bold text-[#b42318]"
          style={{ opacity: moved ? 1 : 0, transition: "opacity .4s ease" }}
          aria-hidden={!moved}
        >
          Gate moved → Oct 28
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(96px,30%)_1fr] text-[12px]">
        {/* names */}
        <div>
          <div className="h-8 border-b border-[#e9e9e9] text-[10px] font-bold tracking-[.05em] text-slate-600 uppercase">
            Task
          </div>
          {ROWS.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-2 border-b border-[#f0f2f5] pr-2"
              style={{ height: ROW_H }}
            >
              <span
                className="flex size-6 flex-none items-center justify-center rounded-full text-[9.5px] font-bold text-white"
                style={{ background: r.tint }}
              >
                {r.who}
              </span>
              <span className="leading-tight font-semibold">{r.name}</span>
            </div>
          ))}
        </div>
        {/* chart */}
        <div className="relative min-w-0">
          <div className="relative h-8 border-b border-[#e9e9e9]">
            {DATES.map((d) => (
              <span
                key={d}
                className="absolute top-2 hidden text-[10px] text-slate-600 sm:block"
                style={{ left: pct(d) }}
              >
                {label(d)}
              </span>
            ))}
            {DATES.filter((_, i) => i % 2 === 0).map((d) => (
              <span
                key={d}
                className="absolute top-2 text-[10px] text-slate-600 sm:hidden"
                style={{ left: pct(d) }}
              >
                {label(d)}
              </span>
            ))}
          </div>
          <div className="relative" style={{ height: ROW_H * ROWS.length }}>
            {DATES.map((d) => (
              <span
                key={d}
                className="absolute inset-y-0 w-px bg-[#f0f2f5]"
                style={{ left: pct(d) }}
              />
            ))}

            {/* links, drawn as elbows that follow the bars */}
            {links.map((l, i) => {
              const midX = l.x1 + 0.35;
              const top1 = l.y1 * ROW_H + ROW_H / 2;
              const top2 = l.y2 * ROW_H + ROW_H / 2;
              const hot = moved && i > 0;
              const c = hot ? "#e5484d" : "#8891a7";
              return (
                <span key={i} aria-hidden="true">
                  <span
                    className="absolute h-[2px]"
                    style={{
                      left: pct(l.x1),
                      width: pct(0.35),
                      top: top1 - 1,
                      background: c,
                      transition: ease,
                    }}
                  />
                  <span
                    className="absolute w-[2px]"
                    style={{
                      left: pct(midX),
                      top: top1,
                      height: top2 - top1,
                      background: c,
                      transition: ease,
                    }}
                  />
                  <span
                    className="absolute h-[2px]"
                    style={{
                      left: pct(midX),
                      width: `calc(${pct(Math.max(l.x2 - midX, 0))})`,
                      top: top2 - 1,
                      background: c,
                      transition: ease,
                    }}
                  />
                </span>
              );
            })}

            {/* ghosts of where the moved items were */}
            {ROWS.map((r, i) =>
              r.moved && r.kind === "bar" ? (
                <span
                  key={`g-${r.name}`}
                  aria-hidden="true"
                  className="absolute rounded-[6px] border-2 border-dashed border-[#c4cedd]"
                  style={{
                    left: pct(r.from),
                    width: pct(r.to - r.from),
                    top: i * ROW_H + 14,
                    height: ROW_H - 28,
                    opacity: moved ? 1 : 0,
                    transition: "opacity .4s ease",
                  }}
                />
              ) : null,
            )}

            {/* bars */}
            {ROWS.map((r, i) => {
              const s = span(r);
              if (r.kind === "milestone")
                return (
                  <span
                    key={r.name}
                    className="absolute"
                    style={{
                      left: `calc(${pct(s.from)} - 9px)`,
                      top: i * ROW_H + ROW_H / 2 - 9,
                      transition: ease,
                    }}
                  >
                    <span
                      className={`block size-[18px] rotate-45 ${moved ? "bg-[#e5484d]" : "bg-[#324561]"}`}
                      style={{ transition: "background .4s ease" }}
                    />
                    {/* Under the diamond, so it never runs off the chart's end. */}
                    <span
                      className={`absolute top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold whitespace-nowrap ${moved ? "text-[#b42318]" : "text-slate-800"}`}
                    >
                      {label(s.from)}
                    </span>
                  </span>
                );
              const color =
                r.kind === "done"
                  ? "#8cd135"
                  : moved && r.moved
                    ? r.name === "Shelf-life study"
                      ? "#e5484d"
                      : "#efc051"
                    : "#59a3eb";
              return (
                <span
                  key={r.name}
                  className="absolute flex items-center overflow-hidden rounded-[6px] px-2 text-[11px] font-bold whitespace-nowrap text-[#16223a]"
                  style={{
                    left: pct(s.from),
                    width: pct(s.to - s.from),
                    top: i * ROW_H + 14,
                    height: ROW_H - 28,
                    background: color,
                    transition: `${ease === "none" ? "" : ease + ", "}background .4s ease`,
                  }}
                >
                  {r.kind === "done" ? "Done ✓" : ""}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* What the slip did, as the app would report it. */}
      <div
        className="mt-3 rounded-[10px] border border-[#e3e7ee] bg-[#f7f9fc] p-3 text-[12px]"
        style={{ opacity: moved ? 1 : 0.35, transition: "opacity .4s ease" }}
        aria-live="polite"
      >
        <div className="font-bold">
          {moved ? "Shelf-life study moved +4 days" : "Nothing moved yet"}
        </div>
        <div className="mt-0.5 text-slate-600">
          {moved
            ? "2 dependent items rescheduled"
            : "Move the shelf-life study to see what follows it."}
        </div>
        {moved ? (
          <ul className="mt-2 flex list-none flex-col gap-1 p-0">
            <li className="flex justify-between gap-3">
              <span>Packaging artwork</span>
              <span className="font-bold text-[#b42318]">Oct 20 → Oct 24</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Gate 3 review</span>
              <span className="font-bold text-[#b42318]">Oct 24 → Oct 28</span>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
