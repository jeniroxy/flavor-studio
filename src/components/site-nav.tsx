"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUrl, routes, type NavKey } from "@/lib/routes";

/*
 * SiteNav v3 — light glass bar, links centred, logo left, Login + lime CTA
 * right. Sticky is applied here rather than on a wrapper: in the prototype the
 * header stuck to a 64px-tall mount and only travelled that far.
 *
 * Login is a plain <a> to the app subdomain, not a Link: authentication lives
 * on app.flavorstudio.com because the session cookie is scoped there, so this
 * site never renders a sign-in form of its own.
 *
 * News and FAQ stay out of the desktop row to keep it uncrowded, but both are
 * in the mobile menu and the footer, which is why the two lists differ.
 */

const DESKTOP_LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "features", label: "Features", href: routes.features },
  { key: "agent", label: "AI Agent", href: routes.agent },
  { key: "developers", label: "Developers", href: routes.developers },
  { key: "pricing", label: "Pricing", href: routes.pricing },
];

const MOBILE_LINKS: { key: NavKey; label: string; href: string }[] = [
  ...DESKTOP_LINKS,
  { key: "news", label: "News", href: routes.news },
  { key: "faq", label: "FAQ", href: routes.faq },
];

const MOBILE_BREAKPOINT = "(max-width: 960px)";

export function SiteNav({ active = "" }: { active?: NavKey }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const sync = () => {
      setIsDesktop(!mq.matches);
      // Resizing back to desktop must not leave an orphaned open menu.
      if (!mq.matches) setMenuOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const linkColor = (key: NavKey) =>
    active === key ? "text-blue-600" : "text-slate-800";

  return (
    <header className="sticky top-0 z-90 bg-[rgba(238,239,244,.86)] backdrop-blur-[16px] backdrop-saturate-150">
      <div className="relative mx-auto flex h-[var(--nav-height)] max-w-[1180px] items-center gap-[28px] px-6">
        <Link href={routes.home} className="flex items-center gap-[10px]">
          <Image
            src="/assets/logo-dark-text.svg"
            alt="Flavor Studio"
            width={196}
            height={38}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {isDesktop && (
          <nav className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[26px]">
            {DESKTOP_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-[12px] font-bold tracking-[.08em] whitespace-nowrap uppercase transition-colors hover:text-blue-600 ${linkColor(link.key)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-[18px]">
          {isDesktop && (
            <a
              href={loginUrl}
              className="text-[13px] font-bold whitespace-nowrap text-slate-800 transition-colors hover:text-blue-600"
            >
              Login
            </a>
          )}
          <Link
            href={routes.demo}
            className="rounded-[12px] bg-[#7fd234] px-[20px] py-[10px] text-[13px] font-extrabold whitespace-nowrap text-[#16223a] shadow-lime transition-[background] duration-[180ms] hover:bg-[#8ede40]"
          >
            Request a demo
          </Link>
          {!isDesktop && (
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-[38px] w-[38px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg"
            >
              <span
                className="block h-0.5 w-5 rounded-sm bg-slate-700 transition-transform duration-[220ms]"
                style={{
                  transform: menuOpen
                    ? "translateY(6px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-sm bg-slate-700 transition-opacity duration-[160ms]"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 rounded-sm bg-slate-700 transition-transform duration-[220ms]"
                style={{
                  transform: menuOpen
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          )}
        </div>
      </div>

      {!isDesktop && menuOpen && (
        /* Matches the light bar it drops out of. This panel was near-black
           navy left over from the earlier dark nav, with dark-on-dark dividers
           at 7% opacity and a light-mode blue on the active link. */
        <div className="border-t border-gray-300 bg-[rgba(238,239,244,.98)] backdrop-blur-[16px]">
          <nav className="flex flex-col px-6 pt-2 pb-[18px]">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`min-h-[44px] border-b border-gray-300 py-[13px] text-[14px] font-semibold tracking-[.04em] uppercase ${
                  active === link.key ? "text-blue-600" : "text-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={loginUrl}
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] py-[13px] text-[14px] font-semibold tracking-[.04em] text-slate-600 uppercase"
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
