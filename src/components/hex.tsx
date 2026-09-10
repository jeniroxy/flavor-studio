/*
 * The hexagon system.
 *
 * The client's summary was that the site looked clean but generic — "not many
 * distinctive visual elements that make Flavor Studio stand out from other
 * modern SaaS websites". The shapes here are the answer: Flavor Studio's own
 * logo is a hexagon divided into six wedges, so the hexagon becomes the site's
 * repeating geometry instead of the usual dot grid and blurred orbs.
 *
 * It also happens to read as a molecule, which is the right register for a
 * food-science platform.
 */

/** Side length of the lattice hexagon, in the pattern's own units. */
const S = 24;
const H = Math.sqrt(3) * S;
const W = 3 * S;

/** One flat-top hexagon, as an SVG path centred on (cx, cy). */
function hexPath(cx: number, cy: number) {
  const p = [
    [cx + S, cy],
    [cx + S / 2, cy + H / 2],
    [cx - S / 2, cy + H / 2],
    [cx - S, cy],
    [cx - S / 2, cy - H / 2],
    [cx + S / 2, cy - H / 2],
  ];
  return `M${p.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join("L")}Z`;
}

/**
 * A tiling hexagon lattice, drawn as an absolutely-positioned backdrop layer.
 * Centres sit at the tile corners plus the middle, which is what makes a
 * 3s × √3s tile repeat seamlessly.
 */
export function HexLattice({
  className = "",
  opacity = 0.5,
  stroke = "rgba(255,255,255,.075)",
  id = "fsHexLattice",
}: {
  className?: string;
  opacity?: number;
  stroke?: string;
  /** Must be unique per instance — two patterns cannot share an id. */
  id?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          width={W}
          height={H}
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <g fill="none" stroke={stroke} strokeWidth="1">
            <path d={hexPath(0, 0)} />
            <path d={hexPath(0, H)} />
            <path d={hexPath(W, 0)} />
            <path d={hexPath(W, H)} />
            <path d={hexPath(W / 2, H / 2)} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * A solid hexagon tile — the site's replacement for the circular icon chip.
 * Used for step numbers and section markers.
 */
export function HexTile({
  children,
  size = 44,
  className = "",
  style,
}: {
  children?: React.ReactNode;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`inline-flex flex-none items-center justify-center ${className}`}
      style={{
        width: size,
        height: size * 0.92,
        clipPath: "polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0% 50%)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
