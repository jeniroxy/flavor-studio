import Image from "next/image";
import { DemoForm, type FormIntent } from "@/components/contact/demo-form";
import { Reveal, RevealStagger } from "@/components/reveal";
import { customerLogos, testimonials } from "@/lib/data";
import { phone, phoneHref, routes, supportEmail } from "@/lib/routes";

/*
 * ClickUp's contact-sales split screen: a gradient panel on the left with the
 * pitch, logo tiles and social proof; a white panel on the right with the
 * form. Both /request-demo and /contact render it — only the intent differs.
 *
 * The facts on the left are the four the blueprint allows us to state.
 */

const FACTS = [
  { value: "9,000+", label: "USDA SR28 ingredients built in" },
  { value: "US & Canada", label: "FDA and Health Canada panels" },
  { value: "Since 2011", label: "Building tools for food & beverage R&D" },
  { value: "14 days free", label: "Full functionality, no credit card" },
];

const HEAD: Record<FormIntent, { title: string; sub: string }> = {
  demo: {
    title: "Talk with our team",
    sub: "Request a free 1:1 demo on your own formulas — bring a recipe and we’ll formulate, cost and label it live.",
  },
  contact: {
    title: "Send us a message",
    sub: "A question about label formats, integrations or your account — we reply within one business day.",
  },
};

const fit = (w: number, h: number, maxH = 30, maxW = 100) => {
  const s = Math.min(maxH / h, maxW / w);
  return { width: Math.round(w * s), height: Math.round(h * s) };
};

export function ContactSplit({ intent }: { intent: FormIntent }) {
  const head = HEAD[intent];
  const quote = testimonials[1];

  return (
    <div className="grid lg:min-h-[calc(100vh-var(--nav-height))] lg:grid-cols-2">
      {/* -------------------------------------------------------- left */}
      <div
        className="noise relative overflow-hidden text-white"
        style={{ background: "var(--grad-banner)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/3 right-[-20%] h-[120%] w-[60%] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(140,209,53,.5), rgba(89,163,235,0))",
            animation: "fsGlowDrift 16s ease-in-out infinite",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[560px] flex-col px-[clamp(24px,4vw,56px)] py-[clamp(48px,6vw,80px)]">
          <Reveal>
            <Image
              src="/assets/logo-light-text.svg"
              alt="Flavor Studio"
              width={160}
              height={32}
              className="h-7 w-auto"
            />
          </Reveal>
          <Reveal
            as="h1"
            delay={0.05}
            className="font-display mt-8 text-[clamp(28px,3vw,38px)] leading-[1.15] font-bold tracking-[-0.025em] text-white"
          >
            All of your product data in one place: recipes, costs, labels, specs
            &amp; more.
          </Reveal>

          <RevealStagger
            stagger={0.06}
            delay={0.1}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-white/15 bg-white/15"
          >
            {FACTS.map((f) => (
              <div
                key={f.value}
                className="bg-[#0d1524]/60 p-4 backdrop-blur-sm"
              >
                <div className="font-display text-[22px] leading-none font-bold tracking-[-0.02em] text-white">
                  {f.value}
                </div>
                <div className="mt-2 text-[12px] leading-[1.4] text-white/75">
                  {f.label}
                </div>
              </div>
            ))}
          </RevealStagger>

          <RevealStagger
            stagger={0.05}
            delay={0.15}
            className="mt-6 grid grid-cols-3 gap-2"
          >
            {customerLogos.slice(0, 6).map((logo) => (
              <div
                key={logo.name}
                className="flex h-16 items-center justify-center rounded-[10px] bg-white/90 px-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain grayscale"
                  style={fit(logo.w, logo.h, 34, 110)}
                />
              </div>
            ))}
          </RevealStagger>

          <Reveal delay={0.2} className="mt-auto pt-10">
            <blockquote className="border-l-2 border-lime-400 pl-4">
              <p className="text-[15px] leading-[1.6] text-white/90">
                {quote.quote}
              </p>
              <footer className="mt-3 flex items-center gap-3">
                <Image
                  src={quote.photo}
                  alt={quote.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="text-[13px] leading-[1.35]">
                  <div className="font-semibold text-white">{quote.name}</div>
                  <div className="text-white/70">{quote.role}</div>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------- right */}
      <div className="bg-white">
        <div className="mx-auto max-w-[560px] px-[clamp(24px,4vw,56px)] py-[clamp(48px,6vw,80px)]">
          <div className="text-center">
            <Reveal
              as="h2"
              className="font-display text-[clamp(30px,3.2vw,44px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink"
            >
              {head.title}
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-ink-2"
            >
              {head.sub}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-2 text-[14px] text-ink-2">
              Looking for support?{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="font-medium text-ink underline underline-offset-[3px]"
              >
                Contact support instead
              </a>
              .
            </Reveal>
          </div>

          <Reveal delay={0.1} className="panel mt-8 p-[clamp(20px,2.6vw,32px)]">
            <DemoForm intent={intent} />
          </Reveal>

          <Reveal
            delay={0.14}
            className="mt-6 text-center text-[13px] text-ink-2"
          >
            Prefer to talk?{" "}
            <a href={phoneHref} className="font-semibold text-ink">
              {phone}
            </a>
            {intent === "demo" ? (
              <>
                {" "}
                · General enquiry?{" "}
                <a href={routes.contact} className="font-semibold text-ink">
                  Contact us
                </a>
              </>
            ) : (
              <>
                {" "}
                · Want to see the platform?{" "}
                <a href={routes.demo} className="font-semibold text-ink">
                  Request a demo
                </a>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
