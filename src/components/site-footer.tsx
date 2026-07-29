import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealStagger } from "@/components/reveal";
import { contactEmail, phone, phoneHref, routes } from "@/lib/routes";

/*
 * SiteFooter v3 — full-width dark band. The user reverted an experimental
 * Corsearch-style restyle back to the original content and design-system
 * colours, keeping only the layout change: four groups spread evenly across
 * the footer rather than stacked to the right.
 *
 * `labelingHref` differs by page: the landing page has a #labels section to
 * jump to, subpages route to the Features nutrition anchor instead.
 */

const productLinks = (labelingHref: string) => [
  { label: "Recipes", href: routes.features },
  { label: "AI Agent", href: routes.agent },
  { label: "Labeling", href: labelingHref },
  { label: "Pricing", href: routes.pricing },
];

const companyLinks = [
  { label: "Customers", href: routes.customers },
  { label: "Success stories", href: routes.stories },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

const linkClass =
  "text-[13.5px] text-slate-300 transition-colors hover:text-white";
const headingClass =
  "text-[11px] font-bold tracking-[.12em] uppercase text-slate-500";

export function SiteFooter({
  labelingHref = `${routes.features}#nutrition`,
}: {
  labelingHref?: string;
}) {
  return (
    <footer className="bg-slate-900 px-[clamp(24px,3vw,48px)] pt-[clamp(36px,4vw,56px)] pb-[clamp(24px,2.4vw,34px)]">
      <div className="mx-auto max-w-[1180px]">
        <RevealStagger
          stagger={0.09}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] items-start gap-x-[clamp(20px,2.4vw,36px)] gap-y-[clamp(24px,3vw,40px)]"
        >
          <div className="flex flex-col items-start gap-[10px]">
            <div className={headingClass}>Product</div>
            {productLinks(labelingHref).map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-[10px]">
            <div className={headingClass}>Company</div>
            {companyLinks.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-[10px]">
            <div className={headingClass}>Get in touch</div>
            <a href={`mailto:${contactEmail}`} className={linkClass}>
              {contactEmail}
            </a>
            <a href={phoneHref} className={linkClass}>
              {phone}
            </a>
          </div>

          <div className="flex flex-col items-start gap-[10px]">
            <div className={headingClass}>Office</div>
            <div className="text-[13px] leading-[1.6] text-slate-400">
              1547 Palos Verdes, Suite 221
              <br />
              Walnut Creek, CA 94597
            </div>
          </div>
        </RevealStagger>

        <Reveal className="mt-[clamp(26px,3vw,40px)] flex flex-wrap items-center gap-4 border-t border-white/[.08] pt-[clamp(18px,2vw,24px)] text-[12.5px] text-slate-500">
          <Link href={routes.home} className="flex items-center">
            <Image
              src="/assets/logo-light-text.svg"
              alt="Flavor Studio"
              width={196}
              height={38}
              className="h-[26px] w-auto"
            />
          </Link>
          <span>
            © {new Date().getFullYear()} Senspire Co. All rights reserved. A
            Senspire solution.
          </span>
          <span className="ml-auto">Privacy · Terms · Support</span>
        </Reveal>
      </div>
    </footer>
  );
}
