import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";
import { IconTile, SectionHead } from "@/components/ui";
import { industrySegments, whyPoints } from "@/lib/data";

/*
 * "Who uses Flavor Studio": the eleven real industry segments as an icon pill
 * row, then a hairline grid of four of the (real) reasons teams choose the
 * platform. Nothing here is a count or a claim — segments and copy both come
 * from src/lib/data.ts.
 */

const GRID_ICONS = ["all-application", "leaves", "doc-detail", "headset-one"];

export function WhoUses({ className = "" }: { className?: string }) {
  const points = GRID_ICONS.map((icon) =>
    whyPoints.find((p) => p.icon === icon),
  ).filter((p): p is (typeof whyPoints)[number] => !!p);

  return (
    <div className={className}>
      <SectionHead
        eyebrow="Who uses Flavor Studio"
        title="If you create, manufacture or supply"
        tail="food and beverage."
        lede="From CPG manufacturers and ingredient suppliers to culinology programs and dieticians — Flavor Studio is designed for you."
      />

      <RevealStagger
        as="ul"
        stagger={0.04}
        className="mx-auto mt-10 flex max-w-[900px] flex-wrap justify-center gap-2 p-0 list-none"
      >
        {industrySegments.map((seg) => (
          <li
            key={seg.name}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-hairline bg-white px-4 py-2 text-[14px] font-semibold text-ink-2"
          >
            <Icon name={seg.icon} className="text-[18px] text-blue-600" />
            {seg.name}
          </li>
        ))}
      </RevealStagger>

      <RevealStagger
        stagger={0.07}
        className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {points.map((p) => (
          <div key={p.icon} className="flex flex-col gap-4 p-6">
            <IconTile name={p.icon} />
            <h3 className="font-display text-[17px] leading-[1.3] font-bold tracking-[-0.01em]">
              {p.title}
            </h3>
            <p className="text-[14px] leading-[1.6] text-ink-2">{p.body}</p>
          </div>
        ))}
      </RevealStagger>
    </div>
  );
}
