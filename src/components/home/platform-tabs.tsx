"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { AssetFrame } from "@/components/asset-frame";
import { FlowPlayer } from "@/components/flow-player";
import { Icon } from "@/components/icon";
import {
  Block,
  CARD_LIGHT,
  Eyebrow,
  SectionHeading,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { platformTabs } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * "The Platform" — six modules as pill tabs with an auto-advancing panel.
 * The rotation only runs while the section is on screen, and a manual tab
 * click stops it for good so it never fights the reader.
 *
 * The tabs are flat pills (no glow on the active one, no lift on hover) and
 * the panel is the site's one card surface. The coloured badge that repeated
 * the tab's name inside the panel is gone — the active tab already says it.
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

  // On a tab change the panel cross-fades and the copy settles up a few px.
  // The screenshot used to slide in from the right and scale up as well; one
  // fade is enough.
  useGSAP(
    () => {
      const box = panel.current;
      if (!box || prefersReducedMotion()) return;
      const items = box.querySelectorAll("[data-platitem]");
      gsap.fromTo(
        box,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "none" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.05,
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

        <Reveal className="mt-[clamp(28px,4vw,42px)] flex flex-wrap justify-center gap-[8px]">
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
                className={`relative inline-flex min-h-[44px] cursor-pointer items-center gap-[9px] overflow-hidden rounded-full border px-5 py-[11px] text-[14px] font-bold whitespace-nowrap transition-[background,color,border-color] duration-[180ms] ${
                  isActive
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-gray-300 bg-white text-slate-700 hover:bg-gray-050"
                }`}
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
          className={`mt-[clamp(24px,3vw,36px)] overflow-hidden p-[clamp(24px,3.4vw,44px)] ${CARD_LIGHT}`}
        >
          <div
            ref={panel}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-center gap-[clamp(28px,4vw,56px)]"
          >
            <div>
              <div data-platitem="">
                <Eyebrow>{active.label}</Eyebrow>
              </div>
              <h3
                data-platitem=""
                className="font-display mt-3 text-[clamp(23px,2.6vw,32px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-800"
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
                    className="flex items-start gap-[10px] text-[14px] leading-[1.5] text-slate-700"
                  >
                    <Icon
                      name="check-one"
                      className="mt-[2px] flex-none text-[16px] text-[#0e8b73]"
                    />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
              <div data-platitem="" className="mt-6">
                <TextLink href={active.href}>{active.cta}</TextLink>
              </div>
            </div>

            {/* The real module screenshot. This slot used to hold a
                hand-drawn metric card, which showed the visitor an
                illustration of Flavor Studio rather than Flavor Studio. */}
            <div>
              {active.flow ? (
                <FlowPlayer
                  key={active.id}
                  flow={active.flow}
                  sizes="(max-width: 960px) 100vw, 46vw"
                />
              ) : (
                <AssetFrame
                  key={active.id}
                  {...active.shot}
                  sizes="(max-width: 960px) 100vw, 46vw"
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Block>
  );
}
