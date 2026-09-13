import type { CSSProperties, ReactNode } from "react";
import { HexLattice } from "@/components/hex";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

/*
 * The v3 layout language (the Corsearch-inspired pass the user landed on):
 * one light-gray canvas, every section a rounded "box block" inset from the
 * page edge, blocks separated by a single shared gutter.
 *
 * Everything below the block primitives is the site's small vocabulary of
 * surfaces and labels. There is deliberately one of each: one card, one media
 * frame, one eyebrow, one caption, one text link, one primary/secondary button
 * pair per tone. Pages compose these rather than restyling them.
 */

/** Vertical stack of box blocks, inset from the page edge by the shared gutter. */
export function BlockStack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-[var(--block-gap)] px-[var(--block-gap)] pb-[var(--block-gap)] ${className}`}
    >
      {children}
    </div>
  );
}

type BlockProps = {
  id?: string;
  children: ReactNode;
  /** Tailwind background utility; defaults to the white product surface. */
  className?: string;
  style?: CSSProperties;
  as?: "section" | "div" | "footer";
};

/** A single rounded box block on the canvas. */
export function Block({
  id,
  children,
  className = "",
  style,
  as: Tag = "section",
}: BlockProps) {
  return (
    <Tag
      id={id}
      style={style}
      className={`overflow-clip rounded-[clamp(20px,2vw,30px)] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Standard inner padding + max width for a block's content. */
export function BlockInner({
  children,
  className = "",
  max = "1180px",
}: {
  children: ReactNode;
  className?: string;
  max?: string;
}) {
  return (
    <div className={`mx-auto ${className}`} style={{ maxWidth: max }}>
      {children}
    </div>
  );
}

/*
 * Surfaces. One card treatment per tone, one media frame per tone.
 *
 * Cards are a soft fill with a hairline — no drop shadow, so a grid of them
 * reads as one calm panel rather than a stack of floating tiles. Media frames
 * (screenshots, flows, labels) get the site's one resting shadow so the real
 * product lifts slightly off the page; that is the only elevation on a light
 * block.
 */
export const CARD_LIGHT = "rounded-2xl border border-gray-300 bg-gray-050";
export const CARD_DARK = "rounded-2xl border border-white/10 bg-white/[.04]";
export const FRAME_LIGHT =
  "rounded-xl border border-gray-300 bg-white shadow-raised";
export const FRAME_DARK = "rounded-xl border border-white/10 bg-white";

/*
 * The navy canvas every hero sits on: a static gradient, the hexagon lattice
 * taken from the logo, and a soft vignette. The gradient used to pan on a 34s
 * loop and subpages carried a stock dot grid instead of the lattice; both are
 * gone, so every hero on the site now shares the landing hero's backdrop.
 */
export function HeroBackdrop({
  /** Landing's hero sits on a 165deg axis; subpages use 180deg. */
  angle = 180,
  lattice = true,
  id = "fsHeroHex",
}: {
  angle?: number;
  lattice?: boolean;
  /** Pattern id — must be unique if two backdrops share a page. */
  id?: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            angle === 165
              ? "linear-gradient(165deg, #253349 0%, #2b3d59 34%, #27374f 60%, #223047 82%, #1e2a3e 100%)"
              : "linear-gradient(180deg, #253349 0%, #2b3d59 30%, #27374f 55%, #223047 78%, #1e2a3e 100%)",
        }}
      />
      {lattice && <HexLattice id={id} opacity={0.45} />}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 32%, rgba(255,255,255,.05) 0%, rgba(0,0,0,0) 46%, rgba(11,18,32,.42) 100%)",
        }}
      />
    </>
  );
}

/**
 * The pill section label. Every section heading on the site uses this shape —
 * the outline-pill treatment the user standardised on from Success Stories.
 * It is the one pill on the site: everything below a section heading uses the
 * plain `Eyebrow`.
 */
export function SectionLabel({
  children,
  tone = "light",
  delay = 0,
}: {
  children: ReactNode;
  /** "light" = on white blocks; "dark" = on navy blocks. */
  tone?: "light" | "dark";
  delay?: number;
}) {
  const toneClass =
    tone === "dark"
      ? "border-white/20 text-white"
      : "border-gray-300 text-slate-700";
  return (
    <Reveal
      delay={delay}
      className={`inline-flex items-center rounded-full border px-[14px] py-[6px] text-[12px] font-extrabold tracking-[.14em] uppercase ${toneClass}`}
    >
      {children}
    </Reveal>
  );
}

/**
 * The in-card label: small caps, no border, no icon. Used for card headings,
 * module groups, plan names, list titles — anything that labels a part of a
 * section rather than the section itself.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`text-[12px] font-extrabold tracking-[.12em] uppercase ${
        tone === "dark" ? "text-slate-300" : "text-slate-500"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** The one caption style, under every screenshot, flow and label. */
export function Caption({
  children,
  tone = "light",
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  as?: "p" | "figcaption";
}) {
  return (
    <Tag
      className={`mt-[10px] text-[13px] leading-[1.5] ${
        tone === "dark" ? "text-slate-300" : "text-slate-500"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Section heading — display face, tight tracking, the site's one h2 style. */
export function SectionHeading({
  children,
  tone = "light",
  delay = 0.06,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      as={Tag}
      delay={delay}
      className={`font-display mt-[14px] text-[clamp(30px,3.6vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] ${
        tone === "dark" ? "text-white" : "text-slate-800"
      } ${className}`}
    >
      {children}
    </Reveal>
  );
}

/** The arrow text link that closes a section. */
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-[14px] font-extrabold ${
        tone === "dark"
          ? "text-white hover:text-slate-200"
          : "text-blue-600 hover:text-blue-700"
      } ${className}`}
    >
      <span>{children}</span>
      <Icon name="arrow-right" className="text-[15px]" />
    </a>
  );
}

/*
 * Buttons. Every button on the site is a pill: the lime primary, the blue
 * primary used on the closing bands, and one translucent secondary for navy
 * surfaces (plus its light twin below). The blue button's glow and the mixed
 * 12/14px corner radii are gone — one shape, one hover.
 */

/**
 * The lime pill CTA. Solid `#7fd234` with navy text — the reference colour the
 * user settled on after trying the lime→teal gradient.
 */
export function LimeButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full bg-[#7fd234] px-[32px] py-[15px] text-[16px] font-extrabold whitespace-nowrap text-[#16223a] shadow-lime transition-[background] duration-[180ms] hover:bg-[#8ede40] ${className}`}
    >
      {children}
    </a>
  );
}

/** The blue CTA used on every closing band. */
export function BlueButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full bg-blue-700 px-[32px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-blue-600 ${className}`}
    >
      {children}
    </a>
  );
}

/** Translucent secondary pill for use on the navy blocks. */
export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full border border-white/20 bg-white/[.06] px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.12] ${className}`}
    >
      {children}
    </a>
  );
}

/** Outlined secondary pill for the white blocks. */
export function OutlineButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full border border-gray-300 bg-white px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-slate-800 transition-[background] duration-[180ms] hover:bg-gray-100 ${className}`}
    >
      {children}
    </a>
  );
}
