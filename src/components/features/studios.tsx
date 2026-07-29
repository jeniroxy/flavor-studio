"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { Block } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/*
 * The six studios, as a card mosaic.
 *
 * Layout the user settled on: two equal cards, then a wide + narrow pair, then
 * two equal cards again. Every card puts its visual in a fixed 320px box above
 * left-aligned copy, so the headings line up across each row. No borders
 * anywhere — inside the cards or on them.
 *
 * Each visual runs its own loop so the page reads as live product rather than
 * six screenshots. Loops start from their resting state, so a stalled first
 * cycle can never leave a bar empty or a counter reading zero.
 */

type StudioProps = {
  id: string;
  eyebrowIcon: string;
  eyebrow: string;
  title: string;
  body: string;
  checks?: string[];
  visual: ReactNode;
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
  visual,
  flex,
}: StudioProps) {
  return (
    <Reveal
      id={id}
      className="bg-gray-050 flex scroll-mt-[90px] flex-col gap-[clamp(22px,2.4vw,32px)] rounded-[clamp(18px,1.6vw,24px)] p-[clamp(24px,2.6vw,36px)]"
      style={{ flex }}
    >
      <div className="flex h-[320px] min-w-0 flex-col justify-center overflow-hidden">
        {visual}
      </div>
      <div className="min-w-0 text-left">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.12em] text-blue-600 uppercase">
          <Icon name={eyebrowIcon} className="text-[16px]" />
          {eyebrow}
        </div>
        <h2 className="font-display mt-3 text-[clamp(21px,2.2vw,28px)] leading-[1.2] font-extrabold tracking-[-0.02em] text-slate-800">
          {title}
        </h2>
        <p className="mt-[14px] line-clamp-2 text-[15px] leading-[1.6] text-slate-500">
          {body}
        </p>
        {checks && (
          <div className="mt-5 flex flex-col gap-[10px] text-[14px] text-slate-700">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-[10px]">
                <Icon
                  name="check-one"
                  className="flex-none text-[16px] text-teal-500"
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

/* ------------------------------------------------------------------ visuals */

const RECIPE_ROWS = [
  { name: "Rolled oats", qty: "300 g", cost: "$0.48" },
  { name: "Almond butter", qty: "160 g", cost: "$2.08" },
  { name: "Honey, clover", qty: "120 g", cost: "$0.94" },
  { name: "Dried cranberries", qty: "90 g", cost: "$1.12" },
];

const NUTRIENT_BARS = [
  {
    label: "Protein · 12 g",
    dv: "24%",
    width: "24%",
    color: "var(--color-teal-500)",
  },
  {
    label: "Dietary fiber · 4 g",
    dv: "14%",
    width: "14%",
    color: "var(--color-blue-500)",
  },
  {
    label: "Total fat · 9 g",
    dv: "12%",
    width: "12%",
    color: "var(--color-blue-400)",
  },
  {
    label: "Sodium · 105 mg",
    dv: "5%",
    width: "5%",
    color: "var(--color-amber-500)",
  },
  {
    label: "Added sugars · 8 g",
    dv: "16%",
    width: "16%",
    color: "var(--color-slate-300)",
  },
];

const SENSORY_BARS = [
  {
    label: "Overall liking",
    score: "7.8 / 9",
    width: "87%",
    color: "var(--color-teal-500)",
  },
  {
    label: "Texture",
    score: "7.2 / 9",
    width: "80%",
    color: "var(--color-blue-500)",
  },
  {
    label: "Sweetness",
    score: "6.9 / 9",
    width: "77%",
    color: "var(--color-blue-400)",
  },
  {
    label: "Purchase intent",
    score: "72%",
    width: "72%",
    color: "var(--color-lime-500)",
  },
];

const KANBAN = [
  {
    stage: "Concept",
    cards: [
      {
        name: "Oat clusters",
        tag: "Ideation",
        cls: "bg-violet-100 text-violet-500",
      },
      {
        name: "Chili crisp mayo",
        tag: "Brief",
        cls: "bg-blue-200 text-blue-700",
      },
    ],
  },
  {
    stage: "Bench",
    cards: [
      {
        name: "Protein cookie v4",
        tag: "Testing",
        cls: "bg-amber-100 text-[#a97d17]",
      },
      {
        name: "Broth, low-sodium",
        tag: "Sensory",
        cls: "bg-amber-100 text-[#a97d17]",
      },
    ],
  },
  {
    stage: "Launch",
    cards: [
      {
        name: "Granola bar v7",
        tag: "Finalized",
        cls: "bg-teal-100 text-[#0e8b73]",
      },
    ],
  },
];

const INSPIRE_TILES = [
  { title: "Fermented heat", img: "/assets/food-1.png", offset: "-18px" },
  { title: "Upcycled grains", img: "/assets/food-2.png", offset: "18px" },
  { title: "Botanical sodas", img: "/assets/food-3.png", offset: "62px" },
];

const CRM_ROWS = [
  {
    initials: "NB",
    badge: "bg-blue-200 text-blue-700",
    name: "Northbake Co.",
    detail: "Sample: protein cookie v4 · 24 units",
    status: "Sampling",
    statusClass: "bg-amber-100 text-[#a97d17]",
  },
  {
    initials: "PB",
    badge: "bg-lime-100 text-[#5c8f1c]",
    name: "Pura Beverage",
    detail: "Brief: botanical soda, reduced sugar",
    status: "In brief",
    statusClass: "bg-blue-200 text-blue-700",
  },
  {
    initials: "CC",
    badge: "bg-violet-100 text-violet-500",
    name: "Cascade Creamery",
    detail: "Reformulation: bilingual label refresh",
    status: "Delivered",
    statusClass: "bg-teal-100 text-[#0e8b73]",
  },
];

const RecipeGrid = () => (
  <div
    data-anim-grid=""
    className="box-border flex h-full flex-col justify-stretch overflow-hidden rounded-[18px] bg-white shadow-[0_14px_40px_rgba(43,59,83,.1)]"
  >
    <div className="bg-blue-500 px-4 py-[9px] text-[11px] font-bold tracking-[.1em] text-white uppercase">
      Granola bar · v4
    </div>
    {RECIPE_ROWS.map((row) => (
      <div
        key={row.name}
        data-srow=""
        className="grid flex-1 grid-cols-[1fr_auto_auto] content-center items-center gap-x-[14px] px-4 py-[10px] text-[13.5px]"
      >
        <span className="font-semibold text-slate-700">{row.name}</span>
        <span className="font-bold text-slate-800 tabular-nums">{row.qty}</span>
        <span className="w-[56px] text-right text-slate-400 tabular-nums">
          {row.cost}
        </span>
      </div>
    ))}
    <div className="flex items-center gap-3 bg-slate-700 px-4 py-3 text-white">
      <span className="text-[10.5px] font-bold tracking-[.1em] text-[#c4cedd] uppercase">
        Cost / batch
      </span>
      <span
        data-loop-count=""
        data-loop-rest="$4.62"
        className="text-[19px] font-extrabold tabular-nums"
      >
        $4.62
      </span>
      <span className="ml-auto rounded-full bg-blue-500 px-3 py-1 text-[11px] font-bold">
        36 bars
      </span>
    </div>
  </div>
);

const NutrientBars = () => (
  <div
    data-anim-bars=""
    className="box-border flex h-full flex-col justify-between rounded-[18px] bg-white px-6 py-[22px] shadow-[0_14px_40px_rgba(43,59,83,.1)]"
  >
    <div className="mb-[18px] text-[11px] font-bold tracking-[.1em] text-slate-300 uppercase">
      Per serving · vs daily value
    </div>
    <div className="flex flex-1 flex-col justify-evenly gap-[11px]">
      {NUTRIENT_BARS.map((bar) => (
        <div key={bar.label}>
          <div className="mb-[6px] flex justify-between text-[13px]">
            <span className="font-bold text-slate-800">{bar.label}</span>
            <span className="font-semibold text-slate-400">{bar.dv}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              data-bar=""
              className="block h-full origin-left rounded-full"
              style={{ width: bar.width, background: bar.color }}
            />
          </div>
        </div>
      ))}
    </div>
    {/* Claim chips get their own breathing room so they never crowd the bars. */}
    <div className="flex flex-wrap gap-2 pt-[14px]">
      <span className="rounded-full bg-teal-100 px-3 py-[5px] text-[11.5px] font-bold text-[#0e8b73]">
        Good source of protein
      </span>
      <span className="rounded-full bg-blue-200 px-3 py-[5px] text-[11.5px] font-bold text-blue-700">
        Low sodium
      </span>
    </div>
  </div>
);

const Kanban = () => (
  <div data-anim-kanban="" className="grid grid-cols-3 gap-3">
    {KANBAN.map((col) => (
      <div
        key={col.stage}
        className="rounded-[14px] p-3"
        style={{
          background: "linear-gradient(180deg, #f8fafd 0%, #eef4fb 100%)",
        }}
      >
        <div className="mb-[10px] text-[10.5px] font-bold tracking-[.09em] text-slate-400 uppercase">
          {col.stage}
        </div>
        {col.cards.map((card, i) => (
          <div
            key={card.name}
            data-kcard=""
            className={`rounded-lg bg-white px-[11px] py-[10px] text-[12.5px] font-semibold text-slate-700 ${
              i < col.cards.length - 1 ? "mb-2" : ""
            }`}
          >
            {card.name}
            <div className="mt-[7px]">
              <span
                className={`rounded-full px-2 py-[2px] text-[10px] font-bold ${card.cls}`}
              >
                {card.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const InspireTiles = () => (
  <div data-anim-inspire="" className="grid grid-cols-3 gap-3">
    {INSPIRE_TILES.map((tile) => (
      <div
        key={tile.title}
        data-icard=""
        className="self-start overflow-hidden rounded-[14px] bg-white"
        style={{ marginTop: tile.offset }}
      >
        <Image
          src={tile.img}
          alt=""
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
        />
        <div className="px-3 py-[10px] text-[12px] font-bold text-slate-700">
          {tile.title}
        </div>
      </div>
    ))}
  </div>
);

const SensoryBars = () => (
  <div
    data-anim-bars2=""
    className="box-border flex h-full flex-col justify-between rounded-[18px] bg-white px-6 py-[22px] shadow-[0_14px_40px_rgba(43,59,83,.1)]"
  >
    <div className="mb-[18px] flex items-center justify-between">
      <span className="text-[11px] font-bold tracking-[.1em] text-slate-300 uppercase">
        Panel #212 · v3 vs v4
      </span>
      <span className="rounded-full bg-teal-100 px-[11px] py-[3px] text-[11px] font-extrabold text-[#0e8b73]">
        v4 wins
      </span>
    </div>
    <div className="flex flex-1 flex-col justify-evenly gap-[15px]">
      {SENSORY_BARS.map((bar) => (
        <div key={bar.label}>
          <div className="mb-[6px] flex justify-between text-[13px]">
            <span className="font-bold text-slate-800">{bar.label}</span>
            <span className="font-semibold text-slate-400">{bar.score}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              data-bar=""
              className="block h-full origin-left rounded-full"
              style={{ width: bar.width, background: bar.color }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 text-[12.5px] text-slate-400">
      48 panelists · blind triangle ·{" "}
      <span
        data-loop-count=""
        data-loop-rest="94%"
        className="font-bold text-slate-700"
      >
        94%
      </span>{" "}
      completion
    </div>
  </div>
);

const CrmList = () => (
  <div
    data-anim-crm=""
    className="box-border flex h-full flex-col justify-between overflow-hidden rounded-[18px] bg-white shadow-[0_14px_40px_rgba(43,59,83,.1)]"
  >
    <div className="bg-slate-800 px-4 py-[9px] text-[11px] font-bold tracking-[.1em] text-white uppercase">
      Open requests
    </div>
    {CRM_ROWS.map((row) => (
      <div
        key={row.name}
        data-crow=""
        className="flex flex-1 items-center gap-3 px-4 py-3"
      >
        <div
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-extrabold ${row.badge}`}
        >
          {row.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-bold text-slate-800">
            {row.name}
          </div>
          <div className="text-[12px] text-slate-400">{row.detail}</div>
        </div>
        <span
          className={`rounded-full px-[10px] py-[3px] text-[10.5px] font-bold whitespace-nowrap ${row.statusClass}`}
        >
          {row.status}
        </span>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ section */

export function Studios() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const reduce = prefersReducedMotion();

      /* Every loop's resting state: bars full, counters at their authored
         value, lifted cards back down, tinted rows clear. */
      const rest = (sel: string) => {
        const box = scope.querySelector(sel);
        if (!box) return;
        gsap.set(box.querySelectorAll("[data-bar]"), { scaleX: 1 });
        box.querySelectorAll<HTMLElement>("[data-loop-count]").forEach((el) => {
          if (el.dataset.loopRest) el.textContent = el.dataset.loopRest;
        });
        const lifts = box.querySelectorAll("[data-kcard],[data-icard]");
        if (lifts.length) {
          gsap.killTweensOf(lifts);
          gsap.set(lifts, { y: 0, clearProps: "boxShadow" });
        }
        const tints = box.querySelectorAll("[data-crow],[data-srow]");
        if (tints.length) {
          gsap.killTweensOf(tints);
          gsap.set(tints, { clearProps: "backgroundColor" });
        }
      };

      const loop = (sel: string, build: (tl: gsap.core.Timeline) => void) => {
        const box = scope.querySelector(sel);
        if (!box) return;
        observeOnce(box, () => {
          rest(sel);
          if (reduce) return;
          build(gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 0.7 }));
        });
      };

      // Recipes — rows light up in turn, cost recounts each cycle.
      loop("[data-anim-grid]", (tl) => {
        const rows = scope.querySelectorAll("[data-anim-grid] [data-srow]");
        const cost = scope.querySelector<HTMLElement>(
          "[data-anim-grid] [data-loop-count]",
        );
        rows.forEach((row, i) => {
          tl.to(
            row,
            { backgroundColor: "#eaf3fc", duration: 0.3, ease: "power2.out" },
            i * 0.6,
          ).to(
            row,
            {
              backgroundColor: "rgba(255,255,255,0)",
              duration: 0.4,
              ease: "power2.in",
            },
            i * 0.6 + 0.45,
          );
        });
        if (cost) {
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: 4.62,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                cost.textContent = `$${o.v.toFixed(2)}`;
              },
              onComplete: () => {
                cost.textContent = "$4.62";
              },
            },
            0.2,
          );
        }
      });

      // Nutrition — bars refill in sequence.
      loop("[data-anim-bars]", (tl) => {
        scope
          .querySelectorAll("[data-anim-bars] [data-bar]")
          .forEach((bar, i) => {
            tl.fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, ease: "power3.out" },
              i * 0.22,
            );
          });
      });

      // Ideation — tiles lift one at a time.
      loop("[data-anim-inspire]", (tl) => {
        scope.querySelectorAll("[data-icard]").forEach((tile, i) => {
          tl.to(
            tile,
            {
              y: -10,
              boxShadow: "0 16px 34px rgba(43,59,83,.18)",
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.9,
          ).to(
            tile,
            {
              y: 0,
              boxShadow: "0 0px 0px rgba(43,59,83,0)",
              duration: 0.45,
              ease: "power2.in",
            },
            i * 0.9 + 0.55,
          );
        });
      });

      // Taste tests — bars refill, completion recounts.
      loop("[data-anim-bars2]", (tl) => {
        scope
          .querySelectorAll("[data-anim-bars2] [data-bar]")
          .forEach((bar, i) => {
            tl.fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, ease: "power3.out" },
              i * 0.22,
            );
          });
        const pct = scope.querySelector<HTMLElement>(
          "[data-anim-bars2] [data-loop-count]",
        );
        if (pct) {
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: 94,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                pct.textContent = `${Math.round(o.v)}%`;
              },
              onComplete: () => {
                pct.textContent = "94%";
              },
            },
            0.2,
          );
        }
      });

      // Projects — kanban cards lift in turn.
      loop("[data-anim-kanban]", (tl) => {
        scope.querySelectorAll("[data-kcard]").forEach((card, i) => {
          tl.to(
            card,
            {
              y: -7,
              boxShadow: "0 14px 30px rgba(43,59,83,.16)",
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.85,
          ).to(
            card,
            {
              y: 0,
              boxShadow: "0 0px 0px rgba(43,59,83,0)",
              duration: 0.4,
              ease: "power2.in",
            },
            i * 0.85 + 0.5,
          );
        });
      });

      // CRM — rows tint in turn. Literal colour value, not var(): GSAP cannot
      // read a custom property when interpolating colour and falls back to
      // pure blue.
      loop("[data-anim-crm]", (tl) => {
        scope.querySelectorAll("[data-crow]").forEach((row, i) => {
          tl.to(
            row,
            { backgroundColor: "#eaf3fc", duration: 0.35, ease: "power2.out" },
            i * 0.95,
          ).to(
            row,
            {
              backgroundColor: "rgba(255,255,255,0)",
              duration: 0.45,
              ease: "power2.in",
            },
            i * 0.95 + 0.6,
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <Block
      id="studios"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]"
    >
      <div ref={root} className="mx-auto max-w-[1180px]">
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
                "Unlimited versions with pill-tab switching",
                "Procedure, images and notes on every recipe",
                "Scale batches without touching ratios",
              ]}
              visual={<RecipeGrid />}
            />
            <StudioCard
              id="nutrition"
              flex="1 1 320px"
              eyebrowIcon="doc-detail"
              eyebrow="Nutritional analysis"
              title="Every nutrient, recomputed on every edit."
              body="USDA FoodData Central built in, supplier spec sheets and lab assays layered on top. Nutrient content claims are checked against the CFR automatically — the AI Agent flags the ones you qualify for."
              checks={[
                "Full nutrient panels, per serving and per 100 g",
                "Big-9 allergen roll-up from the ingredient tree",
                "Supplement Facts for dietary supplements",
              ]}
              visual={<NutrientBars />}
            />
          </div>

          <div className="flex flex-wrap gap-[clamp(16px,1.8vw,26px)]">
            <StudioCard
              id="projects"
              flex="2 1 420px"
              eyebrowIcon="folder-open"
              eyebrow="Project management"
              title="Launches move through gates, not inboxes."
              body="Briefs, tasks and stage gates tied directly to the recipes they concern. Everyone sees where a launch stands — and what's blocking it."
              visual={<Kanban />}
            />
            <StudioCard
              id="inspire"
              flex="1 1 260px"
              eyebrowIcon="star"
              eyebrow="Ideation · Inspire"
              title="Start the next product before the trend peaks."
              body="A feed of ingredients, concepts and category trends your team can clip into briefs. One click turns an idea into a project with a starter formula."
              visual={<InspireTiles />}
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
              visual={<SensoryBars />}
            />
            <StudioCard
              id="crm"
              flex="1 1 320px"
              eyebrowIcon="peoples"
              eyebrow="CRM"
              title="Every customer request, tied to a formula."
              body="Track briefs, samples and reformulation requests next to the recipes that answer them — no separate CRM, no copy-paste between systems."
              visual={<CrmList />}
            />
          </div>
        </div>
      </div>
    </Block>
  );
}
