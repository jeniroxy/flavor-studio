"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { DemoForm } from "@/components/contact/demo-form";
import { Icon } from "@/components/icon";
import { productAssets } from "@/lib/assets";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import { routes } from "@/lib/routes";

/*
 * The capability wall as a honeycomb in the shape of the Flavor Studio mark:
 * one large pointy-top hexagon of capabilities, two rings deep, around a
 * rounded hexagon panel drawn like the logo's outline. On tablet and desktop
 * the four module tiles sit inside the panel; on phones they sit above, and
 * the panel reads back whichever capability was tapped.
 *
 * Every hex is a button: it opens the demo request in a dialog (on phones,
 * via the panel's button), titled with the capability that was clicked, so a visitor who is curious about one
 * thing can ask to see exactly that. The form is the site's own DemoForm
 * (intent "demo"), the same one /demo uses.
 *
 * Motion, each with a job:
 * - the hexes ripple in outward from the tiles the first time they are
 *   seen, so the eye starts at the modules and travels to the detail;
 * - hexes near the cursor lift, so the pointer always shows which one a
 *   click will open;
 * - hovering a module tile lights the capabilities that belong to it, and
 *   hovering a hex lights its module tile;
 * - while nobody is using the section, a tour lights each module and its
 *   wedge in turn, clockwise, so the grouping explains itself;
 * - every icon bobs slowly, out of phase, only while the section is on
 *   screen. All of it is off under prefers-reduced-motion.
 */

/*
 * In clockwise order from twelve o'clock, because on desktop the hive is laid
 * out by angle: each run of related capabilities lands in the wedge beside
 * its module tile (labeling top right, sensory bottom right, projects along
 * the bottom, formulation on the left).
 *
 * The desktop hexagon has 42 slots. To make room for what the first wall
 * left out (the Publish Designer and Plex, both named in the client's
 * review, Inspire, the wider export formats, version compare, ingredient
 * statements, ingredient groups, and project files and conversations), pairs
 * that describe one feature share a cell ("Timesheet" + "Running timer",
 * "AI Agent" + "Cited answers", "Two-factor auth" + "Roles & rights",
 * "Sample requests" + "Shipments", "Cost assumptions" + "Retail margin",
 * "Publish Designer" + "Spec Designer"), and "Overrun & fill", "Servings &
 * containers" and "Library search" gave up theirs; all three stay on the
 * Recipes and Ingredients pages.
 */
const CELLS = [
  // Labeling
  ["doc-detail", "FDA panels"],
  ["translate", "Canadian bilingual"],
  ["layout-four", "Six label layouts"],
  ["caution", "Allergen tagging"],
  ["list-two", "Ingredient statements"],
  ["check-one", "Content claims"],
  ["layers", "Aggregate labels"],
  ["layout-one", "Publish & Spec Designer"],
  ["file-pdf-one", "Vector PDF export"],
  ["export", "CSV, Word & JSON"],
  // Platform
  ["api", "REST API"],
  ["factory-building", "Plex & ERP sync"],
  ["plug", "Webhooks"],
  ["protect", "Security & roles"],
  ["robot", "AI Agent"],
  // Sensory
  ["experiment", "Taste panels"],
  ["mouth", "Triangle tests"],
  ["chart-histogram", "Attribute scores"],
  // Projects & time
  ["folder-open", "Stage gates"],
  ["calendar-three", "Gantt timeline"],
  ["all-application", "Project board"],
  ["comment", "Files & conversations"],
  ["time", "Timesheet & timer"],
  ["table-file", "Reports"],
  ["trending-up", "Inspire"],
  // Customers & supply
  ["peoples", "CRM"],
  ["form-one", "Requirements builder"],
  ["delivery", "Samples & shipments"],
  ["order", "Purchase orders"],
  // Costing
  ["calculator-one", "Cost & margin"],
  // Formulation
  ["percentage", "Yield & loss"],
  ["weight", "Batch scaling"],
  ["config", "Custom fields"],
  ["formula", "Custom calculations"],
  ["category-management", "Ingredient groups"],
  ["certificate", "Certifications"],
  ["pic", "Ingredient images"],
  ["upload", "Vendor spec import"],
  ["leaves", "9,000+ USDA"],
  ["contrast", "Compare versions"],
  ["history", "Version history"],
  ["branch-one", "Sub-recipes"],
] as const;

type Cell = (typeof CELLS)[number];

/*
 * The four modules in the panel. The client's review names the site's focus
 * as "Recipes, Taste Tests, Projects, CRM, Ingredients, publishing,
 * labeling"; Costing is not on that list and lives in the recipe's own
 * sidebar, so its tile went to Projects, the module the people who approve a
 * purchase work in. Costing's cell lights with Recipes.
 */
const TILES = [
  {
    label: "Recipes",
    icon: "chef-hat-one",
    shot: productAssets.recipeCost,
    href: routes.feature("recipes"),
  },
  {
    label: "Nutrition labels",
    icon: "doc-detail",
    shot: productAssets.nutritionLabelFormats,
    href: routes.feature("labeling"),
  },
  {
    label: "Projects",
    icon: "folder-open",
    shot: productAssets.projectGantt,
    href: routes.feature("projects"),
  },
  {
    label: "Taste Tests",
    icon: "experiment",
    shot: productAssets.tasteTests,
    href: routes.feature("taste-tests"),
  },
];

/* Which module tile each capability belongs to, where it belongs to one. */
const MODULE_OF: Record<string, string> = Object.fromEntries(
  (
    [
      [
        "Recipes",
        [
          "Sub-recipes",
          "Batch scaling",
          "Version history",
          "Compare versions",
          "9,000+ USDA",
          "Vendor spec import",
          "Yield & loss",
          "Ingredient images",
          "Ingredient groups",
          "Certifications",
          "Custom fields",
          "Custom calculations",
          "Cost & margin",
        ],
      ],
      [
        "Nutrition labels",
        [
          "Allergen tagging",
          "FDA panels",
          "Canadian bilingual",
          "Six label layouts",
          "Ingredient statements",
          "Content claims",
          "Aggregate labels",
          "Vector PDF export",
          "Publish & Spec Designer",
          "CSV, Word & JSON",
        ],
      ],
      [
        "Projects",
        [
          "Stage gates",
          "Gantt timeline",
          "Project board",
          "Files & conversations",
          "Timesheet & timer",
          "Reports",
        ],
      ],
      ["Taste Tests", ["Taste panels", "Triangle tests", "Attribute scores"]],
    ] as const
  ).flatMap(([mod, cells]) => cells.map((c) => [c, mod])),
);

const INDEX = Object.fromEntries(CELLS.map((c, i) => [c[1], i]));


/*
 * What is lit, and why: a tile hovered (its hexes light), a hex hovered or
 * picked (its tile lights), or the idle tour stepping round the modules.
 */
type Lit = { module: string; from: "tile" | "hex" | "tour" } | null;

/* The tour runs clockwise from twelve o'clock, the way the wedges are laid. */
const TOUR = ["Nutrition labels", "Taste Tests", "Projects", "Recipes"];
const TOUR_MS = 2800;

/*
 * Flat-top cells of circumradius --s on an axial grid; every cell within 4
 * steps of the centre, minus the inner 19 (radius 2) where the panel sits,
 * gives 42 slots whose outline is a pointy-top hexagon like the mark. Slots
 * are ordered by angle, clockwise from twelve o'clock, so CELLS lands wedge
 * by wedge. Units below are multiples of --s.
 */
const SQ3 = Math.sqrt(3);

type Slot = { x: number; y: number; ring: number; angle: number };

const SLOTS: Slot[] = (() => {
  const out: Slot[] = [];
  for (let q = -4; q <= 4; q++)
    for (let r = -4; r <= 4; r++) {
      const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
      if (ring < 3 || ring > 4) continue;
      const x = 1.5 * q;
      const y = SQ3 * (r + q / 2);
      // Rounded so a ring-3 and ring-4 cell on the same ray tie exactly on
      // the server and in the browser; unrounded, float noise can order
      // them differently and the hydrated hexes swap places.
      const angle =
        Math.round(
          ((Math.atan2(x, -y) + 2 * Math.PI) % (2 * Math.PI)) * 1e6,
        ) / 1e6;
      out.push({ x, y, ring, angle });
    }
  return out.sort((a, b) => a.angle - b.angle || a.ring - b.ring);
})();

/* The panel: a pointy-top hexagon that clears ring 3 by about 0.2 --s. */
const PANEL_R = 3.75;

/** A pointy-top hexagon of circumradius `R` with corners rounded by `k`. */
function roundedHex(R: number, k: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [R * Math.cos(a), R * Math.sin(a)];
  });
  const lerp = (a: number[], b: number[], t: number) =>
    [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t].map((n) =>
      n.toFixed(3),
    );
  const t = k / R;
  return (
    pts
      .map((p, i) => {
        const prev = pts[(i + 5) % 6];
        const next = pts[(i + 1) % 6];
        const [ax, ay] = lerp(p, prev, t);
        const [bx, by] = lerp(p, next, t);
        return `${i ? "L" : "M"}${ax} ${ay} Q${p[0].toFixed(3)} ${p[1].toFixed(3)} ${bx} ${by}`;
      })
      .join(" ") + " Z"
  );
}

function Hex({
  cell,
  delay,
  lit,
  selected,
  iconOnly,
  place,
  onPick,
  onLit,
}: {
  cell: Cell;
  delay: number;
  lit: boolean;
  selected: boolean;
  /** Phones: the label moves to the panel, so the cell carries the icon. */
  iconOnly: boolean;
  place: CSSProperties;
  onPick: (c: string) => void;
  onLit?: (l: Lit) => void;
}) {
  const [icon, label] = cell;
  const owner = MODULE_OF[label];
  const on =
    owner && onLit ? () => onLit({ module: owner, from: "hex" }) : undefined;
  const off = owner && onLit ? () => onLit(null) : undefined;
  return (
    <button
      type="button"
      data-hex=""
      data-lit={lit}
      data-sel={selected}
      onClick={() => onPick(label)}
      onMouseEnter={on}
      onMouseLeave={off}
      onFocus={on}
      onBlur={off}
      aria-label={iconOnly ? label : `${label}: request a demo`}
      aria-pressed={iconOnly ? selected : undefined}
      className="group absolute scale-[0.6] cursor-pointer rounded-[12px] opacity-0 transition-[opacity,scale] duration-500 ease-[var(--ease-out-soft)] group-data-[in=true]/hive:scale-100 group-data-[in=true]/hive:opacity-100 focus-visible:outline-offset-2 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none"
      style={
        {
          ...place,
          transitionDelay: `${delay}ms`,
          "--i": INDEX[label],
        } as CSSProperties
      }
    >
      {/* The lift layer: moved by --lift, which the cursor sets. */}
      <span
        className="absolute inset-0 transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{
          transform:
            "translateY(calc(var(--lift, 0) * -6px)) scale(calc(1 + var(--lift, 0) * 0.08))",
        }}
      >
        {/* Resting white (the wall sits on a tinted band); lit blue-300;
            hovered or picked solid blue-600. */}
        <span
          className="hex-round-flat absolute inset-0 bg-white transition-colors duration-300 group-hover:bg-blue-600 group-data-[lit=true]:bg-blue-300 group-data-[sel=true]:bg-blue-600"
        />
        <span
          className="hex-round-flat absolute inset-0 bg-blue-300 group-hover:hidden"
          style={{
            opacity: "calc(var(--lift, 0) * 0.85)",
          }}
        />
        <span
          className={`absolute inset-0 flex flex-col items-center justify-center text-center ${iconOnly ? "" : "gap-0.5 px-[17%] lg:gap-1.5 lg:px-[15%]"}`}
        >
          <span className="flex [animation:fsHexFloat_5s_ease-in-out_infinite] [animation-delay:calc(var(--i)*-0.37s)] [animation-play-state:paused] group-data-[play=true]/hive:[animation-play-state:running] motion-reduce:[animation:none]">
            <Icon
              name={icon}
              className={`text-slate-600 transition-colors duration-200 group-hover:text-white group-hover:[animation:fsHexWiggle_.5s_ease-in-out] group-data-[lit=true]:text-blue-700 group-data-[sel=true]:text-white motion-reduce:group-hover:[animation:none] ${iconOnly ? "text-[calc(var(--s)*0.68)]" : "text-[18px] lg:text-[22px]"}`}
            />
          </span>
          {iconOnly ? null : (
            <span className="text-[clamp(10px,calc(var(--s)*0.2),11px)] leading-[1.15] lg:leading-[1.25] font-semibold text-ink-2 transition-colors duration-200 group-hover:text-white group-data-[lit=true]:text-ink group-data-[sel=true]:text-white">
              {label}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

/*
 * The hexagon. "full" (tablet and desktop) labels every cell and holds the
 * four module tiles in the panel. "picker" (phones) is the same shape with
 * icon-only cells: a tap picks a capability and the panel reads it back with
 * a Request a demo button, since 42 labels cannot fit at 375px.
 */
function HexHive({
  variant,
  lit,
  picked,
  onPick,
  onLit,
  onRequest,
}: {
  variant: "full" | "picker";
  lit: Lit;
  picked: string | null;
  onPick: (c: string) => void;
  onLit?: (l: Lit) => void;
  onRequest: (c: string) => void;
}) {
  const path = roundedHex(PANEL_R, 0.45);
  const picker = variant === "picker";
  const gap = picker ? 3 : 6;
  const pickedCell = picked ? CELLS.find((c) => c[1] === picked) : undefined;
  return (
    <div
      className="relative mx-auto"
      style={{
        width: "calc(14 * var(--s))",
        height: `calc(${(9 * SQ3).toFixed(4)} * var(--s))`,
      }}
    >
      {/* The panel, outlined in the mark's lime-to-teal as the logo is. */}
      <svg
        aria-hidden="true"
        viewBox={`${-PANEL_R} ${-PANEL_R} ${PANEL_R * 2} ${PANEL_R * 2}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
        style={{
          width: `calc(${PANEL_R * 2} * var(--s))`,
          height: `calc(${PANEL_R * 2} * var(--s))`,
        }}
      >
        <defs>
          <linearGradient
            id={`hive-stroke-${variant}`}
            x1="1"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop offset="0" stopColor="#18bc9c" />
            <stop offset="1" stopColor="#8cd135" />
          </linearGradient>
          <linearGradient
            id={`hive-fill-${variant}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f7fbf2" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#hive-fill-${variant})`}
          stroke={`url(#hive-stroke-${variant})`}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {SLOTS.map((slot, i) => {
        const cell = CELLS[i];
        return (
          <Hex
            key={cell[1]}
            cell={cell}
            delay={Math.round(
              (slot.ring - 3) * 220 + (slot.angle / (2 * Math.PI)) * 320,
            )}
            lit={
              !!lit && lit.from !== "hex" && MODULE_OF[cell[1]] === lit.module
            }
            selected={picked === cell[1]}
            iconOnly={picker}
            onPick={onPick}
            onLit={onLit}
            place={{
              left: `calc(50% + ${(slot.x - 1).toFixed(4)} * var(--s) + ${gap / 2}px)`,
              top: `calc(50% + ${(slot.y - SQ3 / 2).toFixed(4)} * var(--s) + ${gap / 2}px)`,
              width: `calc(2 * var(--s) - ${gap}px)`,
              height: `calc(${SQ3.toFixed(4)} * var(--s) - ${gap}px)`,
            }}
          />
        );
      })}

      {/* The rectangle the panel's slanted sides allow. */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "calc(5.3 * var(--s))",
          height: "calc(4.3 * var(--s))",
        }}
      >
        {picker ? (
          <div
            aria-live="polite"
            className="flex h-full flex-col items-center justify-center gap-1.5 text-center"
          >
            {pickedCell ? (
              <>
                <p className="font-display text-[13px] leading-[1.2] font-bold text-ink">
                  {pickedCell[1]}
                </p>
                <button
                  type="button"
                  onClick={() => onRequest(pickedCell[1])}
                  className="min-h-11 cursor-pointer rounded-[999px] bg-blue-600 px-3.5 text-[12.5px] font-semibold whitespace-nowrap text-white hover:bg-blue-700"
                >
                  Request a demo
                </button>
              </>
            ) : (
              <>
                <Image
                  src="/assets/logo-mark.png"
                  alt=""
                  width={116}
                  height={125}
                  className="h-[calc(var(--s)*1.4)] w-auto"
                />
                <p className="text-[11.5px] leading-[1.3] font-semibold text-ink-2">
                  Tap a capability
                  <br />
                  to see it in a demo
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-2.5">
            {TILES.map((t) => (
              <Tile
                key={t.label}
                tile={t}
                lit={lit?.module === t.label}
                onLit={onLit}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Tile({
  tile,
  lit,
  onLit,
  compact = false,
}: {
  tile: (typeof TILES)[number];
  lit: boolean;
  onLit?: (l: Lit) => void;
  /** Inside the panel: the shot fills the height left by the label. */
  compact?: boolean;
}) {
  const on = onLit
    ? () => onLit({ module: tile.label, from: "tile" })
    : undefined;
  const off = onLit ? () => onLit(null) : undefined;
  return (
    <Link
      href={tile.href}
      onMouseEnter={on}
      onMouseLeave={off}
      onFocus={on}
      onBlur={off}
      className={`group flex flex-col overflow-hidden rounded-[18px] bg-white transition-[translate,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(32,96,166,0.22)] hover:ring-2 hover:ring-blue-500 motion-reduce:transition-none ${lit ? "-translate-y-1 shadow-[0_16px_40px_rgba(32,96,166,0.22)] ring-2 ring-blue-500" : "shadow-[0_1px_2px_rgba(22,34,58,0.04),0_8px_24px_rgba(22,34,58,0.06)] ring-1 ring-[rgba(22,34,58,0.08)]"}`}
    >
      <div
        className={`relative m-2 mb-0 overflow-hidden rounded-[12px] bg-panel ${compact ? "min-h-0 flex-1" : "aspect-[4/3]"}`}
      >
        {tile.shot.src ? (
          <Image
            src={tile.shot.src}
            alt={tile.shot.alt}
            fill
            sizes="(min-width: 1024px) 220px, 45vw"
            className="object-cover object-left-top transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : null}
      </div>
      <div
        className={`flex items-center gap-2 ${compact ? "px-2.5 py-2" : "px-3.5 py-3"}`}
      >
        {/* In the panel the name needs the whole width ("Nutrition labels"
            at 1024), so the icon and arrow drop; the tile still lifts. */}
        {compact ? null : (
          <Icon name={tile.icon} className="shrink-0 text-[18px] text-blue-700" />
        )}
        <span
          className={`font-display min-w-0 flex-1 leading-[1.15] font-bold tracking-[-0.02em] text-ink ${compact ? "truncate text-[clamp(12px,calc(var(--s)*0.26),15px)]" : "text-[clamp(15px,1.4vw,19px)]"}`}
        >
          {tile.label}
        </span>
        {compact ? null : (
          <Icon
            name="arrow-right"
            className="shrink-0 text-[16px] text-ink-3 transition-[translate,color] duration-200 group-hover:translate-x-1 group-hover:text-blue-700"
          />
        )}
      </div>
    </Link>
  );
}

function Hint() {
  return (
    <p className="mx-auto flex w-fit items-center gap-2 rounded-[999px] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-2">
      <Icon name="click" className="text-[15px] text-blue-700" />
      Click any capability to request a demo of it.
    </p>
  );
}

/** The demo request, opened from a hex. Native <dialog>: Escape closes it. */
function DemoDialog({
  topic,
  onClose,
}: {
  topic: string | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (topic && !d.open) d.showModal();
    if (!topic && d.open) d.close();
  }, [topic]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="hive-demo-title"
      className="m-auto max-h-[92dvh] w-[min(560px,calc(100vw-24px))] overflow-y-auto rounded-[var(--radius-xl)] bg-white p-0 text-ink shadow-[var(--shadow-window)] backdrop:bg-[rgba(10,12,16,0.55)] backdrop:backdrop-blur-[2px]"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full text-[20px] text-ink-2 hover:bg-panel-2"
        >
          <Icon name="close" />
        </button>
        <p className="text-[13px] font-bold text-blue-700">{topic}</p>
        <h2
          id="hive-demo-title"
          className="font-display mt-1 pr-10 text-[clamp(24px,3vw,30px)] leading-[1.15] font-bold tracking-[-0.02em]"
        >
          Request a demo
        </h2>
        <p className="mt-2 mb-6 text-[15px] leading-[1.6] text-ink-2">
          We&rsquo;ll show you {topic} on your own formula, alongside the
          modules you would actually use.
        </p>
        {/* Keyed on the topic so each opening starts with a fresh form. */}
        {topic ? <DemoForm key={topic} intent="demo" /> : null}
      </div>
    </dialog>
  );
}

export function CapabilityHive() {
  const [topic, setTopic] = useState<string | null>(null);
  const [lit, setLit] = useState<Lit>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [step, setStep] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const lastTouch = useRef(0);

  // data-in: the ripple, once. data-play and onScreen: the icon bob and the
  // tour, only while the section is on screen and motion is welcome.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.dataset.in = "true";
      return;
    }
    const stopIn = observeOnce(el, () => {
      el.dataset.in = "true";
    });
    const io = new IntersectionObserver(([e]) => {
      el.dataset.play = String(e.isIntersecting);
      setOnScreen(e.isIntersecting);
    });
    io.observe(el);
    return () => {
      stopIn();
      io.disconnect();
    };
  }, []);

  // The tour steps round the modules while nobody is using the section; any
  // hover, focus, pick or open dialog holds it.
  const touring = onScreen && !engaged && !lit && !picked && !topic;
  useEffect(() => {
    if (!touring) return;
    const id = window.setInterval(() => {
      // Never re-render under a finger: a class change mid-tap makes the
      // browser drop the click, so a step due within 1.5s of a touch waits.
      if (Date.now() - lastTouch.current < 1500) return;
      setStep((n) => (n + 1) % TOUR.length);
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [touring]);

  const pickedModule = picked ? MODULE_OF[picked] : undefined;
  const shown: Lit =
    lit ??
    (pickedModule
      ? { module: pickedModule, from: "hex" }
      : touring && step >= 0
        ? { module: TOUR[step], from: "tour" }
        : null);

  const hexes = () =>
    deskRef.current?.querySelectorAll<HTMLElement>("[data-hex]") ?? [];

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const { clientX: x, clientY: y } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      hexes().forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
        const lift = Math.max(0, 1 - d / 170);
        el.style.setProperty("--lift", lift > 0.01 ? lift.toFixed(3) : "0");
      });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    hexes().forEach((el) => el.style.setProperty("--lift", "0"));
  };

  return (
    <div
      ref={rootRef}
      data-in="false"
      data-play="false"
      className="group/hive"
      onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setEngaged(false)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") lastTouch.current = Date.now();
      }}
      // Keyboard focus only: focus from a tap would re-render mid-gesture and
      // cancel the tap's click.
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setEngaged(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
      }}
    >
      {/* Tablet and desktop: labelled cells, the tiles inside the panel. */}
      <div
        ref={deskRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hidden flex-col items-center gap-6 [--s:clamp(44px,calc((100vw_-_64px)/14),58px)] md:flex lg:[--s:clamp(58px,5vw,70px)]"
      >
        <HexHive
          variant="full"
          lit={shown}
          picked={null}
          onPick={setTopic}
          onLit={setLit}
          onRequest={setTopic}
        />
        <Hint />
      </div>

      {/* Phones: the tiles on top, then the hexagon as a picker. */}
      <div className="flex flex-col gap-8 [--s:min(40px,calc((100vw_-_32px)/14))] md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {TILES.map((t) => (
            <Tile key={t.label} tile={t} lit={shown?.module === t.label} />
          ))}
        </div>
        <HexHive
          variant="picker"
          lit={shown}
          picked={picked}
          onPick={(c) => setPicked((p) => (p === c ? null : c))}
          onRequest={setTopic}
        />
      </div>

      <DemoDialog topic={topic} onClose={() => setTopic(null)} />
    </div>
  );
}
