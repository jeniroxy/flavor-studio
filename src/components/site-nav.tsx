"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui";
import { menus, plainLinks, type Menu } from "@/lib/nav";
import { loginUrl, routes, type NavKey } from "@/lib/routes";

/*
 * SiteNav v3, from the design at node 40000315:34236:
 *
 * - a 60px white bar, no announcement strip above it;
 * - the logo left, four uppercase links centred, "Login" and a lime pill right;
 * - a full-screen sheet on mobile with accordion groups and a pinned Login.
 *
 * Three of the four links go straight to a page. RESOURCES keeps the curtain,
 * because there is no /resources page to send it to — the design draws it flat
 * like the others, and flat is how it looks until someone hovers it.
 *
 * Login and Sign up go to the app subdomain — the marketing site never
 * renders a sign-in form of its own.
 */

/** The three links that have a page of their own. */
const LINKS: { label: string; href: string; key: NavKey }[] = [
  { label: "Features", href: routes.features, key: "product" },
  { label: "AI Agent", href: routes.agent, key: "agent" },
  { label: "Pricing", href: routes.pricing, key: "pricing" },
];

const MOBILE_BREAKPOINT = "(max-width: 960px)";

export function SiteNav({ active = "" }: { active?: NavKey }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [open, setOpen] = useState<Menu["key"] | null>(null);
  const [sheet, setSheet] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const sync = () => {
      setIsDesktop(!mq.matches);
      if (!mq.matches) setSheet(false);
      else setOpen(null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The sheet locks page scroll; the curtain does not.
  useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSheet(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }, [cancelClose]);

  const current = menus.find((m) => m.key === open) ?? null;
  const resourcesMenu = menus.find((m) => m.key === "resources") ?? null;

  /* The design gives the links no pill and no background, so state is carried
     by colour alone. */
  const navLinkClass = (key: NavKey) =>
    `text-[14px] font-semibold uppercase transition-colors ${
      open === key || active === key
        ? "text-ink"
        : "text-[#324561] hover:text-ink"
    }`;

  return (
    <>
      <header
        className="sticky top-0 z-[100]"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        <div ref={barRef} className="relative border-b border-hairline bg-white">
          {/* Logo left, links centred, Login and the pill right, on the same
              1170 line as every section below. */}
          <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--container)] items-center justify-between gap-4 px-5 sm:px-6">
            <Link
              href={routes.home}
              className="flex shrink-0 items-center"
              aria-label="Flavor Studio"
            >
              <Image
                src="/assets/logo-dark-text.svg"
                alt="Flavor Studio"
                width={208}
                height={40}
                priority
                className="h-8 w-auto sm:h-10"
              />
            </Link>

            {isDesktop && (
              <nav
                className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[26px]"
                aria-label="Primary"
              >
                {LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={navLinkClass(link.key)}
                    onMouseEnter={scheduleClose}
                  >
                    {link.label}
                  </Link>
                ))}
                {resourcesMenu && (
                  <button
                    type="button"
                    className={navLinkClass("resources")}
                    aria-expanded={open === "resources"}
                    aria-haspopup="true"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen("resources");
                    }}
                    onFocus={() => setOpen("resources")}
                    onClick={() =>
                      setOpen((o) => (o === "resources" ? null : "resources"))
                    }
                  >
                    {resourcesMenu.label}
                  </button>
                )}
              </nav>
            )}

            {/* Under 390px the pill hides: logo, pill and menu button do not fit
                on one line there, and the sheet carries "Get a demo". */}
            <div className="flex items-center gap-3 sm:gap-[18px]">
              {isDesktop && (
                <a
                  href={loginUrl}
                  className="text-[14px] font-semibold text-[#324561] transition-colors hover:text-ink"
                >
                  Login
                </a>
              )}
              <Link
                href={routes.demo}
                className="font-display hidden items-center rounded-full bg-[var(--color-lime-600)] px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap text-[#16223a] transition-colors hover:bg-[var(--color-lime-500)] min-[390px]:inline-flex sm:px-5 sm:text-[14px]"
              >
                Request a demo
              </Link>
              {!isDesktop && (
                <button
                  type="button"
                  onClick={() => setSheet((s) => !s)}
                  aria-label={sheet ? "Close menu" : "Open menu"}
                  aria-expanded={sheet}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-panel-2 text-[20px] text-ink"
                >
                  <Icon name={sheet ? "close" : "hamburger-button"} />
                </button>
              )}
            </div>
          </div>

          {/* Curtain */}
          {isDesktop && current && (
            <div
              className="absolute inset-x-0 top-full bg-white shadow-menu"
              style={{ animation: "fsCurtainDown .25s var(--ease-standard)" }}
              onMouseEnter={cancelClose}
            >
              <div className="container-wide py-8">
                <Curtain menu={current} onNavigate={() => setOpen(null)} />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sheet */}
      {!isDesktop && sheet && (
        <div className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-[99] flex flex-col bg-white">
          <nav className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
            {menus.map((menu) => (
              <MobileGroup
                key={menu.key}
                menu={menu}
                onNavigate={() => setSheet(false)}
              />
            ))}
            {plainLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setSheet(false)}
                className="font-display block border-b border-hairline py-4 text-[26px] font-bold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={routes.demo}
              onClick={() => setSheet(false)}
              className="font-display block py-4 text-[26px] font-bold text-ink"
            >
              Get a demo
            </Link>
          </nav>
          <div className="border-t border-hairline p-4">
            <a href={loginUrl} className="btn btn-secondary w-full">
              Login
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Curtain({ menu, onNavigate }: { menu: Menu; onNavigate: () => void }) {
  const cols = menu.columns.length + (menu.card ? 1 : 0);
  return (
    <div
      className="grid gap-x-8 gap-y-8"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {menu.columns.map((col, i) => (
        <div
          key={col.heading}
          style={{
            animation: `fsColumnFade .3s var(--ease-out) ${i * 0.05}s backwards`,
          }}
        >
          <div className="eyebrow eyebrow-muted mb-4">{col.heading}</div>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {col.items.map((item) =>
              menu.style === "tile" ? (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex items-start gap-3 rounded-[10px] px-2 py-2 transition-colors hover:bg-panel"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ink text-[20px] text-white">
                      <Icon name={item.icon ?? "star"} />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                        {item.label}
                        {item.badge ? <Badge>{item.badge}</Badge> : null}
                      </span>
                      {item.desc ? (
                        <span className="mt-0.5 block text-[13px] text-ink-2">
                          {item.desc}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex h-8 items-center gap-2.5 rounded-[6px] px-2 text-[15px] text-[#292d34] transition-colors hover:bg-panel hover:text-ink"
                  >
                    {item.icon ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-blue-600 text-[13px] text-white">
                        <Icon name={item.icon} />
                      </span>
                    ) : null}
                    {item.label}
                    {item.badge ? <Badge>{item.badge}</Badge> : null}
                  </Link>
                </li>
              ),
            )}
          </ul>
          {col.more ? (
            <Link
              href={col.more.href}
              onClick={onNavigate}
              className="mt-3 inline-flex items-center gap-1 px-2 text-[14px] font-semibold text-blue-700 hover:text-blue-600"
            >
              {col.more.label}
              <Icon name="arrow-right" className="text-[14px]" />
            </Link>
          ) : null}
        </div>
      ))}
      {menu.card ? (
        <div
          className="panel flex flex-col p-5"
          style={{
            animation: `fsColumnFade .3s var(--ease-out) ${menu.columns.length * 0.05}s backwards`,
          }}
        >
          <div className="eyebrow eyebrow-muted">{menu.card.heading}</div>
          {menu.card.image ? (
            <Image
              src={menu.card.image}
              alt=""
              width={160}
              height={21}
              className="mt-4 h-5 w-auto"
            />
          ) : null}
          <div className="font-display mt-3 text-[16px] leading-[1.35] font-bold text-ink">
            {menu.card.title}
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-ink-2">
            {menu.card.body}
          </p>
          <Link
            href={menu.card.cta.href}
            onClick={onNavigate}
            className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-blue-700"
          >
            {menu.card.cta.label}
            <Icon name="arrow-right" className="text-[14px]" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MobileGroup({
  menu,
  onNavigate,
}: {
  menu: Menu;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="font-display flex w-full items-center justify-between py-4 text-left text-[26px] font-bold text-ink"
      >
        {menu.label}
        <Icon
          name="right"
          className={`text-[20px] transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 pb-5 sm:grid-cols-2">
            {menu.columns.map((col) => (
              <div key={col.heading}>
                <div className="eyebrow eyebrow-muted mb-2">{col.heading}</div>
                {col.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className="block py-2 text-[16px] text-[#292d34]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
