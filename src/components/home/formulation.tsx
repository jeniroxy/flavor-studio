import { AssetFrame } from "@/components/asset-frame";
import { HexTile } from "@/components/hex";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { productAssets } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * Ingredients and costing.
 *
 * This section used to end in a recipe grid we drew ourselves in HTML. The
 * client's objection applies squarely to that: it showed a visitor a picture of
 * Flavor Studio drawn by us, not Flavor Studio. The grid is gone — the hero now
 * carries the real Recipe page — and this section moves on to the layer
 * underneath it, the ingredient library, illustrated with the application's own
 * New Ingredient screen.
 */

const POINTS = [
  {
    icon: "leaves",
    badge: "var(--color-lime-100)",
    iconColor: "text-[#5c8f1c]",
    title: "9,000+ ingredients, plus your own",
    body: "the USDA SR28 database is built in, and custom ingredients sit beside it in the same library.",
  },
  {
    icon: "doc-search",
    badge: "var(--color-blue-200)",
    iconColor: "text-blue-700",
    title: "Vendor spec sheets, read for you",
    body: "point the importer at a supplier PDF and it pulls the nutrient values straight in.",
  },
  {
    icon: "caution",
    badge: "var(--color-amber-100)",
    iconColor: "text-[#a97d17]",
    title: "Allergens tagged at the source",
    body: "tag once on the ingredient and every recipe that uses it declares it on the label.",
  },
  {
    icon: "calculator-one",
    badge: "var(--color-teal-100)",
    iconColor: "text-[#0e8b73]",
    title: "Your fields, your calculations",
    body: "choose which columns the grid carries and define custom calculations over them.",
  },
];

export function Formulation() {
  return (
    <Block
      id="product"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <div>
          <SectionLabel>Ingredients</SectionLabel>
          <SectionHeading>One library, under your control.</SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[50ch] text-[16px] leading-[1.65] text-slate-500"
          >
            Every recipe costs and labels from the same ingredient library — so
            a supplier change or a cost update lands everywhere at once, instead
            of being retyped into a dozen spreadsheets.
          </Reveal>

          <RevealStagger
            stagger={0.1}
            delay={0.18}
            className="mt-7 flex flex-col gap-3"
          >
            {POINTS.map((point) => (
              <div
                key={point.title}
                className="flex items-center gap-[14px] rounded-2xl border border-gray-300 bg-white px-[18px] py-4 shadow-raised transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:shadow-card"
              >
                <HexTile size={38} style={{ background: point.badge }}>
                  <Icon
                    name={point.icon}
                    className={`text-[20px] ${point.iconColor}`}
                  />
                </HexTile>
                <div className="text-[14px] leading-[1.55] text-slate-700">
                  <strong className="font-bold text-slate-800">
                    {point.title}
                  </strong>{" "}
                  — {point.body}
                </div>
              </div>
            ))}
          </RevealStagger>

          <Reveal delay={0.26} className="mt-[22px]">
            <a
              href={`${routes.features}#ingredients`}
              className="inline-flex items-center gap-2 text-[14px] font-extrabold text-blue-600 hover:text-blue-700"
            >
              <span>See everything an ingredient carries</span>
              <Icon name="arrow-right" className="text-[15px]" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <AssetFrame
            {...productAssets.ingredientLibrary}
            caption="New Ingredient in Flavor Studio — basic information, nutrients and allergens, ingredient statement, certifications, procurement and validation, with a separate Canadian label and French statement."
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </Reveal>
      </div>
    </Block>
  );
}
