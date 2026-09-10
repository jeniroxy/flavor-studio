import { AssetFrame } from "@/components/asset-frame";
import { Icon } from "@/components/icon";
import {
  Block,
  SectionHeading,
  SectionLabel,
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
              <div className="text-[11px] font-bold tracking-[.12em] text-slate-400 uppercase">
                {group}
              </div>
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
                        className="flex-none text-[16px] text-blue-500"
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

      {modules.map((mod, i) => {
        const media = (
          <Reveal className="min-w-0">
            <AssetFrame {...mod.asset} />
          </Reveal>
        );
        const copy = (
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[.12em] text-blue-600 uppercase">
              <Icon name={mod.icon} className="text-[16px]" />
              {mod.group}
            </div>
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
                <a
                  href={routes.developers}
                  className="inline-flex items-center gap-2 text-[14px] font-extrabold text-blue-600 hover:text-blue-700"
                >
                  <span>Read the API documentation</span>
                  <Icon name="arrow-right" className="text-[15px]" />
                </a>
              </Reveal>
            )}
          </div>
        );

        return (
          <Block
            key={mod.id}
            id={mod.id}
            className="scroll-mt-[90px] bg-white px-[clamp(28px,3.6vw,64px)] py-[clamp(46px,5.5vw,78px)]"
          >
            <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,4.5vw,64px)]">
              {/* Alternate sides so the page does not read as one long column. */}
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
          </Block>
        );
      })}
    </>
  );
}
