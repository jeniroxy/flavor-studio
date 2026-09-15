import type { Metadata } from "next";
import { Icon, SparkIcon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { PricingTables } from "@/components/pricing/pricing-tables";
import { Reveal, RevealStagger } from "@/components/reveal";
import {
  Container,
  Eyebrow,
  Headline,
  IconTile,
  Lede,
  LogoStrip,
  RainbowCta,
  Section,
  TextLink,
} from "@/components/ui";
import { productAssets } from "@/lib/assets";
import { pricingFaqs } from "@/lib/data";
import { routes, signupUrl, trialLine } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Try Flavor Studio free for 14 days — no credit card. Professional from $100 per user/month billed annually, Premium from $150, custom Enterprise plans over 30 users. The AI Agent is included on every plan.",
};

/* The value props from the current pricing page, verbatim in substance. */
const VALUE_PROPS = [
  {
    icon: "calculator-one",
    title: "Simple pricing",
    body: "One solution for all of your food and beverage product development activities — no complex software licenses. Billing as easy to understand as the software is to use.",
  },
  {
    icon: "calendar-three",
    title: "Flexible terms",
    body: "No setup fees or annual maintenance costs. No long-term contracts — pay as you go, monthly or annually. Start today with just a credit card.",
  },
  {
    icon: "income",
    title: "Only pay for usage",
    body: "On each anniversary Flavor Studio counts active users and bills accordingly. Mark a user inactive and they are not counted in the next payment.",
  },
  {
    icon: "protect",
    title: "No hidden fees",
    body: "What you see on the table is what you get. Only the licensing fee — the only other charge would be custom development you explicitly request.",
  },
];

/* What the Agent does and does not do — from the AI Agent page and the FAQ. */
const AGENT_CELLS = [
  {
    heading: "What it can do",
    items: [
      "Answer questions about your own recipes, ingredients and tests, with citations",
      "Compare nutrition and cost across versions, side by side",
      "Check claims and label wording against the regulation",
      "Run what-if costing when an ingredient is swapped",
      "Propose reformulation ideas as draft versions",
    ],
  },
  {
    heading: "What it will never do",
    items: [
      "Train third-party models on your data",
      "Change a formula without a developer's approval",
      "Guess — if it cannot source an answer, it says so",
      "Read anything outside your own workspace",
    ],
  },
  {
    heading: "Where it lives",
    items: [
      "Beside the recipe you are working in",
      "@-mention any recipe by name to bring it into the question",
      "Every answer names its sources",
      "Included on every plan, including the trial",
    ],
  },
];

export default function PricingPage() {
  return (
    <PageShell active="pricing">
      {/* ------------------------------------------------------------ hero */}
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
        <Container wide>
          <Headline
            as="h1"
            size="hero"
            className="mx-auto max-w-[18ch] text-center"
          >
            The best R&amp;D <span className="tail">platform</span>, for the
            best <span className="tail">price</span>.
          </Headline>
        </Container>
      </Section>

      {/* ------------------------------------------------------ plan table */}
      <Section className="pb-[clamp(56px,7vw,110px)]">
        <Container wide>
          <Reveal>
            <PricingTables
              strip={<LogoStrip label="Trusted by food & beverage teams" />}
            />
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- AI agent */}
      <Section id="ai" className="bg-night on-dark py-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Reveal>
            <Eyebrow tone="dark">[ AI Agent ]</Eyebrow>
          </Reveal>
          <div className="mt-6 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <Headline size="lg" className="max-w-[16ch]" tail="on every plan.">
              The AI Agent is included
            </Headline>
            <Lede tone="dark" className="max-w-[44ch]">
              No add-on, no credits to buy. The Agent reads your workspace —
              recipes, the ingredient library, supplier data and test results —
              and answers in the recipe you are already in.
            </Lede>
          </div>

          <RevealStagger
            stagger={0.08}
            className="hairline-grid-dark mt-12 md:grid-cols-3"
          >
            {AGENT_CELLS.map((cell, i) => (
              <div key={cell.heading} className="flex flex-col p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[.06]">
                    {i === 0 ? (
                      <SparkIcon size={16} fill="#a8dd5e" />
                    ) : (
                      <Icon
                        name={i === 1 ? "shield" : "robot"}
                        className="text-[18px] text-lime-400"
                      />
                    )}
                  </span>
                  <span className="eyebrow eyebrow-dark text-[12px]">
                    {cell.heading}
                  </span>
                </div>
                <ul className="check-list mt-6">
                  {cell.items.map((item) => (
                    <li key={item} className="text-[14px] text-[#d0d0d0]">
                      <Icon
                        name="check"
                        className="tick text-[15px] text-lime-400"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealStagger>

          <Reveal className="mt-8">
            <TextLink href={routes.agent} tone="dark">
              See what the Agent can do
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ value props */}
      <Section className="py-[clamp(64px,8vw,120px)]">
        <Container wide>
          <Headline size="lg" className="max-w-[18ch]" tail="no surprises.">
            One licensing fee,
          </Headline>
          <RevealStagger
            stagger={0.07}
            className="hairline-grid mt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="flex flex-col p-6">
                <IconTile name={prop.icon} />
                <h3 className="font-display mt-5 text-[18px] leading-[1.25] font-bold">
                  {prop.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-2">
                  {prop.body}
                </p>
              </div>
            ))}
          </RevealStagger>

          {/* Academic discount — a real offer, stated in the FAQ. */}
          <Reveal className="panel mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5">
            <div className="flex items-start gap-4">
              <IconTile name="degree-hat" />
              <div>
                <div className="font-display text-[16px] font-bold text-ink">
                  Academic discounts for universities
                </div>
                <p className="mt-1 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
                  Senspire has supported food science and culinology programs
                  from day one. Reach out through the contact form and we will
                  make it happen.
                </p>
              </div>
            </div>
            <TextLink href={routes.contact}>
              Ask about academic pricing
            </TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <Headline size="lg" tail="questions">
                Frequently asked
              </Headline>
              <Lede className="mt-4 max-w-[36ch]">
                Plans, billing, trials and cancelling. Anything we have not
                covered — don&rsquo;t hesitate to get in touch.
              </Lede>
              <Reveal className="mt-5">
                <TextLink href={routes.contact}>Contact us</TextLink>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <PricingFaq items={pricingFaqs} />
              <p className="mt-6 text-[14px] text-ink-2">
                More questions? See the full{" "}
                <TextLink href={routes.faq} className="align-baseline">
                  FAQ
                </TextLink>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <RainbowCta
        title="Start your 14-day trial today"
        cta={{ label: "Get started", href: signupUrl }}
        note={trialLine}
        image={{
          src: productAssets.recipeGrid.src,
          alt: productAssets.recipeGrid.alt,
          width: productAssets.recipeGrid.width,
          height: productAssets.recipeGrid.height,
        }}
      />
    </PageShell>
  );
}
