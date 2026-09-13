import type { Metadata } from "next";
import { DemoForm } from "@/components/contact/demo-form";
import { Icon, LinkedInIcon } from "@/components/icon";
import {
  Block,
  CARD_LIGHT,
  Eyebrow,
  HeroBackdrop,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  contactEmail,
  linkedin,
  phone,
  phoneHref,
  routes,
  supportEmail,
} from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Flavor Studio team by form, email, phone or LinkedIn.",
};

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
            contact you regarding your request. To see the platform on your own
            formulas, request a demo instead.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Reveal className="rounded-2xl border border-gray-300 bg-white p-[clamp(24px,3vw,36px)]">
            <DemoForm intent="contact" />
          </Reveal>

          <div className="flex flex-col gap-4">
            {/* Demo requests have their own page; a visitor who landed here by
                accident should not have to guess which form they want. */}
            <Reveal className={`px-[26px] py-6 ${CARD_LIGHT}`}>
              <Eyebrow className="mb-[10px]">Looking for a demo?</Eyebrow>
              <p className="text-[14px] leading-[1.6] text-slate-500">
                If you want to see Flavor Studio running on your own formulas,
                use the demo request instead — we&rsquo;ll schedule a 30-minute
                walkthrough rather than reply by email.
              </p>
              <TextLink href={routes.demo} className="mt-[14px]">
                Request a demo
              </TextLink>
            </Reveal>

            <Reveal delay={0.08} className={`px-[26px] py-6 ${CARD_LIGHT}`}>
              <Eyebrow className="mb-[14px]">Reach us directly</Eyebrow>
              <div className="flex flex-col gap-3 text-[14px] text-slate-700">
                <a href={`mailto:${contactEmail}`} className={contactLink}>
                  <Icon name="mail" className="text-[16px] text-blue-600" />
                  Info — {contactEmail}
                </a>
                <a href={`mailto:${supportEmail}`} className={contactLink}>
                  <Icon
                    name="headset-one"
                    className="text-[16px] text-blue-600"
                  />
                  Technical Support — {supportEmail}
                </a>
                <a href={phoneHref} className={contactLink}>
                  <Icon
                    name="phone-telephone"
                    className="text-[16px] text-blue-600"
                  />
                  {phone}
                </a>
                <div className="flex items-start gap-[10px]">
                  <Icon
                    name="local-two"
                    className="mt-[2px] text-[16px] text-blue-600"
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
                  <LinkedInIcon className="text-[16px] text-blue-600" />
                  linkedin.com/company/senspire
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.16}
              className="flex items-center gap-[14px] rounded-2xl bg-slate-900 px-[26px] py-[22px]"
            >
              <Icon
                name="headset-one"
                className="flex-none text-[22px] text-lime-400"
              />
              <div className="text-[14px] leading-[1.55] text-slate-300">
                Already a customer?{" "}
                <strong className="font-bold text-white">
                  Support is available 24/7
                </strong>{" "}
                by phone, email and the chat built into the application.
              </div>
            </Reveal>
          </div>
        </div>
      </Block>
    </PageShell>
  );
}
