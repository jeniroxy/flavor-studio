"use client";

import Link from "next/link";
import { Icon, SparkIcon } from "@/components/icon";
import { PillTabs } from "@/components/pill-tabs";
import { Button, CheckList, Eyebrow } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { AgentSkill, UseCase } from "@/lib/solutions";

/*
 * The use-case suite — ClickUp's "Agent Suites" tab block on a department page
 * and the homepage teams tabs: dashed pills, then a rounded panel with the
 * outcome headline, "REPLACES" row, three checks and, on the right, four agent
 * cards. Our agent cards say what the AI Agent does for this team and are
 * worded as answers and drafts, because that is all it does.
 */

export type ModuleRef = { id: string; label: string; icon: string };

export function UseCaseSuite({
  useCases,
  agentSkills,
  replaces,
  moduleIndex,
}: {
  useCases: UseCase[];
  agentSkills: AgentSkill[];
  replaces: string[];
  /** Module id → label/icon, resolved on the server so this stays light. */
  moduleIndex: Record<string, ModuleRef>;
}) {
  return (
    <PillTabs
      tabs={useCases}
      render={(u) => (
        <div className="panel mt-8 rounded-[var(--radius-2xl)] p-[clamp(22px,4vw,56px)]">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <h3 className="font-display text-[clamp(26px,2.9vw,40px)] leading-[1.15] font-bold tracking-[-0.03em]">
                {u.title} <span className="tail">{u.tail}</span>
              </h3>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                {u.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Eyebrow tone="muted" as="span" className="mr-1">
                  Replaces
                </Eyebrow>
                {replaces.map((r) => (
                  <span key={r} className="chip normal-case tracking-normal">
                    {r}
                  </span>
                ))}
              </div>

              <CheckList items={u.checks} className="mt-5" />

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Eyebrow tone="muted" as="span" className="mr-1">
                  Modules
                </Eyebrow>
                {u.modules.map((id) => {
                  const m = moduleIndex[id];
                  if (!m) return null;
                  return (
                    <Link
                      key={id}
                      href={routes.feature(id)}
                      className="inline-flex items-center gap-1.5 rounded-[6px] bg-white px-2 py-1 text-[13px] font-semibold text-ink transition-colors hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Icon name={m.icon} className="text-[15px]" />
                      {m.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {agentSkills.map((s) => (
                <div
                  key={s.text}
                  className="flex items-center gap-3 rounded-[12px] border border-hairline bg-white p-4 shadow-[0_2px_10px_rgba(16,30,54,.05)]"
                >
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-[18px] text-[#5c8f1c]">
                    <Icon name={s.icon} />
                    <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink">
                      <SparkIcon size={9} />
                    </span>
                  </span>
                  <span className="text-[14px] leading-[1.45] text-ink">
                    {s.text}
                  </span>
                </div>
              ))}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button href={routes.demo} size="sm" arrow>
                  Request a demo
                </Button>
                <Button href={routes.agent} size="sm" variant="secondary">
                  About the AI Agent
                </Button>
              </div>
              <p className="text-[12px] leading-[1.5] text-ink-3">
                The Agent answers and drafts. A developer approves anything that
                changes a recipe.
              </p>
            </div>
          </div>
        </div>
      )}
    />
  );
}
