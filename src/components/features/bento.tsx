import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Badge, Container, Headline, Section } from "@/components/ui";
import { productAssets, type AssetSpec } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * "Built different. With purpose." — ClickUp's 2/2/3 bento of seven cards:
 * title, two-line description, a framed real screenshot cropped by the card's
 * bottom edge. The first card carries the NEW badge. Every image is a real
 * export from the application design file (src/lib/assets.ts).
 */
type Card = {
  title: string;
  body: string;
  href: string;
  asset: AssetSpec;
  badge?: string;
};

const ROWS: Card[][] = [
  [
    {
      title: "The AI Agent that knows your formulas",
      body: "Ask about cost, nutrition, allergens or claims on any version and get an answer with the recipe, regulation or test it came from cited.",
      href: routes.agent,
      asset: productAssets.aiAgent,
      badge: "New",
    },
    {
      title: "Ingredients with real data",
      body: "9,000+ USDA SR28 ingredients built in, your own alongside — with nutrients read straight from the supplier's PDF.",
      href: routes.feature("ingredients"),
      asset: productAssets.ingredientNutrients,
    },
  ],
  [
    {
      title: "Versions that scale",
      body: "Branch a formula without losing the original, compare versions on nutrition and cost, and promote the winner.",
      href: routes.feature("versions"),
      asset: productAssets.recipeVersions,
    },
    {
      title: "Costing from real batches",
      body: "Batch, container and retail cost beside the formula, on assumptions defined once for the whole workspace.",
      href: routes.feature("costing"),
      asset: productAssets.recipeCost,
    },
  ],
  [
    {
      title: "Labels that pass review",
      body: "FDA and Health Canada panels generated from the formula's own values, in six layouts.",
      href: routes.feature("labeling"),
      asset: productAssets.nutritionLabelFormats,
    },
    {
      title: "Taste tests your team runs",
      body: "Panels and surveys scored across versions, with results tied to the version tasted.",
      href: routes.feature("taste-tests"),
      asset: productAssets.tasteTests,
    },
    {
      title: "Publish Designer",
      body: "A layout canvas for spec sheets and published recipes, saved as templates and reused across products.",
      href: routes.feature("designer"),
      asset: productAssets.labelDesigner,
    },
  ],
];

function BentoCard({ card, tall }: { card: Card; tall: boolean }) {
  return (
    <Reveal className="flex">
      <Link
        href={card.href}
        className="card group flex w-full flex-col p-[clamp(20px,2.4vw,28px)]"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[20px] leading-[1.25] font-bold tracking-[-0.015em] text-ink transition-colors group-hover:text-blue-700">
            {card.title}
          </h3>
          {card.badge ? <Badge>{card.badge}</Badge> : null}
        </div>
        <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.55] text-ink-2">
          {card.body}
        </p>
        <div
          className={`frame mt-5 -mb-[clamp(20px,2.4vw,28px)] overflow-hidden rounded-b-none border-b-0 ${
            tall ? "h-[220px]" : "h-[180px]"
          }`}
        >
          {card.asset.src ? (
            <Image
              src={card.asset.src}
              alt={card.asset.alt}
              width={card.asset.width}
              height={card.asset.height}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="h-full w-full object-cover object-top"
            />
          ) : null}
        </div>
      </Link>
    </Reveal>
  );
}

export function Bento() {
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container>
        <Headline size="lg" className="text-center" tail="With purpose.">
          Built different.
        </Headline>
        <div className="mt-[clamp(32px,4vw,56px)] flex flex-col gap-5">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid gap-5 ${row.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
            >
              {row.map((card) => (
                <BentoCard
                  key={card.title}
                  card={card}
                  tall={row.length === 2}
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
