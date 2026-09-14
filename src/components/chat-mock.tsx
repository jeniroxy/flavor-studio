"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * The AI transcript card — ClickUp's way of demoing AI: a human message, then
 * an agent reply with bullets, inside a card with a 1px gradient border. Ours
 * adds the one thing the client asked the Agent to always do: cite the recipe,
 * regulation or test the answer came from.
 *
 * Lines appear one after another once the card scrolls into view; the agent
 * reply "types" its first sentence. With reduced motion everything is simply
 * there.
 */

export type ChatLine =
  | { from: "user"; text: string }
  | { from: "agent"; text: string; bullets?: string[]; cite?: string };

export function ChatMock({
  lines,
  title = "AI Agent",
  tone = "light",
  className = "",
  autoplay = true,
  /** Delay between lines, ms. */
  gap = 900,
}: {
  lines: ChatLine[];
  title?: string;
  tone?: "light" | "dark";
  className?: string;
  autoplay?: boolean;
  gap?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(autoplay ? 0 : lines.length);
  const [typed, setTyped] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!autoplay) return;
    const el = root.current;
    if (!el) return;
    observeOnce(el, () => {
      if (prefersReducedMotion()) {
        setShown(lines.length);
        return;
      }
      let i = 0;
      const step = () => {
        i += 1;
        setShown(i);
        if (i < lines.length) window.setTimeout(step, gap);
      };
      window.setTimeout(step, 250);
    });
  }, [autoplay, gap, lines.length]);

  // Type the agent's first sentence.
  useEffect(() => {
    const idx = shown - 1;
    const line = lines[idx];
    if (!line || line.from !== "agent" || prefersReducedMotion()) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      setTyped((t) => ({ ...t, [idx]: n }));
      if (n >= line.text.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [shown, lines]);

  const dark = tone === "dark";

  return (
    <div
      ref={root}
      className={`ring-rainbow relative rounded-[14px] ${dark ? "bg-night-2" : "bg-white"} ${className}`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 py-3 text-[13px] font-semibold ${
          dark ? "border-hairline-dark text-white" : "border-hairline text-ink"
        }`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-500 text-[13px] text-ink">
          <Icon name="robot" />
        </span>
        {title}
        <span className={`ml-auto eyebrow text-[10px] ${dark ? "text-lime-400" : "text-ink-3"}`}>
          cites sources
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {lines.slice(0, shown).map((line, i) =>
          line.from === "user" ? (
            <div
              key={i}
              className="flex items-start gap-2.5"
              style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
            >
              <Image
                src="/assets/avatar-sample.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className={`text-[12px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
                  You
                </div>
                <div className={`text-[14px] leading-[1.5] ${dark ? "text-[#dcdcdc]" : "text-ink-2"}`}>
                  {line.text}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="flex items-start gap-2.5"
              style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-500 text-[14px] text-ink">
                <Icon name="robot" />
              </span>
              <div className="min-w-0">
                <div className={`text-[12px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
                  {title}
                </div>
                <div className={`text-[14px] leading-[1.5] ${dark ? "text-[#dcdcdc]" : "text-ink"}`}>
                  {typed[i] === undefined ? line.text : line.text.slice(0, typed[i])}
                  {typed[i] !== undefined && typed[i] < line.text.length ? (
                    <span
                      className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] bg-current"
                      style={{ animation: "fsCaret 1s steps(1) infinite" }}
                    />
                  ) : null}
                </div>
                {line.bullets && (typed[i] === undefined || typed[i] >= line.text.length) ? (
                  <ul
                    className={`mt-2 ml-4 list-disc space-y-1 text-[13px] leading-[1.5] ${
                      dark ? "text-[#b4b4b4]" : "text-ink-2"
                    }`}
                    style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
                  >
                    {line.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {line.cite && (typed[i] === undefined || typed[i] >= line.text.length) ? (
                  <div
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-[6px] px-2 py-1 text-[11px] ${
                      dark ? "bg-white/[.06] text-lime-400" : "bg-blue-100 text-blue-700"
                    }`}
                    style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
                  >
                    <Icon name="link" className="text-[12px]" />
                    {line.cite}
                  </div>
                ) : null}
              </div>
            </div>
          ),
        )}
        {shown < lines.length ? (
          <div className={`flex items-center gap-1 pl-10 text-[12px] ${dark ? "text-[#7b7b7b]" : "text-ink-3"}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" style={{ animation: "fsPulse 1s infinite" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-current" style={{ animation: "fsPulse 1s .2s infinite" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-current" style={{ animation: "fsPulse 1s .4s infinite" }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
