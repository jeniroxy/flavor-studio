import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

/*
 * The solutions hub hero: ClickUp's /teams page floats role bubbles
 * ("Designer", "Sales Ops") around the headline over soft colour blobs. Ours
 * are the roles that actually use Flavor Studio, on one slow orbit — the ring
 * turns, each bubble counter-turns so its label stays upright. Pure CSS on the
 * existing fsSpin keyframe; under reduced motion the ring simply holds.
 */

const ROLES = [
  { label: "R&D chef", icon: "chef-hat-one" },
  { label: "Regulatory lead", icon: "doc-detail" },
  { label: "Procurement", icon: "calculator-one" },
  { label: "Account manager", icon: "peoples" },
  { label: "Sensory panel lead", icon: "experiment" },
  { label: "Founder", icon: "flag" },
  { label: "Food scientist", icon: "microscope" },
  { label: "Dietician", icon: "scale-one" },
];

const PERIOD = "110s";

export function OrbitHero({ children }: { children: ReactNode }) {
  const radius = 46; // % of the ring box
  return (
    <div className="relative overflow-hidden">
      {/* colour blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-[-8%] h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #deedfb, rgba(222,237,251,0))",
          animation: "fsGlowDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] bottom-[-20%] h-[460px] w-[460px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #f1f8e2, rgba(241,248,226,0))",
          animation: "fsGlowDrift 22s ease-in-out infinite reverse",
        }}
      />

      {/* the orbit — desktop only, it would collide with the copy below 1024px */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <div
          className="absolute inset-[6%] rounded-full border border-dashed border-hairline"
          style={{ animation: `fsSpin ${PERIOD} linear infinite` }}
        />
        <div
          className="absolute inset-[22%] rounded-full border border-hairline"
          style={{ animation: `fsSpin ${PERIOD} linear infinite reverse` }}
        />
        <div
          className="absolute inset-0"
          style={{ animation: `fsSpin ${PERIOD} linear infinite` }}
        >
          {ROLES.map((role, i) => {
            const a = (i / ROLES.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * radius;
            const y = 50 + Math.sin(a) * radius;
            return (
              <div
                key={role.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className="flex items-center gap-2 rounded-full border border-hairline bg-white py-1.5 pr-3 pl-1.5 shadow-float"
                  style={{
                    animation: `fsSpin ${PERIOD} linear infinite reverse`,
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[16px] text-blue-700">
                    <Icon name={role.icon} />
                  </span>
                  <span className="text-[12px] font-semibold whitespace-nowrap text-ink">
                    {role.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
