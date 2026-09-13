import Image from "next/image";
import { Icon } from "@/components/icon";
import {
  Caption,
  Eyebrow,
  FRAME_DARK,
  FRAME_LIGHT,
} from "@/components/layout-primitives";
import { ProductShot, type ShotFocus } from "@/components/product-shot";

/*
 * A slot for a real product asset — a screenshot of a module, or a label
 * exported from the label engine.
 *
 * The client's strongest objection to the first design round was that the site
 * showed hand-built HTML approximations of Flavor Studio instead of the product
 * itself, and that the simplified label markup did not match the official
 * formatting rules those labels must follow. Rather than redraw the fakes, the
 * fakes are gone: every place that needs a real asset renders this component.
 *
 * Pass `src` and it renders the asset. Leave `src` off and it renders a marked
 * placeholder that names exactly which file is still needed — so the gap is
 * visible and specified rather than papered over with a mockup that misleads.
 *
 * The full list of outstanding assets lives in `src/lib/assets.ts`.
 */

export type AssetFrameProps = {
  /** Path under /public once the real asset is dropped in. */
  src?: string;
  /** Region the copy is about; turns the image into a spotlighted ProductShot. */
  focus?: ShotFocus;
  alt: string;
  /** Intrinsic size of the real asset; also sets the placeholder's shape. */
  width: number;
  height: number;
  /** Shown under the frame in both states. */
  caption?: string;
  /** What the client still has to supply — placeholder state only. */
  spec: string;
  /** "light" sits on the white blocks, "dark" on the navy ones. */
  tone?: "light" | "dark";
  /** Marks a label export rather than a UI screenshot. */
  kind?: "screenshot" | "label";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function AssetFrame({
  src,
  focus,
  alt,
  width,
  height,
  caption,
  tone = "light",
  kind = "screenshot",
  className = "",
  sizes = "(max-width: 960px) 100vw, 50vw",
  priority = false,
}: AssetFrameProps) {
  if (src) {
    return (
      <figure className={className}>
        {focus ? (
          <ProductShot
            src={src}
            alt={alt}
            width={width}
            height={height}
            focus={focus}
            tone={tone}
            sizes={sizes}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className={`w-full object-cover ${
              tone === "dark" ? FRAME_DARK : FRAME_LIGHT
            }`}
          />
        )}
        {caption && (
          <Caption as="figcaption" tone={tone}>
            {caption}
          </Caption>
        )}
      </figure>
    );
  }

  const shell =
    tone === "dark"
      ? "border-white/20 bg-white/[.04] text-slate-300"
      : "border-gray-300 bg-gray-050 text-slate-500";
  const strong = tone === "dark" ? "text-white" : "text-slate-800";

  return (
    <figure className={className}>
      <div
        className={`flex flex-col items-center justify-center gap-[10px] rounded-xl border border-dashed px-6 py-8 text-center ${shell}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Icon
          name={kind === "label" ? "doc-detail" : "all-application"}
          className="text-[26px] opacity-70"
        />
        <Eyebrow tone={tone}>
          {kind === "label" ? "Generated label" : "Product screenshot"}
        </Eyebrow>
        <div className={`max-w-[38ch] text-[14px] font-bold ${strong}`}>
          {alt}
        </div>
        {/* The AssetSpec's `spec` field is deliberately not rendered. It is an
            internal asset request written for the client — "PNG or JPG, at
            least 1600px wide, light UI theme, no personal data" — and it was
            showing on the public Features page. It stays on the type, where
            src/lib/assets.ts uses it as the outstanding-asset checklist. */}
        <div className="max-w-[42ch] text-[13px] leading-[1.55]">
          A screenshot of this module is on its way.
        </div>
      </div>
      {caption && (
        <Caption as="figcaption" tone={tone}>
          {caption}
        </Caption>
      )}
    </figure>
  );
}
