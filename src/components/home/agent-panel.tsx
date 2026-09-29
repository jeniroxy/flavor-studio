"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/*
 * The Agent's own panel, playing the COMPARE flow the app design lays out
 * (Figma "Flavor Studio Application", page AI Agent, section "Floating
 * Concept (USED)" 8035:30189; the answer is frame 8042:40030 and the sources
 * popover 8042:43106): the question is typed with two recipes @mentioned,
 * sent, the Agent shows its steps, the side-by-side table fills in row by
 * row, and the two sources open.
 *
 * It is a picture of the product, not a working chat: the client asked that
 * nothing public ever reach their AI, so nothing here is wired to anything.
 * Values and wording are the design's, with one fix: the design labels both
 * recipes "Recipe A is …" under the table, while its own sources popover
 * names Classic Fudge Brownie as Recipe B.
 */

const APP = "font-['Avenir_Next',var(--font-mulish),sans-serif] leading-[normal]";

/* The question, typed; a named recipe is an @mention and becomes a chip. */
const QUESTION: { text: string; recipe?: boolean }[] = [
  { text: "Show me the side by side nutritional labels of " },
  { text: "Classic Fudge Brownie v3", recipe: true },
  { text: " vs " },
  { text: "Protein Brownie v3", recipe: true },
];
const QUESTION_LEN = QUESTION.reduce((n, s) => n + s.text.length, 0);
/* Where each segment starts in the typed string. */
const START = QUESTION.map((_, k) =>
  QUESTION.slice(0, k).reduce((n, s) => n + s.text.length, 0),
);

/* Recipe A is Protein Brownie v3, Recipe B is Classic Fudge Brownie v3.
   `gap` marks the rows the design highlights as the biggest gaps. */
const ROWS: { name: string; a: string; b: string; gap?: boolean }[] = [
  { name: "Calories", a: "150", b: "190", gap: true },
  { name: "Total Fat", a: "6g", b: "9g" },
  { name: "Saturated Fat", a: "2g", b: "4g" },
  { name: "Cholesterol", a: "15mg", b: "30mg" },
  { name: "Sodium", a: "95mg", b: "120mg" },
  { name: "Total Carb", a: "18g", b: "24g" },
  { name: "Total Sugars", a: "9g", b: "16g", gap: true },
  { name: "Protein", a: "8g", b: "3g", gap: true },
];

const SOURCES = [
  {
    title: "Recipe A - Protein Brownie v3",
    body: "Whey-isolate forward formula, 8g protein per 40g serving.",
  },
  {
    title: "Recipe B - Classic Fudge Brownie",
    body: "Traditional butter and sugar formula, 3g protein per 40g serving.",
  },
];

/* The script. Typing runs inside "typing" until the question is complete. */
const STAGES = [
  { id: "welcome", hold: 1500 },
  { id: "typing", hold: 700 },
  { id: "send", hold: 380 },
  { id: "sent", hold: 800 },
  { id: "thinking", hold: 1500 },
  { id: "steps", hold: 800 },
  { id: "table", hold: 2600 },
  { id: "summary", hold: 1500 },
  { id: "press-sources", hold: 380 },
  { id: "sources", hold: 3400 },
  { id: "done", hold: 1600 },
] as const;
type StageId = (typeof STAGES)[number]["id"];
const at = (id: StageId) => STAGES.findIndex((s) => s.id === id);

const TYPE_MS = 42;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function Doc() {
  return (
    <span className="relative size-4 shrink-0">
      <img
        alt=""
        src="/ai-act/doc.svg"
        className="absolute inset-[12.5%] block size-[13px] max-w-none"
      />
    </span>
  );
}

function RecipeChip({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-1 rounded-[24px] bg-[#deedfb] px-2 py-1 [animation:fsPopIn_0.3s_var(--ease-out)_both]">
      <Doc />
      <span className="text-[12px] font-medium whitespace-nowrap text-[#324561]">
        {name}
      </span>
      <img alt="" src="/ai-act/chip-close.svg" className="block size-2" />
    </span>
  );
}

function Starter({
  icon,
  inset,
  kind,
  text,
  gap,
}: {
  icon: string;
  inset: string;
  kind: string;
  text: string;
  gap: string;
}) {
  return (
    <div className="flex w-full items-start gap-2.5 rounded-[10px] border border-[#e9e9e9] bg-white p-4">
      <span className="relative size-5 shrink-0">
        <img
          alt=""
          src={`/ai-act/${icon}.svg`}
          className="absolute block max-w-none"
          style={{ inset }}
        />
      </span>
      <span className={`flex min-w-0 flex-1 flex-col ${gap}`}>
        <span className="text-[10px] font-bold text-[#59a3eb]">{kind}</span>
        <span className="text-[14px] leading-4 font-medium text-[#42525f]">
          {text}
        </span>
      </span>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 text-[#8cd135]" aria-hidden="true">
      <path
        d="M2 6.4 4.8 9 10 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Fades a block in when `show` turns on; it holds its space either way. */
function Reveal({
  show,
  delay = 0,
  className = "",
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(6px)",
        transition: `opacity 360ms ease ${show ? delay : 0}ms, transform 420ms var(--ease-out) ${show ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Stage ids in script order, for a caller that follows along. */
export type AgentStage = StageId;

export function AgentPanel({
  onStage,
}: {
  /** Called with the stage on screen, or null while the example is stopped. */
  onStage?: (stage: AgentStage | null) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  // Reduced motion holds the opening state until the visitor presses Play.
  const reduced = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;
  // The panel opens from the Agent's launcher the first time it is seen,
  // as it does in the app; the script starts once it has.
  // With reduced motion it is simply there.
  const [launched, setLaunched] = useState(false);
  const opened = launched || reduced;
  const running = playing && onScreen && opened;

  useEffect(() => {
    if (opened || !onScreen) return;
    const id = window.setTimeout(() => setLaunched(true), 250);
    return () => window.clearTimeout(id);
  }, [opened, onScreen]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const typing = stage === at("typing");
  const typingDone = typed >= QUESTION_LEN;

  // Advance the script; the typing stage waits for the question to finish.
  useEffect(() => {
    if (!running || (typing && !typingDone)) return;
    const id = window.setTimeout(() => {
      const next = (stage + 1) % STAGES.length;
      if (next === 0) setTyped(0);
      setStage(next);
    }, STAGES[stage].hold);
    return () => window.clearTimeout(id);
  }, [stage, running, typing, typingDone]);

  useEffect(() => {
    if (!running || !typing) return;
    const id = window.setInterval(
      () => setTyped((n) => Math.min(QUESTION_LEN, n + 1)),
      TYPE_MS,
    );
    return () => window.clearInterval(id);
  }, [running, typing]);

  useEffect(() => {
    onStage?.(running ? STAGES[stage].id : null);
  }, [onStage, running, stage]);

  const past = (id: StageId) => stage >= at(id);
  const asked = past("sent");

  // Keep the newest part of the answer in view, as the app's panel does:
  // the table under the Agent's steps, then the summary and sources below it.
  // (The answer holds its space from the start, so "the bottom" is only
  // right once the summary is showing.)
  const showTable = past("table");
  const showSummary = past("summary");
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const top = showSummary
      ? body.scrollHeight
      : showTable
        ? (stepsRef.current?.offsetTop ?? 0) - 8
        : 0;
    body.scrollTo({ top, behavior: "smooth" });
  }, [showTable, showSummary]);

  // The question as typed so far, recipe names in bold, and which recipes
  // have been mentioned (their chips sit above the composer).
  const count = asked ? 0 : typed;
  const chips = QUESTION.filter(
    (seg, k) => seg.recipe && count > START[k],
  ).map((seg) => seg.text);
  const typedParts = QUESTION.map((seg, k) => {
    const shown = seg.text.slice(0, Math.max(0, count - START[k]));
    return shown ? (
      <span key={k} className={seg.recipe ? "font-semibold" : undefined}>
        {shown}
      </span>
    ) : null;
  });

  const pressSend = stage === at("send");
  const pressSources = stage === at("press-sources");
  const sourcesOpen = stage === at("sources");

  return (
    <div
      ref={rootRef}
      className={`${APP} relative flex h-[660px] w-full origin-bottom-right flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] lg:h-[648px]`}
      style={{
        opacity: opened ? 1 : 0,
        transform: opened ? "none" : "translate(12px, 24px) scale(0.86)",
        transition:
          "opacity 380ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <p className="sr-only">
        A recorded example, not a live chat: the AI Agent is asked for the side
        by side nutrition labels of Classic Fudge Brownie v3 and Protein
        Brownie v3, shows the steps it completed, compares calories, fat,
        cholesterol, sodium, carbohydrate, sugars and protein per 40 g serving,
        and lists the two recipes it drew from.
      </p>

      <div
        aria-hidden="true"
        className="flex items-center gap-4 border-b border-[#eef1f3] bg-white px-4 py-3.5"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#59a3eb]">
          <span className="relative size-4">
            <img
              alt=""
              src="/ai-act/ai-fill.svg"
              className="absolute inset-[8.33%_8.33%_0.78%_8.73%] block max-w-none"
            />
          </span>
        </span>
        <span className="flex min-w-0 flex-1 flex-col whitespace-nowrap">
          <span className="text-[15px] font-bold text-[#324561]">AI Agent</span>
          <span className="text-[11px] font-medium text-[#9db0c9]">
            AI assistant · Flavour Studio
          </span>
        </span>
        <img alt="" src="/ai-act/plus.svg" className="block size-4" />
        <img alt="" src="/ai-act/close.svg" className="block size-4" />
      </div>

      {/* Body: the welcome, replaced by the conversation once it is sent. */}
      <div aria-hidden="true" className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 flex flex-col items-center gap-6 px-4 pt-12 pb-4"
          style={{
            opacity: asked ? 0 : 1,
            transform: asked ? "translateY(-10px)" : "none",
            transition: "opacity 300ms ease, transform 400ms var(--ease-out)",
          }}
        >
          <div className="w-full text-center">
            <p className="text-[20px] font-bold text-[#2f3e4f]">
              How can I help, Jeni?
            </p>
            <p className="text-[14px] font-medium text-[#94a3b1]">
              Ask anything about your recipes, ingredients &amp; allergens.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-[12px] font-bold text-[#9aa6b2]">
              TRY ONE OF THESE
            </p>
            <Starter
              icon="view-list"
              inset="8.33% 16.67% 8.34% 16.67%"
              kind="LIST"
              text="Ingredients with no soy allergen, categorized as starches"
              gap="gap-1"
            />
            <Starter
              icon="align-horizontally"
              inset="12.5% 12.5% 12.5% 16.67%"
              kind="COMPARE"
              text="Side-by-side nutrition labels: Recipe A vs Recipe B"
              gap="gap-[3px]"
            />
          </div>
        </div>

        {asked ? (
          <div
            ref={bodyRef}
            className="absolute inset-0 overflow-hidden px-4 pt-4 pb-4"
          >
            <div className="flex justify-end">
              <p className="max-w-[88%] rounded-[16px] rounded-tr-[4px] bg-[#59a3eb] px-4 py-3 text-[13px] leading-[1.45] font-medium text-white [animation:fsPopIn_0.35s_var(--ease-out)_both]">
                {QUESTION.map((seg, k) => (
                  <span
                    key={k}
                    className={seg.recipe ? "font-bold" : undefined}
                  >
                    {seg.text}
                  </span>
                ))}
              </p>
            </div>

            <div
              ref={stepsRef}
              className="mt-4 flex flex-col gap-2.5 text-[13px] font-medium text-[#9aa6b2]"
            >
              {past("steps") ? (
                <>
                  <span className="flex items-center gap-2 [animation:fsPopIn_0.3s_var(--ease-out)_both]">
                    <Check /> Thinking completed
                  </span>
                  <span className="flex items-center gap-2 [animation:fsPopIn_0.3s_var(--ease-out)_0.12s_both]">
                    <Check /> Completed 3 steps
                  </span>
                </>
              ) : past("thinking") ? (
                <span className="flex items-center gap-2">
                  <span className="flex gap-[3px]">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-[5px] rounded-full bg-[#59a3eb] [animation:fsAgentDot_1s_ease-in-out_infinite]"
                        style={{ animationDelay: `${d * 0.16}s` }}
                      />
                    ))}
                  </span>
                  Thinking…
                </span>
              ) : null}
            </div>

            <Reveal
              show={past("table")}
              className="mt-3 text-[13px] leading-[1.45] font-medium text-[#42525f]"
            >
              Nutrition for Recipe A and Recipe B per 40g serving. Highlighted
              rows show biggest gaps:
            </Reveal>

            <div
              className="mt-3 overflow-hidden rounded-[6px] border text-[12.5px]"
              style={{
                borderColor: past("table") ? "#e3e9ef" : "transparent",
                transition: "border-color 300ms ease",
              }}
            >
              <Reveal show={past("table")} delay={80}>
                <div className="grid grid-cols-[1.25fr_1fr_1fr] bg-[#59a3eb] px-3 py-2.5 font-bold text-white">
                  <span>Nutrient</span>
                  <span>Recipe A</span>
                  <span>Recipe B</span>
                </div>
              </Reveal>
              {ROWS.map((r, k) => (
                <Reveal key={r.name} show={past("table")} delay={180 + k * 150}>
                  <div className="grid grid-cols-[1.25fr_1fr_1fr] border-t border-[#eef1f3] px-3 py-[7px] text-[#324561]">
                    <span className="font-semibold">{r.name}</span>
                    <span
                      className={
                        r.gap ? "font-bold text-[#6fb52a]" : "font-medium"
                      }
                    >
                      {r.a}
                    </span>
                    <span
                      className={
                        r.gap ? "font-bold text-[#8a9bb0]" : "font-medium"
                      }
                    >
                      {r.b}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              show={past("summary")}
              className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[#42525f]"
            >
              <span>
                Recipe A is <b className="text-[#324561]">Protein Brownie v3</b>
              </span>
              <span>
                Recipe B is{" "}
                <b className="text-[#324561]">Classic Fudge Brownie v3</b>
              </span>
            </Reveal>
            <Reveal
              show={past("summary")}
              delay={150}
              className="mt-2 text-[12px] font-medium text-[#5e6e7e]"
            >
              Recipe A: +5g protein, 7g less sugar, 40 fewer calories.
            </Reveal>
            <Reveal show={past("summary")} delay={300} className="relative mt-3">
              <span
                className={`inline-flex rounded-[8px] border border-[#59a3eb] px-3.5 py-2 text-[13px] font-bold text-[#59a3eb] transition-transform duration-150 ${pressSources ? "scale-95 bg-[#deedfb]" : ""}`}
              >
                2 Sources
              </span>
              {sourcesOpen ? (
                <div className="absolute bottom-[calc(100%+10px)] left-0 w-full rounded-[10px] border border-[#e9e9e9] bg-white shadow-[0_8px_28px_rgba(22,34,58,0.16)] [animation:fsPopIn_0.3s_var(--ease-out)_both]">
                  <div className="flex items-center justify-between border-b border-[#eef1f3] px-4 py-3">
                    <span className="text-[14px] font-bold text-[#324561]">
                      2 Sources
                    </span>
                    <img alt="" src="/ai-act/close.svg" className="block size-3" />
                  </div>
                  <ul className="flex flex-col gap-3 px-4 py-3">
                    {SOURCES.map((s) => (
                      <li key={s.title} className="flex items-start gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f3f3f6]">
                          <Doc />
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-bold text-[#324561]">
                            {s.title}
                          </span>
                          <span className="text-[11px] leading-[1.35] text-[#5e6e7e]">
                            {s.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>
          </div>
        ) : null}
      </div>

      {/* Composer. */}
      <div
        aria-hidden="true"
        className="flex flex-col gap-2.5 border-t border-[#e9e9e9] bg-white px-4 pt-3 pb-3.5"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-[7px] rounded-[4px] bg-[#f3f3f6] px-2 py-1">
            <span className="relative size-4 shrink-0">
              <img
                alt=""
                src="/ai-act/local-two.svg"
                className="absolute inset-[8.34%_18.75%_8.33%_18.75%] block max-w-none"
              />
            </span>
            <span className="text-[12px] font-medium whitespace-nowrap text-[#5e6e7e]">
              <span className="text-[#9db0c9]">Context:</span>{" "}
              <span className="text-[#324561]">Recipes · List</span>
            </span>
          </span>
          {chips.map((c) => (
            <RecipeChip key={c} name={c} />
          ))}
        </div>
        <div className="flex h-[100px] flex-col justify-between rounded-[13px] border border-[#e9e9e9] bg-white py-2 pr-2 pl-3.5">
          <p className="text-[14px] font-medium text-[#324561]">
            {typed > 0 && !asked ? (
              <>
                {typedParts.map((p, k) => (
                  <Fragment key={k}>{p}</Fragment>
                ))}
                {typing ? (
                  <span className="ml-px inline-block h-[15px] w-px translate-y-[2px] animate-[fsCaret_1s_steps(1)_infinite] bg-[#324561]" />
                ) : null}
              </>
            ) : (
              <span className="text-[#9db0c9]">
                Ask, @mention for add recipes, or /for actions
              </span>
            )}
          </p>
          <div className="flex items-center justify-between">
            <span className="flex size-8 items-center justify-center rounded-[7px] text-[17px] font-medium text-[#8a97a4]">
              +
            </span>
            <span
              className={`flex size-[34px] items-center justify-center rounded-[9px] bg-[#59a3eb] font-sans text-[16px] font-bold text-white transition-transform duration-150 ${pressSend ? "scale-90 bg-[#2060a6]" : ""}`}
            >
              ↑
            </span>
          </div>
        </div>
        <p className="text-[10px] font-medium text-[#9db0c9]">
          AI Agent answers draw only from your org&rsquo;s data. Verify before
          relying on results.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setChoice(!playing)}
        aria-label={playing ? "Pause the AI Agent example" : "Play the AI Agent example"}
        className="absolute top-2.5 right-[58px] flex size-11 cursor-pointer items-center justify-center rounded-full"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-[#f3f3f6] text-[#324561]">
          <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
            {playing ? (
              <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
            ) : (
              <path d="M3 1.2v9.6L10.5 6z" fill="currentColor" />
            )}
          </svg>
        </span>
      </button>
    </div>
  );
}
