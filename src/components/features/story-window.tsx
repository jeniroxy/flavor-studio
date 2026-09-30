"use client";

import { ScreenStory } from "@/components/home/screen-story";
import { FeatureVisual } from "@/components/features/feature-visual";
import type { Visual } from "@/lib/feature-pages";
import { stories } from "@/lib/stories";

/*
 * The app window in a feature page's hero. Where the module has a
 * walkthrough (the same scripts the home hero tabs play, over the app's own
 * Figma frames), the window plays it; elsewhere it shows the module's real
 * screenshot. The window chrome names the address, so the picture reads as
 * the product running rather than a picture of it.
 */
export function StoryWindow({
  id,
  visual,
  label,
}: {
  id: string;
  visual: Visual;
  /** The module's name, for the address bar. */
  label: string;
}) {
  const story = stories[id];
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_40px_90px_rgba(6,20,48,0.35)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b border-[#e9e9e9] bg-[#f3f3f6] px-3.5 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-[#d9d9de]" />
        ))}
        <span className="ml-3 truncate rounded-[6px] bg-white px-3 py-1 font-mono text-[11.5px] text-ink-2">
          app.flavorstudio.com · {label}
        </span>
      </div>
      {story ? (
        <div className="relative aspect-[4/3] sm:aspect-[1440/900]">
          <ScreenStory story={story} active />
        </div>
      ) : (
        <FeatureVisual
          visual={visual}
          priority
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="!rounded-none !border-0 !shadow-none"
        />
      )}
    </div>
  );
}
