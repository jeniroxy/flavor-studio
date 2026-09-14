import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import type { Story } from "@/lib/data";

/*
 * The story card from ClickUp's "See how great teams get more done" grid
 * (customers index §5.6): a brand cover — here the story photo under a
 * gradient, with the company logo — then eyebrow, title, blurb or pull quote,
 * a faint ” glyph and "Read the story". The whole card is the link; hover is
 * colour-only, as on ClickUp.
 *
 * `layout="wide"` puts the cover beside the copy for a full-width card.
 */

export function StoryCard({
  story,
  layout = "stack",
  prefer = "blurb",
  className = "",
}: {
  story: Story;
  layout?: "stack" | "wide";
  /** Show the story's pull quote (when it has one) instead of the blurb. */
  prefer?: "blurb" | "quote";
  className?: string;
}) {
  const quote = prefer === "quote" ? story.detail.quote : undefined;
  const wide = layout === "wide";

  return (
    <Link
      href={story.href}
      className={`card group flex overflow-hidden rounded-[var(--radius-md)] ${
        wide ? "flex-col md:grid md:grid-cols-[1.1fr_1fr]" : "flex-col"
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden ${
          wide ? "aspect-[16/10] md:aspect-auto md:min-h-[300px]" : "h-[200px] lg:h-[220px]"
        }`}
      >
        <Image
          src={story.img}
          alt={story.imgAlt}
          fill
          sizes={wide ? "(max-width: 768px) 100vw, 600px" : "(max-width: 768px) 100vw, 540px"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,12,16,.08) 0%, rgba(10,12,16,.62) 100%)",
          }}
        />
        <div className="absolute bottom-4 left-4 rounded-[var(--radius-sm)] bg-white/95 px-3 py-2">
          <Image
            src={story.logo}
            alt={story.company}
            width={story.logoW}
            height={story.logoH}
            className="h-7 w-auto max-w-[140px] object-contain"
          />
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col ${wide ? "p-[clamp(24px,3vw,40px)]" : "p-6"}`}>
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute top-3 right-5 text-[96px] leading-none font-bold text-ink/[.06] select-none"
        >
          &rdquo;
        </span>
        <Eyebrow className="text-[12px]">{story.eyebrow}</Eyebrow>
        <h3
          className={`font-display mt-3 max-w-[30ch] font-bold tracking-[-0.02em] text-ink ${
            wide ? "text-[clamp(22px,2.4vw,30px)] leading-[1.2]" : "text-[19px] leading-[1.3]"
          }`}
        >
          {story.title}
        </h3>
        {quote ? (
          <div className="mt-4">
            <p className="text-[15px] leading-[1.6] text-ink-2 italic">
              &ldquo;{quote.text}&rdquo;
            </p>
            <div className="mt-3 text-[13px] text-ink-2">
              <strong className="font-bold text-ink">{quote.name}</strong>{" "}
              &middot; {quote.role}
            </div>
          </div>
        ) : (
          <p
            className={`mt-4 text-[15px] leading-[1.6] text-ink-2 ${wide ? "" : "line-clamp-3"}`}
          >
            {story.blurb}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold text-blue-700 group-hover:text-blue-600">
          Read the story
          <Icon name="arrow-right" className="text-[15px]" />
        </span>
      </div>
    </Link>
  );
}

/** Two-column grid of stories, revealed in a stagger. */
export function StoryGrid({
  stories,
  prefer = "blurb",
  className = "",
}: {
  stories: Story[];
  prefer?: "blurb" | "quote";
  className?: string;
}) {
  return (
    <RevealStagger stagger={0.08} className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {stories.map((story) => (
        <div key={story.slug} className="flex">
          <StoryCard story={story} prefer={prefer} className="w-full" />
        </div>
      ))}
    </RevealStagger>
  );
}
