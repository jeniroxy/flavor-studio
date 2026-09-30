import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { StickyRail } from "@/components/sticky-rail";
import { Container, Eyebrow, Headline, Section } from "@/components/ui";

/*
 * Privacy Policy, verbatim from flavorstudio.com/privacy (ported
 * 2026-10-01). A legal document is carried over, not paraphrased: headings,
 * wording, capitalisation and the "last updated" date are the published
 * policy's. The only additions are layout: a sticky list of the sections and
 * the run-in "The Website." / "The Services." set as labels. The e-mail and
 * postal address are the policy's own, which is why they are not taken from
 * routes.ts.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Senspire Co collects, uses and protects your information.",
};

type Item = { lead?: string; text: string };
type PolicySection = { heading: string; items: Item[] };

const INTRO =
  'Senspire Co ("Senspire") is committed to following all applicable privacy laws and regulations and keeping you informed of what information it collects or otherwise receives about you when you visit www.flavorstudio.com (the "Website") or when you use the Flavor Studio application (the "Services"), and how Senspire uses such information. The following Privacy Policy is part of that commitment.';

const POLICY: PolicySection[] = [
  {
    heading: "PERSONALLY IDENTIFIABLE INFORMATION",
    items: [
      {
        lead: "The Website.",
        text: "No personally identifiable information (such as names, e-mail addresses, telephone numbers, etc.) is automatically collected from visitors to the Website. In the event Senspire requests any such information from you, it will only be collected if you provide it on a voluntary basis, and Senspire will alert you in advance of the use to which such information will be put and to whom it may be provided. For example, Senspire may ask for your name and e-mail address in order to send you communications of interest about Senspire. In such a case, Senspire will use your name and e-mail address only for this purpose, and will not share it with any third party, except that Senspire may disclose personally identifiable information in order to comply with a court order or subpoena, a request from a law enforcement agency to release information, or to otherwise comply with other legal or governmental requirements.",
      },
      {
        lead: "The Services.",
        text: 'In order to request additional information about the Services or to register to use the Services, Senspire requests that you provide your contact information, such as name, company name, address, phone number, and email address ("Contact Information"). In addition, Senspire may ask you to provide information about your company, number of employees, or industry ("Firmographic Information"). For security purposes, you may also be asked to create user names and/or passwords ("Passwords") in order for you or your company\'s personnel to use the Services. In your use of the Services, you may upload your proprietary data and/or content to the Services ("Content"). Contact Information, Firmographic Information, Passwords and Content are, collectively, "Company Information." Senspire will not use Company Information other than in connection with operating and supporting your use of the Service, and facilitating your continued paid use of the Services through a further agreement with Senspire. Senspire will not share your Company Information with any third party, except that Senspire may disclose personally identifiable information in order to comply with a court order or subpoena, a request from a law enforcement agency to release information, or to otherwise comply with other legal or governmental requirements.',
      },
    ],
  },
  {
    heading: "NON-PERSONALLY IDENTIFIABLE INFORMATION",
    items: [
      {
        lead: "The Website.",
        text: "Certain non-personal information (such as the domain name of the visitor's Internet service provider) is collected in the normal operation of Senspire's Internet servers. In addition, when you visit the Website, Senspire may also collect information through the use of commonly-used information-gathering tools, such as cookies and Web beacons. This information includes standard information from your Web browser (such as browser type and browser language), your Internet Protocol address, and what you do when you visit the Website (such as the pages viewed and the links clicked). This information is primarily used for internal purposes, and only in non-personally identifiable form. However, Senspire may from time to time provide this information in aggregated, non-personally identifiable form to other parties for marketing, advertising or other use.",
      },
    ],
  },
  {
    heading: "THIRD PARTY WEBSITES",
    items: [
      {
        text: "The Website and the Services may contain links to other websites which enable you to visit other sites through your Internet browser. Senspire is not responsible for the privacy practices or the content of any such other websites. Before interacting with any other website, you should be sure you are comfortable with its privacy practices.",
      },
    ],
  },
  {
    heading: "COPPA COMPLIANCE",
    items: [
      {
        text: "Activities on this Website and the Services are carried out in compliance with the Federal Children's Online Privacy Protection Act. In accordance with the requirements of that Act, no personal information (including name, mailing address, telephone number and email address) will be collected from any visitor under the age of 13 without first obtaining verifiable consent from the parent or legal guardian of such child. Accordingly, no information should be submitted to or posted at this site by visitors under the age of 13 without the consent of their parent or legal guardian. Parents or legal guardians may consent to the provision of personal information from their children under the age of 13, request to review information collected from their children under the age of 13, may ask to have that information deleted, and may refuse to allow further collection or use of any child's information. In order to take any such actions, parents or legal guardians should contact Senspire as specified below under \"Contact Us\".",
      },
    ],
  },
  {
    heading: "ACCEPTANCE OF PRIVACY POLICY",
    items: [
      {
        text: "By using this Website or the Services, you signify your assent to this Privacy Policy. If you do not agree to the terms of this policy, please do not use the Website or the Services. Senspire reserves the right, at its discretion, to change, modify, add, or remove portions of this Privacy Policy at any time. Please check this page periodically for changes. Your continued use of this Website and the Services following the posting of changes to these terms will mean that you accept those changes.",
      },
    ],
  },
  {
    heading: "CONTACT US",
    items: [
      {
        text: "If you would like to correct information you have provided us, unsubscribe from communications, terminate use of the Service or otherwise have any questions about this Privacy Policy, you may email us at any time at privacy@senspirellc.com or write to Privacy Policy, Senspire Co, 1547 Palos Verdes Suite 221, Walnut Creek, CA 94597.",
      },
    ],
  },
];

const UPDATED = "This Privacy Policy was last updated on September 4, 2015.";

const PRIVACY_EMAIL = "privacy@senspirellc.com";

const idOf = (h: string) =>
  h
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* The address in the Contact Us section, linked. */
function withMail(text: string) {
  const i = text.indexOf(PRIVACY_EMAIL);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a
        href={`mailto:${PRIVACY_EMAIL}`}
        className="font-semibold text-blue-700 underline underline-offset-4"
      >
        {PRIVACY_EMAIL}
      </a>
      {text.slice(i + PRIVACY_EMAIL.length)}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <PageShell active="resources" fill>
      <Section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <Reveal>
                <Eyebrow className="mb-4">Legal</Eyebrow>
              </Reveal>
              <Headline as="h1" size="hero" tail="Policy">
                Privacy
              </Headline>
            </div>
            <Reveal
              delay={0.08}
              className="rounded-[var(--radius-xl)] p-[clamp(20px,3vw,32px)] text-white"
              style={{
                backgroundImage:
                  "linear-gradient(150deg, #17467f 0%, #2060a6 40%, #0f6e5e 100%)",
              }}
            >
              <p className="m-0 text-[16px] leading-[1.7]">{INTRO}</p>
              <p className="mt-4 mb-0 font-mono text-[12px] tracking-[.06em] text-white/90 uppercase">
                {UPDATED}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="pb-[clamp(64px,8vw,120px)]">
        <Container>
          <StickyRail
            items={POLICY.map((s) => ({
              id: idOf(s.heading),
              label: s.heading,
            }))}
          >
            <div className="flex flex-col gap-[clamp(32px,4vw,48px)]">
              {POLICY.map((section, n) => (
                <section
                  key={section.heading}
                  id={idOf(section.heading)}
                  className="scroll-mt-[120px] border-t border-hairline pt-[clamp(24px,3vw,36px)]"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-[clamp(28px,3vw,40px)] leading-none font-bold tracking-[-0.04em] text-[#c9d9ea]"
                    >
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <h2 className="m-0 font-mono text-[13px] tracking-[.08em] text-blue-700">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="mt-5 flex flex-col gap-5">
                    {section.items.map((item, i) => (
                      <div key={i}>
                        {item.lead ? (
                          <h3 className="font-display m-0 text-[18px] font-bold text-ink">
                            {item.lead}
                          </h3>
                        ) : null}
                        <p
                          className={`max-w-[70ch] text-[16px] leading-[1.75] text-ink-2 ${item.lead ? "mt-2" : ""}`}
                        >
                          {withMail(item.text)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </StickyRail>
        </Container>
      </Section>
    </PageShell>
  );
}
