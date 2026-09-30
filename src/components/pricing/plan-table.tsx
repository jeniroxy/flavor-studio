"use client";

import { Icon, SparkIcon } from "@/components/icon";
import { Button } from "@/components/ui";
import { modules } from "@/lib/modules";
import { plans, yearlySaving, type Billing, type Plan } from "./plans";

/*
 * ClickUp's plan table: one bordered container, a toolbar row with the
 * Monthly | Yearly toggle, then four hairline-divided columns. The
 * highlighted tier (our Premium, their Business) sits on the brand ramp,
 * navy into a deep teal-green, with white check marks; the others sit on
 * white. The ramp stops at #0f6e5e rather than lime so the white copy holds
 * at least 4.9:1 all the way down.
 */

const INV_BG = "linear-gradient(170deg, #17467f 0%, #1f5f9f 45%, #0f6e5e 100%)";

function PriceLine({ plan, billing }: { plan: Plan; billing: Billing }) {
  if (!plan.price)
    return (
      <div className="font-display mt-3 text-[22px] leading-[1.2] font-bold tracking-[-0.02em]">
        {plan.priceLabel}
      </div>
    );
  return (
    <div
      key={billing}
      className="mt-3 flex items-baseline gap-1.5"
      style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
    >
      <span className="font-display text-[40px] leading-none font-bold tracking-[-0.03em]">
        ${plan.price[billing]}
      </span>
      <span className="text-[13px] opacity-70">USD</span>
    </div>
  );
}

function Check({ inverted }: { inverted?: boolean }) {
  return inverted ? (
    <span className="tick mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[#17467f]">
      <Icon name="check" className="text-[11px]" />
    </span>
  ) : (
    <Icon name="check" className="tick mt-[3px] text-[16px] text-ink" />
  );
}

function Column({ plan, billing }: { plan: Plan; billing: Billing }) {
  const inv = plan.inverted;
  const ctaVariant =
    plan.id === "trial" ? "primary" : inv ? "inverse" : "secondary";
  return (
    <div
      className={`flex flex-col ${inv ? "text-white" : "bg-white text-ink"}`}
      style={inv ? { backgroundImage: INV_BG } : undefined}
    >
      <div
        className={`border-b p-6 ${inv ? "border-white/15" : "border-hairline"}`}
      >
        <div className="flex items-center gap-2">
          <h2
            className={`font-display text-[26px] leading-[1.1] font-bold tracking-[-0.02em] ${
              inv ? "text-white" : "text-ink"
            }`}
          >
            {plan.name}
          </h2>
          {plan.badge ? (
            <span className="rounded-[6px] bg-white px-2 py-0.5 text-[11px] font-bold text-ink">
              {plan.badge}
            </span>
          ) : null}
        </div>
        <PriceLine plan={plan} billing={billing} />
        <div
          className={`mt-1.5 min-h-[18px] text-[12px] ${
            inv ? "text-white/90" : "text-ink-2"
          }`}
        >
          {plan.sub[billing]}
        </div>
        <Button
          href={plan.cta.href}
          variant={ctaVariant}
          size="sm"
          className="mt-5 w-full"
        >
          {plan.cta.label}
        </Button>
      </div>
      <div className="p-6">
        <div
          className={`eyebrow text-[11px] ${inv ? "text-white/90" : "eyebrow-muted"}`}
        >
          {plan.featuresHeading}
        </div>
        <ul className="check-list mt-4">
          {plan.features.map((f) => (
            <li
              key={f}
              className={`text-[14px] ${inv ? "text-white" : "text-ink"}`}
            >
              <Check inverted={inv} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div
          className={`mt-4 text-[13px] italic ${inv ? "text-white/90" : "text-ink-3"}`}
        >
          and much more…
        </div>
      </div>
    </div>
  );
}

export function BillingToggle({
  billing,
  onChange,
  tone = "light",
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const base =
    "flex cursor-pointer items-center gap-2 rounded-[8px] px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200";
  const on = dark ? "bg-white text-ink" : "bg-panel-2 text-ink";
  const off = dark
    ? "text-[#b4b4b4] hover:text-white"
    : "text-ink-2 hover:text-ink";
  return (
    <div
      role="group"
      aria-label="Billing period"
      className={`inline-flex rounded-[10px] border p-1 ${
        dark ? "border-white/15" : "border-hairline"
      }`}
    >
      <button
        type="button"
        aria-pressed={billing === "monthly"}
        onClick={() => onChange("monthly")}
        className={`${base} ${billing === "monthly" ? on : off}`}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={billing === "yearly"}
        onClick={() => onChange("yearly")}
        className={`${base} ${billing === "yearly" ? on : off}`}
      >
        Yearly
        <span className="rounded-[4px] bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold tracking-[.06em] text-blue-700 uppercase">
          Save ~{yearlySaving}%
        </span>
      </button>
    </div>
  );
}

const TOOLBAR_ICONS = [
  "recipes",
  "ingredients",
  "labeling",
  "taste-tests",
  "crm",
];

export function PlanTable({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="frame">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-hairline bg-white px-4 py-3">
        <BillingToggle billing={billing} onChange={onChange} />
        <div className="flex items-center gap-3 text-[13px] font-medium text-ink">
          <span>All plans include every module and the AI Agent</span>
          <div className="flex items-center -space-x-1.5">
            {TOOLBAR_ICONS.map((id) => {
              const m = modules.find((x) => x.id === id);
              return m ? (
                <span
                  key={id}
                  title={m.label}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white bg-blue-100 text-[12px] text-blue-700"
                >
                  <Icon name={m.icon} />
                </span>
              ) : null;
            })}
            <span
              title="AI Agent"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white"
              style={{ backgroundImage: INV_BG }}
            >
              <SparkIcon size={11} />
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Column key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}
