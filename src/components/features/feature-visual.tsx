import Image from "next/image";
import { AssetFrame } from "@/components/asset-frame";
import { FlowPlayer } from "@/components/flow-player";
import type { Visual } from "@/lib/feature-pages";

/*
 * One renderer for the three kinds of product visual a feature page can carry:
 *
 *   asset — a cropped export from the application design file (AssetFrame;
 *           entries without a `src` render AssetFrame's marked placeholder,
 *           which is intended — nothing here invents a screenshot)
 *   flow  — a sequence of real screens, played by FlowPlayer
 *   still — one frame of a flow, so a three-row section can show three
 *           distinct moments of a feature without a player in every cell
 *   pending — no screenshot exists for this point yet; renders AssetFrame's
 *           marked placeholder naming what is still needed, so a section can
 *           carry every point flavorstudio.com lists without a picture that
 *           shows something else
 */
export function FeatureVisual({
  visual,
  sizes = "(max-width: 1024px) 100vw, 560px",
  priority = false,
  className = "",
}: {
  visual: Visual;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (visual.kind === "flow") {
    return (
      <FlowPlayer
        flow={visual.flow}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }
  if (visual.kind === "still") {
    const steps = visual.flow.steps;
    const step = steps[Math.min(Math.max(visual.step, 0), steps.length - 1)];
    return (
      <div className={`frame ${className}`}>
        <Image
          src={step.src}
          alt={`${visual.flow.alt} — ${step.caption}`}
          width={visual.flow.width}
          height={visual.flow.height}
          sizes={sizes}
          priority={priority}
          className="w-full"
        />
      </div>
    );
  }
  if (visual.kind === "pending") {
    return (
      <AssetFrame
        alt={visual.alt}
        width={visual.width ?? 1600}
        height={visual.height ?? 1000}
        spec=""
        className={className}
      />
    );
  }
  return (
    <AssetFrame
      {...visual.asset}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

/** The image a Visual would show, for slots that need a plain `<Image>`
    (the gradient banner, the rainbow CTA). Placeholders yield nothing. */
export function visualImage(visual: Visual) {
  if (visual.kind === "flow") {
    const s = visual.flow.steps[0];
    return {
      src: s.src,
      alt: visual.flow.alt,
      width: visual.flow.width,
      height: visual.flow.height,
    };
  }
  if (visual.kind === "still") {
    const steps = visual.flow.steps;
    const s = steps[Math.min(Math.max(visual.step, 0), steps.length - 1)];
    return {
      src: s.src,
      alt: s.caption,
      width: visual.flow.width,
      height: visual.flow.height,
    };
  }
  if (visual.kind === "pending") return undefined;
  const a = visual.asset;
  if (!a.src) return undefined;
  return { src: a.src, alt: a.alt, width: a.width, height: a.height };
}
