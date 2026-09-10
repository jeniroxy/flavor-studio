import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import {
  Block,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { contactEmail } from "@/lib/routes";

/*
 * Privacy Policy.
 *
 * A privacy policy is a legal document: its authoritative text exists on the
 * current flavorstudio.com and must be ported verbatim (or re-issued by
 * counsel), not paraphrased by a redesign. This page carries the layout and a
 * clearly marked pending state; drop the canonical sections into POLICY_SECTIONS
 * and the notice disappears.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Senspire Co collects, uses and protects your information.",
};

type PolicySection = { heading: string; paragraphs: string[] };

/*
 * Replace with the canonical policy text from flavorstudio.com/privacy (or the
 * version legal signs off for the new site). One entry per section.
 */
const POLICY_SECTIONS: PolicySection[] = [];

const EXPECTED_HEADINGS = [
  "Information we collect",
  "How we use information",
  "Data ownership and your formulas",
  "Data security",
  "Cookies and analytics",
  "Third-party services",
  "Data retention and deletion",
  "Your rights",
  "Changes to this policy",
  "Contact",
];

export default function PrivacyPage() {
  return (
    <PageShell fill>
      <Block className="relative px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,6vw,80px)]">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-[1180px]">
          <SectionLabel tone="dark">Legal</SectionLabel>
          <Reveal
            as="h1"
            delay={0.06}
            className="font-display mt-[14px] text-[clamp(34px,4.2vw,54px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-white"
          >
            Privacy Policy
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[56ch] text-[clamp(15px,1.4vw,17px)] leading-[1.65] text-[#aebdd0]"
          >
            How Senspire Co collects, uses and protects your information across
            Flavor Studio and this website.
          </Reveal>
        </div>
      </Block>

      <Block className="flex-1 bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
        <div className="mx-auto max-w-[760px]">
          {POLICY_SECTIONS.length > 0 ? (
            <div className="flex flex-col gap-8">
              {POLICY_SECTIONS.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[clamp(19px,2vw,24px)] font-extrabold tracking-[-0.01em] text-slate-800">
                    {section.heading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-[1.75] text-slate-600"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-[20px] border-2 border-dashed border-gray-300 bg-gray-050 px-[clamp(24px,3vw,40px)] py-[clamp(28px,3.4vw,44px)]">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.14em] text-slate-400 uppercase">
                <Icon name="doc-search" className="text-[16px]" />
                Awaiting canonical text
              </div>
              <p className="mt-4 text-[15px] leading-[1.75] text-slate-600">
                The authoritative Privacy Policy is the one published on the
                current flavorstudio.com, and it will be carried over verbatim —
                a legal document is ported, not paraphrased by a redesign. Until
                that text is dropped in, this page intentionally shows this
                notice rather than placeholder legal language.
              </p>
              <p className="mt-3 text-[15px] leading-[1.75] text-slate-600">
                Sections the ported policy is expected to cover:
              </p>
              <ul className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-6 gap-y-2">
                {EXPECTED_HEADINGS.map((heading) => (
                  <li
                    key={heading}
                    className="flex items-start gap-[8px] text-[14px] leading-[1.6] text-slate-600"
                  >
                    <Icon
                      name="check-one"
                      className="mt-[3px] flex-none text-[14px] text-[#0e8b73]"
                    />
                    {heading}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] leading-[1.7] text-slate-500">
                Questions about privacy in the meantime:{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  {contactEmail}
                </a>
              </p>
            </Reveal>
          )}
        </div>
      </Block>
    </PageShell>
  );
}
