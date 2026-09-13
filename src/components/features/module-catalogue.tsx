import { AssetFrame } from "@/components/asset-frame";
import { FlowPlayer } from "@/components/flow-player";
import { Icon } from "@/components/icon";
import {
  Block,
  Eyebrow,
  SectionHeading,
  SectionLabel,
  TextLink,
} from "@/components/layout-primitives";
import { Reveal, RevealStagger } from "@/components/reveal";
import { modules, moduleGroups } from "@/lib/modules";
import { routes } from "@/lib/routes";

/*
 * The detailed half of the Features page.
 *
 * The studio mosaic above sells the shape of the platform; this sells its
 * substance. Every module gets a screenshot slot, a real description and its
 * full capability list, because the client's core objection was that a visitor
 * could not tell what Flavor Studio actually does from the previous version of
 * this page.
 *
 * Eighteen modules used to be eighteen separate box blocks, each with its own
 * 80px of padding top and bottom — 12,000px of near-identical white boxes.
 * They now share one block, separated by hairlines, which reads as a catalogue
 * rather than a stack of cards and takes a third less scrolling.
 */

function ModuleIndex() {
  return (
    <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(48px,5.5vw,76px)]">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[640px]">
          <SectionLabel>Everything in the platform</SectionLabel>
          <SectionHeading>The complete module catalogue.</SectionHeading>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[62ch] text-[16px] leading-[1.65] text-slate-500"
          >
            Each module stands on its own — unlike an ERP, you can start with
            recipes and labels today and grow into projects, sensory, CRM and
            integrations as you need them. They all read from the same
            ingredient library and the same cost model.
          </Reveal>
        </div>

        <div className="mt-[clamp(30px,3.6vw,44px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-[clamp(20px,2.4vw,36px)] gap-y-[clamp(24px,2.8vw,36px)]">
          {moduleGroups.map((group) => (
            <Reveal key={group}>
              <Eyebrow>{group}</Eyebrow>
              <div className="mt-[14px] flex flex-col gap-[10px]">
                {modules
                  .filter((mod) => mod.group === group)
                  .map((mod) => (
                    <a
                      key={mod.id}
                      href={`#${mod.id}`}
                      className="flex items-center gap-[10px] text-[14px] font-semibold text-slate-700 transition-colors hover:text-blue-600"
                    >
                      <Icon
                        name={mod.icon}
                        className="flex-none text-[16px] text-blue-600"
                      />
                      {mod.label}
                    </a>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Block>
  );
}

export function ModuleCatalogue() {
  return (
    <>
      <ModuleIndex />

      <Block className="bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(16px,2vw,28px)]">
        <div className="mx-auto max-w-[1180px]">
          {modules.map((mod, i) => {
            const media = (
              <Reveal className="min-w-0">
                {mod.flow ? (
                  <FlowPlayer
                    flow={mod.flow}
                    sizes="(max-width: 960px) 100vw, 50vw"
                  />
                ) : (
                  <AssetFrame {...mod.asset} />
                )}
              </Reveal>
            );
            const copy = (
              <div className="min-w-0">
                <Eyebrow>{mod.group}</Eyebrow>
                <Reveal
                  as="h2"
                  delay={0.06}
                  className="font-display mt-3 text-[clamp(24px,2.8vw,36px)] leading-[1.14] font-extrabold tracking-[-0.02em] text-slate-800"
                >
                  {mod.title}
                </Reveal>
                <Reveal
                  as="p"
                  delay={0.1}
                  className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-slate-500"
                >
                  {mod.body}
                </Reveal>
                <RevealStagger
                  stagger={0.04}
                  delay={0.14}
                  className="mt-5 flex flex-col gap-[9px]"
                >
                  {mod.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-[10px] text-[14px] leading-[1.55] text-slate-700"
                    >
                      <Icon
                        name="check-one"
                        className="mt-[3px] flex-none text-[15px] text-[#0e8b73]"
                      />
                      {cap}
                    </div>
                  ))}
                </RevealStagger>
                {mod.id === "integrations" && (
                  <Reveal delay={0.2} className="mt-5">
                    <TextLink href={routes.developers}>
                      Read the API documentation
                    </TextLink>
                  </Reveal>
                )}
              </div>
            );

            return (
              <article
                key={mod.id}
                id={mod.id}
                className={`scroll-mt-[90px] py-[clamp(40px,5vw,64px)] ${
                  i > 0 ? "border-t border-gray-300" : ""
                }`}
              >
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,4.5vw,64px)]">
                  {/* Alternate sides so the page does not read as one long
                      column. */}
                  {i % 2 === 0 ? (
                    <>
                      {media}
                      {copy}
                    </>
                  ) : (
                    <>
                      {copy}
                      {media}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Block>
    </>
  );
}
