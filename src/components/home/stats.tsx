import { HexTile } from "@/components/hex";

/*
 * The facts strip under the hero.
 *
 * This used to be four animated counters — "12,400+ recipes formulated /
 * month", "3.8× faster concept to shelf", "99.2% of labels pass review first
 * try", "40 hrs saved per developer / month". Every one of them was invented,
 * and the file said so in its own header comment. Two of them ("labels pass
 * review", "hours saved") are regulatory and ROI claims that a real company
 * cannot make without evidence, and putting them one screen above seven real,
 * attributed customer testimonials devalued the testimonials by association.
 *
 * What replaced them are four facts that trace to material the client already
 * publishes (see the FAQ content in data.ts). No counters: a big animated
 * number is the trope, and none of these needs one.
 */
const FACTS = [
  {
    lead: "9,000+",
    body: "USDA SR28 ingredients built in, alongside your own",
  },
  {
    lead: "US & Canada",
    body: "FDA and Health Canada compliant nutrition panels",
  },
  {
    lead: "Since 2011",
    body: "Built for food and beverage manufacturers, by Senspire",
  },
  {
    lead: "14 days free",
    body: "Full functionality, every module, no credit card",
  },
];

export function Stats() {
  return (
    <section className="px-[clamp(28px,3.6vw,64px)] py-[clamp(6px,.9vw,12px)]">
      <ul className="mx-auto grid max-w-[1180px] list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-[clamp(24px,3vw,44px)] gap-y-5 p-0">
        {FACTS.map((fact) => (
          <li key={fact.lead} className="flex items-start gap-3">
            <HexTile
              size={10}
              className="mt-[7px]"
              style={{ background: "var(--color-lime-500)" }}
            />
            <div>
              <div className="font-display text-[18px] leading-[1.25] font-extrabold text-slate-800">
                {fact.lead}
              </div>
              <div className="mt-[2px] text-[14px] leading-[1.5] text-slate-500">
                {fact.body}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
