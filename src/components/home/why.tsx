import { RevealStagger } from "@/components/reveal";
import { Button, Section } from "@/components/ui";
import { routes, trialLine } from "@/lib/routes";

/*
 * "Why food and beverage teams choose Flavor Studio." — the five reasons from
 * flavorstudio.com, word for word, plus the demo card the design closes the
 * grid with.
 *
 * The copy is the client's and is kept verbatim, so it lives here rather than
 * in `whyPoints` (lib/data.ts): those points were rewritten for v2 and are
 * used by the Enterprise and Customers pages, which should keep them.
 *
 * The section used to sit on white as a hairline grid. The design (node
 * 40000315:32782) puts it on the platform's own navy → sky → teal → lime ramp
 * with the cards floating on top, so the gradient is written from the stops in
 * that file rather than approximated.
 */
const GRADIENT =
  "linear-gradient(90deg, #2060a6 0%, #59a3eb 35%, #18bc9c 65%, #8cd135 100%)";

const REASONS = [
  {
    title: "Comprehensive, cost-effective suite",
    body: "One-stop shop for all product development needs. Do away with multiple, disparate spreadsheets and solutions that do not work well with one another and are not cost effective.",
  },
  {
    title: "Easy and intuitive to use",
    body: "User-friendly interface allows teams to hit the ground running and be productive from the get-go. The result is accelerated product development and time to market.",
  },
  {
    title: "Enhance collaboration",
    body: "Integrated solution and team-based focus facilitates collaboration and visibility to every team member.",
  },
  {
    title: "Anytime, anywhere access",
    body: "Cloud technology allows easy web-based access and ensures users are using the most up-to-date version at all times.",
  },
  {
    title: "Best-in-class customer service",
    body: "Get the best industry support, from sign up to ramp up to on-going use through Flavor Studio’s phone and online channels.",
  },
];

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] bg-white p-6">
      <h3 className="font-display text-[clamp(18px,1.7vw,24px)] leading-[1.25] font-bold tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.6] text-ink-2">{body}</p>
    </div>
  );
}

export function Why() {
  return (
    <Section id="why" className="py-[var(--section-gap)]">
      {/* 1400 wide at the design's 1440 frame — the same inset the closing CTA
          and the AI panel use, not a narrower container. */}
      <div className="px-[clamp(12px,1.6vw,20px)]">
        <div
          className="rounded-[var(--radius-3xl)] px-[clamp(20px,4vw,72px)] py-[clamp(40px,5vw,80px)]"
          style={{ background: GRADIENT }}
        >
          <h2 className="font-display mx-auto max-w-[18ch] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.12] font-bold tracking-[-0.025em] text-white">
            Why food and beverage teams choose Flavor Studio.
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center text-[clamp(15px,1.4vw,18px)] leading-[1.6] text-white/90">
            Where the data comes from, what happens when it changes, and what
            you can publish from it — the specifics behind the platform.
          </p>

          <RevealStagger
            stagger={0.06}
            className="mt-[clamp(28px,3.5vw,48px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {REASONS.map((r) => (
              <Card key={r.title} title={r.title} body={r.body} />
            ))}
            {/* The sixth cell is the demo card the design ends the grid on. */}
            <div className="flex flex-col rounded-[var(--radius-lg)] bg-white p-6">
              <h3 className="font-display text-[clamp(18px,1.7vw,24px)] leading-[1.25] font-bold tracking-[-0.01em] text-ink">
                See it on your own formula.
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-2">
                Thirty minutes, your category, and the modules you would
                actually use.
              </p>
              <div className="mt-auto pt-5">
                <Button href={routes.demo} size="sm" arrow>
                  Request a demo
                </Button>
                <p className="mt-2 text-[12px] leading-[1.4] text-ink-3">
                  {trialLine}
                </p>
              </div>
            </div>
          </RevealStagger>
        </div>
      </div>
    </Section>
  );
}
