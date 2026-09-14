import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/icon";
import { Reveal, RevealStagger } from "@/components/reveal";
import { customerLogos } from "@/lib/data";
import { trialLine } from "@/lib/routes";

/*
 * The v2 vocabulary. Every page composes these; the CSS classes they use live
 * in globals.css under @layer components. One of each: one container, one
 * eyebrow, one headline (with the fading tail), one button family, one
 * hairline grid, one logo strip, one gradient banner, one rainbow CTA, one
 * security strip, one stat cell, one FAQ heading.
 */

/* ------------------------------------------------------------ layout */

export function Section({
  id,
  children,
  className = "",
  as: Tag = "section",
  style,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "header" | "footer";
  style?: CSSProperties;
}) {
  return (
    <Tag id={id} className={`relative ${className}`} style={style}>
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`${wide ? "container-wide" : "container-fs"} ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------- typography */

export function Eyebrow({
  children,
  className = "",
  tone = "accent",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "muted" | "dark";
  as?: "div" | "span" | "p";
}) {
  const t =
    tone === "muted" ? "eyebrow-muted" : tone === "dark" ? "eyebrow-dark" : "";
  return <Tag className={`eyebrow ${t} ${className}`}>{children}</Tag>;
}

/**
 * Two-tone mono label: `PRIMARY / secondary` — the category heading pattern
 * on ClickUp's features index.
 */
export function TwoTone({
  primary,
  secondary,
  className = "",
}: {
  primary: string;
  secondary: string;
  className?: string;
}) {
  return (
    <div className={`eyebrow flex flex-wrap items-center gap-2 ${className}`}>
      <span>{primary}</span>
      <span className="text-ink-3">/</span>
      <span className="text-ink-3">{secondary}</span>
    </div>
  );
}

type HeadlineSize = "hero" | "xl" | "lg" | "md" | "sm";

const SIZES: Record<HeadlineSize, string> = {
  hero: "text-[clamp(38px,5.2vw,64px)] leading-[1.06] tracking-[-0.035em] font-bold",
  xl: "text-[clamp(38px,5.6vw,76px)] leading-[1.05] tracking-[-0.04em] font-bold",
  lg: "text-[clamp(32px,3.6vw,48px)] leading-[1.15] tracking-[-0.035em] font-bold",
  md: "text-[clamp(26px,2.9vw,40px)] leading-[1.18] tracking-[-0.03em] font-bold",
  sm: "text-[clamp(22px,2.2vw,26px)] leading-[1.25] tracking-[-0.02em] font-bold",
};

/**
 * The site's one headline. `tail` is the trailing phrase set in grey — the
 * clickup.com signature. `gradient` fades the whole line instead.
 */
export function Headline({
  children,
  tail,
  size = "lg",
  as: Tag = "h2",
  className = "",
  gradient = false,
  reveal = true,
  delay = 0,
}: {
  children: ReactNode;
  tail?: ReactNode;
  size?: HeadlineSize;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  gradient?: boolean;
  reveal?: boolean;
  delay?: number;
}) {
  const inner = (
    <>
      {gradient ? <span className="tail-grad">{children}</span> : children}
      {tail ? (
        <>
          {" "}
          <span className="tail">{tail}</span>
        </>
      ) : null}
    </>
  );
  const cls = `font-display ${SIZES[size]} ${className}`;
  if (!reveal) return <Tag className={cls}>{inner}</Tag>;
  return (
    <Reveal as={Tag} delay={delay} className={cls}>
      {inner}
    </Reveal>
  );
}

export function Lede({
  children,
  className = "",
  delay = 0.06,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal
      as="p"
      delay={delay}
      className={`text-[clamp(16px,1.35vw,18px)] leading-[1.6] ${
        tone === "dark" ? "text-[#b4b4b4]" : "text-ink-2"
      } ${className}`}
    >
      {children}
    </Reveal>
  );
}

/** Centered section head: eyebrow, headline, lede. */
export function SectionHead({
  eyebrow,
  title,
  tail,
  lede,
  align = "center",
  size = "lg",
  as = "h2",
  className = "",
  tone = "light",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  tail?: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  size?: HeadlineSize;
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <div
      className={`${center ? "mx-auto max-w-[780px] text-center" : "max-w-[720px]"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow className="mb-4" tone={tone === "dark" ? "dark" : "accent"}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <Headline as={as} size={size} tail={tail} delay={0.04}>
        {title}
      </Headline>
      {lede ? (
        <Lede className={`mt-4 ${center ? "mx-auto max-w-[620px]" : ""}`} tone={tone}>
          {lede}
        </Lede>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ buttons */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "lime"
  | "ghost-dark";

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  external = false,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <Icon name="arrow-right" className="text-[1.05em]" /> : null}
    </>
  );
  if (!href)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  if (external || href.startsWith("http") || href.startsWith("mailto:"))
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Primary CTA with the trial microcopy beside it. */
export function CtaRow({
  href,
  label = "Request a demo",
  secondary,
  note = trialLine,
  className = "",
  tone = "light",
  size = "lg",
  align = "left",
}: {
  href: string;
  label?: string;
  secondary?: { label: string; href: string };
  note?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <Button
        href={href}
        variant={tone === "dark" ? "inverse" : "primary"}
        size={size}
        arrow
      >
        {label}
      </Button>
      {secondary ? (
        <Button
          href={secondary.href}
          variant={tone === "dark" ? "ghost-dark" : "secondary"}
          size={size}
        >
          {secondary.label}
        </Button>
      ) : null}
      {note ? (
        <span
          className={`max-w-[160px] text-[12px] leading-[1.4] ${
            tone === "dark" ? "text-[#b4b4b4]" : "text-ink-2"
          }`}
        >
          {note}
        </span>
      ) : null}
    </div>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-[14px] font-semibold ${
        tone === "dark" ? "text-white hover:text-[#dedede]" : "text-blue-700 hover:text-blue-600"
      } ${className}`}
    >
      {children}
      <Icon name="arrow-right" className="text-[15px]" />
    </Link>
  );
}

/* ------------------------------------------------------------- lists */

export function Tick({
  tone = "green",
  className = "",
}: {
  tone?: "green" | "red" | "blue" | "white" | "lime";
  className?: string;
}) {
  const color =
    tone === "red"
      ? "text-red-500"
      : tone === "blue"
        ? "text-blue-600"
        : tone === "white"
          ? "text-white"
          : tone === "lime"
            ? "text-lime-500"
            : "text-green-600";
  return (
    <Icon
      name={tone === "red" ? "close" : "check"}
      className={`tick text-[16px] ${color} ${className}`}
    />
  );
}

export function CheckList({
  items,
  tone = "green",
  className = "",
  textClass = "text-ink-2",
}: {
  items: ReactNode[];
  tone?: "green" | "red" | "blue" | "white" | "lime";
  className?: string;
  textClass?: string;
}) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map((item, i) => (
        <li key={i} className={textClass}>
          <Tick tone={tone} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------- logo strip */

const fit = (w: number, h: number, maxH = 30, maxW = 110) => {
  const s = Math.min(maxH / h, maxW / w);
  return { width: Math.round(w * s), height: Math.round(h * s) };
};

/**
 * "TRUSTED BY …" + six monochrome marks. ClickUp swaps its set every ~8s
 * with a blur-in; ours rotates through the eight real customer logos.
 */
export function LogoStrip({
  label = "Trusted by food & beverage teams",
  className = "",
  tone = "light",
  bordered = true,
  count = 6,
}: {
  label?: string;
  className?: string;
  tone?: "light" | "dark";
  bordered?: boolean;
  count?: number;
}) {
  const logos = customerLogos.slice(0, count);
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-4 ${
        bordered ? "border-y border-hairline py-6" : ""
      } ${className}`}
    >
      <Eyebrow tone={tone === "dark" ? "dark" : "muted"} className="shrink-0">
        {label}
      </Eyebrow>
      <RevealStagger stagger={0.05} className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {logos.map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.w}
            height={logo.h}
            className={`shrink-0 object-contain transition-[filter,opacity] duration-300 ${
              tone === "dark"
                ? "opacity-70 invert brightness-200 grayscale hover:opacity-100"
                : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            }`}
            style={fit(logo.w, logo.h)}
          />
        ))}
      </RevealStagger>
    </div>
  );
}

/* --------------------------------------------------------- stat cells */

export type Stat = { label: string; value: string; desc: string };

/** Four hairline cells: mono label, big value, small description. */
export function StatCells({
  stats,
  tone = "light",
  className = "",
}: {
  stats: Stat[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <RevealStagger
      stagger={0.07}
      className={`${dark ? "hairline-grid-dark" : "hairline-grid"} grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex min-h-[200px] flex-col p-6">
          <Eyebrow tone={dark ? "dark" : "accent"} className="text-[12px]">
            {s.label}
          </Eyebrow>
          <div className={`stat-value mt-6 ${dark ? "text-white" : ""}`}>
            {s.value}
          </div>
          <div
            className={`mt-auto pt-6 text-[13px] leading-[1.5] ${dark ? "text-[#b4b4b4]" : "text-ink-2"}`}
          >
            {s.desc}
          </div>
        </div>
      ))}
    </RevealStagger>
  );
}

/* ------------------------------------------------------- gradient bands */

/**
 * The dark→brand gradient banner that closes a feature page's pillars:
 * logo, headline, body left; a cropped product shot right.
 */
export function GradientBanner({
  title,
  body,
  image,
  cta,
  className = "",
}: {
  title: ReactNode;
  body?: ReactNode;
  image?: { src: string; alt: string; width: number; height: number };
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <Reveal
      className={`noise relative overflow-hidden rounded-[var(--radius-xl)] text-white ${className}`}
      style={{ background: "var(--grad-banner)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 right-[-10%] h-[160%] w-[50%] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(140,209,53,.55), rgba(89,163,235,0))",
          animation: "fsGlowDrift 14s ease-in-out infinite",
        }}
      />
      <div className="relative grid items-center gap-8 p-[clamp(28px,4vw,48px)] lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Image
            src="/assets/logo-light-text.svg"
            alt="Flavor Studio"
            width={160}
            height={32}
            className="h-7 w-auto"
          />
          <h3 className="font-display mt-6 text-[clamp(24px,2.6vw,32px)] leading-[1.2] font-bold tracking-[-0.02em] text-white">
            {title}
          </h3>
          {body ? (
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-white/80">
              {body}
            </p>
          ) : null}
          {cta ? (
            <Button href={cta.href} variant="inverse" className="mt-6" arrow>
              {cta.label}
            </Button>
          ) : null}
        </div>
        {image ? (
          <div className="relative -mb-[clamp(28px,4vw,48px)] hidden lg:block">
            <div className="frame-dark shadow-window">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/**
 * The rainbow closing card every page ends on: headline, white CTA, logo row,
 * and a product shot cropped by the card's bottom edge.
 */
export function RainbowCta({
  title,
  cta = { label: "Request a demo", href: "/request-demo" },
  note = trialLine,
  image,
  logos = true,
  id,
  className = "",
}: {
  title: ReactNode;
  cta?: { label: string; href: string };
  note?: ReactNode;
  image?: { src: string; alt: string; width: number; height: number };
  logos?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <Section id={id} className={`py-[clamp(24px,3vw,40px)] ${className}`}>
      <div className="px-[clamp(12px,1.6vw,20px)]">
        <Reveal
          className="noise relative overflow-hidden rounded-[var(--radius-3xl)] text-white"
          style={{ background: "var(--grad-cta)" }}
        >
          <div className="relative px-[clamp(24px,5vw,72px)] pt-[clamp(48px,6vw,80px)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-display max-w-[16ch] text-[clamp(30px,3.6vw,52px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
                {title}
              </h2>
              <div className="flex shrink-0 items-center gap-4">
                <Button href={cta.href} variant="inverse" size="lg" arrow>
                  {cta.label}
                </Button>
                {note ? (
                  <span className="max-w-[140px] text-[12px] leading-[1.4] text-white/85">
                    {note}
                  </span>
                ) : null}
              </div>
            </div>
            {logos ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                {customerLogos.slice(0, 7).map((logo) => (
                  <Image
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="object-contain opacity-90 brightness-0 invert"
                    style={fit(logo.w, logo.h, 26, 96)}
                  />
                ))}
              </div>
            ) : null}
            {image ? (
              <div className="mt-[clamp(32px,4vw,56px)] overflow-hidden rounded-t-[var(--radius-lg)] border border-white/20 bg-white shadow-window">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1280px) 100vw, 1180px"
                  className="max-h-[420px] w-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="pb-[clamp(48px,6vw,80px)]" />
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------- security strip */

export const securityMarks = [
  { label: "2FA", desc: "Two-factor authentication", icon: "key-one" },
  { label: "Roles", desc: "Per-user and per-group rights", icon: "peoples" },
  { label: "Encrypted", desc: "Secure end-to-end encryption", icon: "lock" },
  { label: "Your IP", desc: "Your recipes stay yours", icon: "shield" },
];

/** "Security everywhere" — heading left, four hairline cells right. */
export function SecurityStrip({ className = "" }: { className?: string }) {
  return (
    <Container className={className}>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Headline size="md" tail="everywhere.">
            Security
          </Headline>
          <div className="eyebrow eyebrow-muted mt-5 flex items-center gap-2">
            <Icon name="headset-one" className="text-[16px]" />
            24/7 support · phone, email, in-app
          </div>
        </div>
        <RevealStagger stagger={0.06} className="hairline-grid grid-cols-2 sm:grid-cols-4">
          {securityMarks.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-3 px-3 py-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-[22px] text-ink">
                <Icon name={m.icon} />
              </span>
              <span className="eyebrow eyebrow-muted text-[11px]">{m.label}</span>
              <span className="text-[12px] leading-[1.4] text-ink-2">{m.desc}</span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </Container>
  );
}

/* ---------------------------------------------------------------- misc */

/** "FAQs" with the s in grey. */
export function FaqHeading({ className = "" }: { className?: string }) {
  return (
    <Headline size="lg" className={`text-center ${className}`} tail="s">
      FAQ
    </Headline>
  );
}

/** Icon in a 44px soft tile — the icon-grid pattern. */
export function IconTile({
  name,
  className = "",
  tone = "light",
}: {
  name: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-[22px] ${
        tone === "dark"
          ? "bg-white/[.06] text-lime-400"
          : "bg-blue-100 text-blue-700"
      } ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold tracking-[.06em] text-blue-700 uppercase ${className}`}
    >
      {children}
    </span>
  );
}
