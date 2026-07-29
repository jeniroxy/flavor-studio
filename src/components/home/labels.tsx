"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";

/* The Nutrition Facts panel draws itself line by line, with a scan line
   sweeping down it on a loop. */
const LABEL_ROWS: {
  left: React.ReactNode;
  right?: React.ReactNode;
  className: string;
}[] = [
  {
    left: "Nutrition Facts",
    className: "text-[27px] font-black leading-none tracking-[-0.01em]",
  },
  {
    left: "8 servings per container",
    className: "border-b border-black py-1 text-[12.5px]",
  },
  {
    left: "Serving size",
    right: "1 bar (52g)",
    className:
      "flex justify-between border-b-[10px] border-black py-[3px] text-[13px] font-extrabold",
  },
];

export function Labels() {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = panel.current;
      if (!box || prefersReducedMotion()) return;
      const rows = box.querySelectorAll("[data-lrow]");
      gsap.set(rows, { opacity: 0, x: -14 });
      observeOnce(box, () => {
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.09,
        });
      });
    },
    { scope: panel },
  );

  return (
    <Block
      id="labels"
      className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(60px,7vw,100px)]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <Reveal className="flex justify-center">
          <div
            ref={panel}
            className="relative w-[min(320px,100%)] rounded-[4px] border-2 border-black bg-white px-4 py-[14px] font-[Helvetica,Arial,sans-serif] text-black shadow-[0_20px_50px_rgba(43,59,83,.14)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[4%] left-[4%] h-[3px] rounded-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(89,163,235,0), rgba(89,163,235,.85), rgba(89,163,235,0))",
                animation: "fsScan 4.5s ease-in-out infinite",
              }}
            />
            {LABEL_ROWS.map((row, i) => (
              <div key={i} data-lrow="" className={row.className}>
                <span>{row.left}</span>
                {row.right && <span>{row.right}</span>}
              </div>
            ))}
            <div data-lrow="" className="pt-[5px] text-[11px] font-bold">
              Amount per serving
            </div>
            <div
              data-lrow=""
              className="flex items-end justify-between border-b-[5px] border-black pb-[2px]"
            >
              <span className="text-[20px] font-black">Calories</span>
              <span className="text-[30px] font-black">210</span>
            </div>
            <div
              data-lrow=""
              className="border-b border-black py-[3px] text-right text-[10.5px] font-bold"
            >
              % Daily Value*
            </div>
            {[
              { name: "Total Fat", amount: "9g", dv: "12%", indent: false },
              { name: "Saturated Fat", amount: "1.5g", dv: "8%", indent: true },
              { name: "Sodium", amount: "105mg", dv: "5%", indent: false },
              {
                name: "Total Carbohydrate",
                amount: "28g",
                dv: "10%",
                indent: false,
              },
              { name: "Dietary Fiber", amount: "4g", dv: "14%", indent: true },
            ].map((row) => (
              <div
                key={row.name}
                data-lrow=""
                className={`flex justify-between border-b border-black py-[3px] text-[12.5px] ${
                  row.indent ? "pl-[14px]" : ""
                }`}
              >
                <span>
                  {row.indent ? (
                    <>
                      {row.name} {row.amount}
                    </>
                  ) : (
                    <>
                      <strong>{row.name}</strong> {row.amount}
                    </>
                  )}
                </span>
                <strong>{row.dv}</strong>
              </div>
            ))}
            <div
              data-lrow=""
              className="flex justify-between border-b-4 border-black py-[3px] text-[12.5px]"
            >
              <span>
                <strong>Protein</strong> 6g
              </span>
              <span />
            </div>
            <div
              data-lrow=""
              className="pt-[5px] text-[10px] leading-[1.4] text-[#333]"
            >
              *The % Daily Value tells you how much a nutrient in a serving
              contributes to a daily diet. 2,000 calories a day is used for
              general nutrition advice.
            </div>
          </div>
        </Reveal>

        <div>
          <SectionLabel>Labeling &amp; compliance</SectionLabel>
          <SectionHeading>
            Compliant labels, generated in seconds.
          </SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[50ch] text-[16px] leading-[1.65] text-slate-500"
          >
            The moment your formula changes, the label follows — FDA 2016
            format, Canadian bilingual, supplement facts and ingredient
            statements, all print-ready.
          </Reveal>

          <RevealStagger
            stagger={0.08}
            delay={0.18}
            className="mt-6 flex flex-wrap gap-[10px]"
          >
            {[
              {
                text: "FDA 2016 format",
                cls: "bg-blue-200 text-blue-700",
              },
              { text: "CFIA bilingual", cls: "bg-teal-100 text-[#0e8b73]" },
              {
                text: "Big-9 allergen rules",
                cls: "bg-amber-100 text-[#a97d17]",
              },
              {
                text: "Nutrient content claims",
                cls: "bg-violet-100 text-violet-500",
              },
            ].map((chip) => (
              <span
                key={chip.text}
                className={`inline-flex items-center gap-[7px] rounded-full px-[15px] py-2 text-[12.5px] font-bold ${chip.cls}`}
              >
                <Icon name="check-one" className="text-[14px]" />
                {chip.text}
              </span>
            ))}
          </RevealStagger>

          <Reveal
            as="p"
            delay={0.24}
            className="mt-[22px] text-[14.5px] leading-[1.6] text-slate-500"
          >
            The AI Agent checks every claim against the CFR before you print —{" "}
            <strong className="font-bold text-slate-800">
              99.2% of labels pass review first try.
            </strong>
          </Reveal>
        </div>
      </div>
    </Block>
  );
}
