"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/*
 * The walkthrough engine behind every hero tab.
 *
 * A story is a handful of the app's own frames, exported untouched from the
 * Figma file "Flavor Studio Application", plus a script of steps. Everything
 * that moves is drawn on top of the frames: a camera that frames the part in
 * use, a pointer, click ripples, text being typed, an outlined box and a
 * caption naming the step. The scripts live in src/lib/stories, one per tab.
 *
 * Coordinates are in frame pixels, read off the Figma layers. The frame is
 * fitted inside the preview whatever its size; the camera zooms from there,
 * and harder on small screens, where the whole frame would be too small to
 * read.
 */

export type Cam = { cx: number; cy: number; zoom: number };
export type Box = { x: number; y: number; w: number; h: number };

export type StoryStep = {
  frame?: string;
  cam?: Cam;
  /** Pointer target; null parks it off the frame. */
  cursor?: [number, number] | null;
  click?: boolean;
  caption?: string;
  /** Types the text set for this frame in `Story.typing`. */
  typing?: boolean;
  /** Box to outline, in frame pixels; null clears it. */
  highlight?: Box | null;
  hold: number;
};

export type Story = {
  /** Public folder holding `<frame>.webp`. */
  dir: string;
  /** Frame width in pixels; every frame in a story shares it. */
  width: number;
  /** The height the camera fits at zoom 1 (the common frame height). */
  fitHeight: number;
  /** Frame id → height in pixels. */
  frames: Record<string, number>;
  steps: StoryStep[];
  /** Text typed into a field, per frame. */
  typing?: { frame: string; field: Box; text: string }[];
  /** Screen-reader description of the whole walkthrough. */
  label: string;
  /** Bumped whenever the frames are re-exported, so no browser keeps an old one. */
  version: number;
};

type State = {
  frame: string;
  cam: Cam;
  cursor: [number, number] | null;
  caption: string;
  typing: boolean;
  highlight: Box | null;
  /** Where the outline sits; kept after it clears so it fades out in place. */
  box: Box;
};

/* Each step only names what changes; carry the rest forward. */
function resolve(story: Story): State[] {
  let s: State = {
    frame: story.steps[0].frame ?? Object.keys(story.frames)[0],
    cam: { cx: story.width / 2, cy: story.fitHeight / 2, zoom: 1 },
    cursor: null,
    caption: "",
    typing: false,
    highlight: null,
    // Start where the first outline will be, so it fades in rather than
    // gliding in from the corner.
    box: story.steps.find((st) => st.highlight)?.highlight ?? {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    },
  };
  return story.steps.map((step) => {
    const frameChanged = step.frame && step.frame !== s.frame;
    s = {
      frame: step.frame ?? s.frame,
      cam: step.cam ?? s.cam,
      cursor: step.cursor === undefined ? s.cursor : step.cursor,
      caption: step.caption ?? s.caption,
      // Typed text belongs to the frame it was typed on.
      typing: step.typing ?? (frameChanged ? false : s.typing),
      highlight: step.highlight === undefined ? s.highlight : step.highlight,
      box: step.highlight ?? s.box,
    };
    return s;
  });
}

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function ScreenStory({
  story,
  active,
  onEnd,
}: {
  story: Story;
  active: boolean;
  /** Called each time the story has played through its last step. */
  onEnd?: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [resolved] = useState(() => resolve(story));
  const [size, setSize] = useState({ w: 896, h: 593 });
  const [i, setI] = useState(0);
  // Reduced motion holds the first frame until the visitor presses Play.
  const reduced = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;
  const [onScreen, setOnScreen] = useState(false);
  const [typed, setTyped] = useState(0);

  const src = (f: string) => `${story.dir}/${f}.webp?v=${story.version}`;

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Warm every frame once the tab is opened, so a step never lands on a
  // half-loaded image and closed tabs cost nothing.
  useEffect(() => {
    if (!active) return;
    Object.keys(story.frames).forEach((f) => {
      const img = new window.Image();
      img.src = `${story.dir}/${f}.webp?v=${story.version}`;
    });
  }, [active, story]);

  const running = playing && onScreen && active;
  const steps = story.steps;
  const endRef = useRef(onEnd);
  useEffect(() => {
    endRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => {
      const next = (i + 1) % steps.length;
      if (next === 0) setTyped(0);
      setI(next);
      if (next === 0) endRef.current?.();
    }, steps[i].hold);
    return () => window.clearTimeout(id);
  }, [i, running, steps]);

  const s = resolved[i];
  const typing = story.typing?.find((t) => t.frame === s.frame);
  const typedText = typing?.text ?? "";

  // The text types itself out once per pass through its step.
  useEffect(() => {
    if (!s.typing || !running) return;
    const id = window.setInterval(
      () => setTyped((n) => (n >= typedText.length ? n : n + 1)),
      85,
    );
    return () => window.clearInterval(id);
  }, [s.typing, running, typedText]);

  // Camera: fit the frame, then zoom. On phones the camera zooms harder and
  // follows the pointer, since the whole frame would be unreadable there.
  const W = story.width;
  const H = story.fitHeight;
  const small = size.w < 600;
  const frameH = story.frames[s.frame];
  const base = Math.min(size.w / W, size.h / H);
  const zoom = s.cam.zoom * (small ? 1.7 : 1);
  const k = base * zoom;
  const focus =
    small && s.cursor ? { cx: s.cursor[0], cy: s.cursor[1] } : s.cam;
  const place = (c: number, view: number, world: number) =>
    world * k <= view
      ? (view - world * k) / 2
      : Math.min(0, Math.max(view - world * k, view / 2 - c * k));
  const tx = place(focus.cx, size.w, W);
  // At zoom 1 a frame that fits is centred; a taller one is pinned to its
  // top, so the app's header is never pushed down by an empty band.
  const ty =
    zoom === 1 && !small
      ? Math.max(0, (size.h - frameH * k) / 2)
      : place(focus.cy, size.h, frameH);
  const toScreen = ([x, y]: [number, number]) => [x * k + tx, y * k + ty];
  const pointer = s.cursor ? toScreen(s.cursor) : [size.w + 40, size.h * 0.7];
  const move = `900ms ${EASE}`;

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={story.label}
      className="absolute inset-0 overflow-hidden bg-[#f3f3f6]"
    >
      {/* The world: every frame at full width, moved and scaled by the camera. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: W,
          height: frameH,
          transform: `translate(${tx}px, ${ty}px) scale(${k})`,
          transition: `transform ${move}`,
        }}
      >
        {Object.keys(story.frames).map((f) => (
          // eslint-disable-next-line @next/next/no-img-element -- exact exports, positioned in frame pixels
          <img
            key={f}
            src={src(f)}
            alt=""
            width={W}
            height={story.frames[f]}
            decoding="async"
            loading={f === resolved[0].frame ? "eager" : "lazy"}
            className="absolute top-0 left-0 max-w-none"
            style={{
              opacity: f === s.frame ? 1 : 0,
              transition: "opacity 420ms ease",
            }}
          />
        ))}

        {/* Text being typed into a field. */}
        {story.typing?.map((t) => (
          <span
            key={t.frame}
            className="absolute flex items-center font-['Avenir_Next',var(--font-mulish),sans-serif] text-[14px] font-medium text-[#324561]"
            style={{
              left: t.field.x + 14,
              top: t.field.y,
              height: t.field.h,
              opacity: s.frame === t.frame && typed > 0 ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          >
            {s.frame === t.frame ? t.text.slice(0, typed) : ""}
            {s.frame === t.frame && s.typing ? (
              <span className="ml-px inline-block h-[17px] w-px animate-[fsCaret_1s_steps(1)_infinite] bg-[#324561]" />
            ) : null}
          </span>
        ))}

        {/* The part in use, outlined; it glides with the camera. */}
        <span
          className="absolute rounded-[6px] ring-2 ring-blue-500"
          style={{
            left: s.box.x,
            top: s.box.y,
            width: s.box.w,
            height: s.box.h,
            background: "rgba(89,163,235,0.08)",
            opacity: s.highlight ? 1 : 0,
            transition: `opacity 300ms ease, left 900ms ${EASE}, top 900ms ${EASE}, width 900ms ${EASE}, height 900ms ${EASE}`,
          }}
        />
      </div>

      {/* Pointer and click ripple, in screen space so they stay one size. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0"
        style={{
          transform: `translate(${pointer[0]}px, ${pointer[1]}px)`,
          transition: `transform ${move}`,
        }}
      >
        {steps[i].click ? (
          <span
            key={i}
            className="absolute -top-4 -left-4 size-8 rounded-full bg-blue-500/35 [animation:fsClickRipple_0.5s_ease-out_both]"
          />
        ) : null}
        <svg
          viewBox="0 0 16 20"
          className={`relative h-[22px] w-[18px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] transition-transform duration-150 ${steps[i].click ? "scale-90" : ""}`}
        >
          <path
            d="M1 1v15.5l4.2-3.9 2.7 6 2.6-1.2-2.7-5.9H14z"
            fill="#202020"
            stroke="#fff"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Caption: which step of the story this is. Below lg it sits top left,
          clear of the "Explore" button the hero puts bottom right there. */}
      {s.caption ? (
        <p
          key={s.caption}
          aria-hidden="true"
          className="absolute top-3 left-3 max-w-[calc(100%-68px)] truncate lg:top-auto lg:bottom-3 lg:max-w-[calc(100%-24px)] rounded-[999px] bg-[#16223a]/90 px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white shadow-[0_6px_18px_rgba(22,34,58,0.25)] [animation:fsPopIn_0.35s_var(--ease-out)_both] sm:text-[13px]"
        >
          {s.caption}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setChoice(!playing)}
        aria-label={playing ? "Pause the walkthrough" : "Play the walkthrough"}
        className="absolute top-2 right-2 flex size-11 cursor-pointer items-center justify-center rounded-full"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white/90 text-[15px] text-ink shadow-[0_2px_8px_rgba(22,34,58,0.18)]">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            {playing ? (
              <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
            ) : (
              <path d="M3 1.2v9.6L10.5 6z" fill="currentColor" />
            )}
          </svg>
        </span>
      </button>
    </div>
  );
}
