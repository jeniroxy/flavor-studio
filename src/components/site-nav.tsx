"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { STARTERS } from "@/components/agent/agent-data";
import { Icon } from "@/components/icon";
import { moduleGroups, modules, type Module } from "@/lib/modules";
import { loginUrl, routes, type NavKey } from "@/lib/routes";

/*
 * The site chrome.
 *
 * Bar: logo, four links in a soft track with a white pill that slides to the
 * link under the pointer (and rests on the current section), Login and the
 * lime pill. A 2px ramp in the brand's hues (navy, sky, teal, lime) runs
 * along its bottom edge; it is the one decorative line on the bar.
 *
 * Panels, one per menu, dropping as a single rounded card:
 *
 * - Features: the six module groups on the left, the modules of the group in
 *   the middle, and on the right the real screen of whichever module the
 *   pointer is on, with that module's own headline. The preview is the
 *   point: every hover shows the product, which is what makes a visitor
 *   want the next click.
 * - AI Agent: the Agent's overview, and the three starters the panel ships
 *   with, each linking to its answer on the AI Agent page.
 * - Resources: nine destinations with a line each, and a customer story.
 *
 * Phones get a full-screen sheet: module groups as tiles, the starters, the
 * resources, and Login and Request a demo pinned to the bottom.
 *
 * Keyboard: focusing a trigger opens its panel, ArrowDown moves into it,
 * Escape closes it. Login and Sign up go to the app subdomain.
 */

type MenuKey = "product" | "agent" | "resources";

const LINKS: { label: string; href?: string; key: NavKey; menu?: MenuKey }[] = [
  { label: "Features", href: routes.features, key: "product", menu: "product" },
  { label: "AI Agent", href: routes.agent, key: "agent", menu: "agent" },
  { label: "Pricing", href: routes.pricing, key: "pricing" },
  { label: "Resources", key: "resources", menu: "resources" },
];

const MOBILE_BREAKPOINT = "(max-width: 960px)";

/* One hue per module group, from the brand ramp. Used on the group's hex and
   the preview's ground, so the three columns read as one group. */
const GROUP: Record<
  (typeof moduleGroups)[number],
  { hue: string; tint: string; short: string }
> = {
  Formulation: { hue: "#7fd234", tint: "#f1f8e2", short: "Build the recipe" },
  "Nutrition & compliance": {
    hue: "#59a3eb",
    tint: "#eef6fd",
    short: "Label with certainty",
  },
  Sensory: { hue: "#18bc9c", tint: "#e3f7f2", short: "Test what you made" },
  "Project management": {
    hue: "#2060a6",
    tint: "#eaf1f9",
    short: "Ship the product",
  },
  Commercial: { hue: "#efc051", tint: "#fcf3da", short: "Sell the product" },
  Platform: { hue: "#324561", tint: "#eef1f6", short: "Scale with confidence" },
};

/* Each module's headline, as its own page states it. */
const LINE: Record<string, string> = {
  recipes: "Formulate once. Scale anywhere.",
  ingredients: "One library. Every recipe follows.",
  costing: "Know the margin before the batch.",
  versions: "Iterate freely. Never lose the original.",
  labeling: "Compliant labels, regenerated with the formula.",
  claims: "Know which claims you can make.",
  designer: "Spec sheets that look the same every time.",
  "taste-tests": "Sensory data that flows back into the formula.",
  projects: "Launches move through stage gates, not inboxes.",
  timeline: "See where a slip actually lands.",
  board: "The launch, as today's work.",
  timesheet: "R&D time your finance team actually trusts.",
  reports: "Answer management from the system.",
  crm: "Connect the front line to R&D.",
  "cr-builder": "Brief once, in your own structure.",
  publishing: "Your data, in the form the recipient needs.",
  integrations: "Connected to the systems you already run.",
  admin: "Trade secrets, treated that way.",
};

type ResourceItem = { label: string; desc: string; href: string; icon: string };

const RESOURCES: { heading: string; items: ResourceItem[] }[] = [
  {
    heading: "Learn",
    items: [
      { label: "Request a demo", desc: "Thirty minutes, on your own formula", href: routes.demo, icon: "play" },
      { label: "FAQ", desc: "Plans, data, setup and support", href: routes.faq, icon: "comment" },
      { label: "Developers & API", desc: "REST API, webhooks and exports", href: routes.developers, icon: "api" },
    ],
  },
  {
    heading: "Discover",
    items: [
      { label: "Customers", desc: "The teams that develop in Flavor Studio", href: routes.customers, icon: "peoples" },
      { label: "Success stories", desc: "Deli Star, Good Foods, Ripple Foods", href: routes.stories, icon: "book" },
      { label: "News", desc: "New modules and improvements", href: routes.news, icon: "newspaper-folding" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Contact us", desc: "Phone, e-mail or the form", href: routes.contact, icon: "mail" },
      { label: "Privacy", desc: "How your data is handled", href: routes.privacy, icon: "shield" },
    ],
  },
];


/* The home page's blue-to-green ramp, for the AI Agent's starter hexes. The
   diagonal keeps the white icon over the middle of the ramp (about 3.8:1),
   not over the pale lime end. */
const AGENT_GRADIENT =
  "linear-gradient(135deg, #17467f 0%, #2060a6 30%, #18bc9c 75%, #8cd135 100%)";

function shotOf(m: Module) {
  if (m.asset.src)
    return { src: m.asset.src, w: m.asset.width, h: m.asset.height };
  if (m.flow)
    return {
      src: m.flow.steps[0].src,
      w: m.flow.width,
      h: m.flow.height,
    };
  return null;
}

function HexIcon({
  icon,
  hue,
  size = 34,
}: {
  icon: string;
  hue: string;
  size?: number;
}) {
  return (
    <span
      className="hex-round flex flex-none items-center justify-center text-white"
      style={{ width: size, height: size * 1.1547, background: hue }}
    >
      <Icon name={icon} style={{ fontSize: size * 0.48 }} />
    </span>
  );
}

export function SiteNav({ active = "" }: { active?: NavKey }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [hover, setHover] = useState<NavKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Partial<Record<NavKey, HTMLElement | null>>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // The sheet locks page scroll; the panels do not.
  useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
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
    closeTimer.current = window.setTimeout(() => {
      setOpen(null);
      setHover(null);
    }, 160);
  }, [cancelClose]);

  // The pill sits under the hovered link, else under the current section.
  const pillKey = hover ?? (LINKS.some((l) => l.key === active) ? active : null);
  useLayoutEffect(() => {
    const track = trackRef.current;
    const el = pillKey ? itemRefs.current[pillKey] : null;
    if (!track || !el) {
      setPill(null);
      return;
    }
    const t = track.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill({ x: r.left - t.left, w: r.width });
  }, [pillKey, isDesktop]);

  const enter = (l: (typeof LINKS)[number]) => {
    cancelClose();
    setHover(l.key);
    setOpen(l.menu ?? null);
  };

  // ArrowDown from a trigger moves into its panel.
  const intoPanel = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(),
    );
  };

  const close = () => {
    setOpen(null);
    setHover(null);
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100]"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        <div
          className={`relative bg-white/95 backdrop-blur-[10px] transition-shadow duration-300 ${scrolled || open ? "shadow-[0_8px_30px_rgba(22,34,58,0.08)]" : ""}`}
        >
          <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--container)] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
            <Link
              href={routes.home}
              className="flex shrink-0 items-center"
              aria-label="Flavor Studio"
              onMouseEnter={scheduleClose}
            >
              <Image
                src="/assets/logo-dark-text.svg"
                alt="Flavor Studio"
                width={208}
                height={40}
                priority
                className="h-7 w-auto min-[400px]:h-8 sm:h-10"
              />
            </Link>

            {isDesktop && (
              <nav
                aria-label="Primary"
                className="absolute left-1/2 -translate-x-1/2"
              >
                <div
                  ref={trackRef}
                  className="relative flex items-center gap-1 rounded-full bg-[#f1f4f8] p-1"
                >
                  {/* The sliding pill: it tells the pointer where it is. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0_2px_8px_rgba(22,34,58,0.12)] transition-[left,width,opacity] duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none"
                    style={{
                      left: pill?.x ?? 0,
                      width: pill?.w ?? 0,
                      opacity: pill ? 1 : 0,
                    }}
                  />
                  {LINKS.map((l) => {
                    const on = pillKey === l.key;
                    const cls = `relative z-[1] flex h-9 items-center gap-1 rounded-full px-4 text-[14px] font-semibold transition-colors ${on ? "text-ink" : "text-[#3e5a7f] hover:text-ink"}`;
                    const chevron = l.menu ? (
                      <Icon
                        name="down"
                        className={`text-[13px] transition-transform duration-200 ${open === l.menu ? "rotate-180" : ""}`}
                      />
                    ) : null;
                    const common = {
                      ref: (el: HTMLElement | null) => {
                        itemRefs.current[l.key] = el;
                      },
                      className: cls,
                      onMouseEnter: () => enter(l),
                      onFocus: () => enter(l),
                      onKeyDown: l.menu ? intoPanel : undefined,
                      "aria-expanded": l.menu ? open === l.menu : undefined,
                      "aria-haspopup": l.menu ? ("true" as const) : undefined,
                      "aria-current":
                        active === l.key ? ("page" as const) : undefined,
                    };
                    return l.href ? (
                      <Link key={l.key} href={l.href} {...common}>
                        {l.label}
                        {chevron}
                      </Link>
                    ) : (
                      <button
                        key={l.key}
                        type="button"
                        {...common}
                        onClick={() =>
                          setOpen((o) => (o === l.menu ? null : l.menu!))
                        }
                      >
                        {l.label}
                        {chevron}
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}

            <div
              className="flex items-center gap-2 sm:gap-[18px]"
              onMouseEnter={scheduleClose}
            >
              {isDesktop && (
                <a
                  href={loginUrl}
                  className="text-[14px] font-semibold text-[#324561] transition-colors hover:text-ink"
                >
                  Login
                </a>
              )}
              {/* Under 390px the pill hides: logo, pill and menu button do not
                  fit on one line there, and the sheet carries the same link. */}
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
                  className="flex size-11 items-center justify-center rounded-[12px] bg-[#f1f4f8] text-[20px] text-ink"
                >
                  <Icon name={sheet ? "close" : "hamburger-button"} />
                </button>
              )}
            </div>
          </div>

          {/* The brand ramp along the bottom edge. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #17467f, #2060a6 25%, #59a3eb 50%, #18bc9c 75%, #8cd135)",
            }}
          />
        </div>

        {isDesktop && open && (
          <div
            ref={panelRef}
            className="absolute inset-x-0 top-full px-5 pt-3"
            onMouseEnter={cancelClose}
          >
            <div
              className="mx-auto max-w-[1120px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_rgba(22,34,58,0.22)] ring-1 ring-black/5"
              style={{ animation: "fsPopIn .28s var(--ease-out) both" }}
            >
              {open === "product" ? (
                <FeaturesPanel onNavigate={close} />
              ) : open === "agent" ? (
                <AgentPanel onNavigate={close} />
              ) : (
                <ResourcesPanel onNavigate={close} />
              )}
            </div>
          </div>
        )}
      </header>

      {!isDesktop && sheet && <MobileSheet onNavigate={() => setSheet(false)} />}
    </>
  );
}

/* -------------------------------------------------------------- features */

function FeaturesPanel({ onNavigate }: { onNavigate: () => void }) {
  const [group, setGroup] = useState<(typeof moduleGroups)[number]>(
    moduleGroups[0],
  );
  const inGroup = modules.filter((m) => m.group === group);
  const [pick, setPick] = useState<string>(inGroup[0].id);
  const mod = modules.find((m) => m.id === pick) ?? inGroup[0];
  const g = GROUP[group];
  const shot = shotOf(mod);

  const choose = (name: (typeof moduleGroups)[number]) => {
    setGroup(name);
    setPick(modules.find((m) => m.group === name)!.id);
  };

  return (
    <div className="grid grid-cols-[250px_minmax(0,1fr)_380px]">
      {/* groups */}
      <div className="flex flex-col gap-1 bg-[#f7f9fc] p-4">
        <div className="px-3 pt-1 pb-2 font-mono text-[11px] tracking-[.08em] text-ink-2 uppercase">
          18 modules, one library
        </div>
        {moduleGroups.map((name) => {
          const on = name === group;
          const count = modules.filter((m) => m.group === name).length;
          return (
            <button
              key={name}
              type="button"
              onMouseEnter={() => choose(name)}
              onFocus={() => choose(name)}
              onClick={() => choose(name)}
              aria-pressed={on}
              className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors ${on ? "bg-white shadow-[0_4px_14px_rgba(22,34,58,0.08)]" : "hover:bg-white/70"}`}
            >
              <span
                className="hex-round w-3 aspect-[1/1.1547] flex-none transition-transform"
                style={{
                  background: GROUP[name].hue,
                  transform: on ? "scale(1.3)" : "none",
                }}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold text-ink">
                  {name}
                </span>
                <span className="block text-[12px] text-ink-2">
                  {GROUP[name].short}
                </span>
              </span>
              <span className="font-mono text-[11px] text-ink-2">{count}</span>
            </button>
          );
        })}
        <Link
          href={routes.features}
          onClick={onNavigate}
          className="mt-auto flex items-center justify-between rounded-[14px] px-3 py-3 text-[14px] font-bold text-blue-700 hover:bg-white"
        >
          See every module
          <Icon name="arrow-right" className="text-[15px]" />
        </Link>
      </div>

      {/* modules in the group */}
      <div className="p-4">
        <div className="px-3 pt-1 pb-2 font-mono text-[11px] tracking-[.08em] text-ink-2 uppercase">
          {group}
        </div>
        <ul
          key={group}
          className="m-0 flex list-none flex-col gap-1 p-0"
          style={{ animation: "fsPopIn .25s var(--ease-out) both" }}
        >
          {inGroup.map((m) => {
            const on = m.id === mod.id;
            return (
              <li key={m.id}>
                <Link
                  href={routes.feature(m.id)}
                  onClick={onNavigate}
                  onMouseEnter={() => setPick(m.id)}
                  onFocus={() => setPick(m.id)}
                  className={`group flex items-center gap-3 rounded-[14px] px-3 py-2.5 transition-colors ${on ? "bg-[#f3f6fa]" : "hover:bg-[#f7f9fc]"}`}
                >
                  <HexIcon icon={m.icon} hue={g.hue} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-ink">
                      {m.label}
                    </span>
                    <span className="block truncate text-[13px] text-ink-2">
                      {LINE[m.id]}
                    </span>
                  </span>
                  <Icon
                    name="right"
                    className={`text-[16px] text-ink-2 transition-[transform,opacity] ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* the module's real screen */}
      <Link
        href={routes.feature(mod.id)}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden="true"
        className="group m-3 flex flex-col overflow-hidden rounded-[18px] p-4 transition-colors"
        style={{ background: g.tint }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-white shadow-[0_14px_34px_rgba(22,34,58,0.16)] ring-1 ring-black/5">
          {shot ? (
            <Image
              key={shot.src}
              src={shot.src}
              alt=""
              fill
              sizes="360px"
              className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ animation: "fsPopIn .3s var(--ease-out) both" }}
            />
          ) : null}
        </div>
        <div className="mt-4 font-mono text-[11px] tracking-[.08em] text-ink-2 uppercase">
          {mod.label}
        </div>
        <div className="font-display mt-1 text-[19px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
          {LINE[mod.id]}
        </div>
        {/* Three of the module's own capabilities, as the features page
            lists them. */}
        <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
          {mod.capabilities.slice(0, 3).map((c) => (
            <li key={c} className="flex items-start gap-2 text-[12.5px] leading-[1.4] text-ink-2">
              <span
                className="hex-round mt-[4px] w-2 aspect-[1/1.1547] flex-none"
                style={{ background: g.hue }}
              />
              <span className="line-clamp-1">{c}</span>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[14px] font-bold text-blue-700">
          Explore {mod.label}
          <Icon
            name="arrow-right"
            className="text-[15px] transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </div>
  );
}

/* ---------------------------------------------------------------- agent */

function AgentPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[360px_minmax(0,1fr)]">
      <Link
        href={routes.agent}
        onClick={onNavigate}
        className="group relative m-3 flex flex-col overflow-hidden rounded-[18px] bg-night p-6 text-white"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[55%] h-[120px] opacity-60 blur-[36px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #2060a6, #59a3eb 35%, #18bc9c 65%, #8cd135)",
          }}
        />
        <span className="relative flex size-10 items-center justify-center rounded-[10px] bg-[#59a3eb]">
          <Image src="/ai-act/ai-fill.svg" alt="" width={18} height={19} />
        </span>
        <span className="font-display relative mt-5 text-[24px] leading-[1.12] font-bold tracking-[-0.02em]">
          Ask your recipes a question.
        </span>
        <span className="relative mt-2 text-[14px] leading-[1.55] text-[#c9d2de]">
          A panel beside the page you are on. It answers from your
          organisation&rsquo;s data and shows its steps and sources.
        </span>
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-bold text-lime-400">
          Meet the AI Agent
          <Icon
            name="arrow-right"
            className="text-[15px] transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>

      <div className="p-5">
        <div className="px-1 font-mono text-[11px] tracking-[.08em] text-ink-2 uppercase">
          Try one of these
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {STARTERS.map((s) => (
            <Link
              key={s.kind}
              href={`${routes.agent}#${s.kind}`}
              onClick={onNavigate}
              className="group flex flex-col rounded-[16px] border border-hairline p-4 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_12px_28px_rgba(32,96,166,0.14)]"
            >
              <span className="flex items-center gap-2">
                <HexIcon icon={s.icon} hue={AGENT_GRADIENT} size={30} />
                <span className="font-mono text-[11.5px] tracking-[.08em] text-blue-700 uppercase">
                  {s.label}
                </span>
              </span>
              <span className="mt-3 text-[14px] leading-[1.45] font-semibold text-ink">
                &ldquo;{s.starter}&rdquo;
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-bold text-blue-700">
                See the answer
                <Icon
                  name="arrow-right"
                  className="text-[14px] transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            {
              label: "Ask with context",
              desc: "@mention recipes, add files and links",
              href: `${routes.agent}#composer`,
              icon: "link",
            },
            {
              label: "Included in every plan",
              desc: "No add-on to buy",
              href: `${routes.pricing}#ai`,
              icon: "coupon",
            },
          ].map((i) => (
            <Link
              key={i.label}
              href={i.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-[14px] bg-[#f7f9fc] px-4 py-3 transition-colors hover:bg-[#eef3f9]"
            >
              <Icon name={i.icon} className="text-[18px] text-blue-700" />
              <span>
                <span className="block text-[14px] font-bold text-ink">
                  {i.label}
                </span>
                <span className="block text-[12.5px] text-ink-2">{i.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ resources */

function ResourcesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_320px]">
      <div className="grid grid-cols-3 gap-2 p-5">
        {RESOURCES.map((col) => (
          <div key={col.heading}>
            <div className="px-3 pb-2 font-mono text-[11px] tracking-[.08em] text-ink-2 uppercase">
              {col.heading}
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {col.items.map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 rounded-[14px] px-3 py-2.5 transition-colors hover:bg-[#f7f9fc]"
                  >
                    <span className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-[9px] bg-[#eef3f9] text-[16px] text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                      <Icon name={i.icon} />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-bold text-ink">
                        {i.label}
                      </span>
                      <span className="block text-[12.5px] leading-[1.4] text-ink-2">
                        {i.desc}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href={routes.story("deli-star")}
        onClick={onNavigate}
        className="group m-3 flex flex-col overflow-hidden rounded-[18px] bg-[#16223a] text-white"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src="/stories/deli-star.jpg"
            alt=""
            fill
            sizes="300px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-mono text-[11px] tracking-[.08em] text-lime-400 uppercase">
            Customer story
          </span>
          <span className="font-display mt-2 text-[16px] leading-[1.3] font-bold">
            Deli Star drives innovation and collaboration to accelerate product
            launches
          </span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-bold text-lime-400">
            Read the story
            <Icon
              name="arrow-right"
              className="text-[15px] transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* --------------------------------------------------------------- mobile */

function MobileSheet({ onNavigate }: { onNavigate: () => void }) {
  const [group, setGroup] = useState<(typeof moduleGroups)[number] | null>(
    null,
  );
  return (
    <div className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-[99] flex flex-col overflow-x-hidden bg-white">
      <nav
        aria-label="Mobile"
        className="flex-1 overflow-y-auto px-5 pt-5 pb-8"
        data-lenis-prevent
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-[22px] font-bold text-ink">
            Features
          </span>
          <Link
            href={routes.features}
            onClick={onNavigate}
            className="flex min-h-11 items-center text-[14px] font-bold text-blue-700"
          >
            All 18
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {moduleGroups.map((name) => {
            const on = group === name;
            return (
              <button
                key={name}
                type="button"
                aria-expanded={on}
                onClick={() => setGroup(on ? null : name)}
                className={`flex min-h-[64px] flex-col items-start justify-center rounded-[14px] px-3.5 py-2.5 text-left transition-colors ${on ? "bg-[#16223a] text-white" : "bg-[#f3f6fa] text-ink"}`}
              >
                <span
                  className="hex-round w-3 aspect-[1/1.1547]"
                  style={{ background: GROUP[name].hue }}
                />
                <span className="mt-1.5 text-[14px] leading-tight font-bold">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
        {group ? (
          <ul
            key={group}
            className="mt-3 flex list-none flex-col gap-1 rounded-[16px] p-2"
            style={{
              background: GROUP[group].tint,
              animation: "fsPopIn .25s var(--ease-out) both",
            }}
          >
            {modules
              .filter((m) => m.group === group)
              .map((m) => (
                <li key={m.id}>
                  <Link
                    href={routes.feature(m.id)}
                    onClick={onNavigate}
                    className="flex min-h-[52px] items-center gap-3 rounded-[12px] px-2 py-2"
                  >
                    <HexIcon icon={m.icon} hue={GROUP[group].hue} size={30} />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-ink">
                        {m.label}
                      </span>
                      <span className="block truncate text-[12.5px] text-ink-2">
                        {LINE[m.id]}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        ) : null}

        <div className="mt-7 flex items-center justify-between">
          <span className="font-display text-[22px] font-bold text-ink">
            AI Agent
          </span>
          <Link
            href={routes.agent}
            onClick={onNavigate}
            className="flex min-h-11 items-center text-[14px] font-bold text-blue-700"
          >
            Overview
          </Link>
        </div>
        <div className="-mx-5 mt-3 flex snap-x gap-2 overflow-x-auto px-5 pb-1">
          {STARTERS.map((s) => (
            <Link
              key={s.kind}
              href={`${routes.agent}#${s.kind}`}
              onClick={onNavigate}
              className="w-[220px] flex-none snap-start rounded-[14px] bg-[#16223a] p-3.5 text-white"
            >
              <span className="font-mono text-[11px] tracking-[.08em] text-lime-400 uppercase">
                {s.label}
              </span>
              <span className="mt-1.5 block text-[13.5px] leading-[1.4] font-semibold">
                &ldquo;{s.starter}&rdquo;
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={routes.pricing}
          onClick={onNavigate}
          className="font-display mt-7 flex min-h-[52px] items-center justify-between border-y border-hairline text-[22px] font-bold text-ink"
        >
          Pricing
          <Icon name="right" className="text-[18px] text-ink-2" />
        </Link>

        <div className="font-display mt-7 text-[22px] font-bold text-ink">
          Resources
        </div>
        <ul className="mt-2 grid list-none grid-cols-2 gap-x-3 p-0">
          {RESOURCES.flatMap((c) => c.items).map((i) => (
            <li key={i.label}>
              <Link
                href={i.href}
                onClick={onNavigate}
                className="flex min-h-11 items-center gap-2 text-[15px] text-ink"
              >
                <Icon name={i.icon} className="text-[16px] text-blue-700" />
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="grid grid-cols-2 gap-2 border-t border-hairline p-4">
        <a href={loginUrl} className="btn btn-secondary w-full">
          Login
        </a>
        <Link
          href={routes.demo}
          onClick={onNavigate}
          className="btn btn-lime w-full"
        >
          Request a demo
        </Link>
      </div>
    </div>
  );
}
