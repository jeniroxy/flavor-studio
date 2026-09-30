import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Container, Headline, Section, TextLink } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The integrations hub (see ChipMarquee below; the name is history). The
 * chips are the systems and formats Flavor Studio connects to (modules.ts
 * "integrations" and "publishing").
 *
 * Audited 2026-09-18. NetSuite, SAP and QuickBooks were removed: none appears
 * in flavorstudio.com's copy, in the application design file, or in the
 * client's review. They came from the ClickUp teardown's sketch of an
 * integrations marquee (docs/research/clickup-pages-analysis.md §Integrations)
 * — a proposal that was read back as fact. Naming a system we do not
 * integrate with is the one claim on this page an integrator would act on, so
 * a chip goes here only when a source names it. Plex stays: the client's
 * review names it. ERP, accounting and the API are the legacy FAQ's own words
 * ("connect any ERP, accounting…"). Drive/Dropbox/OneDrive sit in ROW_B where
 * they belong — they are upload sources on the Recipes screen, not ERPs.
 */
const ROW_A = [
  "REST API",
  "Webhooks",
  "ERP",
  "Plex",
  "Accounting",
  "Plant systems",
  "Standards-based auth",
];
const ROW_B = [
  "USDA SR28",
  "Vendor spec-sheet PDF",
  "CSV / Excel",
  "Word",
  "Read-only PDF",
  "Vector PDF labels",
  "JSON",
  "Encrypted FS format",
  "Google Drive · Dropbox · OneDrive",
  "Print",
];

/* Two dots per wire, half a cycle apart. Under reduced motion the global
   rule stops them and the wire reads as a static line. */
function Wire({ vertical = false }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block flex-none overflow-hidden rounded-full bg-white/20 ${
        vertical ? "mx-auto h-10 w-[2px]" : "h-[2px] w-[clamp(32px,5vw,72px)]"
      }`}
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          className={`absolute size-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(168,221,94,0.8)] ${
            vertical ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2"
          }`}
          style={{
            animation: `${vertical ? "fsWireFlowDown" : "fsWireFlow"} 2.4s linear ${i * 1.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function Chips({ items, align }: { items: string[]; align: "start" | "end" }) {
  return (
    <ul
      className={`m-0 flex list-none flex-wrap gap-2 p-0 ${
        align === "end"
          ? "justify-center lg:justify-end"
          : "justify-center lg:justify-start"
      }`}
    >
      {items.map((c) => (
        <li
          key={c}
          className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[14px] font-semibold text-white backdrop-blur-[2px]"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/*
 * The section as a hub: what Flavor Studio talks to through the API and
 * webhooks on the left, the files and formats that come in and go out on the
 * right, and Flavor Studio in the middle, with data moving along the wires
 * between them. It used to be two marquees sliding under a logo disc, which
 * covered whichever chip passed behind it and said nothing about direction.
 * The chips, headline, lede and link are unchanged.
 */
export function ChipMarquee() {
  return (
    <Section className="py-[clamp(56px,7vw,104px)]">
      <Container>
        <Headline size="lg" className="text-center" tail="you already run">
          Connect Flavor Studio to the systems
        </Headline>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-[16px] leading-[1.6] text-ink-2">
          A full REST API and webhooks over your recipes, ingredients, projects
          and CRM data, plus every export format the recipient could ask for.
        </p>
      </Container>

      <div
        className="mx-auto mt-[clamp(28px,3.5vw,44px)] w-[calc(100%-2*clamp(12px,1.6vw,20px))] max-w-[var(--container)] overflow-hidden rounded-[var(--radius-3xl)] px-[clamp(20px,4vw,56px)] py-[clamp(36px,5vw,64px)]"
        style={{
          backgroundImage:
            "radial-gradient(40% 70% at 50% 50%, rgba(140,209,53,0.22) 0%, rgba(140,209,53,0) 70%), linear-gradient(150deg, #17467f 0%, #2060a6 40%, #1a7f8c 75%, #0f6e5e 100%)",
        }}
      >
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-0">
          <Reveal>
            <p className="mb-3 text-center font-mono text-[12px] tracking-[.08em] text-white/85 uppercase lg:text-right">
              API · Webhooks
            </p>
            <Chips items={ROW_A} align="end" />
          </Reveal>

          <div className="flex flex-col items-center lg:flex-row">
            <span className="lg:hidden">
              <Wire vertical />
            </span>
            <span className="hidden lg:block">
              <Wire />
            </span>
            <span className="relative flex flex-none items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute size-[150px] rounded-full bg-white/10 blur-xl"
              />
              <span className="hex-round relative flex aspect-[1/1.1547] w-[104px] items-center justify-center bg-white">
                <Image
                  src="/assets/logo-mark.png"
                  alt="Flavor Studio"
                  width={116}
                  height={125}
                  className="h-[58px] w-auto"
                />
              </span>
            </span>
            <span className="hidden lg:block">
              <Wire />
            </span>
            <span className="lg:hidden">
              <Wire vertical />
            </span>
          </div>

          <Reveal delay={0.08}>
            <p className="mb-3 text-center font-mono text-[12px] tracking-[.08em] text-white/85 uppercase lg:text-left">
              Import · Export
            </p>
            <Chips items={ROW_B} align="start" />
          </Reveal>
        </div>
      </div>

      <div className="mt-8 text-center">
        <TextLink href={routes.developers}>
          Developers &amp; API reference
        </TextLink>
      </div>
    </Section>
  );
}
