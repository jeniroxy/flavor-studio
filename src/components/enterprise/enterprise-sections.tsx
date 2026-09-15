import Image from "next/image";
import Link from "next/link";
import { FlowPlayer } from "@/components/flow-player";
import { Icon } from "@/components/icon";
import { Reveal, RevealStagger } from "@/components/reveal";
import { StickyRail } from "@/components/sticky-rail";
import { Eyebrow, Headline, IconTile, Lede } from "@/components/ui";
import {
  enterpriseSections,
  railItems,
  type CardVisual,
  type EnterpriseCard,
} from "./sections";

/*
 * ClickUp's enterprise page runs seven sections down the left with a sticky
 * scroll-spy rail on the right; each section is an eyebrow, a headline, a
 * line of copy and three cards with a visual on top. Ours use real product
 * exports (a cropped screenshot or a played flow) or, where a control has no
 * screen of its own, an icon tile.
 */

function Visual({ visual, title }: { visual: CardVisual; title: string }) {
  if (visual.kind === "shot" && visual.asset.src) {
    return (
      <div className="frame aspect-[16/10] bg-panel">
        <Image
          src={visual.asset.src}
          alt={visual.asset.alt}
          width={visual.asset.width}
          height={visual.asset.height}
          sizes="(max-width: 768px) 100vw, 320px"
          className="h-full w-full object-cover object-left-top"
        />
      </div>
    );
  }
  if (visual.kind === "flow") {
    return (
      <FlowPlayer
        flow={visual.flow}
        sizes="(max-width: 768px) 100vw, 320px"
        dwell={3200}
      />
    );
  }
  const icon = visual.kind === "icon" ? visual.icon : "all-application";
  return (
    <div
      className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-md)] border border-hairline bg-white"
      aria-hidden="true"
      title={title}
    >
      <IconTile name={icon} />
    </div>
  );
}

/* The card is a plain block, not one big link: a played flow carries its own
   step buttons, and interactive content cannot sit inside an anchor. */
function Card({ card }: { card: EnterpriseCard }) {
  return (
    <div className="card flex flex-col p-4">
      <Visual visual={card.visual} title={card.title} />
      <h3 className="font-display mt-5 text-[17px] leading-[1.3] font-bold text-ink">
        {card.title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">{card.body}</p>
      {card.href ? (
        <Link
          href={card.href}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-blue-700 hover:text-blue-600"
        >
          Learn more
          <Icon name="arrow-right" className="text-[14px]" />
        </Link>
      ) : null}
    </div>
  );
}

export function EnterpriseSections() {
  return (
    <StickyRail items={railItems} railTop={100}>
      <div className="flex flex-col gap-[clamp(64px,8vw,120px)]">
        {enterpriseSections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-[100px]">
            <Reveal>
              <Eyebrow>{s.eyebrow}</Eyebrow>
            </Reveal>
            <Headline size="md" className="mt-3 max-w-[22ch]" tail={s.tail}>
              {s.title}
            </Headline>
            <Lede className="mt-3 max-w-[62ch]">{s.lede}</Lede>
            <RevealStagger
              stagger={0.08}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {s.cards.map((c) => (
                <Card key={c.title} card={c} />
              ))}
            </RevealStagger>
          </section>
        ))}
      </div>
    </StickyRail>
  );
}
