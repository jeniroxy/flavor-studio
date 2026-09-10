"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { AssetFrame } from "@/components/asset-frame";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { platformTabs } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * "The Platform" — six modules as pill tabs with an auto-advancing panel.
 * The rotation only runs while the section is on screen, and a manual tab
 * click stops it for good so it never fights the reader.
 */

const DWELL_MS = 4600;

export function PlatformTabs() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const active = platformTabs[index];

  const inView = useCallback(() => {
    const el = section.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || 800);
  }, []);

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    const id = setInterval(() => {
      if (inView()) setIndex((i) => (i + 1) % platformTabs.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [auto, inView]);

  // Panel contents animate in on every tab change: the copy staggers up and the
  // screenshot slides in. (Two further tweens used to run here, aimed at the
  // metric and bar nodes of the hand-drawn card this panel no longer contains —
  // they were animating empty NodeLists on every tab change.)
  useGSAP(
    () => {
      const box = panel.current;
      if (!box || prefersReducedMotion()) return;
      const items = box.querySelectorAll("[data-platitem]");
      const mock = box.querySelector("[data-platmock]");

      gsap.fromTo(
        box,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "none" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.06,
        },
      );
      if (mock)
        gsap.fromTo(
          mock,
          { opacity: 0, x: 28, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            delay: 0.12,
          },
        );
    },
    { scope: panel, dependencies: [index] },
  );

  return (
    <Block
      id="features"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div
        ref={section as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-[1180px]"
      >
        <div className="mx-auto max-w-[640px] text-center">
          <SectionLabel>The platform</SectionLabel>
          <SectionHeading>
            Recipes, labels, sensory, projects, CRM.
          </SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-4 text-[16px] leading-[1.65] text-slate-500"
          >
            Six modules, one ingredient library and one cost model. Every number
            below recomputes from the same source.
          </Reveal>
        </div>

        <Reveal className="mt-[clamp(28px,4vw,42px)] flex flex-wrap justify-center gap-[10px]">
          {platformTabs.map((tab, i) => {
            const isActive = i === index;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setAuto(false);
                }}
                aria-pressed={isActive}
                className="relative inline-flex min-h-[44px] cursor-pointer items-center gap-[9px] overflow-hidden rounded-full border px-5 py-[11px] text-[14px] font-bold whitespace-nowrap transition-[background,color,border-color,transform] duration-[180ms] hover:-translate-y-px"
                style={{
                  // blue-700, not blue-500: white on #59a3eb measures 2.67:1.
                  background: isActive ? "var(--color-blue-700)" : "#ffffff",
                  color: isActive ? "#ffffff" : "var(--color-slate-600)",
                  borderColor: isActive
                    ? "var(--color-blue-700)"
                    : "var(--color-gray-300)",
                  boxShadow: isActive
                    ? "0 8px 22px rgba(32,96,166,.3)"
                    : "0 2px 8px rgba(43,59,83,.05)",
                }}
              >
                <Icon name={tab.icon} className="text-[16px]" />
                <span>{tab.label}</span>
                {isActive && auto && (
                  <span
                    key={index}
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-white/55"
                    style={{
                      animation: `fsTabProgress ${DWELL_MS}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-[clamp(24px,3vw,36px)] overflow-hidden rounded-[20px] border border-gray-300 bg-white p-[clamp(24px,3.4vw,44px)] shadow-card"
        >
          <div
            ref={panel}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-center gap-[clamp(28px,4vw,56px)]"
          >
            <div>
              <div
                data-platitem=""
                className="inline-flex items-center gap-2 rounded-full px-[14px] py-[6px] text-[12px] font-extrabold tracking-[.06em] uppercase"
                style={{ background: active.badgeBg, color: active.badgeColor }}
              >
                <Icon name={active.icon} className="text-[15px]" />
                <span>{active.label}</span>
              </div>
              <h3
                data-platitem=""
                className="font-display mt-4 text-[clamp(23px,2.6vw,32px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-800"
              >
                {active.title}
              </h3>
              <p
                data-platitem=""
                className="mt-3 max-w-[46ch] text-[16px] leading-[1.65] text-slate-500"
              >
                {active.desc}
              </p>
              <div className="mt-5 flex flex-col gap-[11px]">
                {active.checks.map((check) => (
                  <div
                    key={check}
                    data-platitem=""
                    className="flex items-center gap-[10px] text-[14px] leading-[1.5] text-slate-700"
                  >
                    <Icon
                      name="check-one"
                      className="flex-none text-[16px] text-[#0e8b73]"
                    />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
              <a
                data-platitem=""
                href={active.href}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-extrabold text-blue-600 hover:text-blue-700"
              >
                <span>{active.cta}</span>
                <Icon name="arrow-right" className="text-[15px]" />
              </a>
            </div>

            {/* The real module screenshot. This slot used to hold a
                hand-drawn metric card, which showed the visitor an
                illustration of Flavor Studio rather than Flavor Studio. */}
            <div data-platmock="">
              <AssetFrame
                key={active.id}
                {...active.shot}
                sizes="(max-width: 960px) 100vw, 46vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Block>
  );
}
