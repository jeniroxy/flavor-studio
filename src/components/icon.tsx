"use client";

import { Icon as IconifyIcon, addCollection } from "@iconify/react";
import subset from "@/lib/icon-park-subset.json";

/*
 * The design system specifies Icon Park – Outline, served in the prototype from
 * the Iconify CDN. Here the same icons are registered from a locally generated
 * subset (scripts/build-icons.cjs) so there is no runtime network dependency
 * and the bundle carries only the ~44 glyphs this site actually uses.
 */
addCollection(subset as Parameters<typeof addCollection>[0]);

type IconProps = {
  /** Icon Park name without the prefix, e.g. "chef-hat-one". */
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Icon({ name, className, style }: IconProps) {
  return (
    <IconifyIcon
      icon={`icon-park-outline:${name}`}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * LinkedIn has no glyph in Icon Park, so the brand mark is inlined — the same
 * exception the design system carves out for brand marks.
 */
export function LinkedInIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** The four-point "sparkle" that stands for the AI Agent throughout the site. */
export function SparkIcon({
  size = 14,
  fill = "#ffffff",
  gradientId,
}: {
  size?: number;
  fill?: string;
  gradientId?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
        fill={gradientId ? `url(#${gradientId})` : fill}
      />
      {gradientId && (
        <defs>
          <linearGradient id={gradientId} x1="2" y1="2" x2="22" y2="22">
            <stop stopColor="#59a3eb" />
            <stop offset="1" stopColor="#18bc9c" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
