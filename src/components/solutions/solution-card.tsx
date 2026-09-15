import Image from "next/image";
import { visualPoster } from "@/components/solutions/solution-visual";
import { Button } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Solution } from "@/lib/solutions";

/*
 * The hub card, on ClickUp's /teams pattern: a grey panel, a floating real
 * screenshot, a title, two lines, and a full-width black "Explore →". The
 * screenshot is the solution's hero visual (or the first frame of its flow).
 */
export function SolutionCard({ solution }: { solution: Solution }) {
  const poster = visualPoster(solution.hero);
  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="frame relative aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          className="h-full w-full object-cover object-left-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 24px 12px rgba(255,255,255,.55)" }}
        />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="font-display text-[17px] leading-[1.3] font-bold tracking-[-0.01em] text-ink">
          {solution.label}
        </div>
        <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-2">
          {solution.summary}
        </p>
        <div className="mt-auto pt-4">
          <Button
            href={routes.solution(solution.slug)}
            variant="primary"
            size="sm"
            arrow
            className="w-full"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
