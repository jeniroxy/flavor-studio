import { Icon } from "@/components/icon";
import { Reveal, RevealStagger } from "@/components/reveal";
import { Container, Headline, Lede, Section } from "@/components/ui";

/*
 * The problem statement (clickup.com S3): a centred headline whose tail fades
 * to grey, a tangled-cable illustration threading through the tools a
 * formula currently lives in, and three hairline-divided columns naming the
 * cost. ClickUp puts third-party percentages here; we have none we can
 * cite, so each column states the mechanism instead of a number.
 */

const TILES = [
  { icon: "excel-one", label: "Formula.xlsx", x: 6, y: 34 },
  { icon: "file-pdf-one", label: "Supplier spec", x: 19, y: 12 },
  { icon: "mail", label: "RE: RE: label v3", x: 31, y: 44 },
  { icon: "doc-detail", label: "Label tool", x: 47, y: 10 },
  { icon: "calculator-one", label: "Cost model", x: 58, y: 40 },
  { icon: "form-one", label: "Customer form", x: 73, y: 16 },
];

const BUBBLES = [
  { text: "Where's the spec?", x: 70, y: 52 },
  { text: "Which version shipped?", x: 80, y: 30 },
  { text: "Is this claim allowed?", x: 84, y: 70 },
];

const COLUMNS = [
  {
    title: "Context switching",
    body: "The formula in one spreadsheet, the cost in another, the label in a separate tool — none of them aware of the others.",
  },
  {
    title: "Context missing",
    body: "A supplier changes a spec and the label keeps printing the old allergen line, because nothing connects the two.",
  },
  {
    title: "Context stitching",
    body: "Hours retyping the same numbers between tools, then checking them again before anything leaves the building.",
  },
];

export function Problem() {
  return (
    <Section className="py-[var(--section-gap)]">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <Headline size="lg" tail="and the label is lost without it.">
            A formula lives in five places —
          </Headline>
          <Lede className="mx-auto mt-4 max-w-[560px]">
            Spreadsheets, supplier PDFs, email threads and a label tool that never talks to costing.
          </Lede>
        </div>

        <Reveal delay={0.1} className="mt-[clamp(32px,4vw,56px)] overflow-hidden rounded-[16px] border border-hairline bg-panel">
          <div className="relative aspect-[1224/350] min-h-[260px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 1224 350"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M-20 200 C 120 40, 200 320, 330 190 S 520 60, 620 200 S 780 330, 900 160 S 1100 40, 1250 210"
                fill="none"
                stroke="#d9d9d9"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M-20 200 C 120 40, 200 320, 330 190 S 520 60, 620 200 S 780 330, 900 160 S 1100 40, 1250 210"
                fill="none"
                stroke="#59a3eb"
                strokeWidth="3"
                strokeDasharray="8 14"
                strokeLinecap="round"
                style={{ animation: "fsDrawLine 6s linear infinite" }}
              />
            </svg>
            {TILES.map((t, i) => (
              <div
                key={t.label}
                className="absolute flex items-center gap-2 rounded-[10px] border border-hairline bg-white px-3 py-2 text-[12px] font-semibold text-ink shadow-float"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  transform: `rotate(${(i % 2 ? -1 : 1) * (3 + i)}deg)`,
                }}
              >
                <Icon name={t.icon} className="text-[16px] text-blue-700" />
                {t.label}
              </div>
            ))}
            {BUBBLES.map((b) => (
              <div
                key={b.text}
                className="absolute hidden rounded-[14px] rounded-bl-[4px] bg-white px-3 py-2 text-[13px] text-ink-2 shadow-float md:block"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
              >
                {b.text}
              </div>
            ))}
          </div>
          <RevealStagger stagger={0.08} className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-3">
            {COLUMNS.map((c) => (
              <div key={c.title} className="bg-panel p-6">
                <div className="font-display text-[20px] font-bold text-ink">{c.title}</div>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{c.body}</p>
              </div>
            ))}
          </RevealStagger>
        </Reveal>
      </Container>
    </Section>
  );
}
