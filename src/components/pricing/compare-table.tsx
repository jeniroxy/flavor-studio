"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui";
import {
  compareRowCount,
  compareSections,
  plans,
  type Billing,
  type Cell,
} from "./plans";

/*
 * The "Complete feature list" table: a sticky header row (plan, price, CTA
 * repeated) over mono section rows and hairline data rows. Rows are built
 * from the module catalogue, so the table is as long as the product is.
 */

function CellMark({ cell }: { cell: Cell }) {
  if (cell === true)
    return (
      <>
        <Icon name="check" className="mx-auto text-[18px] text-ink" />
        <span className="sr-only">Included</span>
      </>
    );
  if (cell === false) return <span className="sr-only">Not included</span>;
  return <span className="text-[13px] text-ink-2">{cell}</span>;
}

export function CompareTable({ billing }: { billing: Billing }) {
  return (
    /* Horizontal scroll only below lg — an overflow container would stop
       the header row sticking to the viewport on desktop. */
    <div className="max-lg:overflow-x-auto">
      <table className="w-full border-collapse text-left max-lg:min-w-[760px]">
        <caption className="sr-only">
          Complete feature list, {compareRowCount} rows across four plans
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-[var(--nav-height)] z-10 w-[36%] border-b border-hairline bg-white py-4 pr-4 align-bottom"
            >
              <span className="eyebrow eyebrow-muted text-[11px]">
                {compareRowCount} features
              </span>
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className="sticky top-[var(--nav-height)] z-10 border-b border-hairline bg-white px-3 py-4 text-center align-bottom"
              >
                <div className="font-display text-[17px] leading-[1.2] font-bold text-ink">
                  {plan.name}
                </div>
                <div className="mt-1 text-[12px] text-ink-2">
                  {plan.price
                    ? `$${plan.price[billing]} user/month`
                    : plan.priceLabel}
                </div>
                <Button
                  href={plan.cta.href}
                  variant={plan.inverted ? "primary" : "secondary"}
                  size="sm"
                  className="mt-3 w-full"
                >
                  {plan.cta.label}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        {compareSections.map((section) => (
          <tbody key={section.title}>
            <tr>
              <th
                scope="colgroup"
                colSpan={plans.length + 1}
                className="eyebrow eyebrow-muted pt-10 pb-3 text-[11px] font-normal"
              >
                {section.title}
              </th>
            </tr>
            {section.rows.map((r) => (
              <tr key={r.label} className="border-b border-hairline">
                <th
                  scope="row"
                  className="py-3.5 pr-6 text-[14px] leading-[1.45] font-normal text-ink"
                >
                  {r.label}
                </th>
                {r.cells.map((cell, i) => (
                  <td
                    key={plans[i].id}
                    className={`px-3 py-3.5 text-center ${
                      plans[i].inverted ? "bg-panel/70" : ""
                    }`}
                  >
                    <CellMark cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
