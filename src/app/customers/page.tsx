import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { industrySegments, testimonials } from "@/lib/data";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Praise from Flavor Studio customers — and the industry segments that use it, from CPG manufacturers to culinology programs.",
};

/* Two cards in the grid invert to navy, breaking up the wall of white. */
const DARK_CARDS = new Set([0, 4]);

export default function CustomersPage() {
  return (
    <PageShell>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <SectionLabel tone="dark">Customers</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mx-auto mt-[14px] max-w-[20ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Praise from our happy customers
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-[18px] max-w-[54ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            Spend less time behind a computer and more time doing what you do
            best — creating.
          </Reveal>
        </div>
      </Block>

      {/* testimonials */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1180px]">
          <Reveal
            as="h2"
            className="font-display mb-[clamp(32px,4vw,52px)] text-center text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-[-0.02em] text-slate-800"
          >
            Clients say …
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
            {testimonials.map((t, i) => {
              const dark = DARK_CARDS.has(i);
              return (
                <Reveal
                  key={t.name}
                  className={`flex flex-col gap-[18px] rounded-[18px] border px-[26px] py-7 ${
                    dark
                      ? "border-slate-800 bg-slate-800"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Icon
                    name="quote"
                    className={`text-2xl ${dark ? "text-lime-400" : "text-blue-400"}`}
                  />
                  <p
                    className={`text-[15px] leading-[1.65] ${dark ? "text-[#dfe5ee]" : "text-slate-700"}`}
                  >
                    {t.quote}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={160}
                      height={160}
                      className="h-[46px] w-[46px] rounded-full bg-gray-100 object-cover"
                    />
                    <div>
                      <div
                        className={`text-[14px] font-bold ${dark ? "text-white" : "text-slate-800"}`}
                      >
                        {t.name}
                      </div>
                      <div
                        className={`text-[13px] ${dark ? "text-slate-300" : "text-slate-400"}`}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Block>

      {/* who uses it */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]">
        <div className="mx-auto max-w-[1080px]">
          <div className="mx-auto max-w-[640px] text-center">
            <SectionLabel>Who uses Flavor Studio</SectionLabel>
            <SectionHeading className="text-[clamp(26px,3.2vw,40px)]">
              If you&rsquo;re anyway involved in the food industry…
            </SectionHeading>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-4 text-[16px] leading-[1.65] text-slate-500"
            >
              …then it&rsquo;s time to start using Flavor Studio.
            </Reveal>
          </div>
          <div className="mt-[clamp(32px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[14px]">
            {industrySegments.map((seg) => (
              <Reveal
                key={seg.name}
                className="flex items-center gap-3 rounded-[14px] border border-gray-300 px-[18px] py-4"
                style={{
                  background:
                    "linear-gradient(180deg, #f8fafd 0%, #eef4fb 100%)",
                }}
              >
                <Icon
                  name={seg.icon}
                  className="flex-none text-[20px] text-blue-500"
                />
                <span className="text-[14px] font-bold text-slate-700">
                  {seg.name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </Block>

      <CtaBand
        title="Join them."
        body="See how their stories started — or start your own with a free 14-day trial."
        className="py-[clamp(60px,7vw,100px)]"
        secondMark={false}
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <a
          href={routes.stories}
          className="rounded-[14px] border border-white/[.28] px-8 py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
        >
          Read success stories
        </a>
      </CtaBand>
    </PageShell>
  );
}
