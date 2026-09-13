import { FlowPlayer } from "@/components/flow-player";
import { HexTile } from "@/components/hex";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { flows } from "@/lib/flows";
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
 *
 * The four points are a hairline list, not four cards: each used to sit in its
 * own bordered, shadowed, hover-lifting box with a differently coloured icon
 * tile, which made a short list read as a dashboard.
 */

const POINTS = [
  {
    icon: "leaves",
    title: "9,000+ ingredients, plus your own",
    body: "the USDA SR28 database is built in, and custom ingredients sit beside it in the same library.",
  },
  {
    icon: "doc-search",
    title: "Vendor spec sheets, read for you",
    body: "point the importer at a supplier PDF and it pulls the nutrient values straight in.",
  },
  {
    icon: "caution",
    title: "Allergens tagged at the source",
    body: "tag once on the ingredient and every recipe that uses it declares it on the label.",
  },
  {
    icon: "calculator-one",
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

          <RevealStagger stagger={0.08} delay={0.16} className="mt-6">
            {POINTS.map((point, i) => (
              <div
                key={point.title}
                className={`flex items-start gap-[14px] py-4 ${
                  i > 0 ? "border-t border-gray-300" : ""
                }`}
              >
                <HexTile
                  size={36}
                  className="mt-[1px]"
                  style={{ background: "var(--color-lime-100)" }}
                >
                  <Icon
                    name={point.icon}
                    className="text-[18px] text-[#5c8f1c]"
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

          <Reveal delay={0.24} className="mt-[18px]">
            <TextLink href={`${routes.features}#ingredients`}>
              See everything an ingredient carries
            </TextLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FlowPlayer
            flow={flows.ingredientFields}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </Reveal>
      </div>
    </Block>
  );
}
