import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/data";

/*
 * A customer speaking, set large on the brand ramp: the quote, then the
 * speaker with their portrait where the site has one (from the testimonials
 * list), initials otherwise. The ramp stops at a deep teal so the white copy
 * holds 4.5:1 all the way down. Used on the story pages and the stories index.
 */

export const STORY_RAMP =
  "linear-gradient(150deg, #17467f 0%, #2060a6 30%, #1a7f8c 70%, #0f6e5e 100%)";

export function StoryQuote({
  text,
  name,
  role,
  company,
  size = "lg",
  className = "",
}: {
  text: string;
  name: string;
  role?: string;
  /** Shown after the role, on the index where quotes sit side by side. */
  company?: string;
  size?: "lg" | "md";
  className?: string;
}) {
  const portrait = testimonials.find((t) => t.name === name)?.photo;
  return (
    <Reveal
      as="figure"
      className={`relative m-0 flex flex-col overflow-hidden rounded-[var(--radius-xl)] p-[clamp(24px,3.4vw,44px)] text-white ${className}`}
      style={{ backgroundImage: STORY_RAMP }}
    >
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -top-6 right-6 text-[160px] leading-none text-white/15"
      >
        &rdquo;
      </span>
      <blockquote
        className={`font-display relative m-0 leading-[1.35] font-bold tracking-[-0.015em] ${
          size === "lg"
            ? "text-[clamp(20px,2.2vw,28px)]"
            : "text-[clamp(17px,1.6vw,20px)]"
        }`}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="relative mt-auto flex items-center gap-3 pt-6">
        {portrait ? (
          <Image
            src={portrait}
            alt=""
            width={96}
            height={96}
            className="size-12 rounded-full object-cover ring-2 ring-white/40"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-12 flex-none items-center justify-center rounded-full bg-white/15 font-bold"
          >
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        )}
        <span>
          <span className="block text-[15px] font-bold">{name}</span>
          {role || company ? (
            <span className="block text-[13.5px] text-white/90">
              {[role, company].filter(Boolean).join(", ")}
            </span>
          ) : null}
        </span>
      </figcaption>
    </Reveal>
  );
}
