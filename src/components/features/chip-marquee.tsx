import Image from "next/image";
import { Container, Headline, Section, TextLink } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * ClickUp's integrations marquee: two rows of tiles scrolling in opposite
 * directions with the logo overlapping the centre. Ours are text chips for the
 * systems and formats Flavor Studio connects to (modules.ts "integrations" and
 * "publishing"). Pure CSS — the `.marquee` track moves -50% over duplicated
 * content; the global reduced-motion rule stops it.
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

function Row({ chips, reverse }: { chips: string[]; reverse?: boolean }) {
  const list = [...chips, ...chips];
  return (
    <div className="mask-x overflow-hidden py-2">
      <div
        className={`marquee gap-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": "60s" } as React.CSSProperties}
      >
        {list.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="chip"
            aria-hidden={i >= chips.length}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

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
      <div className="marquee-paused relative mt-[clamp(28px,3.5vw,44px)]">
        <Row chips={ROW_A} />
        <Row chips={ROW_B} reverse />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-hairline bg-white shadow-float">
            <Image
              src="/assets/logo-mark.png"
              alt="Flavor Studio"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
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
