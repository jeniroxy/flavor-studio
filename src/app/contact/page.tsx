import type { Metadata } from "next";
import { DemoForm } from "@/components/contact/demo-form";
import { Icon, LinkedInIcon, SparkIcon } from "@/components/icon";
import {
  Block,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  contactEmail,
  linkedin,
  phone,
  phoneHref,
  supportEmail,
} from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo of Flavor Studio, or reach the team directly by email, phone or LinkedIn.",
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

const contactLink =
  "flex items-center gap-[10px] text-slate-700 transition-colors hover:text-blue-600";

export default function ContactPage() {
  return (
    <PageShell fill>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(56px,7vw,96px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <SectionLabel tone="dark">Contact</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mx-auto mt-[14px] max-w-[20ch] text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Contact Us
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-[18px] max-w-[50ch] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-[#aebdd0]"
          >
            Need additional information? Complete the following form and we will
            contact you regarding your request.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Reveal className="rounded-[20px] border border-gray-300 bg-white p-[clamp(24px,3vw,36px)] shadow-[0_14px_40px_rgba(43,59,83,.08)]">
            <DemoForm />
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
                Reach us directly
              </div>
              <div className="flex flex-col gap-3 text-[14px] text-slate-700">
                <a href={`mailto:${contactEmail}`} className={contactLink}>
                  <Icon name="mail" className="text-[17px] text-blue-500" />
                  Info — {contactEmail}
                </a>
                <a href={`mailto:${supportEmail}`} className={contactLink}>
                  <Icon
                    name="headset-one"
                    className="text-[17px] text-blue-500"
                  />
                  Technical Support — {supportEmail}
                </a>
                <a href={phoneHref} className={contactLink}>
                  <Icon
                    name="phone-telephone"
                    className="text-[17px] text-blue-500"
                  />
                  {phone}
                </a>
                <div className="flex items-start gap-[10px]">
                  <Icon
                    name="local-two"
                    className="mt-[2px] text-[17px] text-blue-500"
                  />
                  <span className="leading-[1.5]">
                    Senspire Co, 1547 Palos Verdes Suite 221
                    <br />
                    Walnut Creek, CA 94597
                  </span>
                </div>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLink}
                >
                  <LinkedInIcon className="text-[17px] text-blue-500" />
                  linkedin.com/company/senspire
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.16}
              className="flex items-center gap-[14px] rounded-[20px] px-[26px] py-[22px]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-slate-900), var(--color-slate-800))",
              }}
            >
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[14px] bg-linear-to-br from-blue-500 to-teal-500">
                <SparkIcon size={18} />
              </span>
              <div className="text-[13.5px] leading-[1.55] text-slate-300">
                At IFT this year? See the{" "}
                <strong className="font-bold text-white">AI Agent</strong> live
                at <strong className="font-bold text-white">booth #315</strong>.
              </div>
            </Reveal>
          </div>
        </div>
      </Block>
    </PageShell>
  );
}
