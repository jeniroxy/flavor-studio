"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Icon } from "@/components/icon";
import {
  Block,
  LimeButton,
  SectionHeading,
  SectionLabel,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import { whyPoints } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * "Why Flavor Studio" — the five points from flavorstudio.com, laid out
 * Corsearch-style: pitch on the left, points stacked on the right, hairline
 * between each. Icons bounce in one at a time.
 */
export function Why() {
  const section = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = section.current;
      if (!box || prefersReducedMotion()) return;
      const icons = box.querySelectorAll("[data-whyicon]");
      observeOnce(box, () => {
        gsap.from(icons, {
          scale: 0.55,
          duration: 0.6,
          ease: "back.out(2.2)",
          stagger: 0.11,
          delay: 0.12,
        });
      });
    },
    { scope: section },
  );

  return (
    <Block
      id="why"
      className="px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,80px)]"
      style={{
        background:
          "linear-gradient(165deg, #253349 0%, #2b3d59 38%, #223047 78%, #1e2a3e 100%)",
      }}
    >
      <div
        ref={section}
        className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(32px,4vw,64px)]"
      >
        <div>
          <SectionLabel tone="dark">Why Flavor Studio</SectionLabel>
          <SectionHeading tone="dark">
            Why teams choose Flavor Studio.
          </SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[46ch] text-[16px] leading-[1.7] text-slate-300"
          >
            Everything is seamlessly integrated in an intuitive, cloud-based
            platform with 24/7 accessibility — so your team develops better food
            and beverage products, faster.
          </Reveal>
          <Reveal delay={0.18} className="mt-[30px] flex flex-wrap gap-3">
            <LimeButton
              href={routes.contact}
              className="px-[30px] py-[14px] text-[15.5px]"
            >
              Request a demo
            </LimeButton>
            <a
              href={routes.features}
              className="rounded-full border border-white/[.14] bg-white/[.07] px-7 py-[14px] text-[15.5px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.14]"
            >
              Explore features
            </a>
          </Reveal>
        </div>

        <RevealStagger stagger={0.11}>
          {whyPoints.map((point, i) => (
            <div
              key={point.title}
              className={`mx-[clamp(-16px,-1.2vw,-10px)] flex items-start gap-[18px] rounded-2xl px-[clamp(10px,1.2vw,16px)] py-[clamp(22px,2.6vw,32px)] transition-[background] duration-200 hover:bg-white/[.045] ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              <span
                data-whyicon=""
                className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[13px] border border-white/10 bg-white/[.07]"
              >
                <Icon name={point.icon} className="text-[22px] text-lime-400" />
              </span>
              <div>
                <div className="text-[17px] leading-[1.3] font-extrabold text-white">
                  {point.title}
                </div>
                <p className="mt-[7px] text-[14.5px] leading-[1.65] text-pretty text-slate-300">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </Block>
  );
}
