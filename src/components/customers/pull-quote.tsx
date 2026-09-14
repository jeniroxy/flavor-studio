import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/data";

/*
 * ClickUp's case-study pull-quote card (story page §5): white card, a
 * vertical gradient bar on the left edge, italic quote, avatar + name + title.
 * The avatar comes from the testimonials list when the name matches; otherwise
 * an initials disc stands in — never a stock photo.
 */

export type PullQuoteData = { text: string; name: string; role: string };

function initials(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((w) => w && !/^(chef|dr\.?)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function PullQuote({
  quote,
  className = "",
}: {
  quote: PullQuoteData;
  className?: string;
}) {
  const portrait = testimonials.find((t) => t.name === quote.name)?.photo;

  return (
    <Reveal
      as="figure"
      className={`relative m-0 overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-white p-[clamp(20px,3vw,32px)] pl-[calc(clamp(20px,3vw,32px)+6px)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background:
            "linear-gradient(180deg, #2060a6 0%, #59a3eb 50%, #8cd135 100%)",
        }}
      />
      <blockquote className="font-display m-0 text-[clamp(17px,1.6vw,20px)] leading-[1.5] font-medium tracking-[-0.01em] text-ink italic">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {portrait ? (
          <Image
            src={portrait}
            alt=""
            width={160}
            height={160}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-[13px] font-bold text-blue-700"
          >
            {initials(quote.name)}
          </span>
        )}
        <div>
          <div className="text-[14px] font-bold text-ink">{quote.name}</div>
          <div className="text-[13px] text-ink-2">{quote.role}</div>
        </div>
      </figcaption>
    </Reveal>
  );
}
