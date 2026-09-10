import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal, RevealStagger } from "@/components/reveal";
import { formatNewsDate, newsEntries, type NewsCategory } from "@/lib/news";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "News",
  description:
    "What's new in Flavor Studio — new modules, improvements, integrations and announcements, as they ship.",
};

const CATEGORY_STYLE: Record<NewsCategory, string> = {
  "New module": "bg-lime-100 text-[#5c8f1c]",
  Improvement: "bg-blue-200 text-blue-700",
  Integration: "bg-teal-100 text-[#0e8b73]",
  Announcement: "bg-violet-100 text-violet-500",
  Event: "bg-amber-100 text-[#a97d17]",
};

export default function NewsPage() {
  const entries = [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell active="news" fill>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px]">
          <SectionLabel tone="dark">News</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            What&rsquo;s new in Flavor Studio.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[58ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            New modules, improvements to existing features, integrations and
            announcements — published here as they ship, not just the headline
            releases. Hundreds of changes have landed since the platform
            launched; this is where they get recorded from now on.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto max-w-[820px]">
          <RevealStagger stagger={0.07} className="flex flex-col gap-[18px]">
            {entries.map((entry) => (
              <article
                key={entry.slug}
                id={entry.slug}
                className="scroll-mt-[90px] rounded-[20px] border border-gray-300 bg-white px-[clamp(22px,2.8vw,34px)] py-[clamp(20px,2.6vw,30px)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-[5px] text-[12px] font-bold ${CATEGORY_STYLE[entry.category]}`}
                  >
                    {entry.category}
                  </span>
                  <time
                    dateTime={entry.date}
                    className="text-[13px] font-semibold text-slate-400"
                  >
                    {formatNewsDate(entry.date)}
                  </time>
                </div>
                <h2 className="font-display mt-3 text-[clamp(20px,2.2vw,26px)] leading-[1.25] font-extrabold tracking-[-0.01em] text-slate-800">
                  {entry.title}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.65] text-slate-500">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
                  {entry.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-[14px] leading-[1.7] text-slate-600"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </RevealStagger>

          <Reveal
            delay={0.1}
            className="mt-8 rounded-[16px] bg-gray-050 px-6 py-5 text-[14px] leading-[1.65] text-slate-500"
          >
            <span className="font-bold text-slate-700">
              Following along as a customer?
            </span>{" "}
            The updates we email to existing users are published here in the
            same structured form — check back, or ask about the changelog during
            your next support conversation.
          </Reveal>
        </div>
      </Block>

      <CtaBand
        title="See the newest capabilities live."
        body="A 30-minute demo covers what's shipped recently alongside the core platform."
        className="py-[clamp(60px,7vw,100px)]"
        secondMark={false}
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
        <Link
          href={routes.features}
          className="inline-flex items-center gap-2 rounded-[14px] border border-white/[.28] px-8 py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/10"
        >
          Explore all modules
          <Icon name="arrow-right" className="text-[15px]" />
        </Link>
      </CtaBand>
    </PageShell>
  );
}
