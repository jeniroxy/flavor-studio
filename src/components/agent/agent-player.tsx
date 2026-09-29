"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { productAssets } from "@/lib/assets";
import { observeOnce, prefersReducedMotion } from "@/lib/reveal";
import {
  COMPARE_ANSWER,
  DISCLAIMER,
  LIST_ANSWER,
  STARTERS,
  WHATIF_ANSWER,
  type Source,
  type StarterKind,
} from "./agent-data";

/*
 * The hero: the real Recipe page with the AI Agent panel docked over its
 * right edge, as the product draws it (Figma 8035:30189, "AI Agent on Recipe
 * page"), replaying the three starters the panel ships with. Each replay runs
 * the flow the design lays out: the question is typed, sent, the Agent
 * thinks, ticks its steps, builds the answer and opens its sources.
 *
 * It is a recording, not a chat. The client ruled out anything public that
 * reaches their AI, so nothing here is sent anywhere, and the page says so.
 *
 * Motion, each with a job:
 * - the replay itself, which is the point of the section;
 * - the aurora brightens while the Agent is thinking, so the wait reads;
 * - the flow card's bar fills with the replay, so you know how far along it is.
 * Until someone picks a flow, the three play in turn. Pause stops it, a pick
 * stops the cycling, and under reduced motion every answer is shown finished.
 */

type Flow = StarterKind;
const ORDER: Flow[] = ["list", "compare", "whatif"];

const QUESTIONS: Record<Flow, string> = {
  list: LIST_ANSWER.question,
  compare: COMPARE_ANSWER.question,
  whatif: WHATIF_ANSWER.question,
};
const STEPS: Record<Flow, string[]> = {
  list: LIST_ANSWER.steps,
  compare: [],
  whatif: WHATIF_ANSWER.steps,
};
const COUNTS: Record<Flow, number> = {
  list: LIST_ANSWER.stepCount,
  compare: COMPARE_ANSWER.stepCount,
  whatif: WHATIF_ANSWER.stepCount,
};

/*
 * Stages: 0 welcome · 1 typing · 2 sent · 3 thinking · 4.. one per step ·
 * then summary, answer, sources, done.
 */
const stagesOf = (f: Flow) => {
  const steps = STEPS[f].length;
  const summary = 4 + steps;
  return { summary, answer: summary + 1, sources: summary + 2, done: summary + 3 };
};

const HOLD: Record<string, number> = {
  welcome: 1100,
  sent: 650,
  thinking: 1300,
  step: 600,
  summary: 700,
  answer: 2300,
  sources: 2600,
  done: 3800,
};
const TYPE_MS = 24;

const APP = "font-['Avenir_Next',var(--font-mulish),sans-serif]";
const UP = "text-[#b42318]";
const DOWN = "text-[#067a33]";

/** Fades a block in, holding no space until it is shown. */
function In({
  show,
  delay = 0,
  children,
  className = "",
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  if (!show) return null;
  return (
    <div
      className={className}
      style={{ animation: `fsPopIn .38s var(--ease-out) ${delay}ms both` }}
    >
      {children}
    </div>
  );
}

function Tick() {
  return <Icon name="check" className="text-[13px] text-[#8cd135]" />;
}

function SourceList({ sources }: { sources: Source[] }) {
  return (
    <div className="mt-3 rounded-[12px] border border-[#e9e9e9] bg-white p-3 shadow-float">
      <div className="mb-2 flex items-center justify-between text-[12.5px] font-bold">
        {sources.length} Sources
        <Icon name="close" className="text-[12px] text-slate-500" />
      </div>
      <ul className="flex list-none flex-col gap-2.5 p-0">
        {sources.map((s, i) => (
          <li
            key={s.title}
            className="flex gap-2.5"
            style={{ animation: `fsPopIn .3s var(--ease-out) ${i * 90}ms both` }}
          >
            <span className="flex size-7 flex-none items-center justify-center rounded-[6px] bg-[#f3f3f6] text-slate-600">
              <Icon name="file-text" className="text-[13px]" />
            </span>
            <span>
              <span className="block text-[12.5px] font-bold">{s.title}</span>
              <span className="block text-[11.5px] leading-[1.4] text-slate-600">
                {s.desc}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------- answers */

function ListBody({ stage, f }: { stage: number; f: Flow }) {
  const s = stagesOf(f);
  return (
    <>
      <In show={stage >= s.summary}>
        <p className="mt-3 text-[13px] leading-[1.5]">
          Here are the <b>13 ingredients</b> categorized as starches with{" "}
          <b>no soy allergen</b> declared, grouped by type:
        </p>
      </In>
      <In show={stage >= s.answer}>
        {LIST_ANSWER.groups.map((g, gi) => (
          <div key={g.name} className="mt-3">
            <div className="text-[11.5px] font-bold">
              {g.name}{" "}
              <span className="font-semibold text-slate-600">· {g.items.length}</span>
            </div>
            <ul className="mt-1 list-none p-0">
              {g.items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-3 border-b border-[#eef1f3] py-1 text-[12.5px] last:border-0"
                  style={{
                    animation: `fsPopIn .3s var(--ease-out) ${gi * 260 + i * 70}ms both`,
                  }}
                >
                  {item}
                  <span className="rounded-[4px] bg-amber-100 px-1.5 text-[10.5px] font-semibold">
                    {g.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </In>
      <In show={stage >= s.sources}>
        <span className="mt-3 inline-flex rounded-[8px] border border-blue-600 px-3 py-1.5 text-[12.5px] font-bold text-blue-600 ring-4 ring-blue-100">
          Show 13 Ingredients
        </span>
      </In>
    </>
  );
}

function CompareBody({ stage, f }: { stage: number; f: Flow }) {
  const s = stagesOf(f);
  const a = COMPARE_ANSWER;
  return (
    <>
      <In show={stage >= s.summary}>
        <p className="mt-3 text-[13px] leading-[1.5]">
          Nutrition for Recipe A and Recipe B per 40g serving. Highlighted rows
          show biggest gaps:
        </p>
      </In>
      <In show={stage >= s.answer}>
        <div className="mt-2.5 overflow-hidden rounded-[8px] border border-[#e9e9e9] text-[12.5px]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-blue-600 px-2.5 py-1.5 font-bold text-white">
            <span>Nutrient</span>
            <span>Recipe A</span>
            <span>Recipe B</span>
          </div>
          {a.rows.map((r, i) => (
            <div
              key={r.nutrient}
              className={`grid grid-cols-[1.4fr_1fr_1fr] border-t border-[#eef1f3] px-2.5 py-1 ${r.gap ? "bg-lime-100" : ""}`}
              style={{ animation: `fsPopIn .28s var(--ease-out) ${i * 110}ms both` }}
            >
              <span className="font-semibold">{r.nutrient}</span>
              <span className={r.gap ? `font-bold ${DOWN}` : ""}>{r.a}</span>
              <span>{r.b}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] text-slate-600">
          Recipe A is <b className="text-slate-800">Protein Brownie v3</b> ·
          Recipe B is <b className="text-slate-800">Classic Fudge</b>
        </p>
        <p className="mt-1 text-[13px] font-semibold">{a.summary}</p>
      </In>
      <In show={stage >= s.sources}>
        <SourceList sources={a.sources} />
      </In>
    </>
  );
}

function WhatIfBody({ stage, f }: { stage: number; f: Flow }) {
  const s = stagesOf(f);
  const a = WHATIF_ANSWER;
  return (
    <>
      <In show={stage >= s.summary}>
        <p className="mt-3 text-[13px] leading-[1.5]">
          Raising protein from <b>8g to 10g</b> increases your whey isolate
          (the priciest input). Here&rsquo;s the raw-material impact:
        </p>
      </In>
      <In show={stage >= s.answer}>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {a.tiles.map((t) => (
            <div key={t.label} className="rounded-[10px] border border-[#e9e9e9] p-2.5">
              <div className="text-[9.5px] font-bold tracking-[.05em] text-slate-600 uppercase">
                {t.label}
              </div>
              <div className="mt-0.5 text-[16px] leading-[1.25] font-bold">
                {t.from} → {t.to}
              </div>
              <div className={`text-[11px] font-semibold ${UP}`}>{t.delta}</div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 text-[12.5px]">
          {a.materials.map((m, i) => (
            <div
              key={m.item}
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-1 border-b border-[#eef1f3] py-1.5"
              style={{ animation: `fsPopIn .28s var(--ease-out) ${300 + i * 160}ms both` }}
            >
              <span className="font-semibold">{m.item}</span>
              <span className="text-slate-600">{m.now}</span>
              <span>{m.next}</span>
              <span className={`text-right font-bold ${m.up ? UP : DOWN}`}>{m.delta}</span>
            </div>
          ))}
          <div
            className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-1 py-1.5 font-bold"
            style={{ animation: "fsPopIn .28s var(--ease-out) 700ms both" }}
          >
            <span>Total/batch</span>
            <span className="font-normal text-slate-600">{a.total.now}</span>
            <span>{a.total.next}</span>
            <span className="text-right">{a.total.delta}</span>
          </div>
        </div>
        <p className="mt-1 text-[11px] leading-[1.45] text-slate-600">{a.assumptions}</p>
      </In>
      <In show={stage >= s.sources}>
        <SourceList sources={a.sources} />
      </In>
    </>
  );
}

/* ------------------------------------------------------------ player */

export function AgentPlayer() {
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<Flow>("compare");
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(true);
  const [still, setStill] = useState(false);

  const s = stagesOf(flow);
  const question = QUESTIONS[flow];

  // Start when the scene is first seen; reduced motion shows answers finished.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    observeOnce(el, () => {
      if (prefersReducedMotion()) {
        setStill(true);
        setStage(stagesOf("compare").done);
        return;
      }
      setStarted(true);
    });
  }, []);

  // The script: one timer per stage; typing runs inside stage 1.
  useEffect(() => {
    if (!started || !playing || still) return;
    let t: ReturnType<typeof setTimeout>;
    if (stage === 1) {
      if (typed < question.length) {
        t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setStage(2), 300);
      }
      return () => clearTimeout(t);
    }
    const hold =
      stage === 0
        ? HOLD.welcome
        : stage === 2
          ? HOLD.sent
          : stage === 3
            ? HOLD.thinking
            : stage < s.summary
              ? HOLD.step
              : stage === s.summary
                ? HOLD.summary
                : stage === s.answer
                  ? HOLD.answer
                  : stage === s.sources
                    ? HOLD.sources
                    : HOLD.done;
    t = setTimeout(() => {
      if (stage < s.done) {
        if (stage === 0) setTyped(0);
        setStage(stage + 1);
      } else if (cycle) {
        setFlow(ORDER[(ORDER.indexOf(flow) + 1) % ORDER.length]);
        setStage(0);
        setTyped(0);
      }
    }, hold);
    return () => clearTimeout(t);
  }, [started, playing, still, stage, typed, question.length, s, cycle, flow]);

  // Keep the newest part of the answer in view, as the panel does.
  useEffect(() => {
    const el = body.current;
    if (!el) return;
    el.scrollTo({ top: stage <= 1 ? 0 : el.scrollHeight, behavior: still ? "auto" : "smooth" });
  }, [stage, flow, still]);

  const pick = useCallback(
    (f: Flow) => {
      setCycle(false);
      setFlow(f);
      setTyped(0);
      if (still) {
        setStage(stagesOf(f).done);
        return;
      }
      setStarted(true);
      setPlaying(true);
      setStage(1);
    },
    [still],
  );

  const replay = () => pick(flow);
  const thinking = stage === 3;
  const done = stage >= s.done;
  const progress = still ? 1 : Math.min(1, stage / s.done);

  return (
    <div ref={root} className="relative">
      {/* aurora: brightens while the Agent is thinking */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[38%] h-[240px] blur-[48px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #2060a6 0%, #59a3eb 35%, #18bc9c 65%, #8cd135 100%)",
          opacity: thinking ? 0.85 : 0.45,
          transform: thinking ? "scaleY(1.3)" : "none",
          transition: "opacity .9s ease, transform 1.2s var(--ease-out-soft)",
        }}
      />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-[auto_1fr] lg:gap-x-0">
        {/* The page you are on: the real Recipe page. */}
        <div className="relative hidden overflow-hidden rounded-[14px] border border-white/10 bg-white lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:block lg:mr-[120px]">
          <div className="flex items-center gap-1.5 border-b border-[#e9e9e9] bg-[#f3f3f6] px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-[#d9d9d9]" />
            ))}
            <span className="ml-3 font-mono text-[11px] text-slate-600">
              app.flavorstudio.com · Recipe
            </span>
          </div>
          <Image
            src={productAssets.recipeGrid.src as string}
            alt="The Recipe page in Flavor Studio, the page the Agent opens beside"
            width={productAssets.recipeGrid.width}
            height={productAssets.recipeGrid.height}
            sizes="760px"
            className="block w-full"
            priority
          />
        </div>

        {/* The three starters, as controls for the replay. */}
        <div className="flex flex-col gap-2.5 lg:col-start-1 lg:row-start-2 lg:mt-5 lg:mr-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] tracking-[.08em] text-[#b4b4b4] uppercase">
              Replay a starter
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                disabled={still}
                aria-label={playing ? "Pause the replay" : "Play the replay"}
                className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 px-3 text-[12.5px] font-semibold text-white hover:bg-white/10 disabled:opacity-40"
              >
                <Icon name={playing ? "pause" : "play"} className="text-[13px]" />
                {playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={replay}
                className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 px-3 text-[12.5px] font-semibold text-white hover:bg-white/10"
              >
                <Icon name="refresh" className="text-[13px]" />
                Replay
              </button>
            </span>
          </div>
          {STARTERS.map((st) => {
            const on = st.kind === flow;
            return (
              <button
                key={st.kind}
                type="button"
                aria-pressed={on}
                onClick={() => pick(st.kind)}
                className={`group relative overflow-hidden rounded-[14px] border px-4 py-3 text-left transition-colors ${
                  on
                    ? "border-lime-400/60 bg-white/[.08]"
                    : "border-white/10 hover:border-white/25 hover:bg-white/[.04]"
                }`}
              >
                <span className="flex items-center gap-2 font-mono text-[11.5px] tracking-[.08em] text-lime-400 uppercase">
                  <Icon name={st.icon} className="text-[14px]" />
                  {st.label}
                </span>
                <span className="mt-1 block text-[14.5px] leading-[1.4] text-white">
                  {st.starter}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] bg-lime-400"
                  style={{
                    width: on ? `${progress * 100}%` : "0%",
                    transition: "width .5s ease",
                  }}
                />
              </button>
            );
          })}
          <p className="mt-1 text-[12px] leading-[1.5] text-[#b4b4b4]">
            A recording of the product design. Nothing on this page reaches the
            Agent; it runs inside your workspace, on your data.
          </p>
        </div>

        {/* The panel, docked over the page's right edge. */}
        <div
          className={`${APP} relative flex h-[600px] flex-col overflow-hidden rounded-[16px] border border-[#e9e9e9] bg-white text-slate-800 shadow-window lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-10 lg:h-[640px]`}
        >
          <div className="flex items-center gap-3 border-b border-[#eef1f3] px-4 py-3">
            <span className="flex size-8 flex-none items-center justify-center rounded-[9px] bg-[#59a3eb]">
              <Image src="/ai-act/ai-fill.svg" alt="" width={14} height={15} />
            </span>
            <span className="flex-1 leading-tight">
              <span className="block text-[14.5px] font-bold">AI Agent</span>
              <span className="block text-[11px] text-slate-600">
                AI assistant · Flavor Studio
              </span>
            </span>
            <Icon name="plus" className="text-[15px] text-slate-500" />
            <Icon name="close" className="text-[15px] text-slate-500" />
          </div>

          <div
            ref={body}
            data-lenis-prevent
            // Announce only a replay someone asked for, not the idle cycle.
            aria-live={cycle ? "off" : "polite"}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
          >
            {stage === 0 ? (
              <div style={{ animation: "fsPopIn .35s var(--ease-out) both" }}>
                <div className="pt-6 text-center">
                  <div className="text-[19px] font-bold">How can I help?</div>
                  <p className="mt-1 text-[12.5px] text-slate-600">
                    Ask anything about your recipes, ingredients &amp; allergens.
                  </p>
                </div>
                <p className="mt-6 text-[10.5px] font-bold tracking-[.06em] text-slate-600 uppercase">
                  Try one of these
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {STARTERS.map((st) => (
                    <button
                      key={st.kind}
                      type="button"
                      onClick={() => pick(st.kind)}
                      className={`flex min-h-[44px] items-start gap-2.5 rounded-[10px] border px-3 py-2.5 text-left transition-colors hover:border-blue-400 ${
                        st.kind === flow && started ? "border-blue-400 bg-blue-050" : "border-[#e9e9e9]"
                      }`}
                    >
                      <Icon name={st.icon} className="mt-0.5 text-[15px] text-slate-600" />
                      <span>
                        <span className="block text-[10px] font-bold text-blue-600 uppercase">
                          {st.label}
                        </span>
                        <span className="block text-[13px] leading-[1.35]">{st.starter}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <In show={stage >= 2} className="flex justify-end">
                  <p className="max-w-[88%] rounded-[14px] rounded-br-[4px] bg-blue-600 px-3 py-2 text-[13px] leading-[1.45] font-semibold text-white">
                    {question}
                  </p>
                </In>
                <In show={stage === 3}>
                  <div className="mt-3 flex items-center gap-2 text-[12.5px] text-slate-600">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 rounded-full bg-[#59a3eb]"
                          style={{ animation: `fsPulse 1s ease-in-out ${i * 0.18}s infinite` }}
                        />
                      ))}
                    </span>
                    Thinking
                  </div>
                </In>
                <In show={stage >= 4} className="mt-3 text-[12px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Tick /> Thinking completed
                  </div>
                  {STEPS[flow].length ? (
                    <ol className="mt-1.5 ml-[6px] flex list-none flex-col gap-1 border-l border-[#e9e9e9] p-0 pl-3">
                      {STEPS[flow].map((st, i) =>
                        stage >= 4 + i ? (
                          <li
                            key={st}
                            className="flex items-center gap-1.5"
                            style={{ animation: "fsPopIn .38s var(--ease-out) both" }}
                          >
                            <span className="size-1.5 rounded-full bg-lime-600" />
                            {st}
                          </li>
                        ) : null,
                      )}
                    </ol>
                  ) : null}
                </In>
                <In show={stage >= s.summary}>
                  <div className="mt-2 flex items-center gap-1.5 text-[12px] text-slate-600">
                    <Tick /> Completed {COUNTS[flow]} steps
                  </div>
                </In>
                {flow === "list" ? (
                  <ListBody stage={stage} f={flow} />
                ) : flow === "compare" ? (
                  <CompareBody stage={stage} f={flow} />
                ) : (
                  <WhatIfBody stage={stage} f={flow} />
                )}
              </>
            )}
          </div>

          <div className="border-t border-[#eef1f3] px-4 pt-2.5 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#f3f3f6] px-2 py-0.5 text-[11px] text-slate-600">
              <span className="size-2 rounded-[2px] bg-lime-500" />
              Context: <b className="font-semibold text-slate-800">Recipes · List</b>
            </span>
            <div className="mt-2 flex min-h-[52px] items-end justify-between gap-3 rounded-[10px] border border-[#e9e9e9] px-3 py-2">
              <span className={`text-[12.5px] leading-[1.4] ${stage === 1 ? "text-slate-800" : "text-slate-600"}`}>
                {stage === 1 ? (
                  <>
                    {question.slice(0, typed)}
                    <span
                      className="ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-slate-800"
                      style={{ animation: "fsCaret 1s steps(1) infinite" }}
                    />
                  </>
                ) : (
                  "Ask, @mention to add recipes, or / for actions"
                )}
              </span>
              <span
                className={`flex size-7 flex-none items-center justify-center rounded-[7px] text-white transition-colors ${stage === 1 && typed >= question.length ? "bg-lime-600" : "bg-blue-600"}`}
              >
                <Icon name="up" className="text-[13px]" />
              </span>
            </div>
            <p className="mt-1.5 text-[10.5px] leading-[1.4] text-slate-600">{DISCLAIMER}</p>
          </div>
          {done && !cycle && !still ? (
            <span className="sr-only">Replay finished.</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
