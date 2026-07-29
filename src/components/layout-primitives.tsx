import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/*
 * The v3 layout language (the Corsearch-inspired pass the user landed on):
 * one light-gray canvas, every section a rounded "box block" inset from the
 * page edge, blocks separated by a single shared gutter.
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

/** The animated navy canvas every hero (and the two dark bands) sits on. */
export function HeroBackdrop({
  /** Landing's hero pans on a 165deg axis; subpages use 180deg. */
  angle = 180,
  vignette = true,
  dots = true,
}: {
  angle?: number;
  vignette?: boolean;
  dots?: boolean;
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
          backgroundSize: "100% 220%",
          backgroundPosition: "50% 0%",
          animation: "fsHeroPan 20s ease-in-out infinite",
          willChange: "background-position",
        }}
      />
      {dots && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      {/* Blue orb, lower-left. Drifts on 17s so it never syncs with the green one. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[34%] left-[-14%] h-[760px] w-[760px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(96,152,220,.22) 0%, rgba(96,152,220,0) 62%)",
          filter: "blur(10px)",
          animation: "fsOrbA 17s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Green orb hugging the right edge, counter-drifting on 23s. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-4%] right-[-16%] h-[820px] w-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(98,168,86,.2) 0%, rgba(74,132,90,.08) 44%, rgba(98,168,86,0) 66%)",
          filter: "blur(12px)",
          animation: "fsOrbB 23s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {vignette && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 32%, rgba(255,255,255,.05) 0%, rgba(0,0,0,0) 46%, rgba(11,18,32,.42) 100%)",
          }}
        />
      )}
    </>
  );
}

/**
 * The pill section label. Every section heading on the site uses this shape —
 * the outline-pill treatment the user standardised on from Success Stories.
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
      className={`inline-flex items-center rounded-full border px-[14px] py-[6px] text-[11.5px] font-extrabold tracking-[.14em] uppercase ${toneClass}`}
    >
      {children}
    </Reveal>
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

/**
 * The lime pill CTA. Solid `#7fd234` with navy text — the reference colour the
 * user settled on after trying the lime→teal gradient.
 */
export function LimeButton({
  href,
  children,
  className = "",
  sheen = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** The hero's primary CTA carries a travelling highlight. */
  sheen?: boolean;
}) {
  return (
    <a
      href={href}
      className={`relative inline-block overflow-hidden rounded-full bg-[#7fd234] px-[34px] py-[16px] text-[16px] font-extrabold whitespace-nowrap text-[#16223a] shadow-[0_12px_30px_rgba(127,210,52,.3)] transition-[background,transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:bg-[#8ede40] hover:shadow-[0_18px_40px_rgba(127,210,52,.42)] ${className}`}
    >
      {children}
      {sheen && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-2/5"
          style={{
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 100%)",
            animation: "fsSheen 3.4s ease-in-out infinite",
          }}
        />
      )}
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
      className={`inline-block rounded-[14px] bg-blue-500 px-[32px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white shadow-[0_12px_30px_rgba(89,163,235,.4)] transition-[background,transform] duration-[180ms] hover:-translate-y-0.5 hover:bg-blue-600 ${className}`}
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
  radius = "999px",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  radius?: string;
}) {
  return (
    <a
      href={href}
      style={{ borderRadius: radius }}
      className={`inline-block border border-white/[.14] bg-white/[.07] px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.14] ${className}`}
    >
      {children}
    </a>
  );
}
