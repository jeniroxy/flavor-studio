import type { Metadata } from "next";
import Link from "next/link";
import { DemoForm } from "@/components/contact/demo-form";
import { Icon } from "@/components/icon";
import {
  Block,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { contactEmail, phone, phoneHref, routes } from "@/lib/routes";

/*
 * Demo requests were previously folded into /contact, which made a booking
 * request indistinguishable from a general enquiry. Same form, distinct page:
 * the heading, the submit label and the `intent` on the payload all say "demo".
 */

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Book a 30-minute walkthrough of Flavor Studio on your own formulas — recipes, nutrition, labeling, projects and CRM.",
};

const STEPS = [
  {
    title: "Intro call",
    body: "15 minutes on your category, team and current tools.",
  },
  {
    title: "Live demo",
    body: "we formulate one of your recipes, label and all, in 30 minutes.",
  },
  {
    title: "Guided pilot",
    body: "30 days on your own data, onboarding included.",
  },
];

const COVERED = [
  "Recipes, versions and live costing",
  "Nutrition analysis and compliant labels",
  "Projects, timeline, board and reports",
  "Taste tests and sensory scoring",
  "CRM, samples and shipment tracking",
  "API, webhooks and ERP integrations",
];

export default function RequestDemoPage() {
  return (
    <PageShell fill>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <SectionLabel tone="dark">Request a demo</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mx-auto mt-[14px] max-w-[20ch] text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            See Flavor Studio on your own formulas.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-[18px] max-w-[54ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            Thirty minutes, tailored to your category. Bring a recipe and
            we&rsquo;ll formulate, cost and label it live — no slides.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Reveal className="rounded-[20px] border border-gray-300 bg-white p-[clamp(24px,3vw,36px)] shadow-card">
            <DemoForm intent="demo" />
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal className="rounded-[20px] border border-gray-300 bg-white px-[26px] py-6">
              <div className="mb-[14px] text-[11px] font-bold tracking-[.12em] text-slate-400 uppercase">
                What to expect
              </div>
              <div className="flex flex-col gap-[14px]">
                {STEPS.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-200 text-[12px] font-extrabold text-blue-700">
                      {i + 1}
                    </span>
                    <div className="text-[14px] leading-[1.55] text-slate-700">
                      <strong className="font-bold text-slate-800">
                        {step.title}
                      </strong>{" "}
                      — {step.body}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-[20px] border border-gray-300 bg-white px-[26px] py-6"
            >
              <div className="mb-[14px] text-[11px] font-bold tracking-[.12em] text-slate-400 uppercase">
                What we can cover
              </div>
              <div className="flex flex-col gap-[10px] text-[14px] text-slate-700">
                {COVERED.map((item) => (
                  <div key={item} className="flex items-start gap-[10px]">
                    <Icon
                      name="check-one"
                      className="mt-[3px] flex-none text-[15px] text-[#0e8b73]"
                    />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-[1.6] text-slate-400">
                Tell us which of these matter most in the form and we&rsquo;ll
                build the session around them.
              </p>
            </Reveal>

            <Reveal
              delay={0.16}
              className="rounded-[20px] border border-gray-300 bg-white px-[26px] py-6"
            >
              <div className="mb-[10px] text-[11px] font-bold tracking-[.12em] text-slate-400 uppercase">
                Prefer to talk first?
              </div>
              <div className="flex flex-col gap-3 text-[14px] text-slate-700">
                <a
                  href={phoneHref}
                  className="flex items-center gap-[10px] transition-colors hover:text-blue-600"
                >
                  <Icon
                    name="phone-telephone"
                    className="text-[16px] text-blue-500"
                  />
                  {phone}
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-[10px] transition-colors hover:text-blue-600"
                >
                  <Icon name="mail" className="text-[16px] text-blue-500" />
                  {contactEmail}
                </a>
                <Link
                  href={routes.contact}
                  className="flex items-center gap-[10px] font-bold text-blue-600 hover:text-blue-700"
                >
                  <Icon name="send" className="text-[16px]" />
                  General contact form
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Block>
    </PageShell>
  );
}
