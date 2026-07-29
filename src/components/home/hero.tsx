import Image from "next/image";
import { Icon } from "@/components/icon";
import { HeroBackdrop } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { WalkthroughCard } from "@/components/home/walkthrough-card";
import { routes } from "@/lib/routes";

/*
 * The landing hero. Height is budgeted so the hero block *and* the customer
 * logo row below it both land inside the first screen — the user asked for the
 * hero to fill 100vh, then for the logos to stay visible too.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-clip rounded-[clamp(20px,2vw,30px)]"
      style={{
        minHeight:
          "calc(100vh - var(--nav-height) - clamp(32px, 4.4vw, 68px) - clamp(96px, 10vh, 132px))",
      }}
    >
      <HeroBackdrop angle={165} />

      {/* Faint food vignette in the lower-left — warmth behind the type without
          touching legibility. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-70px] left-[-70px] h-[420px] w-[420px] overflow-hidden rounded-full opacity-20"
        style={{
          filter: "blur(1px) saturate(1.15)",
          maskImage:
            "radial-gradient(circle at 40% 60%, #000 12%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(circle at 40% 60%, #000 12%, transparent 68%)",
        }}
      >
        <Image
          src="/assets/food-1.png"
          alt=""
          width={1024}
          height={783}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(36px,5vw,64px)] px-[clamp(28px,3.6vw,64px)] pt-[clamp(56px,7vw,100px)] pb-[clamp(56px,7vw,96px)]">
        <div>
          <Reveal
            as="a"
            href="#sous"
            className="inline-flex items-center gap-[10px] rounded-full border border-white/[.16] bg-white/[.07] py-[6px] pr-4 pl-[6px] text-[13.5px] font-semibold text-[#dfe5ee] transition-[border-color,transform] duration-[180ms] hover:-translate-y-px hover:border-white/50 hover:text-white"
          >
            <span className="rounded-full bg-linear-to-r from-blue-500 to-teal-500 px-3 py-[5px] text-[11px] font-extrabold tracking-[.08em] text-white">
              NEW
            </span>
            <span>Meet the AI Agent — built into the platform</span>
            <Icon name="arrow-right" className="text-[14px] text-slate-300" />
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="font-display mt-6 text-[clamp(42px,5.4vw,72px)] leading-[1.05] font-extrabold tracking-[-0.025em] text-white"
          >
            Own your formula, from{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(96deg, var(--color-lime-500) 0%, #4fd8bd 48%, var(--color-blue-400) 100%)",
              }}
            >
              idea to shelf.
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.16}
            className="mt-[22px] max-w-[52ch] text-[clamp(16px,1.5vw,19px)] leading-[1.65] text-[#aebdd0]"
          >
            The unified platform for food &amp; beverage product development —
            recipes, nutrition, labeling, projects and CRM, with an AI Agent
            that does the heavy lifting alongside you.
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-8 flex flex-wrap items-center gap-[14px]"
          >
            <a
              href={routes.contact}
              className="relative inline-block overflow-hidden rounded-full bg-[#7fd234] px-[34px] py-4 text-[16px] font-extrabold whitespace-nowrap text-[#16223a] shadow-[0_12px_30px_rgba(127,210,52,.3)] transition-[background,transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:bg-[#8ede40] hover:shadow-[0_18px_40px_rgba(127,210,52,.42)]"
            >
              Request a demo
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 h-full w-2/5"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 100%)",
                  animation: "fsSheen 3.4s ease-in-out infinite",
                }}
              />
            </a>
            <a
              href="#product"
              className="rounded-full border border-white/[.14] bg-white/[.07] px-[30px] py-[15px] text-[16px] font-bold whitespace-nowrap text-white transition-[background] duration-[180ms] hover:bg-white/[.14]"
            >
              Explore the platform
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <WalkthroughCard />
        </Reveal>
      </div>
    </section>
  );
}
