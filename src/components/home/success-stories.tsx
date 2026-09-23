"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/ui";
import { stories, testimonials } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/reveal";
import { routes } from "@/lib/routes";

/*
 * Two carousels in one section, matching the design at node 40000315:33194.
 *
 * Top: the success story card (photo left, copy right), autoplaying every
 * 6.5s. Bottom: the customer testimonials — a raised centre card flanked by
 * two dimmed peeking cards.
 *
 * The design builds this from the v1 components (`v1 / Story card`,
 * `v1 / Carousel arrow`, `v1 / Carousel dot`, `v1 / Pill label`), so this is
 * v1's own implementation carried over, with its retired primitives mapped to
 * the v2 equivalents: Block → Section/Container, SectionLabel → the .eyebrow
 * class, CARD_LIGHT → the design's #f9f9fb card, shadow-card → shadow-float.
 *
 * Only the story carousel autoplays. The testimonials used to advance every
 * 4.2s as well, which meant a reader part-way through a quote was carried off
 * it — two auto-advancing carousels stacked in one section is one too many.
 * The testimonials move only when the reader asks, via the arrows or dots.
 */

const STORY_INTERVAL = 6500;
const STORY_RESUME = 12000;
const TST_INTERVAL = 0; // 0 = no autoplay; see the note above
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
    if (!intervalMs || !auto || prefersReducedMotion()) return;
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

const ARROW =
  "flex cursor-pointer items-center justify-center rounded-full border border-hairline bg-white text-slate-700 transition-colors hover:bg-panel";

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

  return (
    <Section id="stories" className="py-[var(--section-gap)]">
      {/* wide, because the design lays this section out on a 1180px line */}
      <Container wide>
        {/* ---- header row: copy left, arrows pinned right ---- */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0 flex-[1_1_420px]">
            <p className="eyebrow">Success stories</p>
            <h2 className="font-display mt-4 text-[clamp(30px,3.6vw,48px)] leading-[1.12] font-bold tracking-[-0.025em] text-slate-900">
              Behind better products,
              <br />
              there&rsquo;s <span className="tail">Flavor Studio.</span>
            </h2>
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
              className={`${ARROW} h-[46px] w-[46px]`}
            >
              <Icon name="left" className="text-[20px]" />
            </button>
            <button
              type="button"
              onClick={() => story.go(story.index + 1)}
              aria-label="Next story"
              className={`${ARROW} h-[46px] w-[46px]`}
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
              /* 529 / 611 with a 40px gutter — the design's own split, so the
                 company line and its button share one row rather than wrapping. */
              className="grid grid-cols-1 items-stretch gap-[clamp(24px,3vw,40px)] lg:grid-cols-[minmax(0,529fr)_minmax(0,611fr)]"
            >
              <div className="relative overflow-clip rounded-[20px]">
                {/* Background images rather than <img src>: an unresolved src
                    would fire a request for a placeholder string. */}
                <span
                  role="img"
                  aria-label={current.imgAlt}
                  className="block h-full min-h-[300px] w-full rounded-[20px] bg-panel-2 bg-cover bg-center lg:min-h-[420px]"
                  style={{ backgroundImage: `url('${current.img}')` }}
                />
                <div className="absolute bottom-[18px] left-[18px] rounded-lg bg-white/95 px-4 py-[10px]">
                  <span
                    role="img"
                    aria-label={current.company}
                    className="block h-8 w-24 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${current.logo}')` }}
                  />
                </div>
              </div>

              <div className="flex flex-col rounded-[20px] border border-hairline bg-[#f9f9fb] p-[clamp(26px,3.2vw,40px)]">
                <p className="eyebrow">{current.eyebrow}</p>
                <h3 className="font-display mt-4 text-[clamp(22px,2.5vw,31px)] leading-[1.18] font-extrabold tracking-[-0.02em] text-pretty text-slate-900">
                  {current.title}
                </h3>
                <p className="mt-[14px] text-[16px] leading-[1.65] text-pretty text-slate-500">
                  {current.blurb}
                </p>
                <div className="mt-auto pt-[clamp(22px,2.6vw,32px)]">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
                    <div>
                      <div className="text-[15px] font-extrabold text-slate-900">
                        {current.company}
                      </div>
                      <div className="mt-[2px] text-[13px] text-slate-400">
                        {current.meta}
                      </div>
                    </div>
                    <a
                      href={routes.story(current.slug)}
                      className="rounded-full border border-hairline bg-white px-6 py-3 text-[14px] font-bold whitespace-nowrap text-slate-900 transition-colors hover:bg-panel"
                    >
                      View full case study
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Dots
              count={stories.length}
              index={story.index}
              label={(i) => `Show ${stories[i].company}`}
              onPick={story.go}
            />
          </div>
        </Reveal>

        {/* ---- testimonials, inside the same section ---- */}
        <div className="mt-[clamp(40px,4.6vw,64px)] border-t border-hairline pt-[clamp(34px,4vw,52px)]">
          <div className="mx-auto max-w-[620px] text-center">
            <span className="eyebrow inline-block rounded-full border border-hairline px-4 py-2">
              What customers say
            </span>
            <Reveal
              as="h3"
              delay={0.06}
              className="font-display mt-3 text-[clamp(24px,2.8vw,36px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-900"
            >
              In their own words.
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
                  className="flex max-w-[480px] flex-[1_1_420px] flex-col rounded-[20px] border border-hairline bg-white p-[clamp(28px,3vw,38px)] shadow-float"
                >
                  <div className="font-display text-[52px] leading-[.7] font-extrabold text-blue-300">
                    &ldquo;
                  </div>
                  <p className="mt-[18px] text-[clamp(15.5px,1.5vw,17px)] leading-[1.65] text-pretty text-slate-700">
                    {centerCard.quote}
                  </p>
                  <div className="mt-[clamp(22px,2.4vw,30px)] flex items-center gap-[14px] border-t border-hairline pt-5">
                    <span
                      role="img"
                      aria-label={centerCard.name}
                      className="h-[52px] w-[52px] flex-none rounded-full bg-panel-2 bg-cover bg-center"
                      style={{ backgroundImage: `url('${centerCard.photo}')` }}
                    />
                    <div className="min-w-0">
                      <div className="text-[16px] leading-[1.25] font-extrabold text-slate-900">
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
                className={`${ARROW} absolute top-1/2 left-0 z-[4] h-12 w-12 -translate-y-1/2`}
              >
                <Icon name="left" className="text-[20px]" />
              </button>
              <button
                type="button"
                onClick={() => tst.go(tst.index + 1)}
                aria-label="Next testimonial"
                className={`${ARROW} absolute top-1/2 right-0 z-[4] h-12 w-12 -translate-y-1/2`}
              >
                <Icon name="right" className="text-[20px]" />
              </button>

              <Dots
                count={testimonials.length}
                index={tst.index}
                label={(i) => `Show ${testimonials[i].name}`}
                onPick={tst.go}
                className="mt-[clamp(26px,3vw,38px)]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** The pill dots under each carousel; the active one stretches. */
function Dots({
  count,
  index,
  label,
  onPick,
  className = "mt-[26px]",
}: {
  count: number;
  index: number;
  label: (i: number) => string;
  onPick: (next: number, back?: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`flex justify-center gap-[7px] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(i, i < index)}
          aria-label={label(i)}
          aria-current={i === index}
          className="flex min-h-[24px] min-w-[24px] cursor-pointer items-center justify-center"
        >
          <span
            className="block h-[7px] rounded-full transition-[width,background] duration-[240ms]"
            style={{
              width: i === index ? "22px" : "7px",
              background:
                i === index
                  ? "var(--color-blue-700)"
                  : "var(--color-slate-300)",
            }}
          />
        </button>
      ))}
    </div>
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
      className="flex-[0_1_300px] self-center rounded-[20px] border border-hairline bg-white p-6 opacity-55"
    >
      <div className="font-display text-[34px] leading-[.7] font-extrabold text-blue-300">
        &ldquo;
      </div>
      <p className="mt-[14px] text-[14px] leading-[1.6] text-pretty text-slate-500">
        {testimonial.quote}
      </p>
      <div className="mt-[18px] flex items-center gap-[11px]">
        <span
          role="img"
          aria-label={testimonial.name}
          className="h-10 w-10 flex-none rounded-full bg-panel-2 bg-cover bg-center"
          style={{ backgroundImage: `url('${testimonial.photo}')` }}
        />
        <div className="min-w-0">
          <div className="text-[14px] leading-[1.25] font-extrabold text-slate-900">
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
