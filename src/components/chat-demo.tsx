"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, SparkIcon } from "@/components/icon";
import {
  scriptedAnswer,
  suggestions,
  thinkingDelay,
  type ChatMessage,
} from "@/lib/chat-script";

/*
 * The interactive AI Agent demo.
 *
 * Two skins: "light" is the white product surface the landing page uses (the
 * user asked for it to read as obviously usable against the navy band), "dark"
 * is the translucent card on the AI Agent page.
 *
 * Answers are scripted (see lib/chat-script.ts) rather than fetched, so the
 * demo works with no backend, no API key and no network.
 */

type Skin = "light" | "dark";

const AgentAvatar = ({ size = 26 }: { size?: number }) => (
  <span
    className="flex flex-none items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-teal-500"
    style={{ width: size, height: size, marginTop: 2 }}
  >
    <SparkIcon size={Math.round(size / 2)} />
  </span>
);

const TypingDots = ({ skin }: { skin: Skin }) => (
  <div
    className={`flex gap-[5px] rounded-[20px] px-4 py-[13px] ${
      skin === "light"
        ? "bg-gray-050 border border-gray-300"
        : "border border-white/[.08] bg-white/[.07]"
    }`}
  >
    {[0, 0.15, 0.3].map((delay) => (
      <span
        key={delay}
        className="h-[6px] w-[6px] rounded-full bg-slate-300"
        style={{ animation: `fsDot 1.2s ease ${delay}s infinite` }}
      />
    ))}
  </div>
);

export function ChatDemo({
  skin = "light",
  /** The landing page shows the extra "tap a question" nudge; the agent page doesn't. */
  emptyStateNudge = false,
  starters = 3,
}: {
  skin?: Skin;
  emptyStateNudge?: boolean;
  starters?: number;
}) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, loading]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setChat((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    const answer = scriptedAnswer(q);
    timer.current = setTimeout(() => {
      setChat((prev) => [...prev, { role: "agent", text: answer }]);
      setLoading(false);
    }, thinkingDelay(answer));
  };

  const canSend = Boolean(input.trim()) && !loading;
  const light = skin === "light";

  return (
    <div
      className={
        light
          ? "overflow-hidden rounded-[18px] border border-white/[.14] bg-white shadow-[0_26px_60px_rgba(8,15,28,.45)]"
          : "overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-[6px]"
      }
    >
      {/* header */}
      <div
        className={`flex items-center gap-[10px] px-5 py-[14px] ${
          light
            ? "bg-gray-050 border-b border-gray-300"
            : "border-b border-white/[.08]"
        }`}
      >
        <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px] bg-linear-to-br from-blue-500 to-teal-500">
          <SparkIcon size={15} />
        </span>
        <div className="leading-[1.2]">
          <div
            className={`text-[14px] font-extrabold ${light ? "text-slate-800" : "text-white"}`}
          >
            AI Agent
          </div>
          <div
            className={`text-[11.5px] font-medium ${light ? "text-slate-400" : "text-slate-300"}`}
          >
            Flavor Studio · food-science assistant
          </div>
        </div>
        <span
          className={`ml-auto inline-flex items-center gap-[6px] text-[11.5px] font-extrabold ${
            light
              ? "rounded-full bg-teal-100 px-[11px] py-1 text-[#0e8b73]"
              : "font-bold text-[#4fd8bd]"
          }`}
        >
          <span
            className="h-[7px] w-[7px] rounded-full bg-teal-500"
            style={{ animation: "fsPulse 2s ease infinite" }}
          />
          Online
        </span>
      </div>

      {/* transcript */}
      <div
        ref={scroller}
        className={`flex flex-col gap-3 overflow-y-auto p-5 ${
          light ? "max-h-[360px] min-h-[260px]" : "max-h-[400px] min-h-[280px]"
        }`}
      >
        {chat.length === 0 && (
          <div
            className={`my-auto text-center ${light ? "text-slate-500" : "text-slate-300"}`}
          >
            {emptyStateNudge ? (
              <>
                <div className="mb-1 inline-flex items-center gap-2 text-[14.5px] font-bold text-slate-800">
                  <Icon name="click" className="text-[18px] text-blue-500" />
                  <span>Tap a question to see the Agent answer</span>
                </div>
                <div className="mb-4 text-[13px] leading-[1.55]">
                  …or type your own in the box below.
                </div>
              </>
            ) : (
              <div className="mb-4 text-[14px] leading-[1.55]">
                Try one of these, or type your own:
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.slice(0, starters).map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => ask(s.prompt)}
                  className={
                    light
                      ? "cursor-pointer rounded-full border border-blue-300 bg-blue-100 px-4 py-[9px] text-[12.5px] font-bold text-blue-700 shadow-[0_2px_6px_rgba(43,59,83,.06)] transition-[background,color,transform,box-shadow] duration-[180ms] hover:-translate-y-px hover:bg-blue-500 hover:text-white hover:shadow-[0_8px_18px_rgba(89,163,235,.32)]"
                      : "cursor-pointer rounded-full border border-blue-500/40 px-[15px] py-2 text-[12.5px] font-semibold text-[#9ccbf5] transition-[background] duration-[180ms] hover:bg-blue-500/15"
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {chat.map((msg, i) =>
          msg.role === "user" ? (
            <div
              key={i}
              className="max-w-[86%] self-end rounded-[14px_14px_4px_14px] bg-blue-500 px-[15px] py-[11px] text-[13.5px] leading-[1.5] [overflow-wrap:anywhere] whitespace-pre-wrap text-white"
            >
              {msg.text}
            </div>
          ) : (
            <div key={i} className="flex max-w-[92%] gap-[10px] self-start">
              <AgentAvatar />
              <div
                className={`rounded-[14px_14px_14px_4px] px-[15px] py-[11px] text-[13.5px] leading-[1.6] [overflow-wrap:anywhere] whitespace-pre-wrap ${
                  light
                    ? "bg-gray-050 border border-gray-300 text-slate-700"
                    : "border border-white/[.08] bg-white/[.07] text-[#dfe5ee]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex gap-[10px] self-start">
            <AgentAvatar />
            <TypingDots skin={skin} />
          </div>
        )}
      </div>

      {/* composer */}
      <div
        className={`flex items-end gap-[10px] px-4 py-[14px] ${
          light
            ? "bg-gray-050 border-t border-gray-300"
            : "border-t border-white/[.08]"
        }`}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
          rows={1}
          placeholder="Ask about ingredients, allergens, claims, cost…"
          aria-label="Ask the AI Agent"
          className={
            light
              ? "max-h-[120px] flex-1 resize-none rounded-[14px] border-[1.5px] border-blue-300 bg-white px-[15px] py-3 text-[14.5px] leading-[1.5] text-slate-800 shadow-[0_1px_3px_rgba(43,59,83,.06)] outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(89,163,235,.22)]"
              : "max-h-[120px] flex-1 resize-none rounded-[14px] border border-white/[.14] bg-white/[.06] px-[14px] py-[11px] text-[14px] leading-[1.5] text-white outline-none placeholder:text-slate-400 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(89,163,235,.25)]"
          }
        />
        <button
          type="button"
          onClick={() => ask(input)}
          aria-label="Send"
          disabled={!canSend}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-[14px] transition-[background,color] duration-[180ms]"
          style={{
            background: canSend
              ? "var(--color-blue-500)"
              : light
                ? "var(--color-blue-200)"
                : "rgba(255,255,255,.12)",
            color: canSend
              ? "#ffffff"
              : light
                ? "var(--color-blue-700)"
                : "#ffffff",
            cursor: canSend ? "pointer" : "default",
          }}
        >
          <Icon name="send" className="text-[19px]" />
        </button>
      </div>
    </div>
  );
}
