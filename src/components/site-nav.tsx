"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes, type NavKey } from "@/lib/routes";

/*
 * SiteNav v3 — light glass bar, links centred, logo left, Login + lime CTA
 * right. Sticky is applied here rather than on a wrapper: in the prototype the
 * header stuck to a 64px-tall mount and only travelled that far.
 *
 * FAQ was removed from the desktop row on request but kept in the mobile menu,
 * which is why the two link lists differ.
 */

const DESKTOP_LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "features", label: "Features", href: routes.features },
  { key: "agent", label: "AI Agent", href: routes.agent },
  { key: "pricing", label: "Pricing", href: routes.pricing },
];

const MOBILE_LINKS: { key: NavKey; label: string; href: string }[] = [
  ...DESKTOP_LINKS,
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
      <div className="relative mx-auto flex h-[60px] max-w-[1180px] items-center gap-[28px] px-6">
        <Link href={routes.home} className="flex items-center gap-[10px]">
          <Image
            src="/assets/logo-dark-text.svg"
            alt="Flavor Studio"
            width={196}
            height={38}
            priority
            className="h-8 w-auto"
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
            <Link
              href={routes.login}
              className="text-[13px] font-bold whitespace-nowrap text-slate-800 transition-colors hover:text-blue-600"
            >
              Login
            </Link>
          )}
          <Link
            href={routes.contact}
            className="rounded-[12px] bg-[#7fd234] px-[20px] py-[10px] text-[13px] font-extrabold whitespace-nowrap text-[#16223a] shadow-[0_8px_20px_rgba(127,210,52,.32)] transition-[background,transform] duration-[180ms] hover:-translate-y-px hover:bg-[#8ede40]"
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
        <div className="border-t border-white/10 bg-[rgba(22,34,58,.98)] backdrop-blur-[16px]">
          <nav className="flex flex-col px-6 pt-2 pb-[18px]">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[rgba(43,59,83,.07)] py-[13px] text-[14px] font-semibold tracking-[.04em] uppercase ${
                  active === link.key ? "text-blue-600" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={routes.login}
              onClick={() => setMenuOpen(false)}
              className="py-[13px] text-[14px] font-semibold tracking-[.04em] text-slate-300 uppercase"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
