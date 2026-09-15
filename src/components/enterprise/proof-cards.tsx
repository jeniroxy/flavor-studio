import Image from "next/image";
import { RevealStagger } from "@/components/reveal";
import { Button } from "@/components/ui";
import { stories } from "@/lib/data";
import { routes } from "@/lib/routes";

/* Three proof cards under the hero — the three real success stories. */
export function ProofCards() {
  return (
    <RevealStagger stagger={0.08} className="grid gap-4 md:grid-cols-3">
      {stories.map((story) => (
        <div key={story.slug} className="card flex flex-col p-5">
          <div className="flex h-10 items-center">
            <Image
              src={story.logo}
              alt={story.company}
              width={story.logoW}
              height={story.logoH}
              className="max-h-9 w-auto max-w-[150px] object-contain object-left"
            />
          </div>
          <p className="mt-4 flex-1 text-[15px] leading-[1.5] text-ink">
            {story.title}
          </p>
          <div className="eyebrow eyebrow-muted mt-3 text-[11px]">
            {story.meta}
          </div>
          <Button
            href={routes.story(story.slug)}
            variant="primary"
            size="sm"
            className="mt-5 w-full"
          >
            Read story
          </Button>
        </div>
      ))}
    </RevealStagger>
  );
}
