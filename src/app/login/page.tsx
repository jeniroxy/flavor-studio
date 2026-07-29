import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import {
  Block,
  HeroBackdrop,
  SectionLabel,
} from "@/components/layout-primitives";
import { SignInCard } from "@/components/login/sign-in-card";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Flavor Studio workspace.",
};

/*
 * Login is its own page rather than the demo-request form — the two used to
 * point at the same place, so anyone clicking Login landed on a sales form.
 */
export default function LoginPage() {
  return (
    <PageShell fill>
      <Block className="relative flex flex-1 items-center px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,6vw,84px)]">
        <HeroBackdrop />
        <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(28px,3.4vw,56px)]">
          <div className="min-w-0">
            <SectionLabel tone="dark">Customer login</SectionLabel>
            <Reveal
              as="h1"
              delay={0.06}
              className="font-display mt-[18px] max-w-[18ch] text-[clamp(32px,4.2vw,52px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-white"
            >
              Welcome back to your workspace.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-4 max-w-[46ch] text-[clamp(15px,1.4vw,17px)] leading-[1.65] text-[#aebdd0]"
            >
              Sign in to pick up your formulas, taste tests and labels exactly
              where you left them.
            </Reveal>
            <Reveal delay={0.18} className="mt-[26px] flex flex-col gap-[11px]">
              <div className="flex items-center gap-[10px] text-[14px] text-slate-300">
                <Icon
                  name="lock"
                  className="flex-none text-[17px] text-lime-400"
                />
                SOC 2 Type II, encrypted in transit and at rest
              </div>
              <div className="flex items-center gap-[10px] text-[14px] text-slate-300">
                <Icon
                  name="key-one"
                  className="flex-none text-[17px] text-lime-400"
                />
                SSO available on Enterprise plans
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="min-w-0">
            <div className="rounded-[clamp(18px,1.8vw,24px)] bg-white p-[clamp(26px,3vw,38px)] shadow-[0_28px_70px_rgba(0,0,0,.34)]">
              <SignInCard />
            </div>
          </Reveal>
        </div>
      </Block>
    </PageShell>
  );
}
