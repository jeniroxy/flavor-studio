import { FlowPlayer } from "@/components/flow-player";
import { ProductShot } from "@/components/product-shot";
import {
  productAssets,
  type AssetSpec,
  type ProductAssetKey,
} from "@/lib/assets";
import { flows } from "@/lib/flows";
import type { SolutionVisual } from "@/lib/solutions";

/*
 * Solutions reference their visuals by key (lib/solutions.ts stays plain
 * data); this resolves a key to the real screenshot or the real screen
 * sequence. An asset without an export yet falls back to the recipe grid so a
 * solution page never renders a placeholder frame.
 */

export function resolveAsset(
  key: ProductAssetKey,
): AssetSpec & { src: string } {
  const a: AssetSpec = productAssets[key];
  if (a.src) return a as AssetSpec & { src: string };
  return productAssets.recipeGrid;
}

/** A still for cards and banners: the asset itself, or a flow's first frame. */
export function visualPoster(visual: SolutionVisual) {
  if ("flow" in visual) {
    const f = flows[visual.flow];
    return {
      src: f.steps[0].src,
      alt: f.alt,
      width: f.width,
      height: f.height,
    };
  }
  const a = resolveAsset(visual.asset);
  return { src: a.src, alt: a.alt, width: a.width, height: a.height };
}

export function SolutionVisualFrame({
  visual,
  tone = "light",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
  priority = false,
  dwell,
}: {
  visual: SolutionVisual;
  tone?: "light" | "dark";
  sizes?: string;
  className?: string;
  priority?: boolean;
  dwell?: number;
}) {
  if ("flow" in visual) {
    return (
      <FlowPlayer
        flow={flows[visual.flow]}
        tone={tone}
        sizes={sizes}
        className={className}
        priority={priority}
        dwell={dwell}
      />
    );
  }
  const a = resolveAsset(visual.asset);
  return (
    <ProductShot
      src={a.src}
      alt={a.alt}
      width={a.width}
      height={a.height}
      focus={a.focus}
      tone={tone}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
