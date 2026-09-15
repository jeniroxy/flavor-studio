import Image from "next/image";
import Link from "next/link";
import { Icon, LinkedInIcon } from "@/components/icon";
import { securityMarks } from "@/components/ui";
import { modules } from "@/lib/modules";
import {
  contactEmail,
  linkedin,
  phone,
  phoneHref,
  routes,
  supportEmail,
} from "@/lib/routes";

/*
 * The v2 footer, on clickup.com's plan: logo top-left, five link columns on
 * the page grid, a social row with the security marks opposite, then a
 * hairline and the legal line. White ground — the dark footer band is gone.
 */

const columns: {
  title: string;
  href?: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "AI Agent",
    href: routes.agent,
    links: [
      { label: "Overview", href: routes.agent },
      { label: "Side-by-side compare", href: `${routes.agent}#compare` },
      { label: "Skills", href: `${routes.agent}#skills` },
      { label: "Trust & data", href: `${routes.agent}#trust` },
    ],
  },
  {
    title: "Product",
    href: routes.features,
    links: [
      ...modules
        .filter((m) =>
          [
            "recipes",
            "ingredients",
            "costing",
            "labeling",
            "claims",
            "designer",
            "taste-tests",
            "projects",
            "timesheet",
            "crm",
          ].includes(m.id),
        )
        .map((m) => ({ label: m.label, href: routes.feature(m.id) })),
      { label: "All features", href: routes.features },
      { label: "Integrations & API", href: routes.developers },
    ],
  },
  {
    title: "Solutions",
    href: routes.solutions,
    links: [
      { label: "R&D and formulation", href: routes.solution("rd") },
      { label: "Regulatory and labeling", href: routes.solution("regulatory") },
      { label: "Costing and procurement", href: routes.solution("costing") },
      { label: "Sales and account teams", href: routes.solution("sales") },
      { label: "CPG manufacturers", href: routes.solution("cpg") },
      { label: "Ingredient suppliers", href: routes.solution("suppliers") },
      { label: "Restaurant chains", href: routes.solution("restaurants") },
      { label: "Food science programs", href: routes.solution("education") },
      { label: "Enterprise", href: routes.enterprise },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: routes.customers },
      { label: "Success stories", href: routes.stories },
      { label: "News", href: routes.news },
      { label: "Pricing", href: routes.pricing },
      { label: "Contact us", href: routes.contact },
      { label: "Privacy", href: routes.privacy },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Request a demo", href: routes.demo },
      { label: "FAQ", href: routes.faq },
      { label: "Developers", href: routes.developers },
      { label: supportEmail, href: `mailto:${supportEmail}` },
      { label: contactEmail, href: `mailto:${contactEmail}` },
      { label: phone, href: phoneHref },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-white pt-[clamp(40px,5vw,64px)] pb-8">
      <div className="container-wide">
        <Image
          src="/assets/logo-dark-text.svg"
          alt="Flavor Studio"
          width={196}
          height={38}
          className="h-9 w-auto"
        />

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              {col.href ? (
                <Link
                  href={col.href}
                  className="text-[16px] font-semibold text-ink hover:text-blue-700"
                >
                  {col.title}
                </Link>
              ) : (
                <div className="text-[16px] font-semibold text-ink">
                  {col.title}
                </div>
              )}
              <ul className="mt-4 flex list-none flex-col gap-[10px] p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ||
                    link.href.startsWith("tel:") ? (
                      <a
                        href={link.href}
                        className="text-[15px] text-[#292d34] transition-colors hover:text-blue-700"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[15px] text-[#292d34] transition-colors hover:text-blue-700"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Flavor Studio on LinkedIn"
              className="text-ink-3 transition-colors hover:text-ink"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              aria-label="Email Flavor Studio"
              className="text-[20px] text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="mail" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {securityMarks.map((m) => (
              <span key={m.label} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-[14px] text-ink">
                  <Icon name={m.icon} />
                </span>
                <span className="eyebrow eyebrow-muted text-[10px]">
                  {m.desc}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-[13px] text-ink-2">
          <div>© {new Date().getFullYear()} Senspire LLC · Flavor Studio</div>
          <div className="flex flex-wrap gap-5">
            <Link href={routes.privacy} className="hover:text-ink">
              Privacy
            </Link>
            <Link href={routes.faq} className="hover:text-ink">
              FAQ
            </Link>
            <Link href={routes.contact} className="hover:text-ink">
              Contact
            </Link>
            <a href={`mailto:${supportEmail}`} className="hover:text-ink">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
