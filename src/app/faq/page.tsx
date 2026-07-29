import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { faqGroups } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Commonly asked questions about Flavor Studio — the company, using the platform, recipes and labeling, pricing, and security.",
};

export default function FaqPage() {
  return (
    <PageShell fill>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <SectionLabel tone="dark">FAQ</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            FAQs
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-[18px] max-w-[48ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            Commonly asked questions and answers. Something missing?{" "}
            <a href={routes.contact} className="font-bold text-lime-400">
              Contact us
            </a>{" "}
            today.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-[clamp(32px,4vw,48px)]">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <Reveal className="mb-4 flex items-center gap-[10px]">
                <Icon name={group.icon} className="text-[19px] text-blue-500" />
                <span className="font-display text-[19px] font-extrabold text-slate-800">
                  {group.title}
                </span>
              </Reveal>
              <div className="flex flex-col gap-3">
                <FaqAccordion items={group.items} groupKey={group.title} />
              </div>
            </div>
          ))}
        </div>
      </Block>

      <CtaBand
        title="More questions?"
        className="py-[clamp(56px,6.5vw,92px)]"
        secondMark={false}
      >
        <BlueButton href={routes.contact}>Contact us today</BlueButton>
      </CtaBand>
    </PageShell>
  );
}
