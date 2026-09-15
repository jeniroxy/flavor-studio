import { ChatMock } from "@/components/chat-mock";
import { FaqAccordion } from "@/components/faq-accordion";
import { Contrast } from "@/components/features/contrast";
import { FeatureHero } from "@/components/features/feature-hero";
import {
  FeatureVisual,
  visualImage,
} from "@/components/features/feature-visual";
import { HairlineRows } from "@/components/features/hairline-rows";
import { IconGrid } from "@/components/features/icon-grid";
import { PlatformGrid } from "@/components/features/platform-grid";
import { Reveal } from "@/components/reveal";
import {
  Button,
  Container,
  Eyebrow,
  FaqHeading,
  GradientBanner,
  LogoStrip,
  RainbowCta,
  Section,
  SectionHead,
  SecurityStrip,
} from "@/components/ui";
import { featureModule, type FeaturePage } from "@/lib/feature-pages";
import { routes } from "@/lib/routes";

/*
 * ClickUp's feature "Template A" (docs/research/clickup-pages-analysis.md §1),
 * section by section:
 *
 *   1 Hero · 2 LogoStrip · 3 WithoutWith | Thesis · 4 Pillars head ·
 *   5 three alternating rows · 6 GradientBanner · 7 AI head · 8 two AI rows ·
 *   9 icon grid · 10 platform grid · 11 SecurityStrip · 12 FAQ · 13 RainbowCta
 *
 * The AI Agent appears once, after the product has been explained — the
 * client's "product first, AI second" rule.
 */
export function FeatureTemplate({ page }: { page: FeaturePage }) {
  const mod = featureModule(page);
  const heroImage = visualImage(page.hero);

  return (
    <>
      {/* 1 */}
      <FeatureHero page={page} />

      {/* 2 */}
      <Container>
        <LogoStrip />
      </Container>

      {/* 3 */}
      <Contrast page={page} module={mod} />

      {/* 4 + 5 */}
      <Section className="pb-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            title={page.pillars.title}
            tail={page.pillars.tail}
            lede={page.pillars.lede}
          />
          <Reveal delay={0.1}>
            <Eyebrow tone="muted" className="mt-5 text-center">
              {page.pillars.adjectives}
            </Eyebrow>
          </Reveal>
          <HairlineRows
            className="mt-[clamp(32px,4vw,56px)]"
            rows={page.pillars.rows.map((row, i) => ({
              eyebrow: row.eyebrow,
              title: row.title,
              body: row.body,
              flip: i % 2 === 1,
              visual: (
                <FeatureVisual
                  visual={row.visual}
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              ),
            }))}
          />
        </Container>
      </Section>

      {/* 6 */}
      <Container>
        <GradientBanner
          title={page.banner.title}
          body={page.banner.body}
          image={heroImage}
          cta={{ label: "Request a demo", href: routes.demo }}
        />
      </Container>

      {/* 7 + 8 */}
      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <SectionHead
            eyebrow="AI powered R&D"
            title={page.ai.title}
            tail={page.ai.tail}
          />
          <HairlineRows
            className="mt-[clamp(32px,4vw,56px)]"
            rows={page.ai.rows.map((row, i) => ({
              eyebrow: row.eyebrow,
              title: row.title,
              body: row.body,
              flip: i % 2 === 1,
              plain: true,
              visual: <ChatMock lines={row.chat} />,
              footer:
                i === 0 ? (
                  <div className="flex flex-wrap gap-3">
                    <Button
                      href={routes.agent}
                      variant="primary"
                      size="sm"
                      arrow
                    >
                      Explore the AI Agent
                    </Button>
                    <Button href={routes.demo} variant="secondary" size="sm">
                      Request a demo
                    </Button>
                  </div>
                ) : undefined,
            }))}
          />
        </Container>
      </Section>

      {/* 9 */}
      <IconGrid page={page} />

      {/* 10 */}
      <PlatformGrid current={mod} />

      {/* 11 */}
      <Section className="py-[clamp(40px,5vw,72px)]">
        <SecurityStrip />
      </Section>

      {/* 12 */}
      <Section className="py-[clamp(56px,7vw,104px)]">
        <Container>
          <FaqHeading />
          <Reveal
            delay={0.08}
            className="mx-auto mt-[clamp(28px,3.5vw,44px)] max-w-[680px]"
          >
            <FaqAccordion items={page.faq} groupKey={page.id} />
          </Reveal>
        </Container>
      </Section>

      {/* 13 */}
      <RainbowCta
        title={page.ctaTitle}
        cta={{ label: "Request a demo", href: routes.demo }}
        image={heroImage}
      />
    </>
  );
}
