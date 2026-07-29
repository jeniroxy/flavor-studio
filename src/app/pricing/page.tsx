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
import { pricingFaqs } from "@/lib/data";
import { routes, salesEmail } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Try Flavor Studio free for two weeks — no credit card needed. Professional from $100/user/month, Premium from $150, custom Enterprise plans over 30 users.",
};

const outlineCta =
  "mt-auto rounded-[14px] border border-blue-500 py-3 text-center text-[14.5px] font-bold whitespace-nowrap text-blue-600 transition-[background] duration-[180ms] hover:bg-blue-100 hover:text-blue-700";

const PROFESSIONAL_FEATURES = [
  "Unlimited Project Repository Storage",
  "Unlimited Project Tasks",
  "Unlimited Messages",
  "Secure end-to-end encryption",
  "24/7 support (email/messages/phone)",
  "Fully integrated CRM",
];

const PREMIUM_FEATURES = [
  "Everything in the Professional and…",
  "Unlimited Inspire Collections",
  "Unlimited Recipes",
  "Unlimited Nutrition Labels",
  "Unlimited Taste Test Surveys",
  "R&D tax credit reporting",
  "Continuous updates and new features",
];

const VALUE_PROPS = [
  {
    icon: "calculator-one",
    badge: "bg-blue-100 border-blue-200",
    color: "text-blue-500",
    title: "Simple Pricing",
    body: "One solution for all of your food and beverage product development activities — no complex software licenses. Billing as easy to understand as the software is to use.",
  },
  {
    icon: "calendar-three",
    badge: "bg-teal-100 border-[rgba(24,188,156,.28)]",
    color: "text-[#0e8b73]",
    title: "Flexible Terms",
    body: "No setup fees or annual maintenance costs. Start today with just a credit card.",
  },
  {
    icon: "income",
    badge: "bg-amber-100 border-[rgba(233,178,45,.32)]",
    color: "text-[#a97d17]",
    title: "Only Pay For Actual Usage",
    body: "Real-time costing shows individual ingredient costs, total batch cost, and estimated retail pricing.",
  },
  {
    icon: "protect",
    badge: "bg-violet-100 border-[rgba(123,97,255,.24)]",
    color: "text-violet-500",
    title: "No Hidden Fees",
    body: "What you see on the table is what you get. Only a monthly licensing fee — that's it.",
  },
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="mt-5 mb-[26px] flex flex-col gap-[10px] text-[14px] text-slate-700">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-[9px]">
          <Icon
            name="check-one"
            className="flex-none text-[16px] text-teal-500"
          />
          {item}
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <PageShell active="pricing">
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <SectionLabel tone="dark">Pricing</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mx-auto mt-[14px] max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Pricing and Plans
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-[18px] max-w-[52ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            Try Flavor Studio completely free for two weeks — no credit card
            needed.
          </Reveal>
        </div>
      </Block>

      {/* plans */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,265px),1fr))] items-stretch gap-5">
          <Reveal className="flex flex-col rounded-[20px] border border-gray-300 bg-white px-7 py-[30px]">
            <div className="text-[15px] font-extrabold tracking-[.1em] text-slate-800">
              TRIAL
            </div>
            <div className="mt-[14px]">
              <span className="font-display text-[44px] font-extrabold text-slate-800">
                $0
              </span>
            </div>
            <div className="mt-1 text-[13.5px] font-bold text-slate-700">
              14 days
            </div>
            <div className="mt-3 text-[14px] leading-[1.6] text-slate-500">
              Enjoy Premium plan access for a limited time. No credit card
              needed to sign up.
            </div>
            <a href={routes.contact} className={outlineCta}>
              Get Started!
            </a>
          </Reveal>

          <Reveal
            delay={0.06}
            className="flex flex-col rounded-[20px] border border-gray-300 bg-white px-7 py-[30px]"
          >
            <div className="text-[15px] font-extrabold tracking-[.1em] text-slate-800">
              PROFESSIONAL
            </div>
            <div className="mt-[14px]">
              <span className="font-display text-[44px] font-extrabold text-slate-800">
                $100
              </span>
              <span className="text-[13.5px] font-semibold text-slate-400">
                {" "}
                USD per user / month
              </span>
            </div>
            <div className="mt-1 text-[12.5px] text-slate-400">
              Billed annually, or $110 month-to-month
            </div>
            <FeatureList items={PROFESSIONAL_FEATURES} />
            <a href={routes.contact} className={outlineCta}>
              Get Started!
            </a>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative flex flex-col rounded-[20px] border-2 border-blue-500 bg-white px-7 py-[30px] shadow-[0_20px_50px_rgba(89,163,235,.2)]"
          >
            <div className="absolute top-[-13px] left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-[14px] py-[5px] text-[11px] font-extrabold tracking-[.08em] whitespace-nowrap text-white uppercase">
              Best choice
            </div>
            <div className="text-[15px] font-extrabold tracking-[.1em] text-slate-800">
              PREMIUM
            </div>
            <div className="mt-[14px]">
              <span className="font-display text-[44px] font-extrabold text-slate-800">
                $150
              </span>
              <span className="text-[13.5px] font-semibold text-slate-400">
                {" "}
                USD per user / month
              </span>
            </div>
            <div className="mt-1 text-[12.5px] text-slate-400">
              Billed annually, or $165 month-to-month
            </div>
            <FeatureList items={PREMIUM_FEATURES} />
            <a
              href={routes.contact}
              className="mt-auto rounded-[14px] bg-blue-500 py-[13px] text-center text-[14.5px] font-bold whitespace-nowrap text-white shadow-[0_8px_20px_rgba(89,163,235,.35)] transition-[background] duration-[180ms] hover:bg-blue-600"
            >
              Get Started!
            </a>
          </Reveal>
        </div>

        {/* enterprise banner — matched to the plan grid's exact width */}
        <div className="mx-auto max-w-[1240px]">
          <Reveal
            delay={0.06}
            className="mt-[clamp(16px,1.8vw,26px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(20px,2.4vw,36px)] rounded-[20px] bg-slate-800 p-[clamp(28px,3vw,40px)]"
          >
            <div className="min-w-0">
              <div className="text-[12px] font-extrabold tracking-[.14em] text-lime-400">
                ENTERPRISE
              </div>
              <div className="font-display mt-[14px] text-[30px] leading-[1.2] font-extrabold text-white">
                More than 30 users?
              </div>
              <div className="mt-[10px] max-w-[52ch] text-[14.5px] leading-[1.65] text-slate-300">
                Email us at{" "}
                <a
                  href={`mailto:${salesEmail}`}
                  className="font-bold text-lime-400"
                >
                  {salesEmail}
                </a>{" "}
                so that we can create a custom solution that aligns with your
                size.
              </div>
            </div>
            <div className="flex justify-end">
              <a
                href={`mailto:${salesEmail}`}
                className="inline-block rounded-[14px] border border-white/[.16] bg-white/[.08] px-8 py-[13px] text-center text-[14.5px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.16]"
              >
                Email sales
              </a>
            </div>
          </Reveal>
        </div>
      </Block>

      {/* value props — four white cards sitting directly on the canvas,
          aligned with the blocks above and below rather than nested in one */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
        {VALUE_PROPS.map((prop, i) => (
          <Reveal
            key={prop.title}
            delay={i * 0.06}
            className="rounded-[clamp(20px,2vw,30px)] bg-white p-[clamp(26px,2.8vw,34px)]"
          >
            <span
              className={`flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[13px] border ${prop.badge}`}
            >
              <Icon name={prop.icon} className={`text-[22px] ${prop.color}`} />
            </span>
            <div className="font-display mt-4 text-[clamp(19px,1.9vw,23px)] leading-[1.25] font-extrabold tracking-[-0.01em] text-slate-800">
              {prop.title}
            </div>
            <div className="mt-[7px] text-[13.5px] leading-[1.6] text-slate-500">
              {prop.body}
            </div>
          </Reveal>
        ))}
      </section>

      {/* pricing FAQ */}
      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(52px,6vw,84px)]">
        <div className="mx-auto max-w-[720px]">
          <Reveal
            as="h2"
            className="font-display mb-[clamp(24px,4vw,40px)] text-center text-[clamp(24px,2.8vw,34px)] font-extrabold tracking-[-0.02em] text-slate-800"
          >
            Pricing questions
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3">
            <FaqAccordion items={pricingFaqs} groupKey="pricing" />
          </Reveal>
          <Reveal className="mt-6 text-center text-[14px] text-slate-500">
            More questions? See the full{" "}
            <a href={routes.faq} className="font-bold text-blue-500">
              FAQ
            </a>
            .
          </Reveal>
        </div>
      </Block>

      <CtaBand
        title="Start your free 14-day trial."
        body="Full Premium access, as many users as you need, and nothing you build is lost when you become a customer."
        className="py-[clamp(60px,7vw,100px)]"
      >
        <BlueButton href={routes.contact}>Get Started!</BlueButton>
      </CtaBand>
    </PageShell>
  );
}
