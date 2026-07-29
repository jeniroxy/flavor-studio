"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { stories, testimonials } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * Two carousels in one block.
 *
 * Top: the success story card (photo left, content right), autoplaying every
 * 6.5s. Bottom: the customer testimonials — a raised centre card flanked by two
 * dimmed peeking cards, autoplaying every 4.2s. Both pause on interaction and
 * resume once the reader stops touching them.
 */

const STORY_INTERVAL = 6500;
const STORY_RESUME = 12000;
const TST_INTERVAL = 4200;
const TST_RESUME = 11000;

/** Autoplay that only ticks while `ref` is on screen, and can be paused. */
function useCarousel(
  length: number,
  intervalMs: number,
  resumeMs: number,
  ref: React.RefObject<HTMLElement | null>,
) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const back = useRef(false);
  const resume = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const inView = useCallback(() => {
    const el = ref.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < (window.innerHeight || 800);
  }, [ref]);

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    const id = setInterval(() => {
      if (inView()) setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [auto, inView, intervalMs, length]);

  useEffect(() => () => clearTimeout(resume.current), []);

  const go = useCallback(
    (next: number, goingBack = false) => {
      back.current = goingBack;
      setIndex(((next % length) + length) % length);
      setAuto(false);
      clearTimeout(resume.current);
      resume.current = setTimeout(() => setAuto(true), resumeMs);
    },
    [length, resumeMs],
  );

  return { index, go, back };
}

export function SuccessStories() {
  const storyWrap = useRef<HTMLDivElement>(null);
  const tstWrap = useRef<HTMLDivElement>(null);
  const storyCard = useRef<HTMLDivElement>(null);
  const tstTrack = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const story = useCarousel(
    stories.length,
    STORY_INTERVAL,
    STORY_RESUME,
    storyWrap,
  );
  const tst = useCarousel(
    testimonials.length,
    TST_INTERVAL,
    TST_RESUME,
    tstWrap,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const sync = () => setIsDesktop(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Story card slides in from whichever side it came from.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !storyCard.current) return;
      const dir = story.back.current ? -1 : 1;
      gsap.fromTo(
        storyCard.current,
        { opacity: 0, x: dir * 40 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" },
      );
    },
    { dependencies: [story.index] },
  );

  // Testimonial track shifts by one card so the clipped card travels into view.
  useGSAP(
    () => {
      const track = tstTrack.current;
      if (!track || prefersReducedMotion()) return;
      const dir = tst.back.current ? -1 : 1;
      gsap.fromTo(
        track.querySelectorAll("[data-tstitem]"),
        { x: dir * 34 },
        {
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.05,
          clearProps: "transform",
        },
      );
      const feature = track.querySelector("[data-tstfeature]");
      if (feature)
        gsap.fromTo(
          feature,
          { opacity: 0.35 },
          { opacity: 1, duration: 0.45, ease: "power2.out" },
        );
    },
    { dependencies: [tst.index] },
  );

  const current = stories[story.index];
  const len = testimonials.length;
  const prevCard = testimonials[(tst.index - 1 + len) % len];
  const centerCard = testimonials[tst.index];
  const nextCard = testimonials[(tst.index + 1) % len];

  const arrowClass =
    "flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-slate-700 transition-[background,color,transform] duration-[180ms] hover:bg-blue-500 hover:text-white";

  return (
    <Block
      id="stories"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* ---- header row: copy left, arrows pinned right ---- */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0 flex-[1_1_420px]">
            <SectionLabel>Success stories</SectionLabel>
            <SectionHeading className="!mt-4">
              Behind better products, there&rsquo;s Flavor Studio.
            </SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-3 max-w-[48ch] text-[16px] leading-[1.65] text-slate-500"
            >
              How Deli Star, Good Foods and Ripple Foods build and launch with
              Flavor Studio.
            </Reveal>
          </div>
          <Reveal delay={0.16} className="flex flex-none gap-3">
            <button
              type="button"
              onClick={() => story.go(story.index - 1, true)}
              aria-label="Previous story"
              className={`${arrowClass} h-[46px] w-[46px] hover:-translate-y-0.5`}
            >
              <Icon name="left" className="text-[20px]" />
            </button>
            <button
              type="button"
              onClick={() => story.go(story.index + 1)}
              aria-label="Next story"
              className={`${arrowClass} h-[46px] w-[46px] hover:-translate-y-0.5`}
            >
              <Icon name="right" className="text-[20px]" />
            </button>
          </Reveal>
        </div>

        {/* ---- story card ---- */}
        <Reveal delay={0.1} className="mt-[clamp(28px,3.6vw,44px)]">
          <div ref={storyWrap}>
            <div
              ref={storyCard}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-stretch gap-[clamp(24px,3vw,40px)]"
            >
              <div className="relative overflow-clip rounded-[20px]">
                {/* Background images rather than <img src>: an unresolved src
                    would fire a request for a placeholder string. */}
                <span
                  role="img"
                  aria-label={current.imgAlt}
                  className="block h-full min-h-[300px] w-full rounded-[20px] bg-gray-100 bg-cover bg-center"
                  style={{ backgroundImage: `url('${current.img}')` }}
                />
                <div className="absolute bottom-[18px] left-[18px] rounded-[14px] bg-white/95 px-4 py-[10px] backdrop-blur-[6px]">
                  <span
                    role="img"
                    aria-label={current.company}
                    className="block h-8 w-24 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${current.logo}')` }}
                  />
                </div>
              </div>

              <div className="bg-gray-050 flex flex-col rounded-[20px] border border-gray-300 p-[clamp(26px,3.2vw,40px)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[12px] font-bold tracking-[.14em] text-[#5c8f1c] uppercase">
                    {current.eyebrow}
                  </div>
                  <span className="flex-none rounded-full bg-blue-100 px-[13px] py-[5px] text-[12px] font-bold whitespace-nowrap text-blue-700">
                    {current.tag}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-[clamp(22px,2.5vw,31px)] leading-[1.18] font-extrabold tracking-[-0.02em] text-pretty text-slate-800">
                  {current.title}
                </h3>
                <p className="mt-[14px] text-[15.5px] leading-[1.65] text-pretty text-slate-500">
                  {current.blurb}
                </p>
                <div className="mt-auto pt-[clamp(22px,2.6vw,32px)]">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-300 pt-5">
                    <div>
                      <div className="text-[15px] font-extrabold text-slate-800">
                        {current.company}
                      </div>
                      <div className="mt-[2px] text-[13px] text-slate-400">
                        {current.meta}
                      </div>
                    </div>
                    <a
                      href={current.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gray-300 bg-white px-6 py-3 text-[14.5px] font-bold whitespace-nowrap text-slate-800 transition-[background,color,transform] duration-[180ms] hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white"
                    >
                      View full case study
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[26px] flex justify-center gap-[7px]">
              {stories.map((s, i) => (
                <button
                  key={s.company}
                  type="button"
                  onClick={() => story.go(i, i < story.index)}
                  aria-label={`Show ${s.company}`}
                  className="h-[7px] cursor-pointer rounded-full transition-[width,background] duration-[240ms]"
                  style={{
                    width: i === story.index ? "22px" : "7px",
                    background:
                      i === story.index
                        ? "var(--color-blue-500)"
                        : "var(--color-slate-200)",
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- testimonials, inside the same block ---- */}
        <div className="mt-[clamp(40px,4.6vw,64px)] border-t border-gray-300 pt-[clamp(34px,4vw,52px)]">
          <div className="mx-auto max-w-[620px] text-center">
            <SectionLabel>What customers say</SectionLabel>
            <Reveal
              as="h3"
              delay={0.06}
              className="font-display mt-3 text-[clamp(24px,2.8vw,36px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-800"
            >
              Teams ship more, retest less.
            </Reveal>
          </div>

          <Reveal
            delay={0}
            className="relative mt-[clamp(36px,5vw,56px)] px-[clamp(0px,4vw,68px)]"
          >
            <div ref={tstWrap}>
              <div
                ref={tstTrack}
                className="flex items-center justify-center gap-[clamp(14px,1.8vw,26px)]"
              >
                {isDesktop && <SideCard testimonial={prevCard} />}

                <div
                  data-tstitem=""
                  data-tstfeature=""
                  className="flex max-w-[480px] flex-[1_1_420px] flex-col rounded-[20px] border border-gray-300 bg-white p-[clamp(28px,3vw,38px)] shadow-[0_22px_54px_rgba(43,59,83,.14)]"
                >
                  <div className="font-display text-[52px] leading-[.7] font-extrabold text-blue-400">
                    &ldquo;
                  </div>
                  <p className="mt-[18px] text-[clamp(15.5px,1.5vw,17px)] leading-[1.65] text-pretty text-slate-700">
                    {centerCard.quote}
                  </p>
                  <div className="mt-[clamp(22px,2.4vw,30px)] flex items-center gap-[14px] border-t border-gray-300 pt-5">
                    <span
                      role="img"
                      aria-label={centerCard.name}
                      className="h-[52px] w-[52px] flex-none rounded-full bg-gray-100 bg-cover bg-center"
                      style={{ backgroundImage: `url('${centerCard.photo}')` }}
                    />
                    <div className="min-w-0">
                      <div className="text-[16px] leading-[1.25] font-extrabold text-slate-800">
                        {centerCard.name}
                      </div>
                      <div className="mt-[3px] text-[13px] leading-[1.4] text-slate-400">
                        {centerCard.role}
                      </div>
                    </div>
                  </div>
                </div>

                {isDesktop && <SideCard testimonial={nextCard} />}
              </div>

              <button
                type="button"
                onClick={() => tst.go(tst.index - 1, true)}
                aria-label="Previous testimonial"
                className={`${arrowClass} absolute top-1/2 left-0 z-4 h-12 w-12 -translate-y-1/2 shadow-[0_8px_24px_rgba(43,59,83,.14)]`}
              >
                <Icon name="left" className="text-[20px]" />
              </button>
              <button
                type="button"
                onClick={() => tst.go(tst.index + 1)}
                aria-label="Next testimonial"
                className={`${arrowClass} absolute top-1/2 right-0 z-4 h-12 w-12 -translate-y-1/2 shadow-[0_8px_24px_rgba(43,59,83,.14)]`}
              >
                <Icon name="right" className="text-[20px]" />
              </button>

              <div className="mt-[clamp(26px,3vw,38px)] flex justify-center gap-[7px]">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => tst.go(i, i < tst.index)}
                    aria-label={`Show ${t.name}`}
                    className="h-2 cursor-pointer rounded-full transition-[width,background] duration-[240ms]"
                    style={{
                      width: i === tst.index ? "22px" : "7px",
                      background:
                        i === tst.index
                          ? "var(--color-blue-500)"
                          : "var(--color-slate-200)",
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Block>
  );
}

/** The dimmed neighbour cards either side of the featured testimonial. */
function SideCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div
      data-tstitem=""
      className="flex-[0_1_300px] self-center rounded-[18px] border border-gray-300 bg-white p-6 opacity-55 shadow-[0_8px_22px_rgba(43,59,83,.06)]"
    >
      <div className="font-display text-[34px] leading-[.7] font-extrabold text-blue-300">
        &ldquo;
      </div>
      <p className="mt-[14px] text-[13.5px] leading-[1.6] text-pretty text-slate-500">
        {testimonial.quote}
      </p>
      <div className="mt-[18px] flex items-center gap-[11px]">
        <span
          role="img"
          aria-label={testimonial.name}
          className="h-10 w-10 flex-none rounded-full bg-gray-100 bg-cover bg-center"
          style={{ backgroundImage: `url('${testimonial.photo}')` }}
        />
        <div className="min-w-0">
          <div className="text-[14px] leading-[1.25] font-extrabold text-slate-800">
            {testimonial.name}
          </div>
          <div className="mt-[2px] text-[12px] leading-[1.35] text-slate-400">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}
