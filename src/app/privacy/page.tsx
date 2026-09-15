import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  CheckList,
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/ui";
import { contactEmail } from "@/lib/routes";

/*
 * Privacy Policy.
 *
 * A privacy policy is a legal document: its authoritative text exists on the
 * current flavorstudio.com and must be ported verbatim (or re-issued by
 * counsel), not paraphrased by a redesign. This page carries the prose
 * template and a clearly marked pending state; drop the canonical sections
 * into POLICY_SECTIONS and the notice disappears.
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
    <PageShell active="resources" fill>
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,48px)]">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <Eyebrow className="mb-4">Legal</Eyebrow>
            </Reveal>
            <Headline as="h1" size="lg" tail="Policy">
              Privacy
            </Headline>
            <Lede className="mt-4">
              How Senspire Co collects, uses and protects your information
              across Flavor Studio and this website.
            </Lede>
          </div>
        </Container>
      </Section>

      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container>
          <div className="mx-auto max-w-[720px]">
            {POLICY_SECTIONS.length > 0 ? (
              <div className="flex flex-col gap-10">
                {POLICY_SECTIONS.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em] text-ink">
                      {section.heading}
                    </h2>
                    <div className="mt-3 flex flex-col gap-3">
                      {section.paragraphs.map((para, i) => (
                        <p
                          key={i}
                          className="text-[15px] leading-[1.75] text-ink-2"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <Reveal className="rounded-[var(--radius-lg)] border border-dashed border-panel-3 bg-panel px-[clamp(24px,3vw,40px)] py-[clamp(28px,3.4vw,44px)]">
                <Eyebrow tone="muted" className="text-[11px]">
                  Awaiting canonical text
                </Eyebrow>
                <p className="mt-4 text-[15px] leading-[1.75] text-ink-2">
                  The authoritative Privacy Policy is the one published on the
                  current flavorstudio.com, and it will be carried over verbatim
                  — a legal document is ported, not paraphrased by a redesign.
                  Until that text is dropped in, this page intentionally shows
                  this notice rather than placeholder legal language.
                </p>
                <p className="mt-3 text-[15px] leading-[1.75] text-ink-2">
                  Sections the ported policy is expected to cover:
                </p>
                <CheckList
                  items={EXPECTED_HEADINGS}
                  className="mt-4 sm:grid sm:grid-cols-2 sm:gap-x-6"
                />
                <p className="mt-6 text-[14px] leading-[1.7] text-ink-2">
                  Questions about privacy in the meantime:{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-ink"
                  >
                    {contactEmail}
                  </a>
                </p>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
