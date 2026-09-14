import Image from "next/image";
import { RevealStagger } from "@/components/reveal";
import type { Testimonial } from "@/lib/data";

/*
 * "Loved by food developers" — ClickUp's three 346×613 vertical testimonial
 * tiles (customers index §5.5): a tall portrait card with the quote, name and
 * title overlaid on a bottom scrim.
 *
 * Our portraits are 160px circular crops, so each tile is a brand-gradient
 * ground with the avatar set at the top instead of a full-bleed photo.
 */

const GROUNDS = [
  "var(--grad-banner)",
  "linear-gradient(165deg, #2060a6 0%, #18bc9c 100%)",
  "linear-gradient(165deg, #324561 0%, #0a0c10 100%)",
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
          className="noise relative m-0 aspect-[347/613] max-h-[613px] overflow-hidden rounded-[var(--radius-lg)] text-white"
          style={{ background: GROUNDS[i % GROUNDS.length] }}
        >
          <span
            aria-hidden="true"
            className="font-display absolute top-2 right-5 text-[160px] leading-none font-bold text-white/10 select-none"
          >
            &rdquo;
          </span>
          <Image
            src={t.photo}
            alt=""
            width={160}
            height={160}
            className="absolute top-6 left-6 h-[112px] w-[112px] rounded-full object-cover ring-2 ring-white/30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 100%)",
            }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
            <blockquote className="font-display m-0 text-[20px] leading-[1.35] font-semibold tracking-[-0.01em]">
              {t.quote}
            </blockquote>
            <div>
              <div className="text-[13px] font-bold">{t.name}</div>
              <div className="text-[12px] text-white/75">{t.role}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </RevealStagger>
  );
}
