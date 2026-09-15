import type { Metadata } from "next";
import { ContactSplit } from "@/components/contact/contact-split";
import { LinkedInIcon, Icon } from "@/components/icon";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { Container, Section } from "@/components/ui";
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
    "Get in touch with the Flavor Studio team by form, email, phone or LinkedIn.",
};

const DIRECT = [
  {
    icon: "mail",
    label: "Info",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    icon: "headset-one",
    label: "Technical support",
    value: supportEmail,
    href: `mailto:${supportEmail}`,
  },
  { icon: "phone-telephone", label: "Phone", value: phone, href: phoneHref },
];

export default function ContactPage() {
  return (
    <PageShell active="resources" fill>
      <ContactSplit intent="contact" />

      {/* Reach us directly — the addresses the old contact page carried. */}
      <Section className="border-t border-hairline py-[clamp(40px,5vw,64px)]">
        <Container wide>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DIRECT.map((d) => (
              <a
                key={d.label}
                href={d.href}
                className="card flex items-center gap-3 p-4"
              >
                <Icon name={d.icon} className="text-[20px] text-blue-700" />
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold tracking-[.06em] text-ink-3 uppercase">
                    {d.label}
                  </span>
                  <span className="block truncate text-[14px] font-medium text-ink">
                    {d.value}
                  </span>
                </span>
              </a>
            ))}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-3 p-4"
            >
              <LinkedInIcon className="text-[18px] text-blue-700" />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold tracking-[.06em] text-ink-3 uppercase">
                  LinkedIn
                </span>
                <span className="block truncate text-[14px] font-medium text-ink">
                  linkedin.com/company/senspire
                </span>
              </span>
            </a>
            <div className="card flex items-center gap-3 p-4">
              <Icon name="local-two" className="text-[20px] text-blue-700" />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold tracking-[.06em] text-ink-3 uppercase">
                  Office
                </span>
                <span className="block text-[13px] leading-[1.35] font-medium text-ink">
                  Senspire Co, 1547 Palos Verdes Suite 221, Walnut Creek, CA
                  94597
                </span>
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
