"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui";
import { menus, plainLinks, type Menu } from "@/lib/nav";
import { loginUrl, routes, signupUrl, type NavKey } from "@/lib/routes";

/*
 * The v2 chrome, modelled on clickup.com:
 *
 * - a 40px announcement bar that scrolls away (hidden on mobile);
 * - a 60px sticky frosted bar — logo, four menu triggers, two plain links,
 *   "Get a demo" / "Login" / "Sign up";
 * - a full-width white "curtain" under the bar for the open menu, columns
 *   fading in with a small stagger;
 * - a full-screen sheet on mobile with accordion groups and a pinned Login.
 *
 * Login and Sign up go to the app subdomain — the marketing site never
 * renders a sign-in form of its own.
 */

const ANNOUNCEMENT = {
  lead: "NEW:",
  text: "The AI Agent now compares recipe versions side by side, with citations.",
  href: `${routes.agent}#compare`,
};

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

  const triggerClass = (key: NavKey) =>
    `flex items-center gap-1 rounded-[8px] px-3 py-1.5 text-[15px] transition-colors ${
      open === key || active === key
        ? "bg-panel-2 text-ink"
        : "text-[#292d34] hover:bg-panel-2"
    }`;

  return (
    <>
      {/* Announcement bar */}
      {isDesktop && (
        <Link
          href={ANNOUNCEMENT.href}
          className="flex h-[var(--announce-height)] items-center justify-center gap-1 bg-panel px-4 text-[14px] text-ink transition-colors hover:bg-panel-2"
        >
          <span className="font-semibold">{ANNOUNCEMENT.lead}</span>
          <span>{ANNOUNCEMENT.text}</span>
          <Icon name="right" className="text-[14px]" />
        </Link>
      )}

      <header
        className="sticky top-0 z-[100]"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        <div
          ref={barRef}
          className="relative bg-white/90 backdrop-blur-[6px]"
        >
          <div className="container-wide flex h-[var(--nav-height)] items-center gap-2">
            <Link
              href={routes.home}
              className="mr-4 flex shrink-0 items-center"
              aria-label="Flavor Studio"
            >
              <Image
                src="/assets/logo-dark-text.svg"
                alt="Flavor Studio"
                width={196}
                height={38}
                priority
                className="h-9 w-auto"
              />
            </Link>

            {isDesktop && (
              <nav className="flex items-center gap-1" aria-label="Primary">
                {menus.map((menu) => (
                  <button
                    key={menu.key}
                    type="button"
                    className={triggerClass(menu.key)}
                    aria-expanded={open === menu.key}
                    aria-haspopup="true"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(menu.key);
                    }}
                    onFocus={() => setOpen(menu.key)}
                    onClick={() =>
                      setOpen((o) => (o === menu.key ? null : menu.key))
                    }
                  >
                    {menu.label}
                    <Icon
                      name="down"
                      className={`text-[14px] transition-transform ${open === menu.key ? "rotate-180" : ""}`}
                    />
                  </button>
                ))}
                {plainLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={triggerClass(link.key)}
                    onMouseEnter={scheduleClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            <div className="ml-auto flex items-center gap-2">
              {isDesktop && (
                <>
                  <Link href={routes.demo} className="btn btn-tertiary btn-sm">
                    Get a demo
                  </Link>
                  <a href={loginUrl} className="btn btn-secondary btn-sm">
                    Login
                  </a>
                </>
              )}
              <a href={signupUrl} className="btn btn-primary btn-sm">
                Sign up
              </a>
              {!isDesktop && (
                <button
                  type="button"
                  onClick={() => setSheet((s) => !s)}
                  aria-label={sheet ? "Close menu" : "Open menu"}
                  aria-expanded={sheet}
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-[8px] bg-panel-2 text-[20px] text-ink"
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
              <MobileGroup key={menu.key} menu={menu} onNavigate={() => setSheet(false)} />
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
          <p className="mt-2 text-[13px] leading-[1.5] text-ink-2">{menu.card.body}</p>
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

function MobileGroup({ menu, onNavigate }: { menu: Menu; onNavigate: () => void }) {
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
