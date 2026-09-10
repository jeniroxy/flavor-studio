import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import {
  Block,
  BlueButton,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { stories } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * Per-company success story pages.
 *
 * The first design round linked "Read their story" out to the legacy
 * flavorstudio.com pages, which the client flagged. These pages bring the
 * stories on-site. The intro, photography, quote and module list are real
 * today; the full narrative (`detail.sections` in data.ts) is ported from the
 * legacy pages — until an entry has it, that area shows a marked pending state
 * instead of invented case-study copy.
 */

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.company} — Success Story`,
    description: story.blurb,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const others = stories.filter((s) => s.slug !== slug);

  return (
    <PageShell>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px]">
          <Reveal>
            <Link
              href={routes.stories}
              className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-300 transition-colors hover:text-white"
            >
              <Icon name="left" className="text-[14px]" />
              All success stories
            </Link>
          </Reveal>
          <div className="mt-5">
            <SectionLabel tone="dark">{story.eyebrow}</SectionLabel>
          </div>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] max-w-[26ch] text-[clamp(32px,4vw,52px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-white"
          >
            {story.title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[58ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            {story.blurb}
          </Reveal>
          <Reveal
            delay={0.16}
            className="mt-5 text-[14px] font-semibold text-slate-400"
          >
            {story.meta}
          </Reveal>
        </div>
      </Block>

      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,80px)]">
        <div className="mx-auto max-w-[900px]">
          <Reveal className="relative">
            <Image
              src={story.img}
              alt={story.imgAlt}
              width={story.imgW}
              height={story.imgH}
              sizes="(max-width: 960px) 100vw, 900px"
              priority
              className="aspect-[16/9] w-full rounded-[20px] object-cover shadow-float"
            />
            <div className="absolute bottom-[18px] left-[18px] rounded-[14px] bg-white/90 px-4 py-[10px] backdrop-blur-[6px]">
              <Image
                src={story.logo}
                alt={story.company}
                width={story.logoW}
                height={story.logoH}
                className="h-[34px] w-auto max-w-[140px] object-contain"
              />
            </div>
          </Reveal>

          {story.detail.quote && (
            <Reveal
              delay={0.1}
              className="bg-gray-050 mt-8 rounded-[20px] px-[clamp(24px,3vw,40px)] py-[clamp(24px,3vw,36px)]"
            >
              <Icon name="quote" className="text-[28px] text-blue-500" />
              <blockquote className="font-display mt-3 text-[clamp(19px,2.2vw,26px)] leading-[1.4] font-bold tracking-[-0.01em] text-slate-800">
                &ldquo;{story.detail.quote.text}&rdquo;
              </blockquote>
              <div className="mt-4 text-[14px] text-slate-500">
                <strong className="font-bold text-slate-800">
                  {story.detail.quote.name}
                </strong>{" "}
                — {story.detail.quote.role}
              </div>
            </Reveal>
          )}

          {story.detail.sections.length > 0 ? (
            <div className="mt-10 flex flex-col gap-8">
              {story.detail.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[clamp(20px,2.2vw,26px)] font-extrabold tracking-[-0.01em] text-slate-800">
                    {section.heading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-[16px] leading-[1.75] text-slate-600"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <Reveal delay={0.12} className="mt-10">
              <p className="max-w-[64ch] text-[16px] leading-[1.75] text-slate-600">
                {story.company} runs on Flavor Studio day to day. The full
                write-up of how they got there — what they were fighting before,
                how the rollout went, and what changed afterwards — is being
                prepared with their team.
              </p>
              <a
                href={routes.demo}
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-extrabold text-blue-600 hover:text-blue-700"
              >
                <span>
                  Ask us how {story.company} uses it, on a 30-minute call
                </span>
                <Icon name="arrow-right" className="text-[15px]" />
              </a>
            </Reveal>
          )}

          {/* Cross-links to the other stories. */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="text-[11px] font-bold tracking-[.12em] text-slate-400 uppercase">
              More success stories
            </div>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={other.href}
                  className="group bg-gray-050 flex flex-col rounded-[18px] px-6 py-5 transition-shadow hover:shadow-card"
                >
                  <span className="text-[12px] font-bold tracking-[.08em] text-blue-600 uppercase">
                    {other.eyebrow}
                  </span>
                  <span className="mt-2 text-[16px] leading-[1.4] font-bold text-slate-800">
                    {other.company}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[14px] leading-[1.55] text-slate-500">
                    {other.blurb}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[14px] font-bold text-blue-600">
                    Read their story
                    <Icon
                      name="arrow-right"
                      className="text-[14px] transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Block>

      <CtaBand
        title="Your story could be next."
        body="Tell us what you're building — we'll show you how similar teams run it in Flavor Studio."
        className="py-[clamp(60px,7vw,100px)]"
        secondMark={false}
      >
        <BlueButton href={routes.demo}>Request a demo</BlueButton>
      </CtaBand>
    </PageShell>
  );
}
