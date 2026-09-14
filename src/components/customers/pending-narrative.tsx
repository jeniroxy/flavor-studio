import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Eyebrow, TextLink } from "@/components/ui";
import { routes } from "@/lib/routes";

/*
 * The honest placeholder for a case-study act whose narrative has not been
 * ported from the legacy flavorstudio.com story page yet. It keeps the
 * Challenge / Solution / Impact anchors in place so the sticky rail works,
 * and is replaced automatically once `detail.sections` in data.ts has copy.
 */

export function PendingAct({
  id,
  label,
  company,
  lead = false,
}: {
  id: string;
  label: string;
  company: string;
  /** The first act carries the explanatory sentence and the demo link. */
  lead?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-[120px]">
      <Reveal>
        <Eyebrow>{label}</Eyebrow>
      </Reveal>
      <Reveal
        delay={0.05}
        className="mt-4 rounded-[var(--radius-md)] border border-dashed border-[#cfcfcf] bg-white p-6"
      >
        <div className="eyebrow eyebrow-muted flex items-center gap-2 text-[11px]">
          <Icon name="history" className="text-[15px]" />
          Narrative being ported from the legacy page
        </div>
        {lead ? (
          <>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.7] text-ink-2">
              {company} runs on Flavor Studio day to day. The full write-up of
              how they got there — what they were fighting before, how the
              rollout went, and what changed afterwards — is being prepared
              with their team.
            </p>
            <TextLink href={routes.demo} className="mt-5">
              Ask us how {company} uses it, on a 30-minute call
            </TextLink>
          </>
        ) : (
          <p className="mt-3 text-[13px] leading-[1.6] text-ink-3">
            {label} for {company} will appear here once it has been ported.
          </p>
        )}
      </Reveal>
    </section>
  );
}
