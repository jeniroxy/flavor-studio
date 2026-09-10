import { AssetFrame } from "@/components/asset-frame";
import { Icon } from "@/components/icon";
import { Block } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { productAssets, type AssetSpec } from "@/lib/assets";

/*
 * The six modules, as a card mosaic.
 *
 * This file used to draw six fake product UIs — an ingredient grid with
 * invented costs, nutrient bars with invented %DV, a sensory panel reading
 * "Panel #212 · 7.8/9 · 48 panelists", a kanban board, and a CRM list naming
 * customers that do not exist — each on its own infinite GSAP loop so the page
 * would "read as live product rather than six screenshots".
 *
 * That is precisely what the client rejected: "a picture of Flavor Studio drawn
 * by us, not Flavor Studio". The homepage was fixed in the previous pass and
 * this page was missed, which left the product page as the largest invented
 * surface on the site. Every card now shows the real application, and the two
 * modules with no export yet show a marked gap instead of a fiction.
 *
 * Layout is unchanged: two equal cards, then a wide + narrow pair, then two
 * equal cards, headings aligned across each row, no borders.
 */

type StudioProps = {
  id: string;
  eyebrowIcon: string;
  eyebrow: string;
  title: string;
  body: string;
  checks?: string[];
  asset: AssetSpec;
  /** Flex basis controls the mosaic rhythm. */
  flex: string;
};

function StudioCard({
  id,
  eyebrowIcon,
  eyebrow,
  title,
  body,
  checks,
  asset,
  flex,
}: StudioProps) {
  return (
    <Reveal
      id={id}
      className="bg-gray-050 flex scroll-mt-[90px] flex-col gap-[clamp(22px,2.4vw,32px)] rounded-[clamp(18px,1.6vw,24px)] p-[clamp(24px,2.6vw,36px)]"
      style={{ flex }}
    >
      <AssetFrame {...asset} sizes="(max-width: 900px) 100vw, 44vw" />
      <div className="min-w-0 text-left">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.12em] text-blue-600 uppercase">
          <Icon name={eyebrowIcon} className="text-[16px]" />
          {eyebrow}
        </div>
        <h2 className="font-display mt-3 text-[clamp(21px,2.2vw,28px)] leading-[1.2] font-extrabold tracking-[-0.02em] text-slate-800">
          {title}
        </h2>
        {/* No line-clamp: these sentences carry the page's most specific
            product detail, and clamping them at two lines hid it. */}
        <p className="mt-[14px] text-[15px] leading-[1.6] text-slate-500">
          {body}
        </p>
        {checks && (
          <div className="mt-5 flex flex-col gap-[10px] text-[14px] text-slate-700">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-[10px]">
                <Icon
                  name="check-one"
                  className="flex-none text-[16px] text-[#0e8b73]"
                />
                {check}
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function ModuleMosaic() {
  return (
    <Block
      id="modules"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-[clamp(16px,1.8vw,26px)]">
          <div className="flex flex-wrap gap-[clamp(16px,1.8vw,26px)]">
            <StudioCard
              id="recipes"
              flex="1 1 320px"
              eyebrowIcon="chef-hat-one"
              eyebrow="Recipes"
              title="Formulate in a grid that never loses count."
              body="Ingredients, steps and quantities on the left; batch size, servings, cost and retail price rolling up live on the right. Branch versions, compare them, promote the winner."
              checks={[
                "Named versions — V1, Testing, Final — on every recipe",
                "Procedure, images, notes and tags alongside the formula",
                "Scale batches without touching ratios",
              ]}
              asset={productAssets.recipeGrid}
            />
            <StudioCard
              id="nutrition"
              flex="1 1 320px"
              eyebrowIcon="doc-detail"
              eyebrow="Nutritional analysis"
              title="Every nutrient, recomputed on every edit."
              body="USDA SR28 built in, supplier spec sheets and lab assays layered on top. Nutrient content claims are checked against the formula's own analysed values, so you can see which ones the product actually qualifies for."
              checks={[
                "Full nutrient panels, per serving and per 100 g",
                "Big-9 allergen roll-up from the ingredient tree",
                "Supplement Facts for dietary supplements",
              ]}
              asset={productAssets.nutrientClaims}
            />
          </div>

          <div className="flex flex-wrap gap-[clamp(16px,1.8vw,26px)]">
            <StudioCard
              id="projects"
              flex="2 1 420px"
              eyebrowIcon="folder-open"
              eyebrow="Project management"
              title="Launches move through gates, not inboxes."
              body="Briefs, tasks and stage gates tied directly to the recipes they concern — and a timesheet underneath, so the hours and expenses a launch consumed are a number rather than a guess."
              asset={productAssets.timesheet}
            />
            <StudioCard
              id="inspire"
              flex="1 1 260px"
              eyebrowIcon="star"
              eyebrow="Ideation · Inspire"
              title="Start the next product before the trend peaks."
              body="A feed of ingredients, concepts and category trends your team can clip into briefs. One click turns an idea into a project with a starter formula."
              asset={productAssets.inspire}
            />
          </div>

          <div className="flex flex-wrap gap-[clamp(16px,1.8vw,26px)]">
            <StudioCard
              id="taste-tests"
              flex="1 1 320px"
              eyebrowIcon="experiment"
              eyebrow="Taste tests"
              title="Sensory data that flows back into the formula."
              body="Run internal panels or consumer surveys, score attributes side by side across versions, and let the winner carry its data into production."
              asset={productAssets.tasteTests}
            />
            <StudioCard
              id="crm"
              flex="1 1 320px"
              eyebrowIcon="peoples"
              eyebrow="CRM"
              title="Every customer request, tied to a formula."
              body="Customers, opportunities, contracts and purchase orders next to the recipes that answer them — including a builder for the requirements forms your customers send you."
              asset={productAssets.crBuilder}
            />
          </div>
        </div>
      </div>
    </Block>
  );
}
