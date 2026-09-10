"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SparkIcon } from "@/components/icon";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * The AI Agent hero's looping vignette: the question types itself in character
 * by character, thinking dots appear, then the answer lands line by line with
 * its source chips. Repeats indefinitely.
 *
 * The question and answer used to be a sodium-reduction claim, answered with a
 * "Reduced sodium" verdict and a 21 CFR 101.61 citation. All of it was
 * invented. A marketing page asserting a regulatory outcome under a real CFR
 * number is a liability, so the vignette now shows a nutrition comparison
 * instead — arithmetic over the customer's own two recipes, no law — and the
 * figures are the ones in the product screenshot further down this page.
 */

const QUESTION = "Compare Recipe A and Recipe B per 40 g serving.";
const SOURCES = ["Protein Brownie v3", "Classic Fudge", "4 sources"];

export function AgentHeroChat() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = root.current;
      if (!card) return;
      const q = (sel: string) => card.querySelector<HTMLElement>(sel);
      const bubble = q("[data-agq]");
      const text = q("[data-agqtext]");
      const caret = q("[data-agcaret]");
      const dots = q("[data-agdots]");
      const lines = Array.from(
        card.querySelectorAll<HTMLElement>("[data-agline]"),
      );
      if (!bubble || !text || !caret || !dots || !lines.length) return;

      // Reduced motion gets the finished conversation, no typing.
      if (prefersReducedMotion()) {
        text.textContent = QUESTION;
        gsap.set([bubble, ...lines], { opacity: 1, y: 0 });
        gsap.set([dots, caret], { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.6 });

      tl.set(bubble, { opacity: 0, y: 8 }, 0)
        .set(lines, { opacity: 0, y: 8 }, 0)
        .set(dots, { opacity: 0 }, 0)
        .set(caret, { opacity: 1 }, 0)
        .call(
          () => {
            text.textContent = "";
          },
          undefined,
          0,
        );

      tl.to(
        bubble,
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        0.1,
      );

      const typed = { n: 0 };
      tl.to(
        typed,
        {
          n: QUESTION.length,
          duration: 1.9,
          ease: "none",
          onUpdate: () => {
            text.textContent = QUESTION.slice(0, Math.round(typed.n));
          },
        },
        0.35,
      );
      tl.to(caret, { opacity: 0, duration: 0.2 }, 2.35);

      tl.to(dots, { opacity: 1, duration: 0.25 }, 2.5)
        .to(dots, { opacity: 0, duration: 0.2 }, 3.5)
        .to(
          lines,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.22,
            ease: "power2.out",
          },
          3.6,
        );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative min-w-0">
      <div className="overflow-hidden rounded-[18px] border border-white/10 bg-slate-900 shadow-window">
        <div className="flex items-center gap-[9px] border-b border-white/[.08] px-4 py-[13px]">
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-teal-500">
            <SparkIcon size={13} />
          </span>
          <span className="text-[13px] font-extrabold text-white">
            AI Agent
          </span>
          <span className="ml-auto inline-flex items-center gap-[5px] text-[11px] font-bold text-[#4fd8bd]">
            <span
              className="h-[6px] w-[6px] rounded-full bg-teal-500"
              style={{ animation: "fsPulse 2s ease infinite" }}
            />
            Online
          </span>
        </div>

        <div className="relative h-[330px] overflow-hidden p-4">
          <div
            data-agq=""
            className="ml-auto max-w-[88%] rounded-[13px_13px_4px_13px] bg-blue-500 px-[13px] py-[10px] text-[13px] leading-[1.5] text-white opacity-0"
          >
            <span data-agqtext="" />
            <span
              data-agcaret=""
              className="ml-px inline-block h-3 w-0.5 -translate-y-[2px] bg-white align-[-2px]"
            />
          </div>

          <div
            data-agdots=""
            className="mt-[10px] inline-flex gap-1 rounded-xl bg-white/[.07] px-[13px] py-[10px] opacity-0"
          >
            {[0, 0.15, 0.3].map((d) => (
              <span
                key={d}
                className="h-[5px] w-[5px] rounded-full bg-slate-300"
                style={{ animation: `fsDot 1.2s ease ${d}s infinite` }}
              />
            ))}
          </div>

          <div className="mt-[10px] flex flex-col gap-[7px]">
            <div
              data-agline=""
              className="rounded-[13px_13px_13px_4px] border border-white/[.08] bg-white/[.07] px-[13px] py-[10px] text-[13px] leading-[1.55] text-[#dfe5ee] opacity-0"
            >
              Recipe A carries{" "}
              <strong className="text-white">+5 g protein</strong>,{" "}
              <strong className="text-[#4fd8bd]">7 g less sugar</strong> and 40
              fewer calories.
            </div>
            <div
              data-agline=""
              className="rounded-[10px] border border-white/[.08] bg-white/[.05] px-3 py-[9px] text-[12px] text-[#dfe5ee] opacity-0"
            >
              Highlighted rows show the biggest gaps between the two versions.
            </div>
            <div
              data-agline=""
              className="flex flex-wrap items-center gap-[6px] opacity-0"
            >
              <span className="text-[11px] font-bold tracking-[.06em] text-slate-500 uppercase">
                Sources
              </span>
              {SOURCES.map((src) => (
                <span
                  key={src}
                  className="rounded-full bg-white/[.07] px-[9px] py-[3px] text-[11px] text-slate-300"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
