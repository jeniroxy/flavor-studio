"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { customerLogos } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/reveal";

/*
 * "Trusted by …" + six monochrome marks, the set rotating every ~8.5s with a
 * blur-in stagger (clickup.com S2). We have eight real marks, so the row
 * shows six and rotates the window by two.
 */

const SHOW = 6;
const MAX_H = 30;
const MAX_W = 110;

const fit = (w: number, h: number) => {
  const s = Math.min(MAX_H / h, MAX_W / w);
  return { width: Math.round(w * s), height: Math.round(h * s) };
};

export function LogoBar({ label = "Trusted by food & beverage teams" }: { label?: string }) {
  const [offset, setOffset] = useState(0);
  const [gen, setGen] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setOffset((o) => (o + 2) % customerLogos.length);
      setGen((g) => g + 1);
    }, 8500);
    return () => window.clearInterval(id);
  }, []);

  const set = Array.from({ length: SHOW }, (_, i) => customerLogos[(offset + i) % customerLogos.length]);

  return (
    <div className="border-b border-hairline">
      <div className="container-wide flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5 md:justify-start">
        <span className="eyebrow eyebrow-muted shrink-0">{label}</span>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 md:w-auto md:flex-1 md:justify-between">
          {set.map((logo, i) => (
            <Image
              key={`${gen}-${logo.name}`}
              src={logo.src}
              alt={logo.name}
              width={logo.w}
              height={logo.h}
              className="object-contain opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
              style={{
                ...fit(logo.w, logo.h),
                animation: `fsLogoEnter .25s var(--ease-out) ${i * 0.05}s both`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
