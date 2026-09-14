"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GridMock } from "@/components/home/grid-mock";
import { Icon } from "@/components/icon";
import { productAssets, type AssetSpec } from "@/lib/assets";
import { routes } from "@/lib/routes";

/*
 * The hero's product tab strip (clickup.com S1): a vertical rail of module
 * tabs on the left, an 878×514 preview on the right, bounded by hairlines.
 * Click-driven, no auto-cycling — ClickUp sets data-auto-cycling="false" and
 * the client asked for calmer motion. The first tab is the animated grid; the
 * rest are real screenshots that cross-fade.
 */

type Tab = {
  id: string;
  label: string;
  icon: string;
  href: string;
  shot?: AssetSpec;
};

const TABS: Tab[] = [
  { id: "recipes", label: "Recipes", icon: "chef-hat-one", href: routes.feature("recipes") },
  { id: "ingredients", label: "Ingredients", icon: "leaves", href: routes.feature("ingredients"), shot: productAssets.ingredientLibrary },
  { id: "costing", label: "Costing", icon: "calculator-one", href: routes.feature("costing"), shot: productAssets.recipeCost },
  { id: "labeling", label: "Nutrition labels", icon: "doc-detail", href: routes.feature("labeling"), shot: productAssets.nutritionLabelFormats },
  { id: "claims", label: "Content claims", icon: "check-one", href: routes.feature("claims"), shot: productAssets.nutrientClaims },
  { id: "designer", label: "Publish Designer", icon: "layout-four", href: routes.feature("designer"), shot: productAssets.labelDesigner },
  { id: "taste-tests", label: "Taste Tests", icon: "experiment", href: routes.feature("taste-tests"), shot: productAssets.tasteTests },
  { id: "timesheet", label: "Timesheet", icon: "time", href: routes.feature("timesheet"), shot: productAssets.timesheet },
  { id: "reports", label: "Reports", icon: "chart-histogram", href: routes.feature("reports"), shot: productAssets.reports },
  { id: "cr-builder", label: "CRM & requirements", icon: "form-one", href: routes.feature("cr-builder"), shot: productAssets.crBuilder },
  { id: "publishing", label: "Publish & export", icon: "file-pdf-one", href: routes.feature("publishing"), shot: productAssets.publishExport },
  { id: "agent", label: "AI Agent", icon: "robot", href: routes.agent, shot: productAssets.aiAgent },
];

export function HeroTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="border-y border-hairline">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-[210px_minmax(0,1fr)]">
        {/* rail */}
        <div className="flex min-w-0 flex-col border-hairline lg:border-r">
          <div
            role="tablist"
            aria-label="Modules"
            className="flex max-w-full gap-1 overflow-x-auto px-2 py-3 lg:flex-col lg:overflow-visible lg:py-4"
            data-lenis-prevent
          >
            {TABS.map((tab) => {
              const on = tab.id === current.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => setActive(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-[8px] px-3 py-2 text-left text-[14px] font-semibold whitespace-nowrap transition-colors ${
                    on ? "bg-blue-100 text-blue-700" : "text-ink-2 hover:bg-panel hover:text-ink"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[12px] ${
                      on ? "bg-blue-600 text-white" : "border border-hairline text-ink-3"
                    }`}
                  >
                    <Icon name={on ? "check" : tab.icon} />
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="mt-auto hidden p-4 lg:block">
            <Link href={current.href} className="btn btn-primary btn-sm w-full">
              Explore {current.label}
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>

        {/* preview */}
        <div className="relative aspect-[4/3] overflow-hidden bg-panel sm:aspect-[878/514]">
          {TABS.map((tab) => {
            const on = tab.id === current.id;
            return (
              <div
                key={tab.id}
                role="tabpanel"
                aria-hidden={!on}
                className="absolute inset-0"
                style={{ opacity: on ? 1 : 0, transition: "opacity .3s ease", pointerEvents: on ? "auto" : "none" }}
              >
                {tab.shot ? (
                  <Image
                    src={tab.shot.src as string}
                    alt={on ? tab.shot.alt : ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    priority={on}
                    className="object-cover object-left-top"
                  />
                ) : on ? (
                  <GridMock />
                ) : null}
              </div>
            );
          })}
          <Link
            href={current.href}
            className="btn btn-primary btn-sm absolute right-3 bottom-3 lg:hidden"
          >
            Explore {current.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
