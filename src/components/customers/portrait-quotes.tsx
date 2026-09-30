import Image from "next/image";
import { RevealStagger } from "@/components/reveal";
import type { Testimonial } from "@/lib/data";

/*
 * "Loved by food developers" — ClickUp's three 346×613 vertical testimonial
 * tiles (customers index §5.5): a tall portrait card with the quote, name and
 * title overlaid on a bottom scrim.
 *
 * Our portraits are 160px circular crops, so each tile is a brand-gradient
 * ground with the avatar at the top and the quote under it; the tile sizes
 * to its quote rather than to ClickUp's fixed 613px height, which left most
 * of each card empty.
 */

/* Three stops of the brand ramp, each dark enough for white copy. */
const GROUNDS = [
  "linear-gradient(165deg, #17467f 0%, #2060a6 100%)",
  "linear-gradient(165deg, #2060a6 0%, #0f6e5e 100%)",
  "linear-gradient(165deg, #1a7f8c 0%, #0f6e5e 100%)",
];

export function PortraitQuotes({
  items,
  className = "",
}: {
  items: Testimonial[];
  className?: string;
}) {
  return (
    <RevealStagger
      stagger={0.08}
      className={`grid gap-5 sm:grid-cols-3 ${className}`}
    >
      {items.map((t, i) => (
        <figure
          key={t.name}
          className="relative m-0 flex flex-col overflow-hidden rounded-[var(--radius-lg)] p-6 text-white"
          style={{ background: GROUNDS[i % GROUNDS.length] }}
        >
          <span
            aria-hidden="true"
            className="font-display absolute top-2 right-5 text-[140px] leading-none font-bold text-white/10 select-none"
          >
            &rdquo;
          </span>
          <Image
            src={t.photo}
            alt=""
            width={160}
            height={160}
            className="relative size-[76px] rounded-full object-cover ring-2 ring-white/30"
          />
          <blockquote className="font-display relative m-0 mt-6 text-[20px] leading-[1.35] font-semibold tracking-[-0.01em]">
            {t.quote}
          </blockquote>
          <figcaption className="relative mt-auto pt-6">
            <div className="text-[13.5px] font-bold">{t.name}</div>
            <div className="text-[12.5px] text-white/90">{t.role}</div>
          </figcaption>
        </figure>
      ))}
    </RevealStagger>
  );
}
