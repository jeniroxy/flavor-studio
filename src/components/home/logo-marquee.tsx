import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { customerLogos } from "@/lib/data";

/*
 * The customer logo row. Corsearch-style: bare on the gray canvas, no box, no
 * "Trusted by" label. Tinted slate-blue rather than flat gray so it sits in the
 * same cool palette as the rest of the page.
 *
 * The list is tripled so the -50% marquee translate lands on an identical
 * frame and the loop is seamless.
 *
 * The real marks range from 3.8:1 to 1.2:1, so height alone can't size them --
 * pinning it makes the wide wordmarks tower over the square ones. Bounding both
 * axes lets the square marks take the full 44px while the wide ones cap at
 * 150px, which reads as one row.
 */
const TINT =
  "grayscale(1) sepia(.9) hue-rotate(175deg) saturate(.75) brightness(.95)";

/*
 * Box each mark fits inside. Sizing is computed rather than left to `w-auto`:
 * next/image serves whichever variant suits the viewport, and `w-auto` sizes
 * from that bitmap, so the row silently changed proportions with the srcset.
 */
const MAX_H = 44;
const MAX_W = 150;

const fit = (w: number, h: number) => {
  const s = Math.min(MAX_H / h, MAX_W / w);
  return { width: Math.round(w * s), height: Math.round(h * s) };
};

export function LogoMarquee() {
  const reel = [...customerLogos, ...customerLogos, ...customerLogos];
  return (
    <Reveal className="pt-4 pb-[clamp(2px,.4vw,6px)]">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center gap-[72px]"
          style={{ animation: "fsMarquee 32s linear infinite" }}
        >
          {reel.map((logo, i) => (
            <Image
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              width={logo.w}
              height={logo.h}
              className="shrink-0 object-contain opacity-[.62]"
              style={{ filter: TINT, ...fit(logo.w, logo.h) }}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
