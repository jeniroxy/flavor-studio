import type { ReactNode } from "react";
import { RevealStagger } from "@/components/reveal";
import { Button, Section } from "@/components/ui";
import { routes, trialLine } from "@/lib/routes";
import {
  AnywhereVisual,
  CollabVisual,
  EasyVisual,
  ServiceVisual,
  SuiteVisual,
} from "./why-visuals";

/*
 * "Why food and beverage teams choose Flavor Studio." The five reasons are
 * flavorstudio.com's, word for word, so they live here rather than in
 * `whyPoints` (lib/data.ts), which was rewritten for v2 and still serves the
 * Enterprise and Customers pages.
 *
 * Each reason carries a small picture that acts it out (why-visuals.tsx), and
 * the cards alternate wide and narrow (7/5, 5/7, 7/5) so the pictures that
 * need width get it: the suite, the three screens and the support line sit
 * side by side with their text, the rest stack.
 *
 * The panel keeps the platform's navy → sky → teal → lime ramp from the
 * design file, but runs it top to bottom: the white headline then sits wholly
 * on the navy end, where it clears 6:1, instead of crossing the sky blue.
 */
const GRADIENT =
  "linear-gradient(180deg, #17467f 0%, #2060a6 24%, #59a3eb 54%, #18bc9c 82%, #8cd135 100%)";

const REASONS = [
  {
    title: "Comprehensive, cost\u2011effective suite",
    body: "One-stop shop for all product development needs. Do away with multiple, disparate spreadsheets and solutions that do not work well with one another and are not cost effective.",
    visual: <SuiteVisual />,
    span: "md:col-span-2 lg:col-span-7",
    side: "md",
  },
  {
    title: "Easy and intuitive to use",
    body: "User-friendly interface allows teams to hit the ground running and be productive from the get-go. The result is accelerated product development and time to market.",
    visual: <EasyVisual />,
    span: "lg:col-span-5",
  },
  {
    title: "Enhance collaboration",
    body: "Integrated solution and team-based focus facilitates collaboration and visibility to every team member.",
    visual: <CollabVisual />,
    span: "lg:col-span-5",
  },
  {
    title: "Anytime, anywhere access",
    body: "Cloud technology allows easy web-based access and ensures users are using the most up-to-date version at all times.",
    visual: <AnywhereVisual />,
    span: "md:col-span-2 lg:col-span-7",
    side: "md",
  },
  {
    title: "Best-in-class customer service",
    body: "Get the best industry support, from sign up to ramp up to on-going use through Flavor Studio’s phone and online channels.",
    visual: <ServiceVisual />,
    span: "md:col-span-2 lg:col-span-7",
    side: "md",
  },
] satisfies {
  title: string;
  body: string;
  visual: ReactNode;
  span: string;
  side?: "md";
}[];

/*
 * Side-by-side from the breakpoint where the card is wide enough to hold it.
 * The title always runs the full width of the card, above the
 * body and the picture: at the old size the title had to fit the 42% text
 * column, which is why it stayed small and "cost-effective" broke at the
 * hyphen.
 */
const SIDE = {
  md: {
    row: "md:flex-row md:items-stretch",
    text: "md:w-[42%] md:shrink-0",
  },
};

function Reason({
  title,
  body,
  visual,
  span,
  side,
}: {
  title: string;
  body: string;
  visual: ReactNode;
  span: string;
  side?: "md";
}) {
  const s = side ? SIDE[side] : undefined;
  return (
    <article
      className={`flex min-w-0 flex-col rounded-[var(--radius-lg)] bg-white p-5 sm:p-6 lg:p-8 ${span}`}
    >
      <h3 className="font-display max-w-[18ch] text-[clamp(26px,2.9vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-ink">
        {title}
      </h3>
      <div
        className={`mt-4 flex min-w-0 flex-1 flex-col gap-6 ${s?.row ?? ""}`}
      >
        <p
          className={`text-[15.5px] leading-[1.6] text-ink-2 ${s?.text ?? ""}`}
        >
          {body}
        </p>
        <div className="mt-auto min-w-0 flex-1">{visual}</div>
      </div>
    </article>
  );
}

export function Why() {
  return (
    <Section id="why" className="py-[clamp(48px,6vw,88px)]">
      {/* Capped at the site's 1170 section width, the same box the closing
          CTA and the AI panel use. */}
      <div className="mx-auto max-w-[var(--container)] px-[clamp(12px,1.6vw,20px)] min-[1210px]:px-0">
        <div
          className="rounded-[var(--radius-3xl)] px-[clamp(16px,4vw,72px)] py-[clamp(40px,5vw,80px)]"
          style={{ background: GRADIENT }}
        >
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display max-w-[16ch] text-[clamp(32px,4.4vw,60px)] leading-[1.04] font-bold tracking-[-0.03em] text-white lg:col-span-7">
              Why food and beverage teams choose Flavor Studio.
            </h2>
            <p className="max-w-[44ch] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-white lg:col-span-4 lg:col-start-9">
              Formulas, costs, labels, taste tests and projects in one web app,
              open to every team that works on the product.
            </p>
          </div>

          <RevealStagger
            stagger={0.06}
            className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12 lg:gap-4"
          >
            {REASONS.map((r) => (
              <Reason key={r.title} {...r} />
            ))}

            {/* The demo card closes the grid in the ramp's own navy, so the
                one action in the section reads as the end of the list. */}
            <div className="flex flex-col rounded-[var(--radius-lg)] bg-[#16223a] p-5 sm:p-6 md:col-span-2 lg:col-span-5 lg:p-7">
              <h3 className="font-display text-[clamp(28px,3.2vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-balance text-white">
                See it on your own formula.
              </h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.6] text-white/85">
                Thirty minutes, your category, and the modules you would
                actually use.
              </p>
              <div className="mt-auto pt-8">
                <Button href={routes.demo} variant="lime" arrow>
                  Request a demo
                </Button>
                <p className="mt-3 text-[13px] leading-[1.4] text-white/75">
                  {trialLine}
                </p>
              </div>
            </div>
          </RevealStagger>
        </div>
      </div>
    </Section>
  );
}
