import type { Metadata } from "next";
import Image from "next/image";
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

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "How Deli Star, Good Foods and Ripple Foods develop better products with Flavor Studio.",
};

/* Copy on these three cards is the story-page phrasing, which differs slightly
   from the carousel version on the landing page. */
const HEADLINES = [
  "Flavor Studio drives innovation and collaboration to accelerate product launches",
  "Making Good Food From Everywhere",
  "An enhanced cloud-based experience with up-to-date, accurate nutritional analysis",
];

const BLURBS = [
  "Deli Star is a meat processing company built on scientific innovation, food safety and family culture — crafting healthy, flavorful, minimally processed products in the belief that food is fuel.",
  "From small-town Pleasant Prairie, Wisconsin, family-owned Good Foods turns fresh produce into guacamoles, dips, dressings, salsas and salads — convinced that “good food makes the world go around”.",
  "Founded in 2014, Ripple Foods makes plant-based, dairy-free foods and beverages from yellow peas — a milk with as much protein as dairy and about eight times the protein of almond milk.",
];

function StoryMedia({ index }: { index: number }) {
  const story = stories[index];
  return (
    <Reveal className="relative">
      <Image
        src={story.img}
        alt={story.imgAlt}
        width={story.imgW}
        height={story.imgH}
        sizes="(max-width: 960px) 100vw, 50vw"
        className="aspect-[4/3] w-full rounded-[20px] object-cover shadow-float"
      />
      <div className="absolute bottom-[18px] left-[18px] rounded-[14px] bg-white/90 px-4 py-[10px] backdrop-blur-[6px]">
        <Image
          src={story.logo}
          alt={story.company}
          width={story.logoW}
          height={story.logoH}
          className="h-[34px] w-auto max-w-[132px] object-contain"
        />
      </div>
    </Reveal>
  );
}

function StoryCopy({ index }: { index: number }) {
  const story = stories[index];
  return (
    <div>
      <SectionLabel>{story.eyebrow}</SectionLabel>
      <Reveal
        as="h2"
        delay={0.06}
        className="font-display mt-3 text-[clamp(26px,3vw,38px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-slate-800"
      >
        {HEADLINES[index]}
      </Reveal>
      <Reveal
        as="p"
        delay={0.12}
        className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-slate-500"
      >
        {BLURBS[index]}
      </Reveal>
      {/* On-site detail page — no longer a redirect to the legacy site. */}
      <Reveal
        as="a"
        delay={0.18}
        href={story.href}
        className="mt-[22px] inline-flex items-center gap-2 text-[15px] font-bold text-blue-600"
      >
        Read their story
        <Icon name="arrow-right" className="text-[15px]" />
      </Reveal>
    </div>
  );
}

export default function SuccessStoriesPage() {
  return (
    <PageShell>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px]">
          <SectionLabel tone="dark">Success stories</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Success Stories
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[56ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            How Deli Star, Good Foods and Ripple Foods develop better products
            with Flavor Studio.
          </Reveal>
        </div>
      </Block>

      {/* The three stories alternate photo/copy sides down the page. */}
      {stories.map((story, i) => (
        <Block
          key={story.company}
          className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,6.5vw,92px)]"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(36px,5vw,64px)]">
            {i % 2 === 0 ? (
              <>
                <StoryMedia index={i} />
                <StoryCopy index={i} />
              </>
            ) : (
              <>
                <StoryCopy index={i} />
                <StoryMedia index={i} />
              </>
            )}
          </div>
        </Block>
      ))}

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
